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

    # Find the real assignment bars discovered from the previous diagnostic.
    bars = page.locator("[data-bar='true']")

    print("\n" + "=" * 100)
    print("GANTT ASSIGNMENTS")
    print("=" * 100)

    print("Assignment bars found:", bars.count())

    for i in range(min(bars.count(), 10)):
        try:
            print(
                f"{i}:",
                bars.nth(i).inner_text().strip()
            )
        except Exception:
            pass

    if bars.count() == 0:
        print("\nERROR: No assignment bars found.")
        input("\nPress ENTER to close...")
        browser.close()
        p.stop()
        raise SystemExit

    # Use the first available assignment dynamically.
    bar = bars.first

    print("\n" + "=" * 100)
    print("CLICKING FIRST ASSIGNMENT")
    print("=" * 100)

    print("Assignment:")
    print(bar.inner_text().strip())

    bar.click(force=True)

    print("\nWaiting for Assignment Details Drawer...")
    page.wait_for_timeout(3000)

    drawer = page.locator(".MuiDrawer-paper").first

    try:
        drawer.wait_for(
            state="visible",
            timeout=10000,
        )
    except Exception:
        print("\nERROR: Drawer did not open.")
        input("\nPress ENTER to close...")
        browser.close()
        p.stop()
        raise SystemExit

    print("\n" + "=" * 100)
    print("DRAWER FOUND")
    print("=" * 100)

    print("\nDRAWER TEXT:")
    print(drawer.inner_text())

    print("\n" + "=" * 100)
    print("BUTTONS INSIDE DRAWER")
    print("=" * 100)

    buttons = drawer.locator("button")

    print("Button count:", buttons.count())

    for i in range(buttons.count()):
        button = buttons.nth(i)

        try:
            print(f"\n--- BUTTON {i} ---")

            print(
                button.evaluate(
                    """e => ({
                        text: e.innerText,
                        ariaLabel: e.getAttribute('aria-label'),
                        title: e.getAttribute('title'),
                        testid: e.getAttribute('data-testid'),
                        type: e.getAttribute('type'),
                        className: typeof e.className === 'string'
                            ? e.className
                            : '',
                        disabled: e.disabled
                    })"""
                )
            )

            print("OUTER HTML:")
            print(button.evaluate("(e) => e.outerHTML"))

        except Exception as exc:
            print("ERROR:", exc)

    print("\n" + "=" * 100)
    print("ELEMENTS CONTAINING 'UNASSIGN'")
    print("=" * 100)

    unassign = drawer.get_by_text(
        "Unassign",
        exact=False,
    )

    print("Count:", unassign.count())

    for i in range(unassign.count()):
        element = unassign.nth(i)

        try:
            print(f"\n--- UNASSIGN ELEMENT {i} ---")
            print(
                element.evaluate(
                    """e => ({
                        tag: e.tagName,
                        text: e.innerText,
                        role: e.getAttribute('role'),
                        ariaLabel: e.getAttribute('aria-label'),
                        title: e.getAttribute('title'),
                        testid: e.getAttribute('data-testid'),
                        className: typeof e.className === 'string'
                            ? e.className
                            : ''
                    })"""
                )
            )
            print("OUTER HTML:")
            print(element.evaluate("(e) => e.outerHTML"))

        except Exception as exc:
            print("ERROR:", exc)

    print("\n" + "=" * 100)
    print("ELEMENTS CONTAINING 'REASSIGN'")
    print("=" * 100)

    reassign = drawer.get_by_text(
        "Reassign",
        exact=False,
    )

    print("Count:", reassign.count())

    for i in range(reassign.count()):
        element = reassign.nth(i)

        try:
            print(f"\n--- REASSIGN ELEMENT {i} ---")
            print(
                element.evaluate(
                    """e => ({
                        tag: e.tagName,
                        text: e.innerText,
                        role: e.getAttribute('role'),
                        ariaLabel: e.getAttribute('aria-label'),
                        title: e.getAttribute('title'),
                        testid: e.getAttribute('data-testid'),
                        className: typeof e.className === 'string'
                            ? e.className
                            : ''
                    })"""
                )
            )
            print("OUTER HTML:")
            print(element.evaluate("(e) => e.outerHTML"))

        except Exception as exc:
            print("ERROR:", exc)

    print("\n" + "=" * 100)
    print("ELEMENTS CONTAINING 'SPLIT'")
    print("=" * 100)

    split = drawer.get_by_text(
        "Split",
        exact=False,
    )

    print("Count:", split.count())

    for i in range(split.count()):
        element = split.nth(i)

        try:
            print(f"\n--- SPLIT ELEMENT {i} ---")
            print(
                element.evaluate(
                    """e => ({
                        tag: e.tagName,
                        text: e.innerText,
                        role: e.getAttribute('role'),
                        ariaLabel: e.getAttribute('aria-label'),
                        title: e.getAttribute('title'),
                        testid: e.getAttribute('data-testid'),
                        className: typeof e.className === 'string'
                            ? e.className
                            : ''
                    })"""
                )
            )
            print("OUTER HTML:")
            print(element.evaluate("(e) => e.outerHTML"))

        except Exception as exc:
            print("ERROR:", exc)

    print("\n" + "=" * 100)
    print("FULL DRAWER HTML")
    print("=" * 100)

    print(drawer.evaluate("(e) => e.outerHTML"))

    print("\n" + "=" * 100)
    print("DIAGNOSTIC COMPLETE")
    print("=" * 100)

    input("\nPress ENTER to close the browser...")

    browser.close()