# QA Test Case Review: Assignment Change Request Approval

**Feature:** `feat-assignment-change-request-approval`
**Epic:** `epic-assignments`
**Review Target:** test-cases/ (UI, API, DB, Regression) v2.0
**Review Date:** 2026-08-26
**Review Status:** APPROVED - v2.0

---

## 1. Executive Summary & Inventory

Independent QA peer review of all test cases for ACR Approval (v2.0), incorporating all 19 gaps from test plan gap analysis.

### Test Case Counts by Layer

| Layer | Suite File | Total | P0 | P1 | P2 | Blocked |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| UI | AssignmentChangeRequest_UI_TestCases.md | 18 | 3 | 12 | 3 | 0 |
| API - Contract | AssignmentChangeRequest_API_TestCases.md | 8 | 0 | 8 | 0 | 0 |
| API - Business Rule | AssignmentChangeRequest_API_TestCases.md | 20 | 3 | 15 | 2 | 2 |
| API - Security | AssignmentChangeRequest_API_TestCases.md | 15 | 14 | 1 | 0 | 0 |
| API - State Machine | AssignmentChangeRequest_API_TestCases.md | 8 | 7 | 1 | 0 | 0 |
| API - Concurrency | AssignmentChangeRequest_API_TestCases.md | 3 | 3 | 0 | 0 | 0 |
| API - Pagination | AssignmentChangeRequest_API_TestCases.md | 6 | 0 | 1 | 5 | 0 |
| DB | AssignmentChangeRequest_DB_TestCases.md | 23 | 2 | 21 | 0 | 0 |
| Regression | AssignmentChangeRequest_Regression_TestCases.md | 27 | 9 | 15 | 0 | 0 |
| **Total** | | **128** | **41** | **74** | **10** | **3** |

---

## 2. Coverage Added vs v1.0

| Gap Ref | Area | Coverage Added | TC IDs |
| :--- | :--- | :--- | :--- |
| Gap A | Requirements RTM (16 REQ-ACR-*) | All 16 requirements explicitly traced in test plan §3 | All TCs updated |
| Gap B | REQ-ACR-002 full chain | Pending -> notification -> token in DB | TC-API-B07, SCN-052 |
| Gap B | REQ-ACR-011 token invalidation | Auto-cancel + CASCADE verified | TC-DB-011 |
| Gap C | Business rules (9 BR-ACR-*) | All 9 rules covered | TC-UI-010..012, TC-API-B16/B17 |
| Gap D | RBAC matrix | PM/WFM/Admin per action; ? flags preserved | TC-API-S09..S15 |
| Gap E | Token security (19 scenarios) | Tamper/replay/reuse/cross-tenant/malformed | TC-API-S01..S15 |
| Gap F | Multi-tenancy (5 scenarios) | Token/query/PATCH/schema isolation | TC-API-S08/S15, TC-DB-021 |
| Gap G | Concurrency (3 scenarios) | Dual WFM/UI+email/dual token | TC-API-CC01..CC03 |
| Gap H | State machine invalid transitions (10) | All resolved-state actions return 409 | TC-API-SM01..SM08 |
| Gap I | Negative API (25+ tests) | Invalid type/missing/null per endpoint | TC-API-C06..C08, TC-API-P01..P06 |
| Gap J | Accessibility (WCAG 1.4.1 + 2.4.3) | Badge, modal, ARIA | TC-UI-015..TC-UI-017 |
| Gap K | Browser coverage defined | Chromium/Firefox/WebKit in feasibility | Feasibility doc |
| Gap L | Regression downstream oracle | Timeline/Calendar/Assignment Detail | TC-UI-018, REG-DS-001..005 |
| Gap M | Audit trail (8 transitions) | Field-level verification per transition | TC-DB-012..TC-DB-018 |
| Gap N | Notification scenarios | Recipient + payload defined; gaps flagged | SCN-052..054 |
| Gap O | GAP-ACR-003 carried forward | GAP-PLAN-003 tracked | Gaps section |
| Gap P | Contract vs business-rule separation | Distinct test suites | TC-API-C01..C08 vs B01..B20 |
| Gap R | Pagination/filtering (10 tests) | All filter/pagination params | TC-API-B07..B11, TC-API-P01..P06 |
| Gap S | DB integrity after every transition | Status/dates/tokens/audit per action | TC-DB-006..TC-DB-011 |

---

## 3. Review Checklist

| Dimension | Status | Notes |
| :--- | :---: | :--- |
| Requirements Traceability (16 REQ-ACR-*) | PASS | All 16 in RTM; REQ-ACR-001 correctly marked out-of-scope |
| Business Rule Coverage (9 BR-ACR-*) | PASS | All 9 explicitly covered |
| Positive / Negative / Boundary balance | PASS | All three types present per endpoint and UI flow |
| RBAC Permission Matrix | PASS | PM/WFM/Admin separation; ambiguous items (?) flagged with GAP-PLAN-007 |
| Security - Token Lifecycle | PASS | 19-scenario token matrix covered |
| State Machine Invalid Transitions | PASS | 10 invalid transitions; all expect 409 |
| Concurrency (3 scenarios) | PASS | Dual WFM, UI+email, dual token |
| Multi-Tenancy Isolation (5 scenarios) | PASS | Token, query, PATCH, schema isolation |
| Audit Trail (8 transitions) | PASS | Field-level assertions for every state change |
| API Contract vs Business-Rule Separation | PASS | Distinct suites; no cross-contamination |
| Pagination / Filtering | PASS | All parameters: status/projectId/limit/offset/boundary |
| Notification Events | PARTIAL | Submission + approval/rejection covered; withdrawal/auto-cancel BLOCKED (GAP-PLAN-004/005) |
| Accessibility (WCAG 1.4.1, 2.4.3, 1.3.1) | PASS | Badge, modal focus, ARIA names |
| Regression Downstream Oracle | PASS | Timeline/Calendar/Assignment Detail/Conflict calc |
| DB Schema & DDL Verification | PASS | All columns, indexes, FK rules |
| DB Post-Action Integrity | PASS | Status/dates/audit/token usedAt per transition |
| Duplication Check | PASS | Contract tests do not duplicate business rule tests; UI vs API distinctions clear |
| Automation Suitability | PASS | All core cases suitable for Playwright/Pytest; concurrency uses concurrent.futures |
| Test Data Completeness | PASS | All referenced data exists in TestData.md v2.0 |
| GAP Handling | PASS | All 7 GAP-PLAN items tracked; affected tests marked BLOCKED |

---

## 4. Detailed Findings

| TC ID | Severity | Finding | Resolution |
| :--- | :---: | :--- | :--- |
| TC-UI-013, TC-UI-014 | Low | Email link dependency requires external token with correct expiresAt | Seed token with createdDateTime = NOW() - 8 days; mark MANUAL ONLY |
| TC-API-CC01..CC03 | Medium | Concurrency requires parallel HTTP client | Use concurrent.futures.ThreadPoolExecutor; one fresh clean ACR per run |
| TC-DB-012..TC-DB-018 | Low | Audit table name assumed changeRequestAudit | Confirm name from migration files before execution |
| TC-UI-015 | Low | Color-only test is partially manual (CSS disable step) | Supplement with Axe-core scan for automated color-contrast coverage |
| SCN-054, TC-NOTIF-004..006 | Medium | Notification recipient/payload for withdrawal, auto-cancel, conflict override unspecified | BLOCKED - GAP-PLAN-004, GAP-PLAN-005, GAP-PLAN-006 |
| SCN-034 | Medium | WFM withdrawal ambiguity | BLOCKED - GAP-PLAN-007; do not invent behavior |
| TC-API-B20 | Low | Rejection with empty string "" behavior | BLOCKED - GAP-PLAN-001; test and document actual behavior |

---

## 5. Automation Blockers & Gap Tracking

**Blocked test cases:** 3 (SCN-034, SCN-054, TC-API-B19/B20 partial)

**Active GAP-PLAN items:**
- GAP-PLAN-001: Rejection notification format with blank comment (blocks TC-API-B19/B20 expectation)
- GAP-PLAN-002: Push vs polling for widget refresh
- GAP-PLAN-003: Second ACR while first is PENDING (behavior undefined; potential new test)
- GAP-PLAN-004: Withdrawal notification recipient/payload
- GAP-PLAN-005: Auto-cancel notification to PM
- GAP-PLAN-006: Conflict override flag in notification payload
- GAP-PLAN-007: WFM withdrawal of own/others; WFM audit access

---

## 6. Final Approval Status

**Review Verdict:** APPROVED - v2.0

Test suite is comprehensive, covers all 19 identified gaps, and is ready for automation scripting.
Blocked cases are documented with GAP IDs. Do not invent expected behavior for blocked cases.
