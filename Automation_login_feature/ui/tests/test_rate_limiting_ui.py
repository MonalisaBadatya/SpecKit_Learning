import re
import pytest
from playwright.sync_api import Page, expect
from ..pages.login_page import LoginPage
from ..utils.ui_config import ui_config

@pytest.mark.ui
@pytest.mark.security
class TestRateLimitingUi:
    """UI rate limiting feedback and throttling handling."""

    def test_tc_login_ui_021_rapid_submission_rate_limit_ui(self, login_page: LoginPage):
        """
        TC-LOGIN-UI-021: Rapid Submission Rate Limit UI Handling.
        Traceability: SEC-LOGIN-001, Spec §3.1, §4.1
        """
        login_page.load_tenant_login(slug=ui_config.tenant_slug)
        login_page.wait_for_login_form(timeout=15000)

        # Mock 6th request returning HTTP 429 Too Many Requests
        request_count = {"count": 0}
        def handle_auth(route):
            request_count["count"] += 1
            if request_count["count"] >= 6:
                route.fulfill(
                    status=429,
                    content_type="application/json",
                    body='{"error": "Too Many Requests", "statusCode": 429, "message": "Rate limit exceeded"}'
                )
            else:
                route.fulfill(
                    status=401,
                    content_type="application/json",
                    body='{"error": "Unauthorized", "statusCode": 401, "message": "Invalid credentials"}'
                )

        login_page.page.route(re.compile(r".*/api/auth/login.*"), handle_auth)

        for _ in range(6):
            login_page.login(email=ui_config.tenant_user_email, password="WrongPassword123!")

        # Expect error display without browser crash
        expect(login_page.validation_error.or_(login_page.page.locator(".text-red-500, [role='alert']"))).to_be_visible()
        assert "/login" in login_page.get_current_url()
