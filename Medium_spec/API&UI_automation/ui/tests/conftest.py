import pytest
from playwright.sync_api import Page
from ui.fixtures.browser_fixtures import browser_instance, context, page
from ui.pages.landing_widget_page import LandingWidgetPage
from ui.pages.assignment_drawer_page import AssignmentDrawerPage

@pytest.fixture(scope="function")
def landing_widget_page(page: Page) -> LandingWidgetPage:
    return LandingWidgetPage(page)

@pytest.fixture(scope="function")
def drawer_page(page: Page) -> AssignmentDrawerPage:
    return AssignmentDrawerPage(page)
