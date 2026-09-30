# Technical Specification & Contract: Assignment Change Request Approval

**Epic:** `epic-assignments`  
**Feature:** `feat-assignment-change-request-approval`  
**Document Type:** Technical Contract Reference  
**Target Release:** Current Sprint  

---

## 1. Rationale & Business Context

* **Job to be Done:** Provide Workforce Managers with an intuitive, tamper-proof, and streamlined approval mechanism to review, validate, and act on Project Manager assignment change requests—either via one-click secure email action links or through a dedicated Landing Page widget and in-drawer comparison banner.
* **Business Impact:**
  * Eliminates unindexed scheduling drift and manual phone/Slack back-and-forth between Project Managers and Workforce Managers.
  * Enforces operational constraints (7-day historic lockouts, double-booking prevention, logged PTO collisions, and Pursuit/Draft contract restrictions) at the moment of approval.
  * Establishes a complete, immutable audit trail for assignment lifecycle changes.

---

## 2. Technical Contract

### 2.1 Database Schema Changes (3NF Compliant & Tenant Isolated)

#### 1. `assignmentChangeRequestToken` Table
```sql
CREATE TABLE IF NOT EXISTS "${schemaName}"."assignmentChangeRequestToken" (
    "tokenId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "changeRequestId" UUID NOT NULL REFERENCES "${schemaName}"."assignmentChangeRequest"("changeRequestId") ON DELETE CASCADE,
    "action" VARCHAR(20) NOT NULL, -- 'ACCEPT', 'DENY', 'VIEW'
    "tokenHash" VARCHAR(64) NOT NULL, -- HMAC-SHA256 hex digest
    "recipientUserId" UUID NULL REFERENCES "${schemaName}"."account"("accountId") ON DELETE SET NULL,
    "expiresAt" TIMESTAMPTZ NOT NULL,
    "usedAt" TIMESTAMPTZ NULL,
    "createdDateTime" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "idx_acr_token_hash" 
ON "${schemaName}"."assignmentChangeRequestToken" ("tokenHash");

CREATE INDEX IF NOT EXISTS "idx_acr_token_request_action" 
ON "${schemaName}"."assignmentChangeRequestToken" ("changeRequestId", "action");
```

#### 2. Performance Index on `assignmentChangeRequest`
```sql
CREATE INDEX IF NOT EXISTS "idx_assignmentChangeRequest_status_created"
ON "${schemaName}"."assignmentChangeRequest" ("status", "createdDateTime" DESC);

CREATE INDEX IF NOT EXISTS "idx_assignmentChangeRequest_assignment_status"
ON "${schemaName}"."assignmentChangeRequest" ("assignmentId", "status");
```

---

### 2.2 API Endpoints & Data Contracts

#### Endpoint 1: Email Action Token Validation & Preview
* **Method & Route:** `GET /api/workforce/assignment-change-requests/token-preview`
* **Query Parameters:** `?token=string`
* **Authentication:** Public with HMAC-SHA256 Token Validation
* **Response Contract (200 OK):**
```json
{
  "valid": true,
  "changeRequestId": "292fd69b-0e80-4f27-90e6-db10d9217089",
  "action": "ACCEPT",
  "projectName": "Meals on Wheels",
  "workerName": "Cody Kessler",
  "tradeName": "Concrete",
  "currentDates": { "start": "2026-02-09", "end": "2026-10-01" },
  "proposedDates": { "start": "2026-02-10", "end": "2026-10-01" },
  "currentHoursPerDay": 8.0,
  "proposedHoursPerDay": 8.0,
  "requesterName": "Ahmed Personal",
  "requesterComments": "Pour schedule moved up 1 day",
  "hasConflict": true,
  "conflictDetails": [
    { "date": "2026-02-10", "reason": "Exceeds working capacity / overlap with Margaret Mary Health" }
  ],
  "extendsProject": false,
  "isHistoricLocked": false
}
```

---

#### Endpoint 2: Execute Email Action Token
* **Method & Route:** `POST /api/workforce/assignment-change-requests/execute-token`
* **Authentication:** Public with Token Payload
* **Request Body:**
```json
{
  "token": "a1b2c3d4...64charHex",
  "overrideConflict": true,
  "reviewerComments": "Approved after reviewing overlap"
}
```
* **Response Contract (200 OK):**
```json
{
  "success": true,
  "changeRequestId": "292fd69b-0e80-4f27-90e6-db10d9217089",
  "assignmentId": "63097b12-4f82-4be4-8d3a-df1206e035e1",
  "status": "APPROVED",
  "message": "Assignment change request successfully approved."
}
```

---

#### Endpoint 3: List Change Requests (Landing Page Widget)
* **Method & Route:** `GET /api/workforce/assignment-change-requests`
* **Query Parameters:** `?status=PENDING&projectId=...&limit=10&offset=0`
* **Headers:** `Authorization: Bearer <JWT>`
* **Response Contract (200 OK):**
```json
{
  "items": [
    {
      "changeRequestId": "292fd69b-0e80-4f27-90e6-db10d9217089",
      "assignmentId": "63097b12-4f82-4be4-8d3a-df1206e035e1",
      "projectId": "0a767cda-8f27-46bc-bee9-8d3d89f2535b",
      "projectName": "Meals on Wheels",
      "tradeName": "Concrete",
      "proposedResource": { "id": "2aafa7ca-...", "name": "Cody Kessler" },
      "proposedDates": { "start": "2026-02-10", "end": "2026-10-01" },
      "requester": { "id": "0b3ac79f-...", "name": "Ahmed Personal" },
      "status": "PENDING",
      "createdDateTime": "2026-08-19T05:16:58.156Z"
    }
  ],
  "total": 1,
  "limit": 10,
  "offset": 0
}
```

---

#### Endpoint 4: In-App Approve Change Request
* **Method & Route:** `PATCH /api/workforce/assignment-change-requests/:changeRequestId/approve`
* **Headers:** `Authorization: Bearer <JWT>`
* **Request Body (Optional DTO):**
```json
{
  "overrideConflict": true,
  "overrideHistoricLockout": false,
  "extendProjectEndDate": true
}
```
* **Response Contract (200 OK):**
```json
{
  "success": true,
  "changeRequestId": "292fd69b-0e80-4f27-90e6-db10d9217089",
  "assignmentId": "63097b12-4f82-4be4-8d3a-df1206e035e1",
  "status": "APPROVED"
}
```

---

#### Endpoint 5: In-App Reject Change Request
* **Method & Route:** `PATCH /api/workforce/assignment-change-requests/:changeRequestId/reject`
* **Headers:** `Authorization: Bearer <JWT>`
* **Request Body:**
```json
{
  "reviewerComments": "Worker needed on Margaret Mary Health project"
}
```
* **Response Contract (200 OK):**
```json
{
  "success": true,
  "changeRequestId": "292fd69b-0e80-4f27-90e6-db10d9217089",
  "status": "REJECTED"
}
```
