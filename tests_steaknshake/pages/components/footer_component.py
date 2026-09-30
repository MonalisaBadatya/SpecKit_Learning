"""
FooterComponent component object representing the site footer navigation, legal policy, and social links.
"""

from typing import Dict
from playwright.sync_api import Page
from tests.pages.base_page import BasePage


class FooterComponent(BasePage):
    """
    Component Object for Steak 'n Shake Site Footer.
    """

    FOOTER_CONTAINER = 'footer, .site-footer, #footer'

    # Footer Link Map (Link Text / Keyword -> Selector)
    FOOTER_LINKS: Dict[str, str] = {
        "Rewards Club": 'footer a:has-text("Rewards"), footer a[href*="rewards"]',
        "Shop": 'footer a:has-text("Shop"), footer a[href*="shopsteaknshake.com"]',
        "Careers": 'footer a:has-text("Careers"), footer a[href*="talentreef.com"]',
        "Feedback": 'footer a:has-text("Feedback"), footer a[href*="customerpulse.net"]',
        "Associates": 'footer a:has-text("Associates"), footer a[href*="careers"]',
        "Terms of Use": 'footer a:has-text("Terms of Use"), footer a[href*="TERMS"]',
        "Privacy": 'footer a:has-text("Privacy"), footer a[href*="privacy"]',
        "Site Map": 'footer a:has-text("Site Map"), footer a[href*="sitemap"]',
        "Our Animal Wellbeing Standard": 'footer a:has-text("Animal Wellbeing"), footer a[href*="ANIMAL"]',
        "Accessibility Statement": 'footer a:has-text("Accessibility"), footer a[href*="ACCESSIBILITY"]',
        "Biglari Holdings Company": 'footer a:has-text("Biglari"), footer a[href*="biglariholdings.com"]',
    }

    # Social Media Locators
    SOCIAL_LINKS: Dict[str, str] = {
        "Facebook": 'footer a[href*="facebook.com"]',
        "Twitter": 'footer a[href*="twitter.com"], footer a[href*="x.com"]',
        "Instagram": 'footer a[href*="instagram.com"]',
        "YouTube": 'footer a[href*="youtube.com"]',
    }

    def __init__(self, page: Page):
        super().__init__(page)

    def scroll_to_footer(self) -> None:
        """Scroll page down to make the footer visible."""
        self.scroll_to_element(self.FOOTER_CONTAINER)

    def is_footer_visible(self) -> bool:
        """Check if footer container is displayed."""
        return self.is_visible(self.FOOTER_CONTAINER)

    def get_footer_link_locator(self, link_name: str) -> str:
        """Get selector for a specific footer link."""
        return self.FOOTER_LINKS.get(link_name, f'footer a:has-text("{link_name}")')

    def get_footer_link_href(self, link_name: str) -> str:
        """Return the target `href` attribute of a footer link."""
        selector = self.get_footer_link_locator(link_name)
        return self.get_attribute(selector, "href")

    def click_footer_link(self, link_name: str) -> None:
        """Click a specified footer link."""
        self.scroll_to_footer()
        selector = self.get_footer_link_locator(link_name)
        self.click(selector)

    def get_social_link_href(self, platform: str) -> str:
        """Return the `href` attribute for a social media platform icon."""
        selector = self.SOCIAL_LINKS.get(platform, f'footer a[href*="{platform.lower()}"]')
        return self.get_attribute(selector, "href")

    def click_social_link(self, platform: str) -> None:
        """Click a specified social media icon link."""
        self.scroll_to_footer()
        selector = self.SOCIAL_LINKS.get(platform, f'footer a[href*="{platform.lower()}"]')
        self.click(selector)
