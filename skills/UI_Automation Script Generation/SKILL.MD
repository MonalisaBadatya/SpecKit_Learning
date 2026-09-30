
---

# 2. Updated `ui-playwright-automation/skill.md`

```markdown
---

name: ui-playwright-automation

description: Generate maintainable Python pytest Playwright UI automation from approved, automation-eligible and execution-ready UI test cases. Preserve TC/Scenario/Requirement traceability, use Page Object Model, use source-supported locators and workflows, never invent UI behavior, never execute tests, and never generate API, DB, or performance automation.

---

# UI Playwright Automation

## 1. Purpose

Generate execution-ready Playwright UI automation from the approved Test Case Engineering artifact.

The skill converts eligible UI test cases into maintainable Python pytest Playwright automation.

The skill does NOT:

- design new test cases
- modify test cases
- modify the Test Plan
- modify the specification
- execute tests
- generate API automation
- generate DB automation
- generate k6 performance scripts
- generate Lighthouse performance scripts
- invent UI behavior

---

## 2. Authoritative Inputs

Use the available artifacts in this priority:

1. `APPROVED_UI_TEST_CASES`
2. `TEST_CASE_ENGINEERING`
3. `AUTOMATION_FEASIBILITY`
4. `TEST_PLAN`
5. `QA_ANALYSIS`
6. `SPEC`
7. `REVIEW`

The Test Case Engineering artifact is the primary implementation source.

Use the Test Plan / QA Analysis / Spec only to resolve explicitly documented UI information required by the selected test case.

---

## 3. Mandatory Selection Gates

A UI test case is eligible only when ALL required gates pass.

### Gate 1 — Test Case Exists

If no usable UI test cases exist:

**STOP**

Do not create UI automation from requirements or scenarios alone.

---

### Gate 2 — UI Layer

Select only UI-oriented cases.

Eligible:

`UI`

Do not select:

- API
- DB
- Performance
- API-only Security
- API-only Integration

If a test case has multiple layers such as:

`UI / API`

automate it in this skill only when the selected automation framework is Playwright and the UI behavior is explicitly testable through the UI case.

Do not duplicate API assertions that belong to API automation.

---

### Gate 3 — Automation Feasibility

Read the Automation Feasibility value from the Test Case Engineering artifact.

Automate only:

`YES`

Skip:

`PARTIAL`

`NO`

Do not convert `PARTIAL` to `YES`.

Do not invent automation eligibility.

---

### Gate 4 — Execution Readiness

The selected test case must be:

`READY`

Skip:

`NOT_READY`

A test case may be technically automatable but still not ready because of:

- missing UI behavior
- missing test data
- missing credentials
- missing environment
- unresolved expected result
- unresolved requirement
- unresolved locator information
- unresolved business rule
- unresolved dependency

Report the exact blocker.

---

### Gate 5 — Review Status

If review information exists, continue only for approved cases.

Accept:

`APPROVED`

Do not generate for:

`CHANGES_REQUIRED`

Do not infer approval.

---

### Gate 6 — Information Gaps

If an unresolved Information Gap affects implementation:

Skip the case.

Report:

`INFORMATION GAP - <Gap ID>`

Do not invent the missing UI behavior.

---

## 4. UI Scope

Generate only supported UI functional/regression automation.

Supported:

- UI entry points
- navigation
- buttons
- forms
- drawers
- modals
- date pickers
- dropdowns
- checkboxes
- validation messages
- confirmation flows
- UI state changes
- UI regression behavior
- duplicate-click prevention
- documented UI/API interaction observable through the UI

Do not generate:

- API automation
- DB automation
- k6 scripts
- Lighthouse scripts
- performance automation
- new scenarios
- unsupported UI workflows

UI performance belongs to the separate performance automation flow.

---

## 5. Source Authority

Use:

`TEST_CASE_ENGINEERING > TEST_PLAN > QA_ANALYSIS > SPEC`

The selected test case is the primary implementation source.

Never invent:

- pages
- routes
- menus
- buttons
- labels
- text
- fields
- elements
- locators
- workflows
- navigation
- dialogs
- validation messages
- expected UI states
- credentials
- test data
- API behavior

If required UI information is missing:

`INFORMATION GAP`

Skip the case.

---

## 6. Technology

Use:

`Python + pytest + Playwright`

Use the project-supported Playwright configuration.

Prefer the existing project setup if available.

Do not introduce unsupported frameworks or dependencies.

---

## 7. Page Object Model

Use Page Object Model for reusable page/component interactions.

Recommended structure:

```text
automation/
└── ui/
    ├── pages/
    ├── components/
    ├── tests/
    ├── fixtures/
    └── utils/