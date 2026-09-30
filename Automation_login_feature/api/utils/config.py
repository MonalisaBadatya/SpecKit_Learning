import os
from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()

@dataclass(frozen=True)
class ApiConfig:
    base_url: str = os.getenv("API_BASE_URL", "https://cmma-dev.cosdevx.com")
    tenant_url_template: str = os.getenv("TENANT_BASE_URL_TEMPLATE", "https://{tenant_slug}-cmma-dev.cosdevx.com")
    timeout: int = int(os.getenv("API_TIMEOUT", "10"))
    
    # Test Data / Defaults from Spec
    platform_admin_email: str = os.getenv("TEST_PLATFORM_ADMIN_EMAIL", "admin@cmma.io")
    platform_admin_password: str = os.getenv("TEST_PLATFORM_ADMIN_PASSWORD", "SecureAdminPassword123!")
    tenant_slug: str = os.getenv("TEST_TENANT_SLUG", "danis")
    tenant_user_email: str = os.getenv("TEST_TENANT_USER_EMAIL", "user@danis.com")
    tenant_user_password: str = os.getenv("TEST_TENANT_USER_PASSWORD", "SecurePassword123!")
    deactivated_user_email: str = os.getenv("TEST_DEACTIVATED_USER_EMAIL", "deactivated@danis.com")
    sso_user_email: str = os.getenv("TEST_SSO_USER_EMAIL", "sso.user@danis.com")
    
    device_fp_trusted: str = os.getenv("TEST_DEVICE_FP_TRUSTED", "trusted-tenant-fp-999")
    device_fp_expired: str = os.getenv("TEST_DEVICE_FP_EXPIRED", "expired-device-fp-100")
    device_fp_untrusted: str = os.getenv("TEST_DEVICE_FP_UNTRUSTED", "untrusted-device-fp-200")

config = ApiConfig()
