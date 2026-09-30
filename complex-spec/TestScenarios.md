# Test Scenarios: Effective Date Reassign and Unassign

**Feature:** `feat-effective-date-reassign-unassign`  
**Epic:** `epic-assignments`  
**Source Test Plan:** `complex-spec/EffectiveDate_Reassign_Unassign_TestPlan.md`  
**Source QA Analysis:** `complex-spec/EffectiveDate_Reassign_Unassign_QA_Analysis.md`  
**Scenario Count:** 28  

---

## 1. Test Scenarios Matrix

**Prerequisities** : 
Log in into  https://danis-cmma-dev.cosdevx.com 
Use these creds to log in : monalisa.badatya+1@costrategix.com
Test@123
user lands on dashboard>then click on Assignments on left navigation menu 

Then execute these scenarios based on scenario description:

| Scenario ID | Requirement ID | Title | Layer | Type | Priority | Risk | Preconditions | Expected Outcome | Traceability |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SCN-EDRU-001** | `REQ-EDRU-001` | Trigger Effective Date modal on in-progress assignment via Gantt context menu | UI | Functional / Positive | High | Medium | In-progress assignment exists (`startDate < today`), Gantt chart timeline loaded. | Right-clicking assignment bar and choosing Unassign or Reassign opens `UnassignConfirmationModal` or `ReassignEffectiveDateModal`. | `REQ-EDRU-001`, `BR-EDRU-001`, `UI-EDRU-001` |
| **SCN-EDRU-002** | `REQ-EDRU-001` | Trigger Effective Date modal on in-progress assignment via Assignment Details Drawer | UI | Functional / Positive | High | Low | In-progress assignment exists (`startDate < today`), Details Drawer opened. | Clicking Unassign or Reassign buttons inside Drawer launches respective Effective Date modal. | `REQ-EDRU-001`, `BR-EDRU-001`, `UI-EDRU-002` |
| **SCN-EDRU-003** | `REQ-EDRU-001` | Trigger Effective Date modal on in-progress assignment via Worker Assignments List | UI | Functional / Positive | Medium | Low | In-progress assignment exists (`startDate < today`), Worker Assignments tab opened. | Selecting Unassign or Reassign row action opens respective Effective Date modal. | `REQ-EDRU-001`, `BR-EDRU-001`, `UI-EDRU-003` |
| **SCN-EDRU-004** | `REQ-EDRU-002` | Bypass Effective Date flow for future assignment (`startDate >= today`) | UI / Functional | Positive | High | Medium | Future assignment exists (`startDate >= today`). | Initiating Unassign or Reassign executes standard full operation immediately without showing date picker modals. | `REQ-EDRU-002`, `BR-EDRU-001` |
| **SCN-EDRU-005** | `REQ-EDRU-003` | Default effective date picker selection to `today` for active in-progress assignment | UI | Functional / Positive | High | Low | Assignment with `startDate < today <= endDate` opened in split modal. | Effective date picker defaults to `today`, with selectable range restricted to `[startDate, endDate]`. | `REQ-EDRU-003`, `REQ-EDRU-005`, `BR-EDRU-002`, `BR-EDRU-003` |
| **SCN-EDRU-006** | `REQ-EDRU-004` | Default effective date picker selection to `startDate` for expired assignment | UI | Boundary / Positive | Medium | Low | Expired assignment where `today > endDate` opened in split modal. | Date picker defaults to `startDate` and restricts selectable bounds to `[startDate, endDate]`. | `REQ-EDRU-004`, `REQ-EDRU-005`, `BR-EDRU-002`, `BR-EDRU-003` |
| **SCN-EDRU-007** | `REQ-EDRU-006` | Execute Unassign split on in-progress assignment via UI | UI | Functional / Positive | High | High | In-progress assignment exists; user opens `UnassignConfirmationModal` and selects valid `effectiveDate`. | Preview badges accurately show preserved `[startDate, effectiveDate - 1 day]` and unassigned `[effectiveDate, endDate]`; on confirm, `POST /split` triggers, original record shortens, and open labor request is created. | `REQ-EDRU-006`, `BR-EDRU-005`, `BR-EDRU-006`, `RSK-EDRU-001` |
| **SCN-EDRU-008** | `REQ-EDRU-007` | Execute Reassign split with non-conflicting replacement worker via UI | UI | Functional / Positive | High | High | In-progress assignment exists; user completes `ReassignEffectiveDateModal` and opens `FillOpenRequestDrawer`. | Candidate list is filtered for `[effectiveDate, endDate]`; selecting available worker and confirming executes split creating replacement assignment. | `REQ-EDRU-007`, `BR-EDRU-005`, `BR-EDRU-006`, `RSK-EDRU-001` |
| **SCN-EDRU-009** | `REQ-EDRU-008` | Acknowledge start-date equality warning when `effectiveDate == startDate` | UI | Boundary / Positive | High | High | User sets `effectiveDate == startDate` in split modal. | Confirmation warning modal prompts user that no historical segment will be preserved; confirming executes full unassign/reassign from day one. | `REQ-EDRU-008`, `BR-EDRU-004`, `RSK-EDRU-001` |
| **SCN-EDRU-010** | `REQ-EDRU-009` | Reassign replacement worker with scheduling conflict and confirm override | UI / API | Negative / Positive | High | Medium | Selected replacement worker has overlapping assignment during `[effectiveDate, endDate]`. | Conflict warning dialog displayed; confirming sets `overrideConflict: true` in payload and successfully executes split. | `REQ-EDRU-009`, `BR-EDRU-007`, `VAL-EDRU-003` |
| **SCN-EDRU-011** | `REQ-EDRU-009` | Reassign replacement worker with scheduling conflict without override confirmation | API | Negative | Medium | Low | Payload contains replacement worker with overlapping assignment and `overrideConflict: false` (or omitted). | Request is rejected with conflict validation error; no records are modified. | `REQ-EDRU-009`, `BR-EDRU-007`, `VAL-EDRU-003` |
| **SCN-EDRU-012** | `REQ-EDRU-010` | Non-Admin user attempts split with `splitDate < today - 7 days` | Security / RBAC | Negative | High | Medium | Standard Workforce Manager attempts split with effective date older than 7 days (`splitDate < today - 7 days`). | UI blocks action or API rejects request due to historic lockout. | `REQ-EDRU-010`, `BR-EDRU-008`, `VAL-EDRU-002` |
| **SCN-EDRU-013** | `REQ-EDRU-010` | System Admin executes historic lockout override split | Security / RBAC | Positive | High | Low | System Admin initiates split where `splitDate < today - 7 days` with `overrideHistoricLockout: true`. | Split succeeds; original assignment is shortened to `splitDate - 1 day` and future segment created. | `REQ-EDRU-010`, `BR-EDRU-008`, `VAL-EDRU-002` |
| **SCN-EDRU-014** | `REQ-EDRU-006` | API split mutation for Unassign with valid payload | API | Functional / Positive | High | High | Valid assignment ID, current `version`, and valid `splitDate` in `POST .../split` payload (null `targetWorkerId`). | Returns successful response; original assignment `endDate` updated to `splitDate - 1 day`, `version` incremented by 1, and new `laborRequest` created in `OPEN` status. | `REQ-EDRU-006`, `BR-EDRU-005`, `BR-EDRU-006` |
| **SCN-EDRU-015** | `REQ-EDRU-007` | API split mutation for Reassign with valid replacement worker | API | Functional / Positive | High | High | Valid assignment ID, current `version`, valid `splitDate`, and valid non-conflicting `targetWorkerId`. | Returns successful response; original assignment shortened, `version` incremented by 1, and new assignment created for `targetWorkerId`. | `REQ-EDRU-007`, `BR-EDRU-005`, `BR-EDRU-006` |
| **SCN-EDRU-016** | `REQ-EDRU-011` | OCC Version mismatch on split mutation | API | Concurrency / Negative | High | High | `POST .../split` submitted with stale `version` (does not match database). | Returns HTTP `409 Conflict`; no database changes are persisted. | `REQ-EDRU-011`, `BR-EDRU-006`, `VAL-EDRU-001`, `RSK-EDRU-002` |
| **SCN-EDRU-017** | `REQ-EDRU-005` | End-date split boundary where `splitDate == endDate` | API / Boundary | Boundary | Medium | Low | In-progress assignment; `POST .../split` executed with `splitDate == assignment.endDate`. | Original assignment shortened to `endDate - 1 day`; 1-day future record created for `[endDate, endDate]`. | `REQ-EDRU-005`, `BR-EDRU-002`, `GAP-EDRU-003` |
| **SCN-EDRU-018** | `REQ-EDRU-012` | Audit log record generation upon successful split | DB / Security | Positive | High | Medium | Successful Unassign or Reassign split mutation executed. | `auditLog` entity contains `action: SPLIT_ASSIGNMENT` with correct actor ID, effective date, and segment boundaries. | `REQ-EDRU-012` |
| **SCN-EDRU-019** | `REQ-EDRU-006` | Transaction atomicity during split mutation | DB | Integrity / Negative | Critical | Critical | Simulated failure during future segment creation step of split transaction. | Entire transaction rolls back; original assignment remains unshortened and version unchanged. | `BR-EDRU-005`, `RSK-EDRU-003` |
| **SCN-EDRU-020** | `REQ-EDRU-006` | Dispatch queue integration for unassigned labor requests | Integration | Positive | High | Medium | Unassign split completed successfully. | Created `laborRequest` with `status: OPEN` is discoverable and consumable in dispatch queue. | `REQ-EDRU-006` |
| **SCN-EDRU-021** | `REQ-EDRU-001` | Sequential splits on same assignment record | API / Regression | Edge Case | Medium | High | Assignment is split once, re-read via `GET /assignment` for new `version`, and split a second time. | Second split successfully shortens the shortened segment with updated version. | `REQ-EDRU-011`, `BR-EDRU-006`, `GAP-EDRU-004` |
| **SCN-EDRU-022** | `PERF-API-EDRU-001` | API Latency profiling under baseline load | API Performance | Performance | Medium | Low | Baseline traffic against `GET /assignment`, `POST /split` (Unassign & Reassign), and GET endpoints. | Latencies comply with proposed targets (`GET <= 750ms p95`, `Unassign <= 1000ms p95`, `Reassign <= 1500ms p95`). | `PERF-API-EDRU-001` to `PERF-API-EDRU-006`, `PERF-WL-EDRU-001` |
| **SCN-EDRU-023** | `PERF-API-EDRU-008` | Multi-VU OCC Concurrency Contention under Load | API Performance | Concurrency / Load | High | High | Multiple concurrent VUs attempt `POST /split` against the exact same assignment ID and version. | Exactly one split succeeds with version increment; all other concurrent requests receive `409 Conflict` without data corruption. | `PERF-API-EDRU-008`, `REQ-EDRU-011`, `RSK-EDRU-002`, `PERF-WL-EDRU-005` |
| **SCN-EDRU-024** | `PERF-API-EDRU-007` | API Error rate under Peak scheduling load | API Performance | Performance | Medium | Low | Peak load profile executed against split endpoints via k6. | HTTP error rate `http_req_failed` < 1% (excluding expected OCC 409 responses). | `PERF-API-EDRU-007`, `PERF-WL-EDRU-002` |
| **SCN-EDRU-025** | `PERF-API-EDRU-009` | End-to-end user workflow latency | API Performance | Performance | Medium | Low | Automated journey: GET assignment → read version → POST split → GET resulting state. | Total workflow duration measured and benchmarked. | `PERF-API-EDRU-009` |
| **SCN-EDRU-026** | `PERF-UI-EDRU-001` | UI Drawer & Modal Transition Latency | UI Performance | Performance | Medium | Low | Lighthouse audit triggered on opening Assignment Details Drawer and Unassign/Reassign modals. | Transition and render latencies meet proposed target `p95 <= 2.0 s`. | `PERF-UI-EDRU-001` to `PERF-UI-EDRU-006` |
| **SCN-EDRU-027** | `REQ-EDRU-001` | Gantt timeline UI synchronization post-split | UI / Regression | Regression | Medium | High | Split executed via UI on Gantt chart timeline view. | Both historical segment and future segment/open slot render correctly (or after page reload). | `UI-EDRU-001`, `RSK-EDRU-004` |
| **SCN-EDRU-028** | `REQ-EDRU-001` | UI duplicate submission prevention on split confirm | UI | Validation / State | High | Medium | User rapidly double-clicks Confirm button in split modal. | UI disables button and prevents duplicate API submissions. | `RSK-EDRU-006` |

---

## 2. Information Gaps

1. **GAP-EDRU-001:** `POST /split` response schema and exact HTTP status code (`200 OK` vs `201 Created`) are unconfirmed.
2. **GAP-EDRU-002:** Supporting API endpoint paths and query contracts for GET labor request and conflict check are not specified.
3. **GAP-EDRU-003:** Specific behavior when `splitDate == endDate` requires confirmation.
4. **GAP-EDRU-004:** Multi-step sequential split behavior on already shortened records is undocumented.
5. **GAP-EDRU-005:** Tenant-level configurability of the 7-day lockout threshold is unconfirmed.
6. **GAP-EDRU-006:** Idempotency key format for duplicate prevention on retries is unconfirmed.
7. **GAP-EDRU-007:** Contractual performance thresholds, RPS, and VU concurrency are proposed and require formal sign-off.
