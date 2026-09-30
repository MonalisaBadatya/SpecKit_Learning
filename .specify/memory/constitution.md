# QA Spec Kit Constitution
<!-- Sync Impact Report
- Version change: 1.0.0 → 1.1.0
- Modified principles: entire constitution updated to align with QA and UI automation lifecycle
- Added sections: none (existing sections refined and expanded)
- Removed sections: none
- Follow-up TODOs: none
-->

This constitution aligns the engineering lifecycle to Requirements → Specification → QA Analysis → Manual Test Scenarios → Manual Test Cases → UI Automation → Execution → Reporting.

## Core Principles

### Specification as Source of Truth
The approved specification is the authoritative record of feature behavior and acceptance criteria. Development, testing, and reporting MUST use the specification as the primary reference to avoid divergence.

### Requirements to Testable Specifications
Requirements MUST be converted into clear, testable specifications before testing or automation begins. Each specification MUST describe what the system must do in observable terms.

### Document Ambiguity and Gaps
Ambiguous, contradictory, incomplete, or missing requirements MUST be identified, documented, and resolved rather than silently assumed. Unclear requirements are a risk that MUST be visible to reviewers.

### Objective Acceptance Criteria
Every functional requirement MUST have objectively testable acceptance criteria. Acceptance criteria MUST define measurable success conditions that can be validated by QA and automation.

### Early QA Participation
QA MUST participate in specification review and MUST not wait until development is complete. Early QA involvement ensures the specification is testable and the design is verifiable.

### Specification-Driven Test Artifacts
Manual test scenarios and test cases MUST be derived from the approved specification. Test artifacts MUST remain aligned to the specification and do not supersede it.

### Risk-Based Test Coverage
Testing MUST be risk-based and include appropriate positive, negative, boundary, integration, regression, error, loading, and empty-state scenarios. Test scope MUST reflect user impact and failure modes.

### Python Playwright Automation
UI automation MUST use Python and Playwright for executable browser validation. The automation stack MUST support maintainable, reliable tests for the web application.

### Page Object Model and Component Architecture
UI automation MUST follow Page Object Model and component-driven architecture where appropriate. Page Objects and components MUST encapsulate page behavior and reduce duplicated locator logic.

### Business Behavior Focus
Tests MUST focus on business behavior rather than low-level implementation details. Assertions and flows SHOULD validate outcomes that matter to users and stakeholders.

### Stable Semantic Locators
Stable semantic Playwright locators such as role, label, placeholder, text, and test IDs MUST be preferred over brittle CSS or XPath selectors. Locator strategy MUST prioritize resilience and readability.

### No Arbitrary Hardcoded Waits
Arbitrary hardcoded waits such as time.sleep() MUST not be used unless there is a documented technical justification. Explicit waits MUST be limited to cases where web-first auto-waiting is insufficient.

### Playwright Auto-Waiting and Web-First Assertions
Playwright auto-waiting and web-first assertions MUST be preferred. Tests MUST rely on built-in synchronization and explicit, meaningful assertions for element visibility and state.

### Deterministic and Isolated Tests
Automated tests MUST be deterministic, isolated, independently executable, and resistant to flaky behavior. Each test MUST be able to run alone and in any order without hidden dependencies.

### Mock When Frontend Behavior is Primary
Backend or API dependencies SHOULD be mocked when the purpose of the test is frontend behavior and the real backend is not required. Mocking MUST preserve the behavior relevant to the feature under test.

### Integration Tests for Integration Behavior
Real integration tests MUST be used when integration behavior itself is being tested. Integration test scope MUST include the actual backend, external service, or data flow being validated.

### Separate Environment Configuration
Test data, credentials, URLs, and environment configuration MUST be separated from test implementation wherever practical. Configuration MUST be managed outside individual test scripts.

### Responsive Behavior Consideration
Responsive behavior MUST be considered for user-facing web features. Specifications and tests MUST account for viewport changes, layout shifts, and device-appropriate experiences when applicable.

### Accessibility Considerations
Accessibility MUST be considered during specification, manual testing, and automation. Specified accessibility expectations and test coverage MUST include relevant roles, labels, keyboard behavior, and screen reader context.

### Explicit External Behavior Testing
External links, redirects, URLs, new tabs, and external integrations MUST be explicitly specified and tested when they are part of the requirement. External behavior MUST be validated and documented.

### Responsible AI Assistance
AI MAY assist with specifications, test scenarios, test cases, selectors, Page Objects, Playwright code, and code review, but AI-generated output MUST be reviewed by a human. Human review is required before approval.

### No Invented Assumptions
AI MUST not invent requirements, expected results, selectors, business rules, or assumptions without evidence. All AI-suggested artifacts MUST be grounded in documented requirements or reviewer-confirmed interpretation.

### Automation Code Review Criteria
Automation code MUST be reviewed for flaky locators, arbitrary waits, duplicated logic, test-order dependencies, hardcoded values, weak assertions, and unnecessary implementation coupling. Review feedback MUST be captured and acted on.

### Traceability Across Artifacts
There MUST be traceability between requirement, specification, acceptance criteria, test scenario, test case, and automation. Traceability MUST support validation, auditability, and defect analysis.

### QA Completion Evidence
A feature cannot be considered QA-complete until the relevant specification requirements have appropriate test coverage and execution evidence. Completion MUST include reviewed artifacts and reported results.

### Distinguish Behavior from Implementation
Specifications MUST distinguish clearly between business behavior and implementation details. Business rules MUST be stated independently of UI frameworks, page structure, or technical design.

### Prevent Configuration Leakage
Environment-specific configuration MUST not unnecessarily leak into business specifications or test logic. Business requirements MUST remain implementation-agnostic where practical.

### Explicit Assumptions and Risks
Specifications SHOULD contain explicit assumptions, dependencies, risks, and open questions where applicable. Documentation MUST surface uncertainty and decision context for reviewers.

### Project-Wide Constitution Scope
The constitution itself MUST remain project-wide and reusable. Feature-specific requirements MUST belong in individual specifications, not in this governance document.

### Quality Gates Before Progression
Quality gates MUST exist before specification approval, implementation, and QA completion. Each gate MUST produce evidence before the next phase proceeds.

## Technology Standards
The project MUST use Python and Playwright for UI automation, Markdown for specifications, and a structured review workflow for QA analysis, manual scenarios, and automation artifacts.

## Quality Gates
The mandatory quality gates are Requirement Review, Specification Review, QA Analysis, Manual Test Scenario Review, Test Case Review, Automation Review, Execution Review, and Reporting Review. Each gate MUST produce evidence such as reviewed artifacts, approval notes, or execution results before the next phase proceeds.

## Governance
This constitution governs QA practices for a web application testing project. Amendments require documented change proposals, impact review, and approval from designated reviewers before adoption. All changes MUST preserve traceability, human review, automation reliability, and evidence-based validation.

Semantic Versioning governs constitution updates. A MAJOR version change is required for backward-incompatible governance or principle removals; MINOR for new principles or materially expanded guidance; and PATCH for clarifications or non-semantic wording fixes.

**Version**: 1.1.0 | **Ratified**: 2026-08-03 | **Last Amended**: 2026-08-10
