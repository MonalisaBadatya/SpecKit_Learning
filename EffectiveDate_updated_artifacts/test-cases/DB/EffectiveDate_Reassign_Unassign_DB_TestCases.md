# DB Test Cases: Effective Date Reassign and Unassign

**Feature:** `feat-effective-date-reassign-unassign`  
**Layer:** Database & Data Integrity  
**Source Test Plan:** `complex-spec/qa/test-plan/EffectiveDate_Reassign_Unassign_TestPlan.md`  
**Framework:** pytest + direct DB fixture / backend test harness  

---

| TC ID | Scenario ID | Requirement | Primary Pack | Layer | Type | Title | Preconditions | Test Data | Steps | Expected Result | Priority | Risk | Traceability |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-EDRU-018** | `SCN-EDRU-018` | `REQ-EDRU-012` | Standard | DB | Positive / Security | Audit log record generation upon successful split (`SPLIT_ASSIGNMENT`) | Successful Unassign or Reassign split executed. | Resulting audit log record | 1. Query database `auditLog` entity for assignment ID post-split. | Audit entry exists with `action: SPLIT_ASSIGNMENT`, matching `actor`, `effectiveDate`, and JSON `segmentBoundaries`. | High | Medium | `REQ-EDRU-012` |
| **TC-EDRU-019** | `SCN-EDRU-019` | `REQ-EDRU-006` | Critical | DB | Integrity / Negative | Transaction atomicity during split mutation failure | In-progress assignment; mock failure injected during future segment creation. | Injected DB exception on second write step | 1. Trigger split mutation.<br>2. Force failure during `laborRequest` creation.<br>3. Inspect DB. | Entire transaction rolls back; original assignment remains at original `endDate` with unincremented `version`; zero orphan records. | Critical | Critical | `BR-EDRU-005`, `RSK-EDRU-003` |
