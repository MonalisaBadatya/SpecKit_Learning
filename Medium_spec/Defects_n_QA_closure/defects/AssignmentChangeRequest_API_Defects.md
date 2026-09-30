# Defect Report: Assignment Change Request API

**Feature:** `feat-assignment-change-request-approval`  
**Layer:** API Automation & Backend Services  
**Environment:** Sandbox (`https://cmma-dev.cosdevx.com`)  
**Date:** 2026-08-26  

---

## Defect Inventory

| Defect ID | Title | Severity | Priority | Status | Component |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **BUG-ACR-API-001** | Backend Token Service unhandled 500 crash on `/token-preview` and `/execute-token` | Critical | P0 | Open | Backend / Token Execution Service |

---

## Detailed Defect Specification

### BUG-ACR-API-001: Backend Token Service Unhandled HTTP 500 Crash

| Field | Value |
| :--- | :--- |
| **Defect ID** | `BUG-ACR-API-001` |
| **Title** | Backend Token Service returns unhandled HTTP 500 on all `/token-preview` and `/execute-token` requests |
| **Severity** | **Critical** (P0 - Prevents core feature workflow: email action token approval & preview) |
| **Priority** | **P0 (Blocker)** |
| **Requirement ID** | `REQ-ACR-002`, `REQ-ACR-012`, `REQ-ACR-013`, `REQ-ACR-014`, `REQ-ACR-015` |
| **Test Case ID** | `TC-API-C01`, `TC-API-C02`, `TC-API-C08`, `TC-API-B01`, `TC-API-B02`, `TC-API-B03`, `TC-API-B04`, `TC-API-B05`, `TC-API-B06`, `TC-API-S01`, `TC-API-S02`, `TC-API-S05`, `TC-API-S06`, `TC-API-S07`, `TC-API-SM06`, `TC-API-SM07`, `TC-API-SM08`, `TC-API-CC03` |
| **Environment** | Sandbox (`https://cmma-dev.cosdevx.com`) |
| **Preconditions** | API Gateway and base services running. Test change requests exist. |
| **Steps to Reproduce** | 1. Send `GET /api/workforce/assignment-change-requests/token-preview?token=a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90`<br>2. Alternatively send `POST /api/workforce/assignment-change-requests/execute-token` with payload `{"token": "a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90"}` |
| **Test Data** | Token: `a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90` (ACR ID: `292fd69b-0e80-4f27-90e6-db10d9217089`) |
| **Expected Result** | **GET /token-preview:** Returns `200 OK` with JSON preview schema (`valid`, `changeRequestId`, `action`, `projectName`, `workerName`, etc.) or `410 Gone` if expired, `400/404` if invalid.<br>**POST /execute-token:** Returns `200 OK` with `status: "APPROVED"` / `"REJECTED"` and updates DB, or `409 Conflict` if already used/resolved. |
| **Actual Result** | Returns `HTTP 500 Internal Server Error` with body `{"statusCode":500,"message":"Internal server error"}` on any valid, tampered, expired, or used token string. |
| **Reproducibility** | **100% (Deterministic)** |
| **Root Cause / Suspected Area** | Root cause unknown in backend service layer. Suspected unhandled exception in token lookup/hashing service or missing database table/connection for `assignmentChangeRequestToken` in the API handler. |
| **Evidence** | `curl -X GET 'https://cmma-dev.cosdevx.com/api/workforce/assignment-change-requests/token-preview?token=a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90'`<br>Response: `500 {"statusCode":500,"message":"Internal server error"}` |
| **Impact** | Complete breakage of asynchronous email-based approval and rejection links. Approvers clicking email links receive error screens and cannot view request details or execute one-click approvals. |
| **Suggested Component** | Backend `AcrTokenService` / `TokenPreviewController` / Database connection pool for token lookup |
| **Traceability** | `REQ-ACR-002`, `REQ-ACR-012..015`, `BR-ACR-007` |

---

## 2. Specification & Environment Issues (Non-Defects)

1. **ENV-001 (Tenant B Domain Not Provisioned):**
   - Host `tenantb-cmma-dev.cosdevx.com` could not be resolved by DNS (`[Errno 11001] getaddrinfo failed`).
   - Impacts TC-API-S08, TC-API-S15.
   - Classification: `ENVIRONMENT ISSUE`.

2. **GAP-PLAN-001 (Empty String Rejection Comment):**
   - Behavior for `reviewerComments: ""` is unspecified in spec. Tracked under specification gaps.
