# Regression Test Suite: Assignment Change Request Approval

**Feature:** `feat-assignment-change-request-approval`
**Epic:** `epic-assignments`
**Source of Truth:** `test-plan/AssignmentChangeRequest_TestPlan.md` v2.0 Section 22
**Document Version:** 2.0

---

## 1. Regression Strategy

Key objective: **ACR approval must not silently break downstream scheduling views (Assignment Detail, Timeline, Calendar, worker availability, conflict calculations, project dates).**

### Regression Test Oracle

After every ACR approval, verify:
- Assignment Detail panel shows new proposed dates
- Timeline block repositioned/resized to new date range
- Calendar shows assignment in new date range without duplication
- Worker availability updated; no residual conflict from old dates
- Conflict calculations use new assignment dates
- Project end date updated when extendProjectEndDate=true

---

## 2. Regression Test Case Selection

| Reg ID | Source TC | Layer | Priority | Rationale |
| :--- | :--- | :---: | :---: | :--- |
| REG-001 | TC-UI-001 | UI | P1 | Primary WFM entry point - widget + drawer banner |
| REG-002 | TC-UI-002 | UI | P1 | Core happy-path clean approval state mutation |
| REG-003 | TC-UI-003 | UI | P1 | Conflict override - prevents accidental double-booking |
| REG-004 | TC-UI-004 | UI | P1 | Project extension - protects schedule boundaries |
| REG-005 | TC-UI-005 | UI | P0 | Historic lockout WFM block - RBAC security |
| REG-006 | TC-UI-010 | UI | P0 | Pursuit/Draft block - legal/contractual guard |
| REG-007 | TC-UI-011 | UI | P1 | Self-collision exclusion - prevents false-positive conflicts |
| REG-008 | TC-UI-018 | UI | P1 | Assignment Detail + Timeline + Calendar downstream sync |
| REG-009 | TC-API-B01 | API | P1 | HMAC token preview contract |
| REG-010 | TC-API-B03 | API | P0 | Email token execution and assignment update |
| REG-011 | TC-API-S01 | API | P0 | Tampered token rejected (security regression) |
| REG-012 | TC-API-S02 | API | P0 | Token reuse rejected (security regression) |
| REG-013 | TC-API-S08 | API | P0 | Cross-tenant token rejected |
| REG-014 | TC-API-CC01 | API | P0 | Concurrent approval - single winner |
| REG-015 | TC-API-SM01 | API | P0 | APPROVED -> approve again returns 409 |
| REG-016 | TC-API-S09 | API | P0 | PM JWT on approve returns 403 |
| REG-017 | TC-API-S15 | API | P0 | Cross-tenant changeRequestId returns 404 |
| REG-018 | TC-DB-002 | DB | P1 | Token CASCADE-delete with ACR |
| REG-019 | TC-DB-011 | DB | P1 | Auto-cancel + token invalidation on assignment deletion |
| REG-020 | TC-DB-006 | DB | P1 | Clean approval data integrity |
| REG-021 | TC-DB-020 | DB | P0 | Token not reusable after usedAt (security) |
| REG-022 | TC-DB-021 | DB | P0 | Multi-tenant schema isolation |

---

## 3. Downstream Scheduling Regression Scenarios

| TC ID | Scenario | Verified Areas |
| :--- | :--- | :--- |
| REG-DS-001 | Clean approval - date range shift | Assignment Detail, Timeline, Calendar |
| REG-DS-002 | Conflict override approval | Conflict calc recalculated; no residual old-date conflict |
| REG-DS-003 | Project extension approval | Project end date in project view; Timeline extends |
| REG-DS-004 | Rejection - no date change | Assignment dates unchanged in all views |
| REG-DS-005 | Withdrawal - no date change | Assignment dates unchanged in all views |

---

## 4. Regression Execution Matrix

| Test Group | Test IDs | Frequency | Mode | Dependency |
| :--- | :--- | :--- | :--- | :--- |
| Core UI | REG-001 to REG-008 | Every PR / Daily | Playwright (automated) | Frontend dev environment |
| Core API | REG-009 to REG-017 | Every commit / CI | Pytest + Requests (automated) | API test environment |
| DB Integrity | REG-018 to REG-022 | Schema migration / Sprint release | Manual SQL | PostgreSQL test DB |
| Downstream | REG-DS-001 to REG-DS-005 | Sprint release | Playwright (automated) | Full stack environment |
