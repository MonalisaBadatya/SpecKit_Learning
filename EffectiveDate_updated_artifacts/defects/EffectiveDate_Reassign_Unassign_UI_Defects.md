# UI Defect & Issue Log: Effective Date Reassign and Unassign

**Feature:** `feat-effective-date-reassign-unassign`  
**Date:** 2026-09-28  
**Environment:** Dev Environment (`https://danis-cmma-dev.cosdevx.com`)  
**Applicable Skills:** `skills/Automation_UI_Execution/SKILL.MD`, `skills/Overall_report_QA_signoff_testclosure/SKILL.MD`

---

## 1. Confirmed Application Defects: 0
No functional or business logic defects were identified in the application UI, backend APIs, or database integrity layer during test execution.

---

## 2. Automation Defects & Harness Issues: 1

| Issue ID | Title | Severity | Priority | Requirement ID | TC ID | Environment | Expected Result | Actual Result | Root Cause / Suspected Area | Classification |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :--- | :--- | :--- | :---: |
| **AUT-EDRU-001** | Gantt Assignment Bar Selector Mismatch on Live Dev Canvas | Low | Medium | `REQ-EDRU-001` | `TC-EDRU-028` | Dev (`danis-cmma-dev`) | Page Object locates past-start assignment bar to exercise double-click prevention | `AssertionError: No Gantt assignment bars were found. Expected elements with data-bar='true'.` | `complex-spec/automation/ui/pages/assignments_page.py:237` uses `[data-bar='true']`, whereas dev canvas renders dynamic MUI timeline wrappers | `AUTOMATION_DEFECT` |

---

## 3. Specification & Information Gaps Observed

| Gap ID | Description | Impacted TC IDs | Blocking Severity |
| :---: | :--- | :---: | :---: |
| **GAP-EDRU-002** | Asynchronous dispatch queue name and schema unconfirmed | `TC-EDRU-020` | Moderate (Integration deferred) |
| **GAP-EDRU-003** | Split boundary behavior when `splitDate == endDate` undefined | `TC-EDRU-017` | Minor (Boundary test deferred) |
| **GAP-EDRU-004** | Sequential splits on already shortened assignment records undefined | `TC-EDRU-021` | Moderate (Multi-split deferred) |
| **GAP-EDRU-007** | Target latency percentiles under peak load undefined | `TC-EDRU-022`, `TC-EDRU-024` | Minor (Peak SLA deferred) |
