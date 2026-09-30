---

name: test-plan

description: Generate or update a traceable Test Plan from the authoritative SPEC and QA Analysis. Define applicable testing scope, atomic scenarios, Smoke/Critical/Risk-Based packs, performance strategy, test data, environment, RTM, risks, information gaps, and readiness for downstream Test Case generation.

---

# Test Plan Skill

## 1. Command

Use:

`/testplan`

Workflow:

`SPEC → QA ANALYSIS → TEST PLAN → TEST CASES → EXECUTION PACKS → EXECUTION → REPORT`

The Test Plan is a **planning and traceability artifact**.

During Test Plan generation:

* Generate requirements coverage and test scenarios.
* Define testing strategy and applicable test layers.
* Define Smoke, Critical and Risk-Based packs.
* Define performance strategy where applicable.
* Define data, environment, dependencies, risks and information gaps.
* Prepare the artifact for downstream Test Case generation.

Do NOT generate detailed Test Cases, automation scripts or execution results unless explicitly requested.

---

# 2. Inputs

## Required

* QA Analysis

## Fallback

* Authoritative SPEC when QA Analysis is unavailable or incomplete.

## Optional

* Feature/module
* Existing Test Plan
* Existing approved UI/API/DB Test Cases
* Project/tool configuration
* Existing QA artifacts

## Source Priority

Use information in this order:

1. Authoritative SPEC
2. Approved QA Analysis
3. Existing valid Test Plan
4. Existing approved Test Cases
5. Explicit project/tool context

Never invent information unsupported by these sources.

---

# 3. `/testplan` Execution Rules

When `/testplan` is invoked:

1. Read the complete authoritative SPEC.
2. Read the complete QA Analysis.
3. Preserve valid existing Test Plan content when updating.
4. Extract and consolidate all explicitly specified requirements and business rules.
5. Identify applicable testing levels and layers.
6. Define Test Plan scope and objectives.
7. Generate atomic, traceable Test Scenarios.
8. Classify applicable scenarios into Smoke, Critical, Risk-Based and Standard packs.
9. Define applicable performance strategy.
10. Define required test data, environment and dependencies.
11. Build the RTM.
12. Identify source-supported risks.
13. Identify Information Gaps.
14. Identify Coverage Gaps.
15. Validate Test Case readiness.
16. Save/update the Test Plan.

Do NOT:

* Generate detailed Test Cases.
* Generate Test Case IDs.
* Generate automation scripts.
* Execute tests.
* Produce execution results.
* Modify the source SPEC or QA Analysis.

---

# 4. Test Plan vs Test Case Boundary

## Test Scenario

A Test Scenario defines **WHAT must be validated**.

Example:

`Verify an in-progress assignment can be split using a valid effective date.`

A scenario must be:

* Atomic
* Testable
* Traceable
* Specific
* Non-procedural

## Test Case

A Test Case defines **HOW the scenario will be validated**.

The downstream Test Case skill adds:

* Test Case ID
* Preconditions
* Test data values
* Detailed steps
* Expected results
* Postconditions
* Automation mapping

The Test Plan MUST contain Test Scenarios.

The Test Plan MUST NOT contain detailed Test Cases.

---

# 5. Test Case ID Rules

The Test Plan MUST NOT:

* Generate Test Case IDs.
* Invent Test Case IDs.
* Assign future Test Case IDs.
* Create detailed Test Cases.

If existing approved Test Cases are explicitly provided:

* Reference their existing Test Case IDs.
* Do not duplicate them.

If Test Cases do not yet exist:

`Test Case ID = N/A`

Do NOT use `TEST CASE REQUIRED` merely because downstream Test Cases have not yet been generated.

Downstream workflow:

`Requirement → Scenario → Pack → Test Case Generation`

After Test Case generation:

`Requirement → Scenario → Test Case → Pack → Execution → Evidence → Defect`

---

# 6. What the Test Plan MUST Contain

Include only applicable content:

1. Overview
2. Requirements & Business Rules
3. Scope / Out of Scope
4. Test Objectives
5. Test Levels & Testing Strategy
6. Test Scenarios
7. Smoke Test Pack
8. Critical Suite
9. Risk-Based Test Pack
10. Performance Strategy
11. Tooling / Automation Strategy
12. Test Data
13. Environment / Configuration / Dependencies
14. Deliverables & Evidence
15. Defect Management
16. Test Monitoring / Control
17. Roles & Responsibilities — only when defined
18. RTM
19. Risks
20. Information Gaps
21. Test Case / Execution Readiness
22. Execution Model
23. Change Control / Versioning

Do not create unsupported sections.

Do not create Entry Criteria or Exit Criteria sections.

---

# 7. DO

## Source & Requirements

* Read the complete SPEC and QA Analysis.
* Treat the SPEC as authoritative for requirements.
* Consolidate ALL explicitly specified requirements, rules and findings first.
* Place ALL Information Gaps in a separate later section.
* Preserve source conflicts as `INFORMATION GAP`.
* Preserve valid existing Test Plan coverage when updating.
* Do not silently remove valid coverage.

## Coverage

* Identify applicable test levels and testing layers.
* Create atomic, testable and traceable scenarios.
* Map every applicable requirement to one or more scenarios.
* Identify Coverage Gaps.
* Identify Smoke scenarios.
* Identify Critical scenarios.
* Identify Risk-Based scenarios.
* Reference existing approved Test Case IDs when supplied.
* Use `N/A` when Test Cases do not yet exist.

## Applicable Testing

Include only source-supported applicable areas:

`Functional | UI | API | DB | Regression | Security | Integration | Compatibility | Usability | Accessibility | Reliability | API Performance | UI Performance`

## Performance

* API performance → `k6 HTTP`
* UI/browser performance → `k6/browser`
* Use only source-defined or project-defined workloads, targets, thresholds and SLAs/SLOs.
* Do not assume every feature requires every performance test type.
* Missing required performance information → `INFORMATION GAP`.

## Data / Environment

Capture source/project-defined:

* Test data
* Users/roles
* Environments
* Configuration
* Authentication/tenant setup
* APIs
* DB
* Feature flags
* Integrations
* External dependencies

Missing required information → `INFORMATION GAP`.

## Traceability

During Test Plan generation maintain:

`Requirement → Scenario → Pack`

After Test Case generation the traceability becomes:

`Requirement → Scenario → Test Case → Pack → Execution → Evidence → Defect`

## Change Control

When SPEC, requirements, risks or dependencies change:

* Identify impacted requirements.
* Identify impacted scenarios.
* Update RTM.
* Reassess Smoke/Critical/Risk-Based classification.
* Identify impacted Test Cases and Execution Packs.
* Record version/date/source change.
* Never silently remove valid coverage.

---

# 8. DON'T

Do NOT:

* Invent requirements.
* Invent business rules or behavior.
* Invent API contracts.
* Invent DB schema.
* Invent selectors.
* Invent credentials.
* Invent test data.
* Invent roles.
* Invent environments.
* Invent integrations.
* Invent workloads.
* Invent performance thresholds.
* Invent SLA/SLO values.
* Modify the source SPEC.
* Modify the source QA Analysis.
* Generate detailed Test Cases.
* Generate Test Case IDs.
* Generate automation scripts.
* Execute tests during planning.
* Produce execution results.
* Duplicate existing Test Cases.
* Fabricate Requirement or Scenario IDs.
* Treat unsupported testing layers as Information Gaps.
* Create a separate Scenario document.
* Create Entry Criteria.
* Create Exit Criteria.
* Create generic unsupported risks.
* Silently overwrite valid existing coverage.

---

# 9. Applicability Rule

Include a test level/layer only when supported by at least one of:

`SPEC | QA Analysis | Explicit Scope | Documented Risk | Dependency | Quality Attribute`

If unsupported:

`OMIT`

If applicable but required information is missing:

`INFORMATION GAP`

Do not create an Information Gap for a testing layer that is itself unsupported.

---

# 10. Overview

Include:

* Feature
* Epic/module
* Authoritative SPEC
* QA Analysis
* Test Plan version/date
* Objective

---

# 11. Requirements & Business Rules

List ALL explicitly specified requirements and rules before Information Gaps.

Format:

| ID | Requirement / Rule | Area | Applicable Layers |
| -- | ------------------ | ---- | ----------------- |

Rules:

* Use source-defined Requirement IDs when available.
* Do not fabricate IDs.
* If the source has no ID, use a clearly traceable source reference rather than inventing a formal Requirement ID.
* Preserve conflicts as `INFORMATION GAP`.

---

# 12. Scope

## In Scope

Only source-supported functionality and testing.

## Out of Scope

Only documented exclusions.

Do not invent exclusions.

---

# 13. Test Objectives

Cover applicable:

* Functional behavior
* Workflow/state transitions
* UI behavior
* API behavior
* Data integrity
* Authorization/security
* Integration
* Regression
* Performance
* Supported non-functional requirements

---

# 14. Test Levels & Testing Strategy

Define only applicable testing.

## Functional

Validate:

* Business rules
* Workflows
* Validations
* States
* State transitions
* Expected outcomes
* Negative behavior

## UI

Validate applicable:

* Entry points
* Navigation
* Controls
* Forms
* Dialogs/drawers
* Validation
* Messages
* Loading/state synchronization
* RBAC

## API

Validate applicable:

* Contract
* Request fields
* Response fields
* Status codes
* Validation
* Authentication
* Authorization
* Error handling
* State transitions
* Concurrency
* OCC/version behavior

## DB

Validate applicable:

* Records
* Values
* Relationships
* Status
* OCC/version
* Audit data
* Transactions/rollback only when specified

## Regression

Identify affected existing functionality.

## Security

Include only documented security requirements or source-supported security scope.

## Integration

Include documented integrations and dependencies.

## Other NFR

Include only when supported:

`Accessibility | Usability | Compatibility | Reliability | Localization | Other documented NFR`

---

# 15. Test Scenarios

Keep Test Scenarios inside the Test Plan.

Format:

| ID | Scenario | Type | Layer | Priority | Requirement IDs | Data | Pack |
| -- | -------- | ---- | ----- | -------- | --------------- | ---- | ---- |

`Pack = Smoke | Critical | Risk-Based | Standard`

Scenario rules:

* Atomic
* Testable
* Traceable
* Specific
* Non-procedural
* Requirement-linked
* No detailed execution steps

A scenario describes WHAT is validated, not HOW to execute it.

---

# 16. Smoke Test Pack

Smoke represents the minimum feature-health validation.

Select applicable critical scenarios such as:

* Feature accessibility
* Primary UI workflow
* Primary API operation
* Essential business rule
* Critical state/persistence
* Critical authorization
* Critical integration

Format:

| Smoke ID | Scenario ID | Test Case ID | Scenario | Layer | Requirement |
| -------- | ----------- | ------------ | -------- | ----- | ----------- |

Test Case ID rules:

* Existing approved Test Case → reference existing ID.
* No Test Case yet → `N/A`.
* Never fabricate a Test Case ID.

---

# 17. Critical Suite

Include source-supported high-impact scenarios such as:

* Core workflow
* Critical state transition
* Data integrity
* Authorization
* Concurrency/OCC
* Critical integration
* High-impact negative path
* Critical performance

Format:

| ID | Scenario ID | Test Case ID | Scenario | Layer | Risk/Impact | Requirement |
| -- | ----------- | ------------ | -------- | ----- | ----------- | ----------- |

Use `N/A` when Test Cases do not yet exist.

---

# 18. Risk-Based Test Pack

Select scenarios based on documented/source-supported risks.

Possible areas:

`data corruption | historical/future data | concurrency | security | integration | complex rules | boundaries | high-impact regression | performance | fragile UI`

Format:

| Risk ID | Scenario ID | Test Case ID | Risk | Scenario | Layer | Requirement |
| ------- | ----------- | ------------ | ---- | -------- | ----- | ----------- |

Use only risks supported by the source/project context.

Do not invent risks.

---

# 19. Performance Strategy

Performance testing is included only when supported by:

`SPEC | QA Analysis | Explicit Performance Requirement | Documented Risk | Quality Attribute | Explicit Project Scope`

Do not automatically apply every performance test type.

## API Performance

Tool:

`k6 HTTP`

Capture only information defined or required by the source:

* Endpoint/operation
* Workload
* VUs
* RPS
* Concurrency
* Duration
* Load type
* Response-time target
* p50
* p95
* p99
* Throughput
* Error-rate target
* Threshold
* SLA/SLO
* Required test data
* Required environment

Applicable load types may include:

`baseline | load | peak | stress | spike | soak | concurrency | OCC`

Do not invent values.

If required information is missing:

`INFORMATION GAP`

## UI Performance

Tool:

`k6/browser`

Applicable areas may include:

* Page load
* Navigation
* Browser interaction
* Modal/drawer
* Primary workflow
* Rendering
* Transition

Possible metrics:

`navigation duration | browser HTTP duration/failure | FCP | LCP | TTFB | INP | CLS`

Do not invent targets or thresholds.

---

# 20. Tooling / Automation Strategy

Use project-defined tools.

Default mapping when explicitly supported by project configuration:

| Layer           | Tool                       |
| --------------- | -------------------------- |
| UI              | Playwright                 |
| API             | pytest + httpx             |
| DB              | Approved project DB method |
| API Performance | k6                         |
| UI Performance  | k6/browser                 |

If a required tool is undefined:

`INFORMATION GAP`

The Test Plan defines tooling strategy only.

Do not generate implementation code.

---

# 21. Test Data

Document only source/project-defined data.

Possible categories:

`users/roles | records | payloads | valid/invalid values | boundaries | historical/future data | conflicts | concurrency | performance data`

If required data is missing:

`INFORMATION GAP`

Do not invent values.

---

# 22. Environment / Configuration / Dependencies

Capture confirmed:

`environment | frontend/backend | browser | authentication/tenant | feature flags | API/DB | IdP | integrations | external services`

If required information is missing:

`INFORMATION GAP`

Do not invent environment details.

---

# 23. Playwright MCP Planning Rule

Use configured Playwright MCP only when source artifacts do not provide sufficient UI information required for planning.

Use targeted observation only.

It may confirm:

* UI entry points
* Navigation
* Visible controls
* Page structure
* Dialog/drawer structure
* Observable workflow behavior

It MUST NOT:

* Execute formal tests
* Determine pass/fail
* Collect execution evidence
* Replace formal execution
* Generate automation code
* Override the SPEC
* Create new requirements
* Determine undocumented business rules
* Convert observations into requirements silently

If observed behavior conflicts with the SPEC:

`INFORMATION GAP`

If observation cannot resolve the ambiguity:

`INFORMATION GAP`

Observed behavior is supplementary planning information, not an authoritative requirement.

---

# 24. Deliverables / Evidence / Defects

## Deliverables

Include applicable:

`QA Analysis | Test Plan | Test Cases | Smoke/Critical/Risk Packs | Execution Artifacts | Test Report | Defects | Performance Report`

## Evidence

Define applicable evidence types:

`screenshots | recordings | logs | API evidence | DB evidence | performance evidence`

Evidence is collected during execution, not Test Plan generation.

## Defect Traceability

Maintain:

`Execution → Test Case → Scenario → Requirement → Defect`

Attach relevant evidence and execution context.

Do not invent:

* Severity
* Priority
* SLA
* Defect workflow

---

# 25. Monitoring / Control

Monitor during execution:

`planned/executed | pass/fail/blocked | defects | environment/data issues | risk changes | coverage gaps | performance observations | automation failures`

Update affected QA artifacts when scope, requirements, risks or dependencies change.

---

# 26. Roles & Responsibilities

Include only when defined by project context.

Format:

| Role | Responsibility |
| ---- | -------------- |

Never invent:

* People
* Ownership
* Approvals
* Responsibilities

---

# 27. RTM

Use:

| Requirement | Scenario ID | UI | API | DB | Regression | Security | Integration | API Perf | UI Perf | Smoke | Critical | Risk-Based |
| ----------- | ----------- | -- | --- | -- | ---------- | -------- | ----------- | -------- | ------- | ----- | -------- | ---------- |

Use:

`✓` = applicable/covered

`N/A` = not applicable

Every applicable requirement must map to scenario coverage.

Uncovered applicable requirement:

`COVERAGE GAP`

Primary Test Plan traceability:

`Requirement → Scenario`

Do not require Test Case IDs at this stage.

---

# 28. Risks

Use only source-supported risks.

Format:

| Risk ID | Risk | Impact | Likelihood | Mitigation | Scenario IDs |
| ------- | ---- | ------ | ---------- | ---------- | ------------ |

Do not create generic risks unsupported by project context.

---

# 29. Information Gaps

Information Gaps MUST appear after all explicit requirements and planned coverage.

Format:

| Gap ID | Area | Missing Information | QA Impact | Required Clarification |
| ------ | ---- | ------------------- | --------- | ---------------------- |

Only report missing information that prevents proper planning or testing of an applicable requirement.

Examples:

* Missing API contract required for API testing
* Missing performance workload required for performance planning
* Missing environment required for execution
* Missing test data required for validation
* Conflicting requirements
* Undefined dependency required by the workflow

Do not report unsupported testing layers as Information Gaps.

---

# 30. Coverage Gaps

Identify requirements that are applicable but do not have sufficient scenario coverage.

Format:

| Gap ID | Requirement | Missing Coverage | Impact | Action |
| ------ | ----------- | ---------------- | ------ | ------ |

Distinguish:

`INFORMATION GAP`

from:

`COVERAGE GAP`

Information Gap = required information is missing.

Coverage Gap = an applicable requirement lacks adequate testing coverage.

---

# 31. Test Case / Execution Readiness

Every scenario must provide:

`objective | layer | type | priority | requirement mapping | data category | business outcome | pack`

The downstream Test Case Generator adds:

`Test Case ID | preconditions | detailed steps | test data values | expected results | postconditions | automation mapping`

The Test Plan must contain enough scenario information for the downstream Test Case skill to generate detailed cases without inventing requirements.

Execution Packs reference approved Test Cases.

---

# 32. Execution Model

Execution is separate from Test Plan generation.

## After Release

`Smoke → Critical → Required Functional Validation → Applicable Regression`

## After Production

`Smoke → Risk-Based → Production-Safe Critical Validation → Approved Production Performance Checks`

Execution results belong in separate Execution Artifacts.

---

# 33. Change Control / Versioning

When source requirements change:

`Identify impact → Update scenarios → Update RTM → Reassess packs → Identify impacted Test Cases/Packs → Record version/date/source`

Never silently remove valid coverage.

Record:

* Test Plan version
* Date
* Source version/reference
* Change summary
* Impacted scenarios
* Impacted packs

---

# 34. Quality Gate

Before saving, verify:

## Source

* [ ] SPEC/QA Analysis reviewed
* [ ] SPEC treated as authoritative
* [ ] All explicit requirements consolidated first
* [ ] Information Gaps placed separately after requirements/coverage
* [ ] Conflicts identified
* [ ] No invented requirements

## Coverage

* [ ] Applicable testing levels/layers identified
* [ ] Unsupported layers omitted
* [ ] Every applicable requirement has scenario coverage
* [ ] Coverage Gaps identified
* [ ] RTM completed

## Scenarios / Packs

* [ ] Scenarios are atomic
* [ ] Scenarios are traceable
* [ ] Scenarios are testable
* [ ] Smoke identified where applicable
* [ ] Critical identified where applicable
* [ ] Risk-Based identified where applicable
* [ ] Existing approved Test Cases referenced only when supplied
* [ ] No fabricated Test Case IDs
* [ ] No detailed Test Cases generated

## Performance

* [ ] Performance included only when applicable
* [ ] API performance uses k6 HTTP
* [ ] UI performance uses k6/browser
* [ ] No invented workloads
* [ ] No invented thresholds
* [ ] No invented SLA/SLO values
* [ ] Missing required performance information marked as Information Gap

## Data / Environment

* [ ] Required test data identified
* [ ] Required environment identified
* [ ] Required dependencies identified
* [ ] Missing required information marked as Information Gap

## Playwright MCP

* [ ] Used only when source artifacts are insufficient
* [ ] Used for targeted planning observation only
* [ ] No execution performed
* [ ] No pass/fail determined
* [ ] No requirements invented from observation
* [ ] Conflicts recorded as Information Gap

## Execution Boundary

* [ ] Evidence approach defined
* [ ] Defect traceability defined
* [ ] Execution separated from planning
* [ ] No execution results included
* [ ] Change control applied

## Test Case Boundary

* [ ] No detailed Test Cases generated
* [ ] No Test Case IDs fabricated
* [ ] Existing approved Test Case IDs reused only when provided
* [ ] Scenarios contain sufficient information for downstream Test Case generation
* [ ] Test Plan is ready for Test Case generation

## Output

* [ ] No Entry Criteria
* [ ] No Exit Criteria
* [ ] No detailed test steps
* [ ] No automation scripts
* [ ] No unsupported assumptions
* [ ] No duplicated Test Cases
* [ ] Test Plan saved successfully

---

# 35. Output

Create/update:

`qa/test-plan/<Feature>_TestPlan.md`

Return only:

1. **File** — path
2. **Testing scope** — applicable levels/layers
3. **Scenarios** — total + Smoke/Critical/Risk-Based counts
4. **Key risks**
5. **Information gaps**
6. **Coverage gaps**
