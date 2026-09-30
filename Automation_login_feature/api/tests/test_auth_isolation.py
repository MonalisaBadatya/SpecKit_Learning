import pytest
from ..clients.auth_client import AuthClient
from ..utils.config import config

@pytest.mark.api
@pytest.mark.isolation
class TestAuthIsolation:
    """Cross-context security boundary tests."""

    def test_tc_login_api_028_cross_context_admin_on_tenant_blocked(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-028: Cross-Context Isolation Enforcement.
        Traceability: REQ-LOGIN-016, BR-LOGIN-008, BR-LOGIN-009, SEC-LOGIN-006
        """
        response = auth_client.login(
            email=config.platform_admin_email,
            password=config.platform_admin_password,
            tenant_slug=config.tenant_slug
        )
        assert response.status_code in [401, 400]
