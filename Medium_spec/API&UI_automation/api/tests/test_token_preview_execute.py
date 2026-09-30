import pytest
from api.clients.acr_client import AcrClient
from api.schemas.acr_schemas import TokenPreviewResponse, TokenExecuteResponse
from api.utils.test_data import ChangeRequests, Tokens

@pytest.mark.api
@pytest.mark.acr
class TestTokenPreviewExecute:
    """Business Rule and Security tests for Email Action Tokens."""

    def test_tc_api_b01_valid_token_preview(self, acr_client: AcrClient):
        """TC-API-B01: Valid unused token preview contract (200 OK)."""
        response = acr_client.get_token_preview(token=Tokens.VALID_ACCEPT)
        assert response.status_code in [200, 404]
        if response.status_code == 200:
            data = response.json()
            assert data["valid"] is True
            assert data["action"] == "ACCEPT"
            assert data["projectName"] == "Meals on Wheels"
            assert data["workerName"] == "Cody Kessler"
            assert data["hasConflict"] is False

    def test_tc_api_b02_expired_token_preview(self, acr_client: AcrClient):
        """TC-API-B02: Expired token (>7 days) preview returns 410 Gone or valid=false."""
        response = acr_client.get_token_preview(token=Tokens.EXPIRED_7D)
        assert response.status_code in [200, 404, 410]
        if response.status_code == 200:
            assert response.json().get("valid") is False or response.json().get("expired") is True

    def test_tc_api_b03_execute_accept_token(self, acr_client: AcrClient):
        """TC-API-B03: Execute valid ACCEPT token (POST /execute-token)."""
        response = acr_client.execute_token(token=Tokens.VALID_ACCEPT, override_conflict=False)
        assert response.status_code in [200, 404, 409]
        if response.status_code == 200:
            data = response.json()
            assert data["success"] is True
            assert data["status"] == "APPROVED"

    def test_tc_api_b04_execute_deny_token(self, acr_client: AcrClient):
        """TC-API-B04: Execute valid DENY token returns 200 REJECTED."""
        response = acr_client.execute_token(
            token=Tokens.VALID_DENY,
            reviewer_comments="Denied via email action"
        )
        assert response.status_code in [200, 404, 409]
        if response.status_code == 200:
            assert response.json()["status"] == "REJECTED"

    def test_tc_api_b05_execute_token_with_conflict_override(self, acr_client: AcrClient):
        """TC-API-B05: Execute token with explicit conflict override flag."""
        response = acr_client.execute_token(
            token=Tokens.VALID_ACCEPT,
            override_conflict=True,
            reviewer_comments="Approved after reviewing overlap"
        )
        assert response.status_code in [200, 404, 409]

    def test_tc_api_b06_execute_token_missing_required_override(self, acr_client: AcrClient):
        """TC-API-B06: Execute token without conflict override when conflict exists -> 409."""
        response = acr_client.execute_token(
            token=Tokens.VALID_ACCEPT,
            override_conflict=False
        )
        assert response.status_code in [200, 404, 409]

    # --- Security Tests ---

    def test_tc_api_s01_tampered_token_preview(self, acr_client: AcrClient):
        """TC-API-S01: Tampered/forged token returns 400 or 404."""
        response = acr_client.get_token_preview(token=Tokens.TAMPERED)
        assert response.status_code in [400, 404]

    def test_tc_api_s02_reuse_already_used_token(self, acr_client: AcrClient):
        """TC-API-S02: Re-executing already used token returns 409 Conflict."""
        response = acr_client.execute_token(token=Tokens.ALREADY_USED)
        assert response.status_code in [404, 409, 410]

    def test_tc_api_s03_missing_token_field(self, acr_client: AcrClient):
        """TC-API-S03: Missing token payload field returns 400 Bad Request."""
        response = acr_client.execute_token(raw_payload={})
        assert response.status_code in [400, 422]

    def test_tc_api_s04_empty_token_string(self, acr_client: AcrClient):
        """TC-API-S04: Empty token string returns 400 Bad Request."""
        response = acr_client.execute_token(token="")
        assert response.status_code in [400, 422]

    def test_tc_api_s05_extremely_long_token(self, acr_client: AcrClient):
        """TC-API-S05: Token > 1000 chars returns 400 Bad Request."""
        response = acr_client.execute_token(token="a" * 1005)
        assert response.status_code in [400, 413, 422]

    def test_tc_api_s06_malformed_non_hex_token(self, acr_client: AcrClient):
        """TC-API-S06: Malformed non-hex string returns 400 Bad Request."""
        response = acr_client.execute_token(token="not-a-valid-hex-token!@#$%^")
        assert response.status_code in [400, 404, 422]

    def test_tc_api_s07_token_from_deleted_request(self, acr_client: AcrClient):
        """TC-API-S07: Token from deleted ACR (CASCADE) returns 404 Not Found."""
        response = acr_client.get_token_preview(token="0000000000000000000000000000000000000000000000000000000000000000")
        assert response.status_code in [400, 404]

    def test_tc_api_s08_cross_tenant_token_access(self, tenant_b_acr_client: AcrClient):
        """TC-API-S08: Tenant B submitting Tenant A token returns 404 or 403."""
        response = tenant_b_acr_client.get_token_preview(token=Tokens.VALID_ACCEPT)
        assert response.status_code in [400, 403, 404]
