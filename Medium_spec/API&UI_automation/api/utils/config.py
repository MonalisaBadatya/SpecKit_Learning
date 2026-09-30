import os
from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()

@dataclass(frozen=True)
class ApiConfig:
    base_url: str = os.getenv("API_BASE_URL", "https://cmma-dev.cosdevx.com")
    tenant_url_template: str = os.getenv("TENANT_BASE_URL_TEMPLATE", "https://{tenant_slug}-cmma-dev.cosdevx.com")
    tenant_slug: str = os.getenv("TEST_TENANT_SLUG", "danis")
    tenant_b_slug: str = os.getenv("TEST_TENANT_B_SLUG", "tenantb")
    timeout: int = int(os.getenv("API_TIMEOUT", "10"))

    # Credentials
    wfm_email: str = os.getenv("TEST_WFM_EMAIL", "wfm.danis@cmma.io")
    wfm_password: str = os.getenv("TEST_WFM_PASSWORD", "SecureWfmPassword123!")
    wfm2_email: str = os.getenv("TEST_WFM2_EMAIL", "wfm2.danis@cmma.io")
    wfm2_password: str = os.getenv("TEST_WFM2_PASSWORD", "SecureWfm2Password123!")
    pm_email: str = os.getenv("TEST_PM_EMAIL", "ahmed.personal@danis.com")
    pm_password: str = os.getenv("TEST_PM_PASSWORD", "SecurePmPassword123!")
    other_pm_email: str = os.getenv("TEST_OTHER_PM_EMAIL", "other.pm@danis.com")
    other_pm_password: str = os.getenv("TEST_OTHER_PM_PASSWORD", "SecureOtherPm123!")
    admin_email: str = os.getenv("TEST_ADMIN_EMAIL", "admin@cmma.io")
    admin_password: str = os.getenv("TEST_ADMIN_PASSWORD", "SecureAdminPassword123!")
    tenant_b_wfm_email: str = os.getenv("TEST_TENANT_B_WFM_EMAIL", "wfm.tenantb@cmma.io")
    tenant_b_wfm_password: str = os.getenv("TEST_TENANT_B_WFM_PASSWORD", "SecureTenantB123!")

    def get_tenant_base_url(self, slug: str = None) -> str:
        slug = slug or self.tenant_slug
        return self.tenant_url_template.format(tenant_slug=slug)

config = ApiConfig()
