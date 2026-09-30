---
name: testcase-review
description: Independently review generated test cases for correctness, coverage, traceability, duplication and automation suitability.
---

# Test Case Review

## Inputs
Required:
- `UI_TEST_CASES`
- `API_TEST_CASES`
- `DB_TEST_CASES`
- `REGRESSION_TEST_CASES`

Reference when needed:
- `QA_ANALYSIS`
- `SPEC`

Use source requirements only to validate disputed or unsupported behavior.

## Review

Check:
- traceability/requirement coverage
- positive/negative/boundary
- validation/errors
- UI/API/DB/security
- regression
- duplicates
- missing cases
- incorrect assumptions/results
- test data
- priority/risk
- automation suitability

Severity:
`CRITICAL | HIGH | MEDIUM | LOW`

Finding:
`TC ID | Severity | Issue | Spec Reference | Recommendation`

Create:
`qa/reviews/<Feature>_TestCase_Review.md`

Include:
- counts by layer
- gaps
- duplicates
- information gaps
- automation blockers

Final status:
`APPROVED` or `CHANGES_REQUIRED`

Do not modify test cases or generate automation.