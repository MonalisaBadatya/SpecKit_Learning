"""
HomePage Page Object representing the Steak 'n Shake main landing page and header navigation.
"""

from playwright.sync_api import Page, Response
from tests.pages.base_page import BasePage


class HomePage(BasePage):
    """
    Page Object for Steak 'n Shake Home Page.
    """

    # Primary Navigation Locators
    LOGO = 'header a[href="/"], header a:has(img[alt*="Steak"]), a.navbar-brand'
    NAV_MENU = 'header a:has-text("MENU"), nav a:has-text("Menu")'
    NAV_SPECIALS = 'header a:has-text("SPECIALS"), nav a:has-text("Specials")'
    NAV_ABOUT_US = 'header a:has-text("ABOUT US"), nav a:has-text("About Us")'
    NAV_FRANCHISE = 'header a:has-text("FRANCHISE"), nav a:has-text("Franchise")'
    NAV_ORDER_ONLINE = 'header a:has-text("ORDER ONLINE"), header button:has-text("Order Online"), a[href*="order-online"]'
    NAV_REWARDS = 'header a:has-text("REWARDS"), nav a:has-text("Rewards")'
    NAV_SEED_OIL = 'header a:has-text("Seed Oil"), a[href*="seed-oils"]'
    NAV_CATERING = 'header a:has-text("Catering"), a[href*="catering"]'
    NAV_SHOP = 'header a:has-text("SHOP"), nav a:has-text("Shop")'

    # MENU Dropdown PDF Access Points
    LINK_PRINTABLE_MENU = 'a:has-text("Printable Menu"), a[href*="printable-menu"]'
    LINK_ALLERGENS = 'a:has-text("Ingredients and Allergens"), a[href*="allergen"]'
    LINK_NUTRITION = 'a:has-text("Nutrition Facts"), a[href*="nutrition"]'

    # SPECIALS Options
    LINK_HAPPY_HOUR = 'a:has-text("Half Price Happy Hour"), a[href*="half-price-happy-hour"]'

    # Shop Items
    LINK_BEEF_TALLOW = 'a:has-text("Beef Tallow"), a[href*="beeftallow"]'
    LINK_HATS = 'a:has-text("Hats"), a[href*="hats"]'

    # Hero Banner Locators
    HERO_BANNER = '.hero-banner, .home-banner, section.banner, .carousel-item'
    HERO_BANNER_TEXT = '.hero-banner h1, .hero-banner h2, .banner-title'

    def __init__(self, page: Page):
        super().__init__(page)

    def is_home_loaded(self) -> bool:
        """Verify key homepage components are displayed."""
        return self.is_visible(self.LOGO) and (self.is_visible(self.NAV_MENU) or self.is_visible(self.NAV_ORDER_ONLINE))

    def hover_or_click_menu(self) -> None:
        """Hover or click the MENU navigation item to reveal sub-menu."""
        menu = self.page.locator(self.NAV_MENU).first
        menu.hover()
        if not self.is_visible(self.LINK_PRINTABLE_MENU):
            menu.click()

    def are_menu_pdf_links_visible(self) -> bool:
        """Verify Printable Menu, Allergens, and Nutrition links are visible."""
        self.hover_or_click_menu()
        return (
            self.is_visible(self.LINK_PRINTABLE_MENU)
            and self.is_visible(self.LINK_ALLERGENS)
            and self.is_visible(self.LINK_NUTRITION)
        )

    def click_printable_menu_pdf(self) -> Response:
        """Click Printable Menu link and capture network PDF response."""
        self.hover_or_click_menu()
        return self.expect_pdf_response(lambda: self.click(self.LINK_PRINTABLE_MENU))

    def click_allergens_pdf(self) -> Response:
        """Click Ingredients & Allergens link and capture network PDF response."""
        self.hover_or_click_menu()
        return self.expect_pdf_response(lambda: self.click(self.LINK_ALLERGENS))

    def click_nutrition_pdf(self) -> Response:
        """Click Nutrition Facts link and capture network PDF response."""
        self.hover_or_click_menu()
        return self.expect_pdf_response(lambda: self.click(self.LINK_NUTRITION))

    def click_specials_happy_hour(self) -> None:
        """Navigate to Half Price Happy Hour specials page."""
        specials = self.page.locator(self.NAV_SPECIALS).first
        specials.hover()
        if self.is_visible(self.LINK_HAPPY_HOUR):
            self.click(self.LINK_HAPPY_HOUR)
        else:
            specials.click()

    def click_about_us(self) -> None:
        """Click ABOUT US header link."""
        self.click(self.NAV_ABOUT_US)

    def click_franchise_in_new_tab(self) -> Page:
        """Click FRANCHISE header link and return the newly opened browser tab."""
        return self.expect_new_tab(lambda: self.click(self.NAV_FRANCHISE))

    def click_logo(self) -> None:
        """Click main brand logo."""
        self.click(self.LOGO)

    def click_order_online(self) -> None:
        """Click Order Online primary header button."""
        self.click(self.NAV_ORDER_ONLINE)

    def click_rewards(self) -> None:
        """Click REWARDS header link."""
        self.click(self.NAV_REWARDS)

    def click_seed_oil(self) -> None:
        """Click Seed Oil header link."""
        self.click(self.NAV_SEED_OIL)

    def click_catering(self) -> None:
        """Click Catering header link."""
        self.click(self.NAV_CATERING)

    def click_shop_item(self, item_name: str) -> None:
        """Click shop sub-item (e.g. 'Beef Tallow' or 'Hats')."""
        shop = self.page.locator(self.NAV_SHOP).first
        shop.hover()
        if item_name.lower() == "beef tallow":
            self.click(self.LINK_BEEF_TALLOW)
        elif item_name.lower() == "hats":
            self.click(self.LINK_HATS)
        else:
            self.click(f'a:has-text("{item_name}")')

    def is_banner_visible(self) -> bool:
        """Check hero banner visibility."""
        return self.page.locator(self.HERO_BANNER).first.is_visible()
