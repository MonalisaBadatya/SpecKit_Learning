from typing import Optional
from playwright.sync_api import Page, Locator, expect
from .base_page import BasePage
from ..utils.ui_config import ui_config


class LoginPage(BasePage):
    """Page Object Model for CMMA Platform Login Page (/login).

    Locator notes (from live Aria snapshots):
    - Sign In button: exact=True prevents matching 'Sign in with Microsoft' (AUTO-001 fix)
    - Email input: MUI TextField renders textbox with accessible label, not type='email'
    - validation_error: Next.js injects a hidden route-announcer div with role='alert';
      filter to only visible, non-empty alerts to avoid strict-mode violation
    - tenant_logo: img with specific alt text (tenant name); not a generic img[alt]
    """

    def __init__(self, page: Page):
        super().__init__(page)

    @property
    def email_input(self) -> Locator:
        # MUI TextField is rendered as a textbox with accessible label, not type='email'
        return self.page.get_by_label("Email Address", exact=False)

    @property
    def password_input(self) -> Locator:
        # MUI TextField is rendered as a textbox with accessible label, not type='password'
        return self.page.get_by_label("Password", exact=False)

    @property
    def sign_in_button(self) -> Locator:
        # exact=True prevents matching 'Sign in with Microsoft' (Entra SSO button)
        return self.page.get_by_role("button", name="Sign In", exact=True)

    @property
    def validation_error(self) -> Locator:
        # Next.js injects a hidden role='alert' announcer (#__next-route-announcer__).
        # Filter by visibility to only match real, user-facing alert content.
        return self.page.get_by_role("alert").filter(has_not_text="").locator("visible=true")

    @property
    def offline_banner(self) -> Locator:
        return self.page.get_by_text("Backend Server Offline", exact=False).or_(
            self.page.get_by_text("Verification Failed", exact=False)
        ).or_(
            self.page.get_by_text("Failed to fetch", exact=False)
        ).first

    @property
    def retry_connection_button(self) -> Locator:
        return self.page.get_by_role("button", name="Retry Connection", exact=True).or_(
            self.page.get_by_role("button", name="Back to Sign In", exact=False)
        ).first

    @property
    def mock_mode_banner(self) -> Locator:
        return self.page.locator(".mock-mode-banner, [data-testid='mock-banner']").or_(
            self.page.get_by_text("Mock Mode", exact=False)
        )

    @property
    def tenant_logo(self) -> Locator:
        # Live Aria snapshot shows: <img alt="Danis"> (tenant name is the alt text)
        # Use get_by_role to match only img elements with non-empty alt attributes
        return self.page.get_by_role("img").filter(has_not_text="").first

    @property
    def tenant_heading(self) -> Locator:
        return self.page.locator(".tenant-name, h1, h2, h5, h6").first

    def load_platform_login(self):
        url = f"{ui_config.platform_base_url}/login"
        self.navigate_to(url)

    def load_tenant_login(self, slug: str = None):
        url = f"{ui_config.get_tenant_url(slug)}/login"
        self.navigate_to(url)

    def wait_for_login_form(self, timeout: int = 10000):
        """Wait for the login form to fully render past any loading screens."""
        self.page.wait_for_selector(
            "[aria-label='Email Address'], input[type='email'], label:has-text('Email')",
            timeout=timeout
        )

    def login(self, email: Optional[str], password: Optional[str]):
        if email is not None:
            self.email_input.fill(email)
        else:
            self.email_input.clear()

        if password is not None:
            self.password_input.fill(password)
        else:
            self.password_input.clear()

        self.sign_in_button.click()
