---

name: smoke-pack-execution

description: Execute the approved Smoke-pack by selecting execution-ready automated UI and API Smoke test cases, routing them to the appropriate execution skills, collecting execution evidence, reporting failures/bugs/issues, and producing a consolidated Smoke execution report. Do not generate or modify automation or test cases.

---

# Smoke Pack Execution

## 1. Purpose

Execute the approved Smoke test pack to validate basic feature/build health.

This is an execution orchestration skill.

It is responsible for:

- identifying approved Smoke test cases
- validating execution readiness
- validating automation availability
- separating UI and API Smoke cases
- invoking the appropriate execution skill
- ensuring execution evidence is captured
- collecting execution results
- classifying failures
- ensuring confirmed application defects/issues are reported
- consolidating UI and API results
- generating the final Smoke execution report

It must NOT:

- generate test cases
- modify test cases
- generate automation
- modify automation
- directly implement UI/API execution logic
- execute non-Smoke cases
- invent additional Smoke cases

---

# 2. Inputs

## Required

`TEST_CASE_ENGINEERING`

## Recommended

`UI_TEST_CASES`

`API_TEST_CASES`

`AUTOMATION_FEASIBILITY`

`UI_AUTOMATION`

`API_AUTOMATION`

## Optional

`TEST_PLAN`

`QA_ANALYSIS`

`SPEC`

`REVIEW`

Existing test execution configuration and project execution instructions may also be used when required by the execution skills.

---

# 3. Smoke Selection Gate

Select a test case for Smoke execution only when ALL required conditions are satisfied.

### Required

1. `Pack = SMOKE`
2. Valid `TC-*` exists
3. Test Case Status = `APPROVED`
4. Execution Readiness = `READY`
5. Automation Feasibility = `YES`
6. Required automation exists
7. Required execution framework is available
8. No blocking Information Gap exists

Only cases satisfying all gates are eligible for execution.

---

# 4. Do Not Execute

Do NOT execute:

- Critical-only cases
- Risk-Based-only cases
- Standard-only cases
- `Automation Feasibility = NO`
- `Automation Feasibility = PARTIAL`
- `Execution Readiness = NOT_READY`
- unapproved cases
- cases with unresolved blocking information gaps
- cases without required automation
- API performance/k6 cases
- UI performance/Lighthouse cases
- DB test cases
- unrelated regression cases

Do not promote a non-Smoke case into the Smoke pack because it appears useful.

---

# 5. Smoke Scope

Smoke execution must remain strictly limited to the approved Smoke pack.

Do not:

- add new Smoke cases
- change Pack classification
- execute Critical cases as Smoke
- execute Risk-Based cases as Smoke
- execute Standard cases as Smoke
- create additional exploratory tests under the Smoke execution result

If an additional issue is noticed during execution, record it separately as an observation/issue.

Do not convert the observation into a new Smoke test case.

---

# 6. Layer Routing

Split eligible Smoke cases by execution layer.

```text
UI  → ui-playwright-execution
API → api-test-execution