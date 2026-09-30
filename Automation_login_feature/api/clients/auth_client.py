from typing import Optional, Dict, Any
import requests
from ..utils.config import config

class AuthClient:
    """Reusable HTTP Client for CMMA Auth Endpoints (/api/auth/*)."""

    def __init__(self, base_url: Optional[str] = None, timeout: Optional[int] = None):
        self.base_url = (base_url or config.base_url).rstrip('/')
        self.timeout = timeout or config.timeout
        self.session = requests.Session()

    def login(
        self,
        email: Optional[str] = None,
        password: Optional[str] = None,
        tenant_slug: Optional[str] = None,
        device_fingerprint: Optional[str] = None,
        headers: Optional[Dict[str, str]] = None,
        custom_payload: Optional[Dict[str, Any]] = None
    ) -> requests.Response:
        url = f"{self.base_url}/api/auth/login"
        req_headers = {"Content-Type": "application/json"}
        if headers:
            req_headers.update(headers)

        if custom_payload is not None:
            payload = custom_payload
        else:
            payload = {}
            if email is not None:
                payload["email"] = email
            if password is not None:
                payload["password"] = password
            if tenant_slug is not None:
                payload["tenantSlug"] = tenant_slug
            if device_fingerprint is not None:
                payload["deviceFingerprint"] = device_fingerprint

        return self.session.post(url, json=payload, headers=req_headers, timeout=self.timeout)

    def entra_login(
        self,
        token: Optional[str] = None,
        tenant_slug: Optional[str] = None,
        headers: Optional[Dict[str, str]] = None,
        custom_payload: Optional[Dict[str, Any]] = None
    ) -> requests.Response:
        url = f"{self.base_url}/api/auth/entra"
        req_headers = {"Content-Type": "application/json"}
        if headers:
            req_headers.update(headers)

        if custom_payload is not None:
            payload = custom_payload
        else:
            payload = {}
            if token is not None:
                payload["token"] = token
            if tenant_slug is not None:
                payload["tenantSlug"] = tenant_slug

        return self.session.post(url, json=payload, headers=req_headers, timeout=self.timeout)

    def check_auth_type(
        self,
        email: Optional[str] = None,
        tenant_slug: Optional[str] = None,
        headers: Optional[Dict[str, str]] = None,
        custom_payload: Optional[Dict[str, Any]] = None
    ) -> requests.Response:
        url = f"{self.base_url}/api/auth/check-auth-type"
        req_headers = {"Content-Type": "application/json"}
        if headers:
            req_headers.update(headers)

        if custom_payload is not None:
            payload = custom_payload
        else:
            payload = {}
            if email is not None:
                payload["email"] = email
            if tenant_slug is not None:
                payload["tenantSlug"] = tenant_slug

        return self.session.post(url, json=payload, headers=req_headers, timeout=self.timeout)

    def get_config(
        self,
        slug: Optional[str] = None,
        headers: Optional[Dict[str, str]] = None
    ) -> requests.Response:
        url = f"{self.base_url}/api/auth/config"
        params = {}
        if slug is not None:
            params["slug"] = slug

        return self.session.get(url, params=params, headers=headers, timeout=self.timeout)
