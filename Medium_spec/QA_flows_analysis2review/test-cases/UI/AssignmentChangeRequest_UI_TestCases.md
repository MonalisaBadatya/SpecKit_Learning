# UI Test Cases: Assignment Change Request Approval

**Feature:** `feat-assignment-change-request-approval`
**Epic:** `epic-assignments`
**Source of Truth:** `test-plan/AssignmentChangeRequest_TestPlan.md` v2.0
**Document Version:** 2.0

---

## Summary

| TC ID | REQ / BR | Title | Priority | Type | Automation |
| :--- | :--- | :--- | :---: | :---: | :---: |
| TC-UI-001 | REQ-ACR-003, REQ-ACR-004 | Landing Page Widget & Drawer Banner | P1 | Positive | AUTOMATE |
| TC-UI-002 | REQ-ACR-005, BR-ACR-002 | Clean In-App Approval | P1 | Positive | AUTOMATE |
| TC-UI-003 | REQ-ACR-006, BR-ACR-003 | Conflict Override Modal | P1 | Boundary | AUTOMATE |
| TC-UI-004 | REQ-ACR-007, BR-ACR-004 | Project Extension Modal | P1 | Boundary | AUTOMATE |
| TC-UI-005 | REQ-ACR-008, BR-ACR-005 | Historic Lockout - WFM Blocked | P0 | Security | AUTOMATE |
| TC-UI-006 | REQ-ACR-008, BR-ACR-005 | Historic Lockout - Admin Override | P1 | Security | AUTOMATE |
| TC-UI-007 | REQ-ACR-009 | Rejection with Comment | P1 | Negative | AUTOMATE |
| TC-UI-008 | REQ-ACR-010, BR-ACR-008 | PM Self-Withdrawal | P1 | Positive | AUTOMATE |
| TC-UI-009 | REQ-ACR-010, BR-ACR-008 | Non-Owner PM Withdrawal Blocked | P0 | Security | AUTOMATE |
| TC-UI-010 | BR-ACR-001, VAL-ACR-001 | Pursuit/Draft Project Block | P0 | Negative | AUTOMATE |
| TC-UI-011 | BR-ACR-002 | Self-Collision Exclusion | P1 | Positive | AUTOMATE |
| TC-UI-012 | BR-ACR-006, VAL-ACR-002 | Archived/Inactive Worker Block | P1 | Negative | AUTOMATE |
| TC-UI-013 | REQ-ACR-014, BR-ACR-007 | Expired Email Link Toast (Manual) | P1 | Boundary | MANUAL |
| TC-UI-014 | REQ-ACR-015 | Already-Resolved Screen (Manual) | P2 | Functional | MANUAL |
| TC-UI-015 | WCAG 1.4.1 | Badge Color Not Sole Indicator | P2 | Accessibility | AUTOMATE (Axe) |
| TC-UI-016 | WCAG 2.4.3 | Modal Focus Trap & Keyboard Nav | P2 | Accessibility | AUTOMATE |
| TC-UI-017 | WCAG 1.3.1 | Accessible Names & ARIA | P2 | Accessibility | AUTOMATE |
| TC-UI-018 | REQ-ACR-005 | Regression: Detail + Timeline + Calendar | P1 | Regression | AUTOMATE |

---

## Detailed Test Cases

---

### TC-UI-001: Landing Page Widget & Drawer Banner

| Field | Value |
| :--- | :--- |
| **ID** | TC-UI-001 |
| **Scenario** | SCN-001 |
| **Requirement** | REQ-ACR-003, REQ-ACR-004 |
| **Priority** | P1 |
| **Type** | Positive |
| **Automation** | AUTOMATE - Playwright |

**Preconditions:**
1. User authenticated as WFM (`wfm.danis@cmma.io`).
2. Clean pending ACR exists for worker "Cody Kessler", project "Meals on Wheels" (ACR ID: `292fd69b-...`).

**Test Data:** Account: `a1111111-...` (Sarah Jenkins, WFM); ACR: `292fd69b-...` (Clean Pending).

**Steps:**
1. Navigate to WFM Landing Page (`/`).
2. Locate "Assignment Change Requests" widget (between "Conflicts" and "Bench Resources").
3. Verify columns: Worker Name, Trade, Proposed Date Range, Project Name, Actions.
4. Click the "Review" link on the Cody Kessler row.

**Expected Results:**
1. Widget renders with at least one row showing "Cody Kessler", "Concrete", "Meals on Wheels".
2. Assignment Detail drawer opens.
3. Amber banner: header `"CHANGE REQUEST PENDING REVIEW"`, requester name right-aligned.
4. Side-by-side current vs. proposed dates visible.
5. PM justification rendered in quoted style.
6. Green "Accept Changes" and Red "Reject" buttons visible.

**Test Oracle:** No DB mutation. UI read-only verification.

---

### TC-UI-002: Clean In-App Approval

| Field | Value |
| :--- | :--- |
| **ID** | TC-UI-002 |
| **Scenario** | SCN-002 |
| **Requirement** | REQ-ACR-005, BR-ACR-002 |
| **Priority** | P1 |
| **Type** | Positive |
| **Automation** | AUTOMATE - Playwright |

**Preconditions:**
1. WFM authenticated.
2. Clean pending ACR open in drawer (no conflict, no extension, no historic lockout).

**Test Data:** ACR: `292fd69b-...` (Clean Pending).

**Steps:**
1. Click "Accept Changes" button.

**Expected Results:**
1. No intermediate modal appears.
2. Status updates to `APPROVED`.
3. Success notification displayed.
4. Pending banner dismissed; drawer shows updated dates.

**Test Oracle - DB:**
- `assignmentChangeRequest.status = 'APPROVED'`
- `assignment.startDate = '2026-02-10'`, `endDate = '2026-10-01'`
- Audit record: `action='APPROVED'`, `resolver=WFM_ID`, `conflictOverride=false`

**Test Oracle - Notification:** PM receives APPROVED notification event.

---

### TC-UI-003: Conflict Override Modal

| Field | Value |
| :--- | :--- |
| **ID** | TC-UI-003 |
| **Scenario** | SCN-003 |
| **Requirement** | REQ-ACR-006, BR-ACR-003 |
| **Priority** | P1 |
| **Type** | Boundary |
| **Automation** | AUTOMATE - Playwright |

**Preconditions:**
1. WFM authenticated.
2. Conflict pending ACR: proposed worker has overlapping assignment on "Margaret Mary Health" until `2026-02-27`.

**Test Data:** ACR: `383ae78c-...` (Conflict Overlap).

**Steps:**
1. Open drawer for conflict ACR.
2. Verify amber badge `"Scheduling Conflict / Time-Off Detected"` displayed.
3. Click "Accept Changes".
4. Verify modal title `"Scheduling Conflict Detected"` with date-by-date breakdown.
5. Click `"Override and Accept"`.

**Expected Results:**
1. Modal shows overlapping dates `2026-02-10 to 2026-02-27`.
2. Status -> `APPROVED`.
3. Assignment dates updated to proposed range.

**Test Oracle - DB:**
- `assignmentChangeRequest.status = 'APPROVED'`
- Audit: `conflictOverride = true`

---

### TC-UI-004: Project Extension Modal

| Field | Value |
| :--- | :--- |
| **ID** | TC-UI-004 |
| **Scenario** | SCN-004 |
| **Requirement** | REQ-ACR-007, BR-ACR-004 |
| **Priority** | P1 |
| **Type** | Boundary |
| **Automation** | AUTOMATE - Playwright |

**Preconditions:**
1. WFM authenticated.
2. Extension ACR: proposed end `2026-11-15`; project end `2026-10-01`.

**Test Data:** ACR: `494bf89d-...` (Project Extension).

**Steps:**
1. Open drawer; verify blue badge `"Extends Project End Date"`.
2. Click "Accept Changes".
3. Verify modal `"Extend Project End Date?"`.
4. Click `"Extend Project and Accept"`.

**Expected Results:**
1. Status -> `APPROVED`.
2. Project end date -> `2026-11-15`.
3. Assignment end date -> `2026-11-15`.

**Test Oracle - DB:**
- `project.endDate = '2026-11-15'`
- `assignment.endDate = '2026-11-15'`
- Audit: `extendProjectEndDate = true`

---

### TC-UI-005: Historic Lockout - WFM Blocked

| Field | Value |
| :--- | :--- |
| **ID** | TC-UI-005 |
| **Scenario** | SCN-005 |
| **Requirement** | REQ-ACR-008, BR-ACR-005 |
| **Priority** | P0 (Critical - RBAC) |
| **Type** | Security |
| **Automation** | AUTOMATE - Playwright |

**Preconditions:** Proposed start date `2026-01-10` (>7 days past). Actor = WFM.

**Test Data:** ACR: `5a5ca90e-...` (Historic Lockout). JWT: WFM.

**Steps:**
1. Open drawer as WFM; verify grey badge `"Historic Lockout Threshold"`.
2. Click "Accept Changes".

**Expected Results:**
1. Approval blocked.
2. API returns 403 Forbidden.
3. UI shows error message that WFM cannot override historic lockout.

---

### TC-UI-006: Historic Lockout - System Admin Override

| Field | Value |
| :--- | :--- |
| **ID** | TC-UI-006 |
| **Scenario** | SCN-006 |
| **Requirement** | REQ-ACR-008, BR-ACR-005 |
| **Priority** | P1 |
| **Type** | Security |
| **Automation** | AUTOMATE - Playwright |

**Preconditions:** Historic lockout ACR. Actor = System Admin (`admin@cmma.io`).

**Test Data:** ACR: `5a5ca90e-...`. JWT: SYSTEM_ADMIN.

**Steps:**
1. System Admin opens drawer; clicks "Accept Changes".
2. Confirms historic lockout override modal.

**Expected Results:**
1. Approval succeeds; status = `APPROVED`.

**Test Oracle - DB:**
- Audit: `historicLockoutOverride = true`, `resolver = SYSTEM_ADMIN_ID`

---

### TC-UI-007: Rejection with Comment

| Field | Value |
| :--- | :--- |
| **ID** | TC-UI-007 |
| **Scenario** | SCN-008 |
| **Requirement** | REQ-ACR-009 |
| **Priority** | P1 |
| **Type** | Negative |
| **Automation** | AUTOMATE - Playwright |

**Preconditions:** WFM authenticated; pending ACR in drawer.

**Test Data:** ACR: `292fd69b-...` (Clean Pending).

**Steps:**
1. Click red "Reject" button.
2. Enter comment: `"Worker needed on Margaret Mary Health project"`.
3. Click `"Confirm Rejection"`.

**Expected Results:**
1. Status -> `REJECTED`.
2. Assignment dates unchanged.
3. Action tokens invalidated.

**Test Oracle - DB:**
- `status = 'REJECTED'`; `reviewerComments` stored; assignment dates unchanged; audit created.

**Test Oracle - Notification:** PM receives REJECTED notification with comment.

---

### TC-UI-008: PM Self-Withdrawal

| Field | Value |
| :--- | :--- |
| **ID** | TC-UI-008 |
| **Scenario** | SCN-010 |
| **Requirement** | REQ-ACR-010, BR-ACR-008 |
| **Priority** | P1 |
| **Type** | Positive |
| **Automation** | AUTOMATE - Playwright |

**Preconditions:** PM Ahmed Personal (original submitter) authenticated.

**Test Data:** Account: `0b3ac79f-...` (Ahmed Personal, PM); ACR: `292fd69b-...`.

**Steps:**
1. Open drawer for own pending request.
2. Click "Withdraw Request"; confirm dialog.

**Expected Results:**
1. Status -> `CANCELLED`.
2. Pending banner removed.

**Test Oracle - DB:** `status = 'CANCELLED'`; assignment unchanged; audit: `resolver = PM_ID`.

---

### TC-UI-009: Non-Owner PM Withdrawal Blocked

| Field | Value |
| :--- | :--- |
| **ID** | TC-UI-009 |
| **Scenario** | SCN-011 |
| **Requirement** | REQ-ACR-010, BR-ACR-008 |
| **Priority** | P0 (Security) |
| **Type** | Security |
| **Automation** | AUTOMATE - Playwright |

**Preconditions:** PM Bob Miller (different PM, `c3333333-...`) authenticated.

**Steps:**
1. Attempt to access or withdraw Ahmed's change request.

**Expected Results:**
1. "Withdraw Request" action hidden or disabled.
2. Direct API call returns 403 Forbidden.

---

### TC-UI-010: Pursuit/Draft Project Block

| Field | Value |
| :--- | :--- |
| **ID** | TC-UI-010 |
| **Scenario** | SCN-007 |
| **Requirement** | BR-ACR-001, VAL-ACR-001 |
| **Priority** | P0 (Critical) |
| **Type** | Negative |
| **Automation** | AUTOMATE - Playwright |

**Test Data:** ACR: `6b6db01f-...` (Pursuit Guard project).

**Steps:**
1. WFM clicks "Accept Changes" on Pursuit/Draft project ACR.

**Expected Results:**
1. Approval blocked.
2. Alert: `"Cannot approve workforce assignment on a Pursuit project. Move project to Active status once contract is executed."`

---

### TC-UI-011: Self-Collision Exclusion

| Field | Value |
| :--- | :--- |
| **ID** | TC-UI-011 |
| **Scenario** | SCN-013 |
| **Requirement** | BR-ACR-002 |
| **Priority** | P1 |
| **Type** | Positive |
| **Automation** | AUTOMATE - Playwright |

**Preconditions:** ACR proposes date adjustment for same worker (Cody Kessler) on same assignment; no other project overlap.

**Steps:**
1. Open drawer; inspect banner.

**Expected Results:**
1. No amber conflict badge displayed.
2. No conflict modal on "Accept Changes" click.
3. Clean approval proceeds.

---

### TC-UI-012: Archived/Inactive Worker Block

| Field | Value |
| :--- | :--- |
| **ID** | TC-UI-012 |
| **Scenario** | SCN-014 |
| **Requirement** | BR-ACR-006, VAL-ACR-002 |
| **Priority** | P1 |
| **Type** | Negative |
| **Automation** | AUTOMATE - Playwright |

**Test Data:** Worker: `4bbba8db-...` (John Doe, ARCHIVED).

**Steps:**
1. WFM clicks "Accept Changes" on ACR with archived proposed worker.

**Expected Results:**
1. Approval blocked.
2. Error: `"Cannot approve: Proposed resource is inactive or archived."`

---

### TC-UI-013: Expired Email Link Redirect & Toast

| Field | Value |
| :--- | :--- |
| **ID** | TC-UI-013 |
| **Scenario** | SCN-019 |
| **Requirement** | REQ-ACR-014, BR-ACR-007 |
| **Priority** | P1 |
| **Type** | Boundary |
| **Automation** | MANUAL ONLY (email link dependency) |

**Test Data:** Expired token: `b2c3d4e5-...` (createdDateTime: 8 days ago).

**Steps:**
1. Access email action link with expired token.

**Expected Results:**
1. Redirects to WFM landing page.
2. Toast: `"This action link has expired (valid for 7 days). The request can still be reviewed below."`
3. ACR still PENDING in widget.

**Test Oracle - DB:** Token record unchanged; no state mutation.

---

### TC-UI-014: Already-Resolved Screen

| Field | Value |
| :--- | :--- |
| **ID** | TC-UI-014 |
| **Scenario** | SCN-021 |
| **Requirement** | REQ-ACR-015, VAL-ACR-004 |
| **Priority** | P2 |
| **Type** | Functional |
| **Automation** | MANUAL ONLY |

**Steps:**
1. Click email link for already-approved/rejected ACR.

**Expected Results:**
1. Dedicated screen: resolver name + resolution timestamp displayed.

---

### TC-UI-015: Badge Color Not Sole Indicator (WCAG 1.4.1)

| Field | Value |
| :--- | :--- |
| **ID** | TC-UI-015 |
| **Scenario** | SCN-055 |
| **Requirement** | WCAG 2.1 SC 1.4.1 |
| **Priority** | P2 |
| **Type** | Accessibility |
| **Automation** | AUTOMATE - Axe-core + manual |

**Steps:**
1. Open drawer with conflict ACR (amber badge).
2. Open drawer with extension ACR (blue badge).
3. Open drawer with historic lockout ACR (grey badge).
4. For each: disable CSS color rendering; verify badge still identifies condition.
5. Run Axe-core scan on drawer.

**Expected Results:**
1. Each badge has accompanying text label or tooltip independent of color.
2. Axe-core: zero critical color-contrast violations.

---

### TC-UI-016: Modal Focus Trap & Keyboard Navigation

| Field | Value |
| :--- | :--- |
| **ID** | TC-UI-016 |
| **Scenario** | SCN-056 |
| **Requirement** | WCAG 2.1 SC 2.4.3 |
| **Priority** | P2 |
| **Type** | Accessibility |
| **Automation** | AUTOMATE - Playwright |

**Steps:**
1. Trigger conflict override modal.
2. Press Tab repeatedly.
3. Press Esc.

**Expected Results:**
1. Focus cycles only within modal elements while open.
2. Esc closes modal; focus returns to "Accept Changes" trigger button.
3. Modal has `role="dialog"` or `aria-modal="true"`.

---

### TC-UI-017: Accessible Names & ARIA

| Field | Value |
| :--- | :--- |
| **ID** | TC-UI-017 |
| **Scenario** | SCN-057 |
| **Requirement** | WCAG 2.1 SC 1.3.1 |
| **Priority** | P2 |
| **Type** | Accessibility |
| **Automation** | AUTOMATE - Playwright + Axe |

**Steps:**
1. Inspect "Reject" button accessible name.
2. Open rejection dialog; inspect textarea label.
3. Inspect "Accept Changes" button accessible name.
4. Run Axe-core on Landing Page and Drawer.

**Expected Results:**
1. "Reject" has `aria-label` or visible text.
2. Textarea has `<label>` associated via `for`/`id`.
3. Error toasts have `role="alert"` or `aria-live="polite"`.
4. Axe-core: zero critical violations.

---

### TC-UI-018: Regression - Assignment Detail + Timeline + Calendar

| Field | Value |
| :--- | :--- |
| **ID** | TC-UI-018 |
| **Scenario** | SCN-058, SCN-059, SCN-060 |
| **Requirement** | REQ-ACR-005; Test Plan Section 22 |
| **Priority** | P1 |
| **Type** | Regression |
| **Automation** | AUTOMATE - Playwright |

**Preconditions:** ACR approved with date range shift (start: `2026-02-10`, end: `2026-10-01`).

**Steps:**
1. Approve clean ACR.
2. Navigate to Assignment Detail panel for the assignment.
3. Navigate to Timeline view.
4. Navigate to Calendar view.

**Expected Results:**
1. Assignment Detail: start = `2026-02-10`, end = `2026-10-01`.
2. Timeline: assignment block repositioned/resized to new date range.
3. Calendar: assignment appears in new date range without duplication.
4. No residual conflict from old dates.

**Dependencies:** TC-UI-002 must pass first (clean approval flow).
