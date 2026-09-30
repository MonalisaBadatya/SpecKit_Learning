"""Base Page Object providing standard Playwright interactions."""
from typing import Optional
from playwright.sync_api import Page, Response, Locator
from utils.ui_config import ui_config


class BasePage:
    """Base Page Object class with standard locator helpers and timeout configuration."""

    def __init__(self, page: Page):
        self.page = page
        self.page.set_default_timeout(ui_config.default_timeout)

    def navigate_to(self, url: str) -> Optional[Response]:
        """Navigates to the specified URL awaiting DOM content load."""
        return self.page.goto(url, wait_until="domcontentloaded")

    def get_current_url(self) -> str:
        """Returns the current page URL."""
        return self.page.url

    def wait_for_url(self, url_pattern: str, timeout: Optional[int] = None):
        """Waits for page URL to match the given pattern."""
        self.page.wait_for_url(url_pattern, timeout=timeout or ui_config.default_timeout)

    def reload(self) -> Optional[Response]:
        """Reloads the current page."""
        return self.page.reload(wait_until="domcontentloaded")
