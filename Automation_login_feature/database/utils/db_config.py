import os
from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()

@dataclass(frozen=True)
class DbConfig:
    host: str = os.getenv("DB_HOST", "localhost")
    port: int = int(os.getenv("DB_PORT", "5432"))
    database: str = os.getenv("DB_NAME", "cmma_db")
    user: str = os.getenv("DB_USER", "cmma_app")
    password: str = os.getenv("DB_PASSWORD", "cmma_password")
    sslmode: str = os.getenv("DB_SSLMODE", "prefer")

db_config = DbConfig()
