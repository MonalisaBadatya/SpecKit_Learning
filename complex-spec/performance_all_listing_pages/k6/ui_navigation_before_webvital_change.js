/**
 * k6 Browser UI Performance Test
 *
 * Flow:
 * My Actions (landing)
 * -> Projects
 * -> Workforce       (URL: /resources)
 * -> Scheduling
 * -> Reports
 * -> Insights
 * -> Admin Console   (URL: /admin)
 *
 * Navigation strategy:
 *   Primary:  nav a[href="/..."]
 *   Fallback: nav a[aria-label="..."]
 *
 * Hydration guard:
 *   waitForPageReady waits for nav[aria-label="Primary"] to be visible.
 *
 * Stage control is external:
 *   1 VU x 1 iteration
 *   1 VU x 5 iterations
 *   5 VU x 5 iterations
 *   25 VU x 5 iterations
 *
 * Output:
 *   JSON result containing:
 *   - workload metadata
 *   - performance targets
 *   - infrastructure metadata
 *   - test-machine metadata
 *   - page-level UI navigation metrics
 *   - page-level UI duration metrics
 *   - page-level Web Vitals
 *   - k6 native browser metrics
 */

// ============================================================================
// Imports
// ============================================================================

import { browser } from 'k6/browser';
import { check } from 'k6';
import { Rate, Trend } from 'k6/metrics';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';


// ============================================================================
// Configuration
// ============================================================================

const BASE_URL =
  __ENV.BASE_URL ||
  'https://danis-cmma-dev.cosdevx.com/';

function resolveStorageStatePath() {

  if (__ENV.STORAGE_STATE_PATH) {
    try {
      open(__ENV.STORAGE_STATE_PATH);
      return __ENV.STORAGE_STATE_PATH;
    } catch (_) {
      // Continue with fallback candidates.
    }
  }

  const candidates = [
    '../../automation/ui/storage_state.json',
    'automation/ui/storage_state.json',
    '../automation/ui/storage_state.json',
  ];

  for (const candidate of candidates) {
    try {
      open(candidate);
      return candidate;
    } catch (_) {
      // Continue searching.
    }
  }

  return '../../automation/ui/storage_state.json';
}

const STORAGE_STATE_PATH = resolveStorageStatePath();

const VUS =
  Number(__ENV.VUS || 1);

const ITERATIONS =
  Number(__ENV.ITERATIONS || 1);

const NAV_TIMEOUT_MS =
  Number(__ENV.NAV_TIMEOUT_MS || 30000);

const MAX_DURATION =
  __ENV.MAX_DURATION || '30m';

const TAKE_SCREENSHOTS =
  String(__ENV.SCREENSHOTS || 'false').toLowerCase() === 'true';

const RESULT_FILE =
  __ENV.RESULT_FILE ||
  `results/ui_${VUS}vu_${ITERATIONS}iter.json`;


// ============================================================================
// Workload metadata
// ============================================================================

const WORKLOAD_LABEL =
  `${VUS} VU / ${ITERATIONS} iteration${ITERATIONS === 1 ? '' : 's'}`;


// ============================================================================
// Performance Targets
// ============================================================================

const UI_CHECKS_PASS_RATE =
  Number(__ENV.UI_CHECKS_PASS_RATE || 1.00);

const UI_PAGE_SUCCESS_RATE =
  Number(__ENV.UI_PAGE_SUCCESS_RATE || 0.99);

const UI_NAV_P95_MS =
  Number(__ENV.UI_NAV_P95_MS || 2000);

const UI_NAV_P99_MS =
  Number(__ENV.UI_NAV_P99_MS || 3500);

const UI_PAGE_P95_MS =
  Number(__ENV.UI_PAGE_P95_MS || 2000);

const UI_PAGE_P99_MS =
  Number(__ENV.UI_PAGE_P99_MS || 3500);

const BROWSER_HTTP_FAILED_RATE =
  Number(__ENV.BROWSER_HTTP_FAILED_RATE || 0.01);

const LCP_P95_MS =
  Number(__ENV.LCP_P95_MS || 2500);

const INP_P95_MS =
  Number(__ENV.INP_P95_MS || 200);

const CLS_P95 =
  Number(__ENV.CLS_P95 || 0.10);

const FCP_P95_MS =
  Number(__ENV.FCP_P95_MS || 1800);

const TTFB_P95_MS =
  Number(__ENV.TTFB_P95_MS || 800);


// ============================================================================
// API / UI functional targets
// ============================================================================

const API_P95_MS =
  Number(__ENV.API_P95_MS || 2000);

const API_HTTP_FAILED_RATE =
  Number(__ENV.API_HTTP_FAILED_RATE || 0.01);

const API_PAGE_SUCCESS_RATE =
  Number(__ENV.API_PAGE_SUCCESS_RATE || 0.99);


// ============================================================================
// Infrastructure metadata
//
// Application/server/database information cannot be reliably discovered
// from a browser test. Supply these through environment variables.
//
// Example:
//
// $env.APPLICATION_SERVER="CMMA QA App Server"
// $env.SERVER_CPU="8 vCPU"
// $env.SERVER_MEMORY="16 GB"
// $env.DATABASE="PostgreSQL"
// $env.DB_VERSION="16"
// $env.NETWORK="QA Network"
// $env.REGION="Azure East US"
// ============================================================================

const INFRASTRUCTURE = {

  application_server:
    __ENV.APPLICATION_SERVER ||
    'Not provided',

  server_cpu:
    __ENV.SERVER_CPU ||
    'Not provided',

  server_memory:
    __ENV.SERVER_MEMORY ||
    'Not provided',

  database:
    __ENV.DATABASE ||
    'Not provided',

  db_version:
    __ENV.DB_VERSION ||
    'Not provided',

  network:
    __ENV.NETWORK ||
    'Not provided',

  region:
    __ENV.REGION ||
    'Not provided',
};


// ============================================================================
// Test-machine metadata
//
// Some browser-side values are detected automatically.
// More precise machine values can be supplied through environment variables.
// ============================================================================

const TEST_MACHINE_CONFIG = {

  os:
    __ENV.TEST_OS ||
    'Detected from browser',

  cpu:
    __ENV.TEST_CPU ||
    'Not provided',

  memory:
    __ENV.TEST_MEMORY ||
    'Not provided',

  browser:
    'Chromium',

  browser_version:
    __ENV.BROWSER_VERSION ||
    'k6 Chromium',

  network:
    __ENV.TEST_NETWORK ||
    'Not provided',
};


// ============================================================================
// UI metrics
// ============================================================================

const uiNavigationDuration =
  new Trend('ui_navigation_duration', true);

const uiPageDuration =
  new Trend('ui_page_duration', true);

const uiPageSuccessRate =
  new Rate('ui_page_success_rate');


// ============================================================================
// Page-level Web Vital metrics
//
// IMPORTANT:
// These are deliberately created as separate metric names per page.
//
// This allows navigation_summary.html to identify:
//   Page -> Vital -> Workload -> p95
//
// Example:
//   web_vital_lcp_my_actions
//   web_vital_lcp_projects
//   web_vital_lcp_workforce
// ============================================================================

const WEB_VITAL_METRICS = {};

function createPageWebVitalMetrics(pageName) {

  const safeName =
    sanitizeMetricName(pageName);

  WEB_VITAL_METRICS[pageName] = {

    lcp:
      new Trend(`web_vital_lcp_${safeName}`, true),

    fcp:
      new Trend(`web_vital_fcp_${safeName}`, true),

    ttfb:
      new Trend(`web_vital_ttfb_${safeName}`, true),

    inp:
      new Trend(`web_vital_inp_${safeName}`, true),

    cls:
      new Trend(`web_vital_cls_${safeName}`, false),
  };
}


// ============================================================================
// Navigation definition
// ============================================================================

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


// Create page-level Web Vital metrics.

for (const pageDefinition of PAGES) {
  createPageWebVitalMetrics(pageDefinition.name);
}


// ============================================================================
// Load authenticated Playwright storage state
// ============================================================================

let storageState;

try {

  storageState =
    JSON.parse(
      open(STORAGE_STATE_PATH)
    );

} catch (error) {

  throw new Error(
    `Unable to read ${STORAGE_STATE_PATH}: ${error.message}`
  );

}


// ============================================================================
// Validate cmma_session before starting browser test
// ============================================================================

function getSessionCookie() {

  const cookies =
    storageState?.cookies || [];

  return cookies.find(
    (cookie) =>
      cookie.name === 'cmma_session' &&
      typeof cookie.value === 'string' &&
      cookie.value.trim() !== ''
  );
}

const sessionCookie =
  getSessionCookie();

if (!sessionCookie) {

  throw new Error(
    'AUTH_REQUIRED: cmma_session is missing or empty in storage_state.json. ' +
    'Run check_auth_state.py before starting the UI performance test.'
  );

}


// ============================================================================
// Local storage support
// ============================================================================

const BASE_ORIGIN =
  BASE_URL.replace(/\/$/, '');

const originState =
  (storageState?.origins || []).find(
    (originEntry) =>
      String(originEntry.origin || '').replace(/\/$/, '') ===
      BASE_ORIGIN
  );

const localStorageEntries =
  originState?.localStorage || [];


// ============================================================================
// k6 options
// ============================================================================

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

    // ------------------------------------------------------------
    // Functional
    // ------------------------------------------------------------

    checks: [
      `rate >= ${UI_CHECKS_PASS_RATE}`,
    ],

    ui_page_success_rate: [
      `rate >= ${UI_PAGE_SUCCESS_RATE}`,
    ],


    // ------------------------------------------------------------
    // UI navigation
    // ------------------------------------------------------------

    ui_navigation_duration: [

      `p(95) < ${UI_NAV_P95_MS}`,

      `p(99) < ${UI_NAV_P99_MS}`,

    ],


    // ------------------------------------------------------------
    // Browser HTTP
    // ------------------------------------------------------------

    browser_http_req_failed: [
      `rate < ${BROWSER_HTTP_FAILED_RATE}`,
    ],


    // ------------------------------------------------------------
    // Native k6 browser Web Vitals
    //
    // These remain as aggregate guardrails.
    // Page-level metrics are additionally generated below.
    // ------------------------------------------------------------

    browser_web_vital_lcp: [
      `p(95) < ${LCP_P95_MS}`,
    ],

    browser_web_vital_inp: [
      `p(95) < ${INP_P95_MS}`,
    ],

    browser_web_vital_cls: [
      `p(95) < ${CLS_P95}`,
    ],

    browser_web_vital_fcp: [
      `p(95) < ${FCP_P95_MS}`,
    ],

    browser_web_vital_ttfb: [
      `p(95) < ${TTFB_P95_MS}`,
    ],

  },

};


// ============================================================================
// Helpers
// ============================================================================

function sanitizeFileName(value) {

  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

}


function sanitizeMetricName(value) {

  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

}


function isAuthenticationUrl(url) {

  return /(login|mfa|mfa\/verify)(?:[/?#]|$)/i.test(url);

}


function screenshotPath(pageName, kind) {

  const safePage =
    sanitizeFileName(pageName);

  const folder =
    kind === 'failure'
      ? 'failures'
      : kind;

  return (
    `results/screenshots/${folder}/` +
    `${kind}_${VUS}vu_${ITERATIONS}iter_` +
    `vu${__VU}_iter${Number(__ITER) + 1}_` +
    `${safePage}.png`
  );

}


async function captureScreenshot(
  page,
  pageName,
  kind
) {

  try {

    if (!TAKE_SCREENSHOTS && kind !== 'failure') {
      return;
    }

    const path =
      screenshotPath(
        pageName,
        kind
      );

    await page.screenshot({
      path: path,
    });

    console.log(
      `[SCREENSHOT] ${kind} | ${pageName} -> ${path}`
    );

  } catch (error) {

    console.error(
      `[SCREENSHOT ERROR] ${pageName} | ${error.message}`
    );

  }

}


// ============================================================================
// Browser-side Web Vital collection
// ============================================================================
//
// The function runs inside the actual browser page.
//
// It collects:
//   - LCP
//   - FCP
//   - TTFB
//   - CLS
//   - INP
//
// The result is returned to k6 and recorded against the specific page.
// ============================================================================

async function collectWebVitals(
  page,
  pageName
) {

  try {

    const vitals =
      await page.evaluate(() => {

        const result = {

          lcp: null,

          fcp: null,

          ttfb: null,

          inp: null,

          cls: null,

        };


        // --------------------------------------------------------
        // Navigation Timing
        // --------------------------------------------------------

        try {

          const navigation =
            performance.getEntriesByType('navigation')[0];

          if (navigation) {

            result.ttfb =
              navigation.responseStart;

          }

        } catch (_) {
          // Leave unavailable.
        }


        // --------------------------------------------------------
        // Paint Timing
        // --------------------------------------------------------

        try {

          const paints =
            performance.getEntriesByType('paint');

          const fcpEntry =
            paints.find(
              (entry) =>
                entry.name === 'first-contentful-paint'
            );

          if (fcpEntry) {

            result.fcp =
              fcpEntry.startTime;

          }

        } catch (_) {
          // Leave unavailable.
        }


        // --------------------------------------------------------
        // LCP
        // --------------------------------------------------------

        try {

          const lcpEntries =
            performance.getEntriesByType(
              'largest-contentful-paint'
            );

          if (lcpEntries.length > 0) {

            result.lcp =
              lcpEntries[
                lcpEntries.length - 1
              ].startTime;

          }

        } catch (_) {
          // Leave unavailable.
        }


        // --------------------------------------------------------
        // CLS
        // --------------------------------------------------------

        try {

          const layoutShiftEntries =
            performance.getEntriesByType(
              'layout-shift'
            );

          let clsValue = 0;

          for (
            const entry
            of layoutShiftEntries
          ) {

            if (!entry.hadRecentInput) {

              clsValue +=
                entry.value;

            }

          }

          result.cls =
            clsValue;

        } catch (_) {
          // Leave unavailable.
        }


        // --------------------------------------------------------
        // INP
        //
        // Uses PerformanceEventTiming when available.
        // The maximum interaction duration observed on the page
        // is used as the conservative page-level value.
        // --------------------------------------------------------

        try {

          const eventEntries =
            performance.getEntriesByType(
              'event'
            );

          if (eventEntries.length > 0) {

            let maxDuration = 0;

            for (
              const entry
              of eventEntries
            ) {

              if (
                typeof entry.duration === 'number' &&
                entry.duration > maxDuration
              ) {

                maxDuration =
                  entry.duration;

              }

            }

            if (maxDuration > 0) {

              result.inp =
                maxDuration;

            }

          }

        } catch (_) {
          // Event Timing may not be available.
        }


        return result;

      });


    const metrics =
      WEB_VITAL_METRICS[pageName];

    if (!metrics) {
      return;
    }


    if (
      typeof vitals.lcp === 'number' &&
      Number.isFinite(vitals.lcp)
    ) {

      metrics.lcp.add(
        vitals.lcp,
        {
          page: pageName,
          workload: WORKLOAD_LABEL,
          vu: String(VUS),
          iterations: String(ITERATIONS),
        }
      );

    }


    if (
      typeof vitals.fcp === 'number' &&
      Number.isFinite(vitals.fcp)
    ) {

      metrics.fcp.add(
        vitals.fcp,
        {
          page: pageName,
          workload: WORKLOAD_LABEL,
          vu: String(VUS),
          iterations: String(ITERATIONS),
        }
      );

    }


    if (
      typeof vitals.ttfb === 'number' &&
      Number.isFinite(vitals.ttfb)
    ) {

      metrics.ttfb.add(
        vitals.ttfb,
        {
          page: pageName,
          workload: WORKLOAD_LABEL,
          vu: String(VUS),
          iterations: String(ITERATIONS),
        }
      );

    }


    if (
      typeof vitals.inp === 'number' &&
      Number.isFinite(vitals.inp)
    ) {

      metrics.inp.add(
        vitals.inp,
        {
          page: pageName,
          workload: WORKLOAD_LABEL,
          vu: String(VUS),
          iterations: String(ITERATIONS),
        }
      );

    }


    if (
      typeof vitals.cls === 'number' &&
      Number.isFinite(vitals.cls)
    ) {

      metrics.cls.add(
        vitals.cls,
        {
          page: pageName,
          workload: WORKLOAD_LABEL,
          vu: String(VUS),
          iterations: String(ITERATIONS),
        }
      );

    }


    console.log(
      `[WEB VITALS] ${pageName} | ${WORKLOAD_LABEL} | ` +
      `LCP=${vitals.lcp ?? 'N/A'} ms | ` +
      `FCP=${vitals.fcp ?? 'N/A'} ms | ` +
      `TTFB=${vitals.ttfb ?? 'N/A'} ms | ` +
      `INP=${vitals.inp ?? 'N/A'} ms | ` +
      `CLS=${vitals.cls ?? 'N/A'}`
    );


  } catch (error) {

    console.error(
      `[WEB VITAL ERROR] ${pageName} | ${error.message}`
    );

  }

}


// ============================================================================
// Navigation DOM diagnostic
// ============================================================================

async function diagnoseNavigation(
  page,
  pageName
) {

  console.log('');

  console.log(
    `================ NAVIGATION DIAGNOSTIC: ${pageName} ================`
  );


  const body =
    page.locator('body').first();

  console.log(
    `[NAV DEBUG] body exists: ${await body.count()}`
  );


  const containers =
    page.locator(
      [
        'nav',
        '[role="navigation"]',
        'aside',
        '[class*="sidebar"]',
        '[class*="side-nav"]',
        '[class*="sidenav"]',
        '[class*="navigation"]',
        '[class*="menu"]',
      ].join(', ')
    );


  const containerCount =
    await containers.count();

  console.log(
    `[NAV DEBUG] navigation-like containers: ${containerCount}`
  );


  for (
    let i = 0;
    i < Math.min(containerCount, 20);
    i++
  ) {

    const container =
      containers.nth(i);

    let outerHTML = '';

    try {

      outerHTML =
        await container.evaluate(
          (el) =>
            el.outerHTML.substring(0, 5000)
        );

    } catch (_) {

      outerHTML =
        '[unable to read outerHTML]';

    }


    console.log(
      `[NAV DEBUG] container ${i} | ` +
      `tag=${await container.evaluate(el => el.tagName)} | ` +
      `role="${await container.getAttribute('role')}" | ` +
      `aria-label="${await container.getAttribute('aria-label')}" | ` +
      `class="${await container.getAttribute('class')}" | ` +
      `id="${await container.getAttribute('id')}"`
    );


    console.log(
      `[NAV DEBUG] container ${i} HTML:\n${outerHTML}`
    );

  }


  const clickable =
    page.locator(
      'a, button, [role="link"], [role="button"], [tabindex="0"]'
    );


  const clickableCount =
    await clickable.count();

  console.log(
    `[NAV DEBUG] clickable elements found: ${clickableCount}`
  );


  for (
    let i = 0;
    i < Math.min(clickableCount, 100);
    i++
  ) {

    const item =
      clickable.nth(i);

    let tag = '';
    let text = '';
    let ariaLabel = '';
    let title = '';
    let href = '';
    let dataTestId = '';
    let className = '';
    let id = '';

    try {

      tag =
        await item.evaluate(
          el => el.tagName
        );

      text =
        (
          await item.textContent() || ''
        )
          .trim()
          .replace(/\s+/g, ' ')
          .substring(0, 120);

      ariaLabel =
        await item.getAttribute('aria-label');

      title =
        await item.getAttribute('title');

      href =
        await item.getAttribute('href');

      dataTestId =
        await item.getAttribute('data-testid');

      className =
        await item.getAttribute('class');

      id =
        await item.getAttribute('id');

    } catch (_) {
      // Continue with collected information.
    }


    console.log(
      `[NAV DEBUG] clickable ${i} | ` +
      `tag=${tag} | ` +
      `text="${text}" | ` +
      `aria-label="${ariaLabel}" | ` +
      `title="${title}" | ` +
      `href="${href}" | ` +
      `data-testid="${dataTestId}" | ` +
      `id="${id}" | ` +
      `class="${className}"`
    );

  }


  console.log(
    `================ END NAVIGATION DIAGNOSTIC: ${pageName} ================`
  );

  console.log('');

}


// ============================================================================
// Wait until page is usable
// ============================================================================

async function waitForPageReady(
  page,
  pageName
) {

  await page.waitForLoadState(
    'domcontentloaded',
    {
      timeout: NAV_TIMEOUT_MS,
    }
  );


  if (isAuthenticationUrl(page.url())) {

    throw new Error(
      `Authentication redirect detected after navigating to ` +
      `"${pageName}": ${page.url()}`
    );

  }


  // ------------------------------------------------------------------------
  // React hydration guard
  // ------------------------------------------------------------------------

  const primaryNav =
    page.locator(
      'nav[aria-label="Primary"]'
    );


  await primaryNav.waitFor({

    state: 'visible',

    timeout: NAV_TIMEOUT_MS,

  });


  // ------------------------------------------------------------------------
  // Main content guard
  // ------------------------------------------------------------------------

  const main =
    page.locator('main').first();


  await main.waitFor({

    state: 'visible',

    timeout: NAV_TIMEOUT_MS,

  });


  return true;

}


// ============================================================================
// Record page result
// ============================================================================

function recordPageResult(
  pageName,
  durationMs,
  success
) {

  uiPageDuration.add(

    durationMs,

    {
      page: pageName,
      workload: WORKLOAD_LABEL,
      vu: String(VUS),
      iterations: String(ITERATIONS),
    }

  );


  uiPageSuccessRate.add(

    success,

    {
      page: pageName,
      workload: WORKLOAD_LABEL,
      vu: String(VUS),
      iterations: String(ITERATIONS),
    }

  );


  check(

    success,

    {

      [`${pageName} page loaded successfully`]:
        (value) =>
          value === true,

    }

  );

}


// ============================================================================
// Navigate to a page via sidebar click
// ============================================================================

async function navigateToPage(
  page,
  pageName,
  navLocator,
  h1Locator
) {

  const start =
    Date.now();


  try {

    const navLink =
      page.locator(navLocator);


    await navLink.waitFor({

      state: 'visible',

      timeout: NAV_TIMEOUT_MS,

    });


    await navLink.click();


    // Destination h1 is the SPA synchronization point.

    await page
      .locator(h1Locator)
      .waitFor({

        state: 'visible',

        timeout: NAV_TIMEOUT_MS,

      });


    const durationMs =
      Date.now() - start;


    recordPageResult(
      pageName,
      durationMs,
      true
    );


    uiNavigationDuration.add(

      durationMs,

      {
        page: pageName,
        workload: WORKLOAD_LABEL,
        vu: String(VUS),
        iterations: String(ITERATIONS),
      }

    );


    // Collect page-level Web Vitals after page readiness.

    await collectWebVitals(
      page,
      pageName
    );


    console.log(

      `[UI PASS] ${pageName} | ` +
      `${durationMs} ms | ` +
      `${page.url()}`

    );


    // Admin Console may show its H1 before the SPA finishes rendering.
    // Stabilize only the evidence screenshot; do not add this wait to the
    // measured navigation duration.
    if (pageName === 'Admin Console') {
      try {
        await page.waitForLoadState('networkidle', {
          timeout: Math.min(NAV_TIMEOUT_MS, 5000),
        });
      } catch (_) {
        // CMMA may keep background requests open; continue after timeout.
      }

      await page.waitForTimeout(1000);
    }

    // Admin Console may show its H1 before the SPA finishes rendering.
    // Stabilize only the evidence screenshot; do not add this wait to the
    // measured navigation duration.
    if (pageName === 'Admin Console') {
      try {
        await page.waitForLoadState('networkidle', {
          timeout: Math.min(NAV_TIMEOUT_MS, 5000),
        });
      } catch (_) {
        // CMMA may keep background requests open; continue after timeout.
      }

      await page.waitForTimeout(1000);
    }

    await captureScreenshot(
      page,
      pageName,
      'baseline'
    );


  } catch (error) {

    const durationMs =
      Date.now() - start;


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


    throw error;

  }

}


// ============================================================================
// Browser test
// ============================================================================

export default async function () {

  const context =
    await browser.newContext({

      ignoreHTTPSErrors: true,

    });


  context.setDefaultTimeout(
    NAV_TIMEOUT_MS
  );


  context.setDefaultNavigationTimeout(
    NAV_TIMEOUT_MS
  );


  // ------------------------------------------------------------------------
  // Restore cookies
  // ------------------------------------------------------------------------

  const browserCookies =
    (storageState?.cookies || []).map(

      (cookie) => ({

        name: cookie.name,

        value: cookie.value,

        domain: cookie.domain,

        path: cookie.path || '/',

        expires:
          typeof cookie.expires === 'number'
            ? Math.floor(cookie.expires)
            : -1,

        httpOnly:
          Boolean(cookie.httpOnly),

        secure:
          Boolean(cookie.secure),

        sameSite:
          cookie.sameSite || 'Lax',

      })

    );


  await context.addCookies(
    browserCookies
  );


  // ------------------------------------------------------------------------
  // Restore localStorage
  // ------------------------------------------------------------------------

  if (localStorageEntries.length > 0) {

    const localStoragePayload =
      JSON.stringify(
        localStorageEntries
      );


    const initScript = `

            (() => {

                const targetOrigin =
                    ${JSON.stringify(BASE_ORIGIN)};

                const entries =
                    ${localStoragePayload};

                if (
                    window.location.origin ===
                    targetOrigin
                ) {

                    for (
                        const entry
                        of entries
                    ) {

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


    await context.addInitScript(
      initScript
    );

  }


  const page =
    await context.newPage();


  try {

    // ====================================================================
    // 1. My Actions
    // ====================================================================

    const myActionsStart =
      Date.now();


    await page.goto(

      BASE_URL,

      {

        waitUntil: 'domcontentloaded',

        timeout: NAV_TIMEOUT_MS,

      }

    );


    let myActionsSuccess =
      false;


    try {

      await waitForPageReady(
        page,
        'My Actions'
      );


      myActionsSuccess =
        true;


    } catch (error) {

      const myActionsDuration =
        Date.now() -
        myActionsStart;


      recordPageResult(

        'My Actions',

        myActionsDuration,

        false

      );


      await captureScreenshot(

        page,

        'My Actions',

        'failure'

      );


      throw error;

    }


    const myActionsDuration =
      Date.now() -
      myActionsStart;


    recordPageResult(

      'My Actions',

      myActionsDuration,

      myActionsSuccess

    );


    uiNavigationDuration.add(

      myActionsDuration,

      {

        page: 'My Actions',

        workload: WORKLOAD_LABEL,

        vu: String(VUS),

        iterations: String(ITERATIONS),

      }

    );


    // Collect page-level Web Vitals.

    await collectWebVitals(

      page,

      'My Actions'

    );


    console.log(

      `[UI PASS] My Actions | ` +
      `${myActionsDuration} ms | ` +
      `${page.url()}`

    );


    await captureScreenshot(

      page,

      'My Actions',

      'baseline'

    );


    // ====================================================================
    // 2. Projects
    // ====================================================================

    await navigateToPage(

      page,

      'Projects',

      'nav a[href="/projects"]',

      '//h1[normalize-space()="Projects"]'

    );


    // ====================================================================
    // 3. Workforce
    // ====================================================================
    // Navigation href is /resources.

    await navigateToPage(

      page,

      'Workforce',

      'nav a[href="/resources"]',

      '//h1[normalize-space()="Workforce Directory"]'

    );


    // ====================================================================
    // 4. Scheduling
    // ====================================================================

    await navigateToPage(

      page,

      'Scheduling',

      'nav a[href="/scheduling"]',

      '//h1[normalize-space()="Scheduling"]'

    );


    // ====================================================================
    // 5. Reports
    // ====================================================================

    await navigateToPage(

      page,

      'Reports',

      'nav a[href="/reports"]',

      '//h1[normalize-space()="Reports"]'

    );


    // ====================================================================
    // 6. Insights
    // ====================================================================

    await navigateToPage(

      page,

      'Insights',

      'nav a[href="/insights"]',

      '//h1[normalize-space()="Insights"]'

    );


    // ====================================================================
    // 7. Admin Console
    // ====================================================================
    // Navigation href is /admin.

    await navigateToPage(

      page,

      'Admin Console',

      'nav a[href="/admin"]',

      '//h1[normalize-space()="System administration"]'

    );


  } finally {

    // Closing the page is important for browser metric collection.

    await page.close();

    await context.close();

  }

}


// ============================================================================
// Custom result file
// ============================================================================

export function handleSummary(data) {

  // ------------------------------------------------------------------------
  // Detect browser information from the summary where possible.
  // ------------------------------------------------------------------------

  let detectedBrowser =
    TEST_MACHINE_CONFIG.browser;

  let detectedBrowserVersion =
    TEST_MACHINE_CONFIG.browser_version;


  // ------------------------------------------------------------------------
  // Result metadata
  // ------------------------------------------------------------------------

  const result = Object.assign(

    {},

    data,

    {

      // ================================================================
      // Test identification
      // ================================================================

      test_type:
        'UI_BROWSER_PERFORMANCE',

      feature:
        'Navigation Pages',

      epic:
        'Navigation Performance',

      base_url:
        BASE_URL,

      environment:
        __ENV.ENVIRONMENT || 'QA',

      version_build:
        __ENV.VERSION_BUILD || 'Not provided',

      test_date:
        new Date().toISOString(),


      // ================================================================
      // Workload
      // ================================================================

      stage: {

        vus: VUS,

        iterations_per_vu:
          ITERATIONS,

        workload:
          WORKLOAD_LABEL,

      },


      workload: {

        label:
          WORKLOAD_LABEL,

        vus:
          VUS,

        iterations_per_vu:
          ITERATIONS,

        total_expected_iterations:
          VUS * ITERATIONS,

      },


      // ================================================================
      // Authentication
      // ================================================================

      authentication: {

        session_cookie:
          'cmma_session',

        session_present:
          Boolean(sessionCookie),

      },


      // ================================================================
      // Performance targets
      // ================================================================

      performance_targets: {

        functional: {

          ui_checks_pass_rate:
            '100%',

          ui_page_success_rate:
            `>= ${UI_PAGE_SUCCESS_RATE * 100}%`,

        },


        ui_navigation: {

          p95:
            `< ${UI_NAV_P95_MS} ms`,

          p99:
            `< ${UI_NAV_P99_MS} ms`,

        },


        ui_page: {

          p95:
            `< ${UI_PAGE_P95_MS} ms`,

          p99:
            `< ${UI_PAGE_P99_MS} ms`,

        },


        browser_http: {

          failed_rate:
            `< ${BROWSER_HTTP_FAILED_RATE * 100}%`,

        },


        api: {

          p95:
            `< ${API_P95_MS} ms`,

          http_failed_rate:
            `< ${API_HTTP_FAILED_RATE * 100}%`,

          page_success_rate:
            `>= ${API_PAGE_SUCCESS_RATE * 100}%`,

        },


        web_vitals: {

          LCP:
            `< ${LCP_P95_MS} ms`,

          FCP:
            `< ${FCP_P95_MS} ms`,

          TTFB:
            `< ${TTFB_P95_MS} ms`,

          INP:
            `< ${INP_P95_MS} ms`,

          CLS:
            `< ${CLS_P95}`,

        },

      },


      // ================================================================
      // Numeric threshold configuration
      // ================================================================

      threshold_configuration: {

        ui_checks_pass_rate:
          UI_CHECKS_PASS_RATE,

        ui_page_success_rate:
          UI_PAGE_SUCCESS_RATE,

        ui_navigation_p95_ms:
          UI_NAV_P95_MS,

        ui_navigation_p99_ms:
          UI_NAV_P99_MS,

        ui_page_p95_ms:
          UI_PAGE_P95_MS,

        ui_page_p99_ms:
          UI_PAGE_P99_MS,

        browser_http_failed_rate:
          BROWSER_HTTP_FAILED_RATE,

        api_p95_ms:
          API_P95_MS,

        api_http_failed_rate:
          API_HTTP_FAILED_RATE,

        api_page_success_rate:
          API_PAGE_SUCCESS_RATE,

        lcp_p95_ms:
          LCP_P95_MS,

        fcp_p95_ms:
          FCP_P95_MS,

        ttfb_p95_ms:
          TTFB_P95_MS,

        inp_p95_ms:
          INP_P95_MS,

        cls_p95:
          CLS_P95,

      },


      // ================================================================
      // Infrastructure
      // ================================================================

      infrastructure:
        INFRASTRUCTURE,


      // ================================================================
      // Test machine
      // ================================================================

      test_machine: {

        os:
          TEST_MACHINE_CONFIG.os,

        cpu:
          TEST_MACHINE_CONFIG.cpu,

        memory:
          TEST_MACHINE_CONFIG.memory,

        browser:
          detectedBrowser,

        browser_version:
          detectedBrowserVersion,

        network:
          TEST_MACHINE_CONFIG.network,

      },


      // ================================================================
      // Tool information
      // ================================================================

      tools: {

        performance_tool:
          'k6',

        browser_tool:
          'k6 Browser',

        browser_engine:
          'Chromium',

        api_tool:
          'k6',

      },


      // ================================================================
      // Authentication / artifacts
      // ================================================================

      screenshots_enabled:
        TAKE_SCREENSHOTS,

      navigation_flow:
        PAGES.map(
          (page) => page.name
        ),

      artifact_source: {

        storage_state:
          STORAGE_STATE_PATH,

        har:
          'performance/har/navigation_pages.har',

        api_inventory:
          'performance/analysis/navigation_api_inventory.json',

        api_k6:
          'performance/k6/navigation_pages.js',

      },

    }

  );


  return {

    [RESULT_FILE]:
      JSON.stringify(
        result,
        null,
        2
      ),

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