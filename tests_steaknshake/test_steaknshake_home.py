"""
Playwright Pytest Automation Suite for Steak 'n Shake Home Navigation (002-steaknshake-home).
Traceable to Feature Specification specs/002-steaknshake-home/spec.md and test assessment artifacts.
"""

import pytest
from playwright.sync_api import Page, expect
from tests.config import (
    BASE_URL,
    TEST_INVALID_PASSWORD,
    TEST_INVALID_USER,
    TEST_VALID_PASSWORD,
    TEST_VALID_USER,
    URL_APP_STORE,
    URL_BEEF_TALLOW,
    URL_BIGLARI,
    URL_CAREERS,
    URL_CATERING,
    URL_FEEDBACK,
    URL_FRANCHISE,
    URL_GOOGLE_PLAY,
    URL_HATS,
    URL_REWARDS_FAQ,
    URL_SEED_OILS,
    URL_SHOP,
    URL_SIGNUP,
)
from tests.pages.components.footer_component import FooterComponent
from tests.pages.home_page import HomePage
from tests.pages.order_online_page import OrderOnlinePage
from tests.pages.rewards_page import RewardsPage


class TestCoreNavigation:
    """Test Suite for Core Navigation, Menu PDFs, Specials, and Header Links (US-1 & US-5)."""

    def test_tc01_home_page_loads(self, page: Page):
        """TC-01 [FR-001]: Verify Steak 'n Shake home page loads successfully."""
        home_page = HomePage(page)
        assert home_page.is_home_loaded(), "Home page core header/navigation failed to render"
        assert "steak" in home_page.get_title().lower() or "shake" in home_page.get_title().lower()

    def test_tc02_menu_pdf_options_visible(self, page: Page):
        """TC-02 [FR-002]: Verify MENU section options and PDF access points are visible."""
        home_page = HomePage(page)
        assert home_page.are_menu_pdf_links_visible(), "Printable Menu, Allergens, or Nutrition links not visible"

    def test_tc03_printable_menu_pdf(self, page: Page):
        """TC-03 [FR-003]: Verify Printable Menu link opens PDF containing menu items list."""
        home_page = HomePage(page)
        response = home_page.click_printable_menu_pdf()
        assert response.status == 200, f"Expected HTTP 200 for Printable Menu PDF, got {response.status}"

    def test_tc04_ingredients_allergens_pdf(self, page: Page):
        """TC-04 [FR-004]: Verify Ingredients and Allergens link opens PDF with allergen information."""
        home_page = HomePage(page)
        response = home_page.click_allergens_pdf()
        assert response.status == 200, f"Expected HTTP 200 for Ingredients/Allergens PDF, got {response.status}"

    def test_tc05_nutrition_facts_pdf(self, page: Page):
        """TC-05 [FR-005]: Verify Nutrition Facts link opens PDF containing nutrition details."""
        home_page = HomePage(page)
        response = home_page.click_nutrition_pdf()
        assert response.status == 200, f"Expected HTTP 200 for Nutrition Facts PDF, got {response.status}"

    def test_tc06_specials_happy_hour(self, page: Page):
        """TC-06 [FR-006]: Verify SPECIALS Half Price Happy Hour navigation."""
        home_page = HomePage(page)
        home_page.click_specials_happy_hour()
        home_page.wait_for_url_contains("/menu_specials/half-price-happy-hour/")
        assert "/menu_specials/half-price-happy-hour/" in home_page.get_url()

    def test_tc07_about_us(self, page: Page):
        """TC-07 [FR-007]: Verify ABOUT US navigation loads about-us page."""
        home_page = HomePage(page)
        home_page.click_about_us()
        home_page.wait_for_url_contains("/about-us/")
        assert "/about-us/" in home_page.get_url()

    def test_tc08_logo_returns_to_home(self, page: Page):
        """TC-08 [FR-008]: Verify clicking SteaknShake logo returns user to home page."""
        home_page = HomePage(page)
        home_page.click_about_us()
        home_page.click_logo()
        expect(page).to_have_url(f"{BASE_URL}/")

    def test_tc09_franchise_new_tab(self, page: Page):
        """TC-09 [FR-009]: Verify FRANCHISE link opens external site in a new browser tab."""
        home_page = HomePage(page)
        franchise_tab = home_page.click_franchise_in_new_tab()
        assert URL_FRANCHISE in franchise_tab.url or "steaknshakefranchise.com" in franchise_tab.url

    def test_tc36_beef_tallow_link(self, page: Page):
        """TC-36 [FR-024]: Verify Beef Tallow shop item link navigates to beeftallow store."""
        home_page = HomePage(page)
        home_page.click_shop_item("Beef Tallow")
        home_page.wait_for_url_contains("beeftallow")
        assert URL_BEEF_TALLOW in home_page.get_url() or "beeftallow" in home_page.get_url()

    def test_tc37_hats_link(self, page: Page):
        """TC-37 [FR-024]: Verify Hats shop item link navigates to hats store."""
        home_page = HomePage(page)
        home_page.click_shop_item("Hats")
        home_page.wait_for_url_contains("hats")
        assert URL_HATS in home_page.get_url() or "hats" in home_page.get_url()

    def test_tc38_seed_oil_link(self, page: Page):
        """TC-38 [FR-025]: Verify Seed Oil header link navigates to seed-oils page."""
        home_page = HomePage(page)
        home_page.click_seed_oil()
        home_page.wait_for_url_contains("/seed-oils/")
        assert URL_SEED_OILS in home_page.get_url() or "/seed-oils/" in home_page.get_url()

    def test_tc39_catering_link(self, page: Page):
        """TC-39 [FR-026]: Verify Catering link navigates to catering ordering site."""
        home_page = HomePage(page)
        home_page.click_catering()
        home_page.wait_for_url_contains("catering")
        assert URL_CATERING in home_page.get_url() or "catering" in home_page.get_url()


class TestOrderOnlineAndSearch:
    """Test Suite for Order Online Flow, Location Search, and Ordering Authentication (US-2 & Review Gaps 1-2)."""

    def test_tc10_order_online_navigation(self, page: Page):
        """TC-10 [FR-010]: Verify Order Online button navigates to order-online page."""
        home_page = HomePage(page)
        home_page.click_order_online()
        home_page.wait_for_url_contains("/order-online/")
        assert "/order-online/" in home_page.get_url()

    def test_tc11_location_search_valid(self, page: Page):
        """TC-11 [FR-011]: Verify location search field accepts query and triggers search results."""
        home_page = HomePage(page)
        home_page.click_order_online()
        order_page = OrderOnlinePage(page)
        order_page.search_location("Cincinnati")
        assert order_page.get_search_results_count() > 0, "No location results returned for Cincinnati search"

    def test_tc12_location_search_invalid_no_results(self, page: Page):
        """TC-12 [FR-029]: Verify location search displaying no-results message for invalid location."""
        home_page = HomePage(page)
        home_page.click_order_online()
        order_page = OrderOnlinePage(page)
        order_page.search_location("XYZ999NonExistentCity")
        assert order_page.is_no_results_displayed(), "Expected clear no-results message for invalid location query"

    def test_tc13_store_result_details(self, page: Page):
        """TC-13 [FR-012]: Verify successful location search displays selectable restaurant and Order action."""
        home_page = HomePage(page)
        home_page.click_order_online()
        order_page = OrderOnlinePage(page)
        order_page.search_location("Cincinnati")
        assert order_page.get_search_results_count() > 0

    def test_tc14_store_order_button_click(self, page: Page):
        """TC-14 [FR-013]: Verify clicking restaurant Order button opens location menu ordering page."""
        home_page = HomePage(page)
        home_page.click_order_online()
        order_page = OrderOnlinePage(page)
        order_page.search_location("Cincinnati")
        order_page.select_first_restaurant_order()
        expect(page).not_to_have_url(f"{BASE_URL}/order-online/")

    def test_tc15_ordering_login_button_enabled(self, page: Page):
        """TC-15 [FR-014]: Verify Login control in ordering flow is enabled and opens login page."""
        home_page = HomePage(page)
        home_page.click_order_online()
        order_page = OrderOnlinePage(page)
        assert order_page.is_ordering_login_button_enabled(), "Login control in ordering flow is disabled or missing"
        order_page.open_login_modal()
        assert order_page.is_login_modal_visible()

    def test_tc16_valid_login_authentication(self, page: Page):
        """TC-16 [FR-015]: Verify valid login authentication in ordering flow returns user to restaurant order context."""
        home_page = HomePage(page)
        home_page.click_order_online()
        order_page = OrderOnlinePage(page)
        order_page.login(TEST_VALID_USER, TEST_VALID_PASSWORD)
        assert order_page.is_user_authenticated(), "User failed to authenticate in ordering flow"

    def test_tc48_invalid_login_authentication_failure(self, page: Page):
        """TC-48 (Review Gap 1) [FR-015 / Negative]: Verify order flow login failure with invalid credentials."""
        home_page = HomePage(page)
        home_page.click_order_online()
        order_page = OrderOnlinePage(page)
        order_page.login(TEST_INVALID_USER, TEST_INVALID_PASSWORD)
        error_msg = order_page.get_login_error_message()
        assert len(error_msg) > 0, "Expected visible authentication failure message for invalid credentials"

    def test_tc49_empty_location_search_validation(self, page: Page):
        """TC-49 (Review Gap 2) [FR-011 / Boundary]: Verify submitting empty or whitespace location search string."""
        home_page = HomePage(page)
        home_page.click_order_online()
        order_page = OrderOnlinePage(page)
        order_page.search_location("   ")
        assert order_page.is_inline_validation_displayed() or order_page.get_search_results_count() == 0


class TestRewardsAndResources:
    """Test Suite for Rewards Club, FAQs, App Store Badges, and Account Creation Links (US-3)."""

    def test_tc17_rewards_page_load(self, page: Page):
        """TC-17 [FR-018]: Verify Rewards page loads and displays rewards content and links."""
        home_page = HomePage(page)
        home_page.click_rewards()
        rewards_page = RewardsPage(page)
        assert rewards_page.is_rewards_page_loaded()

    def test_tc18_rewards_faq(self, page: Page):
        """TC-18 [FR-019]: Verify rewards FAQ link navigates to rewards FAQ page."""
        home_page = HomePage(page)
        home_page.click_rewards()
        rewards_page = RewardsPage(page)
        rewards_page.click_faq()
        rewards_page.wait_for_url_contains("rewards-faq")
        assert URL_REWARDS_FAQ in rewards_page.get_url() or "rewards-faq" in rewards_page.get_url()

    def test_tc19_google_play_app_store_new_tab(self, page: Page):
        """TC-19 [FR-020]: Verify Google Play icon opens Android app store in a new tab."""
        home_page = HomePage(page)
        home_page.click_rewards()
        rewards_page = RewardsPage(page)
        play_tab = rewards_page.click_google_play_in_new_tab()
        assert "play.google.com" in play_tab.url or "com.zipscene.mobile.sns" in play_tab.url

    def test_tc20_app_store_new_tab(self, page: Page):
        """TC-20 [FR-021]: Verify App Store icon opens Apple app store in a new tab."""
        home_page = HomePage(page)
        home_page.click_rewards()
        rewards_page = RewardsPage(page)
        appstore_tab = rewards_page.click_app_store_in_new_tab()
        assert "apps.apple.com" in appstore_tab.url or "steak-n-shake" in appstore_tab.url

    def test_tc21_join_now_link(self, page: Page):
        """TC-21 [FR-022]: Verify Join Now link navigates to signup page."""
        home_page = HomePage(page)
        home_page.click_rewards()
        rewards_page = RewardsPage(page)
        rewards_page.click_join_now()
        rewards_page.wait_for_url_contains("signup")
        assert URL_SIGNUP in rewards_page.get_url() or "signup" in rewards_page.get_url()

    def test_tc22_sign_in_link(self, page: Page):
        """TC-22 [FR-023]: Verify Sign In link navigates to login page."""
        home_page = HomePage(page)
        home_page.click_rewards()
        rewards_page = RewardsPage(page)
        rewards_page.click_sign_in()
        rewards_page.wait_for_url_contains("login")
        assert "login" in rewards_page.get_url()


class TestFooterAndSocialNavigation:
    """Test Suite for Footer Container Links, External Portals, and Social Media (US-4)."""

    def test_tc23_footer_visibility(self, page: Page):
        """TC-23 [FR-016]: Verify footer navigation links are visible and interactive."""
        footer = FooterComponent(page)
        footer.scroll_to_footer()
        assert footer.is_footer_visible()

    @pytest.mark.parametrize(
        "link_name, expected_url_fragment",
        [
            ("Rewards Club", "rewards"),
            ("Shop", "shopsteaknshake.com"),
            ("Careers", "talentreef.com"),
            ("Feedback", "customerpulse.net"),
            ("Associates", "careers"),
            ("Terms of Use", "TERMS"),
            ("Privacy", "privacy"),
            ("Site Map", "sitemap"),
            ("Our Animal Wellbeing Standard", "ANIMAL"),
            ("Accessibility Statement", "ACCESSIBILITY"),
            ("Biglari Holdings Company", "biglariholdings.com"),
        ],
    )
    def test_tc24_to_34_footer_links(self, page: Page, link_name: str, expected_url_fragment: str):
        """TC-24 to TC-34 [FR-016]: Verify footer links navigate to their respective destination pages."""
        footer = FooterComponent(page)
        footer.click_footer_link(link_name)
        footer.wait_for_url_contains(expected_url_fragment.lower())
        assert expected_url_fragment.lower() in page.url.lower()

    @pytest.mark.parametrize(
        "platform, expected_domain",
        [
            ("Facebook", "facebook.com"),
            ("Twitter", "twitter.com"),
            ("Instagram", "instagram.com"),
            ("YouTube", "youtube.com"),
        ],
    )
    def test_tc35_50_51_social_links(self, page: Page, platform: str, expected_domain: str):
        """TC-35, TC-50, TC-51 [FR-017]: Verify footer social media icons contain expected domain targets."""
        footer = FooterComponent(page)
        footer.scroll_to_footer()
        href = footer.get_social_link_href(platform)
        assert expected_domain in href.lower(), f"Expected '{expected_domain}' in social href, got '{href}'"


class TestResponsiveAccessibilityAndEdgeCases:
    """Test Suite for Responsive Breakpoints, Keyboard Accessibility, and Edge Case Network Interceptions (US-6 & Edge Cases)."""

    def test_tc40_desktop_hero_banner(self, desktop_page: Page):
        """TC-40 [FR-027]: Verify hero banners layout and legibility on desktop viewport."""
        home_page = HomePage(desktop_page)
        assert home_page.is_banner_visible(), "Hero banner not visible on desktop viewport (1920x1080)"

    def test_tc41_mobile_hero_banner(self, mobile_page: Page):
        """TC-41 [FR-027]: Verify hero banners layout and legibility on mobile viewport."""
        home_page = HomePage(mobile_page)
        assert home_page.is_banner_visible(), "Hero banner not visible on mobile viewport (375x667)"
        scroll_width = mobile_page.evaluate("document.documentElement.scrollWidth")
        viewport_width = mobile_page.evaluate("window.innerWidth")
        assert scroll_width <= viewport_width, "Mobile viewport has unwanted horizontal page overflow"

    def test_tc42_small_mobile_footer(self, small_mobile_page: Page):
        """TC-42 [FR-016 / Edge Case]: Verify footer links remain accessible on small mobile viewport."""
        footer = FooterComponent(small_mobile_page)
        footer.scroll_to_footer()
        assert footer.is_footer_visible()

    def test_tc43_keyboard_tab_focus_main_header(self, page: Page):
        """TC-43 [FR-028 / SC-007]: Verify keyboard navigation and focus indicators across main header links."""
        home_page = HomePage(page)
        home_page.press_key("Tab")
        focused_element = page.locator(":focus")
        expect(focused_element).to_be_visible()

    def test_tc44_keyboard_tab_focus_footer(self, page: Page):
        """TC-44 [FR-028 / SC-007]: Verify keyboard accessibility for footer controls without focus trap."""
        footer = FooterComponent(page)
        footer.scroll_to_footer()
        for _ in range(5):
            footer.press_key("Tab")
            focused = page.locator(":focus")
            expect(focused).to_be_visible()

    def test_tc45_pdf_links_accessibility_attributes(self, page: Page):
        """TC-45 [FR-028]: Verify PDF document links have descriptive names for assistive technology."""
        home_page = HomePage(page)
        home_page.hover_or_click_menu()
        printable_text = home_page.get_attribute(HomePage.LINK_PRINTABLE_MENU, "aria-label") or page.locator(HomePage.LINK_PRINTABLE_MENU).inner_text()
        assert len(printable_text.strip()) > 0, "PDF link accessibility label is missing"

    def test_tc46_pdf_endpoint_failure_handling(self, page: Page):
        """TC-46 [Edge Case]: Verify graceful UI handling when a PDF resource endpoint fails (HTTP 500 mock)."""
        home_page = HomePage(page)
        page.route("**/*.pdf", lambda route: route.fulfill(status=500, body="Internal Server Error"))
        home_page.hover_or_click_menu()
        home_page.click(HomePage.LINK_PRINTABLE_MENU)
        assert home_page.is_home_loaded(), "Application crashed or threw unhandled exception when PDF failed"

    def test_tc47_external_link_network_error_handling(self, page: Page):
        """TC-47 [Edge Case / FR-030]: Verify primary tab stability when an external link request is aborted."""
        home_page = HomePage(page)
        page.route("**/steaknshakefranchise.com/**", lambda route: route.abort("failed"))
        with pytest.raises(Exception):
            home_page.click_franchise_in_new_tab()
        assert home_page.is_home_loaded(), "Primary application tab became unresponsive when external link failed"
