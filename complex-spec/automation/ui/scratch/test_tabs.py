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
    
    # Check Worker Table tab
    worker_tab = page.get_by_role("button", name="Worker Table").or_(page.get_by_text("Worker Table")).first
    print("Worker Table tab visible:", worker_tab.is_visible())
    if worker_tab.is_visible():
        worker_tab.click()
        page.wait_for_timeout(2000)
        page.screenshot(path="debug_worker_table.png")
        print("Worker Table content count:", page.locator("table, [role='table'], .MuiDataGrid-root, tr").count())
        rows = page.locator("tr, [role='row']").all()
        print(f"Found {len(rows)} rows in Worker Table")

    browser.close()
