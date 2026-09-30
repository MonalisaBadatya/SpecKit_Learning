# Database Test Cases: Assignment Change Request Approval

**Feature:** `feat-assignment-change-request-approval`
**Epic:** `epic-assignments`
**Source of Truth:** `test-plan/AssignmentChangeRequest_TestPlan.md` v2.0
**Document Version:** 2.0

---

## Summary

| TC ID | Table / Focus | Priority | Area |
| :--- | :--- | :---: | :--- |
| TC-DB-001 | assignmentChangeRequestToken schema | P1 | Schema |
| TC-DB-002 | FK changeRequestId ON DELETE CASCADE | P1 | Schema |
| TC-DB-003 | FK recipientUserId ON DELETE SET NULL | P1 | Schema |
| TC-DB-004 | Token indexes | P1 | Schema |
| TC-DB-005 | ACR performance indexes | P1 | Schema |
| TC-DB-006 | Data integrity - clean approval | P1 | Integrity |
| TC-DB-007 | Data integrity - conflict override approval | P1 | Integrity |
| TC-DB-008 | Data integrity - project extension approval | P1 | Integrity |
| TC-DB-009 | Data integrity - rejection | P1 | Integrity |
| TC-DB-010 | Data integrity - withdrawal (cancelled) | P1 | Integrity |
| TC-DB-011 | Data integrity - assignment deletion auto-cancel + token invalidation | P1 | Integrity |
| TC-DB-012 | Audit - clean approval record | P1 | Audit |
| TC-DB-013 | Audit - conflict override record | P1 | Audit |
| TC-DB-014 | Audit - project extension record | P1 | Audit |
| TC-DB-015 | Audit - historic lockout override record | P1 | Audit |
| TC-DB-016 | Audit - rejection record | P1 | Audit |
| TC-DB-017 | Audit - PM withdrawal record | P1 | Audit |
| TC-DB-018 | Audit - auto-cancel record | P1 | Audit |
| TC-DB-019 | Token usedAt populated after execution | P1 | Integrity |
| TC-DB-020 | Token not reusable after usedAt set | P0 | Security |
| TC-DB-021 | Multi-tenant schema isolation | P0 | Security |
| TC-DB-022 | No orphaned tokens after request deletion | P1 | Integrity |
| TC-DB-023 | Audit on admin-forced withdrawal | P1 | Audit |

---

## Detailed Test Cases

---

### TC-DB-001: assignmentChangeRequestToken Schema

**Priority:** P1
**Target Table:** `"${schemaName}"."assignmentChangeRequestToken"`

```sql
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = '${schemaName}'
  AND table_name = 'assignmentChangeRequestToken'
ORDER BY ordinal_position;
```

**Expected Columns:**

| Column | Type | Nullable | Default |
| :--- | :--- | :---: | :--- |
| tokenId | uuid | NOT NULL | gen_random_uuid() |
| changeRequestId | uuid | NOT NULL | - |
| action | varchar(20) | NOT NULL | - |
| tokenHash | varchar(64) | NOT NULL | - |
| recipientUserId | uuid | NULL | - |
| expiresAt | timestamptz | NOT NULL | - |
| usedAt | timestamptz | NULL | - |
| createdDateTime | timestamptz | NOT NULL | NOW() |

---

### TC-DB-002: FK changeRequestId ON DELETE CASCADE

**Priority:** P1

**Steps:**
1. Insert test ACR and 3 associated token rows.
2. DELETE the ACR row.
3. Query `assignmentChangeRequestToken` for the deleted changeRequestId.

**Expected:** 0 token rows remain. CASCADE deletion confirmed.

---

### TC-DB-003: FK recipientUserId ON DELETE SET NULL

**Priority:** P1

**Steps:**
1. Insert token with valid `recipientUserId`.
2. DELETE the account row.
3. Query token row.

**Expected:** `recipientUserId = NULL`; token row still present (SET NULL behavior).

---

### TC-DB-004: Token Index Verification

**Priority:** P1

```sql
SELECT indexname, indexdef
FROM pg_indexes
WHERE schemaname = '${schemaName}'
  AND tablename = 'assignmentChangeRequestToken';
```

**Expected Indexes:**
- `idx_acr_token_hash` on `("tokenHash")`
- `idx_acr_token_request_action` on `("changeRequestId", "action")`

---

### TC-DB-005: ACR Performance Index Verification

**Priority:** P1

```sql
SELECT indexname, indexdef
FROM pg_indexes
WHERE schemaname = '${schemaName}'
  AND tablename = 'assignmentChangeRequest';
```

**Expected Indexes:**
- `idx_assignmentChangeRequest_status_created` on `("status", "createdDateTime" DESC)`
- `idx_assignmentChangeRequest_assignment_status` on `("assignmentId", "status")`

---

### TC-DB-006: Data Integrity - Clean Approval

**Priority:** P1

**Steps:**
1. Execute `PATCH .../292fd69b.../approve` with `{}`.
2. Run queries below.

```sql
-- ACR status
SELECT status FROM "${schemaName}"."assignmentChangeRequest"
WHERE "changeRequestId" = '292fd69b-0e80-4f27-90e6-db10d9217089';
-- Expected: APPROVED

-- Assignment dates
SELECT "startDate", "endDate" FROM "${schemaName}"."assignment"
WHERE "assignmentId" = '63097b12-4f82-4be4-8d3a-df1206e035e1';
-- Expected: startDate='2026-02-10', endDate='2026-10-01'
```

**Expected:**
- `assignmentChangeRequest.status = 'APPROVED'`
- `assignment.startDate = '2026-02-10'`, `endDate = '2026-10-01'`
- Audit record present (see TC-DB-012)

---

### TC-DB-007: Data Integrity - Conflict Override Approval

**Priority:** P1

**Steps:**
1. Execute `PATCH .../383ae78c.../approve` with `{ "overrideConflict": true }`.
2. Query ACR and assignment.

**Expected:**
- `assignmentChangeRequest.status = 'APPROVED'`
- Assignment dates updated to proposed range
- Audit: `conflictOverride = true`

---

### TC-DB-008: Data Integrity - Project Extension Approval

**Priority:** P1

**Steps:**
1. Execute `PATCH .../494bf89d.../approve` with `{ "extendProjectEndDate": true }`.
2. Query project, assignment, and ACR.

**Expected:**
- `project.endDate = '2026-11-15'`
- `assignment.endDate = '2026-11-15'`
- `assignmentChangeRequest.status = 'APPROVED'`
- Audit: `extendProjectEndDate = true`

---

### TC-DB-009: Data Integrity - Rejection

**Priority:** P1

**Steps:**
1. Execute `PATCH .../292fd69b.../reject` with `{ "reviewerComments": "Worker needed elsewhere" }`.
2. Query ACR and assignment.

**Expected:**
- `assignmentChangeRequest.status = 'REJECTED'`
- `reviewerComments = 'Worker needed elsewhere'`
- Assignment `startDate`/`endDate` **unchanged** (original values preserved)
- Audit record present

---

### TC-DB-010: Data Integrity - Withdrawal (Cancelled)

**Priority:** P1

**Steps:**
1. PM calls withdraw on own ACR.
2. Query ACR and assignment.

**Expected:**
- `assignmentChangeRequest.status = 'CANCELLED'`
- Assignment dates **unchanged**
- Audit record: `action='CANCELLED'`, `resolver=PM_USER_ID`

---

### TC-DB-011: Assignment Deletion - Auto-Cancel + Token Invalidation

**Priority:** P1 (REQ-ACR-011)

**Steps:**
1. Delete assignment `63097b12-4f82-4be4-8d3a-df1206e035e1` (which has pending ACR `292fd69b-...`).
2. Query ACR status.
3. Query token rows for that ACR.
4. Attempt to use old token via API.

**Expected:**
- `assignmentChangeRequest.status = 'CANCELLED'`
- Token rows = 0 (CASCADE-deleted)
- API call with old token returns `404 Not Found`
- Audit record: `action='CANCELLED'`, `resolver='SYSTEM'`

---

### TC-DB-012 through TC-DB-018: Audit Record Tests

**Audit Table:** `"${schemaName}"."changeRequestAudit"` *(verify table name from migration files)*

**Verification SQL Template:**
```sql
SELECT action, resolver, "reviewerComments",
       "conflictOverride", "historicLockoutOverride",
       "extendProjectEndDate", "createdDateTime"
FROM "${schemaName}"."changeRequestAudit"
WHERE "changeRequestId" = '${changeRequestId}'
ORDER BY "createdDateTime" DESC
LIMIT 1;
```

| TC ID | Trigger | Expected Fields |
| :--- | :--- | :--- |
| TC-DB-012 | Clean approval | action=APPROVED, conflictOverride=false, historicLockoutOverride=false, extendProjectEndDate=false |
| TC-DB-013 | Conflict override approval | action=APPROVED, conflictOverride=true |
| TC-DB-014 | Project extension approval | action=APPROVED, extendProjectEndDate=true |
| TC-DB-015 | Historic lockout override | action=APPROVED, historicLockoutOverride=true, resolver=SYSTEM_ADMIN_ID |
| TC-DB-016 | Rejection | action=REJECTED, reviewerComments stored |
| TC-DB-017 | PM withdrawal | action=CANCELLED, resolver=PM_USER_ID |
| TC-DB-018 | Auto-cancel (assignment deleted) | action=CANCELLED, resolver='SYSTEM' or null |

---

### TC-DB-019: Token usedAt Populated After Execution

**Priority:** P1

**Steps:**
1. Execute valid ACCEPT token via `POST /execute-token`.
2. Query token row.

```sql
SELECT "usedAt" FROM "${schemaName}"."assignmentChangeRequestToken"
WHERE "tokenHash" = '${tokenHash}';
```

**Expected:** `usedAt` IS NOT NULL; timestamp within 5s of execution.

---

### TC-DB-020: Token Not Reusable After usedAt Set

**Priority:** P0

**Steps:**
1. Execute valid token (usedAt now set).
2. Submit same token again to `POST /execute-token`.
3. Query DB.

**Expected:**
- API returns `409 Conflict`.
- `assignmentChangeRequest.status` remains APPROVED (unchanged from step 1).
- No second audit record from the second attempt.

---

### TC-DB-021: Multi-Tenant Schema Isolation

**Priority:** P0

**Steps:**
1. Perform any approval action in Tenant B context (`cmma_tenantb` schema).
2. Query Tenant A schema (`cmma_danis`) for Tenant B's changeRequestId.

```sql
SELECT * FROM "cmma_danis"."assignmentChangeRequest"
WHERE "changeRequestId" = '${tenantB_changeRequestId}';
```

**Expected:** 0 rows. No Tenant B data in Tenant A schema.

---

### TC-DB-022: No Orphaned Tokens After Deletion

**Priority:** P1

**Steps:**
1. Delete parent ACR row.
2. Query all token rows in `assignmentChangeRequestToken` for that changeRequestId.

**Expected:** 0 rows. All child tokens removed via CASCADE.

---

### TC-DB-023: Audit on System Admin Withdrawal

**Priority:** P1

**Steps:**
1. System Admin withdraws ACR `292fd69b-...`.
2. Query audit table.

**Expected:**
- Audit record: `action='CANCELLED'`, `resolver=SYSTEM_ADMIN_ID`
- Assignment dates unchanged.
