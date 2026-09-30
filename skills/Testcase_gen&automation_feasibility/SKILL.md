---

name: testcase-engineering
description: Generate execution-ready, traceable test cases from the approved Test Plan, with exactly one authoritative Primary Pack per test case, review status, automation feasibility, execution readiness, coverage gaps, and reconciled counts. Do not execute tests or generate automation code.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Test Case Engineering Skill

## 1. Purpose

Use:

`/testcase-engineering`

Workflow:

`SPEC → QA ANALYSIS → TEST PLAN → TEST CASE ENGINEERING → EXECUTION PACK → EXECUTION → REPORT`

Generate detailed Test Cases from the approved Test Plan and provide in the same artifact:

* UI/API/DB/Integration/Security/Performance cases where applicable
* Regression coverage where applicable
* Smoke cases
* Critical cases
* Risk-Based cases
* Standard cases
* Test Case review status
* Review findings
* Automation feasibility: `YES | NO | PARTIAL`
* Execution readiness: `READY | NOT_READY`
* Information Gaps
* Coverage Gaps
* Duplicate findings
* Reconciled counts

This skill produces **execution-ready Test Cases**.

It MUST NOT:

* Execute tests
* Generate automation code
* Modify the source Test Plan
* Invent unsupported requirements or behavior
* Claim actual execution results
* Fabricate evidence

---

# 2. Source & Authority

## Primary Input

`TEST_PLAN`

## Optional Inputs

* Existing approved Test Cases
* Separate `TEST_SCENARIOS`
* Project/tool configuration
* Existing QA artifacts

## Fallback

`QA_ANALYSIS → SPEC`

## Source Priority

`TEST_PLAN > TEST_SCENARIOS > QA_ANALYSIS > SPEC`

The Test Plan is authoritative for:

* Requirements
* Scope
* Scenarios
* Applicable testing layers
* Priorities
* Risks
* Primary Pack classification
* Performance scope
* Data/environment constraints
* Execution strategy

If sources conflict:

`INFORMATION GAP`

Never invent:

`requirements | behavior | endpoints | contracts | schema | selectors | credentials | data | environments | dependencies | expected results | performance values | thresholds | SLA/SLO`

---

# 3. Generation Boundary

The Test Plan defines:

`Requirement → Scenario → Primary Pack`

This skill creates:

`Requirement → Scenario → Test Case → Primary Pack`

A Test Case defines **HOW the scenario is validated**.

Each Test Case must contain:

* Test Case ID
* Scenario ID
* Requirement
* Primary Pack
* Layer
* Type
* Title
* Preconditions
* Test Data
* Steps
* Expected Result
* Priority
* Risk
* Traceability

Do not create new requirements or business rules while expanding scenarios.

If required information is unavailable:

`INFORMATION GAP`

---

# 4. Test Case ID Rules

Generate unique Test Case IDs for newly created cases.

Use an existing project convention when defined.

Otherwise:

`TC-001, TC-002, TC-003...`

Rules:

* Preserve existing approved Test Case IDs.
* Never duplicate an existing Test Case.
* Never overwrite an existing ID.
* Never fabricate Requirement or Scenario IDs.
* Preserve source Requirement/Scenario IDs exactly.
* New Test Case IDs must be unique within the feature.

---

# 5. Applicability & Layer Gate

Generate Test Cases only for layers supported by the Test Plan.

Supported layers when explicitly applicable:

`UI | API | DB | Integration | Security | Performance`

Regression is treated as a **test objective/type/tag**, not automatically as a separate testing layer.

If the Test Plan explicitly defines Regression as a layer, follow that project definition and document it.

If a layer is unsupported:

* Omit it.
* Do not create an empty file.
* Do not create placeholder cases.

Examples:

`No API scope → No API cases`

`No DB scope → No DB cases`

`No Performance scope → No Performance cases`

Do not introduce unsupported testing layers.

---

# 6. Primary Pack Assignment

Every Test Case MUST have exactly one:

`Primary Pack`

Allowed values:

`SMOKE | CRITICAL | RISK-BASED | STANDARD`

## Primary Pack Is the Authoritative Identifier

The `Primary Pack` field is the **single authoritative identifier for execution-pack membership**.

Execution-pack membership MUST be determined from the Test Case's `Primary Pack` value.

Do NOT infer Primary Pack from:

* Priority
* Risk
* Type
* Layer
* Automation Feasibility
* Complexity
* Test Case title
* Scenario name
* Severity
* Business importance
* Automation status

Example:

A Test Case may have:

`Primary Pack = SMOKE`

and:

`Risk = CRITICAL`

This is valid.

The Test Case remains a Smoke test case because `Primary Pack` is authoritative.

## Primary Pack Rules

* Every TC MUST have exactly one Primary Pack.
* Do not leave Primary Pack blank.
* Do not assign multiple Primary Packs.
* Do not reclassify packs during execution.
* Do not count a TC in a pack because it appears "high risk" or "critical".
* Pack counts MUST be derived from the final Test Case table.
* Pack Summary MUST exactly match the final Test Case table.

## Smoke

Minimum feature-health validation.

Applicable coverage may include:

* Feature accessibility
* Primary workflow
* Primary API operation
* Essential business rule
* Critical state/persistence
* Critical authorization/integration

## Critical

High-impact functionality required for feature correctness.

Applicable coverage may include:

* Core workflows
* Critical state transitions
* Data integrity
* Authorization
* Concurrency/OCC
* Critical integrations
* High-impact negative paths
* Critical performance

## Risk-Based

Coverage derived from documented/source-supported risks.

Possible areas:

`data corruption | historical/future data | concurrency | security | integration | complex rules | boundaries | high-impact regression | performance | fragile UI`

Do not invent risks.

## Standard

Remaining applicable scenarios required for planned coverage that are not classified as Smoke, Critical, or Risk-Based.

Do not force a scenario into multiple Primary Packs.

If the Test Plan explicitly supports secondary pack tags, store them separately as tags. They MUST NOT replace `Primary Pack`.

---

# 7. Pack vs Priority vs Risk vs Type vs Layer

These dimensions MUST remain separate.

| Field        | Meaning                                                                        |
| ------------ | ------------------------------------------------------------------------------ |
| Primary Pack | Execution-pack ownership                                                       |
| Priority     | Importance of executing the test                                               |
| Risk         | Potential impact/risk represented by the test                                  |
| Type         | Test characteristic/objective such as Positive, Negative, Boundary, Regression |
| Layer        | Technical/application layer being tested                                       |

Do not use one dimension to calculate another.

For example:

`Risk = Critical` does NOT mean `Primary Pack = Critical`.

`Type = Regression` does NOT mean `Layer = Regression`.

`Layer = Performance` does NOT automatically mean `Primary Pack = Critical`.

---

# 8. Test Case Coverage

Generate cases from Test Plan scenarios.

## UI

Cover applicable:

* Entry points
* Navigation
* Controls
* Forms
* Dialogs/drawers
* Validations
* Messages/errors
* State changes
* Loading/synchronization
* Authentication/session
* Authorization/RBAC
* MFA/SSO
* Supported security behavior

## API

Cover applicable:

* Endpoint/method
* Request
* Response
* Required/optional fields
* Headers
* Authentication
* Authorization
* Status codes
* Validation
* Error handling
* Business rules
* State transitions
* Concurrency/OCC
* Boundaries

Only generate API cases for supported API scenarios.

## DB

Cover only explicitly supported:

* Entities
* Tables
* Columns
* Relationships
* Persistence
* State
* Data integrity
* OCC/version
* Audit data
* Transactions/rollback when specified

Never infer database schema.

## Integration

Cover only integrations explicitly identified in the Test Plan/specification.

Do not invent supporting endpoints, queues, services, or contracts.

## Security

Cover only documented security requirements such as:

* Authentication
* Authorization
* RBAC
* Security boundaries
* Security-related validation
* Documented lockouts or restrictions

Do not invent security behavior.

## Regression

Select regression coverage from supported regression scenarios based on:

* Change impact
* Business criticality
* Risk
* Existing affected functionality

Regression should normally be represented in `Type` or `Tags`.

Do not create generic regression cases.

## Performance

Generate only from Test Plan performance scenarios.

---

# 9. Performance Test Cases

Use only performance requirements and scenarios defined upstream.

## API Performance

Tool:

`k6 HTTP`

Use only defined:

* Endpoint/operation
* Workload
* VUs
* RPS
* Concurrency
* Duration
* Load type
* Response-time target
* Percentile target
* Throughput
* Error-rate target
* Threshold
* SLA/SLO
* Data
* Environment
* Dependencies

## UI Performance

Tool:

`k6/browser` or explicitly approved browser-performance tooling.

Use only defined:

* Workflow/page
* Navigation
* User/load conditions
* Browser conditions
* Rendering expectations
* Response expectations
* Thresholds
* Environment constraints

Never invent performance values.

If a performance target is proposed but not formally approved:

* Record it as an `INFORMATION GAP`.
* Do not silently convert it into an approved release threshold.
* Mark affected Test Case `NOT_READY` when the missing information prevents deterministic execution.

---

# 10. Test Case Format

Use:

| TC ID | Scenario ID | Requirement | Primary Pack | Layer | Type | Title | Preconditions | Test Data | Steps | Expected Result | Priority | Risk | Traceability |
| ----- | ----------- | ----------- | ------------ | ----- | ---- | ----- | ------------- | --------- | ----- | --------------- | -------- | ---- | ------------ |

## Test Case Rules

Cases must be:

* Atomic
* Specific
* Executable
* Traceable
* Deterministic where supported
* Independent where practical
* Free from unsupported assumptions

Expected Results must be derived from source-supported behavior.

---

# 11. Test Data

Use only source/project-defined data.

Classify where applicable:

`STATIC | DYNAMIC | BOUNDARY | NEGATIVE | ROLE | STATE | API | DB | EXTERNAL | PERFORMANCE`

If required data is missing:

`INFORMATION GAP`

Do not invent concrete values.

---

# 12. Review

Review every generated Test Case before marking it execution-ready.

Check:

`traceability | coverage | layer | primary pack | positive/negative/boundary | validation | errors | security | data | dependencies | assertions | expected results | steps | duplicates | assumptions | performance`

## Status

Each Test Case receives:

`APPROVED | CHANGES_REQUIRED`

### APPROVED

Use when:

* Traceability is complete.
* Expected results are source-supported.
* Required information exists.
* No blocking Critical/High issue exists.
* No unsupported assumption exists.

### CHANGES_REQUIRED

Use when:

* Required information is missing.
* Traceability is incomplete.
* Expected result is unsupported.
* Duplicate exists.
* Critical/High issue exists.
* Unsupported behavior was introduced.

Do not silently alter upstream requirements to make a case pass review.

---

# 13. Review Findings

Format:

| TC ID | Severity | Category | Issue | Source Reference | Recommendation |
| ----- | -------- | -------- | ----- | ---------------- | -------------- |

Severity:

`CRITICAL | HIGH | MEDIUM | LOW`

Categories:

`TRACEABILITY | COVERAGE | DATA | EXPECTED_RESULT | STEPS | DUPLICATE | ASSUMPTION | LAYER | PACK | PERFORMANCE | DEPENDENCY`

---

# 14. Automation Feasibility

Assess automation feasibility for every applicable:

`UI | API | Performance`

DB automation is assessed only when an approved project DB automation approach exists.

Evaluate:

`Value | Stability | Repeatability | Feasibility | Maintenance | Data Setup | Environment Dependency | External Dependency | Assertion Clarity`

## Decision

Use exactly:

`YES | NO | PARTIAL`

### YES

Suitable for automation using supported project tooling.

### NO

Automation is not appropriate or is blocked by a documented limitation.

### PARTIAL

Some validation can be automated while another part requires manual validation.

Do not make an automation decision based on unsupported assumptions.

## Important

Automation Feasibility does NOT determine:

* Primary Pack
* Priority
* Risk
* Execution Readiness

These are separate attributes.

A Test Case may be:

`Automation = YES`

but:

`Execution Readiness = NOT_READY`

if required source information or test data is missing.

---

# 15. Automation Framework

Use the existing project framework when defined.

Otherwise use only explicitly supported tooling.

Default mapping when project context supports it:

| Layer       | Tool                                  |
| ----------- | ------------------------------------- |
| UI          | Playwright                            |
| API         | pytest + httpx                        |
| Performance | k6 / k6/browser                       |
| DB          | Approved project DB automation method |

Unknown required tooling:

`INFORMATION GAP`

Do not generate automation code.

---

# 16. Automation Feasibility Format

Include:

| TC ID | Layer | Automation | Framework | Priority | Complexity | Reason | Blocker/Risk |
| ----- | ----- | ---------- | --------- | -------- | ---------- | ------ | ------------ |

Automation:

`YES | NO | PARTIAL`

Only recommend a framework supported by project context.

---

# 17. Traceability

Maintain:

`Requirement → Scenario → Test Case → Primary Pack`

Every Test Case must map to:

* Requirement
* Scenario
* Layer
* Primary Pack
* Risk where applicable

Downstream execution extends this to:

`Requirement → Scenario → Test Case → Primary Pack → Execution → Evidence → Defect`

---

# 18. Information Gaps

Report missing information separately.

Format:

| Gap ID | TC/Scenario | Area | Missing Information | Impact | Required Clarification |
| ------ | ----------- | ---- | ------------------- | ------ | ---------------------- |

Only report gaps that prevent:

* Correct Test Case generation
* Correct expected results
* Correct review
* Correct automation feasibility assessment
* Correct execution preparation

Do not invent missing information.

---

# 19. Coverage Gaps

Identify applicable requirements/scenarios that do not have sufficient Test Case coverage.

Format:

| Gap ID | Requirement | Scenario | Missing Coverage | Impact | Action |
| ------ | ----------- | -------- | ---------------- | ------ | ------ |

`INFORMATION GAP` = required information is missing.

`COVERAGE GAP` = required testing coverage is missing.

---

# 20. Duplicate Detection

Identify duplicate or substantially overlapping cases.

Format:

| Duplicate Group | TC ID(s) | Reason | Recommended Action |
| --------------- | -------- | ------ | ------------------ |

Do not silently delete or merge existing approved Test Cases.

---

# 21. Execution Readiness

A Test Case is execution-ready only when:

* Requirement is traceable.
* Scenario is traceable.
* Primary Pack is assigned.
* Layer is supported.
* Preconditions are sufficient.
* Test data is available or defined.
* Steps are executable.
* Expected results are supported.
* Required dependencies are known.
* No unresolved Critical/High review issue exists.

Execution-ready status:

`READY | NOT_READY`

If `NOT_READY`, identify the blocker.

Execution Readiness is independent of:

* Primary Pack
* Priority
* Risk
* Automation Feasibility

---

# 22. Execution Boundary

This skill prepares Test Cases for execution.

It MUST NOT:

* Execute UI tests
* Execute API tests
* Execute DB tests
* Execute performance tests
* Determine actual pass/fail
* Collect screenshots
* Collect recordings
* Generate execution reports
* Modify application data through execution

Execution is performed by downstream execution skills.

---

# 23. No Automation Code

This skill assesses feasibility only.

Do NOT generate:

* Playwright scripts
* pytest scripts
* k6 scripts
* DB automation scripts
* CI/CD configuration

Automation implementation belongs to downstream automation skills.

---

# 24. Output Files

Create/update only applicable layer files:

`qa/test-cases/UI/<Feature>_UI_TestCases.md`

`qa/test-cases/API/<Feature>_API_TestCases.md`

`qa/test-cases/DB/<Feature>_DB_TestCases.md`

`qa/test-cases/Integration/<Feature>_Integration_TestCases.md`

`qa/test-cases/Security/<Feature>_Security_TestCases.md`

`qa/test-cases/Regression/<Feature>_Regression_TestCases.md`

`qa/test-cases/Performance/<Feature>_Performance_TestCases.md`

Create ONE consolidated artifact:

`qa/test-cases/<Feature>_TestCase_Engineering.md`

The consolidated artifact is the primary handoff for execution planning.

---

# 25. Consolidated Artifact Structure

# Test Case Engineering

## 1. Summary

| Metric              | Count |
| ------------------- | ----: |
| Total Test Cases    |       |
| Smoke               |       |
| Critical            |       |
| Risk-Based          |       |
| Standard            |       |
| UI                  |       |
| API                 |       |
| DB                  |       |
| Integration         |       |
| Security            |       |
| Performance         |       |
| Regression Type/Tag |       |

## 2. Test Cases

| TC ID | Scenario ID | Requirement | Primary Pack | Layer | Type | Title | Preconditions | Test Data | Steps | Expected Result | Priority | Risk | Traceability |
| ----- | ----------- | ----------- | ------------ | ----- | ---- | ----- | ------------- | --------- | ----- | --------------- | -------- | ---- | ------------ |

## 3. Pack Summary

| Primary Pack                | Count |
| --------------------------- | ----: |
| Smoke                       |       |
| Critical                    |       |
| Risk-Based                  |       |
| Standard                    |       |
| **Total Unique Test Cases** |       |

The Pack Summary MUST be calculated directly from the final Test Case table.

## 4. Review Summary

| Status           | Count |
| ---------------- | ----: |
| APPROVED         |       |
| CHANGES_REQUIRED |       |
| Total            |       |

## 5. Review Findings

| TC ID | Severity | Category | Issue | Source Reference | Recommendation |
| ----- | -------- | -------- | ----- | ---------------- | -------------- |

## 6. Automation Feasibility

| TC ID | Layer | Automation | Framework | Priority | Complexity | Reason | Blocker/Risk |
| ----- | ----- | ---------- | --------- | -------- | ---------- | ------ | ------------ |

## 7. Automation Summary

| Decision | Count |
| -------- | ----: |
| YES      |       |
| NO       |       |
| PARTIAL  |       |
| Total    |       |

## 8. Execution Readiness

| Status    | Count |
| --------- | ----: |
| READY     |       |
| NOT_READY |       |
| Total     |       |

## 9. Information Gaps

| Gap ID | TC/Scenario | Area | Missing Information | Impact | Required Clarification |
| ------ | ----------- | ---- | ------------------- | ------ | ---------------------- |

## 10. Coverage Gaps

| Gap ID | Requirement | Scenario | Missing Coverage | Impact | Action |
| ------ | ----------- | -------- | ---------------- | ------ | ------ |

## 11. Duplicate Findings

| Duplicate Group | TC ID(s) | Reason | Recommended Action |
| --------------- | -------- | ------ | ------------------ |

## 12. Recommended Automation Set

Include only:

`Automation = YES`

Do not include `PARTIAL` or `NO`.

Format:

| TC ID | Layer | Primary Pack | Title | Framework |
| ----- | ----- | ------------ | ----- | --------- |

---

# 26. Count Validation & Data Integrity

This section is mandatory.

All summary counts MUST be calculated from the **final Test Case table**, not independently inferred.

## 26.1 Total Test Case Count

`Total Test Cases = count of unique TC IDs`

Every TC ID must be unique.

## 26.2 Primary Pack Reconciliation

Because every Test Case has exactly one Primary Pack:

`Total Test Cases = Smoke + Critical + Risk-Based + Standard`

The following MUST be true:

`count(Primary Pack = Smoke) = Smoke Summary Count`

`count(Primary Pack = Critical) = Critical Summary Count`

`count(Primary Pack = Risk-Based) = Risk-Based Summary Count`

`count(Primary Pack = Standard) = Standard Summary Count`

If this fails:

`COUNT VALIDATION FAILURE`

Correct the artifact before completion.

## 26.3 Layer Counts

Layer counts are **not automatically additive**.

A Test Case may belong to multiple layers, for example:

`Layer = UI / API`

Therefore:

`UI + API + DB + Integration + Security + Performance`

MUST NOT be required to equal Total Test Cases.

Layer counts must instead equal the number of Test Cases explicitly carrying each layer.

If exact additive layer totals are required by the project, introduce:

`Primary Layer`

and keep additional layers as secondary tags.

## 26.4 Regression Count

Regression MUST be counted from the explicit Regression Type/Tag unless the Test Plan explicitly defines Regression as a Layer.

Do not count Regression from:

* Priority
* Risk
* Pack
* Layer
* Title

## 26.5 Review Reconciliation

`Total Test Cases = APPROVED + CHANGES_REQUIRED`

## 26.6 Automation Reconciliation

`Total Test Cases = YES + NO + PARTIAL`

## 26.7 Execution Readiness Reconciliation

`Total Test Cases = READY + NOT_READY`

## 26.8 No Independent Pack Classification

Do NOT generate a Pack Summary independently from the Test Case table.

Correct sequence:

`Generate TCs → Assign Primary Pack → Freeze final TC table → Calculate pack counts → Generate summaries`

Incorrect sequence:

`Generate TCs → independently estimate Smoke/Critical/Risk-Based counts → generate Pack Summary`

## 26.9 Pack Integrity Example

If the final Test Case table contains:

* 7 Smoke
* 7 Critical
* 3 Risk-Based
* 11 Standard

Then the ONLY valid Pack Summary is:

| Primary Pack |  Count |
| ------------ | -----: |
| Smoke        |      7 |
| Critical     |      7 |
| Risk-Based   |      3 |
| Standard     |     11 |
| **Total**    | **28** |

A Critical count of 11 or Risk-Based count of 9 would be invalid unless the actual `Primary Pack` values in the final Test Case table also contain those counts.

---

# 27. Quality Gate

Before saving, verify:

## Source

* [ ] Test Plan reviewed completely
* [ ] Source priority followed
* [ ] No unsupported requirements/behavior introduced
* [ ] Requirement IDs preserved
* [ ] Scenario IDs preserved

## Coverage

* [ ] Every applicable scenario considered
* [ ] Applicable layers only
* [ ] Smoke cases identified
* [ ] Critical cases identified
* [ ] Risk-Based cases identified
* [ ] Standard cases identified
* [ ] Coverage gaps identified
* [ ] Traceability complete

## Primary Pack Integrity

* [ ] Every TC has exactly one Primary Pack
* [ ] Primary Pack is one of Smoke/Critical/Risk-Based/Standard
* [ ] Primary Pack came from Test Plan or approved QA classification
* [ ] Pack was not inferred from Risk
* [ ] Pack was not inferred from Priority
* [ ] Pack was not inferred from Type
* [ ] Pack was not inferred from Layer
* [ ] Pack was not inferred from automation feasibility
* [ ] Pack Summary was calculated from final TC rows
* [ ] Pack counts reconcile to Total Test Cases
* [ ] No TC is counted in multiple Primary Packs

## Test Cases

* [ ] Unique TC IDs
* [ ] Preconditions defined
* [ ] Test data defined or identified
* [ ] Executable steps
* [ ] Supported expected results
* [ ] Priority assigned
* [ ] Primary Pack assigned
* [ ] No duplicate cases
* [ ] No unsupported assumptions

## Review

* [ ] Every case reviewed
* [ ] Review status assigned
* [ ] Findings recorded
* [ ] Duplicates identified
* [ ] Information Gaps identified

## Automation

* [ ] UI/API/Performance feasibility assessed where applicable
* [ ] YES/NO/PARTIAL assigned
* [ ] Framework supported
* [ ] Blockers identified
* [ ] No automation code generated
* [ ] Automation feasibility does not determine Primary Pack

## Execution

* [ ] Execution readiness assigned
* [ ] No tests executed
* [ ] No pass/fail execution result claimed
* [ ] Evidence not fabricated

## Counts

* [ ] Unique TC count validated
* [ ] Primary Pack counts validated from final TC rows
* [ ] Smoke count validated
* [ ] Critical count validated
* [ ] Risk-Based count validated
* [ ] Standard count validated
* [ ] Pack total reconciles to unique TC count
* [ ] Layer counts calculated independently and not incorrectly summed
* [ ] Regression count calculated from Regression Type/Tag where applicable
* [ ] Review counts reconcile
* [ ] Automation counts reconcile
* [ ] Execution-readiness counts reconcile

If any count validation fails, **do not finalize the artifact**.

---

# 28. Final Response

Return only:

```text
TEST CASE ENGINEERING

GENERATION

Total: <count>

UI: <count>
API: <count>
DB: <count>
Integration: <count>
Security: <count>
Regression Type/Tag: <count>
Performance: <count>

PACKS

Smoke: <count>
Critical: <count>
Risk-Based: <count>
Standard: <count>

REVIEW

APPROVED: <count>
CHANGES_REQUIRED: <count>
Critical/High: <count>
Duplicates: <count>
Information Gaps: <count>
Coverage Gaps: <count>

AUTOMATION

YES: <count>
NO: <count>
PARTIAL: <count>
Blockers: <count>

EXECUTION READINESS

READY: <count>
NOT_READY: <count>

FINAL

TEST_CASES_APPROVED | TEST_CASES_CHANGES_REQUIRED

ARTIFACT

<path>
```

If all Test Cases are approved and execution-ready, append:

`RECOMMENDED_AUTOMATION_SET: <count>`

If changes are required, list only blocking TC IDs and findings.

Never report counts that cannot be reconciled against the final Test Case table.
