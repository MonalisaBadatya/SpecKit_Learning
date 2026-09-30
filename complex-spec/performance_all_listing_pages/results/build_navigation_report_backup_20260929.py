"""
Navigation Performance Report Builder

Inputs
------
API:
    navigation_1vu_1iter.json
    navigation_1vu_5iter.json
    navigation_5vu_5iter.json
    navigation_25vu_5iter.json

UI:
    ui_1vu_1iter.json
    ui_1vu_5iter.json
    ui_5vu_5iter.json
    ui_25vu_5iter.json

Outputs
-------
    navigation_summary.json
    navigation_summary.html

Report characteristics
----------------------
- API + UI performance results
- No charts / graphs
- All four workloads kept separate
- Endpoint-level API traceability
- Page-level UI Web Vital traceability
- Complete performance targets
- Infrastructure
- Test Machine
- Functional status
- PASS / FAIL status
"""

from __future__ import annotations

import json
import math
import re
from datetime import datetime
from pathlib import Path
from html import escape


# ============================================================================
# Configuration
# ============================================================================

RESULTS_DIR = Path("performance/results")

API_FILES = [
    "navigation_1vu_1iter.json",
    "navigation_1vu_5iter.json",
    "navigation_5vu_5iter.json",
    "navigation_25vu_5iter.json",
]

UI_FILES = [
    "ui_1vu_1iter.json",
    "ui_1vu_5iter.json",
    "ui_5vu_5iter.json",
    "ui_25vu_5iter.json",
]

OUTPUT_JSON = RESULTS_DIR / "navigation_summary.json"
OUTPUT_HTML = RESULTS_DIR / "navigation_summary.html"


# ============================================================================
# Default report configuration
# ============================================================================

PAGE_LABELS = [
    "My Actions",
    "Projects",
    "Workforce",
    "Scheduling",
    "Reports",
    "Insights",
    "Admin Console",
]


DEFAULT_TARGETS = {
    "api": {
        "p95_ms": 2000,
        "http_failed_rate_pct": 1,
        "page_success_rate_pct": 99,
    },
    "ui": {
        "checks_pass_rate_pct": 100,
        "page_success_rate_pct": 99,
        "navigation_p95_ms": 2000,
        "navigation_p99_ms": 3500,
        "page_p95_ms": 2000,
        "page_p99_ms": 3500,
        "browser_http_failed_rate_pct": 1,
    },
    "web_vitals": {
        "LCP": {
            "target": 2500,
            "unit": "ms",
            "operator": "<",
        },
        "FCP": {
            "target": 1800,
            "unit": "ms",
            "operator": "<",
        },
        "TTFB": {
            "target": 800,
            "unit": "ms",
            "operator": "<",
        },
        "INP": {
            "target": 200,
            "unit": "ms",
            "operator": "<",
        },
        "CLS": {
            "target": 0.10,
            "unit": "",
            "operator": "<",
        },
    },
}


# ============================================================================
# Generic helpers
# ============================================================================

def safe_float(value, default=None):
    """
    Convert a value to float without raising exceptions.
    """
    if value is None:
        return default

    if isinstance(value, bool):
        return default

    try:
        number = float(value)

        if math.isnan(number) or math.isinf(number):
            return default

        return number

    except (TypeError, ValueError):
        return default


def safe_int(value, default=0):
    number = safe_float(value)

    if number is None:
        return default

    return int(number)


def first_value(mapping, *keys, default=None):
    """
    Return the first non-null/non-empty value.
    """
    if not isinstance(mapping, dict):
        return default

    for key in keys:
        if key in mapping:
            value = mapping[key]

            if value is not None and value != "":
                return value

    return default


def nested_value(data, *paths, default=None):
    """
    Read a value from several possible nested paths.

    Example:
        nested_value(data,
                     ("meta", "environment"),
                     ("environment",))
    """

    for path in paths:

        current = data

        try:

            for key in path:
                if not isinstance(current, dict):
                    raise KeyError

                current = current[key]

            if current is not None and current != "":
                return current

        except (KeyError, TypeError):
            continue

    return default


def pct(value):
    """
    Convert rate to percentage.

    Handles:
        0.01 -> 1.00%
        1    -> 1.00%
        25   -> 25.00%
    """

    number = safe_float(value)

    if number is None:
        return None

    if 0 <= number <= 1:
        number *= 100

    return number


def format_number(value, decimals=2):
    number = safe_float(value)

    if number is None:
        return "N/A"

    return f"{number:.{decimals}f}"


def format_ms(value):
    number = safe_float(value)

    if number is None:
        return "N/A"

    return f"{number:.2f} ms"


def format_pct(value):
    number = pct(value)

    if number is None:
        return "N/A"

    return f"{number:.2f}%"


def html_cell(value):
    return escape(str(value if value is not None else "N/A"))


def status_badge(status):
    status = str(status or "N/A").upper()

    css = {
        "PASS": "pass",
        "FAIL": "fail",
        "CHECK": "check",
        "N/A": "na",
    }.get(status, "na")

    return (
        f'<span class="status {css}">'
        f'{escape(status)}'
        f'</span>'
    )


def workload_label(vus, iterations):
    return (
        f"{vus} VU / "
        f"{iterations} iteration"
        f"{'' if iterations == 1 else 's'}"
    )


def parse_workload_from_filename(filename):
    """
    Extract:
        navigation_5vu_5iter.json
        ui_25vu_5iter.json
    """

    match = re.search(
        r"_(\d+)vu_(\d+)iter\.json$",
        filename,
        re.IGNORECASE,
    )

    if not match:
        return {
            "vus": None,
            "iterations": None,
            "label": filename,
        }

    vus = int(match.group(1))
    iterations = int(match.group(2))

    return {
        "vus": vus,
        "iterations": iterations,
        "label": workload_label(vus, iterations),
    }


# ============================================================================
# File loading
# ============================================================================

def load_json(path):
    if not path.exists():
        return None

    try:
        with path.open(
            "r",
            encoding="utf-8",
        ) as handle:

            return json.load(handle)

    except Exception as exc:

        print(
            f"[WARNING] Unable to read "
            f"{path}: {exc}"
        )

        return None


# ============================================================================
# Metadata extraction
# ============================================================================

def extract_infrastructure(all_runs):
    """
    New UI k6 format:
        infrastructure: {
            application_server,
            server_cpu,
            server_memory,
            database,
            db_version,
            network,
            region
        }

    Also supports older:
        meta.infrastructure
        meta.application_server etc.
    """

    keys = [
        "application_server",
        "server_cpu",
        "server_memory",
        "database",
        "db_version",
        "network",
        "region",
    ]

    result = {
        key: "N/A"
        for key in keys
    }

    for data in all_runs:

        infrastructure = nested_value(
            data,
            ("infrastructure",),
            ("meta", "infrastructure"),
            default=None,
        )

        if isinstance(infrastructure, dict):

            for key in keys:

                value = infrastructure.get(key)

                if (
                    value is not None
                    and value != ""
                    and result[key] == "N/A"
                ):
                    result[key] = value

        for key in keys:

            value = nested_value(
                data,
                (key,),
                ("meta", key),
                ("metadata", key),
                default=None,
            )

            if (
                value is not None
                and value != ""
                and result[key] == "N/A"
            ):
                result[key] = value

    return result


def extract_test_machine(all_runs):
    """
    New UI k6 format:
        test_machine: {
            os,
            cpu,
            memory,
            browser,
            browser_version,
            network
        }
    """

    keys = [
        "os",
        "cpu",
        "memory",
        "browser",
        "browser_version",
        "network",
    ]

    result = {
        key: "N/A"
        for key in keys
    }

    for data in all_runs:

        machine = nested_value(
            data,
            ("test_machine",),
            ("meta", "test_machine"),
            default=None,
        )

        if isinstance(machine, dict):

            for key in keys:

                value = machine.get(key)

                if (
                    value is not None
                    and value != ""
                    and result[key] == "N/A"
                ):
                    result[key] = value

        for key in keys:

            value = nested_value(
                data,
                (key,),
                ("meta", key),
                ("metadata", key),
                default=None,
            )

            if (
                value is not None
                and value != ""
                and result[key] == "N/A"
            ):
                result[key] = value

    return result


def extract_document_information(all_runs):
    result = {
        "feature": "Navigation Pages",
        "epic": "Navigation Performance",
        "version_build": "N/A",
        "environment": "N/A",
        "test_date": "N/A",
        "k6_tool": "k6",
        "ui_tool": "k6 Browser",
        "api_tool": "k6",
    }

    for data in all_runs:

        mappings = {
            "feature": [
                ("feature",),
                ("meta", "feature"),
            ],
            "epic": [
                ("epic",),
                ("meta", "epic"),
            ],
            "version_build": [
                ("version_build",),
                ("meta", "version_build"),
            ],
            "environment": [
                ("environment",),
                ("meta", "environment"),
            ],
            "test_date": [
                ("test_date",),
                ("meta", "test_date"),
            ],
        }

        for output_key, paths in mappings.items():

            value = nested_value(
                data,
                *paths,
                default=None,
            )

            if (
                value is not None
                and value != ""
                and result[output_key] == "N/A"
            ):
                result[output_key] = value

    return result


# ============================================================================
# Target extraction
# ============================================================================

def extract_targets(all_runs):
    """
    Read targets from the new UI JSON.

    Falls back to DEFAULT_TARGETS if the value is not available.
    """

    targets = json.loads(
        json.dumps(DEFAULT_TARGETS)
    )

    for data in all_runs:

        performance_targets = nested_value(
                data,
                ("performance_targets",),
                ("meta", "performance_targets"),
                default=None,
            )

        if not isinstance(performance_targets, dict):
            continue

        # ------------------------------------------------------------
        # Functional
        # ------------------------------------------------------------

        functional = performance_targets.get(
            "functional",
            {}
        )

        if isinstance(functional, dict):

            value = functional.get(
                "ui_checks_pass_rate"
            )

            if value is not None:
                number = pct(value)

                if number is not None:
                    targets["ui"][
                        "checks_pass_rate_pct"
                    ] = number

            value = functional.get(
                "ui_page_success_rate"
            )

            if value is not None:
                number = extract_target_number(value)

                if number is not None:
                    targets["ui"][
                        "page_success_rate_pct"
                    ] = number

        # ------------------------------------------------------------
        # UI Navigation
        # ------------------------------------------------------------

        ui_navigation = performance_targets.get(
            "ui_navigation",
            {}
        )

        if isinstance(ui_navigation, dict):

            value = extract_target_number(
                ui_navigation.get("p95")
            )

            if value is not None:
                targets["ui"]["navigation_p95_ms"] = value

            value = extract_target_number(
                ui_navigation.get("p99")
            )

            if value is not None:
                targets["ui"]["navigation_p99_ms"] = value

        # ------------------------------------------------------------
        # UI Page
        # ------------------------------------------------------------

        ui_page = performance_targets.get(
            "ui_page",
            {}
        )

        if isinstance(ui_page, dict):

            value = extract_target_number(
                ui_page.get("p95")
            )

            if value is not None:
                targets["ui"]["page_p95_ms"] = value

            value = extract_target_number(
                ui_page.get("p99")
            )

            if value is not None:
                targets["ui"]["page_p99_ms"] = value

        # ------------------------------------------------------------
        # Browser HTTP
        # ------------------------------------------------------------

        browser_http = performance_targets.get(
            "browser_http",
            {}
        )

        if isinstance(browser_http, dict):

            value = extract_target_number(
                browser_http.get("failed_rate")
            )

            if value is not None:
                targets["ui"][
                    "browser_http_failed_rate_pct"
                ] = value

        # ------------------------------------------------------------
        # API
        # ------------------------------------------------------------

        api = performance_targets.get(
            "api",
            {}
        )

        if isinstance(api, dict):

            value = extract_target_number(
                api.get("p95")
            )

            if value is not None:
                targets["api"]["p95_ms"] = value

            value = extract_target_number(
                api.get("http_failed_rate")
            )

            if value is not None:
                targets["api"][
                    "http_failed_rate_pct"
                ] = value

            value = extract_target_number(
                api.get("page_success_rate")
            )

            if value is not None:
                targets["api"][
                    "page_success_rate_pct"
                ] = value

        # ------------------------------------------------------------
        # Web Vitals
        # ------------------------------------------------------------

        vitals = performance_targets.get(
            "web_vitals",
            {}
        )

        if isinstance(vitals, dict):

            for vital in [
                "LCP",
                "FCP",
                "TTFB",
                "INP",
                "CLS",
            ]:

                value = extract_target_number(
                    vitals.get(vital)
                )

                if value is not None:
                    targets["web_vitals"][
                        vital
                    ]["target"] = value

    return targets


def extract_target_number(value):
    """
    Converts values such as:

        "< 2500 ms"
        ">= 99%"
        "< 0.1"
        2500
        0.10

    into the numeric threshold.
    """

    if value is None:
        return None

    number = safe_float(value)

    if number is not None:
        return number

    text = str(value)

    match = re.search(
        r"[-+]?\d+(?:\.\d+)?",
        text,
    )

    if not match:
        return None

    return safe_float(match.group(0))


# ============================================================================
# Generic metric extraction
# ============================================================================

def metric_values(metric):
    """
    k6 metric formats vary slightly between outputs.

    Supports:
        metric.values
        metric.value
    """

    if not isinstance(metric, dict):
        return {}

    values = metric.get("values")

    if isinstance(values, dict):
        return values

    return metric


def find_metric(data, metric_name):
    metrics = data.get("metrics", {})

    if not isinstance(metrics, dict):
        return None

    if metric_name in metrics:
        return metrics[metric_name]

    return None


def metric_value(
    data,
    metric_name,
    *possible_keys,
):
    metric = find_metric(
        data,
        metric_name
    )

    if not metric:
        return None

    values = metric_values(metric)

    return first_value(
        values,
        *possible_keys,
        default=None,
    )


# ============================================================================
# API metric extraction
# ============================================================================

def endpoint_metric(endpoint, *keys):
    """
    Flexible extraction for endpoint objects.
    """

    if not isinstance(endpoint, dict):
        return None

    return first_value(
        endpoint,
        *keys,
        default=None,
    )


def discover_api_endpoints(data):
    """
    Try multiple known locations used by k6/custom API result files.
    """

    candidates = [
        data.get("endpoint_results"),
        data.get("endpoints"),
        data.get("endpoint_metrics"),
        data.get("api_endpoints"),
        data.get("api_results"),
        data.get("results"),
    ]

    for candidate in candidates:

        if isinstance(candidate, list):
            return candidate

        if isinstance(candidate, dict):

            # Common:
            # {
            #   "endpoint": {...},
            #   ...
            # }

            rows = []

            for key, value in candidate.items():

                if isinstance(value, dict):

                    row = dict(value)

                    if not row.get("endpoint"):
                        row["endpoint"] = key

                    rows.append(row)

            if rows:
                return rows

    return []


def infer_page(endpoint):
    page = endpoint_metric(
        endpoint,
        "page",
        "page_name",
        "navigation_page",
    )

    if page:
        return str(page)

    endpoint_text = str(
        endpoint_metric(
            endpoint,
            "endpoint",
            "url",
            "path",
            "api_name",
            "name",
            default="",
        )
    )

    endpoint_lower = endpoint_text.lower()

    mapping = [
        ("projects", "Projects"),
        ("resources", "Workforce"),
        ("workforce", "Workforce"),
        ("scheduling", "Scheduling"),
        ("reports", "Reports"),
        ("insights", "Insights"),
        ("admin", "Admin Console"),
        ("actions", "My Actions"),
    ]

    for keyword, page_name in mapping:

        if keyword in endpoint_lower:
            return page_name

    return "Unmapped"


def infer_endpoint_name(endpoint):
    return str(
        endpoint_metric(
            endpoint,
            "api_name",
            "api",
            "name",
            "endpoint",
            "path",
            "url",
            default="N/A",
        )
    )


def infer_endpoint_path(endpoint):
    return str(
        endpoint_metric(
            endpoint,
            "endpoint",
            "path",
            "url",
            "request_url",
            default="N/A",
        )
    )


def infer_method(endpoint):
    return str(
        endpoint_metric(
            endpoint,
            "method",
            "http_method",
            "httpMethod",
            default="N/A",
        )
    ).upper()


def calculate_status(
    p95,
    error_pct,
    target_p95,
    target_error_pct,
):
    """
    Endpoint PASS / FAIL.

    FAIL:
        errors >= target
        OR p95 >= target

    PASS:
        errors below target
        AND p95 below target
    """

    if p95 is None and error_pct is None:
        return "N/A"

    if (
        error_pct is not None
        and error_pct >= target_error_pct
    ):
        return "FAIL"

    if (
        p95 is not None
        and p95 >= target_p95
    ):
        return "FAIL"

    if (
        p95 is not None
        or error_pct is not None
    ):
        return "PASS"

    return "N/A"


def build_api_endpoint_rows(
    api_runs,
    targets,
):
    """
    Desired output:

    Page
    API Name
    Endpoint
    Workload
    Metric
    Requests
    Time Taken
    Error %
    RPS
    Status
    """

    rows = []

    for run in api_runs:

        workload = run["workload"]

        data = run["data"]

        endpoints =
            discover_api_endpoints(data)

        # ------------------------------------------------------------
        # Endpoint-level data available
        # ------------------------------------------------------------

        for endpoint in endpoints:

            page =
                infer_page(endpoint)

            api_name =
                infer_endpoint_name(endpoint)

            endpoint_path =
                infer_endpoint_path(endpoint)

            method =
                infer_method(endpoint)

            requests =
                endpoint_metric(
                    endpoint,
                    "requests",
                    "request_count",
                    "count",
                    "total_requests",
                )

            requests =
                safe_int(
                    requests,
                    default=0,
                )

            p50 =
                safe_float(
                    endpoint_metric(
                        endpoint,
                        "p50",
                        "p50_ms",
                        "avg_p50",
                    )
                )

            p90 =
                safe_float(
                    endpoint_metric(
                        endpoint,
                        "p90",
                        "p90_ms",
                    )
                )

            p95 =
                safe_float(
                    endpoint_metric(
                        endpoint,
                        "p95",
                        "p95_ms",
                    )
                )

            p99 =
                safe_float(
                    endpoint_metric(
                        endpoint,
                        "p99",
                        "p99_ms",
                    )
                )

            maximum =
                safe_float(
                    endpoint_metric(
                        endpoint,
                        "max",
                        "max_ms",
                        "maximum",
                    )
                )

            error_pct =
                pct(
                    endpoint_metric(
                        endpoint,
                        "error_rate_pct",
                        "error_pct",
                        "error_rate",
                        "failed_rate",
                    )
                )

            rps =
                safe_float(
                    endpoint_metric(
                        endpoint,
                        "rps",
                        "requests_per_second",
                    )
                )

            status =
                calculate_status(
                    p95,
                    error_pct,
                    targets["api"]["p95_ms"],
                    targets["api"][
                        "http_failed_rate_pct"
                    ],
                )

            metric_map = [
                ("p50", p50),
                ("p90", p90),
                ("p95", p95),
                ("p99", p99),
                ("max", maximum),
            ]

            for metric_name, value in metric_map:

                if value is None:
                    continue

                rows.append(
                    {
                        "page": page,
                        "api_name": api_name,
                        "endpoint": (
                            f"{method} "
                            f"{endpoint_path}"
                            if method != "N/A"
                            else endpoint_path
                        ),
                        "method": method,
                        "workload": workload["label"],
                        "metric": metric_name,
                        "requests": requests,
                        "time_taken_ms": value,
                        "error_pct": error_pct,
                        "rps": rps,
                        "status": status,
                    }
                )

    return rows


# ============================================================================
# API overall metrics
# ============================================================================

def extract_api_overall(api_runs):
    rows = []

    for run in api_runs:

        data = run["data"]

        workload = run["workload"]

        http_requests =
            metric_value(
                data,
                "http_reqs",
                "count",
            )

        failed_rate =
            metric_value(
                data,
                "http_req_failed",
                "rate",
            )

        duration =
            find_metric(
                data,
                "http_req_duration",
            )

        duration_values =
            metric_values(duration)

        avg =
            safe_float(
                first_value(
                    duration_values,
                    "avg",
                )
            )

        p90 =
            safe_float(
                first_value(
                    duration_values,
                    "p(90)",
                    "p90",
                )
            )

        p95 =
            safe_float(
                first_value(
                    duration_values,
                    "p(95)",
                    "p95",
                )
            )

        p99 =
            safe_float(
                first_value(
                    duration_values,
                    "p(99)",
                    "p99",
                )
            )

        maximum =
            safe_float(
                first_value(
                    duration_values,
                    "max",
                )
            )

        failed_pct =
            pct(failed_rate)

        rps = None

        if duration:
            # http_reqs may expose rate.
            http_reqs_metric =
                find_metric(
                    data,
                    "http_reqs",
                )

            if http_reqs_metric:

                values =
                    metric_values(
                        http_reqs_metric
                    )

                rps =
                    safe_float(
                        first_value(
                            values,
                            "rate",
                        )
                    )

        page_success =
            metric_value(
                data,
                "page_success_rate",
                "rate",
            )

        page_success_pct =
            pct(page_success)

        status = "PASS"

        if (
            failed_pct is not None
            and failed_pct >= 1
        ):
            status = "FAIL"

        if (
            p95 is not None
            and p95 >= 2000
        ):
            status = "FAIL"

        rows.append(
            {
                "workload": workload["label"],
                "requests": safe_int(
                    http_requests,
                    0,
                ),
                "failed_pct": failed_pct,
                "page_success_pct":
                    page_success_pct,
                "avg": avg,
                "p90": p90,
                "p95": p95,
                "p99": p99,
                "max": maximum,
                "rps": rps,
                "status": status,
            }
        )

    return rows


# ============================================================================
# UI metric extraction
# ============================================================================

def extract_ui_metric(
    data,
    metric_name,
):
    metric =
        find_metric(
            data,
            metric_name,
        )

    if not metric:
        return {}

    return metric_values(metric)


def build_ui_overall(ui_runs):
    rows = []

    for run in ui_runs:

        data = run["data"]

        workload = run["workload"]

        checks =
            extract_ui_metric(
                data,
                "checks",
            )

        ui_success =
            extract_ui_metric(
                data,
                "ui_page_success_rate",
            )

        ui_navigation =
            extract_ui_metric(
                data,
                "ui_navigation_duration",
            )

        ui_page =
            extract_ui_metric(
                data,
                "ui_page_duration",
            )

        browser_failed =
            extract_ui_metric(
                data,
                "browser_http_req_failed",
            )

        rows.append(
            {
                "workload":
                    workload["label"],

                "checks_pass_rate":
                    pct(
                        checks.get("rate")
                    ),

                "ui_page_success_rate":
                    pct(
                        ui_success.get("rate")
                    ),

                "browser_http_failed_rate":
                    pct(
                        browser_failed.get("rate")
                    ),

                "ui_navigation_avg":
                    safe_float(
                        ui_navigation.get("avg")
                    ),

                "ui_navigation_p95":
                    safe_float(
                        ui_navigation.get("p(95)")
                    ),

                "ui_navigation_p99":
                    safe_float(
                        ui_navigation.get("p(99)")
                    ),

                "ui_page_avg":
                    safe_float(
                        ui_page.get("avg")
                    ),

                "ui_page_p95":
                    safe_float(
                        ui_page.get("p(95)")
                    ),

                "ui_page_p99":
                    safe_float(
                        ui_page.get("p(99)")
                    ),
            }
        )

    return rows


# ============================================================================
# Page-level UI duration rows
# ============================================================================

def build_ui_page_rows(ui_runs):
    rows = []

    for run in ui_runs:

        data = run["data"]

        workload =
            run["workload"]["label"]

        metric =
            find_metric(
                data,
                "ui_page_duration",
            )

        if not metric:
            continue

        values =
            metric_values(metric)

        # New k6 summary may expose aggregate values.
        # Page-level values can also be represented through
        # submetrics or custom metrics.

        for page in PAGE_LABELS:

            page_metric_names = [
                f"ui_page_duration_{sanitize_metric_name(page)}",
                f"ui_page_{sanitize_metric_name(page)}_duration",
            ]

            page_metric = None

            for name in page_metric_names:

                candidate =
                    find_metric(
                        data,
                        name,
                    )

                if candidate:
                    page_metric = candidate
                    break

            if page_metric:

                page_values =
                    metric_values(
                        page_metric
                    )

                rows.append(
                    {
                        "page": page,
                        "workload": workload,
                        "avg":
                            safe_float(
                                page_values.get(
                                    "avg"
                                )
                            ),
                        "p95":
                            safe_float(
                                page_values.get(
                                    "p(95)"
                                )
                            ),
                        "p99":
                            safe_float(
                                page_values.get(
                                    "p(99)"
                                )
                            ),
                    }
                )

    return rows


# ============================================================================
# Web Vital extraction
# ============================================================================

def sanitize_metric_name(value):
    return re.sub(
        r"[^a-z0-9]+",
        "_",
        value.lower(),
    ).strip("_")


def find_page_vital_metric(
    data,
    page,
    vital,
):
    """
    Matches metrics created by the updated UI script:

        web_vital_lcp_my_actions
        web_vital_lcp_projects
        web_vital_fcp_projects
        etc.
    """

    vital_map = {
        "LCP": "lcp",
        "FCP": "fcp",
        "TTFB": "ttfb",
        "INP": "inp",
        "CLS": "cls",
    }

    vital_key =
        vital_map[vital]

    safe_page =
        sanitize_metric_name(page)

    candidates = [

        f"web_vital_{vital_key}_{safe_page}",

        f"ui_{safe_page}_{vital_key}",

        f"{safe_page}_{vital_key}",

    ]

    for metric_name in candidates:

        metric =
            find_metric(
                data,
                metric_name,
            )

        if metric:
            return metric

    return None


def build_ui_web_vital_rows(
    ui_runs,
    targets,
):
    rows = []

    for run in ui_runs:

        data = run["data"]

        workload =
            run["workload"]["label"]

        for page in PAGE_LABELS:

            for vital in [
                "LCP",
                "FCP",
                "TTFB",
                "INP",
                "CLS",
            ]:

                metric =
                    find_page_vital_metric(
                        data,
                        page,
                        vital,
                    )

                if not metric:
                    continue

                values =
                    metric_values(metric)

                p95 =
                    safe_float(
                        values.get(
                            "p(95)"
                        )
                    )

                if p95 is None:
                    continue

                target_info =
                    targets["web_vitals"][
                        vital
                    ]

                target =
                    target_info["target"]

                operator =
                    target_info["operator"]

                passed =
                    p95 < target

                rows.append(
                    {
                        "page": page,
                        "workload": workload,
                        "vital": vital,
                        "p95": p95,
                        "target": target,
                        "operator": operator,
                        "unit":
                            target_info["unit"],
                        "status":
                            "PASS"
                            if passed
                            else "FAIL",
                    }
                )

    return rows


# ============================================================================
# UI native aggregate Web Vital fallback
# ============================================================================

def build_aggregate_web_vital_rows(
    ui_runs,
    targets,
):
    """
    Fallback for native k6 browser metrics.

    These rows intentionally use Page = "All Pages"
    because native aggregate browser metrics do not
    provide page attribution.
    """

    rows = []

    metric_map = {
        "LCP": "browser_web_vital_lcp",
        "FCP": "browser_web_vital_fcp",
        "TTFB": "browser_web_vital_ttfb",
        "INP": "browser_web_vital_inp",
        "CLS": "browser_web_vital_cls",
    }

    for run in ui_runs:

        data = run["data"]

        workload =
            run["workload"]["label"]

        for vital, metric_name in metric_map.items():

            metric =
                find_metric(
                    data,
                    metric_name,
                )

            if not metric:
                continue

            values =
                metric_values(metric)

            p95 =
                safe_float(
                    values.get(
                        "p(95)"
                    )
                )

            if p95 is None:
                continue

            target =
                targets["web_vitals"][
                    vital
                ]["target"]

            passed =
                p95 < target

            rows.append(
                {
                    "page": "All Pages",
                    "workload": workload,
                    "vital": vital,
                    "p95": p95,
                    "target": target,
                    "operator": "<",
                    "unit":
                        targets["web_vitals"][
                            vital
                        ]["unit"],
                    "status":
                        "PASS"
                        if passed
                        else "FAIL",
                }
            )

    return rows


# ============================================================================
# UI functional summary
# ============================================================================

def calculate_ui_functional_status(
    row,
    targets,
):
    checks =
        row.get(
            "checks_pass_rate"
        )

    page_success =
        row.get(
            "ui_page_success_rate"
        )

    browser_failed =
        row.get(
            "browser_http_failed_rate"
        )

    if checks is not None:
        if checks < targets["ui"][
            "checks_pass_rate_pct"
        ]:
            return "FAIL"

    if page_success is not None:
        if page_success < targets["ui"][
            "page_success_rate_pct"
        ]:
            return "FAIL"

    if browser_failed is not None:
        if browser_failed >= targets["ui"][
            "browser_http_failed_rate_pct"
        ]:
            return "FAIL"

    return "PASS"


# ============================================================================
# Report data
# ============================================================================

def build_report():

    RESULTS_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    api_runs = []
    ui_runs = []

    # ------------------------------------------------------------------------
    # Load API files
    # ------------------------------------------------------------------------

    for filename in API_FILES:

        path =
            RESULTS_DIR / filename

        data =
            load_json(path)

        if data is None:
            print(
                f"[WARNING] Missing API result: "
                f"{path}"
            )
            continue

        api_runs.append(
            {
                "file": filename,
                "path": str(path),
                "data": data,
                "workload":
                    parse_workload_from_filename(
                        filename
                    ),
            }
        )

    # ------------------------------------------------------------------------
    # Load UI files
    # ------------------------------------------------------------------------

    for filename in UI_FILES:

        path =
            RESULTS_DIR / filename

        data =
            load_json(path)

        if data is None:
            print(
                f"[WARNING] Missing UI result: "
                f"{path}"
            )
            continue

        ui_runs.append(
            {
                "file": filename,
                "path": str(path),
                "data": data,
                "workload":
                    parse_workload_from_filename(
                        filename
                    ),
            }
        )

    all_runs = [
        item["data"]
        for item in (
            api_runs + ui_runs
        )
    ]

    document_information =
        extract_document_information(
            all_runs
        )

    infrastructure =
        extract_infrastructure(
            all_runs
        )

    test_machine =
        extract_test_machine(
            all_runs
        )

    targets =
        extract_targets(
            all_runs
        )

    api_endpoint_rows =
        build_api_endpoint_rows(
            api_runs,
            targets,
        )

    api_overall =
        extract_api_overall(
            api_runs
        )

    ui_overall =
        build_ui_overall(
            ui_runs
        )

    ui_page_rows =
        build_ui_page_rows(
            ui_runs
        )

    ui_web_vital_rows =
        build_ui_web_vital_rows(
            ui_runs,
            targets,
        )

    # Use aggregate native metrics only if no
    # page-level Web Vital metrics were found.

    if not ui_web_vital_rows:

        ui_web_vital_rows =
            build_aggregate_web_vital_rows(
                ui_runs,
                targets,
            )

    for row in ui_overall:

        row["status"] =
            calculate_ui_functional_status(
                row,
                targets,
            )

    return {

        "report": {
            "name":
                "Navigation Performance Report",

            "generated_at":
                datetime.now().isoformat(
                    timespec="seconds"
                ),

            "charts":
                False,
        },

        "document_information":
            document_information,

        "infrastructure":
            infrastructure,

        "test_machine":
            test_machine,

        "performance_targets":
            targets,

        "workloads": [
            {
                "vus": 1,
                "iterations": 1,
                "label":
                    "1 VU / 1 iteration",
            },
            {
                "vus": 1,
                "iterations": 5,
                "label":
                    "1 VU / 5 iterations",
            },
            {
                "vus": 5,
                "iterations": 5,
                "label":
                    "5 VU / 5 iterations",
            },
            {
                "vus": 25,
                "iterations": 5,
                "label":
                    "25 VU / 5 iterations",
            },
        ],

        "api": {

            "result_files":
                [
                    run["file"]
                    for run in api_runs
                ],

            "overall":
                api_overall,

            "endpoint_metrics":
                api_endpoint_rows,

        },

        "ui": {

            "result_files":
                [
                    run["file"]
                    for run in ui_runs
                ],

            "overall":
                ui_overall,

            "page_metrics":
                ui_page_rows,

            "web_vitals":
                ui_web_vital_rows,

        },

    }


# ============================================================================
# HTML
# ============================================================================

CSS = """
body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 30px;
    background: #f5f6f8;
    color: #222;
}

.container {
    max-width: 1700px;
    margin: auto;
}

h1 {
    margin-bottom: 5px;
}

h2 {
    margin-top: 35px;
    border-bottom: 2px solid #ddd;
    padding-bottom: 8px;
}

h3 {
    margin-top: 25px;
}

.subtitle {
    color: #666;
    margin-bottom: 25px;
}

.card-grid {
    display: grid;
    grid-template-columns:
        repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin: 20px 0;
}

.card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 18px;
}

.card-title {
    font-size: 13px;
    color: #666;
    margin-bottom: 8px;
}

.card-value {
    font-size: 20px;
    font-weight: bold;
}

table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    margin: 12px 0 25px 0;
}

th {
    background: #e9ecef;
    text-align: left;
    padding: 9px;
    border: 1px solid #ccc;
    white-space: nowrap;
}

td {
    padding: 8px;
    border: 1px solid #ddd;
    vertical-align: top;
}

tr:nth-child(even) {
    background: #fafafa;
}

.status {
    display: inline-block;
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
}

.status.pass {
    background: #d9f2df;
}

.status.fail {
    background: #f8d7da;
}

.status.check {
    background: #fff3cd;
}

.status.na {
    background: #e9ecef;
}

.callout {
    background: white;
    border: 1px solid #ddd;
    border-left: 5px solid #555;
    padding: 15px;
    margin: 20px 0;
}

.target-table td:first-child {
    font-weight: bold;
}

.small {
    color: #666;
    font-size: 12px;
}

pre {
    white-space: pre-wrap;
}
"""


def table(headers, rows):
    html = [
        "<table>",
        "<thead>",
        "<tr>",
    ]

    for header in headers:
        html.append(
            f"<th>{html_cell(header)}</th>"
        )

    html.extend([
        "</tr>",
        "</thead>",
        "<tbody>",
    ])

    for row in rows:

        html.append("<tr>")

        for value in row:

            if isinstance(value, dict) and \
               value.get("__status__"):

                html.append(
                    f"<td>{status_badge(value['__status__'])}</td>"
                )

            else:

                html.append(
                    f"<td>{html_cell(value)}</td>"
                )

        html.append("</tr>")

    html.extend([
        "</tbody>",
        "</table>",
    ])

    return "\n".join(html)


def render_target_table(targets):

    rows = []

    rows.append(
        [
            "Category",
            "Target",
            "Requirement",
        ]
    )

    rows = []

    rows.append(
        [
            "API",
            "HTTP response p95",
            f"< {targets['api']['p95_ms']} ms",
        ]
    )

    rows.append(
        [
            "API",
            "HTTP failed rate",
            f"< {targets['api']['http_failed_rate_pct']}%",
        ]
    )

    rows.append(
        [
            "API",
            "Page success rate",
            f">= {targets['api']['page_success_rate_pct']}%",
        ]
    )

    rows.append(
        [
            "UI",
            "Checks pass rate",
            f">= {targets['ui']['checks_pass_rate_pct']}%",
        ]
    )

    rows.append(
        [
            "UI",
            "Page success rate",
            f">= {targets['ui']['page_success_rate_pct']}%",
        ]
    )

    rows.append(
        [
            "UI",
            "Navigation p95",
            f"< {targets['ui']['navigation_p95_ms']} ms",
        ]
    )

    rows.append(
        [
            "UI",
            "Navigation p99",
            f"< {targets['ui']['navigation_p99_ms']} ms",
        ]
    )

    rows.append(
        [
            "UI",
            "Page p95",
            f"< {targets['ui']['page_p95_ms']} ms",
        ]
    )

    rows.append(
        [
            "UI",
            "Page p99",
            f"< {targets['ui']['page_p99_ms']} ms",
        ]
    )

    rows.append(
        [
            "UI",
            "Browser HTTP failed rate",
            f"< {targets['ui']['browser_http_failed_rate_pct']}%",
        ]
    )

    for vital in [
        "LCP",
        "FCP",
        "TTFB",
        "INP",
        "CLS",
    ]:

        info =
            targets["web_vitals"][vital]

        unit =
            f" {info['unit']}" \
            if info["unit"] \
            else ""

        rows.append(
            [
                "Web Vital",
                vital,
                f"{info['operator']} "
                f"{info['target']}"
                f"{unit}",
            ]
        )

    return table(
        [
            "Category",
            "Metric",
            "Target",
        ],
        rows,
    )


def render_report(report):

    doc =
        report["document_information"]

    targets =
        report["performance_targets"]

    infrastructure =
        report["infrastructure"]

    machine =
        report["test_machine"]

    html = f"""
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Navigation Performance Report</title>
<style>
{CSS}
</style>
</head>

<body>

<div class="container">

<h1>Navigation Performance Report</h1>

<div class="subtitle">
Generated:
{html_cell(report["report"]["generated_at"])}
</div>


<!-- =================================================================== -->
<!-- Document Information -->
<!-- =================================================================== -->

<h2>1. Document Information</h2>

{table(
    ["Field", "Value"],
    [
        ["Feature", doc["feature"]],
        ["Epic", doc["epic"]],
        ["Version / Build", doc["version_build"]],
        ["Environment", doc["environment"]],
        ["Test Date", doc["test_date"]],
        ["Performance Tool", doc["k6_tool"]],
        ["UI Tool", doc["ui_tool"]],
        ["API Tool", doc["api_tool"]],
    ],
)}


<!-- =================================================================== -->
<!-- Performance Targets -->
<!-- =================================================================== -->

<h2>2. Performance Targets</h2>

<div class="callout">
<strong>Performance targets used for this report</strong>
<br><br>
The report evaluates API, UI functional, UI navigation,
browser HTTP and Web Vital targets.
</div>

{render_target_table(targets)}


<!-- =================================================================== -->
<!-- Infrastructure -->
<!-- =================================================================== -->

<h2>3. Infrastructure</h2>

{table(
    ["Attribute", "Value"],
    [
        [
            "Application Server",
            infrastructure["application_server"],
        ],
        [
            "Server CPU",
            infrastructure["server_cpu"],
        ],
        [
            "Server Memory",
            infrastructure["server_memory"],
        ],
        [
            "Database",
            infrastructure["database"],
        ],
        [
            "Database Version",
            infrastructure["db_version"],
        ],
        [
            "Network",
            infrastructure["network"],
        ],
        [
            "Region",
            infrastructure["region"],
        ],
    ],
)}


<!-- =================================================================== -->
<!-- Test Machine -->
<!-- =================================================================== -->

<h2>4. Test Machine</h2>

{table(
    ["Attribute", "Value"],
    [
        ["Operating System", machine["os"]],
        ["CPU", machine["cpu"]],
        ["Memory", machine["memory"]],
        ["Browser", machine["browser"]],
        ["Browser Version", machine["browser_version"]],
        ["Network", machine["network"]],
    ],
)}


<!-- =================================================================== -->
<!-- Workloads -->
<!-- =================================================================== -->

<h2>5. Workload Configuration</h2>

{table(
    ["Workload", "VUs", "Iterations / VU"],
    [
        [
            item["label"],
            item["vus"],
            item["iterations"],
        ]
        for item in report["workloads"]
    ],
)}


<!-- =================================================================== -->
<!-- API Overall -->
<!-- =================================================================== -->

<h2>6. API Performance Results</h2>

<h3>6.1 API Overall Performance</h3>

{table(
    [
        "Workload",
        "Requests",
        "HTTP Failed %",
        "Page Success %",
        "Avg",
        "p90",
        "p95",
        "p99",
        "Max",
        "RPS",
        "Status",
    ],
    [
        [
            row["workload"],
            row["requests"],
            format_pct(row["failed_pct"]),
            format_pct(row["page_success_pct"]),
            format_ms(row["avg"]),
            format_ms(row["p90"]),
            format_ms(row["p95"]),
            format_ms(row["p99"]),
            format_ms(row["max"]),
            format_number(row["rps"]),
            {
                "__status__":
                    row["status"]
            },
        ]
        for row in report["api"]["overall"]
    ],
)}


<!-- =================================================================== -->
<!-- API Endpoint -->
<!-- =================================================================== -->

<h3>6.2 API Endpoint-Level Traceability</h3>

<div class="small">
Each endpoint is retained separately for each workload.
Time Taken is the response-time value for the Metric column.
</div>

{table(
    [
        "Page",
        "API Name",
        "Endpoint",
        "Workload",
        "Metric",
        "Requests",
        "Time Taken",
        "Error %",
        "RPS",
        "Status",
    ],
    [
        [
            row["page"],
            row["api_name"],
            row["endpoint"],
            row["workload"],
            row["metric"],
            row["requests"],
            format_ms(row["time_taken_ms"]),
            format_pct(row["error_pct"]),
            format_number(row["rps"]),
            {
                "__status__":
                    row["status"]
            },
        ]
        for row in report["api"]["endpoint_metrics"]
    ],
)}


<!-- =================================================================== -->
<!-- UI Overall -->
<!-- =================================================================== -->

<h2>7. UI Performance Results</h2>

<h3>7.1 UI Functional and Performance Summary</h3>

{table(
    [
        "Workload",
        "Checks Pass %",
        "UI Page Success %",
        "Browser HTTP Failed %",
        "Navigation Avg",
        "Navigation p95",
        "Navigation p99",
        "Page Avg",
        "Page p95",
        "Page p99",
        "Status",
    ],
    [
        [
            row["workload"],
            format_pct(row["checks_pass_rate"]),
            format_pct(row["ui_page_success_rate"]),
            format_pct(row["browser_http_failed_rate"]),
            format_ms(row["ui_navigation_avg"]),
            format_ms(row["ui_navigation_p95"]),
            format_ms(row["ui_navigation_p99"]),
            format_ms(row["ui_page_avg"]),
            format_ms(row["ui_page_p95"]),
            format_ms(row["ui_page_p99"]),
            {
                "__status__":
                    row["status"]
            },
        ]
        for row in report["ui"]["overall"]
    ],
)}


<!-- =================================================================== -->
<!-- UI Web Vitals -->
<!-- =================================================================== -->

<h3>7.2 Page-Level Web Vitals</h3>

<div class="small">
Page attribution comes from the page-specific Web Vital metrics
generated by the UI k6 script.
</div>

{table(
    [
        "Page",
        "Workload",
        "Vital",
        "p95",
        "Target",
        "Status",
    ],
    [
        [
            row["page"],
            row["workload"],
            row["vital"],
            (
                f"{format_number(row['p95'])}"
                f"{' ms' if row['unit'] == 'ms' else ''}"
            ),
            (
                f"{row['operator']} "
                f"{format_number(row['target'])}"
                f"{' ms' if row['unit'] == 'ms' else ''}"
            ),
            {
                "__status__":
                    row["status"]
            },
        ]
        for row in report["ui"]["web_vitals"]
    ],
)}


<!-- =================================================================== -->
<!-- UI Page Metrics -->
<!-- =================================================================== -->

<h3>7.3 UI Page Navigation Metrics</h3>

{table(
    [
        "Page",
        "Workload",
        "Average",
        "p95",
        "p99",
    ],
    [
        [
            row["page"],
            row["workload"],
            format_ms(row["avg"]),
            format_ms(row["p95"]),
            format_ms(row["p99"]),
        ]
        for row in report["ui"]["page_metrics"]
    ],
)}


<!-- =================================================================== -->
<!-- Execution Summary -->
<!-- =================================================================== -->

<h2>8. Execution Summary</h2>

{table(
    [
        "Area",
        "Result Files",
        "Workloads",
    ],
    [
        [
            "API",
            len(report["api"]["result_files"]),
            "4 configured workloads",
        ],
        [
            "UI",
            len(report["ui"]["result_files"]),
            "4 configured workloads",
        ],
    ],
)}


<!-- =================================================================== -->
<!-- Performance Information -->
<!-- =================================================================== -->

<h2>9. Performance Information</h2>

{table(
    [
        "Metric",
        "Meaning",
    ],
    [
        [
            "p50",
            "Median response time; 50% of requests completed within this time.",
        ],
        [
            "p90",
            "90% of requests completed within this time.",
        ],
        [
            "p95",
            "95% of requests completed within this time; primary SLA/SLO comparison metric.",
        ],
        [
            "p99",
            "99% of requests completed within this time; captures tail latency.",
        ],
        [
            "Max",
            "Maximum observed response time.",
        ],
        [
            "Error %",
            "Percentage of failed requests.",
        ],
        [
            "RPS",
            "Requests processed per second.",
        ],
        [
            "UI Page Success %",
            "Percentage of UI pages that completed their functional readiness checks.",
        ],
        [
            "Browser HTTP Failed %",
            "Percentage of browser HTTP requests reported as failed.",
        ],
        [
            "Web Vitals",
            "Browser experience metrics measured per page where page attribution is available.",
        ],
    ],
)}


<!-- =================================================================== -->
<!-- Source Files -->
<!-- =================================================================== -->

<h2>10. Source Result Files</h2>

{table(
    [
        "Area",
        "Files",
    ],
    [
        [
            "API",
            "<br>".join(
                html_cell(x)
                for x in report["api"]["result_files"]
            ),
        ],
        [
            "UI",
            "<br>".join(
                html_cell(x)
                for x in report["ui"]["result_files"]
            ),
        ],
    ],
)}

<p class="small">
No charts or graphs are included in this report.
</p>

</div>

</body>
</html>
"""

    return html


# ============================================================================
# Main
# ============================================================================

def main():

    print(
        "============================================================"
    )

    print(
        "Building Navigation Performance Report"
    )

    print(
        "============================================================"
    )

    report =
        build_report()

    # ------------------------------------------------------------------------
    # JSON
    # ------------------------------------------------------------------------

    with OUTPUT_JSON.open(
        "w",
        encoding="utf-8",
    ) as handle:

        json.dump(
            report,
            handle,
            indent=2,
            ensure_ascii=False,
        )

    # ------------------------------------------------------------------------
    # HTML
    # ------------------------------------------------------------------------

    html =
        render_report(
            report
        )

    with OUTPUT_HTML.open(
        "w",
        encoding="utf-8",
    ) as handle:

        handle.write(html)

    print("")
    print(
        f"[PASS] JSON report: "
        f"{OUTPUT_JSON}"
    )

    print(
        f"[PASS] HTML report: "
        f"{OUTPUT_HTML}"
    )

    print("")

    print(
        f"API endpoint rows: "
        f"{len(report['api']['endpoint_metrics'])}"
    )

    print(
        f"UI Web Vital rows: "
        f"{len(report['ui']['web_vitals'])}"
    )

    print(
        f"UI page metric rows: "
        f"{len(report['ui']['page_metrics'])}"
    )

    print("")

    print(
        "============================================================"
    )

    print(
        "Report generation complete"
    )

    print(
        "============================================================"
    )


if __name__ == "__main__":
    main()
