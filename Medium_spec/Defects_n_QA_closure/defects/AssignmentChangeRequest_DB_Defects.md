# Defect Report: Assignment Change Request Database

**Feature:** `feat-assignment-change-request-approval`  
**Layer:** Database Layer & Schema Integrity  
**Environment:** PostgreSQL Sandbox DB  
**Date:** 2026-08-26  

---

## 1. Defect Inventory

| Defect ID | Title | Severity | Priority | Status | Component |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **BUG-ACR-DB-001** | Token `usedAt` timestamp not updated due to Token API Service Crash (Blocked by BUG-ACR-API-001) | High | P0 | Blocked | Database Token State / API Integration |

---

## 2. Detailed Defect Description

### BUG-ACR-DB-001: Token Row State Blocked by API Crash

| Field | Value |
| :--- | :--- |
| **Defect ID** | `BUG-ACR-DB-001` (Linked to `BUG-ACR-API-001`) |
| **Title** | `usedAt` column in `assignmentChangeRequestToken` cannot be populated due to backend service 500 error |
| **Severity** | **High** |
| **Priority** | **P0** |
| **Requirement ID** | `REQ-ACR-013`, `REQ-ACR-015`, `BR-ACR-007` |
| **Test Case ID** | `TC-DB-019`, `TC-DB-020` |
| **Environment** | PostgreSQL Sandbox Database |
| **Expected Result** | When `POST /execute-token` succeeds, the matching row in `assignmentChangeRequestToken` has `usedAt` set to current timestamp. |
| **Actual Result** | The API endpoint returns HTTP 500 without updating the database record. Subsequent executions cannot be verified for single-use token enforcement. |
| **Root Cause** | Downstream blockage from `BUG-ACR-API-001`. Database DDL and schema support the column, but data ingestion is halted by backend crash. |
| **Traceability** | `TC-DB-019`, `TC-DB-020`, `REG-021` |
