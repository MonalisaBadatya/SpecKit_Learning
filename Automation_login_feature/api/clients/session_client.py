from typing import Optional, Dict, Any
import requests
from ..utils.config import config

class SessionClient:
    """Reusable HTTP Client for Next.js Session Bridge (/api/session/*)."""

    def __init__(self, base_url: Optional[str] = None, timeout: Optional[int] = None):
        self.base_url = (base_url or config.base_url).rstrip('/')
        self.timeout = timeout or config.timeout
        self.session = requests.Session()

    def set_session(
        self,
        token: str,
        user: Dict[str, Any],
        headers: Optional[Dict[str, str]] = None
    ) -> requests.Response:
        url = f"{self.base_url}/api/session/login"
        req_headers = {"Content-Type": "application/json"}
        if headers:
            req_headers.update(headers)
        payload = {"token": token, "user": user}
        return self.session.post(url, json=payload, headers=req_headers, timeout=self.timeout)

    def logout_session(
        self,
        cookies: Optional[Dict[str, str]] = None,
        headers: Optional[Dict[str, str]] = None
    ) -> requests.Response:
        url = f"{self.base_url}/api/session/logout"
        req_headers = {"Content-Type": "application/json"}
        if headers:
            req_headers.update(headers)
        return self.session.post(url, json={}, headers=req_headers, cookies=cookies, timeout=self.timeout)
