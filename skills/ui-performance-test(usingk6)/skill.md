/**
 * k6 Browser UI Performance Test
 *
 * Flow:
 * My Actions
 *   -> Projects
 *   -> Workforce
 *   -> Scheduling
 *   -> Reports
 *   -> Insights
 *   -> Admin Console
 *
 * Reuses:
 *   automation/ui/storage_state.json
 *   performance/har/navigation_pages.har
 *   performance/analysis/navigation_api_inventory.json
 *
 * This script does NOT recreate or replay the HAR.
 * The browser executes the real UI journey.
 *
 * Stage control is external:
 *   1 VU x 1 iteration
 *   1 VU x 5 iterations
 *   5 VU x 5 iterations
 *   25 VU x 5 iterations
 *
 * Required environment variables:
 *   VUS
 *   ITERATIONS
 *
 * Optional:
 *   BASE_URL
 *   RESULT_FILE
 *   SCREENSHOTS=true|false
 *   NAV_TIMEOUT_MS
 *   UI_PAGE_SUCCESS_RATE
 *   UI_NAV_P95_MS
 *   UI_NAV_P99_MS
 *   BROWSER_HTTP_FAILED_RATE
 *   LCP_P95_MS
 *   INP_P95_MS
 *   CLS_P95
 *   FCP_P95_MS
 *   TTFB_P95_MS
 *   MAX_DURATION
 */

import { browser } from 'k6/browser';
import { check, fail } from 'k6';
import { Rate, Trend } from 'k6/metrics';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

const BASE_URL =
  __ENV.BASE_URL || 'https://danis-cmma-dev.cosdevx.com/';

const STORAGE_STATE_PATH =
  '../../automation/ui/storage_state.json';

const VUS = Number(__ENV.VUS || 1);
const ITERATIONS = Number(__ENV.ITERATIONS || 1);

const NAV_TIMEOUT_MS =
  Number(__ENV.NAV_TIMEOUT_MS || 30000);

const MAX_DURATION =
  __ENV.MAX_DURATION || '30m';

const TAKE_SCREENSHOTS =
  String(__ENV.SCREENSHOTS || 'false').toLowerCase() === 'true';

const RESULT_FILE =
  __ENV.RESULT_FILE ||
  `performance/results/ui_${VUS}vu_${ITERATIONS}iter.json`;

// -----------------------------------------------------------------------------
// Threshold configuration
//
// These are configurable defaults.
// Align them with approved application SLOs before using the test as a
// release gate.
// -----------------------------------------------------------------------------

const UI_PAGE_SUCCESS_RATE =
  Number(__ENV.UI_PAGE_SUCCESS_RATE || 0.99);

const UI_NAV_P95_MS =
  Number(__ENV.UI_NAV_P95_MS || 2000);

const UI_NAV_P99_MS =
  Number(__ENV.UI_NAV_P99_MS || 3500);

const BROWSER_HTTP_FAILED_RATE =
  Number(__ENV.BROWSER_HTTP_FAILED_RATE || 0.01);

const LCP_P95_MS =
  Number(__ENV.LCP_P95_MS || 2500);

const INP_P95_MS =
  Number(__ENV.INP_P95_MS || 200);

const CLS_P95 =
  Number(__ENV.CLS_P95 || 0.10);

const FCP_P95_MS =
  Number(__ENV.FCP_P95_MS || 1000);

const TTFB_P95_MS =
  Number(__ENV.TTFB_P95_MS || 800);

// -----------------------------------------------------------------------------
// UI metrics
// -----------------------------------------------------------------------------

const uiNavigationDuration =
  new Trend('ui_navigation_duration', true);

const uiPageDuration =
  new Trend('ui_page_duration', true);

const uiPageSuccessRate =
  new Rate('ui_page_success_rate');

// -----------------------------------------------------------------------------
// Navigation definition
// -----------------------------------------------------------------------------

const PAGES = [
  {
    name: 'My Actions',
    type: 'landing',
  },
  {
    name: 'Projects',
    type: 'navigation',
  },
  {
    name: 'Workforce',
    type: 'navigation',
  },
  {
    name: 'Scheduling',
    type: 'navigation',
  },
  {
    name: 'Reports',
    type: 'navigation',
  },
  {
    name: 'Insights',
    type: 'navigation',
  },
  {
    name: 'Admin Console',
    type: 'navigation',
  },
];

// -----------------------------------------------------------------------------
// Load authenticated Playwright storage state
//
// k6 open() runs in init context and reads the project file before execution.
// -----------------------------------------------------------------------------

let storageState;

try {
  storageState = JSON.parse(open(STORAGE_STATE_PATH));
} catch (error) {
  throw new Error(
    `Unable to read ${STORAGE_STATE_PATH}: ${error.message}`
  );
}

// -----------------------------------------------------------------------------
// Validate cmma_session before starting browser test
// -----------------------------------------------------------------------------

function getSessionCookie() {
  const cookies = storageState?.cookies || [];

  return cookies.find(
    (cookie) =>
      cookie.name === 'cmma_session' &&
      typeof cookie.value === 'string' &&
      cookie.value.trim() !== ''
  );
}

const sessionCookie = getSessionCookie();

if (!sessionCookie) {
  throw new Error(
    'AUTH_REQUIRED: cmma_session is missing or empty in storage_state.json. ' +
    'Run check_auth_state.py before starting the UI performance test.'
  );
}

// -----------------------------------------------------------------------------
// Local storage support
//
// If Playwright storage_state.json contains localStorage for the application
// origin, restore it before application scripts run.
// -----------------------------------------------------------------------------

const BASE_ORIGIN = BASE_URL.replace(/\/$/, '');

const originState =
  (storageState?.origins || []).find(
    (originEntry) =>
      String(originEntry.origin || '').replace(/\/$/, '') === BASE_ORIGIN
  );

const localStorageEntries =
  originState?.localStorage || [];

// -----------------------------------------------------------------------------
// k6 options
// -----------------------------------------------------------------------------

export const options = {
  scenarios: {
    ui_navigation: {
      executor: 'per-vu-iterations',
      vus: VUS,
      iterations: ITERATIONS,
      maxDuration: MAX_DURATION,

      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },

  summaryTrendStats: [
    'avg',
    'min',
    'med',
    'max',
    'p(90)',
    'p(95)',
    'p(99)',
    'count',
  ],

  thresholds: {
    // Functional success.
    checks: [
      `rate>${UI_PAGE_SUCCESS_RATE}`,
    ],

    // Page success.
    ui_page_success_rate: [
      `rate>${UI_PAGE_SUCCESS_RATE}`,
    ],

    // Browser navigation performance.
    ui_navigation_duration: [
      `p(95)<${UI_NAV_P95_MS}`,
      `p(99)<${UI_NAV_P99_MS}`,
    ],

    // Browser network reliability.
    browser_http_req_failed: [
      `rate<${BROWSER_HTTP_FAILED_RATE}`,
    ],

    // Web Vitals.
    browser_web_vital_lcp: [
      `p(95)<${LCP_P95_MS}`,
    ],

    browser_web_vital_inp: [
      `p(95)<${INP_P95_MS}`,
    ],

    browser_web_vital_cls: [
      `p(95)<${CLS_P95}`,
    ],

    browser_web_vital_fcp: [
      `p(95)<${FCP_P95_MS}`,
    ],

    browser_web_vital_ttfb: [
      `p(95)<${TTFB_P95_MS}`,
    ],
  },
};

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function sanitizeFileName(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function isAuthenticationUrl(url) {
  return /\/(login|mfa|mfa\/verify)(?:[/?#]|$)/i.test(url);
}

function screenshotPath(pageName, kind) {
  const safePage = sanitizeFileName(pageName);

  return (
    `performance/results/screenshots/${kind}/` +
    `${kind}_` +
    `${VUS}vu_${ITERATIONS}iter_` +
    `vu${__VU}_iter${Number(__ITER) + 1}_` +
    `${safePage}.png`
  );
}

async function captureScreenshot(page, pageName, kind) {
  try {
    if (!TAKE_SCREENSHOTS && kind !== 'failure') {
      return;
    }

    await page.screenshot({
      path: screenshotPath(pageName, kind),
    });

    console.log(
      `[SCREENSHOT] ${kind} | ${pageName}`
    );
  } catch (error) {
    console.error(
      `[SCREENSHOT ERROR] ${pageName} | ${error.message}`
    );
  }
}

/**
 * Find the left-navigation item.
 *
 * Preference:
 *   1. accessible link
 *   2. accessible button
 *   3. exact visible text
 */
async function findNavigationItem(page, pageName) {
  const link = page.getByRole('link', {
    name: pageName,
    exact: true,
  });

  if (await link.count() > 0) {
    return link.first();
  }

  const button = page.getByRole('button', {
    name: pageName,
    exact: true,
  });

  if (await button.count() > 0) {
    return button.first();
  }

  const text = page.getByText(pageName, {
    exact: true,
  });

  if (await text.count() > 0) {
    return text.first();
  }

  throw new Error(
    `Navigation item not found: "${pageName}"`
  );
}

/**
 * Wait until the page is usable.
 *
 * We deliberately do not use networkidle because k6/browser documentation
 * discourages networkidle for test readiness on chatty applications.
 */
async function waitForPageReady(page, pageName) {
  await page.waitForLoadState('domcontentloaded', {
    timeout: NAV_TIMEOUT_MS,
  });

  if (isAuthenticationUrl(page.url())) {
    throw new Error(
      `Authentication redirect detected after navigating to "${pageName}": ${page.url()}`
    );
  }

  const body = page.locator('body').first();

  await body.waitFor({
    state: 'visible',
    timeout: NAV_TIMEOUT_MS,
  });

  const main = page.locator(
    'main, [role="main"]'
  ).first();

  if (await main.count() > 0) {
    await main.waitFor({
      state: 'visible',
      timeout: NAV_TIMEOUT_MS,
    });
  }

  /*
   * Confirm the expected navigation item exists and is visible.
   * This verifies that the authenticated application shell is present.
   */
  const navItem = await findNavigationItem(page, pageName);

  await navItem.waitFor({
    state: 'visible',
    timeout: NAV_TIMEOUT_MS,
  });

  const bodyText = await body.textContent();

  if (!bodyText || bodyText.trim().length === 0) {
    throw new Error(
      `Page body is empty after navigating to "${pageName}".`
    );
  }

  return true;
}

function recordPageResult(
  pageName,
  durationMs,
  success
) {
  uiPageDuration.add(
    durationMs,
    { page: pageName }
  );

  uiPageSuccessRate.add(
    success,
    { page: pageName }
  );

  check(
    success,
    {
      [`${pageName} page loaded successfully`]:
        (value) => value === true,
    }
  );
}

// -----------------------------------------------------------------------------
// Browser test
// -----------------------------------------------------------------------------

export default async function () {
  const context =
    await browser.newContext({
      ignoreHTTPSErrors: true,
    });

  context.setDefaultTimeout(NAV_TIMEOUT_MS);
  context.setDefaultNavigationTimeout(NAV_TIMEOUT_MS);

  // Restore cookies from Playwright storage state.
  const browserCookies =
    (storageState?.cookies || []).map((cookie) => ({
      name: cookie.name,
      value: cookie.value,
      domain: cookie.domain,
      path: cookie.path || '/',
      expires:
        typeof cookie.expires === 'number'
          ? cookie.expires
          : -1,
      httpOnly: Boolean(cookie.httpOnly),
      secure: Boolean(cookie.secure),
      sameSite:
        cookie.sameSite || 'Lax',
    }));

  await context.addCookies(browserCookies);

  // Restore application localStorage when present.
  if (localStorageEntries.length > 0) {
    const localStoragePayload =
      JSON.stringify(localStorageEntries);

    const initScript = `
      (() => {
        const targetOrigin = ${JSON.stringify(BASE_ORIGIN)};
        const entries = ${localStoragePayload};

        if (window.location.origin === targetOrigin) {
          for (const entry of entries) {
            if (
              entry &&
              typeof entry.name === 'string'
            ) {
              window.localStorage.setItem(
                entry.name,
                String(entry.value ?? '')
              );
            }
          }
        }
      })();
    `;

    await context.addInitScript(initScript);
  }

  const page = await context.newPage();

  try {
    // -------------------------------------------------------------------------
    // 1. My Actions
    // -------------------------------------------------------------------------

    const myActionsStart = Date.now();

    await page.goto(BASE_URL, {
      waitUntil: 'domcontentloaded',
      timeout: NAV_TIMEOUT_MS,
    });

    let myActionsSuccess = false;

    try {
      await waitForPageReady(
        page,
        'My Actions'
      );

      myActionsSuccess = true;
    } catch (error) {
      await captureScreenshot(
        page,
        'My Actions',
        'failure'
      );

      throw error;
    }

    const myActionsDuration =
      Date.now() - myActionsStart;

    recordPageResult(
      'My Actions',
      myActionsDuration,
      myActionsSuccess
    );

    console.log(
      `[UI PASS] My Actions | ${myActionsDuration} ms | ${page.url()}`
    );

    await captureScreenshot(
      page,
      'My Actions',
      'baseline'
    );

    // -------------------------------------------------------------------------
    // 2-7. Remaining navigation pages
    // -------------------------------------------------------------------------

    for (const pageDefinition of PAGES.slice(1)) {
      const pageName =
        pageDefinition.name;

      const navigationStart =
        Date.now();

      try {
        const navItem =
          await findNavigationItem(
            page,
            pageName
          );

        await navItem.waitFor({
          state: 'visible',
          timeout: NAV_TIMEOUT_MS,
        });

        await navItem.click({
          timeout: NAV_TIMEOUT_MS,
        });

        await waitForPageReady(
          page,
          pageName
        );

        const durationMs =
          Date.now() - navigationStart;

        uiNavigationDuration.add(
          durationMs,
          { page: pageName }
        );

        recordPageResult(
          pageName,
          durationMs,
          true
        );

        console.log(
          `[UI PASS] ${pageName} | ` +
          `${durationMs} ms | ${page.url()}`
        );

        await captureScreenshot(
          page,
          pageName,
          'baseline'
        );
      } catch (error) {
        const durationMs =
          Date.now() - navigationStart;

        uiNavigationDuration.add(
          durationMs,
          { page: pageName }
        );

        recordPageResult(
          pageName,
          durationMs,
          false
        );

        console.error(
          `[UI FAIL] ${pageName} | ` +
          `${durationMs} ms | ` +
          `${error.message}`
        );

        await captureScreenshot(
          page,
          pageName,
          'failure'
        );

        // Fail the current iteration immediately.
        fail(
          `UI navigation failed for "${pageName}": ${error.message}`
        );

        return;
      }
    }
  } finally {
    // Closing the page is important for correct browser metric collection.
    await page.close();
    await context.close();
  }
}

// -----------------------------------------------------------------------------
// Custom result file
// -----------------------------------------------------------------------------

export function handleSummary(data) {
  const result = Object.assign({}, data, {
    test_type: 'UI_BROWSER_PERFORMANCE',
    base_url: BASE_URL,

    stage: {
      vus: VUS,
      iterations_per_vu: ITERATIONS,
    },

    authentication: {
      session_cookie: 'cmma_session',
      session_present: true,
    },

    screenshots_enabled: TAKE_SCREENSHOTS,

    navigation_flow: PAGES.map(
      (page) => page.name
    ),

    threshold_configuration: {
      ui_page_success_rate: UI_PAGE_SUCCESS_RATE,
      ui_navigation_p95_ms: UI_NAV_P95_MS,
      ui_navigation_p99_ms: UI_NAV_P99_MS,
      browser_http_failed_rate:
        BROWSER_HTTP_FAILED_RATE,
      lcp_p95_ms: LCP_P95_MS,
      inp_p95_ms: INP_P95_MS,
      cls_p95: CLS_P95,
      fcp_p95_ms: FCP_P95_MS,
      ttfb_p95_ms: TTFB_P95_MS,
    },

    artifact_source: {
      storage_state:
        'automation/ui/storage_state.json',

      har:
        'performance/har/navigation_pages.har',

      api_inventory:
        'performance/analysis/navigation_api_inventory.json',

      api_k6:
        'performance/k6/navigation_pages.js',
    },
  });

  return {
    [RESULT_FILE]:
      JSON.stringify(result, null, 2),

    stdout:
      textSummary(
        data,
        {
          indent: '  ',
          enableColors: true,
        }
      ),
  };
}