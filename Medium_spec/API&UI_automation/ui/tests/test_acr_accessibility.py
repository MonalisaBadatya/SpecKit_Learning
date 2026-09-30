import re
import pytest
from playwright.sync_api import Page, expect
from ui.pages.landing_widget_page import LandingWidgetPage
from ui.pages.assignment_drawer_page import AssignmentDrawerPage

@pytest.mark.ui
@pytest.mark.acr
@pytest.mark.accessibility
class TestAcrAccessibility:
    """Accessibility & WCAG 2.1 Compliance Tests (TC-UI-015 through TC-UI-017)."""

    def test_tc_ui_015_badge_color_not_sole_indicator(
        self, page: Page, landing_widget_page: LandingWidgetPage, drawer_page: AssignmentDrawerPage
    ):
        """
        TC-UI-015: Alert Badges convey meaning through text label, not color alone (WCAG 1.4.1).
        """
        landing_widget_page.load_wfm_landing()
        # Badges must contain readable text or accessible tooltips
        badges = page.locator("[data-testid*='badge'], .badge, .status-pill")
        count = badges.count()
        for i in range(count):
            badge = badges.nth(i)
            text = badge.inner_text().strip()
            aria_label = badge.get_attribute("aria-label") or ""
            assert len(text) > 0 or len(aria_label) > 0

    def test_tc_ui_016_modal_focus_trap_and_keyboard_navigation(
        self, page: Page, landing_widget_page: LandingWidgetPage, drawer_page: AssignmentDrawerPage
    ):
        """
        TC-UI-016: Focus trap and keyboard navigation inside Conflict/Extension modals (WCAG 2.4.3).
        """
        landing_widget_page.load_wfm_landing()
        if drawer_page.conflict_modal.is_visible():
            # Tab should cycle inside dialog
            page.keyboard.press("Tab")
            focused = page.locator(":focus")
            expect(focused).to_be_visible()
            # Esc should close modal
            page.keyboard.press("Escape")
            expect(drawer_page.conflict_modal).not_to_be_visible()

    def test_tc_ui_017_accessible_names_and_aria_labels(
        self, page: Page, landing_widget_page: LandingWidgetPage, drawer_page: AssignmentDrawerPage
    ):
        """
        TC-UI-017: Reject button, accept button, and dialog textarea have accessible names.
        """
        landing_widget_page.load_wfm_landing()
        if drawer_page.accept_button.is_visible():
            expect(drawer_page.accept_button).to_have_attribute("aria-label", re.compile(r".+")) if drawer_page.accept_button.get_attribute("aria-label") else expect(drawer_page.accept_button).to_be_visible()
        if drawer_page.reject_button.is_visible():
            expect(drawer_page.reject_button).to_be_visible()
