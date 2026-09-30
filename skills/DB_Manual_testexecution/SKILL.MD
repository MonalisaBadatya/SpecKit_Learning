---
name: db-test-execution
description: Execute approved DB test cases manually against the supported database, capture database evidence, classify failures, and report confirmed application defects. Never modify test cases or expose sensitive data.
---

# DB Test Execution

## Inputs

Required:
- `REVIEW`
- `DB_TEST_CASES`
- `SPEC`

Optional:
- `QA_ANALYSIS`
- `TEST_PLAN`
- `EXECUTION_OUTPUT` (`test-results/`)
- `DEFECT_OUTPUT` (`qa/defects/`)

## Gate

Read `REVIEW` first.

Proceed only if:

`FINAL STATUS = APPROVED`

Execute only approved/eligible `TC-*` DB test cases.

Do not modify test cases to make failures pass.

## Execution

Execute DB validation **manually/directly against the supported database** using the project's approved DB access method.

Classify each case:

`PASS | FAIL | SKIPPED | BLOCKED`

For each case record:

- TC ID
- expected DB state
- actual DB state
- validation/query performed
- result
- failure details

Use only DB technology, schema, entities, fields, queries, and expected states explicitly supported by `SPEC`/test case.

Never invent schema, queries, relationships, or DB behavior.

## Evidence

Store/reference evidence under `test-results/`.

Capture, where applicable:

- sanitized query/validation performed
- expected vs actual DB state
- relevant result/output
- affected entity/table/record reference
- execution timestamp/environment
- DB error/message
- supporting logs or screenshots

Do not expose passwords, connection strings, credentials, tokens, PII, or sensitive record values.

Mask sensitive data in evidence.

## Failure Classification

Classify every `FAIL`/`BLOCKED`:

`APPLICATION DEFECT | TEST DATA ISSUE | ENVIRONMENT ISSUE | CONFIGURATION ISSUE | SPECIFICATION GAP`

Use `AUTOMATION DEFECT` only if an automation artifact is unexpectedly involved.

Expected DB behavior must be supported by the specification/test case.

## Defects

Create defects **only** for confirmed `APPLICATION DEFECT`.

Do not report data, environment, configuration, or specification issues as application bugs.

Deduplicate failures caused by the same root cause.

Create:

`qa/defects/<Feature>_DB_Defects.md`

Fields:

`Defect ID | Title | Severity | Priority | Requirement ID | Test Case ID | Environment | Preconditions | Steps to Reproduce | Test Data | Expected Result | Actual Result | Reproducibility | Root Cause / Suspected Area | Evidence | Impact | Suggested Component | Traceability`

Rules:
- Expected/Actual must be specification/evidence based.
- Never invent root cause; use `Root cause unknown`.
- Never invent schema or DB behavior.
- Reference sanitized DB evidence.
- Flag specification gaps separately.
- Identify related/duplicate failures.

## Output

Create:

`test-results/<Feature>_DB_Execution_Report.md`

Include:

- total/pass/fail/skipped/blocked
- pass rate
- failed TC IDs
- failure classification
- expected vs actual summary
- evidence locations
- issues
- specification gaps
- defects created
- defect counts by classification

Do not execute unrelated tests.