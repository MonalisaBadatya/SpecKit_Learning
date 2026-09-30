from typing import Optional, Dict, Any
from playwright.sync_api import Page, Locator, Response, expect
from ..utils.ui_config import ui_config

class BasePage:
    """Base Page Object providing shared browser interactions and wait mechanisms."""

    def __init__(self, page: Page):
        self.page = page
        self.page.set_default_timeout(ui_config.default_timeout)

    def navigate_to(self, url: str) -> Optional[Response]:
        return self.page.goto(url, wait_until="domcontentloaded")

    def get_current_url(self) -> str:
        return self.page.url

    def get_cookies(self) -> list:
        return self.page.context.cookies()

    def get_cookie(self, name: str) -> Optional[Dict[str, Any]]:
        cookies = self.get_cookies()
        for c in cookies:
            if c.get("name") == name:
                return c
        return None

    def clear_browser_storage(self):
        self.page.evaluate("() => { localStorage.clear(); sessionStorage.clear(); }")

    def get_session_storage_keys(self) -> list:
        return self.page.evaluate("() => Object.keys(sessionStorage)")

    def get_local_storage_keys(self) -> list:
        return self.page.evaluate("() => Object.keys(localStorage)")
