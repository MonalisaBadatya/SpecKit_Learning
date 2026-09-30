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
    
    # In the screenshot, let's find the assignment bar for DAVID BURKE or 515 N IRWIN ST
    # The blue bar has text: 'Sep 3 - Oct 3 · 8h/day · 515 N IRWIN ST'
    bar = page.locator("div, [role='button']").filter(has_text="515 N IRWIN ST").filter(has_text="Sep 3").first
    print("Found Irwin St bar:", bar.is_visible())
    bar.click(force=True)
    page.wait_for_timeout(2000)
    
    drawer = page.locator(".MuiDrawer-paper").first
    print("Drawer visible:", drawer.is_visible())
    
    # Dump drawer buttons
    btns = drawer.locator("button").all()
    btn_info = [b.evaluate("el => el.outerHTML") for b in btns]
    with open(os.path.join(BASE_DIR, "drawer_debug.txt"), "w", encoding="utf-8") as f:
        f.write(f"Drawer HTML:\n{drawer.evaluate('el => el.outerHTML')}\n\nButtons:\n" + "\n".join(btn_info))
    print("Saved drawer_debug.txt successfully.")

    browser.close()
