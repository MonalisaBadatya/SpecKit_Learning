from typing import Any, Dict, List, Optional, Tuple
import psycopg2
from psycopg2.extras import RealDictCursor
from ..utils.db_config import db_config, DbConfig

class DatabaseClient:
    """Reusable PostgreSQL Client for CMMA Core and Tenant Schemas."""

    def __init__(self, config: Optional[DbConfig] = None):
        self.config = config or db_config
        self._connection = None

    def get_connection(self):
        if self._connection is None or self._connection.closed:
            self._connection = psycopg2.connect(
                host=self.config.host,
                port=self.config.port,
                dbname=self.config.database,
                user=self.config.user,
                password=self.config.password,
                sslmode=self.config.sslmode,
                connect_timeout=2
            )
            self._connection.autocommit = True
        return self._connection

    def fetch_one(self, query: str, params: Optional[Tuple[Any, ...]] = None) -> Optional[Dict[str, Any]]:
        conn = self.get_connection()
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, params or ())
            return cur.fetchone()

    def fetch_all(self, query: str, params: Optional[Tuple[Any, ...]] = None) -> List[Dict[str, Any]]:
        conn = self.get_connection()
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, params or ())
            return cur.fetchall()

    def execute(self, query: str, params: Optional[Tuple[Any, ...]] = None) -> int:
        conn = self.get_connection()
        with conn.cursor() as cur:
            cur.execute(query, params or ())
            return cur.rowcount

    def close(self):
        if self._connection and not self._connection.closed:
            self._connection.close()
            self._connection = None
