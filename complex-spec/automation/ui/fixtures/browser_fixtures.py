import os
import pytest
from playwright.sync_api import sync_playwright, Browser, BrowserContext, Page
from utils.ui_config import ui_config
from pages.login_page import LoginPage
from pages.assignments_page import AssignmentsPage

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
UI_DIR = os.path.dirname(CURRENT_DIR)
STORAGE_STATE_PATH = os.path.join(UI_DIR, "storage_state.json")


@pytest.fixture(scope="session")
def browser_instance():
    """Initializes Playwright browser session."""
    with sync_playwright() as p:
        browser_type = getattr(p, ui_config.browser_type)
        browser = browser_type.launch(
            headless=ui_config.headless,
            slow_mo=ui_config.slow_mo
        )
        yield browser
        browser.close()


@pytest.fixture(scope="function")
def context(browser_instance: Browser) -> BrowserContext:
    """Creates an isolated browser context per test with HAR recording."""

    har_dir = os.path.join(UI_DIR, "performance", "har")
    os.makedirs(har_dir, exist_ok=True)

    har_path = os.path.join(
        har_dir,
        "edru.har"
    )

    kwargs = {
        "ignore_https_errors": True,
        "viewport": {
            "width": 1280,
            "height": 800
        },
        "record_har_path": har_path,
        "record_har_mode": "full",
    }

    if os.path.exists(STORAGE_STATE_PATH):
        kwargs["storage_state"] = STORAGE_STATE_PATH

    ctx = browser_instance.new_context(**kwargs)

    yield ctx

    ctx.close()


@pytest.fixture(scope="function")
def page(context: BrowserContext) -> Page:
    """Creates a new page in the current browser context."""
    pg = context.new_page()
    yield pg
    pg.close()


@pytest.fixture(scope="function")
def assignments_page(page: Page) -> AssignmentsPage:
    """Provides an authenticated AssignmentsPage instance loaded and ready for interaction."""
    if not os.path.exists(STORAGE_STATE_PATH):
        login_pg = LoginPage(page)
        login_pg.login()
    assign_pg = AssignmentsPage(page)
    assign_pg.navigate_to_assignments()
    return assign_pg
