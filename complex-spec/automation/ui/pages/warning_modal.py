"""Page Object for Start Date Warning Confirmation Dialog.

Specification: QA_specAnalysis.md §5.2, Spec §2
Test Case: TC-UI-EDRU-009
"""
from playwright.sync_api import Page, Locator
from .base_page import BasePage


class StartDateWarningModal(BasePage):
    """Component object for the warning dialog shown when effectiveDate == startDate."""

    def __init__(self, page: Page):
        super().__init__(page)
        self.dialog: Locator = self.page.get_by_role("dialog", name="Warning")
        self.message: Locator = self.dialog.locator("[data-testid='warning-message'], .warning-text, p")
        self.confirm_button: Locator = self.dialog.get_by_role("button", name="Confirm")
        self.cancel_button: Locator = self.dialog.get_by_role("button", name="Cancel")

    def is_visible(self) -> bool:
        """Returns True if the warning dialog is displayed."""
        return self.dialog.is_visible()

    def wait_until_visible(self):
        """Waits for the warning dialog to be displayed."""
        self.dialog.wait_for(state="visible")

    def get_warning_message(self) -> str:
        """Returns the text message displayed in the warning dialog."""
        return self.message.inner_text()

    def click_confirm(self):
        """Confirms the warning dialog to proceed with full operation."""
        self.confirm_button.click()

    def click_cancel(self):
        """Cancels out of the warning dialog."""
        self.cancel_button.click()
