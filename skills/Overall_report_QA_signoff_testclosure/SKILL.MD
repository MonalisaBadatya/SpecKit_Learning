---

name: test-closure
description: Consolidate all QA execution results and evidence across automated, manual, and partial test cases, reconcile Smoke/Critical/Risk-Based/Pending execution packs, and produce one manager-ready QA closure report with final QA sign-off. Never invent missing evidence, requirements, defects, results, thresholds, or release criteria.
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Test Closure Skill

## 1. Purpose

Use `/test-closure` **after all applicable execution packs have been run**.

This skill performs two activities in one artifact:

1. **Execution Consolidation** — consolidate all test execution results.
2. **QA Closure & Sign-off** — assess the consolidated evidence and provide final QA status.

Execution methods supported:

* `AUTOMATED`
* `MANUAL`
* `PARTIAL`

Execution packs supported:

* `SMOKE`
* `CRITICAL`
* `RISK-BASED`
* `PENDING`

Do **not** execute tests, generate automation, modify test cases, or modify defects.

---

# 2. Inputs

### Required

* `TEST_PLAN`
* `TEST_CASES`
* `TEST_EXECUTION_RESULTS`
* `TEST_CASE_REVIEW`
* `DEFECTS`

`TEST_EXECUTION_RESULTS` may contain results from:

* Smoke execution
* Critical execution
* Risk-Based execution
* Pending execution
* UI automation
* API automation
* Manual execution
* Partial automation execution

### Optional

* `TRACEABILITY_MATRIX`
* `SPEC`
* `QA_ANALYSIS`
* `REGRESSION_RESULTS`
* Screenshots
* Videos/recordings
* API responses
* Playwright reports
* Automation logs
* Manual execution evidence
* Partial automation evidence

### Performance

Use:

* `PERFORMANCE_REPORT`

or, when applicable:

* `API_PERFORMANCE_RESULTS`
* `UI_PERFORMANCE_RESULTS`

Performance is required **only when Performance is included in the approved `TEST_PLAN`**.

---

# 3. Source-of-Truth Rules

Use only supplied artifacts.

Do not invent or infer:

* Requirements
* Test cases
* Execution results
* Expected/actual results
* Failure reasons
* Root causes
* Defects
* Severity
* Status
* Thresholds
* SLAs/SLOs
* Performance targets
* Risks
* Exit criteria
* Release criteria
* Acceptance conditions

If required information is unavailable, mark:

`INFORMATION GAP`

or, where applicable:

`NOT RECORDED`

`NOT AVAILABLE`

Never treat missing evidence as PASS.

Do not modify source artifacts.

---

# 4. Execution Consolidation

First identify and consolidate all available execution artifacts.

For every test case:

* Preserve original `TC ID`.
* Preserve test case name.
* Preserve execution pack.
* Preserve execution method.
* Preserve execution date/time when available.
* Preserve execution status.
* Preserve expected result.
* Preserve actual result.
* Preserve issue/failure information.
* Preserve evidence references.
* Preserve defect IDs.
* Preserve UI/API/DB/Regression classification when supplied.

### Execution Method

Use exactly:

* `AUTOMATED`
* `MANUAL`
* `PARTIAL`

Do not convert `PARTIAL` or `MANUAL` into `AUTOMATED`.

### Status

Preserve supplied status such as:

* `PASS`
* `FAIL`
* `BLOCKED`
* `SKIPPED`
* `NOT EXECUTED`
* `NOT RUN`

Do not convert:

* Skipped → PASS
* Blocked → PASS
* Not Executed → PASS
* Missing result → PASS

---

# 5. Duplicate / Multiple Execution Handling

A test case may appear in more than one execution pack.

Distinguish between:

* **Unique Test Case**
* **Execution Run**

Example:

`TC-001` may appear in Smoke and later in Pending.

Do not count it as two unique test cases.

Report both when useful:

`Unique TCs = 50`

`Total Execution Runs = 62`

If the same test case has multiple results:

* Preserve each execution when pack/date/status are materially different.
* Identify the latest result only when the execution timestamp clearly establishes it.
* Do not overwrite earlier execution history.
* If results conflict and cannot be resolved, report:

`Execution result conflict — source evidence requires review.`

---

# 6. Pack Reconciliation

Report results separately for:

### Smoke

* Planned
* Executed
* Passed
* Failed
* Blocked
* Skipped/Not Executed

### Critical

Same fields.

### Risk-Based

Same fields.

### Pending

Same fields.

Do not assume a test case belongs to a pack unless the source artifact identifies it.

---

# 7. Manager Summary — FIRST SECTION

The first section must provide a concise management view.

Include:

| Metric                | Result |
| --------------------- | ------ |
| Feature               |        |
| Execution Period      |        |
| Unique Test Cases     |        |
| Total Execution Runs  |        |
| Automated             |        |
| Manual                |        |
| Partial               |        |
| Executed              |        |
| Passed                |        |
| Failed                |        |
| Blocked               |        |
| Skipped               |        |
| Not Executed          |        |
| Open Defects          |        |
| Critical/High Defects |        |
| UI Result             |        |
| API Result            |        |
| DB Result             |        |
| Performance Result    |        |

Only include layers that are in approved scope.

Then provide:

### Pack Summary

| Pack       | Planned | Executed | Passed | Failed | Blocked | Not Executed |
| ---------- | ------: | -------: | -----: | -----: | ------: | -----------: |
| Smoke      |         |          |        |        |         |              |
| Critical   |         |          |        |        |         |              |
| Risk-Based |         |          |        |        |         |              |
| Pending    |         |          |        |        |         |              |

Then provide:

### Key Execution Issues

List only evidence-supported failures, blockers, defects, or gaps.

For each:

`TC ID | Pack | Execution Method | Issue | Defect | Status`

Do not provide an evaluative ranking of issues.

---

# 8. Detailed Test Execution Results

Create one consolidated table containing **all executed test cases**.

| Pack | TC ID | Test Case | Execution Method | Executed On | Status | Issue Observed | Why Failed | Expected | Actual | Evidence | Defect ID |
| ---- | ----- | --------- | ---------------- | ----------- | ------ | -------------- | ---------- | -------- | ------ | -------- | --------- |

Execution Method must be:

`AUTOMATED | MANUAL | PARTIAL`

For PASS cases:

* Do not invent issue information.
* Use `—` where no issue is recorded.

For FAIL cases:

* Include supplied failure reason.
* Include supplied defect.
* Include expected and actual results when available.

For unknown failure cause:

`Root cause not determined from available evidence.`

---

# 9. Manual Test Cases

Manual execution results must be included in the same consolidated report.

For manual cases:

* Preserve `Execution Method = MANUAL`.
* Include manual tester result when supplied.
* Include screenshots/recordings when supplied.
* Include defect ID when supplied.
* Do not require automation evidence.

Manual evidence may include:

* Screenshot
* Video
* Recorded actual result
* Manual execution log
* Defect reference

Do not mark a manual case as incomplete merely because no automation artifact exists.

---

# 10. Partial Automation Test Cases

For partial cases:

* Preserve `Execution Method = PARTIAL`.
* Include automated evidence.
* Include manual evidence.
* Include combined execution result.
* Identify failed step/portion when supplied.

Example:

`PARTIAL — Automation + Manual verification`

Do not classify the entire case as automated.

---

# 11. Failed Test Analysis

For every failed test case provide:

| TC ID | Test Case | Expected | Actual | Failure Reason | Classification | Defect | Severity/Status | Impact/Risk | Action |
| ----- | --------- | -------- | ------ | -------------- | -------------- | ------ | --------------- | ----------- | ------ |

Allowed classifications:

* `APPLICATION DEFECT`
* `AUTOMATION DEFECT`
* `TEST DATA ISSUE`
* `ENVIRONMENT ISSUE`
* `CONFIGURATION ISSUE`
* `SPECIFICATION GAP`

Use a classification only when supported by evidence.

If unsupported:

`Classification not determined from available evidence.`

A shared defect may be linked to multiple failed TCs. Preserve each TC-level relationship.

---

# 12. Defect Summary

Summarize supplied defects by:

* Defect ID
* Severity
* Status
* Layer
* Related TC IDs
* Related execution pack
* Performance-related status when applicable

Do not create, modify, merge, close, reopen, or reclassify defects.

Do not convert a test failure into a defect unless the supplied evidence identifies it as a defect.

---

# 13. UI / API / DB / Regression Results

Summarize results separately when those layers are in approved scope.

### UI

Include:

* Automated UI results
* Manual UI results
* Partial UI results
* Failures
* Evidence
* Defects

### API

Include:

* Automated API results
* Manual API results when supplied
* Failures
* Evidence
* Defects

### DB

Include only when DB testing is in approved scope.

### Regression

Include only when regression is in approved scope or supplied as an approved execution result.

Do not report an out-of-scope layer as a failure or information gap.

---

# 14. Performance Results

Assess Performance **only when included in the approved `TEST_PLAN`**.

Use `PERFORMANCE_REPORT` as the primary evidence when available.

Include:

* API performance
* UI/browser performance
* Workloads
* Requests
* p50
* p90
* p95
* p99
* Max
* Error %
* RPS
* PASS/FAIL status
* Source-defined thresholds/targets
* Performance defects
* Blocked/skipped performance coverage

Do not invent:

* Benchmarks
* SLAs
* SLOs
* Thresholds
* Workloads
* Concurrency
* Response-time targets
* Capacity limits

Preserve source status:

`PASS | FAIL | NOT DEFINED | BLOCKED`

`NOT DEFINED` is not automatically a failure.

---

# 15. Evidence Traceability

Every executed test should be traceable to available evidence where applicable.

Examples:

* UI → screenshot/video/Playwright report
* API → response/log/report
* Manual → screenshot/video/manual evidence
* Partial → automation + manual evidence
* Performance → performance report

Use the supplied evidence reference.

Do not embed sensitive information such as:

* Session cookies
* Authentication tokens
* Passwords
* Secrets
* API keys
* Personal authentication data

---

# 16. Planned vs Executed Coverage

Compare:

`TEST_PLAN → TEST_CASES → EXECUTION_RESULTS`

Report:

* Planned test cases
* Executed test cases
* Passed
* Failed
* Blocked
* Skipped
* Not Executed
* Execution method distribution
* Pack-wise execution

Never treat unexecuted coverage as passed.

Identify mandatory scope that remains unexecuted.

---

# 17. Traceability

When traceability artifacts exist, preserve:

`Requirement → Scenario → Test Case → Execution → Defect`

Use existing IDs such as:

* `REQ`
* `BR`
* `UI`
* `API`
* `DB`
* `SEC`
* `SCN`
* `TC`

Do not create missing traceability links by assumption.

---

# 18. Information Gaps

Create a dedicated section containing all missing or unsupported information.

Examples:

* Required execution result unavailable
* Evidence unavailable
* Expected/Actual not recorded
* Defect reference missing
* Required test case not executed
* Required environment information unavailable
* Exit criterion not defined in supplied artifacts

Do not mix `INFORMATION GAP` items into normal requirements/findings.

---

# 19. Residual Risks

List only risks supported by the available evidence.

Examples:

* Mandatory test case not executed
* Blocked required coverage
* Open critical/high defect
* Unresolved specification gap
* Unresolved environment limitation
* Performance criterion not defined when required by approved exit criteria

Do not invent risk severity or business impact.

---

# 20. Exit-Criteria Assessment

Compare actual evidence against exit criteria defined in the approved `TEST_PLAN` or other authoritative supplied artifact.

For each criterion:

| Exit Criterion | Required | Actual Evidence | Status | Gap |
| -------------- | -------- | --------------- | ------ | --- |

Use:

`MET | NOT MET | BLOCKED | NOT DEFINED`

Never invent exit criteria.

---

# 21. Final QA Status

After consolidating all execution evidence, return **exactly one**:

`QA SIGN-OFF`

or

`CONDITIONAL SIGN-OFF`

or

`NO SIGN-OFF`

or

`BLOCKED`

### QA SIGN-OFF

Use only when:

* Required scope is completed.
* Required exit criteria are satisfied.
* Available evidence supports completion.
* Failures/defects do not prevent release under the supplied criteria.
* No unacceptable release risk is identified in supplied evidence.

### CONDITIONAL SIGN-OFF

Use when:

* Known acceptable risks/open issues remain.
* Conditions or acceptance are explicitly documented.
* Required assessment has been completed.
* Release is permitted under those documented conditions.

### NO SIGN-OFF

Use when supplied evidence shows:

* Required exit criteria are not satisfied.
* Required mandatory coverage remains incomplete where this prevents closure.
* Unacceptable defect/failure exists according to supplied release criteria.
* Evidence supports that QA closure requirements are not met.

### BLOCKED

Use when:

* Mandatory evidence is unavailable.
* Required tests cannot be evaluated.
* Blocked execution prevents assessment of mandatory scope.

Never select a sign-off status based on assumptions.

---

# 22. Sign-off Rationale

Immediately after the final status, provide a concise evidence-based rationale.

Structure:

```text
Final QA Status: <ONE STATUS>

Rationale:
- Planned scope: ...
- Executed scope: ...
- Failed/blocked/unexecuted scope: ...
- Defect position: ...
- Performance position: ... [if applicable]
- Exit criteria: ...
- Key residual risks/gaps: ...
```

Do not introduce new facts in the rationale.

---

# 23. Final Report Structure

Create:

`qa/closure/<Feature>_QA_Closure.md`

Use this order:

1. **Executive / Manager Summary**
2. **Pack-wise Execution Summary**
3. **Detailed Test Execution Results**
4. **Failed Test Analysis**
5. **Defect Summary**
6. **UI Results**
7. **API Results**
8. **DB Results** — only if in scope
9. **Regression Results** — only if in scope
10. **Performance Results** — only if in scope
11. **Evidence Traceability**
12. **Planned vs Executed Coverage**
13. **Traceability**
14. **Information Gaps**
15. **Residual Risks**
16. **Exit-Criteria Assessment**
17. **Final QA Status**
18. **Sign-off Rationale**

Omit sections that are genuinely not applicable.

---

# 24. Final Validation

Before completing the report, verify:

* [ ] Smoke results included
* [ ] Critical results included
* [ ] Risk-Based results included
* [ ] Pending results included
* [ ] Automated cases included
* [ ] Manual cases included
* [ ] Partial cases included
* [ ] Duplicate executions reconciled
* [ ] Failed TCs individually traceable
* [ ] Expected/Actual preserved
* [ ] Failure reasons evidence-based
* [ ] Defects traceable
* [ ] Evidence traceable
* [ ] Performance assessed only when in scope
* [ ] No invented thresholds or criteria
* [ ] No skipped/blocked/unexecuted case treated as PASS
* [ ] Information gaps identified
* [ ] Exit criteria assessed only from supplied criteria
* [ ] Exactly one final QA status provided
* [ ] Sign-off rationale supported by evidence
* [ ] Sensitive authentication/session data excluded

---

# 25. Core Principle

**Consolidate execution evidence first.
Assess closure second.
Sign off last.**

The report must answer:

> **What was planned?
> What was executed?
> How was each test executed?
> What passed/failed/blocked/remained pending?
> What evidence supports the result?
> What defects were found?
> What gaps or risks remain?
> Does the supplied evidence support QA closure?**

## Do not reinterpret source evidence or make unsupported assumptions.
