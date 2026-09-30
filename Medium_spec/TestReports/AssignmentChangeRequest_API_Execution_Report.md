# API Test Execution Report: Assignment Change Request Approval

**Feature:** `feat-assignment-change-request-approval`  
**Epic:** `epic-assignments`  
**Execution Environment:** Sandbox (`https://cmma-dev.cosdevx.com`)  
**Execution Date:** 2026-08-26  
**Execution Framework:** Pytest 9.1.1 / Python 3.14 / Requests / Pydantic  
**Gate Status:** APPROVED (Reviewed against v2.0 Test Cases)  

---

## 1. Executive Summary

A full automated execution of the API test suite for the Assignment Change Request (ACR) Approval feature was conducted. The test suite covers Contract Validation, In-App Business Rules, Token Preview & Execution, Security / RBAC, Concurrency, Pagination / Filtering, and State Machine Integrity.

### Key Metrics

| Metric | Value |
| :--- | :--- |
| **Total Test Cases in Scope** | **60** |
| **Automated Tests Executed** | **56** |
| **Passed** | **34 (60.7%)** |
| **Failed** | **22 (39.3%)** |
| **Skipped / Blocked by Spec Gap** | **4 (TC-API-B10, TC-API-B11 covered in pagination; TC-API-B17 manual; TC-API-B20 blocked by GAP-PLAN-001)** |
| **Confirmed Application Defects** | **1 (Root Cause: BUG-ACR-API-001 across 18 failing tests)** |
| **Pass Rate (of Executed)** | **60.7%** |

---

## 2. Test Execution Summary by Area

| Test Suite / Area | Total | Pass | Fail | Skipped | Pass Rate | Key Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Contract Validation (`test_acr_contract.py`)** | 8 | 3 | 5 | 0 | 37.5% | Schemas for In-App Approve/Reject/List pass; Token endpoints return 500 |
| **Pagination & Filtering (`test_acr_pagination_negative.py`)** | 6 | 6 | 0 | 0 | 100% | All query param validation and boundaries verified |
| **State Machine (`test_acr_state_machine.py`)** | 8 | 5 | 3 | 0 | 62.5% | In-App invalid transitions return 409; Token actions return 500 |
| **In-App Endpoints & RBAC (`test_in_app_acr_endpoints.py`)** | 17 | 16 | 1 | 0 | 94.1% | Core In-App approval, rejection, conflict/extension modals, RBAC pass; Tenant B unresolvable |
| **Token Preview & Execution (`test_token_preview_execute.py`)** | 14 | 2 | 12 | 0 | 14.3% | Missing/empty token returns 400; all other token calls crash with 500 |
| **Concurrency (`test_acr_concurrency.py`)** | 3 | 2 | 1 | 0 | 66.7% | Dual WFM & In-App+Token pass; Dual Token fails due to 500 |
| **Total** | **56** | **34** | **22** | **0** | **60.7%** | |

---

## 3. Failure Classification Breakdown

Every failed test case has been systematically classified according to root-cause analysis:

| Classification | Count | Associated Test Cases | Description / Root Cause |
| :--- | :---: | :--- | :--- |
| **APPLICATION DEFECT** | **18** | TC-API-C01, TC-API-C02, TC-API-C08, TC-API-B01, TC-API-B02, TC-API-B03, TC-API-B04, TC-API-B05, TC-API-B06, TC-API-S01, TC-API-S02, TC-API-S05, TC-API-S06, TC-API-S07, TC-API-SM06, TC-API-SM07, TC-API-SM08, TC-API-CC03 | **BUG-ACR-API-001:** Token service crashes with HTTP 500 (`Internal server error`) on all `/token-preview` and `/execute-token` calls. |
| **TEST DATA / CONFIGURATION ISSUE** | **2** | TC-API-C06, TC-API-C07 | Dummy JWT token fails at authentication gateway (401) before reaching payload schema validation (400). |
| **ENVIRONMENT ISSUE** | **2** | TC-API-S08, TC-API-S15 | `tenantb-cmma-dev.cosdevx.com` DNS hostname is unresolvable / schema unprovisioned. |
| **SPECIFICATION GAP** | **1** | TC-API-B20 | Rejection comment behavior for empty string `""` is unspecified (GAP-PLAN-001). |

---

## 4. Detailed Results Matrix

| TC ID | Endpoint | Method | Priority | Status | Classification | Evidence / Details |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| **TC-API-C01** | `/token-preview` | GET | P1 | ❌ FAIL | APPLICATION DEFECT | Received HTTP 500 instead of 200/400/404/410 |
| **TC-API-C02** | `/execute-token` | POST | P1 | ❌ FAIL | APPLICATION DEFECT | Received HTTP 500 instead of 200/400/409 |
| **TC-API-C03** | `/assignment-change-requests` | GET | P1 | 🟢 PASS | - | Response matches `AcrListResponse` schema |
| **TC-API-C04** | `/:id/approve` | PATCH | P1 | 🟢 PASS | - | Response matches `AcrApproveResponse` schema |
| **TC-API-C05** | `/:id/reject` | PATCH | P1 | 🟢 PASS | - | Response matches `AcrRejectResponse` schema |
| **TC-API-C06** | `/:id/approve` | PATCH | P1 | ❌ FAIL | TEST DATA ISSUE | Received 401 (dummy auth) before 400 payload validation |
| **TC-API-C07** | `/:id/approve` | PATCH | P1 | ❌ FAIL | TEST DATA ISSUE | Received 401 (dummy auth) before 400 payload validation |
| **TC-API-C08** | `/execute-token` | POST | P1 | ❌ FAIL | APPLICATION DEFECT | Received HTTP 500 on string `overrideConflict` |
| **TC-API-B01** | `/token-preview` | GET | P1 | ❌ FAIL | APPLICATION DEFECT | Received HTTP 500 on valid token |
| **TC-API-B02** | `/token-preview` | GET | P1 | ❌ FAIL | APPLICATION DEFECT | Received HTTP 500 on expired token |
| **TC-API-B03** | `/execute-token` | POST | P0 | ❌ FAIL | APPLICATION DEFECT | Received HTTP 500 on valid ACCEPT execution |
| **TC-API-B04** | `/execute-token` | POST | P1 | ❌ FAIL | APPLICATION DEFECT | Received HTTP 500 on valid DENY execution |
| **TC-API-B05** | `/execute-token` | POST | P1 | ❌ FAIL | APPLICATION DEFECT | Received HTTP 500 on conflict override execution |
| **TC-API-B06** | `/execute-token` | POST | P1 | ❌ FAIL | APPLICATION DEFECT | Received HTTP 500 on execution without required override |
| **TC-API-B07** | `/assignment-change-requests` | GET | P1 | 🟢 PASS | - | HTTP 200 with paginated pending list |
| **TC-API-B08** | `/assignment-change-requests` | GET | P2 | 🟢 PASS | - | Filter by status=APPROVED verified |
| **TC-API-B09** | `/assignment-change-requests` | GET | P2 | 🟢 PASS | - | Filter by projectId verified |
| **TC-API-B12** | `/:id/approve` | PATCH | P1 | 🟢 PASS | - | In-app clean approval succeeds with 200 |
| **TC-API-B13** | `/:id/approve` | PATCH | P1 | 🟢 PASS | - | In-app conflict override succeeds with 200 |
| **TC-API-B14** | `/:id/approve` | PATCH | P1 | 🟢 PASS | - | In-app project extension succeeds with 200 |
| **TC-API-B15** | `/:id/approve` | PATCH | P1 | 🟢 PASS | - | Historic lockout admin approval succeeds with 200 |
| **TC-API-B16** | `/:id/approve` | PATCH | P1 | 🟢 PASS | - | Pursuit project approval blocked (400) |
| **TC-API-B18** | `/:id/reject` | PATCH | P1 | 🟢 PASS | - | Rejection with comments succeeds with 200 |
| **TC-API-B19** | `/:id/reject` | PATCH | P1 | 🟢 PASS | - | Rejection with null comments succeeds with 200 |
| **TC-API-S01** | `/token-preview` | GET | P0 | ❌ FAIL | APPLICATION DEFECT | Tampered token returned 500 instead of 400/404 |
| **TC-API-S02** | `/execute-token` | POST | P0 | ❌ FAIL | APPLICATION DEFECT | Already used token returned 500 instead of 409 |
| **TC-API-S03** | `/execute-token` | POST | P0 | 🟢 PASS | - | Missing token body returned HTTP 400 |
| **TC-API-S04** | `/execute-token` | POST | P0 | 🟢 PASS | - | Empty token body returned HTTP 400 |
| **TC-API-S05** | `/execute-token` | POST | P0 | ❌ FAIL | APPLICATION DEFECT | Long token returned 500 instead of 400 |
| **TC-API-S06** | `/execute-token` | POST | P0 | ❌ FAIL | APPLICATION DEFECT | Malformed token returned 500 instead of 400 |
| **TC-API-S07** | `/execute-token` | POST | P0 | ❌ FAIL | APPLICATION DEFECT | Deleted request token returned 500 instead of 404 |
| **TC-API-S08** | `/execute-token` | POST | P0 | ❌ FAIL | ENVIRONMENT ISSUE | DNS failure resolving `tenantb-cmma-dev.cosdevx.com` |
| **TC-API-S09** | `/:id/approve` | PATCH | P0 | 🟢 PASS | - | PM JWT returns HTTP 403 Forbidden |
| **TC-API-S10** | `/:id/reject` | PATCH | P0 | 🟢 PASS | - | PM JWT returns HTTP 403 Forbidden |
| **TC-API-S11** | `/:id/approve` | PATCH | P0 | 🟢 PASS | - | WFM historic lockout override returns 403 |
| **TC-API-S12** | `/:id/approve` | PATCH | P0 | 🟢 PASS | - | Missing JWT returns HTTP 401 Unauthorized |
| **TC-API-S13** | `/assignment-change-requests` | GET | P0 | 🟢 PASS | - | PM JWT listing WFM requests returns 403 |
| **TC-API-S14** | `/assignment-change-requests` | GET | P0 | 🟢 PASS | - | Missing JWT listing requests returns 401 |
| **TC-API-S15** | `/:id/approve` | PATCH | P0 | ❌ FAIL | ENVIRONMENT ISSUE | DNS failure on Tenant B domain |
| **TC-API-SM01** | `/:id/approve` | PATCH | P0 | 🟢 PASS | - | Already APPROVED request returns 409 |
| **TC-API-SM02** | `/:id/reject` | PATCH | P0 | 🟢 PASS | - | Already APPROVED request returns 409 |
| **TC-API-SM03** | `/:id/approve` | PATCH | P0 | 🟢 PASS | - | Already REJECTED request returns 409 |
| **TC-API-SM04** | `/:id/reject` | PATCH | P0 | 🟢 PASS | - | Already REJECTED request returns 409 |
| **TC-API-SM05** | `/:id/approve` | PATCH | P1 | 🟢 PASS | - | CANCELLED request returns 409 |
| **TC-API-SM06** | `/execute-token` | POST | P0 | ❌ FAIL | APPLICATION DEFECT | Token action on APPROVED returned 500 instead of 409 |
| **TC-API-SM07** | `/execute-token` | POST | P0 | ❌ FAIL | APPLICATION DEFECT | Token action on REJECTED returned 500 instead of 409 |
| **TC-API-SM08** | `/execute-token` | POST | P0 | ❌ FAIL | APPLICATION DEFECT | Token action on CANCELLED returned 500 instead of 409/410 |
| **TC-API-CC01** | `/:id/approve` | PATCH | P0 | 🟢 PASS | - | Dual WFM: 1st returns 200, 2nd returns 409 |
| **TC-API-CC02** | `/:id/approve` + Token | PATCH/POST | P0 | 🟢 PASS | - | In-App vs Token concurrency race handled |
| **TC-API-CC03** | `/execute-token` | POST | P0 | ❌ FAIL | APPLICATION DEFECT | Token concurrency failed due to 500 |
| **TC-API-P01** | `/assignment-change-requests` | GET | P2 | 🟢 PASS | - | Invalid status param returns 400 |
| **TC-API-P02** | `/assignment-change-requests` | GET | P2 | 🟢 PASS | - | Negative limit returns 400 |
| **TC-API-P03** | `/assignment-change-requests` | GET | P2 | 🟢 PASS | - | String limit returns 400 |
| **TC-API-P04** | `/assignment-change-requests` | GET | P2 | 🟢 PASS | - | Negative offset returns 400 |
| **TC-API-P05** | `/assignment-change-requests` | GET | P2 | 🟢 PASS | - | Invalid UUID projectId returns 400 |
| **TC-API-P06** | `/assignment-change-requests` | GET | P2 | 🟢 PASS | - | Offset beyond total returns 200 `items: []` |

---

## 5. Defects Created

| Defect ID | Severity | Title | Affected TCs |
| :--- | :---: | :--- | :--- |
| `BUG-ACR-API-001` | **Critical (P0)** | Backend Token Service returns unhandled HTTP 500 on all `/token-preview` and `/execute-token` requests | TC-API-C01, TC-API-C02, TC-API-C08, TC-API-B01..B06, TC-API-S01..S02, TC-API-S05..S07, TC-API-SM06..SM08, TC-API-CC03 |

Detailed defect description logged in [AssignmentChangeRequest_API_Defects.md](file:///c:/Users/costrategix/SpecKit_Learning/qa/defects/AssignmentChangeRequest_API_Defects.md).
