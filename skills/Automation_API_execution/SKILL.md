---

name: api-test-execution
description: Execute approved, execution-ready API automation mapped to eligible test cases; collect sanitized evidence, classify failures, and report confirmed application defects. Never modify tests or expose secrets.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# API Test Execution

## Purpose

Execute only eligible API automation from approved test cases.

This skill owns:

* API automation execution
* execution status
* API evidence
* failure classification
* confirmed application defect reporting
* API execution report

This skill does NOT:

* generate test cases
* modify automation
* create automation code
* change specifications
* execute unrelated tests

## Inputs

Required:

* `API_AUTOMATION`
* `AUTOMATION_FEASIBILITY`

Recommended:

* `API_TEST_CASES`
* `TEST_CASE_ENGINEERING`

Optional:

* `TEST_PLAN`
* `SPEC`
* `REVIEW`
* `EXECUTION_PACK`

## Execution Gate

Execute only when ALL applicable conditions are satisfied:

1. Test Case ID exists and maps to an approved test case.
2. Test case is `READY`.
3. API automation exists for that TC.
4. Automation Feasibility = `YES`.
5. If Review exists, final status = `APPROVED`.
6. Test case belongs to the requested execution pack, when a pack is supplied.

Automation Feasibility mapping:

* `YES` → execute
* `PARTIAL` → skip unless explicitly authorized for partial execution
* `NO` → skip

If no eligible API automation exists:
`STOP — NO ELIGIBLE API AUTOMATION`

Never modify automation to make a test pass.

## Pack Filtering

When `EXECUTION_PACK` is supplied:

Execute only cases belonging to:

`SMOKE | CRITICAL | RISK-BASED | STANDARD`

Do not execute cases from another pack.

If a case has multiple execution tags, execute it once and preserve all applicable tags in the report.

## Execute

For every eligible TC:

1. Execute the existing API automation.
2. Record:

   * TC ID
   * Scenario ID
   * Pack
   * Method
   * Endpoint
   * Status
   * Assertions
   * Response time
   * Error/log information
3. Classify result:

`PASS | FAIL | SKIPPED | BLOCKED`

Do not infer expected behavior beyond the approved test case/source.

## Retry

Do not automatically retry failures unless a project-approved retry policy exists.

If retry is explicitly configured:

* preserve the original failure
* record retry result separately
* do not hide the original failure

## Evidence

Store/reference evidence under:

`test-results/`

Capture where supported:

* sanitized request
* sanitized response
* HTTP status
* assertion results
* response time
* execution logs
* error/stack information

Sanitize:

* passwords
* access tokens
* refresh tokens
* API keys
* cookies
* authorization headers
* credentials
* other secrets

Never expose secrets in reports, logs, defects, or evidence references.

## Failure Classification

Every `FAIL` and `BLOCKED` result must have one classification:

`APPLICATION DEFECT | AUTOMATION DEFECT | TEST DATA ISSUE | ENVIRONMENT ISSUE | CONFIGURATION ISSUE | SPECIFICATION GAP`

Use only source-supported expected behavior.

Do not infer root cause.

If root cause is unknown:

`Root cause unknown`

## Application Defects

Create a defect only when evidence supports:

`APPLICATION DEFECT`

Do NOT create application defects for:

* automation failures
* invalid test data
* environment failures
* configuration failures
* specification gaps

Deduplicate failures representing the same confirmed application issue.

Create/update:

`qa/defects/<Feature>_API_Defects.md`

Format:

`Defect ID | Title | Severity | Priority | Requirement ID | TC ID | Environment | Preconditions | Steps | Test Data | Expected | Actual | Reproducibility | Root Cause/Suspected Area | Evidence | Impact | Component | Traceability`

Preserve existing defect IDs.

## Output

Create:

`test-results/<Feature>_API_Execution_Report.md`

Include:

* execution scope
* execution pack
* total
* pass
* fail
* skipped
* blocked
* pass rate
* failed TC IDs
* failure classifications
* evidence references
* information/specification gaps
* defects created
* defect counts by classification
* execution timestamp/environment when available

## Quality Gate

Before completion verify:

* only eligible automation was executed
* no unrelated automation was executed
* no automation was modified
* every executed TC has a status
* every failure/block has a classification
* application defects are evidence-supported
* secrets are sanitized
* evidence references are valid
* report counts reconcile

## Final Status

Return:

`API_EXECUTION_COMPLETE`

or:

`API_EXECUTION_BLOCKED`

with the blocking reason.

Do not report a test as PASS unless the automation actually passed.
