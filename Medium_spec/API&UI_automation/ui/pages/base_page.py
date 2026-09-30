from typing import Optional, Dict, Any
from playwright.sync_api import Page, Locator, Response
from ..utils.ui_config import ui_config

class BasePage:
    """Base Page Object with common navigation, storage and wait utilities."""

    def __init__(self, page: Page):
        self.page = page
        self.page.set_default_timeout(ui_config.default_timeout)

    def navigate_to(self, url: str) -> Optional[Response]:
        return self.page.goto(url, wait_until="domcontentloaded")

    def get_current_url(self) -> str:
        return self.page.url
