"""MFA Interactive Login Helper to generate and save storageState.json.

Usage:
python mfa_login.py <6-digit-otp>
"""
import sys
import os
import time
from playwright.sync_api import sync_playwright

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
UI_DIR = os.path.dirname(CURRENT_DIR)
STORAGE_STATE_PATH = os.path.join(UI_DIR, "storage_state.json")


def perform_mfa_login(otp_code: str):
    otp_code = otp_code.strip()
    if len(otp_code) != 6 or not otp_code.isdigit():
        print(f"Error: OTP code must be 6 digits, got '{otp_code}'")
        sys.exit(1)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(ignore_https_errors=True, viewport={"width": 1280, "height": 800})
        page = context.new_page()

        print("Navigating to login page...")
        page.goto("https://danis-cmma-dev.cosdevx.com/login", wait_until="domcontentloaded")
        page.get_by_label("Email Address", exact=False).fill("monalisa.badatya+1@costrategix.com")
        page.get_by_label("Password", exact=False).fill("Test@123")
        page.get_by_role("button", name="Sign In", exact=True).click()

        print("Waiting for MFA verification screen...")
        page.wait_for_url("**/mfa/verify**", timeout=15000)
        time.sleep(2)

        inputs = page.locator("input").all()
        if len(inputs) >= 6:
            print("Entering 6-digit OTP code...")
            for i, digit in enumerate(otp_code):
                inputs[i].fill(digit)
                time.sleep(0.1)
        else:
            print("Filling single input field...")
            inputs[0].fill(otp_code)

        # Check for Verify/Submit button or auto-submission
        verify_btn = page.get_by_role("button", name="Verify").or_(page.locator("button:has-text('Verify')")).or_(page.get_by_role("button", name="Submit"))
        if verify_btn.is_visible():
            verify_btn.click()

        print("Waiting for authentication and redirection to dashboard/scheduling...")
        page.wait_for_load_state("networkidle")
        time.sleep(4)
        print("Final URL:", page.url)

        # Save authenticated storage state (cookies, tokens, local storage)
        context.storage_state(path=STORAGE_STATE_PATH)
        print(f"Authentication storage state saved to: {STORAGE_STATE_PATH}")
        browser.close()


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python mfa_login.py <6-digit-otp>")
        sys.exit(1)
    perform_mfa_login(sys.argv[1])
