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
    
    # Target solid assigned bar (not Open Slot)
    # The assigned bars contain '8h/day' or 'BASCOM HUNTER' or '515 N IRWIN' or 'ADENA'
    # In DOM, we can find elements that have text matching '8h/day' or we can locate the row with worker name and its timeline bar
    bars = page.locator("div, [role='button']").filter(has_text="8h/day").all()
    print("Found bars with 8h/day:", len(bars))
    
    # Let's find David Burke or Ann Zukoski or Adena Fayette
    target_bar = None
    for b in page.locator("div, [role='button'], span").all():
        try:
            t = b.inner_text()
            if ("Sep 3" in t or "Sep 4" in t or "Sep 5" in t) and "8h/day" in t and "Open Slot" not in t:
                target_bar = b
                print("Found assigned bar:", t)
                break
        except Exception:
            pass
            
    if target_bar:
        target_bar.click(force=True)
        page.wait_for_timeout(1500)
        drawer = page.locator(".MuiDrawer-paper").first
        print("Drawer visible:", drawer.is_visible())
        unassign_btn = drawer.locator("button:has-text('Unassign')").first
        print("Unassign button visible:", unassign_btn.is_visible())
        reassign_btn = drawer.locator("button:has-text('Reassign')").first
        print("Reassign button visible:", reassign_btn.is_visible())
        
        if unassign_btn.is_visible():
            unassign_btn.click()
            page.wait_for_timeout(1500)
            unassign_drawer = page.locator(".MuiDrawer-paper:has-text('Unassign Worker')").first
            print("Unassign Worker view visible:", unassign_drawer.is_visible())
            
    browser.close()
