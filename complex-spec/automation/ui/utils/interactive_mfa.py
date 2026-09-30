"""Interactive MFA Session Handler.

Maintains the exact browser session from login through MFA entry to save storage_state.json.
"""
import sys
import os
import time
from playwright.sync_api import sync_playwright

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
UI_DIR = os.path.dirname(CURRENT_DIR)

STORAGE_STATE_PATH = os.path.join(UI_DIR, "storage_state.json")

READY_FILE = os.path.join(CURRENT_DIR, "mfa_ready.txt")
CODE_FILE = os.path.join(CURRENT_DIR, "mfa_code.txt")


def run_interactive_login():
    # Clean up old flags
    if os.path.exists(READY_FILE):
        os.remove(READY_FILE)
    if os.path.exists(CODE_FILE):
        os.remove(CODE_FILE)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(ignore_https_errors=True, viewport={"width": 1280, "height": 800})
        page = context.new_page()

        print("Navigating to login page...")
        page.goto("https://danis-cmma-dev.cosdevx.com/login", wait_until="domcontentloaded")
        page.locator("#login-email").fill("monalisa.badatya+1@costrategix.com")
        page.locator("#login-password").fill("Test@123")
        page.get_by_role("button", name="Sign in", exact=True).click()

        print("Awaiting MFA verification screen...")
        page.wait_for_url("**/mfa/verify**", timeout=15000)
        time.sleep(2)

        # Signal that MFA screen is reached and new code was dispatched
        with open(READY_FILE, "w") as f:
            f.write("READY")
        print("MFA_READY: OTP sent to user.")

        # Wait up to 180 seconds for code file
        print("Waiting for MFA code to be written to mfa_code.txt...")
        otp_code = None
        for _ in range(180):
            if os.path.exists(CODE_FILE):
                with open(CODE_FILE, "r") as f:
                    otp_code = f.read().strip()
                if len(otp_code) == 6 and otp_code.isdigit():
                    break
            time.sleep(1)

        if not otp_code:
            print("Timed out waiting for valid MFA code.")
            browser.close()
            sys.exit(1)

        print(f"Received OTP code: {otp_code}. Entering into inputs via keyboard...")
        inputs = page.locator("input").all()
        if len(inputs) >= 1:
            inputs[0].click()
            time.sleep(0.5)
            page.keyboard.type(otp_code, delay=150)
            time.sleep(1)

        # Check for Verify/Submit/Continue button or press Enter
        verify_btn = page.locator("button[type='submit']").or_(
            page.get_by_role("button", name="Verify")
        ).or_(
            page.get_by_role("button", name="Submit")
        ).or_(
            page.get_by_role("button", name="Continue")
        ).or_(
            page.get_by_role("button", name="Sign In")
        ).first

        if verify_btn.is_visible():
            verify_btn.click()
        else:
            page.keyboard.press("Enter")

        print("Awaiting authentication completion and navigation...")
        page.wait_for_timeout(6000)
        try:
            page.wait_for_url("**/scheduling**", timeout=10000)
        except Exception:
            pass
        page.wait_for_load_state("networkidle")
        print("Session landed at:", page.url)

        # Save authenticated storage state
        context.storage_state(path=STORAGE_STATE_PATH)
        print(f"SUCCESS: Authenticated session state saved to {STORAGE_STATE_PATH}")
        browser.close()


if __name__ == "__main__":
    run_interactive_login()
