import re
from playwright.sync_api import Page, Locator, expect
from .base_page import BasePage

class MfaModal(BasePage):
    """Page Object for Multi-Factor Authentication OTP challenge modal/view (/mfa/verify)."""

    def __init__(self, page: Page):
        super().__init__(page)

    @property
    def modal_container(self) -> Locator:
        return self.page.locator(
            "[role='dialog'], .mfa-modal, .otp-container, [data-testid='mfa-modal']"
        ).or_(self.page.get_by_text("Two-Factor Authentication", exact=False)).first

    @property
    def heading(self) -> Locator:
        return self.page.get_by_text("Two-Factor Authentication", exact=False).first

    @property
    def instruction(self) -> Locator:
        return self.page.get_by_text("verification code", exact=False).first

    @property
    def otp_inputs(self) -> Locator:
        return self.page.locator("input[autocomplete='one-time-code'], input[name*='otp'], input[name*='code'], input[type='text'], input[inputmode='numeric']").or_(
            self.page.get_by_role("textbox")
        )

    @property
    def otp_input(self) -> Locator:
        return self.otp_inputs.first

    @property
    def verify_button(self) -> Locator:
        return self.page.get_by_role("button", name=re.compile(r"^(Verify|Submit)$", re.IGNORECASE))

    @property
    def back_to_sign_in_button(self) -> Locator:
        return self.page.get_by_role("button", name=re.compile(r"Back to Sign In", re.IGNORECASE))

    def is_mfa_prompt_displayed(self) -> bool:
        return (
            self.heading.is_visible()
            or self.instruction.is_visible()
            or self.modal_container.is_visible()
        )

    def enter_otp(self, code: str):
        """Enter a 6-digit OTP code into the OTP input fields."""
        count = self.otp_inputs.count()
        if count >= len(code):
            for i, digit in enumerate(code):
                self.otp_inputs.nth(i).fill(digit)
        else:
            self.otp_input.fill(code)
