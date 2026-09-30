import json
import os
from urllib.parse import urlparse


HAR_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "performance",
    "har",
    "effective_date_reassign_unassign.har"
)


with open(HAR_PATH, "r", encoding="utf-8") as f:
    har = json.load(f)


entries = har["log"]["entries"]


for i, entry in enumerate(entries, start=1):

    request = entry["request"]
    response = entry["response"]

    method = request["method"].upper()

    if method not in ["POST", "PUT", "PATCH", "DELETE"]:
        continue

    url = request["url"]

    print()
    print("=" * 120)
    print(f"REQUEST #{i}")
    print("=" * 120)

    print(f"Method : {method}")
    print(f"Status : {response['status']}")
    print(f"URL    : {url}")

    # Request headers
    print("\n--- Request Headers ---")

    for header in request.get("headers", []):
        name = header["name"].lower()

        # Don't print authentication/session secrets
        if name in [
            "authorization",
            "cookie",
            "set-cookie",
            "x-api-key"
        ]:
            print(f"{header['name']}: [REDACTED]")
        else:
            print(f"{header['name']}: {header['value']}")

    # Request body
    post_data = request.get("postData")

    if post_data:

        print("\n--- Request Body ---")

        text = post_data.get("text")

        if text:
            try:
                body = json.loads(text)
                print(json.dumps(body, indent=2))
            except json.JSONDecodeError:
                print(text)

    print()