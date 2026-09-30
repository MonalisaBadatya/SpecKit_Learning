import re
from playwright.sync_api import Page, Locator
from ui.pages.base_page import BasePage
from ui.utils.ui_config import ui_config

class LandingWidgetPage(BasePage):
    """Page Object for WFM Landing Page Assignment Change Requests Widget."""

    def __init__(self, page: Page):
        super().__init__(page)

    @property
    def widget_container(self) -> Locator:
        return self.page.locator("[data-testid='acr-widget'], .acr-widget-container").or_(
            self.page.get_by_role("heading", name=re.compile(r"Assignment Change Requests", re.IGNORECASE))
        ).first

    @property
    def table_rows(self) -> Locator:
        return self.page.locator("[data-testid='acr-table-row'], tr.acr-row").or_(
            self.page.get_by_role("row")
        )

    def get_review_link(self, worker_name: str) -> Locator:
        return self.page.get_by_role("row", name=re.compile(worker_name, re.IGNORECASE)).get_by_role("link", name="Review").or_(
            self.page.get_by_role("button", name="Review")
        ).first

    def load_wfm_landing(self, slug: str = None):
        url = f"{ui_config.get_tenant_url(slug)}/"
        self.navigate_to(url)
