import pytest
from playwright.sync_api import Page
from ..fixtures.browser_fixtures import browser_instance, context, page
from ..pages.login_page import LoginPage
from ..pages.dashboard_page import DashboardPage
from ..pages.mfa_modal import MfaModal

@pytest.fixture(scope="function")
def login_page(page: Page) -> LoginPage:
    return LoginPage(page)

@pytest.fixture(scope="function")
def dashboard_page(page: Page) -> DashboardPage:
    return DashboardPage(page)

@pytest.fixture(scope="function")
def mfa_modal(page: Page) -> MfaModal:
    return MfaModal(page)
