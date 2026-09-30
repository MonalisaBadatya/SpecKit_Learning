import os
import sys
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
    page.wait_for_timeout(4000)
    
    # Locate timeline bar (e.g. DAVID BURKE's 515 N IRWIN ST bar or ADENA - FAYETTE bar)
    # The bars have text like 'Sep 3 - Oct 3' or 'Sep 3 - Oct 1'
    target_bar = page.locator("div, [role='button']").filter(has_text="Sep 3").last
    print("Found target bar, clicking...")
    target_bar.click(force=True)
    page.wait_for_timeout(2000)
    
    drawer = page.locator(".MuiDrawer-paper").first
    print("Drawer visible:", drawer.is_visible())
    
    # 1. Test Reassign click
    reassign_btn = drawer.get_by_role("button", name="Reassign")
    print("Reassign button visible:", reassign_btn.is_visible())
    if reassign_btn.is_visible():
        reassign_btn.click()
        page.wait_for_timeout(2000)
        page.screenshot(path="debug_reassign_modal.png")
        modal = page.locator("[role='dialog'], .MuiDialog-root").first
        print("Reassign Modal visible:", modal.is_visible())
        if modal.is_visible():
            print("Modal Title / Content:", repr(modal.inner_text()[:400]))
            cancel_btn = modal.get_by_role("button", name="Cancel").or_(modal.locator("button:has-text('Cancel')")).first
            if cancel_btn.is_visible():
                cancel_btn.click()
                page.wait_for_timeout(1000)

    # 2. Test Unassign click
    # reopen drawer if needed
    if not drawer.is_visible():
        target_bar.click(force=True)
        page.wait_for_timeout(1000)
        
    unassign_btn = drawer.get_by_role("button", name="Unassign")
    print("Unassign button visible:", unassign_btn.is_visible())
    if unassign_btn.is_visible():
        unassign_btn.click()
        page.wait_for_timeout(2000)
        page.screenshot(path="debug_unassign_modal.png")
        modal = page.locator("[role='dialog'], .MuiDialog-root").first
        print("Unassign Modal visible:", modal.is_visible())
        if modal.is_visible():
            print("Modal Title / Content:", repr(modal.inner_text()[:400]))
            cancel_btn = modal.get_by_role("button", name="Cancel").or_(modal.locator("button:has-text('Cancel')")).first
            if cancel_btn.is_visible():
                cancel_btn.click()
                page.wait_for_timeout(1000)

    browser.close()
