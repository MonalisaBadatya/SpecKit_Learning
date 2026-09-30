"""API Automated Test Suite for Effective Date Reassign and Unassign Feature.

Source: complex-spec/test-cases/API/EffectiveDate_Reassign_Unassign_API_TestCases.md
Automation Feasibility: complex-spec/reviews/EffectiveDate_Reassign_Unassign_Automation_Feasibility.md

Automated Cases (AUTOMATE):
- TC-API-EDRU-001: API split mutation for Unassign with valid payload (SCN-EDRU-014)
- TC-API-EDRU-002: API split mutation for Reassign with valid replacement worker (SCN-EDRU-015)
- TC-API-EDRU-003: OCC Version mismatch on split mutation (SCN-EDRU-016)
- TC-API-EDRU-004: End-date split boundary where splitDate == endDate (SCN-EDRU-017)
- TC-API-EDRU-005: Reassign replacement worker with scheduling conflict without override (SCN-EDRU-011)
- TC-API-EDRU-006: Non-Admin user attempts split with splitDate < today - 7 days (SCN-EDRU-012)
- TC-API-EDRU-007: System Admin executes historic lockout override split (SCN-EDRU-013)

Skipped Cases (PARTIAL / MANUAL):
- TC-API-EDRU-008: Sequential splits on same assignment record (SCN-EDRU-021)
  Reason: Classified as PARTIAL in Automation Feasibility due to GAP-EDRU-004 (multi-step
  sequential split behavior on already shortened records is undocumented).
"""
import sys
import os
import pytest

# Ensure parent directory is in path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))
from client import AssignmentApiClient


@pytest.mark.api
@pytest.mark.tc_api_edru_001
def test_tc_api_edru_001_unassign_split_valid_payload(api_client: AssignmentApiClient):
    """TC-API-EDRU-001: API split mutation for Unassign with valid payload.

    Scenario ID: SCN-EDRU-014
    Traceability: REQ-EDRU-006, BR-EDRU-005, BR-EDRU-006
    Priority: High | Risk: High
    """
    assignment_id = "assign-001"
    split_date = "2026-08-16"
    version = 1

    payload = {
        "assignmentId": assignment_id,
        "version": version,
        "splitDate": split_date,
        "targetWorkerId": None
    }

    response = api_client.post_split(assignment_id, payload)

    # Note: GAP-EDRU-001 unconfirmed 200 vs 201
    assert response.status_code in [200, 201], f"Expected 200 OK or 201 Created, got {response.status_code}"
    body = response.json()
    assert "originalAssignment" in body or "message" in body
    if "originalAssignment" in body and body["originalAssignment"]:
        orig = body["originalAssignment"]
        assert orig.get("endDate") == "2026-08-15", f"Expected endDate to shorten to splitDate - 1 day (2026-08-15), got {orig.get('endDate')}"
        assert orig.get("version") == version + 1, f"Expected version to increment to {version + 1}, got {orig.get('version')}"


@pytest.mark.api
@pytest.mark.tc_api_edru_002
def test_tc_api_edru_002_reassign_split_valid_replacement_worker(api_client: AssignmentApiClient):
    """TC-API-EDRU-002: API split mutation for Reassign with valid replacement worker.

    Scenario ID: SCN-EDRU-015
    Traceability: REQ-EDRU-007, BR-EDRU-005, BR-EDRU-006
    Priority: High | Risk: High
    """
    assignment_id = "assign-002"
    split_date = "2026-08-20"
    version = 1
    target_worker_id = "worker-replacement-002"

    payload = {
        "assignmentId": assignment_id,
        "version": version,
        "splitDate": split_date,
        "targetWorkerId": target_worker_id
    }

    response = api_client.post_split(assignment_id, payload)

    # Note: GAP-EDRU-001 unconfirmed 200 vs 201
    assert response.status_code in [200, 201], f"Expected 200 OK or 201 Created, got {response.status_code}"
    body = response.json()
    assert "originalAssignment" in body or "message" in body
    if "originalAssignment" in body and body["originalAssignment"]:
        orig = body["originalAssignment"]
        assert orig.get("endDate") == "2026-08-19", f"Expected endDate to shorten to splitDate - 1 day, got {orig.get('endDate')}"
        assert orig.get("version") == version + 1, f"Expected version to increment to {version + 1}, got {orig.get('version')}"


@pytest.mark.api
@pytest.mark.tc_api_edru_003
def test_tc_api_edru_003_occ_version_mismatch_rejected(api_client: AssignmentApiClient):
    """TC-API-EDRU-003: OCC Version mismatch on split mutation.

    Scenario ID: SCN-EDRU-016
    Traceability: REQ-EDRU-011, BR-EDRU-006, VAL-EDRU-001, RSK-EDRU-002
    Priority: High | Risk: High
    """
    assignment_id = "assign-stale-003"
    split_date = "2026-08-20"
    stale_version = 4  # Stale OCC version

    payload = {
        "assignmentId": assignment_id,
        "version": stale_version,
        "splitDate": split_date
    }

    response = api_client.post_split(assignment_id, payload)

    assert response.status_code == 409, f"Expected 409 Conflict for OCC version mismatch, got {response.status_code}"


@pytest.mark.api
@pytest.mark.tc_api_edru_004
def test_tc_api_edru_004_end_date_boundary_split(api_client: AssignmentApiClient):
    """TC-API-EDRU-004: End-date split boundary where splitDate == endDate.

    Scenario ID: SCN-EDRU-017
    Traceability: REQ-EDRU-005, BR-EDRU-002, GAP-EDRU-003
    Priority: Medium | Risk: Low
    """
    assignment_id = "assign-004"
    split_date = "2026-08-31"  # Equal to assignment endDate
    version = 1

    payload = {
        "assignmentId": assignment_id,
        "version": version,
        "splitDate": split_date
    }

    response = api_client.post_split(assignment_id, payload)

    assert response.status_code in [200, 201], f"Expected 200 OK or 201 Created, got {response.status_code}"
    body = response.json()
    if "originalAssignment" in body and body["originalAssignment"]:
        orig = body["originalAssignment"]
        assert orig.get("endDate") == "2026-08-30", f"Expected endDate shortened to endDate - 1 day (2026-08-30), got {orig.get('endDate')}"


@pytest.mark.api
@pytest.mark.tc_api_edru_005
def test_tc_api_edru_005_reassign_conflict_without_override_rejected(api_client: AssignmentApiClient):
    """TC-API-EDRU-005: Reassign replacement worker with scheduling conflict without override confirmation.

    Scenario ID: SCN-EDRU-011
    Traceability: REQ-EDRU-009, BR-EDRU-007, VAL-EDRU-003
    Priority: Medium | Risk: Low
    """
    assignment_id = "assign-005"
    split_date = "2026-08-20"
    version = 1
    conflicting_worker_id = "worker-conflict-001"

    payload = {
        "assignmentId": assignment_id,
        "version": version,
        "splitDate": split_date,
        "targetWorkerId": conflicting_worker_id,
        "overrideConflict": False
    }

    response = api_client.post_split(assignment_id, payload)

    # Note: GAP-EDRU-002 error code is 4xx (400, 409, or 422)
    assert response.status_code in [400, 409, 422], f"Expected 4xx validation error for unconfirmed conflict, got {response.status_code}"


@pytest.mark.api
@pytest.mark.tc_api_edru_006
def test_tc_api_edru_006_non_admin_historic_lockout_rejected(api_client: AssignmentApiClient):
    """TC-API-EDRU-006: Non-Admin user attempts split with splitDate < today - 7 days.

    Scenario ID: SCN-EDRU-012
    Traceability: REQ-EDRU-010, BR-EDRU-008, VAL-EDRU-002
    Priority: High | Risk: Medium
    """
    assignment_id = "assign-006"
    historic_split_date = "2026-08-10"  # Older than today - 7 days
    version = 1

    payload = {
        "assignmentId": assignment_id,
        "version": version,
        "splitDate": historic_split_date,
        "overrideHistoricLockout": False
    }

    response = api_client.post_split(assignment_id, payload)

    assert response.status_code in [400, 403, 422], f"Expected 403 Forbidden or 400/422 for historic lockout, got {response.status_code}"


@pytest.mark.api
@pytest.mark.tc_api_edru_007
def test_tc_api_edru_007_admin_historic_lockout_override_success(admin_api_client: AssignmentApiClient):
    """TC-API-EDRU-007: System Admin executes historic lockout override split.

    Scenario ID: SCN-EDRU-013
    Traceability: REQ-EDRU-010, BR-EDRU-008, VAL-EDRU-002
    Priority: High | Risk: Low
    """
    assignment_id = "assign-007"
    historic_split_date = "2026-08-10"  # Older than today - 7 days
    version = 1

    payload = {
        "assignmentId": assignment_id,
        "version": version,
        "splitDate": historic_split_date,
        "overrideHistoricLockout": True
    }

    response = admin_api_client.post_split(assignment_id, payload)

    assert response.status_code in [200, 201], f"Expected 200 OK or 201 Created for Admin historic override, got {response.status_code}"
    body = response.json()
    if "originalAssignment" in body and body["originalAssignment"]:
        orig = body["originalAssignment"]
        assert orig.get("endDate") == "2026-08-09", f"Expected endDate shortened to splitDate - 1 day (2026-08-09), got {orig.get('endDate')}"
        assert orig.get("version") == version + 1, f"Expected version to increment to {version + 1}, got {orig.get('version')}"
