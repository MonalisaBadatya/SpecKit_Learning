"""UI Test Configuration and Environment Variables.

Authority: complex-spec/test-results/test-cases/UI/EffectiveDate_Reassign_Unassign_UI_TestCases.md
Secrets and URLs are read from environment variables; defaults match test case prerequisites.
"""
import os
from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()


@dataclass(frozen=True)
class UiConfig:
    base_url: str = os.getenv("UI_BASE_URL", "https://danis-cmma-dev.cosdevx.com")
    headless: bool = os.getenv("HEADLESS", "true").lower() == "true"
    browser_type: str = os.getenv("BROWSER", "chromium")
    slow_mo: int = int(os.getenv("SLOW_MO", "0"))
    default_timeout: int = int(os.getenv("DEFAULT_TIMEOUT", "10000"))

    # Credentials from test case prerequisites (configured via env vars; default fallback for test runner)
    user_email: str = os.getenv("TEST_USER_EMAIL", "monalisa.badatya+1@costrategix.com")
    user_password: str = os.getenv("TEST_USER_PASSWORD", "Test@123")


ui_config = UiConfig()
