// ============================================================
// UI NAVIGATION PERFORMANCE TEST - k6/browser
// ============================================================
//
// Purpose:
//   - Execute authenticated UI navigation performance tests
//   - Measure real sidebar navigation between application pages
//   - Capture page-level duration and success metrics
//   - Capture screenshots/evidence
//   - Collect observational Web Vitals
//   - Track browser HTTP failures
//   - Generate consolidated JSON + text summary
//
// Navigation flow:
//
//   Authenticated session
//        |
//        v
//   My Actions (landing page)
//        |
//        +--> Projects
//        |
//        +--> Workforce
//        |
//        +--> Scheduling
//        |
//        +--> Reports
//        |
//        +--> Insights
//        |
//        +--> Admin Console
//
// IMPORTANT:
//   - My Actions is the landing page and is NOT a sidebar item.
//   - Workforce actual navigation href is /resources.
//   - Admin Console actual navigation href is /admin.
//   - Admin Console heading is "System Administration".
//   - Authentication is restored from storage_state.json.
//   - Session/cookie values are NEVER written to reports.
// ============================================================

import { browser } from 'k6/browser';
import { check } from 'k6';
import {
    Rate,
    Trend
} from 'k6/metrics';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

// ============================================================
// CONFIGURATION
// ============================================================

const BASE_URL = (
    __ENV.BASE_URL ||
    'https://danis-cmma-dev.cosdevx.com'
).replace(/\/$/, '');

const VUS = Number(__ENV.VUS || 1);
const ITERATIONS = Number(__ENV.ITERATIONS || 1);

const NAV_TIMEOUT_MS = 30000;
const MAX_DURATION = '30m';

const SCREENSHOTS =
    String(__ENV.SCREENSHOTS || 'true').toLowerCase() === 'true';

const RESULT_FILE =
    __ENV.RESULT_FILE ||
    `results/ui_${VUS}vu_${ITERATIONS}iter.json`;

// ============================================================
// PERFORMANCE TARGETS
// ============================================================

const UI_CHECKS_PASS_RATE = 1.0;
const UI_PAGE_SUCCESS_RATE = 0.99;
const BROWSER_HTTP_FAILED_RATE = 0.01;

const UI_NAV_P95_MS = 2000;
const UI_NAV_P99_MS = 3500;

// Web Vitals are observational/non-blocking.
const WEB_VITAL_TARGETS = {
    lcp_ms: 2500,
    fcp_ms: 1800,
    ttfb_ms: 800,
    inp_ms: 200,
    cls: 0.10
};

// ============================================================
// TARGET PAGES
// ============================================================
//
// My Actions:
//   - Landing page after authentication.
//   - NOT a sidebar navigation item.
//
// Other pages:
//   - Must be reached through the actual Primary navigation.
//

const PAGES = [
    {
        name: 'My Actions',
        type: 'landing',
        heading: 'My Actions'
    },
    {
        name: 'Projects',
        type: 'navigation',
        navLocator: 'nav[aria-label="Primary"] a[href="/projects"]',
        heading: 'Projects'
    },
    {
        name: 'Workforce',
        type: 'navigation',
        navLocator: 'nav[aria-label="Primary"] a[href="/resources"]',
        heading: 'Workforce Directory'
    },
    {
        name: 'Scheduling',
        type: 'navigation',
        navLocator: 'nav[aria-label="Primary"] a[href="/scheduling"]',
        heading: 'Scheduling'
    },
    {
        name: 'Reports',
        type: 'navigation',
        navLocator: 'nav[aria-label="Primary"] a[href="/reports"]',
        heading: 'Reports'
    },
    {
        name: 'Insights',
        type: 'navigation',
        navLocator: 'nav[aria-label="Primary"] a[href="/insights"]',
        heading: 'Insights'
    },
    {
        
        name: 'Admin Console',
        type: 'navigation',
        navLocator: 'nav[aria-label="Primary"] a[href="/admin"]',
        heading: 'System administration'
        
    }
];

// ============================================================
// METRICS
// ============================================================

const uiNavigationDuration = new Trend(
    'ui_navigation_duration',
    true
);

const uiPageDuration = new Trend(
    'ui_page_duration',
    true
);

const uiPageSuccessRate = new Rate(
    'ui_page_success_rate'
);

const browserHttpFailureRate = new Rate(
    'browser_http_req_failed'
);

// ============================================================
// PAGE-SPECIFIC METRICS
// ============================================================

const UI_PAGE_METRICS = {};

function sanitizeMetricName(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
}

function createPageMetrics(pageName) {
    const safeName = sanitizeMetricName(pageName);

    UI_PAGE_METRICS[pageName] = {
        duration: new Trend(
            `ui_page_duration_${safeName}`,
            true
        ),

        success: new Rate(
            `ui_page_success_${safeName}`
        )
    };
}

for (const page of PAGES) {
    createPageMetrics(page.name);
}

// ============================================================
// PAGE-SPECIFIC WEB VITAL METRICS
// ============================================================

const WEB_VITAL_METRICS = {};

function createWebVitalMetrics(pageName) {
    const safeName = sanitizeMetricName(pageName);

    WEB_VITAL_METRICS[pageName] = {
        lcp: new Trend(
            `web_vital_lcp_${safeName}`,
            true
        ),

        fcp: new Trend(
            `web_vital_fcp_${safeName}`,
            true
        ),

        ttfb: new Trend(
            `web_vital_ttfb_${safeName}`,
            true
        ),

        inp: new Trend(
            `web_vital_inp_${safeName}`,
            true
        ),

        cls: new Trend(
            `web_vital_cls_${safeName}`,
            true
        )
    };
}

for (const page of PAGES) {
    createWebVitalMetrics(page.name);
}

// ============================================================
// AUTHENTICATED STORAGE STATE
// ============================================================

const STORAGE_STATE_CANDIDATES = [
    'automation/ui/storage_state.json',
    '../automation/ui/storage_state.json',
    '../../automation/ui/storage_state.json'
];

let STORAGE_STATE = null;
let STORAGE_STATE_PATH = null;

const SESSION_COOKIE_NAME = 'cmma_session';
let SESSION_COOKIE_PRESENT = false;

function loadAuthenticatedStorageState() {
    if (STORAGE_STATE !== null) {
        return STORAGE_STATE;
    }

    let lastError = null;

    for (const candidate of STORAGE_STATE_CANDIDATES) {
        try {
            const state = JSON.parse(open(candidate));

            STORAGE_STATE = state;
            STORAGE_STATE_PATH = candidate;

            const cookies = Array.isArray(state.cookies)
                ? state.cookies
                : [];

            const sessionCookie = cookies.find(
                cookie => cookie.name === SESSION_COOKIE_NAME
            );

            if (
                sessionCookie &&
                typeof sessionCookie.value === 'string' &&
                sessionCookie.value.trim() !== ''
            ) {
                SESSION_COOKIE_PRESENT = true;
            }

            console.log(
                `Authenticated storage state found: ${candidate}`
            );

            if (!SESSION_COOKIE_PRESENT) {
                throw new Error(
                    'AUTH_REQUIRED: cmma_session is missing or empty in storage_state.json. ' +
                    'Run check_auth_state.py before starting the UI performance test.'
                );
            }

            return state;
        } catch (error) {
            lastError = error;
        }
    }

    throw new Error(
        `Unable to load authenticated storage state. ` +
        `Checked: ${STORAGE_STATE_CANDIDATES.join(', ')}. ` +
        `Last error: ${lastError}`
    );
}

// Load once during initialization.
loadAuthenticatedStorageState();

// ============================================================
// K6 OPTIONS
// ============================================================

export const options = {
    scenarios: {
        ui_navigation: {
            executor: 'per-vu-iterations',

            vus: VUS,

            iterations: ITERATIONS,

            maxDuration: MAX_DURATION,

            options: {
                browser: {
                    type: 'chromium'
                }
            }
        }
    },

    thresholds: {
        checks: [
            `rate>=${UI_CHECKS_PASS_RATE}`
        ],

        ui_page_success_rate: [
            `rate>=${UI_PAGE_SUCCESS_RATE}`
        ],

        browser_http_req_failed: [
            `rate<${BROWSER_HTTP_FAILED_RATE}`
        ],

        ui_navigation_duration: [
            `p(95)<${UI_NAV_P95_MS}`,
            `p(99)<${UI_NAV_P99_MS}`
        ]

        // Web Vitals intentionally remain observational.
        // They are collected and reported but do NOT block PASS/FAIL.
    },

    summaryTrendStats: [
        'avg',
        'min',
        'med',
        'max',
        'p(90)',
        'p(95)',
        'p(99)',
        'count'
    ]
};

// ============================================================
// RESULT COLLECTION
// ============================================================

const pageResults = [];
const webVitalResults = [];

let httpTotal = 0;
let httpFailed = 0;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function sanitizeFileName(name) {
    return String(name)
        .replace(/[^a-zA-Z0-9._-]+/g, '_')
        .replace(/^_+|_+$/g, '');
}

function getWorkloadLabel() {
    return `${VUS}vu_${ITERATIONS}iter`;
}

function getMetricTags(pageName) {
    return {
        page: pageName,
        workload: getWorkloadLabel(),
        vu: String(__VU),
        iterations: String(ITERATIONS)
    };
}

// ============================================================
// AUTHENTICATION DETECTION
// ============================================================

function isAuthenticationUrl(url) {
    return /\/login(?:[/?#]|$)|\/mfa(?:[/?#]|$)|\/mfa\/verify(?:[/?#]|$)/i
        .test(String(url));
}

async function detectAuthenticationPage(page) {
    const currentUrl = page.url();

    if (isAuthenticationUrl(currentUrl)) {
        return true;
    }

    try {
        const loginEmail = page.locator('#login-email');

        if (await loginEmail.isVisible({ timeout: 1000 })) {
            return true;
        }
    } catch (_) {
        // Authentication field not present.
    }

    return false;
}

// ============================================================
// SCREENSHOT HELPERS
// ============================================================

function getScreenshotPath(pageName, kind) {
    const safePage = sanitizeFileName(pageName);

    const folder =
        kind === 'failure'
            ? 'results/screenshots/failures'
            : 'results/screenshots';

    return `${folder}/${kind}_${VUS}vu_${ITERATIONS}iter_vu${__VU}_iter${Number(__ITER) + 1}_${safePage}.png`;
}

async function takeScreenshot(page, pageName, kind) {
    if (!SCREENSHOTS) {
        return null;
    }

    const path = getScreenshotPath(pageName, kind);

    try {
        await page.screenshot({
            path,
            fullPage: true
        });

        console.log(
            `[SCREENSHOT] ${kind}: ${path}`
        );

        return path;
    } catch (error) {
        console.error(
            `[SCREENSHOT ERROR] ${pageName}: ${error}`
        );

        return null;
    }
}

// ============================================================
// NAVIGATION DIAGNOSTICS
// ============================================================

async function diagnoseNavigation(page, pageName) {
    console.error(
        `========== NAVIGATION DIAGNOSTIC: ${pageName} ==========`
    );

    try {
        console.error(
            `[DIAGNOSTIC] URL: ${page.url()}`
        );

        console.error(
            `[DIAGNOSTIC] Title: ${await page.title()}`
        );
    } catch (error) {
        console.error(
            `[DIAGNOSTIC] Unable to read URL/title: ${error}`
        );
    }

    try {
        const bodyText = await page.locator('body').innerText({
            timeout: 5000
        });

        console.error(
            `[DIAGNOSTIC] Body:\n${bodyText.substring(0, 10000)}`
        );
    } catch (error) {
        console.error(
            `[DIAGNOSTIC] Body unavailable: ${error}`
        );
    }

    try {
        const navigationContainers = await page.locator(
            'nav, [role="navigation"], aside, [class*="sidebar"], [class*="side-nav"], [class*="sidenav"], [class*="navigation"], [class*="menu"]'
        ).all();

        console.error(
            `[DIAGNOSTIC] Navigation containers found: ${navigationContainers.length}`
        );

        const maxContainers = Math.min(
            navigationContainers.length,
            20
        );

        for (let i = 0; i < maxContainers; i++) {
            try {
                const html =
                    await navigationContainers[i].evaluate(
                        element => element.outerHTML
                    );

                console.error(
                    `[NAV CONTAINER ${i + 1}]\n${html.substring(0, 5000)}`
                );
            } catch (_) {
                // Ignore individual diagnostic failure.
            }
        }
    } catch (error) {
        console.error(
            `[DIAGNOSTIC] Navigation containers unavailable: ${error}`
        );
    }

    try {
        const clickableElements = await page.locator(
            'a, button, [role="link"], [role="button"], [tabindex="0"]'
        ).all();

        console.error(
            `[DIAGNOSTIC] Clickable elements found: ${clickableElements.length}`
        );

        const maxElements = Math.min(
            clickableElements.length,
            100
        );

        for (let i = 0; i < maxElements; i++) {
            try {
                const details =
                    await clickableElements[i].evaluate(
                        element => ({
                            tag: element.tagName,
                            text: (element.innerText || '').trim(),
                            ariaLabel: element.getAttribute('aria-label'),
                            title: element.getAttribute('title'),
                            href: element.getAttribute('href'),
                            dataTestId: element.getAttribute('data-testid'),
                            id: element.getAttribute('id'),
                            className: element.getAttribute('class')
                        })
                    );

                console.error(
                    `[CLICKABLE ${i + 1}] ${JSON.stringify(details)}`
                );
            } catch (_) {
                // Ignore individual diagnostic failure.
            }
        }
    } catch (error) {
        console.error(
            `[DIAGNOSTIC] Clickable elements unavailable: ${error}`
        );
    }

    console.error(
        `========== END NAVIGATION DIAGNOSTIC: ${pageName} ==========`
    );
}

// ============================================================
// PAGE READY CHECK
// ============================================================

async function waitForPageReady(page, pageName) {
    await page.waitForLoadState(
        'domcontentloaded',
        {
            timeout: NAV_TIMEOUT_MS
        }
    );

    if (await detectAuthenticationPage(page)) {
        throw new Error(
            `AUTHENTICATION_REQUIRED: ${pageName} redirected to login/MFA. ` +
            `Authenticated storage state may be expired.`
        );
    }

    const primaryNavigation =
        page.locator('nav[aria-label="Primary"]');

    await primaryNavigation.waitFor({
        state: 'visible',
        timeout: NAV_TIMEOUT_MS
    });

    const mainContent = page.locator('main');

    await mainContent.waitFor({
        state: 'visible',
        timeout: NAV_TIMEOUT_MS
    });

    if (await detectAuthenticationPage(page)) {
        throw new Error(
            `AUTHENTICATION_REQUIRED: ${pageName} is displaying an authentication page.`
        );
    }

    return true;
}

// ============================================================
// WEB VITAL COLLECTION
// ============================================================

async function collectWebVitals(page, pageName) {
    const tags = getMetricTags(pageName);

    try {
        const vitals = await page.evaluate(() => {
            const navigationEntries =
                performance.getEntriesByType('navigation');

            const navigation =
                navigationEntries.length > 0
                    ? navigationEntries[0]
                    : null;

            const paintEntries =
                performance.getEntriesByType('paint');

            const fcpEntry =
                paintEntries.find(
                    entry => entry.name === 'first-contentful-paint'
                );

            const lcpEntries =
                performance.getEntriesByType(
                    'largest-contentful-paint'
                );

            const lcpEntry =
                lcpEntries.length > 0
                    ? lcpEntries[lcpEntries.length - 1]
                    : null;

            const layoutShiftEntries =
                performance.getEntriesByType('layout-shift');

            let cls = 0;

            for (const entry of layoutShiftEntries) {
                if (!entry.hadRecentInput) {
                    cls += Number(entry.value || 0);
                }
            }

            const eventEntries =
                performance.getEntriesByType('event');

            let inp = 0;

            for (const entry of eventEntries) {
                const duration = Number(entry.duration || 0);

                if (duration > inp) {
                    inp = duration;
                }
            }

            return {
                ttfb_ms: navigation
                    ? Number(navigation.responseStart || 0)
                    : null,

                fcp_ms: fcpEntry
                    ? Number(fcpEntry.startTime || 0)
                    : null,

                lcp_ms: lcpEntry
                    ? Number(
                        lcpEntry.renderTime ||
                        lcpEntry.loadTime ||
                        lcpEntry.startTime ||
                        0
                    )
                    : null,

                inp_ms: inp,

                cls: Number(cls.toFixed(4))
            };
        });

        const metricSet =
            WEB_VITAL_METRICS[pageName];

        if (
            vitals.ttfb_ms !== null &&
            Number.isFinite(vitals.ttfb_ms)
        ) {
            metricSet.ttfb.add(
                vitals.ttfb_ms,
                tags
            );
        }

        if (
            vitals.fcp_ms !== null &&
            Number.isFinite(vitals.fcp_ms)
        ) {
            metricSet.fcp.add(
                vitals.fcp_ms,
                tags
            );
        }

        if (
            vitals.lcp_ms !== null &&
            Number.isFinite(vitals.lcp_ms)
        ) {
            metricSet.lcp.add(
                vitals.lcp_ms,
                tags
            );
        }

        if (
            vitals.inp_ms !== null &&
            Number.isFinite(vitals.inp_ms)
        ) {
            metricSet.inp.add(
                vitals.inp_ms,
                tags
            );
        }

        if (
            vitals.cls !== null &&
            Number.isFinite(vitals.cls)
        ) {
            metricSet.cls.add(
                vitals.cls,
                tags
            );
        }

        webVitalResults.push({
            page: pageName,
            workload: getWorkloadLabel(),
            vu: __VU,
            iteration: Number(__ITER) + 1,
            lcp_ms: vitals.lcp_ms,
            fcp_ms: vitals.fcp_ms,
            ttfb_ms: vitals.ttfb_ms,
            inp_ms: vitals.inp_ms,
            cls: vitals.cls,
            targets: WEB_VITAL_TARGETS,
            blocking: false
        });

        console.log(
            `[WEB VITALS] ${pageName} | ` +
            `LCP=${vitals.lcp_ms}ms | ` +
            `FCP=${vitals.fcp_ms}ms | ` +
            `TTFB=${vitals.ttfb_ms}ms | ` +
            `INP=${vitals.inp_ms}ms | ` +
            `CLS=${vitals.cls}`
        );

        return vitals;
    } catch (error) {
        console.error(
            `[WEB VITAL ERROR] ${pageName}: ${error}`
        );

        webVitalResults.push({
            page: pageName,
            workload: getWorkloadLabel(),
            vu: __VU,
            iteration: Number(__ITER) + 1,
            error: String(error),
            blocking: false
        });

        return null;
    }
}

// ============================================================
// RECORD PAGE RESULT
// ============================================================

function recordPageResult({
    page,
    pageName,
    duration,
    success,
    error = null,
    screenshot = null
}) {
    const tags = getMetricTags(pageName);

    uiPageDuration.add(
        duration,
        tags
    );

    uiPageSuccessRate.add(
        success,
        tags
    );

    UI_PAGE_METRICS[pageName].duration.add(
        duration,
        tags
    );

    UI_PAGE_METRICS[pageName].success.add(
        success,
        tags
    );

    check(
        page,
        {
            [`${pageName} page loaded successfully`]:
                () => success
        }
    );

    pageResults.push({
        page: pageName,
        workload: getWorkloadLabel(),
        vu: __VU,
        iteration: Number(__ITER) + 1,
        duration_ms: duration,
        success,
        url: page.url(),
        error,
        screenshot
    });
}

// ============================================================
// NAVIGATE THROUGH SIDEBAR
// ============================================================

async function navigateToPage(
    page,
    pageName,
    navLocator,
    headingText
) {
    const start = Date.now();

    try {
        const navigationLink =
            page.locator(navLocator).first();

        await navigationLink.waitFor({
            state: 'visible',
            timeout: NAV_TIMEOUT_MS
        });

        const isEnabled =
            await navigationLink.isEnabled();

        if (!isEnabled) {
            throw new Error(
                `Navigation link is disabled: ${navLocator}`
            );
        }

        console.log(
            `[UI NAV] Clicking ${pageName}: ${navLocator}`
        );

        await navigationLink.click({
            timeout: NAV_TIMEOUT_MS
        });

        await waitForPageReady(
            page,
            pageName
        );

        const headingLocator =
            page.getByRole(
                'heading',
                {
                    name: headingText,
                    exact: true
                }
            ).first();

        await headingLocator.waitFor({
            state: 'visible',
            timeout: NAV_TIMEOUT_MS
        });

        // Admin Console can require a little additional
        // stabilization after the SPA route changes.
        if (pageName === 'Admin Console') {
            try {
                await page.waitForLoadState(
                    'networkidle',
                    {
                        timeout: 10000
                    }
                );
            } catch (_) {
                // networkidle is not a blocking condition.
            }

            await page.waitForTimeout(1000);
        }

        const duration =
            Date.now() - start;

        const screenshot =
            await takeScreenshot(
                page,
                pageName,
                'baseline'
            );

        recordPageResult({
            page,
            pageName,
            duration,
            success: true,
            screenshot
        });

        uiNavigationDuration.add(
            duration,
            getMetricTags(pageName)
        );

        await collectWebVitals(
            page,
            pageName
        );

        console.log(
            `[UI PASS] ${pageName} | ${duration}ms | ${page.url()}`
        );

        return true;
    } catch (error) {
        const duration =
            Date.now() - start;

        const errorMessage =
            String(error);

        await diagnoseNavigation(
            page,
            pageName
        );

        const screenshot =
            await takeScreenshot(
                page,
                pageName,
                'failure'
            );

        recordPageResult({
            page,
            pageName,
            duration,
            success: false,
            error: errorMessage,
            screenshot
        });

        uiNavigationDuration.add(
            duration,
            getMetricTags(pageName)
        );

        console.error(
            `[UI FAIL] ${pageName} | ${duration}ms | ${errorMessage}`
        );

        throw error;
    }
}

// ============================================================
// MY ACTIONS LANDING PAGE
// ============================================================

// ============================================================
// MY ACTIONS LANDING PAGE
// ============================================================

async function openMyActions(page) {
    const pageName = 'My Actions';

    const start = Date.now();

    try {
        console.log(
            `[UI NAV] Opening landing page: ${BASE_URL}`
        );

        await page.goto(
            BASE_URL,
            {
                waitUntil: 'domcontentloaded',
                timeout: NAV_TIMEOUT_MS
            }
        );

        await waitForPageReady(
            page,
            pageName
        );

        // ----------------------------------------------------
        // IMPORTANT:
        // My Actions is the authenticated landing page.
        // It is NOT a sidebar navigation target.
        //
        // Do not require an H1/heading role here.
        // The application renders "MY ACTIONS" as page content,
        // but it is not exposed as the exact accessible heading
        // expected by getByRole('heading', ...).
        //
        // waitForPageReady() already validates:
        //   - DOMContentLoaded
        //   - authentication state
        //   - Primary navigation visibility
        //   - main content visibility
        // ----------------------------------------------------

        const duration =
            Date.now() - start;

        const screenshot =
            await takeScreenshot(
                page,
                pageName,
                'baseline'
            );

        recordPageResult({
            page,
            pageName,
            duration,
            success: true,
            screenshot
        });

        uiNavigationDuration.add(
            duration,
            getMetricTags(pageName)
        );

        await collectWebVitals(
            page,
            pageName
        );

        console.log(
            `[UI PASS] ${pageName} landing page | ` +
            `${duration}ms | ${page.url()}`
        );

        return true;
    } catch (error) {
        const duration =
            Date.now() - start;

        await diagnoseNavigation(
            page,
            pageName
        );

        const screenshot =
            await takeScreenshot(
                page,
                pageName,
                'failure'
            );

        recordPageResult({
            page,
            pageName,
            duration,
            success: false,
            error: String(error),
            screenshot
        });

        uiNavigationDuration.add(
            duration,
            getMetricTags(pageName)
        );

        console.error(
            `[UI FAIL] ${pageName} landing page | ` +
            `${duration}ms | ${error}`
        );

        throw error;
    }
}
// ============================================================
// HTTP TRACKING
// ============================================================

function attachHttpTracking(page) {
    page.on(
        'response',
        response => {
            try {
                httpTotal += 1;

                const status =
                    response.status();

                const failed =
                    status >= 400;

                browserHttpFailureRate.add(
                    failed,
                    {
                        workload: getWorkloadLabel(),
                        vu: String(__VU),
                        iterations: String(ITERATIONS)
                    }
                );

                if (failed) {
                    httpFailed += 1;

                    console.error(
                        `[HTTP FAIL] ${status} ${response.url()}`
                    );
                }
            } catch (error) {
                console.error(
                    `[HTTP TRACKING ERROR] ${error}`
                );
            }
        }
    );
}

// ============================================================
// COOKIE RESTORATION
// ============================================================

function buildK6Cookie(cookie) {
    const result = {
        name: cookie.name,
        value: cookie.value,
        domain: cookie.domain,
        path: cookie.path || '/'
    };

    if (cookie.expires !== undefined) {
        result.expires = cookie.expires;
    }

    if (cookie.httpOnly !== undefined) {
        result.httpOnly = cookie.httpOnly;
    }

    if (cookie.secure !== undefined) {
        result.secure = cookie.secure;
    }

    if (cookie.sameSite !== undefined) {
        result.sameSite = cookie.sameSite;
    }

    return result;
}

// ============================================================
// LOCAL STORAGE RESTORATION
// ============================================================

function buildLocalStorageInitScript(
    origins
) {
    const serialized =
        JSON.stringify(origins || []);

    return `
        (() => {
            const origins = ${serialized};

            try {
                const currentOrigin =
                    window.location.origin;

                const matchingOrigin =
                    origins.find(
                        item => item.origin === currentOrigin
                    );

                if (
                    matchingOrigin &&
                    Array.isArray(matchingOrigin.localStorage)
                ) {
                    for (
                        const item of matchingOrigin.localStorage
                    ) {
                        if (
                            item &&
                            typeof item.name === 'string'
                        ) {
                            window.localStorage.setItem(
                                item.name,
                                String(item.value ?? '')
                            );
                        }
                    }
                }
            } catch (error) {
                console.error(
                    '[LOCAL STORAGE RESTORE ERROR]',
                    error
                );
            }
        })();
    `;
}

// ============================================================
// AUTHENTICATED BROWSER CONTEXT
// ============================================================

async function createAuthenticatedContext() {
    const state =
        loadAuthenticatedStorageState();

    const context =
        await browser.newContext({
            ignoreHTTPSErrors: true
        });

    // --------------------------------------------------------
    // Restore cookies.
    // --------------------------------------------------------

    const cookies =
        Array.isArray(state.cookies)
            ? state.cookies
            : [];

    for (const cookie of cookies) {
        try {
            await context.addCookies([
                buildK6Cookie(cookie)
            ]);
        } catch (error) {
            console.error(
                `[COOKIE RESTORE ERROR] ${cookie.name}: ${error}`
            );
        }
    }

    // --------------------------------------------------------
    // Restore local storage.
    // --------------------------------------------------------

    const origins =
        Array.isArray(state.origins)
            ? state.origins
            : [];

    if (origins.length > 0) {
        const initScript =
            buildLocalStorageInitScript(
                origins
            );

        await context.addInitScript(
            initScript
        );
    }

    return context;
}

// ============================================================
// MAIN TEST
// ============================================================

export default async function () {
    const context =
        await createAuthenticatedContext();

    const page =
        await context.newPage();

    page.setDefaultTimeout(
        NAV_TIMEOUT_MS
    );

    page.setDefaultNavigationTimeout(
        NAV_TIMEOUT_MS
    );

    attachHttpTracking(page);

    try {
        // ----------------------------------------------------
        // 1. My Actions
        //
        // This is the authenticated landing page.
        // It is NOT clicked from the sidebar.
        // ----------------------------------------------------

        await openMyActions(page);

        // ----------------------------------------------------
        // 2. Projects
        // ----------------------------------------------------

        await navigateToPage(
            page,
            'Projects',
            'nav[aria-label="Primary"] a[href="/projects"]',
            'Projects'
        );

        // ----------------------------------------------------
        // 3. Workforce
        //
        // Actual sidebar href:
        //     /resources
        //
        // Actual page heading:
        //     Workforce Directory
        // ----------------------------------------------------

        await navigateToPage(
            page,
            'Workforce',
            'nav[aria-label="Primary"] a[href="/resources"]',
            'Workforce Directory'
        );

        // ----------------------------------------------------
        // 4. Scheduling
        // ----------------------------------------------------

        await navigateToPage(
            page,
            'Scheduling',
            'nav[aria-label="Primary"] a[href="/scheduling"]',
            'Scheduling'
        );

        // ----------------------------------------------------
        // 5. Reports
        // ----------------------------------------------------

        await navigateToPage(
            page,
            'Reports',
            'nav[aria-label="Primary"] a[href="/reports"]',
            'Reports'
        );

        // ----------------------------------------------------
        // 6. Insights
        // ----------------------------------------------------

        await navigateToPage(
            page,
            'Insights',
            'nav[aria-label="Primary"] a[href="/insights"]',
            'Insights'
        );

        // ----------------------------------------------------
        // 7. Admin Console
        //
        // Actual sidebar href:
        //     /admin
        //
        // Actual heading:
        //     System Administration
        // ----------------------------------------------------

        await navigateToPage(
            page,
            'Admin Console',
            'nav[aria-label="Primary"] a[href="/admin"]',
            'System administration'
        );

        console.log(
            `[UI COMPLETE] ${getWorkloadLabel()} navigation flow completed successfully.`
        );
    } finally {
        try {
            await page.close();
        } catch (_) {
            // Ignore close error.
        }

        try {
            await context.close();
        } catch (_) {
            // Ignore close error.
        }
    }
}

// ============================================================
// SUMMARY HELPERS
// ============================================================

function getMetricValue(
    data,
    metricName,
    statistic
) {
    try {
        const metric =
            data.metrics?.[metricName];

        if (!metric) {
            return null;
        }

        return metric.values?.[statistic] ?? null;
    } catch (_) {
        return null;
    }
}

function roundNumber(
    value,
    decimals = 2
) {
    if (
        value === null ||
        value === undefined ||
        !Number.isFinite(Number(value))
    ) {
        return null;
    }

    const multiplier =
        Math.pow(10, decimals);

    return Math.round(
        Number(value) * multiplier
    ) / multiplier;
}

function getThresholdStatus(
    value,
    operator,
    target
) {
    if (
        value === null ||
        value === undefined ||
        !Number.isFinite(Number(value))
    ) {
        return 'NO DATA';
    }

    const numericValue =
        Number(value);

    if (operator === '<') {
        return numericValue < target
            ? 'PASS'
            : 'FAIL';
    }

    if (operator === '<=') {
        return numericValue <= target
            ? 'PASS'
            : 'FAIL';
    }

    if (operator === '>=') {
        return numericValue >= target
            ? 'PASS'
            : 'FAIL';
    }

    return 'OBS';
}

// ============================================================
// HANDLE SUMMARY
// ============================================================

export function handleSummary(data) {
    const timestamp =
        new Date().toISOString();

    const checksRate =
        getMetricValue(
            data,
            'checks',
            'rate'
        );

    const pageSuccessRate =
        getMetricValue(
            data,
            'ui_page_success_rate',
            'rate'
        );

    const httpFailureRate =
        getMetricValue(
            data,
            'browser_http_req_failed',
            'rate'
        );

    const navP95 =
        getMetricValue(
            data,
            'ui_navigation_duration',
            'p(95)'
        );

    const navP99 =
        getMetricValue(
            data,
            'ui_navigation_duration',
            'p(99)'
        );

    const navigationCount =
        getMetricValue(
            data,
            'ui_navigation_duration',
            'count'
        );

    const pageCount =
        pageResults.length;

    const passedPages =
        pageResults.filter(
            item => item.success
        ).length;

    const failedPages =
        pageResults.filter(
            item => !item.success
        ).length;

    const totalExpectedPages =
        PAGES.length;

    const overallPagePass =
        failedPages === 0 &&
        passedPages === totalExpectedPages;

    // --------------------------------------------------------
    // Page-level report rows
    // --------------------------------------------------------

    const pageReport = PAGES.map(
        pageDefinition => {
            const rows =
                pageResults.filter(
                    item =>
                        item.page === pageDefinition.name
                );

            const successful =
                rows.filter(
                    item => item.success
                );

            const durations =
                successful
                    .map(
                        item =>
                            Number(item.duration_ms)
                    )
                    .filter(
                        value =>
                            Number.isFinite(value)
                    );

            const average =
                durations.length > 0
                    ? durations.reduce(
                        (sum, value) =>
                            sum + value,
                        0
                    ) / durations.length
                    : null;

            const min =
                durations.length > 0
                    ? Math.min(...durations)
                    : null;

            const max =
                durations.length > 0
                    ? Math.max(...durations)
                    : null;

            return {
                page: pageDefinition.name,
                type: pageDefinition.type,
                expected_navigation:
                    pageDefinition.type === 'navigation',

                nav_locator:
                    pageDefinition.navLocator || null,

                expected_heading:
                    pageDefinition.heading,

                executions:
                    rows.length,

                passed:
                    successful.length,

                failed:
                    rows.length -
                    successful.length,

                average_duration_ms:
                    roundNumber(average),

                min_duration_ms:
                    roundNumber(min),

                max_duration_ms:
                    roundNumber(max)
            };
        }
    );

    // --------------------------------------------------------
    // Web Vital report
    // --------------------------------------------------------

    const webVitals =
        webVitalResults.map(
            item => ({
                ...item,
                lcp_target_ms:
                    WEB_VITAL_TARGETS.lcp_ms,

                fcp_target_ms:
                    WEB_VITAL_TARGETS.fcp_ms,

                ttfb_target_ms:
                    WEB_VITAL_TARGETS.ttfb_ms,

                inp_target_ms:
                    WEB_VITAL_TARGETS.inp_ms,

                cls_target:
                    WEB_VITAL_TARGETS.cls,

                blocking:
                    false
            })
        );

    // --------------------------------------------------------
    // Threshold summary
    // --------------------------------------------------------

    const thresholdSummary = {
        checks: {
            actual_rate:
                roundNumber(checksRate, 4),

            target:
                UI_CHECKS_PASS_RATE,

            status:
                getThresholdStatus(
                    checksRate,
                    '>=',
                    UI_CHECKS_PASS_RATE
                )
        },

        ui_page_success_rate: {
            actual_rate:
                roundNumber(pageSuccessRate, 4),

            target:
                UI_PAGE_SUCCESS_RATE,

            status:
                getThresholdStatus(
                    pageSuccessRate,
                    '>=',
                    UI_PAGE_SUCCESS_RATE
                )
        },

        browser_http_req_failed: {
            actual_rate:
                roundNumber(httpFailureRate, 4),

            target:
                BROWSER_HTTP_FAILED_RATE,

            status:
                getThresholdStatus(
                    httpFailureRate,
                    '<',
                    BROWSER_HTTP_FAILED_RATE
                )
        },

        ui_navigation_duration_p95: {
            actual_ms:
                roundNumber(navP95),

            target_ms:
                UI_NAV_P95_MS,

            status:
                getThresholdStatus(
                    navP95,
                    '<',
                    UI_NAV_P95_MS
                )
        },

        ui_navigation_duration_p99: {
            actual_ms:
                roundNumber(navP99),

            target_ms:
                UI_NAV_P99_MS,

            status:
                getThresholdStatus(
                    navP99,
                    '<',
                    UI_NAV_P99_MS
                )
        },

        web_vitals: {
            blocking: false,

            note:
                'Web Vitals are observational and do not determine overall PASS/FAIL.'
        }
    };

    // --------------------------------------------------------
    // Authentication metadata
    //
    // NEVER expose cookie/localStorage values.
    // --------------------------------------------------------

    const storageState =
        STORAGE_STATE || {};

    const authenticationMetadata = {
        storage_state_path:
            STORAGE_STATE_PATH,

        session_cookie_name:
            SESSION_COOKIE_NAME,

        session_cookie_present:
            SESSION_COOKIE_PRESENT,

        cookie_count:
            Array.isArray(
                storageState.cookies
            )
                ? storageState.cookies.length
                : 0,

        local_storage_origin_count:
            Array.isArray(
                storageState.origins
            )
                ? storageState.origins.length
                : 0,

        sensitive_values_included:
            false
    };

    // --------------------------------------------------------
    // Missing files
    // --------------------------------------------------------

    const missingFiles = [];

    if (!STORAGE_STATE_PATH) {
        missingFiles.push(
            'automation/ui/storage_state.json'
        );
    }

    // --------------------------------------------------------
    // Execution notes
    // --------------------------------------------------------

    const executionNotes = [
        'My Actions is treated as the authenticated landing page and is not clicked as a sidebar item.',
        'Projects, Workforce, Scheduling, Reports, Insights and Admin Console are navigated using the Primary sidebar.',
        'Workforce uses the actual application navigation path /resources.',
        'Admin Console uses the actual application navigation path /admin.',
        'Admin Console heading validation uses "System Administration".',
        'Web Vitals are collected for observation only and are non-blocking.',
        'Authentication values are not written to the report.',
        `Workload: ${VUS} VU x ${ITERATIONS} iteration(s).`,
        `Expected pages: ${totalExpectedPages}.`,
        `Observed page executions: ${pageCount}.`,
        `Browser HTTP responses observed: ${httpTotal}.`,
        `Browser HTTP responses >=400: ${httpFailed}.`
    ];

    // --------------------------------------------------------
    // Final JSON payload
    // --------------------------------------------------------

    const report = {
        meta: {
            feature:
                'UI Navigation Performance',

            base_url:
                BASE_URL,

            vus:
                VUS,

            iterations:
                ITERATIONS,

            workload:
                getWorkloadLabel(),

            timestamp,

            generated_at:
                timestamp,

            generated_by:
                'k6/browser',

            sensitive_values_included:
                false
        },

        document_information: {
            document:
                'UI Navigation Performance Test Report',

            feature:
                'Authenticated UI Navigation',

            environment:
                BASE_URL,

            workload:
                getWorkloadLabel(),

            navigation_model:
                'Sidebar navigation',

            page_count:
                totalExpectedPages
        },

        execution_summary: {
            status:
                overallPagePass
                    ? 'PASS'
                    : 'FAIL',

            total_pages:
                totalExpectedPages,

            passed_pages:
                passedPages,

            failed_pages:
                failedPages,

            page_success_rate:
                roundNumber(
                    pageSuccessRate,
                    4
                ),

            navigation_samples:
                navigationCount,

            navigation_p95_ms:
                roundNumber(navP95),

            navigation_p99_ms:
                roundNumber(navP99),

            browser_http_total:
                httpTotal,

            browser_http_failed:
                httpFailed,

            browser_http_failure_rate:
                roundNumber(
                    httpFailureRate,
                    4
                )
        },

        performance_targets: {
            ui_navigation_p95_ms:
                UI_NAV_P95_MS,

            ui_navigation_p99_ms:
                UI_NAV_P99_MS,

            ui_page_success_rate:
                UI_PAGE_SUCCESS_RATE,

            browser_http_failed_rate:
                BROWSER_HTTP_FAILED_RATE,

            web_vitals:
                WEB_VITAL_TARGETS
        },

        threshold_status:
            thresholdSummary,

        page_results:
            pageReport,

        execution_results:
            pageResults,

        web_vitals:
            webVitals,

        authentication:
            authenticationMetadata,

        infrastructure: {
            browser:
                'Chromium',

            test_type:
                'k6/browser',

            executor:
                'per-vu-iterations',

            vus:
                VUS,

            iterations:
                ITERATIONS
        },

        test_machine: {
            source:
                'k6 runtime',

            sensitive_details_included:
                false
        },

        missing_files:
            missingFiles,

        execution_notes:
            executionNotes
    };

    // --------------------------------------------------------
    // Text summary
    // --------------------------------------------------------

    const textOutput =
        textSummary(
            data,
            {
                indent:
                    ' ',
                enableColors:
                    false
            }
        );

    return {
        stdout:
            textOutput,

        [RESULT_FILE]:
            JSON.stringify(
                report,
                null,
                2
            )
    };
}
