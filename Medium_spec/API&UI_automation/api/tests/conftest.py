import pytest
from api.clients.acr_client import AcrClient
from api.utils.config import config

@pytest.fixture(scope="session")
def acr_client() -> AcrClient:
    return AcrClient(base_url=config.base_url, timeout=config.timeout)

@pytest.fixture(scope="session")
def tenant_b_acr_client() -> AcrClient:
    return AcrClient(base_url=config.get_tenant_base_url(config.tenant_b_slug), timeout=config.timeout)

@pytest.fixture(scope="session")
def wfm_auth_token() -> str:
    return "dummy_wfm_jwt_token_sarah"

@pytest.fixture(scope="session")
def wfm2_auth_token() -> str:
    return "dummy_wfm_jwt_token_mike"

@pytest.fixture(scope="session")
def pm_auth_token() -> str:
    return "dummy_pm_jwt_token_ahmed"

@pytest.fixture(scope="session")
def other_pm_auth_token() -> str:
    return "dummy_pm_jwt_token_bob"

@pytest.fixture(scope="session")
def admin_auth_token() -> str:
    return "dummy_admin_jwt_token"

@pytest.fixture(scope="session")
def tenant_b_wfm_token() -> str:
    return "dummy_tenant_b_wfm_jwt"
