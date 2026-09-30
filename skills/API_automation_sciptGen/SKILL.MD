---

name: api-test-automation

description: Generate maintainable Python API automation from approved, automation-eligible and execution-ready API test cases. Preserve TC/Scenario/Requirement traceability, use the framework specified by the test cases, automate only supported API-driven functional, security, and integration cases, never invent API behavior, never execute tests, and never generate performance or DB automation.

---

# API Test Automation

## 1. Purpose

Generate execution-ready API automation code from the approved Test Case Engineering artifact.

The skill converts eligible API-oriented test cases into maintainable automation code.

The skill does NOT:

- design new test cases
- modify test cases
- modify the Test Plan
- modify the specification
- perform test execution
- generate API performance/k6 scripts
- generate DB automation
- generate UI automation
- invent missing API behavior

---

## 2. Authoritative Inputs

Use the available artifacts in this priority:

1. `APPROVED_API_TEST_CASES`
2. `TEST_CASE_ENGINEERING`
3. `AUTOMATION_FEASIBILITY`
4. `TEST_PLAN`
5. `QA_ANALYSIS`
6. `SPEC`
7. `REVIEW`

The Test Case Engineering artifact is the primary implementation source.

Use the Test Plan / QA Analysis / Spec only to resolve information explicitly required by the selected test case.

Do not override a test case's documented expected behavior using assumptions from general API knowledge.

---

## 3. Mandatory Selection Gates

A test case is eligible for API automation only when ALL required gates pass.

### Gate 1 — Test Case Exists

If no usable API-oriented test cases exist:

**STOP**

Do not create automation from requirements or scenarios alone.

---

### Gate 2 — Correct Automation Layer

Select only cases whose automation framework/layer is API-compatible.

Eligible examples:

- `API`
- API-driven `Security`
- API-driven `Integration`

Do not select:

- `UI`
- `DB`
- `Performance`
- UI-only Security cases
- UI-only Integration cases

The framework specified by the test case takes precedence.

---

### Gate 3 — Automation Feasibility

Read the `Automation Feasibility` value from the Test Case Engineering artifact.

Allowed:

`YES`

Do not automate:

`PARTIAL`

`NO`

Do not reinterpret `PARTIAL` as `YES`.

Do not invent an automation decision when the source does not provide one.

---

### Gate 4 — Execution Readiness

The test case must be:

`READY`

Do not automate:

`NOT_READY`

A test case can be automation-feasible but still not ready because of:

- unresolved information gap
- missing API contract
- missing test data
- missing credentials
- missing supporting endpoint
- unresolved expected result
- unresolved business rule
- unresolved dependency
- unresolved environment requirement

If the case is `NOT_READY`, skip it and report the exact reason.

---

### Gate 5 — Review Status

If review information exists, the test case must have an approved status.

Accept:

`APPROVED`

Do not generate from:

`CHANGES_REQUIRED`

Do not infer approval.

If the overall Test Case Engineering artifact is not approved, stop unless individual case-level approval is explicitly provided and the process allows case-level generation.

---

### Gate 6 — Information Gaps

A case with an unresolved Information Gap that affects implementation must not be automated.

Examples:

- unknown response schema
- unknown success status code
- unknown endpoint
- unknown query parameter
- unknown authentication mechanism
- unknown required request field
- unknown expected error response
- unknown supporting API
- unknown business validation

Report:

`INFORMATION GAP - <Gap ID>`

Do not guess the missing information.

---

## 4. API Scope

Generate automation only for supported API behavior documented by the selected test case.

Supported:

- API functional validation
- API negative validation
- API boundary validation
- API authorization/security validation
- API integration validation where the API contract is explicitly available
- request/response validation
- HTTP status validation when source-defined
- payload validation when source-defined
- OCC/concurrency behavior when represented as an API functional test case

Do not generate:

- UI automation
- Playwright scripts
- DB query automation
- k6 performance scripts
- Lighthouse scripts
- load tests
- stress tests
- endurance tests
- new scenarios
- new test cases
- unsupported API workflows

Performance test cases belong to a separate performance automation skill.

DB test cases belong to a separate DB automation skill.

---

## 5. Source Authority

For implementation behavior use:

`TEST_CASE_ENGINEERING > TEST_PLAN > QA_ANALYSIS > SPEC`

The selected test case is the primary authority for:

- endpoint
- HTTP method
- request payload
- expected response
- status code
- headers
- authentication
- test data
- preconditions
- expected database/business outcome
- negative behavior

Never invent:

- endpoint paths
- HTTP methods
- request fields
- response fields
- schemas
- status codes
- headers
- auth mechanisms
- tokens
- query parameters
- error messages
- error codes
- business rules
- response structures
- supporting API endpoints

If required information is missing:

`INFORMATION GAP`

Skip the case.

---

## 6. Framework

Use the framework explicitly specified by the selected test case.

Preferred project framework:

`Python + pytest + httpx`

If the project already standardizes on `requests`, use the project-supported framework instead.

Do not introduce unsupported libraries.

Do not add dependencies unless explicitly supported by the project.

---

## 7. API Client Design

Prefer reusable API clients when multiple test cases use the same API.

Recommended structure:

```text
automation/
└── api/
    ├── clients/
    ├── tests/
    ├── fixtures/
    ├── schemas/
    └── utils/