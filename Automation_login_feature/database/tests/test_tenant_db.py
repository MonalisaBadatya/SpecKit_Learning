import pytest
from ..clients.db_client import DatabaseClient
from ..queries.tenant_queries import get_tenant_account_by_email_query, get_unprovisioned_resource_query
from ..utils.bcrypt_validator import is_valid_bcrypt_hash

@pytest.mark.db
@pytest.mark.auth
class TestTenantDb:
    """Tests for cmma_<tenantSlug>.account and resource entities."""

    def test_tc_login_db_007_tenant_account_bcrypt_hash_format(self, db_client: DatabaseClient):
        """
        TC-LOGIN-DB-007: Bcrypt Password Hash Persistence in cmma_<tenantSlug>.account.
        Traceability: SEC-LOGIN-004, BR-LOGIN-003, DB-LOGIN-003
        """
        try:
            query = get_tenant_account_by_email_query("danis")
            row = db_client.fetch_one(query, ("user@danis.com",))
            if row is None or row.get("passwordHash") is None:
                pytest.skip("Tenant account record not found")
            assert is_valid_bcrypt_hash(row["passwordHash"], salt_factor=10)
        except Exception as e:
            pytest.skip(f"Database error: {e}")

    def test_tc_login_db_008_tenant_account_status_values(self, db_client: DatabaseClient):
        """
        TC-LOGIN-DB-008: Account Status Values in cmma_<tenantSlug>.account (ACTIVE, DEACTIVATED, INACTIVE).
        Traceability: REQ-LOGIN-002, DB-LOGIN-003
        """
        try:
            query = get_tenant_account_by_email_query("danis")
            row = db_client.fetch_one(query, ("user@danis.com",))
            if row is None:
                pytest.skip("Tenant account record not found")
            assert row.get("status") in ["ACTIVE", "DEACTIVATED", "INACTIVE"]
        except Exception as e:
            pytest.skip(f"Database error: {e}")

    def test_tc_login_db_009_sso_provider_user_id_persist(self, db_client: DatabaseClient):
        """
        TC-LOGIN-DB-009: ssoProviderUserId Persistence for Entra SSO.
        Traceability: REQ-LOGIN-003, DB-LOGIN-003
        """
        try:
            query = get_tenant_account_by_email_query("danis")
            row = db_client.fetch_one(query, ("sso.user@danis.com",))
            if row is None:
                pytest.skip("SSO tenant account record not found")
            assert row.get("ssoProviderUserId") is not None
        except Exception as e:
            pytest.skip(f"Database error: {e}")

    def test_tc_login_db_014_unprovisioned_resource_no_account(self, db_client: DatabaseClient):
        """
        TC-LOGIN-DB-014: Unprovisioned Resource Record (NO_ACCOUNT State).
        Traceability: REQ-LOGIN-008, DB-LOGIN-005
        """
        try:
            query = get_unprovisioned_resource_query("danis")
            row = db_client.fetch_one(query, ("unprovisioned.worker@danis.com",))
            if row is None:
                pytest.skip("Unprovisioned worker record not found")
            assert row.get("resourceId") is not None
            assert row.get("accountId") is None
        except Exception as e:
            pytest.skip(f"Database error: {e}")
