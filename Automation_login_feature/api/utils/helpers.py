import time
from typing import Callable, Any, Dict, Optional
import requests

def retry_until(
    fn: Callable[[], requests.Response],
    expected_status: int,
    max_retries: int = 3,
    delay_seconds: float = 1.0
) -> requests.Response:
    last_response = None
    for _ in range(max_retries):
        last_response = fn()
        if last_response.status_code == expected_status:
            return last_response
        time.sleep(delay_seconds)
    return last_response
