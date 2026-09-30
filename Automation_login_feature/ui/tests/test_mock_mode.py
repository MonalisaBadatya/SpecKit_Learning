import os
import pytest
from playwright.sync_api import Page, expect
from ..pages.login_page import LoginPage
from ..utils.ui_config import ui_config

@pytest.mark.ui
class TestMockMode:
    """Development mock mode banner tests."""

    def test_tc_login_ui_020_mock_mode_banner_display(self, login_page: LoginPage):
        """
        TC-LOGIN-UI-020: Development Mock Mode Banner Display.
        Traceability: REQ-LOGIN-018, UI-LOGIN-007, Spec ?5 (TC-LOGIN-11)
        """
        login_page.load_tenant_login(slug=ui_config.tenant_slug)
        # If running in mock environment, assert banner; otherwise verify condition
        if os.getenv("NEXT_PUBLIC_USE_MOCK", "false").lower() == "true":
            expect(login_page.mock_mode_banner).to_be_visible()
