# Test Plan: Effective Date Reassign and Unassign

**Feature:** `feat-effective-date-reassign-unassign`  
**Epic:** `epic-assignments`  
**Authoritative SPEC:** `specs/epic-assignments/feat-effective-date-reassign-unassign/Spec.md` (Source: `specs/Updated_complex_spec.md`)  
**QA Analysis:** `complex-spec/QA_specAnalysis.md`  
**Document Version:** 1.0  
**Date:** 2026-09-23  

---

## 1. Overview

The CMMA construction workforce management platform enables scheduling and assignment of workers to construction projects across defined date ranges. When an assignment is already in progress (`startDate < today`), workforce managers cannot simply delete or swap workers without destroying historical workforce allocation records.

This feature introduces an **Effective Date** mechanism for **Unassign** and **Reassign** operations on in-progress assignments. When executed, the system splits the assignment at the selected effective date into two distinct records:
1. **Historical Segment (`[originalStartDate, effectiveDate - 1 day]`)**: Preserved on record with the original worker and incremented OCC version.
2. **Future Segment (`[effectiveDate, originalEndDate]`)**:
   - **Unassign**: Generates an open labor request slot (`laborRequest`) in `OPEN` status in the dispatch queue.
   - **Reassign**: Creates a new assignment covering the future segment for the selected replacement worker (`targetWorkerId`).

For future assignments (`startDate >= today`), the effective date flow is bypassed, executing standard full unassign or reassign operations immediately.

The objective of this Test Plan is to provide complete, traceable validation coverage across functional rules, UI entry points and modals, API split mutations, Optimistic Concurrency Control (OCC), transactional atomicity, RBAC security, dispatch integration, regression impact, and performance baselines.

---

## 2. Requirements & Business Rules

### 2.1 Explicit Requirements

| ID | Requirement / Rule | Area | Applicable Layers |
| :--- | :--- | :--- | :--- |
| **REQ-EDRU-001** | System shall activate the Effective Date mechanism when an Unassign or Reassign action is initiated on an in-progress assignment where `assignment.startDate < today`. | Core Activation | UI, API, Functional |
| **REQ-EDRU-002** | System shall bypass the Effective Date picker and execute a standard full unassign or reassign when `assignment.startDate >= today`. | Future Bypass | UI, API, Functional |
| **REQ-EDRU-003** | System shall default the effective date picker to `today` when `today <= assignment.endDate`. | Date Constraints | UI, Functional |
| **REQ-EDRU-004** | System shall default the effective date picker to `assignment.startDate` when `today > assignment.endDate` (expired assignment). | Date Constraints | UI, Boundary |
| **REQ-EDRU-005** | System shall enforce effective date selection within the assignment range: `startDate <= effectiveDate <= endDate`. | Date Constraints | UI, API, Boundary |
| **REQ-EDRU-006** | Upon confirming Unassign on an in-progress assignment, the system shall atomically update the original assignment to span `[originalStartDate, effectiveDate - 1 day]` with incremented `version`, and create a new `laborRequest` in `OPEN` status spanning `[effectiveDate, originalEndDate]`. | Unassign Split | API, DB, Functional, Integration |
| **REQ-EDRU-007** | Upon confirming Reassign on an in-progress assignment, the system shall atomically update the original assignment to span `[originalStartDate, effectiveDate - 1 day]` with incremented `version`, and create a new assignment for `targetWorkerId` spanning `[effectiveDate, originalEndDate]`. | Reassign Split | API, DB, Functional, Integration |
| **REQ-EDRU-008** | If the user selects `effectiveDate == assignment.startDate`, the system shall require explicit user acknowledgement that no historical segment will be preserved, and upon confirmation replace/unassign the full assignment from day one. | Boundary / Warning | UI, Functional, Boundary |
| **REQ-EDRU-009** | System shall detect if a selected replacement worker has an overlapping active assignment on another project during `[splitDate, endDate]` and prompt a conflict warning requiring explicit override confirmation (`overrideConflict: true`). | Conflict Guard | UI, API, Functional, Negative |
| **REQ-EDRU-010** | System shall enforce a historic lockout if `splitDate < today - 7 days`, blocking Workforce Managers and requiring a System Admin with `overrideHistoricLockout: true` to execute the split. | Security / RBAC | Security, API, UI, Functional |
| **REQ-EDRU-011** | System shall validate the Optimistic Concurrency Control (OCC) `version` field against the database before applying changes, returning HTTP `409 Conflict` if mismatched. | Concurrency / OCC | API, Concurrency, Negative |
| **REQ-EDRU-012** | System shall atomically write an audit log entry `SPLIT_ASSIGNMENT` containing the actor, effective date, and segment boundaries upon every successful split. | Audit & Compliance | DB, Security, API |

### 2.2 Business Rules

| ID | Requirement / Rule | Area | Applicable Layers |
| :--- | :--- | :--- | :--- |
| **BR-EDRU-001** | Effective date flow activates if and only if `startDate < today`. If `startDate >= today`, full pass-through unassign/reassign occurs without effective date modal. | Activation Trigger | UI, Functional |
| **BR-EDRU-002** | The effective date must strictly satisfy `startDate <= effectiveDate <= endDate`. Date picker `min = startDate`, `max = endDate`. | Date Clamping | UI, API, Boundary |
| **BR-EDRU-003** | Default date is `today` if `today <= endDate`; otherwise `startDate` if `today > endDate`. | Default Evaluation | UI, Functional |
| **BR-EDRU-004** | Setting `effectiveDate == startDate` produces zero historical days; requires explicit modal acknowledgement before executing full replacement/unassign. | Historical Boundary | UI, Functional |
| **BR-EDRU-005** | Shortening original assignment and creating future segment/slot must succeed together as a single atomic backend transaction. | Transaction Atomicity | DB, API, Integrity |
| **BR-EDRU-006** | Assignment version increments by exactly 1 on every successful split mutation. Sequential operations require fresh GET to read updated version. | OCC Versioning | API, DB, Concurrency |
| **BR-EDRU-007** | Replacement worker with overlapping assignment on another project during `[splitDate, endDate]` is blocked unless request payload contains `overrideConflict: true`. | Scheduling Guard | API, UI, Functional |
| **BR-EDRU-008** | Split date older than 7 days (`splitDate < today - 7 days`) is locked for standard Workforce Managers; allowed only for System Admin with `overrideHistoricLockout: true`. | Historic Lockout | Security, API, UI |

---

## 3. Scope / Out of Scope

### 3.1 In Scope
- **Functional Validation:** In-progress activation conditions, future assignment bypass, effective date clamping, start-date boundary acknowledgement, unassign slot generation, reassign replacement creation.
- **UI Interaction:** Gantt Timeline right-click context menu, Assignment Details Drawer, Worker Profile Assignments tab, `UnassignConfirmationModal`, `ReassignEffectiveDateModal`, `FillOpenRequestDrawer`, preview badges, conflict dialogs, and duplicate submission prevention.
- **API Contract & Mutations:** `POST /api/workforce/scheduling/assignments/:id/split` schema validation, required fields, optional override flags, and status code verification (`200 OK` / `201 Created` vs error states). Read-before-write dependency via `GET /api/workforce/scheduling/assignments/:id`.
- **Database & Data Integrity:** Verification of `assignment`, `laborRequest`, and `auditLog` entity persistence, OCC version increment (+1), and transactional rollback on simulated failure.
- **Security & RBAC:** Verification of Workforce Manager / Dispatcher role permissions versus System Administrator permissions for historic lockouts (`splitDate < today - 7 days`).
- **Integration:** Emission of open labor requests into the dispatch queue in `OPEN` status.
- **Regression:** Verification that existing assignments, profiles, dispatch queues, and standard assignment actions remain unaffected.
- **Performance:** Benchmark latency distributions (p50, p95, p99), error rates (< 1%), throughput under baseline and peak load via k6, multi-VU OCC contention testing, and modal transition latencies via Lighthouse / k6/browser.

### 3.2 Out of Scope
- Modifying assignment dates outside of the split workflow.
- Downstream dispatch fulfillment workflows beyond verifying `laborRequest` appears in `OPEN` status.
- Mobile native application testing (not supported by specification).
- Inventing unconfirmed contractual SLA targets or unconfirmed physical DB schemas.

---

## 4. Test Objectives

- Validate that in-progress assignment splits preserve historical records `[startDate, effectiveDate - 1 day]` without data loss.
- Verify that future segments `[effectiveDate, endDate]` correctly transition to an open labor request (Unassign) or new assignment (Reassign).
- Verify OCC version locking prevents race conditions and data corruption across concurrent or sequential mutations.
- Verify RBAC policies strictly enforce the 7-day historic lockout for standard users while permitting authorized Admin overrides.
- Verify transactional atomicity prevents orphaned segments or half-completed operations upon backend errors.
- Profile API and UI performance against proposed baselines to identify latency bottlenecks and contention failure rates.

---

## 5. Test Levels & Testing Strategy

### 5.1 Functional
- Validate all trigger conditions, boundary rules, outcome calculations, and negative flows.
- Ensure state transitions for `assignment` (shortened `endDate`, incremented `version`) and `laborRequest` (`OPEN` status).

### 5.2 UI
- Validate entry points: Gantt Timeline context menu, Details Drawer, Worker Assignments tab.
- Validate date picker constraints, preview badges, conflict modals, loading states, and prevention of duplicate clicks.

### 5.3 API
- Validate request payload schemas, required headers, `splitMode: "date"`, OCC `version`, and override flags for `POST .../split`.
- Validate error handling: HTTP `409 Conflict` on stale version, blocked response on unauthorized historic lockout, and conflict rejection.

### 5.4 DB
- Assert record mutations in `assignment`, record creation in `laborRequest`, and insertion of `auditLog` (`SPLIT_ASSIGNMENT`).
- Verify transactional rollback ensuring no orphan records if future segment creation fails.

### 5.5 Regression
- Verify standard unassign/reassign workflows on future assignments (`startDate >= today`) remain intact.
- Verify Gantt timeline correctly renders both split segments (or reflects changes upon page refresh).

### 5.6 Security
- Verify RBAC authorization: standard Workforce Manager is blocked from splitting dates older than 7 days; System Admin can override with `overrideHistoricLockout: true`.

### 5.7 Integration
- Verify created `laborRequest` entities flow into the dispatch queue with `status: OPEN`.

### 5.8 Performance
- API Performance: k6 HTTP tests measuring baseline latency, peak error rate, and multi-VU OCC contention.
- UI Performance: Lighthouse / browser measurement of modal render and transition latencies against the proposed `p95 <= 2.0 s` target.

---

## 6. Test Scenarios

| ID | Scenario | Type | Layer | Priority | Requirement IDs | Data | Pack |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SCN-EDRU-001** | Trigger Effective Date modal on in-progress assignment via Gantt context menu | Functional / Positive | UI | High | `REQ-EDRU-001`, `BR-EDRU-001`, `UI-EDRU-001` | In-progress assignment | Standard |
| **SCN-EDRU-002** | Trigger Effective Date modal on in-progress assignment via Assignment Details Drawer | Functional / Positive | UI | High | `REQ-EDRU-001`, `BR-EDRU-001`, `UI-EDRU-002` | In-progress assignment | Smoke |
| **SCN-EDRU-003** | Trigger Effective Date modal on in-progress assignment via Worker Assignments List | Functional / Positive | UI | Medium | `REQ-EDRU-001`, `BR-EDRU-001`, `UI-EDRU-003` | In-progress assignment | Standard |
| **SCN-EDRU-004** | Bypass Effective Date flow for future assignment (`startDate >= today`) | Positive | UI / Functional | High | `REQ-EDRU-002`, `BR-EDRU-001` | Future assignment | Smoke |
| **SCN-EDRU-005** | Default effective date picker selection to `today` for active in-progress assignment | Functional / Positive | UI | High | `REQ-EDRU-003`, `REQ-EDRU-005`, `BR-EDRU-002`, `BR-EDRU-003` | Active assignment (`today <= endDate`) | Smoke |
| **SCN-EDRU-006** | Default effective date picker selection to `startDate` for expired assignment | Boundary / Positive | UI | Medium | `REQ-EDRU-004`, `REQ-EDRU-005`, `BR-EDRU-002`, `BR-EDRU-003` | Expired assignment (`today > endDate`) | Standard |
| **SCN-EDRU-007** | Execute Unassign split on in-progress assignment via UI | Functional / Positive | UI | High | `REQ-EDRU-006`, `BR-EDRU-005`, `BR-EDRU-006` | In-progress assignment, valid `splitDate` | Smoke |
| **SCN-EDRU-008** | Execute Reassign split with non-conflicting replacement worker via UI | Functional / Positive | UI | High | `REQ-EDRU-007`, `BR-EDRU-005`, `BR-EDRU-006` | In-progress assignment, available worker | Smoke |
| **SCN-EDRU-009** | Acknowledge start-date equality warning when `effectiveDate == startDate` | Boundary / Positive | UI | High | `REQ-EDRU-008`, `BR-EDRU-004` | Assignment, `splitDate == startDate` | Critical |
| **SCN-EDRU-010** | Reassign replacement worker with scheduling conflict and confirm override | Negative / Positive | UI / API | High | `REQ-EDRU-009`, `BR-EDRU-007`, `VAL-EDRU-003` | Overlapping replacement worker | Critical |
| **SCN-EDRU-011** | Reassign replacement worker with scheduling conflict without override confirmation | Negative | API | Medium | `REQ-EDRU-009`, `BR-EDRU-007`, `VAL-EDRU-003` | Overlapping worker, `overrideConflict: false` | Standard |
| **SCN-EDRU-012** | Non-Admin user attempts split with `splitDate < today - 7 days` | Security / Negative | Security | High | `REQ-EDRU-010`, `BR-EDRU-008`, `VAL-EDRU-002` | Standard role, `splitDate < today - 7d` | Critical |
| **SCN-EDRU-013** | System Admin executes historic lockout override split | Security / Positive | Security | High | `REQ-EDRU-010`, `BR-EDRU-008`, `VAL-EDRU-002` | Admin role, `overrideHistoricLockout: true` | Critical |
| **SCN-EDRU-014** | API split mutation for Unassign with valid payload | Functional / Positive | API | High | `REQ-EDRU-006`, `BR-EDRU-005`, `BR-EDRU-006` | Assignment ID, current version, splitDate | Smoke |
| **SCN-EDRU-015** | API split mutation for Reassign with valid replacement worker | Functional / Positive | API | High | `REQ-EDRU-007`, `BR-EDRU-005`, `BR-EDRU-006` | Assignment ID, version, targetWorkerId | Smoke |
| **SCN-EDRU-016** | OCC Version mismatch on split mutation returns 409 Conflict | Concurrency / Negative | API | High | `REQ-EDRU-011`, `BR-EDRU-006`, `VAL-EDRU-001` | Mismatched / stale version integer | Critical |
| **SCN-EDRU-017** | End-date split boundary where `splitDate == endDate` | Boundary | API | Medium | `REQ-EDRU-005`, `BR-EDRU-002` | Assignment, `splitDate == endDate` | Standard |
| **SCN-EDRU-018** | Audit log record generation upon successful split (`SPLIT_ASSIGNMENT`) | Positive | DB | High | `REQ-EDRU-012` | Post-split DB state | Standard |
| **SCN-EDRU-019** | Transaction atomicity during split mutation failure | Integrity / Negative | DB | Critical | `BR-EDRU-005` | Simulated failure during future creation | Critical |
| **SCN-EDRU-020** | Dispatch queue integration for unassigned labor requests | Positive | Integration | High | `REQ-EDRU-006` | Open labor request in dispatch queue | Standard |
| **SCN-EDRU-021** | Sequential splits on same assignment record | Regression / Edge | API | Medium | `REQ-EDRU-011`, `BR-EDRU-006` | Shortened assignment, re-fetched version | Risk-Based |
| **SCN-EDRU-022** | API Latency profiling under baseline load | Performance | Performance | Medium | `PERF-API-EDRU-001` to `006`, `PERF-WL-EDRU-001` | Baseline k6 workload | Standard |
| **SCN-EDRU-023** | Multi-VU OCC Concurrency Contention under Load | Concurrency / Load | Performance | High | `PERF-API-EDRU-008`, `REQ-EDRU-011`, `PERF-WL-EDRU-005` | Concurrent k6 VUs targeting same record | Critical |
| **SCN-EDRU-024** | API Error rate under Peak scheduling load | Performance | Performance | Medium | `PERF-API-EDRU-007`, `PERF-WL-EDRU-002` | Peak k6 workload profile | Standard |
| **SCN-EDRU-025** | End-to-end user workflow latency | Performance | Performance | Medium | `PERF-API-EDRU-009` | GET -> POST split -> GET state journey | Standard |
| **SCN-EDRU-026** | UI Drawer & Modal Transition Latency | Performance | Performance | Medium | `PERF-UI-EDRU-001` to `006` | In-progress assignment UI session | Standard |
| **SCN-EDRU-027** | Gantt timeline UI synchronization post-split | Regression | UI | Medium | `UI-EDRU-001` | Post-split Gantt view | Risk-Based |
| **SCN-EDRU-028** | UI duplicate submission prevention on split confirm | Validation / State | UI | High | `REQ-EDRU-001` | Rapid double-click on confirm | Risk-Based |

---

## 7. Smoke Test Pack

| Smoke ID | Scenario ID | Test Case ID | Scenario | Layer | Requirement |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SMK-EDRU-001** | `SCN-EDRU-002` | N/A | Trigger Effective Date modal on in-progress assignment via Assignment Details Drawer | UI | `REQ-EDRU-001`, `BR-EDRU-001` |
| **SMK-EDRU-002** | `SCN-EDRU-004` | N/A | Bypass Effective Date flow for future assignment (`startDate >= today`) | UI | `REQ-EDRU-002`, `BR-EDRU-001` |
| **SMK-EDRU-003** | `SCN-EDRU-005` | N/A | Default effective date picker selection to `today` for active in-progress assignment | UI | `REQ-EDRU-003`, `BR-EDRU-003` |
| **SMK-EDRU-004** | `SCN-EDRU-007` | N/A | Execute Unassign split on in-progress assignment via UI | UI | `REQ-EDRU-006`, `BR-EDRU-005` |
| **SMK-EDRU-005** | `SCN-EDRU-008` | N/A | Execute Reassign split with non-conflicting replacement worker via UI | UI | `REQ-EDRU-007`, `BR-EDRU-005` |
| **SMK-EDRU-006** | `SCN-EDRU-014` | N/A | API split mutation for Unassign with valid payload | API | `REQ-EDRU-006`, `BR-EDRU-006` |
| **SMK-EDRU-007** | `SCN-EDRU-015` | N/A | API split mutation for Reassign with valid replacement worker | API | `REQ-EDRU-007`, `BR-EDRU-006` |

---

## 8. Critical Suite

| ID | Scenario ID | Test Case ID | Scenario | Layer | Risk/Impact | Requirement |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CRT-EDRU-001** | `SCN-EDRU-007` | N/A | Execute Unassign split on in-progress assignment via UI | UI | Historical data loss / incorrect record shortening | `REQ-EDRU-006`, `BR-EDRU-005` |
| **CRT-EDRU-002** | `SCN-EDRU-008` | N/A | Execute Reassign split with non-conflicting replacement worker via UI | UI | Assignment overwrites / missing future records | `REQ-EDRU-007`, `BR-EDRU-005` |
| **CRT-EDRU-003** | `SCN-EDRU-009` | N/A | Acknowledge start-date equality warning when `effectiveDate == startDate` | UI | Accidental erasure of entire historical record | `REQ-EDRU-008`, `BR-EDRU-004` |
| **CRT-EDRU-004** | `SCN-EDRU-010` | N/A | Reassign replacement worker with scheduling conflict and confirm override | UI / API | Double-booking worker without explicit confirmation | `REQ-EDRU-009`, `BR-EDRU-007` |
| **CRT-EDRU-005** | `SCN-EDRU-012` | N/A | Non-Admin user attempts split with `splitDate < today - 7 days` | Security | Security violation / unapproved historic edits | `REQ-EDRU-010`, `BR-EDRU-008` |
| **CRT-EDRU-006** | `SCN-EDRU-013` | N/A | System Admin executes historic lockout override split | Security | Privileged bypass failure | `REQ-EDRU-010`, `BR-EDRU-008` |
| **CRT-EDRU-007** | `SCN-EDRU-014` | N/A | API split mutation for Unassign with valid payload | API | Core backend mutation failure | `REQ-EDRU-006`, `BR-EDRU-006` |
| **CRT-EDRU-008** | `SCN-EDRU-015` | N/A | API split mutation for Reassign with valid replacement worker | API | Core backend mutation failure | `REQ-EDRU-007`, `BR-EDRU-006` |
| **CRT-EDRU-009** | `SCN-EDRU-016` | N/A | OCC Version mismatch on split mutation returns 409 Conflict | API | Concurrency race condition / silent data overwrite | `REQ-EDRU-011`, `BR-EDRU-006` |
| **CRT-EDRU-010** | `SCN-EDRU-019` | N/A | Transaction atomicity during split mutation failure | DB | Orphaned segments / partial mutation corruption | `BR-EDRU-005` |
| **CRT-EDRU-011** | `SCN-EDRU-023` | N/A | Multi-VU OCC Concurrency Contention under Load | Performance | Concurrency race conditions under traffic spikes | `PERF-API-EDRU-008`, `REQ-EDRU-011` |

---

## 9. Risk-Based Test Pack

| Risk ID | Scenario ID | Test Case ID | Risk | Scenario | Layer | Requirement |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **RSK-EDRU-001** | `SCN-EDRU-007` | N/A | Historical Allocation Data Loss | Execute Unassign split on in-progress assignment via UI | UI | `REQ-EDRU-006` |
| **RSK-EDRU-001** | `SCN-EDRU-008` | N/A | Historical Allocation Data Loss | Execute Reassign split with non-conflicting replacement worker via UI | UI | `REQ-EDRU-007` |
| **RSK-EDRU-001** | `SCN-EDRU-009` | N/A | Historical Allocation Data Loss | Acknowledge start-date equality warning when `effectiveDate == startDate` | UI | `REQ-EDRU-008` |
| **RSK-EDRU-002** | `SCN-EDRU-016` | N/A | OCC Mutation Race Conditions | OCC Version mismatch on split mutation returns 409 Conflict | API | `REQ-EDRU-011` |
| **RSK-EDRU-002** | `SCN-EDRU-023` | N/A | OCC Mutation Race Conditions | Multi-VU OCC Concurrency Contention under Load | Performance | `PERF-API-EDRU-008` |
| **RSK-EDRU-003** | `SCN-EDRU-019` | N/A | Split Atomicity Failure | Transaction atomicity during split mutation failure | DB | `BR-EDRU-005` |
| **RSK-EDRU-004** | `SCN-EDRU-027` | N/A | Gantt Display Out-of-Sync | Gantt timeline UI synchronization post-split | UI | `UI-EDRU-001` |
| **RSK-EDRU-005** | `SCN-EDRU-001` | N/A | Automation Fragility on Gantt Right-Click | Trigger Effective Date modal on in-progress assignment via Gantt context menu | UI | `UI-EDRU-001` |
| **RSK-EDRU-006** | `SCN-EDRU-028` | N/A | Duplicate Future Records on Retry / Double Clicks | UI duplicate submission prevention on split confirm | UI | `REQ-EDRU-001` |
| **RSK-EDRU-002** | `SCN-EDRU-021` | N/A | OCC Mutation Race Conditions | Sequential splits on same assignment record | API | `REQ-EDRU-011` |

---

## 10. Performance Strategy

Performance testing is explicitly supported by Section 6.4, Section 6.7, and Section 7.2 of the specification analysis.

### 10.1 API Performance (k6 HTTP)
- **Tool:** `k6 HTTP`
- **Endpoints:**
  - `GET /api/workforce/scheduling/assignments/:id`
  - `POST /api/workforce/scheduling/assignments/:id/split` (Unassign & Reassign)
- **Workload Profiles:**
  - *Baseline Load:* Profile response latency distributions against proposed targets (`GET <= 750ms p95`, `Unassign <= 1000ms p95`, `Reassign <= 1500ms p95`).
  - *Peak Load:* Measure error rate (`http_req_failed < 1%` excluding expected 409 conflicts).
  - *OCC Contention:* Multiple VUs simultaneously mutate the exact same assignment record/version. Verify exactly 1 success (+1 version) and clean 409 Conflict responses for all other VUs without deadlocks.
- **Constraints / Information Gap:** Contractual SLA values, peak RPS numbers, and VU counts are proposed baselines requiring formal confirmation before acting as release gates (see Information Gaps).

### 10.2 UI Performance (Lighthouse & k6/browser)
- **Tool:** `Lighthouse` / `k6/browser`
- **Actions:**
  - Open Assignment Details Drawer (`PERF-UI-EDRU-001`)
  - Open `UnassignConfirmationModal` (`PERF-UI-EDRU-002`)
  - Open `ReassignEffectiveDateModal` (`PERF-UI-EDRU-003`)
  - Render Date Picker & Badges (`PERF-UI-EDRU-004`)
  - Open `FillOpenRequestDrawer` (`PERF-UI-EDRU-005`)
- **Metric:** Transition / render latency target `p95 <= 2.0 s` (proposed baseline).

---

## 11. Tooling / Automation Strategy

| Layer | Tool | Purpose |
| :--- | :--- | :--- |
| **UI** | Playwright | End-to-end browser automation across Drawer, Worker Profile, and Gantt entry points, modal workflows, conflict dialogs, and state synchronization. |
| **API** | pytest + httpx | Contract assertions, payload schema validation, OCC 409 concurrency testing, and RBAC lockout verification. |
| **DB** | Project direct DB query / backend test harness | Verification of atomic mutations, audit log insertions, and rollback integrity. |
| **API Performance** | k6 HTTP | API latency distribution, throughput, error-rate benchmarking, and multi-VU OCC contention load execution. |
| **UI Performance** | Lighthouse / k6/browser | UI render, transition latency, and Core Web Vitals profiling. |

---

## 12. Test Data

Required test data pre-requisites:
1. **Active Project Records:** Valid project entity with scheduling enabled.
2. **In-Progress Assignments:** Pre-seeded assignments where `startDate < today <= endDate` with known assigned worker and version.
3. **Expired In-Progress Assignments:** Assignments where `today > endDate` (for `startDate` default verification).
4. **Future Assignments:** Assignments where `startDate >= today` (for bypass verification).
5. **Historic Lockout Assignments:** In-progress assignments where `startDate < today - 7 days`.
6. **Replacement Workers (Clean):** Available workers with matching craft/trade and no overlapping assignments during future segment.
7. **Replacement Workers (Conflicting):** Workers with overlapping active assignments on other projects during future segment.
8. **User Accounts & Roles:**
   - Standard Workforce Manager / Dispatcher credentials.
   - System Administrator credentials.

---

## 13. Environment / Configuration / Dependencies

### 13.1 Environment Requirements
- Web application frontend hosting Gantt, Drawer, and Worker profile views.
- Backend API service hosting `/api/workforce/scheduling/assignments/*`.
- Relational database supporting transactional OCC (`version` column).
- Dispatch queue service consuming new labor requests in `OPEN` status.

### 13.2 Dependencies
- Pre-seeded database state: In-progress assignments cannot be created on the fly via UI in real-time if `startDate < today`.
- Clock synchronization / mockable server time for deterministic `today` and `today - 7 days` boundary evaluations.

---

## 14. Deliverables & Evidence

### 14.1 Deliverables
- `qa/test-plan/EffectiveDate_Reassign_Unassign_TestPlan.md`
- `qa/test-cases/EffectiveDate_Reassign_Unassign_TestCase_Engineering.md`
- Execution pack test cases for UI, API, DB, Regression, and Performance.
- Execution evidence and defect reports if execution reveals discrepancies.

### 14.2 Evidence Types
- Automated test logs and reports (pytest HTML reports, Playwright trace logs and videos for failures).
- API request/response payloads including headers, status codes, and latency metrics.
- k6 stdout summaries and exported JSON metric trends.
- Database query snapshots verifying `assignment`, `laborRequest`, and `auditLog` records before and after mutation.

---

## 15. Defect Management

Traceability path for any discovered failures:
`Execution -> Test Case -> Scenario -> Requirement -> Defect`

Defect reports must capture:
- Defect Title and Severity (Critical, High, Medium, Low)
- Associated Requirement ID and Scenario ID
- Test Layer and Environment details
- Exact steps to reproduce, submitted payload, and observed response/behavior
- Evidence attachment (Playwright trace, API payload, k6 metric log, or DB record snapshot)

---

## 16. Test Monitoring / Control

The testing process monitors:
- Planned vs executed test cases.
- Pass / Fail / Blocked status counts.
- Active defects classified by severity.
- Data seeding readiness and environment availability.
- OCC contention failure rates during load tests.
- Re-testing and regression verification upon bug fixes.

---

## 17. Roles & Responsibilities

| Role | Responsibility |
| :--- | :--- |
| **Workforce Manager / Dispatcher** | Operational scheduling role; authorized for standard in-progress and future splits (`splitDate >= today - 7 days`). |
| **System Administrator** | Administrative role; authorized for standard actions plus historic lockout overrides (`splitDate < today - 7 days` with `overrideHistoricLockout: true`). |
| **QA / Test Engineer** | Test plan design, test case engineering, automated test execution, performance benchmarking, and defect reporting. |

---

## 18. Requirements Traceability Matrix (RTM)

| Requirement | Scenario ID | UI | API | DB | Regression | Security | Integration | API Perf | UI Perf | Smoke | Critical | Risk-Based |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `REQ-EDRU-001` | `SCN-EDRU-001` | ✓ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✓ |
| `REQ-EDRU-001` | `SCN-EDRU-002` | ✓ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✓ | N/A | N/A |
| `REQ-EDRU-001` | `SCN-EDRU-003` | ✓ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| `REQ-EDRU-001` | `SCN-EDRU-027` | ✓ | N/A | N/A | ✓ | N/A | N/A | N/A | N/A | N/A | N/A | ✓ |
| `REQ-EDRU-001` | `SCN-EDRU-028` | ✓ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✓ |
| `REQ-EDRU-002` | `SCN-EDRU-004` | ✓ | N/A | N/A | ✓ | N/A | N/A | N/A | N/A | ✓ | N/A | N/A |
| `REQ-EDRU-003` | `SCN-EDRU-005` | ✓ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✓ | N/A | N/A |
| `REQ-EDRU-004` | `SCN-EDRU-006` | ✓ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| `REQ-EDRU-005` | `SCN-EDRU-017` | N/A | ✓ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| `REQ-EDRU-006` | `SCN-EDRU-007` | ✓ | N/A | ✓ | N/A | N/A | ✓ | N/A | N/A | ✓ | ✓ | ✓ |
| `REQ-EDRU-006` | `SCN-EDRU-014` | N/A | ✓ | ✓ | N/A | N/A | ✓ | N/A | N/A | ✓ | ✓ | N/A |
| `REQ-EDRU-006` | `SCN-EDRU-019` | N/A | ✓ | ✓ | N/A | N/A | N/A | N/A | N/A | N/A | ✓ | ✓ |
| `REQ-EDRU-006` | `SCN-EDRU-020` | N/A | N/A | N/A | N/A | N/A | ✓ | N/A | N/A | N/A | N/A | N/A |
| `REQ-EDRU-007` | `SCN-EDRU-008` | ✓ | N/A | ✓ | N/A | N/A | N/A | N/A | N/A | ✓ | ✓ | ✓ |
| `REQ-EDRU-007` | `SCN-EDRU-015` | N/A | ✓ | ✓ | N/A | N/A | N/A | N/A | N/A | ✓ | ✓ | N/A |
| `REQ-EDRU-008` | `SCN-EDRU-009` | ✓ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✓ | ✓ |
| `REQ-EDRU-009` | `SCN-EDRU-010` | ✓ | ✓ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✓ | N/A |
| `REQ-EDRU-009` | `SCN-EDRU-011` | N/A | ✓ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| `REQ-EDRU-010` | `SCN-EDRU-012` | ✓ | ✓ | N/A | N/A | ✓ | N/A | N/A | N/A | N/A | ✓ | N/A |
| `REQ-EDRU-010` | `SCN-EDRU-013` | ✓ | ✓ | N/A | N/A | ✓ | N/A | N/A | N/A | N/A | ✓ | N/A |
| `REQ-EDRU-011` | `SCN-EDRU-016` | N/A | ✓ | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✓ | ✓ |
| `REQ-EDRU-011` | `SCN-EDRU-021` | N/A | ✓ | N/A | ✓ | N/A | N/A | N/A | N/A | N/A | N/A | ✓ |
| `REQ-EDRU-012` | `SCN-EDRU-018` | N/A | N/A | ✓ | N/A | ✓ | N/A | N/A | N/A | N/A | N/A | N/A |
| `PERF-API-EDRU-001..006` | `SCN-EDRU-022` | N/A | N/A | N/A | N/A | N/A | N/A | ✓ | N/A | N/A | N/A | N/A |
| `PERF-API-EDRU-008` | `SCN-EDRU-023` | N/A | N/A | N/A | N/A | N/A | N/A | ✓ | N/A | N/A | ✓ | ✓ |
| `PERF-API-EDRU-007` | `SCN-EDRU-024` | N/A | N/A | N/A | N/A | N/A | N/A | ✓ | N/A | N/A | N/A | N/A |
| `PERF-API-EDRU-009` | `SCN-EDRU-025` | N/A | N/A | N/A | N/A | N/A | N/A | ✓ | N/A | N/A | N/A | N/A |
| `PERF-UI-EDRU-001..006` | `SCN-EDRU-026` | N/A | N/A | N/A | N/A | N/A | N/A | N/A | ✓ | N/A | N/A | N/A |

---

## 19. Risks

| Risk ID | Risk | Impact | Likelihood | Mitigation | Scenario IDs |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **RSK-EDRU-001** | Historical Allocation Data Loss: Erroneous split boundary calculations or accidental start date selection erase past workforce allocations. | Critical | Medium | Validate start-date warning dialog; assert exact `[startDate, effectiveDate - 1 day]` boundary on original assignment record. | `SCN-EDRU-007`, `SCN-EDRU-008`, `SCN-EDRU-009` |
| **RSK-EDRU-002** | OCC Mutation Race Conditions: Stale version overwriting concurrent updates or failing to reject stale mutations. | High | High | Rigorous OCC concurrency tests asserting `409 Conflict` on stale version and +1 version increment. | `SCN-EDRU-016`, `SCN-EDRU-021`, `SCN-EDRU-023` |
| **RSK-EDRU-003** | Split Atomicity Failure: System shortens original assignment but fails to create replacement record or open labor request due to unhandled backend failure. | Critical | Low | Validate atomic transaction rollback ensuring zero partial mutations. | `SCN-EDRU-019` |
| **RSK-EDRU-004** | Gantt Display Out-of-Sync: Gantt timeline view fails to render both split segments without manual page refresh. | Medium | High | Include UI page reload and client-side cache refresh validation steps in UI tests. | `SCN-EDRU-027` |
| **RSK-EDRU-005** | Automation Fragility on Gantt Right-Click: Synthetic browser right-click events in Playwright may fail on canvas/Gantt timeline elements. | Medium | High | Provide primary automated test coverage via Assignment Details Drawer and Worker Profile tabs. | `SCN-EDRU-001` |
| **RSK-EDRU-006** | Duplicate Future Records on Retry: User double-clicks confirm button or network retries trigger duplicate entities. | High | Medium | Verify client-side button disablement and API idempotency behavior. | `SCN-EDRU-028` |

---

## 20. Information Gaps

| Gap ID | Area | Missing Information | QA Impact | Required Clarification |
| :--- | :--- | :--- | :--- | :--- |
| **GAP-EDRU-001** | API Contract | Exact success response schema and HTTP status code (`200 OK` vs `201 Created`) for `POST .../split`. | Automated API contract assertions cannot verify response body or status code deterministically. | Confirm response payload schema and HTTP status code. |
| **GAP-EDRU-002** | Supporting APIs | Exact endpoint paths and query schemas for GET labor request, GET replacement assignment, and conflict detection. | Automated API tests must rely on assumed or mock endpoint paths. | Provide OpenAPI / Swagger specifications for supporting endpoints. |
| **GAP-EDRU-003** | Boundary Behavior | System behavior when `splitDate == assignment.endDate` (splitting on the last day of assignment). | Test cases cannot verify whether a 1-day future segment is created or if specific edge handling applies. | Confirm expected outcome when splitting on assignment end date. |
| **GAP-EDRU-004** | Sequential Splits | System behavior and limits when an already-shortened assignment is split multiple times in succession. | Sequential split edge cases lack documented expected outcomes. | Confirm whether multiple splits on the same assignment are permitted. |
| **GAP-EDRU-005** | Multi-Tenancy | Whether the 7-day historic lockout threshold is tenant-configurable or hardcoded. | Tenant-level boundary testing cannot be verified. | Confirm if 7-day threshold is global or tenant-configured. |
| **GAP-EDRU-006** | Idempotency | Support for idempotency keys or duplicate request handling on `POST .../split`. | Automated retry test cases cannot assert duplicate prevention mechanisms. | Confirm if backend supports idempotency keys for split requests. |
| **GAP-EDRU-007** | Performance SLOs | Formal contractual latency SLOs (p95/p99), peak RPS, and VU concurrency limits. | Performance engineers cannot establish automated pass/fail release gates without confirmed thresholds. | Obtain approved NFR performance targets from product/engineering owners. |

---

## 21. Coverage Gaps

| Gap ID | Requirement | Missing Coverage | Impact | Action |
| :--- | :--- | :--- | :--- | :--- |
| **COV-GAP-001** | `REQ-EDRU-005` | Formal API contract validation for out-of-range `splitDate` (e.g., `splitDate < startDate` or `splitDate > endDate`) | API might accept out-of-range split dates if UI bypass occurs. | Addressed via edge/boundary scenario `SCN-EDRU-017` and downstream test cases. |
| **COV-GAP-002** | `REQ-EDRU-012` | Specific audit log querying endpoint or database schema | Cannot assert audit log persistence without direct DB access or audit API. | Covered via DB verification scenario `SCN-EDRU-018`; requires DB credentials in test environment. |

---

## 22. Test Case / Execution Readiness

Every scenario defined in Section 6 provides:
- Objective, layer, type, and priority.
- Requirement mapping and data category.
- Business outcome and pack classification (Smoke, Critical, Risk-Based, Standard).

The Test Plan contains sufficient scenario definition for downstream Test Case Engineering to generate detailed execution-ready test cases (preconditions, steps, expected results, automation feasibility) without inventing requirements.

Execution readiness status: **READY FOR TEST CASE ENGINEERING**.

---

## 23. Execution Model

Execution will occur in two stages post-generation:

### 23.1 After Feature Build Release
`Smoke Pack (7 Scenarios) -> Critical Suite (11 Scenarios) -> Standard Functional Validation -> Regression Suite -> Performance Benchmarking`

### 23.2 Post-Deployment / Staging Verification
`Smoke Pack -> Risk-Based Pack (9 Scenarios) -> Production-Safe Critical Checks`

Execution results and evidence collection belong in separate Execution Artifacts.

---

## 24. Change Control / Versioning

| Version | Date | Author / Source | Change Summary |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-09-23 | QA Lead / `QA_specAnalysis.md` | Initial comprehensive Test Plan created following `testplan.md` skill standards. Consolidates 28 atomic scenarios, RTM, Smoke/Critical/Risk-Based packs, and performance strategy. |
