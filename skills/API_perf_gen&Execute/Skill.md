---

name: api-performance-engineering

description: Convert approved API performance test cases into k6 scripts, execute them, collect evidence, and create confirmed application defects. Never invent performance requirements or workload values.

---

# API Performance Engineering

## Inputs

Required:

`API_PERFORMANCE_TEST_CASES`

Optional:

`TEST_PLAN | QA_ANALYSIS | SPEC`

Use Test Case Engineering output as the primary source.

No applicable API performance cases → **STOP; no gap**.

## Scope Gate

Process only existing API performance `TC-*`.

Do not create new cases.

No API performance scope → **STOP; no gap**.

## Source Rules

Use test cases first; use upstream sources only to resolve supported missing information.

Never invent:

`endpoint | method | payload | headers | auth | VUs | concurrency | load | duration | stages | throughput | response-time | metrics | thresholds | environment`

Missing required information → `INFORMATION GAP`; skip affected case.

## Tool

`k6`

Use project/source-supported configuration where available.

Never hardcode secrets.

## Script Generation

Convert each eligible `TC-*` into maintainable k6 automation.

Preserve:

`TC-* → k6 script`

Implement only source-defined workload, stages, VUs, duration, checks, metrics, and thresholds.

Do not alter test intent or values.

## Execution

Execute only generated scripts with complete required configuration.

Classify:

`PASS | FAIL | SKIPPED | BLOCKED`

Do not alter workload, environment, duration, concurrency, or thresholds.

If execution cannot safely proceed:

`BLOCKED` + reason.

## Evidence

Store/reference evidence under:

`test-results/performance/api/`

Capture where supported:

`execution summary | k6 output | metrics | errors | logs | request/response evidence`

For failures, capture relevant execution/error evidence.

Mask:

`passwords | tokens | API keys | cookies | credentials | secrets`

Do not create unnecessary evidence volume.

## Result Evaluation

Capture actual observed:

`response time | throughput | error rate | checks | source-defined metrics | threshold result`

If no source-defined acceptance threshold exists:

`PASS/FAIL = NOT DEFINED`

Do not infer performance acceptance.

## Failure Classification

Classify `FAIL` / `BLOCKED` where evidence supports:

`APPLICATION DEFECT | AUTOMATION DEFECT | TEST DATA ISSUE | ENVIRONMENT ISSUE | CONFIGURATION ISSUE | SPECIFICATION GAP`

Do not infer root cause.

## Defects

Create defects only for confirmed:

`APPLICATION DEFECT`

Do not create application defects for automation, data, environment, configuration, or specification failures.

Deduplicate same-root-cause failures.

Create:

`qa/defects/<Feature>_API_Performance_Defects.md`

Use:

`Defect ID | Title | Severity | Priority | Requirement ID | TC ID | Environment | Preconditions | Test Data | Expected | Actual | Reproducibility | Root Cause/Suspected Area | Evidence | Impact | Component | Traceability`

Rules:

* Expected/Actual must be source/evidence supported.
* Unknown root cause → `Root cause unknown`.
* Reference sanitized evidence.
* Preserve existing IDs.

## Output

Create:

`qa/results/performance/api/<Feature>_API_Performance_Results.md`

Include:

`TC ID | script | status | observed metrics | threshold status | failures | classification | evidence | defects | gaps/blockers`

Include defect counts by classification.

## Quality Gate

Verify:

* Every script maps to an existing `TC-*`.
* Only API performance cases are processed.
* No performance values/thresholds are invented.
* Evidence is captured and sanitized.
* Results are actual execution results.
* Confirmed application defects only are created.
* No functional/UI/DB cases are executed.
* No source artifact is modified.

---
