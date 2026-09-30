import pytest
from playwright.sync_api import Page, expect
from ..pages.login_page import LoginPage
from ..utils.ui_config import ui_config


@pytest.mark.ui
@pytest.mark.branding
class TestTenantBranding:
    """Dynamic tenant branding and custom theme rendering tests."""

    def test_tc_login_ui_019_dynamic_tenant_branding_rendering(
        self, login_page: LoginPage
    ):
        """
        TC-LOGIN-UI-019: Dynamic Tenant Branding & Theme Rendering.
        Traceability: REQ-LOGIN-009, UI-LOGIN-008, Spec §3.4

        Live Aria snapshot confirmed the app renders:
          <img alt="Danis" src="...logo...svg"/>
        We assert this branded image is visible after the tenant login page loads.
        """
        login_page.load_tenant_login(slug=ui_config.tenant_slug)
        login_page.wait_for_login_form(timeout=20000)

        # App renders <img alt="<TenantName>"> as the tenant logo (verified via Aria snapshot)
        # Use the tenant name from config as the accessible alt text value
        tenant_name = ui_config.tenant_slug.capitalize()  # e.g. "Danis"
        tenant_logo = login_page.page.get_by_role("img", name=tenant_name, exact=True)
        expect(tenant_logo).to_be_visible(timeout=5000)
