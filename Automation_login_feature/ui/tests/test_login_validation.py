import pytest
from playwright.sync_api import Page, expect
from ..pages.login_page import LoginPage
from ..utils.ui_config import ui_config


@pytest.mark.ui
@pytest.mark.validation
class TestLoginValidation:
    """Client-side field validation tests on login form."""

    def test_tc_login_ui_003_empty_credentials_validation(self, login_page: LoginPage):
        """
        TC-LOGIN-UI-003: Client-Side Empty Credentials Validation.
        Traceability: VAL-LOGIN-003, UI-LOGIN-002, Spec §5 (TC-LOGIN-04)
        """
        login_page.load_tenant_login(slug=ui_config.tenant_slug)
        login_page.wait_for_login_form(timeout=15000)

        # Track network requests to verify suppression
        requests_sent = []
        login_page.page.on(
            "request",
            lambda req: requests_sent.append(req.url) if "/api/auth/login" in req.url else None
        )

        login_page.login(email=None, password=None)

        # MUI renders the validation message as MuiTypography caption span
        expect(
            login_page.page.get_by_text("Please enter both email and password", exact=False)
        ).to_be_visible(timeout=5000)
        assert len(requests_sent) == 0, "Network request to /api/auth/login must be suppressed on empty fields"
        assert "/login" in login_page.get_current_url()

    def test_tc_login_ui_004_empty_password_validation(self, login_page: LoginPage):
        """
        TC-LOGIN-UI-004: Client-Side Empty Password Validation.
        Traceability: VAL-LOGIN-002, UI-LOGIN-002, Spec §3.1, §5 (TC-LOGIN-04)
        """
        login_page.load_tenant_login(slug=ui_config.tenant_slug)
        login_page.wait_for_login_form(timeout=15000)
        login_page.login(email="user@example.com", password=None)

        # Use get_by_text directly to avoid strict-mode collision with Next.js route announcer
        expect(
            login_page.page.get_by_text("Please enter both email and password", exact=False)
        ).to_be_visible(timeout=5000)
        assert "/login" in login_page.get_current_url()

    def test_tc_login_ui_005_empty_email_validation(self, login_page: LoginPage):
        """
        TC-LOGIN-UI-005: Client-Side Empty Email Validation.
        Traceability: VAL-LOGIN-001, UI-LOGIN-002, Spec §3.1, §5 (TC-LOGIN-04)
        """
        login_page.load_tenant_login(slug=ui_config.tenant_slug)
        login_page.wait_for_login_form(timeout=15000)
        login_page.login(email=None, password="SomePassword123!")

        expect(
            login_page.page.get_by_text("Please enter both email and password", exact=False)
        ).to_be_visible(timeout=5000)
        assert "/login" in login_page.get_current_url()
