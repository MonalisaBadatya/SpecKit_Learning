# Technical Specification: Local User Password Reset & Auth Type Detection

**Epic:** epic-auth  
**Feature:** feat-forgot-password  
**Version:** 1.0 — Approved  
**Author:** Antigravity AI & Senior Full-Stack Engineering Team  
**Status:** 🟢 Approved & Implemented  

---

## 1. Rationale & Overview

### 1.1 Job to be Done
Users with **Local Authentication** credentials (both Platform Administrators in `cmma_core.platformAdmin` and Tenant Users in `cmma_<tenantSlug>.account`) need a secure, self-service mechanism to reset forgotten passwords. 

Simultaneously, the system must enforce strict domain isolation and context awareness:
1. **Corporate SSO Users (`ENTRA`)**: Password management is delegated to corporate Identity Providers. For security and clarity, reset link emails must **not** be sent; instead, an informative corporate guidance message is presented.
2. **Disabled Accounts (`DISABLED`)**: Accounts or resources with inactive status must **not** receive reset links; an explicit administrative assistance alert is shown.
3. **Unprovisioned Resources (`NO_ACCOUNT`)**: Workers existing only in the tenant `resource` directory without a provisioned `account` record or application role assignment must **not** receive reset emails; an explicit admin contact notice is shown.
4. **Domain & Context Isolation**: Platform Admin screens must query **only** `cmma_core.platformAdmin`. Tenant screens must query **only** `cmma_<tenantSlug>`. Cross-context lookups are disallowed to prevent security leaks.
5. **Platform Admin Tenant Admin Restrictions**: Platform Admins are restricted from adding, editing, or deleting tenant users or resending invitations within Tenant Admin (`403 ForbiddenException`).

---

## 2. Technical Architecture & Data Contract

### 2.1 Database Migration Schema
Migration File: [1735000000000-add-password-reset-columns.ts](file:///d:/projects/cmma-app/backend/src/database/migrations/1735000000000-add-password-reset-columns.ts)

Added columns to `cmma_core.platformAdmin` and tenant `account` tables across all database schemas (`cmma_danis`, `cmma_falcon`, `cmma_virgo`, etc.):

```sql
-- Core Schema: Platform Admin
ALTER TABLE "cmma_core"."platformAdmin"
  ADD COLUMN IF NOT EXISTS "passwordResetToken" VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS "passwordResetExpiresAt" TIMESTAMP NULL;

-- Tenant Schemas: Account Table
ALTER TABLE "cmma_<tenantSlug>"."account"
  ADD COLUMN IF NOT EXISTS "passwordResetToken" VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS "passwordResetExpiresAt" TIMESTAMP NULL;
```

### 2.2 TypeORM Entities
- **Account Entity**: [account.entity.ts](file:///d:/projects/cmma-app/backend/src/entities/account.entity.ts)
  - `passwordResetToken: string | null`
  - `passwordResetExpiresAt: Date | null`
- **PlatformAdmin Entity**: [platform-admin.entity.ts](file:///d:/projects/cmma-app/backend/src/entities/platform-admin.entity.ts)
  - `passwordResetToken: string | null`
  - `passwordResetExpiresAt: Date | null`

---

## 3. API Endpoints Specification

### 3.1 Check Auth Type (`POST /api/auth/check-auth-type`)
Public endpoint used by the login screen's Forgot Password modal to evaluate user state before attempting email dispatch.

- **Request Body (`CheckAuthTypeDto`)**:
  ```json
  {
    "email": "user@example.com",
    "tenantSlug": "danis"
  }
  ```

- **Domain Isolation Logic**:
  - **Platform Context** (`tenantSlug` is null, `'admin'`, `'platform'`, or `'cmma-dev'`): Queries **only** `cmma_core.platformAdmin`.
  - **Tenant Context** (`tenantSlug` is `'danis'`, etc.): Queries **only** tenant schema `cmma_<tenantSlug>`.

- **Response Formats**:
  - **Local Password User**:
    ```json
    { "authType": "LOCAL", "isSso": false }
    ```
  - **Corporate SSO User (`ENTRA`)**:
    ```json
    {
      "authType": "ENTRA",
      "isSso": true,
      "message": "It appears your password is managed by your corporate authentication system. Please contact your corporate security administrator for assistance."
    }
    ```
  - **Disabled Account (`DISABLED`)**:
    ```json
    {
      "authType": "DISABLED",
      "isDisabled": true,
      "message": "Your account is disabled. Please contact your system administrator for assistance."
    }
    ```
  - **Unprovisioned Resource (`NO_ACCOUNT`)**:
    ```json
    {
      "authType": "NO_ACCOUNT",
      "isNoAccount": true,
      "message": "An account has not been setup for your email address. Please contact your system administrator."
    }
    ```
  - **Account Not Found (`NOT_FOUND`)**:
    ```json
    {
      "authType": "NOT_FOUND",
      "notFound": true,
      "message": "No account found with that email address. Please check your email and try again."
    }
    ```

---

### 3.2 Request Password Reset (`POST /api/auth/request-password-reset`)
Public endpoint that generates a 32-byte secure token (1-hour expiry) and dispatches HTML & text reset emails via `IEmailProvider`.

- **Request Body (`RequestPasswordResetDto`)**:
  ```json
  {
    "email": "user@example.com",
    "tenantSlug": "danis"
  }
  ```

- **Execution Steps**:
  1. Identifies context via `tenantSlug`.
  2. Validates user existence, active status, and application role assignments.
  3. Returns appropriate status notice without sending email if account is SSO, disabled, unprovisioned, or not found.
  4. For valid local users:
     - Generates crypto token: `crypto.randomBytes(32).toString('hex')`.
     - Expiry: `Date.now() + 3600000` (1 hour).
     - Saves token & expiration to database record.
     - Renders reset email template (`renderPasswordResetEmail`) containing reset URL:
       - Platform Admin: `${baseUrl}/reset-password?token=${token}`
       - Tenant User: `${baseUrl}/reset-password?token=${token}&tenant=${tenantSlug}`
     - Dispatches email asynchronously via `IEmailProvider.sendEmail`.
     - Returns success response:
       ```json
       {
         "isSso": false,
         "success": true,
         "message": "A password reset link has been sent to your email address. Please check your inbox to reset your password."
       }
       ```

---

### 3.3 Reset Password (`POST /api/auth/reset-password`)
Public endpoint to set a new password using a valid reset token.

- **Request Body (`ResetPasswordDto`)**:
  ```json
  {
    "token": "32bytehex...",
    "newPassword": "SecurePassword123!",
    "tenantSlug": "danis"
  }
  ```

- **Execution Steps**:
  1. Validates token against tenant `account` or `cmma_core.platformAdmin`.
  2. Verifies `passwordResetExpiresAt >= NOW()`.
  3. Hashes new password using bcrypt (10 rounds).
  4. Clears `passwordResetToken` and `passwordResetExpiresAt`.
  5. Returns success response:
     ```json
     {
       "success": true,
       "message": "Password reset successfully. You can now log in with your new password."
     }
     ```

---

## 4. Platform Admin Access Control Rules

### 4.1 Tenant Admin Management Restrictions
Platform Administrators (`PLATFORM_ADMIN` / `Platform Admin`) are strictly restricted from adding or modifying users in Tenant Admin workspaces.

- **Backend Route Protection**:
  - `POST /api/users` (Create User): Throws `403 ForbiddenException` for Platform Admins.
  - `PATCH /api/users/:id` (Update User): Throws `403 ForbiddenException` for Platform Admins.
  - `DELETE /api/users/:id` (Delete User): Throws `403 ForbiddenException` for Platform Admins.
  - `POST /api/auth/invite/resend` (Resend Invite): Restricted strictly to Tenant System Administrators (`role === 'System Admin'` and not Platform Admin). Throws `403 ForbiddenException` for Platform Admins.

- **Frontend UI Behavior**:
  - `UsersRolesTab.tsx`: Disables `+ Add User` toolbar button and action icons for Platform Admins.
  - Renders explicit alert banner:
    > **Platform Admin Access**: Platform Administrators are not allowed to add, update, or suspend users in Tenant Admin. Only Tenant System Administrators can manage tenant users.
  - `UserFormModal.tsx`: Disables form submit button for non-tenant admins (`isSubmitDisabled`).

---

## 5. Verification & Testing Matrix

| Test Suite / Component | Scenario | Expected Outcome | Result |
| :--- | :--- | :--- | :--- |
| **Backend Unit Tests** | Local user password reset request | Generates token & dispatches email | 🟢 PASS (666/666) |
| **Backend Unit Tests** | Corporate SSO user reset request | Suppresses email & returns SSO notice | 🟢 PASS |
| **Backend Unit Tests** | Disabled user reset request | Suppresses email & returns disabled alert | 🟢 PASS |
| **Backend Unit Tests** | Unprovisioned resource reset request | Suppresses email & returns no-account notice | 🟢 PASS |
| **Backend Unit Tests** | Non-existent email lookup | Suppresses email & returns not-found notice | 🟢 PASS |
| **Backend Unit Tests** | Platform Admin tenant user mutation | Throws 403 ForbiddenException | 🟢 PASS |
| **NestJS Build** | Backend compilation | Clean build with 0 errors | 🟢 PASS |
| **Next.js Production Build** | Frontend compilation & static export | Clean build with 0 errors | 🟢 PASS |
