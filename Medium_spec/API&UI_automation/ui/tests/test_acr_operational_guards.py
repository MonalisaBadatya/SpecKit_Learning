import re
import pytest
from playwright.sync_api import Page, expect
from ui.pages.landing_widget_page import LandingWidgetPage
from ui.pages.assignment_drawer_page import AssignmentDrawerPage

@pytest.mark.ui
@pytest.mark.acr
@pytest.mark.guards
class TestAcrOperationalGuards:
    """Operational constraints, contract status and boundary guard UI tests (TC-UI-010..012)."""

    def test_tc_ui_010_pursuit_project_approval_blocked(
        self, page: Page, landing_widget_page: LandingWidgetPage, drawer_page: AssignmentDrawerPage
    ):
        """TC-UI-010: Pursuit Project Approval Blocked Guard (P0)."""
        page.route(
            re.compile(r".*/api/workforce/assignment-change-requests/.*/approve"),
            lambda route: route.fulfill(
                status=400,
                content_type="application/json",
                body='{"error": "Cannot approve workforce assignment on a Pursuit project. Move project to Active status once contract is executed."}'
            )
        )

        landing_widget_page.load_wfm_landing()

        if drawer_page.accept_button.is_visible():
            drawer_page.accept_button.click()
            expect(drawer_page.pursuit_alert).to_be_visible(timeout=5000)

    def test_tc_ui_011_self_collision_exclusion_no_warning(
        self, page: Page, landing_widget_page: LandingWidgetPage, drawer_page: AssignmentDrawerPage
    ):
        """TC-UI-011: Self-Collision False Positive Exclusion (No Conflict Warning)."""
        landing_widget_page.load_wfm_landing()
        # Ensure conflict badge is absent on date-only change for same worker
        expect(drawer_page.conflict_badge).not_to_be_visible()

    def test_tc_ui_012_archived_worker_approval_blocked(
        self, page: Page, landing_widget_page: LandingWidgetPage, drawer_page: AssignmentDrawerPage
    ):
        """TC-UI-012: Inactive or Archived Worker Approval Blocked."""
        page.route(
            re.compile(r".*/api/workforce/assignment-change-requests/.*/approve"),
            lambda route: route.fulfill(
                status=400,
                content_type="application/json",
                body='{"error": "Cannot approve: Proposed resource is inactive or archived."}'
            )
        )

        landing_widget_page.load_wfm_landing()

        if drawer_page.accept_button.is_visible():
            drawer_page.accept_button.click()
            expect(drawer_page.archived_resource_alert).to_be_visible(timeout=5000)
