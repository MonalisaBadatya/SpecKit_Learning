# Regression Test Cases: Effective Date Reassign and Unassign

**Feature:** `feat-effective-date-reassign-unassign`  
**Layer:** Regression  
**Source Test Plan:** `complex-spec/qa/test-plan/EffectiveDate_Reassign_Unassign_TestPlan.md`  
**Framework:** Playwright & pytest + httpx  

---

| TC ID | Scenario ID | Requirement | Primary Pack | Layer | Type | Title | Preconditions | Test Data | Steps | Expected Result | Priority | Risk | Traceability |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-EDRU-004** | `SCN-EDRU-004` | `REQ-EDRU-002` | Smoke | UI | Positive / Regression | Bypass Effective Date flow for future assignment (`startDate >= today`) | Future assignment exists (`startDate >= today`); user logged in as Workforce Manager. | Future assignment UUID | 1. Open future assignment in Details Drawer or list.<br>2. Click Unassign (or Reassign).<br>3. Confirm prompt. | System executes standard full unassign/reassign immediately without displaying Effective Date picker modal. | High | Medium | `REQ-EDRU-002`, `BR-EDRU-001` |
| **TC-EDRU-021** | `SCN-EDRU-021` | `REQ-EDRU-011` | Risk-Based | API | Regression / Edge | Sequential splits on same assignment record | In-progress assignment already split once. | Fresh version fetched via `GET /assignment/:id`, second `splitDate < firstSplitDate` | 1. Split assignment at date D1.<br>2. Perform `GET` to obtain incremented version `V+1`.<br>3. Submit second split at date D2.<br>4. Verify outcomes. | Second split successfully updates assignment `endDate` to `D2 - 1` and increments version to `V+2`. | Medium | High | `REQ-EDRU-011`, `BR-EDRU-006`, `GAP-EDRU-004`, `RSK-EDRU-002` |
| **TC-EDRU-027** | `SCN-EDRU-027` | `REQ-EDRU-001` | Risk-Based | UI | Regression | Gantt timeline UI synchronization post-split | UI session displaying Gantt timeline; assignment split executed. | Post-split Gantt view | 1. Execute split via UI.<br>2. Inspect Gantt timeline visualization.<br>3. Refresh page if required. | Gantt timeline correctly reflects shortened original segment and future open slot/new assignment without timeline corruption. | Medium | High | `UI-EDRU-001`, `RSK-EDRU-004` |
