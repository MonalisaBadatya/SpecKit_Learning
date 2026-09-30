---

name: ui-playwright-execution
description: Execute approved, execution-ready Playwright UI automation mapped to eligible test cases; collect sanitized UI evidence, classify failures, and report confirmed application defects. Never modify tests or expose secrets.
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# UI Playwright Execution

## Purpose

Execute only eligible Playwright UI automation from approved test cases.

This skill owns:

* Playwright execution
* execution status
* UI evidence
* failure classification
* confirmed application defect reporting
* UI execution report

This skill does NOT:

* generate test cases
* modify automation
* create automation code
* change specifications
* execute unrelated tests

## Inputs

Required:

* `UI_AUTOMATION`
* `AUTOMATION_FEASIBILITY`

Recommended:

* `UI_TEST_CASES`
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
3. Playwright automation exists for that TC.
4. Automation Feasibility = `YES`.
5. If Review exists, final status = `APPROVED`.
6. Test case belongs to the requested execution pack, when a pack is supplied.

Automation Feasibility mapping:

* `YES` → execute
* `PARTIAL` → skip unless explicitly authorized for partial execution
* `NO` → skip

If no eligible UI automation exists:

`STOP — NO ELIGIBLE UI AUTOMATION`

Never modify automation to make a test pass.

## Pack Filtering

When `EXECUTION_PACK` is supplied:

Execute only:

`SMOKE | CRITICAL | RISK-BASED | STANDARD`

Do not execute cases outside the requested pack.

If a case has multiple execution tags, execute it once and preserve all applicable tags.

## Execute

For every eligible TC:

1. Execute the existing Playwright automation.
2. Record:

   * TC ID
   * Scenario ID
   * Pack
   * browser/environment
   * status
   * assertions
   * execution duration
   * error information

Classify:

`PASS | FAIL | SKIPPED | BLOCKED`

Expected behavior must come from the approved test case/source.

## Retry

Do not automatically retry failures unless an approved project retry policy exists.

If retry is configured:

* preserve original failure evidence
* record retry separately
* do not replace the original failure with the retry result

## Evidence

Store/reference evidence under:

`test-results/`

For failed/blocked tests, collect where supported:

* Screenshot
* Video
* Trace
* Console logs
* Network errors
* Execution logs
* Stack trace

Screenshot is required for failed/blocked UI cases when supported by Playwright.

For passing tests, collect only configured/useful evidence.

Audio is required only when explicitly tested.

Sanitize:

* passwords
* tokens
* cookies
* credentials
* personal/sensitive data
* other secrets

## Failure Classification

Every `FAIL` and `BLOCKED` result must have one classification:

`APPLICATION DEFECT | AUTOMATION DEFECT | TEST DATA ISSUE | ENVIRONMENT ISSUE | CONFIGURATION ISSUE | SPECIFICATION GAP`

Do not infer root cause.

If unknown:

`Root cause unknown`

## Application Defects

Create a defect only when evidence supports:

`APPLICATION DEFECT`

Do NOT create application defects for:

* Playwright/automation failures
* test data problems
* environment problems
* configuration problems
* specification gaps

Deduplicate failures representing the same confirmed application issue.

Create/update:

`qa/defects/<Feature>_UI_Defects.md`

Format:

`Defect ID | Title | Severity | Priority | Requirement ID | TC ID | Environment | Preconditions | Steps | Test Data | Expected | Actual | Reproducibility | Root Cause/Suspected Area | Evidence | Impact | Component | Traceability`

Preserve existing defect IDs.

## Output

Create:

`test-results/<Feature>_UI_Execution_Report.md`

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
* defects
* defect counts by classification
* environment/browser when available

## Quality Gate

Verify:

* only eligible automation was executed
* no unrelated automation was executed
* automation was not modified
* every executed TC has a status
* every failure/block has a classification
* failed/blocked UI cases have screenshots when supported
* defects are evidence-supported
* secrets are sanitized
* evidence references are valid
* report counts reconcile

## Final Status

Return:

`UI_EXECUTION_COMPLETE`

or:

`UI_EXECUTION_BLOCKED`

with the blocking reason.

Do not report PASS unless the automation actually passed.
