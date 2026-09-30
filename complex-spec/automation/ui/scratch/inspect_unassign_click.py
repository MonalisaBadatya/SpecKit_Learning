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
    
    # Click assignment bar (e.g. Sep 3 - Oct 3 on David Burke or Sep 3 - Oct 1 on Catherine Da Costa)
    bar = page.locator("div, [role='button']").filter(has_text="8h/day").first
    bar.click(force=True)
    page.wait_for_timeout(1500)
    
    drawer = page.locator(".MuiDrawer-paper").first
    print("Drawer is visible:", drawer.is_visible())
    
    # Find all buttons in drawer
    btns = drawer.locator("button").all()
    print("Buttons in drawer:", [b.inner_text() for b in btns])
    
    unassign_btn = drawer.locator("button").filter(has_text="Unassign").first
    if unassign_btn.is_visible():
        print("Clicking Unassign...")
        unassign_btn.click()
        page.wait_for_timeout(2000)
        page.screenshot(path=os.path.join(BASE_DIR, "debug_unassign_drawer.png"))
        print("Drawer content after Unassign click:")
        # Look for dialog or drawer changes
        print("Drawer text:")
        with open(os.path.join(BASE_DIR, "unassign_drawer_text.txt"), "w", encoding="utf-8") as f:
            f.write(page.locator(".MuiDrawer-paper, [role='dialog']").first.inner_text())
        print("Saved unassign_drawer_text.txt")
        
    browser.close()
