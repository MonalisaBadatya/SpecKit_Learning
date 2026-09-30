# Automation Feasibility Assessment: Assignment Change Request Approval

**Feature:** `feat-assignment-change-request-approval`
**Epic:** `epic-assignments`
**Inputs:** UI, API, DB, and Regression test cases v2.0
**Assessment Date:** 2026-08-26
**Document Version:** 2.0

---

## 1. Feasibility Summary

| Layer | Total | AUTOMATE | PARTIAL | MANUAL | BLOCKED | Feasibility % |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| UI | 18 | 14 | 0 | 2 | 2 | 77.8% |
| API - Contract | 8 | 8 | 0 | 0 | 0 | 100% |
| API - Business Rule | 20 | 17 | 1 | 0 | 2 | 85% |
| API - Security | 15 | 15 | 0 | 0 | 0 | 100% |
| API - State Machine | 8 | 8 | 0 | 0 | 0 | 100% |
| API - Concurrency | 3 | 3 | 0 | 0 | 0 | 100% |
| API - Pagination | 6 | 6 | 0 | 0 | 0 | 100% |
| DB | 23 | 0 | 18 | 5 | 0 | 78% (manual SQL) |
| Regression | 27 | 22 | 0 | 2 | 3 | 81% |
| **Total** | **128** | **93** | **19** | **9** | **7** | **~89%** |

> BLOCKED = specification gaps prevent test case expectation definition (GAP-PLAN items).
> PARTIAL = automation requires SQL verification step alongside API calls.

---

## 2. Framework Recommendations

### UI Automation: Playwright Python
- Rationale: Native modal/dialog interaction, accessible role locators, route interception for email token mocking, auto-wait.
- Axe-core via `playwright-axe` for accessibility scanning.
- `expect(locator).to_be_focused()` for focus management assertions.
- Page Object Model: `BasePage`, `LandingPageWidget`, `AssignmentDetailDrawer`, `TokenActionPage`.

### API Automation: Pytest + Requests + Pydantic
- Contract tests: Pydantic model assertions per endpoint response.
- Business rule tests: Parameterized fixtures per scenario.
- Security tests: Explicit bad-actor fixtures (tampered tokens, wrong JWT, cross-tenant).
- Concurrency: `concurrent.futures.ThreadPoolExecutor(max_workers=2)`.
- Multi-tenant: Header injection fixture (`X-Tenant-Slug` or schema-based routing).

### DB Verification: Manual SQL
- No automated DB runner in scope.
- SQL verification scripts bundled per test suite.
- Executed post-action by QA engineer.

### Accessibility: Axe-core + Playwright
- `playwright-axe` for automated critical violation scanning.
- Manual step for color-disabling test (TC-UI-015).

---

## 3. UI Test Cases - Feasibility Detail

| TC ID | Title | Priority | Complexity | Verdict | Strategy | Blocker |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| TC-UI-001 | Widget & Drawer Banner | P1 | Medium | AUTOMATE | Playwright PageObject | - |
| TC-UI-002 | Clean Approval | P1 | Low | AUTOMATE | Playwright | - |
| TC-UI-003 | Conflict Override Modal | P1 | Medium | AUTOMATE | Playwright modal interaction | - |
| TC-UI-004 | Project Extension Modal | P1 | Medium | AUTOMATE | Playwright modal confirm | - |
| TC-UI-005 | Historic Lockout - WFM Blocked | P0 | Medium | AUTOMATE | Playwright + WFM JWT | - |
| TC-UI-006 | Historic Lockout - Admin | P1 | Medium | AUTOMATE | Playwright + Admin JWT | - |
| TC-UI-007 | Rejection with Comment | P1 | Low | AUTOMATE | Playwright textarea + confirm | - |
| TC-UI-008 | PM Self-Withdrawal | P1 | Low | AUTOMATE | Playwright drawer button | - |
| TC-UI-009 | Non-Owner PM Block | P0 | Low | AUTOMATE | Assert button hidden/403 | - |
| TC-UI-010 | Pursuit/Draft Block | P0 | Low | AUTOMATE | Alert text assertion | - |
| TC-UI-011 | Self-Collision Exclusion | P1 | Low | AUTOMATE | Assert no amber badge | - |
| TC-UI-012 | Archived Worker Block | P1 | Low | AUTOMATE | Error alert assertion | - |
| TC-UI-013 | Expired Email Link Toast | P1 | High | MANUAL | Manual mailbox | Email link dependency |
| TC-UI-014 | Already-Resolved Screen | P2 | Medium | MANUAL | Manual link | Email link dependency |
| TC-UI-015 | Badge WCAG 1.4.1 | P2 | Medium | AUTOMATE | Axe-core + manual CSS | Partial manual |
| TC-UI-016 | Modal Focus Trap | P2 | Low | AUTOMATE | to_be_focused() + ARIA | - |
| TC-UI-017 | Accessible Names | P2 | Low | AUTOMATE | aria-label + Axe | - |
| TC-UI-018 | Regression: Detail+Timeline+Cal | P1 | High | AUTOMATE | Playwright cross-view | - |

---

## 4. API Test Cases - Feasibility Detail

### Contract Tests
All 8 contract tests: AUTOMATE with Pytest + Pydantic. Low complexity. No blockers.

### Business Rule Tests

| TC ID | Verdict | Complexity | Notes |
| :--- | :---: | :---: | :--- |
| TC-API-B01 | AUTOMATE | Low | Valid token fixture |
| TC-API-B02 | AUTOMATE | Low | Expired token fixture (createdDateTime -8 days) |
| TC-API-B03 | AUTOMATE | Low | Valid ACCEPT token + DB verify |
| TC-API-B04 | AUTOMATE | Low | Valid DENY token |
| TC-API-B05 | AUTOMATE | Medium | Conflict token + overrideConflict=true |
| TC-API-B06 | AUTOMATE | Medium | Conflict token + overrideConflict=false -> 409 |
| TC-API-B07..B11 | AUTOMATE | Low | Pagination fixtures |
| TC-API-B12 | AUTOMATE | Low | Clean approval |
| TC-API-B13..B14 | AUTOMATE | Medium | Flag variants |
| TC-API-B15 | AUTOMATE | Medium | Admin JWT fixture |
| TC-API-B16..B17 | AUTOMATE | Low | Guard scenarios |
| TC-API-B18 | AUTOMATE | Low | Reject with comment |
| TC-API-B19 | PARTIAL | Low | Null comment - document actual behavior (GAP-PLAN-001) |
| TC-API-B20 | BLOCKED | Low | Empty string comment expectation undefined (GAP-PLAN-001) |

### Security Tests
All 15 security tests: AUTOMATE. P0 priority. Require Tenant B schema for cross-tenant tests.

### State Machine Tests
All 8 state machine tests: AUTOMATE. Require pre-resolved ACR fixtures.

### Concurrency Tests
All 3 concurrency tests: AUTOMATE using `concurrent.futures.ThreadPoolExecutor`.

**Prerequisite:** Fresh clean ACR fixture per concurrency run (not reused between runs).

### Pagination Tests
All 6 pagination tests: AUTOMATE. Parameterized query params.

---

## 5. DB Tests - Feasibility Detail

| TC ID | Verdict | Complexity | Notes |
| :--- | :---: | :---: | :--- |
| TC-DB-001..TC-DB-005 | MANUAL (SQL) | Low | Schema/index verification |
| TC-DB-006..TC-DB-011 | PARTIAL | Medium | API trigger + manual SQL verify |
| TC-DB-012..TC-DB-018 | PARTIAL | Medium | API trigger + audit SQL verify |
| TC-DB-019..TC-DB-020 | PARTIAL | Medium | API trigger + SQL verify |
| TC-DB-021 | PARTIAL | High | Requires Tenant B schema setup |
| TC-DB-022..TC-DB-023 | PARTIAL | Medium | API trigger + SQL verify |

---

## 6. Browser & Responsive Coverage

| Browser | Desktop | Tablet | Test Scope |
| :--- | :---: | :---: | :--- |
| Chromium | AUTOMATE | AUTOMATE | Full suite - primary target |
| Firefox | AUTOMATE | - | P0+P1 UI smoke pass |
| WebKit (Safari) | AUTOMATE | - | P0+P1 UI smoke pass |
| Mobile/Responsive | MANUAL | - | Widget + drawer responsive layout |

---

## 7. Automation Prerequisites

| Category | Requirement |
| :--- | :--- |
| Test environment | CMMA WFM app deployed; API accessible |
| Auth fixtures | JWT tokens for: WFM1, WFM2, PM-Owner, PM-Other, System Admin, Tenant B WFM |
| DB access | PostgreSQL test DB (cmma_danis + cmma_tenantb schemas) |
| Token fixtures | HMAC-SHA256 token seeding utility (generates valid/expired/used/tampered tokens) |
| Multi-tenant | Tenant B schema provisioned with Harbor Freight Depot project and ACR |
| Concurrency | Thread-safe fixture: fresh ACR per concurrent test run |
| Accessibility | playwright-axe installed; browser accessibility tree enabled |
| RBAC | Each JWT has correct role claims for testing |

---

## 8. Automation ROI & Sprint Priority

### Sprint 1 - Immediate (P0 Security + Core)
- All P0 security tests: TC-API-S01..S15
- State machine guards: TC-API-SM01..SM08
- Concurrency: TC-API-CC01..CC03
- Core UI P0: TC-UI-005, TC-UI-009, TC-UI-010
- Cross-tenant: TC-API-S08, TC-API-S15, TC-DB-021

### Sprint 2 - High Value (P1 Core Feature)
- Full API contract suite: TC-API-C01..C08
- Core approval business rules: TC-API-B01..B17
- Rejection/withdrawal: TC-API-B18..B19
- UI approvals: TC-UI-001..TC-UI-012
- Regression downstream: TC-UI-018, REG-DS-001..005
- Pagination: TC-API-B07..B11, TC-API-P01..P06

### Sprint 3 - Quality Polish (P2)
- Accessibility: TC-UI-015..TC-UI-017
- Browser smoke (Firefox, WebKit)
- Boundary edge cases: boundary token, large offset, max limit

---

## 9. Risks

| Risk | Severity | Mitigation |
| :--- | :---: | :--- |
| Email link tests cannot be automated | High | API-level token preview/execute covers equivalent logic |
| Concurrency tests are environment-sensitive | High | Use thread-safe fixtures; retry on flake; run serially in CI if needed |
| Tenant B schema not provisioned | Medium | Block cross-tenant tests until schema available |
| Audit table name unknown | Low | Verify from migration files before TC-DB-012..018 |
| GAP-PLAN-001..007 block some tests | Medium | Mark BLOCKED; revisit after spec clarification |
| Axe-core color contrast varies by theme | Low | Run against default theme only; document baseline |
