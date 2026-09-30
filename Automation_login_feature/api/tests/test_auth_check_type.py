import pytest
from ..clients.auth_client import AuthClient
from ..schemas.auth_schemas import CheckAuthTypeResponse
from ..utils.config import config

@pytest.mark.api
@pytest.mark.auth
class TestAuthCheckType:
    """Tests for POST /api/auth/check-auth-type endpoint."""

    def test_tc_login_api_017_resolve_local_type(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-017: Resolve Account with LOCAL Auth Type.
        Traceability: REQ-LOGIN-008, API-LOGIN-003
        """
        response = auth_client.check_auth_type(
            email=config.tenant_user_email,
            tenant_slug=config.tenant_slug
        )
        assert response.status_code == 200
        data = response.json()
        validated = CheckAuthTypeResponse(**data)
        assert validated.authType == "LOCAL"
        assert validated.isSso is False

    def test_tc_login_api_018_resolve_entra_type(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-018: Resolve Account with ENTRA SSO Auth Type.
        Traceability: REQ-LOGIN-008, API-LOGIN-003
        """
        response = auth_client.check_auth_type(
            email=config.sso_user_email,
            tenant_slug=config.tenant_slug
        )
        assert response.status_code == 200
        data = response.json()
        validated = CheckAuthTypeResponse(**data)
        assert validated.authType == "ENTRA"
        assert validated.isSso is True

    def test_tc_login_api_019_resolve_disabled_state(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-019: Resolve DISABLED Account State.
        Traceability: REQ-LOGIN-008, API-LOGIN-003
        """
        response = auth_client.check_auth_type(
            email=config.deactivated_user_email,
            tenant_slug=config.tenant_slug
        )
        assert response.status_code == 200
        data = response.json()
        validated = CheckAuthTypeResponse(**data)
        assert validated.authType == "DISABLED"
        assert validated.isDisabled is True

    def test_tc_login_api_020_resolve_no_account_state(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-020: Resolve NO_ACCOUNT Unprovisioned State.
        Traceability: REQ-LOGIN-008, API-LOGIN-003
        """
        response = auth_client.check_auth_type(
            email="unprovisioned.worker@danis.com",
            tenant_slug=config.tenant_slug
        )
        assert response.status_code == 200
        data = response.json()
        validated = CheckAuthTypeResponse(**data)
        assert validated.authType == "NO_ACCOUNT"
        assert validated.isNoAccount is True

    def test_tc_login_api_021_resolve_not_found_state(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-021: Resolve NOT_FOUND Unassigned Email State.
        Traceability: REQ-LOGIN-008, API-LOGIN-003
        """
        response = auth_client.check_auth_type(
            email="nonexistent.user.12345@danis.com",
            tenant_slug=config.tenant_slug
        )
        assert response.status_code == 200
        data = response.json()
        validated = CheckAuthTypeResponse(**data)
        assert validated.authType == "NOT_FOUND"
        assert validated.notFound is True
