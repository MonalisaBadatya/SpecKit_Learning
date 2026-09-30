from playwright.sync_api import Page, Locator, expect
from .base_page import BasePage

class DashboardPage(BasePage):
    """Page Object Model for CMMA Platform Authenticated Dashboard shell."""

    def __init__(self, page: Page):
        super().__init__(page)

    @property
    def header(self) -> Locator:
        return self.page.locator("header, .dashboard-header, nav, h1")

    @property
    def user_menu(self) -> Locator:
        return self.page.locator("[data-testid='user-menu'], .user-profile, .user-avatar, button[aria-haspopup='menu']")

    @property
    def logout_button(self) -> Locator:
        return self.page.get_by_role("button", name="Logout").or_(self.page.get_by_role("menuitem", name="Logout")).or_(self.page.get_by_text("Logout"))

    def logout(self):
        if self.user_menu.is_visible():
            self.user_menu.click()
        self.logout_button.click()
