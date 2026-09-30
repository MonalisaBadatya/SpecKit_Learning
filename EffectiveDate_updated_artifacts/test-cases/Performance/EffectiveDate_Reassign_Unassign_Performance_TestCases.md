# Performance Test Cases: Effective Date Reassign and Unassign

**Feature:** `feat-effective-date-reassign-unassign`  
**Layer:** Performance (API & UI)  
**Source Test Plan:** `complex-spec/qa/test-plan/EffectiveDate_Reassign_Unassign_TestPlan.md`  
**Framework:** k6 HTTP & Lighthouse / k6/browser  

---

| TC ID | Scenario ID | Requirement | Primary Pack | Layer | Type | Title | Preconditions | Test Data | Steps | Expected Result | Priority | Risk | Traceability |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-EDRU-022** | `SCN-EDRU-022` | `PERF-API-EDRU-001` | Standard | Performance | Performance | Benchmark GET and POST latency distribution under baseline load | k6 performance test environment configured. | Baseline load profile calling GET assignment and POST split | 1. Run baseline k6 script for defined iterations.<br>2. Capture p50, p95, p99 latency metrics. | `GET <= 750ms p95`, `Unassign <= 1000ms p95`, `Reassign <= 1500ms p95` against proposed targets. | Medium | Low | `PERF-API-EDRU-001` to `006`, `PERF-WL-EDRU-001`, `GAP-EDRU-007` |
| **TC-EDRU-023** | `SCN-EDRU-023` | `PERF-API-EDRU-008` | Critical | Performance | Concurrency / Load | Multi-VU OCC Concurrency Contention under Load | Shared assignment records seeded; k6 configured for multi-VU concurrent mutation. | 5-10 concurrent VUs targeting identical `assignmentId` and `version` | 1. VUs simultaneously execute `POST .../split` targeting identical version.<br>2. Measure responses. | Exactly 1 request succeeds (+1 version); all competing requests return `409 Conflict` cleanly; no deadlocks or duplicate records. | High | High | `PERF-API-EDRU-008`, `REQ-EDRU-011`, `RSK-EDRU-002`, `PERF-WL-EDRU-005` |
| **TC-EDRU-024** | `SCN-EDRU-024` | `PERF-API-EDRU-007` | Standard | Performance | Performance | API Error rate under Peak scheduling load | Test environment scaled for peak profile. | Peak workload k6 script | 1. Execute peak scheduling load test.<br>2. Monitor error rate metric `http_req_failed`. | HTTP error rate < 1% (excluding expected OCC 409 conflict responses). | Medium | Low | `PERF-API-EDRU-007`, `PERF-WL-EDRU-002`, `GAP-EDRU-007` |
| **TC-EDRU-025** | `SCN-EDRU-025` | `PERF-API-EDRU-009` | Standard | Performance | Performance | End-to-end user workflow journey latency profiling | Performance test environment with seeded records. | k6 user journey scenario: GET -> POST split -> GET state | 1. Execute end-to-end workflow iterations.<br>2. Measure total journey execution duration. | Total workflow journey latency benchmarked; no progressive memory or connection pool leakage. | Medium | Low | `PERF-API-EDRU-009` |
| **TC-EDRU-026** | `SCN-EDRU-026` | `PERF-UI-EDRU-001` | Standard | Performance | Performance | UI Drawer & Modal Transition Latency | Test browser session logged in as Workforce Manager. | Web application with active assignment | 1. Measure opening time of Details Drawer and split modals via browser performance API / Lighthouse. | Transition and render latencies comply with proposed `p95 <= 2.0 s` target. | Medium | Low | `PERF-UI-EDRU-001` to `006` |
