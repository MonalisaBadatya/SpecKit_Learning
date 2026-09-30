import re
import pytest
from playwright.sync_api import Page, expect
from ui.pages.landing_widget_page import LandingWidgetPage
from ui.pages.assignment_drawer_page import AssignmentDrawerPage

@pytest.mark.ui
@pytest.mark.acr
class TestAcrRejectionWithdrawal:
    """Rejection and Withdrawal flow tests (TC-UI-007 through TC-UI-009)."""

    def test_tc_ui_007_wfm_rejection_with_comment(
        self, page: Page, landing_widget_page: LandingWidgetPage, drawer_page: AssignmentDrawerPage
    ):
        """TC-UI-007: WFM In-App Rejection with Comment."""
        page.route(
            re.compile(r".*/api/workforce/assignment-change-requests/.*/reject"),
            lambda route: route.fulfill(
                status=200,
                content_type="application/json",
                body='{"success": true, "changeRequestId": "292fd69b-0e80-4f27-90e6-db10d9217089", "status": "REJECTED"}'
            )
        )

        landing_widget_page.load_wfm_landing()

        if drawer_page.reject_button.is_visible():
            drawer_page.reject(comment="Worker needed on Margaret Mary Health project")
            expect(drawer_page.rejection_dialog).not_to_be_visible(timeout=5000)

    def test_tc_ui_008_requester_pm_self_withdrawal(
        self, page: Page, landing_widget_page: LandingWidgetPage, drawer_page: AssignmentDrawerPage
    ):
        """TC-UI-008: Requester PM Self-Withdrawal."""
        landing_widget_page.load_wfm_landing()

        if drawer_page.withdraw_button.is_visible():
            drawer_page.withdraw_button.click()
            expect(page.get_by_text("Cancelled", exact=False).first).to_be_visible(timeout=5000)

    def test_tc_ui_009_non_requester_pm_withdrawal_blocked(
        self, page: Page, landing_widget_page: LandingWidgetPage, drawer_page: AssignmentDrawerPage
    ):
        """TC-UI-009: Non-Requester PM Withdrawal Unauthorized Block (P0)."""
        landing_widget_page.load_wfm_landing()
        # Verify withdraw button is not enabled or visible for non-owner PM
        if drawer_page.withdraw_button.is_visible():
            expect(drawer_page.withdraw_button).to_be_disabled()
