---

name: ui-performance-engineering

description: Convert approved UI performance test cases into Lighthouse execution, collect evidence, and create confirmed application defects. Never invent performance requirements or thresholds.

---

# UI Performance Engineering

## Inputs

Required:

`UI_PERFORMANCE_TEST_CASES`

Optional:

`TEST_PLAN | QA_ANALYSIS | SPEC`

Use Test Case Engineering output as the primary source.

No applicable UI performance cases → **STOP; no gap**.

## Scope Gate

Process only existing UI performance `TC-*`.

Do not create new cases.

No UI performance scope → **STOP; no gap**.

## Source Rules

Use test cases first; use upstream sources only for supported missing information.

Never invent:

`URL | page/flow | browser/device | network | iterations | environment | metrics | thresholds | performance expectations`

Missing required information → `INFORMATION GAP`; skip affected case.

## Tool

`Lighthouse`

Use project/source-supported configuration where available.

Never hardcode secrets.

## Script Generation

Convert each eligible `TC-*` into maintainable Lighthouse automation/configuration.

Preserve:

`TC-* → Lighthouse execution`

Implement only source-defined:

`page/flow | environment | device | network conditions | iterations | metrics | thresholds`

Do not alter test intent or values.

## Execution

Execute only generated automation/configuration with complete inputs.

Classify:

`PASS | FAIL | SKIPPED | BLOCKED`

Do not alter execution conditions.

Missing required configuration:

`BLOCKED` + reason.

## Evidence

Store/reference evidence under:

`test-results/performance/ui/`

Capture where supported:

`Lighthouse report | screenshot | recording/video | metrics | console errors | network errors | execution logs`

For failed/blocked runs, capture relevant screenshots and execution evidence where supported.

Capture recording/video only when supported/configured and useful for diagnosing the failure.

Avoid unnecessary evidence volume.

Mask sensitive information.

## Result Evaluation

Capture actual observed/source-defined metrics, including applicable Lighthouse metrics.

Evaluate thresholds only when source-defined.

If no acceptance threshold exists:

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

`qa/defects/<Feature>_UI_Performance_Defects.md`

Use:

`Defect ID | Title | Severity | Priority | Requirement ID | TC ID | Environment | Preconditions | Test Data | Expected | Actual | Reproducibility | Root Cause/Suspected Area | Evidence | Impact | Component | Traceability`

Rules:

* Expected/Actual must be source/evidence supported.
* Unknown root cause → `Root cause unknown`.
* Reference screenshots, recordings, Lighthouse reports, logs, and other relevant evidence.
* Preserve existing IDs.

## Output

Create:

`qa/results/performance/ui/<Feature>_UI_Performance_Results.md`

Include:

`TC ID | execution | status | observed metrics | threshold status | failures | classification | evidence | defects | gaps/blockers`

Include defect counts by classification.

## Quality Gate

Verify:

* Every execution maps to an existing `TC-*`.
* Only UI performance cases are processed.
* No metrics/thresholds/conditions are invented.
* Evidence is captured and sanitized.
* Results are actual execution results.
* Confirmed application defects only are created.
* No functional/API/DB cases are executed.
* No source artifact is modified.

---
