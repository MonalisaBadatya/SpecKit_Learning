import pytest
from playwright.sync_api import Page, expect
from ..pages.login_page import LoginPage
from ..utils.ui_config import ui_config

@pytest.mark.ui
@pytest.mark.auth
class TestLoginNegative:
    """Negative authentication and status rejection tests."""

    def test_tc_login_ui_006_invalid_password_rejection(self, login_page: LoginPage):
        """
        TC-LOGIN-UI-006: Invalid Password / Credentials Rejection.
        Traceability: UI-LOGIN-003, Spec ?5 (TC-LOGIN-03)
        """
        login_page.load_tenant_login(slug=ui_config.tenant_slug)
        login_page.login(email=ui_config.tenant_user_email, password="IncorrectPassword999!")

        # Expect inline error and stay on login page
        expect(login_page.validation_error.or_(login_page.page.locator(".text-red-500"))).to_be_visible()
        assert "/login" in login_page.get_current_url()
        assert login_page.get_cookie("cmma_session") is None

    def test_tc_login_ui_007_deactivated_tenant_account_blocked(self, login_page: LoginPage):
        """
        TC-LOGIN-UI-007: Deactivated Tenant Account Login Blocked.
        Traceability: REQ-LOGIN-002, DB-LOGIN-003, Spec ?2.1, ?3.1
        """
        login_page.load_tenant_login(slug=ui_config.tenant_slug)
        login_page.login(email=ui_config.deactivated_user_email, password="ValidPassword123!")

        expect(login_page.validation_error).to_be_visible()
        assert "/login" in login_page.get_current_url()

    def test_tc_login_ui_011_sso_enforced_account_blocked_from_local_login(self, login_page: LoginPage):
        """
        TC-LOGIN-UI-011: SSO-Enforced Account Local Password Blocked.
        Traceability: REQ-LOGIN-017, BR-LOGIN-010, SEC-LOGIN-007, Spec ?4.3
        """
        login_page.load_tenant_login(slug=ui_config.tenant_slug)
        login_page.login(email=ui_config.sso_user_email, password="AnyPassword123!")

        expect(login_page.validation_error).to_be_visible()
        assert "/login" in login_page.get_current_url()
