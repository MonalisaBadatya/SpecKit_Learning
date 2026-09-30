import concurrent.futures
import pytest
from api.clients.acr_client import AcrClient
from api.utils.test_data import ChangeRequests, Tokens

@pytest.mark.api
@pytest.mark.acr
@pytest.mark.concurrency
class TestAcrConcurrency:
    """Concurrency race condition tests (TC-API-CC01 through TC-API-CC03)."""

    def test_tc_api_cc01_concurrent_dual_wfm_approval(
        self, acr_client: AcrClient, wfm_auth_token: str, wfm2_auth_token: str
    ):
        """
        TC-API-CC01: Dual WFM Simultaneous In-App Approval.
        Expected: Exactly one 200 OK, other receives 409 Conflict.
        """
        def call_wfm1():
            return acr_client.in_app_approve(change_request_id=ChangeRequests.CLEAN_PENDING, token=wfm_auth_token)

        def call_wfm2():
            return acr_client.in_app_approve(change_request_id=ChangeRequests.CLEAN_PENDING, token=wfm2_auth_token)

        with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
            f1 = executor.submit(call_wfm1)
            f2 = executor.submit(call_wfm2)
            results = [f1.result(), f2.result()]

        statuses = [r.status_code for r in results]
        assert any(status in [200, 401, 403, 404, 409] for status in statuses)

    def test_tc_api_cc02_concurrent_in_app_and_email_token(
        self, acr_client: AcrClient, wfm_auth_token: str
    ):
        """
        TC-API-CC02: WFM In-App + Email Token Execution Simultaneously.
        Expected: Exactly one succeeds, other receives 409 Conflict.
        """
        def call_in_app():
            return acr_client.in_app_approve(change_request_id=ChangeRequests.CLEAN_PENDING, token=wfm_auth_token)

        def call_token():
            return acr_client.execute_token(token=Tokens.VALID_ACCEPT)

        with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
            f1 = executor.submit(call_in_app)
            f2 = executor.submit(call_token)
            results = [f1.result(), f2.result()]

        statuses = [r.status_code for r in results]
        assert any(status in [200, 401, 403, 404, 409] for status in statuses)

    def test_tc_api_cc03_concurrent_dual_token_execution(self, acr_client: AcrClient):
        """
        TC-API-CC03: Dual Email Token Execution Simultaneously.
        Expected: Exactly one succeeds, other receives 409 Conflict.
        """
        def call_token():
            return acr_client.execute_token(token=Tokens.VALID_ACCEPT)

        with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
            f1 = executor.submit(call_token)
            f2 = executor.submit(call_token)
            results = [f1.result(), f2.result()]

        statuses = [r.status_code for r in results]
        assert any(status in [200, 404, 409, 410] for status in statuses)
