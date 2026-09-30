/**
 * k6 Performance Test: Effective Date Reassign and Unassign
 *
 * PROVENANCE & ARCHITECTURE NOTE:
 * -----------------------------------------------------------------------------
 * HAR-SOURCED:
 *   - GET /api/workforce/assignments/schedule-grid (HAR #113)
 *   - GET /api/workforce/assignments/board         (HAR #116)
 *   - GET /api/workforce/assignments/{id}/change-requests/pending (HAR #126)
 *
 * SYNTHESIZED FROM API CONTRACT:
 *   - POST /api/workforce/scheduling/assignments/{assignmentId}/split
 *
 * CRITICAL PROVENANCE NOTICE:
 * The POST /split mutation was NOT captured in the HAR recording because the
 * recording was terminated before the confirmation modal was submitted.
 * It is synthesized strictly from the backend API contract documented in
 * specs/Updated_complex_spec.md (Lines 120-175).
 *
 * EXCLUDED REQUESTS:
 *   - 62 static Next.js assets (_next/static/chunks/*.js, *.css, favicons)
 *   - 70 Next.js route prefetch / RSC requests (?_rsc=...)
 *   - UI commute distance calculations (/api/settings/distance/calculate - HAR #125, #164)
 *   - Third-party Azure Blob assets (HAR #23)
 *   - Duplicate queries from React StrictMode hydration (HAR #119-123, #128-129)
 * -----------------------------------------------------------------------------
 *
 * CONCURRENCY & MULTI-VU SAFETY (OCC):
 * -----------------------------------------------------------------------------
 * The /split operation increments the assignment version upon success (OCC).
 * Repeatedly mutating the SAME assignment ID and version will result in HTTP 409
 * Conflict. Multi-VU tests must either:
 *   1. Accept 409s as expected OCC contention behavior (e.g. TC-PERF-EDRU-004).
 *   2. Supply a pool of unique, test-safe assignments per VU/iteration.
 * Do not generate random UUIDs; only use explicitly seeded test records.
 * -----------------------------------------------------------------------------
 */

import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';

// =============================================================================
// Custom Metrics
// =============================================================================
const splitMutationDuration = new Trend('split_mutation_duration_ms');
const splitMutationSuccess = new Rate('split_mutation_success_rate');
const occConflictCounter = new Counter('occ_conflict_count');
const occConflictRate = new Rate('occ_conflict_rate');

// =============================================================================
// Environment & Dynamic Parameter Initialization
// =============================================================================
const BASE_URL = (__ENV.BASE_URL || 'https://danis-cmma-dev.cosdevx.com').replace(/\/$/, '');
const TENANT_SLUG = __ENV.TENANT_SLUG || 'danis-cmma-dev';

// Authentication
// HAR verification: Entry #30 set cookie "cmma_session", and subsequent calls
// send "Cookie: cmma_session=..." plus "x-tenant-slug".
// Keep cookie name and authorization header configurable to support varied environments.
const SESSION_COOKIE = __ENV.SESSION_COOKIE || '';
const COOKIE_NAME = __ENV.COOKIE_NAME || 'cmma_session';
const AUTH_TOKEN = __ENV.AUTH_TOKEN || '';

// Test Execution Mode:
// - 'BUSINESS_MUTATION': Directly benchmarks POST /split without UI precursor reads.
// - 'REALISTIC_UI_FLOW': Precursor reads (schedule-grid, board, drawer check) followed by /split.
const TEST_MODE = (__ENV.TEST_MODE || 'BUSINESS_MUTATION').toUpperCase();

// Business Workflow Parameters
const SCENARIO = (__ENV.SCENARIO || 'unassign').toLowerCase(); // 'unassign' | 'reassign'
const ASSIGNMENT_ID = __ENV.ASSIGNMENT_ID || '';
const TARGET_WORKER_ID = __ENV.TARGET_WORKER_ID || '';
const ASSIGNMENT_VERSION = (__ENV.ASSIGNMENT_VERSION !== undefined && __ENV.ASSIGNMENT_VERSION !== '')
  ? parseInt(__ENV.ASSIGNMENT_VERSION, 10)
  : NaN;

// Date Parameters
const START_DATE = __ENV.START_DATE || '';
const END_DATE = __ENV.END_DATE || '';
const SPLIT_DATE = __ENV.SPLIT_DATE || '';

// Business Flags
const OVERRIDE_CONFLICT = __ENV.OVERRIDE_CONFLICT === 'true';
const OVERRIDE_HISTORIC_LOCKOUT = __ENV.OVERRIDE_HISTORIC_LOCKOUT === 'true';

// =============================================================================
// Test Configuration & Options
// =============================================================================
export const options = {
  scenarios: {
    effective_date_flow: {
      executor: 'per-vu-iterations',
      vus: parseInt(__ENV.VUS || '1', 10),
      iterations: parseInt(__ENV.ITERATIONS || '1', 10),
      maxDuration: '5m',
    },
  },
  thresholds: {
    // SLO targets derived from specs/Updated_complex_spec.md & Performance_TestCases.md:
    // Unassign: p95 < 1000ms, p99 < 2000ms | Reassign: p95 < 1500ms, p99 < 3000ms
    'split_mutation_duration_ms': SCENARIO === 'reassign'
      ? ['p(95)<1500', 'p(99)<3000']
      : ['p(95)<1000', 'p(99)<2000'],
    'split_mutation_success_rate': ['rate>0.95'],
    'http_req_failed': ['rate<0.05'],
  },
};

// =============================================================================
// Setup Hook (Strict Pre-test Parameter & Environment Validation)
// =============================================================================
export function setup() {
  // 1. Authentication Validation
  if (!SESSION_COOKIE && !AUTH_TOKEN) {
    throw new Error(
      'Authentication required: Neither SESSION_COOKIE nor AUTH_TOKEN provided via environment variables. ' +
      'Ensure valid authentication credentials are supplied before running the performance test.'
    );
  }

  // 2. Mode & Scenario Validation
  if (TEST_MODE !== 'BUSINESS_MUTATION' && TEST_MODE !== 'REALISTIC_UI_FLOW') {
    throw new Error(`Invalid TEST_MODE="${TEST_MODE}". Must be "BUSINESS_MUTATION" or "REALISTIC_UI_FLOW".`);
  }

  if (SCENARIO !== 'unassign' && SCENARIO !== 'reassign') {
    throw new Error(`Invalid SCENARIO="${SCENARIO}". Must be "unassign" or "reassign".`);
  }

  // 3. Business Data Validation (No hardcoded IDs or versions)
  if (!ASSIGNMENT_ID) {
    throw new Error(
      'Missing required environment variable: ASSIGNMENT_ID. ' +
      'Do not invent test IDs; provide an explicitly seeded, test-safe assignment ID.'
    );
  }

  if (isNaN(ASSIGNMENT_VERSION) || ASSIGNMENT_VERSION < 0) {
    throw new Error(
      'Missing or invalid environment variable: ASSIGNMENT_VERSION. ' +
      'Must be a non-negative integer matching the database OCC version.'
    );
  }

  if (SCENARIO === 'reassign' && !TARGET_WORKER_ID) {
    throw new Error(
      'Missing required environment variable: TARGET_WORKER_ID for SCENARIO=reassign. ' +
      'A valid replacement worker UUID must be provided.'
    );
  }

  // 4. Date Validation (No hardcoded dates)
  if (!SPLIT_DATE) {
    throw new Error(
      'Missing required environment variable: SPLIT_DATE (format: YYYY-MM-DD). ' +
      'The split date is mandatory for the effective date split mutation.'
    );
  }

  if (TEST_MODE === 'REALISTIC_UI_FLOW' && (!START_DATE || !END_DATE)) {
    throw new Error(
      'Missing required environment variables: START_DATE and/or END_DATE. ' +
      'Both are required when running in REALISTIC_UI_FLOW mode for schedule grid and board queries.'
    );
  }

  console.log(
    `[SETUP] Configured Test Run: Mode=${TEST_MODE}, Scenario=${SCENARIO}, ` +
    `AssignmentID=${ASSIGNMENT_ID}, Version=${ASSIGNMENT_VERSION}, SplitDate=${SPLIT_DATE}`
  );

  return {
    scenario: SCENARIO,
    testMode: TEST_MODE,
    startTime: new Date().toISOString(),
  };
}

// =============================================================================
// Main VU Execution
// =============================================================================
export default function (data) {
  // Build unified headers with configurable authentication (no secrets printed)
  const commonHeaders = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  };

  if (TENANT_SLUG) {
    commonHeaders['x-tenant-slug'] = TENANT_SLUG;
  }

  if (SESSION_COOKIE) {
    commonHeaders['Cookie'] = `${COOKIE_NAME}=${SESSION_COOKIE}`;
  }

  if (AUTH_TOKEN) {
    commonHeaders['Authorization'] = AUTH_TOKEN.startsWith('Bearer ')
      ? AUTH_TOKEN
      : `Bearer ${AUTH_TOKEN}`;
  }

  // ---------------------------------------------------------------------------
  // STEP 1 & 2: Realistic UI Flow (HAR-SOURCED Precursor Queries)
  // Only executed when TEST_MODE === 'REALISTIC_UI_FLOW'
  // ---------------------------------------------------------------------------
  if (TEST_MODE === 'REALISTIC_UI_FLOW') {
    group('01_HAR_Load_Schedule_Context', function () {
      // HAR #113: Schedule Grid View
      const gridRes = http.get(
        `${BASE_URL}/api/workforce/assignments/schedule-grid?startDate=${START_DATE}&endDate=${END_DATE}`,
        { headers: commonHeaders, tags: { name: 'GET_Schedule_Grid' } }
      );
      check(gridRes, {
        'schedule-grid status is 200': (r) => r.status === 200,
      });

      // HAR #116: Assignment Board View
      const boardRes = http.get(
        `${BASE_URL}/api/workforce/assignments/board?startDate=${START_DATE}&endDate=${END_DATE}`,
        { headers: commonHeaders, tags: { name: 'GET_Assignment_Board' } }
      );
      check(boardRes, {
        'board status is 200': (r) => r.status === 200,
      });

      sleep(1);
    });

    group('02_HAR_Inspect_Assignment_Drawer', function () {
      // HAR #126: Assignment Pending Change Requests
      const pendingRes = http.get(
        `${BASE_URL}/api/workforce/assignments/${ASSIGNMENT_ID}/change-requests/pending`,
        { headers: commonHeaders, tags: { name: 'GET_Pending_Change_Requests' } }
      );
      check(pendingRes, {
        'pending change-requests status is 200': (r) => r.status === 200,
      });

      sleep(1);
    });
  }

  // ---------------------------------------------------------------------------
  // STEP 3: Business Mutation - Effective Date Split (SYNTHESIZED FROM CONTRACT)
  // Source: specs/Updated_complex_spec.md (Lines 120-175)
  // Endpoint: POST /api/workforce/scheduling/assignments/{assignmentId}/split
  //
  // NOTE: This POST mutation was NOT captured in the HAR. It is synthesized
  // strictly according to the documented API contract.
  // ---------------------------------------------------------------------------
  group(`03_SYNTHESIZED_Mutation_${SCENARIO.toUpperCase()}`, function () {
    // Exact contract verified from specs/Updated_complex_spec.md:
    // - splitMode: "date" (required)
    // - splitDate: ISO date string (required)
    // - version: integer OCC version (required)
    // - targetWorkerId: UUID for reassign, null for unassign (optional)
    // - overrideConflict: boolean (optional)
    // - overrideHistoricLockout: boolean (optional)
    const splitPayload = {
      splitMode: 'date',
      splitDate: SPLIT_DATE,
      version: ASSIGNMENT_VERSION,
      targetWorkerId: SCENARIO === 'reassign' ? TARGET_WORKER_ID : null,
      overrideConflict: OVERRIDE_CONFLICT,
      overrideHistoricLockout: OVERRIDE_HISTORIC_LOCKOUT,
    };

    const splitRes = http.post(
      `${BASE_URL}/api/workforce/scheduling/assignments/${ASSIGNMENT_ID}/split`,
      JSON.stringify(splitPayload),
      {
        headers: commonHeaders,
        tags: {
          name: `POST_Split_Assignment_${SCENARIO}`,
          operation: SCENARIO,
          mode: TEST_MODE,
        },
      }
    );

    // FIX 5: Use native k6 HTTP timing (splitRes.timings.duration)
    // Avoids dual manual timers and measures exact network/server elapsed duration
    splitMutationDuration.add(splitRes.timings.duration);

    // Status evaluation & metrics recording
    const isSuccess = splitRes.status === 200 || splitRes.status === 201;
    splitMutationSuccess.add(isSuccess);

    if (splitRes.status === 409) {
      occConflictCounter.add(1);
      occConflictRate.add(1);
      console.warn(
        `[WARN] OCC Conflict (409) on Assignment ${ASSIGNMENT_ID}. ` +
        `Supplied version: ${ASSIGNMENT_VERSION}. Mutation was already processed or concurrent contention occurred.`
      );
    } else {
      occConflictRate.add(0);
    }

    // k6 Checks: Separate successful mutation from 409 OCC conflicts and unexpected failures
    check(splitRes, {
      'split status is 200 or 201': (r) => r.status === 200 || r.status === 201,
      'no OCC 409 conflict': (r) => r.status !== 409,
      'not 401 or 403 unauthorized': (r) => r.status !== 401 && r.status !== 403,
    });

    sleep(1);
  });
}
