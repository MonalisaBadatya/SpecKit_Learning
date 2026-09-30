Purpose

Execute the authenticated UI-navigation performance workflow from session refresh through HAR analysis, k6 execution, consolidated reporting, and performance investigation.

Workflow

MFA/session refresh
→ storage_state.json
→ authenticated HAR recording
→ navigation_pages.har
→ HAR/API analysis
→ navigation_api_inventory.json
→ k6 script
→ navigation_pages.js
→ review + handleSummary()
→ k6 workload runs
→ navigation_<VUS>vu_<ITER>iter.json
→ build_navigation_report.py
→ navigation_summary.json + navigation_comparison.html
→ investigate CHECK/FAILED APIs

1. Refresh authentication

Run from complex-spec:

python .\automation\ui\utils\interactive_mfa.py

Output/state:

automation/ui/storage_state.json

This refreshes the authenticated Playwright session so HAR recording can run without login/MFA.

Verify expiry if needed:

$state = Get-Content .\automation\ui\storage_state.json -Raw | ConvertFrom-Json
$cookie = $state.cookies | Where-Object { $_.name -eq "cmma_session" } | Select-Object -First 1
[DateTimeOffset]::FromUnixTimeSeconds([int64]$cookie.expires).LocalDateTime

Never print, commit, or hard-code the complete session token.

2. Record the authenticated HAR

Create/use:

performance/record_navigation_har.py

Use automation/ui/storage_state.json to execute:

My Actions → Projects → Workforce → Scheduling → Reports → Insights → Admin Console

without login/MFA.

Output:

performance/har/navigation_pages.har

HAR = HTTP Archive: a JSON-based browser network-traffic recording. It is the raw traffic source, not the final k6 API list.

3. Analyze the HAR

Input:

performance/har/navigation_pages.har

Output:

performance/analysis/navigation_api_inventory.json

Classify requests into relevant categories such as:

PAGE_BUSINESS_API
SUPPORTING_API
AUTH
STATIC
RSC/ROUTE_PREFETCH
DUPLICATE
ABORTED/NON-RELEVANT

Only relevant application APIs should be used for k6. Exclude static assets, auth traffic, RSC/prefetch traffic, duplicates, and known non-business/aborted requests as appropriate.

4. Generate the k6 script

Create:

performance/k6/navigation_pages.js

Use only these source artifacts:

performance/har/navigation_pages.har
performance/analysis/navigation_api_inventory.json

Use PAGE_BUSINESS_API plus required SUPPORTING_API requests.

Preserve page/API context:

page
api_name
method
endpoint

Navigation sequence:

01_My_Actions
02_Projects
03_Workforce
04_Scheduling
05_Reports
06_Insights
07_Admin_Console

k6 authentication

k6 does not consume Playwright storage_state.json directly. Use the current session cookie/environment values.

$state = Get-Content .\automation\ui\storage_state.json -Raw | ConvertFrom-Json
$cookie = $state.cookies | Where-Object { $_.name -eq "cmma_session" } | Select-Object -First 1
$env:SESSION_COOKIE = $cookie.value

"SESSION_COOKIE is set: $([bool]$env:SESSION_COOKIE)"

Expected:

True

Typical environment variables:

BASE_URL
TENANT_SLUG
COOKIE_NAME
SESSION_COOKIE
VUS
ITERATIONS

Do not expose the token.

5. Review + add handleSummary()

Review:

performance/k6/navigation_pages.js

Ensure it has:

correct endpoints/methods/query parameters

authentication

page sequence

page metrics

API metrics

failure metrics

duration metrics

handleSummary()

handleSummary() should report:

Overall

request count
HTTP failure %
page success %
avg / p90 / p95 / p99 / max

Page

page + duration statistics

API

page
api_name
method
endpoint
requests
failed_requests
failure_rate
avg/min/med/max/p90/p95/p99
status

Current target:

p95 < 2000 ms

Status rules:

PASS   = no failed requests + p95 < 2000 ms
CHECK  = no failed requests + p95 >= 2000 ms
FAILED = one or more failed requests

CHECK means performance investigation is required; it does not mean the API returned an HTTP failure.

6. Execute k6

Basic:

k6 run .\performance\k6\navigation_pages.js

Required workload set

1 VU / 1 iteration

$env:VUS="1"
$env:ITERATIONS="1"
k6 run .\performance\k6\navigation_pages.js

→ performance/results/navigation_1vu_1iter.json

1 VU / 5 iterations

$env:VUS="1"
$env:ITERATIONS="5"
k6 run .\performance\k6\navigation_pages.js

→ performance/results/navigation_1vu_5iter.json

5 VUs / 5 iterations

$env:VUS="5"
$env:ITERATIONS="5"
k6 run .\performance\k6\navigation_pages.js

→ performance/results/navigation_5vu_5iter.json

25 VUs / 5 iterations

$env:VUS="25"
$env:ITERATIONS="5"
k6 run .\performance\k6\navigation_pages.js

→ performance/results/navigation_25vu_5iter.json

If using another workload (e.g. 21 VUs / 1 iteration), give it a distinct filename; do not overwrite a different workload's result.

A k6 threshold message such as:

thresholds on metrics 'http_req_duration' have been crossed

means the configured threshold was exceeded; inspect API/page metrics to determine whether there were actual API failures.

7. Build the consolidated report

After the required runs:

python .\performance\results\build_navigation_report.py

Inputs:

navigation_1vu_1iter.json
navigation_1vu_5iter.json
navigation_5vu_5iter.json
navigation_25vu_5iter.json

Outputs:

performance/results/navigation_summary.json
performance/results/navigation_comparison.html

The consolidated HTML must compare all workloads and show:

Overall:
request count, failure %, success %, avg, p90, p95, p99, max

API:
page, API name, method, endpoint, status,
requests, failed requests, p95

Page:
page-level p95 across workloads

Use the timestamp stored in each result JSON; do not display a stale/first-run timestamp when a newer result exists.

8. Investigate performance

Investigation occurs after k6 execution/reporting for APIs marked CHECK or FAILED.

CHECK/FAILED
→ reproduce workload
→ confirm consistency
→ compare avg/p90/p95/p99/max
→ review request parameters/data volume
→ investigate backend processing
→ investigate DB queries
→ investigate downstream services
→ review CPU/memory/network/connection pools/cache
→ optimize if required
→ rerun k6
→ compare before/after

Distinguish:

HTTP/API failure ≠ slow response

Example:

200 + 0 failures + p95 2940 ms → CHECK
401/500 + failed requests > 0 → FAILED

9. Artifact structure

complex-spec/
├── automation/ui/
│   ├── storage_state.json
│   └── utils/interactive_mfa.py
└── performance/
    ├── har/navigation_pages.har
    ├── analysis/navigation_api_inventory.json
    ├── k6/navigation_pages.js
    └── results/
        ├── build_navigation_report.py
        ├── navigation_1vu_1iter.json
        ├── navigation_1vu_5iter.json
        ├── navigation_5vu_5iter.json
        ├── navigation_25vu_5iter.json
        ├── navigation_summary.json
        └── navigation_comparison.html

Rules

Refresh authentication before recording a new HAR when the session is expired.

HAR is the raw browser-traffic source.

API inventory is the discovery/classification layer.

k6 uses business/supporting APIs from the inventory, not every HAR request.

storage_state.json is for Playwright/HAR authentication; k6 uses the session cookie/environment configuration.

Never expose or commit credentials/session tokens.

Keep workload result files separate.

Treat CHECK as a performance investigation signal, not a functional failure.

Investigate FAILED APIs for actual request/status failures.

Re-run after optimization and compare results.

Completion checklist

[ ] storage_state.json refreshed
[ ] authenticated navigation HAR recorded
[ ] navigation_api_inventory.json created
[ ] navigation_pages.js generated/reviewed
[ ] handleSummary() configured
[ ] 1 VU / 1 iter run
[ ] 1 VU / 5 iter run
[ ] 5 VU / 5 iter run
[ ] 25 VU / 5 iter run
[ ] consolidated report generated
[ ] API name/endpoint/status/p95 reviewed
[ ] CHECK APIs investigated
[ ] FAILED APIs investigated
[ ] rerun/compare completed where required