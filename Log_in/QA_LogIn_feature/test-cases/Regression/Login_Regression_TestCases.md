# Regression Test Suite: Authentication & Session Management (Login Feature)

**Feature:** feat-login  
**Epic:** epic-auth  
**Source Specification:** `specs/Spec_LoginFeature.md` (v1.0 — Approved)  
**QA Analysis Reference:** `qa/analysis/LoginFeature_QA_Analysis.md`  
**Test Plan Reference:** `qa/test-plan/Login_TestPlan.md`  
**Target File:** `qa/test-cases/Regression/Login_Regression_TestCases.md`  

---

## 1. Executive Summary & Selection Rationale

This regression test suite contains a **focused, high-impact subset of 15 test cases** selected from the comprehensive UI, API, and Database test suites. Cases were chosen based on:

1. **Business Criticality:** Core authentication flows that directly gate platform entry for Tenant Users and Platform Administrators.
2. **Security & Boundary Enforcement:** Critical controls preventing cross-context credential leakage (RISK-001), corporate SSO bypass (RISK-004), and brute-force attacks (SEC-LOGIN-001).
3. **Session Hygiene & Data Leakage Prevention:** Ensuring session cookies are destroyed and browser storage is completely purged on logout to prevent session bleed across users (RISK-003).
4. **MFA Trust State Lifecycle:** Ensuring stale or unrecognized device fingerprints consistently trigger MFA verification (RISK-002).
5. **Architectural Integrity:** Ensuring strict multi-tenant database partitioning across schemas.

### Layer Distribution

| Layer | Case Count | Regression Case IDs |
| :--- | :--- | :--- |
| **UI / Functional** | 7 | `TC-LOGIN-REG-001` through `TC-LOGIN-REG-007` |
| **API / Contract & Security** | 5 | `TC-LOGIN-REG-008` through `TC-LOGIN-REG-012` |
| **Database / Schema Integrity** | 3 | `TC-LOGIN-REG-013` through `TC-LOGIN-REG-015` |
| **Total** | **15** | — |

---

## 2. Regression Test Cases

---

### TC-LOGIN-REG-001: Tenant User Local Login Happy Path (UI)

- **Regression ID:** `TC-LOGIN-REG-001`
- **Original TC ID:** `TC-LOGIN-UI-002`
- **Requirement ID:** `REQ-LOGIN-002`, `REQ-LOGIN-004`, `REQ-LOGIN-007`, `REQ-LOGIN-010`
- **Scenario ID:** `TC-LOGIN-01`
- **Title:** Verify successful tenant user local login with trusted device fingerprint
- **Layer:** UI / Functional
- **Priority:** P1 (Critical)
- **Risk:** High
- **Preconditions:**
  1. Active tenant user in `cmma_danis.account` (`status = 'ACTIVE'`).
  2. Pre-trusted device fingerprint in `cmma_danis.mfaVerification` (`isTrusted = true`, `expiresAt > NOW()`).
- **Test Data:**
  - URL: `https://danis-cmma-dev.cosdevx.com/login`
  - Email: `user@danis.com`
  - Password: `ValidTenantPassword123!`
- **Steps:**
  1. Navigate to tenant login page.
  2. Enter valid credentials and click "Sign In".
- **Expected Result:**
  1. Authenticates without MFA challenge prompt.
  2. Sets `cmma_session` cookie and redirects to `/dashboard`.
- **Regression Reason:** Primary end-user entry flow for all tenant users; regression breaks tenant access completely.
- **Automation Candidate:** Yes (Playwright)
- **Traceability:** Spec §1.1, §3.1, §5 (TC-LOGIN-01), REQ-LOGIN-002, SES-LOGIN-003

---

### TC-LOGIN-REG-002: Platform Admin Local Login Happy Path (UI)

- **Regression ID:** `TC-LOGIN-REG-002`
- **Original TC ID:** `TC-LOGIN-UI-001`
- **Requirement ID:** `REQ-LOGIN-001`, `REQ-LOGIN-004`, `REQ-LOGIN-007`
- **Scenario ID:** `TC-LOGIN-02`
- **Title:** Verify successful platform administrator local login with trusted device fingerprint
- **Layer:** UI / Functional
- **Priority:** P1 (Critical)
- **Risk:** High
- **Preconditions:**
  1. Active platform admin in `cmma_core.platformAdmin` (`isActive = true`, `authProvider = 'LOCAL'`).
  2. Pre-trusted device fingerprint in `cmma_core.mfaVerification`.
- **Test Data:**
  - URL: `https://cmma-dev.cosdevx.com/login`
  - Email: `admin@cmma.io`
  - Password: `ValidAdminPassword123!`
- **Steps:**
  1. Navigate to platform login page.
  2. Enter valid credentials and click "Sign In".
- **Expected Result:**
  1. Authenticates without MFA prompt.
  2. Sets session and redirects to Platform Admin console shell.
  3. `lastLoginAt` timestamp is updated in `cmma_core.platformAdmin`.
- **Regression Reason:** Core operational pathway for platform administrators to manage system settings.
- **Automation Candidate:** Yes (Playwright)
- **Traceability:** Spec §1.1, §3.1, §5 (TC-LOGIN-02), REQ-LOGIN-001, BR-LOGIN-001

---

### TC-LOGIN-REG-003: Stale / Expired Device Fingerprint Triggers MFA Prompt (UI)

- **Regression ID:** `TC-LOGIN-REG-003`
- **Original TC ID:** `TC-LOGIN-UI-008`
- **Requirement ID:** `REQ-LOGIN-005`, `REQ-LOGIN-006`, `BR-LOGIN-004`, `BR-LOGIN-005`, `UI-LOGIN-006`
- **Scenario ID:** `TC-LOGIN-10`
- **Title:** Verify that local login with expired device fingerprint forces MFA OTP challenge
- **Layer:** UI / Security
- **Priority:** P1 (Critical)
- **Risk:** High (MFA Bypass Prevention — RISK-002)
- **Preconditions:**
  1. Valid credentials in tenant schema.
  2. Device fingerprint in `mfaVerification` has `expiresAt <= NOW()`.
- **Test Data:**
  - Email: `user@danis.com`
  - Password: `ValidPassword123!`
  - Device Fingerprint: `stale-device-fp-001`
- **Steps:**
  1. Navigate to login page.
  2. Enter credentials and click "Sign In".
- **Expected Result:**
  1. Redirection to dashboard is blocked.
  2. UI transitions to interactive MFA OTP verification prompt.
- **Regression Reason:** Validates that expired device trust cannot bypass second-factor authentication (mitigates RISK-002).
- **Automation Candidate:** Yes (Playwright)
- **Traceability:** Spec §1.1, §4.2, §5 (TC-LOGIN-10), REQ-LOGIN-005, BR-LOGIN-005, UI-LOGIN-006

---

### TC-LOGIN-REG-004: Microsoft Entra Corporate SSO Login (UI/Integration)

- **Regression ID:** `TC-LOGIN-REG-004`
- **Original TC ID:** `TC-LOGIN-UI-010`
- **Requirement ID:** `REQ-LOGIN-003`
- **Scenario ID:** `TC-LOGIN-09`
- **Title:** Verify corporate Single Sign-On authentication via Microsoft Entra ID token exchange
- **Layer:** UI / Integration
- **Priority:** P1 (High)
- **Risk:** High
- **Preconditions:**
  1. Tenant configured with `entra_enabled = true`.
  2. User linked via `ssoProviderUserId` in tenant schema.
- **Test Data:**
  - Corporate SSO Account: `hanish.donthy@danis.com`
- **Steps:**
  1. Navigate to tenant login page.
  2. Click Microsoft / Corporate SSO button and authenticate against Entra IdP.
- **Expected Result:**
  1. Exchanges verified MSAL token with backend `POST /api/auth/entra`.
  2. Creates session and redirects to dashboard.
- **Regression Reason:** Enterprise client corporate access pathway; validates third-party token exchange contract.
- **Automation Candidate:** No (Manual / Mocked Token per Spec TC-LOGIN-09)
- **Traceability:** Spec §1.1, §3.2, §5 (TC-LOGIN-09), REQ-LOGIN-003

---

### TC-LOGIN-REG-005: SSO-Enforced Account Local Password Bypass Prevention (UI/Security)

- **Regression ID:** `TC-LOGIN-REG-005`
- **Original TC ID:** `TC-LOGIN-UI-011`
- **Requirement ID:** `REQ-LOGIN-017`, `BR-LOGIN-010`, `SEC-LOGIN-007`
- **Scenario ID:** `TC-LOGIN-SSO-BLOCK`
- **Title:** Verify local password login is strictly blocked for SSO-enforced corporate accounts
- **Layer:** UI / Security
- **Priority:** P1 (High)
- **Risk:** High (SSO Downgrade Prevention — RISK-004)
- **Preconditions:**
  1. User account has `authProvider = 'ENTRA'` or active corporate SSO enforcement.
- **Test Data:**
  - Email: `sso.only.user@danis.com`
  - Password: `AnyPassword123!`
- **Steps:**
  1. Enter SSO-enforced email into local password form on login page.
  2. Submit form.
- **Expected Result:**
  1. Local login is rejected.
  2. Error / directive message displayed requiring Single Sign-On.
- **Regression Reason:** Prevents unauthorized downgrade attack where SSO-managed users bypass corporate IdP policies (mitigates RISK-004).
- **Automation Candidate:** Yes (Playwright)
- **Traceability:** Spec §4.3, BR-LOGIN-010, REQ-LOGIN-017, SEC-LOGIN-007

---

### TC-LOGIN-REG-006: Cross-Context Boundary Isolation Enforcement (UI/Security)

- **Regression ID:** `TC-LOGIN-REG-006`
- **Original TC ID:** `TC-LOGIN-UI-012`
- **Requirement ID:** `REQ-LOGIN-016`, `BR-LOGIN-008`, `BR-LOGIN-009`, `SEC-LOGIN-006`
- **Scenario ID:** `TC-LOGIN-ISOL-01`
- **Title:** Verify Platform Admin credentials cannot authenticate via tenant login subdomain
- **Layer:** UI / Security
- **Priority:** P1 (Critical)
- **Risk:** Critical (Cross-Context Credential Leak — RISK-001)
- **Preconditions:**
  1. `superadmin@cmma.io` exists only in `cmma_core.platformAdmin` (not in `cmma_danis`).
- **Test Data:**
  - Subdomain: `https://danis-cmma-dev.cosdevx.com/login`
  - Email: `superadmin@cmma.io`
  - Password: `ValidAdminPassword123!`
- **Steps:**
  1. Navigate to tenant login subdomain.
  2. Enter Platform Admin credentials and submit.
- **Expected Result:**
  1. Query resolves only within `cmma_danis`.
  2. Cross-context lookup to `cmma_core.platformAdmin` is blocked.
  3. Login is rejected with inline credentials error.
- **Regression Reason:** Guarantees strict multi-tenant boundary isolation; prevents cross-schema credential exposure (mitigates RISK-001).
- **Automation Candidate:** Yes (Playwright)
- **Traceability:** Spec §1.1, §4.3, BR-LOGIN-008, BR-LOGIN-009, REQ-LOGIN-016, SEC-LOGIN-006

---

### TC-LOGIN-REG-007: Route Protection Guard for Unauthenticated Requests (UI)

- **Regression ID:** `TC-LOGIN-REG-007`
- **Original TC ID:** `TC-LOGIN-UI-015`
- **Requirement ID:** `REQ-LOGIN-013`, `SES-LOGIN-006`
- **Scenario ID:** `TC-LOGIN-06-GUARD`
- **Title:** Verify unauthenticated direct navigation to protected routes redirects to `/login`
- **Layer:** UI / Route Protection
- **Priority:** P1 (Critical)
- **Risk:** High
- **Preconditions:**
  1. No active session (`cmma_session` cookie absent).
- **Test Data:**
  - Protected URL: `https://danis-cmma-dev.cosdevx.com/dashboard`
- **Steps:**
  1. Enter protected URL directly in browser address bar.
- **Expected Result:**
  1. Next.js middleware intercepts request.
  2. Browser is immediately redirected to `/login`.
- **Regression Reason:** Essential security gate preventing unauthenticated users from viewing protected screens and data.
- **Automation Candidate:** Yes (Playwright)
- **Traceability:** Spec §1.1, §4.4, REQ-LOGIN-013, SES-LOGIN-006

---

### TC-LOGIN-REG-008: User Logout and Session Cookie Destruction (API/UI)

- **Regression ID:** `TC-LOGIN-REG-008`
- **Original TC ID:** `TC-LOGIN-UI-016` (also maps to `TC-LOGIN-API-027`)
- **Requirement ID:** `REQ-LOGIN-011`, `SES-LOGIN-004`
- **Scenario ID:** `TC-LOGIN-06`
- **Title:** Verify logout expires `cmma_session` cookie (`Max-Age=0`) and terminates access
- **Layer:** UI / API
- **Priority:** P1 (High)
- **Risk:** High
- **Preconditions:**
  1. User is logged in with active `cmma_session` cookie.
- **Test Data:**
  - Action: Logout click
- **Steps:**
  1. Trigger logout.
  2. Attempt to navigate back to `/dashboard`.
- **Expected Result:**
  1. Next.js route `/api/session/logout` is called.
  2. `cmma_session` cookie is expired (`Max-Age=0`).
  3. Subsequent navigation to `/dashboard` redirects to `/login`.
- **Regression Reason:** Guarantees session termination upon user logout; prevents session hijacking after user departure.
- **Automation Candidate:** Yes (Playwright / Supertest)
- **Traceability:** Spec §3.5, §4.4, §5 (TC-LOGIN-06), REQ-LOGIN-011, SES-LOGIN-004

---

### TC-LOGIN-REG-009: Session Hygiene: Storage Sanitization & No Data Bleed (UI)

- **Regression ID:** `TC-LOGIN-REG-009`
- **Original TC ID:** `TC-LOGIN-UI-017`
- **Requirement ID:** `REQ-LOGIN-012`, `SEC-LOGIN-008`, `SES-LOGIN-005`
- **Scenario ID:** `TC-LOGIN-07`
- **Title:** Verify logout clears `localStorage` and `sessionStorage` preventing cross-user data bleed
- **Layer:** UI / Security / Regression
- **Priority:** P1 (High)
- **Risk:** High (Session Bleed — RISK-003)
- **Preconditions:**
  1. User A is logged in with cached data in `sessionStorage` / `localStorage`.
- **Test Data:**
  - User A: `hanish@danis.com`
  - User B: `alex@danis.com`
- **Steps:**
  1. Log in as User A.
  2. Click Logout and inspect browser storage.
  3. Log in as User B and inspect storage.
- **Expected Result:**
  1. Logout clears all keys in `localStorage` and `sessionStorage`.
  2. User B session loads only fresh User B data; zero leftover data from User A.
- **Regression Reason:** Critical security regression to prevent data contamination in shared workstation environments (mitigates RISK-003).
- **Automation Candidate:** Yes (Playwright)
- **Traceability:** Spec §4.4, §5 (TC-LOGIN-07), REQ-LOGIN-012, SEC-LOGIN-008, SES-LOGIN-005

---

### TC-LOGIN-REG-010: Authenticated User Redirect Guard (`/login` → `/`) (UI)

- **Regression ID:** `TC-LOGIN-REG-010`
- **Original TC ID:** `TC-LOGIN-UI-014`
- **Requirement ID:** `REQ-LOGIN-014`, `SES-LOGIN-007`, `UI-LOGIN-005`
- **Scenario ID:** `TC-LOGIN-05`
- **Title:** Verify that authenticated users navigating to `/login` are automatically redirected to dashboard
- **Layer:** UI / Route Protection
- **Priority:** P1 (High)
- **Risk:** Medium
- **Preconditions:**
  1. Active authenticated session (`cmma_session` valid).
- **Test Data:**
  - URL: `/login`
- **Steps:**
  1. Open browser with active session.
  2. Navigate directly to `/login`.
- **Expected Result:**
  1. Middleware intercepts request.
  2. Immediately redirects to `/` (dashboard) without displaying login form.
- **Regression Reason:** Ensures route middleware hygiene and prevents redundant re-authentication requests.
- **Automation Candidate:** Yes (Playwright)
- **Traceability:** Spec §4.4, §5 (TC-LOGIN-05), REQ-LOGIN-014, SES-LOGIN-007, UI-LOGIN-005

---

### TC-LOGIN-REG-011: Primary Login API Contract & Token Payload (API)

- **Regression ID:** `TC-LOGIN-REG-011`
- **Original TC ID:** `TC-LOGIN-API-002`
- **Requirement ID:** `REQ-LOGIN-002`, `REQ-LOGIN-007`, `API-LOGIN-001`
- **Scenario ID:** `API-AUTH-LOGIN-TENANT-PASS`
- **Title:** Verify `POST /api/auth/login` contract, JWT structure, and user permission payload
- **Layer:** API / Contract
- **Priority:** P1 (Critical)
- **Risk:** High
- **Preconditions:**
  1. Active tenant user with pre-trusted device fingerprint.
- **Test Data:**
  - Endpoint: `POST /api/auth/login`
  - Body: `{ "email": "user@danis.com", "password": "SecurePassword123!", "tenantSlug": "danis", "deviceFingerprint": "trusted-tenant-fp-999" }`
- **Steps:**
  1. Send request to `/api/auth/login`.
  2. Verify JSON schema of response.
- **Expected Result:**
  1. Status: `200 OK`.
  2. Body contains `access_token` and complete `user` object (`id`, `email`, `role`, `roles`, `permissions`, `tenantRoles`).
- **Regression Reason:** Backend contract regression baseline gating all downstream frontend authorization and routing.
- **Automation Candidate:** Yes (Supertest / Postman)
- **Traceability:** Spec §3.1, REQ-LOGIN-002, REQ-LOGIN-007, API-LOGIN-001

---

### TC-LOGIN-REG-012: Rate Limiting Enforcement on Authentication Endpoints (API)

- **Regression ID:** `TC-LOGIN-REG-012`
- **Original TC ID:** `TC-LOGIN-API-012`
- **Requirement ID:** `SEC-LOGIN-001`, `API-LOGIN-001`
- **Scenario ID:** `API-AUTH-LOGIN-RATE-LIMIT`
- **Title:** Verify rate limit throttling to 5 requests per 60 seconds on `/api/auth/login`
- **Layer:** API / Security
- **Priority:** P1 (High)
- **Risk:** Medium
- **Preconditions:**
  1. Rate limiting middleware active on backend.
- **Test Data:**
  - 6 rapid requests within 60 seconds from same IP.
- **Steps:**
  1. Send 5 consecutive requests to `POST /api/auth/login`.
  2. Send 6th request within the same 60-second window.
- **Expected Result:**
  1. Requests 1–5 process normally.
  2. Request 6 returns HTTP `429 Too Many Requests`.
- **Regression Reason:** Validates brute-force attack prevention policy (SEC-LOGIN-001).
- **Automation Candidate:** Yes (Supertest / Postman)
- **Traceability:** Spec §3.1, §4.1, SEC-LOGIN-001, API-LOGIN-001

---

### TC-LOGIN-REG-013: Session Cookie Security Attributes Verification (API)

- **Regression ID:** `TC-LOGIN-REG-013`
- **Original TC ID:** `TC-LOGIN-API-026`
- **Requirement ID:** `REQ-LOGIN-010`, `SES-LOGIN-002`, `SES-LOGIN-003`, `API-LOGIN-005`
- **Scenario ID:** `API-SESSION-LOGIN-BRIDGE`
- **Title:** Verify `cmma_session` cookie attributes (`HttpOnly`, `Secure`, `SameSite=Lax`, `Max-Age=28800`)
- **Layer:** API / Security
- **Priority:** P1 (High)
- **Risk:** High
- **Preconditions:**
  1. Valid JWT generated from primary auth endpoint.
- **Test Data:**
  - Endpoint: `POST /api/session/login`
  - Body: `{ "token": "...", "user": { ... } }`
- **Steps:**
  1. Call `POST /api/session/login`.
  2. Inspect `Set-Cookie` header attributes.
- **Expected Result:**
  1. Status: `200 OK`.
  2. Cookie header contains `HttpOnly`, `Secure`, `SameSite=Lax`, and `Max-Age=28800` (8 hours).
- **Regression Reason:** Prevents XSS cookie theft and CSRF vulnerabilities by guaranteeing security flags on session cookies.
- **Automation Candidate:** Yes (Supertest / Playwright API request)
- **Traceability:** Spec §3.5, REQ-LOGIN-010, SES-LOGIN-002, API-LOGIN-005

---

### TC-LOGIN-REG-014: Bcrypt Salt Factor 10 Password Storage (DB)

- **Regression ID:** `TC-LOGIN-REG-014`
- **Original TC ID:** `TC-LOGIN-DB-002` (also maps to `TC-LOGIN-DB-007`)
- **Requirement ID:** `SEC-LOGIN-004`, `BR-LOGIN-003`, `DB-LOGIN-001`
- **Scenario ID:** `DB-ADMIN-BCRYPT-HASH-FORMAT`
- **Title:** Verify password hashes in `cmma_core` and `cmma_<tenantSlug>` conform to bcrypt salt factor 10
- **Layer:** Database / Security
- **Priority:** P1 (High)
- **Risk:** High
- **Preconditions:**
  1. User accounts created in database.
- **Test Data:**
  - Entities: `cmma_core.platformAdmin`, `cmma_danis.account`
- **Steps:**
  1. Query `passwordHash` column for platform admin and tenant accounts.
  2. Verify string prefix and structure.
- **Expected Result:**
  1. String begins with `$2a$10$` or `$2b$10$`.
  2. Plaintext password is never persisted.
- **Regression Reason:** Core security compliance ensuring sensitive credentials meet encryption standards.
- **Automation Candidate:** Yes (DB Assertion Script)
- **Traceability:** Spec §2.1, §4.1, BR-LOGIN-003, SEC-LOGIN-004

---

### TC-LOGIN-REG-015: Multi-Tenant Schema Database Isolation (DB)

- **Regression ID:** `TC-LOGIN-REG-015`
- **Original TC ID:** `TC-LOGIN-DB-013`
- **Requirement ID:** `REQ-LOGIN-016`, `BR-LOGIN-009`, `SEC-LOGIN-006`
- **Scenario ID:** `DB-ISOLATION-MULTI-TENANT`
- **Title:** Verify complete database partition across distinct tenant schemas (`cmma_danis` vs `cmma_falcon`)
- **Layer:** Database / Security
- **Priority:** P1 (Critical)
- **Risk:** Critical
- **Preconditions:**
  1. Multi-tenant schemas `cmma_danis` and `cmma_falcon` provisioned.
- **Test Data:**
  - Common email `john.doe@company.com` in both schemas with distinct hashes.
- **Steps:**
  1. Query `cmma_danis.account` and `cmma_falcon.account` for the same email.
  2. Compare `resourceId` and `passwordHash`.
- **Expected Result:**
  1. Schemas maintain independent records with zero data coupling.
  2. Updates to one tenant schema produce zero impact on another.
- **Regression Reason:** Validates fundamental multi-tenant architectural boundary at the database layer.
- **Automation Candidate:** Yes (DB Assertion Script)
- **Traceability:** Spec §1.1, §2.1, §4.3, BR-LOGIN-009, SEC-LOGIN-006

---

## 3. Information Gaps Affecting Regression Suite

The following gaps from `qa/analysis/LoginFeature_QA_Analysis.md` remain relevant to this regression suite:

1. **GAP-002 (Lockout Failure Count):** An exact lockout threshold cannot be regression-tested until the consecutive failure limit is formally specified.
2. **GAP-014 (MFA OTP Endpoints):** Completion of the OTP challenge via API is excluded from regression automation until OTP verify endpoints are defined.
3. **GAP-021 & GAP-022 (Inactivity Timeout & Token Renewal):** Mid-session renewal and sliding expiration tests are omitted from regression scope as they are not defined in the specification.
