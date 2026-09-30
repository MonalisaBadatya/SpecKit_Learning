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
    page.goto("https://danis-cmma-dev.cosdevx.com/scheduling", wait_until="networkidle")
    page.wait_for_timeout(2000)
    
    # Click 'By Project' tab
    by_project_tab = page.locator("button:has-text('By Project'), [role='tab']:has-text('By Project')").first
    print("By Project tab visible:", by_project_tab.is_visible())
    if by_project_tab.is_visible():
        by_project_tab.click()
        page.wait_for_timeout(2000)
        
    print("Has 515 N IRWIN ST:", page.get_by_text("515 N IRWIN ST").count())
    print("Has DAVID BURKE:", page.get_by_text("DAVID BURKE").count())
    
    # Click DAVID BURKE or 515 N IRWIN ST bar
    target_bar = page.locator("div, [role='button']").filter(has_text="515 N IRWIN ST").filter(has_text="Sep 3").first
    if not target_bar.is_visible():
        target_bar = page.locator("text=/.*Sep 3.*/").first
        
    print("Target bar found:", target_bar.is_visible())
    target_bar.click(force=True)
    page.wait_for_timeout(1500)
    
    drawer = page.locator(".MuiDrawer-paper").first
    print("Drawer visible:", drawer.is_visible())
    
    unassign_btn = drawer.locator("button:has-text('Unassign')").first
    print("Unassign button in drawer visible:", unassign_btn.is_visible())
    if unassign_btn.is_visible():
        unassign_btn.click()
        page.wait_for_timeout(1500)
        unassign_drawer = page.locator(".MuiDrawer-paper:has-text('Unassign Worker')").first
        print("Unassign Worker view visible:", unassign_drawer.is_visible())
        
        cancel_btn = unassign_drawer.locator("button:has-text('Cancel')").first
        print("Cancel button visible:", cancel_btn.is_visible())
        cancel_btn.click()
        page.wait_for_timeout(1000)
        
    reassign_btn = drawer.locator("button:has-text('Reassign')").first
    print("Reassign button in drawer visible:", reassign_btn.is_visible())
    if reassign_btn.is_visible():
        reassign_btn.click()
        page.wait_for_timeout(1500)
        reassign_drawer = page.locator(".MuiDrawer-paper:has-text('Choose Reassignment Effective Date')").first
        print("Choose Reassignment view visible:", reassign_drawer.is_visible())
        
        cancel_btn = reassign_drawer.locator("button:has-text('Cancel')").first
        print("Cancel button visible:", cancel_btn.is_visible())
        cancel_btn.click()
        page.wait_for_timeout(1000)

    browser.close()
