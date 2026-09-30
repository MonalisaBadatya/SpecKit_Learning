import json
import os
from urllib.parse import urlparse


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

HAR_PATH = os.path.join(
    BASE_DIR,
    "performance",
    "har",
    "effective_date_reassign_unassign.har"
)


with open(HAR_PATH, "r", encoding="utf-8") as f:
    har = json.load(f)


entries = har["log"]["entries"]


print("=" * 120)
print(f"Total requests in HAR: {len(entries)}")
print("=" * 120)


for i, entry in enumerate(entries, start=1):

    request = entry["request"]
    response = entry["response"]

    method = request["method"].upper()

    # Only show requests that can modify/send data
    if method not in ["POST", "PUT", "PATCH", "DELETE"]:
        continue

    url = request["url"]
    parsed = urlparse(url)

    print()
    print("=" * 120)
    print(f"REQUEST #{i}")
    print("=" * 120)

    print(f"Method : {method}")
    print(f"Status : {response['status']}")
    print(f"Host   : {parsed.netloc}")
    print(f"Path   : {parsed.path}")
    print(f"URL    : {url}")

    # Request body
    post_data = request.get("postData")

    if post_data:
        print("\n--- Request Body ---")

        body_text = post_data.get("text")

        if body_text:
            try:
                body = json.loads(body_text)
                print(json.dumps(body, indent=2))
            except json.JSONDecodeError:
                print(body_text)
    else:
        print("\n--- Request Body ---")
        print("No request body")

    print()