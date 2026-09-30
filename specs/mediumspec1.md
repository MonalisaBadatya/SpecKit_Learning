# QA Training Exercise 2 - Assignment Change Request Approval (Medium)

**Difficulty:** Medium  
**Source spec:** `specs/epic-assignments/feat-assignment-change-request-approval/Spec.md`  
**Deliverables:** A TestBoundary document, then a set of test cases  
**Format references:** See an existing `TestBoundary.md` in any feature folder under `specs/` for the layout your TestBoundary must follow. See an existing `TestSpec.md` in any feature folder for the test case format.

> **Important - what to use from this document**

> The source document for this exercise is a product requirements document, not a traditional test specification. It contains sections that describe business goals, success metrics, and technical implementation details (database schema, API response formats). These sections are context for developers, not instructions for QA.
>
> For this exercise, treat the following sections as testable:
> - Section 3: State Machine and Transition Matrix
> - Section 4: Edge Case Matrix
> - Section 5: Gherkin Acceptance Criteria
> - Section 6: User Interface Specifications
>
> Do not write test cases against Section 1 (Rationale), Section 2.1 (database schema), or Section 2.2 (API endpoints and JSON response formats). Those sections tell you what the system is built on, not what a user should be able to do and observe.

---

## 1. What this feature does

CMMA is a construction workforce management platform. Workers are assigned to construction projects for a period of time - for example, a Concrete worker might be assigned to a hospital project from February to October.

A Project Manager (PM) is responsible for a project and its schedule. A Workforce Manager (WFM) is responsible for allocating workers across projects. In CMMA, the WFM is the person who creates and changes assignments. The PM can see assignments but is not permitted to change them directly.

This feature gives PMs a way to formally request a change to an assignment - for example, to move a worker''s start date by one day because the pour schedule has changed. The PM submits a change request from the assignment detail panel. That request then goes to the WFM for review. The WFM can accept or reject it.

The approval mechanism works in two ways. The WFM can act from inside the application, via a widget that appears on their landing page and shows all pending requests. They can also act directly from a link in an email notification that is sent to them when the request is submitted. Email links expire after 7 days.

When the WFM accepts a request, the assignment is updated to the proposed dates. When they reject it, the assignment stays unchanged and the PM is notified. The PM can also withdraw their own request before the WFM acts on it, and a System Admin can withdraw any request.

Three situations require extra confirmation before an approval goes through. First, if the proposed dates would overlap with another project the same worker is already assigned to (a scheduling conflict), the WFM must explicitly confirm they want to override the conflict. Second, if the proposed end date is later than the project''s official end date, the WFM must confirm whether to extend the project''s end date to match. Third, if the proposed start date is more than seven days in the past, only a System Admin can approve it.

---

## 2. Spec extract

The following sections are taken from `specs/epic-assignments/feat-assignment-change-request-approval/Spec.md`. These are the testable sections. Read all four before starting your TestBoundary.

---

### Section 3 - State Machine and Transition Matrix

A change request can be in one of four states: Pending, Approved, Rejected, or Cancelled.

A newly submitted request is always Pending. While Pending, the system evaluates four conditions:
- No conflicts and no boundary issues - the request is "clean" and the WFM can accept it directly
- The proposed worker is already booked on another project during the overlapping dates - a scheduling conflict is detected
- The proposed end date is later than the project end date - a project extension is required
- The proposed start date is more than seven days in the past - a historic lockout is triggered

The request stays Pending until the WFM or System Admin acts on it, or until the PM withdraws it, or until the underlying assignment is deleted.

**Transition matrix**

| Current state | Event | Who can trigger it | Condition that must be met | Next state | What happens as a result |
|---|---|---|---|---|---|
| Pending | Accept (direct) | Workforce Manager or email token | No conflicts, within project boundary, not locked | Approved | Assignment is updated to proposed dates; tokens are invalidated; approval email sent to the PM |
| Pending | Accept with conflict override | Workforce Manager | Override conflict confirmed; user has conflict override permission | Approved | Assignment is updated; conflict override recorded; approval email sent |
| Pending | Accept and extend project | Workforce Manager | Extend project end date confirmed | Approved | Project end date updated to match; assignment updated; approval email sent |
| Pending | Accept with historic lockout override | System Admin only | Override historic lockout confirmed; user must be a System Admin | Approved | Past-dated assignment updated; lockout override recorded; approval email sent |
| Pending | Reject | Workforce Manager | Reviewer comment captured or left blank | Rejected | Tokens invalidated; rejection email sent to the PM |
| Pending | Withdraw | Project Manager who submitted the request | The withdrawing user is the same person who submitted | Cancelled | Tokens invalidated; pending indicator removed from the assignment |
| Pending | Underlying assignment deleted | System | The original assignment is cancelled or deleted | Cancelled | Reviewer comment set to indicate the underlying assignment was deleted |

---

### Section 4 - Edge Case Matrix

| Edge case | Condition | System behaviour |
|---|---|---|
| Pursuit or Draft project | The project status is Pursuit or Draft at the time of approval | Approval is blocked. Message shown: "Cannot approve workforce assignment on a Pursuit project. Move project to Active status once contract is executed." |
| Worker assigned to the assignment being changed | The proposed worker is the same person currently on the assignment (dates are being adjusted, not the worker) | No self-collision is flagged. The system correctly excludes the current assignment from the conflict check and shows no conflict warning. |
| Real external overlap | The proposed worker has an active assignment on a different project during the overlapping dates | A date-by-date conflict breakdown is shown. The WFM must explicitly confirm override to proceed. |
| Expired email action link | The email link is clicked more than seven days after the request was submitted | If the WFM is not logged in, they are redirected to login and then to the landing page, where the request is shown. If they are logged in, they are taken directly to the landing page. A toast message is shown: "This action link has expired (valid for 7 days). The request can still be reviewed below." The assignment detail panel opens automatically. |
| Already resolved request | The email link is clicked after the request has already been approved or rejected | A dedicated screen is shown with the name of the person who resolved it and the date and time it was resolved. |
| Archived or inactive worker | The proposed worker''s account is archived between the time the request was submitted and the time it is approved | Approval is blocked. Message shown: "Cannot approve: Proposed resource is inactive or archived." |
| Two managers approve at the same time | Two WFMs click Accept at exactly the same moment | The first one to complete gets the approval. The second receives a message: "Change request is already resolved." |

---

### Section 5 - Gherkin Acceptance Criteria

```gherkin
Feature: Assignment Change Request Approval Workflow

  Background:
    Given a tenant exists with an active business calendar
    And an active project "Meals on Wheels" exists with end date "2026-10-01"
    And an assignment exists for worker "Cody Kessler" from "2026-02-09" to "2026-10-01"
    And a pending change request exists proposing dates "2026-02-10" to "2026-10-01"

  Scenario: Workforce Manager approves a valid change request in-app
    Given the Workforce Manager is authenticated with assignment approval permission
    When the manager views the assignment detail panel for the assignment
    Then the panel displays a comparison banner showing the proposed dates "2026-02-10" to "2026-10-01"
    When the manager clicks "Accept Changes"
    Then the change request status becomes Approved
    And the assignment start date is updated to "2026-02-10"
    And an approval notification is sent to the requesting Project Manager

  Scenario: Approval blocked when proposed worker has an active conflict on another project
    Given worker "Cody Kessler" has an active assignment on a different project until "2026-02-27"
    When the Workforce Manager clicks "Accept Changes"
    Then the system shows a "Scheduling Conflict Detected" modal
    And the modal lists the overlapping dates from "2026-02-10" to "2026-02-27"
    When a manager with conflict override permission clicks "Override and Accept"
    Then the assignment is updated and the conflict override is recorded

  Scenario: Automatic extension of project end date upon approval
    Given the change request proposes an end date of "2026-11-15" which is later than the project end date of "2026-10-01"
    When the Workforce Manager clicks "Accept Changes"
    Then a modal asks "Extend Project End Date?"
    When the manager confirms by clicking "Extend Project and Accept"
    Then the project end date is updated to "2026-11-15"
    And the assignment end date is updated to "2026-11-15"

  Scenario: Expired email action link fallback
    Given an email action link was created 8 days ago
    When the Workforce Manager clicks the Accept link in their email
    Then the system redirects to the landing page
    And a toast message is shown: "This action link has expired (valid for 7 days). The request can still be reviewed below."
    And the assignment detail panel opens automatically
```

---

### Section 6 - User Interface Specifications

**Landing page widget**

The Assignment Change Requests widget appears on the Workforce Manager''s landing page. It is positioned directly below the Conflicts section and directly above the Bench Resources section. It displays a table with one row per pending request. Each row shows the worker''s name, their trade, the proposed date range, the project name, and a Review link. Clicking the Review link opens the assignment detail panel for that request.

**Assignment detail panel - comparison banner**

When a pending change request exists on an assignment, the assignment detail panel shows a banner at the top. The banner uses an amber colour to indicate that it requires attention.

The banner contains:
- A header reading "CHANGE REQUEST PENDING REVIEW" with the requester''s name on the right
- A side-by-side comparison showing the current worker and dates against the proposed worker and dates
- The PM''s written justification in a quoted style
- One or more alert badges if any of the following conditions apply:
  - Amber badge: "Scheduling Conflict / Time-Off Detected"
  - Blue badge: "Extends Project End Date"
  - Grey badge: "Historic Lockout Threshold"
- Two buttons: a red Reject button that opens a rejection comment dialog, and a green or amber Accept Changes button that either completes the action immediately (if no conflicts exist) or opens a confirmation modal first

---

## 3. What you are asked to produce

You must produce two documents.

**Document 1 - TestBoundary**

A completed TestBoundary document for the Assignment Change Request Approval feature. Your TestBoundary must contain all of the sections used in the format reference. Key sections to complete carefully are:

- The feature reference block (epic name, feature name, spec file path)
- The input layer inventory - note that this exercise provides four testable sections of one spec document. Note any sections you did not receive (Rationale, Architecture, business logic scenarios, and developer test files are not provided in this exercise)
- The environment section - since you do not have access to a live system, note what you would need and mark the primary URL as NOT CONFIRMED
- Authentication - this feature involves three distinct roles with different permissions: a Project Manager who can submit and withdraw requests, a Workforce Manager who can approve or reject, and a System Admin who can approve past-dated changes and withdraw any request. Describe what test accounts are required for each role and mark credentials as NOT CONFIRMED
- Email action links - this feature sends emails with time-limited action links. Describe what you would need to test the email path and clearly mark every test case that depends on receiving a real email as MANUAL ONLY
- Test data - describe the pre-existing state the system must be in before each scenario can be tested (for example, a pending change request must exist before the approval or rejection path can be tested, and no pending request may exist on the same assignment when testing submission)
- Known limitations - record anything the spec leaves unclear, and flag the email path as a dependency on email infrastructure access
- The boundary coverage map - for each major area (in-app approval, in-app rejection, withdrawal, email link approval, expired link fallback, conflict override, project extension, historic lockout, concurrent approval), state whether it is testable from a browser session, testable from documents alone, or requires something outside a browser (such as inbox access or a second simultaneous session)

**Document 2 - Test cases**

A set of test cases derived from your TestBoundary. Each test case must have a unique identifier, a precondition, a step sequence, and an expected result. Cover the following areas:

- In-app acceptance with no conflicts (happy path)
- In-app rejection
- Conflict detection and override
- Project end date extension
- Historic lockout (note that only a System Admin can approve in this case)
- Expired email link fallback
- Already-resolved request link
- Withdrawal by the original requester
- Withdrawal blocked for a different user
- A Pursuit or Draft project blocking approval
- The self-collision false positive (worker assigned to the same assignment should not appear as a conflict)
- Concurrent approval (two managers acting simultaneously)

---

## 4. Where to start

Read all four extracted sections before writing anything. Then read them a second time, this time noting the actor for each behaviour - who triggers it, and who is blocked from triggering it. The permission boundaries in this feature are a major source of test cases.

When you write your TestBoundary, separate the scenarios that require only a browser session from those that require inbox access. The email path (clicking an action link in an actual received email) is a different kind of test from everything else and needs to be flagged clearly.

Pay close attention to the transition matrix. Every row is a potential test case. For each row, ask: what precondition must exist, who performs the action, and what should change after the action completes?

The edge case matrix adds seven more scenarios on top of the transition matrix. Some of these are boundary conditions (the seven-day historic lockout threshold, the project status guard). Some require a specific sequence of events to set up (the concurrent approval case). Note in your TestBoundary which of these require two simultaneous user sessions to test.

When writing test cases, start with the clean happy path (no conflicts, no extensions), then add each complicating factor as a separate test case. Do not combine the conflict override and the project extension into a single test case. Keep each test case focused on one condition.

The spec says a WFM can reject a request and leave the comment field blank. Make a note in your Known Limitations that the spec does not clearly state what the PM''s rejection notification looks like when no comment is provided.

---

## 5. Reviewer checklist

Use this checklist to evaluate a submission. Do not share it with the trainee before they submit.

**TestBoundary**

- [ ] The input layer inventory correctly identifies the four testable sections and notes Rationale, Architecture, developer tests, and frontend component files as NOT PROVIDED in this exercise
- [ ] The authentication section correctly identifies three roles with meaningfully different permissions - PM submits and withdraws own requests only; WFM approves or rejects; System Admin approves past-dated changes and can withdraw any request
- [ ] The email section is present, correctly flags all email-path scenarios as MANUAL ONLY, and describes what would be needed (inbox access, a readable email with valid action links, a link older than seven days to test expiry)
- [ ] The test data section accounts for the dependency ordering - a pending request must exist before approval or rejection can be tested, and that pending request must be cleaned up after the test run
- [ ] The concurrent approval scenario is noted as requiring two simultaneous authenticated sessions and is flagged accordingly
- [ ] The self-collision false positive is included and its distinction from a real conflict is explained - this is a "should NOT show a conflict" case, not a "should show a conflict" case
- [ ] The Pursuit-or-Draft project case is present and the correct error message is noted
- [ ] The historic lockout case names the System Admin as the only role permitted to approve
- [ ] Known limitations includes at least: what the rejection notification looks like when the comment field is left blank, whether a WFM who did not create the original assignment can still see and act on the change request, what happens to pending tokens when the underlying assignment is deleted (Cancelled state), and whether the landing page widget shows a count badge
- [ ] The boundary coverage map correctly separates browser-testable scenarios from email-dependent scenarios from concurrent-session scenarios

**Test cases**

- [ ] At least one test case for each of the four Gherkin scenarios
- [ ] At least one test case for each row in the transition matrix
- [ ] At least one test case for each row in the edge case matrix
- [ ] The clean happy path (no conflicts, no extensions) is a standalone test case
- [ ] The conflict override is a standalone test case that includes the step where the WFM must explicitly confirm the override - not just the final outcome
- [ ] The project extension is a standalone test case with the confirmation modal step included
- [ ] The historic lockout test case correctly names the System Admin as the actor, not a Workforce Manager
- [ ] Withdrawal is tested with at least two actors: the original requester (should succeed) and a different user (should fail)
- [ ] The expired link fallback test case notes the toast message text precisely and notes that the assignment panel opens automatically
- [ ] The already-resolved link test case verifies that the correct resolution information (who resolved it and when) is displayed
- [ ] All test cases that depend on email receipt are marked MANUAL ONLY
- [ ] The concurrent approval test case is marked as requiring two simultaneous authenticated sessions
- [ ] The self-collision test case verifies a negative outcome - that no conflict warning appears when the proposed worker is the same as the current assigned worker and only dates are changing
- [ ] Each test case has a distinct identifier, a clear precondition, numbered steps, and a specific expected result
