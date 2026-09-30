from playwright.sync_api import sync_playwright


with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)

    context = browser.new_context(
        storage_state="automation/ui/storage_state.json"
    )

    page = context.new_page()

    print("Opening Scheduling page...")

    page.goto(
        "https://danis-cmma-dev.cosdevx.com/scheduling",
        wait_until="domcontentloaded",
    )

    print("Waiting for Gantt to load...")
    page.wait_for_timeout(7000)

    print("\n" + "=" * 100)
    print("INSPECTING ASSIGNMENT BAR DOM")
    print("=" * 100)

    elements = page.locator("text=/8h\\/day/")

    count = elements.count()

    print(f"Assignment text elements found: {count}")

    for i in range(min(count, 3)):

        element = elements.nth(i)

        print("\n" + "-" * 100)
        print(f"ASSIGNMENT {i}")
        print("-" * 100)

        try:
            print("TEXT:")
            print(element.inner_text())

            print("\nELEMENT:")
            print(
                element.evaluate(
                    """e => ({
                        tag: e.tagName,
                        className: typeof e.className === 'string'
                            ? e.className
                            : '',
                        role: e.getAttribute('role'),
                        testid: e.getAttribute('data-testid'),
                        ariaLabel: e.getAttribute('aria-label')
                    })"""
                )
            )

            print("\nPARENT:")
            print(
                element.evaluate(
                    """e => e.parentElement
                        ? {
                            tag: e.parentElement.tagName,
                            className: typeof e.parentElement.className === 'string'
                                ? e.parentElement.className
                                : '',
                            role: e.parentElement.getAttribute('role'),
                            testid: e.parentElement.getAttribute('data-testid'),
                            ariaLabel: e.parentElement.getAttribute('aria-label'),
                            text: e.parentElement.innerText
                        }
                        : null"""
                )
            )

            print("\nGRANDPARENT:")
            print(
                element.evaluate(
                    """e => e.parentElement && e.parentElement.parentElement
                        ? {
                            tag: e.parentElement.parentElement.tagName,
                            className: typeof e.parentElement.parentElement.className === 'string'
                                ? e.parentElement.parentElement.className
                                : '',
                            role: e.parentElement.parentElement.getAttribute('role'),
                            testid: e.parentElement.parentElement.getAttribute('data-testid'),
                            ariaLabel: e.parentElement.parentElement.getAttribute('aria-label'),
                            text: e.parentElement.parentElement.innerText
                        }
                        : null"""
                )
            )

            print("\nGREAT-GRANDPARENT:")
            print(
                element.evaluate(
                    """e => e.parentElement &&
                          e.parentElement.parentElement &&
                          e.parentElement.parentElement.parentElement
                        ? {
                            tag: e.parentElement.parentElement.parentElement.tagName,
                            className: typeof e.parentElement.parentElement.parentElement.className === 'string'
                                ? e.parentElement.parentElement.parentElement.className
                                : '',
                            role: e.parentElement.parentElement.parentElement.getAttribute('role'),
                            testid: e.parentElement.parentElement.parentElement.getAttribute('data-testid'),
                            ariaLabel: e.parentElement.parentElement.parentElement.getAttribute('aria-label'),
                            text: e.parentElement.parentElement.parentElement.innerText
                        }
                        : null"""
                )
            )

            print("\nOUTER HTML:")
            print(
                element.evaluate(
                    """e => e.parentElement &&
                          e.parentElement.parentElement
                        ? e.parentElement.parentElement.outerHTML
                        : e.outerHTML"""
                )
            )

        except Exception as exc:
            print(f"ERROR: {exc}")

    print("\n" + "=" * 100)
    print("DIAGNOSTIC COMPLETE")
    print("=" * 100)

    input("\nPress ENTER to close the browser...")

    browser.close()