# QA Analysis Report — Authentication & Session Management (Login Feature)

**Source Spec:** `specs/Spec_LoginFeature.md`
**Epic:** epic-auth | **Feature:** feat-login | **Spec Version:** 1.0 — Approved
**Analysis Date:** 2026-08-17
**Analyst:** Antigravity AI (QA Analysis Skill)
**Status:** Analysis Complete — Clarification Required Before Specification Generation

> [!IMPORTANT]
> This document is a **read-only analysis** of the source spec. No behavior has been invented.
> All unspecified items are explicitly marked as **INFORMATION GAP**.

---

## 1. Scope & Purpose

The spec covers the Authentication & Session Management feature for the **CMMA Platform**.
It defines three authentication pathways, session lifecycle management, and tenant isolation:

1. **Local Credential Authentication** — Email + password with bcrypt + MFA device fingerprint
2. **Microsoft Entra ID Corporate SSO** — OAuth2 / MSAL token-based delegated authentication
3. **Per-Tenant MFA & Device Fingerprinting** — OTP delivery with `cmma_device_fp` trust lifecycle

The feature also governs:
- Domain & context isolation between Platform Admin and Tenant User login contexts
- HTTP-only session cookie lifecycle (`cmma_session`)
- Next.js route middleware for protected route enforcement
- Backend offline fault tolerance (graceful degradation)

---

## 2. Actors

| Actor | Context | Auth Methods |
|---|---|---|
| **Platform Administrator** | Global platform settings (`cmma-dev.cosdevx.com`) | LOCAL password, Entra SSO |
| **Tenant User** | Tenant subdomain (`<tenantSlug>-cmma-dev.cosdevx.com`) | LOCAL password, Entra SSO |

> **INFORMATION GAP — GAP-001:** The spec does not define roles or permissions beyond listing example values (`System Admin`, `users.create`, `users.edit`) in the API response sample. No role taxonomy or RBAC matrix is included in this spec.

---

## 3. Functional Requirements

| ID | Requirement | Source |
|---|---|---|
| REQ-LOGIN-001 | System shall support LOCAL email + password login for Platform Admins via `cmma_core.platformAdmin` | §1.1, §3.1 |
| REQ-LOGIN-002 | System shall support LOCAL email + password login for Tenant Users via `cmma_<tenantSlug>.account` | §1.1, §3.1 |
| REQ-LOGIN-003 | System shall support Microsoft Entra SSO login via OAuth2/MSAL token exchange | §1.1, §3.2 |
| REQ-LOGIN-004 | System shall check trusted device fingerprint (`cmma_device_fp`) before granting session on local login | §1.1, §3.1 |
| REQ-LOGIN-005 | System shall issue an MFA OTP challenge when device fingerprint is stale, missing, or untrusted | §4.2 |
| REQ-LOGIN-006 | System shall return `mfa_required: true` payload when MFA OTP challenge is triggered | §3.1 |
| REQ-LOGIN-007 | System shall issue a JWT access token upon successful authentication (trusted device) | §3.1 |
| REQ-LOGIN-008 | System shall resolve auth type (LOCAL / ENTRA / DISABLED / NO_ACCOUNT / NOT_FOUND) via `/api/auth/check-auth-type` | §3.3 |
| REQ-LOGIN-009 | System shall resolve tenant branding, theme, and auth provider flags via `GET /api/auth/config` | §3.4 |
| REQ-LOGIN-010 | System shall set `cmma_session` HTTP-only cookie on successful login via Next.js session bridge | §3.5, §4.4 |
| REQ-LOGIN-011 | System shall expire `cmma_session` cookie (Max-Age=0) on logout | §3.5 |
| REQ-LOGIN-012 | System shall clear `localStorage` and `sessionStorage` on logout or user switching | §4.4 |
| REQ-LOGIN-013 | System shall redirect unauthenticated users from protected routes to `/login` | §4.4 |
| REQ-LOGIN-014 | System shall redirect authenticated users away from `/login` to `/` (dashboard) | §4.4 |
| REQ-LOGIN-015 | System shall render "Backend Server Offline" banner and "Retry Connection" button when `/api/auth/*` is unreachable | §4.5 |
| REQ-LOGIN-016 | System shall block Platform Admin credentials from querying tenant schemas (and vice versa) | §4.3 |
| REQ-LOGIN-017 | SSO-enforced accounts shall not be permitted to authenticate via local password | §4.3 |
| REQ-LOGIN-018 | System shall enforce Mock Mode fallback banner when `NEXT_PUBLIC_USE_MOCK` env flag is enabled | §5 (TC-LOGIN-11) |

---

## 4. Business Rules

| ID | Rule | Source |
|---|---|---|
| BR-LOGIN-001 | Platform Admin context is resolved when `tenantSlug` is `null`, `'admin'`, `'platform'`, or `'cmma-dev'` | §3.1 |
| BR-LOGIN-002 | Tenant User context is resolved when `tenantSlug` is any other non-null slug (e.g., `'danis'`) | §3.1 |
| BR-LOGIN-003 | Bcrypt salt factor **10** must be used for all locally stored passwords | §4.1 |
| BR-LOGIN-004 | A device fingerprint is trusted only when `isTrusted = true` AND `expiresAt > NOW()` | §4.2 |
| BR-LOGIN-005 | Stale, expired, or unverified fingerprints trigger MFA OTP challenge — not account lockout | §4.2 |
| BR-LOGIN-006 | Account lockout occurs only after **repeated consecutive OTP verification failures** | §4.2 |
| BR-LOGIN-007 | MFA enforcement may be toggled per-tenant via the `mfa_enabled` configuration flag | §4.2 |
| BR-LOGIN-008 | Platform Admin logins query **only** `cmma_core.platformAdmin`; cross-context lookups are prohibited | §4.3 |
| BR-LOGIN-009 | Tenant logins query **only** `cmma_<tenantSlug>` schema; no cross-tenant credential lookup | §4.3 |
| BR-LOGIN-010 | ENTRA SSO accounts cannot bypass SSO using local password if SSO is enforced | §4.3 |
| BR-LOGIN-011 | `tenantSlug` may be supplied via request body or `X-Tenant-Slug` HTTP header | §3.1 |

> **INFORMATION GAP — GAP-002:** The exact threshold (number of consecutive failures) that triggers account lockout is not defined in the spec.

> **INFORMATION GAP — GAP-003:** The spec states MFA is per-tenant configurable via `mfa_enabled`, but does not specify the behavior when MFA is **disabled** for a tenant — whether trusted device checks are skipped entirely or another code path is followed.

> **INFORMATION GAP — GAP-004:** The spec does not define the duration/expiry period for trusted device fingerprints (`expiresAt`). No TTL or renewal policy is stated.

---

## 5. UI Behavior

| ID | Behavior | Source |
|---|---|---|
| UI-LOGIN-001 | Login page renders an email and password input with a "Sign In" button | §5 (TC-LOGIN-04) |
| UI-LOGIN-002 | Clicking "Sign In" with empty email **or** password shows: `"Please enter both email and password"` and suppresses the network request | §5 (TC-LOGIN-04) |
| UI-LOGIN-003 | Invalid credentials display an inline red error message and block redirect | §5 (TC-LOGIN-03) |
| UI-LOGIN-004 | Backend unreachable renders a "Backend Server Offline" alert banner with a "Retry Connection" button | §4.5 |
| UI-LOGIN-005 | Authenticated users navigating to `/login` are immediately redirected to `/` without rendering the form | §4.4 |
| UI-LOGIN-006 | MFA OTP verification prompt is displayed when device fingerprint is stale or unrecognized | §4.2, §3.1 |
| UI-LOGIN-007 | Mock mode renders a banner on the login screen when `NEXT_PUBLIC_USE_MOCK` is enabled | §5 (TC-LOGIN-11) |
| UI-LOGIN-008 | Tenant login screen renders branding (logo, theme color) sourced from `GET /api/auth/config` | §3.4 |

> **INFORMATION GAP — GAP-005:** The spec does not describe the exact layout, field order, placeholder text, or design spec for the login form beyond what can be inferred from TC-LOGIN-04.

> **INFORMATION GAP — GAP-006:** The spec does not describe what UI state, button label, or instructions are shown during the MFA OTP challenge step (beyond the fact that a "prompt" is triggered).

> **INFORMATION GAP — GAP-007:** No specification for password masking / show-password toggle behavior.

> **INFORMATION GAP — GAP-008:** The spec does not define a "Remember Me" or "Keep Me Signed In" UI option.

> **INFORMATION GAP — GAP-009:** The spec does not describe loading / spinner states during API calls from the login form.

---

## 6. Validation

| ID | Field | Rule | Error / Behavior | Source |
|---|---|---|---|---|
| VAL-LOGIN-001 | `email` | Mandatory | `400 BadRequestException` if missing | §3.1 |
| VAL-LOGIN-002 | `password` | Mandatory | `400 BadRequestException` if missing | §3.1 |
| VAL-LOGIN-003 | `email` + `password` | Both empty (client-side) | Displays `"Please enter both email and password"`, suppresses network request | §5 (TC-LOGIN-04) |
| VAL-LOGIN-004 | SSO `token` | Mandatory | `400 BadRequestException` if missing | §3.2 |
| VAL-LOGIN-005 | `email` (check-auth-type) | Mandatory | Implied (endpoint validates presence) | §3.3 |

> **INFORMATION GAP — GAP-010:** Email format validation (RFC 5322 or similar) is not specified — whether it is enforced client-side, server-side, or both.

> **INFORMATION GAP — GAP-011:** Password complexity / length requirements are not defined in the spec.

> **INFORMATION GAP — GAP-012:** The spec does not define field-level validation for `deviceFingerprint` (max length, format, optional vs. required for local login).

> **INFORMATION GAP — GAP-013:** The spec does not define what happens when `tenantSlug` is provided but does not correspond to a valid/active tenant.

---

## 7. Authentication / MFA / SSO

### 7.1 Local Authentication Flow (`POST /api/auth/login`)

1. Validate `email` and `password` present — 400 if missing
2. Resolve context from `tenantSlug` (body or `X-Tenant-Slug` header)
3. Lookup user in appropriate schema; validate bcrypt hash
4. For Tenant User: also validate `account.status = ACTIVE`
5. Check `mfaVerification` for trusted fingerprint (`isTrusted=true`, `expiresAt > NOW()`)
   - **Trusted** — Issue JWT, return user payload
   - **Stale / Missing / Untrusted** — Return `{ mfa_required: true, email }`

### 7.2 Entra SSO Flow (`POST /api/auth/entra`)

1. Validate `token` present — 400 if missing
2. Decode and verify Azure Entra ID JWT via public keys
3. Match `upn` / `email` against `cmma_core.platformAdmin` or `account.ssoProviderUserId`
4. Issue system JWT; return standard user payload

### 7.3 Auth Type Resolution (`POST /api/auth/check-auth-type`)

Returns one of five states: `LOCAL`, `ENTRA`, `DISABLED`, `NO_ACCOUNT`, `NOT_FOUND`.

> **INFORMATION GAP — GAP-014:** The MFA OTP send endpoint is referenced in §4.1 as being rate-limited (5/60s) but **no dedicated API endpoint for sending or verifying OTP is defined** in this spec (e.g., `POST /api/auth/mfa/send`, `POST /api/auth/mfa/verify`).

> **INFORMATION GAP — GAP-015:** The spec does not define the OTP delivery channel (email, SMS, authenticator app).

> **INFORMATION GAP — GAP-016:** The spec does not define OTP code length (though schema stores `VARCHAR(10)`), format (numeric only?), or validity window.

> **INFORMATION GAP — GAP-017:** The spec does not define the Entra SSO token validation mechanism beyond "verifies via public keys" — no specific library, JWKS URI, or audience/issuer validation rules are stated.

> **INFORMATION GAP — GAP-018:** The spec does not describe the Entra SSO redirect flow from the frontend (MSAL popup vs. redirect flow, redirect URI).

> **INFORMATION GAP — GAP-019:** The spec does not state what happens when an Entra SSO user's `ssoProviderUserId` does not match any record in the tenant or platform schema.

---

## 8. Session / Logout / Route Protection

| ID | Behavior | Detail | Source |
|---|---|---|---|
| SES-LOGIN-001 | Session cookie name | `cmma_session` | §3.5 |
| SES-LOGIN-002 | Cookie attributes | HTTP-only, Secure, SameSite=Lax, Max-Age=8 hours | §3.5 |
| SES-LOGIN-003 | Session set | `POST /api/session/login` — accepts `{ token, user }` | §3.5 |
| SES-LOGIN-004 | Session destruction | `POST /api/session/logout` — sets `Max-Age=0` | §3.5 |
| SES-LOGIN-005 | Client storage cleared on logout | `localStorage.clear()` + `sessionStorage.clear()` | §4.4 |
| SES-LOGIN-006 | Protected route guard | Unauthenticated — redirect to `/login` | §4.4 |
| SES-LOGIN-007 | Login route guard | Authenticated — redirect to `/` (dashboard) | §4.4 |
| SES-LOGIN-008 | Protected routes include | `/dashboard`, `/projects` (examples given) | §4.4 |

> **INFORMATION GAP — GAP-020:** The full list of protected routes beyond `/dashboard` and `/projects` is not defined in this spec.

> **INFORMATION GAP — GAP-021:** The spec does not define session timeout / inactivity expiry behavior. The cookie has an 8-hour max-age but no inactivity-based expiry is described.

> **INFORMATION GAP — GAP-022:** The spec does not define what happens to the session cookie when the JWT access token expires (token refresh mechanism, forced re-login, or silent renewal).

> **INFORMATION GAP — GAP-023:** The spec does not define whether the session bridge stores the full JWT or a derived session token inside the `cmma_session` cookie.

---

## 9. APIs & Contracts

| ID | Endpoint | Method | Auth | Rate Limit | Source |
|---|---|---|---|---|---|
| API-LOGIN-001 | `/api/auth/login` | POST | Public | 5 req / 60 s | §3.1 |
| API-LOGIN-002 | `/api/auth/entra` | POST | Public | 5 req / 60 s | §3.2 |
| API-LOGIN-003 | `/api/auth/check-auth-type` | POST | Public | 10 req / 60 s | §3.3 |
| API-LOGIN-004 | `/api/auth/config` | GET | Public | Not specified | §3.4 |
| API-LOGIN-005 | `/api/session/login` | POST | Internal (Next.js) | Not specified | §3.5 |
| API-LOGIN-006 | `/api/session/logout` | POST | Internal (Next.js) | Not specified | §3.5 |

**`POST /api/auth/login` Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "tenantSlug": "danis",
  "deviceFingerprint": "automation-device-fp-999"
}
```

**`POST /api/auth/login` Success Response (trusted device):**
```json
{
  "access_token": "<JWT>",
  "user": {
    "id": "acc-uuid-1234",
    "email": "user@example.com",
    "firstName": "Hanish",
    "lastName": "Donthy",
    "role": "System Admin",
    "roles": ["System Admin"],
    "permissions": ["users.create", "users.edit"],
    "tenantRoles": [{ "tenantId": "...", "tenantName": "...", "roleId": "...", "roleName": "..." }]
  }
}
```

**`POST /api/auth/login` MFA Trigger Response:**
```json
{ "mfa_required": true, "email": "user@example.com" }
```

**`POST /api/auth/check-auth-type` Response variants:**
- `LOCAL`: `{ "authType": "LOCAL", "isSso": false }`
- `ENTRA`: `{ "authType": "ENTRA", "isSso": true, "message": "..." }`
- `DISABLED`: `{ "authType": "DISABLED", "isDisabled": true, "message": "..." }`
- `NO_ACCOUNT`: `{ "authType": "NO_ACCOUNT", "isNoAccount": true, "message": "..." }`
- `NOT_FOUND`: `{ "authType": "NOT_FOUND", "notFound": true, "message": "..." }`

> **INFORMATION GAP — GAP-024:** HTTP error response body format is not defined (no standard error envelope — e.g., `{ error, message, statusCode }` structure is not shown).

> **INFORMATION GAP — GAP-025:** Rate limit exceeded behavior (HTTP 429 response body) is not defined.

> **INFORMATION GAP — GAP-026:** `/api/auth/config` has no defined rate limit in the spec.

> **INFORMATION GAP — GAP-027:** `/api/session/login` and `/api/session/logout` have no defined rate limits.

> **INFORMATION GAP — GAP-028:** The `message` field values in `check-auth-type` ENTRA, DISABLED, NO_ACCOUNT, and NOT_FOUND responses are not specified.

---

## 10. Database Entities / Schema

| ID | Entity | Schema | Key Columns | Source |
|---|---|---|---|---|
| DB-LOGIN-001 | `platformAdmin` | `cmma_core` | `platformAdminId (UUID)`, `email`, `passwordHash (VARCHAR 255, nullable)`, `authProvider (VARCHAR 50, default 'LOCAL')`, `lastLoginAt (TIMESTAMP, nullable)`, `isActive (boolean)` | §2.1, §2.2 |
| DB-LOGIN-002 | `mfaVerification` (core) | `cmma_core` | `mfaVerificationId (UUID PK)`, `platformAdminId (UUID FK)`, `deviceFingerprint (VARCHAR 255)`, `isTrusted (BOOLEAN, default false)`, `otpCode (VARCHAR 10, nullable)`, `expiresAt (TIMESTAMP)`, `createdAt (TIMESTAMP)` | §2.1 |
| DB-LOGIN-003 | `account` | `cmma_<tenantSlug>` | `accountId`, `resourceId`, `passwordHash (VARCHAR 255, nullable)`, `ssoProviderUserId (VARCHAR 255, nullable)`, `status (VARCHAR 50, default 'ACTIVE')` | §2.1, §2.2 |
| DB-LOGIN-004 | `mfaVerification` (tenant) | `cmma_<tenantSlug>` | `mfaVerificationId (UUID PK)`, `resourceId (UUID FK)`, `deviceFingerprint (VARCHAR 255)`, `isTrusted (BOOLEAN, default false)`, `otpCode (VARCHAR 10, nullable)`, `expiresAt (TIMESTAMP)`, `createdAt (TIMESTAMP)` | §2.1 |
| DB-LOGIN-005 | `resource` | `cmma_<tenantSlug>` | `resourceId (UUID)`, `email`, `firstName`, `lastName`, `status` | §2.2 |

**Account status values (spec-confirmed):** `ACTIVE`, `DEACTIVATED`, `INACTIVE`
**authProvider values (spec-confirmed):** `LOCAL`, `ENTRA`

> **INFORMATION GAP — GAP-029:** The spec does not define indexes on `mfaVerification.deviceFingerprint` or `mfaVerification.expiresAt`, which are queried in the hot authentication path.

> **INFORMATION GAP — GAP-030:** The spec does not define a cleanup or expiry strategy for stale `mfaVerification` records.

> **INFORMATION GAP — GAP-031:** `platformAdmin.isActive` is listed in the TypeORM entity but is **not referenced in any login flow logic** in the spec. It is unclear whether inactive Platform Admins are blocked from logging in.

> **INFORMATION GAP — GAP-032:** The `account.status = ACTIVE` check is specified for Tenant User login, but the spec does not define the behavior when `status = INACTIVE` (vs. `DEACTIVATED`) — whether the response is different per status value.

---

## 11. Security / Rate Limits / Tenant Isolation

| ID | Control | Detail | Source |
|---|---|---|---|
| SEC-LOGIN-001 | Rate limit — local login | 5 requests per 60 seconds per IP | §3.1, §4.1 |
| SEC-LOGIN-002 | Rate limit — Entra SSO | 5 requests per 60 seconds | §3.2 |
| SEC-LOGIN-003 | Rate limit — check-auth-type | 10 requests per 60 seconds | §3.3 |
| SEC-LOGIN-004 | Password hashing | bcrypt, salt factor 10 | §4.1 |
| SEC-LOGIN-005 | Session cookie | HTTP-only, Secure, SameSite=Lax | §3.5 |
| SEC-LOGIN-006 | Cross-context isolation | Platform Admin — `cmma_core` only; Tenant — `cmma_<tenantSlug>` only | §4.3 |
| SEC-LOGIN-007 | SSO enforcement | ENTRA-configured accounts cannot log in via local password | §4.3 |
| SEC-LOGIN-008 | Client storage sanitization | `localStorage.clear()` + `sessionStorage.clear()` on logout | §4.4 |
| SEC-LOGIN-009 | MFA OTP challenge | Triggered on stale/unrecognized/expired device fingerprint | §4.2 |
| SEC-LOGIN-010 | Account lockout | Triggered after repeated consecutive OTP verification failures | §4.2 |
| SEC-LOGIN-011 | JWT algorithm | Not explicitly stated; sample header implies HS256 (inferred, not confirmed) | §3.1 |

> **INFORMATION GAP — GAP-033:** JWT signing algorithm, secret management, and token expiry duration are not formally specified.

> **INFORMATION GAP — GAP-034:** Rate limiting scope is per IP for local login; it is unspecified whether it is also per-user/email or only per IP for the other endpoints.

> **INFORMATION GAP — GAP-035:** The spec does not define audit logging — whether login attempts (success/failure), logouts, or MFA events are written to an audit log.

> **INFORMATION GAP — GAP-036:** The spec does not define input sanitization requirements to protect against SQL injection or XSS in auth inputs.

> **INFORMATION GAP — GAP-037:** The spec does not define CSRF protection for the session bridge endpoints (`/api/session/login`, `/api/session/logout`).

---

## 12. Errors & Dependencies

### 12.1 Error States (Spec-Confirmed)

| HTTP Code | Condition | Endpoint |
|---|---|---|
| 400 | Missing `email` or `password` | `POST /api/auth/login` |
| 400 | Missing `token` | `POST /api/auth/entra` |
| UI Banner | Backend APIs unreachable | All `POST /api/auth/*` |

### 12.2 Dependencies

| Type | Dependency | Notes |
|---|---|---|
| External | **Microsoft Entra ID / Azure AD** | JWT public key validation for SSO |
| Library | **MSAL** (Microsoft Authentication Library) | Frontend SSO flow |
| Framework | **Next.js** | Route middleware, session bridge API routes |
| ORM | **TypeORM** | Database entity management |
| Runtime | `NEXT_PUBLIC_USE_MOCK` env flag | Mock mode for local development |
| Feature Flag | `mfa_enabled` per-tenant config | Controls MFA enforcement |

> **INFORMATION GAP — GAP-038:** The spec does not define behavior when the Entra ID public key endpoint (JWKS) is unreachable — whether SSO login fails open or closed.

> **INFORMATION GAP — GAP-039:** The spec does not define behavior for expired or revoked Entra JWT tokens (e.g., mid-session invalidation).

> **INFORMATION GAP — GAP-040:** No email/notification service dependency is documented despite OTP delivery being required (see GAP-015).

---

## 13. Risks & Regression Impact

| ID | Risk | Severity | Impacted Area |
|---|---|---|---|
| RISK-001 | Cross-context credential leak — if `tenantSlug` routing logic fails, a Platform Admin credential could be validated against a tenant schema | **Critical** | SEC-LOGIN-006, BR-LOGIN-008 |
| RISK-002 | MFA bypass — if `expiresAt` comparison uses server timezone inconsistently, a stale fingerprint may be accepted as trusted | **High** | BR-LOGIN-004, SEC-LOGIN-009 |
| RISK-003 | Session bleed between users — if `localStorage.clear()` is not invoked before loading the next user's session data | **High** | SES-LOGIN-005 |
| RISK-004 | SSO-to-LOCAL downgrade — if SSO-enforced account can be logged in via `/api/auth/login` due to missing enforcement check | **High** | SEC-LOGIN-007, BR-LOGIN-010 |
| RISK-005 | Account lockout threshold undefined — without a specified limit, lockout behavior is untestable and may vary per environment | **Medium** | BR-LOGIN-006, GAP-002 |
| RISK-006 | Backend offline state not differentiated — UI renders a generic offline banner regardless of specific failure cause (timeout vs. 503 vs. DNS) | **Medium** | REQ-LOGIN-015 |
| RISK-007 | Rate limit evasion — if throttling is applied per-IP only and not per-email, credential stuffing via distributed IPs may succeed | **Medium** | SEC-LOGIN-001, GAP-034 |
| RISK-008 | `platformAdmin.isActive` flag not enforced — inactive admin accounts may successfully authenticate | **Medium** | DB-LOGIN-001, GAP-031 |
| RISK-009 | Cookie security downgrade in non-HTTPS dev environments — `Secure` flag on `cmma_session` may cause cookie to be rejected | **Low** | SES-LOGIN-002 |

---

## 14. Ambiguities / Information Gaps (Consolidated)

| Gap ID | Area | Description |
|---|---|---|
| GAP-001 | Actors | No role taxonomy or RBAC matrix defined |
| GAP-002 | Business Rule | OTP lockout threshold (number of failures) not defined |
| GAP-003 | Business Rule | Behavior when tenant MFA is disabled (`mfa_enabled=false`) not described |
| GAP-004 | Business Rule | Device fingerprint TTL / renewal policy not defined |
| GAP-005 | UI | Login form layout, field labels, and placeholder text not specified |
| GAP-006 | UI | MFA OTP challenge UI state not described |
| GAP-007 | UI | Password show/hide toggle not specified |
| GAP-008 | UI | "Remember Me" or persistent session option not defined |
| GAP-009 | UI | Loading/spinner states during API calls not specified |
| GAP-010 | Validation | Email format validation rules not specified |
| GAP-011 | Validation | Password complexity/length requirements not defined |
| GAP-012 | Validation | `deviceFingerprint` field constraints not defined |
| GAP-013 | Validation | Behavior for invalid/unknown `tenantSlug` not defined |
| GAP-014 | API | MFA OTP send and verify endpoints not defined in this spec |
| GAP-015 | API / Integration | OTP delivery channel (email, SMS, TOTP) not specified |
| GAP-016 | API | OTP format, length, and validity window not defined |
| GAP-017 | SSO | Entra token validation mechanism (library, JWKS URI, audience/issuer) not specified |
| GAP-018 | SSO | Frontend MSAL flow type (popup vs. redirect) not defined |
| GAP-019 | SSO | Behavior when Entra `ssoProviderUserId` has no match not defined |
| GAP-020 | Session | Full list of protected routes not enumerated |
| GAP-021 | Session | Inactivity timeout behavior not defined |
| GAP-022 | Session | JWT expiry and refresh/renewal behavior not defined |
| GAP-023 | Session | Session cookie content (full JWT vs. derived token) not specified |
| GAP-024 | API | Standard HTTP error response envelope not defined |
| GAP-025 | API | HTTP 429 (rate limit exceeded) response body not defined |
| GAP-026 | API | Rate limit for `GET /api/auth/config` not defined |
| GAP-027 | API | Rate limits for session bridge endpoints not defined |
| GAP-028 | API | `message` field values in `check-auth-type` responses not specified |
| GAP-029 | Database | Index strategy for `mfaVerification` hot-path columns not defined |
| GAP-030 | Database | Cleanup/expiry strategy for stale `mfaVerification` records not defined |
| GAP-031 | Database | `platformAdmin.isActive` enforcement in login flow not described |
| GAP-032 | Database | Differentiated behavior for `INACTIVE` vs. `DEACTIVATED` account status not defined |
| GAP-033 | Security | JWT algorithm, secret management, and token TTL not formally specified |
| GAP-034 | Security | Rate limit scope (per-IP only vs. per-email + per-IP) not clarified |
| GAP-035 | Security | Audit logging requirements not defined |
| GAP-036 | Security | Input sanitization requirements not defined |
| GAP-037 | Security | CSRF protection for session bridge endpoints not specified |
| GAP-038 | Integration | JWKS endpoint unreachability behavior not defined |
| GAP-039 | Integration | Expired/revoked Entra token mid-session behavior not defined |
| GAP-040 | Integration | Email/SMS notification service dependency not documented |

---

## 15. Specification Readiness

| Criterion | Status |
|---|---|
| Business objective is clear | Yes |
| Functional requirements identified | Yes |
| Major workflows understood | Yes — Local Login, SSO, MFA trigger, Session, Logout |
| Critical business rules identified | Yes |
| API contracts documented | Partially — MFA sub-endpoints missing |
| Dependencies documented | Partially |
| Major ambiguities listed | Yes — 40 gaps catalogued |
| Assumptions separated | Yes |

> **Verdict: Clarification Required Before Full Test Specification Generation**
>
> The spec is detailed enough to analyze happy paths, core business rules, and the six main API contracts.
> However, **14 critical gaps** must be resolved before complete test coverage can be designed:
> GAP-002 (lockout threshold), GAP-003 (MFA disabled behavior), GAP-014 (MFA OTP endpoints),
> GAP-015 (OTP channel), GAP-019 (SSO mismatch), GAP-021 (inactivity timeout),
> GAP-022 (JWT refresh), GAP-031 (`isActive` enforcement), GAP-032 (INACTIVE vs DEACTIVATED),
> GAP-033 (JWT TTL), GAP-035 (audit logging), GAP-037 (CSRF), GAP-038 (JWKS offline), GAP-039 (revoked token).

---

*Analysis produced from `specs/Spec_LoginFeature.md` v1.0. No behavior was invented. All gaps reflect information absent from the source document.*
