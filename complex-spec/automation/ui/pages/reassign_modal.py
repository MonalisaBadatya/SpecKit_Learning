"""Page Object for ReassignEffectiveDateModal.

Specification: QA_specAnalysis.md §5.2, Spec §2
Test Cases: TC-UI-EDRU-001, TC-UI-EDRU-002, TC-UI-EDRU-003, TC-UI-EDRU-005, TC-UI-EDRU-006, TC-UI-EDRU-012
"""
from playwright.sync_api import Page, Locator
from .base_page import BasePage


class ReassignEffectiveDateModal(BasePage):
    """Component object for the Reassign Effective Date selection and candidate step."""

    def __init__(self, page: Page):
        super().__init__(page)
        # Modal / Drawer container identified by Reassignment header or text
        self.modal_dialog: Locator = self.page.locator(".MuiDrawer-paper, [role='dialog']").filter(
            has_text="Choose Reassignment Effective Date"
        ).first
        self.header_title: Locator = self.modal_dialog.locator("text=Choose Reassignment Effective Date").first
        self.date_picker: Locator = self.modal_dialog.locator(
            "input[type='date'], input[name*='date'], input[placeholder*='YYYY'], input"
        ).first
        self.preview_preserved: Locator = self.modal_dialog.locator("text=/.*Preserved History.*/").first
        self.preview_replacement: Locator = self.modal_dialog.locator("text=/.*Replacement Worker Period.*/").first
        self.confirm_button: Locator = self.modal_dialog.get_by_role("button", name="Proceed to Select Replacement").or_(
            self.modal_dialog.locator("button:has-text('Proceed to Select Replacement')")
        ).or_(
            self.modal_dialog.locator("button:has-text('Next')")
        ).first
        self.next_button: Locator = self.confirm_button
        self.cancel_button: Locator = self.modal_dialog.get_by_role("button", name="Cancel").or_(
            self.modal_dialog.locator("button:has-text('Cancel')")
        ).first
        self.back_button: Locator = self.modal_dialog.locator("button:has-text('Back')").or_(
            self.modal_dialog.get_by_text("Back")
        ).first

    def is_visible(self) -> bool:
        """Returns True if the Reassign Effective Date view is visible."""
        return self.modal_dialog.is_visible()

    def wait_until_visible(self):
        """Waits for the Reassign Effective Date view to appear."""
        self.modal_dialog.wait_for(state="visible", timeout=10000)

    def wait_until_hidden(self):
        """Waits for the Reassign Effective Date view to disappear."""
        self.modal_dialog.wait_for(state="hidden", timeout=10000)

    def get_selected_date(self) -> str:
        """Returns the current value of the effective date input."""
        return self.date_picker.input_value()

    def get_date_min_bound(self) -> str:
        """Returns the HTML 'min' attribute restriction of the date picker."""
        return self.date_picker.get_attribute("min") or ""

    def get_date_max_bound(self) -> str:
        """Returns the HTML 'max' attribute restriction of the date picker."""
        return self.date_picker.get_attribute("max") or ""

    def set_effective_date(self, date_str: str):
        """Sets the effective date in the date picker."""
        self.date_picker.fill(date_str)

    def click_confirm_or_next(self):
        """Clicks Proceed to Select Replacement button."""
        self.confirm_button.click()

    def click_cancel(self):
        """Clicks the modal Cancel or Back button."""
        if self.cancel_button.is_visible():
            self.cancel_button.click()
        elif self.back_button.is_visible():
            self.back_button.click()

    def is_confirm_disabled(self) -> bool:
        """Returns True if the Proceed/Next button is disabled."""
        return self.confirm_button.is_disabled()
