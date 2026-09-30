"""
OrderOnlinePage Page Object representing online ordering, location search, and ordering login flow.
"""

from playwright.sync_api import Page, expect
from tests.pages.base_page import BasePage


class OrderOnlinePage(BasePage):
    """
    Page Object for Order Online Location Search and Ordering Menu Context.
    """

    # Location Search Locators
    SEARCH_INPUT = 'input[placeholder*="location" i], input[placeholder*="zip" i], input[name="location"], input.search-input'
    SEARCH_BUTTON = 'button[type="submit"], button.search-btn, button:has-text("Search"), .search-icon'
    STORE_RESULT_CARDS = '.store-card, .location-card, .restaurant-item, .store-location'
    STORE_ORDER_BUTTON = '.store-card button:has-text("Order"), .restaurant-item a:has-text("Order"), button:has-text("ORDER ONLINE")'
    NO_RESULTS_MESSAGE = '.no-results, .empty-state, :text-matches("no restaurants|no locations|no results", "i")'
    INLINE_VALIDATION_MESSAGE = '.validation-error, .field-error, :text-matches("enter a location|required", "i")'

    # Ordering Flow Login Locators
    LOGIN_BUTTON = 'header button:has-text("Login"), nav a:has-text("Login"), button.btn-login'
    LOGIN_MODAL = '.login-modal, .login-container, form#login-form, .auth-modal'
    INPUT_USERNAME = 'input[name="email" i], input[name="username" i], input[type="email"]'
    INPUT_PASSWORD = 'input[name="password" i], input[type="password"]'
    BUTTON_SUBMIT_LOGIN = 'button[type="submit"]:has-text("Log In"), button:has-text("Sign In"), button#submit-login'
    LOGIN_ERROR_BANNER = '.error-message, .alert-danger, .login-error, :text-matches("invalid credentials|wrong password", "i")'
    USER_PROFILE_INDICATOR = '.user-profile, .account-menu, :text("My Account"), .logged-in-user'

    def __init__(self, page: Page):
        super().__init__(page)

    def search_location(self, query: str) -> None:
        """Enter search query and submit location search."""
        self.fill(self.SEARCH_INPUT, query)
        self.click(self.SEARCH_BUTTON)

    def get_search_results_count(self) -> int:
        """Return the number of displayed location result cards."""
        cards = self.page.locator(self.STORE_RESULT_CARDS)
        cards.first.wait_for(state="visible", timeout=10000)
        return cards.count()

    def is_no_results_displayed(self) -> bool:
        """Check if no-results empty state message is visible."""
        return self.is_visible(self.NO_RESULTS_MESSAGE)

    def is_inline_validation_displayed(self) -> bool:
        """Check if inline search validation message is visible."""
        return self.is_visible(self.INLINE_VALIDATION_MESSAGE)

    def select_first_restaurant_order(self) -> None:
        """Click Order button on the first returned store card."""
        order_btn = self.page.locator(self.STORE_ORDER_BUTTON).first
        order_btn.click()

    def is_ordering_login_button_enabled(self) -> bool:
        """Verify ordering header Login button is visible and enabled."""
        return self.is_visible(self.LOGIN_BUTTON) and self.is_enabled(self.LOGIN_BUTTON)

    def open_login_modal(self) -> None:
        """Click Login button to display login interface."""
        self.click(self.LOGIN_BUTTON)

    def is_login_modal_visible(self) -> bool:
        """Verify login form container is displayed."""
        return self.is_visible(self.LOGIN_MODAL) or self.is_visible(self.INPUT_USERNAME)

    def login(self, username: str, password: str) -> None:
        """Fill credentials and submit login form."""
        if not self.is_login_modal_visible():
            self.open_login_modal()
        self.fill(self.INPUT_USERNAME, username)
        self.fill(self.INPUT_PASSWORD, password)
        self.click(self.BUTTON_SUBMIT_LOGIN)

    def is_user_authenticated(self) -> bool:
        """Verify successful user authentication indicator."""
        return self.is_visible(self.USER_PROFILE_INDICATOR) or not self.is_visible(self.LOGIN_BUTTON)

    def get_login_error_message(self) -> str:
        """Return error text when login authentication fails."""
        locator = self.page.locator(self.LOGIN_ERROR_BANNER)
        locator.first.wait_for(state="visible")
        return locator.first.inner_text()
