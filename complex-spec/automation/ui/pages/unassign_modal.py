"""Page Object for UnassignConfirmationModal.

Specification: QA_specAnalysis.md §5.2, Spec §2
Test Cases: TC-UI-EDRU-001, TC-UI-EDRU-002, TC-UI-EDRU-003, TC-UI-EDRU-005, TC-UI-EDRU-006, TC-UI-EDRU-012
"""
from playwright.sync_api import Page, Locator
from .base_page import BasePage


class UnassignConfirmationModal(BasePage):
    """Component object for the Unassign Worker Effective Date drawer and confirmation view."""

    def __init__(self, page: Page):
        super().__init__(page)
        # Modal / Drawer container identified by Unassign Worker header or text
        self.modal_dialog: Locator = self.page.locator(".MuiDrawer-paper, [role='dialog']").filter(
            has_text="Unassign Worker"
        ).first
        self.header_title: Locator = self.modal_dialog.locator("text=Unassign Worker").first
        self.date_picker: Locator = self.modal_dialog.locator(
            "input[type='date'], input[name*='date'], input[placeholder*='YYYY'], input"
        ).first
        self.preview_preserved: Locator = self.modal_dialog.locator("text=/.*Preserved History.*/").first
        self.preview_unassigned: Locator = self.modal_dialog.locator("text=/.*Reopened Slot.*/").first
        self.confirm_button: Locator = self.modal_dialog.get_by_role("button", name="Unassign Worker").or_(
            self.modal_dialog.locator("button:has-text('Unassign Worker')")
        ).first
        self.cancel_button: Locator = self.modal_dialog.get_by_role("button", name="Cancel").or_(
            self.modal_dialog.locator("button:has-text('Cancel')")
        ).first
        self.back_button: Locator = self.modal_dialog.locator("button:has-text('Back')").or_(
            self.modal_dialog.get_by_text("Back")
        ).first

    def is_visible(self) -> bool:
        """Returns True if the Unassign view is visible."""
        return self.modal_dialog.is_visible()

    def wait_until_visible(self):
        """Waits for the Unassign view to appear."""
        self.modal_dialog.wait_for(state="visible", timeout=10000)

    def wait_until_hidden(self):
        """Waits for the Unassign view to disappear."""
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

    def get_preserved_preview_text(self) -> str:
        """Returns the text content of the preserved history description."""
        return self.preview_preserved.inner_text()

    def get_unassigned_preview_text(self) -> str:
        """Returns the text content of the reopened slot description."""
        return self.preview_unassigned.inner_text()

    def click_confirm(self):
        """Clicks the Unassign Worker confirm button."""
        self.confirm_button.click()

    def click_cancel(self):
        """Clicks the modal Cancel button."""
        if self.cancel_button.is_visible():
            self.cancel_button.click()
        elif self.back_button.is_visible():
            self.back_button.click()

    def is_confirm_disabled(self) -> bool:
        """Returns True if the Confirm button is disabled."""
        return self.confirm_button.is_disabled()
