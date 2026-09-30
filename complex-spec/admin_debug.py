from playwright.sync_api import sync_playwright

STORAGE_STATE = r".\automation\ui\storage_state.json"
ADMIN_URL = "https://danis-cmma-dev.cosdevx.com/admin"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)

    context = browser.new_context(
        storage_state=STORAGE_STATE
    )

    page = context.new_page()

    print("\nOpening Admin Console...")
    
    page.goto(
        ADMIN_URL,
        wait_until="domcontentloaded",
        timeout=60000
    )

    print("Waiting 30 seconds for authentication/rendering...")
    page.wait_for_timeout(30000)

    print("\n================ ADMIN DIAGNOSTIC ================")
    print("URL:", page.url)
    print("TITLE:", page.title())

    print("\nH1 ELEMENTS:")
    print(page.locator("h1").all_text_contents())

    print("\nH2 ELEMENTS:")
    print(page.locator("h2").all_text_contents())

    print("\nALL HEADINGS:")
    print(page.locator("h1, h2, h3").all_text_contents())

    print("\nVISIBLE BODY TEXT:")
    body_text = page.locator("body").inner_text()
    print(body_text[:10000])

    print("\n====================================================")

    page.screenshot(
        path="admin_debug_30sec.png",
        full_page=True
    )

    print("\nScreenshot saved:")
    print(
        r"C:\Users\costrategix\SpecKit_Learning\complex-spec\admin_debug_30sec.png"
    )

    input("\nPress Enter to close the browser...")

    browser.close()