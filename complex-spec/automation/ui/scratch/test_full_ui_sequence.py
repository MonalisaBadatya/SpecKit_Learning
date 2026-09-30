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
    page.wait_for_timeout(4000)
    
    # Check all elements with text Sep 3
    el = page.locator("text=/.*Sep 3.*/").first
    print("Found text=/.*Sep 3.*/:", el.is_visible())
    el.click()
    page.wait_for_timeout(2000)
    
    drawer = page.locator(".MuiDrawer-paper").first
    print("Drawer visible:", drawer.is_visible())
    
    unassign_btn = drawer.locator("button:has-text('Unassign')").first
    print("Unassign button in drawer visible:", unassign_btn.is_visible())
    if unassign_btn.is_visible():
        unassign_btn.click()
        page.wait_for_timeout(2000)
        unassign_drawer = page.locator(".MuiDrawer-paper:has-text('Unassign Worker')").first
        print("Unassign Worker view visible:", unassign_drawer.is_visible())
        date_input = unassign_drawer.locator("input").first
        print("Date input value:", date_input.input_value())
        
        # Test Cancel click
        cancel_btn = unassign_drawer.locator("button:has-text('Cancel')").first
        print("Cancel button visible:", cancel_btn.is_visible())
        cancel_btn.click()
        page.wait_for_timeout(1000)
        print("After cancel, Unassign Worker view visible:", unassign_drawer.is_visible())

    # Now test Reassign
    reassign_btn = drawer.locator("button:has-text('Reassign')").first
    print("Reassign button in drawer visible:", reassign_btn.is_visible())
    if reassign_btn.is_visible():
        reassign_btn.click()
        page.wait_for_timeout(2000)
        reassign_drawer = page.locator(".MuiDrawer-paper:has-text('Choose Reassignment Effective Date')").first
        print("Choose Reassignment view visible:", reassign_drawer.is_visible())
        date_input = reassign_drawer.locator("input").first
        print("Date input value:", date_input.input_value())
        
        cancel_btn = reassign_drawer.locator("button:has-text('Cancel')").first
        print("Cancel button visible:", cancel_btn.is_visible())
        cancel_btn.click()
        page.wait_for_timeout(1000)
        print("After cancel, Choose Reassignment view visible:", reassign_drawer.is_visible())

    browser.close()
