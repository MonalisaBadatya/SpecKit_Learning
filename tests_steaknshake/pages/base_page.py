"""
BasePage class providing core Playwright interaction helpers and synchronization.
"""

from typing import Callable, Tuple
from playwright.sync_api import Page, Response, expect
from tests.config import DEFAULT_TIMEOUT


class BasePage:
    """
    Encapsulates Playwright Page object and exposes robust, maintainable UI interactions.
    """

    def __init__(self, page: Page):
        self.page = page

    def navigate(self, url: str) -> None:
        """Navigate to a specified URL."""
        self.page.goto(url)

    def get_url(self) -> str:
        """Return the current page URL."""
        return self.page.url

    def get_title(self) -> str:
        """Return the current page title."""
        return self.page.title()

    def click(self, selector: str) -> None:
        """Click an element identified by selector with Playwright auto-waiting."""
        locator = self.page.locator(selector)
        locator.scroll_into_view_if_needed()
        locator.click()

    def fill(self, selector: str, text: str) -> None:
        """Fill text into an input field after clearing existing value."""
        locator = self.page.locator(selector)
        locator.scroll_into_view_if_needed()
        locator.fill(text)

    def is_visible(self, selector: str) -> bool:
        """Check if an element is visible on the page."""
        return self.page.locator(selector).is_visible()

    def is_enabled(self, selector: str) -> bool:
        """Check if an interactive element is enabled."""
        return self.page.locator(selector).is_enabled()

    def wait_for_url_contains(self, fragment: str, timeout: int = DEFAULT_TIMEOUT) -> None:
        """Wait explicitly until current URL contains the target fragment."""
        expect(self.page).to_have_url(lambda url: fragment.lower() in url.lower(), timeout=timeout)

    def expect_new_tab(self, click_action: Callable[[], None]) -> Page:
        """
        Execute a click action and capture the newly opened browser tab/popup.
        """
        with self.page.context.expect_page() as new_page_info:
            click_action()
        new_page = new_page_info.value
        new_page.wait_for_load_state("domcontentloaded")
        return new_page

    def expect_pdf_response(self, click_action: Callable[[], None]) -> Response:
        """
        Execute a click action and capture the PDF network response.
        """
        with self.page.expect_response(
            lambda response: response.status == 200 or "application/pdf" in response.headers.get("content-type", "")
        ) as response_info:
            click_action()
        return response_info.value

    def press_key(self, key: str) -> None:
        """Press a keyboard key."""
        self.page.keyboard.press(key)

    def scroll_to_element(self, selector: str) -> None:
        """Scroll an element into the viewport."""
        self.page.locator(selector).scroll_into_view_if_needed()

    def get_attribute(self, selector: str, name: str) -> str:
        """Get attribute value of an element."""
        return self.page.locator(selector).get_attribute(name) or ""
