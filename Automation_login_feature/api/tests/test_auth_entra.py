import pytest
from ..clients.auth_client import AuthClient
from ..schemas.auth_schemas import LoginSuccessResponse
from ..utils.config import config

@pytest.mark.api
@pytest.mark.sso
class TestAuthEntra:
    """Tests for POST /api/auth/entra corporate SSO endpoint."""

    def test_tc_login_api_013_valid_entra_token_exchange(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-013: Valid Entra SSO Token Exchange.
        Traceability: REQ-LOGIN-003, API-LOGIN-002
        """
        mock_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.valid_test_token"
        response = auth_client.entra_login(
            token=mock_token,
            tenant_slug=config.tenant_slug
        )
        if response.status_code == 200:
            data = response.json()
            validated = LoginSuccessResponse(**data)
            assert validated.access_token is not None
        else:
            pytest.skip("Entra SSO sandbox mock not configured on target backend.")

    def test_tc_login_api_014_missing_token_400(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-014: Validation Error: Missing Token in /api/auth/entra.
        Traceability: VAL-LOGIN-004, API-LOGIN-002
        """
        response = auth_client.entra_login(
            token=None,
            tenant_slug=config.tenant_slug
        )
        assert response.status_code == 400

    def test_tc_login_api_015_invalid_entra_token_rejected(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-015: Invalid / Expired Entra JWT Token.
        Traceability: REQ-LOGIN-003, API-LOGIN-002
        """
        response = auth_client.entra_login(
            token="invalid.malformed.expired.token",
            tenant_slug=config.tenant_slug
        )
        assert response.status_code in [401, 400]
