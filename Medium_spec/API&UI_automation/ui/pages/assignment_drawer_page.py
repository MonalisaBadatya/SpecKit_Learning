import re
from typing import Optional
from playwright.sync_api import Page, Locator
from ui.pages.base_page import BasePage

class AssignmentDrawerPage(BasePage):
    """Page Object for Assignment Detail Drawer & Comparison Banner."""

    def __init__(self, page: Page):
        super().__init__(page)

    @property
    def drawer(self) -> Locator:
        return self.page.locator("[role='dialog'], [data-testid='assignment-drawer'], .assignment-detail-drawer").first

    @property
    def comparison_banner(self) -> Locator:
        return self.page.locator(".comparison-banner, [data-testid='acr-comparison-banner']").or_(
            self.page.get_by_text("CHANGE REQUEST PENDING REVIEW", exact=False)
        ).first

    @property
    def requester_name(self) -> Locator:
        return self.page.locator(".requester-name, [data-testid='acr-requester']").first

    @property
    def justification_text(self) -> Locator:
        return self.page.locator(".justification-quote, [data-testid='acr-justification']").first

    # Alert Badges
    @property
    def conflict_badge(self) -> Locator:
        return self.page.locator("[data-testid='conflict-badge']").or_(
            self.page.get_by_text("Scheduling Conflict / Time-Off Detected", exact=False)
        ).first

    @property
    def extend_project_badge(self) -> Locator:
        return self.page.locator("[data-testid='extension-badge']").or_(
            self.page.get_by_text("Extends Project End Date", exact=False)
        ).first

    @property
    def historic_lockout_badge(self) -> Locator:
        return self.page.locator("[data-testid='historic-lockout-badge']").or_(
            self.page.get_by_text("Historic Lockout Threshold", exact=False)
        ).first

    # Action Buttons
    @property
    def accept_button(self) -> Locator:
        return self.page.get_by_role("button", name=re.compile(r"Accept Changes", re.IGNORECASE)).first

    @property
    def reject_button(self) -> Locator:
        return self.page.get_by_role("button", name=re.compile(r"^Reject$", re.IGNORECASE)).first

    @property
    def withdraw_button(self) -> Locator:
        return self.page.get_by_role("button", name=re.compile(r"Withdraw Request", re.IGNORECASE)).first

    # Modals & Dialogs
    @property
    def conflict_modal(self) -> Locator:
        return self.page.locator("[role='dialog']").filter(has_text=re.compile(r"Scheduling Conflict Detected", re.IGNORECASE)).first

    @property
    def override_conflict_button(self) -> Locator:
        return self.page.get_by_role("button", name=re.compile(r"Override and Accept", re.IGNORECASE)).first

    @property
    def extend_project_modal(self) -> Locator:
        return self.page.locator("[role='dialog']").filter(has_text=re.compile(r"Extend Project End Date", re.IGNORECASE)).first

    @property
    def extend_project_confirm_button(self) -> Locator:
        return self.page.get_by_role("button", name=re.compile(r"Extend Project and Accept", re.IGNORECASE)).first

    @property
    def historic_lockout_modal(self) -> Locator:
        return self.page.locator("[role='dialog']").filter(has_text=re.compile(r"Historic Lockout", re.IGNORECASE)).first

    @property
    def historic_override_button(self) -> Locator:
        return self.page.get_by_role("button", name=re.compile(r"Override Historic Lockout and Accept", re.IGNORECASE)).first

    @property
    def rejection_dialog(self) -> Locator:
        return self.page.locator("[role='dialog']").filter(has_text=re.compile(r"Reject", re.IGNORECASE)).first

    @property
    def rejection_comment_input(self) -> Locator:
        return self.page.locator("textarea[name='comment'], textarea[name='reviewerComments'], textarea").first

    @property
    def confirm_rejection_button(self) -> Locator:
        return self.page.get_by_role("button", name=re.compile(r"Confirm Rejection", re.IGNORECASE)).first

    @property
    def pursuit_alert(self) -> Locator:
        return self.page.get_by_text("Cannot approve workforce assignment on a Pursuit project", exact=False).first

    @property
    def archived_resource_alert(self) -> Locator:
        return self.page.get_by_text("Cannot approve: Proposed resource is inactive or archived", exact=False).first

    def reject(self, comment: Optional[str] = None):
        self.reject_button.click()
        if comment:
            self.rejection_comment_input.fill(comment)
        self.confirm_rejection_button.click()
