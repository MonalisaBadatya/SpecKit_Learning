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
    page.wait_for_timeout(4000)
    
    # Locate the assignment bar on the right side
    bar = page.get_by_text("Sep 3", exact=False).first
    print("Found bar with 'Sep 3':", bar.is_visible())
    bar.click(force=True)
    page.wait_for_timeout(2000)
    
    drawer = page.locator(".MuiDrawer-paper").first
    print("Drawer visible:", drawer.is_visible())
    
    if drawer.is_visible():
        # Click Unassign
        unassign_btn = drawer.get_by_role("button", name="Unassign").or_(drawer.locator("button:has-text('Unassign')")).first
        print("Unassign btn visible:", unassign_btn.is_visible())
        unassign_btn.click()
        page.wait_for_timeout(2000)
        page.screenshot(path=os.path.join(BASE_DIR, "debug_unassign_opened.png"))
        
        # Check for unassign effective date drawer / modal
        print("Page text after clicking Unassign:")
        with open(os.path.join(BASE_DIR, "unassign_state.txt"), "w", encoding="utf-8") as f:
            f.write(page.locator(".MuiDrawer-paper, [role='dialog']").first.inner_text())
        print("Saved unassign_state.txt")
        
    browser.close()
