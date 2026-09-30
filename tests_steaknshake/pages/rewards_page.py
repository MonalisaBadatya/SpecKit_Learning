"""
RewardsPage Page Object representing the Steak 'n Shake Rewards Club landing page and links.
"""

from playwright.sync_api import Page
from tests.pages.base_page import BasePage


class RewardsPage(BasePage):
    """
    Page Object for Rewards Club page and external application distribution links.
    """

    # Rewards Page Content Locators
    REWARDS_HEADER = 'h1:has-text("Rewards"), h2:has-text("Rewards"), .rewards-banner'
    LINK_FAQ = 'a:has-text("FREQUENTLY ASKED QUESTIONS"), a[href*="rewards-faq"]'
    LINK_GOOGLE_PLAY = 'a[href*="play.google.com"], img[alt*="Google Play"]'
    LINK_APP_STORE = 'a[href*="apps.apple.com"], img[alt*="App Store"]'
    LINK_JOIN_NOW = 'a:has-text("Join Now"), a[href*="signup"]'
    LINK_SIGN_IN = 'a:has-text("Sign In"), a[href*="login"]'

    def __init__(self, page: Page):
        super().__init__(page)

    def is_rewards_page_loaded(self) -> bool:
        """Verify Rewards Club page header and content elements."""
        return self.is_visible(self.REWARDS_HEADER) or self.is_visible(self.LINK_JOIN_NOW)

    def click_faq(self) -> None:
        """Click Rewards FAQ link."""
        self.click(self.LINK_FAQ)

    def click_google_play_in_new_tab(self) -> Page:
        """Click Google Play app badge icon and return newly opened browser tab."""
        return self.expect_new_tab(lambda: self.click(self.LINK_GOOGLE_PLAY))

    def click_app_store_in_new_tab(self) -> Page:
        """Click Apple App Store app badge icon and return newly opened browser tab."""
        return self.expect_new_tab(lambda: self.click(self.LINK_APP_STORE))

    def click_join_now(self) -> None:
        """Click Join Now button."""
        self.click(self.LINK_JOIN_NOW)

    def click_sign_in(self) -> None:
        """Click Sign In link."""
        self.click(self.LINK_SIGN_IN)
