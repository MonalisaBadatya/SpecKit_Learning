"""
Pytest configuration and Playwright fixtures for Steak 'n Shake UI Automation.
"""

import pytest
from playwright.sync_api import Browser, BrowserContext, Page, Playwright
from tests.config import BASE_URL, DEFAULT_TIMEOUT, NAVIGATION_TIMEOUT


@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    """
    Override default browser context arguments.
    """
    return {
        **browser_context_args,
        "viewport": {"width": 1920, "height": 1080},
        "ignore_https_errors": True,
    }


@pytest.fixture(scope="function")
def page(context: BrowserContext) -> Page:
    """
    Function-scoped Playwright Page fixture with configured timeouts.
    """
    page = context.new_page()
    page.set_default_timeout(DEFAULT_TIMEOUT)
    page.set_default_navigation_timeout(NAVIGATION_TIMEOUT)
    page.goto(BASE_URL)
    yield page
    page.close()


@pytest.fixture(scope="function")
def desktop_page(browser: Browser) -> Page:
    """
    Page fixture configured explicitly for Desktop viewport (1920x1080).
    """
    context = browser.new_context(viewport={"width": 1920, "height": 1080})
    page = context.new_page()
    page.set_default_timeout(DEFAULT_TIMEOUT)
    page.goto(BASE_URL)
    yield page
    context.close()


@pytest.fixture(scope="function")
def mobile_page(browser: Browser) -> Page:
    """
    Page fixture configured explicitly for Mobile viewport (375x667 - iPhone 12 resolution).
    """
    context = browser.new_context(
        viewport={"width": 375, "height": 667},
        user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.8 Mobile/15E148 Safari/604.1",
        is_mobile=True,
    )
    page = context.new_page()
    page.set_default_timeout(DEFAULT_TIMEOUT)
    page.goto(BASE_URL)
    yield page
    context.close()


@pytest.fixture(scope="function")
def small_mobile_page(browser: Browser) -> Page:
    """
    Page fixture configured explicitly for small Mobile viewport (320x568).
    """
    context = browser.new_context(
        viewport={"width": 320, "height": 568},
        is_mobile=True,
    )
    page = context.new_page()
    page.set_default_timeout(DEFAULT_TIMEOUT)
    page.goto(BASE_URL)
    yield page
    context.close()
