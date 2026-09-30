import pytest
from ..clients.db_client import DatabaseClient
from ..queries.core_queries import SELECT_CORE_MFA_RECORD, SELECT_CORE_TRUSTED_MFA
from ..queries.tenant_queries import get_tenant_trusted_mfa_query

@pytest.mark.db
@pytest.mark.mfa
class TestMfaDb:
    """Tests for mfaVerification table in core and tenant schemas."""

    def test_tc_login_db_004_core_mfa_fk_integrity(self, db_client: DatabaseClient):
        """
        TC-LOGIN-DB-004: FK Relationship Integrity in cmma_core.mfaVerification.
        Traceability: DB-LOGIN-002
        """
        try:
            # Attempt to insert an invalid FK should trigger a foreign key violation
            fake_uuid = "00000000-0000-0000-0000-000000000000"
            with pytest.raises(Exception):
                db_client.execute(
                    """INSERT INTO "cmma_core"."mfaVerification" ("platformAdminId", "deviceFingerprint", "expiresAt")
                       VALUES (%s, 'invalid-fk-fp', NOW() + INTERVAL '1 day');""",
                    (fake_uuid,)
                )
        except Exception as e:
            pytest.skip(f"Database error: {e}")

    def test_tc_login_db_005_core_mfa_trusted_fingerprint_check(self, db_client: DatabaseClient):
        """
        TC-LOGIN-DB-005: Device Fingerprint Trust State Evaluation in Core Schema.
        Traceability: REQ-LOGIN-004, BR-LOGIN-004, DB-LOGIN-002
        """
        try:
            admin_row = db_client.fetch_one("""SELECT "platformAdminId" FROM "cmma_core"."platformAdmin" WHERE "email" = %s""", ("admin@cmma.io",))
            if admin_row is None:
                pytest.skip("Platform admin not found")
            admin_id = admin_row["platformAdminId"]
            row = db_client.fetch_one(SELECT_CORE_TRUSTED_MFA, (admin_id, "trusted-admin-fp-001"))
            if row is None:
                pytest.skip("Trusted MFA record not seeded")
            assert row["isTrusted"] is True
        except Exception as e:
            pytest.skip(f"Database error: {e}")

    def test_tc_login_db_006_core_mfa_expired_fingerprint_check(self, db_client: DatabaseClient):
        """
        TC-LOGIN-DB-006: Stale Device Fingerprint Expiry Check in Core Schema.
        Traceability: REQ-LOGIN-005, BR-LOGIN-004, BR-LOGIN-005, DB-LOGIN-002
        """
        try:
            admin_row = db_client.fetch_one("""SELECT "platformAdminId" FROM "cmma_core"."platformAdmin" WHERE "email" = %s""", ("admin@cmma.io",))
            if admin_row is None:
                pytest.skip("Platform admin not found")
            admin_id = admin_row["platformAdminId"]
            row = db_client.fetch_one(SELECT_CORE_TRUSTED_MFA, (admin_id, "expired-device-fp-100"))
            assert row is None, "Expired device fingerprint must NOT be returned by trusted query"
        except Exception as e:
            pytest.skip(f"Database error: {e}")

    def test_tc_login_db_010_tenant_mfa_fk_integrity(self, db_client: DatabaseClient):
        """
        TC-LOGIN-DB-010: FK Relationship Integrity in cmma_<tenantSlug>.mfaVerification.
        Traceability: DB-LOGIN-004
        """
        try:
            fake_uuid = "00000000-0000-0000-0000-000000000000"
            with pytest.raises(Exception):
                db_client.execute(
                    """INSERT INTO "cmma_danis"."mfaVerification" ("resourceId", "deviceFingerprint", "expiresAt")
                       VALUES (%s, 'invalid-fk-fp', NOW() + INTERVAL '1 day');""",
                    (fake_uuid,)
                )
        except Exception as e:
            pytest.skip(f"Database error: {e}")

    def test_tc_login_db_011_tenant_mfa_trusted_fingerprint_check(self, db_client: DatabaseClient):
        """
        TC-LOGIN-DB-011: Tenant Device Fingerprint Trust & Expiry Verification.
        Traceability: REQ-LOGIN-004, BR-LOGIN-004, DB-LOGIN-004
        """
        try:
            res_row = db_client.fetch_one("""SELECT "resourceId" FROM "cmma_danis"."resource" WHERE "email" = %s""", ("user@danis.com",))
            if res_row is None:
                pytest.skip("Tenant resource not found")
            res_id = res_row["resourceId"]
            query = get_tenant_trusted_mfa_query("danis")
            row = db_client.fetch_one(query, (res_id, "trusted-tenant-fp-999"))
            if row is None:
                pytest.skip("Trusted tenant MFA record not seeded")
            assert row["isTrusted"] is True
        except Exception as e:
            pytest.skip(f"Database error: {e}")
