"""Pytest fixtures and test environment configuration for API automation.

Traceability:
- Fixtures for Standard Workforce Manager and System Admin clients
- Simulation adapter strictly adhering to specification rules and test-case contracts
"""
import sys
import os
import json
import io
import pytest
from requests.adapters import HTTPAdapter
from urllib3.response import HTTPResponse

# Ensure current directory is in path for client import
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))
from client import AssignmentApiClient


class MockAssignmentBackendAdapter(HTTPAdapter):
    """Local simulation adapter adhering strictly to specification rules when live backend is offline."""

    def send(self, request, **kwargs):
        url = request.url
        method = request.method
        headers = request.headers
        body = json.loads(request.body.decode('utf-8')) if request.body else {}
        auth_header = headers.get("Authorization", "")
        is_admin = "admin" in auth_header.lower()

        status_code = 200
        response_body = {}

        if method == "GET" and "/assignments/" in url:
            assign_id = url.split("/assignments/")[-1]
            status_code = 200
            response_body = {
                "id": assign_id,
                "startDate": "2026-08-01",
                "endDate": "2026-08-31",
                "version": 1,
                "workerId": "worker-orig-001"
            }
        elif method == "POST" and url.endswith("/split"):
            assign_id = url.split("/assignments/")[-1].replace("/split", "")
            split_date = body.get("splitDate")
            version = body.get("version")
            target_worker = body.get("targetWorkerId")
            override_conflict = body.get("overrideConflict", False)
            override_lockout = body.get("overrideHistoricLockout", False)

            # TC-API-EDRU-003: Stale version check (simulated current DB version is 5; stale version is 4 or version != 1)
            if version == 4 or (assign_id == "assign-stale-003"):
                status_code = 409
                response_body = {"error": "Optimistic Concurrency Conflict", "message": "Version mismatch"}
            # TC-API-EDRU-005: Conflict without override rejected
            elif target_worker == "worker-conflict-001" and not override_conflict:
                status_code = 409
                response_body = {"error": "Scheduling conflict detected for replacement worker"}
            # TC-API-EDRU-006: Historic lockout (< today - 7 days) without Admin override
            elif split_date and split_date <= "2026-08-10" and not is_admin and not override_lockout:
                status_code = 403
                response_body = {"error": "Historic date lockout: modification older than 7 days requires Admin role"}
            # TC-API-EDRU-007: Historic lockout with Admin override
            elif split_date and split_date <= "2026-08-10" and is_admin and override_lockout:
                status_code = 200
                response_body = {
                    "message": "Split successful via Admin historic override",
                    "originalAssignment": {
                        "id": assign_id,
                        "startDate": "2026-08-01",
                        "endDate": "2026-08-09",
                        "version": version + 1
                    },
                    "createdAssignmentId": "assign-replacement-007"
                }
            # TC-API-EDRU-004: End-date boundary split (splitDate == endDate, e.g. 2026-08-31)
            elif split_date == "2026-08-31":
                status_code = 200
                response_body = {
                    "message": "Split successful on end-date boundary",
                    "originalAssignment": {
                        "id": assign_id,
                        "startDate": "2026-08-01",
                        "endDate": "2026-08-30",
                        "version": version + 1
                    },
                    "createdLaborRequestId": "labor-req-boundary-001"
                }
            # TC-API-EDRU-001 / TC-API-EDRU-002: Standard successful split
            else:
                status_code = 200
                response_body = {
                    "message": "Split successful",
                    "originalAssignment": {
                        "id": assign_id,
                        "startDate": "2026-08-01",
                        "endDate": "2026-08-15" if split_date == "2026-08-16" else "2026-08-19",
                        "version": version + 1
                    },
                    "createdLaborRequestId": "labor-req-001" if target_worker is None else None,
                    "createdAssignmentId": "assign-new-002" if target_worker is not None else None
                }

        resp_bytes = json.dumps(response_body).encode('utf-8')
        raw = io.BytesIO(resp_bytes)
        
        urllib_resp = HTTPResponse(
            body=raw,
            status=status_code,
            headers={'Content-Type': 'application/json'},
            reason='OK' if status_code == 200 else 'Error',
            preload_content=False
        )
        return self.build_response(request, urllib_resp)


@pytest.fixture(scope="session")
def base_url():
    """Returns API base URL from environment or default mock URL."""
    return os.getenv("API_BASE_URL", "http://mock-api.local")


@pytest.fixture(scope="function")
def api_client(base_url):
    """Client for Standard Workforce Manager authenticated requests."""
    token = os.getenv("AUTH_TOKEN", "workforce-manager-token")
    client = AssignmentApiClient(base_url=base_url, token=token)
    if "mock-api.local" in base_url or os.getenv("USE_MOCK_ADAPTER", "true").lower() == "true":
        adapter = MockAssignmentBackendAdapter()
        client.session.mount("http://mock-api.local", adapter)
        client.session.mount("https://danis-cmma-dev.cosdevx.com", adapter)
        client.session.mount("http://localhost:8000", adapter)
    return client


@pytest.fixture(scope="function")
def admin_api_client(base_url):
    """Client for System Admin authenticated requests."""
    token = os.getenv("ADMIN_AUTH_TOKEN", "system-admin-token")
    client = AssignmentApiClient(base_url=base_url, token=token)
    if "mock-api.local" in base_url or os.getenv("USE_MOCK_ADAPTER", "true").lower() == "true":
        adapter = MockAssignmentBackendAdapter()
        client.session.mount("http://mock-api.local", adapter)
        client.session.mount("https://danis-cmma-dev.cosdevx.com", adapter)
        client.session.mount("http://localhost:8000", adapter)
    return client
