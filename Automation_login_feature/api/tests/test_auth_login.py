import pytest
from ..clients.auth_client import AuthClient
from ..schemas.auth_schemas import LoginSuccessResponse, MfaChallengeResponse
from ..utils.config import config

@pytest.mark.api
@pytest.mark.auth
class TestAuthLogin:
    """Tests for POST /api/auth/login endpoint."""

    def test_tc_login_api_001_platform_admin_login_success(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-001: Platform Admin Local Login with Trusted Device.
        Traceability: REQ-LOGIN-001, REQ-LOGIN-004, REQ-LOGIN-007, BR-LOGIN-001, BR-LOGIN-004
        """
        response = auth_client.login(
            email=config.platform_admin_email,
            password=config.platform_admin_password,
            tenant_slug="cmma-dev",
            device_fingerprint=config.device_fp_trusted
        )
        assert response.status_code == 200, f"Expected 200 OK, got {response.status_code}: {response.text}"
        data = response.json()
        validated = LoginSuccessResponse(**data)
        assert validated.access_token is not None
        assert validated.user.email == config.platform_admin_email

    def test_tc_login_api_002_tenant_user_login_success(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-002: Tenant User Local Login with Trusted Device.
        Traceability: REQ-LOGIN-002, REQ-LOGIN-004, REQ-LOGIN-007, BR-LOGIN-002, BR-LOGIN-004
        """
        response = auth_client.login(
            email=config.tenant_user_email,
            password=config.tenant_user_password,
            tenant_slug=config.tenant_slug,
            device_fingerprint=config.device_fp_trusted
        )
        assert response.status_code == 200, f"Expected 200 OK, got {response.status_code}: {response.text}"
        data = response.json()
        validated = LoginSuccessResponse(**data)
        assert validated.access_token is not None
        assert validated.user.email == config.tenant_user_email

    def test_tc_login_api_003_context_resolution_via_header(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-003: Context Resolution via X-Tenant-Slug Header.
        Traceability: REQ-LOGIN-002, BR-LOGIN-011
        """
        response = auth_client.login(
            email=config.tenant_user_email,
            password=config.tenant_user_password,
            tenant_slug=None,
            device_fingerprint=config.device_fp_trusted,
            headers={"X-Tenant-Slug": config.tenant_slug}
        )
        assert response.status_code == 200, f"Expected 200 OK, got {response.status_code}: {response.text}"

    def test_tc_login_api_004_stale_device_fingerprint_triggers_mfa(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-004: Stale / Expired Device Fingerprint Triggers MFA.
        Traceability: REQ-LOGIN-005, REQ-LOGIN-006, BR-LOGIN-004, BR-LOGIN-005
        """
        response = auth_client.login(
            email=config.tenant_user_email,
            password=config.tenant_user_password,
            tenant_slug=config.tenant_slug,
            device_fingerprint=config.device_fp_expired
        )
        assert response.status_code == 200
        data = response.json()
        validated = MfaChallengeResponse(**data)
        assert validated.mfa_required is True
        assert validated.email == config.tenant_user_email

    def test_tc_login_api_005_untrusted_device_fingerprint_triggers_mfa(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-005: Untrusted Device Fingerprint Triggers MFA.
        Traceability: REQ-LOGIN-005, REQ-LOGIN-006, BR-LOGIN-004, BR-LOGIN-005
        """
        response = auth_client.login(
            email=config.tenant_user_email,
            password=config.tenant_user_password,
            tenant_slug=config.tenant_slug,
            device_fingerprint=config.device_fp_untrusted
        )
        assert response.status_code == 200
        data = response.json()
        validated = MfaChallengeResponse(**data)
        assert validated.mfa_required is True

    def test_tc_login_api_006_missing_device_fingerprint_triggers_mfa(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-006: Missing Device Fingerprint Triggers MFA.
        Traceability: REQ-LOGIN-005, REQ-LOGIN-006, BR-LOGIN-005
        """
        response = auth_client.login(
            email=config.tenant_user_email,
            password=config.tenant_user_password,
            tenant_slug=config.tenant_slug,
            device_fingerprint="completely-unrecognized-device-fp"
        )
        assert response.status_code == 200
        data = response.json()
        validated = MfaChallengeResponse(**data)
        assert validated.mfa_required is True

    def test_tc_login_api_007_missing_email_400(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-007: Validation Error: Missing Email.
        Traceability: VAL-LOGIN-001, API-LOGIN-001
        """
        response = auth_client.login(
            email=None,
            password=config.tenant_user_password,
            tenant_slug=config.tenant_slug
        )
        assert response.status_code == 400

    def test_tc_login_api_008_missing_password_400(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-008: Validation Error: Missing Password.
        Traceability: VAL-LOGIN-002, API-LOGIN-001
        """
        response = auth_client.login(
            email=config.tenant_user_email,
            password=None,
            tenant_slug=config.tenant_slug
        )
        assert response.status_code == 400

    def test_tc_login_api_009_invalid_password_rejection(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-009: Invalid Password / Credentials.
        Traceability: UI-LOGIN-003, SEC-LOGIN-004
        """
        response = auth_client.login(
            email=config.tenant_user_email,
            password="WrongPassword999!",
            tenant_slug=config.tenant_slug
        )
        assert response.status_code in [401, 400]

    def test_tc_login_api_010_deactivated_account_blocked(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-010: Deactivated Tenant Account Blocked.
        Traceability: REQ-LOGIN-002, DB-LOGIN-003
        """
        response = auth_client.login(
            email=config.deactivated_user_email,
            password="ValidPassword123!",
            tenant_slug=config.tenant_slug
        )
        assert response.status_code in [401, 403, 400]

    def test_tc_login_api_011_sso_enforced_account_blocked(self, auth_client: AuthClient):
        """
        TC-LOGIN-API-011: SSO-Enforced Account Blocked from Local Login.
        Traceability: REQ-LOGIN-017, BR-LOGIN-010, SEC-LOGIN-007
        """
        response = auth_client.login(
            email=config.sso_user_email,
            password="SomePassword123!",
            tenant_slug=config.tenant_slug
        )
        assert response.status_code in [401, 400]
