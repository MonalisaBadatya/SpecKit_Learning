# UI & Functional Test Cases: Authentication & Session Management (Login Feature)

**Feature:** feat-login  
**Epic:** epic-auth  
**Source Specification:** `specs/Spec_LoginFeature.md` (v1.0 — Approved)  
**QA Analysis Reference:** `qa/analysis/LoginFeature_QA_Analysis.md`  
**Test Plan Reference:** `qa/test-plan/Login_TestPlan.md`  
**Target File:** `qa/test-cases/UI/Login_UI_TestCases.md`  

---

## 1. Overview & Test Suite Summary

This test suite defines the functional and UI test cases for the CMMA Platform Authentication & Session Management feature. All test cases are derived strictly from explicit requirements in `specs/Spec_LoginFeature.md` and `qa/analysis/LoginFeature_QA_Analysis.md`.

### Test Case Coverage Matrix

| Test Case ID | Test Category | Requirement ID | Priority | Risk |
| :--- | :--- | :--- | :--- | :--- |
| **TC-LOGIN-UI-001** | Platform Admin Local Login (Happy Path) | REQ-LOGIN-001, BR-LOGIN-001 | P1 | High |
| **TC-LOGIN-UI-002** | Tenant User Local Login (Happy Path) | REQ-LOGIN-002, BR-LOGIN-002 | P1 | High |
| **TC-LOGIN-UI-003** | Client-Side Empty Credentials Validation | VAL-LOGIN-003, UI-LOGIN-002 | P1 | Medium |
| **TC-LOGIN-UI-004** | Client-Side Empty Password Validation | VAL-LOGIN-002, UI-LOGIN-002 | P2 | Medium |
| **TC-LOGIN-UI-005** | Client-Side Empty Email Validation | VAL-LOGIN-001, UI-LOGIN-002 | P2 | Medium |
| **TC-LOGIN-UI-006** | Invalid Password / Credentials Rejection | UI-LOGIN-003 | P1 | High |
| **TC-LOGIN-UI-007** | Deactivated Tenant Account Login Blocked | REQ-LOGIN-002, DB-LOGIN-003 | P1 | High |
| **TC-LOGIN-UI-008** | Stale / Expired Device Fingerprint MFA Challenge | REQ-LOGIN-005, UI-LOGIN-006 | P1 | High |
| **TC-LOGIN-UI-009** | Unrecognized / Missing Device Fingerprint MFA Challenge | REQ-LOGIN-005, REQ-LOGIN-006 | P1 | High |
| **TC-LOGIN-UI-010** | Microsoft Entra ID Corporate SSO Login | REQ-LOGIN-003, §3.2 | P1 | High |
| **TC-LOGIN-UI-011** | SSO-Enforced Account Local Password Blocked | REQ-LOGIN-017, BR-LOGIN-010 | P1 | High |
| **TC-LOGIN-UI-012** | Cross-Context Isolation: Platform Admin on Tenant Subdomain | REQ-LOGIN-016, SEC-LOGIN-006 | P1 | Critical |
| **TC-LOGIN-UI-013** | Cross-Context Isolation: Tenant User on Platform Domain | REQ-LOGIN-016, SEC-LOGIN-006 | P1 | Critical |
| **TC-LOGIN-UI-014** | Authenticated User Redirect Guard (`/login` → `/`) | REQ-LOGIN-014, SES-LOGIN-007 | P1 | Medium |
| **TC-LOGIN-UI-015** | Unauthenticated Route Protection Guard (`/dashboard` → `/login`) | REQ-LOGIN-013, SES-LOGIN-006 | P1 | High |
| **TC-LOGIN-UI-016** | User Logout & Session Cookie Destruction | REQ-LOGIN-011, SES-LOGIN-004 | P1 | High |
| **TC-LOGIN-UI-017** | Session Hygiene: Client Storage Sanitization & No Data Bleed | REQ-LOGIN-012, SEC-LOGIN-008 | P1 | High |
| **TC-LOGIN-UI-018** | Backend Offline Error Banner & Retry Action | REQ-LOGIN-015, UI-LOGIN-004 | P2 | Medium |
| **TC-LOGIN-UI-0019** | Dynamic Tenant Branding & Theme Rendering | REQ-LOGIN-009, UI-LOGIN-008 | P2 | Low |
| **TC-LOGIN-UI-020** | Development Mock Mode Banner Display | REQ-LOGIN-018, UI-LOGIN-007 | P3 | Low |
| **TC-LOGIN-UI-021** | Rapid Submission Rate Limit UI Handling | SEC-LOGIN-001, §4.1 | P2 | Medium |

---

## 2. Test Cases

---

### TC-LOGIN-UI-001: Platform Admin Local Login (Happy Path)

- **ID:** `TC-LOGIN-UI-001`
- **Title:** Verify successful local login for Platform Administrator with pre-trusted device fingerprint
- **Requirement ID:** `REQ-LOGIN-001`, `REQ-LOGIN-004`, `REQ-LOGIN-007`, `REQ-LOGIN-010`
- **Scenario ID:** `TC-LOGIN-02`
- **Type:** Positive / Functional
- **Priority:** P1 (Critical)
- **Risk:** High
- **Preconditions:**
  1. Platform Admin account exists in `cmma_core.platformAdmin` with `isActive = true`, `authProvider = 'LOCAL'`, and valid bcrypt password hash.
  2. A valid record exists in `cmma_core.mfaVerification` for the current client device fingerprint (`cmma_device_fp`) with `isTrusted = true` and `expiresAt > NOW()`.
  3. User is on the Platform Admin login page (`https://cmma-dev.cosdevx.com/login`).
- **Test Data:**
  - Email: `admin@cmma.io`
  - Password: `ValidAdminPassword123!`
  - Context: Platform domain (`cmma-dev`)
- **Steps:**
  1. Navigate to `https://cmma-dev.cosdevx.com/login`.
  2. Enter valid Platform Admin email (`admin@cmma.io`) into the email field.
  3. Enter valid password (`ValidAdminPassword123!`) into the password field.
  4. Click the "Sign In" button.
- **Expected Result:**
  1. Form submission succeeds without any client-side validation errors.
  2. System detects trusted device fingerprint (`isTrusted = true`, `expiresAt > NOW()`) and bypasses MFA prompt.
  3. HTTP-only session cookie `cmma_session` is set with `Secure`, `SameSite=Lax`, and `Max-Age=28800`.
  4. User is redirected directly to the Platform Admin console shell.
  5. `cmma_core.platformAdmin.lastLoginAt` timestamp is updated.
- **Automation Candidate:** Yes (Playwright)
- **Regression Candidate:** Yes
- **Traceability:** Spec §1.1, §3.1, §5 (TC-LOGIN-02), BR-LOGIN-001, REQ-LOGIN-001, SES-LOGIN-003

---

### TC-LOGIN-UI-002: Tenant User Local Login (Happy Path)

- **ID:** `TC-LOGIN-UI-002`
- **Title:** Verify successful local login for Tenant User on tenant subdomain with pre-trusted device fingerprint
- **Requirement ID:** `REQ-LOGIN-002`, `REQ-LOGIN-004`, `REQ-LOGIN-007`, `REQ-LOGIN-010`
- **Scenario ID:** `TC-LOGIN-01`
- **Type:** Positive / Functional
- **Priority:** P1 (Critical)
- **Risk:** High
- **Preconditions:**
  1. Tenant `danis` is configured and active.
  2. Tenant user account exists in `cmma_danis.account` with `status = 'ACTIVE'` and valid bcrypt password hash linked to `cmma_danis.resource`.
  3. A valid record exists in `cmma_danis.mfaVerification` for the client device fingerprint with `isTrusted = true` and `expiresAt > NOW()`.
  4. User is on the Tenant login page (`https://danis-cmma-dev.cosdevx.com/login`).
- **Test Data:**
  - Email: `user@danis.com`
  - Password: `ValidTenantPassword123!`
  - Tenant Slug: `danis`
- **Steps:**
  1. Navigate to `https://danis-cmma-dev.cosdevx.com/login`.
  2. Enter valid Tenant User email (`user@danis.com`) into the email field.
  3. Enter valid password (`ValidTenantPassword123!`) into the password field.
  4. Click the "Sign In" button.
- **Expected Result:**
  1. Form submission succeeds without errors.
  2. Pre-trusted device fingerprint bypasses MFA prompt.
  3. HTTP-only session cookie `cmma_session` is set.
  4. User is redirected to the Tenant Dashboard (`/dashboard`).
- **Automation Candidate:** Yes (Playwright)
- **Regression Candidate:** Yes
- **Traceability:** Spec §1.1, §3.1, §5 (TC-LOGIN-01), BR-LOGIN-002, REQ-LOGIN-002, SES-LOGIN-003

---

### TC-LOGIN-UI-003: Client-Side Empty Credentials Validation

- **ID:** `TC-LOGIN-UI-003`
- **Title:** Verify client-side error and network request suppression when submitting empty email and password
- **Requirement ID:** `VAL-LOGIN-003`, `UI-LOGIN-002`
- **Scenario ID:** `TC-LOGIN-04`
- **Type:** Negative / Validation
- **Priority:** P1 (High)
- **Risk:** Medium
- **Preconditions:**
  1. User is on the login page (`/login`).
  2. Both email and password input fields are blank.
- **Test Data:**
  - Email: `""` (empty)
  - Password: `""` (empty)
- **Steps:**
  1. Navigate to the login page.
  2. Leave both email and password fields completely empty.
  3. Click the "Sign In" button.
- **Expected Result:**
  1. Client-side validation is triggered immediately.
  2. Explicit validation error message `"Please enter both email and password"` is displayed on the UI.
  3. Outgoing network authentication request (`POST /api/auth/login`) is suppressed.
  4. User remains on the login page; no redirection occurs.
- **Automation Candidate:** Yes (Playwright)
- **Regression Candidate:** Yes
- **Traceability:** Spec §5 (TC-LOGIN-04), UI-LOGIN-002, VAL-LOGIN-003

---

### TC-LOGIN-UI-004: Client-Side Empty Password Validation

- **ID:** `TC-LOGIN-UI-004`
- **Title:** Verify submission blocking when email is provided but password field is left empty
- **Requirement ID:** `VAL-LOGIN-002`, `UI-LOGIN-002`
- **Scenario ID:** `TC-LOGIN-04-A`
- **Type:** Negative / Validation
- **Priority:** P2 (Medium)
- **Risk:** Medium
- **Preconditions:**
  1. User is on the login page (`/login`).
- **Test Data:**
  - Email: `user@example.com`
  - Password: `""` (empty)
- **Steps:**
  1. Navigate to the login page.
  2. Enter valid email format `user@example.com` into the email field.
  3. Leave the password field empty.
  4. Click the "Sign In" button.
- **Expected Result:**
  1. Submission is blocked on the client side.
  2. Validation message `"Please enter both email and password"` (or field-specific required notice) is displayed.
  3. Network request is suppressed; no redirect occurs.
- **Automation Candidate:** Yes (Playwright)
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.1, §5 (TC-LOGIN-04), VAL-LOGIN-002, UI-LOGIN-002

---

### TC-LOGIN-UI-005: Client-Side Empty Email Validation

- **ID:** `TC-LOGIN-UI-005`
- **Title:** Verify submission blocking when password is provided but email field is left empty
- **Requirement ID:** `VAL-LOGIN-001`, `UI-LOGIN-002`
- **Scenario ID:** `TC-LOGIN-04-B`
- **Type:** Negative / Validation
- **Priority:** P2 (Medium)
- **Risk:** Medium
- **Preconditions:**
  1. User is on the login page (`/login`).
- **Test Data:**
  - Email: `""` (empty)
  - Password: `SomePassword123!`
- **Steps:**
  1. Navigate to the login page.
  2. Leave the email field empty.
  3. Enter password `SomePassword123!` into the password field.
  4. Click the "Sign In" button.
- **Expected Result:**
  1. Submission is blocked on the client side.
  2. Validation message `"Please enter both email and password"` (or field-specific required notice) is displayed.
  3. Network request is suppressed; no redirect occurs.
- **Automation Candidate:** Yes (Playwright)
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.1, §5 (TC-LOGIN-04), VAL-LOGIN-001, UI-LOGIN-002

---

### TC-LOGIN-UI-006: Invalid Password / Credentials Rejection

- **ID:** `TC-LOGIN-UI-006`
- **Title:** Verify inline error message display and redirect blocking on invalid password submission
- **Requirement ID:** `UI-LOGIN-003`
- **Scenario ID:** `TC-LOGIN-03`
- **Type:** Negative / Functional
- **Priority:** P1 (High)
- **Risk:** High
- **Preconditions:**
  1. Valid active user account exists.
  2. User is on the login page.
- **Test Data:**
  - Email: `user@danis.com`
  - Password: `IncorrectPassword999!` (wrong password)
- **Steps:**
  1. Navigate to the login page.
  2. Enter valid email `user@danis.com`.
  3. Enter incorrect password `IncorrectPassword999!`.
  4. Click the "Sign In" button.
- **Expected Result:**
  1. Backend rejects authentication.
  2. UI displays an inline red error message indicating invalid credentials.
  3. Redirection is blocked; user stays on the login page.
  4. No session cookie `cmma_session` is set.
- **Automation Candidate:** Yes (Playwright)
- **Regression Candidate:** Yes
- **Traceability:** Spec §5 (TC-LOGIN-03), UI-LOGIN-003

---

### TC-LOGIN-UI-007: Deactivated Tenant Account Login Blocked

- **ID:** `TC-LOGIN-UI-007`
- **Title:** Verify login rejection and error display when attempting login with a deactivated tenant account
- **Requirement ID:** `REQ-LOGIN-002`, `DB-LOGIN-003`
- **Scenario ID:** `TC-LOGIN-03-DEACT`
- **Type:** Negative / Security / Functional
- **Priority:** P1 (High)
- **Risk:** High
- **Preconditions:**
  1. Tenant user exists in `cmma_danis.account` with `status = 'DEACTIVATED'`.
  2. User is on the tenant login page.
- **Test Data:**
  - Email: `deactivated.user@danis.com`
  - Password: `ValidPassword123!`
- **Steps:**
  1. Navigate to `https://danis-cmma-dev.cosdevx.com/login`.
  2. Enter deactivated user email and password.
  3. Click "Sign In".
- **Expected Result:**
  1. Authentication is rejected because account is not in `ACTIVE` status.
  2. An inline error message is displayed indicating the account is disabled / deactivated.
  3. Redirection is blocked and no session is created.
- **Automation Candidate:** Yes (Playwright)
- **Regression Candidate:** Yes
- **Traceability:** Spec §2.1, §3.1 (Step 3), DB-LOGIN-003, REQ-LOGIN-002

---

### TC-LOGIN-UI-008: Stale / Expired Device Fingerprint MFA Challenge

- **ID:** `TC-LOGIN-UI-008`
- **Title:** Verify that local login with expired device fingerprint triggers MFA OTP verification prompt
- **Requirement ID:** `REQ-LOGIN-005`, `REQ-LOGIN-006`, `BR-LOGIN-004`, `BR-LOGIN-005`, `UI-LOGIN-006`
- **Scenario ID:** `TC-LOGIN-10`
- **Type:** Functional / Security
- **Priority:** P1 (Critical)
- **Risk:** High
- **Preconditions:**
  1. Valid active user account exists in tenant schema.
  2. An `mfaVerification` record exists for the device fingerprint where `expiresAt <= NOW()` (expired) or `isTrusted = false`.
  3. Tenant has `mfa_enabled` active.
- **Test Data:**
  - Email: `user@danis.com`
  - Password: `ValidPassword123!`
  - Device Fingerprint: `stale-device-fp-001` (expired in DB)
- **Steps:**
  1. Navigate to `https://danis-cmma-dev.cosdevx.com/login`.
  2. Enter valid email and password.
  3. Click "Sign In".
- **Expected Result:**
  1. Backend receives credentials, checks `mfaVerification`, and returns `{ "mfa_required": true, "email": "user@danis.com" }`.
  2. UI does not redirect to dashboard.
  3. UI transitions to display the interactive MFA OTP verification prompt / modal.
  4. No full access session cookie is established until OTP is verified.
- **Automation Candidate:** Yes (Playwright)
- **Regression Candidate:** Yes
- **Traceability:** Spec §1.1, §3.1, §4.2, §5 (TC-LOGIN-10), REQ-LOGIN-005, BR-LOGIN-005, UI-LOGIN-006

---

### TC-LOGIN-UI-009: Unrecognized / Missing Device Fingerprint MFA Challenge

- **ID:** `TC-LOGIN-UI-009`
- **Title:** Verify that login from a new/unrecognized device fingerprint triggers MFA OTP verification prompt
- **Requirement ID:** `REQ-LOGIN-005`, `REQ-LOGIN-006`, `BR-LOGIN-005`, `UI-LOGIN-006`
- **Scenario ID:** `TC-LOGIN-10-NEW`
- **Type:** Functional / Security
- **Priority:** P1 (Critical)
- **Risk:** High
- **Preconditions:**
  1. Valid active user account exists.
  2. No record exists in `mfaVerification` table matching the client's current `cmma_device_fp`.
- **Test Data:**
  - Email: `user@danis.com`
  - Password: `ValidPassword123!`
  - Device Fingerprint: `brand-new-unrecognized-device-fp`
- **Steps:**
  1. Navigate to the login page.
  2. Enter valid credentials.
  3. Click "Sign In".
- **Expected Result:**
  1. System identifies missing fingerprint record in `mfaVerification`.
  2. Backend returns `mfa_required: true`.
  3. UI presents the MFA OTP verification prompt to challenge the user.
- **Automation Candidate:** Yes (Playwright)
- **Regression Candidate:** Yes
- **Traceability:** Spec §1.1, §3.1, §4.2, REQ-LOGIN-005, REQ-LOGIN-006, UI-LOGIN-006

---

### TC-LOGIN-UI-010: Microsoft Entra ID Corporate SSO Login

- **ID:** `TC-LOGIN-UI-010`
- **Title:** Verify corporate Single Sign-On flow via Microsoft Entra ID token exchange
- **Requirement ID:** `REQ-LOGIN-003`
- **Scenario ID:** `TC-LOGIN-09`
- **Type:** Functional / Integration
- **Priority:** P1 (High)
- **Risk:** High
- **Preconditions:**
  1. Tenant configuration has `entra_enabled = true`, valid `entra_client_id`, and `entra_tenant_id`.
  2. User has a corporate Entra account linked to `cmma_<tenantSlug>.account.ssoProviderUserId` or `cmma_core.platformAdmin`.
- **Test Data:**
  - Tenant: `danis`
  - Corporate Account: `hanish.donthy@danis.com`
- **Steps:**
  1. Navigate to `https://danis-cmma-dev.cosdevx.com/login`.
  2. Click the Microsoft / Corporate SSO login button.
  3. Authenticate against Microsoft Entra ID IdP (or submit valid MSAL OAuth2 token).
  4. Complete Entra authorization.
- **Expected Result:**
  1. Client sends verified Entra JWT token to `POST /api/auth/entra`.
  2. Backend validates JWT, matches `ssoProviderUserId`, and returns system JWT.
  3. Session cookie `cmma_session` is established via `/api/session/login`.
  4. User is redirected to the application dashboard.
- **Automation Candidate:** No (Manual / Mocked Token E2E per Spec TC-LOGIN-09)
- **Regression Candidate:** Yes
- **Traceability:** Spec §1.1, §3.2, §5 (TC-LOGIN-09), REQ-LOGIN-003

---

### TC-LOGIN-UI-011: SSO-Enforced Account Local Password Blocked

- **ID:** `TC-LOGIN-UI-011`
- **Title:** Verify that an account configured for corporate SSO cannot authenticate via local password
- **Requirement ID:** `REQ-LOGIN-017`, `BR-LOGIN-010`, `SEC-LOGIN-007`
- **Scenario ID:** `TC-LOGIN-SSO-BLOCK`
- **Type:** Negative / Security
- **Priority:** P1 (High)
- **Risk:** High (SSO Downgrade Prevention)
- **Preconditions:**
  1. User account has `authProvider = 'ENTRA'` or is configured with mandatory corporate SSO.
  2. User is on the login page.
- **Test Data:**
  - Email: `sso.only.user@danis.com`
  - Password: `AnyPassword123!`
- **Steps:**
  1. Navigate to the login page.
  2. Enter the SSO-enforced email into the local login form.
  3. Enter password and click "Sign In".
- **Expected Result:**
  1. System rejects local password login for SSO-enforced accounts.
  2. UI displays an error or redirection message stating that Single Sign-On is required for this account.
  3. No session is established via local authentication endpoint.
- **Automation Candidate:** Yes (Playwright)
- **Regression Candidate:** Yes
- **Traceability:** Spec §4.3, BR-LOGIN-010, REQ-LOGIN-017, SEC-LOGIN-007

---

### TC-LOGIN-UI-012: Cross-Context Isolation: Platform Admin on Tenant Subdomain

- **ID:** `TC-LOGIN-UI-012`
- **Title:** Verify that Platform Admin credentials cannot log in via tenant subdomain login page
- **Requirement ID:** `REQ-LOGIN-016`, `BR-LOGIN-008`, `BR-LOGIN-009`, `SEC-LOGIN-006`
- **Scenario ID:** `TC-LOGIN-ISOL-01`
- **Type:** Security / Boundary
- **Priority:** P1 (Critical)
- **Risk:** Critical (Data Boundary Isolation)
- **Preconditions:**
  1. User `superadmin@cmma.io` exists only in `cmma_core.platformAdmin`.
  2. User `superadmin@cmma.io` does NOT exist in `cmma_danis.account`.
- **Test Data:**
  - Subdomain: `https://danis-cmma-dev.cosdevx.com/login` (Tenant Slug: `danis`)
  - Email: `superadmin@cmma.io`
  - Password: `ValidAdminPassword123!`
- **Steps:**
  1. Navigate to tenant login URL `https://danis-cmma-dev.cosdevx.com/login`.
  2. Enter Platform Admin email and password.
  3. Click "Sign In".
- **Expected Result:**
  1. Request is evaluated in the `danis` tenant context (`cmma_danis`).
  2. Query does not find matching user in `cmma_danis.account`.
  3. Cross-context lookup to `cmma_core.platformAdmin` is strictly blocked.
  4. UI displays inline credentials error; access is denied.
- **Automation Candidate:** Yes (Playwright)
- **Regression Candidate:** Yes
- **Traceability:** Spec §1.1, §4.3, BR-LOGIN-008, BR-LOGIN-009, REQ-LOGIN-016, SEC-LOGIN-006

---

### TC-LOGIN-UI-013: Cross-Context Isolation: Tenant User on Platform Domain

- **ID:** `TC-LOGIN-UI-013`
- **Title:** Verify that Tenant User credentials cannot log in via Platform Admin console domain
- **Requirement ID:** `REQ-LOGIN-016`, `BR-LOGIN-008`, `SEC-LOGIN-006`
- **Scenario ID:** `TC-LOGIN-ISOL-02`
- **Type:** Security / Boundary
- **Priority:** P1 (Critical)
- **Risk:** Critical (Data Boundary Isolation)
- **Preconditions:**
  1. User `worker@danis.com` exists only in `cmma_danis.account`.
  2. User `worker@danis.com` does NOT exist in `cmma_core.platformAdmin`.
- **Test Data:**
  - Domain: `https://cmma-dev.cosdevx.com/login` (Platform Context)
  - Email: `worker@danis.com`
  - Password: `ValidTenantPassword123!`
- **Steps:**
  1. Navigate to platform login URL `https://cmma-dev.cosdevx.com/login`.
  2. Enter Tenant User email and password.
  3. Click "Sign In".
- **Expected Result:**
  1. Request evaluates in platform context (`cmma_core.platformAdmin`).
  2. Query finds no matching Platform Admin record.
  3. No lookup into tenant schemas (`cmma_danis`) is performed.
  4. UI displays inline credentials error; access is denied.
- **Automation Candidate:** Yes (Playwright)
- **Regression Candidate:** Yes
- **Traceability:** Spec §1.1, §4.3, BR-LOGIN-008, REQ-LOGIN-016, SEC-LOGIN-006

---

### TC-LOGIN-UI-014: Authenticated User Redirect Guard (`/login` → `/`)

- **ID:** `TC-LOGIN-UI-014`
- **Title:** Verify that already authenticated users navigating to `/login` are immediately redirected to dashboard
- **Requirement ID:** `REQ-LOGIN-014`, `SES-LOGIN-007`, `UI-LOGIN-005`
- **Scenario ID:** `TC-LOGIN-05`
- **Type:** Functional / Route Protection
- **Priority:** P1 (High)
- **Risk:** Medium
- **Preconditions:**
  1. User is actively authenticated with a valid `cmma_session` cookie.
- **Test Data:**
  - Route: `/login`
- **Steps:**
  1. Open browser with active `cmma_session` cookie.
  2. Type `/login` into the browser URL address bar and press Enter.
- **Expected Result:**
  1. Next.js route middleware detects the active session.
  2. Browser is immediately redirected to `/` (dashboard).
  3. The login form is not rendered to the user.
- **Automation Candidate:** Yes (Playwright)
- **Regression Candidate:** Yes
- **Traceability:** Spec §4.4, §5 (TC-LOGIN-05), REQ-LOGIN-014, SES-LOGIN-007, UI-LOGIN-005

---

### TC-LOGIN-UI-015: Unauthenticated Route Protection Guard (`/dashboard` → `/login`)

- **ID:** `TC-LOGIN-UI-015`
- **Title:** Verify that unauthenticated requests to protected routes redirect to `/login`
- **Requirement ID:** `REQ-LOGIN-013`, `SES-LOGIN-006`
- **Scenario ID:** `TC-LOGIN-06-GUARD`
- **Type:** Functional / Security / Route Protection
- **Priority:** P1 (Critical)
- **Risk:** High
- **Preconditions:**
  1. Browser has no active session (`cmma_session` cookie is absent or expired).
- **Test Data:**
  - Protected Routes: `/dashboard`, `/projects`
- **Steps:**
  1. Open a clean browser session (incognito mode).
  2. Enter direct URL `https://danis-cmma-dev.cosdevx.com/dashboard`.
  3. Press Enter.
- **Expected Result:**
  1. Next.js route middleware intercepts the request.
  2. Unauthenticated access is blocked.
  3. Browser redirects immediately to `/login`.
- **Automation Candidate:** Yes (Playwright)
- **Regression Candidate:** Yes
- **Traceability:** Spec §1.1, §4.4, REQ-LOGIN-013, SES-LOGIN-006

---

### TC-LOGIN-UI-016: User Logout & Session Cookie Destruction

- **ID:** `TC-LOGIN-UI-016`
- **Title:** Verify that clicking Logout destroys the session cookie and redirects user to login page
- **Requirement ID:** `REQ-LOGIN-011`, `SES-LOGIN-004`, `SES-LOGIN-005`
- **Scenario ID:** `TC-LOGIN-06`
- **Type:** Functional / Session Lifecycle
- **Priority:** P1 (High)
- **Risk:** High
- **Preconditions:**
  1. User is logged in and viewing the dashboard.
- **Test Data:**
  - Action: Logout button click
- **Steps:**
  1. Click the "Logout" action in the user menu.
  2. Observe browser redirection.
  3. Attempt direct URL navigation to `/projects`.
- **Expected Result:**
  1. `POST /api/session/logout` is called.
  2. `cmma_session` cookie is expired (`Max-Age=0`).
  3. User is redirected to `/login`.
  4. Subsequent attempt to navigate to `/projects` is blocked and redirected to `/login`.
- **Automation Candidate:** Yes (Playwright)
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.5, §4.4, §5 (TC-LOGIN-06), REQ-LOGIN-011, SES-LOGIN-004

---

### TC-LOGIN-UI-017: Session Hygiene: Client Storage Sanitization & No Data Bleed

- **ID:** `TC-LOGIN-UI-017`
- **Title:** Verify that logout clears `localStorage` and `sessionStorage` and prevents data bleed across logins
- **Requirement ID:** `REQ-LOGIN-012`, `SEC-LOGIN-008`, `SES-LOGIN-005`
- **Scenario ID:** `TC-LOGIN-07`
- **Type:** Functional / Security / Regression
- **Priority:** P1 (High)
- **Risk:** High (Session Bleed Prevention)
- **Preconditions:**
  1. User A (`hanish@danis.com`) logs in; user object is stored in browser storage.
- **Test Data:**
  - User A: `hanish@danis.com`
  - User B: `alex@danis.com`
- **Steps:**
  1. Log in as User A.
  2. Verify `sessionStorage` contains User A's profile data (`cmma_user`).
  3. Click "Logout".
  4. Inspect browser `localStorage` and `sessionStorage` in DevTools.
  5. Log in as User B (or re-login as User A).
  6. Inspect `sessionStorage` after login.
- **Expected Result:**
  1. On logout, `localStorage.clear()` and `sessionStorage.clear()` are executed.
  2. All keys in `localStorage` and `sessionStorage` are completely purged.
  3. Upon logging in as User B, only User B's fresh data is loaded; zero stale data from User A bleeds through.
- **Automation Candidate:** Yes (Playwright)
- **Regression Candidate:** Yes
- **Traceability:** Spec §4.4, §5 (TC-LOGIN-07), REQ-LOGIN-012, SEC-LOGIN-008, SES-LOGIN-005

---

### TC-LOGIN-UI-018: Backend Offline Error Banner & Retry Action

- **ID:** `TC-LOGIN-UI-018`
- **Title:** Verify display of Backend Server Offline banner and Retry Connection button when API is unreachable
- **Requirement ID:** `REQ-LOGIN-015`, `UI-LOGIN-004`
- **Scenario ID:** `TC-LOGIN-08`
- **Type:** UI / Fault Tolerance
- **Priority:** P2 (Medium)
- **Risk:** Medium
- **Preconditions:**
  1. Backend API (`/api/auth/*`) is unreachable (network disabled, connection aborted, or server returning connection error).
  2. User is on the login page.
- **Test Data:**
  - Simulated network failure / offline backend
- **Steps:**
  1. Navigate to `/login` or submit credentials while backend is offline.
  2. Observe UI rendering.
  3. Restore backend connectivity and click the "Retry Connection" button.
- **Expected Result:**
  1. Application does not crash, render a blank screen, or display raw unformatted stack traces.
  2. UI displays an explicit "Backend Server Offline" alert banner.
  3. A "Retry Connection" action button is rendered.
  4. Clicking "Retry Connection" retries connection when the server is back online.
- **Automation Candidate:** Yes (Playwright with route abort mock)
- **Regression Candidate:** Yes
- **Traceability:** Spec §4.5, §5 (TC-LOGIN-08), REQ-LOGIN-015, UI-LOGIN-004

---

### TC-LOGIN-UI-019: Dynamic Tenant Branding & Theme Rendering

- **ID:** `TC-LOGIN-UI-019`
- **Title:** Verify that tenant login screen renders dynamic tenant logo, name, and theme color from config
- **Requirement ID:** `REQ-LOGIN-009`, `UI-LOGIN-008`
- **Scenario ID:** `TC-LOGIN-BRAND-01`
- **Type:** UI / Visual
- **Priority:** P2 (Medium)
- **Risk:** Low
- **Preconditions:**
  1. Backend returns configuration for tenant `danis`:
     `{ "tenant": { "name": "Danis", "logo_url": "https://cdn.example.com/logo.png", "theme_color": "#003B5C" } }`.
- **Test Data:**
  - URL: `https://danis-cmma-dev.cosdevx.com/login`
- **Steps:**
  1. Navigate to `https://danis-cmma-dev.cosdevx.com/login`.
  2. Observe login page visual elements.
- **Expected Result:**
  1. Frontend calls `GET /api/auth/config?slug=danis`.
  2. Page renders the tenant logo sourced from `logo_url`.
  3. Page renders tenant name ("Danis").
  4. Primary theme styling reflects the configured `theme_color` (`#003B5C`).
- **Automation Candidate:** Yes (Playwright visual snapshot / attribute assertion)
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.4, REQ-LOGIN-009, UI-LOGIN-008

---

### TC-LOGIN-UI-020: Development Mock Mode Banner Display

- **ID:** `TC-LOGIN-UI-020`
- **Title:** Verify that mock mode banner displays on login screen when `NEXT_PUBLIC_USE_MOCK` is enabled
- **Requirement ID:** `REQ-LOGIN-018`, `UI-LOGIN-007`
- **Scenario ID:** `TC-LOGIN-11`
- **Type:** UI / Environment
- **Priority:** P3 (Low)
- **Risk:** Low
- **Preconditions:**
  1. Application is running in development environment with `NEXT_PUBLIC_USE_MOCK=true`.
- **Test Data:**
  - Environment Flag: `NEXT_PUBLIC_USE_MOCK=true`
- **Steps:**
  1. Start application with mock flag enabled.
  2. Navigate to `/login`.
- **Expected Result:**
  1. Login page displays a visible Mock Mode banner informing developers that mock authentication is active.
- **Automation Candidate:** Yes (Playwright)
- **Regression Candidate:** No
- **Traceability:** Spec §5 (TC-LOGIN-11), REQ-LOGIN-018, UI-LOGIN-007

---

### TC-LOGIN-UI-021: Rapid Submission Rate Limit UI Handling

- **ID:** `TC-LOGIN-UI-021`
- **Title:** Verify UI handling and error messaging when rapid login submissions exceed rate limit threshold
- **Requirement ID:** `SEC-LOGIN-001`, `BR-LOGIN-003`
- **Scenario ID:** `TC-LOGIN-RATE-01`
- **Type:** Security / Negative / UI
- **Priority:** P2 (Medium)
- **Risk:** Medium
- **Preconditions:**
  1. Rate limiter `@Throttle({ default: { limit: 5, ttl: 60000 } })` is active on backend.
  2. User is on login page.
- **Test Data:**
  - 6 consecutive invalid login attempts within 60 seconds from same IP.
- **Steps:**
  1. Navigate to `/login`.
  2. Submit invalid login credentials 5 consecutive times.
  3. Submit a 6th login request within 60 seconds.
- **Expected Result:**
  1. The 6th request is throttled by the backend with HTTP 429 Too Many Requests.
  2. UI displays an error indicating rate limit exceeded / too many requests (without crashing).
  3. Network requests are temporarily blocked until the 60-second TTL expires.
- **Automation Candidate:** Yes (Playwright / API loop)
- **Regression Candidate:** Yes
- **Traceability:** Spec §3.1, §4.1, SEC-LOGIN-001

---

## 3. Information Gaps Affecting Test Cases

The following information gaps from `qa/analysis/LoginFeature_QA_Analysis.md` directly impact the specifics of these UI test cases:

1. **GAP-002 (Lockout Threshold):** The number of consecutive failed OTP attempts that triggers account lockout is undefined; therefore, an exact lockout step count cannot be asserted in `TC-LOGIN-UI-008`.
2. **GAP-006 (MFA OTP UI Details):** The specific input component (single box vs. 6-digit split boxes, resend timer, back button) on the MFA OTP prompt is unspecified.
3. **GAP-007 & GAP-008 (Password Toggle / Remember Me):** No password visibility toggle or "Remember Me" checkbox is specified in `Spec_LoginFeature.md`.
4. **GAP-010 & GAP-011 (Client-Side Regex / Complexity):** Email format regex validation and password complexity rules are not specified.
5. **GAP-014 & GAP-015 (OTP Endpoints & Delivery Channel):** MFA OTP verification and resend API endpoints/channels are missing from the spec.
6. **GAP-025 (HTTP 429 UI Copy):** Exact client-side copy for rate limit exceeded (HTTP 429) is unspecified.
