---

name: pending-pack-execution

description: Execute all pending approved API and UI test cases by first determining which test packs and individual test cases have already been executed, then executing only the remaining eligible cases. If no prior Smoke, Critical, or Risk-Based execution exists, execute all eligible API and UI cases across Smoke, Critical, Risk-Based, and remaining test packs. Preserve execution evidence and report bugs and issues. Do not generate, modify, or directly execute automation.

---

# Pending Test Case Execution Skill

## 1. Purpose

Execute the **remaining pending API and UI test cases** that have not already been executed.

This skill acts as the **master execution orchestrator** after individual execution packs such as:

* Smoke
* Critical
* Risk-Based

may already have been executed.

The skill must first determine the current execution state before selecting cases.

It must prevent duplicate execution of already completed test cases.

This skill:

* Identifies previously executed test cases
* Identifies pending test cases
* Determines which execution packs remain pending
* Routes UI cases to `ui-playwright-execution`
* Routes API cases to `api-test-execution`
* Captures execution evidence
* Reports bugs and issues
* Produces a consolidated pending-execution report

It does NOT:

* Generate test cases
* Generate automation
* Modify test cases
* Modify automation
* Directly execute UI/API automation

---

# 2. Execution Strategy

This skill operates in two modes.

## Mode A — Previous Pack Execution Exists

If any of the following packs have already been executed:

* `SMOKE`
* `CRITICAL`
* `RISK-BASED`

the skill must determine exactly which test cases were already executed.

It must then execute only the **remaining eligible test cases**.

### Example

If:

```text
SMOKE = EXECUTED
CRITICAL = NOT EXECUTED
RISK-BASED = NOT EXECUTED
STANDARD/OTHER = NOT EXECUTED
```

then execute:

```text
CRITICAL
RISK-BASED
STANDARD/OTHER
```

Do NOT rerun:

```text
SMOKE
```

---

### Another example

If:

```text
SMOKE = EXECUTED
CRITICAL = EXECUTED
RISK-BASED = NOT EXECUTED
STANDARD/OTHER = NOT EXECUTED
```

then execute:

```text
RISK-BASED
STANDARD/OTHER
```

Do NOT rerun:

```text
SMOKE
CRITICAL
```

---

### Another example

If:

```text
SMOKE = NOT EXECUTED
CRITICAL = EXECUTED
RISK-BASED = EXECUTED
STANDARD/OTHER = NOT EXECUTED
```

then execute:

```text
SMOKE
STANDARD/OTHER
```

Do NOT rerun:

```text
CRITICAL
RISK-BASED
```

---

# 3. Mode B — No Previous Pack Execution Exists

If none of the following have been executed:

```text
SMOKE
CRITICAL
RISK-BASED
```

then this skill becomes the **full pending execution orchestrator**.

It must execute all eligible API and UI test cases, including:

```text
SMOKE
CRITICAL
RISK-BASED
STANDARD
OTHER APPROVED EXECUTABLE CASES
```

subject to the execution-readiness and automation-feasibility gates.

Therefore:

```text
No prior pack execution
        ↓
Select all eligible pending API/UI cases
        ↓
Smoke
Critical
Risk-Based
Standard/Other
        ↓
Execute
        ↓
Evidence
        ↓
Defects / Issues
        ↓
Consolidated report
```

---

# 4. Source Authority

Use the following source hierarchy:

1. `TEST_CASE_ENGINEERING` — authoritative source for available test cases
2. `TEST_PLAN` — execution scope and test-pack definitions
3. `UI_TEST_CASES` / `API_TEST_CASES` — layer-specific test cases
4. `AUTOMATION_FEASIBILITY` — automation eligibility
5. `UI_AUTOMATION` / `API_AUTOMATION` — available automation
6. Previous execution reports — determine what has already been executed
7. Execution evidence/results — authoritative evidence that a case was actually executed

Do not invent test cases.

Do not infer that a case was executed merely because automation exists.

Do not infer that an entire pack was executed from the existence of a pack name.

---

# 5. Inputs

## Required

* `TEST_CASE_ENGINEERING`

## Recommended

* `UI_TEST_CASES`
* `API_TEST_CASES`
* `AUTOMATION_FEASIBILITY`

## Previous Execution Sources

Use available execution reports/results for:

* Smoke execution
* Critical execution
* Risk-Based execution
* Other execution packs

Examples:

```text
test-results/<Feature>_Smoke_Execution_Report.md
test-results/<Feature>_Critical_Execution_Report.md
test-results/<Feature>_Risk-Based_Execution_Report.md
```

Also use execution evidence/results where available.

## Optional

* `TEST_PLAN`
* `QA_ANALYSIS`
* `REVIEW`
* `UI_AUTOMATION`
* `API_AUTOMATION`

---

# 6. Previous Execution Discovery

Before selecting any test case, determine the current execution state.

Check:

1. Existing Smoke execution results
2. Existing Critical execution results
3. Existing Risk-Based execution results
4. Other execution reports/results
5. Individual Test Case execution status
6. Evidence associated with previous execution
7. Previous execution date/time where available

Create an internal execution inventory:

```text
Pack | TC ID | Layer | Previous Status | Evidence | Previously Executed
```

Example:

```text
SMOKE      | TC-001 | UI  | PASS | evidence/... | YES
CRITICAL   | TC-010 | API | PASS | evidence/... | YES
RISK-BASED | TC-020 | UI  | NOT RUN | -          | NO
STANDARD   | TC-030 | API | NOT RUN | -          | NO
```

---

# 7. What Counts as Already Executed

A Test Case ID is considered previously executed only when reliable execution evidence/results exist.

Valid evidence may include:

* Previous execution report
* Test execution result
* Playwright execution result
* API execution result
* Execution log
* Screenshot/trace/report linked to the Test Case ID
* Defect linked to an actual failed execution

Do NOT consider a test case executed merely because:

* Automation exists
* It was generated
* It was reviewed
* It was selected in a plan
* It appears in an execution command
* It is marked `READY`
* It belongs to a previously planned pack

The execution record must establish that execution actually occurred.

---

# 8. Previously Executed Status

A previously executed case may have:

```text
PASS
FAIL
SKIPPED
BLOCKED
```

However, do not automatically treat every `SKIPPED` or `BLOCKED` case as completed.

### PASS

Treat as executed.

### FAIL

Treat as executed.

Do not rerun automatically merely because it failed.

### SKIPPED

Treat as pending when the skip reason means the test was never executed and the blocking condition is now resolved.

### BLOCKED

Treat as pending when the test was never actually executed and the blocking condition is now resolved.

If a skipped/blocked case remains blocked, preserve it as blocked and report it.

---

# 9. Pending Case Determination

Determine:

```text
ALL APPROVED TEST CASES
        -
PREVIOUSLY EXECUTED CASES
        =
PENDING TEST CASES
```

Then apply execution eligibility gates.

Do not simply select an entire pack if some individual test cases within that pack have already been executed.

Selection must happen at **Test Case ID level**.

---

# 10. Pack Selection Logic

Use the following decision process.

## Step 1 — Check Previous Pack Execution

Determine whether:

```text
SMOKE
CRITICAL
RISK-BASED
```

have prior execution results.

## Step 2 — Determine Pending Cases

Compare all approved test cases against previous execution results.

## Step 3 — Select Only Pending Cases

Do not rerun already executed cases.

## Step 4 — If No Previous Pack Execution Exists

Execute all eligible pending API/UI cases across:

```text
SMOKE
CRITICAL
RISK-BASED
STANDARD
OTHER
```

## Step 5 — If Previous Pack Execution Exists

Execute only test cases that remain pending, regardless of their pack.

---

# 11. Important Individual-Test-Case Rule

Pack-level execution status must never override Test Case-level execution status.

Example:

```text
SMOKE pack = EXECUTED
```

but:

```text
TC-001 = PASS
TC-002 = PASS
TC-003 = BLOCKED
TC-004 = NOT EXECUTED
```

The pending execution must not rerun:

```text
TC-001
TC-002
```

It must evaluate:

```text
TC-003
TC-004
```

based on their current execution eligibility and blocking conditions.

Therefore:

**Test Case ID-level evidence is the final authority for determining whether a case remains pending.**

---

# 12. Execution Eligibility Gate

A pending test case may be executed only when:

1. Valid Test Case ID exists
2. Test Case status = `APPROVED`
3. Execution Readiness = `READY`
4. Automation Feasibility = `YES`
5. Required automation exists
6. Required execution framework exists
7. Required environment is available
8. Required authentication is available
9. Required test data is available
10. No blocking information gap prevents execution

Skip or block cases that fail these conditions.

---

# 13. Automation Feasibility

Execute automated cases only when:

```text
Automation Feasibility = YES
```

Do not automatically execute:

```text
NO
PARTIAL
```

unless explicit authorization exists.

For `PARTIAL`, report:

```text
SKIPPED / BLOCKED
Reason: Automation Feasibility = PARTIAL
```

Do not generate new automation during this skill.

---

# 14. Layer Routing

Route based on the Test Case layer.

### UI

```text
UI → ui-playwright-execution
```

### API

```text
API → api-test-execution
```

Pass:

```text
EXECUTION_PACK = PENDING
```

and the selected Test Case IDs.

The execution skills own:

* Actual execution
* Assertions
* Execution logs
* Evidence capture
* Failure classification
* Application defect identification
* Defect creation/reporting where supported

---

# 15. Execution Order

When multiple pending packs exist, execute in this order:

```text
1. SMOKE
2. CRITICAL
3. RISK-BASED
4. STANDARD / OTHER
```

This ordering applies only to pending cases.

Do not rerun a previously executed case simply because its pack appears earlier in the order.

Example:

```text
SMOKE:
TC-001 already executed
TC-002 pending

CRITICAL:
TC-010 pending

RISK-BASED:
TC-020 pending

STANDARD:
TC-030 pending
```

Execute:

```text
TC-002
TC-010
TC-020
TC-030
```

Do not execute:

```text
TC-001
```

---

# 16. Execution

Execute all eligible pending API and UI test cases.

For each case record:

```text
Pack
TC ID
Requirement
Scenario
Layer
Risk ID, when applicable
Status
Failure Classification
Evidence
Defect/Issue
```

Allowed statuses:

```text
PASS
FAIL
SKIPPED
BLOCKED
```

Do not silently omit pending cases.

---

# 17. Evidence Requirements

Evidence is mandatory for every newly executed test case.

## UI Evidence

Where applicable, capture:

* Test Case ID
* Pack
* Execution result
* Screenshot of important validation state
* Screenshot of failure state
* Playwright report
* Trace, if configured
* Video, if configured
* Relevant console/network evidence
* Error/exception details

## API Evidence

Where applicable, capture:

* Test Case ID
* Pack
* HTTP method
* Endpoint
* Request summary
* Response status
* Response validation
* Assertion results
* Relevant response details
* Error details
* Execution output/log

## Security

Never include:

* Passwords
* Access tokens
* Session tokens
* Sensitive cookies
* Authorization headers
* Other secrets

Evidence must be sanitized before inclusion in the final report.

---

# 18. Bug / Issue Reporting

After execution, review:

* Failed test cases
* Blocked cases
* Automation failures
* Environment issues
* Configuration issues
* Authentication issues
* Dependency issues
* Test-data issues
* Test-case issues
* Information gaps

For each relevant issue record:

```text
Pack
TC ID
Requirement
Scenario
Layer
Expected Result
Actual Result
Status
Failure Classification
Evidence
Defect ID / Issue ID
```

---

# 19. Failure Classification

Use the classification provided by the execution skill.

Supported classifications:

```text
APPLICATION_DEFECT
AUTOMATION_DEFECT
TEST_DATA_ISSUE
ENVIRONMENT_ISSUE
CONFIGURATION_ISSUE
AUTHENTICATION_ISSUE
DEPENDENCY_ISSUE
TEST_CASE_ISSUE
INFORMATION_GAP
UNKNOWN
```

Do not independently invent root causes.

Do not convert automation/environment failures into application defects.

Do not create duplicate defects.

---

# 20. Application Defects

When execution evidence indicates an application defect:

* Record the defect
* Reference the defect ID
* Associate it with the Test Case ID
* Associate it with the Pack
* Preserve evidence
* Include it in the final report

If an existing defect already covers the same issue:

* Reuse the existing defect ID
* Do not create a duplicate defect

---

# 21. Failed Test Cases

For every failed case, preserve:

```text
TC ID
Pack
Expected Result
Actual Result
Failure Classification
Evidence
Defect/Issue
```

Do not rerun automatically merely because a case failed.

A failed test case is still considered executed unless the execution result indicates that execution itself did not occur.

---

# 22. Skipped and Blocked Cases

For every skipped or blocked case, record:

```text
TC ID
Pack
Reason
Current Status
Impact
```

Examples:

```text
SKIPPED — Automation Feasibility = NO

SKIPPED — Automation Feasibility = PARTIAL

BLOCKED — Authentication unavailable

BLOCKED — Required test data unavailable

BLOCKED — Environment unavailable

BLOCKED — Dependency unavailable

BLOCKED — Information gap prevents reliable execution
```

Do not silently remove these cases.

---

# 23. Evidence and Defect Traceability

Maintain:

```text
Requirement
   ↓
Scenario
   ↓
Pack
   ↓
Test Case
   ↓
Automation
   ↓
Execution
   ↓
Evidence
   ↓
Result
   ↓
Defect / Issue
```

At minimum:

```text
TC-* → Execution → Evidence → Result → Defect/Issue
```

For Risk-Based cases:

```text
Risk → TC → Execution → Evidence → Result → Defect/Issue
```

---

# 24. Duplicate Execution Prevention

Before every execution batch, verify that selected Test Case IDs are not already present as successfully executed in previous execution results.

Do not execute the same Test Case ID twice within the same pending execution run.

If duplicate selection is detected:

```text
Remove duplicate
Preserve original execution reference
Report selection reconciliation if necessary
```

---

# 25. Reconciliation

Before generating the final report, verify:

```text
Selected Pending = Executed + Skipped + Blocked
```

and:

```text
Executed = PASS + FAIL
```

Also reconcile by:

* Pack
* UI
* API

Example:

```text
PENDING EXECUTION
├── SMOKE
│   ├── UI
│   └── API
├── CRITICAL
│   ├── UI
│   └── API
├── RISK-BASED
│   ├── UI
│   └── API
└── STANDARD / OTHER
    ├── UI
    └── API
```

If counts do not reconcile, report the discrepancy.

Do not fabricate results to make the counts match.

---

# 26. Pass Rate

Calculate pass rate only from newly executed cases:

```text
Pass Rate = PASS / Executed × 100
```

Do not include:

* Previously executed cases
* SKIPPED
* BLOCKED

in the denominator.

If no pending cases were executable:

```text
Pass Rate = N/A
Reason = No pending executable test cases
```

---

# 27. Output

Create:

```text
test-results/<Feature>_Pending_Execution_Report.md
```

The report must contain:

## Document Information

* Feature
* Execution type
* Execution date/time
* Environment
* Source artifacts
* Automation framework

## Previous Execution State

Show:

```text
Pack
Previously Executed
Pending
Execution Report
```

For example:

```text
SMOKE      | YES | 2 pending
CRITICAL   | NO  | 10 pending
RISK-BASED | YES | 3 pending
STANDARD   | NO  | 15 pending
```

## Execution Strategy Used

Explicitly state whether:

```text
MODE A — Previous Pack Execution Exists
```

or:

```text
MODE B — No Previous Pack Execution
```

## Pending Scope

Include:

* Total approved cases
* Previously executed cases
* Pending cases
* Executable pending cases
* UI pending cases
* API pending cases

## Pack Coverage

Report separately:

* Smoke
* Critical
* Risk-Based
* Standard
* Other

For each:

```text
Total
Previously Executed
Pending
Selected
Executed
Skipped
Blocked
```

## Execution Summary

Include:

* Selected
* Executed
* PASS
* FAIL
* SKIPPED
* BLOCKED
* UI executed
* API executed
* Pass rate

## Test Case Results

Include:

```text
Pack
TC ID
Requirement
Scenario
Layer
Status
Failure Classification
Evidence
Defect/Issue
```

## UI Results

Include:

* UI cases executed
* PASS
* FAIL
* SKIPPED
* BLOCKED
* Failed TC IDs
* Evidence
* Defects/issues

## API Results

Include:

* API cases executed
* PASS
* FAIL
* SKIPPED
* BLOCKED
* Failed TC IDs
* Evidence
* Defects/issues

## Bugs / Defects Found

For each defect:

```text
Defect ID
Pack
TC ID
Layer
Expected
Actual
Classification
Evidence
```

## Automation Issues

Report separately from application defects.

## Environment / Dependency Issues

Report separately.

## Information Gaps

Report information gaps affecting:

* Selection
* Execution
* Expected results
* Test data
* Environment
* Evidence
* Defect reporting

## Skipped / Blocked Cases

Include:

```text
Pack
TC ID
Reason
Impact
```

## Evidence Index

Map:

```text
Pack → TC ID → Evidence
```

## Previous vs New Execution

Show:

```text
Previously Executed
Newly Executed
Remaining Pending
```

## Reconciliation

Show:

```text
Selected Pending = Executed + Skipped + Blocked
Executed = PASS + FAIL
```

---

# 28. Completion Criteria

The pending execution is complete only when:

1. Previous execution state has been evaluated.
2. Test Case-level execution history has been checked.
3. Duplicate execution has been prevented.
4. All eligible pending UI/API cases have been processed.
5. Execution evidence has been collected.
6. Failed cases have been classified.
7. Bugs/issues have been reported.
8. Skipped and blocked cases have been recorded.
9. Pack-level results have been reconciled.
10. Final report has been generated.

---

# 29. Report Integrity

The final report must:

* Reflect actual newly executed cases
* Distinguish previous execution from new execution
* Preserve Test Case-level traceability
* Preserve UI/API separation
* Preserve pack classification
* Preserve evidence
* Preserve defects/issues
* Report skipped cases
* Report blocked cases
* Report information gaps
* Prevent duplicate execution
* Maintain accurate reconciliation

Never:

* Rerun already executed cases without explicit authorization
* Assume an entire pack was executed when only some cases were executed
* Treat automation existence as proof of execution
* Fabricate execution results
* Fabricate evidence
* Fabricate defect IDs
* Hide failures
* Hide blockers
* Claim pending cases were executed when they were not
* Claim a pack is complete when individual cases remain pending

---

# 30. Boundaries

## DO

* Check previous execution first
* Determine execution state at Test Case ID level
* Identify pending cases
* Execute eligible pending API cases
* Execute eligible pending UI cases
* Execute Smoke/Critical/Risk-Based/Standard/Other cases when they are pending
* Prevent duplicate execution
* Preserve evidence
* Report bugs and issues
* Preserve failure classifications
* Reconcile results
* Generate the consolidated pending execution report

## DO NOT

* Generate test cases
* Modify test cases
* Generate automation
* Modify automation
* Directly execute automation
* Rerun completed cases unnecessarily
* Invent missing execution results
* Invent pack completion
* Invent defects
* Invent evidence
* Invent risks
* Silently reclassify cases
* Execute unrelated cases
* Hide blocked or skipped cases

---

# 31. Final Status

Return:

```text
PENDING_EXECUTION_COMPLETE
```

when:

* Previous execution state has been evaluated
* All eligible pending cases have been processed
* UI/API execution results are collected
* Evidence is preserved
* Bugs/issues are reported
* Pack-level results are reconciled
* Final report is generated

Return:

```text
PENDING_EXECUTION_BLOCKED
```

when execution cannot be completed because of a blocking:

* Environment issue
* Authentication issue
* Dependency issue
* Configuration issue
* Missing automation
* Required test-data issue
* Information gap
* Other execution-blocking condition

If there are **no pending executable cases**, return:

```text
PENDING_EXECUTION_COMPLETE
```

with the report stating:

```text
No pending executable test cases found.
All eligible test cases were previously executed or are currently skipped/blocked.
```

The final status must reflect the actual execution state and must not be inferred only from PASS/FAIL counts.

---
