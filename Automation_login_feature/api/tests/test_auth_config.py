import pytest
from ..clients.auth_client import AuthClient
from ..schemas.auth_schemas import TenantConfigResponse
from ..utils.config import config

@pytest.mark.api
class TestAuthConfig:
    """Tests for GET /api/auth/config endpoint."""

    def test_tc_login_api_023_get_config_query_param(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-023: Resolve Tenant Config via Query Parameter (slug).
        Traceability: REQ-LOGIN-009, API-LOGIN-004
        """
        response = auth_client.get_config(slug=config.tenant_slug)
        assert response.status_code == 200
        data = response.json()
        validated = TenantConfigResponse(**data)
        assert validated.tenant.name is not None
        assert validated.auth.local_enabled is True

    def test_tc_login_api_024_get_config_header(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-024: Resolve Tenant Config via X-Tenant-Slug Header.
        Traceability: REQ-LOGIN-009, API-LOGIN-004
        """
        response = auth_client.get_config(
            slug=None,
            headers={"X-Tenant-Slug": config.tenant_slug}
        )
        assert response.status_code == 200
        data = response.json()
        validated = TenantConfigResponse(**data)
        assert validated.tenant.name is not None

    def test_tc_login_api_025_get_config_nonexistent_tenant(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-025: Resolve Config for Non-Existent Tenant.
        Traceability: REQ-LOGIN-009, API-LOGIN-004
        """
        response = auth_client.get_config(slug="nonexistent-tenant-slug-999")
        assert response.status_code in [404, 400]
