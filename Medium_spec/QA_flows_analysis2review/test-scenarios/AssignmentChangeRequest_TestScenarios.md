# QA Test Scenarios: Assignment Change Request Approval

**Feature:** `feat-assignment-change-request-approval`
**Epic:** `epic-assignments`
**Source of Truth:** `test-plan/AssignmentChangeRequest_TestPlan.md` v2.0
**Document Version:** 2.0

---

## 1. Scenario Summary Matrix

| Category | Count | P0 | P1 | P2 |
| :--- | :---: | :---: | :---: | :---: |
| In-App WFM Approvals | 7 | 2 | 4 | 1 |
| Email Action Token Lifecycle | 6 | 3 | 2 | 1 |
| Token Security | 7 | 7 | 0 | 0 |
| RBAC & Permission Guards | 6 | 5 | 1 | 0 |
| Operational / Boundary Guards | 4 | 1 | 3 | 0 |
| State Machine Integrity | 5 | 4 | 1 | 0 |
| Rejection & Withdrawal | 4 | 0 | 3 | 1 |
| Concurrency | 3 | 3 | 0 | 0 |
| Multi-Tenancy Isolation | 3 | 3 | 0 | 0 |
| Pagination & Filtering | 3 | 0 | 1 | 2 |
| Audit Trail | 3 | 0 | 3 | 0 |
| Notification Events | 3 | 0 | 2 | 1 |
| Accessibility | 3 | 0 | 0 | 3 |
| Regression (Downstream Scheduling) | 5 | 0 | 5 | 0 |
| DB Schema & Integrity | 2 | 0 | 2 | 0 |
| **Total** | **64** | **28** | **26** | **10** |

---

## 2. Master Test Scenarios

| ID | REQ / BR | Title | Layer | Type | P | Preconditions | Expected Outcome |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| **SCN-001** | REQ-ACR-003, REQ-ACR-004 | Landing Page Widget & Comparison Banner | UI | Positive | P1 | WFM auth; pending ACR exists | Widget row present; drawer opens with amber banner, side-by-side comparison, PM justification |
| **SCN-002** | REQ-ACR-005, BR-ACR-002 | Clean In-App Approval | UI/API/DB | Positive | P1 | Clean pending ACR (no flags) | APPROVED; assignment dates updated; audit created; PM notified |
| **SCN-003** | REQ-ACR-006, BR-ACR-003 | Conflict Override Approval | UI/API/DB | Boundary | P1 | Worker has overlapping assignment on another project | Amber badge; conflict modal; override accepted; audit: conflictOverride=true |
| **SCN-004** | REQ-ACR-007, BR-ACR-004 | Project Extension Approval | UI/API/DB | Boundary | P1 | Proposed end > project end date | Blue badge; extension modal; project + assignment end dates updated; audit: extendProjectEndDate=true |
| **SCN-005** | REQ-ACR-008, BR-ACR-005 | Historic Lockout - WFM Blocked | UI/API | Security | P0 | Proposed start >7 days past; actor=WFM | Grey badge; 403 Forbidden; WFM cannot approve |
| **SCN-006** | REQ-ACR-008, BR-ACR-005 | Historic Lockout - System Admin Override | UI/API/DB | Security | P1 | Proposed start >7 days past; actor=Admin | Approval succeeds; audit: historicLockoutOverride=true, resolver=SYSTEM_ADMIN |
| **SCN-007** | BR-ACR-001, VAL-ACR-001 | Pursuit/Draft Project Block | UI/API | Negative | P0 | Project status=Pursuit or Draft | Approval blocked; error message displayed |
| **SCN-008** | REQ-ACR-009 | In-App Rejection with Comment | UI/API/DB | Negative | P1 | WFM reviewing pending ACR | REJECTED; comment stored; assignment unchanged; audit created; PM notified |
| **SCN-009** | REQ-ACR-009 | In-App Rejection without Comment (null) | API | Boundary | P1 | WFM rejects; reviewerComments=null | REJECTED (GAP-PLAN-001: blank format TBD) |
| **SCN-010** | REQ-ACR-010, BR-ACR-008 | PM Self-Withdrawal | UI/API | Positive | P1 | Original PM authenticated | CANCELLED; assignment unchanged; audit: resolver=PM |
| **SCN-011** | REQ-ACR-010, BR-ACR-008 | Non-Owner PM Withdrawal Blocked | API/UI | Security | P0 | Different PM authenticated | 403 Forbidden; request remains PENDING |
| **SCN-012** | REQ-ACR-010 | System Admin Withdrawal of Any Request | API/UI | Security | P1 | System Admin authenticated | CANCELLED; audit: resolver=SYSTEM_ADMIN |
| **SCN-013** | BR-ACR-002 | Self-Collision Exclusion | UI/API | Functional | P1 | Proposed worker = current worker on same assignment | No conflict badge; clean approval path; no conflict modal |
| **SCN-014** | BR-ACR-006, VAL-ACR-002 | Archived/Inactive Worker Block | UI/API | Negative | P1 | Proposed worker is archived/inactive | Approval blocked; error: "Cannot approve: Proposed resource is inactive or archived." |
| **SCN-015** | REQ-ACR-011 | Assignment Deletion - Auto-Cancel + Token Invalidation | API/DB | Lifecycle | P1 | Assignment has pending ACR and tokens | ACR -> CANCELLED; tokens CASCADE-deleted; old token -> 404 |
| **SCN-016** | REQ-ACR-012 | Token Preview - Valid Unused Token | API | Positive | P1 | Valid unused ACCEPT token | 200; valid=true; correct project/worker/date/flag fields |
| **SCN-017** | REQ-ACR-013 | Token Execute - ACCEPT | API/DB | Positive | P0 | Valid unused ACCEPT token | 200; APPROVED; assignment updated; usedAt populated; audit |
| **SCN-018** | REQ-ACR-013 | Token Execute - DENY | API/DB | Positive | P1 | Valid unused DENY token | 200; REJECTED; assignment unchanged; usedAt populated |
| **SCN-019** | REQ-ACR-014, BR-ACR-007 | Expired Token (>7 days) | UI/API | Boundary | P1 | Token createdDateTime >7 days ago | 410 Gone; UI redirect + toast message |
| **SCN-020** | BR-ACR-007 | Token at Exact 7-Day Boundary | API | Boundary | P2 | Token exactly 7 days old | Document: valid or expired (boundary clarification required) |
| **SCN-021** | REQ-ACR-015 | Already-Resolved Request Screen | UI | Boundary | P2 | Email link for already-resolved ACR | Dedicated screen: resolver name + timestamp |
| **SCN-022** | Token Security | Tampered/Forged Token | API | Security | P0 | Tampered HMAC hash submitted | 400 Bad Request; no internal error leaked |
| **SCN-023** | Token Security | Token Reuse After usedAt Populated | API | Security | P0 | Already-used token re-submitted | 409 Conflict |
| **SCN-024** | Token Security | Token for Deleted Request (CASCADE) | API | Security | P0 | Token references deleted changeRequestId | 404 Not Found |
| **SCN-025** | Token Security | Cross-Tenant Token Access | API | Security | P0 | Tenant B submits Tenant A's token | 404 / 403; no Tenant A data mutated |
| **SCN-026** | Token Security | Empty/Missing Token | API | Security | P0 | Missing or empty token field | 400 Bad Request |
| **SCN-027** | Token Security | Malformed/Extremely Long Token | API | Security | P0 | Non-hex string or >1000 chars | 400 Bad Request |
| **SCN-028** | Token Security | Token After Request Cancelled | API | Security | P0 | Token used after ACR cancelled | 409 or 410 |
| **SCN-029** | RBAC | PM Calls Approve Endpoint | API | Security | P0 | PM JWT on PATCH /approve | 403 Forbidden |
| **SCN-030** | RBAC | PM Calls Reject Endpoint | API | Security | P0 | PM JWT on PATCH /reject | 403 Forbidden |
| **SCN-031** | RBAC | WFM Calls Historic Lockout Override | API | Security | P0 | WFM JWT; overrideHistoricLockout=true | 403 Forbidden |
| **SCN-032** | RBAC | No JWT on Protected Endpoint | API | Security | P0 | No Authorization header | 401 Unauthorized |
| **SCN-033** | RBAC | PM Calls List Endpoint | API | Security | P0 | PM JWT on GET /assignment-change-requests | 403 Forbidden |
| **SCN-034** | RBAC | WFM Withdrawal Ambiguity | API | Security | P1 | WFM attempts withdrawal (CLARIFICATION REQUIRED) | BLOCKED - GAP-PLAN-007 |
| **SCN-035** | State Machine | APPROVED -> Approve Again | API | State Machine | P0 | Request already APPROVED | 409 "Change request is already resolved" |
| **SCN-036** | State Machine | APPROVED -> Reject | API | State Machine | P0 | Request already APPROVED | 409 "Change request is already resolved" |
| **SCN-037** | State Machine | APPROVED -> Withdraw | API | State Machine | P0 | Request already APPROVED | 409 "Change request is already resolved" |
| **SCN-038** | State Machine | REJECTED -> Approve | API | State Machine | P0 | Request already REJECTED | 409 "Change request is already resolved" |
| **SCN-039** | State Machine | CANCELLED -> Approve | API | State Machine | P1 | Request already CANCELLED | 409 "Change request is already resolved" |
| **SCN-040** | REQ-ACR-016, BR-ACR-009 | Concurrent Dual WFM Approval | API/DB | Concurrency | P0 | Two WFMs approve same request simultaneously | First: 200 APPROVED; Second: 409; assignment updated once |
| **SCN-041** | REQ-ACR-016, BR-ACR-009 | Concurrent UI + Email Token Approval | API/DB | Concurrency | P0 | WFM in-app + email token simultaneously | First: 200; Second: 409; assignment updated once |
| **SCN-042** | REQ-ACR-016, BR-ACR-009 | Concurrent Dual Email Token Execution | API/DB | Concurrency | P0 | Two ACCEPT tokens simultaneously | First: 200; Second: 409; dates updated once only |
| **SCN-043** | Multi-tenancy | Cross-Tenant Token Execution | API | Security | P0 | Tenant B uses Tenant A's token | 404/403; no Tenant A data mutated |
| **SCN-044** | Multi-tenancy | Cross-Tenant API Query Isolation | API/DB | Security | P0 | Tenant B JWT on list endpoint | Returns only Tenant B records |
| **SCN-045** | Multi-tenancy | Cross-Tenant PATCH Approve Isolation | API | Security | P0 | Tenant B approves Tenant A changeRequestId | 404 Not Found |
| **SCN-046** | Pagination | List Endpoint Status Filter & Pagination | API | Functional | P1 | Multiple ACRs across statuses | Filtered, paginated result; total count accurate |
| **SCN-047** | Pagination | Zero Results & Large Offset | API | Boundary | P2 | No pending ACRs or offset beyond total | items:[], correct total |
| **SCN-048** | Pagination | Invalid Filter Parameters | API | Negative | P2 | status=INVALID; limit=-1 | 400 Bad Request |
| **SCN-049** | Audit | Audit Record on All Approval Variants | DB | Integrity | P1 | Clean/conflict/extension/lockout approval | Audit record with correct action, resolver, flags, timestamp |
| **SCN-050** | Audit | Audit Record on Rejection & Withdrawal | DB | Integrity | P1 | Rejection; PM withdrawal; Admin withdrawal | Audit record: action, resolver, reviewerComments |
| **SCN-051** | Audit | Audit Record on Auto-Cancel | DB | Integrity | P1 | Assignment deleted | Audit: action=CANCELLED, resolver=SYSTEM |
| **SCN-052** | Notification | Submission Notification to WFM | API | Functional | P1 | PM submits request | WFM receives notification with action tokens (GAP-PLAN-004 if recipient unspecified) |
| **SCN-053** | Notification | Approval/Rejection Notification to PM | API | Functional | P1 | ACR approved or rejected | PM receives notification: status, resolver, timestamp |
| **SCN-054** | Notification | Withdrawal/Auto-cancel Notification | API | Functional | P2 | ACR withdrawn or auto-cancelled | BLOCKED - GAP-PLAN-004 / GAP-PLAN-005 |
| **SCN-055** | Accessibility | Badge Color Not Sole Indicator (WCAG 1.4.1) | UI | Accessibility | P2 | Conflict/Extension/Lockout ACR in drawer | Each badge has text label; no color-only indication |
| **SCN-056** | Accessibility | Modal Focus Trap & Keyboard Navigation | UI | Accessibility | P2 | Conflict/Extension modal open | Focus cycles within modal; Esc closes; focus returns to trigger |
| **SCN-057** | Accessibility | Accessible Names & ARIA Labels | UI | Accessibility | P2 | Landing page and drawer rendered | Buttons, textarea, dialog have accessible names; Axe zero critical violations |
| **SCN-058** | Regression | Assignment Detail After Approval | UI | Regression | P1 | ACR approved; dates changed | Assignment Detail shows new proposed dates |
| **SCN-059** | Regression | Timeline View After Approval | UI | Regression | P1 | ACR approved; dates changed | Timeline block repositioned/resized |
| **SCN-060** | Regression | Calendar View After Approval | UI | Regression | P1 | ACR approved; dates changed | Calendar shows assignment in new date range |
| **SCN-061** | Regression | Worker Availability & Conflict Recalc | API | Regression | P1 | Conflict-override ACR approved | Conflict calculations use new dates; no residual old-date conflict |
| **SCN-062** | Regression | Project Dates After Extension Approval | UI/API | Regression | P1 | Extension ACR approved | Project end date updated in project view and Timeline |
| **SCN-063** | DB Schema | Schema & DDL Verification | DB | Integrity | P1 | DDL migration applied | All columns, types, NOT NULL, defaults correct |
| **SCN-064** | DB Schema | Index & FK Constraint Verification | DB | Integrity | P1 | DDL migration applied | All 4 indexes exist; CASCADE and SET NULL FK rules verified |
