# QA Test Data Specification: Assignment Change Request Approval

**Feature:** `feat-assignment-change-request-approval`
**Epic:** `epic-assignments`
**JSON Companion:** `test-data/AssignmentChangeRequest_TestData.json`
**Source of Truth:** `test-plan/AssignmentChangeRequest_TestPlan.md` v2.0
**Document Version:** 2.0

---

## 1. Overview

Deterministic, production-safe test data for all UI, API, DB, and Regression test cases.

New in v2.0:
- Tenant B dataset (cross-tenant isolation tests)
- WFM User 2 (concurrency testing)
- Boundary token (exactly 7-day expiry)
- Resolved (APPROVED, REJECTED) and CANCELLED ACR profiles (state machine tests)
- Negative API payload definitions
- Concurrent actor profiles

---

## 2. Test Accounts & User Roles

| Account ID | Name | Role | Email | Used In |
| :--- | :--- | :--- | :--- | :--- |
| `a1111111-1111-4111-8111-111111111111` | Sarah Jenkins | WORKFORCE_MANAGER | wfm.danis@cmma.io | All WFM flows; primary approver |
| `a2222222-2222-4222-8222-222222222222` | Mike Torres | WORKFORCE_MANAGER | wfm2.danis@cmma.io | Concurrency tests: second approver |
| `0b3ac79f-8f27-46bc-bee9-8d3d89f2535b` | Ahmed Personal | PROJECT_MANAGER | ahmed.personal@danis.com | Requester PM; self-withdrawal |
| `c3333333-3333-4333-8333-333333333333` | Bob Miller | PROJECT_MANAGER | other.pm@danis.com | Non-owner PM; 403 withdrawal tests |
| `d4444444-4444-4444-8444-444444444444` | System Administrator | SYSTEM_ADMIN | admin@cmma.io | Historic lockout override; admin withdrawal |
| `e5555555-5555-4555-8555-555555555555` | Tenant B WFM | WORKFORCE_MANAGER | wfm.tenantb@cmma.io | Multi-tenancy isolation (Tenant B context) |

---

## 3. Projects

### 3.1 Tenant A (`cmma_danis`)

| Project ID | Name | Status | End Date | Used In |
| :--- | :--- | :--- | :--- | :--- |
| `0a767cda-8f27-46bc-bee9-8d3d89f2535b` | Meals on Wheels | ACTIVE | 2026-10-01 | All core flows |
| `1b878deb-9f38-47cd-cff0-9e4e90f3646c` | Margaret Mary Health | ACTIVE | 2026-08-30 | Source of overlapping assignment |
| `2c989efc-0a49-48de-d001-0f5f0104757d` | Downtown Transit Hub | PURSUIT | 2026-12-31 | Pursuit project block test |
| `3da90fad-1b50-49ef-e112-1a6a1215868e` | Eastside Logistics Park | DRAFT | 2026-12-31 | Draft project block test |

### 3.2 Tenant B (`cmma_tenantb`)

| Project ID | Name | Status | End Date | Used In |
| :--- | :--- | :--- | :--- | :--- |
| `b1111111-bbbb-4bbb-8bbb-111111111111` | Harbor Freight Depot | ACTIVE | 2026-09-01 | Cross-tenant isolation tests |

---

## 4. Workers / Resources

| Worker ID | Name | Status | Trade | Used In |
| :--- | :--- | :--- | :--- | :--- |
| `2aafa7ca-5e71-4a38-9e20-5c3b12345678` | Cody Kessler | ACTIVE | Concrete | Primary proposed worker (8.0 hrs/day) |
| `4bbba8db-6f82-4b49-af31-6d4c23456789` | John Doe | ARCHIVED | Electrical | Archived worker block test |

---

## 5. Change Request Profiles

| Profile | ACR ID | Project | Status | Proposed Dates | Conflict | Extension | Lockout | Purpose |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| Clean Pending | `292fd69b-0e80-4f27-90e6-db10d9217089` | Meals on Wheels | PENDING | 2026-02-10 to 2026-10-01 | No | No | No | Core approval, token execution, concurrency |
| Conflict Overlap | `383ae78c-1f91-4c38-81e7-ec21e0328190` | Meals on Wheels | PENDING | 2026-02-10 to 2026-02-27 | Yes | No | No | Conflict override modal |
| Project Extension | `494bf89d-20a2-4d49-92f8-fd32f1439201` | Meals on Wheels | PENDING | 2026-02-10 to 2026-11-15 | No | Yes | No | Extension modal; project date update |
| Historic Lockout | `5a5ca90e-31b3-4e5a-a309-0e4302540312` | Meals on Wheels | PENDING | 2026-01-10 to 2026-10-01 | No | No | Yes | WFM block; Admin override |
| Pursuit Guard | `6b6db01f-42c4-4f6b-b41a-1f5413651423` | Downtown Transit Hub | PENDING | 2026-03-15 to 2026-12-31 | No | No | No | Pursuit project block |
| Already Approved | `7c7ec12f-53d5-4f7c-c253-2f6624762534` | Meals on Wheels | APPROVED | 2026-02-10 to 2026-10-01 | No | No | No | Invalid state transition tests (409) |
| Already Rejected | `8d8fd230-64e6-508d-d364-3a7735873645` | Meals on Wheels | REJECTED | 2026-02-10 to 2026-10-01 | No | No | No | Invalid state transition tests (409) |
| Already Cancelled | `9e9ae341-75f7-619e-e475-4b8846984756` | Meals on Wheels | CANCELLED | 2026-02-10 to 2026-10-01 | No | No | No | Invalid state transition tests (409) |
| Tenant B Pending | `b2b2b2b2-bbbb-4bbb-8bbb-222222222222` | Harbor Freight Depot | PENDING | 2026-03-01 to 2026-09-01 | No | No | No | Cross-tenant isolation |

---

## 6. HMAC-SHA256 Action Tokens

| Type | Token Hash (Abbreviated) | Action | ACR ID | Expiration | Used In |
| :--- | :--- | :---: | :--- | :--- | :--- |
| Valid Unused - ACCEPT | `a1b2c3d4...8f90` | ACCEPT | `292fd69b-...` | 2026-09-01 (future) | Token preview, execute, concurrency tests |
| Valid Unused - DENY | `d4e5f6a7...1b2c` | DENY | `292fd69b-...` | 2026-09-01 (future) | DENY token execution |
| Valid Unused - VIEW | `e5f6a7b8...2c3d` | VIEW | `292fd69b-...` | 2026-09-01 (future) | VIEW token (no action) |
| Expired (>7 days) | `b2c3d4e5...90a1` | ACCEPT | `292fd69b-...` | 2026-08-10 (past) | 410 Gone; toast redirect test |
| Boundary (exactly 7 days) | `f7a8b9c0...3d4e` | ACCEPT | `292fd69b-...` | NOW() - 7 days | Boundary: document valid or expired |
| Already Used | `c3d4e5f6...0a1b` | ACCEPT | `292fd69b-...` | 2026-09-01 (future) | usedAt set; 409 on re-execute |
| Tampered | `ffffffff...0000` | ACCEPT | N/A | N/A | 400/404 security test |
| Tenant B Token | `b0b1b2b3...f4f5` | ACCEPT | `b2b2b2b2-...` | 2026-09-01 (future) | Cross-tenant isolation (used from Tenant A context) |
| Deleted Request Token | `d0d1d2d3...e4e5` | ACCEPT | (deleted) | 2026-09-01 (future) | 404 after CASCADE deletion |

---

## 7. Multi-Tenancy Test Datasets

| Tenant | Schema | ACR ID | Token | JWT User |
| :--- | :--- | :--- | :--- | :--- |
| Tenant A | cmma_danis | `292fd69b-...` | `a1b2c3d4-...` | Sarah Jenkins (WFM) |
| Tenant B | cmma_tenantb | `b2b2b2b2-...` | `b0b1b2b3-...` | Tenant B WFM (`e5555555-...`) |

**Cross-Tenant Test Sequence:**
1. Authenticate as Tenant B WFM.
2. POST /execute-token with Tenant A's token `a1b2c3d4...` -> Expected: 404/403.
3. PATCH .../292fd69b.../approve with Tenant B JWT -> Expected: 404.
4. GET /assignment-change-requests with Tenant B JWT -> Expected: only Tenant B records.
5. SQL: query cmma_danis for Tenant B's changeRequestId -> Expected: 0 rows.

---

## 8. Concurrent Actor Profiles

| Actor | Account ID | JWT Ref | Role in Concurrency Test |
| :--- | :--- | :--- | :--- |
| WFM User 1 (Sarah) | `a1111111-...` | WFM1_JWT | First concurrent approver; expected winner (200 OK) |
| WFM User 2 (Mike) | `a2222222-...` | WFM2_JWT | Second concurrent approver; expected loser (409) |
| Email ACCEPT token | Token: `a1b2c3d4-...` | N/A | Used in Scenario 2 (UI + email simultaneous) |

---

## 9. Negative API Test Payloads

| TC ID | Endpoint | Payload | Expected HTTP |
| :--- | :--- | :--- | :--- |
| TC-API-C06 | PATCH /approve | `{ "overrideConflict": "YES" }` | 400 |
| TC-API-C07 | PATCH /approve | `{ "overrideHistoricLockout": 1 }` | 400 |
| TC-API-C08 | POST /execute-token | `{ "token": "abc", "overrideConflict": "true" }` | 400 |
| TC-API-S03 | POST /execute-token | `{}` (missing token) | 400 |
| TC-API-S04 | POST /execute-token | `{ "token": "" }` | 400 |
| TC-API-S05 | POST /execute-token | `{ "token": "a"*1001 }` | 400 |
| TC-API-S06 | POST /execute-token | `{ "token": "not-hex-xyz" }` | 400 |
| TC-API-P01 | GET /assignment-change-requests | `?status=INVALID_STATUS` | 400 |
| TC-API-P02 | GET /assignment-change-requests | `?limit=-1` | 400 |
| TC-API-P03 | GET /assignment-change-requests | `?limit=abc` | 400 |
| TC-API-P04 | GET /assignment-change-requests | `?offset=-5` | 400 |
| TC-API-P05 | GET /assignment-change-requests | `?projectId=not-a-uuid` | 400 |
| TC-API-P06 | GET /assignment-change-requests | `?offset=99999` (beyond total) | 200 items:[] |

---

## 10. Boundary & Edge Conditions

| Condition | Data Value | Purpose |
| :--- | :--- | :--- |
| Token at exactly 7-day boundary | createdDateTime = NOW() - 7 days | Clarify: valid or expired |
| Historic lockout boundary | Proposed startDate = TODAY - 7 days | Boundary: should this trigger lockout? |
| Reject with null comment | reviewerComments: null | GAP-PLAN-001: document behavior |
| Reject with empty string | reviewerComments: "" | GAP-PLAN-001: document behavior |
| Large offset | offset=99999 (no matching records) | Expect empty items[], correct total |
| Max limit | limit=1000 (if server-imposed cap) | Document whether cap is enforced |
