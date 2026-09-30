---

name: test-scenarios

description: Generate high-level, traceable test scenarios from QA analysis and test plan. Generate only source-supported testing layers.

---

# Test Scenarios

## Inputs

Required:

* `QA_ANALYSIS`
* `TEST_PLAN`

Fallback:

* `SPEC` — only for missing/ambiguous information.

## Rules

1. `QA_ANALYSIS` is the primary requirement source.
2. `TEST_PLAN` defines approved scope and strategy.
3. Use only supported behavior.
4. Missing/ambiguous information needed for an identified scenario → `INFORMATION GAP`.
5. Preserve existing IDs; never invent requirement IDs.
6. Do not modify inputs.
7. Do not create test cases, steps, automation, or code.
8. Keep scenarios high-level.
9. **Do not generate a layer unless the source/test plan supports it.**

## Layer Gate

Generate scenarios only for layers supported by `QA_ANALYSIS`, `SPEC`, or `TEST_PLAN`:

`UI | API | DB | Security | Integration | Performance`

If a layer has no supporting requirement/functionality:

**Omit it completely.**

Examples:

* No DB information → no DB scenarios.
* No API information → no API scenarios.
* No UI information → no UI scenarios.
* No performance scope → no performance scenarios.

Do not mark an unsupported layer as an `INFORMATION GAP`.

## Output

Create/update:

`qa/scenarios/<Feature>_TestScenarios.md`

Generate applicable scenarios for:

* Functional
* UI
* API
* DB
* Positive
* Negative
* Boundary
* Validation / Error handling
* Authentication / Authorization / MFA / SSO
* Session / Navigation
* Security / Integration
* Regression
* API Performance
* UI Performance

Use:

`SCN-<FEATURE>-xxx`

## Performance

Generate API/UI performance scenarios only when performance is supported by the sources or included in the test plan.

Use only documented performance requirements, affected functionality, workloads, or measurable criteria.

Do not invent:

`response time | throughput | concurrency | users | duration | load | SLA | threshold`

If performance is clearly in scope but a required detail is missing, mark that detail `INFORMATION GAP`.

## Fields

| Scenario ID | Requirement ID | Title | Layer | Type | Priority | Risk | Preconditions | Expected Outcome | Traceability |
| ----------- | -------------- | ----- | ----- | ---- | -------- | ---- | ------------- | ---------------- | ------------ |

## Quality Gate

* Every scenario maps to supported scope.
* Unsupported layers are absent.
* No invented behavior or IDs.
* Performance scenarios are source-supported.
* No test cases or procedural steps.
* Gaps are explicit only where information is actually required.
* Traceability is preserved.

## Completion

Return only:

1. **File created** — path
2. **Scenario count** — count
3. **Layer coverage** — concise
4. **Information gaps** — count

---
