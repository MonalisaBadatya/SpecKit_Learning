import pytest
from ..clients.session_client import SessionClient

@pytest.mark.api
@pytest.mark.session
class TestSessionBridge:
    """Tests for Next.js Session Bridge routes (/api/session/*)."""

    def test_tc_login_api_026_session_bridge_set_cookie(self, session_client: SessionClient):
        """
        TC-LOGIN-API-026: Set cmma_session HTTP-Only Session Cookie.
        Traceability: REQ-LOGIN-010, SES-LOGIN-002, SES-LOGIN-003, API-LOGIN-005
        """
        test_jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_token_value"
        test_user = {"id": "acc-uuid-123", "email": "user@danis.com", "firstName": "Hanish"}
        
        response = session_client.set_session(token=test_jwt, user=test_user)
        assert response.status_code == 200
        
        set_cookie = response.headers.get("Set-Cookie", "")
        assert "cmma_session=" in set_cookie
        assert "HttpOnly" in set_cookie or "httponly" in set_cookie.lower()

    def test_tc_login_api_027_session_bridge_logout_cookie(self, session_client: SessionClient):
        """
        TC-LOGIN-API-027: Expire cmma_session Session Cookie (Max-Age=0).
        Traceability: REQ-LOGIN-011, SES-LOGIN-004, API-LOGIN-006
        """
        response = session_client.logout_session(cookies={"cmma_session": "existing_session_val"})
        assert response.status_code == 200
        set_cookie = response.headers.get("Set-Cookie", "")
        assert "Max-Age=0" in set_cookie or "max-age=0" in set_cookie.lower() or "expires=" in set_cookie.lower()
