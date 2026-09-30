**# QA Training Exercise 5 - Effective Date Reassign and Unassign (Complex)**

**\*\*Difficulty:\*\*** Complex  

**\*\*Source spec:\*\*** \`specs/epic-assignments/feat-effective-date-reassign-unassign/Spec.md\`  

**\*\*Deliverables:\*\*** A TestBoundary document, then a set of test cases  

**\*\*Format references:\*\*** See an existing \`TestBoundary.md\` in any feature folder under \`specs/\` for the layout your TestBoundary must follow. See an existing \`TestSpec.md\` in any feature folder for the test case format.

\> **\*\*Execution against a running environment:\*\*** This exercise CAN be executed against a running environment, but setup is non-trivial. All primary scenarios require a real assignment with a start date in the past (\`startDate < today\`). This cannot be created from the UI during the same test session - the assignment must either be pre-seeded or have been created in a prior session. The OCC version field required by the API must be retrieved from a fresh GET before each API call.

**\*\*Why this is Complex:\*\*** Three acceptance criteria, but the business logic beneath them is deeply intertwined. The feature has three separate UI entry points that must each be tested independently. It covers two distinct operations (Unassign and Reassign) with different downstream outcomes. The core mechanic - splitting an assignment at an effective date - requires the tester to verify not one but two resulting records: the preserved historical segment and the new future segment or open slot. The API requires an OCC version field that changes after every mutation, creating a sequencing dependency between test cases. The feature interacts with the conflict detection and historic lockout override logic from the assignment approval feature. A future assignment (startDate >= today) follows a completely different path and must be tested separately. Any error in the effective date boundary calculation produces a wrong split that may not be visible from the Gantt chart without reading the underlying records directly via API.

\---

**## 1. What this feature does**

CMMA is a construction workforce management platform. Workers are assigned to construction projects for defined date ranges - for example, an Ironworker might be assigned to a bridge project from 1 June to 30 November.

Assignments often span months. When a manager needs to remove a worker from an in-progress assignment (one that started before today), they cannot simply delete it: deleting would erase the worker's historical allocation records up to the present day. The same problem applies when swapping a worker out partway through an assignment.

This feature introduces an **\*\*Effective Date\*\*** mechanism for Unassign and Reassign operations on in-progress assignments. When a manager initiates either action on an assignment that started in the past, the system requires them to choose an effective date. The date determines where the assignment is split:

\- The **\*\*historical segment\*\*** (\`[originalStartDate, effectiveDate - 1 day]\`) is preserved. The original worker stays on record for those days.

\- The **\*\*future segment\*\*** (\`[effectiveDate, originalEndDate]\`) is released:

  - For **\*\*Unassign\*\***: the future segment becomes an open labor request slot that dispatchers can fill later.

  - For **\*\*Reassign\*\***: the future segment is immediately assigned to the replacement worker.

The effective date defaults to today but can be set to any date within the assignment's range. If the manager sets the effective date equal to the assignment's original start date, the entire assignment is replaced with no historical segment preserved, and the system requires explicit acknowledgement before proceeding.

For assignments that have not yet started (startDate >= today), neither operation requires an effective date - the full assignment is replaced immediately.

The manager can initiate these operations from three places: the Gantt chart right-click context menu, the assignment details slide-out drawer, and the Worker Assignments list tab on a worker profile.

\---

**## 2. Spec extract**

The following is taken from \`specs/epic-assignments/feat-effective-date-reassign-unassign/Spec.md\`. Read this section carefully before starting your TestBoundary.

\---

**### Acceptance Criteria**

**\*\*AC-1 - Unassign an in-progress assignment\*\***

Given an assignment from \`2026-08-01\` to \`2026-08-31\` with worker Dario Vasquez.

When the scheduler clicks "Unassign" on \`2026-08-16\`.

Then the system requires choosing an Effective Date, with \`2026-08-16\` (today) as the default.

Upon confirmation, Dario Vasquez remains assigned for \`2026-08-01\` to \`2026-08-15\`, and an open labor request slot is generated for \`2026-08-16\` to \`2026-08-31\`.

**\*\*AC-2 - Reassign an in-progress assignment\*\***

Given an assignment from \`2026-08-01\` to \`2026-08-31\` with worker Dario Vasquez.

When the scheduler clicks "Reassign" on \`2026-08-16\` and selects Elena Thornton as the replacement with Effective Date \`2026-08-16\`.

Then Dario Vasquez is retained for \`2026-08-01\` to \`2026-08-15\`, and Elena Thornton is assigned for \`2026-08-16\` to \`2026-08-31\`.

**\*\*AC-3 - Future assignment pass-through\*\***

Given an assignment with startDate >= today.

When Unassign or Reassign is clicked.

Then the system executes a standard full unassign or reassign without displaying an effective date picker.

\---

**### Business rules and logic**

**\*\*Trigger condition\*\***

The effective date mechanism activates only when \`assignment.startDate < today\`. When this condition is false, the operation proceeds as a standard full unassign or reassign without a date picker.

**\*\*Date constraints\*\***

\- The effective date must fall within the assignment's date range: \`startDate <= effectiveDate <= endDate\`

\- The effective date defaults to today

\- If today is after the assignment's end date (expired assignment), the effective date defaults to the assignment's start date

**\*\*Execution outcomes\*\***

\| Segment | Date range | Worker | What happens |

\|---|---|---|---|

\| Historical (preserved) | \`[startDate, effectiveDate - 1 day]\` | Original worker | Original assignment updated: \`endDate = effectiveDate - 1 day\`, \`version = version + 1\` |

\| Future - Unassign | \`[effectiveDate, endDate]\` | None | New open \`laborRequest\` created in OPEN status |

\| Future - Reassign | \`[effectiveDate, endDate]\` | Replacement worker | New assignment created for the replacement |

**\*\*Edge case - effective date equals assignment start date\*\***

If the manager selects the assignment's original start date as the effective date:

\- No historical segment is preserved

\- The entire assignment is unassigned or reassigned from day one

\- The system requires explicit user acknowledgement before proceeding

\---

**### API contract**

The feature uses a single atomic endpoint:

\`\`\`

POST /api/workforce/scheduling/assignments/\:id/split

\`\`\`

**\*\*Payload\*\***

\`\`\`json

{

  "splitMode": "date",

  "splitDate": "2026-08-16",

  "version": 3,

  "targetWorkerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",

  "overrideConflict": false,

  "overrideHistoricLockout": false

}

\`\`\`

\| Field | Type | Required | Description |

\|---|---|---|---|

\| \`splitMode\` | \`"date"\` | Yes | Always \`"date"\` for this feature |

\| \`splitDate\` | string (ISO date) | Yes | The effective date where the split occurs |

\| \`version\` | integer | Yes | Current OCC version of the assignment - must match the database or the API returns 409 |

\| \`targetWorkerId\` | UUID / null | No | Replacement worker ID for Reassign. Omit or null for Unassign. |

\| \`overrideConflict\` | boolean | No | Set \`true\` when the replacement worker has a conflict and the manager has confirmed override |

\| \`overrideHistoricLockout\` | boolean | No | Set \`true\` to override the historic lockout when \`splitDate\` is more than 7 days in the past |

**\*\*Execution flow inside the API\*\***

1\. Validates the OCC \`version\` field. Returns \`409 Conflict\` if it does not match the current database value.

2\. Updates the original assignment: sets \`endDate = splitDate - 1 day\`, increments \`version\`.

3\. For Reassign: creates a new assignment for \`targetWorkerId\` spanning \`[splitDate, originalEndDate]\`.

4\. For Unassign: creates an open \`laborRequest\` spanning \`[splitDate, originalEndDate]\`.

5\. Writes audit log entry \`SPLIT\_ASSIGNMENT\` with actor, effective date, and segment boundaries.

\---

**### UI component touchpoints**

Three separate UI surfaces trigger the effective date flow.

**\*\*Entry Point 1 - Gantt chart right-click context menu\*\***

Right-click an assignment bar on the Gantt timeline and select "Unassign" or "Reassign" from the context menu.

**\*\*Entry Point 2 - Assignment details slide-out drawer\*\***

Open the assignment detail drawer for an in-progress assignment and use the Unassign or Reassign action buttons inside the drawer.

**\*\*Entry Point 3 - Worker Assignments list tab\*\***

On a worker's profile page, navigate to the Assignments tab. Each assignment row has action options including Unassign and Reassign.

**\*\*Unassign flow (in-progress assignment)\*\***

\`\`\`

Click "Unassign"

  --> UnassignConfirmationModal opens

        Effective date picker: min=startDate, max=endDate, default=today

        Preview badges:

          [Preserved History: startDate -> effectiveDate - 1 day]

          [Unassigned Remainder: effectiveDate -> endDate]

        User selects date and confirms

  --> POST /api/workforce/scheduling/assignments/\:id/split (no targetWorkerId)

\`\`\`

**\*\*Reassign flow (in-progress assignment)\*\***

\`\`\`

Click "Reassign"

  --> ReassignEffectiveDateModal opens

        User chooses effective date

        User confirms date

  --> FillOpenRequestDrawer opens

        Candidate list filtered against [effectiveDate, endDate]

        User selects replacement worker

        User confirms

  --> POST /api/workforce/scheduling/assignments/\:id/split (with targetWorkerId)

\`\`\`

**\*\*Future assignment (startDate >= today)\*\***

Both operations bypass these modals and proceed as standard full unassign or reassign.

\---

**### Edge case matrix**

\| Edge case | Condition | System behaviour |

\|---|---|---|

\| Effective date equals assignment start date | Manager sets the effective date to the assignment's original start date | System requires explicit acknowledgement - the modal warns no historical record will be preserved. On confirm, the full assignment is replaced with no historical segment. |

\| Future assignment pass-through | \`assignment.startDate >= today\` | No effective date picker is shown. Full unassign or reassign proceeds immediately. |

\| OCC version mismatch | The \`version\` field sent to the API does not match the current database value | API returns \`409 Conflict\`. The user must re-read the assignment to retrieve the current version before retrying. |

\| Replacement worker has a scheduling conflict | The replacement worker (\`targetWorkerId\`) has an active assignment on another project overlapping \`[splitDate, endDate]\` | System shows a conflict warning. The manager must explicitly confirm override (\`overrideConflict: true\`) to proceed. |

\| Split date is more than 7 days in the past | \`splitDate < today - 7 days\` | The \`overrideHistoricLockout: true\` flag is required. Only a System Admin can approve a lockout override. A Workforce Manager attempting this without the flag receives a blocked response. |

\---

**### State behaviour notes**

\- After a successful split, the original assignment record has its \`endDate\` set to \`splitDate - 1 day\` and its \`version\` incremented by 1. The original record is not deleted.

\- For Unassign, a new \`laborRequest\` in OPEN status is created covering \`[splitDate, originalEndDate]\`. This slot appears in the dispatch queue.

\- For Reassign, a new assignment is created for the replacement worker covering \`[splitDate, originalEndDate]\`.

\- Verifying the outcome requires reading both the original (shortened) assignment AND the new record. Reading only the Gantt view may not show both segments without a page reload.

\- The \`version\` field increments by 1 after every successful write. Sequential test cases operating on the same assignment must re-read the assignment between operations to obtain the current version.

\---

**## 3. What you are asked to produce**

You must produce two documents.

**\*\*Document 1 - TestBoundary\*\***

A completed TestBoundary document for the Effective Date Reassign and Unassign feature. Your TestBoundary must contain all of the sections used in the format reference. Key sections to complete carefully are:

\- The feature reference block (epic name, feature name, spec file path)

\- The input layer inventory, listing each spec section you used and noting which ones you did not find (Rationale and Architecture are not provided in this exercise - note those as NOT FOUND)

\- The environment section - note the requirement for a real in-progress assignment (startDate < today). Mark all URLs as NOT CONFIRMED. Note explicitly that creating an in-progress assignment from the UI is not possible within the same test session.

\- Authentication - describe the accounts required. Standard Unassign and Reassign require a Workforce Manager or Dispatcher with scheduling permissions. The historic lockout override requires a System Admin. Describe what accounts are needed for each scenario.

\- Entry points - list all three UI surfaces separately and note that all three must be tested independently. Record any known constraint on the Gantt right-click path (synthetic mouse events may not work for context menu interactions in automation).

\- The OCC version dependency - record clearly that \`version\` must be fetched from the assignment before each API call, and that sequential test cases on the same assignment must include a re-read step between operations.

\- Test data - describe every pre-existing record required: an active project, a labor request, an in-progress assignment with startDate before today, and a second available worker without scheduling conflicts for Reassign tests.

\- Known limitations - record at minimum: whether the Gantt bar visually shortens after a split without a page reload, whether the new open labor request appears immediately in the dispatch queue, whether a split date equal to the end date is valid, what happens if the same assignment is split twice, and whether the historic lockout threshold is configurable per tenant.

\- The boundary coverage map - for each major area (Unassign in-progress from three entry points, Reassign in-progress from three entry points, future pass-through for both operations, start-date boundary acknowledgement, OCC mismatch, conflict override, historic lockout), state whether the scenario is browser-testable or requires direct API access for outcome verification.

**\*\*Document 2 - Test cases\*\***

A set of test cases derived from your TestBoundary. Each test case must have a unique identifier, a precondition, a step sequence, and an expected result. Cover at least the following areas:

\- Unassign an in-progress assignment via the assignment details drawer (happy path)

\- Unassign an in-progress assignment via the Gantt right-click menu

\- Unassign an in-progress assignment via the Worker Assignments list tab

\- Verify split outcome after Unassign: original assignment shortened to effectiveDate - 1, open slot created for [effectiveDate, originalEndDate]

\- Reassign an in-progress assignment via the assignment details drawer

\- Verify split outcome after Reassign: original shortened, new assignment for replacement covering [effectiveDate, originalEndDate]

\- Unassign a future assignment (no date picker, full removal)

\- Reassign a future assignment (no date picker, full replacement)

\- Effective date set to the assignment's start date (acknowledgement required, no historical segment)

\- OCC version mismatch (API returns 409, user re-reads and retries)

\- Reassign with the replacement worker having a scheduling conflict (override required)

\- Historic lockout: split date more than 7 days in the past, Workforce Manager blocked; System Admin succeeds

\---

**## 4. Where to start**

Read the full spec extract before writing anything. Read it twice. The first time, follow the user's perspective: what does the manager click, what modal appears, what do they confirm? The second time, follow the data: what records are created or modified after each operation, and how do you verify each one?

Before writing any test case, map out your test data dependency chain. You need: an active project, a labor request on that project, and an assignment on that request with a start date before today. Write this as a numbered setup sequence in your TestBoundary test data section. Note that you cannot create an in-progress assignment from the UI during the same test session - the test session must either use pre-existing data or coordinate with a database administrator to seed the assignment.

For the three entry points, treat each as a separate test case with the same expected result. Do not collapse them into one test case with a note saying "repeat for the other entry points". The Gantt right-click path carries a specific risk in automation (context menu interactions may not respond to synthetic events) - note this as a known limitation and confirm the path works manually before including it in your automated suite.

The most important thing in every split test case is the verification step. Checking the Gantt visually is not sufficient. Your expected result must state:

1\. The original assignment's new end date

2\. The original assignment's new version number

3\. For Unassign: the open labor request's date range

4\. For Reassign: the new assignment's worker ID and date range

Steps 2, 3, and 4 require a direct API call to verify. Note this in your boundary coverage map.

The OCC version sequencing dependency is the most common cause of test failures when multiple test cases share the same assignment. Plan your test sequence so that each test case that modifies the assignment includes an explicit step to re-read the assignment and retrieve the current version before submitting the split call.

\---

**## 5. Reviewer checklist**

Use this checklist to evaluate a submission. Do not share it with the trainee before they submit.

**\*\*TestBoundary\*\***

\- [ ] The input layer inventory correctly lists the three acceptance criteria and the business rules matrix, and notes Rationale and Architecture as NOT PROVIDED

\- [ ] The environment section correctly identifies that a real in-progress assignment is required and cannot be created from the UI within the same test session

\- [ ] All three UI entry points are listed separately in the coverage map with notes on any automation constraints for the Gantt right-click path

\- [ ] The OCC version dependency is explicitly recorded: the version field must be fetched before each API call, and sequential test cases on the same assignment must re-read between operations

\- [ ] The test data section describes all pre-existing records: active project, labor request, in-progress assignment with startDate in the past, and a second available worker for Reassign

\- [ ] The "effective date equals start date" edge case is correctly described: explicit acknowledgement required, no historical segment produced, full replacement from day one

\- [ ] The historic lockout edge case names the System Admin as the only actor who can send \`overrideHistoricLockout: true\`, and notes that a Workforce Manager attempting the same operation is blocked

\- [ ] Known limitations includes at least: Gantt visual update without page reload, immediate visibility of the open slot in the dispatch queue, validity of a split date equal to the end date, and what happens if the endpoint is called twice on the same assignment with a stale version

\- [ ] The boundary coverage map correctly identifies the outcome verification steps as requiring a direct API read (GET assignment) after each split, not just a UI observation

**\*\*Test cases\*\***

\- [ ] At least one test case for each of the three acceptance criteria

\- [ ] At least one test case for each row in the edge case matrix

\- [ ] The Unassign happy path test case includes a verification step that reads both the shortened original assignment (end date and version) AND the new open labor request (date range and status)

\- [ ] The Reassign happy path test case includes a verification step that reads the shortened original AND the new assignment record for the replacement worker, verifying both the worker ID and the date range

\- [ ] The three Unassign entry point test cases (drawer, Gantt, Worker Assignments list) are written as three separate test cases, each with its own precondition and steps, not combined

\- [ ] The future assignment pass-through test cases for Unassign and Reassign each verify that no effective date picker is shown

\- [ ] The "effective date equals start date" test case includes the explicit acknowledgement step as a numbered step, not a parenthetical note, and verifies that no record with the original start date and original worker remains

\- [ ] The OCC version mismatch test case includes the step of intentionally submitting an incorrect version, verifies the 409 response, and then shows the recovery path (re-read, retry with correct version)

\- [ ] The conflict override test case includes: the step where the conflict warning appears, the step where the manager explicitly confirms override, and a verification that the new assignment is created with the conflict override recorded

\- [ ] The historic lockout test case includes two actors: one for Workforce Manager (blocked) and one for System Admin (succeeds) - these are two separate test cases or clearly separated sub-cases

\- [ ] Each test case has a distinct identifier, a clear precondition, numbered steps, and a specific expected result

\- [ ] Test cases that split an assignment note the cleanup requirement: the assignment must be restored to its pre-test state (or replaced by a fresh seed) before subsequent runs

---

# 6. API Performance Requirements

> These requirements are additional to the existing functional requirements. The functional requirements above are preserved unchanged.

## 6.1 Scope

Performance testing shall cover:
- Assignment GET/read API used to obtain the current OCC `version`.
- `POST /api/workforce/scheduling/assignments/:id/split` for Unassign.
- `POST /api/workforce/scheduling/assignments/:id/split` for Reassign.
- APIs used to retrieve the resulting labor request or replacement assignment.
- Replacement-worker conflict detection APIs.
- Audit-related APIs, where exposed.

Performance tests must validate both response time and resulting data correctness.

## 6.2 Performance environment prerequisites

The performance environment shall document:
- Application/API version.
- Database type/version.
- Number and configuration of API instances.
- CPU and memory allocated to application instances.
- Database CPU, memory, storage, and connection-pool configuration.
- Network/gateway configuration.
- Authentication configuration.
- Rate limits.
- Background jobs that can affect assignment, labor-request, or audit processing.
- Approximate production-equivalent data volume.

Performance results shall identify any material difference between the test and production environments.

## 6.3 Performance test-data prerequisites

The performance dataset shall contain:
1. Active projects.
2. Labor requests.
3. In-progress assignments where `startDate < today`.
4. Future assignments where `startDate >= today`.
5. Available replacement workers without conflicts.
6. Replacement workers with known scheduling conflicts.
7. Enough independent assignments for concurrent users.

Normal-load tests should use independent assignments. A shared assignment shall be used specifically for OCC contention testing.

## 6.4 Proposed API response-time targets

These are initial proposed targets because the existing functional specification does not define API SLOs. Product/API owners shall confirm them before using them as release gates.

| API | p50 | p95 | p99 |
|---|---:|---:|---:|
| GET assignment/current version | <= 300 ms | <= 750 ms | <= 1,500 ms |
| POST split - Unassign | <= 500 ms | <= 1,000 ms | <= 2,000 ms |
| POST split - Reassign | <= 750 ms | <= 1,500 ms | <= 3,000 ms |
| GET resulting labor request | <= 300 ms | <= 750 ms | <= 1,500 ms |
| GET resulting assignment | <= 300 ms | <= 750 ms | <= 1,500 ms |
| Conflict detection | <= 500 ms | <= 1,000 ms | <= 2,000 ms |

## 6.5 Throughput measurements

Each k6 run shall report:
- Requests per second.
- Successful requests per second.
- Failed requests per second.
- Average response time.
- p50, p90, p95, and p99 latency.
- HTTP status-code distribution.
- Timeout count.
- Connection errors.
- Application CPU/memory.
- Database CPU/memory.
- Database connection-pool usage.

Expected and peak RPS shall be supplied by the product/API owner or derived from production traffic before formal capacity acceptance.

## 6.6 Required k6 workload profiles

### Baseline
Validate normal expected traffic and establish latency/throughput baselines.

### Peak
Validate expected peak scheduling traffic while remaining within agreed latency/error thresholds.

### Stress
Increase load beyond peak to identify the sustainable capacity limit, bottleneck, and graceful-degradation behavior.

### Soak
Run representative load for an extended duration to detect memory leaks, connection leaks, queue growth, and progressive latency degradation.

### OCC contention
Multiple VUs intentionally operate on the same assignment/version to validate concurrent mutation behavior. This is separate from normal-load testing.

## 6.7 OCC performance requirements

For every split mutation:
1. Obtain the current assignment using GET.
2. Extract the current `version`.
3. Submit the split using that version.
4. Stale versions shall return `409 Conflict`.
5. A rejected OCC request shall not mutate the assignment.
6. A successful split shall increment the assignment version exactly once.
7. Concurrent operations shall not create duplicate future records.

The OCC test shall report:
- Total conflicts.
- Conflict rate.
- Successful mutation rate.
- Retry success rate.
- Successful-request p95/p99.
- Conflict-response p95/p99.

## 6.8 API error and reliability requirements

Under normal and peak load:
- Unexpected HTTP 5xx responses shall remain within the approved error budget.
- Unexpected timeouts shall remain within the approved error budget.
- Expected `409 Conflict` responses in the dedicated OCC scenario shall be reported separately.
- The API shall never return success when the requested split was not committed.

Initial proposed k6 threshold:

```text
http_req_failed < 1%
```

This is a proposed threshold and requires confirmation.

## 6.9 Atomicity and data-integrity requirements under load

For successful Unassign:

```text
Original assignment:
[startDate, effectiveDate - 1 day]

AND

OPEN labor request:
[effectiveDate, originalEndDate]
```

For successful Reassign:

```text
Original assignment:
[startDate, effectiveDate - 1 day]

AND

Replacement assignment:
[effectiveDate, originalEndDate]
```

Performance testing shall detect:
- Original assignment shortened but future record missing.
- Future record created but original not shortened.
- Duplicate labor requests.
- Duplicate replacement assignments.
- Incorrect segment dates.
- Incorrect worker ID.
- Incorrect version.
- Missing or duplicate audit entries.

## 6.10 End-to-end API workflow performance

Because OCC requires a fresh read, measure the complete workflow:

```text
GET assignment
    ↓
Read version
    ↓
POST split
    ↓
GET resulting state
```

Report both individual API timings and total workflow latency.

## 6.11 Conflict-detection performance

Test both:
- Replacement workers with no overlap.
- Replacement workers with an overlapping assignment.

Conflict detection shall evaluate `[splitDate, endDate]` and return deterministic results under load.

## 6.12 Historic-lockout performance

Include requests where:

```text
splitDate < today - 7 days
```

Verify:
- Workforce Manager requests are blocked.
- System Admin override requests can succeed.
- Blocked requests do not mutate data.
- Lockout validation remains within agreed latency targets.

## 6.13 Audit logging performance

A successful split writes `SPLIT_ASSIGNMENT`.

Performance testing shall verify:
- Audit processing does not cause unacceptable split latency.
- Each successful split produces the expected audit record.
- Duplicate audit records are not created.
- Sustained load does not create an uncontrolled audit backlog.

If audit logging is asynchronous, the expected audit-availability delay shall be documented and measured separately.

## 6.14 Database performance requirements

Monitor:
- Query latency.
- CPU.
- Memory.
- Connection-pool utilization.
- Lock waits.
- Deadlocks.
- Transaction duration.
- Slow queries.
- Storage I/O.
- Connection exhaustion.

Concurrent split operations require particular attention because the workflow updates the original assignment and creates a dependent record atomically.

## 6.15 Scalability requirements

Measure performance at:
- Normal expected concurrency.
- Peak expected concurrency.
- 2x peak concurrency where feasible.
- Stress levels above peak.

Determine:
- Maximum sustainable RPS.
- Maximum sustainable concurrency.
- Point at which p95 exceeds the target.
- Point at which error rate exceeds the threshold.
- Primary bottleneck.

## 6.16 Retry and duplicate-request performance requirements

Test:
- Timeout followed by retry.
- Network failure followed by retry.
- `409 Conflict` followed by GET and retry.
- Duplicate submission.

The system must not create duplicate labor requests or assignments because of retries. If idempotency keys are not supported, retry behavior shall be explicitly documented.

## 6.17 Rate limiting

Document and test applicable:
- API gateway limits.
- Per-user limits.
- Per-IP limits.
- Authentication/token limits.
- Burst limits.

Expected throttling status codes and behavior shall be captured in k6 results.

---

# 7. UI Performance Requirements

## 7.1 UI performance scope

All three entry points shall be measured independently:
1. Gantt chart right-click context menu.
2. Assignment details slide-out drawer.
3. Worker Assignments list tab.

Measure:
- Time until the assignment action is interactive.
- Time for the Effective Date modal to appear.
- Date-picker rendering.
- Preview-badge rendering.
- Time for the replacement-worker drawer to appear.
- Candidate-list rendering.
- Time from confirmation to visible completion.
- Loading behavior.
- Error behavior.
- UI responsiveness while APIs are executing.

## 7.2 Proposed UI performance targets

These are initial proposed targets and require product/design confirmation.

| Interaction | p95 target |
|---|---:|
| Open assignment details drawer | <= 2 s |
| Open Unassign effective-date modal | <= 2.0 s |
| Open Reassign effective-date modal | <= 2.0 s |
| Render date picker and preview | <= 2.0 s |
| Open replacement-worker drawer | <= 2.0 s |
| Render candidate list | <= 2.0 s |
| Show success state after API response | <= 2.0 s |
| Show actionable API error | <= 2.0 s |

## 7.3 UI responsiveness

While a split request is executing:
- Display a loading/progress state.
- Prevent accidental duplicate submissions.
- Keep the page responsive.
- Display an actionable error if the request fails.
- Reconcile the UI with the latest assignment state after success.
- Do not display stale dates as current state.

## 7.4 Gantt performance

The Gantt context-menu path shall first be validated manually because synthetic mouse events may not reliably trigger browser context menus.

After a successful split:
- The assignment bar should reflect the updated range within the agreed UI target.
- If a reload is required, document this separately as a UI limitation rather than an API-performance failure.

## 7.5 UI/API timing correlation

UI performance tests should correlate:

```text
User action
    ↓
UI event
    ↓
API request start
    ↓
API response
    ↓
UI rendering
    ↓
User-visible completion
```

This distinguishes backend, network, frontend-processing, and rendering delays.

---

# 8. Performance Acceptance and Reporting

A performance run shall report:
- Test scenario.
- Environment configuration.
- Dataset size.
- VU count.
- Test duration.
- Target RPS.
- Actual RPS.
- Average latency.
- p50/p90/p95/p99 latency.
- Error rate.
- HTTP status distribution.
- OCC conflict rate.
- CPU/memory utilization.
- Database metrics.
- Bottlenecks.
- Data-integrity verification.
- UI timing where applicable.

A performance test passes only when the agreed workload, latency, reliability, scalability, and data-integrity thresholds are satisfied.

## 8.1 Requirements requiring confirmation

The original functional specification does not define the following performance values. These must be confirmed before they become contractual SLOs:

- Expected average RPS.
- Expected peak RPS.
- Expected concurrent users.
- Maximum acceptable p95/p99 latency.
- Maximum acceptable error rate.
- Soak-test duration.
- Production-equivalent data volume.
- API rate limits.
- Idempotency-key support.
- Whether audit logging is synchronous or asynchronous.
- UI performance/SLO targets.
- Whether the seven-day historic lockout threshold is tenant-configurable.

