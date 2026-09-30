---

name: spec-qa-analysis

description: Analyze a software specification for QA using only explicitly supported information. Extract functional, UI, API, data, security, error, dependency, risk, and API/UI performance requirements. Identify ambiguities and information gaps. Never invent requirements, behavior, thresholds, workloads, test cases, or automation.

---

# Spec QA Analysis

## Objective

Read the **complete source** and create a Markdown QA analysis at `OUTPUT`.

Analyze only what the source explicitly supports.

**Never:**

* modify the source
* invent or infer requirements/behavior
* assume standard QA, API, security, or performance behavior
* generate test cases or automation
* invent performance thresholds, RPS, concurrency, SLAs/SLOs, or workloads

If information is absent, mark it **INFORMATION GAP**.

---

## Input

* `SOURCE`: specification/document/content
* `OUTPUT`: requested Markdown output path
* `FEATURE`: optional feature name; derive from source if absent

---

# Analysis Sections

Create these sections:

1. Scope / Purpose
2. Actors
3. Functional Requirements
4. Business Rules
5. UI Behavior
6. Validation
7. Authentication / MFA / SSO
8. Session / Logout / Route Protection
9. APIs and Contracts
10. DB Entities / Schema
11. Security / Rate Limits / Tenant Isolation
12. Errors / Dependencies
13. Risks / Regression Impact
14. Ambiguities / Information Gaps
15. API Performance Requirements
16. UI Performance Requirements
17. Performance Workload / Capacity
18. Performance Observability
19. Performance Information Gaps

Include a section only when applicable, except **Performance Information Gaps**, which must be included when performance requirements are missing.

---

# Extraction Rules

For each section, extract only explicitly stated information.

### Functional

Capture:

* requirements
* acceptance criteria
* workflows
* state transitions
* business rules
* constraints
* actors/roles
* UI controls and entry points
* validations
* errors
* dependencies

### API

Capture:

* method
* endpoint
* path/query parameters
* headers/authentication
* request fields/types
* optional/required fields
* response
* status/error codes
* validation
* version/OCC rules
* side effects
* atomicity/transactions

### Database

Capture only explicitly documented:

* entities/tables
* fields/types
* relationships
* keys
* indexes
* constraints
* version/state fields
* create/update behavior

### Security

Capture only explicitly specified:

* authorization
* roles/permissions
* authentication
* MFA/SSO
* rate limits
* tenant isolation
* audit/security controls
* sensitive-data handling

### Session

Capture:

* session lifecycle
* timeout
* token expiration
* refresh
* logout
* route protection
* unauthorized behavior

---

# Performance Analysis

Analyze performance independently from functional behavior.

## API Performance

Extract only explicitly defined:

* response-time targets
* average/max latency
* p50/p75/p90/p95/p99/p99.9
* TTFB
* timeout
* requests/sec
* transactions/sec
* batch rate
* concurrent users/requests/connections
* error-rate/success-rate targets
* availability
* normal/peak/stress/spike/soak load
* recovery requirements
* scalability/capacity targets

For each requirement record:

```text
ID
API
Metric
Target
Workload/Condition
Status
Evidence
```

Use ID:

`PERF-API-<FEATURE>-001`

Do **not** create a target that the source does not provide.

---

## UI Performance

Extract only explicitly defined:

* page-load targets
* route-transition time
* time-to-interactive
* FCP/LCP
* rendering time
* modal/drawer opening time
* search response time
* interaction latency
* form submission time
* UI success/error rendering time
* browser/device requirements
* network conditions
* record/row/data volume

For each requirement record:

```text
ID
UI/Component
Action
Metric
Target
Workload/Condition
Status
Evidence
```

Use ID:

`PERF-UI-<FEATURE>-001`

Do not invent Core Web Vitals or browser thresholds.

---

## Workload / Capacity

Extract only explicitly stated:

* RPS
* concurrent users
* concurrent requests
* sessions
* data volume
* record count
* transaction volume
* batch size
* peak traffic
* sustained duration
* spike duration
* growth/scalability
* capacity limits

Use ID:

`PERF-WL-<FEATURE>-001`

If the source says "high traffic" or "scalable" without measurable values, mark:

**INFORMATION GAP**

Do not convert qualitative wording into numbers.

---

## Performance Observability

Extract only explicitly specified metrics/monitoring such as:

* request rate
* latency
* error rate
* status distribution
* timeout/retry count
* queue/database/external-service time
* CPU/memory/network
* DB connections
* cache metrics
* lock/deadlock metrics
* UI rendering/interaction metrics

Use ID:

`PERF-METRIC-<FEATURE>-001`

Do not assume a metric must be monitored.

---

# Status / Evidence

Every finding must have one status:

### Specified

Directly supported by the source.

### Ambiguous

The source provides information but meaning is unclear or contradictory.

### INFORMATION GAP

Required information is absent.

Use source evidence for each finding where practical.

Example:

```text
Status: Specified
Requirement: p95 API response time <= 1 second
Evidence: API performance requirements section
```

Never transform:

```text
"The API should be fast"
```

into:

```text
p95 <= 500 ms
```

Instead:

```text
Status: Ambiguous / INFORMATION GAP
Missing: measurable response-time target
```

---

# Traceability IDs

Use IDs only for explicitly supported requirements.

```text
REQ-<FEATURE>-001
BR-<FEATURE>-001
UI-<FEATURE>-001
API-<FEATURE>-001
DB-<FEATURE>-001
SEC-<FEATURE>-001
PERF-API-<FEATURE>-001
PERF-UI-<FEATURE>-001
PERF-WL-<FEATURE>-001
PERF-METRIC-<FEATURE>-001
```

Number sequentially within each category.

Do not assign IDs to inferred requirements or gaps unless needed to identify the gap itself.

---

# Risks / Regression

Report only risks explicitly supported by the specification, such as:

* stated dependencies
* changed existing workflows
* referenced existing components
* explicit data/state transition risks
* explicitly stated performance concerns

Do not introduce generic QA risks.

Do not claim a database, API, browser, or infrastructure bottleneck without source evidence.

---

# Information Gaps

Identify missing or unclear:

* functional requirements
* UI behavior
* API contracts
* error handling
* authentication/authorization
* session behavior
* DB details
* security controls
* rate limits
* tenant isolation
* API performance targets
* UI performance targets
* RPS
* concurrency
* workload
* data volume
* timeout
* error-rate target
* availability/SLA
* scalability/capacity
* load/stress/soak duration
* browser/device/network requirements
* performance monitoring requirements

For each important gap state:

```text
INFORMATION GAP
Affected requirement/API/UI:
Missing information:
Impact on QA:
```

Do not resolve gaps using assumptions.

---

# Performance Testing Context

If the user says the analysis will support **API performance, UI performance, load testing, stress testing, or k6**:

1. Extract all performance requirements that actually exist.
2. Identify measurable performance inputs that are missing.
3. Clearly separate:

   * **Specified Requirement**
   * **User Testing Scope**
   * **INFORMATION GAP**
4. Do not turn the requested testing tool/approach into a product requirement.

Example:

```text
Specified:
POST /api/.../split performs the defined operation.

User Testing Scope:
API performance testing using k6.

INFORMATION GAP:
No latency target.
No p95/p99 target.
No RPS target.
No concurrency target.
No error-rate threshold.
No load duration.
No scalability target.
```

The user's choice of k6 does **not** imply a required RPS, VU count, duration, or threshold.

---

# Output

Create a Markdown document containing the applicable analysis sections.

End with:

## Key Findings

Concise summary of important functional, API, UI, dependency, and performance findings.

## Performance Findings

Summarize explicitly specified API/UI performance requirements and measurable targets.

## Information Gaps

Summarize missing or ambiguous requirements, especially performance inputs required for measurable validation.

## Rules

**Do not generate:**

* test cases
* k6 scripts
* Playwright/Selenium scripts
* Postman collections
* automation code
* invented requirements
* invented performance thresholds
* invented workloads
* invented SLAs/SLOs

**Core principle:**

> Extract what the specification says. Identify what it does not say. Never silently fill the gap.
