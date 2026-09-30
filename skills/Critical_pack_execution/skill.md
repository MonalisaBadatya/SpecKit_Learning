---

name: critical-pack-execution

description: Orchestrate execution of approved Critical test cases by selecting execution-ready automated UI and API cases, routing them to the appropriate execution skills, preserving execution evidence, and consolidating bugs and issues found. Do not generate, modify, or directly execute automation.

---

# Critical Pack Execution Skill

## 1. Purpose

Execute the approved **Critical** test cases covering high-impact functionality and core business workflows.

This is an **execution orchestration skill**.

It does **not**:

* Generate test cases
* Generate automation
* Modify test cases
* Modify automation
* Directly execute UI/API automation

It selects eligible Critical test cases, routes them to the correct execution skill, collects execution results and evidence, and produces a consolidated Critical execution report.

---

# 2. Source Authority

Use the following source hierarchy:

1. `TEST_CASE_ENGINEERING` — primary source for Critical test-case selection
2. `TEST_PLAN` — scope and execution context
3. `UI_TEST_CASES` / `API_TEST_CASES` — layer-specific test cases
4. `AUTOMATION_FEASIBILITY` — automation eligibility
5. `UI_AUTOMATION` / `API_AUTOMATION` — available automation
6. `REVIEW` — approval/review status when available

Do not invent requirements, scenarios, test cases, expected results, or Critical scope.

If source artifacts conflict, do not silently resolve the conflict. Report it as an `INFORMATION_GAP` or `TEST_CASE_ISSUE`.

---

# 3. Inputs

## Required

* `TEST_CASE_ENGINEERING`

## Recommended

* `UI_TEST_CASES`
* `API_TEST_CASES`
* `AUTOMATION_FEASIBILITY`

## Optional

* `TEST_PLAN`
* `REVIEW`
* `UI_AUTOMATION`
* `API_AUTOMATION`
* QA analysis/specification artifacts when required for traceability

---

# 4. Critical Test Case Selection Gate

Select a test case for execution only when **all** applicable conditions are satisfied.

### Required conditions

1. `Pack = CRITICAL`
2. Valid `Test Case ID` exists
3. Test Case status = `APPROVED`
4. `Execution Readiness = READY`
5. `Automation Feasibility = YES`
6. Required automation exists
7. Required execution framework is available
8. No unresolved blocking information gap prevents execution

### Eligible layers

* `UI`
* `API`

### Skip or block cases when

* Pack is `SMOKE`
* Pack is `RISK-BASED`
* Pack is `STANDARD`
* Automation Feasibility = `NO`
* Automation Feasibility = `PARTIAL`, unless explicitly authorized
* Execution Readiness = `NOT_READY`
* Test case is not approved
* Required automation is missing
* Required environment/configuration is unavailable
* Required authentication/test data/dependency is unavailable
* An information gap prevents reliable execution

Do not silently convert a skipped or blocked case into an executable case.

---

# 5. Critical Scope

Critical scope must come from the approved Test Case Engineering/Test Plan artifacts.

Do not:

* Add new Critical test cases
* Promote another test case to Critical
* Reclassify Smoke/Risk-Based/Standard cases as Critical
* Select a case merely because it appears important
* Remove an approved Critical case without recording the reason

If Critical classification appears inconsistent or unsupported, report:

`TEST_CASE_ISSUE`

or:

`INFORMATION_GAP`

rather than changing the classification.

---

# 6. Pre-Execution Validation

Before execution, validate:

### Test case

* Test Case ID
* Requirement/Business Requirement traceability
* Scenario ID
* Layer
* Pack classification
* Preconditions
* Test data requirements
* Expected result
* Execution readiness
* Automation feasibility

### Environment

Verify that the required:

* Application/environment
* Authentication
* Test account
* Test data
* API availability
* UI availability
* Required services/dependencies
* Automation framework

are available.

If an environment issue prevents execution, mark the case:

`BLOCKED`

Do not mark it `FAIL` unless the execution skill determines that the test case actually failed.

---

# 7. Layer Routing

Route Critical test cases according to their layer.

### UI Critical

Route to:

`ui-playwright-execution`

### API Critical

Route to:

`api-test-execution`

Pass the execution context:

`EXECUTION_PACK = CRITICAL`

Also pass the selected Critical Test Case IDs.

Example:

```text
EXECUTION_PACK = CRITICAL
TEST_CASE_IDS = TC-001, TC-002, TC-003
```

The execution skills are responsible for:

* Actual automation execution
* Assertions
* Execution logs
* Evidence capture
* Failure classification
* Application defect identification
* Automation failure identification
* Defect creation/reporting where supported

This skill must not duplicate execution logic owned by those skills.

---

# 8. Execution Requirements

Execute **all eligible Critical UI and API automated test cases**.

Do not stop after the first failure unless:

* The execution skill has a defined stop condition
* The environment becomes unusable
* A shared dependency failure makes remaining execution invalid
* Continuing could corrupt test data or produce unreliable results

If execution continues after a failure, execute the remaining eligible Critical cases.

Do not silently omit failed or blocked cases.

---

# 9. Evidence Requirements

Evidence is mandatory for every executed Critical test case.

The execution skill must preserve sufficient evidence to establish what was executed and what happened.

## UI Evidence

Where applicable, retain:

* Test Case ID
* Execution result
* Screenshot of important validation state
* Screenshot of failure state
* Playwright execution/report output
* Trace, if configured
* Video, if configured
* Relevant console/network evidence when required
* Error/exception details
* Timestamp or execution reference where available

For failed UI tests, evidence must clearly support the observed failure.

## API Evidence

Where applicable, retain:

* Test Case ID
* HTTP method
* Endpoint
* Request summary
* Response status
* Response validation/assertions
* Relevant response details
* Error details
* Execution output/log
* Timestamp or execution reference where available

Do not expose:

* Passwords
* Access tokens
* Session tokens
* Cookies containing sensitive values
* Authorization headers
* Other secrets

Evidence must be sanitized before inclusion in the final report.

---

# 10. Execution Result Recording

Record each executed case using:

```text
TC ID
Requirement
Scenario
Layer
Execution Status
Failure Classification
Evidence
Defect/Issue
```

Allowed execution statuses:

```text
PASS
FAIL
SKIPPED
BLOCKED
```

Do not use `PASS` without successful execution evidence.

Do not use `FAIL` without execution evidence showing the failure.

Do not fabricate evidence, results, or defect IDs.

---

# 11. Failure Classification

Use the classification provided by the appropriate execution skill.

Supported classifications include:

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

Do not independently override the execution skill's classification without source-supported evidence.

---

# 12. Bug / Issue Reporting

After execution, review all failed and blocked Critical cases.

For each failure or issue, capture:

```text
TC ID
Requirement / Scenario
Layer
Expected Result
Actual Result
Execution Status
Failure Classification
Evidence
Defect ID / Issue ID
```

## Application Defect

If the execution evidence identifies an application defect:

* Record the defect
* Reference the defect ID
* Link the affected Test Case ID
* Preserve the supporting evidence
* Include the defect in the final Critical report

Do not create duplicate defects when an existing defect already covers the same failure.

## Automation Defect

If the failure is caused by automation:

* Record `AUTOMATION_DEFECT`
* Preserve automation error evidence
* Do not report it as an application defect

## Environment / Dependency Issue

If execution failed because of:

* Environment outage
* Authentication failure
* Service dependency failure
* Configuration issue
* Missing test data
* Infrastructure problem

record the appropriate classification and mark the case `BLOCKED` when the test could not be reliably executed.

## Test Case Issue

If the test case itself prevents reliable execution, report:

`TEST_CASE_ISSUE`

Do not modify the test case during execution.

---

# 13. Critical Failure Handling

Critical failures must be clear
