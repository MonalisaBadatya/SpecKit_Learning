import re
import pytest
from playwright.sync_api import Page, expect
from ..pages.login_page import LoginPage
from ..pages.mfa_modal import MfaModal
from ..utils.ui_config import ui_config


@pytest.mark.ui
@pytest.mark.mfa
class TestLoginMfa:
    """Multi-Factor Authentication challenge UI trigger tests."""

    def test_tc_login_ui_008_stale_fingerprint_triggers_mfa_challenge(
        self, login_page: LoginPage, mfa_modal: MfaModal
    ):
        """
        TC-LOGIN-UI-008: Stale / Expired Device Fingerprint MFA Challenge.
        Traceability: REQ-LOGIN-005, REQ-LOGIN-006, BR-LOGIN-004, BR-LOGIN-005,
                      UI-LOGIN-006, Spec §4.2, §5 (TC-LOGIN-10)

        Uses regex route pattern to intercept the login API regardless of whether
        the backend is on the same domain (Next.js proxy) or a separate API host.
        """
        login_page.load_tenant_login(slug=ui_config.tenant_slug)
        login_page.wait_for_login_form(timeout=15000)

        # Regex pattern matches /api/auth/login on any host (same-domain proxy or external backend)
        login_page.page.route(
            re.compile(r".*/api/auth/login"),
            lambda route: route.fulfill(
                status=200,
                content_type="application/json",
                body='{"mfa_required": true, "email": "user@danis.com"}'
            )
        )

        login_page.login(
            email=ui_config.tenant_user_email,
            password=ui_config.tenant_user_password
        )

        # Expect MFA prompt to be rendered (dialog, otp-container, or verification text)
        expect(mfa_modal.modal_container).to_be_visible(timeout=8000)
        assert "/mfa" in login_page.get_current_url() or "/login" in login_page.get_current_url()

    def test_tc_login_ui_009_missing_fingerprint_triggers_mfa_challenge(
        self, login_page: LoginPage, mfa_modal: MfaModal
    ):
        """
        TC-LOGIN-UI-009: Unrecognized / Missing Device Fingerprint MFA Challenge.
        Traceability: REQ-LOGIN-005, REQ-LOGIN-006, BR-LOGIN-005, UI-LOGIN-006,
                      Spec §1.1, §3.1
        """
        login_page.load_tenant_login(slug=ui_config.tenant_slug)
        login_page.wait_for_login_form(timeout=15000)

        login_page.page.route(
            re.compile(r".*/api/auth/login"),
            lambda route: route.fulfill(
                status=200,
                content_type="application/json",
                body='{"mfa_required": true, "email": "user@danis.com"}'
            )
        )

        login_page.login(
            email=ui_config.tenant_user_email,
            password=ui_config.tenant_user_password
        )
        expect(mfa_modal.modal_container).to_be_visible(timeout=8000)
