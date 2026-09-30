import pytest
from ..clients.auth_client import AuthClient
from ..clients.session_client import SessionClient

@pytest.fixture(scope="session")
def auth_client() -> AuthClient:
    return AuthClient()

@pytest.fixture(scope="session")
def session_client() -> SessionClient:
    return SessionClient()
