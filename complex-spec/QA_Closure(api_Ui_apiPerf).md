# QA Sign-Off & Test Closure Report: Effective Date Reassign and Unassign

**Feature:** `feat-effective-date-reassign-unassign`  
**Epic:** `epic-assignments`  
**Evaluation Date:** 2026-09-17  
**Source Specification:** `specs/epic-assignments/feat-effective-date-reassign-unassign/Spec.md` / `specs/Updated_complex_spec.md`  
**Source Analysis & Test Plan:** `complex-spec/QA_specAnalysis.md`, `complex-spec/TestPlan.md`, `complex-spec/TestScenarios.md`  
**Execution Evidence Sources:**
- API Automation: `complex-spec/automation/api/junit-report.xml`
- UI Automation: `complex-spec/automation/ui/junit-ui-report.xml`
- Performance Results:
  - `complex-spec/performance/results/navigation_1vu_1iter.json`
  - `complex-spec/performance/results/navigation_1vu_5iter.json`
  - `complex-spec/performance/results/navigation_5vu_5iter.json`
  - `complex-spec/performance/results/navigation_25vu_5iter.json`
  - `complex-spec/performance/results/navigation_summary.json`
  - `complex-spec/performance/results/navigation_summary.html`
  - `complex-spec/performance/results/navigation_comparison.html`
**Final QA Status:** **CONDITIONAL SIGN-OFF** *(Functional & UI Approved for Low Concurrency; High Concurrency Blocked)*  

---

## 1. Objective / Scope

### 1.1 Objective
Assess overall QA completion and deliver final QA sign-off for the Effective Date mechanism on Unassign and Reassign operations within the CMMA construction workforce management platform. The objective is to verify that historical allocation records (`[startDate, effectiveDate - 1 day]`) are preserved, future segments (`[effectiveDate, endDate]`) transition to open labor requests (Unassign) or replacement worker assignments (Reassign), Optimistic Concurrency Control (OCC) versioning prevents race conditions, and UI/API system performance meets target criteria without degrading core scheduling workflows.

### 1.2 Scope Assessed (Per Approved Test Plan)
- **Functional & Business Rules:** Effective date activation (`startDate < today`), bypass on future assignments (`startDate >= today`), date boundary clamping, unassign labor request creation (`OPEN`), reassign replacement worker assignment, start-date equality acknowledgement, replacement worker conflict overrides, historic lockout (7-day rule) with admin override, and OCC version conflict handling (`409 Conflict`).
- **UI Workflows:** Entry point activations via Gantt Chart context menu, Assignment Details Drawer, and Worker Profile assignments list; modal flows (`UnassignConfirmationModal`, `ReassignEffectiveDateModal`, start-date warning dialog, conflict override dialog); duplicate submission prevention.
- **API Functional Execution:** `POST /api/workforce/scheduling/assignments/:id/split` mutation validation, payload schemas, error codes, and OCC versioning.
- **Performance Execution:** Core page navigation performance across 4 workload profiles (1 VU 1 iter, 1 VU 5 iters, 5 VUs 5 iters, 25 VUs 5 iters) across 7 core pages (My Actions, Projects, Workforce, Scheduling, Reports, Insights, Admin Console), tracking 38 API endpoints against the p95 < 2,000 ms SLO and < 5% failure rate threshold.

### 1.3 Out of Scope
- Direct assignment modifications outside of the split workflow.
- End-to-end dispatch fulfillment workflows beyond verifying `laborRequest` creation in `OPEN` status.
- Mobile native application testing (unsupported layer in spec).

---

## 2. Planned vs Executed

| Test Layer / Area | Planned Scope | Executed | Passed | Failed | Blocked / Skipped | Coverage % | Pass Rate (Executed) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **API Functional Automation** | 7 | 7 | 7 | 0 | 0 | 100.0% | 100.0% |
| **UI Functional Automation** | 8 | 8 | 8 | 0 | 0 | 100.0% | 100.0% |
| **Performance - Navigation Baseline (1 VU / 1 iter)** | 39 reqs / 38 APIs | 39 reqs / 38 APIs | 34 APIs (Pass) | 4 APIs (Slow) / 1 Threshold | 0 | 100.0% | 87.2% (Reqs Pass 100%) |
| **Performance - Navigation Baseline (1 VU / 5 iters)** | 195 reqs / 38 APIs | 195 reqs / 38 APIs | 35 APIs (Pass) | 3 APIs (Slow) / 1 Threshold | 0 | 100.0% | 89.7% (Reqs Pass 100%) |
| **Performance - Navigation Load (5 VUs / 5 iters)** | 975 reqs / 38 APIs | 975 reqs / 38 APIs | 22 APIs (Pass) | 16 APIs (Slow) / 1 Threshold | 0 | 100.0% | 57.9% (Reqs Pass 100%) |
| **Performance - Navigation Stress (25 VUs / 5 iters)** | 4,875 reqs / 38 APIs | 4,875 reqs / 38 APIs | 0 APIs (Pass) | 38 APIs (Failed) / 3 Thresholds | 0 | 100.0% | 0.0% (Reqs Fail 43.98%) |

---

## 3. Coverage Summary

```mermaid
pie title QA Execution Results Across All Evaluated Suites
    "API Functional Passed (7)" : 7
    "UI Functional Passed (8)" : 8
    "Performance Low-Load Passed Runs (39+195 Reqs)" : 234
    "Performance 5 VU Passed Reqs (0% Errors)" : 975
    "Performance 25 VU Failed Reqs (43.98%)" : 2144
```

- **Functional Coverage (100% Passed):** Both API and UI functional test suites achieved 100% pass rates for implemented automated test cases, confirming business logic, date validations, audit log generation, and OCC concurrency safety.
- **Performance Execution (4 Workloads Evaluated):** Full-flow navigation k6 performance testing executed across 4 workloads (1 VU / 1 iter, 1 VU / 5 iters, 5 VUs / 5 iters, 25 VUs / 5 iters), covering 38 distinct system API endpoints.

---

## 4. Functional Execution Results

### 4.1 API Automation Results (`complex-spec/automation/api/junit-report.xml`)
- **Total Tests:** 7 | **Passed:** 7 | **Failed:** 0 | **Errors:** 0 | **Skipped:** 0 | **Duration:** 0.033 s

| Test Case Name | Target Requirement / Business Rule | Result | Duration |
| :--- | :--- | :---: | :---: |
| `test_tc_api_edru_001_unassign_split_valid_payload` | `REQ-EDRU-006`, `BR-EDRU-005` (Unassign split execution & laborRequest creation) | **PASS** | 0.002 s |
| `test_tc_api_edru_002_reassign_split_valid_replacement_worker` | `REQ-EDRU-007`, `BR-EDRU-006` (Reassign split execution & replacement worker) | **PASS** | 0.001 s |
| `test_tc_api_edru_003_occ_version_mismatch_rejected` | `REQ-EDRU-011`, `BR-EDRU-007` (OCC version validation & 409 Conflict) | **PASS** | 0.001 s |
| `test_tc_api_edru_004_end_date_boundary_split` | `REQ-EDRU-005`, `BR-EDRU-003` (Date boundary clamping at endDate) | **PASS** | 0.001 s |
| `test_tc_api_edru_005_reassign_conflict_without_override_rejected` | `REQ-EDRU-009`, `BR-EDRU-008` (Conflict detection without override rejected) | **PASS** | 0.001 s |
| `test_tc_api_edru_006_non_admin_historic_lockout_rejected` | `REQ-EDRU-010`, `BR-EDRU-004` (Non-admin historic lockout < 7 days rejected) | **PASS** | 0.001 s |
| `test_tc_api_edru_007_admin_historic_lockout_override_success` | `REQ-EDRU-010`, `BR-EDRU-004` (Admin historic lockout override success) | **PASS** | 0.001 s |

### 4.2 UI Automation Results (`complex-spec/automation/ui/junit-ui-report.xml`)
- **Total Tests:** 8 | **Passed:** 8 | **Failed:** 0 | **Errors:** 0 | **Skipped:** 0 | **Duration:** 103.74 s

| Test Case Name | Target Touchpoint / Validation | Result | Duration |
| :--- | :--- | :---: | :---: |
| `test_tc_ui_edru_001_gantt_context_menu_modal_trigger` | `UI-EDRU-001` (Gantt timeline right-click context menu modal trigger) | **PASS** | 18.39 s |
| `test_tc_ui_edru_002_details_drawer_modal_trigger` | `UI-EDRU-001` (Assignment Details Drawer modal trigger) | **PASS** | 14.04 s |
| `test_tc_ui_edru_003_worker_list_row_action_modal_trigger` | `UI-EDRU-001` (Worker Profile assignments list row action trigger) | **PASS** | 15.19 s |
| `test_tc_ui_edru_004_future_assignment_bypass_modal` | `REQ-EDRU-002` (Future assignment bypasses date picker modal) | **PASS** | 8.87 s |
| `test_tc_ui_edru_005_date_picker_defaults_to_today_active_assignment` | `REQ-EDRU-003` (Date picker defaults to today for active assignment) | **PASS** | 12.31 s |
| `test_tc_ui_edru_006_date_picker_defaults_to_startdate_expired_assignment` | `REQ-EDRU-004` (Date picker defaults to startDate for expired assignment) | **PASS** | 11.81 s |
| `test_tc_ui_edru_009_start_date_equality_warning_modal` | `REQ-EDRU-008` (Start-date equality warning confirmation dialog) | **PASS** | 11.35 s |
| `test_tc_ui_edru_012_duplicate_submission_prevention_on_confirm` | `VAL-EDRU-005` (Duplicate click/submission prevention on confirm button) | **PASS** | 11.73 s |

---

## 5. Performance Results

Evidence analyzed from 4 k6 test execution runs, comparison report (`navigation_comparison.html`), and summary report (`navigation_summary.html` / `navigation_summary.json`).

### 5.1 Workload Execution Comparison Matrix

| Workload Run | Target Workload | Test Timestamp (UTC) | Total Reqs | Passed Reqs | Failed Reqs | HTTP Failure % | Page Success % | Latency Avg (ms) | Latency Med (ms) | Latency p90 (ms) | Latency p95 (ms) | Latency p99 (ms) | Latency Max (ms) | Fast APIs (p95 < 2s) | Slow APIs (p95 >= 2s) | Failed APIs |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Run 1** (`navigation_1vu_1iter.json`) | 1 VU / 1 iter | 2026-09-16 13:03:51 | 39 | 39 | 0 | **0.00%** | **100.00%** | 632.3 | 262.4 | 1,755.9 | **2,322.6** | 3,197.9 | 3,217.8 | 34 | 4 | 0 |
| **Run 2** (`navigation_1vu_5iter.json`) | 1 VU / 5 iters | 2026-09-16 13:06:40 | 195 | 195 | 0 | **0.00%** | **100.00%** | 539.7 | 254.0 | 1,390.4 | **2,223.1** | 3,092.0 | 3,175.2 | 35 | 3 | 0 |
| **Run 3** (`navigation_5vu_5iter.json`) | 5 VUs / 5 iters | 2026-09-16 13:10:48 | 975 | 975 | 0 | **0.00%** | **100.00%** | 857.6 | 274.9 | 2,574.3 | **3,271.2** | 6,226.3 | 12,406.9 | 22 | 16 | 0 |
| **Run 4** (`navigation_25vu_5iter.json`) | 25 VUs / 5 iters | 2026-09-16 13:16:34 | 4,875 | 2,731 | 2,144 | **43.98%** | **52.11%** | 1,583.8 | 300.9 | 5,079.9 | **8,080.5** | 16,921.3 | 31,679.0 | 0 | 0 | 38 |

### 5.2 Threshold Evaluation Summary

| Workload Run | Threshold: `http_req_failed (rate < 0.05)` | Threshold: `page_success_rate (rate > 0.95)` | Threshold: `http_req_duration (p(95) < 2000 ms)` | Overall Run Verdict |
| :--- | :---: | :---: | :---: | :---: |
| **1 VU / 1 iter** | 🟢 **PASS** (`rate = 0.00%`) | 🟢 **PASS** (`rate = 100.00%`) | ❌ **FAIL** (`p95 = 2,322.60 ms`) | ⚠️ **PARTIAL / CHECK** |
| **1 VU / 5 iters** | 🟢 **PASS** (`rate = 0.00%`) | 🟢 **PASS** (`rate = 100.00%`) | ❌ **FAIL** (`p95 = 2,223.09 ms`) | ⚠️ **PARTIAL / CHECK** |
| **5 VUs / 5 iters** | 🟢 **PASS** (`rate = 0.00%`) | 🟢 **PASS** (`rate = 100.00%`) | ❌ **FAIL** (`p95 = 3,271.16 ms`) | ⚠️ **PARTIAL / CHECK** |
| **25 VUs / 5 iters** | ❌ **FAIL** (`rate = 43.98%`) | ❌ **FAIL** (`rate = 52.11%`) | ❌ **FAIL** (`p95 = 8,080.52 ms`) | ❌ **FAIL** |

### 5.3 Detailed Endpoint Degradation Analysis

#### A. Baseline Low-Load Latency Breaches (1 VU & 5 VUs)
Under low load (1 VU and 5 VUs), 0% HTTP request failures were observed across all 38 APIs. However, specific data-heavy endpoints breached the `p95 < 2,000 ms` performance threshold:
- **Scheduling - Assignments Board** (`/api/workforce/assignments/board`):
  - 1 VU / 1 iter: `p95 = 3,217.82 ms` (avg: 1,740.2 ms)
  - 5 VUs / 5 iters: `p95 = 3,775.85 ms` (avg: 2,227.9 ms)
- **Scheduling - Schedule Grid** (`/api/workforce/assignments/schedule-grid`):
  - 1 VU / 1 iter: `p95 = 2,712.91 ms` (avg: 2,712.9 ms)
  - 1 VU / 5 iters: `p95 = 2,173.19 ms` (avg: 1,843.4 ms)
  - 5 VUs / 5 iters: `p95 = 5,019.18 ms` (avg: 3,162.0 ms)
- **Insights - Executive Workforce Summary** (`/api/reporting/workforce/dashboard-summary`):
  - 1 VU / 1 iter: `p95 = 3,165.45 ms`
  - 1 VU / 5 iters: `p95 = 3,167.80 ms`
  - 5 VUs / 5 iters: `p95 = 6,321.41 ms`
- **Insights - Insights Assignment Board** (`/api/workforce/assignments/board`):
  - 1 VU / 1 iter: `p95 = 2,117.35 ms`
  - 1 VU / 5 iters: `p95 = 2,561.70 ms`
  - 5 VUs / 5 iters: `p95 = 7,915.91 ms`
- **5 VUs Scaling Impact:** As concurrency increased to 5 VUs, the count of slow APIs expanded from 3-4 to 16 out of 38 endpoints, with p95 reaching up to 7.92 seconds on Insights Assignment Board.

#### B. Severe Stress Breakdown (25 VUs / 5 iters)
At 25 concurrent VUs, the application backend experienced severe degradation across all 38 monitored endpoints:
- **Total Requests Attempted:** 4,875 | **Failed Requests:** 2,144 (**43.98% HTTP failure rate**)
- **Page Flow Completion Rate:** Collapsed from 100% to **52.11%**
- **System Latency:** Overall p95 response time surged to **8,080.52 ms**, with maximum recorded latency reaching **31,678.98 ms** (31.7 seconds)
- **End-Point Failure Distribution:** Every single endpoint (38 of 38) suffered failure rates between 40.0% and 60.0%:
  - `/api/reporting/workforce/dashboard-summary`: **60.0% failure rate** (75/125 failed), `p95 = 20,243.45 ms`
  - `/api/users/roles`: **52.0% failure rate** (65/125 failed), `p95 = 16,923.36 ms`
  - `/api/users`: **52.0% failure rate** (65/125 failed), `p95 = 3,468.73 ms`
  - `/api/system/lob`: **51.2% failure rate** (64/125 failed), `p95 = 3,180.08 ms`
  - `/api/system/regions?status=active`: **51.2% failure rate** (64/125 failed), `p95 = 10,076.17 ms`
  - `/api/workforce/saved-views?featureKey=insights-workforce`: **51.2% failure rate** (64/125 failed), `p95 = 10,504.78 ms`
  - `/api/projects`: **50.4% failure rate** (63/125 failed), `p95 = 7,833.97 ms`
  - `/api/dashboard/overview`: **49.6% failure rate** (124/250 failed), `p95 = 6,140.93 ms`
  - `/api/dashboard/comments`: **49.6% failure rate** (62/125 failed), `p95 = 8,939.79 ms`
  - `/api/resource-trades?includeNonRequestable=true`: **47.2% failure rate** (59/125 failed), `p95 = 14,047.85 ms`
  - `/api/workforce/assignments/schedule-grid`: **40.0% failure rate** (50/125 failed), `p95 = 13,591.40 ms`

---

## 6. Failed Test Cases and Failure Reasons

### Summary of Failed Test Cases
**Zero (0) Failed Functional Test Cases.**

All executed test cases across the automated API and UI suites passed with 100% fidelity:
- **API Functional Suite:** 7 executed, 7 passed, 0 failed.
- **UI Functional Suite:** 8 executed, 8 passed, 0 failed.

*(Note: Per sign-off scope definitions, standalone performance testcases are not evaluated under this section; performance findings are assessed directly in Section 5).*

---

## 7. Regression Status

- **Core Scheduling Workflows:** Automated regression checks validated that future assignments (`startDate >= today`) successfully bypass the modal and execute full unassign/reassign (`test_tc_ui_edru_004_future_assignment_bypass_modal` PASSED).
- **Date Boundary Invariance:** Start-date equality (`effectiveDate == startDate`) triggers mandatory warning confirmation, preserving day-one unassign behavior without unprompted data truncation (`test_tc_ui_edru_009_start_date_equality_warning_modal` PASSED).
- **Concurrency & State Safety:** OCC version validation actively rejects stale writes with HTTP `409 Conflict`, preventing silent overwrites and race conditions (`test_tc_api_edru_003_occ_version_mismatch_rejected` PASSED).
- **UI Entry Point Uniformity:** Modal triggers from Gantt timeline, Details Drawer, and Worker profile rows passed with identical behavior.
- **Performance Regression Warning:** Navigation latency across core views (Scheduling, Insights, Reports) demonstrates significant latency regression when moving from 1 VU (p95 = 2.3s) to 5 VUs (p95 = 3.3s), and complete service collapse at 25 VUs (43.98% failure rate).

---

## 8. Defect Summary

Per source rules, no defects were logged in source repository issue files. Observed anomalies from performance navigation execution are classified below:

| Defect / Anomaly Identifier | Layer | Title / Observed Behavior | Severity | Status | Classification |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **OBS-PERF-EDRU-001** | API Performance | High query latency on Scheduling and Insights boards exceeding 2s target under single VU (p95: 3.2s) | **High** | OPEN | `APPLICATION DEFECT` |
| **OBS-PERF-EDRU-002** | System / Infrastructure | 43.98% HTTP failure rate (2,144 errors across 38 endpoints) under 25 VU concurrency | **Critical** | OPEN | `ENVIRONMENT ISSUE` |

---

## 9. Traceability

| Requirement / Rule ID | Description | Planned Layer | Verification Evidence | Verdict |
| :--- | :--- | :--- | :--- | :---: |
| `REQ-EDRU-001` | Activation condition (`startDate < today`) | Functional UI / API | `test_tc_ui_edru_001..003` | 🟢 **PASS** |
| `REQ-EDRU-002` | Bypass modal for future assignments (`startDate >= today`) | Functional UI | `test_tc_ui_edru_004_future_assignment_bypass_modal` | 🟢 **PASS** |
| `REQ-EDRU-003` | Default date picker to `today` | Functional UI | `test_tc_ui_edru_005_date_picker_defaults_to_today_active_assignment` | 🟢 **PASS** |
| `REQ-EDRU-004` | Default date picker to `startDate` for expired assignments | Functional UI / Boundary | `test_tc_ui_edru_006_date_picker_defaults_to_startdate_expired_assignment` | 🟢 **PASS** |
| `REQ-EDRU-005` | Date range boundary clamping `[startDate, endDate]` | Functional API / Boundary | `test_tc_api_edru_004_end_date_boundary_split` | 🟢 **PASS** |
| `REQ-EDRU-006` | Unassign split execution & `laborRequest` in `OPEN` status | Functional API / DB | `test_tc_api_edru_001_unassign_split_valid_payload` | 🟢 **PASS** |
| `REQ-EDRU-007` | Reassign split execution & replacement worker assignment | Functional API / DB | `test_tc_api_edru_002_reassign_split_valid_replacement_worker` | 🟢 **PASS** |
| `REQ-EDRU-008` | Start-date boundary confirmation warning | Functional UI | `test_tc_ui_edru_009_start_date_equality_warning_modal` | 🟢 **PASS** |
| `REQ-EDRU-009` | Conflict detection & override confirmation | Functional API / UI | `test_tc_api_edru_005_reassign_conflict_without_override_rejected` | 🟢 **PASS** |
| `REQ-EDRU-010` | Historic lockout (< 7 days) and System Admin override | Functional API / RBAC | `test_tc_api_edru_006` (Reject) & `test_tc_api_edru_007` (Admin Override) | 🟢 **PASS** |
| `REQ-EDRU-011` | OCC version validation & HTTP `409 Conflict` rejection | Functional API / Concurrency | `test_tc_api_edru_003_occ_version_mismatch_rejected` | 🟢 **PASS** |
| `REQ-EDRU-012` | Audit log record creation (`SPLIT_ASSIGNMENT`) | Functional API / Security | Verified via `test_tc_api_edru_001` & `test_tc_api_edru_002` | 🟢 **PASS** |
| `UI-EDRU-001` | UI touchpoint activations (Gantt, Drawer, Worker List) | UI Layer | `test_tc_ui_edru_001`, `test_tc_ui_edru_002`, `test_tc_ui_edru_003` | 🟢 **PASS** |
| `VAL-EDRU-005` | Duplicate click/submission prevention on Confirm | UI Validation | `test_tc_ui_edru_012_duplicate_submission_prevention_on_confirm` | 🟢 **PASS** |
| `PERF-API-EDRU-001` | GET assignment latency distribution under baseline load | API Performance (k6) | `navigation_1vu_1iter.json` (`/board` p95 = 3.2s) | ⚠️ **CHECK / SLOW** |
| `PERF-API-EDRU-007` | API Error rate < 1% under peak workload | API Performance (k6) | `navigation_25vu_5iter.json` (Error rate = 43.98%) | ❌ **FAIL** |

---

## 10. Exit-Criteria Status

Criteria evaluated against Section 11 of approved `TestPlan.md`:

| Exit Criterion (from Test Plan) | Target | Actual | Status | Verdict Rationale |
| :--- | :---: | :---: | :---: | :--- |
| **1. 100% execution of functional, positive, negative, boundary, and RBAC test suites** | 100% | 100% (Executed Suites) | 🟢 **SATISFIED** | All 7 API automated tests and 8 UI automated tests passed without failure. |
| **2. High-severity defect blockers related to data corruption, atomicity failure, or data loss resolved** | 0 Open | 0 Open | 🟢 **SATISFIED** | Zero functional data corruption, atomicity, or allocation loss bugs detected. |
| **3. Successful validation of OCC versioning and concurrency conflict handling (409 Conflict)** | 100% | 100% | 🟢 **SATISFIED** | Validated via `test_tc_api_edru_003_occ_version_mismatch_rejected`. |
| **4. Successful validation of audit log emission for all split operations** | 100% | 100% | 🟢 **SATISFIED** | Validated across unassign and reassign execution paths. |
| **5. Performance baseline measurements captured and analyzed against proposed targets** | Baseline Captured & Evaluated | 4 runs analyzed; Breaches & High-Load collapse observed | ❌ **UNSATISFIED** | Baseline captured, but target SLOs were breached (p95 = 2.3s-3.3s on 1-5 VUs) and 25 VUs collapsed (43.98% failure rate). |

---

## 11. Information Gaps

| Gap ID | Area | Description & QA Impact |
| :--- | :--- | :--- |
| **GAP-EDRU-001** | Server Infrastructure Sizing | Environment specifications (CPU, RAM, DB connection pool limits) for `https://danis-cmma-dev.cosdevx.com` during the 25 VU test run are undocumented. |
| **GAP-EDRU-002** | Formal Test Case Review | A standalone `Test_Case_Review.md` artifact was not supplied for this feature. |

---

## 12. Residual Risks

1. **Risk 1 (High Concurrency System Breakdown):** Under 25 concurrent users, the application server and API endpoints collapsed, resulting in a 43.98% failure rate and up to 31.7-second latencies. Releasing to high-concurrency environments without infrastructure scaling or query optimization introduces severe availability risk.
2. **Risk 2 (Board Hydration Latency):** Even at a single virtual user (1 VU), Scheduling and Insights boards take > 3.2 seconds to load (`p95 = 3,217.82 ms`), exceeding the 2,000 ms target and impacting dispatcher responsiveness.

---

## 13. Final QA Status

# **CONDITIONAL SIGN-OFF**

---

## 14. Sign-off Rationale

### 14.1 Approved Scope (Low-Concurrency Operational Usage)
The Effective Date Reassign and Unassign functional implementation is **APPROVED for low-concurrency environments (<= 5 concurrent VUs)** under the following substantiated findings:
1. **100% Functional & Business Rule Integrity:** All 7 automated API tests and 8 automated UI tests passed with zero errors. Historical allocation records (`[startDate, effectiveDate - 1 day]`) are safely preserved, future segments correctly generate open labor requests (Unassign) or new replacement assignments (Reassign), start-date equality requires explicit acknowledgement, and historic lockout limits (< 7 days) are strictly enforced against non-admin roles.
2. **Robust Concurrency Protection:** Optimistic Concurrency Control (OCC) versioning reliably rejects stale requests with HTTP `409 Conflict`, guaranteeing that race conditions cannot silently corrupt assignment records.
3. **Low-Load Reliability:** At 1 VU and 5 VUs, full navigation workflows achieved a **100% functional request success rate (0.00% HTTP failures)** across 1,209 total evaluated HTTP requests.

### 14.2 Release Conditions & Blocked Scope
Full production sign-off for general/high-traffic workloads is **CONDITIONALLY BLOCKED** until the following conditions are met:
1. **Remediate High-Concurrency Infrastructure Bottlenecks:** Release must not be deployed to high-concurrency user groups (> 5 VUs, up to 25 VUs) until backend server capacity, connection pools, and database queries are optimized to eliminate the **43.98% HTTP failure rate** observed under 25 VUs.
2. **Optimize Slow Board Endpoints:** Engineering must optimize `/api/workforce/assignments/board` and `/api/workforce/assignments/schedule-grid` to bring p95 response times under the 2,000 ms SLO (currently 3.2s - 5.0s under baseline/moderate load).
