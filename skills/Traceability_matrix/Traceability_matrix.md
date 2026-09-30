---
name: traceability-matrix
description: Build a bidirectional requirement-to-test traceability matrix from available QA artifacts and identify coverage gaps without inventing mappings.
---

# Traceability Matrix

## Inputs

Required:
- `SPEC`
- `QA_ANALYSIS`

Use available:
- `TEST_PLAN`
- `TEST_SCENARIOS`
- `UI_TEST_CASES`
- `API_TEST_CASES`
- `DB_TEST_CASES`
- `REGRESSION_TEST_CASES`
- `EXECUTION_RESULTS`
- `DEFECTS`

## Mapping

Trace supported relationships:

`Requirement → Scenario → Test Case → Regression → Automation → Execution → Defect`

Preserve existing IDs:

`REQ-* | BR-* | UI-* | API-* | DB-* | SCN-* | TC-* | BUG-*`

Never invent IDs or relationships.

## Coverage Status

Classify each requirement:

`COVERED | PARTIAL | NOT COVERED | NOT EXECUTED | FAILED | BLOCKED | INFORMATION GAP`

Identify:

- requirements without tests
- scenarios without test cases
- test cases without execution
- failed/blocked tests
- defects without source test
- regression gaps
- automation gaps
- information gaps

A related test does not equal coverage unless traceability is supported.

## Output

Create:

`qa/traceability/<Feature>_Traceability_Matrix.md`

### Matrix

| Requirement | Scenario | UI TC | API TC | DB TC | Regression | Automation | Execution | Defect | Status |
|---|---|---|---|---|---|---|---|---|---|

### Summary

Include:

- total requirements
- covered / partial / not covered
- not executed / failed / blocked
- test and automation coverage
- defects
- information gaps
- overall traceability status

Use only supplied artifacts.