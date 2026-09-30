---

name: update-k6-ui-navigation
description: Update an existing k6 browser UI performance script using an approved UI investigation and feature specification. Reuse confirmed locators, routes, readiness conditions, authentication, metrics, thresholds, screenshots, and reporting without repeating UI investigation or inventing application behavior.
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Update k6 UI Navigation

## Purpose

Update an existing k6 browser performance script to execute a confirmed UI journey using real browser interactions.

The skill consumes application-specific evidence; it does not discover or invent UI behavior.

---

## Inputs

Use:

1. Applicable `Spec.md`
2. Latest applicable UI investigation report
3. Existing k6 UI script

Typical locations:

```text
performance/investigation/
performance/k6/
```

Use the actual project paths when different.

---

## Source of Truth

### Specification

Use for:

* required journey
* scope
* user actions
* performance requirements
* workload
* SLA/SLO
* approved thresholds

### Investigation

Use for:

* DOM structure
* locators
* routes
* navigation mechanism
* rendering/hydration behavior
* readiness conditions
* cross-page UI differences

### Existing k6 Script

Preserve unless change is required:

* authentication/session setup
* browser/context setup
* environment variables
* VU/iteration configuration
* metrics
* thresholds
* screenshots
* result files
* summaries
* error handling

---

## Required Behavior

For every required UI transition:

```text
Locate element
      ↓
Wait for confirmed availability
      ↓
Start timer
      ↓
Perform real UI action
      ↓
Wait for destination state/route
      ↓
Wait for confirmed readiness
      ↓
Stop timer
      ↓
Record metric
      ↓
Validate result
```

Measure:

`user action → confirmed destination readiness`

not merely:

`user action → URL change`

when the investigation provides a later readiness condition.

---

## Navigation Rules

Use real browser interactions.

Do not use direct destination URL navigation to simulate user navigation.

Initial application loading may use the existing `page.goto()` implementation.

For SPA applications:

* do not require a full document reload
* use the confirmed route/state transition
* wait for confirmed destination readiness

---

## Readiness Rules

Never assume:

```text
domcontentloaded = application ready
body visible = application ready
```

If the investigation identifies:

* hydration delay
* loading shell
* spinner
* delayed navigation rendering
* client-side rendering

implement the confirmed post-render readiness condition.

Do not solve synchronization problems with arbitrary sleeps.

---

## Locator Rules

Use the locator confirmed by the investigation.

Preferred order:

1. stable `data-testid`
2. stable `href`
3. stable `aria-label`
4. stable ID
5. another locator explicitly confirmed by investigation

Do not invent or guess selectors.

Do not replace a confirmed stable locator with visible-text matching without evidence.

---

## Error Handling

A failed interaction must identify:

* source
* target
* locator
* expected route/state
* readiness condition
* actual state where available
* error

Never silently mark an unsuccessful navigation as successful.

---

## Metrics

For each successful required transition:

* record one duration sample
* associate it with the corresponding action/navigation
* preserve existing metric names where possible

Do not create duplicate metrics unnecessarily.

---

## Threshold Rules

Preserve existing thresholds unless the specification or approved performance requirements require a change.

A threshold failure is **not automatically a functional failure**.

Report separately:

### Functional

* authentication
* locator
* click/action
* routing
* destination
* readiness

### Performance

* duration
* percentile
* throughput
* Web Vitals
* threshold result

Never change a threshold simply to make the test pass.

---

## Modification Rules

### Modify

Only the existing k6 UI script.

### Preserve

Existing:

* authentication
* browser setup
* configuration
* metrics
* reporting
* screenshots
* result handling
* thresholds
* error handling

unless technically or specification-required.

### Do Not

* create a duplicate script
* investigate the DOM again when a valid investigation exists
* modify application code
* invent UI behavior
* invent selectors
* invent routes
* use direct URLs for journey navigation
* add arbitrary sleeps
* introduce unsupported k6/browser APIs
* modify unrelated files
* change thresholds just to obtain a pass

---

## Validation

After modification:

### 1. Static/API Validation

Run:

```text
k6 inspect <existing-script>
```

If it fails:

* fix syntax/API issues
* rerun inspection
* do not make unrelated changes

### 2. Execute

After successful inspection:

```text
k6 run <existing-script>
```

### 3. Validate Journey

Verify:

* authentication succeeded
* required journey started
* each required action executed
* each destination reached
* each readiness condition passed
* expected duration samples were recorded

---

## Result Report

Return:

### Changes

* files modified
* implementation changes

### Functional Result

* authentication
* journey execution
* successful actions
* failed actions
* navigation errors
* readiness failures
* number of successful samples

### Performance Result

* measured durations
* percentiles
* relevant Web Vitals
* threshold results

### Information Gaps

Only report information genuinely missing from the specification or investigation.

Do not guess missing behavior.

---

## Completion Criteria

The skill is complete when:

* existing k6 script is updated
* confirmed investigation findings are implemented
* required UI journey uses real browser interactions
* authentication remains functional
* readiness is correctly synchronized
* duration metrics are recorded
* `k6 inspect` succeeds
* `k6 run` is executed
* functional and performance results are separated
* no unsupported assumptions are introduced
