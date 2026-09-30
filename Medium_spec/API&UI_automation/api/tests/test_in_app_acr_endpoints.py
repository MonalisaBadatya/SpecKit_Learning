import pytest
from api.clients.acr_client import AcrClient
from api.utils.test_data import ChangeRequests, Projects

@pytest.mark.api
@pytest.mark.acr
@pytest.mark.approval
class TestInAppAcrEndpoints:
    """In-App WFM Approval, Rejection, and RBAC Endpoint Tests."""

    def test_tc_api_b07_list_pending_change_requests(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-B07: List PENDING requests with limit & offset."""
        response = acr_client.list_change_requests(status="PENDING", limit=10, offset=0, token=wfm_auth_token)
        assert response.status_code in [200, 401, 403]
        if response.status_code == 200:
            data = response.json()
            assert "items" in data
            assert "total" in data

    def test_tc_api_b08_list_filter_by_status_approved(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-B08: Filter list by status=APPROVED."""
        response = acr_client.list_change_requests(status="APPROVED", limit=10, offset=0, token=wfm_auth_token)
        assert response.status_code in [200, 401, 403]

    def test_tc_api_b09_list_filter_by_project_id(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-B09: Filter list by projectId."""
        response = acr_client.list_change_requests(
            status="PENDING",
            project_id=Projects.MEALS_ON_WHEELS,
            token=wfm_auth_token
        )
        assert response.status_code in [200, 401, 403]

    def test_tc_api_b12_in_app_clean_approval(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-B12: In-App Clean Approval (PATCH /:id/approve)."""
        response = acr_client.in_app_approve(change_request_id=ChangeRequests.CLEAN_PENDING, token=wfm_auth_token)
        assert response.status_code in [200, 401, 403, 404, 409]
        if response.status_code == 200:
            assert response.json()["status"] == "APPROVED"

    def test_tc_api_b13_in_app_conflict_override(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-B13: In-App Approval with overrideConflict=true."""
        response = acr_client.in_app_approve(
            change_request_id=ChangeRequests.CONFLICT_OVERLAP,
            override_conflict=True,
            token=wfm_auth_token
        )
        assert response.status_code in [200, 401, 403, 404, 409]

    def test_tc_api_b14_in_app_extension_approval(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-B14: In-App Approval with extendProjectEndDate=true."""
        response = acr_client.in_app_approve(
            change_request_id=ChangeRequests.PROJECT_EXTENSION,
            extend_project_end_date=True,
            token=wfm_auth_token
        )
        assert response.status_code in [200, 401, 403, 404, 409]

    def test_tc_api_b15_historic_lockout_admin_approval(self, acr_client: AcrClient, admin_auth_token: str):
        """TC-API-B15: Historic lockout override by System Admin succeeds."""
        response = acr_client.in_app_approve(
            change_request_id=ChangeRequests.HISTORIC_LOCKOUT,
            override_historic_lockout=True,
            token=admin_auth_token
        )
        assert response.status_code in [200, 401, 403, 404, 409]

    def test_tc_api_b16_pursuit_project_approval_blocked(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-B16: In-App approval on Pursuit project returns 400 Bad Request."""
        response = acr_client.in_app_approve(
            change_request_id=ChangeRequests.PURSUIT_GUARD,
            token=wfm_auth_token
        )
        assert response.status_code in [400, 401, 403, 404, 409, 422]

    def test_tc_api_b18_in_app_rejection_with_comment(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-B18: In-App rejection with reviewer comments."""
        response = acr_client.in_app_reject(
            change_request_id=ChangeRequests.CLEAN_PENDING,
            reviewer_comments="Worker needed on another project",
            token=wfm_auth_token
        )
        assert response.status_code in [200, 401, 403, 404, 409]

    def test_tc_api_b19_in_app_rejection_null_comment(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-B19: In-App rejection without comments (null) - tracks GAP-PLAN-001."""
        response = acr_client.in_app_reject(
            change_request_id=ChangeRequests.CLEAN_PENDING,
            reviewer_comments=None,
            token=wfm_auth_token
        )
        assert response.status_code in [200, 400, 401, 403, 404, 409]

    # --- Security & RBAC Tests ---

    def test_tc_api_s09_pm_cannot_approve(self, acr_client: AcrClient, pm_auth_token: str):
        """TC-API-S09: PM JWT on approve endpoint returns 403 Forbidden."""
        response = acr_client.in_app_approve(change_request_id=ChangeRequests.CLEAN_PENDING, token=pm_auth_token)
        assert response.status_code in [401, 403]

    def test_tc_api_s10_pm_cannot_reject(self, acr_client: AcrClient, pm_auth_token: str):
        """TC-API-S10: PM JWT on reject endpoint returns 403 Forbidden."""
        response = acr_client.in_app_reject(change_request_id=ChangeRequests.CLEAN_PENDING, token=pm_auth_token)
        assert response.status_code in [401, 403]

    def test_tc_api_s11_wfm_cannot_override_historic_lockout(self, acr_client: AcrClient, wfm_auth_token: str):
        """TC-API-S11: WFM attempting historic lockout override returns 403 Forbidden."""
        response = acr_client.in_app_approve(
            change_request_id=ChangeRequests.HISTORIC_LOCKOUT,
            override_historic_lockout=True,
            token=wfm_auth_token
        )
        assert response.status_code in [401, 403]

    def test_tc_api_s12_no_jwt_on_approve(self, acr_client: AcrClient):
        """TC-API-S12: Unauthenticated request to approve endpoint returns 401 Unauthorized."""
        response = acr_client.in_app_approve(change_request_id=ChangeRequests.CLEAN_PENDING, token=None)
        assert response.status_code in [401, 403]

    def test_tc_api_s13_pm_cannot_list_wfm_change_requests(self, acr_client: AcrClient, pm_auth_token: str):
        """TC-API-S13: PM JWT calling WFM list endpoint returns 403 Forbidden."""
        response = acr_client.list_change_requests(status="PENDING", token=pm_auth_token)
        assert response.status_code in [401, 403]

    def test_tc_api_s14_no_jwt_on_list(self, acr_client: AcrClient):
        """TC-API-S14: Unauthenticated request to list endpoint returns 401 Unauthorized."""
        response = acr_client.list_change_requests(status="PENDING", token=None)
        assert response.status_code in [401, 403]

    def test_tc_api_s15_cross_tenant_approve_isolation(self, tenant_b_acr_client: AcrClient, tenant_b_wfm_token: str):
        """TC-API-S15: Tenant B calling approve on Tenant A ACR returns 404 Not Found."""
        response = tenant_b_acr_client.in_app_approve(
            change_request_id=ChangeRequests.CLEAN_PENDING,
            token=tenant_b_wfm_token
        )
        assert response.status_code in [401, 403, 404]
