# CMMA UI Navigation Structure & Page Behavior Investigation Report

**Application:** [https://danis-cmma-dev.cosdevx.com/](https://danis-cmma-dev.cosdevx.com/)  
**Date:** September 22, 2026  
**Investigation Scope:** End-to-end DOM structure, client-side hydration, and navigation behavior across all primary application pages.

---

### A. Executive Summary

An in-depth empirical investigation of the CMMA application UI navigation structure was conducted using the authenticated session from `storage_state.json` (`cmma_session` JWT cookie and local storage tokens). The browser session authenticated successfully and landed on **My Actions**.

#### Key Discoveries
1. **Root Cause of k6 Navigation Diagnostic Failure (Zero Containers / Zero Clickables):**  
   The application is built on **Next.js (React / Material-UI)** utilizing client-side hydration (`BAILOUT_TO_CLIENT_SIDE_RENDERING`). On initial page load, Next.js serves an unhydrated shell containing an indeterminate circular progress spinner (`role="progressbar"`). The k6 script's `waitForPageReady` function awaited `domcontentloaded` and checked for `body` visibility, which resolved prematurely while the spinner was still active and before React mounted. When the diagnostic ran at that exact moment, `<nav>` and clickable elements did not yet exist in the DOM (`nav count: 0`, `clickable count: 0`).
2. **Navigation Architecture:**  
   The primary navigation is encapsulated within a standard HTML `<nav aria-label="Primary">` element located directly in the light DOM (no iframes, no shadow DOM). Navigation controls are standard HTML anchor tags (`<a>`) wrapping Lucide SVG icons and styled with Material-UI (`MuiListItemButton-root`).
3. **Sidebar State Differences Across Pages:**  
   - On **My Actions** (`/`), the sidebar is **collapsed** to a width of **72px** (icon-only mode). Text label elements are not rendered in the DOM. However, persistent `aria-label`, `title`, and `href` attributes exist on every item.
   - On inner pages (**Projects**, **Workforce**, **Scheduling**, **Reports**, **Insights**, **Admin Console**), the sidebar **expands** to **260px**, rendering both icons and visible text nodes.
4. **Routing Deviations:**  
   - **Workforce** routes to `/resources` (URL: `https://danis-cmma-dev.cosdevx.com/resources`), not `/workforce`.
   - **Admin Console** routes to `/admin` (URL: `https://danis-cmma-dev.cosdevx.com/admin`), not `/admin-console`.
5. **UI Navigation Flow Success:**  
   All seven pages in the requested sequence (**My Actions → Projects → Workforce → Scheduling → Reports → Insights → Admin Console**) were successfully traversed via real UI clicks on the navigation bar using persistent attribute locators (`nav a[href="..."]` or `nav a[aria-label="..."]`), confirming seamless Single Page Application (SPA) client-side route transitions.

---

### B. Authentication / Landing

- **Login Result:** Successful using pre-existing session state in `complex-spec/automation/ui/storage_state.json`. No interactive MFA challenge was triggered.
- **Landing Page:** My Actions
- **Landing URL:** `https://danis-cmma-dev.cosdevx.com/`
- **Page Title:** `CMMA — Construction Manpower Management`
- **My Actions Readiness Indicators:**
  - Main Container: `<main class="MuiBox-root mui-17yzni">`
  - Section Heading: `<p class="MuiTypography-root MuiTypography-body1 mui-s6ukmr">My Actions</p>`
  - Action Queue Header: Visible text `ACTION QUEUE` and `PROJECTS NEEDING ATTENTION`
  - Primary Sidebar: `<nav aria-label="Primary">` visible with active link `a[href="/"][aria-label="My Actions"]`

---

### C. Root Cause of k6 Navigation Discovery Failure

The existing k6 diagnostic reported:
```
[NAV DEBUG] navigation-like containers: 0
[NAV DEBUG] clickable elements found: 0
```

#### Empirical Root Cause Analysis
Targeted DOM state inspections at specific lifecycle events confirmed:
1. **At `domcontentloaded`:**
   - `<nav>` count: **0**
   - `[role="progressbar"]` count: **1**
   - Clickable `a, button` count: **0**
2. **After Client-Side React Hydration:**
   - `<nav>` count: **1**
   - `[role="progressbar"]` count: **0**
   - Clickable `a, button` count: **9** inside `<nav>`, **13+** on page

#### Step-by-Step Mechanism
1. The server delivers an initial HTML document containing Next.js client bailout markup:
   ```html
   <template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template>
   <div class="MuiBox-root mui-r296su">
     <span class="MuiCircularProgress-root MuiCircularProgress-indeterminate" role="progressbar">...</span>
   </div>
   ```
2. The k6 script executes:
   ```javascript
   await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
   await waitForPageReady(page, 'My Actions');
   ```
3. Inside `waitForPageReady`:
   - `page.waitForLoadState('domcontentloaded')` resolves immediately as soon as the initial HTML arrives.
   - `body.waitFor({ state: 'visible' })` resolves immediately because `<body>` containing the MUI CircularProgress spinner is visible.
   - `main = page.locator('main, [role="main"]').first()`: `await main.count() > 0` returns `0` because `<main>` has not yet been rendered by React. Therefore, k6 skips waiting for `<main>`.
   - `body.textContent()` contains whitespace and spinner metadata, passing the non-empty check.
   - `waitForPageReady` returns `true` prematurely while the spinner is still active and React has not mounted.
4. `diagnoseNavigation(page, 'Projects')` executes in the next microsecond. It evaluates:
   ```javascript
   const containers = page.locator('nav, [role="navigation"], aside, [class*="sidebar"]...');
   const clickable = page.locator('a, button, [role="link"], [role="button"], [tabindex="0"]');
   ```
   Because the page is still displaying only the circular progress spinner, **zero containers and zero clickable elements exist in the DOM**.
5. Once the JavaScript bundles execute (~800ms - 1200ms), `<nav aria-label="Primary">` mounts into the DOM with all interactive navigation controls.

---

### D. Navigation Architecture

The left navigation bar is structured as follows:
- **Top-Level Container:** `<nav aria-label="Primary">`
- **Positioning:** Fixed on the left edge (`x: 0, y: 0, height: 100vh`).
- **Framework:** Material-UI (MUI v5/v6) + Next.js App Router (`next/link`).
- **Interactive Elements:** Standard HTML anchor tags (`<a>`) styled as `MuiButtonBase-root MuiListItemButton-root`.
- **Icons:** Embedded Lucide SVG icons (`lucide lucide-circle-check-big`, `lucide lucide-briefcase`, `lucide lucide-users`, `lucide lucide-calendar`, `lucide lucide-chart-column`, `lucide lucide-lightbulb`, `lucide lucide-shield`).
- **Accessibility Attributes:** Every link has a persistent `aria-label` and `title` attribute matching the item name, regardless of whether the sidebar is collapsed or expanded.
- **Shadow DOM:** None (`hasShadowDom = false` for the navigation tree).
- **Iframes:** None (`iframeCount = 0`).
- **Dynamic Behavior:** SPA client-side route transitions using the HTML5 History API (`pushState`). Clicking a nav item does not perform a full-page document reload.

---

### E. Navigation DOM Matrix

All items below were directly inspected from the live application DOM inside `<nav aria-label="Primary">`:

| Target Page | Visible Label (Expanded) | HTML Tag | Role | aria-label | title | data-testid | id | href | Clickable Ancestor | Iframe / Shadow DOM | Observed Locator Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **My Actions** | `My Actions` | `A` | `NOT PRESENT` | `My Actions` | `My Actions` | `NOT PRESENT` | `NOT PRESENT` | `/` | Self (`<a>`) | `NOT PRESENT` | `nav a[href="/"]` or `nav a[aria-label="My Actions"]` |
| **Projects** | `Projects` | `A` | `NOT PRESENT` | `Projects` | `Projects` | `NOT PRESENT` | `NOT PRESENT` | `/projects` | Self (`<a>`) | `NOT PRESENT` | `nav a[href="/projects"]` or `nav a[aria-label="Projects"]` |
| **Workforce** | `Workforce` | `A` | `NOT PRESENT` | `Workforce` | `Workforce` | `NOT PRESENT` | `NOT PRESENT` | `/resources` | Self (`<a>`) | `NOT PRESENT` | `nav a[href="/resources"]` or `nav a[aria-label="Workforce"]` |
| **Scheduling** | `Scheduling` | `A` | `NOT PRESENT` | `Scheduling` | `Scheduling` | `NOT PRESENT` | `NOT PRESENT` | `/scheduling` | Self (`<a>`) | `NOT PRESENT` | `nav a[href="/scheduling"]` or `nav a[aria-label="Scheduling"]` |
| **Reports** | `Reports` | `A` | `NOT PRESENT` | `Reports` | `Reports` | `NOT PRESENT` | `NOT PRESENT` | `/reports` | Self (`<a>`) | `NOT PRESENT` | `nav a[href="/reports"]` or `nav a[aria-label="Reports"]` |
| **Insights** | `Insights` | `A` | `NOT PRESENT` | `Insights` | `Insights` | `NOT PRESENT` | `NOT PRESENT` | `/insights` | Self (`<a>`) | `NOT PRESENT` | `nav a[href="/insights"]` or `nav a[aria-label="Insights"]` |
| **Admin Console** | `Admin Console` | `A` | `NOT PRESENT` | `Admin Console` | `Admin Console` | `NOT PRESENT` | `NOT PRESENT` | `/admin` | Self (`<a>`) | `NOT PRESENT` | `nav a[href="/admin"]` or `nav a[aria-label="Admin Console"]` |

*Note: Auxiliary items in `<nav>` include `Settings` (`a[href="/settings"]`) and `Refresh` (`div[role="button"][aria-label="Refresh"]`).*

---

### F. Page Navigation Results

The journey was executed strictly via real UI clicks on the navigation bar in sequence:

| Source Page | Navigation Item | Click Successful | Destination URL | Page Loaded | Readiness Indicator Verified | Navigation Mechanism | Transition Time |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **My Actions** | `Projects` | **YES** | `https://danis-cmma-dev.cosdevx.com/projects` | **YES** | `h1:has-text("Projects")` + `table` | SPA Route Change (`pushState`) | 0.96s |
| **Projects** | `Workforce` | **YES** | `https://danis-cmma-dev.cosdevx.com/resources` | **YES** | `h1:has-text("Workforce Directory")` | SPA Route Change (`pushState`) | 1.17s |
| **Workforce** | `Scheduling` | **YES** | `https://danis-cmma-dev.cosdevx.com/scheduling` | **YES** | `h1:has-text("Scheduling")` | SPA Route Change (`pushState`) | 1.77s |
| **Scheduling** | `Reports` | **YES** | `https://danis-cmma-dev.cosdevx.com/reports` | **YES** | `h1:has-text("Reports")` | SPA Route Change (`pushState`) | 2.88s |
| **Reports** | `Insights` | **YES** | `https://danis-cmma-dev.cosdevx.com/insights` | **YES** | `h1:has-text("Insights")` | SPA Route Change (`pushState`) | 0.10s |
| **Insights** | `Admin Console` | **YES** | `https://danis-cmma-dev.cosdevx.com/admin` | **YES** | `h1:has-text("System Administration")` | SPA Route Change (`pushState`) | 0.13s |

*Flow sequence observation:* Returning to My Actions or any previous page from Admin Console works directly by clicking `nav a[href="/"]` without requiring intermediate steps (0.07s).

---

### G. Page Readiness Matrix

| Page | URL | Reliable Readiness Indicator | Evidence / Verification Method |
| :--- | :--- | :--- | :--- |
| **My Actions** | `https://danis-cmma-dev.cosdevx.com/` | `main` container + `text="ACTION QUEUE"` + `nav a[aria-label="My Actions"]` | Verified in DOM: `<main>` exists; `<p class="MuiTypography-root ...">My Actions</p>` is present; Action Queue projects are rendered. |
| **Projects** | `https://danis-cmma-dev.cosdevx.com/projects` | `h1:has-text("Projects")` + `text="projects ·"` | Verified in DOM: `<h1>Projects</h1>` renders; directory table displays `171 projects · 25 shown`. |
| **Workforce** | `https://danis-cmma-dev.cosdevx.com/resources` | `h1:has-text("Workforce Directory")` | Verified in DOM: `<h1>Workforce Directory</h1>` renders; worker count `100 workers · 25 shown` displays. |
| **Scheduling** | `https://danis-cmma-dev.cosdevx.com/scheduling` | `h1:has-text("Scheduling")` + `text="Add Assignment"` | Verified in DOM: `<h1>Scheduling</h1>` renders; Gantt schedule controls and `Add Assignment` button display. |
| **Reports** | `https://danis-cmma-dev.cosdevx.com/reports` | `h1:has-text("Reports")` + `h2:has-text("Demand by trade")` | Verified in DOM: `<h1>Reports</h1>` renders along with enterprise metric panels. |
| **Insights** | `https://danis-cmma-dev.cosdevx.com/insights` | `h1:has-text("Insights")` + `h2:has-text("COVERAGE BY TRADE")` | Verified in DOM: `<h1>Insights</h1>` and coverage alert cards render. |
| **Admin Console** | `https://danis-cmma-dev.cosdevx.com/admin` | `h1:has-text("System Administration")` + `text="Users & Roles"` | Verified in DOM: `<h1>System Administration</h1>` and admin configuration tabs render. |

---

### H. DOM Differences Across Pages

1. **Sidebar Width and Visibility State:**
   - On **My Actions** (`/`), `<nav aria-label="Primary">` has bounding box `{x: 0, y: 0, width: 72, height: 900}`. Text labels (`<span>` or text nodes) are omitted or collapsed; only the SVG icons are displayed.
   - On **Projects, Workforce, Scheduling, Reports, Insights, and Admin Console**, the bounding box expands to `{x: 0, y: 0, width: 260, height: 900}`. Text labels like "Projects", "Workforce", etc. are visible text nodes.
2. **Persistence of Tag and Attributes:**
   - Across **ALL** seven pages, the underlying HTML tag (`A`), `href`, `aria-label`, and `title` attributes remain **100% constant and identical**:
     - `a[href="/projects"][aria-label="Projects"]`
     - `a[href="/resources"][aria-label="Workforce"]`
     - `a[href="/scheduling"][aria-label="Scheduling"]`
     - `a[href="/reports"][aria-label="Reports"]`
     - `a[href="/insights"][aria-label="Insights"]`
     - `a[href="/admin"][aria-label="Admin Console"]`
3. **Implication for Locators:**  
   Because visible text is absent on My Actions when collapsed, text-based selectors like `page.getByText('Projects')` or `text="Projects"` fail on My Actions. However, attribute-based selectors (`nav a[href="..."]` or `nav a[aria-label="..."]`) are 100% stable, identical, and functional on **every single page**.

---

### I. Root Cause Findings

#### CONFIRMED:
1. **CONFIRMED:** Next.js renders a client-side bailout loading shell on initial page load containing a circular progress spinner (`role="progressbar"`).
2. **CONFIRMED:** `nav` elements and clickable navigation links are completely absent during initial HTML delivery (`domcontentloaded`) and only mount after React client-side hydration.
3. **CONFIRMED:** k6's `waitForPageReady` function prematurely resolved at `domcontentloaded` because the spinner body was visible and `<main>` was not yet in the DOM to be awaited.
4. **CONFIRMED:** The left-side navigation is contained within a standard `<nav aria-label="Primary">` element in the light DOM. No iframes or shadow DOM trees are involved in the navigation structure.
5. **CONFIRMED:** Navigation items are standard HTML `<a>` links wrapping Lucide SVG icons.
6. **CONFIRMED:** On the My Actions landing page, the navigation bar is collapsed to 72px width, meaning visible text labels are not rendered in the DOM.
7. **CONFIRMED:** Every navigation item consistently carries an `aria-label`, `title`, and `href` attribute on both collapsed and expanded views.
8. **CONFIRMED:** The Workforce destination URL is `/resources` (not `/workforce`).
9. **CONFIRMED:** The Admin Console destination URL is `/admin` (not `/admin-console`).
10. **CONFIRMED:** Navigation between all seven pages operates via Single Page Application (SPA) client-side routing (`pushState`) without full page reloads.

#### NOT CONFIRMED:
1. **NOT CONFIRMED:** Navigation failure is caused by an iframe (disproved; 0 iframes present).
2. **NOT CONFIRMED:** Navigation failure is caused by shadow DOM (disproved; `<nav>` is standard light DOM).
3. **NOT CONFIRMED:** Navigation requires mouse hover expansion before clicking (disproved; direct clicks on `nav a[aria-label="..."]` succeed immediately while collapsed).
4. **NOT CONFIRMED:** The sidebar navigation DOM is destroyed and recreated with different tags across pages (disproved; identical `<a>` structures persist).

---

### J. Recommended Locator Strategy

Based strictly on the observed DOM, the recommended locator strategy for every navigation item uses the persistent `href` or `aria-label` inside `nav`:

| Page to Navigate To | Recommended Locator (Primary) | Recommended Locator (Alternative) |
| :--- | :--- | :--- |
| **My Actions** | `nav a[href="/"]` | `nav a[aria-label="My Actions"]` |
| **Projects** | `nav a[href="/projects"]` | `nav a[aria-label="Projects"]` |
| **Workforce** | `nav a[href="/resources"]` | `nav a[aria-label="Workforce"]` |
| **Scheduling** | `nav a[href="/scheduling"]` | `nav a[aria-label="Scheduling"]` |
| **Reports** | `nav a[href="/reports"]` | `nav a[aria-label="Reports"]` |
| **Insights** | `nav a[href="/insights"]` | `nav a[aria-label="Insights"]` |
| **Admin Console** | `nav a[href="/admin"]` | `nav a[aria-label="Admin Console"]` |

---

### K. Recommended k6 Interaction Model

The browser interaction sequence that should eventually be implemented in `ui_navigation.js` is:

1. **Session Initialization:**  
   Configure context with `storageState` cookies and local storage tokens.
2. **Landing on My Actions:**  
   - `page.goto(BASE_URL)`
   - **Crucial Wait Condition for k6:** Wait for the client shell to mount:
     ```javascript
     await page.locator('nav[aria-label="Primary"]').waitFor({ state: 'visible' });
     await page.locator('main').waitFor({ state: 'visible' });
     ```
3. **Click Projects:**  
   - Click: `page.locator('nav a[href="/projects"]').click()`
   - Wait for URL / Readiness:
     ```javascript
     await page.waitForURL('**/projects');
     await page.locator('h1:has-text("Projects")').waitFor({ state: 'visible' });
     ```
4. **Click Workforce:**  
   - Click: `page.locator('nav a[href="/resources"]').click()`
   - Wait for URL / Readiness:
     ```javascript
     await page.waitForURL('**/resources');
     await page.locator('h1:has-text("Workforce Directory")').waitFor({ state: 'visible' });
     ```
5. **Click Scheduling:**  
   - Click: `page.locator('nav a[href="/scheduling"]').click()`
   - Wait for URL / Readiness:
     ```javascript
     await page.waitForURL('**/scheduling');
     await page.locator('h1:has-text("Scheduling")').waitFor({ state: 'visible' });
     ```
6. **Click Reports:**  
   - Click: `page.locator('nav a[href="/reports"]').click()`
   - Wait for URL / Readiness:
     ```javascript
     await page.waitForURL('**/reports');
     await page.locator('h1:has-text("Reports")').waitFor({ state: 'visible' });
     ```
7. **Click Insights:**  
   - Click: `page.locator('nav a[href="/insights"]').click()`
   - Wait for URL / Readiness:
     ```javascript
     await page.waitForURL('**/insights');
     await page.locator('h1:has-text("Insights")').waitFor({ state: 'visible' });
     ```
8. **Click Admin Console:**  
   - Click: `page.locator('nav a[href="/admin"]').click()`
   - Wait for URL / Readiness:
     ```javascript
     await page.waitForURL('**/admin');
     await page.locator('h1:has-text("System Administration")').waitFor({ state: 'visible' });
     ```

---

### L. Evidence / Artifacts

Discovered investigation artifacts:
- `investigation_data.json`      
- `01_my_actions_full.png`
- `02_projects.png`
- `03_workforce.png`
- `04_scheduling.png`
- `05_reports.png`
- `06_insights.png`
- `07_admin_console.png`

> **Note on Storage Location:**  
> Artifacts remain in Antigravity artifact storage and are not present in the workspace.
