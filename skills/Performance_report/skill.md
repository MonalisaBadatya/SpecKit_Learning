---

name: performance-report

description: Generate a traceable API/UI performance assessment from execution results. Analyze metrics against defined criteria, classify failures, link evidence and defects, and assess release readiness without inventing data or benchmarks.

---

# Performance Report

## Inputs

Required:

`API_PERFORMANCE_RESULTS`
`UI_PERFORMANCE_RESULTS`

Optional:

`API_PERFORMANCE_TEST_CASES | UI_PERFORMANCE_TEST_CASES | TEST_PLAN | DEFECTS | EVIDENCE`

Use execution results as primary evidence.

No applicable execution result → `INFORMATION GAP`.

## Rules

1. Use only supplied execution results, evidence, test cases, and plan.
2. Never invent metrics, workloads, thresholds, SLAs, benchmarks, causes, or release criteria.
3. Do not execute or modify tests/results.
4. Do not create test cases.
5. Omit unsupported layers; absence of a layer is not a gap.
6. Preserve existing traceability IDs.

IDs:

`REQ-* | BR-* | UI-* | API-* | SCN-* | TC-* | Defect-*`

---

## Scope

Report only executed API/UI performance coverage.

Include:

* API performance where API results exist.
* UI performance where UI results exist.
* Defined performance criteria and observed results.

---

## Performance Analysis

### API

Report only observed/source-defined:

`response time | throughput | error rate | checks | other defined metrics`

Compare results only against source-defined criteria.

### UI

Report only observed/source-defined:

`Lighthouse metrics | other defined metrics`

Compare only against source-defined criteria.

### Criteria Status

Use:

`PASS | FAIL | NOT DEFINED | BLOCKED`

* `PASS` = defined criteria satisfied.
* `FAIL` = defined criteria not satisfied.
* `NOT DEFINED` = no acceptance criterion supplied.
* `BLOCKED` = execution could not complete.

Never use industry-standard values as acceptance criteria.

---

## Failure Classification

Classify each performance failure/blocker using available evidence:

`APPLICATION DEFECT | PERFORMANCE REGRESSION | AUTOMATION DEFECT | TEST DATA ISSUE | ENVIRONMENT ISSUE | CONFIGURATION ISSUE | SPECIFICATION GAP`

Use `PERFORMANCE REGRESSION` only when evidence supports a regression against an existing baseline/source-defined comparison.

Otherwise use the appropriate classification.

Do not infer root cause.

---

## Defects

Report existing defects and create/reference only confirmed application defects supplied by execution.

For confirmed defects capture:

`Defect ID | TC ID | Requirement ID | Severity | Classification | Expected | Actual | Impact | Evidence | Traceability`

Do not convert every performance failure into an application defect.

Deduplicate related failures.

Unknown root cause → `Root cause unknown`.

---

## Evidence

Reference available evidence:

`k6 results | Lighthouse reports | screenshots | recordings | logs | error output | execution artifacts`

For each significant failure link:

`TC → metric/criterion → failure → evidence → defect`

Do not duplicate large evidence.

---

## Traceability

Preserve and map existing IDs:

`Requirement → Scenario → TC → Execution → Metric → Criterion → Finding/Defect`

If an applicable result cannot be traced:

`INFORMATION GAP`

Never invent IDs.

---

## Risks / Findings

Summarize only evidence-supported:

* criteria failures
* significant performance degradation
* application defects
* repeated failures
* blocked coverage
* environment/configuration effects
* missing criteria affecting assessment

Do not state unsupported root causes.

---

## Release Assessment

Use:

`READY | READY WITH RISKS | NOT READY | BLOCKED | NOT DETERMINABLE`

Base assessment on:

`defined criteria | execution results | confirmed defects | failure severity | blocked coverage | documented release criteria`

Rules:

* `READY` → applicable defined criteria pass and no evidence-supported release blocker.
* `READY WITH RISKS` → no confirmed release blocker, but documented risks remain.
* `NOT READY` → evidence shows applicable criteria failure or documented release-blocking defect.
* `BLOCKED` → execution/coverage prevents required assessment.
* `NOT DETERMINABLE` → required acceptance/release criteria are not defined.

Never invent release gates, severity thresholds, or approval rules.

---

## Output

Create:

`qa/reports/performance/<Feature>_Performance_Report.md`

Include only applicable sections:

1. Executive Summary
2. Scope & Coverage
3. API Performance
4. UI Performance
5. Criteria / Metrics Evaluation
6. Failure & Defect Analysis
7. Evidence
8. Traceability
9. Risks / Findings
10. Release Assessment
11. Information Gaps

### Summary

| Layer   | Total | Pass | Fail | Blocked | Not Defined |
| ------- | ----: | ---: | ---: | ------: | ----------: |
| API     |       |      |      |         |             |
| UI      |       |      |      |         |             |
| Overall |       |      |      |         |             |

### Failure / Defect Summary

`TC ID | Layer | Metric/Criteria | Classification | Severity | Defect | Evidence | Impact`

---

## Quality Gate

Before saving verify:

* Results match execution evidence.
* Metrics are observed/source-defined.
* Criteria are source-defined.
* Failures are classified from evidence.
* Defects remain traceable.
* Evidence is referenced.
* Release assessment is evidence-based.
* Unsupported layers are omitted.
* No benchmarks, thresholds, causes, or release gates are invented.
* No tests or scripts are executed/created.

## Completion

Return only:

1. **Report created** — path
2. **API/UI results** — concise counts
3. **Failures/defects** — concise
4. **Release assessment** — status + key reason
5. **Information gaps** — concise

---
