import pytest
from ..clients.db_client import DatabaseClient

@pytest.fixture(scope="session")
def db_client() -> DatabaseClient:
    client = DatabaseClient()
    try:
        conn = client.get_connection()
    except Exception as e:
        pytest.skip(f"Database connection unavailable: {e}")
    yield client
    client.close()
