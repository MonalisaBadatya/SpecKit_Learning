# Technical Specification: Authentication & Session Management (Local, Entra SSO, & MFA)

**Epic:** epic-auth  
**Feature:** feat-login  
**Version:** 1.0 — Approved  
**Author:** Antigravity AI & Senior Full-Stack Engineering Team  
**Status:** 🟢 Approved & Implemented  

---

## 1. Rationale & Overview

### 1.1 Job to be Done
Users accessing the CMMA Platform — including **Platform Administrators** operating across global system settings and **Tenant Users** operating within specific corporate boundaries — require a secure, performant, and friction-free authentication mechanism.

The platform must support dual authentication pathways while maintaining strict security, data boundary isolation, and session hygiene:
1. **Local Credential Authentication**: Email and password authentication with bcrypt hashing, rate limiting, and Multi-Factor Authentication (MFA) device fingerprint trust checks.
2. **Microsoft Entra ID Corporate SSO**: Delegated corporate authentication via OAuth2 / MSAL token exchange, bypassing local password management when corporate SSO is enforced.
3. **Per-Tenant MFA & Device Fingerprinting**: Multi-factor authentication OTP delivery with trusted device fingerprinting (`cmma_device_fp`). Stale or unrecognized fingerprints trigger an interactive MFA OTP step rather than blocking entry.
4. **Domain & Context Isolation**: Platform Admin screens query **only** `cmma_core.platformAdmin`. Tenant login screens query **only** `cmma_<tenantSlug>`. Cross-context credential lookups are strictly prohibited.
5. **Session Hygiene & Route Middleware**: Next.js route middleware and HTTP-only session cookies (`cmma_session`) ensure authenticated users are redirected away from login screens, while unauthenticated requests are redirected back to login with complete client state sanitization upon logout.

---

## 2. Technical Architecture & Data Contract

### 2.1 Database Schema & Data Models

Authentication records are partitioned between the platform core schema and tenant-specific schemas:

```sql
-- Core Schema: Platform Admin Credentials & Core MFA
ALTER TABLE "cmma_core"."platformAdmin"
  ADD COLUMN IF NOT EXISTS "passwordHash" VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS "authProvider" VARCHAR(50) DEFAULT 'LOCAL',
  ADD COLUMN IF NOT EXISTS "lastLoginAt" TIMESTAMP NULL;

CREATE TABLE IF NOT EXISTS "cmma_core"."mfaVerification" (
  "mfaVerificationId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "platformAdminId" UUID NULL REFERENCES "cmma_core"."platformAdmin"("platformAdminId"),
  "deviceFingerprint" VARCHAR(255) NOT NULL,
  "isTrusted" BOOLEAN DEFAULT FALSE,
  "otpCode" VARCHAR(10) NULL,
  "expiresAt" TIMESTAMP NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Tenant Schemas: Account Table & Tenant MFA
-- Applied across all tenant schemas (cmma_danis, cmma_falcon, cmma_virgo, etc.)
ALTER TABLE "cmma_<tenantSlug>"."account"
  ADD COLUMN IF NOT EXISTS "passwordHash" VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS "ssoProviderUserId" VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS "status" VARCHAR(50) DEFAULT 'ACTIVE';

CREATE TABLE IF NOT EXISTS "cmma_<tenantSlug>"."mfaVerification" (
  "mfaVerificationId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "resourceId" UUID NOT NULL REFERENCES "cmma_<tenantSlug>"."resource"("resourceId"),
  "deviceFingerprint" VARCHAR(255) NOT NULL,
  "isTrusted" BOOLEAN DEFAULT FALSE,
  "otpCode" VARCHAR(10) NULL,
  "expiresAt" TIMESTAMP NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);
```

### 2.2 TypeORM Entities & Key Files
- **PlatformAdmin Entity**: [platform-admin.entity.ts](file:///c:/Users/costrategix/PycharmProjects/cmma-app-new/backend/src/entities/platform-admin.entity.ts)
  - `platformAdminId: string`
  - `email: string`
  - `passwordHash: string | null`
  - `authProvider: string` ('LOCAL' | 'ENTRA')
  - `isActive: boolean`
- **Account Entity**: [account.entity.ts](file:///c:/Users/costrategix/PycharmProjects/cmma-app-new/backend/src/entities/account.entity.ts)
  - `accountId: string`
  - `resourceId: string`
  - `passwordHash: string | null`
  - `ssoProviderUserId: string | null`
  - `status: string` ('ACTIVE' | 'DEACTIVATED' | 'INACTIVE')
- **Resource Entity**: [resource.entity.ts](file:///c:/Users/costrategix/PycharmProjects/cmma-app-new/backend/src/entities/resource.entity.ts)
  - `resourceId: string`
  - `email: string`
  - `firstName: string`
  - `lastName: string`
  - `status: string`
- **Auth Controller**: [auth.controller.ts](file:///c:/Users/costrategix/PycharmProjects/cmma-app-new/backend/src/auth/auth.controller.ts)
- **Auth Service**: [auth.service.ts](file:///c:/Users/costrategix/PycharmProjects/cmma-app-new/backend/src/auth/auth.service.ts)
- **Entra Auth Service**: [entra-auth.service.ts](file:///c:/Users/costrategix/PycharmProjects/cmma-app-new/backend/src/auth/entra-auth.service.ts)
- **MFA Service**: [mfa.service.ts](file:///c:/Users/costrategix/PycharmProjects/cmma-app-new/backend/src/auth/mfa.service.ts)
- **Frontend Login Page**: [LoginPage.tsx](file:///c:/Users/costrategix/PycharmProjects/cmma-app-new/frontend/page-components/LoginPage.tsx)
- **Next.js Session Bridge Route**: [route.ts](file:///c:/Users/costrategix/PycharmProjects/cmma-app-new/frontend/app/api/session/login/route.ts)
- **Next.js Middleware Guard**: [middleware.ts](file:///c:/Users/costrategix/PycharmProjects/cmma-app-new/frontend/middleware.ts)

---

## 3. API Endpoints Specification

### 3.1 Local Authentication (`POST /api/auth/login`)
Public endpoint handling primary email/password credential verification for both Platform Admins and Tenant Users.

- **Rate Limit**: Strictly throttled to **5 requests per 60 seconds** per IP (`@Throttle({ default: { limit: 5, ttl: 60000 } })`).
- **Request Body (`LoginDto`)**:
  ```json
  {
    "email": "user@example.com",
    "password": "SecurePassword123!",
    "tenantSlug": "danis",
    "deviceFingerprint": "automation-device-fp-999"
  }
  ```

- **Execution Flow**:
  1. **Validation**: Ensures `email` and `password` are present (throws `400 BadRequestException` if missing).
  2. **Context Resolution**: Evaluates `tenantSlug` (from body or `X-Tenant-Slug` header).
     - Platform Context (`null`, `'admin'`, `'platform'`, `'cmma-dev'`): Calls `authService.loginPlatformAdmin`.
     - Tenant Context (`'danis'`, etc.): Calls `authService.loginTenantUser`.
  3. **Credential Lookup**:
     - Platform Admin: Queries `cmma_core.platformAdmin` by email. Validates bcrypt hash.
     - Tenant User: Queries `cmma_<tenantSlug>.account` via `Resource` email lookup. Validates account active status and bcrypt hash.
  4. **Trusted Device & MFA Check**:
     - Checks `mfaVerification` table for matching `deviceFingerprint` with `isTrusted = true` and `expiresAt > NOW()`.
     - **Stale or Missing Fingerprint**: Returns MFA required payload:
       ```json
       {
         "mfa_required": true,
         "email": "user@example.com"
       }
       ```
  5. **Successful Authentication Response (Trusted Device)**:
     ```json
     {
       "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
       "user": {
         "id": "acc-uuid-1234",
         "email": "user@example.com",
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

---

### 3.2 Microsoft Entra SSO Authentication (`POST /api/auth/entra`)
Public endpoint accepting a verified Microsoft Entra ID OAuth2 token for corporate single sign-on.

- **Rate Limit**: Throttled to **5 requests per 60 seconds**.
- **Request Body (`LoginEntraDto`)**:
  ```json
  {
    "token": "eyJhbGciOiJSUzI1NiIs...",
    "tenantSlug": "danis"
  }
  ```

- **Execution Flow**:
  1. Validates presence of token (`400 BadRequestException`).
  2. Decodes and verifies Azure Entra ID JWT via public keys.
  3. Matches extracted `upn` / `email` against `cmma_core.platformAdmin` or tenant schema `account.ssoProviderUserId`.
  4. Issues system JWT token and returns standard user payload.

---

### 3.3 Auth Type Resolution (`POST /api/auth/check-auth-type`)
Public endpoint called prior to password reset or login modal transitions to evaluate user account state.

- **Rate Limit**: Throttled to **10 requests per 60 seconds**.
- **Request Body (`CheckAuthTypeDto`)**:
  ```json
  {
    "email": "user@example.com",
    "tenantSlug": "danis"
  }
  ```

- **Response Categories**:
  - `LOCAL`: Account configured for email/password authentication (`{ "authType": "LOCAL", "isSso": false }`).
  - `ENTRA`: Corporate SSO enforced (`{ "authType": "ENTRA", "isSso": true, "message": "..." }`).
  - `DISABLED`: Account deactivated (`{ "authType": "DISABLED", "isDisabled": true, "message": "..." }`).
  - `NO_ACCOUNT`: Unprovisioned worker record (`{ "authType": "NO_ACCOUNT", "isNoAccount": true, "message": "..." }`).
  - `NOT_FOUND`: Email unassigned (`{ "authType": "NOT_FOUND", "notFound": true, "message": "..." }`).

---

### 3.4 Tenant & SSO Config Resolution (`GET /api/auth/config`)
Public endpoint resolving active tenant branding, custom theme colors, and auth provider feature flags.

- **Query Parameter**: `slug` (or `X-Tenant-Slug` header).
- **Response Format**:
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

---

### 3.5 Session Bridge Endpoints (`POST /api/session/login` & `POST /api/session/logout`)
Next.js server route handlers managing HTTP-only session cookies.

- **`POST /api/session/login`**: Accepts `{ token, user }`, sets `cmma_session` HTTP-only, secure, SameSite=Lax cookie with 8-hour max age.
- **`POST /api/session/logout`**: Expire `cmma_session` cookie (`Max-Age=0`).

---

## 4. Business Rules, MFA & Access Control

### 4.1 Security & Rate Limiting Policy
- **Throttling Policy**: Rate limiting of 5 attempts / 60 seconds is a **confirmed business requirement** across all login, MFA send/verify, and password reset endpoints to mitigate credential stuffing and brute-force attacks.
- **Bcrypt Hashing**: All local passwords are stored with bcrypt salt factor 10.

### 4.2 Per-Tenant MFA Enforcement & Stale Fingerprints
- **Tenant Configuration**: MFA enforcement can be toggled per tenant via tenant configuration settings (`mfa_enabled`).
- **Device Fingerprint Lifecycle**:
  - Valid trusted device fingerprints (`cmma_device_fp`) stored in `mfaVerification` table bypass OTP input.
  - **Stale or Expired Fingerprints**: If a device fingerprint is unrecognized, expired (`expiresAt <= NOW()`), or unverified (`isTrusted === false`), the system **must promptly re-challenge the user with an MFA OTP verification prompt**. Account lockout occurs only after repeated consecutive OTP verification failures.

### 4.3 Domain & Context Isolation
- **Platform Admin Boundary**: Logins originating from platform domains query **only** `cmma_core.platformAdmin`. Platform admins cannot log in via tenant schema accounts.
- **Tenant Boundary**: Logins originating from tenant subdomains query **only** `cmma_<tenantSlug>`.
- **SSO Enforcement**: Corporate ENTRA SSO users cannot bypass SSO using local password login if SSO is configured and enforced for their account.

### 4.4 Session Hygiene & Route Middleware
- **Storage Sanitization**: On logout or user switching, client code must invoke `localStorage.clear()` and `sessionStorage.clear()`.
- **Next.js Middleware Guard**:
  - Unauthenticated access to protected routes (`/dashboard`, `/projects`, etc.) redirects to `/login`.
  - Authenticated access to `/login` immediately redirects to `/` (dashboard) without rendering the form.

### 4.5 Backend Offline Fault Tolerance
- If backend APIs (`/api/auth/*`) are unreachable, the UI renders an explicit "Backend Server Offline" alert banner and a "Retry Connection" action button rather than crashing or displaying unformatted error stacks.

---

## 5. Verification & Testing Matrix

| Test ID | Test Name | Target Environment | Key Validation Scenario | Expected Outcome | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-LOGIN-01** | Tenant Local Login — Happy Path | `https://danis-cmma-dev.cosdevx.com` | Local auth with pre-trusted `cmma_device_fp` | Redirects to tenant dashboard with zero MFA prompt | 🟢 PASS |
| **TC-LOGIN-02** | Platform Admin Local Login — Happy Path | `https://cmma-dev.cosdevx.com` | Platform Admin local login on platform domain | Redirects to Platform Admin console shell | 🟢 PASS |
| **TC-LOGIN-03** | Invalid Credentials Rejected | Tenant / Platform | Submit invalid password | Displays inline red error message, blocks redirect | 🟢 PASS |
| **TC-LOGIN-04** | Empty Fields Blocked Client-Side | Tenant / Platform | Click Sign In with empty email & password | Shows "Please enter both email and password", suppresses network request | 🟢 PASS |
| **TC-LOGIN-05** | Authenticated User Redirected Away | Tenant / Platform | Navigate to `/login` while logged in | Immediately redirects to `/` dashboard | 🟢 PASS |
| **TC-LOGIN-06** | Logout Clears Session | Tenant / Platform | Click Logout and attempt direct access to `/projects` | Clears `cmma_session` cookie & redirects to `/login` | 🟢 PASS |
| **TC-LOGIN-07** | Session Hygiene — No Bleed | Tenant / Platform | Re-login as same/different user after logout | Fresh user data loaded; no stale `sessionStorage.cmma_user` bleed | 🟢 PASS |
| **TC-LOGIN-08** | Backend Offline Error State | Tenant / Platform | Simulated API connection failure | Renders "Backend Server Offline" banner & retry button | 🟢 PASS |
| **TC-LOGIN-09** | Microsoft Entra SSO Login | Tenant / Platform (SSO enabled) | Real MSAL OAuth2 token authentication | Redirects to Entra IdP & logs in user | 🟡 SKIP (Manual) |
| **TC-LOGIN-10** | MFA OTP Challenge & Lockout | Tenant / Platform | Login with stale/unrecognized device fingerprint | Triggers MFA OTP prompt; locks out after max failed OTP attempts | 🟡 SKIP (Manual) |
| **TC-LOGIN-11** | Mock Mode Fallback Banner | Local / Development | Environment flag `NEXT_PUBLIC_USE_MOCK` enabled | Displays mock mode banner on login screen | 🟡 SKIP (Manual) |
