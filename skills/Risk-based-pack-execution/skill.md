---

name: risk-based-pack-execution

description: Orchestrate execution of approved Risk-Based test cases by selecting execution-ready automated UI and API cases, preserving documented risk traceability, capturing execution evidence, and consolidating bugs and issues found. Do not generate, modify, or directly execute automation.

---

# Risk-Based Pack Execution Skill

## 1. Purpose

Execute approved **Risk-Based** test cases associated with documented product, technical, data, integration, security, concurrency, regression, or performance risks.

This is an **execution orchestration skill**.

It does NOT:

* Generate test cases
* Generate automation
* Modify test cases
* Modify automation
* Directly execute UI/API automation

It selects eligible Risk-Based test cases, routes them to the correct execution skill, collects execution results and evidence, reports bugs/issues, and produces a consolidated Risk-Based execution report.

---

# 2. Source Authority

Use the following source hierarchy:

1. `TEST_CASE_ENGINEERING` — primary source for Risk-Based test-case selection
2. `TEST_PLAN` — approved Risk-Based scope and risk context
3. `QA_ANALYSIS` — documented risk/information-gap context when available
4. `UI_TEST_CASES` / `API_TEST_CASES` — layer-specific test cases
5. `AUTOMATION_FEASIBILITY` — automation eligibility
6. `UI_AUTOMATION` / `API_AUTOMATION` — available automation
7. `REVIEW` — approval/review status when available

Do not invent:

* Risks
* Risk IDs
* Risk severity
* Risk categories
* Requirements
* Scenarios
* Test cases
* Expected results

If source artifacts conflict, do not silently reconcile the conflict. Report it as an `INFORMATION_GAP` or `TEST_CASE_ISSUE`.

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
* `QA_ANALYSIS`
* `REVIEW`
* `UI_AUTOMATION`
* `API_AUTOMATION`

---

# 4. Risk-Based Test Case Selection Gate

Select a test case for execution only when all applicable conditions are satisfied.

### Required conditions

1. `Pack = RISK-BASED`
2. Valid `Test Case ID` exists
3. Test Case status = `APPROVED`
4. Execution Readiness = `READY`
5. Automation Feasibility = `YES`
6. Required automation exists
7. Required execution framework is available
8. No unresolved blocking information gap prevents reliable execution

### Risk Traceability

Where defined upstream, preserve:

```text
Risk ID
Risk Description
Requirement
Scenario
Test Case ID
Layer
Automation
Execution
Evidence
Defect/Issue
```

A Risk-Based test case without a documented Risk ID must **not** be discarded automatically if it is explicitly classified as `RISK-BASED` upstream.

Instead:

```text
Classification = RISK-BASED
Risk Reference = INFORMATION GAP
```

Continue execution if all other execution gates are satisfied.

---

# 5. Cases to Skip or Block

Skip or block cases when:

* Pack is `SMOKE`
* Pack is `CRITICAL`
* Pack is `STANDARD`
* Automation Feasibility = `NO`
* Automation Feasibility = `PARTIAL`, unless explicitly authorized
* Execution Readiness = `NOT_READY`
* Test case is not approved
* Required automation is missing
* Required environment is unavailable
* Required authentication is unavailable
* Required test data is unavailable
* Required dependency/service is unavailable
* A blocking information gap prevents reliable execution

Do not silently convert skipped or blocked cases into executable cases.

---

# 6. Risk Scope

Risk-Based scope must originate from approved `TEST_PLAN` and/or `TEST_CASE_ENGINEERING` artifacts.

Supported risk areas may include only those explicitly documented upstream, for example:

* Data integrity
* Complex business rules
* Boundary conditions
* Historical/future states
* Concurrency
* Authorization/security
* Integration
* High-impact regression
* Fragile UI behavior
* API failure handling
* Performance

These are examples only.

Do not automatically assume that every Risk-Based test must cover every category.

Do not invent a risk merely because a test case appears technically risky.

---

# 7. Risk Coverage Rules

A risk may have:

* Multiple test cases
* UI coverage
* API coverage
* Positive coverage
* Negative coverage
* Boundary coverage
* Integration coverage

Report the actual relationship defined by the source artifacts.

Do not claim:

`Risk Covered`

merely because a Risk ID is mapped to a test case.

A risk can be reported as **executed/covered** only when its associated approved test case(s) were actually executed.

Use distinctions such as:

```text
Mapped
Executable
Executed
Passed
Failed
Partially Executed
Blocked
Not Executed
```

where applicable.

If a risk has multiple associated test cases, do not mark the entire risk as passed merely because one associated test case passed.

---

# 8. Layer Routing

Route test cases according to their defined layer.

### UI Risk-Based

Route to:

`ui-playwright-execution`

### API Risk-Based

Route to:

`api-test-execution`

Pass:

```text
EXECUTION_PACK = RISK-BASED
```

Also pass the selected Risk-Based Test Case IDs.

The execution skills own:

* Actual automation execution
* Assertions
* Execution logs
* Evidence capture
* Failure classification
* Application defect identification
* Automation failure identification
* Defect creation/reporting where supported

This orchestration skill must not duplicate execution logic.

---

# 9. Pre-Execution Validation

Before execution, validate:

## Test Case

* Test Case ID
* Risk ID, when defined
* Risk description, when defined
* Requirement
* Scenario ID
* Layer
* Pack classification
* Preconditions
* Test data requirements
* Expected result
* Execution readiness
* Automation feasibility

## Environment

Verify required:

* Application/environment
* Authentication
* Test account
* Test data
* API availability
* UI availability
* Dependencies/services
* Automation framework

If an environment/dependency issue prevents reliable execution:

`BLOCKED`

Do not classify an unexecuted environment problem as an application `FAIL`.

---

# 10. Execution

Execute all eligible automated Risk-Based UI and API test cases.

Record:

```text
Risk ID
Risk Description
TC ID
Requirement
Scenario
Layer
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

Do not execute unrelated:

* Smoke cases
* Critical cases
* Standard cases
* Unapproved cases
* Performance tests outside the approved Risk-Based execution scope
* Unrelated regression tests

---

# 11. Evidence Requirements

Evidence is mandatory for every executed Risk-Based test case.

Evidence must support both:

1. What was executed
2. What result was observed

## UI Evidence

Where applicable, retain:

* Test Case ID
* Risk ID
* Execution result
* Screenshot of important validation state
* Screenshot of failure state
* Playwright execution/report output
* Trace, if configured
* Video, if configured
* Relevant console/network evidence when required
* Error/exception details

## API Evidence

Where applicable, retain:

* Test Case ID
* Risk ID
* HTTP method
* Endpoint
* Request summary
* Response status
* Response validation/assertions
* Relevant response details
* Error details
* Execution output/log

For both UI and API evidence:

* Redact passwords
* Redact access tokens
* Redact session tokens
* Redact sensitive cookies
* Redact authorization headers
* Do not expose secrets in the final report

---

# 12. Execution Result Recording

For every selected Risk-Based test case, maintain:

```text
Risk ID
TC ID
Requirement
Scenario
Layer
Execution Status
Failure Classification
Evidence
Defect/Issue
```

Do not mark a test case `PASS` without successful execution evidence.

Do not mark a test case `FAIL` without evidence showing the observed failure.

Do not fabricate evidence, results, or defect IDs.

---

# 13. Failure Classification

Use the classification supplied by the execution skill.

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

Do not infer or independently invent application root cause.

Do not silently override the classification produced by the execution skill.

---

# 14. Bug / Issue Reporting

After execution, review all:

* Failed cases
* Blocked cases
* Automation failures
* Environment failures
* Test-data failures
* Information gaps

For each relevant failure/issue, capture:

```text
Risk ID
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

When execution evidence identifies an application defect:

* Record the defect
* Reference the defect ID
* Associate it with the affected Risk ID
* Associate it with the affected TC ID
* Preserve supporting evidence
* Include it in the final report

Do not create duplicate defects.

If an existing defect covers the same failure, reference the existing defect.

## Automation Defect

If automation caused the failure:

```text
Failure Classification = AUTOMATION_DEFECT
```

Do not report the automation failure as an application defect.

## Environment / Dependency Issue

If execution cannot be reliably completed because of:

* Environment outage
* Authentication failure
* Dependency failure
* Configuration issue
* Missing test data

record the appropriate classification and mark the case `BLOCKED` when applicable.

## Test Case Issue

If the test case itself prevents reliable execution:

```text
Failure Classification = TEST_CASE_ISSUE
```

Do not modify the test case during execution.

---

# 15. Risk Failure Handling

When a Risk-Based test case fails:

1. Preserve the execution evidence.
2. Preserve the Risk ID.
3. Preserve the Test Case ID.
4. Record expected vs actual result.
5. Preserve the execution classification.
6. Reference the defect/issue when available.
7. Reflect the failure in Risk Coverage.

Do not state that the underlying risk is resolved or unresolved based only on one test result unless the source artifacts define such a conclusion.

Use factual status such as:

```text
Risk Test Case Failed
Risk Test Case Passed
Risk Test Case Blocked
Risk Test Case Not Executed
```

---

# 16. Skipped and Blocked Cases

Every selected case must end in:

```text
PASS
FAIL
SKIPPED
BLOCKED
```

For every `SKIPPED` or `BLOCKED` case, record the reason.

Examples:

```text
SKIPPED — Automation Feasibility = NO

SKIPPED — Execution Readiness = NOT_READY

BLOCKED — Required authentication unavailable

BLOCKED — Required test data unavailable

BLOCKED — Dependency service unavailable

BLOCKED — Required automation unavailable
```

Never silently remove a selected Risk-Based case.

---

# 17. Risk Coverage Reporting

The final report must distinguish:

### Risk-Based Scope

Total approved Risk-Based cases.

### Risk-Associated Cases

Cases with documented Risk IDs.

### Executable Cases

Cases satisfying all execution gates.

### Executed Cases

Cases actually executed.

### Passed Cases

Executed cases that passed.

### Failed Cases

Executed cases that failed.

### Blocked Cases

Cases that could not be reliably executed.

### Unexecuted Risk Cases

Risk-associated cases that were not executed.

### Information Gaps

Missing or incomplete risk/test information that affected execution or traceability.

Do not claim full Risk-Based coverage when cases remain:

* Not executed
* Skipped
* Blocked
* Missing required automation
* Missing required risk traceability

---

# 18. Risk Coverage Matrix

Where Risk IDs are available, include a matrix such as:

```text
Risk ID | Risk Description | TC ID | Layer | Status | Evidence | Defect/Issue
```

For multiple test cases associated with the same risk, list each test case separately.

Example:

```text
RISK-001 | Data integrity | TC-001 | API | PASS | evidence/API/TC-001 | -
RISK-001 | Data integrity | TC-002 | UI  | FAIL | evidence/UI/TC-002  | BUG-101
```

Do not collapse multiple test cases into one result when doing so would hide individual execution outcomes.

---

# 19. Pass Rate

Calculate pass rate only from executed cases:

```text
Pass Rate = PASS / Executed × 100
```

Do not include:

* SKIPPED
* BLOCKED

in the denominator.

If no Risk-Based cases were executed:

```text
Pass Rate = N/A
Reason = No executable Risk-Based cases completed
```

Do not use a fabricated `0%` pass rate.

---

# 20. Reconciliation

Before generating the final report, verify:

```text
Selected = Executed + Skipped + Blocked
```

and:

```text
Executed = PASS + FAIL
```

Also reconcile UI and API results separately.

Verify that every selected Risk-Based test case appears exactly once in the final result set.

Verify that every executed failed case has:

* Failure classification
* Evidence
* Defect/issue reference when applicable

If counts do not reconcile, report the discrepancy.

Do not fabricate results to force reconciliation.

---

# 21. Output

Create:

```text
test-results/<Feature>_Risk-Based_Execution_Report.md
```

The report must contain:

## Document Information

* Feature
* Execution Pack
* Execution date/time
* Environment
* Source artifacts
* Automation framework

## Risk-Based Scope

* Total Risk-Based cases
* Risk-associated cases
* UI cases
* API cases
* Risk categories documented upstream

## Risk Coverage

Include:

```text
Risk ID
Risk Description
Associated TC IDs
Executable
Executed
Passed
Failed
Blocked
Evidence
Defect/Issue
Coverage Status
```

## Execution Summary

Include:

* Selected count
* Executed count
* UI count
* API count
* PASS
* FAIL
* SKIPPED
* BLOCKED
* Pass rate

## Test Case Results

Include:

```text
Risk ID
TC ID
Requirement
Scenario
Layer
Status
Failure Classification
Evidence
Defect/Issue
```

## UI Risk-Based Results

Include:

* Executed UI cases
* PASS
* FAIL
* SKIPPED
* BLOCKED
* Failed TC IDs
* Risk IDs
* Evidence
* Defects/issues

## API Risk-Based Results

Include:

* Executed API cases
* PASS
* FAIL
* SKIPPED
* BLOCKED
* Failed TC IDs
* Risk IDs
* Evidence
* Defects/issues

## Bugs / Defects Found

For each application defect:

```text
Defect ID
Risk ID
TC ID
Layer
Expected
Actual
Classification
Evidence
```

## Automation Issues

List automation failures separately from application defects.

## Environment / Dependency Issues

List:

* Environment failures
* Authentication issues
* Configuration issues
* Dependency failures
* Test-data issues

## Information Gaps

List gaps affecting:

* Risk traceability
* Test execution
* Expected results
* Test data
* Environment
* Evidence
* Defect reporting

## Skipped / Blocked Cases

Include:

```text
Risk ID
TC ID
Reason
Impact on execution
```

## Evidence Index

Map:

```text
Risk ID → TC ID → Evidence
```

## Execution Readiness Summary

Include:

```text
READY
NOT_READY
EXECUTED
SKIPPED
BLOCKED
```

## Reconciliation

Show:

```text
Selected = Executed + Skipped + Blocked
Executed = PASS + FAIL
```

---

# 22. Report Integrity

The final report must:

* Reflect actual execution
* Preserve Risk ID traceability
* Preserve Test Case traceability
* Preserve evidence references
* Preserve defect/issue references
* Distinguish application defects from au
