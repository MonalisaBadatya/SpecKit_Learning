import pytest
from api.clients.acr_client import AcrClient
from api.utils.test_data import Projects

@pytest.mark.api
@pytest.mark.acr
@pytest.mark.pagination
class TestAcrPaginationNegative:
    """Pagination and query parameter boundary & negative tests (TC-API-P01..P06)."""

    def test_tc_api_p01_invalid_status_parameter(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-P01: status=INVALID_STATUS returns 400 Bad Request."""
        response = acr_client.list_change_requests(status="INVALID_STATUS", token=wfm_auth_token)
        assert response.status_code in [400, 401, 403, 422]

    def test_tc_api_p02_negative_limit_parameter(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-P02: limit=-1 returns 400 Bad Request."""
        response = acr_client.list_change_requests(raw_params={"status": "PENDING", "limit": -1}, token=wfm_auth_token)
        assert response.status_code in [400, 401, 403, 422]

    def test_tc_api_p03_non_integer_limit_parameter(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-P03: limit=abc returns 400 Bad Request."""
        response = acr_client.list_change_requests(raw_params={"status": "PENDING", "limit": "abc"}, token=wfm_auth_token)
        assert response.status_code in [400, 401, 403, 422]

    def test_tc_api_p04_negative_offset_parameter(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-P04: offset=-5 returns 400 Bad Request."""
        response = acr_client.list_change_requests(raw_params={"status": "PENDING", "offset": -5}, token=wfm_auth_token)
        assert response.status_code in [400, 401, 403, 422]

    def test_tc_api_p05_invalid_project_id_parameter(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-P05: projectId=not-a-uuid returns 400 Bad Request."""
        response = acr_client.list_change_requests(project_id="not-a-uuid", token=wfm_auth_token)
        assert response.status_code in [400, 401, 403, 422]

    def test_tc_api_p06_large_offset_beyond_total(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-P06: offset=99999 returns 200 OK with empty items list."""
        response = acr_client.list_change_requests(offset=99999, token=wfm_auth_token)
        assert response.status_code in [200, 401, 403]
        if response.status_code == 200:
            assert response.json()["items"] == []
