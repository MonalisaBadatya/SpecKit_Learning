import os
from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()

@dataclass(frozen=True)
class UiConfig:
    platform_base_url: str = os.getenv("PLATFORM_UI_URL", "https://cmma-dev.cosdevx.com")
    tenant_url_template: str = os.getenv("TENANT_BASE_URL_TEMPLATE", "https://{tenant_slug}-cmma-dev.cosdevx.com")
    tenant_slug: str = os.getenv("TEST_TENANT_SLUG", "danis")
    headless: bool = os.getenv("HEADLESS", "true").lower() == "true"
    browser_type: str = os.getenv("BROWSER", "chromium")
    slow_mo: int = int(os.getenv("SLOW_MO", "0"))
    default_timeout: int = int(os.getenv("DEFAULT_TIMEOUT", "10000"))

    # Test Accounts
    wfm_email: str = os.getenv("TEST_WFM_EMAIL", "wfm.danis@cmma.io")
    wfm_password: str = os.getenv("TEST_WFM_PASSWORD", "SecureWfmPassword123!")
    pm_email: str = os.getenv("TEST_PM_EMAIL", "ahmed.personal@danis.com")
    pm_password: str = os.getenv("TEST_PM_PASSWORD", "SecurePmPassword123!")
    admin_email: str = os.getenv("TEST_ADMIN_EMAIL", "admin@cmma.io")
    admin_password: str = os.getenv("TEST_ADMIN_PASSWORD", "SecureAdminPassword123!")

    def get_tenant_url(self, slug: str = None) -> str:
        slug = slug or self.tenant_slug
        return self.tenant_url_template.format(tenant_slug=slug)

ui_config = UiConfig()
