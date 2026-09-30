from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[3]
STORAGE_STATE = PROJECT_ROOT / "automation" / "ui" / "storage_state.json"
MFA_SCRIPT = PROJECT_ROOT / "automation" / "ui" / "utils" / "interactive_mfa.py"
SESSION_COOKIE = "cmma_session"


def has_valid_session_cookie() -> bool:
    """Return True when cmma_session exists and has a non-empty value."""
    if not STORAGE_STATE.exists():
        return False

    try:
        with STORAGE_STATE.open("r", encoding="utf-8") as file:
            state = json.load(file)

        for cookie in state.get("cookies", []):
            if cookie.get("name") == SESSION_COOKIE:
                return bool(cookie.get("value"))

    except (json.JSONDecodeError, OSError, TypeError):
        return False

    return False


def run_mfa_refresh() -> bool:
    """Run the existing MFA flow and return True on successful completion."""
    if not MFA_SCRIPT.exists():
        print(f"ERROR: MFA script not found: {MFA_SCRIPT}")
        return False

    print("AUTH_REQUIRED")
    print("Starting MFA authentication flow...")

    result = subprocess.run(
        [sys.executable, str(MFA_SCRIPT)],
        cwd=PROJECT_ROOT,
    )

    if result.returncode != 0:
        print("MFA flow failed.")
        return False

    return has_valid_session_cookie()


def main() -> int:
    print("Checking authentication state...")

    if not STORAGE_STATE.exists():
        print("storage_state.json not found.")
        return 1 if not run_mfa_refresh() else success()

    if has_valid_session_cookie():
        return success()

    print("cmma_session is missing or empty.")

    if run_mfa_refresh():
        return success()

    print("AUTH_FAILED")
    return 1


def success() -> int:
    print("AUTH_VALID")
    print(f"Session cookie: {SESSION_COOKIE}")
    print("Authentication state is ready.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())