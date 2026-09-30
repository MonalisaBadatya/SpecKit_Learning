import re
import pytest
from playwright.sync_api import Page, expect
from ..pages.login_page import LoginPage
from ..utils.ui_config import ui_config


@pytest.mark.ui
@pytest.mark.fault_tolerance
class TestOfflineHandling:
    """Backend offline graceful degradation tests."""

    def test_tc_login_ui_018_backend_offline_error_banner_and_retry(
        self, login_page: LoginPage
    ):
        """
        TC-LOGIN-UI-018: Backend Offline Error Banner & Retry Action.
        Traceability: REQ-LOGIN-015, UI-LOGIN-004, Spec §4.5, §5 (TC-LOGIN-08)

        Uses regex route abort pattern to simulate network failure regardless of
        whether the backend is proxied through Next.js or hosted on a separate domain.
        """
        login_page.load_tenant_login(slug=ui_config.tenant_slug)
        login_page.wait_for_login_form(timeout=15000)

        # Regex pattern aborts all auth API requests on any host
        login_page.page.route(
            re.compile(r".*/api/auth/.*"),
            lambda route: route.abort("connectionfailed")
        )

        login_page.login(
            email=ui_config.tenant_user_email,
            password=ui_config.tenant_user_password
        )

        # Verify explicit offline banner renders without app crash
        expect(login_page.offline_banner).to_be_visible(timeout=10000)
        expect(login_page.retry_connection_button).to_be_visible(timeout=5000)
