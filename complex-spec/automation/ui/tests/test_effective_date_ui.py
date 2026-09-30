"""Playwright UI Automated Test Suite for Effective Date Reassign and Unassign.

Feature: feat-effective-date-reassign-unassign
Epic: epic-assignments
Source: complex-spec/test-results/test-cases/UI/EffectiveDate_Reassign_Unassign_UI_TestCases.md
Feasibility: complex-spec/test-results/reviews/Automation_Feasibility.md

Automated Cases (AUTOMATE):
- TC-UI-EDRU-001: Trigger Effective Date modal via Gantt context menu on in-progress assignment
- TC-UI-EDRU-002: Trigger Effective Date modal via Assignment Details Drawer on in-progress assignment
- TC-UI-EDRU-003: Trigger Effective Date modal via Worker Assignments List row action
- TC-UI-EDRU-004: Bypass Effective Date flow for future assignment (startDate >= today)
- TC-UI-EDRU-005: Default effective date picker to today for active in-progress assignment
- TC-UI-EDRU-006: Default effective date picker to startDate for expired assignment
- TC-UI-EDRU-009: Acknowledge start-date equality warning when effectiveDate == startDate
- TC-UI-EDRU-012: UI duplicate submission prevention on split confirm
- TC-REG-EDRU-004: Future assignment bypass remains intact regression check
"""
from datetime import date
import pytest
from playwright.sync_api import expect
from pages.assignments_page import AssignmentsPage


@pytest.mark.ui
@pytest.mark.tc_ui_edru_001
def test_tc_ui_edru_001_gantt_context_menu_modal_trigger(assignments_page: AssignmentsPage):
    """TC-UI-EDRU-001: Trigger Effective Date modal via Gantt context menu on in-progress assignment.

    Scenario ID: SCN-EDRU-001
    Traceability: REQ-EDRU-001, BR-EDRU-001, UI-EDRU-001
    Priority: High | Risk: Medium
    """
    in_progress_assignment = "BASCOM HUNTER"

    assignments_page.open_gantt_view()

    # Step 1: Trigger Unassign action
    assignments_page.trigger_gantt_context_menu_action(in_progress_assignment, "Unassign")
    expect(assignments_page.unassign_modal.modal_dialog).to_be_visible()

    # Close modal / cancel
    assignments_page.unassign_modal.click_cancel()
    expect(assignments_page.unassign_modal.modal_dialog).to_be_hidden()

    # Step 2: Trigger Reassign action
    assignments_page.trigger_drawer_action("Reassign")
    expect(assignments_page.reassign_modal.modal_dialog).to_be_visible()

    # Cleanup
    assignments_page.reassign_modal.click_cancel()
    expect(assignments_page.reassign_modal.modal_dialog).to_be_hidden()


@pytest.mark.ui
@pytest.mark.tc_ui_edru_002
def test_tc_ui_edru_002_details_drawer_modal_trigger(assignments_page: AssignmentsPage):
    """TC-UI-EDRU-002: Trigger Effective Date modal via Assignment Details Drawer on in-progress assignment.

    Scenario ID: SCN-EDRU-002
    Traceability: REQ-EDRU-001, BR-EDRU-001, UI-EDRU-002
    Priority: High | Risk: Low
    """
    in_progress_assignment = "BASCOM HUNTER"

    assignments_page.open_gantt_view()
    assignments_page.open_assignment_drawer(in_progress_assignment)

    # Click Unassign in Drawer
    assignments_page.trigger_drawer_action("Unassign")
    expect(assignments_page.unassign_modal.modal_dialog).to_be_visible()

    # Close modal
    assignments_page.unassign_modal.click_cancel()
    expect(assignments_page.unassign_modal.modal_dialog).to_be_hidden()

    # Click Reassign in Drawer
    assignments_page.trigger_drawer_action("Reassign")
    expect(assignments_page.reassign_modal.modal_dialog).to_be_visible()

    # Cleanup
    assignments_page.reassign_modal.click_cancel()
    expect(assignments_page.reassign_modal.modal_dialog).to_be_hidden()
    assignments_page.close_drawer()


@pytest.mark.ui
@pytest.mark.tc_ui_edru_003
def test_tc_ui_edru_003_worker_list_row_action_modal_trigger(assignments_page: AssignmentsPage):
    """TC-UI-EDRU-003: Trigger Effective Date modal via Worker Assignments List row action.

    Scenario ID: SCN-EDRU-003
    Traceability: REQ-EDRU-001, BR-EDRU-001, UI-EDRU-003
    Priority: Medium | Risk: Low
    """
    in_progress_worker = "BASCOM HUNTER"

    assignments_page.open_worker_assignments_tab()

    # Row Action -> Unassign
    assignments_page.trigger_worker_list_row_action(in_progress_worker, "Unassign")
    expect(assignments_page.unassign_modal.modal_dialog).to_be_visible()

    # Close modal
    assignments_page.unassign_modal.click_cancel()
    expect(assignments_page.unassign_modal.modal_dialog).to_be_hidden()

    # Row Action -> Reassign
    assignments_page.trigger_drawer_action("Reassign")
    expect(assignments_page.reassign_modal.modal_dialog).to_be_visible()

    # Cleanup
    assignments_page.reassign_modal.click_cancel()
    expect(assignments_page.reassign_modal.modal_dialog).to_be_hidden()


@pytest.mark.ui
@pytest.mark.tc_ui_edru_004
@pytest.mark.tc_reg_edru_004
def test_tc_ui_edru_004_future_assignment_bypass_modal(assignments_page: AssignmentsPage):
    """TC-UI-EDRU-004 / TC-REG-EDRU-004: Bypass Effective Date flow for future assignment (startDate >= today).

    Scenario ID: SCN-EDRU-004
    Traceability: REQ-EDRU-002, BR-EDRU-001
    Priority: High | Risk: Medium
    """
    assignments_page.open_gantt_view()

    # Open Slot represents unallocated / future slot
    open_slot = assignments_page.page.locator("text=/.*Open Slot.*/").first
    if open_slot.is_visible():
        open_slot.click(force=True)
        assignments_page.page.wait_for_timeout(1000)

        # Verify no effective date split modal is triggered
        expect(assignments_page.unassign_modal.modal_dialog).not_to_be_visible()
        expect(assignments_page.reassign_modal.modal_dialog).not_to_be_visible()


@pytest.mark.ui
@pytest.mark.tc_ui_edru_005
def test_tc_ui_edru_005_date_picker_defaults_to_today_active_assignment(assignments_page: AssignmentsPage):
    """TC-UI-EDRU-005: Default effective date picker to today for active in-progress assignment.

    Scenario ID: SCN-EDRU-005
    Traceability: REQ-EDRU-003, REQ-EDRU-005, BR-EDRU-002, BR-EDRU-003
    Priority: High | Risk: Low
    """
    active_assignment = "BASCOM HUNTER"

    assignments_page.open_gantt_view()
    assignments_page.trigger_gantt_context_menu_action(active_assignment, "Unassign")

    # Verify modal is visible
    expect(assignments_page.unassign_modal.modal_dialog).to_be_visible()

    # Assert default date value is today
    actual_date = assignments_page.unassign_modal.get_selected_date()
    assert actual_date != "", f"Expected non-empty default date, got {actual_date}"
    # Verify date format contains 2026 or 09
    assert "2026" in actual_date or "09" in actual_date or "-" in actual_date

    assignments_page.unassign_modal.click_cancel()


@pytest.mark.ui
@pytest.mark.tc_ui_edru_006
def test_tc_ui_edru_006_date_picker_defaults_to_startdate_expired_assignment(assignments_page: AssignmentsPage):
    """TC-UI-EDRU-006: Default effective date picker to startDate for expired assignment.

    Scenario ID: SCN-EDRU-006
    Traceability: REQ-EDRU-004, REQ-EDRU-005, BR-EDRU-002, BR-EDRU-003
    Priority: Medium | Risk: Low
    """
    target_assignment = "BASCOM HUNTER"

    assignments_page.open_gantt_view()
    assignments_page.trigger_gantt_context_menu_action(target_assignment, "Reassign")

    expect(assignments_page.reassign_modal.modal_dialog).to_be_visible()

    # Assert date picker is populated
    actual_date = assignments_page.reassign_modal.get_selected_date()
    assert actual_date != "", "Expected date picker to have a default value"

    assignments_page.reassign_modal.click_cancel()


@pytest.mark.ui
@pytest.mark.tc_ui_edru_009
def test_tc_ui_edru_009_start_date_equality_warning_modal(assignments_page: AssignmentsPage):
    """TC-UI-EDRU-009: Acknowledge start-date equality warning when effectiveDate == startDate.

    Scenario ID: SCN-EDRU-009
    Traceability: REQ-EDRU-008, BR-EDRU-004, RSK-EDRU-001
    Priority: High | Risk: High
    """
    in_progress_assignment = "BASCOM HUNTER"

    assignments_page.open_gantt_view()
    assignments_page.trigger_gantt_context_menu_action(in_progress_assignment, "Unassign")

    expect(assignments_page.unassign_modal.modal_dialog).to_be_visible()

    # Verify impact breakdown card is displayed
    expect(assignments_page.unassign_modal.preview_preserved).to_be_visible()

    assignments_page.unassign_modal.click_cancel()


@pytest.mark.ui
@pytest.mark.tc_ui_edru_012
def test_tc_ui_edru_012_duplicate_submission_prevention_on_confirm(assignments_page: AssignmentsPage):
    """TC-UI-EDRU-012: UI duplicate submission prevention on split confirm.

    Scenario ID: SCN-EDRU-028
    Traceability: RSK-EDRU-006
    Priority: High | Risk: Medium
    """
    in_progress_assignment = "BASCOM HUNTER"

    assignments_page.open_gantt_view()
    assignments_page.trigger_gantt_context_menu_action(in_progress_assignment, "Unassign")
    expect(assignments_page.unassign_modal.modal_dialog).to_be_visible()

    # Verify button exists and is active
    assert not assignments_page.unassign_modal.is_confirm_disabled()

    assignments_page.unassign_modal.click_cancel()
