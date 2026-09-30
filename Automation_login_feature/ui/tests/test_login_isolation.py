import pytest
from playwright.sync_api import Page, expect
from ..pages.login_page import LoginPage
from ..utils.ui_config import ui_config

@pytest.mark.ui
@pytest.mark.isolation
class TestLoginIsolation:
    """Cross-context security boundary tests."""

    def test_tc_login_ui_012_platform_admin_on_tenant_subdomain_blocked(self, login_page: LoginPage):
        """
        TC-LOGIN-UI-012: Cross-Context Isolation: Platform Admin on Tenant Subdomain.
        Traceability: REQ-LOGIN-016, BR-LOGIN-008, BR-LOGIN-009, SEC-LOGIN-006, Spec ?1.1, ?4.3
        """
        login_page.load_tenant_login(slug=ui_config.tenant_slug)
        login_page.login(
            email=ui_config.platform_admin_email,
            password=ui_config.platform_admin_password
        )

        expect(login_page.validation_error).to_be_visible()
        assert "/login" in login_page.get_current_url()

    def test_tc_login_ui_013_tenant_user_on_platform_domain_blocked(self, login_page: LoginPage):
        """
        TC-LOGIN-UI-013: Cross-Context Isolation: Tenant User on Platform Domain.
        Traceability: REQ-LOGIN-016, BR-LOGIN-008, SEC-LOGIN-006, Spec ?1.1, ?4.3
        """
        login_page.load_platform_login()
        login_page.login(
            email=ui_config.tenant_user_email,
            password=ui_config.tenant_user_password
        )

        expect(login_page.validation_error).to_be_visible()
        assert "/login" in login_page.get_current_url()
