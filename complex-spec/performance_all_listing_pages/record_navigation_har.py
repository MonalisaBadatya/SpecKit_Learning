"""Record complete page-navigation HAR using existing authenticated storage state.

Flow:
My Actions -> Projects -> Workforce -> Scheduling -> Reports -> Insights -> Admin Console
"""
import os
import sys
import json
import time
from playwright.sync_api import sync_playwright

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STORAGE_STATE_PATH = os.path.join(BASE_DIR, "automation", "ui", "storage_state.json")
HAR_DIR = os.path.join(BASE_DIR, "performance", "har")
os.makedirs(HAR_DIR, exist_ok=True)
HAR_PATH = os.path.join(HAR_DIR, "navigation_pages.har")

# Clean existing file before starting
if os.path.exists(HAR_PATH):
    try:
        os.remove(HAR_PATH)
    except Exception:
        pass

if not os.path.exists(STORAGE_STATE_PATH):
    print(f"ERROR: Storage state file not found at {STORAGE_STATE_PATH}", file=sys.stderr)
    sys.exit(1)

print("Starting Chromium and initializing authenticated context...")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(
        storage_state=STORAGE_STATE_PATH,
        ignore_https_errors=True,
        record_har_path=HAR_PATH,
        record_har_mode="full",
        record_har_content="attach",
        viewport={"width": 1440, "height": 900}
    )
    page = context.new_page()

    # Step 1: Navigate to base URL (My Actions)
    print("Opening application: https://danis-cmma-dev.cosdevx.com/ ...")
    page.goto("https://danis-cmma-dev.cosdevx.com/", wait_until="networkidle")
    page.wait_for_timeout(3000)

    # Verify session is authenticated
    current_url = page.url.lower()
    if "login" in current_url or "mfa" in current_url:
        print(f"ERROR: Authentication failed; redirected to {page.url}", file=sys.stderr)
        context.close()
        browser.close()
        sys.exit(1)

    print(f"[1/7] Landed on My Actions: {page.url}")

    # Navigation steps sequence
    nav_targets = [
        ("Projects", "a[aria-label='Projects'], a[title='Projects'], a[href*='/projects']"),
        ("Workforce", "a[aria-label='Workforce'], a[title='Workforce'], a[href*='/resources']"),
        ("Scheduling", "a[aria-label='Scheduling'], a[title='Scheduling'], a[href*='/scheduling']"),
        ("Reports", "a[aria-label='Reports'], a[title='Reports'], a[href*='/reports']"),
        ("Insights", "a[aria-label='Insights'], a[title='Insights'], a[href*='/insights']"),
        ("Admin Console", "a[aria-label='Admin Console'], a[title='Admin Console'], a[href*='/admin']"),
    ]

    for idx, (name, selector) in enumerate(nav_targets, start=2):
        print(f"[{idx}/7] Navigating to {name}...")
        link = page.locator(selector).first
        link.wait_for(state="visible", timeout=15000)
        link.click()
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(3000)
        print(f"[{idx}/7] Loaded {name}: {page.url}")

    final_url = page.url
    print("\nNavigation sequence complete. Closing browser context to finalize HAR...")
    context.close()
    browser.close()

# Verification of HAR
if not os.path.exists(HAR_PATH):
    print(f"ERROR: HAR file not found at {HAR_PATH}", file=sys.stderr)
    sys.exit(1)

file_size = os.path.getsize(HAR_PATH)

try:
    with open(HAR_PATH, "r", encoding="utf-8") as f:
        har_data = json.load(f)
    entries = har_data.get("log", {}).get("entries", [])
    total_requests = len(entries)
    print("\n========================================")
    print("RECORDING SUCCESSFUL")
    print("========================================")
    print(f"Final URL: {final_url}")
    print(f"HAR Path: {HAR_PATH}")
    print(f"Total Requests: {total_requests}")
    print(f"File Size: {file_size} bytes")
    print("========================================")
except Exception as ex:
    print(f"ERROR: Failed to parse HAR as JSON: {ex}", file=sys.stderr)
    sys.exit(1)
