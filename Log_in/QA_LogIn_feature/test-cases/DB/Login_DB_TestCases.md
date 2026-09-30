# Database Test Cases: Authentication & Session Management (Login Feature)

**Feature:** feat-login  
**Epic:** epic-auth  
**Source Specification:** `specs/Spec_LoginFeature.md` (v1.0 — Approved)  
**QA Analysis Reference:** `qa/analysis/LoginFeature_QA_Analysis.md`  
**Test Plan Reference:** `qa/test-plan/Login_TestPlan.md`  
**Target File:** `qa/test-cases/DB/Login_DB_TestCases.md`  

---

## 1. Overview & DB Test Suite Summary

This test suite verifies the database integrity, schema constraints, persistence behavior, status transitions, and data isolation for the CMMA Platform Authentication & Session Management feature. All entities, tables, columns, foreign keys, and default values are derived strictly from `specs/Spec_LoginFeature.md`.

### Database Entities Under Test

| Schema | Entity / Table | Purpose | Source Reference |
| :--- | :--- | :--- | :--- |
| `cmma_core` | `platformAdmin` | Platform administrator credentials, provider, status, and last login tracking | Spec §2.1, §2.2, DB-LOGIN-001 |
| `cmma_core` | `mfaVerification` | Platform admin MFA OTP codes and trusted device fingerprints (`cmma_device_fp`) | Spec §2.1, DB-LOGIN-002 |
| `cmma_<tenantSlug>` | `account` | Tenant user credentials, SSO user IDs, and account activation status | Spec §2.1, §2.2, DB-LOGIN-003 |
| `cmma_<tenantSlug>` | `mfaVerification` | Tenant user MFA OTP codes and trusted device fingerprints | Spec §2.1, DB-LOGIN-004 |
| `cmma_<tenantSlug>` | `resource` | Worker profile records (email, name, status) linked to accounts | Spec §2.2, DB-LOGIN-005 |

### Test Case Coverage Matrix

| Test Case ID | Target Entity | Scenario Description | Priority | Risk |
| :--- | :--- | :--- | :--- | :--- |
| **TC-LOGIN-DB-001** | `cmma_core.platformAdmin` | `lastLoginAt` timestamp update on successful authentication | P1 | Medium |
| **TC-LOGIN-DB-002** | `cmma_core.platformAdmin` | Bcrypt salt factor 10 password hash format validation | P1 | High |
| **TC-LOGIN-DB-003** | `cmma_core.platformAdmin` | `authProvider` default value ('LOCAL') and constraint ('ENTRA') | P2 | Medium |
| **TC-LOGIN-DB-004** | `cmma_core.mfaVerification` | FK relationship integrity to `platformAdmin.platformAdminId` | P1 | High |
| **TC-LOGIN-DB-005** | `cmma_core.mfaVerification` | Device fingerprint trust evaluation (`isTrusted=true`, `expiresAt > NOW()`) | P1 | High |
| **TC-LOGIN-DB-006** | `cmma_core.mfaVerification` | Stale device fingerprint expiry check (`expiresAt <= NOW()`) | P1 | High |
| **TC-LOGIN-DB-007** | `cmma_<tenantSlug>.account` | Bcrypt password hash format and persistence in tenant account | P1 | High |
| **TC-LOGIN-DB-008** | `cmma_<tenantSlug>.account` | Account status enforcement (`ACTIVE`, `DEACTIVATED`, `INACTIVE`) | P1 | High |
| **TC-LOGIN-DB-009** | `cmma_<tenantSlug>.account` | `ssoProviderUserId` persistence and matching for Entra SSO | P1 | High |
| **TC-LOGIN-DB-010** | `cmma_<tenantSlug>.mfaVerification` | FK relationship integrity to `resource.resourceId` | P1 | High |
| **TC-LOGIN-DB-011** | `cmma_<tenantSlug>.mfaVerification` | Tenant device fingerprint trust and expiry verification | P1 | High |
| **TC-LOGIN-DB-012** | Cross-Schema (`cmma_core` vs `cmma_<tenantSlug>`) | Core vs Tenant schema isolation (no cross-context queries) | P1 | Critical |
| **TC-LOGIN-DB-013** | Multi-Tenant Schemas (`cmma_danis` vs `cmma_falcon`) | Strict isolation between distinct tenant schemas | P1 | Critical |
| **TC-LOGIN-DB-014** | `cmma_<tenantSlug>.resource` & `account` | Unprovisioned resource identification (`NO_ACCOUNT` state) | P2 | Medium |
| **TC-LOGIN-DB-015** | `cmma_core.platformAdmin` | Failed login attempt does not update `lastLoginAt` | P2 | Low |

---

## 2. Test Cases

---

### TC-LOGIN-DB-001: `lastLoginAt` Timestamp Update on Successful Authentication

- **ID:** `TC-LOGIN-DB-001`
- **Title:** Verify `cmma_core.platformAdmin.lastLoginAt` timestamp is updated upon successful login
- **Requirement ID:** `REQ-LOGIN-001`, `DB-LOGIN-001`
- **Scenario ID:** `DB-ADMIN-LAST-LOGIN-UPDATE`
- **DB Entity:** `cmma_core.platformAdmin`
- **Preconditions:**
  1. Record exists in `cmma_core.platformAdmin` with known `platformAdminId` and initial `lastLoginAt` timestamp (or `NULL`).
- **Test Data:**
  - `platformAdminId`: `a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`
  - Email: `admin@cmma.io`
- **Steps:**
  1. Record current database system time $T_0$ and initial `lastLoginAt` value.
  2. Execute successful login via `POST /api/auth/login` for the platform admin.
  3. Query `SELECT "lastLoginAt" FROM "cmma_core"."platformAdmin" WHERE "platformAdminId" = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';`.
- **Expected DB State:**
  1. `lastLoginAt` is not NULL.
  2. Updated `lastLoginAt` timestamp is $\ge T_0$ and reflects the recent login event.
- **Priority:** P1
- **Risk:** Medium
- **Automation Candidate:** Yes (SQL assertion script / Supertest)
- **Regression Candidate:** Yes
- **Traceability:** Spec §2.1, DB-LOGIN-001, REQ-LOGIN-001

---

### TC-LOGIN-DB-002: Bcrypt Salt Factor 10 Password Hash Format in `platformAdmin`

- **ID:** `TC-LOGIN-DB-002`
- **Title:** Verify password hash in `cmma_core.platformAdmin` conforms to bcrypt standard (salt factor 10)
- **Requirement ID:** `SEC-LOGIN-004`, `BR-LOGIN-003`, `DB-LOGIN-001`
- **Scenario ID:** `DB-ADMIN-BCRYPT-HASH-FORMAT`
- **DB Entity:** `cmma_core.platformAdmin`
- **Preconditions:**
  1. Platform admin account created with password `SecurePassword123!`.
- **Test Data:**
  - Email: `admin@cmma.io`
- **Steps:**
  1. Query `SELECT "passwordHash" FROM "cmma_core"."platformAdmin" WHERE "email" = 'admin@cmma.io';`.
  2. Inspect string length, prefix, and cost parameter.
- **Expected DB State:**
  1. `passwordHash` is a `VARCHAR(255)` string.
  2. Hash string starts with standard bcrypt identifier `$2a$10$` or `$2b$10$` (confirming salt factor 10).
  3. Plaintext password is never stored in any column.
- **Priority:** P1
- **Risk:** High
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §2.1, §4.1, BR-LOGIN-003, SEC-LOGIN-004

---

### TC-LOGIN-DB-003: `authProvider` Default and Constraint in `platformAdmin`

- **ID:** `TC-LOGIN-DB-003`
- **Title:** Verify `cmma_core.platformAdmin.authProvider` defaults to 'LOCAL' and accepts 'ENTRA'
- **Requirement ID:** `DB-LOGIN-001`
- **Scenario ID:** `DB-ADMIN-AUTH-PROVIDER-FIELD`
- **DB Entity:** `cmma_core.platformAdmin`
- **Preconditions:** None
- **Test Data:**
  - Admin 1: Insert without explicit `authProvider`
  - Admin 2: Insert with `authProvider = 'ENTRA'`
- **Steps:**
  1. Insert a new record into `cmma_core.platformAdmin` omitting `authProvider`.
  2. Query `authProvider` for the inserted record.
  3. Update/insert a record setting `authProvider = 'ENTRA'`.
  4. Query `authProvider` for the second record.
- **Expected DB State:**
  1. Omitted `authProvider` defaults to `'LOCAL'`.
  2. Second record successfully stores `'ENTRA'`.
- **Priority:** P2
- **Risk:** Medium
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §2.1, §2.2, DB-LOGIN-001

---

### TC-LOGIN-DB-004: FK Relationship Integrity in `cmma_core.mfaVerification`

- **ID:** `TC-LOGIN-DB-004`
- **Title:** Verify foreign key constraint linking `cmma_core.mfaVerification` to `cmma_core.platformAdmin`
- **Requirement ID:** `DB-LOGIN-002`
- **Scenario ID:** `DB-CORE-MFA-FK-INTEGRITY`
- **DB Entity:** `cmma_core.mfaVerification`
- **Preconditions:**
  1. Valid platform admin exists with `platformAdminId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'`.
- **Test Data:**
  - Non-existent UUID: `ffffffff-ffff-ffff-ffff-ffffffffffff`
- **Steps:**
  1. Insert into `cmma_core.mfaVerification` referencing valid `platformAdminId`.
  2. Attempt to insert into `cmma_core.mfaVerification` referencing non-existent UUID `ffffffff-ffff-ffff-ffff-ffffffffffff`.
- **Expected DB State:**
  1. Step 1 succeeds; record is created with auto-generated `mfaVerificationId` UUID and default `createdAt = NOW()`.
  2. Step 2 fails with database Foreign Key constraint violation error (`foreign key constraint "mfaVerification_platformAdminId_fkey"`).
- **Priority:** P1
- **Risk:** High
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §2.1, DB-LOGIN-002

---

### TC-LOGIN-DB-005: Device Fingerprint Trust State Evaluation in Core Schema

- **ID:** `TC-LOGIN-DB-005`
- **Title:** Verify active trusted device record in `cmma_core.mfaVerification` allows MFA bypass
- **Requirement ID:** `REQ-LOGIN-004`, `BR-LOGIN-004`, `DB-LOGIN-002`
- **Scenario ID:** `DB-CORE-MFA-TRUSTED-CHECK`
- **DB Entity:** `cmma_core.mfaVerification`
- **Preconditions:**
  1. Platform admin exists in `cmma_core.platformAdmin`.
  2. `mfaVerification` record exists with `isTrusted = TRUE` and `expiresAt = NOW() + INTERVAL '30 days'`.
- **Test Data:**
  - Device Fingerprint: `trusted-core-fp-001`
- **Steps:**
  1. Execute authentication query matching backend login logic:
     `SELECT * FROM "cmma_core"."mfaVerification" WHERE "platformAdminId" = :adminId AND "deviceFingerprint" = 'trusted-core-fp-001' AND "isTrusted" = TRUE AND "expiresAt" > NOW();`.
- **Expected DB State:**
  1. Query returns 1 matching record.
  2. Backend evaluates device as trusted and proceeds to issue JWT without MFA OTP challenge.
- **Priority:** P1
- **Risk:** High
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §2.1, §3.1 (Step 4), BR-LOGIN-004, DB-LOGIN-002

---

### TC-LOGIN-DB-006: Stale Device Fingerprint Expiry Check in Core Schema

- **ID:** `TC-LOGIN-DB-006`
- **Title:** Verify expired device fingerprint in `cmma_core.mfaVerification` fails trusted check query
- **Requirement ID:** `REQ-LOGIN-005`, `BR-LOGIN-004`, `BR-LOGIN-005`, `DB-LOGIN-002`
- **Scenario ID:** `DB-CORE-MFA-EXPIRED-CHECK`
- **DB Entity:** `cmma_core.mfaVerification`
- **Preconditions:**
  1. `mfaVerification` record exists with `isTrusted = TRUE`, but `expiresAt = NOW() - INTERVAL '1 minute'` (past timestamp).
- **Test Data:**
  - Device Fingerprint: `expired-core-fp-002`
- **Steps:**
  1. Execute trusted device verification query:
     `SELECT * FROM "cmma_core"."mfaVerification" WHERE "platformAdminId" = :adminId AND "deviceFingerprint" = 'expired-core-fp-002' AND "isTrusted" = TRUE AND "expiresAt" > NOW();`.
- **Expected DB State:**
  1. Query returns 0 rows (because `expiresAt > NOW()` evaluates to FALSE).
  2. Backend triggers `{ "mfa_required": true }` challenge.
- **Priority:** P1
- **Risk:** High
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §2.1, §3.1 (Step 4), §4.2, BR-LOGIN-004, BR-LOGIN-005

---

### TC-LOGIN-DB-007: Bcrypt Password Hash Persistence in `cmma_<tenantSlug>.account`

- **ID:** `TC-LOGIN-DB-007`
- **Title:** Verify password hash in tenant `account` table conforms to bcrypt standard with salt factor 10
- **Requirement ID:** `SEC-LOGIN-004`, `BR-LOGIN-003`, `DB-LOGIN-003`
- **Scenario ID:** `DB-TENANT-BCRYPT-HASH-FORMAT`
- **DB Entity:** `cmma_<tenantSlug>.account`
- **Preconditions:**
  1. Tenant user created in `cmma_danis.account`.
- **Test Data:**
  - Schema: `cmma_danis`
  - Email: `user@danis.com`
- **Steps:**
  1. Query `SELECT "passwordHash" FROM "cmma_danis"."account" a JOIN "cmma_danis"."resource" r ON a."resourceId" = r."resourceId" WHERE r."email" = 'user@danis.com';`.
  2. Inspect format and length.
- **Expected DB State:**
  1. `passwordHash` is `VARCHAR(255)` starting with `$2a$10$` or `$2b$10$`.
  2. Plaintext password is not stored.
- **Priority:** P1
- **Risk:** High
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §2.1, §4.1, BR-LOGIN-003, SEC-LOGIN-004, DB-LOGIN-003

---

### TC-LOGIN-DB-008: Account Status Values in `cmma_<tenantSlug>.account`

- **ID:** `TC-LOGIN-DB-008`
- **Title:** Verify `status` column in tenant `account` defaults to 'ACTIVE' and accepts 'DEACTIVATED' and 'INACTIVE'
- **Requirement ID:** `REQ-LOGIN-002`, `DB-LOGIN-003`
- **Scenario ID:** `DB-TENANT-ACCOUNT-STATUS-ENUM`
- **DB Entity:** `cmma_<tenantSlug>.account`
- **Preconditions:**
  1. Schema `cmma_danis` exists.
- **Test Data:**
  - Status values: `ACTIVE`, `DEACTIVATED`, `INACTIVE`
- **Steps:**
  1. Insert record into `cmma_danis.account` omitting `status` column.
  2. Verify default value.
  3. Update status to `DEACTIVATED`.
  4. Update status to `INACTIVE`.
- **Expected DB State:**
  1. Default `status` is `'ACTIVE'`.
  2. Both `'DEACTIVATED'` and `'INACTIVE'` are successfully persisted.
- **Priority:** P1
- **Risk:** High
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §2.1, §2.2, DB-LOGIN-003

---

### TC-LOGIN-DB-009: `ssoProviderUserId` Persistence for Entra SSO

- **ID:** `TC-LOGIN-DB-009`
- **Title:** Verify `cmma_<tenantSlug>.account.ssoProviderUserId` stores external corporate SSO identifier
- **Requirement ID:** `REQ-LOGIN-003`, `DB-LOGIN-003`
- **Scenario ID:** `DB-TENANT-SSO-USERID-PERSIST`
- **DB Entity:** `cmma_<tenantSlug>.account`
- **Preconditions:**
  1. User account provisioned for Entra SSO.
- **Test Data:**
  - `ssoProviderUserId`: `azure-ad-oid-87654321-abcd-1234-efgh-901234567890`
- **Steps:**
  1. Query `SELECT "ssoProviderUserId", "passwordHash" FROM "cmma_danis"."account" WHERE "ssoProviderUserId" = 'azure-ad-oid-87654321-abcd-1234-efgh-901234567890';`.
- **Expected DB State:**
  1. `ssoProviderUserId` correctly stores the Entra identifier.
  2. `passwordHash` is `NULL` for SSO-only corporate accounts.
- **Priority:** P1
- **Risk:** Medium
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §2.1, §3.2, DB-LOGIN-003, REQ-LOGIN-003

---

### TC-LOGIN-DB-010: FK Relationship Integrity in `cmma_<tenantSlug>.mfaVerification`

- **ID:** `TC-LOGIN-DB-010`
- **Title:** Verify foreign key constraint linking tenant `mfaVerification` to `cmma_<tenantSlug>.resource`
- **Requirement ID:** `DB-LOGIN-004`
- **Scenario ID:** `DB-TENANT-MFA-FK-INTEGRITY`
- **DB Entity:** `cmma_<tenantSlug>.mfaVerification`
- **Preconditions:**
  1. Valid resource exists in `cmma_danis.resource` with `resourceId = 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22'`.
- **Test Data:**
  - Non-existent UUID: `00000000-0000-0000-0000-000000000000`
- **Steps:**
  1. Insert record into `cmma_danis.mfaVerification` with valid `resourceId`.
  2. Attempt to insert record into `cmma_danis.mfaVerification` with `resourceId = '00000000-0000-0000-0000-000000000000'`.
- **Expected DB State:**
  1. Step 1 succeeds with auto-generated UUID `mfaVerificationId`.
  2. Step 2 fails with FK constraint violation error on `cmma_danis.resource`.
- **Priority:** P1
- **Risk:** High
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §2.1, DB-LOGIN-004

---

### TC-LOGIN-DB-011: Tenant Device Fingerprint Trust & Expiry Verification

- **ID:** `TC-LOGIN-DB-011`
- **Title:** Verify device fingerprint trust evaluation in tenant schema `mfaVerification`
- **Requirement ID:** `REQ-LOGIN-004`, `BR-LOGIN-004`, `DB-LOGIN-004`
- **Scenario ID:** `DB-TENANT-MFA-TRUSTED-CHECK`
- **DB Entity:** `cmma_<tenantSlug>.mfaVerification`
- **Preconditions:**
  1. Resource exists in `cmma_danis.resource`.
  2. `mfaVerification` record exists with `isTrusted = TRUE` and `expiresAt > NOW()`.
- **Test Data:**
  - Device Fingerprint: `trusted-tenant-fp-777`
- **Steps:**
  1. Execute query:
     `SELECT * FROM "cmma_danis"."mfaVerification" WHERE "resourceId" = :resourceId AND "deviceFingerprint" = 'trusted-tenant-fp-777' AND "isTrusted" = TRUE AND "expiresAt" > NOW();`.
- **Expected DB State:**
  1. Matching record returned.
  2. Device recognized as trusted for tenant user.
- **Priority:** P1
- **Risk:** High
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §2.1, §3.1, BR-LOGIN-004, DB-LOGIN-004

---

### TC-LOGIN-DB-012: Core vs. Tenant Schema Isolation

- **ID:** `TC-LOGIN-DB-012`
- **Title:** Verify strict data boundary isolation between `cmma_core` and `cmma_<tenantSlug>` schemas
- **Requirement ID:** `REQ-LOGIN-016`, `BR-LOGIN-008`, `BR-LOGIN-009`, `SEC-LOGIN-006`
- **Scenario ID:** `DB-ISOLATION-CORE-TENANT`
- **DB Entity:** `cmma_core.platformAdmin`, `cmma_<tenantSlug>.account`
- **Preconditions:**
  1. User `admin@cmma.io` exists only in `cmma_core.platformAdmin`.
  2. User `worker@danis.com` exists only in `cmma_danis.resource` + `cmma_danis.account`.
- **Test Data:**
  - Core Admin: `admin@cmma.io`
  - Tenant User: `worker@danis.com`
- **Steps:**
  1. Query `cmma_danis.resource` for `admin@cmma.io`.
  2. Query `cmma_core.platformAdmin` for `worker@danis.com`.
- **Expected DB State:**
  1. Query 1 returns 0 rows in `cmma_danis`.
  2. Query 2 returns 0 rows in `cmma_core`.
  3. No cross-schema references or triggers bridge the two tables.
- **Priority:** P1
- **Risk:** Critical
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §1.1, §4.3, BR-LOGIN-008, BR-LOGIN-009, REQ-LOGIN-016, SEC-LOGIN-006

---

### TC-LOGIN-DB-013: Multi-Tenant Schema Isolation (`cmma_danis` vs. `cmma_falcon`)

- **ID:** `TC-LOGIN-DB-013`
- **Title:** Verify complete database partition across distinct tenant schemas
- **Requirement ID:** `REQ-LOGIN-016`, `BR-LOGIN-009`, `SEC-LOGIN-006`
- **Scenario ID:** `DB-ISOLATION-MULTI-TENANT`
- **DB Entity:** `cmma_danis.account`, `cmma_falcon.account`
- **Preconditions:**
  1. Tenant schemas `cmma_danis` and `cmma_falcon` both exist.
  2. User `john.doe@company.com` exists in `cmma_danis` with password hash $H_1$.
  3. Same email `john.doe@company.com` exists in `cmma_falcon` with different password hash $H_2$.
- **Test Data:**
  - Email: `john.doe@company.com`
- **Steps:**
  1. Query `cmma_danis.account` for `john.doe@company.com`.
  2. Query `cmma_falcon.account` for `john.doe@company.com`.
  3. Compare `passwordHash` and `resourceId`.
- **Expected DB State:**
  1. Records are completely independent with different `resourceId` and `passwordHash` values.
  2. Modifications to `cmma_danis.account` or `mfaVerification` have zero effect on `cmma_falcon`.
- **Priority:** P1
- **Risk:** Critical
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §1.1, §2.1, §4.3, BR-LOGIN-009, SEC-LOGIN-006

---

### TC-LOGIN-DB-014: Unprovisioned Resource Record (`NO_ACCOUNT` State)

- **ID:** `TC-LOGIN-DB-014`
- **Title:** Verify database state when worker exists in `resource` without linked `account` record
- **Requirement ID:** `REQ-LOGIN-008`, `DB-LOGIN-005`
- **Scenario ID:** `DB-TENANT-NO-ACCOUNT-STATE`
- **DB Entity:** `cmma_<tenantSlug>.resource`, `cmma_<tenantSlug>.account`
- **Preconditions:**
  1. Record created in `cmma_danis.resource` with email `unprovisioned@danis.com`.
  2. No record inserted into `cmma_danis.account` for this `resourceId`.
- **Test Data:**
  - Email: `unprovisioned@danis.com`
- **Steps:**
  1. Query `SELECT r."resourceId", a."accountId" FROM "cmma_danis"."resource" r LEFT JOIN "cmma_danis"."account" a ON r."resourceId" = a."resourceId" WHERE r."email" = 'unprovisioned@danis.com';`.
- **Expected DB State:**
  1. `r.resourceId` is NOT NULL.
  2. `a.accountId` is NULL.
  3. Identifies the account state corresponding to `NO_ACCOUNT` response in `/api/auth/check-auth-type`.
- **Priority:** P2
- **Risk:** Medium
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.3, REQ-LOGIN-008, DB-LOGIN-005

---

### TC-LOGIN-DB-015: Failed Login Attempt Does Not Advance `lastLoginAt`

- **ID:** `TC-LOGIN-DB-015`
- **Title:** Verify `cmma_core.platformAdmin.lastLoginAt` is NOT modified upon failed login attempt
- **Requirement ID:** `REQ-LOGIN-001`, `DB-LOGIN-001`
- **Scenario ID:** `DB-ADMIN-LAST-LOGIN-NO-UPDATE-ON-FAIL`
- **DB Entity:** `cmma_core.platformAdmin`
- **Preconditions:**
  1. Platform admin exists with known `lastLoginAt` timestamp $T_{\text{prev}}$.
- **Test Data:**
  - Email: `admin@cmma.io`
  - Password: `WrongPassword123!`
- **Steps:**
  1. Query initial `lastLoginAt` value ($T_{\text{prev}}$).
  2. Submit invalid login request to `POST /api/auth/login`.
  3. Query `lastLoginAt` again from `cmma_core.platformAdmin`.
- **Expected DB State:**
  1. `lastLoginAt` remains exactly equal to $T_{\text{prev}}$ (unchanged).
- **Priority:** P2
- **Risk:** Low
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §2.1, DB-LOGIN-001

---

## 3. Information Gaps Affecting Database Test Cases

The following information gaps from `qa/analysis/LoginFeature_QA_Analysis.md` directly impact database-level testing:

1. **GAP-029 (Index Strategy):** The spec does not define indexes on `mfaVerification.deviceFingerprint` or `mfaVerification.expiresAt`, which are queried in the hot authentication path.
2. **GAP-030 (MFA Records Cleanup Policy):** No database cleanup, TTL, or archiving strategy is specified for stale `mfaVerification` records.
3. **GAP-031 (`platformAdmin.isActive` Enforcement):** `isActive` is listed in the TypeORM entity, but the specification does not detail how or if this column is evaluated in the authentication query.
4. **GAP-032 (Differentiated Account Status Logic):** The spec specifies an `account.status = 'ACTIVE'` check, but does not distinguish between `INACTIVE` vs. `DEACTIVATED` behavior at the database query level.
5. **GAP-035 (Audit Logging):** No dedicated audit log table (e.g. `authAuditLog`, `loginHistory`) is defined in `Spec_LoginFeature.md`.
