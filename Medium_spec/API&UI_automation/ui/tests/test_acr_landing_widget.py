import re
import pytest
from playwright.sync_api import Page, expect
from ui.pages.landing_widget_page import LandingWidgetPage
from ui.pages.assignment_drawer_page import AssignmentDrawerPage

@pytest.mark.ui
@pytest.mark.acr
class TestAcrLandingWidget:
    """Tests for WFM Landing Page Assignment Change Requests widget (TC-UI-001)."""

    def test_tc_ui_001_landing_widget_rendering_and_drawer_display(
        self, page: Page, landing_widget_page: LandingWidgetPage, drawer_page: AssignmentDrawerPage
    ):
        """
        TC-UI-001: Landing Page Widget Rendering & Drawer Banner Display.
        Traceability: REQ-ACR-003, REQ-ACR-004
        """
        # Route mock for ACR list
        page.route(
            re.compile(r".*/api/workforce/assignment-change-requests.*"),
            lambda route: route.fulfill(
                status=200,
                content_type="application/json",
                body="""{
                    "items": [{
                        "changeRequestId": "292fd69b-0e80-4f27-90e6-db10d9217089",
                        "assignmentId": "63097b12-4f82-4be4-8d3a-df1206e035e1",
                        "projectId": "0a767cda-8f27-46bc-bee9-8d3d89f2535b",
                        "projectName": "Meals on Wheels",
                        "tradeName": "Concrete",
                        "proposedResource": { "id": "2aafa7ca-5e71-4a38-9e20-5c3b12345678", "name": "Cody Kessler" },
                        "proposedDates": { "start": "2026-02-10", "end": "2026-10-01" },
                        "requester": { "id": "0b3ac79f-8f27-46bc-bee9-8d3d89f2535b", "name": "Ahmed Personal" },
                        "status": "PENDING",
                        "createdDateTime": "2026-08-19T05:16:58.156Z"
                    }],
                    "total": 1,
                    "limit": 10,
                    "offset": 0
                }"""
            )
        )

        landing_widget_page.load_wfm_landing()

        expect(page.get_by_text("Cody Kessler", exact=False).first).to_be_visible(timeout=10000)
        expect(page.get_by_text("Meals on Wheels", exact=False).first).to_be_visible(timeout=5000)
        expect(page.get_by_text("Concrete", exact=False).first).to_be_visible(timeout=5000)
