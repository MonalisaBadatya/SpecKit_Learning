/**
 * k6 Performance Test: Full API Navigation Flow
 *
 * Flow:
 *   My Actions
 *      -> Projects
 *      -> Workforce
 *      -> Scheduling
 *      -> Reports
 *      -> Insights
 *      -> Admin Console
 *
 * API reporting:
 *   Every API request is tracked individually with:
 *     - Page
 *     - API name
 *     - HTTP method
 *     - Full endpoint
 *     - HTTP status
 *     - Request count
 *     - Failed request count
 *     - Failure rate
 *     - Average response time
 *     - Min / Median / Max
 *     - P90 / P95 / P99
 *     - RPS
 *     - Result
 *
 * Authentication:
 *   - cmma_session cookie
 *   - x-tenant-slug header
 *
 * Secrets:
 *   Supplied only through __ENV.
 */

import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';

// =============================================================================
// Environment Configuration
// =============================================================================

const BASE_URL =
  (__ENV.BASE_URL || 'https://danis-cmma-dev.cosdevx.com').replace(/\/$/, '');

const TENANT_SLUG =
  __ENV.TENANT_SLUG || 'danis-cmma-dev';

const COOKIE_NAME =
  __ENV.COOKIE_NAME || 'cmma_session';

const SESSION_COOKIE =
  __ENV.SESSION_COOKIE || '';

// =============================================================================
// Query Parameters
// =============================================================================

const PROJECT_LIMIT =
  __ENV.PROJECT_LIMIT || '25';

const OFFSET =
  __ENV.OFFSET || '0';

const SORT_BY =
  __ENV.SORT_BY || 'name';

const SORT_ORDER =
  __ENV.SORT_ORDER || 'ASC';

// Scheduling

const SCHED_START_DATE =
  __ENV.START_DATE || '2026-09-02';

const SCHED_END_DATE =
  __ENV.END_DATE || '2026-12-09';

// Insights

const INSIGHTS_BOARD_START =
  __ENV.INSIGHTS_BOARD_START || '2026-06-09';

const INSIGHTS_BOARD_END =
  __ENV.INSIGHTS_BOARD_END || '2026-12-09';

const INSIGHTS_SUMMARY_START =
  __ENV.INSIGHTS_SUMMARY_START || '2026-01-01';

const INSIGHTS_SUMMARY_END =
  __ENV.INSIGHTS_SUMMARY_END || '2026-12-31';

// Workforce

const WORKFORCE_TRADES =
  __ENV.WORKFORCE_TRADES ||
  'ADMINISTRATION,CARPENTRY,CONCRETE,CRANE,DESIGN/VDC';

// =============================================================================
// Performance Targets
// =============================================================================

const TARGETS = {
  api_http_failure_rate_pct:
    Number(__ENV.API_HTTP_FAILURE_RATE_PCT || 1),

  api_page_success_rate_pct:
    Number(__ENV.API_PAGE_SUCCESS_RATE_PCT || 99),

  api_p95_ms:
    Number(__ENV.API_P95_MS || 2000),
};

// =============================================================================
// Page Metrics
// =============================================================================

const pageSuccessRate =
  new Rate('page_success_rate');

const page01MyActionsDuration =
  new Trend('page_01_my_actions_duration_ms');

const page02ProjectsDuration =
  new Trend('page_02_projects_duration_ms');

const page03WorkforceDuration =
  new Trend('page_03_workforce_duration_ms');

const page04SchedulingDuration =
  new Trend('page_04_scheduling_duration_ms');

const page05ReportsDuration =
  new Trend('page_05_reports_duration_ms');

const page06InsightsDuration =
  new Trend('page_06_insights_duration_ms');

const page07AdminConsoleDuration =
  new Trend('page_07_admin_console_duration_ms');

// =============================================================================
// API Definitions
// =============================================================================

const API_DEFINITIONS = {

  // ---------------------------------------------------------------------------
  // 01 - My Actions
  // ---------------------------------------------------------------------------

  my_actions_dashboard_overview: {
    page: 'My Actions',
    api_name: 'Dashboard Overview',
    method: 'GET',
    endpoint: '/api/dashboard/overview',
  },

  my_actions_dashboard_comments: {
    page: 'My Actions',
    api_name: 'Dashboard Comments',
    method: 'GET',
    endpoint: '/api/dashboard/comments',
  },

  my_actions_user_preferences: {
    page: 'My Actions',
    api_name: 'User Preferences',
    method: 'GET',
    endpoint: '/api/users/me/preferences',
  },

  my_actions_requestable_trades: {
    page: 'My Actions',
    api_name: 'Requestable Resource Trades',
    method: 'GET',
    endpoint: '/api/resource-trades?includeNonRequestable=false',
  },

  my_actions_workforce_check: {
    page: 'My Actions',
    api_name: 'Workforce Presence Check',
    method: 'GET',
    endpoint: '/api/workforce?limit=1',
  },

  my_actions_system_labels: {
    page: 'My Actions',
    api_name: 'System Labels',
    method: 'GET',
    endpoint: '/api/system/labels',
  },

  my_actions_assignment_change_requests: {
    page: 'My Actions',
    api_name: 'Pending Assignment Change Requests',
    method: 'GET',
    endpoint:
      '/api/workforce/assignment-change-requests?status=PENDING&limit=10',
  },

  my_actions_saved_views: {
    page: 'My Actions',
    api_name: 'Global Saved Views',
    method: 'GET',
    endpoint:
      '/api/workforce/saved-views?featureKey=all',
  },

  // ---------------------------------------------------------------------------
  // 02 - Projects
  // ---------------------------------------------------------------------------

  projects_saved_views: {
    page: 'Projects',
    api_name: 'Projects Saved Views',
    method: 'GET',
    endpoint:
      '/api/workforce/saved-views?featureKey=projects-directory',
  },

  projects_regions: {
    page: 'Projects',
    api_name: 'System Regions',
    method: 'GET',
    endpoint: '/api/system/regions',
  },

  projects_custom_fields: {
    page: 'Projects',
    api_name: 'System Custom Fields',
    method: 'GET',
    endpoint: '/api/system/custom-fields',
  },

  projects_statuses: {
    page: 'Projects',
    api_name: 'Project Statuses',
    method: 'GET',
    endpoint:
      '/api/system/statuses?entityType=PROJECT',
  },

  projects_client_accounts: {
    page: 'Projects',
    api_name: 'Client Accounts',
    method: 'GET',
    endpoint: '/api/client-accounts',
  },

  projects_directory: {
    page: 'Projects',
    api_name: 'Projects Directory List',
    method: 'GET',
    endpoint:
      '/api/projects?limit=${PROJECT_LIMIT}&offset=${OFFSET}&sortBy=${SORT_BY}&sortOrder=${SORT_ORDER}',
  },

  // ---------------------------------------------------------------------------
  // 03 - Workforce
  // ---------------------------------------------------------------------------

  workforce_custom_fields: {
    page: 'Workforce',
    api_name: 'System Custom Fields',
    method: 'GET',
    endpoint: '/api/system/custom-fields',
  },

  workforce_all_trades: {
    page: 'Workforce',
    api_name: 'All Resource Trades',
    method: 'GET',
    endpoint:
      '/api/resource-trades?includeNonRequestable=true',
  },

  workforce_regions: {
    page: 'Workforce',
    api_name: 'System Regions',
    method: 'GET',
    endpoint: '/api/system/regions',
  },

  workforce_directory: {
    page: 'Workforce',
    api_name: 'Workforce Directory List',
    method: 'GET',
    endpoint:
      '/api/workforce?limit=${PROJECT_LIMIT}&offset=${OFFSET}&sortBy=${SORT_BY}&sortOrder=${SORT_ORDER}&viewMode=directory',
  },

  workforce_saved_views: {
    page: 'Workforce',
    api_name: 'Workforce Saved Views',
    method: 'GET',
    endpoint:
      '/api/workforce/saved-views?featureKey=workforce-directory',
  },

  workforce_filtered_directory: {
    page: 'Workforce',
    api_name: 'Filtered Workforce List',
    method: 'GET',
    endpoint:
      '/api/workforce?trades=${WORKFORCE_TRADES}&limit=${PROJECT_LIMIT}&offset=${OFFSET}&sortBy=${SORT_BY}&sortOrder=${SORT_ORDER}&viewMode=directory',
  },

  // ---------------------------------------------------------------------------
  // 04 - Scheduling
  // ---------------------------------------------------------------------------

  scheduling_schedule_grid: {
    page: 'Scheduling',
    api_name: 'Schedule Grid',
    method: 'GET',
    endpoint:
      '/api/workforce/assignments/schedule-grid?startDate=${SCHED_START_DATE}&endDate=${SCHED_END_DATE}',
  },

  scheduling_requestable_trades: {
    page: 'Scheduling',
    api_name: 'Requestable Resource Trades',
    method: 'GET',
    endpoint:
      '/api/resource-trades?includeNonRequestable=false',
  },

  scheduling_assignments_board: {
    page: 'Scheduling',
    api_name: 'Assignments Board',
    method: 'GET',
    endpoint:
      '/api/workforce/assignments/board?startDate=${SCHED_START_DATE}&endDate=${SCHED_END_DATE}',
  },

  scheduling_saved_views: {
    page: 'Scheduling',
    api_name: 'Schedule Saved Views',
    method: 'GET',
    endpoint:
      '/api/workforce/saved-views?featureKey=workforce-schedule',
  },

  // ---------------------------------------------------------------------------
  // 05 - Reports
  // ---------------------------------------------------------------------------

  reports_projects: {
    page: 'Reports',
    api_name: 'Projects Dataset',
    method: 'GET',
    endpoint: '/api/projects',
  },

  reports_regions: {
    page: 'Reports',
    api_name: 'System Regions',
    method: 'GET',
    endpoint: '/api/system/regions',
  },

  reports_workforce: {
    page: 'Reports',
    api_name: 'Workforce Dataset',
    method: 'GET',
    endpoint:
      '/api/workforce?includeNextAvailable=false',
  },

  reports_resource_trades: {
    page: 'Reports',
    api_name: 'All Resource Trades',
    method: 'GET',
    endpoint:
      '/api/resource-trades?includeNonRequestable=true',
  },

  reports_saved_views: {
    page: 'Reports',
    api_name: 'Fulfillment Saved Views',
    method: 'GET',
    endpoint:
      '/api/workforce/saved-views?featureKey=reports-fulfillment',
  },

  // ---------------------------------------------------------------------------
  // 06 - Insights
  // ---------------------------------------------------------------------------

  insights_assignment_board: {
    page: 'Insights',
    api_name: 'Insights Assignment Board',
    method: 'GET',
    endpoint:
      '/api/workforce/assignments/board?startDate=${INSIGHTS_BOARD_START}&endDate=${INSIGHTS_BOARD_END}',
  },

  insights_resource_trades: {
    page: 'Insights',
    api_name: 'Resource Trades',
    method: 'GET',
    endpoint:
      '/api/resource-trades?includeNonRequestable=true',
  },

  insights_saved_views: {
    page: 'Insights',
    api_name: 'Insights Workforce Saved Views',
    method: 'GET',
    endpoint:
      '/api/workforce/saved-views?featureKey=insights-workforce',
  },

  insights_projects: {
    page: 'Insights',
    api_name: 'Insights Projects',
    method: 'GET',
    endpoint: '/api/projects',
  },

  insights_active_regions: {
    page: 'Insights',
    api_name: 'Active Regions',
    method: 'GET',
    endpoint:
      '/api/system/regions?status=active',
  },

  insights_lob: {
    page: 'Insights',
    api_name: 'Lines of Business',
    method: 'GET',
    endpoint: '/api/system/lob',
  },

  insights_workforce_summary: {
    page: 'Insights',
    api_name: 'Executive Workforce Summary',
    method: 'GET',
    endpoint:
      '/api/reporting/workforce/dashboard-summary?startDate=${INSIGHTS_SUMMARY_START}&endDate=${INSIGHTS_SUMMARY_END}',
  },

  // ---------------------------------------------------------------------------
  // 07 - Admin Console
  // ---------------------------------------------------------------------------

  admin_user_roles: {
    page: 'Admin Console',
    api_name: 'User Roles',
    method: 'GET',
    endpoint: '/api/users/roles',
  },

  admin_user_directory: {
    page: 'Admin Console',
    api_name: 'User Directory',
    method: 'GET',
    endpoint: '/api/users',
  },
};

// =============================================================================
// Dynamic API Metrics
// =============================================================================

const apiMetrics = {};

Object.keys(API_DEFINITIONS).forEach((key) => {

  apiMetrics[key] = {

    duration:
      new Trend(`api_${key}_duration_ms`, true),

    requests:
      new Counter(`api_${key}_requests`),

    failures:
      new Counter(`api_${key}_failures`),

    success:
      new Rate(`api_${key}_success`),
  };
});

// =============================================================================
// k6 Options
// =============================================================================

export const options = {

  summaryTrendStats: [
    'avg',
    'min',
    'med',
    'max',
    'p(90)',
    'p(95)',
    'p(99)',
  ],

  scenarios: {

    navigation_flow: {

      executor: 'per-vu-iterations',

      vus:
        parseInt(__ENV.VUS || '1', 10),

      iterations:
        parseInt(__ENV.ITERATIONS || '1', 10),

      maxDuration:
        '10m',
    },
  },

  thresholds: {

    // API HTTP failure rate < 1%
    http_req_failed:
      ['rate<0.01'],

    // Page success rate >= 99%
    page_success_rate:
      ['rate>=0.99'],

    // Overall API HTTP p95 < 2000 ms
    http_req_duration:
      ['p(95)<2000'],
  },
};

// =============================================================================
// Header Builder
// =============================================================================

function getHeaders() {

  const headers = {

    Accept:
      'application/json, text/plain, */*',

    'x-tenant-slug':
      TENANT_SLUG,
  };

  if (SESSION_COOKIE) {

    headers.Cookie =
      `${COOKIE_NAME}=${SESSION_COOKIE}`;

  } else {

    console.log(
      'WARNING: SESSION_COOKIE is not set'
    );
  }

  return headers;
}

// =============================================================================
// Endpoint Resolver
// =============================================================================

function resolveEndpoint(endpoint) {

  return endpoint
    .replace(/\$\{PROJECT_LIMIT\}/g, PROJECT_LIMIT)
    .replace(/\$\{OFFSET\}/g, OFFSET)
    .replace(/\$\{SORT_BY\}/g, SORT_BY)
    .replace(/\$\{SORT_ORDER\}/g, SORT_ORDER)
    .replace(/\$\{SCHED_START_DATE\}/g, SCHED_START_DATE)
    .replace(/\$\{SCHED_END_DATE\}/g, SCHED_END_DATE)
    .replace(/\$\{INSIGHTS_BOARD_START\}/g, INSIGHTS_BOARD_START)
    .replace(/\$\{INSIGHTS_BOARD_END\}/g, INSIGHTS_BOARD_END)
    .replace(/\$\{INSIGHTS_SUMMARY_START\}/g, INSIGHTS_SUMMARY_START)
    .replace(/\$\{INSIGHTS_SUMMARY_END\}/g, INSIGHTS_SUMMARY_END)
    .replace(
      /\$\{WORKFORCE_TRADES\}/g,
      encodeURIComponent(WORKFORCE_TRADES)
    );
}

// =============================================================================
// API GET Helper
// =============================================================================

function apiGet(apiKey, headers) {

  const api =
    API_DEFINITIONS[apiKey];

  if (!api) {

    throw new Error(
      `Unknown API key: ${apiKey}`
    );
  }

  const endpoint =
    resolveEndpoint(api.endpoint);

  const url =
    `${BASE_URL}${endpoint}`;

  const response =
    http.get(url, {

      headers: headers,

      tags: {

        name:
          `${api.method} ${endpoint}`,

        api_name:
          api.api_name,

        endpoint:
          endpoint,

        method:
          api.method,

        page:
          api.page,
      },
    });

  // ---------------------------------------------------------------------------
  // Record API metrics
  // ---------------------------------------------------------------------------

  apiMetrics[apiKey]
    .requests
    .add(1);

  apiMetrics[apiKey]
    .duration
    .add(response.timings.duration);

  const passed =
    response.status >= 200 &&
    response.status < 300;

  apiMetrics[apiKey]
    .success
    .add(passed);

  if (!passed) {

    apiMetrics[apiKey]
      .failures
      .add(1);

    console.log(
      `[API FAIL] ` +
      `${api.page} | ` +
      `${api.api_name} | ` +
      `${api.method} ${endpoint} | ` +
      `HTTP ${response.status} | ` +
      `${response.timings.duration.toFixed(2)} ms`
    );
  }

  // ---------------------------------------------------------------------------
  // Functional check
  // ---------------------------------------------------------------------------

  check(response, {

    [`${api.page} | ${api.api_name} | HTTP ${response.status}`]:
      () => passed,
  });

  return response;
}

// =============================================================================
// Main Navigation Flow
// =============================================================================

export default function () {

  const headers =
    getHeaders();

  // ===========================================================================
  // 01 - My Actions
  // ===========================================================================

  group('01_My_Actions', function () {

    const start =
      Date.now();

    let pageOk =
      true;

    // IMPORTANT:
    // Dashboard Overview is intentionally called ONCE.
    // The previous version called this endpoint twice.

    const overview =
      apiGet(
        'my_actions_dashboard_overview',
        headers
      );

    pageOk =
      check(overview, {

        'My Actions: overview status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const comments =
      apiGet(
        'my_actions_dashboard_comments',
        headers
      );

    pageOk =
      check(comments, {

        'My Actions: comments status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const prefs =
      apiGet(
        'my_actions_user_preferences',
        headers
      );

    pageOk =
      check(prefs, {

        'My Actions: preferences status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const trades =
      apiGet(
        'my_actions_requestable_trades',
        headers
      );

    pageOk =
      check(trades, {

        'My Actions: trades status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const workforce =
      apiGet(
        'my_actions_workforce_check',
        headers
      );

    pageOk =
      check(workforce, {

        'My Actions: workforce check status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const labels =
      apiGet(
        'my_actions_system_labels',
        headers
      );

    pageOk =
      check(labels, {

        'My Actions: labels status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const changeReqs =
      apiGet(
        'my_actions_assignment_change_requests',
        headers
      );

    pageOk =
      check(changeReqs, {

        'My Actions: change requests status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const views =
      apiGet(
        'my_actions_saved_views',
        headers
      );

    pageOk =
      check(views, {

        'My Actions: saved views status 200':
          (r) => r.status === 200,

      }) && pageOk;

    pageSuccessRate.add(pageOk);

    page01MyActionsDuration
      .add(Date.now() - start);
  });

  sleep(1);

  // ===========================================================================
  // 02 - Projects
  // ===========================================================================

  group('02_Projects', function () {

    const start =
      Date.now();

    let pageOk =
      true;

    const views =
      apiGet(
        'projects_saved_views',
        headers
      );

    pageOk =
      check(views, {

        'Projects: saved views status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const regions =
      apiGet(
        'projects_regions',
        headers
      );

    pageOk =
      check(regions, {

        'Projects: regions status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const fields =
      apiGet(
        'projects_custom_fields',
        headers
      );

    pageOk =
      check(fields, {

        'Projects: custom fields status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const statuses =
      apiGet(
        'projects_statuses',
        headers
      );

    pageOk =
      check(statuses, {

        'Projects: statuses status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const clients =
      apiGet(
        'projects_client_accounts',
        headers
      );

    pageOk =
      check(clients, {

        'Projects: client accounts status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const projects =
      apiGet(
        'projects_directory',
        headers
      );

    pageOk =
      check(projects, {

        'Projects: projects list status 200':
          (r) => r.status === 200,

      }) && pageOk;

    pageSuccessRate.add(pageOk);

    page02ProjectsDuration
      .add(Date.now() - start);
  });

  sleep(1);

  // ===========================================================================
  // 03 - Workforce
  // ===========================================================================

  group('03_Workforce', function () {

    const start =
      Date.now();

    let pageOk =
      true;

    const fields =
      apiGet(
        'workforce_custom_fields',
        headers
      );

    pageOk =
      check(fields, {

        'Workforce: custom fields status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const trades =
      apiGet(
        'workforce_all_trades',
        headers
      );

    pageOk =
      check(trades, {

        'Workforce: trades status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const regions =
      apiGet(
        'workforce_regions',
        headers
      );

    pageOk =
      check(regions, {

        'Workforce: regions status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const list =
      apiGet(
        'workforce_directory',
        headers
      );

    pageOk =
      check(list, {

        'Workforce: initial list status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const views =
      apiGet(
        'workforce_saved_views',
        headers
      );

    pageOk =
      check(views, {

        'Workforce: saved views status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const filtered =
      apiGet(
        'workforce_filtered_directory',
        headers
      );

    pageOk =
      check(filtered, {

        'Workforce: trade-filtered list status 200':
          (r) => r.status === 200,

      }) && pageOk;

    pageSuccessRate.add(pageOk);

    page03WorkforceDuration
      .add(Date.now() - start);
  });

  sleep(1);

  // ===========================================================================
  // 04 - Scheduling
  // ===========================================================================

  group('04_Scheduling', function () {

    const start =
      Date.now();

    let pageOk =
      true;

    const grid =
      apiGet(
        'scheduling_schedule_grid',
        headers
      );

    pageOk =
      check(grid, {

        'Scheduling: schedule grid status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const trades =
      apiGet(
        'scheduling_requestable_trades',
        headers
      );

    pageOk =
      check(trades, {

        'Scheduling: trades status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const board =
      apiGet(
        'scheduling_assignments_board',
        headers
      );

    pageOk =
      check(board, {

        'Scheduling: assignment board status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const views =
      apiGet(
        'scheduling_saved_views',
        headers
      );

    pageOk =
      check(views, {

        'Scheduling: saved views status 200':
          (r) => r.status === 200,

      }) && pageOk;

    pageSuccessRate.add(pageOk);

    page04SchedulingDuration
      .add(Date.now() - start);
  });

  sleep(1);

  // ===========================================================================
  // 05 - Reports
  // ===========================================================================

  group('05_Reports', function () {

    const start =
      Date.now();

    let pageOk =
      true;

    const projects =
      apiGet(
        'reports_projects',
        headers
      );

    pageOk =
      check(projects, {

        'Reports: projects status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const regions =
      apiGet(
        'reports_regions',
        headers
      );

    pageOk =
      check(regions, {

        'Reports: regions status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const workforce =
      apiGet(
        'reports_workforce',
        headers
      );

    pageOk =
      check(workforce, {

        'Reports: workforce status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const trades =
      apiGet(
        'reports_resource_trades',
        headers
      );

    pageOk =
      check(trades, {

        'Reports: trades status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const views =
      apiGet(
        'reports_saved_views',
        headers
      );

    pageOk =
      check(views, {

        'Reports: fulfillment saved views status 200':
          (r) => r.status === 200,

      }) && pageOk;

    pageSuccessRate.add(pageOk);

    page05ReportsDuration
      .add(Date.now() - start);
  });

  sleep(1);

  // ===========================================================================
  // 06 - Insights
  // ===========================================================================

  group('06_Insights', function () {

    const start =
      Date.now();

    let pageOk =
      true;

    const board =
      apiGet(
        'insights_assignment_board',
        headers
      );

    pageOk =
      check(board, {

        'Insights: assignment board status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const trades =
      apiGet(
        'insights_resource_trades',
        headers
      );

    pageOk =
      check(trades, {

        'Insights: trades status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const views =
      apiGet(
        'insights_saved_views',
        headers
      );

    pageOk =
      check(views, {

        'Insights: saved views status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const projects =
      apiGet(
        'insights_projects',
        headers
      );

    pageOk =
      check(projects, {

        'Insights: projects status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const regions =
      apiGet(
        'insights_active_regions',
        headers
      );

    pageOk =
      check(regions, {

        'Insights: active regions status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const lob =
      apiGet(
        'insights_lob',
        headers
      );

    pageOk =
      check(lob, {

        'Insights: line of business status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const summary =
      apiGet(
        'insights_workforce_summary',
        headers
      );

    pageOk =
      check(summary, {

        'Insights: dashboard summary status 200':
          (r) => r.status === 200,

      }) && pageOk;

    pageSuccessRate.add(pageOk);

    page06InsightsDuration
      .add(Date.now() - start);
  });

  sleep(1);

  // ===========================================================================
  // 07 - Admin Console
  // ===========================================================================

  group('07_Admin_Console', function () {

    const start =
      Date.now();

    let pageOk =
      true;

    const roles =
      apiGet(
        'admin_user_roles',
        headers
      );

    pageOk =
      check(roles, {

        'Admin Console: user roles status 200':
          (r) => r.status === 200,

      }) && pageOk;

    const users =
      apiGet(
        'admin_user_directory',
        headers
      );

    pageOk =
      check(users, {

        'Admin Console: users list status 200':
          (r) => r.status === 200,

      }) && pageOk;

    pageSuccessRate.add(pageOk);

    page07AdminConsoleDuration
      .add(Date.now() - start);
  });
}

// =============================================================================
// Summary Reporting
// =============================================================================

export function handleSummary(data) {

  const timestamp =
    new Date().toISOString();

  const vus =
    parseInt(__ENV.VUS || '1', 10);

  const iterations =
    parseInt(__ENV.ITERATIONS || '1', 10);

  // ---------------------------------------------------------------------------
  // Metric helpers
  // ---------------------------------------------------------------------------

  function trendStat(metricName, stat) {

    const metric =
      data.metrics[metricName];

    if (!metric || !metric.values) {
      return null;
    }

    const value =
      metric.values[stat];

    if (
      value === undefined ||
      value === null
    ) {
      return null;
    }

    return Number(
      value.toFixed(3)
    );
  }

  function counterStat(metricName) {

    const metric =
      data.metrics[metricName];

    if (
      !metric ||
      !metric.values
    ) {
      return 0;
    }

    return metric.values.count || 0;
  }

  function rateStat(metricName) {

    const metric =
      data.metrics[metricName];

    if (
      !metric ||
      !metric.values
    ) {
      return null;
    }

    const value =
      metric.values.rate;

    if (
      value === undefined ||
      value === null
    ) {
      return null;
    }

    return Number(
      (value * 100).toFixed(2)
    );
  }

  function thresholdResult(metricName) {

    const metric =
      data.metrics[metricName];

    if (
      !metric ||
      !metric.thresholds
    ) {
      return [];
    }

    return Object.entries(
      metric.thresholds
    ).map(
      ([expression, result]) => {

        const passed =
          typeof result === 'object' &&
            result !== null
            ? result.ok === true
            : result === true;

        return {
          expression,
          passed,
        };
      }
    );
  }

  // ---------------------------------------------------------------------------
  // Overall HTTP metrics
  // ---------------------------------------------------------------------------

  const httpDuration = {

    avg_ms:
      trendStat(
        'http_req_duration',
        'avg'
      ),

    min_ms:
      trendStat(
        'http_req_duration',
        'min'
      ),

    med_ms:
      trendStat(
        'http_req_duration',
        'med'
      ),

    max_ms:
      trendStat(
        'http_req_duration',
        'max'
      ),

    p90_ms:
      trendStat(
        'http_req_duration',
        'p(90)'
      ),

    p95_ms:
      trendStat(
        'http_req_duration',
        'p(95)'
      ),

    p99_ms:
      trendStat(
        'http_req_duration',
        'p(99)'
      ),
  };

  // ---------------------------------------------------------------------------
  // Page metrics
  // ---------------------------------------------------------------------------

  const pageMetricDefinitions = [

    [
      'My Actions',
      'page_01_my_actions_duration_ms',
    ],

    [
      'Projects',
      'page_02_projects_duration_ms',
    ],

    [
      'Workforce',
      'page_03_workforce_duration_ms',
    ],

    [
      'Scheduling',
      'page_04_scheduling_duration_ms',
    ],

    [
      'Reports',
      'page_05_reports_duration_ms',
    ],

    [
      'Insights',
      'page_06_insights_duration_ms',
    ],

    [
      'Admin Console',
      'page_07_admin_console_duration_ms',
    ],
  ];

  const pageDurations = {};

  pageMetricDefinitions.forEach(
    ([page, metric]) => {

      pageDurations[page] = {

        avg_ms:
          trendStat(metric, 'avg'),

        min_ms:
          trendStat(metric, 'min'),

        med_ms:
          trendStat(metric, 'med'),

        max_ms:
          trendStat(metric, 'max'),

        p90_ms:
          trendStat(metric, 'p(90)'),

        p95_ms:
          trendStat(metric, 'p(95)'),

        p99_ms:
          trendStat(metric, 'p(99)'),
      };
    }
  );

  // ---------------------------------------------------------------------------
  // API performance results
  // ---------------------------------------------------------------------------

  const apiPerformance = [];

  Object.keys(API_DEFINITIONS)
    .forEach((apiKey) => {

      const api =
        API_DEFINITIONS[apiKey];

      const durationMetric =
        data.metrics[
        `api_${apiKey}_duration_ms`
        ];

      const requestMetric =
        data.metrics[
        `api_${apiKey}_requests`
        ];

      const failureMetric =
        data.metrics[
        `api_${apiKey}_failures`
        ];

      const requests =
        requestMetric &&
          requestMetric.values
          ? requestMetric.values.count || 0
          : 0;

      const failedRequests =
        failureMetric &&
          failureMetric.values
          ? failureMetric.values.count || 0
          : 0;

      const failureRate =
        requests > 0
          ? Number(
            (
              failedRequests /
              requests *
              100
            ).toFixed(2)
          )
          : 0;

      const values =
        durationMetric &&
          durationMetric.values
          ? durationMetric.values
          : {};

      const avg =
        values.avg ?? null;

      const min =
        values.min ?? null;

      const med =
        values.med ?? null;

      const max =
        values.max ?? null;

      const p90 =
        values['p(90)'] ?? null;

      const p95 =
        values['p(95)'] ?? null;

      const p99 =
        values['p(99)'] ?? null;

      const status =
        requests === 0
          ? 'NOT EXECUTED'
          : failedRequests > 0
            ? 'FAIL'
            : p95 !== null &&
              p95 >= TARGETS.api_p95_ms
              ? 'CHECK'
              : 'PASS';

      const httpStatus =
        failedRequests > 0
          ? 'ERROR'
          : requests > 0
            ? '200'
            : '—';

      // Approximate endpoint RPS using the
      // total measured duration of requests.
      const totalDurationMs =
        requests > 0 && avg !== null
          ? avg * requests
          : null;

      const rps =
        totalDurationMs &&
          totalDurationMs > 0
          ? Number(
            (
              requests /
              (totalDurationMs / 1000)
            ).toFixed(3)
          )
          : null;

      apiPerformance.push({

        api_key:
          apiKey,

        page:
          api.page,

        api_name:
          api.api_name,

        method:
          api.method,

        endpoint:
          resolveEndpoint(api.endpoint),

        http_status:
          httpStatus,

        requests:
          requests,

        failed_requests:
          failedRequests,

        failure_rate_pct:
          failureRate,

        avg_ms:
          avg !== null
            ? Number(avg.toFixed(3))
            : null,

        min_ms:
          min !== null
            ? Number(min.toFixed(3))
            : null,

        med_ms:
          med !== null
            ? Number(med.toFixed(3))
            : null,

        max_ms:
          max !== null
            ? Number(max.toFixed(3))
            : null,

        p90_ms:
          p90 !== null
            ? Number(p90.toFixed(3))
            : null,

        p95_ms:
          p95 !== null
            ? Number(p95.toFixed(3))
            : null,

        p99_ms:
          p99 !== null
            ? Number(p99.toFixed(3))
            : null,

        rps:
          rps,

        status:
          status,
      });
    });

  // ---------------------------------------------------------------------------
  // Checks
  // ---------------------------------------------------------------------------

  const checksMetric =
    data.metrics['checks'];

  const checksPassed =
    checksMetric
      ? checksMetric.values.passes || 0
      : 0;

  const checksFailed =
    checksMetric
      ? checksMetric.values.fails || 0
      : 0;

  // ---------------------------------------------------------------------------
  // Thresholds
  // ---------------------------------------------------------------------------

  const thresholdResults = {

    http_req_failed:
      thresholdResult(
        'http_req_failed'
      ),

    page_success_rate:
      thresholdResult(
        'page_success_rate'
      ),

    http_req_duration:
      thresholdResult(
        'http_req_duration'
      ),
  };

  function thresholdPassed(results) {

    if (
      !results ||
      results.length === 0
    ) {
      return false;
    }

    return results.every(
      (result) => result.passed
    );
  }

  const functionalSuccess =
    thresholdPassed(
      thresholdResults.page_success_rate
    );

  const performanceSuccess =
    thresholdPassed(
      thresholdResults.http_req_duration
    );

  const httpFailureThresholdSuccess =
    thresholdPassed(
      thresholdResults.http_req_failed
    );

  const overallPass =
    functionalSuccess &&
    performanceSuccess &&
    httpFailureThresholdSuccess;

  const httpFailureRate =
    rateStat(
      'http_req_failed'
    );

  const pageSuccess =
    rateStat(
      'page_success_rate'
    );

  // ---------------------------------------------------------------------------
  // API summary counts
  // ---------------------------------------------------------------------------

  const totalApis =
    apiPerformance.length;

  const executedApis =
    apiPerformance.filter(
      api => api.requests > 0
    ).length;

  const failedApis =
    apiPerformance.filter(
      api => api.failed_requests > 0
    ).length;

  const slowApis =
    apiPerformance.filter(
      api =>
        api.failed_requests === 0 &&
        api.requests > 0 &&
        api.p95_ms !== null &&
        api.p95_ms >= TARGETS.api_p95_ms
    ).length;

  // ---------------------------------------------------------------------------
  // JSON report
  // ---------------------------------------------------------------------------

  const jsonReport = {

    meta: {

      test_type:
        'API_PERFORMANCE',

      test_timestamp:
        timestamp,

      target:
        BASE_URL,

      tenant_slug:
        TENANT_SLUG,

      workload: {

        vus:
          vus,

        iterations_per_vu:
          iterations,
      },

      total_apis:
        totalApis,

      executed_apis:
        executedApis,

      failed_apis:
        failedApis,

      slow_apis:
        slowApis,

      total_http_requests:
        counterStat('http_reqs'),

      flow: [

        'My Actions',
        'Projects',
        'Workforce',
        'Scheduling',
        'Reports',
        'Insights',
        'Admin Console',
      ],

      performance_targets: {

        api_http_failure_rate:
          '< 1%',

        api_page_success_rate:
          '>= 99%',

        api_p95:
          '< 2000 ms',
      },
    },

    overall: {

      pass:
        overallPass,

      functional_api_success:
        functionalSuccess,

      performance_threshold_success:
        performanceSuccess,

      http_failure_threshold_success:
        httpFailureThresholdSuccess,
    },

    http_req_duration:
      httpDuration,

    http_req_failed_rate_pct:
      httpFailureRate,

    page_success_rate_pct:
      pageSuccess,

    checks: {

      passed:
        checksPassed,

      failed:
        checksFailed,
    },

    page_durations:
      pageDurations,

    api_performance:
      apiPerformance,

    threshold_results:
      thresholdResults,
  };

  // ---------------------------------------------------------------------------
  // Output
  // ---------------------------------------------------------------------------

  const runTag =
    `${vus}vu_${iterations}iter`;

  const jsonFile =
   `results/navigation_${runTag}.json`;

  return {

    [jsonFile]:
      JSON.stringify(
        jsonReport,
        null,
        2
      ),

    stdout:
      JSON.stringify(
        jsonReport,
        null,
        2
      ),
  };
}