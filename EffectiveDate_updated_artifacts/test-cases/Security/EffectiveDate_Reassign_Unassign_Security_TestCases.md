# Security Test Cases: Effective Date Reassign and Unassign

**Feature:** `feat-effective-date-reassign-unassign`  
**Layer:** Security / RBAC  
**Source Test Plan:** `complex-spec/qa/test-plan/EffectiveDate_Reassign_Unassign_TestPlan.md`  
**Framework:** pytest + httpx  

---

| TC ID | Scenario ID | Requirement | Primary Pack | Layer | Type | Title | Preconditions | Test Data | Steps | Expected Result | Priority | Risk | Traceability |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-EDRU-012** | `SCN-EDRU-012` | `REQ-EDRU-010` | Critical | Security | Security / Negative | Non-Admin user attempts split with `splitDate < today - 7 days` | In-progress assignment; user authenticated as standard Workforce Manager. | `splitDate < today - 7 days` | 1. Standard user sends `POST .../split` with `splitDate < today - 7 days`. | Request rejected with historic lockout authorization error; split is blocked. | High | Medium | `REQ-EDRU-010`, `BR-EDRU-008`, `VAL-EDRU-002` |
| **TC-EDRU-013** | `SCN-EDRU-013` | `REQ-EDRU-010` | Critical | Security | Security / Positive | System Admin executes historic lockout override split | In-progress assignment; user authenticated as System Administrator. | `splitDate < today - 7 days`, `overrideHistoricLockout: true` | 1. Admin sends `POST .../split` with `splitDate < today - 7 days` and `overrideHistoricLockout: true`. | Request succeeds; original record shortened to `splitDate - 1 day` and future segment created. | High | Low | `REQ-EDRU-010`, `BR-EDRU-008`, `VAL-EDRU-002` |
