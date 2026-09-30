# Test Plan — Authentication & Session Management (Login Feature)

**Plan ID:** TP-LOGIN-001
**Epic:** epic-auth | **Feature:** feat-login
**Spec Version:** 1.0 — Approved
**Analysis Reference:** `qa/analysis/LoginFeature_QA_Analysis.md`
**Plan Date:** 2026-08-17
**Prepared By:** Antigravity AI (QA Test Planning)
**Status:** Draft — Pending Gap Resolution

> [!IMPORTANT]
> This test plan is derived exclusively from `specs/Spec_LoginFeature.md` and
> `qa/analysis/LoginFeature_QA_Analysis.md`. No behavior has been invented.
> Sections affected by open information gaps are explicitly marked.

---

## 1. Objective

Verify that the Authentication & Session Management feature of the CMMA Platform
satisfies all functional requirements, business rules, security controls, and
session lifecycle behaviors as documented in the approved specification.

The plan governs pre-release QA execution across:
- **Local credential authentication** (Platform Admin and Tenant User)
- **Microsoft Entra SSO** (delegated corporate authentication)
- **Per-Tenant MFA and device fingerprint trust lifecycle**
- **Session cookie management and route protection**
- **Backend offline fault tolerance**
- **Tenant/platform context isolation**

---

## 2. Scope

### 2.1 In Scope

| Area | Coverage |
|---|---|
| Local login — Platform Admin | REQ-LOGIN-001, BR-LOGIN-001, BR-LOGIN-008 |
| Local login — Tenant User | REQ-LOGIN-002, BR-LOGIN-002, BR-LOGIN-009 |
| Microsoft Entra SSO login | REQ-LOGIN-003, BR-LOGIN-010 |
| Device fingerprint trust check | REQ-LOGIN-004, BR-LOGIN-004, BR-LOGIN-005 |
| MFA OTP challenge trigger | REQ-LOGIN-005, REQ-LOGIN-006 |
| JWT issuance on trusted auth | REQ-LOGIN-007 |
| Auth type resolution endpoint | REQ-LOGIN-008 |
| Tenant config and branding endpoint | REQ-LOGIN-009 |
| Session cookie lifecycle | REQ-LOGIN-010, REQ-LOGIN-011, SES-LOGIN-001 → 007 |
| Client storage sanitization on logout | REQ-LOGIN-012, SEC-LOGIN-008 |
| Protected route enforcement | REQ-LOGIN-013, REQ-LOGIN-014 |
| Backend offline error state | REQ-LOGIN-015 |
| Domain and context isolation | REQ-LOGIN-016, SEC-LOGIN-006 |
| SSO enforcement (no local bypass) | REQ-LOGIN-017, SEC-LOGIN-007 |
| Mock mode banner (dev environment) | REQ-LOGIN-018 |
| Rate limiting — all auth endpoints | SEC-LOGIN-001, SEC-LOGIN-002, SEC-LOGIN-003 |
| Password hashing verification | SEC-LOGIN-004, BR-LOGIN-003 |
| Session cookie security attributes | SEC-LOGIN-005, SES-LOGIN-002 |
| API request/response contract validation | API-LOGIN-001 → API-LOGIN-006 |
| DB schema integrity for auth tables | DB-LOGIN-001 → DB-LOGIN-005 |
| Account status enforcement (ACTIVE check) | §3.1 Tenant User flow |

### 2.2 Out of Scope

| Item | Reason |
|---|---|
| MFA OTP send and verify sub-flows | No API endpoints defined (GAP-014) |
| OTP delivery channel verification | Unspecified (GAP-015) |
| Full protected route enumeration | Route list not provided (GAP-020) |
| JWT token refresh / renewal | Not defined in spec (GAP-022) |
| Inactivity-based session timeout | Not defined in spec (GAP-021) |
| Entra MSAL popup vs. redirect flow | Not specified (GAP-018) |
| RBAC / permission matrix testing | Not defined in this spec (GAP-001) |
| Password reset flow | Not in scope of this spec |
| Post-login dashboard functionality | Outside authentication boundary |
| Load / stress / performance testing | Not addressed in spec |
| Accessibility / WCAG compliance | Not specified in spec |

---

## 3. Features Under Test

| Feature Area | Traceability | Priority |
|---|---|---|
| Local Login — Platform Admin happy path | REQ-LOGIN-001, BR-LOGIN-001 | P1 |
| Local Login — Tenant User happy path | REQ-LOGIN-002, BR-LOGIN-002 | P1 |
| Invalid credentials rejection | UI-LOGIN-003 | P1 |
| Empty field client-side validation | UI-LOGIN-002, VAL-LOGIN-003 | P1 |
| Device fingerprint trust (bypass MFA) | REQ-LOGIN-004, BR-LOGIN-004 | P1 |
| MFA OTP trigger on stale fingerprint | REQ-LOGIN-005, REQ-LOGIN-006, BR-LOGIN-005 | P1 |
| Entra SSO login flow | REQ-LOGIN-003, BR-LOGIN-010 | P1 |
| Auth type resolution (all 5 states) | REQ-LOGIN-008 | P1 |
| Session cookie set on login | REQ-LOGIN-010, SES-LOGIN-002 | P1 |
| Session cookie destroyed on logout | REQ-LOGIN-011, SES-LOGIN-004 | P1 |
| Client storage cleared on logout | REQ-LOGIN-012, SEC-LOGIN-008 | P1 |
| Protected route → redirect to `/login` | REQ-LOGIN-013, SES-LOGIN-006 | P1 |
| Authenticated user → redirect from `/login` | REQ-LOGIN-014, SES-LOGIN-007 | P1 |
| Cross-context isolation enforcement | REQ-LOGIN-016, BR-LOGIN-008, BR-LOGIN-009 | P1 |
| SSO-to-LOCAL bypass prevention | REQ-LOGIN-017, BR-LOGIN-010 | P1 |
| Rate limit enforcement per endpoint | SEC-LOGIN-001 → 003 | P1 |
| Backend offline banner + retry button | REQ-LOGIN-015, UI-LOGIN-004 | P2 |
| Tenant branding from config endpoint | REQ-LOGIN-009, UI-LOGIN-008 | P2 |
| Session bleed on re-login | SES-LOGIN-005, TC-LOGIN-07 | P2 |
| Mock mode banner | REQ-LOGIN-018, UI-LOGIN-007 | P3 |

---

## 4. Testing Strategy

### 4.1 Functional Testing

**Goal:** Verify all 18 functional requirements and 11 business rules produce the
correct system behavior for both happy paths and documented exception flows.

**Approach:**
- Test each authentication pathway independently: LOCAL (admin), LOCAL (tenant), ENTRA SSO.
- Verify context routing: confirm `tenantSlug` values `null`, `'admin'`, `'platform'`, `'cmma-dev'`
  route to `cmma_core.platformAdmin`, and all other slug values route to `cmma_<tenantSlug>`.
- Verify `tenantSlug` can be supplied via **body** and via **`X-Tenant-Slug` header** independently
  (BR-LOGIN-011).
- Verify `account.status = ACTIVE` is enforced for Tenant User login; test with `DEACTIVATED`
  and `INACTIVE` status values (noting GAP-032 — differentiated behavior is undefined).
- Verify the five `check-auth-type` response states: `LOCAL`, `ENTRA`, `DISABLED`, `NO_ACCOUNT`,
  `NOT_FOUND`.
- Verify MFA trigger: test with absent fingerprint, fingerprint with `isTrusted = false`, and
  fingerprint with `expiresAt <= NOW()`.
- Verify trusted fingerprint bypass: test with `isTrusted = true` and `expiresAt > NOW()`.

**Key flows to exercise:**
1. Platform Admin local login → trusted device → JWT + user payload
2. Tenant User local login → trusted device → JWT + user payload
3. Local login → stale fingerprint → `{ mfa_required: true, email }`
4. Entra SSO login → token validation → JWT + user payload
5. Auth type check → all five response categories
6. `GET /api/auth/config` → branding + auth flags

### 4.2 UI / Behavior Testing

**Goal:** Verify the 8 spec-confirmed UI behaviors (UI-LOGIN-001 → 008).

**Approach:**
- Verify "Sign In" button is present on the login page (UI-LOGIN-001).
- Submit with empty email and password → confirm exact message:
  `"Please enter both email and password"` and confirm **no network request is made**
  (UI-LOGIN-002, VAL-LOGIN-003).
- Submit with invalid credentials → confirm inline red error message appears and no redirect
  occurs (UI-LOGIN-003).
- Simulate backend unreachable → confirm "Backend Server Offline" banner and "Retry Connection"
  button render (UI-LOGIN-004, REQ-LOGIN-015).
- Navigate to `/login` while authenticated → confirm immediate redirect to `/` without form
  render (UI-LOGIN-005).
- Login with stale fingerprint → confirm OTP prompt appears (UI-LOGIN-006).
- Enable `NEXT_PUBLIC_USE_MOCK` → confirm mock mode banner renders (UI-LOGIN-007).
- Verify tenant logo and theme color render from `GET /api/auth/config` response (UI-LOGIN-008).

> [!NOTE]
> GAP-005 through GAP-009: Specific form layout, placeholder text, password toggle,
> "Remember Me", and loading/spinner states are not defined in the spec. UI tests will be
> limited to the 8 behaviors explicitly described above.

### 4.3 API Contract Testing

**Goal:** Verify request/response contracts for all 6 spec-defined endpoints.

**Approach — per endpoint:**

| Endpoint | Validations |
|---|---|
| `POST /api/auth/login` | Correct 200 payload on trusted auth; `mfa_required` payload on stale FP; 400 on missing email/password; correct schema for `access_token` + `user` object |
| `POST /api/auth/entra` | Correct 200 on valid Entra token; 400 on missing token |
| `POST /api/auth/check-auth-type` | All 5 response states returned for correct account conditions |
| `GET /api/auth/config` | Correct tenant branding + auth flags in response |
| `POST /api/session/login` | `cmma_session` cookie set with correct attributes (HTTP-only, Secure, SameSite=Lax, Max-Age=28800) |
| `POST /api/session/logout` | `cmma_session` cookie expired (Max-Age=0) |

**Rate Limit Testing:**
- `POST /api/auth/login`: Submit 6 requests within 60 seconds from same IP → 6th request must be throttled.
- `POST /api/auth/entra`: Same pattern — 6th request throttled.
- `POST /api/auth/check-auth-type`: Submit 11 requests within 60 seconds → 11th request throttled.
- Note: HTTP 429 response body is not specified (GAP-025); test will only confirm the status code.

> [!NOTE]
> GAP-024: No standard error envelope is defined. Error response body format assertions
> will be limited to HTTP status code verification unless the implementation reveals a de-facto format.

### 4.4 Database Validation Testing

**Goal:** Confirm DB state changes are consistent with expected auth behavior.

**Approach:**
- After successful Platform Admin login: verify `platformAdmin.lastLoginAt` is updated.
- Verify `passwordHash` is stored as bcrypt hash with salt factor 10 (BR-LOGIN-003).
- Verify `mfaVerification` record lookup logic: query by `deviceFingerprint` + `isTrusted` + `expiresAt`.
- Verify `account.status` values (`ACTIVE`, `DEACTIVATED`, `INACTIVE`) are correctly read during
  Tenant User login (DB-LOGIN-003).
- Verify `authProvider` field values (`LOCAL`, `ENTRA`) are correctly populated (DB-LOGIN-001, DB-LOGIN-003).
- Verify `ssoProviderUserId` is matched during Entra SSO flow for tenant accounts (DB-LOGIN-003).

> [!NOTE]
> GAP-029: Index coverage for `mfaVerification` hot-path columns is not specified.
> DB validation will not include index verification.
> GAP-030: `mfaVerification` record cleanup is unspecified; no cleanup-related DB tests will be designed.
> GAP-031: `platformAdmin.isActive` enforcement is not described in the spec;
> a test noting this gap will be flagged but cannot be fully designed.

### 4.5 Security Testing

**Goal:** Verify the 11 security controls defined in the spec (SEC-LOGIN-001 → 011).

**Approach:**

| Control | Test Approach |
|---|---|
| Rate limiting (SEC-LOGIN-001 → 003) | Burst requests via API client; verify HTTP 429 at threshold |
| Bcrypt verification (SEC-LOGIN-004) | Confirm password field is never echoed in any response; inspect DB hash format |
| Cookie attributes (SEC-LOGIN-005) | Inspect `Set-Cookie` header attributes post login: `HttpOnly`, `Secure`, `SameSite=Lax`, `Max-Age=28800` |
| Cross-context isolation (SEC-LOGIN-006) | Attempt Platform Admin email against tenant login endpoint; verify rejection |
| SSO bypass prevention (SEC-LOGIN-007) | Submit ENTRA-configured account credentials to `POST /api/auth/login`; verify blocked |
| Client storage sanitization (SEC-LOGIN-008) | After logout, inspect `localStorage` and `sessionStorage` in browser devtools; both must be empty |
| MFA trigger on stale FP (SEC-LOGIN-009) | Submit login with expired `mfaVerification.expiresAt`; verify `mfa_required` returned |
| Account lockout trigger (SEC-LOGIN-010) | Verify lockout after repeated OTP failures (threshold unknown — GAP-002; test will validate lockout exists, not exact count) |

> [!NOTE]
> SEC-LOGIN-011: JWT algorithm is inferred as HS256 from the sample token header but is
> not formally confirmed. JWT signature verification tests will treat algorithm as
> **INFORMATION GAP — GAP-033**.

> [!NOTE]
> GAP-035: Audit logging is not specified. No audit log tests are included.
> GAP-036: Input sanitization is not specified. SQL injection / XSS tests are not defined in this plan.
> GAP-037: CSRF protection for session bridge endpoints is not specified. CSRF tests are
> deferred pending clarification.

### 4.6 Integration Testing

**Goal:** Verify system behavior across the frontend → backend → database → external
service boundary.

**Approach:**
- **End-to-end local login:** Browser submits login form → `POST /api/auth/login` →
  backend validates credentials → `POST /api/session/login` sets cookie → middleware
  allows access to `/dashboard`.
- **End-to-end logout:** User triggers logout → `POST /api/session/logout` → cookie expired →
  `localStorage`/`sessionStorage` cleared → next protected route access redirects to `/login`.
- **Entra SSO end-to-end:** MSAL token acquired from Azure → `POST /api/auth/entra` →
  `ssoProviderUserId` matched → session cookie set (manual / skip per spec TC-LOGIN-09).
- **Tenant branding integration:** `GET /api/auth/config` → login page renders correct logo
  and theme color.
- **Backend offline simulation:** Kill or mock API → confirm UI offline banner renders without
  crash (TC-LOGIN-08).

> [!NOTE]
> GAP-038: JWKS endpoint offline behavior for Entra SSO is not defined; integration test
> for this failure mode is deferred.
> GAP-039: Expired/revoked Entra token mid-session behavior is not defined; test deferred.
> GAP-040: OTP delivery service integration cannot be tested — delivery channel unspecified.

### 4.7 Regression Testing

**Goal:** Ensure authentication changes do not break adjacent platform behavior.

**Regression areas:**
- Re-login as same user after logout: no stale `sessionStorage.cmma_user` data (TC-LOGIN-07, SES-LOGIN-005).
- Re-login as different user: verify previous user's session data does not bleed (RISK-003).
- Verify `/login` page does not render for already-authenticated users (TC-LOGIN-05).
- Verify protected routes remain inaccessible after `cmma_session` cookie is manually deleted.
- Verify tenant context is correctly isolated when the same email exists in multiple tenant schemas.
- Verify `check-auth-type` returns correct state after account status changes
  (ACTIVE → DEACTIVATED).

### 4.8 Positive / Negative / Boundary Testing

**Positive Cases (happy paths):**
- Platform Admin local login with valid credentials + trusted fingerprint
- Tenant User local login with valid credentials + trusted fingerprint
- Entra SSO login with valid Microsoft token
- Auth type resolution returning `LOCAL` for a correctly provisioned account
- Session cookie correctly set and read by the route middleware

**Negative Cases (documented failure modes):**
- Login with wrong password → inline error, no redirect
- Login with correct password for `DEACTIVATED` account → blocked
- Login with missing `email` field → HTTP 400
- Login with missing `password` field → HTTP 400
- SSO login with missing `token` → HTTP 400
- Platform Admin email submitted to tenant endpoint → blocked (SEC-LOGIN-006)
- ENTRA-configured account submitted to local login endpoint → blocked (SEC-LOGIN-007)
- Login with fingerprint `isTrusted = false` → MFA triggered
- Login with fingerprint `expiresAt <= NOW()` → MFA triggered

**Boundary Cases:**
- `tenantSlug` boundary: test all four Platform Admin slug values (`null`, `'admin'`, `'platform'`, `'cmma-dev'`) individually.
- Rate limit boundary: test exactly N (threshold), N+1 (over limit) requests per 60-second window.
- Session cookie `Max-Age`: verify cookie is accepted for 8 hours; behavior at expiry is subject
  to GAP-021 (inactivity timeout undefined).
- `mfaVerification.expiresAt` boundary: test fingerprint expiring at exactly `NOW()` (equal
  timestamp) vs. `NOW() - 1 second` (expired) vs. `NOW() + 1 second` (valid).

---

## 5. Test Data Requirements

### 5.1 User Accounts

| Data Item | Requirement | Notes |
|---|---|---|
| Platform Admin — LOCAL | Valid `platformAdmin` record with `passwordHash`, `authProvider='LOCAL'`, `isActive=true` | For REQ-LOGIN-001 |
| Platform Admin — ENTRA | `platformAdmin` record with `authProvider='ENTRA'` | For REQ-LOGIN-003, REQ-LOGIN-017 |
| Tenant User — LOCAL ACTIVE | `resource` + `account` with `passwordHash`, `status='ACTIVE'` in `cmma_danis` | For REQ-LOGIN-002 |
| Tenant User — DEACTIVATED | `account` with `status='DEACTIVATED'` | For negative test |
| Tenant User — INACTIVE | `account` with `status='INACTIVE'` | For GAP-032 exploration |
| Tenant User — ENTRA | `account` with `ssoProviderUserId` populated | For REQ-LOGIN-003 |
| Tenant User — no account | `resource` record with no linked `account` | For `NO_ACCOUNT` auth type check |
| Unregistered email | Email not present in any schema | For `NOT_FOUND` auth type check |

### 5.2 MFA / Device Fingerprint Records

| Data Item | Requirement |
|---|---|
| Trusted fingerprint (valid) | `mfaVerification` with `isTrusted=true`, `expiresAt > NOW()` |
| Stale fingerprint (expired) | `mfaVerification` with `isTrusted=true`, `expiresAt <= NOW()` |
| Untrusted fingerprint | `mfaVerification` with `isTrusted=false` |
| Missing fingerprint | No `mfaVerification` record for the device |

> [!NOTE]
> OTP-specific test data (valid OTP code, expired OTP code, wrong OTP) cannot be fully
> defined — OTP delivery channel and endpoint are not specified (GAP-014, GAP-015, GAP-016).

### 5.3 Tenant Configuration Data

| Data Item | Requirement |
|---|---|
| Tenant with `local_enabled=true`, `entra_enabled=false` | LOCAL-only tenant |
| Tenant with `local_enabled=true`, `entra_enabled=true` | Dual-mode tenant |
| Tenant with `mfa_enabled=true` | MFA-enforced tenant |
| Tenant with `mfa_enabled=false` | MFA-disabled tenant (behavior per GAP-003) |
| Tenant with logo URL and theme color | For branding tests (REQ-LOGIN-009) |

### 5.4 API Test Tokens

| Data Item | Requirement |
|---|---|
| Valid Microsoft Entra JWT | Real or mocked MSAL token for `POST /api/auth/entra` |
| Expired Entra JWT | For negative SSO test |
| Malformed / unsigned token | For rejection test |

---

## 6. Environment & Dependencies

### 6.1 Target Environments

| Environment | URL Pattern | Usage |
|---|---|---|
| **Development** | `https://cmma-dev.cosdevx.com` (Platform Admin) | Unit / integration testing |
| **Tenant Dev** | `https://danis-cmma-dev.cosdevx.com` | Tenant user testing (slug: `danis`) |
| **Local** | `localhost` with `NEXT_PUBLIC_USE_MOCK=true` | Mock mode / UI testing |

### 6.2 Required Dependencies

| Dependency | Role | Status |
|---|---|---|
| **PostgreSQL** | Hosts `cmma_core` and `cmma_<tenantSlug>` schemas | Required |
| **NestJS Backend** | Hosts all `/api/auth/*` and `/api/session/*` endpoints | Required |
| **Next.js Frontend** | Login page, session bridge, route middleware | Required |
| **Microsoft Entra ID / Azure AD** | Entra SSO JWT validation | Required for SSO tests |
| **MSAL Library** | Frontend SSO token acquisition | Required for SSO tests |
| **TypeORM** | DB entity mapping and query execution | Required |
| `NEXT_PUBLIC_USE_MOCK` flag | Enable mock mode banner | Required for REQ-LOGIN-018 |
| `mfa_enabled` per-tenant config | Control MFA enforcement | Required for MFA tests |

### 6.3 Unavailable / Deferred Dependencies

| Dependency | Gap | Defer Action |
|---|---|---|
| OTP delivery service | GAP-015, GAP-040 | Defer MFA OTP send/verify tests |
| MSAL popup/redirect config | GAP-018 | Defer frontend SSO UX tests |
| JWKS offline simulation | GAP-038 | Defer SSO offline failure test |

---

## 7. Automation Strategy

> [!NOTE]
> Per task constraints, no automation code is generated in this plan.
> This section defines what should be automated and at which layer.

### 7.1 Recommended Automation Layers

| Layer | Scope | Priority |
|---|---|---|
| **API / Contract Tests** | All 6 endpoints — request/response schema, status codes, rate limits, error states | P1 — highest ROI |
| **Integration Tests** | End-to-end login → session → route guard → logout flow | P1 |
| **DB Validation Tests** | Schema assertions for auth tables, status values, hash format | P2 |
| **Browser / E2E Tests** | UI behaviors: empty field validation, error messages, redirect guards, offline banner | P2 |
| **Security Smoke Tests** | Cookie attribute checks, cross-context isolation, SSO bypass prevention | P1 |

### 7.2 Recommended Tools

| Tool | Layer | Justification |
|---|---|---|
| **Postman / Newman** | API contract + rate limit testing | Direct HTTP control; supports 429 boundary tests |
| **Jest + Supertest** | Backend integration tests | Aligned with NestJS ecosystem |
| **Playwright** | Browser E2E tests | Supports Next.js; cookie inspection; network intercept |
| **Playwright** | Session cookie attribute verification | `request.headers()` + cookie API |
| **psql / TypeORM scripts** | DB seed and validation | Direct schema access for test data setup |

### 7.3 Automation Exclusions (Current Plan)

| Area | Reason |
|---|---|
| MFA OTP send/verify | Endpoints not defined (GAP-014) |
| Entra SSO E2E | Requires live Azure AD tenant; manual per TC-LOGIN-09 |
| Audit log verification | Not specified in spec (GAP-035) |
| Account lockout count | Threshold not defined (GAP-002) |

---

## 8. Entry Criteria

All of the following must be satisfied before test execution begins:

| # | Criterion |
|---|---|
| 1 | `specs/Spec_LoginFeature.md` v1.0 is in Approved status |
| 2 | All 6 API endpoints are deployed to the target test environment |
| 3 | Database schemas (`cmma_core`, `cmma_danis`) are provisioned with migration applied |
| 4 | Test data (user accounts, MFA records, tenant configs) are seeded per Section 5 |
| 5 | `cmma_session` cookie and session bridge routes are accessible |
| 6 | Next.js middleware is deployed and active |
| 7 | Environment variable `NEXT_PUBLIC_USE_MOCK` is configurable for mock mode tests |
| 8 | Rate limiter (`@Throttle`) is active in the test environment |
| 9 | Microsoft Entra ID test tenant or mock token is available for SSO tests |

---

## 9. Exit Criteria

Test execution is considered complete when:

| # | Criterion |
|---|---|
| 1 | All P1 test cases have been executed |
| 2 | All P1 test cases pass (0 open P1 defects) |
| 3 | All critical security controls (SEC-LOGIN-001 → 009) are verified |
| 4 | Cross-context isolation (RISK-001) is confirmed — no cross-schema credential leak |
| 5 | SSO-to-LOCAL bypass prevention (RISK-004) is confirmed |
| 6 | Session bleed on re-login (RISK-003) is confirmed absent |
| 7 | All open P2 defects are triaged and accepted or fixed |
| 8 | All information gaps that produced untestable conditions are formally logged as defects or spec clarification requests |
| 9 | Test execution report and evidence are produced |

---

## 10. Risks

Inherited from `qa/analysis/LoginFeature_QA_Analysis.md` §13:

| ID | Risk | Severity | Impacted Test Area |
|---|---|---|---|
| RISK-001 | Cross-context credential leak via `tenantSlug` routing failure | **Critical** | Functional, Security |
| RISK-002 | MFA bypass via server timezone inconsistency on `expiresAt` comparison | **High** | Security, Boundary |
| RISK-003 | Session bleed between users if `localStorage.clear()` not invoked | **High** | Regression, Session |
| RISK-004 | SSO-to-LOCAL downgrade — ENTRA account logs in via local endpoint | **High** | Security, Functional |
| RISK-005 | Lockout threshold undefined — lockout test cannot set a pass/fail count assertion | **Medium** | Functional |
| RISK-006 | Offline banner not differentiated per failure type (timeout / 503 / DNS) | **Medium** | UI, Integration |
| RISK-007 | Rate limit evasion via distributed IPs (per-IP only, no per-email) | **Medium** | Security |
| RISK-008 | `platformAdmin.isActive=false` may not be enforced — inactive admins may authenticate | **Medium** | Functional, DB |
| RISK-009 | Cookie `Secure` flag rejected in non-HTTPS dev environments | **Low** | Environment |

**Plan-Level Risk:**
- 40 information gaps identified in the QA analysis. 14 are critical-path gaps that prevent
  full test coverage design. Execution of impacted test areas is blocked pending spec clarification.

---

## 11. Information Gaps Affecting This Plan

The following gaps from `qa/analysis/LoginFeature_QA_Analysis.md` directly block or constrain
test case design and execution. They must be resolved before affected test areas can be fully executed.

| Gap ID | Impact on This Plan | Blocking? |
|---|---|---|
| GAP-002 | Cannot assert exact failure count for lockout test | Partially blocking |
| GAP-003 | Cannot define test for MFA-disabled tenant flow | Blocking |
| GAP-004 | Cannot set boundary for FP expiry TTL tests | Partially blocking |
| GAP-005 | UI test cannot verify layout/placeholders | Non-blocking |
| GAP-006 | MFA OTP UI tests cannot be fully defined | Blocking |
| GAP-010 | Email format validation tests cannot be designed | Partially blocking |
| GAP-011 | Password complexity tests cannot be designed | Partially blocking |
| GAP-012 | `deviceFingerprint` field constraint tests cannot be designed | Partially blocking |
| GAP-013 | Invalid `tenantSlug` error behavior test undefined | Blocking |
| GAP-014 | MFA OTP send/verify tests cannot be designed | **Fully blocking** |
| GAP-015 | OTP delivery channel integration test cannot be designed | **Fully blocking** |
| GAP-016 | OTP format/validity tests cannot be designed | **Fully blocking** |
| GAP-019 | SSO user mismatch test behavior undefined | Blocking |
| GAP-020 | Cannot enumerate all protected route redirect tests | Partially blocking |
| GAP-021 | Session inactivity timeout test cannot be designed | Blocking |
| GAP-022 | JWT expiry and refresh/renewal tests cannot be designed | Blocking |
| GAP-024 | Error response body assertions limited to HTTP status only | Non-blocking |
| GAP-025 | HTTP 429 response body assertions limited to status code | Non-blocking |
| GAP-028 | `check-auth-type` `message` field assertions cannot be made | Partially blocking |
| GAP-031 | `isActive` enforcement test cannot be designed | Blocking |
| GAP-032 | `INACTIVE` vs `DEACTIVATED` differentiated behavior undefined | Blocking |
| GAP-033 | JWT algorithm and TTL assertions cannot be made | Blocking |
| GAP-035 | Audit log verification excluded from plan | Blocking |
| GAP-037 | CSRF test excluded from plan | Blocking |
| GAP-038 | JWKS offline SSO failure test deferred | Blocking |
| GAP-039 | Revoked Entra token mid-session test deferred | Blocking |
| GAP-040 | OTP notification service integration test deferred | **Fully blocking** |

---

## 12. Traceability Approach

All test cases produced from this plan must carry the following traceability chain:

```
Test Case ID
  → Requirement ID (REQ-LOGIN-xxx)
  → Business Rule ID (BR-LOGIN-xxx) [if applicable]
  → UI Behavior ID (UI-LOGIN-xxx) [if applicable]
  → API Contract ID (API-LOGIN-xxx) [if applicable]
  → Security Control ID (SEC-LOGIN-xxx) [if applicable]
  → Session Behavior ID (SES-LOGIN-xxx) [if applicable]
  → Spec Section Reference (§x.x)
  → QA Analysis Gap Reference (GAP-xxx) [if test is constrained by a gap]
```

**Traceability matrix** must be maintained alongside the test case register to support:
- Impact analysis when spec changes are made
- Coverage reporting against the 18 functional requirements
- Gap closure tracking as information gaps are resolved
- Regression scope identification for future releases

---

*Test plan derived from `specs/Spec_LoginFeature.md` v1.0 and `qa/analysis/LoginFeature_QA_Analysis.md`.
No behavior has been invented. Source files have not been modified.*
