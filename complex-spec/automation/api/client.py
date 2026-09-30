"""API Client for Assignment Scheduling and Effective Date Split endpoints.

Traceability: REQ-EDRU-006, REQ-EDRU-007, REQ-EDRU-010, REQ-EDRU-011
"""
import os
import requests
from typing import Optional, Dict, Any


class AssignmentApiClient:
    """HTTP Client for CMMA Workforce Scheduling Assignment APIs."""

    def __init__(self, base_url: Optional[str] = None, token: Optional[str] = None):
        self.base_url = (base_url or os.getenv("API_BASE_URL", "https://danis-cmma-dev.cosdevx.com")).rstrip("/")
        self.token = token or os.getenv("AUTH_TOKEN", "default-user-token")
        self.session = requests.Session()
        self.session.headers.update({
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.token}"
        })

    def get_assignment(self, assignment_id: str, headers: Optional[Dict[str, str]] = None) -> requests.Response:
        """GET /api/workforce/scheduling/assignments/{assignment_id}

        Retrieves current assignment details including OCC version and date range.
        """
        url = f"{self.base_url}/api/workforce/scheduling/assignments/{assignment_id}"
        req_headers = self.session.headers.copy()
        if headers:
            req_headers.update(headers)
        return self.session.get(url, headers=req_headers)

    def post_split(self, assignment_id: str, payload: Dict[str, Any], headers: Optional[Dict[str, str]] = None) -> requests.Response:
        """POST /api/workforce/scheduling/assignments/{assignment_id}/split

        Executes effective-date split mutation for Unassign or Reassign.
        """
        url = f"{self.base_url}/api/workforce/scheduling/assignments/{assignment_id}/split"
        req_headers = self.session.headers.copy()
        if headers:
            req_headers.update(headers)
        return self.session.post(url, json=payload, headers=req_headers)
