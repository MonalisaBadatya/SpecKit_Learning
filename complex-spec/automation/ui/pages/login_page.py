"""Login Page Object for CMMA authentication.

Prerequisites: complex-spec/test-results/test-cases/UI/EffectiveDate_Reassign_Unassign_UI_TestCases.md
"""
from playwright.sync_api import Page
from .base_page import BasePage
from utils.ui_config import ui_config


class LoginPage(BasePage):
    """Page object for application authentication."""

    def __init__(self, page: Page):
        super().__init__(page)
        self.email_input = self.page.get_by_label("Email Address", exact=False)
        self.password_input = self.page.get_by_label("Password", exact=False)
        self.login_button = self.page.get_by_role("button", name="Sign In", exact=True)

    def login(self, email: str = None, password: str = None):
        """Logs into CMMA using credentials from configuration."""
        user_email = email or ui_config.user_email
        user_password = password or ui_config.user_password
        self.navigate_to(f"{ui_config.base_url}/login" if not ui_config.base_url.endswith("/login") else ui_config.base_url)
        self.email_input.fill(user_email)
        self.password_input.fill(user_password)
        self.login_button.click()
        # Wait for navigation/redirection after login
        self.page.wait_for_load_state("domcontentloaded")
