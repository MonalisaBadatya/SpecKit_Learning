import re
import pytest
from playwright.sync_api import Page, expect
from ..pages.login_page import LoginPage
from ..pages.dashboard_page import DashboardPage
from ..pages.mfa_modal import MfaModal
from ..utils.ui_config import ui_config


@pytest.mark.ui
@pytest.mark.auth
class TestLoginHappyPath:
    """Happy path authentication tests for Platform Admin and Tenant User.

    NOTE: These tests require seeded test credentials in the dev sandbox.
    Failure with 401 = TEST DATA ISSUE (ENV-001): unseeded sandbox users.
    Failure with loading screen on platform login = APPLICATION DEFECT (BUG-003).
    """

    def test_tc_login_ui_001_platform_admin_login_happy_path(
        self, login_page: LoginPage, dashboard_page: DashboardPage
    ):
        """
        TC-LOGIN-UI-001: Platform Admin Local Login with pre-trusted device fingerprint.
        Traceability: REQ-LOGIN-001, REQ-LOGIN-004, REQ-LOGIN-007, REQ-LOGIN-010,
                      Spec §1.1, §5 (TC-LOGIN-02)

        Known Defect (BUG-003): Platform login page shows 'Setting up your session'
        loading screen that does not resolve to the login form = APPLICATION DEFECT.
        """
        login_page.load_platform_login()

        # Wait for login form past loading screen (BUG-003: platform stalls here)
        login_page.wait_for_login_form(timeout=15000)
        expect(login_page.sign_in_button).to_be_visible()

        login_page.login(
            email=ui_config.platform_admin_email,
            password=ui_config.platform_admin_password
        )

        # Verify redirect away from /login upon successful login
        expect(login_page.page).not_to_have_url(re.compile(r".*/login$"), timeout=10000)
        cookie = login_page.get_cookie("cmma_session")
        assert cookie is not None, "Expected cmma_session cookie to be present post-login"
        assert cookie.get("httpOnly") is True

    def test_tc_login_ui_002_tenant_user_login_happy_path(
        self, login_page: LoginPage, dashboard_page: DashboardPage, mfa_modal: MfaModal
    ):
        """
        TC-LOGIN-UI-002: Tenant User Local Login with pre-trusted device fingerprint.
        Traceability: REQ-LOGIN-002, REQ-LOGIN-004, REQ-LOGIN-007, REQ-LOGIN-010,
                      Spec §1.1, §5 (TC-LOGIN-01)

        Known Issue (ENV-001): Returns 401 if test credentials are unseeded in dev sandbox.
        """
        login_page.load_tenant_login(slug=ui_config.tenant_slug)
        login_page.wait_for_login_form(timeout=15000)
        expect(login_page.sign_in_button).to_be_visible()

        login_page.login(
            email=ui_config.tenant_user_email,
            password=ui_config.tenant_user_password
        )

        # Successful credential authentication navigates away from /login
        expect(login_page.page).not_to_have_url(re.compile(r".*/login$"), timeout=15000)

        # Check whether challenged with MFA (for fresh browser sessions) or direct dashboard
        if "/mfa/verify" in login_page.page.url:
            expect(mfa_modal.heading).to_be_visible(timeout=10000)
            expect(login_page.page.get_by_text(ui_config.tenant_user_email)).to_be_visible(timeout=5000)
            expect(mfa_modal.otp_inputs.first).to_be_visible(timeout=5000)
            expect(mfa_modal.back_to_sign_in_button).to_be_visible(timeout=5000)
        else:
            expect(login_page.page).to_have_url(
                f"{ui_config.get_tenant_url(ui_config.tenant_slug)}/",
                timeout=10000
            )
            cookie = login_page.get_cookie("cmma_session")
            assert cookie is not None, "Expected cmma_session cookie to be set for tenant user"
