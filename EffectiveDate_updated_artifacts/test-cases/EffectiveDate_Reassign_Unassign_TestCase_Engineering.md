# Test Case Engineering

**Feature:** `feat-effective-date-reassign-unassign`  
**Epic:** `epic-assignments`  
**Source Test Plan:** `complex-spec/qa/test-plan/EffectiveDate_Reassign_Unassign_TestPlan.md`  
**Source QA Analysis:** `complex-spec/QA_specAnalysis.md`  
**Document Version:** 2.0  
**Date:** 2026-09-23  

---

## 1. Summary

| Metric | Count |
| :--- | ----: |
| Total Test Cases | 28 |
| Smoke | 7 |
| Critical | 7 |
| Risk-Based | 3 |
| Standard | 11 |
| UI | 12 |
| API | 6 |
| DB | 2 |
| Integration | 1 |
| Security | 2 |
| Performance | 5 |
| Regression Type/Tag | 3 |

---

## 2. Test Cases

| TC ID | Scenario ID | Requirement | Primary Pack | Layer | Type | Title | Preconditions | Test Data | Steps | Expected Result | Priority | Risk | Traceability |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-EDRU-001** | `SCN-EDRU-001` | `REQ-EDRU-001` | Standard | UI | Functional / Positive | Trigger Effective Date modal on in-progress assignment via Gantt context menu | User logged in as Workforce Manager; in-progress assignment (`startDate < today`) displayed on Gantt timeline. | Target in-progress assignment UUID on active project | 1. Locate assignment bar on Gantt chart.<br>2. Right-click assignment bar to open context menu.<br>3. Click "Unassign" or "Reassign". | Context menu opens; clicking Unassign opens `UnassignConfirmationModal`; clicking Reassign opens `ReassignEffectiveDateModal`. | High | Medium | `REQ-EDRU-001`, `BR-EDRU-001`, `UI-EDRU-001`, `RSK-EDRU-005` |
| **TC-EDRU-002** | `SCN-EDRU-002` | `REQ-EDRU-001` | Smoke | UI | Functional / Positive | Trigger Effective Date modal on in-progress assignment via Assignment Details Drawer | User logged in as Workforce Manager; in-progress assignment (`startDate < today`) exists. | Target in-progress assignment UUID | 1. Click assignment to open slide-out Details Drawer.<br>2. Locate action buttons in Drawer footer.<br>3. Click "Unassign" (or "Reassign"). | Respective modal (`UnassignConfirmationModal` or `ReassignEffectiveDateModal`) displays immediately with date picker. | High | Low | `REQ-EDRU-001`, `BR-EDRU-001`, `UI-EDRU-002` |
| **TC-EDRU-003** | `SCN-EDRU-003` | `REQ-EDRU-001` | Standard | UI | Functional / Positive | Trigger Effective Date modal on in-progress assignment via Worker Assignments List | User logged in as Workforce Manager; worker profile opened on Assignments tab. | In-progress assignment for displayed worker | 1. Navigate to Worker Profile -> Assignments tab.<br>2. Locate in-progress assignment row.<br>3. Click row action menu and select Unassign or Reassign. | Modal launches with date picker initialized. | Medium | Low | `REQ-EDRU-001`, `BR-EDRU-001`, `UI-EDRU-003` |
| **TC-EDRU-004** | `SCN-EDRU-004` | `REQ-EDRU-002` | Smoke | UI | Positive / Regression | Bypass Effective Date flow for future assignment (`startDate >= today`) | Future assignment exists (`startDate >= today`); user logged in as Workforce Manager. | Future assignment UUID | 1. Open future assignment in Details Drawer or list.<br>2. Click Unassign (or Reassign).<br>3. Confirm prompt. | System executes standard full unassign/reassign immediately without displaying Effective Date picker modal. | High | Medium | `REQ-EDRU-002`, `BR-EDRU-001` |
| **TC-EDRU-005** | `SCN-EDRU-005` | `REQ-EDRU-003` | Smoke | UI | Functional / Positive | Default effective date picker selection to `today` for active in-progress assignment | In-progress assignment where `startDate < today <= endDate` exists. | Assignment with `today` within date range | 1. Open Unassign or Reassign modal for assignment.<br>2. Inspect date picker default value.<br>3. Inspect date constraints (`min`, `max`). | Date picker defaults to `today`. Range clamped to `min = startDate` and `max = endDate`. | High | Low | `REQ-EDRU-003`, `REQ-EDRU-005`, `BR-EDRU-002`, `BR-EDRU-003` |
| **TC-EDRU-006** | `SCN-EDRU-006` | `REQ-EDRU-004` | Standard | UI | Boundary / Positive | Default effective date picker selection to `startDate` for expired assignment | In-progress assignment where `today > endDate` exists. | Expired assignment UUID | 1. Open Unassign or Reassign modal for expired assignment.<br>2. Inspect default date in picker. | Date picker defaults to `assignment.startDate`. Range restricted to `[startDate, endDate]`. | Medium | Low | `REQ-EDRU-004`, `REQ-EDRU-005`, `BR-EDRU-002`, `BR-EDRU-003` |
| **TC-EDRU-007** | `SCN-EDRU-007` | `REQ-EDRU-006` | Smoke | UI | Functional / Positive | Execute Unassign split on in-progress assignment via UI | In-progress assignment exists; user in `UnassignConfirmationModal`. | Valid `effectiveDate` where `startDate < effectiveDate <= endDate` | 1. Select valid `effectiveDate`.<br>2. Verify preview badges.<br>3. Click "Confirm Unassign". | Badges display `[startDate, effectiveDate - 1]` (preserved) and `[effectiveDate, endDate]` (unassigned). Modal closes, toast confirms success, original assignment shortens, labor request created. | High | Critical | `REQ-EDRU-006`, `BR-EDRU-005`, `BR-EDRU-006`, `RSK-EDRU-001` |
| **TC-EDRU-008** | `SCN-EDRU-008` | `REQ-EDRU-007` | Smoke | UI | Functional / Positive | Execute Reassign split with non-conflicting replacement worker via UI | In-progress assignment exists; available replacement worker with no conflicts. | Valid `effectiveDate`, available `targetWorkerId` | 1. Select `effectiveDate` in `ReassignEffectiveDateModal` and click Continue.<br>2. In `FillOpenRequestDrawer`, select non-conflicting worker.<br>3. Click "Confirm Reassign". | Reassign completes; original assignment shortens to `effectiveDate - 1`, new assignment created for replacement worker spanning `[effectiveDate, endDate]`. | High | Critical | `REQ-EDRU-007`, `BR-EDRU-005`, `BR-EDRU-006`, `RSK-EDRU-001` |
| **TC-EDRU-009** | `SCN-EDRU-009` | `REQ-EDRU-008` | Critical | UI | Boundary / Positive | Acknowledge start-date equality warning when `effectiveDate == startDate` | In-progress assignment open in split modal. | `effectiveDate == assignment.startDate` | 1. Select `effectiveDate` equal to `assignment.startDate`.<br>2. Click Confirm.<br>3. Inspect warning dialog.<br>4. Click Acknowledge & Confirm. | Warning modal indicates 0 historical days will be preserved. Confirming executes full unassign/reassign from day one without creating historical record. | High | Critical | `REQ-EDRU-008`, `BR-EDRU-004`, `RSK-EDRU-001` |
| **TC-EDRU-010** | `SCN-EDRU-010` | `REQ-EDRU-009` | Critical | UI | Negative / Positive | Reassign replacement worker with scheduling conflict and confirm override | In-progress assignment; target replacement worker has overlapping assignment. | Replacement worker with overlap, `overrideConflict: true` | 1. In `FillOpenRequestDrawer`, select overlapping worker.<br>2. Click Confirm.<br>3. Inspect conflict modal.<br>4. Confirm override checkbox and submit. | Conflict dialog details overlapping project/dates. Confirming sends `overrideConflict: true`, successfully executing split. | High | Medium | `REQ-EDRU-009`, `BR-EDRU-007`, `VAL-EDRU-003` |
| **TC-EDRU-011** | `SCN-EDRU-011` | `REQ-EDRU-009` | Standard | API | Negative | Reassign replacement worker with scheduling conflict without override confirmation | In-progress assignment; target worker has overlapping assignment. | Payload: `overrideConflict: false` (or omitted) with conflicting worker | 1. Send `POST /api/workforce/scheduling/assignments/:id/split` with conflicting `targetWorkerId` and `overrideConflict: false`. | Request is rejected with conflict validation error; no database records are modified. | Medium | Low | `REQ-EDRU-009`, `BR-EDRU-007`, `VAL-EDRU-003` |
| **TC-EDRU-012** | `SCN-EDRU-012` | `REQ-EDRU-010` | Critical | Security | Security / Negative | Non-Admin user attempts split with `splitDate < today - 7 days` | In-progress assignment; user authenticated as standard Workforce Manager. | `splitDate < today - 7 days` | 1. Standard user sends `POST .../split` with `splitDate < today - 7 days`. | Request rejected with historic lockout authorization error; split is blocked. | High | Medium | `REQ-EDRU-010`, `BR-EDRU-008`, `VAL-EDRU-002` |
| **TC-EDRU-013** | `SCN-EDRU-013` | `REQ-EDRU-010` | Critical | Security | Security / Positive | System Admin executes historic lockout override split | In-progress assignment; user authenticated as System Administrator. | `splitDate < today - 7 days`, `overrideHistoricLockout: true` | 1. Admin sends `POST .../split` with `splitDate < today - 7 days` and `overrideHistoricLockout: true`. | Request succeeds; original record shortened to `splitDate - 1 day` and future segment created. | High | Low | `REQ-EDRU-010`, `BR-EDRU-008`, `VAL-EDRU-002` |
| **TC-EDRU-014** | `SCN-EDRU-014` | `REQ-EDRU-006` | Smoke | API | Functional / Positive | API split mutation for Unassign with valid payload | Assignment exists; valid OCC `version` obtained via `GET /assignment/:id`. | Payload: `splitMode: "date"`, valid `splitDate`, current `version`, `targetWorkerId: null` | 1. Send `POST /api/workforce/scheduling/assignments/:id/split` with valid Unassign payload. | Success response; original assignment `endDate` updated to `splitDate - 1`, `version` incremented by 1, and new `laborRequest` created in `OPEN` status covering `[splitDate, originalEndDate]`. | High | High | `REQ-EDRU-006`, `BR-EDRU-005`, `BR-EDRU-006` |
| **TC-EDRU-015** | `SCN-EDRU-015` | `REQ-EDRU-007` | Smoke | API | Functional / Positive | API split mutation for Reassign with valid replacement worker | Assignment exists; valid version; available non-conflicting replacement worker. | Payload: `splitMode: "date"`, `splitDate`, `version`, valid `targetWorkerId` | 1. Send `POST /api/workforce/scheduling/assignments/:id/split` with Reassign payload. | Success response; original assignment shortened, `version` incremented by 1, new assignment created for `targetWorkerId` covering `[splitDate, originalEndDate]`. | High | High | `REQ-EDRU-007`, `BR-EDRU-005`, `BR-EDRU-006` |
| **TC-EDRU-016** | `SCN-EDRU-016` | `REQ-EDRU-011` | Critical | API | Concurrency / Negative | OCC Version mismatch on split mutation returns 409 Conflict | Assignment exists with version `V`. | Payload with stale version `V - 1` or mismatched version | 1. Send `POST .../split` with stale `version` value. | System returns HTTP `409 Conflict`; no records mutated. | High | High | `REQ-EDRU-011`, `BR-EDRU-006`, `VAL-EDRU-001`, `RSK-EDRU-002` |
| **TC-EDRU-017** | `SCN-EDRU-017` | `REQ-EDRU-005` | Standard | API | Boundary | End-date split boundary where `splitDate == endDate` | In-progress assignment exists. | Payload with `splitDate == assignment.endDate` | 1. Send `POST .../split` with `splitDate == assignment.endDate`. | Original assignment shortened to `endDate - 1 day`; 1-day future record created for `[endDate, endDate]`. | Medium | Low | `REQ-EDRU-005`, `BR-EDRU-002`, `GAP-EDRU-003` |
| **TC-EDRU-018** | `SCN-EDRU-018` | `REQ-EDRU-012` | Standard | DB | Positive / Security | Audit log record generation upon successful split (`SPLIT_ASSIGNMENT`) | Successful Unassign or Reassign split executed. | Resulting audit log record | 1. Query database `auditLog` entity for assignment ID post-split. | Audit entry exists with `action: SPLIT_ASSIGNMENT`, matching `actor`, `effectiveDate`, and JSON `segmentBoundaries`. | High | Medium | `REQ-EDRU-012` |
| **TC-EDRU-019** | `SCN-EDRU-019` | `REQ-EDRU-006` | Critical | DB | Integrity / Negative | Transaction atomicity during split mutation failure | In-progress assignment; mock failure injected during future segment creation. | Injected DB exception on second write step | 1. Trigger split mutation.<br>2. Force failure during `laborRequest` creation.<br>3. Inspect DB. | Entire transaction rolls back; original assignment remains at original `endDate` with unincremented `version`; zero orphan records. | Critical | Critical | `BR-EDRU-005`, `RSK-EDRU-003` |
| **TC-EDRU-020** | `SCN-EDRU-020` | `REQ-EDRU-006` | Standard | Integration | Positive | Dispatch queue integration for unassigned labor requests | Unassign split completed successfully. | Labor request ID generated by split | 1. Query dispatch queue service for project.<br>2. Assert presence and status of generated labor request. | New `laborRequest` appears in dispatch queue with status `OPEN` and dates `[splitDate, originalEndDate]`. | High | Medium | `REQ-EDRU-006` |
| **TC-EDRU-021** | `SCN-EDRU-021` | `REQ-EDRU-011` | Risk-Based | API | Regression / Edge | Sequential splits on same assignment record | In-progress assignment already split once. | Fresh version fetched via `GET /assignment/:id`, second `splitDate < firstSplitDate` | 1. Split assignment at date D1.<br>2. Perform `GET` to obtain incremented version `V+1`.<br>3. Submit second split at date D2.<br>4. Verify outcomes. | Second split successfully updates assignment `endDate` to `D2 - 1` and increments version to `V+2`. | Medium | High | `REQ-EDRU-011`, `BR-EDRU-006`, `GAP-EDRU-004`, `RSK-EDRU-002` |
| **TC-EDRU-022** | `SCN-EDRU-022` | `PERF-API-EDRU-001` | Standard | Performance | Performance | Benchmark GET and POST latency distribution under baseline load | k6 performance test environment configured. | Baseline load profile calling GET assignment and POST split | 1. Run baseline k6 script for defined iterations.<br>2. Capture p50, p95, p99 latency metrics. | `GET <= 750ms p95`, `Unassign <= 1000ms p95`, `Reassign <= 1500ms p95` against proposed targets. | Medium | Low | `PERF-API-EDRU-001` to `006`, `PERF-WL-EDRU-001`, `GAP-EDRU-007` |
| **TC-EDRU-023** | `SCN-EDRU-023` | `PERF-API-EDRU-008` | Critical | Performance | Concurrency / Load | Multi-VU OCC Concurrency Contention under Load | Shared assignment records seeded; k6 configured for multi-VU concurrent mutation. | 5-10 concurrent VUs targeting identical `assignmentId` and `version` | 1. VUs simultaneously execute `POST .../split` targeting identical version.<br>2. Measure responses. | Exactly 1 request succeeds (+1 version); all competing requests return `409 Conflict` cleanly; no deadlocks or duplicate records. | High | High | `PERF-API-EDRU-008`, `REQ-EDRU-011`, `RSK-EDRU-002`, `PERF-WL-EDRU-005` |
| **TC-EDRU-024** | `SCN-EDRU-024` | `PERF-API-EDRU-007` | Standard | Performance | Performance | API Error rate under Peak scheduling load | Test environment scaled for peak profile. | Peak workload k6 script | 1. Execute peak scheduling load test.<br>2. Monitor error rate metric `http_req_failed`. | HTTP error rate < 1% (excluding expected OCC 409 conflict responses). | Medium | Low | `PERF-API-EDRU-007`, `PERF-WL-EDRU-002`, `GAP-EDRU-007` |
| **TC-EDRU-025** | `SCN-EDRU-025` | `PERF-API-EDRU-009` | Standard | Performance | Performance | End-to-end user workflow journey latency profiling | Performance test environment with seeded records. | k6 user journey scenario: GET -> POST split -> GET state | 1. Execute end-to-end workflow iterations.<br>2. Measure total journey execution duration. | Total workflow journey latency benchmarked; no progressive memory or connection pool leakage. | Medium | Low | `PERF-API-EDRU-009` |
| **TC-EDRU-026** | `SCN-EDRU-026` | `PERF-UI-EDRU-001` | Standard | Performance | Performance | UI Drawer & Modal Transition Latency | Test browser session logged in as Workforce Manager. | Web application with active assignment | 1. Measure opening time of Details Drawer and split modals via browser performance API / Lighthouse. | Transition and render latencies comply with proposed `p95 <= 2.0 s` target. | Medium | Low | `PERF-UI-EDRU-001` to `006` |
| **TC-EDRU-027** | `SCN-EDRU-027` | `REQ-EDRU-001` | Risk-Based | UI | Regression | Gantt timeline UI synchronization post-split | UI session displaying Gantt timeline; assignment split executed. | Post-split Gantt view | 1. Execute split via UI.<br>2. Inspect Gantt timeline visualization.<br>3. Refresh page if required. | Gantt timeline correctly reflects shortened original segment and future open slot/new assignment without timeline corruption. | Medium | High | `UI-EDRU-001`, `RSK-EDRU-004` |
| **TC-EDRU-028** | `SCN-EDRU-028` | `REQ-EDRU-001` | Risk-Based | UI | Validation / State | UI duplicate submission prevention on split confirm | In-progress assignment in split modal. | Split modal confirm action | 1. Rapidly double-click "Confirm" button in split modal.<br>2. Monitor network requests in browser devtools. | Button disables immediately upon first click; exactly 1 network request is dispatched; duplicate mutations prevented. | High | Medium | `REQ-EDRU-001`, `RSK-EDRU-006` |

---

## 3. Pack Summary

| Primary Pack | Count |
| :--- | ----: |
| Smoke | 7 |
| Critical | 7 |
| Risk-Based | 3 |
| Standard | 11 |
| **Total Unique Test Cases** | **28** |

---

## 4. Review Summary

| Status | Count |
| :--- | ----: |
| APPROVED | 24 |
| CHANGES_REQUIRED | 4 |
| Total | 28 |

---

## 5. Review Findings

| TC ID | Severity | Category | Issue | Source Reference | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-EDRU-017** | Medium | EXPECTED_RESULT | End-date split boundary (`splitDate == endDate`) behavior is not explicitly defined in specification. | `GAP-EDRU-003`, Spec §2 | Confirm whether a 1-day future segment is created or if end-date splits should be rejected/handled uniquely. |
| **TC-EDRU-021** | High | ASSUMPTION | Behavior and constraints for sequential multiple splits on the same assignment are undocumented. | `GAP-EDRU-004`, Spec §2 | Obtain confirmation on maximum split limits and business rules for sequential splits. |
| **TC-EDRU-022** | Medium | PERFORMANCE | Performance latency targets (p50/p95/p99) are proposed baselines requiring product/API owner confirmation. | `GAP-EDRU-007`, Spec §6.4, §8.1 | Treat proposed targets as informational benchmarks rather than hard release blockers until confirmed. |
| **TC-EDRU-024** | Medium | PERFORMANCE | Peak workload RPS and acceptable error budget are proposed and unconfirmed. | `GAP-EDRU-007`, Spec §6.6, §8.1 | Validate peak workload parameters with operations team before load testing. |

---

## 6. Automation Feasibility

| TC ID | Layer | Automation | Framework | Priority | Complexity | Reason | Blocker/Risk |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- | :--- |
| **TC-EDRU-001** | UI | **PARTIAL** | Playwright | High | High | Synthetic right-click on Gantt chart timeline canvas can be flaky. | Use Drawer (`TC-EDRU-002`) as primary CI validation; test Gantt context menu with custom mouse dispatcher. |
| **TC-EDRU-002** | UI | **YES** | Playwright | High | Low | Drawer action buttons are stable DOM elements with standard click events. | None. |
| **TC-EDRU-003** | UI | **YES** | Playwright | Medium | Low | Worker Assignments table rows and action menus are standard HTML elements. | None. |
| **TC-EDRU-004** | UI | **YES** | Playwright | High | Low | Future assignment bypass is fully determinable via UI assertions. | None. |
| **TC-EDRU-005** | UI | **YES** | Playwright | High | Low | Date picker attributes and value are directly readable via Playwright. | None. |
| **TC-EDRU-006** | UI | **YES** | Playwright | Medium | Low | Expired assignment picker assertions are standard DOM validations. | Requires pre-seeded expired assignment in test DB. |
| **TC-EDRU-007** | UI | **YES** | Playwright | High | Medium | Unassign modal interactions, badge assertions, and submit triggers are straightforward. | Requires pre-seeded in-progress assignment. |
| **TC-EDRU-008** | UI | **YES** | Playwright | High | Medium | Multi-step modal and candidate drawer workflow is automatable via Playwright. | Requires pre-seeded non-conflicting replacement worker. |
| **TC-EDRU-009** | UI | **YES** | Playwright | High | Low | Start-date equality warning dialog and acknowledgement are standard DOM elements. | None. |
| **TC-EDRU-010** | UI | **YES** | Playwright | High | Medium | Conflict modal prompt and override checkbox submission are easily automated. | Requires pre-seeded conflicting replacement worker. |
| **TC-EDRU-011** | API | **YES** | pytest + httpx | Medium | Low | API POST with `overrideConflict: false` is completely deterministic. | None. |
| **TC-EDRU-012** | Security | **YES** | pytest + httpx | High | Low | HTTP authorization check with standard role credentials is easily verified. | Requires Workforce Manager test credentials. |
| **TC-EDRU-013** | Security | **YES** | pytest + httpx | High | Low | Admin split override with `overrideHistoricLockout: true` is standard API test. | Requires System Admin test credentials. |
| **TC-EDRU-014** | API | **YES** | pytest + httpx | High | Low | REST API call with JSON payload and HTTP response code assertions. | Requires fresh version read before POST. |
| **TC-EDRU-015** | API | **YES** | pytest + httpx | High | Low | REST API call with replacement worker payload. | Requires fresh version read and valid worker UUID. |
| **TC-EDRU-016** | API | **YES** | pytest + httpx | High | Low | Concurrency test submitting intentionally stale OCC version to assert 409 Conflict. | None. |
| **TC-EDRU-017** | API | **YES** | pytest + httpx | Medium | Low | API boundary test submitting `splitDate == endDate`. | Blocked on GAP-EDRU-003 clarification. |
| **TC-EDRU-018** | DB | **YES** | pytest (DB query) | High | Medium | Querying database `auditLog` table or audit API directly. | Requires DB connection string / read access. |
| **TC-EDRU-019** | DB | **PARTIAL** | pytest + backend mock | Critical | High | Simulating backend failure midway through atomic split transaction requires fault injection or mock hook. | Requires backend test harness fault-injection support. |
| **TC-EDRU-020** | Integration | **YES** | pytest + httpx | High | Low | Querying dispatch queue API to assert presence of generated open labor request. | Depends on dispatch queue service availability. |
| **TC-EDRU-021** | API | **PARTIAL** | pytest + httpx | Medium | Medium | Automated sequential split workflow: GET -> POST -> GET -> POST. | Requires confirmation on GAP-EDRU-004. |
| **TC-EDRU-022** | Performance | **YES** | k6 HTTP | Medium | Medium | Parameterized k6 script collecting latency distribution across split endpoints. | Proposed thresholds require sign-off (GAP-EDRU-007). |
| **TC-EDRU-023** | Performance | **YES** | k6 HTTP | High | High | Dedicated multi-VU k6 script targeting shared assignment record to assert 1 success + N 409s. | Seeded records must be reset between test runs. |
| **TC-EDRU-024** | Performance | **YES** | k6 HTTP | Medium | Medium | Ramp-up peak load k6 script measuring `http_req_failed`. | Proposed thresholds require sign-off (GAP-EDRU-007). |
| **TC-EDRU-025** | Performance | **YES** | k6 HTTP | Medium | Medium | k6 script iterating full journey: GET -> POST -> GET. | None. |
| **TC-EDRU-026** | Performance | **YES** | Lighthouse / k6/browser | Medium | Medium | Automated browser navigation and transition measurement. | Proposed 2.0s target requires sign-off. |
| **TC-EDRU-027** | UI | **YES** | Playwright | Medium | Medium | UI split followed by Gantt canvas visual or DOM assertion (with page reload). | None. |
| **TC-EDRU-028** | UI | **YES** | Playwright | High | Low | Rapid double-click on Confirm button while listening for network request events. | None. |

---

## 7. Automation Summary

| Decision | Count |
| :--- | ----: |
| YES | 25 |
| NO | 0 |
| PARTIAL | 3 |
| Total | 28 |

---

## 8. Execution Readiness

| Status | Count |
| :--- | ----: |
| READY | 24 |
| NOT_READY | 4 |
| Total | 28 |

---

## 9. Information Gaps

| Gap ID | TC / Scenario | Area | Missing Information | Impact | Required Clarification |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GAP-EDRU-001** | `TC-EDRU-014`, `015` | API Contract | Exact response JSON schema and HTTP status code (`200 OK` vs `201 Created`). | Assertions on response body cannot be finalized. | Confirm API success response payload schema. |
| **GAP-EDRU-002** | `TC-EDRU-020` | Supporting APIs | Exact endpoint path and query parameters for dispatch queue labor request retrieval. | Query in automated test must rely on assumed endpoint path. | Confirm dispatch queue endpoint specifications. |
| **GAP-EDRU-003** | `TC-EDRU-017` | Boundary | System behavior when `splitDate == assignment.endDate`. | Expected result is unconfirmed for single-day future remainder. | Confirm whether 1-day future remainder is permitted or rejected. |
| **GAP-EDRU-004** | `TC-EDRU-021` | Regression / Edge | Maximum permitted splits and behavior on sequential splits on same assignment. | Test case cannot assert business rule constraints. | Confirm sequential split rules. |
| **GAP-EDRU-005** | `TC-EDRU-012`, `013` | Multi-Tenancy | Whether 7-day historic lockout is global or configurable per tenant. | Tenant boundary tests cannot be finalized. | Confirm tenant-level configurability. |
| **GAP-EDRU-006** | `TC-EDRU-028` | API Architecture | Support for idempotency keys on `POST /split`. | Retry test cases cannot assert backend duplicate rejection. | Confirm idempotency key header specification. |
| **GAP-EDRU-007** | `TC-EDRU-022..026` | Performance | Formal contractual SLOs for latency, peak RPS, and error budget. | Performance thresholds are provisional benchmarks. | Formalize performance SLOs with product owners. |

---

## 10. Coverage Gaps

| Gap ID | Requirement | Scenario | Missing Coverage | Impact | Action |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **COV-GAP-001** | `REQ-EDRU-005` | `SCN-EDRU-017` | Backend validation for out-of-bounds split dates (`splitDate < startDate` or `splitDate > endDate`) without UI guard | API may permit invalid split dates if called directly. | Extend API negative test suite with out-of-range payload tests. |
| **COV-GAP-002** | `REQ-EDRU-012` | `SCN-EDRU-018` | Audit log schema and retention verification | DB schema details not fully specified. | Add direct DB table inspection once DB schema is confirmed. |

---

## 11. Duplicate Findings

| Duplicate Group | TC ID(s) | Reason | Recommended Action |
| :--- | :--- | :--- | :--- |
| *None* | All TC IDs unique | Each test case addresses a distinct entry surface, layer, boundary condition, or workload profile. | Maintain all 28 distinct test cases. |

---

## 12. Recommended Automation Set

| TC ID | Layer | Primary Pack | Title | Framework |
| :--- | :--- | :--- | :--- | :--- |
| **TC-EDRU-002** | UI | Smoke | Trigger Effective Date modal on in-progress assignment via Assignment Details Drawer | Playwright |
| **TC-EDRU-003** | UI | Standard | Trigger Effective Date modal on in-progress assignment via Worker Assignments List | Playwright |
| **TC-EDRU-004** | UI | Smoke | Bypass Effective Date flow for future assignment (`startDate >= today`) | Playwright |
| **TC-EDRU-005** | UI | Smoke | Default effective date picker selection to `today` for active in-progress assignment | Playwright |
| **TC-EDRU-006** | UI | Standard | Default effective date picker selection to `startDate` for expired assignment | Playwright |
| **TC-EDRU-007** | UI | Smoke | Execute Unassign split on in-progress assignment via UI | Playwright |
| **TC-EDRU-008** | UI | Smoke | Execute Reassign split with non-conflicting replacement worker via UI | Playwright |
| **TC-EDRU-009** | UI | Critical | Acknowledge start-date equality warning when `effectiveDate == startDate` | Playwright |
| **TC-EDRU-010** | UI | Critical | Reassign replacement worker with scheduling conflict and confirm override | Playwright |
| **TC-EDRU-011** | API | Standard | Reassign replacement worker with scheduling conflict without override confirmation | pytest + httpx |
| **TC-EDRU-012** | Security | Critical | Non-Admin user attempts split with `splitDate < today - 7 days` | pytest + httpx |
| **TC-EDRU-013** | Security | Critical | System Admin executes historic lockout override split | pytest + httpx |
| **TC-EDRU-014** | API | Smoke | API split mutation for Unassign with valid payload | pytest + httpx |
| **TC-EDRU-015** | API | Smoke | API split mutation for Reassign with valid replacement worker | pytest + httpx |
| **TC-EDRU-016** | API | Critical | OCC Version mismatch on split mutation returns 409 Conflict | pytest + httpx |
| **TC-EDRU-017** | API | Standard | End-date split boundary where `splitDate == endDate` | pytest + httpx |
| **TC-EDRU-018** | DB | Standard | Audit log record generation upon successful split (`SPLIT_ASSIGNMENT`) | pytest (DB query) |
| **TC-EDRU-020** | Integration | Standard | Dispatch queue integration for unassigned labor requests | pytest + httpx |
| **TC-EDRU-022** | Performance | Standard | Benchmark GET and POST latency distribution under baseline load | k6 HTTP |
| **TC-EDRU-023** | Performance | Critical | Multi-VU OCC Concurrency Contention under Load | k6 HTTP |
| **TC-EDRU-024** | Performance | Standard | API Error rate under Peak scheduling load | k6 HTTP |
| **TC-EDRU-025** | Performance | Standard | End-to-end user workflow journey latency profiling | k6 HTTP |
| **TC-EDRU-026** | Performance | Standard | UI Drawer & Modal Transition Latency | Lighthouse / k6/browser |
| **TC-EDRU-027** | UI | Risk-Based | Gantt timeline UI synchronization post-split | Playwright |
| **TC-EDRU-028** | UI | Risk-Based | UI duplicate submission prevention on split confirm | Playwright |
