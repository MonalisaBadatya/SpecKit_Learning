from typing import Optional, Dict, Any
import requests
from api.utils.config import config

class AcrClient:
    """HTTP Client for Assignment Change Request API Endpoints."""

    def __init__(self, base_url: Optional[str] = None, timeout: Optional[int] = None):
        self.base_url = (base_url or config.base_url).rstrip('/')
        self.timeout = timeout or config.timeout
        self.session = requests.Session()

    def get_token_preview(
        self,
        token: Optional[str] = None,
        raw_params: Optional[Dict[str, Any]] = None,
        headers: Optional[Dict[str, str]] = None
    ) -> requests.Response:
        url = f"{self.base_url}/api/workforce/assignment-change-requests/token-preview"
        params = raw_params if raw_params is not None else ({"token": token} if token is not None else {})
        return self.session.get(url, params=params, headers=headers, timeout=self.timeout)

    def execute_token(
        self,
        token: Optional[str] = None,
        override_conflict: Optional[Any] = False,
        reviewer_comments: Optional[str] = None,
        raw_payload: Optional[Dict[str, Any]] = None,
        headers: Optional[Dict[str, str]] = None
    ) -> requests.Response:
        url = f"{self.base_url}/api/workforce/assignment-change-requests/execute-token"
        if raw_payload is not None:
            payload = raw_payload
        else:
            payload = {}
            if token is not None:
                payload["token"] = token
            if override_conflict is not None:
                payload["overrideConflict"] = override_conflict
            if reviewer_comments is not None:
                payload["reviewerComments"] = reviewer_comments
        return self.session.post(url, json=payload, headers=headers, timeout=self.timeout)

    def list_change_requests(
        self,
        status: Optional[str] = "PENDING",
        project_id: Optional[str] = None,
        limit: Optional[Any] = 10,
        offset: Optional[Any] = 0,
        raw_params: Optional[Dict[str, Any]] = None,
        token: Optional[str] = None,
        headers: Optional[Dict[str, str]] = None
    ) -> requests.Response:
        url = f"{self.base_url}/api/workforce/assignment-change-requests"
        if raw_params is not None:
            params = raw_params
        else:
            params = {}
            if status is not None:
                params["status"] = status
            if limit is not None:
                params["limit"] = limit
            if offset is not None:
                params["offset"] = offset
            if project_id:
                params["projectId"] = project_id

        req_headers = dict(headers or {})
        if token:
            req_headers["Authorization"] = f"Bearer {token}"
        return self.session.get(url, params=params, headers=req_headers, timeout=self.timeout)

    def in_app_approve(
        self,
        change_request_id: str,
        override_conflict: Optional[Any] = False,
        override_historic_lockout: Optional[Any] = False,
        extend_project_end_date: Optional[Any] = False,
        raw_payload: Optional[Dict[str, Any]] = None,
        token: Optional[str] = None,
        headers: Optional[Dict[str, str]] = None
    ) -> requests.Response:
        url = f"{self.base_url}/api/workforce/assignment-change-requests/{change_request_id}/approve"
        if raw_payload is not None:
            payload = raw_payload
        else:
            payload = {}
            if override_conflict is not None:
                payload["overrideConflict"] = override_conflict
            if override_historic_lockout is not None:
                payload["overrideHistoricLockout"] = override_historic_lockout
            if extend_project_end_date is not None:
                payload["extendProjectEndDate"] = extend_project_end_date

        req_headers = dict(headers or {})
        if token:
            req_headers["Authorization"] = f"Bearer {token}"
        return self.session.patch(url, json=payload, headers=req_headers, timeout=self.timeout)

    def in_app_reject(
        self,
        change_request_id: str,
        reviewer_comments: Optional[Any] = None,
        raw_payload: Optional[Dict[str, Any]] = None,
        token: Optional[str] = None,
        headers: Optional[Dict[str, str]] = None
    ) -> requests.Response:
        url = f"{self.base_url}/api/workforce/assignment-change-requests/{change_request_id}/reject"
        if raw_payload is not None:
            payload = raw_payload
        else:
            payload = {}
            if reviewer_comments is not None:
                payload["reviewerComments"] = reviewer_comments

        req_headers = dict(headers or {})
        if token:
            req_headers["Authorization"] = f"Bearer {token}"
        return self.session.patch(url, json=payload, headers=req_headers, timeout=self.timeout)
