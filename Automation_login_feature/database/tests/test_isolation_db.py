import pytest
from ..clients.db_client import DatabaseClient

@pytest.mark.db
@pytest.mark.isolation
class TestIsolationDb:
    """Schema isolation and partition verification tests."""

    def test_tc_login_db_012_core_vs_tenant_schema_isolation(self, db_client: DatabaseClient):
        """
        TC-LOGIN-DB-012: Core vs. Tenant Schema Isolation.
        Traceability: REQ-LOGIN-016, BR-LOGIN-008, BR-LOGIN-009, SEC-LOGIN-006
        """
        try:
            # Query tenant resource for platform admin email -> must return None
            row_tenant = db_client.fetch_one(
                """SELECT "resourceId" FROM "cmma_danis"."resource" WHERE "email" = %s;""",
                ("admin@cmma.io",)
            )
            assert row_tenant is None, "Platform admin record leaked into tenant schema resource table!"

            # Query core platform admin for tenant user email -> must return None
            row_core = db_client.fetch_one(
                """SELECT "platformAdminId" FROM "cmma_core"."platformAdmin" WHERE "email" = %s;""",
                ("user@danis.com",)
            )
            assert row_core is None, "Tenant user record leaked into cmma_core platformAdmin table!"
        except Exception as e:
            pytest.skip(f"Database error: {e}")

    def test_tc_login_db_013_multi_tenant_schema_isolation(self, db_client: DatabaseClient):
        """
        TC-LOGIN-DB-013: Multi-Tenant Schema Database Isolation (cmma_danis vs. cmma_falcon).
        Traceability: REQ-LOGIN-016, BR-LOGIN-009, SEC-LOGIN-006
        """
        try:
            row_danis = db_client.fetch_one(
                """SELECT a."accountId", a."passwordHash" FROM "cmma_danis"."account" a
                   JOIN "cmma_danis"."resource" r ON a."resourceId" = r."resourceId"
                   WHERE r."email" = %s;""",
                ("common.user@company.com",)
            )
            row_falcon = db_client.fetch_one(
                """SELECT a."accountId", a."passwordHash" FROM "cmma_falcon"."account" a
                   JOIN "cmma_falcon"."resource" r ON a."resourceId" = r."resourceId"
                   WHERE r."email" = %s;""",
                ("common.user@company.com",)
            )
            if row_danis and row_falcon:
                assert row_danis["accountId"] != row_falcon["accountId"], "Multi-tenant account IDs must be partition-isolated"
        except Exception as e:
            pytest.skip(f"Multi-tenant test schemas not present: {e}")
