# API Test Cases: Authentication & Session Management (Login Feature)

**Feature:** feat-login  
**Epic:** epic-auth  
**Source Specification:** `specs/Spec_LoginFeature.md` (v1.0 — Approved)  
**QA Analysis Reference:** `qa/analysis/LoginFeature_QA_Analysis.md`  
**Test Plan Reference:** `qa/test-plan/Login_TestPlan.md`  
**Target File:** `qa/test-cases/API/Login_API_TestCases.md`  

---

## 1. Overview & API Test Suite Summary

This test suite covers the backend API contracts for the CMMA Platform Authentication & Session Management feature. All endpoints, parameters, headers, status codes, and response payloads are derived strictly from explicit definitions in `specs/Spec_LoginFeature.md`.

### Endpoints Under Test

| Endpoint | Method | Purpose | Rate Limit |
| :--- | :--- | :--- | :--- |
| `/api/auth/login` | POST | Primary email/password credential verification for Platform Admin and Tenant User | 5 req / 60s per IP |
| `/api/auth/entra` | POST | Microsoft Entra ID corporate SSO token exchange | 5 req / 60s per IP |
| `/api/auth/check-auth-type` | POST | Account state and auth provider resolution | 10 req / 60s per IP |
| `/api/auth/config` | GET | Tenant branding, theme colors, and auth provider feature flags | Not specified |
| `/api/session/login` | POST | Next.js session bridge establishing HTTP-only `cmma_session` cookie | Not specified |
| `/api/session/logout` | POST | Next.js session bridge expiring `cmma_session` cookie | Not specified |

### Test Case Coverage Matrix

| Test Case ID | Endpoint | Method | Key Scenario | Expected Status | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-LOGIN-API-001** | `/api/auth/login` | POST | Platform Admin Local Login with Trusted Device | 200 OK | P1 |
| **TC-LOGIN-API-002** | `/api/auth/login` | POST | Tenant User Local Login with Trusted Device | 200 OK | P1 |
| **TC-LOGIN-API-003** | `/api/auth/login` | POST | Context Resolution via `X-Tenant-Slug` Header | 200 OK | P1 |
| **TC-LOGIN-API-004** | `/api/auth/login` | POST | Stale / Expired Device Fingerprint Triggers MFA | 200 OK | P1 |
| **TC-LOGIN-API-005** | `/api/auth/login` | POST | Untrusted Device Fingerprint Triggers MFA | 200 OK | P1 |
| **TC-LOGIN-API-006** | `/api/auth/login` | POST | Missing Device Fingerprint Triggers MFA | 200 OK | P1 |
| **TC-LOGIN-API-007** | `/api/auth/login` | POST | Validation Error: Missing Email | 400 Bad Request | P1 |
| **TC-LOGIN-API-008** | `/api/auth/login` | POST | Validation Error: Missing Password | 400 Bad Request | P1 |
| **TC-LOGIN-API-009** | `/api/auth/login` | POST | Invalid Password / Credentials | 401 Unauthorized / Rejection | P1 |
| **TC-LOGIN-API-010** | `/api/auth/login` | POST | Deactivated Tenant Account Blocked | 401 / Rejection | P1 |
| **TC-LOGIN-API-011** | `/api/auth/login` | POST | SSO-Enforced Account Blocked from Local Login | 401 / Rejection | P1 |
| **TC-LOGIN-API-012** | `/api/auth/login` | POST | Rate Limit Throttling (6th request in 60s) | 429 Too Many Requests | P1 |
| **TC-LOGIN-API-013** | `/api/auth/entra` | POST | Valid Entra SSO Token Exchange | 200 OK | P1 |
| **TC-LOGIN-API-014** | `/api/auth/entra` | POST | Validation Error: Missing Token | 400 Bad Request | P1 |
| **TC-LOGIN-API-015** | `/api/auth/entra` | POST | Invalid / Expired Entra JWT Token | 401 / Rejection | P1 |
| **TC-LOGIN-API-016** | `/api/auth/entra` | POST | Rate Limit Throttling (6th request in 60s) | 429 Too Many Requests | P1 |
| **TC-LOGIN-API-017** | `/api/auth/check-auth-type` | POST | Resolve Account with `LOCAL` Auth Type | 200 OK | P1 |
| **TC-LOGIN-API-018** | `/api/auth/check-auth-type` | POST | Resolve Account with `ENTRA` SSO Auth Type | 200 OK | P1 |
| **TC-LOGIN-API-019** | `/api/auth/check-auth-type` | POST | Resolve `DISABLED` Account State | 200 OK | P1 |
| **TC-LOGIN-API-020** | `/api/auth/check-auth-type` | POST | Resolve `NO_ACCOUNT` Unprovisioned State | 200 OK | P1 |
| **TC-LOGIN-API-021** | `/api/auth/check-auth-type` | POST | Resolve `NOT_FOUND` Unassigned Email State | 200 OK | P1 |
| **TC-LOGIN-API-022** | `/api/auth/check-auth-type` | POST | Rate Limit Throttling (11th request in 60s) | 429 Too Many Requests | P1 |
| **TC-LOGIN-API-023** | `/api/auth/config` | GET | Resolve Tenant Config via Query Parameter (`slug`) | 200 OK | P2 |
| **TC-LOGIN-API-024** | `/api/auth/config` | GET | Resolve Tenant Config via `X-Tenant-Slug` Header | 200 OK | P2 |
| **TC-LOGIN-API-025** | `/api/auth/config` | GET | Resolve Config for Non-Existent Tenant | 404 / Error State | P2 |
| **TC-LOGIN-API-026** | `/api/session/login` | POST | Set `cmma_session` HTTP-Only Session Cookie | 200 OK | P1 |
| **TC-LOGIN-API-027** | `/api/session/logout` | POST | Expire `cmma_session` Session Cookie (`Max-Age=0`) | 200 OK | P1 |
| **TC-LOGIN-API-028** | `/api/auth/login` | POST | Cross-Context Isolation Enforcement | 401 / Rejection | P1 |

---

## 2. Test Cases

---

### TC-LOGIN-API-001: Platform Admin Local Login with Trusted Device

- **ID:** `TC-LOGIN-API-001`
- **Title:** Verify successful local login and JWT issuance for Platform Admin using trusted device fingerprint
- **Requirement ID:** `REQ-LOGIN-001`, `REQ-LOGIN-004`, `REQ-LOGIN-007`, `BR-LOGIN-001`, `BR-LOGIN-004`
- **Scenario ID:** `API-AUTH-LOGIN-ADMIN-PASS`
- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "email": "admin@cmma.io",
    "password": "SecureAdminPassword123!",
    "tenantSlug": "cmma-dev",
    "deviceFingerprint": "trusted-admin-fp-001"
  }
  ```
- **Preconditions:**
  1. Record exists in `cmma_core.platformAdmin` with email `admin@cmma.io`, matching bcrypt `passwordHash`, and `authProvider = 'LOCAL'`.
  2. Record exists in `cmma_core.mfaVerification` with `platformAdminId` matching admin, `deviceFingerprint = 'trusted-admin-fp-001'`, `isTrusted = true`, and `expiresAt > NOW()`.
- **Steps:**
  1. Send `POST` request to `/api/auth/login` with valid platform admin credentials and trusted device fingerprint.
  2. Inspect response status code and body.
  3. Verify `cmma_core.platformAdmin.lastLoginAt` is updated in the database.
- **Expected Status:** `200 OK`
- **Expected Response:**
  ```json
  {
    "access_token": "<VALID_JWT_TOKEN>",
    "user": {
      "id": "admin-uuid-1234",
      "email": "admin@cmma.io",
      "firstName": "Platform",
      "lastName": "Admin",
      "role": "System Admin",
      "roles": ["System Admin"],
      "permissions": ["users.create", "users.edit"],
      "tenantRoles": []
    }
  }
  ```
- **Priority:** P1
- **Risk:** High
- **Automation Candidate:** Yes (Postman / Supertest)
- **Regression Candidate:** Yes
- **Traceability:** Spec §1.1, §3.1, REQ-LOGIN-001, REQ-LOGIN-004, REQ-LOGIN-007, API-LOGIN-001

---

### TC-LOGIN-API-002: Tenant User Local Login with Trusted Device

- **ID:** `TC-LOGIN-API-002`
- **Title:** Verify successful local login and JWT issuance for Tenant User using trusted device fingerprint
- **Requirement ID:** `REQ-LOGIN-002`, `REQ-LOGIN-004`, `REQ-LOGIN-007`, `BR-LOGIN-002`, `BR-LOGIN-004`
- **Scenario ID:** `API-AUTH-LOGIN-TENANT-PASS`
- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "email": "user@danis.com",
    "password": "SecurePassword123!",
    "tenantSlug": "danis",
    "deviceFingerprint": "trusted-tenant-fp-999"
  }
  ```
- **Preconditions:**
  1. Tenant schema `cmma_danis` exists.
  2. Record in `cmma_danis.resource` exists with email `user@danis.com`.
  3. Linked record in `cmma_danis.account` has matching bcrypt `passwordHash` and `status = 'ACTIVE'`.
  4. Record in `cmma_danis.mfaVerification` exists with `deviceFingerprint = 'trusted-tenant-fp-999'`, `isTrusted = true`, and `expiresAt > NOW()`.
- **Steps:**
  1. Send `POST` request to `/api/auth/login` with tenant slug `danis` and valid credentials.
  2. Inspect response status code, JWT schema, and user payload.
- **Expected Status:** `200 OK`
- **Expected Response:**
  ```json
  {
    "access_token": "<VALID_JWT_TOKEN>",
    "user": {
      "id": "acc-uuid-1234",
      "email": "user@danis.com",
      "firstName": "Hanish",
      "lastName": "Donthy",
      "role": "System Admin",
      "roles": ["System Admin"],
      "permissions": ["users.create", "users.edit"],
      "tenantRoles": [
        {
          "tenantId": "tenant-uuid-5678",
          "tenantName": "Danis Inc",
          "roleId": "role-uuid-1",
          "roleName": "System Admin"
        }
      ]
    }
  }
  ```
- **Priority:** P1
- **Risk:** High
- **Automation Candidate:** Yes (Postman / Supertest)
- **Regression Candidate:** Yes
- **Traceability:** Spec §1.1, §3.1, REQ-LOGIN-002, REQ-LOGIN-004, REQ-LOGIN-007, API-LOGIN-001

---

### TC-LOGIN-API-003: Context Resolution via `X-Tenant-Slug` Header

- **ID:** `TC-LOGIN-API-003`
- **Title:** Verify tenant context is correctly resolved when `tenantSlug` is provided via `X-Tenant-Slug` header instead of body
- **Requirement ID:** `REQ-LOGIN-002`, `BR-LOGIN-011`
- **Scenario ID:** `API-AUTH-LOGIN-HEADER-CONTEXT`
- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  X-Tenant-Slug: danis
  ```
- **Request:**
  ```json
  {
    "email": "user@danis.com",
    "password": "SecurePassword123!",
    "deviceFingerprint": "trusted-tenant-fp-999"
  }
  ```
- **Preconditions:**
  1. Valid tenant user exists in `cmma_danis` with pre-trusted device fingerprint.
- **Steps:**
  1. Omit `tenantSlug` from request body.
  2. Set `X-Tenant-Slug: danis` in request headers.
  3. Send `POST /api/auth/login`.
- **Expected Status:** `200 OK`
- **Expected Response:** Successful authentication response payload matching `cmma_danis` account.
- **Priority:** P1
- **Risk:** Medium
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.1, BR-LOGIN-011, REQ-LOGIN-002

---

### TC-LOGIN-API-004: Stale / Expired Device Fingerprint Triggers MFA

- **ID:** `TC-LOGIN-API-004`
- **Title:** Verify that login with an expired device fingerprint returns MFA challenge response
- **Requirement ID:** `REQ-LOGIN-005`, `REQ-LOGIN-006`, `BR-LOGIN-004`, `BR-LOGIN-005`
- **Scenario ID:** `API-AUTH-LOGIN-MFA-STALE`
- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "email": "user@danis.com",
    "password": "SecurePassword123!",
    "tenantSlug": "danis",
    "deviceFingerprint": "expired-device-fp-100"
  }
  ```
- **Preconditions:**
  1. Valid credentials in `cmma_danis.account`.
  2. Record in `cmma_danis.mfaVerification` has `deviceFingerprint = 'expired-device-fp-100'`, `isTrusted = true`, but `expiresAt <= NOW()` (timestamp in the past).
- **Steps:**
  1. Send `POST /api/auth/login` with valid credentials and expired device fingerprint.
  2. Inspect response status code and payload.
- **Expected Status:** `200 OK`
- **Expected Response:**
  ```json
  {
    "mfa_required": true,
    "email": "user@danis.com"
  }
  ```
- **Priority:** P1
- **Risk:** High
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §1.1, §3.1, §4.2, REQ-LOGIN-005, REQ-LOGIN-006, BR-LOGIN-005

---

### TC-LOGIN-API-005: Untrusted Device Fingerprint Triggers MFA

- **ID:** `TC-LOGIN-API-005`
- **Title:** Verify that login with an unverified/untrusted device fingerprint returns MFA challenge response
- **Requirement ID:** `REQ-LOGIN-005`, `REQ-LOGIN-006`, `BR-LOGIN-004`, `BR-LOGIN-005`
- **Scenario ID:** `API-AUTH-LOGIN-MFA-UNTRUSTED`
- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "email": "user@danis.com",
    "password": "SecurePassword123!",
    "tenantSlug": "danis",
    "deviceFingerprint": "untrusted-device-fp-200"
  }
  ```
- **Preconditions:**
  1. Record in `mfaVerification` has `deviceFingerprint = 'untrusted-device-fp-200'` with `isTrusted = false`.
- **Steps:**
  1. Send `POST /api/auth/login` with valid credentials and untrusted fingerprint.
- **Expected Status:** `200 OK`
- **Expected Response:**
  ```json
  {
    "mfa_required": true,
    "email": "user@danis.com"
  }
  ```
- **Priority:** P1
- **Risk:** High
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.1, §4.2, REQ-LOGIN-005, REQ-LOGIN-006, BR-LOGIN-004

---

### TC-LOGIN-API-006: Missing Device Fingerprint Triggers MFA

- **ID:** `TC-LOGIN-API-006`
- **Title:** Verify that login with an unknown or omitted device fingerprint returns MFA challenge response
- **Requirement ID:** `REQ-LOGIN-005`, `REQ-LOGIN-006`, `BR-LOGIN-005`
- **Scenario ID:** `API-AUTH-LOGIN-MFA-MISSING`
- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "email": "user@danis.com",
    "password": "SecurePassword123!",
    "tenantSlug": "danis",
    "deviceFingerprint": "completely-new-device-fp"
  }
  ```
- **Preconditions:**
  1. Valid credentials in `cmma_danis.account`.
  2. No record exists in `mfaVerification` for `completely-new-device-fp`.
- **Steps:**
  1. Send `POST /api/auth/login` with unrecorded device fingerprint.
- **Expected Status:** `200 OK`
- **Expected Response:**
  ```json
  {
    "mfa_required": true,
    "email": "user@danis.com"
  }
  ```
- **Priority:** P1
- **Risk:** High
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.1, §4.2, REQ-LOGIN-005, REQ-LOGIN-006

---

### TC-LOGIN-API-007: Validation Error: Missing Email

- **ID:** `TC-LOGIN-API-007`
- **Title:** Verify HTTP 400 BadRequestException when `email` is missing in `/api/auth/login` request
- **Requirement ID:** `VAL-LOGIN-001`, `API-LOGIN-001`
- **Scenario ID:** `API-AUTH-LOGIN-VAL-EMAIL`
- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "password": "SecurePassword123!",
    "tenantSlug": "danis"
  }
  ```
- **Preconditions:** None
- **Steps:**
  1. Send `POST /api/auth/login` omitting `email` field from body.
- **Expected Status:** `400 Bad Request`
- **Expected Response:** Error payload indicating BadRequestException (Note: standard envelope format is INFORMATION GAP — GAP-024).
- **Priority:** P1
- **Risk:** Medium
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.1 (Step 1), VAL-LOGIN-001

---

### TC-LOGIN-API-008: Validation Error: Missing Password

- **ID:** `TC-LOGIN-API-008`
- **Title:** Verify HTTP 400 BadRequestException when `password` is missing in `/api/auth/login` request
- **Requirement ID:** `VAL-LOGIN-002`, `API-LOGIN-001`
- **Scenario ID:** `API-AUTH-LOGIN-VAL-PWD`
- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "email": "user@danis.com",
    "tenantSlug": "danis"
  }
  ```
- **Preconditions:** None
- **Steps:**
  1. Send `POST /api/auth/login` omitting `password` field from body.
- **Expected Status:** `400 Bad Request`
- **Expected Response:** Error payload indicating BadRequestException.
- **Priority:** P1
- **Risk:** Medium
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.1 (Step 1), VAL-LOGIN-002

---

### TC-LOGIN-API-009: Invalid Password / Credentials

- **ID:** `TC-LOGIN-API-009`
- **Title:** Verify authentication rejection when invalid password is submitted
- **Requirement ID:** `UI-LOGIN-003`, `SEC-LOGIN-004`
- **Scenario ID:** `API-AUTH-LOGIN-INVALID-PWD`
- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "email": "user@danis.com",
    "password": "WrongPassword999!",
    "tenantSlug": "danis"
  }
  ```
- **Preconditions:**
  1. User `user@danis.com` exists.
- **Steps:**
  1. Send `POST /api/auth/login` with incorrect password.
- **Expected Status:** `401 Unauthorized` (or rejection status)
- **Expected Response:** Error response indicating invalid credentials; no token issued.
- **Priority:** P1
- **Risk:** High
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.1 (Step 3), §5 (TC-LOGIN-03)

---

### TC-LOGIN-API-010: Deactivated Tenant Account Blocked

- **ID:** `TC-LOGIN-API-010`
- **Title:** Verify authentication rejection when account `status` is `DEACTIVATED`
- **Requirement ID:** `REQ-LOGIN-002`, `DB-LOGIN-003`
- **Scenario ID:** `API-AUTH-LOGIN-DEACTIVATED`
- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "email": "deactivated@danis.com",
    "password": "ValidPassword123!",
    "tenantSlug": "danis"
  }
  ```
- **Preconditions:**
  1. Record in `cmma_danis.account` has `status = 'DEACTIVATED'`.
- **Steps:**
  1. Send `POST /api/auth/login` for deactivated account.
- **Expected Status:** `401 Unauthorized` (or rejection status)
- **Expected Response:** Authentication rejected; account disabled notice.
- **Priority:** P1
- **Risk:** High
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.1 (Step 3), DB-LOGIN-003

---

### TC-LOGIN-API-011: SSO-Enforced Account Blocked from Local Login

- **ID:** `TC-LOGIN-API-011`
- **Title:** Verify that local password authentication is rejected for SSO-enforced corporate accounts
- **Requirement ID:** `REQ-LOGIN-017`, `BR-LOGIN-010`, `SEC-LOGIN-007`
- **Scenario ID:** `API-AUTH-LOGIN-SSO-ENFORCE`
- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "email": "sso.user@danis.com",
    "password": "SomePassword123!",
    "tenantSlug": "danis"
  }
  ```
- **Preconditions:**
  1. Account in `cmma_danis.account` has `authProvider = 'ENTRA'` or active SSO enforcement.
- **Steps:**
  1. Send `POST /api/auth/login` attempting local password authentication.
- **Expected Status:** `401 Unauthorized` / `400 Bad Request`
- **Expected Response:** Rejection message indicating corporate SSO authentication is required.
- **Priority:** P1
- **Risk:** High
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §4.3, BR-LOGIN-010, REQ-LOGIN-017, SEC-LOGIN-007

---

### TC-LOGIN-API-012: Rate Limit Throttling for `/api/auth/login`

- **ID:** `TC-LOGIN-API-012`
- **Title:** Verify rate limit throttling to 5 requests per 60 seconds on `/api/auth/login`
- **Requirement ID:** `SEC-LOGIN-001`, `API-LOGIN-001`
- **Scenario ID:** `API-AUTH-LOGIN-RATE-LIMIT`
- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "email": "test@danis.com",
    "password": "Password123!",
    "tenantSlug": "danis"
  }
  ```
- **Preconditions:**
  1. Rate limiter active (`limit: 5, ttl: 60000`).
- **Steps:**
  1. Send 5 consecutive requests to `POST /api/auth/login` from the same client IP within 60 seconds.
  2. Send a 6th request within the same 60-second window.
- **Expected Status:**
  - Requests 1–5: Standard status (`200` or `401`)
  - Request 6: `429 Too Many Requests`
- **Expected Response:** Throttled response; rate limit exceeded.
- **Priority:** P1
- **Risk:** Medium
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.1, §4.1, SEC-LOGIN-001

---

### TC-LOGIN-API-013: Valid Entra SSO Token Exchange

- **ID:** `TC-LOGIN-API-013`
- **Title:** Verify Microsoft Entra ID SSO token verification and system JWT issuance
- **Requirement ID:** `REQ-LOGIN-003`, `API-LOGIN-002`
- **Scenario ID:** `API-AUTH-ENTRA-PASS`
- **Endpoint:** `/api/auth/entra`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tenantSlug": "danis"
  }
  ```
- **Preconditions:**
  1. Valid Azure Entra ID RS256 token signed by configured Entra tenant.
  2. Extracted `upn` / `email` matches `cmma_danis.account.ssoProviderUserId` or `cmma_core.platformAdmin`.
- **Steps:**
  1. Send `POST /api/auth/entra` with valid Entra token.
  2. Verify backend validates JWT via public keys, matches user, and issues system JWT.
- **Expected Status:** `200 OK`
- **Expected Response:**
  ```json
  {
    "access_token": "<VALID_JWT_TOKEN>",
    "user": {
      "id": "acc-uuid-1234",
      "email": "user@danis.com",
      "firstName": "Hanish",
      "lastName": "Donthy",
      "role": "System Admin",
      "roles": ["System Admin"],
      "permissions": ["users.create", "users.edit"],
      "tenantRoles": [...]
    }
  }
  ```
- **Priority:** P1
- **Risk:** High
- **Automation Candidate:** Yes (with mocked/valid test JWT)
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.2, REQ-LOGIN-003, API-LOGIN-002

---

### TC-LOGIN-API-014: Validation Error: Missing Token in `/api/auth/entra`

- **ID:** `TC-LOGIN-API-014`
- **Title:** Verify HTTP 400 BadRequestException when `token` is missing in `/api/auth/entra`
- **Requirement ID:** `VAL-LOGIN-004`, `API-LOGIN-002`
- **Scenario ID:** `API-AUTH-ENTRA-VAL-TOKEN`
- **Endpoint:** `/api/auth/entra`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "tenantSlug": "danis"
  }
  ```
- **Preconditions:** None
- **Steps:**
  1. Send `POST /api/auth/entra` without `token` property.
- **Expected Status:** `400 Bad Request`
- **Expected Response:** BadRequestException error payload.
- **Priority:** P1
- **Risk:** Medium
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.2 (Step 1), VAL-LOGIN-004

---

### TC-LOGIN-API-015: Invalid / Expired Entra JWT Token

- **ID:** `TC-LOGIN-API-015`
- **Title:** Verify rejection when invalid or expired Entra JWT token is submitted
- **Requirement ID:** `REQ-LOGIN-003`, `API-LOGIN-002`
- **Scenario ID:** `API-AUTH-ENTRA-INVALID-TOKEN`
- **Endpoint:** `/api/auth/entra`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "token": "invalid.or.expired.jwt.token",
    "tenantSlug": "danis"
  }
  ```
- **Preconditions:** None
- **Steps:**
  1. Send `POST /api/auth/entra` with malformed or expired JWT.
- **Expected Status:** `401 Unauthorized` / `400 Bad Request`
- **Expected Response:** Rejection payload indicating invalid token.
- **Priority:** P1
- **Risk:** High
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.2 (Step 2), REQ-LOGIN-003

---

### TC-LOGIN-API-016: Rate Limit Throttling for `/api/auth/entra`

- **ID:** `TC-LOGIN-API-016`
- **Title:** Verify rate limit throttling to 5 requests per 60 seconds on `/api/auth/entra`
- **Requirement ID:** `SEC-LOGIN-002`, `API-LOGIN-002`
- **Scenario ID:** `API-AUTH-ENTRA-RATE-LIMIT`
- **Endpoint:** `/api/auth/entra`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "token": "some.token.value",
    "tenantSlug": "danis"
  }
  ```
- **Preconditions:**
  1. Rate limiter active (limit: 5, ttl: 60000).
- **Steps:**
  1. Send 5 consecutive requests to `/api/auth/entra` from the same IP within 60s.
  2. Send 6th request within the same window.
- **Expected Status:**
  - Requests 1–5: `200` / `400` / `401`
  - Request 6: `429 Too Many Requests`
- **Expected Response:** Rate limit exceeded.
- **Priority:** P1
- **Risk:** Medium
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.2, SEC-LOGIN-002

---

### TC-LOGIN-API-017: Resolve Account with `LOCAL` Auth Type

- **ID:** `TC-LOGIN-API-017`
- **Title:** Verify `/api/auth/check-auth-type` returns LOCAL for email/password configured user
- **Requirement ID:** `REQ-LOGIN-008`, `API-LOGIN-003`
- **Scenario ID:** `API-CHECK-AUTH-LOCAL`
- **Endpoint:** `/api/auth/check-auth-type`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "email": "local.user@danis.com",
    "tenantSlug": "danis"
  }
  ```
- **Preconditions:**
  1. Account in `cmma_danis.account` has `passwordHash` populated and `ssoProviderUserId = null`.
- **Steps:**
  1. Send `POST /api/auth/check-auth-type`.
- **Expected Status:** `200 OK`
- **Expected Response:**
  ```json
  {
    "authType": "LOCAL",
    "isSso": false
  }
  ```
- **Priority:** P1
- **Risk:** Medium
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.3, REQ-LOGIN-008, API-LOGIN-003

---

### TC-LOGIN-API-018: Resolve Account with `ENTRA` SSO Auth Type

- **ID:** `TC-LOGIN-API-018`
- **Title:** Verify `/api/auth/check-auth-type` returns ENTRA for corporate SSO enforced user
- **Requirement ID:** `REQ-LOGIN-008`, `API-LOGIN-003`
- **Scenario ID:** `API-CHECK-AUTH-ENTRA`
- **Endpoint:** `/api/auth/check-auth-type`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "email": "sso.user@danis.com",
    "tenantSlug": "danis"
  }
  ```
- **Preconditions:**
  1. Account in `cmma_danis.account` has `ssoProviderUserId` populated.
- **Steps:**
  1. Send `POST /api/auth/check-auth-type`.
- **Expected Status:** `200 OK`
- **Expected Response:**
  ```json
  {
    "authType": "ENTRA",
    "isSso": true,
    "message": "<MESSAGE_STRING>"
  }
  ```
- **Priority:** P1
- **Risk:** Medium
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.3, REQ-LOGIN-008, API-LOGIN-003

---

### TC-LOGIN-API-019: Resolve `DISABLED` Account State

- **ID:** `TC-LOGIN-API-019`
- **Title:** Verify `/api/auth/check-auth-type` returns DISABLED for deactivated user account
- **Requirement ID:** `REQ-LOGIN-008`, `API-LOGIN-003`
- **Scenario ID:** `API-CHECK-AUTH-DISABLED`
- **Endpoint:** `/api/auth/check-auth-type`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "email": "disabled.user@danis.com",
    "tenantSlug": "danis"
  }
  ```
- **Preconditions:**
  1. Account has `status = 'DEACTIVATED'` or disabled flag.
- **Steps:**
  1. Send `POST /api/auth/check-auth-type`.
- **Expected Status:** `200 OK`
- **Expected Response:**
  ```json
  {
    "authType": "DISABLED",
    "isDisabled": true,
    "message": "<MESSAGE_STRING>"
  }
  ```
- **Priority:** P1
- **Risk:** Medium
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.3, REQ-LOGIN-008, API-LOGIN-003

---

### TC-LOGIN-API-020: Resolve `NO_ACCOUNT` Unprovisioned State

- **ID:** `TC-LOGIN-API-020`
- **Title:** Verify `/api/auth/check-auth-type` returns NO_ACCOUNT for unprovisioned worker resource
- **Requirement ID:** `REQ-LOGIN-008`, `API-LOGIN-003`
- **Scenario ID:** `API-CHECK-AUTH-NO-ACCOUNT`
- **Endpoint:** `/api/auth/check-auth-type`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "email": "worker.no.account@danis.com",
    "tenantSlug": "danis"
  }
  ```
- **Preconditions:**
  1. Record in `cmma_danis.resource` exists, but no linked record in `cmma_danis.account` exists.
- **Steps:**
  1. Send `POST /api/auth/check-auth-type`.
- **Expected Status:** `200 OK`
- **Expected Response:**
  ```json
  {
    "authType": "NO_ACCOUNT",
    "isNoAccount": true,
    "message": "<MESSAGE_STRING>"
  }
  ```
- **Priority:** P1
- **Risk:** Medium
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.3, REQ-LOGIN-008, API-LOGIN-003

---

### TC-LOGIN-API-021: Resolve `NOT_FOUND` Unassigned Email State

- **ID:** `TC-LOGIN-API-021`
- **Title:** Verify `/api/auth/check-auth-type` returns NOT_FOUND for unknown email
- **Requirement ID:** `REQ-LOGIN-008`, `API-LOGIN-003`
- **Scenario ID:** `API-CHECK-AUTH-NOT-FOUND`
- **Endpoint:** `/api/auth/check-auth-type`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "email": "nonexistent@danis.com",
    "tenantSlug": "danis"
  }
  ```
- **Preconditions:**
  1. Email `nonexistent@danis.com` does not exist in any resource/account table.
- **Steps:**
  1. Send `POST /api/auth/check-auth-type`.
- **Expected Status:** `200 OK`
- **Expected Response:**
  ```json
  {
    "authType": "NOT_FOUND",
    "notFound": true,
    "message": "<MESSAGE_STRING>"
  }
  ```
- **Priority:** P1
- **Risk:** Medium
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.3, REQ-LOGIN-008, API-LOGIN-003

---

### TC-LOGIN-API-022: Rate Limit Throttling for `/api/auth/check-auth-type`

- **ID:** `TC-LOGIN-API-022`
- **Title:** Verify rate limit throttling to 10 requests per 60 seconds on `/api/auth/check-auth-type`
- **Requirement ID:** `SEC-LOGIN-003`, `API-LOGIN-003`
- **Scenario ID:** `API-CHECK-AUTH-RATE-LIMIT`
- **Endpoint:** `/api/auth/check-auth-type`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "email": "test@danis.com",
    "tenantSlug": "danis"
  }
  ```
- **Preconditions:**
  1. Rate limiter active (limit: 10, ttl: 60000).
- **Steps:**
  1. Send 10 consecutive requests to `/api/auth/check-auth-type` within 60s from same IP.
  2. Send an 11th request within the same 60s window.
- **Expected Status:**
  - Requests 1–10: `200 OK`
  - Request 11: `429 Too Many Requests`
- **Expected Response:** Rate limit exceeded.
- **Priority:** P1
- **Risk:** Medium
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.3, SEC-LOGIN-003

---

### TC-LOGIN-API-023: Resolve Tenant Config via Query Parameter (`slug`)

- **ID:** `TC-LOGIN-API-023`
- **Title:** Verify `GET /api/auth/config?slug=<tenant>` returns tenant branding and auth flags
- **Requirement ID:** `REQ-LOGIN-009`, `API-LOGIN-004`
- **Scenario ID:** `API-CONFIG-QUERY-PARAM`
- **Endpoint:** `/api/auth/config`
- **Method:** `GET`
- **Headers:** None required
- **Request:** Query Param: `?slug=danis`
- **Preconditions:**
  1. Tenant `danis` configuration is active in database.
- **Steps:**
  1. Send `GET /api/auth/config?slug=danis`.
  2. Inspect response body structure.
- **Expected Status:** `200 OK`
- **Expected Response:**
  ```json
  {
    "tenant": {
      "id": "tenant-uuid-1",
      "name": "Danis",
      "logo_url": "https://cdn.example.com/logo.png",
      "theme_color": "#003B5C"
    },
    "auth": {
      "local_enabled": true,
      "entra_enabled": true,
      "entra_client_id": "87654321-abcd-1234-efgh-901234567890",
      "entra_tenant_id": "12345678-abcd-1234-efgh-123456789012"
    }
  }
  ```
- **Priority:** P2
- **Risk:** Low
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.4, REQ-LOGIN-009, API-LOGIN-004

---

### TC-LOGIN-API-024: Resolve Tenant Config via `X-Tenant-Slug` Header

- **ID:** `TC-LOGIN-API-024`
- **Title:** Verify `GET /api/auth/config` resolves tenant configuration using `X-Tenant-Slug` header
- **Requirement ID:** `REQ-LOGIN-009`, `API-LOGIN-004`
- **Scenario ID:** `API-CONFIG-HEADER`
- **Endpoint:** `/api/auth/config`
- **Method:** `GET`
- **Headers:**
  ```http
  X-Tenant-Slug: danis
  ```
- **Request:** No query parameter
- **Preconditions:**
  1. Tenant `danis` exists.
- **Steps:**
  1. Send `GET /api/auth/config` with header `X-Tenant-Slug: danis`.
- **Expected Status:** `200 OK`
- **Expected Response:** Matches tenant `danis` configuration.
- **Priority:** P2
- **Risk:** Low
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.4, REQ-LOGIN-009

---

### TC-LOGIN-API-025: Resolve Config for Non-Existent Tenant

- **ID:** `TC-LOGIN-API-025`
- **Title:** Verify error handling when requesting configuration for an invalid/unknown tenant slug
- **Requirement ID:** `REQ-LOGIN-009`, `API-LOGIN-004`
- **Scenario ID:** `API-CONFIG-NOT-FOUND`
- **Endpoint:** `/api/auth/config`
- **Method:** `GET`
- **Headers:** None
- **Request:** Query Param: `?slug=unknown-nonexistent-tenant`
- **Preconditions:** None
- **Steps:**
  1. Send `GET /api/auth/config?slug=unknown-nonexistent-tenant`.
- **Expected Status:** `404 Not Found` (or error response)
- **Expected Response:** Error payload indicating tenant not found (Note: GAP-013).
- **Priority:** P2
- **Risk:** Medium
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.4, REQ-LOGIN-009

---

### TC-LOGIN-API-026: Set `cmma_session` HTTP-Only Session Cookie

- **ID:** `TC-LOGIN-API-026`
- **Title:** Verify Next.js session bridge endpoint sets secure `cmma_session` cookie with 8-hour max-age
- **Requirement ID:** `REQ-LOGIN-010`, `SES-LOGIN-002`, `SES-LOGIN-003`, `API-LOGIN-005`
- **Scenario ID:** `API-SESSION-LOGIN-BRIDGE`
- **Endpoint:** `/api/session/login`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "acc-uuid-1234",
      "email": "user@danis.com",
      "firstName": "Hanish",
      "lastName": "Donthy"
    }
  }
  ```
- **Preconditions:** Valid JWT token generated from primary auth endpoint.
- **Steps:**
  1. Send `POST /api/session/login` with token and user payload.
  2. Inspect response headers for `Set-Cookie`.
- **Expected Status:** `200 OK`
- **Expected Response:**
  - `Set-Cookie` header contains: `cmma_session=...; HttpOnly; Secure; SameSite=Lax; Max-Age=28800; Path=/`
- **Priority:** P1
- **Risk:** High
- **Automation Candidate:** Yes (Supertest / Playwright API request)
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.5, REQ-LOGIN-010, SES-LOGIN-002, SES-LOGIN-003, API-LOGIN-005

---

### TC-LOGIN-API-027: Expire `cmma_session` Session Cookie (`Max-Age=0`)

- **ID:** `TC-LOGIN-API-027`
- **Title:** Verify Next.js session logout endpoint invalidates and expires `cmma_session` cookie
- **Requirement ID:** `REQ-LOGIN-011`, `SES-LOGIN-004`, `API-LOGIN-006`
- **Scenario ID:** `API-SESSION-LOGOUT-BRIDGE`
- **Endpoint:** `/api/session/logout`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  Cookie: cmma_session=existing-session-token-value
  ```
- **Request:** `{}`
- **Preconditions:** Active session cookie exists in client.
- **Steps:**
  1. Send `POST /api/session/logout`.
  2. Inspect response headers for `Set-Cookie`.
- **Expected Status:** `200 OK`
- **Expected Response:**
  - `Set-Cookie` header contains: `cmma_session=; Max-Age=0; Path=/; Expires=...`
- **Priority:** P1
- **Risk:** High
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.5, REQ-LOGIN-011, SES-LOGIN-004, API-LOGIN-006

---

### TC-LOGIN-API-028: Cross-Context Isolation Enforcement

- **ID:** `TC-LOGIN-API-028`
- **Title:** Verify backend strictly rejects Platform Admin login request targeting a tenant context
- **Requirement ID:** `REQ-LOGIN-016`, `BR-LOGIN-008`, `BR-LOGIN-009`, `SEC-LOGIN-006`
- **Scenario ID:** `API-AUTH-CROSS-CONTEXT-BLOCK`
- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request:**
  ```json
  {
    "email": "superadmin@cmma.io",
    "password": "AdminPassword123!",
    "tenantSlug": "danis",
    "deviceFingerprint": "some-fp-123"
  }
  ```
- **Preconditions:**
  1. `superadmin@cmma.io` exists only in `cmma_core.platformAdmin` and NOT in `cmma_danis.account`.
- **Steps:**
  1. Send `POST /api/auth/login` specifying tenant context `danis`.
- **Expected Status:** `401 Unauthorized` / Rejection
- **Expected Response:** Authentication fails; no fallback query to `cmma_core.platformAdmin` is executed.
- **Priority:** P1
- **Risk:** Critical
- **Automation Candidate:** Yes
- **Regression Candidate:** Yes
- **Traceability:** Spec §1.1, §4.3, BR-LOGIN-008, BR-LOGIN-009, REQ-LOGIN-016, SEC-LOGIN-006

---

## 3. Information Gaps Affecting API Test Cases

The following information gaps from `qa/analysis/LoginFeature_QA_Analysis.md` directly impact API assertions:

1. **GAP-014 (Missing MFA OTP Endpoints):** No API endpoints (e.g. `POST /api/auth/mfa/send` or `POST /api/auth/mfa/verify`) are specified in `Spec_LoginFeature.md`, preventing contract testing for OTP completion.
2. **GAP-024 (Standard Error Envelope):** The exact JSON schema for error responses (e.g., `{ "statusCode": 400, "message": "...", "error": "Bad Request" }`) is not defined.
3. **GAP-025 (HTTP 429 Payload):** The response body structure for rate limit exceeded responses is not specified.
4. **GAP-026 & GAP-027 (Rate Limits on Config and Session Routes):** Rate limits for `/api/auth/config`, `/api/session/login`, and `/api/session/logout` are not documented.
5. **GAP-028 (Message Content in check-auth-type):** Exact string values for the `message` field across `ENTRA`, `DISABLED`, `NO_ACCOUNT`, and `NOT_FOUND` are unspecified.
6. **GAP-033 (JWT Algorithm and Expiry):** Secret key handling, signing algorithm (inferred as HS256), and JWT TTL are not explicitly defined.
