from __future__ import annotations

import json
import math
import re
from datetime import datetime, timezone
from html import escape
from pathlib import Path
from typing import Any


# ============================================================
# PATHS
# ============================================================

RESULTS_DIR = Path(__file__).resolve().parent

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

EXPECTED_FILES = API_FILES + UI_FILES

OUTPUT_JSON = RESULTS_DIR / "navigation_summary.json"
OUTPUT_HTML = RESULTS_DIR / "navigation_summary.html"
OUTPUT_COMPARISON_HTML = RESULTS_DIR / "navigation_comparison.html"


# ============================================================
# DEFAULT TARGETS
# ============================================================

DEFAULT_API_TARGETS = {
    "http_failure_rate_pct": 1.0,
    "page_success_rate_pct": 99.0,
    "checks_success_rate_pct": 99.0,
    "p95_ms": 2000.0,
    "p99_ms": 2000.0,
}

DEFAULT_UI_TARGETS = {
    "checks_success_rate_pct": 100.0,
    "page_success_rate_pct": 99.0,
    "browser_http_failure_rate_pct": 1.0,
    "navigation_p95_ms": 2000.0,
    "navigation_p99_ms": 3500.0,
}

WEB_VITAL_TARGETS = {
    "FCP": 1800.0,
    "LCP": 2500.0,
    "INP": 200.0,
    "CLS": 0.10,
    "TBT": 300.0,
    "TTFB": 800.0,
}


# ============================================================
# SENSITIVE DATA REDACTION
# ============================================================

SENSITIVE_KEY_PARTS = {
    "cookie",
    "authorization",
    "auth",
    "token",
    "access_token",
    "refresh_token",
    "session",
    "session_id",
    "password",
    "secret",
    "storage_state",
    "storagestate",
}

SENSITIVE_URL_PATTERN = re.compile(
    r"([?&](?:token|access_token|refresh_token|session|session_id|"
    r"password|secret|authorization|auth|cookie|storage_state|"
    r"storageState)=)[^&#\s]+",
    flags=re.IGNORECASE,
)


def is_sensitive_key(key: str) -> bool:
    key_lower = str(key).lower().replace("-", "_")
    return any(part in key_lower for part in SENSITIVE_KEY_PARTS)


def redact_sensitive(value: Any, key: str = "") -> Any:
    if is_sensitive_key(key):
        return "[REDACTED]"

    if isinstance(value, dict):
        return {
            k: redact_sensitive(v, str(k))
            for k, v in value.items()
            if not is_sensitive_key(str(k))
        }

    if isinstance(value, list):
        return [redact_sensitive(v, key) for v in value]

    if isinstance(value, str):
        return SENSITIVE_URL_PATTERN.sub(
            r"\1[REDACTED]",
            value,
        )

    return value


# ============================================================
# GENERIC HELPERS
# ============================================================

def load_json(path: Path) -> dict[str, Any] | None:
    if not path.exists():
        return None

    try:
        with path.open("r", encoding="utf-8") as handle:
            data = json.load(handle)

        if isinstance(data, dict):
            return redact_sensitive(data)

        print(f"[WARN] {path.name}: JSON root is not an object.")
        return None

    except Exception as exc:
        print(f"[WARN] Could not read {path.name}: {exc}")
        return None


def num(value: Any, default: float | None = None) -> float | None:
    if value is None or isinstance(value, bool):
        return default

    try:
        result = float(value)

        if math.isnan(result) or math.isinf(result):
            return default

        return result

    except (TypeError, ValueError):
        return default


def integer(value: Any, default: int = 0) -> int:
    n = num(value)

    if n is None:
        return default

    return int(n)


def first(
    data: dict[str, Any],
    *keys: str,
    default: Any = None,
) -> Any:
    """
    Return the first non-empty/non-None value.
    Empty strings do not override a valid fallback.
    """

    for key in keys:
        if key not in data:
            continue

        value = data[key]

        if value is None:
            continue

        if isinstance(value, str) and not value.strip():
            continue

        return value

    return default


def nested(
    data: dict[str, Any],
    *paths: tuple[str, ...],
    default: Any = None,
) -> Any:

    for path in paths:
        current: Any = data

        try:
            for key in path:
                if not isinstance(current, dict):
                    raise KeyError(key)

                current = current[key]

            if current is not None:
                return current

        except (KeyError, TypeError):
            continue

    return default


def fmt_num(value: Any, decimals: int = 2) -> str:
    n = num(value)

    if n is None:
        return "N/A"

    if abs(n - round(n)) < 1e-9:
        return str(int(round(n)))

    return f"{n:.{decimals}f}"


def fmt_pct(value: Any, decimals: int = 2) -> str:
    n = num(value)

    if n is None:
        return "N/A"

    return f"{n:.{decimals}f}%"


def fmt_ms(value: Any, decimals: int = 2) -> str:
    n = num(value)

    if n is None:
        return "N/A"

    return f"{n:.{decimals}f} ms"


def normalize_percentage(value: Any) -> float | None:
    """
    Normalize percentage values.

    Examples:
        99     -> 99
        0.99   -> 99
        1      -> 100

    This assumes values <= 1 represent fractions.
    """

    result = num(value)

    if result is None:
        return None

    if 0 <= result <= 1:
        return result * 100.0

    return result


def normalize_fraction_or_percentage(
    value: Any,
) -> float | None:
    return normalize_percentage(value)


def numeric_sort_key(value: str) -> tuple[int, float | str]:
    """
    Numeric values sort numerically.
    Non-numeric values sort alphabetically after numeric values.
    """

    try:
        return (0, float(value))
    except (TypeError, ValueError):
        return (1, str(value))


def status_class(status: str) -> str:
    normalized = str(status).upper()

    if normalized == "PASS":
        return "pass"

    if normalized in {"FAIL", "FAILED"}:
        return "fail"

    if normalized in {"CHECK", "OBS"}:
        return "check"

    if normalized in {"INVALID-AUTH", "INVALID_AUTH"}:
        return "invalid"

    if normalized == "FOUND":
        return "pass"

    if normalized in {"MISSING", "INVALID JSON", "INVALID_JSON"}:
        return "fail"

    return "na"


def status_badge(status: str) -> str:
    status = str(status)

    return (
        f'<span class="status {status_class(status)}">'
        f"{escape(status)}"
        "</span>"
    )


# ============================================================
# WORKLOAD HELPERS
# ============================================================

def workload_label(
    data: dict[str, Any],
    filename: str,
) -> str:

    meta = data.get("meta", {})

    if not isinstance(meta, dict):
        meta = {}

    workload = meta.get("workload")

    if isinstance(workload, dict):
        vus = first(
            workload,
            "vus",
            "VUs",
            default=None,
        )

        iterations = first(
            workload,
            "iterations_per_vu",
            "iterations",
            "iterationsPerVu",
            default=None,
        )

        if vus is not None and iterations is not None:
            return (
                f"{integer(vus)} VU / "
                f"{integer(iterations)} iter"
            )

    vus = first(
        meta,
        "vus",
        "VUs",
        default=None,
    )

    iterations = first(
        meta,
        "iterations",
        "iterations_per_vu",
        "iterationsPerVu",
        default=None,
    )

    if vus is not None and iterations is not None:
        return (
            f"{integer(vus)} VU / "
            f"{integer(iterations)} iter"
        )

    match = re.search(
        r"(\d+)vu_(\d+)iter",
        filename.lower(),
    )

    if match:
        return (
            f"{match.group(1)} VU / "
            f"{match.group(2)} iter"
        )

    return filename


# ============================================================
# TIMESTAMP HELPERS
# ============================================================

def parse_timestamp(value: Any) -> datetime | None:
    if value is None:
        return None

    numeric_value: float | None = None

    if isinstance(value, (int, float)) and not isinstance(value, bool):
        numeric_value = float(value)

    elif isinstance(value, str):
        text_value = value.strip()

        if not text_value:
            return None

        if re.fullmatch(
            r"\d+(?:\.\d+)?",
            text_value,
        ):
            try:
                numeric_value = float(text_value)
            except ValueError:
                numeric_value = None

    if numeric_value is not None:
        try:
            # Unix timestamps above 1e11 are normally milliseconds.
            if numeric_value > 100_000_000_000:
                numeric_value /= 1000.0

            return datetime.fromtimestamp(
                numeric_value,
                tz=timezone.utc,
            )

        except (OverflowError, OSError, ValueError):
            return None

    text_value = str(value).strip()

    normalized = text_value.replace(
        "Z",
        "+00:00",
    )

    try:
        dt = datetime.fromisoformat(normalized)

        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)

        return dt.astimezone(timezone.utc)

    except ValueError:
        return None


def latest_timestamp(
    runs: list[dict[str, Any]],
) -> str:

    candidates: list[datetime] = []

    timestamp_keys = [
        "test_timestamp",
        "timestamp",
        "generated_at",
        "generatedAt",
        "date",
        "execution_timestamp",
        "executionTimestamp",
    ]

    for run in runs:
        data = run.get("data", {})

        if not isinstance(data, dict):
            continue

        meta = data.get("meta", {})

        if not isinstance(meta, dict):
            meta = {}

        for key in timestamp_keys:
            for source in (meta, data):

                if not isinstance(source, dict):
                    continue

                dt = parse_timestamp(
                    source.get(key)
                )

                if dt:
                    candidates.append(dt)

    if not candidates:
        return "N/A"

    latest = max(candidates)

    return latest.astimezone(
        timezone.utc
    ).strftime(
        "%Y-%m-%d %H:%M:%S UTC"
    )


# ============================================================
# TARGET HELPERS
# ============================================================

def normalize_target_value(
    value: Any,
    target_name: str | None = None,
) -> float | None:

    if isinstance(value, dict):
        value = first(
            value,
            "target",
            "threshold",
            "value",
            "limit",
            "expected",
            default=None,
        )

    result = num(value)

    if result is None:
        return None

    percentage_targets = {
        "http_failure_rate_pct",
        "page_success_rate_pct",
        "checks_success_rate_pct",
        "browser_http_failure_rate_pct",
    }

    if target_name in percentage_targets:
        return normalize_percentage(result)

    return result


def extract_targets(
    data: dict[str, Any],
    defaults: dict[str, float],
) -> dict[str, float]:

    targets = dict(defaults)

    candidates: list[dict[str, Any]] = []

    meta = data.get("meta", {})

    if not isinstance(meta, dict):
        meta = {}

    for source in [
        meta.get("performance_targets"),
        meta.get("performanceTargets"),
        data.get("performance_targets"),
        data.get("performanceTargets"),
        data.get("thresholds"),
    ]:

        if isinstance(source, dict):
            candidates.append(source)

    aliases = {
        "http_failure_rate_pct": [
            "http_failure_rate_pct",
            "http_failure_pct",
            "http_req_failed_rate_pct",
            "http_req_failed_pct",
        ],

        "page_success_rate_pct": [
            "page_success_rate_pct",
            "page_success_pct",
        ],

        "checks_success_rate_pct": [
            "checks_success_rate_pct",
            "checks_success_pct",
            "checks_pct",
        ],

        "p95_ms": [
            "p95_ms",
            "api_p95_ms",
            "response_p95_ms",
        ],

        "p99_ms": [
            "p99_ms",
            "api_p99_ms",
            "response_p99_ms",
        ],

        "browser_http_failure_rate_pct": [
            "browser_http_failure_rate_pct",
            "browser_http_failure_rate",
        ],

        "navigation_p95_ms": [
            "navigation_p95_ms",
            "ui_navigation_duration_p95_ms",
        ],

        "navigation_p99_ms": [
            "navigation_p99_ms",
            "ui_navigation_duration_p99_ms",
        ],
    }

    for target_name, names in aliases.items():

        found = None

        for source in candidates:

            for name in names:

                if name not in source:
                    continue

                found = normalize_target_value(
                    source[name],
                    target_name,
                )

                if found is not None:
                    break

            if found is not None:
                break

        if found is not None:
            targets[target_name] = found

    return targets


def resolve_targets_for_runs(
    runs: list[dict[str, Any]],
    defaults: dict[str, float],
) -> dict[str, dict[str, float]]:

    resolved: dict[str, dict[str, float]] = {}

    for run in runs:

        workload = run["workload"]

        resolved[workload] = extract_targets(
            run["data"],
            defaults,
        )

    return resolved


def representative_targets(
    runs: list[dict[str, Any]],
    defaults: dict[str, float],
) -> dict[str, float]:

    if not runs:
        return dict(defaults)

    # Use the first available run's source-defined targets.
    # If no source-defined target exists, defaults remain.
    return extract_targets(
        runs[0]["data"],
        defaults,
    )


def comparison_status(
    actual: float | None,
    expected: float | None,
    operator: str,
) -> str:

    if actual is None or expected is None:
        return "N/A"

    if operator == "<":
        return "PASS" if actual < expected else "FAIL"

    if operator == "<=":
        return "PASS" if actual <= expected else "FAIL"

    if operator == ">":
        return "PASS" if actual > expected else "FAIL"

    if operator == ">=":
        return "PASS" if actual >= expected else "FAIL"

    return "N/A"


def threshold_row(
    parameter: str,
    expected: str,
    actual: Any,
    operator: str,
) -> dict[str, Any]:

    actual_number = num(actual)
    expected_number = num(expected)

    result = comparison_status(
        actual_number,
        expected_number,
        operator,
    )

    return {
        "parameter": parameter,
        "expected": expected,
        "actual": actual,
        "operator": operator,
        "result": result,
    }


# ============================================================
# CHECKS EXTRACTION
# ============================================================

def extract_checks_pct(
    data: dict[str, Any],
) -> float | None:

    checks = data.get("checks")

    if isinstance(checks, dict):

        direct = first(
            checks,
            "success_rate_pct",
            "success_pct",
            "rate_pct",
            "pct",
            "rate",
            "success_rate",
            default=None,
        )

        result = normalize_percentage(direct)

        if result is not None:
            return result

        passed = num(
            first(
                checks,
                "passed",
                "passes",
                "passed_checks",
                default=None,
            )
        )

        failed = num(
            first(
                checks,
                "failed",
                "failures",
                "failed_checks",
                default=None,
            )
        )

        if passed is not None and failed is not None:

            total = passed + failed

            if total > 0:
                return (passed / total) * 100.0

    direct = first(
        data,
        "checks_success_rate_pct",
        "checks_success_rate",
        "checks_pct",
        default=None,
    )

    result = normalize_percentage(direct)

    if result is not None:
        return result

    return None


# ============================================================
# API AUTH VALIDITY
# ============================================================

def detect_invalid_auth(
    data: dict[str, Any],
) -> bool:

    statuses: list[int] = []

    endpoint_results = data.get(
        "api_performance",
        [],
    )

    if not isinstance(endpoint_results, list):
        return False

    for item in endpoint_results:

        if not isinstance(item, dict):
            continue

        status = first(
            item,
            "http_status",
            "httpStatus",
            "status_code",
            "statusCode",
            default=None,
        )

        status_number = num(status)

        if status_number is not None:
            statuses.append(
                int(status_number)
            )

    if not statuses:
        return False

    return all(
        status == 401
        for status in statuses
    )


# ============================================================
# API EXTRACTION HELPERS
# ============================================================

def extract_api_endpoint_rows(
    data: dict[str, Any],
    workload: str,
) -> list[dict[str, Any]]:

    rows: list[dict[str, Any]] = []

    endpoint_results = data.get(
        "api_performance",
        [],
    )

    if not isinstance(endpoint_results, list):
        return rows

    for item in endpoint_results:

        if not isinstance(item, dict):
            continue

        endpoint = first(
            item,
            "endpoint",
            "url",
            "path",
            default="N/A",
        )

        method = first(
            item,
            "method",
            "http_method",
            default="N/A",
        )

        page = first(
            item,
            "page",
            "page_name",
            "screen",
            default="N/A",
        )

        api_name = first(
            item,
            "api_name",
            "apiName",
            "name",
            "api_key",
            default="N/A",
        )

        parameter = first(
            item,
            "parameter_tested",
            "parameter",
            "params",
            "parameters",
            "metric",
            default=None,
        )

        error_pct = normalize_percentage(
            first(
                item,
                "failure_rate_pct",
                "error_rate_pct",
                "error_pct",
                "failure_rate",
                "error_rate",
                default=None,
            )
        )

        raw_status = first(
            item,
            "status",
            "result",
            default=None,
        )

        if raw_status is None:
            raw_http_status = first(
                item,
                "http_status",
                "httpStatus",
                "status_code",
                "statusCode",
                default=None,
            )

            if num(raw_http_status) is not None:
                http_status_number = integer(
                    raw_http_status
                )

                if http_status_number >= 400:
                    endpoint_status = "FAIL"
                else:
                    endpoint_status = "PASS"
            else:
                endpoint_status = "N/A"
        else:
            endpoint_status = str(raw_status).upper()

        rows.append(
            {
                "workload": workload,
                "page": page,
                "api_name": api_name,
                "endpoint": endpoint,
                "method": method,
                "parameter": parameter,

                "requests": integer(
                    first(
                        item,
                        "requests",
                        "count",
                        "request_count",
                        "total_requests",
                        default=0,
                    )
                ),

                "p50": num(
                    first(
                        item,
                        "p50_ms",
                        "p50",
                        "med_ms",
                        "median_ms",
                        default=None,
                    )
                ),

                "p90": num(
                    first(
                        item,
                        "p90_ms",
                        "p90",
                        default=None,
                    )
                ),

                "p95": num(
                    first(
                        item,
                        "p95_ms",
                        "p95",
                        default=None,
                    )
                ),

                "p99": num(
                    first(
                        item,
                        "p99_ms",
                        "p99",
                        default=None,
                    )
                ),

                "max": num(
                    first(
                        item,
                        "max_ms",
                        "maximum_ms",
                        "max",
                        default=None,
                    )
                ),

                "error_pct": error_pct,

                "rps": num(
                    first(
                        item,
                        "rps",
                        "requests_per_second",
                        "request_rate",
                        default=None,
                    )
                ),

                "status": endpoint_status,
            }
        )

    return rows


def extract_api_workload_metrics(
    data: dict[str, Any],
) -> dict[str, Any]:

    overall = data.get(
        "overall",
        {},
    )

    if not isinstance(overall, dict):
        overall = {}

    execution_summary = data.get(
        "execution_summary",
        {},
    )

    if not isinstance(execution_summary, dict):
        execution_summary = {}

    error_pct = normalize_percentage(
        first(
            data,
            "http_req_failed_rate_pct",
            "http_failure_rate_pct",
            "http_req_failed_rate",
            "http_failure_rate",
            default=None,
        )
    )

    if error_pct is None:
        error_pct = normalize_percentage(
            first(
                execution_summary,
                "http_req_failed_rate_pct",
                "http_failure_rate_pct",
                "http_req_failed_rate",
                "http_failure_rate",
                default=None,
            )
        )

    page_success_pct = normalize_percentage(
        first(
            data,
            "page_success_rate_pct",
            "page_success_rate",
            default=None,
        )
    )

    if page_success_pct is None:
        page_success_pct = normalize_percentage(
            first(
                execution_summary,
                "page_success_rate_pct",
                "page_success_rate",
                default=None,
            )
        )

    checks_pct = extract_checks_pct(data)

    if checks_pct is None:
        checks_pct = extract_checks_pct(
            execution_summary
        )

    p95 = num(
        nested(
            data,
            ("http_req_duration", "p95"),
            ("http_req_duration", "p95_ms"),
            ("overall", "p95_ms"),
            ("overall", "p95"),
            ("execution_summary", "p95_ms"),
            ("execution_summary", "api_p95_ms"),
            default=None,
        )
    )

    p99 = num(
        nested(
            data,
            ("http_req_duration", "p99"),
            ("http_req_duration", "p99_ms"),
            ("overall", "p99_ms"),
            ("overall", "p99"),
            ("execution_summary", "p99_ms"),
            ("execution_summary", "api_p99_ms"),
            default=None,
        )
    )

    request_count = integer(
        first(
            overall,
            "total_http_requests",
            "total_requests",
            "requests",
            default=None,
        )
    )

    if request_count == 0:
        request_count = integer(
            first(
                execution_summary,
                "total_http_requests",
                "total_requests",
                "requests",
                default=None,
            )
        )

    if request_count == 0:
        request_count = integer(
            first(
                data,
                "total_http_requests",
                "total_requests",
                "requests",
                default=0,
            )
        )

    return {
        "requests": request_count,
        "error_pct": error_pct,
        "page_success_pct": page_success_pct,
        "checks_pct": checks_pct,
        "p95": p95,
        "p99": p99,
    }


def extract_api_workload_timing(
    data: dict[str, Any],
    workload: str,
    targets: dict[str, float],
) -> dict[str, Any]:

    metrics = extract_api_workload_metrics(data)

    error_pct = metrics["error_pct"]
    page_success_pct = metrics["page_success_pct"]
    checks_pct = metrics["checks_pct"]
    p95 = metrics["p95"]
    p99 = metrics["p99"]

    invalid_auth = detect_invalid_auth(data)

    if invalid_auth:

        return {
            "workload": workload,
            "requests": metrics["requests"],
            "error_pct": error_pct,
            "error_status": "INVALID-AUTH",
            "page_success_pct": page_success_pct,
            "page_success_status": "INVALID-AUTH",
            "checks_pct": checks_pct,
            "checks_status": "INVALID-AUTH",
            "p95": p95,
            "p95_status": "INVALID-AUTH",
            "p99": p99,
            "p99_status": "INVALID-AUTH",
            "overall_performance_status": "INVALID-AUTH",
        }

    error_status = comparison_status(
        error_pct,
        targets.get(
            "http_failure_rate_pct"
        ),
        "<",
    )

    page_status = comparison_status(
        page_success_pct,
        targets.get(
            "page_success_rate_pct"
        ),
        ">=",
    )

    checks_status = comparison_status(
        checks_pct,
        targets.get(
            "checks_success_rate_pct"
        ),
        ">=",
    )

    p95_status = comparison_status(
        p95,
        targets.get("p95_ms"),
        "<",
    )

    p99_status = comparison_status(
        p99,
        targets.get("p99_ms"),
        "<",
    )

    statuses = [
        error_status,
        page_status,
        checks_status,
        p95_status,
        p99_status,
    ]

    if any(
        status == "FAIL"
        for status in statuses
    ):
        overall_status = "FAIL"

    elif statuses and all(
        status == "PASS"
        for status in statuses
    ):
        overall_status = "PASS"

    else:
        overall_status = "N/A"

    return {
        "workload": workload,
        "requests": metrics["requests"],
        "error_pct": error_pct,
        "error_status": error_status,
        "page_success_pct": page_success_pct,
        "page_success_status": page_status,
        "checks_pct": checks_pct,
        "checks_status": checks_status,
        "p95": p95,
        "p95_status": p95_status,
        "p99": p99,
        "p99_status": p99_status,
        "overall_performance_status": overall_status,
    }


def extract_api_threshold_rows(
    data: dict[str, Any],
    workload: str,
    targets: dict[str, float],
) -> list[dict[str, Any]]:

    metrics = extract_api_workload_metrics(data)

    if detect_invalid_auth(data):

        return [
            {
                "workload": workload,
                "parameter": "Authentication",
                "expected": "Valid authenticated API session",
                "actual": "All captured API responses returned HTTP 401",
                "operator": "",
                "result": "INVALID-AUTH",
            }
        ]

    error_pct = metrics["error_pct"]
    page_success_pct = metrics["page_success_pct"]
    checks_pct = metrics["checks_pct"]
    p95 = metrics["p95"]
    p99 = metrics["p99"]

    return [
        {
            "workload": workload,
            **threshold_row(
                "HTTP failure rate",
                f"< {fmt_pct(targets['http_failure_rate_pct'])}",
                error_pct,
                "<",
            ),
        },
        {
            "workload": workload,
            **threshold_row(
                "Page success rate",
                f">= {fmt_pct(targets['page_success_rate_pct'])}",
                page_success_pct,
                ">=",
            ),
        },
        {
            "workload": workload,
            **threshold_row(
                "Checks success rate",
                f">= {fmt_pct(targets['checks_success_rate_pct'])}",
                checks_pct,
                ">=",
            ),
        },
        {
            "workload": workload,
            **threshold_row(
                "API p95",
                f"< {fmt_ms(targets['p95_ms'])}",
                p95,
                "<",
            ),
        },
        {
            "workload": workload,
            **threshold_row(
                "API p99",
                f"< {fmt_ms(targets['p99_ms'])}",
                p99,
                "<",
            ),
        },
    ]


# ============================================================
# UI EXTRACTION
# ============================================================

def extract_ui_workload_result(
    data: dict[str, Any],
    workload: str,
    targets: dict[str, float],
) -> dict[str, Any]:

    execution_summary = data.get(
        "execution_summary",
        {},
    )

    if not isinstance(execution_summary, dict):
        execution_summary = {}

    checks_pct = normalize_percentage(
        first(
            execution_summary,
            "checks_success_rate_pct",
            "checks_pct",
            "checks_success_rate",
            default=None,
        )
    )

    if checks_pct is None:
        checks_pct = extract_checks_pct(
            execution_summary
        )

    if checks_pct is None:
        checks_pct = extract_checks_pct(data)

    page_success_pct = normalize_percentage(
        first(
            execution_summary,
            "page_success_rate",
            "page_success_rate_pct",
            default=None,
        )
    )

    if page_success_pct is None:
        page_success_pct = normalize_percentage(
            first(
                data,
                "page_success_rate_pct",
                "page_success_rate",
                default=None,
            )
        )

    browser_http_failure_pct = normalize_percentage(
        first(
            execution_summary,
            "browser_http_failure_rate",
            "browser_http_failure_rate_pct",
            default=None,
        )
    )

    if browser_http_failure_pct is None:
        browser_http_failure_pct = normalize_percentage(
            first(
                data,
                "browser_http_failure_rate_pct",
                "browser_http_failure_rate",
                default=None,
            )
        )

    navigation_p95 = num(
        first(
            execution_summary,
            "navigation_p95_ms",
            "ui_navigation_duration_p95",
            "ui_navigation_duration_p95_ms",
            default=None,
        )
    )

    if navigation_p95 is None:
        navigation_p95 = num(
            first(
                data,
                "navigation_p95_ms",
                "navigation_p95",
                default=None,
            )
        )

    navigation_p99 = num(
        first(
            execution_summary,
            "navigation_p99_ms",
            "ui_navigation_duration_p99",
            "ui_navigation_duration_p99_ms",
            default=None,
        )
    )

    if navigation_p99 is None:
        navigation_p99 = num(
            first(
                data,
                "navigation_p99_ms",
                "navigation_p99",
                default=None,
            )
        )

    page_results = data.get(
        "page_results",
        [],
    )

    navigation_samples = 0

    if isinstance(page_results, list):

        for page in page_results:

            if not isinstance(page, dict):
                continue

            sample_value = first(
                page,
                "navigation_samples",
                "executions",
                "samples",
                "count",
                "iterations",
                default=0,
            )

            navigation_samples += integer(
                sample_value
            )

    checks_status = comparison_status(
        checks_pct,
        targets.get(
            "checks_success_rate_pct"
        ),
        ">=",
    )

    page_status = comparison_status(
        page_success_pct,
        targets.get(
            "page_success_rate_pct"
        ),
        ">=",
    )

    browser_failure_status = comparison_status(
        browser_http_failure_pct,
        targets.get(
            "browser_http_failure_rate_pct"
        ),
        "<",
    )

    navigation_p95_status = comparison_status(
        navigation_p95,
        targets.get(
            "navigation_p95_ms"
        ),
        "<",
    )

    navigation_p99_status = comparison_status(
        navigation_p99,
        targets.get(
            "navigation_p99_ms"
        ),
        "<",
    )

    statuses = [
        checks_status,
        page_status,
        browser_failure_status,
        navigation_p95_status,
        navigation_p99_status,
    ]

    if any(
        status == "FAIL"
        for status in statuses
    ):
        overall_status = "FAIL"

    elif statuses and all(
        status == "PASS"
        for status in statuses
    ):
        overall_status = "PASS"

    else:
        overall_status = "N/A"

    return {
        "workload": workload,
        "navigation_samples": navigation_samples,

        "checks_pct": checks_pct,
        "checks_status": checks_status,

        "page_success_pct": page_success_pct,
        "page_success_status": page_status,

        "browser_http_failure_pct": browser_http_failure_pct,
        "browser_http_failure_status": browser_failure_status,

        "navigation_p95": navigation_p95,
        "navigation_p95_status": navigation_p95_status,

        "navigation_p99": navigation_p99,
        "navigation_p99_status": navigation_p99_status,

        "overall_performance_status": overall_status,
    }


def normalize_page_name(value: Any) -> str:
    if value is None:
        return ""

    return re.sub(
        r"\s+",
        " ",
        str(value).strip().lower(),
    )


def extract_ui_pages(
    data: dict[str, Any],
    workload: str,
) -> list[dict[str, Any]]:

    pages = data.get(
        "page_results",
        [],
    )

    if not isinstance(pages, list):
        pages = []

    web_vitals = data.get(
        "web_vitals",
        [],
    )

    if not isinstance(web_vitals, list):
        web_vitals = []

    vital_by_page: dict[str, dict[str, Any]] = {}

    for vital in web_vitals:

        if not isinstance(vital, dict):
            continue

        page_name = first(
            vital,
            "page",
            "page_name",
            "screen",
            "name",
            default=None,
        )

        if page_name:
            vital_by_page[
                normalize_page_name(page_name)
            ] = vital

    rows: list[dict[str, Any]] = []

    for page in pages:

        if not isinstance(page, dict):
            continue

        page_name = first(
            page,
            "page",
            "page_name",
            "name",
            "screen",
            default="N/A",
        )

        rows.append(
            {
                "workload": workload,
                "page": page_name,
                "web_vitals": vital_by_page.get(
                    normalize_page_name(page_name),
                    {},
                ),
            }
        )

    if not rows:

        for page_name, vital in vital_by_page.items():

            rows.append(
                {
                    "workload": workload,
                    "page": page_name,
                    "web_vitals": vital,
                }
            )

    return rows


def web_vital_value(
    vital: dict[str, Any],
    name: str,
) -> float | None:

    if not isinstance(vital, dict):
        return None

    target_name = name.upper()

    # Structure:
    # {
    #   "LCP": {"p95": 1234}
    # }
    for key, metric in vital.items():

        if str(key).upper() != target_name:
            continue

        if isinstance(metric, dict):

            result = num(
                first(
                    metric,
                    "p95",
                    "p95_ms",
                    "value",
                    "value_ms",
                    default=None,
                )
            )

            if result is not None:
                return result

        else:

            result = num(metric)

            if result is not None:
                return result

    # Structure:
    # {
    #   "metric": "LCP",
    #   "p95": 1234
    # }
    metric_name = first(
        vital,
        "metric",
        "metric_name",
        "name",
        "web_vital",
        default=None,
    )

    if (
        metric_name is not None
        and str(metric_name).upper() == target_name
    ):
        return num(
            first(
                vital,
                "p95",
                "p95_ms",
                "value",
                "value_ms",
                default=None,
            )
        )

    return None


# ============================================================
# SOURCE LOADING
# ============================================================

def load_runs() -> tuple[
    list[dict[str, Any]],
    list[dict[str, Any]],
    list[str],
]:

    api_runs: list[dict[str, Any]] = []
    ui_runs: list[dict[str, Any]] = []
    invalid_files: list[str] = []

    for filename in API_FILES:

        path = RESULTS_DIR / filename

        if not path.exists():
            continue

        data = load_json(path)

        if data is not None:

            api_runs.append(
                {
                    "filename": filename,
                    "data": data,
                    "workload": workload_label(
                        data,
                        filename,
                    ),
                }
            )

        else:
            invalid_files.append(filename)

    for filename in UI_FILES:

        path = RESULTS_DIR / filename

        if not path.exists():
            continue

        data = load_json(path)

        if data is not None:

            ui_runs.append(
                {
                    "filename": filename,
                    "data": data,
                    "workload": workload_label(
                        data,
                        filename,
                    ),
                }
            )

        else:
            invalid_files.append(filename)

    return (
        api_runs,
        ui_runs,
        invalid_files,
    )


# ============================================================
# HTML
# ============================================================

HTML_HEAD = """
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<style>

body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
    background: #f6f7f9;
    color: #222;
}

.container {
    max-width: 1800px;
    margin: 0 auto;
    padding: 28px;
}

h1 {
    margin-bottom: 8px;
}

h2 {
    margin-top: 34px;
    border-bottom: 2px solid #ddd;
    padding-bottom: 8px;
}

h3 {
    margin-top: 24px;
}

p {
    line-height: 1.5;
}

table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    margin: 14px 0 26px 0;
}

th, td {
    border: 1px solid #d8dce1;
    padding: 8px 10px;
    text-align: left;
    vertical-align: top;
}

th {
    background: #eef1f4;
    font-weight: 600;
}

tr:nth-child(even) td {
    background: #fafbfc;
}

.status {
    display: inline-block;
    padding: 3px 8px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 12px;
}

.status.pass {
    background: #dff3e4;
    color: #176b2c;
}

.status.fail {
    background: #fbe1e1;
    color: #a11a1a;
}

.status.check {
    background: #fff0c2;
    color: #755600;
}

.status.invalid {
    background: #eadcf8;
    color: #5d2a82;
}

.status.na {
    background: #e8eaed;
    color: #555;
}

.small {
    font-size: 12px;
    color: #666;
}

code {
    font-family: Consolas, monospace;
    font-size: 12px;
}

</style>
</head>

<body>
<div class="container">
"""


HTML_FOOT = """
</div>
</body>
</html>
"""


def table(
    headers: list[str],
    rows: list[list[Any]],
) -> str:

    parts = [
        "<table>",
        "<thead>",
        "<tr>",
    ]

    for header in headers:
        parts.append(
            f"<th>{escape(str(header))}</th>"
        )

    parts.extend(
        [
            "</tr>",
            "</thead>",
            "<tbody>",
        ]
    )

    for row in rows:

        parts.append("<tr>")

        for value in row:
            parts.append(
                f"<td>{value}</td>"
            )

        parts.append("</tr>")

    parts.extend(
        [
            "</tbody>",
            "</table>",
        ]
    )

    return "".join(parts)


# ============================================================
# DOCUMENT INFORMATION
# ============================================================

def build_document_information(
    api_runs: list[dict[str, Any]],
    ui_runs: list[dict[str, Any]],
) -> str:

    all_runs = api_runs + ui_runs

    latest = latest_timestamp(
        all_runs
    )

    base_url = "N/A"
    tenant = "N/A"

    for run in all_runs:

        meta = run["data"].get(
            "meta",
            {},
        )

        if not isinstance(meta, dict):
            continue

        if base_url == "N/A":

            base_url = first(
                meta,
                "base_url",
                "baseUrl",
                "target",
                default=base_url,
            )

        if tenant == "N/A":

            tenant = first(
                meta,
                "tenant_slug",
                "tenantSlug",
                "tenant",
                default=tenant,
            )

    rows = [
        [
            "Document",
            "CMMA Navigation Performance Report",
        ],
        [
            "Report Type",
            "API + UI Navigation Performance",
        ],
        [
            "Latest Test Timestamp",
            latest,
        ],
        [
            "Application URL",
            escape(str(base_url)),
        ],
        [
            "Tenant",
            escape(str(tenant)),
        ],
    ]

    return table(
        ["Field", "Value"],
        rows,
    )


# ============================================================
# EXECUTION SUMMARY
# ============================================================

def build_execution_summary(
    api_runs: list[dict[str, Any]],
    ui_runs: list[dict[str, Any]],
    api_endpoint_rows_count: int,
    ui_page_rows_count: int,
    missing_files: list[str],
    invalid_files: list[str],
) -> str:

    rows = [
        ["API Workloads", len(api_runs)],
        ["UI Workloads", len(ui_runs)],
        [
            "API Endpoint Rows",
            api_endpoint_rows_count,
        ],
        [
            "UI Page Rows",
            ui_page_rows_count,
        ],
        [
            "Expected Source Files",
            len(EXPECTED_FILES),
        ],
        [
            "Missing Source Files",
            len(missing_files),
        ],
        [
            "Invalid Source Files",
            len(invalid_files),
        ],
    ]

    return table(
        ["Metric", "Value"],
        rows,
    )


# ============================================================
# TEST ENVIRONMENT
# ============================================================

def build_test_environment(
    api_runs: list[dict[str, Any]],
    ui_runs: list[dict[str, Any]],
) -> str:

    all_runs = api_runs + ui_runs

    base_url = "N/A"
    browser = "N/A"
    test_type = "N/A"
    executor = "N/A"

    vus: set[str] = set()
    iterations: set[str] = set()

    for run in all_runs:

        data = run["data"]

        meta = data.get(
            "meta",
            {},
        )

        if not isinstance(meta, dict):
            meta = {}

        if base_url == "N/A":
            base_url = first(
                meta,
                "base_url",
                "baseUrl",
                "target",
                default=base_url,
            )

        if browser == "N/A":
            browser = first(
                meta,
                "browser",
                default=browser,
            )

        if test_type == "N/A":
            test_type = first(
                meta,
                "test_type",
                "testType",
                default=test_type,
            )

        if executor == "N/A":
            executor = first(
                meta,
                "executor",
                default=executor,
            )

        workload = meta.get(
            "workload"
        )

        if isinstance(workload, dict):

            vu = first(
                workload,
                "vus",
                "VUs",
                default=None,
            )

            iteration = first(
                workload,
                "iterations_per_vu",
                "iterations",
                "iterationsPerVu",
                default=None,
            )

            if vu is not None:
                vus.add(str(vu))

            if iteration is not None:
                iterations.add(
                    str(iteration)
                )

        vu = first(
            meta,
            "vus",
            "VUs",
            default=None,
        )

        iteration = first(
            meta,
            "iterations",
            "iterations_per_vu",
            "iterationsPerVu",
            default=None,
        )

        if vu is not None:
            vus.add(str(vu))

        if iteration is not None:
            iterations.add(
                str(iteration)
            )

    sorted_vus = sorted(
        vus,
        key=numeric_sort_key,
    )

    sorted_iterations = sorted(
        iterations,
        key=numeric_sort_key,
    )

    rows = [
        [
            "Application",
            escape(str(base_url)),
        ],
        [
            "Browser",
            escape(str(browser)),
        ],
        [
            "Test Type",
            escape(str(test_type)),
        ],
        [
            "Executor",
            escape(str(executor)),
        ],
        [
            "VUs",
            escape(
                ", ".join(sorted_vus)
                if sorted_vus
                else "N/A"
            ),
        ],
        [
            "Iterations",
            escape(
                ", ".join(sorted_iterations)
                if sorted_iterations
                else "N/A"
            ),
        ],
        [
            "Sensitive Runtime Details",
            "Excluded from report",
        ],
    ]

    return table(
        ["Environment Item", "Value"],
        rows,
    )


# ============================================================
# PERFORMANCE TARGETS
# ============================================================

def build_performance_targets(
    api_targets: dict[str, float],
    ui_targets: dict[str, float],
) -> str:

    rows = [
        [
            "API HTTP failure rate",
            f"< {fmt_pct(api_targets['http_failure_rate_pct'])}",
        ],
        [
            "API page success rate",
            f">= {fmt_pct(api_targets['page_success_rate_pct'])}",
        ],
        [
            "API checks success rate",
            f">= {fmt_pct(api_targets['checks_success_rate_pct'])}",
        ],
        [
            "API p95",
            f"< {fmt_ms(api_targets['p95_ms'])}",
        ],
        [
            "API p99",
            f"< {fmt_ms(api_targets['p99_ms'])}",
        ],
        [
            "UI checks success rate",
            f">= {fmt_pct(ui_targets['checks_success_rate_pct'])}",
        ],
        [
            "UI page success rate",
            f">= {fmt_pct(ui_targets['page_success_rate_pct'])}",
        ],
        [
            "UI browser HTTP failure rate",
            f"< {fmt_pct(ui_targets['browser_http_failure_rate_pct'])}",
        ],
        [
            "UI navigation p95",
            f"< {fmt_ms(ui_targets['navigation_p95_ms'])}",
        ],
        [
            "UI navigation p99",
            f"< {fmt_ms(ui_targets['navigation_p99_ms'])}",
        ],
    ]

    return table(
        ["Performance Target", "Expected"],
        rows,
    )


def build_web_vital_targets() -> str:

    rows = []

    for metric, target in WEB_VITAL_TARGETS.items():

        rows.append(
            [
                metric,
                (
                    f"{target:.2f}"
                    if metric == "CLS"
                    else fmt_ms(target)
                ),
                "OBS",
            ]
        )

    return table(
        [
            "Web Vital",
            "Observational Target",
            "Gate Status",
        ],
        rows,
    )


# ============================================================
# API WORKLOAD TIMING
# ============================================================

def build_api_workload_timing(
    rows: list[dict[str, Any]],
) -> str:

    table_rows = []

    for row in rows:

        table_rows.append(
            [
                escape(str(row["workload"])),
                escape(str(row["requests"])),

                escape(
                    fmt_pct(
                        row["error_pct"]
                    )
                ),

                status_badge(
                    row["error_status"]
                ),

                escape(
                    fmt_pct(
                        row["page_success_pct"]
                    )
                ),

                status_badge(
                    row["page_success_status"]
                ),

                escape(
                    fmt_pct(
                        row["checks_pct"]
                    )
                ),

                status_badge(
                    row["checks_status"]
                ),

                escape(
                    fmt_ms(
                        row["p95"]
                    )
                ),

                status_badge(
                    row["p95_status"]
                ),

                escape(
                    fmt_ms(
                        row["p99"]
                    )
                ),

                status_badge(
                    row["p99_status"]
                ),

                status_badge(
                    row[
                        "overall_performance_status"
                    ]
                ),
            ]
        )

    return table(
        [
            "Workload",
            "Requests",
            "Error %",
            "Error % Status",
            "Page Success %",
            "Page Success % Status",
            "Checks %",
            "Checks % Status",
            "p95",
            "p95 Status",
            "p99",
            "p99 Status",
            "Overall Performance",
        ],
        table_rows,
    )


# ============================================================
# API ENDPOINT MATRIX
# ============================================================

def api_matrix_has_parameter(
    rows: list[dict[str, Any]],
) -> bool:

    for row in rows:

        value = row.get(
            "parameter"
        )

        if value is None:
            continue

        if isinstance(value, str):

            if value.strip():
                return True

        else:
            return True

    return False


def build_api_endpoint_matrix(
    rows: list[dict[str, Any]],
) -> str:

    include_parameter = (
        api_matrix_has_parameter(rows)
    )

    headers = [
        "Workload",
        "Page",
        "API Name",
        "Endpoint",
        "Method",
    ]

    if include_parameter:
        headers.append(
            "Parameter Tested"
        )

    headers.extend(
        [
            "Requests",
            "p50",
            "p90",
            "p95",
            "p99",
            "Max",
            "Error %",
            "RPS",
            "Status",
        ]
    )

    table_rows = []

    for row in rows:

        values = [
            escape(str(row["workload"])),
            escape(str(row["page"])),
            escape(str(row["api_name"])),
            (
                f"<code>"
                f"{escape(str(row['endpoint']))}"
                f"</code>"
            ),
            escape(str(row["method"])),
        ]

        if include_parameter:

            parameter = row.get(
                "parameter"
            )

            if (
                parameter is None
                or str(parameter).strip() == ""
            ):
                values.append("")

            else:
                values.append(
                    escape(str(parameter))
                )

        values.extend(
            [
                escape(
                    str(row["requests"])
                ),
                escape(
                    fmt_ms(row["p50"])
                ),
                escape(
                    fmt_ms(row["p90"])
                ),
                escape(
                    fmt_ms(row["p95"])
                ),
                escape(
                    fmt_ms(row["p99"])
                ),
                escape(
                    fmt_ms(row["max"])
                ),
                escape(
                    fmt_pct(row["error_pct"])
                ),
                escape(
                    fmt_num(row["rps"])
                ),
                status_badge(
                    row["status"]
                ),
            ]
        )

        table_rows.append(values)

    return table(
        headers,
        table_rows,
    )


# ============================================================
# API THRESHOLD STATUS
# ============================================================

def build_api_threshold_status(
    rows: list[dict[str, Any]],
) -> str:

    table_rows = []

    for row in rows:

        if row["parameter"] in {
            "HTTP failure rate",
            "Page success rate",
            "Checks success rate",
        }:

            actual_display = fmt_pct(
                row["actual"]
            )

        elif row["parameter"] == "Authentication":

            actual_display = str(
                row["actual"]
            )

        else:

            actual_display = fmt_ms(
                row["actual"]
            )

        table_rows.append(
            [
                escape(
                    str(row["workload"])
                ),
                escape(
                    str(row["parameter"])
                ),
                escape(
                    str(row["expected"])
                ),
                escape(
                    actual_display
                ),
                status_badge(
                    row["result"]
                ),
            ]
        )

    return table(
        [
            "Workload",
            "Parameter",
            "Expected Result",
            "Actual Result",
            "Result",
        ],
        table_rows,
    )


# ============================================================
# UI WORKLOAD RESULTS
# ============================================================

def build_ui_workload_results(
    rows: list[dict[str, Any]],
) -> str:

    table_rows = []

    for row in rows:

        table_rows.append(
            [
                escape(
                    str(row["workload"])
                ),

                escape(
                    str(row["navigation_samples"])
                ),

                escape(
                    fmt_pct(row["checks_pct"])
                ),

                status_badge(
                    row["checks_status"]
                ),

                escape(
                    fmt_pct(
                        row["page_success_pct"]
                    )
                ),

                status_badge(
                    row["page_success_status"]
                ),

                escape(
                    fmt_pct(
                        row[
                            "browser_http_failure_pct"
                        ]
                    )
                ),

                status_badge(
                    row[
                        "browser_http_failure_status"
                    ]
                ),

                escape(
                    fmt_ms(
                        row["navigation_p95"]
                    )
                ),

                status_badge(
                    row[
                        "navigation_p95_status"
                    ]
                ),

                escape(
                    fmt_ms(
                        row["navigation_p99"]
                    )
                ),

                status_badge(
                    row[
                        "navigation_p99_status"
                    ]
                ),

                status_badge(
                    row[
                        "overall_performance_status"
                    ]
                ),
            ]
        )

    return table(
        [
            "Workload",
            "Navigation Samples",
            "Checks %",
            "Checks % Status",
            "Page Success %",
            "Page Success % Status",
            "Browser HTTP Failure %",
            "Browser HTTP Failure % Status",
            "Navigation p95",
            "p95 Status",
            "Navigation p99",
            "p99 Status",
            "Overall Performance",
        ],
        table_rows,
    )


# ============================================================
# UI PAGE-LEVEL RESULTS
# ============================================================

def build_ui_page_level_results(
    rows: list[dict[str, Any]],
) -> str:

    table_rows = []

    for row in rows:

        vital = row.get(
            "web_vitals",
            {},
        )

        vital_parts = []

        for metric in WEB_VITAL_TARGETS:

            value = web_vital_value(
                vital,
                metric,
            )

            if value is None:
                continue

            if metric == "CLS":

                vital_parts.append(
                    f"{metric}: {value:.3f}"
                )

            else:

                vital_parts.append(
                    f"{metric}: {fmt_ms(value)}"
                )

        web_vitals_display = (
            "<br>".join(
                escape(part)
                for part in vital_parts
            )
            if vital_parts
            else "N/A"
        )

        table_rows.append(
            [
                escape(
                    str(row["workload"])
                ),
                escape(
                    str(row["page"])
                ),
                web_vitals_display,
            ]
        )

    if not table_rows:
        table_rows.append(
            ["N/A", "N/A", "N/A"]
        )

    return table(
        [
            "Workload",
            "Page Name",
            "Web Vitals (p95)",
        ],
        table_rows,
    )


# ============================================================
# UI VS API
# ============================================================

def build_ui_vs_api(
    api_workloads: list[dict[str, Any]],
    ui_workloads: list[dict[str, Any]],
) -> str:

    api_map = {
        row["workload"]: row
        for row in api_workloads
    }

    ui_map = {
        row["workload"]: row
        for row in ui_workloads
    }

    workload_order = [
        "1 VU / 1 iter",
        "1 VU / 5 iter",
        "5 VU / 5 iter",
        "25 VU / 5 iter",
    ]

    all_workloads = []

    for workload in workload_order:

        if (
            workload in api_map
            or workload in ui_map
        ):
            all_workloads.append(
                workload
            )

    for workload in (
        list(api_map) + list(ui_map)
    ):

        if workload not in all_workloads:
            all_workloads.append(
                workload
            )

    rows = []

    for workload in all_workloads:

        api = api_map.get(
            workload,
            {},
        )

        ui = ui_map.get(
            workload,
            {},
        )

        rows.append(
            [
                escape(workload),

                escape(
                    str(
                        api.get(
                            "requests",
                            "N/A",
                        )
                    )
                ),

                escape(
                    fmt_ms(
                        api.get("p95")
                    )
                ),

                status_badge(
                    api.get(
                        "overall_performance_status",
                        "N/A",
                    )
                ),

                escape(
                    str(
                        ui.get(
                            "navigation_samples",
                            "N/A",
                        )
                    )
                ),

                escape(
                    fmt_ms(
                        ui.get(
                            "navigation_p95"
                        )
                    )
                ),

                escape(
                    fmt_ms(
                        ui.get(
                            "navigation_p99"
                        )
                    )
                ),

                status_badge(
                    ui.get(
                        "overall_performance_status",
                        "N/A",
                    )
                ),
            ]
        )

    return table(
        [
            "Workload",
            "API Requests",
            "API p95",
            "API Performance",
            "UI Navigation Samples",
            "UI Navigation p95",
            "UI Navigation p99",
            "UI Performance",
        ],
        rows,
    )


# ============================================================
# MISSING / INVALID FILES
# ============================================================

def build_missing_files(
    missing_files: list[str],
    invalid_files: list[str],
) -> str:

    rows = []

    for filename in missing_files:

        rows.append(
            [
                escape(filename),
                status_badge("MISSING"),
            ]
        )

    for filename in invalid_files:

        rows.append(
            [
                escape(filename),
                status_badge("INVALID JSON"),
            ]
        )

    if not rows:

        return (
            '<div class="small">'
            "<strong>None.</strong> "
            "All expected source result files "
            "were found and parsed successfully."
            "</div>"
        )

    return table(
        [
            "Unavailable / Invalid File",
            "Status",
        ],
        rows,
    )


# ============================================================
# EXECUTION NOTES
# ============================================================

def build_execution_notes() -> str:

    notes = [
        (
            "The report is generated from existing API and UI "
            "JSON result files; the report builder does not "
            "execute k6."
        ),

        (
            "All four workload combinations are retained "
            "separately."
        ),

        (
            "Functional execution status is not used as the "
            "Overall Performance status."
        ),

        (
            "Each performance parameter has its own PASS/FAIL "
            "status where a target and actual measurement are "
            "available."
        ),

        (
            "Overall Performance is PASS only when all "
            "applicable performance checks pass."
        ),

        (
            "API threshold Actual Result is populated from the "
            "measured source JSON value and Result is calculated "
            "from Expected versus Actual."
        ),

        (
            "A run is marked INVALID-AUTH only when captured API "
            "endpoint HTTP status codes exist and all captured "
            "statuses are 401."
        ),

        (
            "INVALID-AUTH is not treated as a performance "
            "failure."
        ),

        (
            "Authentication, session, token, cookie, password "
            "and storage-state details are excluded or redacted."
        ),

        (
            "Web Vital measurements are observational and "
            "non-blocking. Only actual p95 measurements are "
            "displayed."
        ),

        (
            "Source-defined performance targets are read from "
            "the corresponding workload JSON before defaults "
            "are used."
        ),

        (
            "No Performance Issue Candidates section is "
            "generated."
        ),

        (
            "No Evidence section is generated."
        ),

        (
            "No charts or graphs are generated."
        ),
    ]

    return (
        "<ul>"
        + "".join(
            f"<li>{escape(note)}</li>"
            for note in notes
        )
        + "</ul>"
    )


# ============================================================
# SOURCE FILES
# ============================================================

def build_source_files(
    invalid_files: list[str],
) -> str:

    rows = []

    for filename in EXPECTED_FILES:

        path = RESULTS_DIR / filename

        if not path.exists():

            status = "MISSING"

        elif filename in invalid_files:

            status = "INVALID JSON"

        else:

            status = "FOUND"

        rows.append(
            [
                escape(filename),
                status_badge(status),
            ]
        )

    return table(
        [
            "Source Result File",
            "Status",
        ],
        rows,
    )


# ============================================================
# JSON SUMMARY
# ============================================================

def build_summary_json(
    api_runs: list[dict[str, Any]],
    ui_runs: list[dict[str, Any]],
    api_endpoint_rows: list[dict[str, Any]],
    api_threshold_rows: list[dict[str, Any]],
    api_workload_rows: list[dict[str, Any]],
    ui_page_rows: list[dict[str, Any]],
    ui_workload_rows: list[dict[str, Any]],
    missing_files: list[str],
    invalid_files: list[str],
    api_targets: dict[str, float],
    ui_targets: dict[str, float],
) -> dict[str, Any]:

    return {
        "document_information": {
            "name": (
                "CMMA Navigation Performance Report"
            ),
            "type": (
                "API + UI Navigation Performance"
            ),
            "latest_test_timestamp": latest_timestamp(
                api_runs + ui_runs
            ),
        },

        "execution_summary": {
            "api_workloads": len(api_runs),
            "ui_workloads": len(ui_runs),
            "api_endpoint_rows": len(
                api_endpoint_rows
            ),
            "api_threshold_rows": len(
                api_threshold_rows
            ),
            "ui_page_rows": len(
                ui_page_rows
            ),
            "ui_workload_rows": len(
                ui_workload_rows
            ),
            "ui_web_vital_rows": sum(
                1
                for row in ui_page_rows
                if row.get("web_vitals")
            ),
            "missing_files": len(
                missing_files
            ),
            "invalid_files": len(
                invalid_files
            ),
        },

        "performance_targets": {
            "api": api_targets,
            "ui": ui_targets,
            "web_vitals_observational": (
                WEB_VITAL_TARGETS
            ),
        },

        "api": {
            "workload_timing": (
                api_workload_rows
            ),
            "endpoint_metric_matrix": (
                api_endpoint_rows
            ),
            "threshold_status": (
                api_threshold_rows
            ),
        },

        "ui": {
            "workload_results": (
                ui_workload_rows
            ),
            "page_level_results": (
                ui_page_rows
            ),
        },

        "source_result_files": [
            {
                "file": filename,
                "status": (
                    "MISSING"
                    if not (
                        RESULTS_DIR / filename
                    ).exists()
                    else (
                        "INVALID JSON"
                        if filename in invalid_files
                        else "FOUND"
                    )
                ),
            }
            for filename in EXPECTED_FILES
        ],
    }


# ============================================================
# SUMMARY HTML
# ============================================================

def build_summary_html(
    api_runs: list[dict[str, Any]],
    ui_runs: list[dict[str, Any]],
    api_endpoint_rows: list[dict[str, Any]],
    api_threshold_rows: list[dict[str, Any]],
    api_workload_rows: list[dict[str, Any]],
    ui_page_rows: list[dict[str, Any]],
    ui_workload_rows: list[dict[str, Any]],
    missing_files: list[str],
    invalid_files: list[str],
    api_targets: dict[str, float],
    ui_targets: dict[str, float],
) -> str:

    html_parts = [
        HTML_HEAD.format(
            title=(
                "CMMA Navigation "
                "Performance Summary"
            )
        ),

        "<h1>"
        "CMMA Navigation Performance Summary"
        "</h1>",

        (
            '<p class="small">'
            "Generated from the available API and UI "
            "k6 result JSON files."
            "</p>"
        ),
    ]

    html_parts.extend(
        [
            "<h2>Document Information</h2>",
            build_document_information(
                api_runs,
                ui_runs,
            ),

            "<h2>Execution Summary</h2>",
            build_execution_summary(
                api_runs,
                ui_runs,
                len(api_endpoint_rows),
                len(ui_page_rows),
                missing_files,
                invalid_files,
            ),

            "<h2>Test Environment</h2>",
            build_test_environment(
                api_runs,
                ui_runs,
            ),

            "<h2>Performance Targets</h2>",
            build_performance_targets(
                api_targets,
                ui_targets,
            ),

            "<h2>"
            "Web Vital Observational Targets"
            "</h2>",
            build_web_vital_targets(),

            "<h2>API Performance Results</h2>",

            "<h3>API Workload Timing</h3>",
            build_api_workload_timing(
                api_workload_rows
            ),

            "<h3>API Endpoint Metric Matrix</h3>",
            build_api_endpoint_matrix(
                api_endpoint_rows
            ),

            "<h3>API Threshold Status</h3>",
            build_api_threshold_status(
                api_threshold_rows
            ),

            "<h2>UI Browser Performance</h2>",

            "<h3>UI Workload Results</h3>",
            build_ui_workload_results(
                ui_workload_rows
            ),

            "<h3>UI Page-Level Results</h3>",
            build_ui_page_level_results(
                ui_page_rows
            ),

            "<h2>UI vs API</h2>",
            build_ui_vs_api(
                api_workload_rows,
                ui_workload_rows,
            ),

            "<h2>Missing Files</h2>",
            build_missing_files(
                missing_files,
                invalid_files,
            ),

            "<h2>Execution Notes</h2>",
            build_execution_notes(),

            "<h2>Source Result Files</h2>",
            build_source_files(
                invalid_files
            ),

            HTML_FOOT,
        ]
    )

    return "\n".join(html_parts)


# ============================================================
# COMPARISON HTML
# ============================================================

def build_comparison_html(
    api_workload_rows: list[dict[str, Any]],
    ui_workload_rows: list[dict[str, Any]],
) -> str:

    api_map = {
        row["workload"]: row
        for row in api_workload_rows
    }

    ui_map = {
        row["workload"]: row
        for row in ui_workload_rows
    }

    workload_order = [
        "1 VU / 1 iter",
        "1 VU / 5 iter",
        "5 VU / 5 iter",
        "25 VU / 5 iter",
    ]

    workloads = []

    for workload in workload_order:

        if (
            workload in api_map
            or workload in ui_map
        ):
            workloads.append(
                workload
            )

    for workload in (
        list(api_map) + list(ui_map)
    ):

        if workload not in workloads:
            workloads.append(
                workload
            )

    rows = []

    for workload in workloads:

        api = api_map.get(
            workload,
            {},
        )

        ui = ui_map.get(
            workload,
            {},
        )

        rows.append(
            [
                escape(workload),

                escape(
                    str(
                        api.get(
                            "requests",
                            "N/A",
                        )
                    )
                ),

                escape(
                    fmt_ms(
                        api.get("p95")
                    )
                ),

                escape(
                    fmt_ms(
                        api.get("p99")
                    )
                ),

                escape(
                    fmt_pct(
                        api.get("error_pct")
                    )
                ),

                status_badge(
                    api.get(
                        "overall_performance_status",
                        "N/A",
                    )
                ),

                escape(
                    str(
                        ui.get(
                            "navigation_samples",
                            "N/A",
                        )
                    )
                ),

                escape(
                    fmt_ms(
                        ui.get(
                            "navigation_p95"
                        )
                    )
                ),

                escape(
                    fmt_ms(
                        ui.get(
                            "navigation_p99"
                        )
                    )
                ),

                status_badge(
                    ui.get(
                        "overall_performance_status",
                        "N/A",
                    )
                ),
            ]
        )

    html_parts = [
        HTML_HEAD.format(
            title=(
                "CMMA Navigation "
                "Performance Comparison"
            )
        ),

        (
            "<h1>"
            "CMMA Navigation Performance Comparison"
            "</h1>"
        ),

        (
            '<p class="small">'
            "API and UI performance are compared by "
            "workload. No charts or graphs are used."
            "</p>"
        ),

        table(
            [
                "Workload",
                "API Requests",
                "API p95",
                "API p99",
                "API Error %",
                "API Performance",
                "UI Navigation Samples",
                "UI Navigation p95",
                "UI Navigation p99",
                "UI Performance",
            ],
            rows,
        ),

        "<h2>Comparison Notes</h2>",

        "<ul>",

        (
            "<li>"
            "API Performance is based on the API "
            "workload performance checks."
            "</li>"
        ),

        (
            "<li>"
            "UI Performance is based on UI checks, "
            "page success, browser HTTP failures, "
            "navigation p95 and navigation p99."
            "</li>"
        ),

        (
            "<li>"
            "Web Vitals are observational and are not "
            "used as a blocking performance gate."
            "</li>"
        ),

        "</ul>",

        HTML_FOOT,
    ]

    return "\n".join(html_parts)


# ============================================================
# MAIN
# ============================================================

def main() -> None:

    print(
        f"[INFO] Results directory: "
        f"{RESULTS_DIR}"
    )

    (
        api_runs,
        ui_runs,
        invalid_files,
    ) = load_runs()

    missing_files = [
        filename
        for filename in EXPECTED_FILES
        if not (
            RESULTS_DIR / filename
        ).exists()
    ]

    # --------------------------------------------------------
    # Targets
    #
    # Each workload uses the targets from its own JSON.
    # The representative target sets are used only for the
    # consolidated report target section.
    # --------------------------------------------------------

    api_targets = representative_targets(
        api_runs,
        DEFAULT_API_TARGETS,
    )

    ui_targets = representative_targets(
        ui_runs,
        DEFAULT_UI_TARGETS,
    )

    api_targets_by_workload = (
        resolve_targets_for_runs(
            api_runs,
            DEFAULT_API_TARGETS,
        )
    )

    ui_targets_by_workload = (
        resolve_targets_for_runs(
            ui_runs,
            DEFAULT_UI_TARGETS,
        )
    )

    # --------------------------------------------------------
    # API
    # --------------------------------------------------------

    endpoint_rows: list[
        dict[str, Any]
    ] = []

    api_threshold_rows: list[
        dict[str, Any]
    ] = []

    api_workload_rows: list[
        dict[str, Any]
    ] = []

    for run in api_runs:

        data = run["data"]
        workload = run["workload"]

        workload_targets = (
            api_targets_by_workload.get(
                workload,
                DEFAULT_API_TARGETS,
            )
        )

        endpoint_rows.extend(
            extract_api_endpoint_rows(
                data,
                workload,
            )
        )

        api_threshold_rows.extend(
            extract_api_threshold_rows(
                data,
                workload,
                workload_targets,
            )
        )

        api_workload_rows.append(
            extract_api_workload_timing(
                data,
                workload,
                workload_targets,
            )
        )

    # --------------------------------------------------------
    # UI
    # --------------------------------------------------------

    ui_page_rows: list[
        dict[str, Any]
    ] = []

    ui_workload_rows: list[
        dict[str, Any]
    ] = []

    for run in ui_runs:

        data = run["data"]
        workload = run["workload"]

        workload_targets = (
            ui_targets_by_workload.get(
                workload,
                DEFAULT_UI_TARGETS,
            )
        )

        ui_page_rows.extend(
            extract_ui_pages(
                data,
                workload,
            )
        )

        ui_workload_rows.append(
            extract_ui_workload_result(
                data,
                workload,
                workload_targets,
            )
        )

    # --------------------------------------------------------
    # JSON
    # --------------------------------------------------------

    summary = build_summary_json(
        api_runs,
        ui_runs,
        endpoint_rows,
        api_threshold_rows,
        api_workload_rows,
        ui_page_rows,
        ui_workload_rows,
        missing_files,
        invalid_files,
        api_targets,
        ui_targets,
    )

    with OUTPUT_JSON.open(
        "w",
        encoding="utf-8",
    ) as handle:

        json.dump(
            summary,
            handle,
            indent=2,
            ensure_ascii=False,
        )

    # --------------------------------------------------------
    # HTML
    # --------------------------------------------------------

    summary_html = build_summary_html(
        api_runs,
        ui_runs,
        endpoint_rows,
        api_threshold_rows,
        api_workload_rows,
        ui_page_rows,
        ui_workload_rows,
        missing_files,
        invalid_files,
        api_targets,
        ui_targets,
    )

    with OUTPUT_HTML.open(
        "w",
        encoding="utf-8",
    ) as handle:

        handle.write(
            summary_html
        )

    comparison_html = build_comparison_html(
        api_workload_rows,
        ui_workload_rows,
    )

    with OUTPUT_COMPARISON_HTML.open(
        "w",
        encoding="utf-8",
    ) as handle:

        handle.write(
            comparison_html
        )

    # --------------------------------------------------------
    # Console summary
    # --------------------------------------------------------

    api_failed_endpoint_count = sum(
        1
        for row in endpoint_rows
        if str(
            row.get(
                "status",
                "",
            )
        ).upper()
        in {
            "FAIL",
            "FAILED",
        }
    )

    api_check_endpoint_count = sum(
        1
        for row in endpoint_rows
        if str(
            row.get(
                "status",
                "",
            )
        ).upper()
        in {
            "CHECK",
            "OBS",
        }
    )

    api_invalid_auth_count = sum(
        1
        for row in api_workload_rows
        if row[
            "overall_performance_status"
        ] == "INVALID-AUTH"
    )

    performance_failed_check_count = sum(
        1
        for row in api_threshold_rows
        if row["result"] == "FAIL"
    )

    performance_failed_workload_count = sum(
        1
        for row in ui_workload_rows
        if row[
            "overall_performance_status"
        ] == "FAIL"
    )

    ui_web_vital_rows = sum(
        1
        for row in ui_page_rows
        if row.get("web_vitals")
    )

    print(
        f"[PASS] {OUTPUT_JSON}"
    )

    print(
        f"[PASS] {OUTPUT_HTML}"
    )

    print(
        f"[PASS] {OUTPUT_COMPARISON_HTML}"
    )

    print(
        f"API endpoint rows       : "
        f"{len(endpoint_rows)}"
    )

    print(
        f"API threshold rows      : "
        f"{len(api_threshold_rows)}"
    )

    print(
        f"API failed endpoints   : "
        f"{api_failed_endpoint_count}"
    )

    print(
        f"API CHECK endpoints    : "
        f"{api_check_endpoint_count}"
    )

    print(
        f"API INVALID-AUTH runs  : "
        f"{api_invalid_auth_count}"
    )

    print(
        f"API failed checks      : "
        f"{performance_failed_check_count}"
    )

    print(
        f"UI failed workloads    : "
        f"{performance_failed_workload_count}"
    )

    print(
        f"UI page rows           : "
        f"{len(ui_page_rows)}"
    )

    print(
        f"UI Web Vital rows      : "
        f"{ui_web_vital_rows}"
    )

    print(
        f"Missing files          : "
        f"{len(missing_files)}"
    )

    print(
        f"Invalid JSON files     : "
        f"{len(invalid_files)}"
    )


if __name__ == "__main__":
    main()