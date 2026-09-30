---

name: ui-navigation-investigation
description: Investigate a web application's authenticated UI navigation, DOM structure, routes, rendering lifecycle, reliable locators, and page readiness conditions for browser-based performance automation. Use before creating or updating a k6 UI navigation script.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# UI Navigation Investigation

## Purpose

Create an evidence-based UI navigation map that can be consumed by browser performance automation.

The investigation is application-specific; this skill is not.

The output must identify **what the application does**, not prescribe what it should do.

---

## Inputs

Use the applicable:

* `Spec.md`
* existing UI automation artifacts
* authentication/session artifacts
* application URL/environment
* existing investigation report, if available

The specification defines the required journey/scope.

The live application defines actual UI behavior.

---

## Process

### 1. Establish Session

Use the available authenticated test session.

Verify:

* authentication succeeds
* landing page
* landing URL
* application title
* authentication/MFA behavior where relevant

Never expose credentials, tokens, cookies, or secrets in the report.

---

### 2. Investigate Rendering Lifecycle

Determine whether the application uses:

* SSR
* CSR
* hydration
* loading shells
* delayed rendering
* SPA/client-side routing

Check whether:

`domcontentloaded`

occurs before the application becomes interactive.

Identify the earliest reliable application-ready state.

Do not assume:

* `domcontentloaded = ready`
* `body visible = ready`

---

### 3. Investigate Navigation

For each required navigation target determine:

* navigation container
* HTML tag
* role/ARIA attributes
* visible label
* `aria-label`
* `title`
* `href`
* `id`
* `data-testid`
* clickable element
* iframe/shadow DOM involvement
* collapsed/expanded behavior
* dynamic rendering behavior

---

### 4. Determine Reliable Locators

For each target identify:

* primary locator
* alternative locator
* locator stability
* conditions under which it is usable

Prefer confirmed stable attributes.

Do not invent selectors.

Do not recommend text-based selectors when the investigation shows that text is absent, dynamic, or unstable.

---

### 5. Determine Actual Routes

For every navigation action verify:

`source → UI action → destination → actual route`

Record routing differences between logical page names and actual URLs.

Determine whether navigation is:

* full page
* SPA/client-side
* pushState/history based
* otherwise dynamically routed

Never infer routes from page names.

---

### 6. Determine Page Readiness

For every destination identify a reliable readiness condition.

Prefer:

* unique heading
* unique page content
* unique control
* table/list
* page-specific component

Avoid using only:

* body visibility
* generic containers
* `domcontentloaded`
* arbitrary delays

The condition must indicate that the intended destination is actually rendered.

---

### 7. Execute the Journey

Where access permits, execute the required journey using real UI interactions.

For each transition record:

* source
* action
* target
* locator
* click/action result
* actual route
* readiness condition
* readiness result
* routing mechanism
* observed duration
* error, if any

Do not simulate a UI journey using direct destination URL navigation.

---

## Evidence Rules

Every conclusion must be classified as:

### CONFIRMED

Directly observed in the application.

### INFORMATION GAP

Required information could not be determined.

### DISPROVED

A suspected behavior was explicitly tested and ruled out.

Do not convert assumptions into confirmed findings.

---

## Output

Create:

`<project>/performance/investigation/ui-navigation-dom-investigation.md`

Use this structure:

```text
A. Executive Summary
B. Authentication / Landing
C. Rendering Lifecycle
D. Navigation Architecture
E. Navigation DOM Matrix
F. Navigation Results
G. Page Readiness Matrix
H. Cross-Page DOM Differences
I. Confirmed Findings
J. Disproved Findings
K. Recommended Locator Strategy
L. Recommended Browser Interaction Model
M. Evidence / Artifacts
N. Information Gaps
```

### Navigation DOM Matrix

Record only observed values:

| Target | Element | Role | Label | aria-label | title | testid | id | href | Primary Locator | Alternative |

### Page Readiness Matrix

| Page | Actual URL | Readiness Condition | Evidence |

### Navigation Results

| Source | Action | Target | Locator | Actual URL | Ready | Routing | Duration | Result |

---

## Artifact Rules

Preserve useful evidence when available:

* screenshots
* DOM data
* JSON
* recordings
* browser artifacts

Never invent artifact locations.

If artifacts cannot be copied into the workspace, state that they remain in the agent/browser artifact storage.

---

## Do Not

* modify application code
* modify k6 scripts
* invent selectors
* invent URLs
* invent readiness conditions
* expose secrets
* use arbitrary waits as evidence
* repeat an existing valid investigation unnecessarily
* replace observed facts with assumptions

---

## Completion Criteria

The investigation is complete when:

* required journey is understood
* actual navigation elements are identified
* actual routes are verified
* reliable locators are identified
* rendering/hydration behavior is understood
* readiness conditions are identified
* UI-click navigation is verified where possible
* findings and information gaps are separated
* investigation artifact is saved
