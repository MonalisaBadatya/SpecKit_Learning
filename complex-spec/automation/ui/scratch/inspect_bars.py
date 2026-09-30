import os
from playwright.sync_api import sync_playwright

STORAGE_STATE_PATH = r"c:\Users\costrategix\SpecKit_Learning\complex-spec\automation\ui\storage_state.json"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(
        storage_state=STORAGE_STATE_PATH,
        ignore_https_errors=True,
        viewport={"width": 1280, "height": 800}
    )
    page = context.new_page()
    page.goto("https://danis-cmma-dev.cosdevx.com/scheduling", wait_until="domcontentloaded")
    page.wait_for_timeout(3000)
    
    # Find all elements matching 'Sep 3' or 'Sep 4' or 'Sep 5' or 'Sep 7'
    bars = page.locator("div, [role='button']").filter(has_text="Sep 3").all()
    for i, bar in enumerate(bars):
        html = bar.evaluate("el => el.outerHTML")
        if "8h/day" in html or "ADENA" in html or "IRWIN" in html:
            print(f"--- MATCH {i} ---")
            print(html[:200])

    browser.close()
