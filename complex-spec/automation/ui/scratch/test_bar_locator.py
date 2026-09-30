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
    
    # Try different locators
    loc1 = page.get_by_text("8h/day", exact=False)
    print("get_by_text 8h/day count:", loc1.count())
    for i in range(loc1.count()):
        print(f"  Item {i}: visible={loc1.nth(i).is_visible()}, text={loc1.nth(i).inner_text()}")
        
    # Test clicking first visible 8h/day bar
    for i in range(loc1.count()):
        if loc1.nth(i).is_visible():
            print(f"Clicking item {i}...")
            loc1.nth(i).click()
            page.wait_for_timeout(1000)
            drawer = page.locator(".MuiDrawer-paper").first
            print("Drawer visible:", drawer.is_visible())
            if drawer.is_visible():
                print("Drawer buttons:", [b.inner_text() for b in drawer.locator("button").all()])
                break

    browser.close()
