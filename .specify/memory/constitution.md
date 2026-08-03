# QA Spec Kit Constitution
<!-- Sync Impact Report
- Version change: 0.0.0 → 1.0.0
- Modified principles: none (new constitution)
- Added sections: Technology Standards, Quality Gates
- Removed sections: none
- Follow-up TODOs: none
-->

## Core Principles

### Shift Left QA
Quality concerns MUST be addressed as early as possible. Requirement review, specification review, and test planning occur before implementation or automation so defects are found when they are cheapest to fix.

### Testability First
Every capability MUST be expressed in a testable form before implementation begins. Requirements, acceptance criteria, and test scenarios MUST define observable outcomes that reviewers can verify without ambiguity.

### Requirement Traceability
Each requirement MUST be traceable to a review artifact, a test scenario, and a test case, and each test case MUST link back to the requirement it validates. Traceability is mandatory for audit readiness and evidence-based decision making.

### Human Review
AI-generated content and automation scaffolding MAY assist delivery, but every output MUST be reviewed by a qualified human before approval. Human review is the final safeguard for correctness, compliance, and risk control.

### Automation After Review
Automation activities MUST begin only after requirements, specifications, and test scenarios have passed review and approval. Approved artifacts become the authoritative basis for Playwright flows, scripts, and Azure DevOps integration.

## Technology Standards
The project MUST use Markdown for specifications, Playwright for executable UI validation, Azure DevOps for work tracking and pipeline orchestration, and GitHub Spec Kit as the governance framework for requirements and approvals.

## Quality Gates
The mandatory quality gates are Requirement Review, Specification Review, Test Scenario Review, Test Case Review, Automation Review, and Execution Review. Each gate MUST produce evidence such as reviewed artifacts, approval notes, or execution results before the next phase proceeds.

## Governance
This constitution governs QA practices for QA Spec Kit. Amendments require documented change proposals, impact review, and approval from designated reviewers before adoption. All changes MUST preserve traceability, human review, and evidence-based validation.

Semantic Versioning governs constitution updates. A MAJOR version change is required for backward-incompatible governance or principle changes; MINOR for new principles or materially expanded guidance; and PATCH for clarifications or non-semantic wording fixes.

**Version**: 1.0.0 | **Ratified**: 2026-08-03 | **Last Amended**: 2026-08-03
