import pytest
from api.clients.acr_client import AcrClient
from api.schemas.acr_schemas import (
    TokenPreviewResponse,
    TokenExecuteResponse,
    InAppApproveResponse,
    InAppRejectResponse,
    ListChangeRequestsResponse
)
from api.utils.test_data import ChangeRequests, Tokens

@pytest.mark.api
@pytest.mark.contract
class TestAcrContracts:
    """Contract Validation Suite (TC-API-C01 through TC-API-C08)."""

    def test_tc_api_c01_token_preview_schema_contract(self, acr_client: AcrClient):
        """TC-API-C01: GET /token-preview response schema matches contract."""
        response = acr_client.get_token_preview(token=Tokens.VALID_ACCEPT)
        if response.status_code == 200:
            validated = TokenPreviewResponse(**response.json())
            assert isinstance(validated.valid, bool)
            assert validated.action in ["ACCEPT", "DENY", "VIEW", None]
        else:
            assert response.status_code in [400, 404, 410]

    def test_tc_api_c02_token_execute_schema_contract(self, acr_client: AcrClient):
        """TC-API-C02: POST /execute-token response schema matches contract on 200."""
        response = acr_client.execute_token(token=Tokens.VALID_ACCEPT, override_conflict=False)
        if response.status_code == 200:
            validated = TokenExecuteResponse(**response.json())
            assert isinstance(validated.success, bool)
            assert isinstance(validated.changeRequestId, str)
        else:
            assert response.status_code in [400, 404, 409, 410]

    def test_tc_api_c03_list_schema_contract(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-C03: GET /assignment-change-requests list schema contract."""
        response = acr_client.list_change_requests(status="PENDING", limit=10, offset=0, token=wfm_auth_token)
        if response.status_code == 200:
            validated = ListChangeRequestsResponse(**response.json())
            assert isinstance(validated.items, list)
            assert isinstance(validated.total, int)
            assert validated.limit == 10
            assert validated.offset == 0
        else:
            assert response.status_code in [401, 403]

    def test_tc_api_c04_approve_schema_contract(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-C04: PATCH /:id/approve response schema contract."""
        response = acr_client.in_app_approve(change_request_id=ChangeRequests.CLEAN_PENDING, token=wfm_auth_token)
        if response.status_code == 200:
            validated = InAppApproveResponse(**response.json())
            assert validated.success is True
            assert validated.status == "APPROVED"
        else:
            assert response.status_code in [400, 401, 403, 404, 409]

    def test_tc_api_c05_reject_schema_contract(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-C05: PATCH /:id/reject response schema contract."""
        response = acr_client.in_app_reject(
            change_request_id=ChangeRequests.CLEAN_PENDING,
            reviewer_comments="Contract test reject",
            token=wfm_auth_token
        )
        if response.status_code == 200:
            validated = InAppRejectResponse(**response.json())
            assert validated.success is True
            assert validated.status == "REJECTED"
        else:
            assert response.status_code in [400, 401, 403, 404, 409]

    def test_tc_api_c06_override_conflict_wrong_type_rejected(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-C06: overrideConflict as string 'YES' must be rejected with 400."""
        response = acr_client.in_app_approve(
            change_request_id=ChangeRequests.CLEAN_PENDING,
            raw_payload={"overrideConflict": "YES"},
            token=wfm_auth_token
        )
        assert response.status_code in [400, 422]

    def test_tc_api_c07_historic_lockout_wrong_type_rejected(self, acr_client: AcrClient, admin_auth_token: str):
        """TC-API-C07: overrideHistoricLockout as integer 1 must be rejected with 400."""
        response = acr_client.in_app_approve(
            change_request_id=ChangeRequests.HISTORIC_LOCKOUT,
            raw_payload={"overrideHistoricLockout": 1},
            token=admin_auth_token
        )
        assert response.status_code in [400, 422]

    def test_tc_api_c08_execute_token_wrong_type_rejected(self, acr_client: AcrClient):
        """TC-API-C08: overrideConflict as string 'true' in execute-token rejected with 400."""
        response = acr_client.execute_token(
            raw_payload={"token": Tokens.VALID_ACCEPT, "overrideConflict": "true"}
        )
        assert response.status_code in [400, 422]
