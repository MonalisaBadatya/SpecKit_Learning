import os
import sys

UI_DIR = r"c:\Users\costrategix\SpecKit_Learning\complex-spec\automation\ui"
if UI_DIR not in sys.path:
    sys.path.insert(0, UI_DIR)

from playwright.sync_api import sync_playwright
from pages.assignments_page import AssignmentsPage

STORAGE_STATE_PATH = os.path.join(UI_DIR, "storage_state.json")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(
        storage_state=STORAGE_STATE_PATH,
        ignore_https_errors=True,
        viewport={"width": 1280, "height": 800}
    )
    page = context.new_page()
    assignments_page = AssignmentsPage(page)
    assignments_page.navigate_to_assignments()
    
    # Locate ANN ZUKOSKI or BASCOM HUNTER which is expanded by default
    print("Testing click on ANN ZUKOSKI / BASCOM HUNTER...")
    bar = page.locator("text=/.*BASCOM HUNTER.*/").first
    print("Found bar:", bar.is_visible())
    bar.click(force=True)
    page.wait_for_timeout(2000)
    
    drawer = page.locator(".MuiDrawer-paper").first
    print("Drawer visible:", drawer.is_visible())
    
    # Test Unassign
    unassign_btn = drawer.locator("button:has-text('Unassign')").first
    print("Unassign button visible:", unassign_btn.is_visible())
    unassign_btn.click()
    page.wait_for_timeout(2000)
    
    unassign_view = page.locator(".MuiDrawer-paper:has-text('Unassign Worker')").first
    print("Unassign Worker view visible:", unassign_view.is_visible())
    print("Default Effective Date:", unassign_view.locator("input").first.input_value())
    
    # Click Cancel to return
    cancel_btn = unassign_view.locator("button:has-text('Cancel')").first
    cancel_btn.click()
    page.wait_for_timeout(1000)
    
    # Test Reassign
    reassign_btn = drawer.locator("button:has-text('Reassign')").first
    print("Reassign button visible:", reassign_btn.is_visible())
    reassign_btn.click()
    page.wait_for_timeout(2000)
    
    reassign_view = page.locator(".MuiDrawer-paper:has-text('Choose Reassignment Effective Date')").first
    print("Choose Reassignment view visible:", reassign_view.is_visible())
    print("Default Effective Date:", reassign_view.locator("input").first.input_value())
    
    cancel_btn = reassign_view.locator("button:has-text('Cancel')").first
    cancel_btn.click()
    page.wait_for_timeout(1000)
    
    print("SUCCESS: All drawer actions verified!")

    browser.close()
