import pytest
from playwright.sync_api import Page, expect
from ..pages.login_page import LoginPage
from ..utils.ui_config import ui_config


@pytest.mark.ui
@pytest.mark.route_protection
class TestRouteProtection:
    """Next.js middleware route protection and redirect guards.

    BUG-001: /dashboard returns Next.js 404 (not redirected to /login).
    BUG-003: Injecting session cookie stalls /login in 'Setting up your session'
             loading state instead of redirecting to dashboard.
    These tests correctly FAIL as APPLICATION DEFECTs per the spec.
    """

    def test_tc_login_ui_014_authenticated_user_redirect_guard(
        self, page: Page, login_page: LoginPage
    ):
        """
        TC-LOGIN-UI-014: Authenticated User Redirect Guard (/login -> /).
        Spec: An authenticated session cookie on /login must redirect to /.
        Traceability: REQ-LOGIN-014, SES-LOGIN-007, UI-LOGIN-005, Spec §4.4, §5 (TC-LOGIN-05)

        Known Defect (BUG-003): App stalls in 'Setting up your session' loading state
        on /login instead of redirecting to dashboard. FAIL = APPLICATION DEFECT.
        """
        page.context.add_cookies([{
            "name": "cmma_session",
            "value": "valid_dummy_session_token",
            "domain": "danis-cmma-dev.cosdevx.com",
            "path": "/",
            "httpOnly": True,
            "secure": True,
            "sameSite": "Lax"
        }])

        login_page.load_tenant_login(slug=ui_config.tenant_slug)

        # Spec §4.4 REQ: middleware must redirect authenticated user away from /login
        expect(page).not_to_have_url(
            f"{ui_config.get_tenant_url(ui_config.tenant_slug)}/login",
            timeout=8000
        )
        expect(login_page.sign_in_button).not_to_be_visible(timeout=8000)

    def test_tc_login_ui_015_unauthenticated_route_guard(
        self, page: Page, login_page: LoginPage
    ):
        """
        TC-LOGIN-UI-015: Unauthenticated Route Protection Guard (/dashboard -> /login).
        Spec: Navigating to a protected route without session must redirect to /login.
        Traceability: REQ-LOGIN-013, SES-LOGIN-006, Spec §1.1, §4.4

        Known Defect (BUG-001): /dashboard renders Next.js 404 page instead of
        middleware intercepting the route and redirecting to /login. FAIL = APPLICATION DEFECT.
        """
        page.goto(f"{ui_config.get_tenant_url(ui_config.tenant_slug)}/dashboard")

        # Spec §4.4 REQ: unauthenticated access must land on /login (not a 404)
        expect(page).to_have_url(
            f"{ui_config.get_tenant_url(ui_config.tenant_slug)}/login",
            timeout=8000
        )
        expect(login_page.sign_in_button).to_be_visible(timeout=8000)
