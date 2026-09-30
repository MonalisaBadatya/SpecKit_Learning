import os
from playwright.sync_api import sync_playwright

# Project root = complex-spec
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Existing authenticated Playwright storage state
STORAGE_STATE = os.path.join(
    BASE_DIR,
    "automation",
    "ui",
    "storage_state.json"
)

# HAR output directory
HAR_DIR = os.path.join(
    BASE_DIR,
    "performance",
    "har"
)

os.makedirs(HAR_DIR, exist_ok=True)

HAR_PATH = os.path.join(
    HAR_DIR,
    "effective_date_reassign_unassign.har"
)

URL = "https://danis-cmma-dev.cosdevx.com/scheduling"


with sync_playwright() as p:

    print("Starting Chromium...")

    browser = p.chromium.launch(
        headless=False
    )

    print("Creating authenticated browser context...")

    context = browser.new_context(
        ignore_https_errors=True,
        ##storage_state=STORAGE_STATE,
        record_har_path=HAR_PATH,
        record_har_mode="full"
    )

    page = context.new_page()

    print(f"\nOpening: {URL}")
    page.goto(URL, wait_until="networkidle")

    print("\n========================================")
    print(" HAR RECORDING STARTED")
    print("========================================")
    print("Perform your Effective Date flow in the browser.")
    print("When finished, return to this terminal.")
    print("Press ENTER to stop recording.")
    print("========================================\n")

    input()

    print("\nClosing browser context...")
    context.close()

    browser.close()

    print("\n========================================")
    print(" HAR FILE CREATED")
    print("========================================")
    print(HAR_PATH)
    print("========================================")