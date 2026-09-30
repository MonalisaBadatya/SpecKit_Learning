import os
from playwright.sync_api import sync_playwright

STORAGE_STATE_PATH = r"c:\Users\costrategix\SpecKit_Learning\complex-spec\automation\ui\storage_state.json"
BASE_DIR = r"c:\Users\costrategix\SpecKit_Learning\complex-spec\automation\ui"

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
    
    # Click the 8h/day bar
    bar = page.locator("text=/.*8h\\/day.*/").first
    print("Found bar:", bar.is_visible())
    bar.scroll_into_view_if_needed()
    bar.click(force=True)
    page.wait_for_timeout(2000)
    
    drawer = page.locator(".MuiDrawer-paper").first
    print("Drawer visible:", drawer.is_visible())
    
    # In Drawer, find Unassign button
    unassign_btn = drawer.get_by_role("button", name="Unassign")
    print("Unassign button visible:", unassign_btn.is_visible())
    if unassign_btn.is_visible():
        unassign_btn.click()
        page.wait_for_timeout(2000)
        page.screenshot(path=os.path.join(BASE_DIR, "debug_unassign_view.png"))
        print("Unassign screenshot saved!")
        
    browser.close()
