---
name: performance-test-data
description: Generate, validate, seed, and clean realistic synthetic datasets required by performance test cases. Use before generating k6 scripts when test cases require unique users, projects, assignments, trades, records, or other application entities.
---

# Performance Test Data Skill

## Purpose

Create deterministic, realistic, synthetic test data for performance testing.

Credentials must be supplied at runtime through environment variables or an approved secret store, never hard-coded in this skill or generated files.

## Inputs

Required:
- Performance test cases
- Target environment/base URL
- Workload: VUs, iterations or duration, and/or arrival rate
- Data entities required by each test case

Optional:
- API/schema documentation
- Existing seed/import API
- Reference/master data
- Existing test-data templates
- Cleanup requirements
- Performance acceptance criteria

Runtime environment variables may include:
- `BASE_URL`
- `PERF_USERNAME`
- `PERF_PASSWORD`
- `PERF_TEST_APPROVED`

## Workflow

### 1. Parse test cases

For every performance test case identify:
- business action
- endpoint/workflow
- request fields
- required entities
- prerequisite entities
- reference/master data
- unique fields
- dynamic/correlated fields
- fields that may be reused
- cleanup requirements

Create a data dependency map.

### 2. Classify every field

Use these categories:

- `STATIC`: same value can be reused.
- `UNIQUE`: must be different per record/iteration.
- `REFERENCE`: must match an existing application value.
- `CORRELATED`: value is created by an earlier request and reused later.
- `DYNAMIC`: generated at runtime, such as timestamp or transaction ID.
- `SECRET`: credential or sensitive runtime value; never write it to dataset files.

### 3. Calculate required dataset size

Default formula:

`required_records = VUs × iterations_per_VU × records_per_iteration × safety_factor`

Default safety factor: `1.2`.

For duration/rate workloads:

`required_records = target_iterations_per_second × duration_seconds × records_per_iteration × safety_factor`

If the same record can safely be reused, document why. Prefer unique records when create/update operations could cause contention or duplicate-key failures.

### 4. Generate datasets

Preferred formats:
- JSON for structured/correlated data
- CSV for simple parameterization
- JSON manifest describing the dataset

Recommended structure:

```text
performance/
  data/
    <entity>.json
    <entity>.csv
    reference-data.json
    dataset-manifest.json
```

Use synthetic values with an obvious performance-test prefix, for example:

`PERF-USER-000001`

Do not use real customer/worker information unless explicitly approved for the test environment.

### 5. Validate

Validation must check:
- expected record count
- mandatory fields
- unique-key uniqueness
- valid reference values
- valid relationships
- no empty mandatory fields
- no secrets
- no accidental production/customer data
- data is suitable for the requested concurrency

Fail generation if validation fails.

### 6. Seed

If the application requires pre-created data:
- generate a seed script or import payload
- make seeding idempotent where possible
- record created IDs
- record environment and generation timestamp
- never print credentials in logs

### 7. Cleanup

Generate cleanup information or a cleanup script when test data creates persistent application records.

Cleanup must target only records created by the performance run, preferably using:
- generated test-data prefix
- run ID
- correlation ID
- stored entity IDs

Never perform broad delete operations.

## Required outputs

```text
performance/
  data/
    *.json
    *.csv
    reference-data.json
    dataset-manifest.json
  seed/
    seed-<entity>.js
  cleanup/
    cleanup-<entity>.js
  validation/
    validate-data.js
```

`dataset-manifest.json` should contain:

```json
{
  "environment": "dev",
  "generatedAt": "<timestamp>",
  "runId": "<run-id>",
  "datasets": {
    "users": {
      "count": 1200,
      "uniqueKey": "email"
    }
  }
}
```

## Rules

1. Never hard-code passwords or tokens.
2. Never commit secrets to Git.
3. Never generate fake data that violates required application relationships.
4. Prefer deterministic generation so failures can be reproduced.
5. Keep data generation separate from load execution.
6. Record exactly how many records were generated.
7. Do not delete data outside the generated test-data scope.
8. For a live/shared environment, require explicit performance-test approval before seeding large datasets.

## Completion criteria

The skill is complete only when:
- every testcase has a data dependency map
- required quantities are calculated
- datasets are generated
- datasets pass validation
- seed/cleanup requirements are documented
- no credentials are present in generated artifacts
