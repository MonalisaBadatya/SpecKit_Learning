# QA Specification Analysis: Effective Date Reassign and Unassign

**Feature:** `feat-effective-date-reassign-unassign`  
**Epic:** `epic-assignments`  
**Source Specification:** `specs/epic-assignments/feat-effective-date-reassign-unassign/Spec.md` (Source: `specs/Updated_complex_spec.md`)  
**Analysis Date:** 2026-09-02  
**Document Version:** 1.0  
**Analysis Status:** Complete  

---

## 1. Scope / Purpose

CMMA is a construction workforce management platform where workers (e.g., Ironworkers) are assigned to construction projects across defined date ranges.

When an assignment is in progress (defined as `startDate < today`), managers cannot simply delete or swap workers, as doing so would destroy historical workforce allocation records up to the present day.

This feature introduces an **Effective Date** mechanism for **Unassign** and **Reassign** operations on in-progress assignments. When triggered, the system splits the assignment at the selected effective date into two distinct records:
1. **Historical Segment (`[originalStartDate, effectiveDate - 1 day]`)**: Preserved on record with the original worker.
2. **Future Segment (`[effectiveDate, originalEndDate]`)**: Released from the original worker:
   - **Unassign**: Generates an open labor request slot (`laborRequest`) in `OPEN` status in the dispatch queue.
   - **Reassign**: Creates a new assignment covering the future segment for the selected replacement worker.

For future assignments (`startDate >= today`), the effective date mechanism is bypassed, executing standard full unassign or reassign operations immediately without presenting a date picker.

---

## 2. Actors & Permissions

| Actor / Role | Description & Permissions | Explicit Actions Supported | Status / Evidence |
| :--- | :--- | :--- | :--- |
| **Scheduler / Workforce Manager / Dispatcher** | Standard workforce operational role with scheduling permissions. | • Initiate Unassign/Reassign via Gantt chart, Drawer, or Worker Assignments list<br>• Select Effective Date<br>• Select replacement worker for Reassign<br>• Confirm start-date equality acknowledgement<br>• Confirm replacement worker conflict override (`overrideConflict: true`) | **Specified**<br>Source: Spec extract §1, §2 (Touchpoints & Edge Cases), §3 |
| **System Administrator** | Administrative privileged role. | • Authorize and execute historic lockout overrides when `splitDate < today - 7 days` (`overrideHistoricLockout: true`) | **Specified**<br>Source: Spec extract §2 (Edge Case Matrix), §3 |
| **Original Worker** | Worker currently allocated to the assignment. | • Passive entity; retains assignment history for `[startDate, effectiveDate - 1 day]` | **Specified**<br>Source: Spec extract §1, §2 |
| **Replacement Worker (`targetWorkerId`)** | Target worker selected during Reassign. | • Assigned to new assignment covering `[effectiveDate, originalEndDate]` | **Specified**<br>Source: Spec extract §1, §2 |
| **Project Manager** | Mentioned in context of project ownership and labor requests. | • Specific role permissions for this endpoint not explicitly defined | **INFORMATION GAP**<br>Source: Spec §1, §3 |

---

## 3. Functional Requirements

| Requirement ID | Description | Status | Evidence |
| :--- | :--- | :--- | :--- |
| **REQ-EDRU-001** | System shall activate the Effective Date mechanism when an Unassign or Reassign action is initiated on an in-progress assignment where `assignment.startDate < today`. | Specified | Spec §2 (Trigger condition, AC-1, AC-2) |
| **REQ-EDRU-002** | System shall bypass the Effective Date picker and execute a standard full unassign or reassign when `assignment.startDate >= today`. | Specified | Spec §2 (AC-3, Trigger condition) |
| **REQ-EDRU-003** | System shall default the effective date picker to `today` when `today <= assignment.endDate`. | Specified | Spec §2 (Date constraints, AC-1) |
| **REQ-EDRU-004** | System shall default the effective date picker to `assignment.startDate` when `today > assignment.endDate` (expired assignment). | Specified | Spec §2 (Date constraints) |
| **REQ-EDRU-005** | System shall enforce effective date selection within the assignment range: `startDate <= effectiveDate <= endDate`. | Specified | Spec §2 (Date constraints) |
| **REQ-EDRU-006** | Upon confirming Unassign on an in-progress assignment, the system shall update the original assignment to span `[originalStartDate, effectiveDate - 1 day]` with incremented `version`, and create a new `laborRequest` in `OPEN` status spanning `[effectiveDate, originalEndDate]`. | Specified | Spec §2 (AC-1, Execution outcomes) |
| **REQ-EDRU-007** | Upon confirming Reassign on an in-progress assignment, the system shall update the original assignment to span `[originalStartDate, effectiveDate - 1 day]` with incremented `version`, and create a new assignment for `targetWorkerId` spanning `[effectiveDate, originalEndDate]`. | Specified | Spec §2 (AC-2, Execution outcomes) |
| **REQ-EDRU-008** | If the user selects `effectiveDate == assignment.startDate`, the system shall require explicit user acknowledgement that no historical segment will be preserved, and upon confirmation replace/unassign the full assignment from day one. | Specified | Spec §1, §2 (Edge case matrix) |
| **REQ-EDRU-009** | System shall detect if a selected replacement worker has an overlapping active assignment on another project during `[splitDate, endDate]` and prompt a conflict warning requiring explicit override confirmation (`overrideConflict: true`). | Specified | Spec §2 (Edge case matrix, API contract) |
| **REQ-EDRU-010** | System shall enforce a historic lockout if `splitDate < today - 7 days`, blocking Workforce Managers and requiring a System Admin with `overrideHistoricLockout: true` to execute the split. | Specified | Spec §2 (Edge case matrix, API contract) |
| **REQ-EDRU-011** | System shall validate the Optimistic Concurrency Control (OCC) `version` field against the database before applying changes, returning HTTP `409 Conflict` if mismatched. | Specified | Spec §2 (API contract, Edge case matrix) |
| **REQ-EDRU-012** | System shall atomically write an audit log entry `SPLIT_ASSIGNMENT` containing the actor, effective date, and segment boundaries upon every successful split. | Specified | Spec §2 (API contract step 5), §6.13 |

---

## 4. Business Rules

### 4.1 Split Calculation & Outcome Matrix

| Segment | Target Entity | Date Range | Worker | System Action | Status / Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Historical Segment (Preserved)** | Original Assignment | `[startDate, effectiveDate - 1 day]` | Original Worker | `endDate` updated to `effectiveDate - 1 day`; `version` incremented by 1 | **Specified**<br>Spec §2 (Execution outcomes) |
| **Future Segment (Unassign)** | New Labor Request | `[effectiveDate, endDate]` | `None` | New `laborRequest` created in `OPEN` status in dispatch queue | **Specified**<br>Spec §2 (Execution outcomes) |
| **Future Segment (Reassign)** | New Assignment | `[effectiveDate, endDate]` | Replacement Worker (`targetWorkerId`) | New assignment created spanning future dates | **Specified**<br>Spec §2 (Execution outcomes) |

### 4.2 Business Rules Specification

| Rule ID | Category | Rule Statement | Enforcement Condition | Status / Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **BR-EDRU-001** | Activation Trigger | Effective date flow activates if and only if `startDate < today`. | If `startDate >= today`, full pass-through unassign/reassign occurs without effective date modal. | **Specified**<br>Spec §2 |
| **BR-EDRU-002** | Date Boundary Clamp | The effective date must strictly satisfy `startDate <= effectiveDate <= endDate`. | Date picker `min = startDate`, `max = endDate`. | **Specified**<br>Spec §2 |
| **BR-EDRU-003** | Default Date Selection | Default date is `today` if `today <= endDate`; otherwise `startDate` if `today > endDate`. | Evaluated at modal opening. | **Specified**<br>Spec §2 |
| **BR-EDRU-004** | Start-Date Boundary Rule | Setting `effectiveDate == startDate` produces zero historical days. | Requires explicit modal acknowledgement before executing full replacement from day one. | **Specified**<br>Spec §1, §2 |
| **BR-EDRU-005** | Atomicity of Mutation | Shortening original assignment and creating future segment/slot must succeed together. | Executed as single atomic transaction in backend API. | **Specified**<br>Spec §2 (API flow), §6.9 |
| **BR-EDRU-006** | OCC Version Increment | Assignment version increments by exactly 1 on every successful split mutation. | Sequential API calls require fresh GET to obtain updated version. | **Specified**<br>Spec §2 (API flow, State notes), §6.7 |
| **BR-EDRU-007** | Scheduling Conflict Guard | Replacement worker with overlapping assignment on another project during `[splitDate, endDate]` flags conflict. | Blocked unless request payload contains `overrideConflict: true`. | **Specified**<br>Spec §2 (Edge cases) |
| **BR-EDRU-008** | Historic Lockout Guard | Split date older than 7 days (`splitDate < today - 7 days`) is locked. | Blocked for standard Workforce Manager; allowed only for System Admin with `overrideHistoricLockout: true`. | **Specified**<br>Spec §2 (Edge cases) |

---

## 5. UI Behavior & Touchpoints

### 5.1 Entry Points

| Entry Point ID | Surface | Trigger Action | Behavioral Description | Status / Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **UI-EDRU-001** | **Gantt Chart Timeline** | Right-click assignment bar → select "Unassign" or "Reassign" | Opens context menu on right-click. *Note: Context menu interactions may not reliably trigger with synthetic mouse events in automation.* | **Specified**<br>Spec §2 (Entry Point 1), §4 |
| **UI-EDRU-002** | **Assignment Details Drawer** | Open slide-out drawer → click "Unassign" or "Reassign" button | Drawer displays assignment details with explicit action buttons. | **Specified**<br>Spec §2 (Entry Point 2) |
| **UI-EDRU-003** | **Worker Assignments List Tab** | Worker profile → Assignments tab → row action options | Action dropdown/buttons on assignment row trigger flow. | **Specified**<br>Spec §2 (Entry Point 3) |

### 5.2 Modal Workflows & Visual Components

| Workflow | Step | Component | Behavior & Visual Elements | Status / Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **Unassign Flow** | 1 | `UnassignConfirmationModal` | • Date picker: `min=startDate`, `max=endDate`, `default=today`<br>• Preview badges:<br>  - `[Preserved History: startDate -> effectiveDate - 1 day]`<br>  - `[Unassigned Remainder: effectiveDate -> endDate]`<br>• Confirm button triggers `POST /split` (without `targetWorkerId`) | **Specified**<br>Spec §2 (UI component touchpoints) |
| **Reassign Flow** | 1 | `ReassignEffectiveDateModal` | • Date picker: user chooses effective date and confirms | **Specified**<br>Spec §2 |
| **Reassign Flow** | 2 | `FillOpenRequestDrawer` | • Candidate list filtered against `[effectiveDate, endDate]`<br>• User selects replacement worker and confirms<br>• Triggers `POST /split` (with `targetWorkerId`) | **Specified**<br>Spec §2 |
| **Future Assignment** | 1 | None (Direct Execution) | Bypasses date modals and executes standard full unassign/reassign immediately. | **Specified**<br>Spec §2 |
| **Start Date Warning** | 1 | Confirmation Dialog | Warns that no historical record will be preserved when `effectiveDate == startDate`. | **Specified**<br>Spec §2 |
| **Conflict Warning** | 1 | Conflict Modal | Displays scheduling conflict details for replacement worker; requires confirmation to override. | **Specified**<br>Spec §2 |
| **UI State Handling** | - | Loading / State Sync | • Shows loading/progress state during execution<br>• Prevents duplicate submissions<br>• *Limitation: Gantt view may require page reload to reflect both segments.* | **Specified**<br>Spec §2 (State notes), §7.3, §7.4 |

---

## 6. Validation & Error Handling

| Validation ID | Condition | Expected System Behavior / HTTP Status | Status / Evidence |
| :--- | :--- | :--- | :--- |
| **VAL-EDRU-001** | Submitted `version` does not match database version | Returns HTTP `409 Conflict`. User must re-read assignment version before retrying. | **Specified**<br>Spec §2 (API contract, Edge cases) |
| **VAL-EDRU-002** | `splitDate < today - 7 days` without System Admin / `overrideHistoricLockout: true` | Request is blocked; returns blocked error response. | **Specified**<br>Spec §2 (Edge case matrix) |
| **VAL-EDRU-003** | Replacement worker has scheduling overlap and `overrideConflict: false` | Conflict warning raised in UI / rejected by API. | **Specified**<br>Spec §2 (Edge case matrix) |
| **VAL-EDRU-004** | `splitDate` outside `[startDate, endDate]` | UI date picker restricts input to `min=startDate, max=endDate`. API validation details for out-of-range dates not explicitly specified. | **Ambiguous / INFORMATION GAP**<br>Spec §2 |
| **VAL-EDRU-005** | `splitMode` value other than `"date"` | Spec states `splitMode` is always `"date"`. API error schema for invalid mode is not specified. | **INFORMATION GAP**<br>Spec §2 (API contract) |

---

## 7. Authentication / MFA / SSO

| Control | Specification Details | Status / Evidence |
| :--- | :--- | :--- |
| **Authentication Scheme** | Standard authentication token / session required to identify actor and role. | **Specified** (Implicit in actor roles §2, §6.2)<br>Exact token type (e.g. Bearer JWT) is **INFORMATION GAP** |
| **MFA Requirements** | No Multi-Factor Authentication requirements are defined in the specification. | **INFORMATION GAP** |
| **SSO Integration** | No Single Sign-On integration details are defined in the specification. | **INFORMATION GAP** |

---

## 8. Session / Logout / Route Protection

| Control | Specification Details | Status / Evidence |
| :--- | :--- | :--- |
| **Session Lifecycle & Timeout** | Session duration, idle timeout, and token refresh behavior are not documented. | **INFORMATION GAP** |
| **Route Protection & Unauthorized Behavior** | UI route guards and exact redirect behavior on session expiry/unauthorized access are not documented. | **INFORMATION GAP** |

---

## 9. APIs and Contracts

### 9.1 Split Mutation API Contract

* **Method / Path:** `POST /api/workforce/scheduling/assignments/:id/split`
* **Content-Type:** `application/json`
* **Status:** **Specified** (Spec §2)

#### Request Payload Schema

```json
{
  "splitMode": "date",
  "splitDate": "2026-08-16",
  "version": 3,
  "targetWorkerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "overrideConflict": false,
  "overrideHistoricLockout": false
}
```

#### Field Specifications

| Field | Type | Required | Description | Status / Evidence |
| :--- | :--- | :--- | :--- | :--- |
| `splitMode` | `string` (`"date"`) | Yes | Always `"date"` for this feature. | **Specified** (Spec §2) |
| `splitDate` | `string` (ISO date `YYYY-MM-DD`) | Yes | The effective date where the split occurs. | **Specified** (Spec §2) |
| `version` | `integer` | Yes | Current OCC version of the assignment (must match DB). | **Specified** (Spec §2) |
| `targetWorkerId` | `string` (UUID) / `null` | No | Replacement worker ID for Reassign; omit/null for Unassign. | **Specified** (Spec §2) |
| `overrideConflict` | `boolean` | No | Set `true` to confirm override of scheduling conflict. | **Specified** (Spec §2) |
| `overrideHistoricLockout` | `boolean` | No | Set `true` to override historic lockout when `splitDate < today - 7 days`. | **Specified** (Spec §2) |

#### Backend Execution Flow (Atomic Transaction)
1. Validate OCC `version` against current database value. Returns `409 Conflict` on mismatch.
2. Validate role authorization (System Admin required if `splitDate < today - 7 days`).
3. Update original assignment: `endDate = splitDate - 1 day`, `version = version + 1`.
4. Create future record:
   - For **Reassign**: Create new assignment for `targetWorkerId` spanning `[splitDate, originalEndDate]`.
   - For **Unassign**: Create new `laborRequest` in `OPEN` status spanning `[splitDate, originalEndDate]`.
5. Write audit log entry `SPLIT_ASSIGNMENT`.

### 9.2 Referenced Supporting APIs

| API Purpose | Method / Endpoint | Path/Query Params | Output / Behavior | Status / Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **GET Assignment (Read OCC Version)** | `GET /api/workforce/scheduling/assignments/:id` | `:id` (Assignment UUID) | Returns current assignment details including `version`. | **Specified** (Spec §1, §6.1, §6.10) |
| **GET Resulting Labor Request** | Unspecified endpoint | Labor request ID / Project query | Returns created labor request in `OPEN` status covering `[splitDate, originalEndDate]`. | **Ambiguous / INFORMATION GAP** (Referenced in §6.1, §6.4; exact endpoint path omitted) |
| **GET Resulting Assignment** | Unspecified endpoint | Assignment ID / Worker query | Returns replacement assignment covering `[splitDate, originalEndDate]`. | **Ambiguous / INFORMATION GAP** (Referenced in §6.1, §6.4; exact endpoint path omitted) |
| **Conflict Detection API** | Unspecified endpoint | Worker ID, Date range | Evaluates worker overlap during `[splitDate, endDate]`. | **Ambiguous / INFORMATION GAP** (Referenced in §6.1, §6.4, §6.11; exact endpoint path omitted) |
| **Audit Log API** | Unspecified endpoint | Assignment / Audit ID | Retrieves `SPLIT_ASSIGNMENT` records. | **Ambiguous / INFORMATION GAP** (Referenced in §6.1, §6.13; exact endpoint path omitted) |

---

## 10. Database Entities / Schema

| Entity | Field | Type | Constraints / Behavior | Status / Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **`assignment`** | `id` | UUID | Primary Key | Specified (Spec §2) |
| | `startDate` | Date | Assignment start date | Specified (Spec §2) |
| | `endDate` | Date | Mutated to `splitDate - 1 day` on split | Specified (Spec §2) |
| | `version` | Integer | Incremented by 1 on split; OCC concurrency guard | Specified (Spec §2) |
| | `workerId` | UUID | Retained for original worker on shortened record | Specified (Spec §2) |
| | `projectId` / metadata | Unspecified | Project / labor request associations | **INFORMATION GAP** |
| **`laborRequest`** | `id` | UUID | Primary Key | Specified (Spec §2) |
| | `startDate` | Date | Set to `splitDate` | Specified (Spec §2) |
| | `endDate` | Date | Set to `originalEndDate` | Specified (Spec §2) |
| | `status` | String (`OPEN`) | Initial status for unassigned remainder | Specified (Spec §2) |
| **`auditLog`** | `action` | String (`SPLIT_ASSIGNMENT`) | Audit action type | Specified (Spec §2) |
| | `actor` | String / UUID | User initiating split | Specified (Spec §2) |
| | `effectiveDate` | Date | Date of split | Specified (Spec §2) |
| | `segmentBoundaries` | JSON / Text | Details of historical and future segments | Specified (Spec §2) |
| | `timestamp` | Timestamp | Timestamp of split | Specified (Spec §6.13) |

> **INFORMATION GAP:** Exact database engine, physical table names, column constraints, indexes, and foreign keys are not documented in the source.

---

## 11. Security, Rate Limits & Tenant Isolation

| Security Dimension | Specified Requirements | Information Gaps |
| :--- | :--- | :--- |
| **Role-Based Access Control (RBAC)** | • Standard Unassign/Reassign: Workforce Manager / Dispatcher.<br>• Historic lockout override (`splitDate < today - 7 days`): System Admin only. Workforce Manager is blocked. | Exact permission strings and 403 Forbidden payload format are not specified. |
| **Rate Limiting** | Gateway, per-user, per-IP, token, and burst limits must be documented and tested (Spec §6.17). | Specific rate limit thresholds (e.g. requests/minute) and throttling status codes are not specified. |
| **Tenant Isolation** | Multi-tenant platform context implied. | Whether the 7-day historic lockout threshold is tenant-configurable is explicitly marked as requiring confirmation (Spec §8.1). |
| **Data Protection / Audit** | Tamper-evident audit log `SPLIT_ASSIGNMENT` written on every successful mutation. | Data encryption at rest / in transit details are not documented. |

---

## 12. Errors & Dependencies

### 12.1 Explicit Error Conditions

| Error Scenario | Trigger | System Response / HTTP Code | Recovery / Next Steps | Status / Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **OCC Version Conflict** | Submitted `version` does not match database | `409 Conflict` | Client must perform fresh `GET /assignment` and retry with new version. | **Specified**<br>Spec §2 |
| **Unauthorized Historic Lockout** | `splitDate < today - 7 days` submitted by non-Admin or without `overrideHistoricLockout: true` | Blocked response | Request rejected; requires System Admin credentials and override flag. | **Specified**<br>Spec §2 |
| **Unresolved Scheduling Conflict** | Selected replacement worker has conflicting assignment and `overrideConflict: false` | Conflict warning / rejection | Manager must explicitly confirm conflict override. | **Specified**<br>Spec §2 |

### 12.2 Dependencies

1. **Pre-existing Test Data Prerequisites (Spec §3, §4, §6.3):**
   - Active project record.
   - Labor request record on the project.
   - In-progress assignment record where `startDate < today` (cannot be created via UI in the same session; must be pre-seeded).
   - Future assignment record where `startDate >= today`.
   - Second available worker without scheduling conflicts (for clean Reassign).
   - Second worker with active overlapping assignment (for Conflict Reassign).
2. **Dispatch Queue Integration:** Open labor requests created via Unassign must flow into the dispatch queue (Spec §2).
3. **OCC Read-Before-Write Dependency:** Every split API call strictly depends on a prior read to capture the current `version` (Spec §1, §2, §4).

---

## 13. Risks & Regression Impact

| Risk ID | Risk Description | Root Cause / Context | Evidence in Spec |
| :--- | :--- | :--- | :--- |
| **RSK-EDRU-001** | **Historical Allocation Data Loss** | Incorrect calculation of effective date boundary or accidental selection of start date without acknowledgement erases historical records. | Spec §1, §2 |
| **RSK-EDRU-002** | **OCC Mutation Race Conditions** | Concurrent edits/splits on the same assignment without re-fetching version produce `409 Conflict` or inconsistent data. | Spec §1, §2, §6.7 |
| **RSK-EDRU-003** | **Split Atomicity Failure** | Network/database failure midway through transaction shortening original assignment but failing to create new labor request/assignment. | Spec §6.9, §6.14 |
| **RSK-EDRU-004** | **Gantt Display Out-of-Sync** | Gantt chart timeline may fail to visually reflect both segments without a manual page reload. | Spec §2 (State notes), §7.4 |
| **RSK-EDRU-005** | **Automation Fragility on Gantt Right-Click** | Synthetic mouse events in browser automation tools may fail to open the Gantt context menu. | Spec §3, §4, §7.4 |
| **RSK-EDRU-006** | **Duplicate Future Records on Retry** | Retrying a timed-out split request without idempotency keys risks creating duplicate labor requests or assignments. | Spec §6.16 |

---

## 14. Ambiguities & Information Gaps

| Gap ID | Area | Missing Information | QA Impact |
| :--- | :--- | :--- | :--- |
| **GAP-EDRU-001** | **API Success Schema** | Spec does not document the response JSON schema or exact success status code (`200 OK` vs `201 Created`) for `POST .../split`. | API contract tests cannot assert response body fields or status code deterministically without confirmation. |
| **GAP-EDRU-002** | **Supporting API Contracts** | Exact endpoint paths and query contracts for GET labor request, GET replacement assignment, and Conflict detection are omitted. | Direct API outcome verification relies on assumed or unconfirmed endpoints. |
| **GAP-EDRU-003** | **End-Date Split Boundary** | System behavior when `splitDate == assignment.endDate` (splitting on the last day) is not explicitly defined. | Testers cannot verify whether a 1-day future segment is created or if specific edge handling applies. |
| **GAP-EDRU-004** | **Sequential Splits on Same Record** | System behavior when an already-shortened assignment is split a second time is not documented. | Multi-split test scenarios lack clear expected results. |
| **GAP-EDRU-005** | **Tenant Lockout Configurability** | Whether the 7-day historic lockout threshold is tenant-configurable or hardcoded is not confirmed. | Tenant-level boundary tests cannot be finalized. |
| **GAP-EDRU-006** | **Idempotency Support** | Support for idempotency keys or duplicate request handling on `POST .../split` is unconfirmed. | Retry test cases cannot assert duplicate prevention mechanisms. |

---

## 15. API Performance Requirements

> **Context:** The specification includes proposed performance targets in Section 6.4 and Section 8.1, explicitly noting they are **initial proposed targets requiring confirmation from product/API owners** before acting as release gates.

| ID | API / Operation | Metric | Proposed Target | Workload / Condition | Status | Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **PERF-API-EDRU-001** | `GET assignment / current version` | Latency (p50 / p95 / p99) | p50 <= 300 ms<br>p95 <= 750 ms<br>p99 <= 1,500 ms | Normal / Peak load | **Ambiguous** (Proposed target requiring confirmation) | Spec §6.4, §8.1 |
| **PERF-API-EDRU-002** | `POST split - Unassign` | Latency (p50 / p95 / p99) | p50 <= 500 ms<br>p95 <= 1,000 ms<br>p99 <= 2,000 ms | Normal / Peak load | **Ambiguous** (Proposed target requiring confirmation) | Spec §6.4, §8.1 |
| **PERF-API-EDRU-003** | `POST split - Reassign` | Latency (p50 / p95 / p99) | p50 <= 750 ms<br>p95 <= 1,500 ms<br>p99 <= 3,000 ms | Normal / Peak load | **Ambiguous** (Proposed target requiring confirmation) | Spec §6.4, §8.1 |
| **PERF-API-EDRU-004** | `GET resulting labor request` | Latency (p50 / p95 / p99) | p50 <= 300 ms<br>p95 <= 750 ms<br>p99 <= 1,500 ms | Normal / Peak load | **Ambiguous** (Proposed target requiring confirmation) | Spec §6.4, §8.1 |
| **PERF-API-EDRU-005** | `GET resulting assignment` | Latency (p50 / p95 / p99) | p50 <= 300 ms<br>p95 <= 750 ms<br>p99 <= 1,500 ms | Normal / Peak load | **Ambiguous** (Proposed target requiring confirmation) | Spec §6.4, §8.1 |
| **PERF-API-EDRU-006** | `Conflict detection API` | Latency (p50 / p95 / p99) | p50 <= 500 ms<br>p95 <= 1,000 ms<br>p99 <= 2,000 ms | Normal / Peak load | **Ambiguous** (Proposed target requiring confirmation) | Spec §6.4, §8.1 |
| **PERF-API-EDRU-007** | Split API Error Rate | `http_req_failed` | < 1% (excluding expected OCC 409s) | Normal / Peak load | **Ambiguous** (Proposed threshold requiring confirmation) | Spec §6.8, §8.1 |
| **PERF-API-EDRU-008** | OCC Contention Handling | Mutation & Conflict rate | Return `409 Conflict` on stale version without data mutation; exactly 1 version increment on success | Dedicated OCC contention load | **Specified** | Spec §6.7 |
| **PERF-API-EDRU-009** | End-to-End Workflow Latency | Total workflow time | Measure total duration: GET assignment → Read version → POST split → GET resulting state | End-to-end user journey | **Specified** | Spec §6.10 |

---

## 16. UI Performance Requirements

| ID | UI Component / Action | Action / Event | Metric | Proposed Target | Workload / Condition | Status | Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **PERF-UI-EDRU-001** | Assignment Details Drawer | Open Drawer | Transition Latency | p95 <= 2.0 s | In-progress assignment | **Ambiguous** (Proposed target requiring confirmation) | Spec §7.2, §8.1 |
| **PERF-UI-EDRU-002** | `UnassignConfirmationModal` | Open Modal | Render Latency | p95 <= 2.0 s | Click Unassign | **Ambiguous** (Proposed target requiring confirmation) | Spec §7.2, §8.1 |
| **PERF-UI-EDRU-003** | `ReassignEffectiveDateModal` | Open Modal | Render Latency | p95 <= 2.0 s | Click Reassign | **Ambiguous** (Proposed target requiring confirmation) | Spec §7.2, §8.1 |
| **PERF-UI-EDRU-004** | Date Picker & Preview Badges | Render Pickers & Badges | Render Latency | p95 <= 2.0 s | Modal visible | **Ambiguous** (Proposed target requiring confirmation) | Spec §7.2, §8.1 |
| **PERF-UI-EDRU-005** | `FillOpenRequestDrawer` | Open Drawer | Render Latency | p95 <= 2.0 s | Confirm effective date | **Ambiguous** (Proposed target requiring confirmation) | Spec §7.2, §8.1 |
| **PERF-UI-EDRU-006** | Candidate List | Render candidate list | List Render Latency | p95 <= 2.0 s | Drawer opened | **Ambiguous** (Proposed target requiring confirmation) | Spec §7.2, §8.1 |
| **PERF-UI-EDRU-007** | UI Success Notification | Show success state | Visual Feedback Latency | p95 <= 2.0 s | Following API response | **Ambiguous** (Proposed target requiring confirmation) | Spec §7.2, §8.1 |
| **PERF-UI-EDRU-008** | Actionable API Error | Render error toast/modal | Visual Feedback Latency | p95 <= 2.0 s | Following API failure | **Ambiguous** (Proposed target requiring confirmation) | Spec §7.2, §8.1 |

---

## 17. Performance Workload / Capacity

| Profile ID | Profile Name | Purpose / Workload Definition | Stated Numerical Target | Status / Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **PERF-WL-EDRU-001** | **Baseline Load** | Validate normal expected traffic and establish latency/throughput baselines. | **INFORMATION GAP** (RPS and VU numbers not provided) | Spec §6.6, §8.1 |
| **PERF-WL-EDRU-002** | **Peak Load** | Validate expected peak scheduling traffic within agreed latency/error thresholds. | **INFORMATION GAP** (Peak RPS and VU numbers not provided) | Spec §6.6, §8.1 |
| **PERF-WL-EDRU-003** | **Stress Load** | Increase load beyond peak to identify capacity limit and bottlenecks. | **INFORMATION GAP** (Stress limits not defined) | Spec §6.6, §8.1 |
| **PERF-WL-EDRU-004** | **Soak Load** | Extended load to detect memory/connection leaks and progressive latency degradation. | **INFORMATION GAP** (Duration and VU count not defined) | Spec §6.6, §8.1 |
| **PERF-WL-EDRU-005** | **OCC Contention Load** | Multiple VUs intentionally submit concurrent split mutations on the same assignment/version. | **INFORMATION GAP** (Concurrency level not defined) | Spec §6.6, §6.7 |

---

## 18. Performance Observability

| Metric ID | Category | Metric Name | Description / Requirement | Status / Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **PERF-METRIC-EDRU-001** | Throughput | Requests per second (RPS) | Report total RPS, successful RPS, and failed RPS per k6 run. | **Specified** (Spec §6.5) |
| **PERF-METRIC-EDRU-002** | Latency | Latency Distribution | Report Average, p50, p90, p95, and p99 response times. | **Specified** (Spec §6.5) |
| **PERF-METRIC-EDRU-003** | Protocol / Errors | Status Code & Errors | Report HTTP status distribution, timeout count, and connection errors. | **Specified** (Spec §6.5) |
| **PERF-METRIC-EDRU-004** | Concurrency / OCC | OCC Metrics | Report total conflicts, conflict rate, successful mutation rate, retry success rate, and p95/p99 latency for conflict vs success. | **Specified** (Spec §6.7) |
| **PERF-METRIC-EDRU-005** | Application Health | Host Resource Utilization | Monitor and report API instance CPU and memory utilization. | **Specified** (Spec §6.5, §6.14) |
| **PERF-METRIC-EDRU-006** | Database Health | DB Performance Metrics | Monitor query latency, connection-pool utilization, lock waits, deadlocks, transaction duration, slow queries, and storage I/O. | **Specified** (Spec §6.5, §6.14) |
| **PERF-METRIC-EDRU-007** | Audit Health | Audit Logging Overhead | Verify audit processing does not create uncontrolled queue backlogs or degrade split latency. | **Specified** (Spec §6.13) |

---

## 19. Performance Information Gaps

```text
INFORMATION GAP: Missing Performance Quantification
Affected Areas: API Performance, UI Performance, Workload / Capacity Profiles
Missing Information:
1. Expected average RPS and peak RPS.
2. Expected concurrent user (VU) count.
3. Maximum contractual latency SLOs (p95 / p99) for all endpoints.
4. Maximum acceptable error rate budget (contractual SLO).
5. Soak test execution duration.
6. Production-equivalent test dataset size and volume.
7. Gateway and API rate limiting parameters (burst, per-IP, per-user).
8. Idempotency key specification for duplicate prevention on retries.
9. Synchronous vs asynchronous audit logging architecture and maximum SLA.
10. UI contractual SLO targets across browsers and network conditions.
11. Multi-tenant configurability of the 7-day historic lockout threshold.
Impact on QA:
Performance engineers cannot establish automated pass/fail thresholds or design production-realistic load profiles without these values being formally confirmed by Product/API owners.
```

---

## Key Findings

1. **Complex Intertwined Core Mechanics**: An in-progress split requires atomic mutation of the original assignment (`endDate = splitDate - 1 day`, `version = version + 1`) and creation of a new dependent entity (`laborRequest` in `OPEN` status for Unassign; new assignment for Reassign).
2. **OCC Concurrency Dependency**: Every write requires the current assignment `version`. A stale version returns `409 Conflict`. All sequential test cases operating on the same assignment must re-read state between operations.
3. **Three Independent UI Entry Surfaces**: Gantt chart right-click context menu, Assignment details drawer, and Worker Assignments list tab must be tested independently. Synthetic event limitations exist for the Gantt right-click path.
4. **Distinct Edge Case Pathways**:
   - `startDate >= today`: Bypasses effective date flow entirely.
   - `effectiveDate == startDate`: Requires explicit user acknowledgement; creates no historical segment.
   - `splitDate < today - 7 days`: Enforces historic lockout; requires System Admin and `overrideHistoricLockout: true`.
   - Overlapping replacement worker: Requires explicit confirmation and `overrideConflict: true`.
5. **Direct API Verification Required**: Visual inspection of the Gantt chart is insufficient for validation because UI state may require a page reload and underlying database record boundaries must be asserted via direct API reads.

---

## Performance Findings

1. **Proposed Performance Baselines Provided**: The specification includes proposed p50, p95, and p99 response time targets for `POST /split` (Unassign: p95 <= 1000ms; Reassign: p95 <= 1500ms), read APIs (p95 <= 750ms), and conflict detection (p95 <= 1000ms), as well as UI interaction targets (p95 <= 2.0s).
2. **Explicit Verification of Data Integrity Under Load**: Load testing must explicitly validate atomicity and prevent orphaned segments, duplicate records, or corrupted segment date boundaries.
3. **Dedicated OCC Contention Testing Required**: Multi-VU concurrent mutation against shared assignment records is explicitly mandated to measure conflict rates, retry success, and version locking behavior.

---

## Information Gaps

1. **Unconfirmed SLOs and Workload Quantities**: All throughput targets (RPS), concurrency levels (VUs), soak durations, and rate limits are marked as proposed and require formal sign-off before becoming contractual release gates.
2. **Missing Supporting API Schemas**: Response schemas for `POST /split`, exact endpoint paths for GET labor request/assignment, and conflict detection endpoints are not fully specified.
3. **Boundary Edge Behavior**: System behavior when `splitDate == endDate` and behavior during multi-step sequential splits on the same assignment require clarification.
