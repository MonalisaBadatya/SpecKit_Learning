# API Test Cases: Assignment Change Request Approval

**Feature:** `feat-assignment-change-request-approval`
**Epic:** `epic-assignments`
**Source of Truth:** `test-plan/AssignmentChangeRequest_TestPlan.md` v2.0
**Document Version:** 2.0

---

## Coverage Matrix

### A. Contract Validation Tests

| TC ID | Endpoint | Method | Priority | Objective |
| :--- | :--- | :---: | :---: | :--- |
| TC-API-C01 | /token-preview | GET | P1 | Response schema - all fields, correct types |
| TC-API-C02 | /execute-token | POST | P1 | Response schema on 200 success |
| TC-API-C03 | /assignment-change-requests | GET | P1 | List schema: items, total, limit, offset |
| TC-API-C04 | /:id/approve | PATCH | P1 | Approve response schema |
| TC-API-C05 | /:id/reject | PATCH | P1 | Reject response schema |
| TC-API-C06 | /:id/approve | PATCH | P1 | overrideConflict as string "YES" -> 400 |
| TC-API-C07 | /:id/approve | PATCH | P1 | overrideHistoricLockout as integer 1 -> 400 |
| TC-API-C08 | /execute-token | POST | P1 | overrideConflict as string "true" -> 400 |

### B. Business Rule Tests

| TC ID | Endpoint | Method | Priority | Scenario |
| :--- | :--- | :---: | :---: | :--- |
| TC-API-B01 | /token-preview | GET | P1 | Valid unused token - 200 with correct fields |
| TC-API-B02 | /token-preview | GET | P1 | Expired token (>7 days) - 410 Gone |
| TC-API-B03 | /execute-token | POST | P0 | Execute ACCEPT token - 200 APPROVED |
| TC-API-B04 | /execute-token | POST | P1 | Execute DENY token - 200 REJECTED |
| TC-API-B05 | /execute-token | POST | P1 | Execute ACCEPT with conflict override - 200 |
| TC-API-B06 | /execute-token | POST | P1 | Execute ACCEPT without override when conflict exists - 409 |
| TC-API-B07 | /assignment-change-requests | GET | P1 | List PENDING with limit/offset - 200 paginated |
| TC-API-B08 | /assignment-change-requests | GET | P2 | Filter by status=APPROVED |
| TC-API-B09 | /assignment-change-requests | GET | P2 | Filter by projectId |
| TC-API-B10 | /assignment-change-requests | GET | P2 | limit=5 offset=5 - returns next page |
| TC-API-B11 | /assignment-change-requests | GET | P2 | Offset beyond total - items:[], total correct |
| TC-API-B12 | /:id/approve | PATCH | P1 | Clean approval - 200 APPROVED |
| TC-API-B13 | /:id/approve | PATCH | P1 | Conflict override approval - 200 APPROVED |
| TC-API-B14 | /:id/approve | PATCH | P1 | Project extension approval - 200 APPROVED |
| TC-API-B15 | /:id/approve | PATCH | P1 | Historic lockout - System Admin - 200 APPROVED |
| TC-API-B16 | /:id/approve | PATCH | P1 | Pursuit project - 400 |
| TC-API-B17 | /:id/approve | PATCH | P1 | Archived worker - 400 |
| TC-API-B18 | /:id/reject | PATCH | P1 | Reject with comments - 200 REJECTED |
| TC-API-B19 | /:id/reject | PATCH | P1 | Reject without comments (null) - 200 (GAP-PLAN-001) |
| TC-API-B20 | /:id/reject | PATCH | P1 | Reject with empty string "" - document behavior (GAP-PLAN-001) |

### C. Security Validation Tests

| TC ID | Endpoint | Priority | Scenario |
| :--- | :--- | :---: | :--- |
| TC-API-S01 | /token-preview | P0 | Tampered/invalid token - 400/404 |
| TC-API-S02 | /execute-token | P0 | Reuse already-used token - 409 |
| TC-API-S03 | /execute-token | P0 | Missing token field - 400 |
| TC-API-S04 | /execute-token | P0 | Empty token string - 400 |
| TC-API-S05 | /execute-token | P0 | Token >1000 chars - 400 |
| TC-API-S06 | /execute-token | P0 | Malformed (non-hex) token - 400 |
| TC-API-S07 | /execute-token | P0 | Token from deleted request - 404 |
| TC-API-S08 | /execute-token | P0 | Cross-tenant token (Tenant B uses A's token) - 404/403 |
| TC-API-S09 | /:id/approve | P0 | PM JWT - 403 |
| TC-API-S10 | /:id/reject | P0 | PM JWT - 403 |
| TC-API-S11 | /:id/approve | P0 | WFM + overrideHistoricLockout=true - 403 |
| TC-API-S12 | /:id/approve | P0 | No JWT - 401 |
| TC-API-S13 | /assignment-change-requests | P0 | PM JWT - 403 |
| TC-API-S14 | /assignment-change-requests | P0 | No JWT - 401 |
| TC-API-S15 | /:id/approve | P0 | Cross-tenant changeRequestId - 404 |

### D. State Machine Tests

| TC ID | Endpoint | Priority | From State | Action | Expected |
| :--- | :--- | :---: | :--- | :--- | :--- |
| TC-API-SM01 | /:id/approve | P0 | APPROVED | Approve again | 409 |
| TC-API-SM02 | /:id/reject | P0 | APPROVED | Reject | 409 |
| TC-API-SM03 | /:id/approve | P0 | REJECTED | Approve | 409 |
| TC-API-SM04 | /:id/reject | P0 | REJECTED | Reject again | 409 |
| TC-API-SM05 | /:id/approve | P1 | CANCELLED | Approve | 409 |
| TC-API-SM06 | /execute-token | P0 | APPROVED | Execute ACCEPT token | 409 |
| TC-API-SM07 | /execute-token | P0 | REJECTED | Execute ACCEPT token | 409 |
| TC-API-SM08 | /execute-token | P0 | CANCELLED | Execute ACCEPT token | 409/410 |

### E. Concurrency Tests

| TC ID | Priority | Scenario |
| :--- | :---: | :--- |
| TC-API-CC01 | P0 | Dual WFM approve simultaneously - first 200, second 409 |
| TC-API-CC02 | P0 | WFM in-app + email ACCEPT token simultaneously - first 200, second 409 |
| TC-API-CC03 | P0 | Dual email ACCEPT tokens simultaneously - first 200, second 409 |

### F. Pagination / Filtering Negative Tests

| TC ID | Parameter | Expected |
| :--- | :--- | :--- |
| TC-API-P01 | status=INVALID_STATUS | 400 |
| TC-API-P02 | limit=-1 | 400 |
| TC-API-P03 | limit=abc | 400 |
| TC-API-P04 | offset=-5 | 400 |
| TC-API-P05 | projectId=not-a-uuid | 400 |
| TC-API-P06 | offset=99999 (beyond total) | 200 items:[] |

---

## Detailed Test Cases (Selected)

---

### TC-API-C01: Token Preview Response Schema

**Method:** `GET /api/workforce/assignment-change-requests/token-preview?token=a1b2c3d4...8f90`
**Expected Status:** `200 OK`
**Pydantic Assertions:**
- `valid: bool`
- `changeRequestId: UUID`
- `action: str in ['ACCEPT','DENY','VIEW']`
- `projectName, workerName, tradeName: str`
- `currentDates, proposedDates: {start: date, end: date}`
- `currentHoursPerDay, proposedHoursPerDay: float`
- `requesterName, requesterComments: str`
- `hasConflict, extendsProject, isHistoricLocked: bool`
- `conflictDetails: list or null`

---

### TC-API-C06: overrideConflict as String -> 400

**Method:** `PATCH /:id/approve`
**Payload:** `{ "overrideConflict": "YES" }`
**Expected Status:** `400 Bad Request`
**Note:** Validates Boolean type enforcement. String is rejected.

---

### TC-API-B01: Valid Token Preview

**Method:** `GET /token-preview?token=a1b2c3d4...8f90`
**Expected:** `200 OK`
**Assertions:**
1. `body.valid == true`
2. `body.changeRequestId == "292fd69b-0e80-4f27-90e6-db10d9217089"`
3. `body.action == "ACCEPT"`
4. `body.projectName == "Meals on Wheels"`
5. `body.workerName == "Cody Kessler"`
6. `body.hasConflict == false`, `body.extendsProject == false`, `body.isHistoricLocked == false`

---

### TC-API-B02: Expired Token -> 410

**Method:** `GET /token-preview?token=b2c3d4e5...90a1`
**Expected:** `410 Gone` OR `200` with `valid: false, expired: true`
**Assertion:** Expiry status returned; no usable preview data.

---

### TC-API-B03: Execute ACCEPT Token

**Method:** `POST /execute-token`
**Payload:**
```json
{
  "token": "a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90",
  "overrideConflict": false
}
```
**Expected:** `200 OK`
**Assertions:**
1. `body.success == true`
2. `body.status == "APPROVED"`
3. `body.changeRequestId == "292fd69b-0e80-4f27-90e6-db10d9217089"`

**Test Oracle - DB:**
- `assignmentChangeRequest.status = 'APPROVED'`
- `assignment.startDate = '2026-02-10'`
- `usedAt` IS NOT NULL on token row
- Audit record: `action='APPROVED'`, `resolver=NULL (email action)`

---

### TC-API-S01: Tampered Token

**Method:** `GET /token-preview?token=ffffffff...0000`
**Expected:** `400 Bad Request` or `404 Not Found`
**Assertions:** Structured error body; no internal DB stack trace.

---

### TC-API-S02: Token Reuse After usedAt Set

**Method:** `POST /execute-token`
**Payload:** `{ "token": "c3d4e5f6...0a1b" }` (already used)
**Expected:** `409 Conflict`
**Assertions:** Message indicates token already consumed.
**Test Oracle - DB:** `status` unchanged; no duplicate audit record.

---

### TC-API-S08: Cross-Tenant Token

**Setup:** Token `a1b2c3d4...` belongs to Tenant A. Request sent with Tenant B headers/JWT.
**Expected:** `404 Not Found` or `403 Forbidden`
**Assertions:** No Tenant A data returned or mutated.

---

### TC-API-SM01: APPROVED -> Approve Again (Invalid Transition)

**Method:** `PATCH .../7c7ec12f.../approve` (already APPROVED)
**Headers:** `Authorization: Bearer <WFM_JWT>`
**Payload:** `{}`
**Expected:** `409 Conflict`
**Assertions:** `body.message` contains `"Change request is already resolved"`.
**Test Oracle - DB:** No additional audit record created; status remains APPROVED.

---

### TC-API-CC01: Concurrent Dual WFM Approval

**Method:** Two simultaneous `PATCH .../292fd69b.../approve` (Python `concurrent.futures.ThreadPoolExecutor(2)`)
**Expected:**
- Request 1: `200 OK` with `status=APPROVED`
- Request 2: `409 Conflict` with `"Change request is already resolved"`

**Test Oracle - DB:**
- `assignmentChangeRequest.status = 'APPROVED'` (exactly one transition)
- Exactly one audit record created
- Assignment dates updated exactly once

---

### TC-API-B12: In-App Clean Approval

**Method:** `PATCH /api/workforce/assignment-change-requests/292fd69b-0e80-4f27-90e6-db10d9217089/approve`
**Headers:** `Authorization: Bearer <WFM_JWT>`
**Payload:** `{}`
**Expected:** `200 OK`
**Assertions:** `body.success == true`; `body.status == "APPROVED"`.

**Test Oracle - DB:**
- `assignmentChangeRequest.status = 'APPROVED'`
- `assignment.startDate = '2026-02-10'`, `endDate = '2026-10-01'`
- Audit: `action='APPROVED'`, `conflictOverride=false`, `historicLockoutOverride=false`

---

### TC-API-B14: Project Extension Approval

**Method:** `PATCH .../494bf89d.../approve`
**Payload:** `{ "overrideConflict": false, "extendProjectEndDate": true }`
**Expected:** `200 OK`

**Test Oracle - DB:**
- `project.endDate = '2026-11-15'`
- `assignment.endDate = '2026-11-15'`
- Audit: `extendProjectEndDate = true`

---

### TC-API-B15: Historic Lockout - System Admin

**Method:** `PATCH .../5a5ca90e.../approve`
**Headers:** `Authorization: Bearer <SYSTEM_ADMIN_JWT>`
**Payload:** `{ "overrideHistoricLockout": true }`
**Expected:** `200 OK`

**Test Oracle - DB:**
- Audit: `historicLockoutOverride = true`, `resolver = SYSTEM_ADMIN_ID`

---

### TC-API-B18: Reject with Comments

**Method:** `PATCH .../292fd69b.../reject`
**Payload:** `{ "reviewerComments": "Worker needed on Margaret Mary Health project" }`
**Expected:** `200 OK`
**Assertions:** `body.success == true`; `body.status == "REJECTED"`.

**Test Oracle - DB:**
- `status = 'REJECTED'`; `reviewerComments` stored; assignment dates unchanged; audit created.
