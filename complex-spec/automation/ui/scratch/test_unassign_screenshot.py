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
    
    # Click assignment bar
    bar = page.locator("div, [role='button']").filter(has_text="8h/day").first
    bar.click(force=True)
    page.wait_for_timeout(1000)
    
    drawer = page.locator(".MuiDrawer-paper").first
    unassign_btn = drawer.get_by_role("button", name="Unassign")
    if unassign_btn.is_visible():
        unassign_btn.click()
        page.wait_for_timeout(2000)
        page.screenshot(path="debug_unassign_modal.png")
        print("Unassign modal screenshot taken successfully.")

    browser.close()
