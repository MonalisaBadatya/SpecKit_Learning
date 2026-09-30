import pytest
from ..clients.auth_client import AuthClient
from ..utils.config import config

@pytest.mark.api
@pytest.mark.security
class TestAuthRateLimits:
    """Rate limit boundary tests across auth endpoints."""

    def test_tc_login_api_012_rate_limit_auth_login(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-012: Rate Limit Throttling for /api/auth/login (5 req / 60s).
        Traceability: SEC-LOGIN-001, API-LOGIN-001
        """
        statuses = []
        for _ in range(6):
            res = auth_client.login(
                email=config.tenant_user_email,
                password="SomePassword123!",
                tenant_slug=config.tenant_slug
            )
            statuses.append(res.status_code)
        assert 429 in statuses or statuses[-1] == 429, f"Expected 429 in rate-limited loop, got: {statuses}"

    def test_tc_login_api_016_rate_limit_auth_entra(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-016: Rate Limit Throttling for /api/auth/entra (5 req / 60s).
        Traceability: SEC-LOGIN-002, API-LOGIN-002
        """
        statuses = []
        for _ in range(6):
            res = auth_client.entra_login(
                token="test.token.burst",
                tenant_slug=config.tenant_slug
            )
            statuses.append(res.status_code)
        assert 429 in statuses or statuses[-1] == 429, f"Expected 429 in rate-limited loop, got: {statuses}"

    def test_tc_login_api_022_rate_limit_check_auth_type(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-022: Rate Limit Throttling for /api/auth/check-auth-type (10 req / 60s).
        Traceability: SEC-LOGIN-003, API-LOGIN-003
        """
        statuses = []
        for _ in range(11):
            res = auth_client.check_auth_type(
                email=config.tenant_user_email,
                tenant_slug=config.tenant_slug
            )
            statuses.append(res.status_code)
        assert 429 in statuses or statuses[-1] == 429, f"Expected 429 in rate-limited loop, got: {statuses}"
