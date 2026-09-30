import os
from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()

@dataclass(frozen=True)
class UiConfig:
    platform_base_url: str = os.getenv("PLATFORM_UI_URL", "https://cmma-dev.cosdevx.com")
    tenant_url_template: str = os.getenv("TENANT_BASE_URL_TEMPLATE","https://{tenant_slug}-cmma-dev.cosdevx.com")
    headless: bool = os.getenv("HEADLESS", "true").lower() == "true"
    browser_type: str = os.getenv("BROWSER", "chromium")
    slow_mo: int = int(os.getenv("SLOW_MO", "0"))
    default_timeout: int = int(os.getenv("DEFAULT_TIMEOUT", "10000"))

    # Test Accounts & Defaults from Spec
    platform_admin_email: str = os.getenv("TEST_PLATFORM_ADMIN_EMAIL", "admin@cmma.io")
    platform_admin_password: str = os.getenv("TEST_PLATFORM_ADMIN_PASSWORD", "SecureAdminPassword123!")
    tenant_slug: str = os.getenv("TEST_TENANT_SLUG", "danis")
    tenant_user_email: str = os.getenv("TEST_TENANT_USER_EMAIL", "debashish.panda@costrategix.com")
    tenant_user_password: str = os.getenv("TEST_TENANT_USER_PASSWORD", "Costrategix@123")
    deactivated_user_email: str = os.getenv("TEST_DEACTIVATED_USER_EMAIL", "deactivated.user@danis.com")
    sso_user_email: str = os.getenv("TEST_SSO_USER_EMAIL", "sso.only.user@danis.com")

    # Fingerprints
    device_fp_trusted: str = os.getenv("TEST_DEVICE_FP_TRUSTED", "trusted-tenant-fp-999")
    device_fp_expired: str = os.getenv("TEST_DEVICE_FP_EXPIRED", "stale-device-fp-001")

    def get_tenant_url(self, slug: str = None) -> str:
        slug = slug or self.tenant_slug
        return self.tenant_url_template.format(tenant_slug=slug)

ui_config = UiConfig()
