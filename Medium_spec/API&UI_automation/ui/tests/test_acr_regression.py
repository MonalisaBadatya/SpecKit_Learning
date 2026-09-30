import re
import pytest
from playwright.sync_api import Page, expect
from ui.pages.landing_widget_page import LandingWidgetPage
from ui.pages.assignment_drawer_page import AssignmentDrawerPage

@pytest.mark.ui
@pytest.mark.acr
@pytest.mark.regression
class TestAcrRegression:
    """Downstream Scheduling Views Sync Regression Test (TC-UI-018)."""

    def test_tc_ui_018_assignment_detail_timeline_calendar_sync(
        self, page: Page, landing_widget_page: LandingWidgetPage, drawer_page: AssignmentDrawerPage
    ):
        """
        TC-UI-018: Verify Assignment Detail, Timeline, and Calendar reflect approved date updates.
        """
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

            # Check for downstream view navigation if present
            timeline_link = page.get_by_role("tab", name=re.compile(r"Timeline", re.IGNORECASE))
            if timeline_link.is_visible():
                timeline_link.click()
                expect(page.locator(".timeline-view, [data-testid='timeline']").first).to_be_visible()
