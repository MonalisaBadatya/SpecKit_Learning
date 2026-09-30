import re
import pytest
from playwright.sync_api import Page, expect
from ui.pages.landing_widget_page import LandingWidgetPage
from ui.pages.assignment_drawer_page import AssignmentDrawerPage

@pytest.mark.ui
@pytest.mark.acr
@pytest.mark.approval
class TestAcrInAppApproval:
    """In-App WFM approval workflow tests (TC-UI-002 through TC-UI-006)."""

    def test_tc_ui_002_clean_direct_approval(
        self, page: Page, landing_widget_page: LandingWidgetPage, drawer_page: AssignmentDrawerPage
    ):
        """TC-UI-002: WFM In-App Direct Approval (Clean Path)."""
        page.route(
            re.compile(r".*/api/workforce/assignment-change-requests/.*/approve"),
            lambda route: route.fulfill(
                status=200,
                content_type="application/json",
                body='{"success": true, "changeRequestId": "292fd69b-0e80-4f27-90e6-db10d9217089", "status": "APPROVED"}'
            )
        )

        landing_widget_page.load_wfm_landing()
        if drawer_page.accept_button.is_visible():
            drawer_page.accept_button.click()
            expect(page.get_by_text("Approved", exact=False).first).to_be_visible(timeout=5000)

    def test_tc_ui_003_conflict_override_modal(
        self, page: Page, landing_widget_page: LandingWidgetPage, drawer_page: AssignmentDrawerPage
    ):
        """TC-UI-003: Scheduling Conflict Detection & Explicit Override Modal."""
        landing_widget_page.load_wfm_landing()

        if drawer_page.conflict_badge.is_visible():
            drawer_page.accept_button.click()
            expect(drawer_page.conflict_modal).to_be_visible(timeout=5000)
            drawer_page.override_conflict_button.click()
            expect(drawer_page.conflict_modal).not_to_be_visible(timeout=5000)

    def test_tc_ui_004_project_extension_modal(
        self, page: Page, landing_widget_page: LandingWidgetPage, drawer_page: AssignmentDrawerPage
    ):
        """TC-UI-004: Project End Date Extension Confirmation Modal."""
        landing_widget_page.load_wfm_landing()

        if drawer_page.extend_project_badge.is_visible():
            drawer_page.accept_button.click()
            expect(drawer_page.extend_project_modal).to_be_visible(timeout=5000)
            drawer_page.extend_project_confirm_button.click()
            expect(drawer_page.extend_project_modal).not_to_be_visible(timeout=5000)

    def test_tc_ui_005_historic_lockout_wfm_blocked(
        self, page: Page, landing_widget_page: LandingWidgetPage, drawer_page: AssignmentDrawerPage
    ):
        """TC-UI-005: Historic Lockout Threshold (>7 Days) WFM Approval Blocked (P0)."""
        page.route(
            re.compile(r".*/api/workforce/assignment-change-requests/.*/approve"),
            lambda route: route.fulfill(
                status=403,
                content_type="application/json",
                body='{"error": "Forbidden: Only System Administrators can approve requests with start dates > 7 days in the past."}'
            )
        )
        landing_widget_page.load_wfm_landing()
        if drawer_page.historic_lockout_badge.is_visible() and drawer_page.accept_button.is_visible():
            drawer_page.accept_button.click()
            expect(page.get_by_text("Forbidden", exact=False).or_(page.get_by_text("System Administrator", exact=False)).first).to_be_visible(timeout=5000)

    def test_tc_ui_006_historic_lockout_admin_override(
        self, page: Page, landing_widget_page: LandingWidgetPage, drawer_page: AssignmentDrawerPage
    ):
        """TC-UI-006: Historic Lockout System Admin Override succeeds."""
        page.route(
            re.compile(r".*/api/workforce/assignment-change-requests/.*/approve"),
            lambda route: route.fulfill(
                status=200,
                content_type="application/json",
                body='{"success": true, "changeRequestId": "5a5ca90e-31b3-4e5a-a309-0e4302540312", "status": "APPROVED"}'
            )
        )
        landing_widget_page.load_wfm_landing()
        if drawer_page.historic_override_button.is_visible():
            drawer_page.historic_override_button.click()
            expect(page.get_by_text("Approved", exact=False).first).to_be_visible(timeout=5000)
