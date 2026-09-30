import pytest
from playwright.sync_api import sync_playwright, Browser, BrowserContext, Page
from ..utils.ui_config import ui_config

@pytest.fixture(scope="session")
def browser_instance():
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
    ctx = browser_instance.new_context(
        ignore_https_errors=True,
        viewport={"width": 1280, "height": 800}
    )
    yield ctx
    ctx.close()

@pytest.fixture(scope="function")
def page(context: BrowserContext) -> Page:
    pg = context.new_page()
    yield pg
    pg.close()
