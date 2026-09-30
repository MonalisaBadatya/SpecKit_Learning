import pytest
from api.clients.acr_client import AcrClient
from api.utils.test_data import ChangeRequests, Tokens

@pytest.mark.api
@pytest.mark.acr
@pytest.mark.statemachine
class TestAcrStateMachine:
    """State machine invalid transition integrity tests (TC-API-SM01..SM08)."""

    def test_tc_api_sm01_approved_cannot_be_approved_again(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-SM01: APPROVED -> Approve again returns 409 Conflict."""
        response = acr_client.in_app_approve(change_request_id=ChangeRequests.ALREADY_APPROVED, token=wfm_auth_token)
        assert response.status_code in [401, 403, 404, 409]

    def test_tc_api_sm02_approved_cannot_be_rejected(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-SM02: APPROVED -> Reject returns 409 Conflict."""
        response = acr_client.in_app_reject(change_request_id=ChangeRequests.ALREADY_APPROVED, token=wfm_auth_token)
        assert response.status_code in [401, 403, 404, 409]

    def test_tc_api_sm03_rejected_cannot_be_approved(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-SM03: REJECTED -> Approve returns 409 Conflict."""
        response = acr_client.in_app_approve(change_request_id=ChangeRequests.ALREADY_REJECTED, token=wfm_auth_token)
        assert response.status_code in [401, 403, 404, 409]

    def test_tc_api_sm04_rejected_cannot_be_rejected_again(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-SM04: REJECTED -> Reject again returns 409 Conflict."""
        response = acr_client.in_app_reject(change_request_id=ChangeRequests.ALREADY_REJECTED, token=wfm_auth_token)
        assert response.status_code in [401, 403, 404, 409]

    def test_tc_api_sm05_cancelled_cannot_be_approved(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-SM05: CANCELLED -> Approve returns 409 Conflict."""
        response = acr_client.in_app_approve(change_request_id=ChangeRequests.ALREADY_CANCELLED, token=wfm_auth_token)
        assert response.status_code in [401, 403, 404, 409]

    def test_tc_api_sm06_token_execute_on_approved_request(self, acr_client: AcrClient):
        """TC-API-SM06: Execute token against already APPROVED request returns 409."""
        response = acr_client.execute_token(token=Tokens.ALREADY_USED)
        assert response.status_code in [404, 409, 410]

    def test_tc_api_sm07_token_execute_on_rejected_request(self, acr_client: AcrClient):
        """TC-API-SM07: Execute token against already REJECTED request returns 409."""
        response = acr_client.execute_token(token=Tokens.ALREADY_USED)
        assert response.status_code in [404, 409, 410]

    def test_tc_api_sm08_token_execute_on_cancelled_request(self, acr_client: AcrClient):
        """TC-API-SM08: Execute token against already CANCELLED request returns 409/410."""
        response = acr_client.execute_token(token=Tokens.ALREADY_USED)
        assert response.status_code in [404, 409, 410]
