import json
import os
from urllib.parse import urlparse

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

HAR_PATH = os.path.join(
    BASE_DIR,
    "har",
    "effective_date_reassign_unassign.har"
)

OUTPUT_PATH = os.path.join(
    BASE_DIR,
    "analysis",
    "api_inventory.json"
)

os.makedirs(
    os.path.dirname(OUTPUT_PATH),
    exist_ok=True
)


BUSINESS_KEYWORDS = [
    "assign",
    "assignment",
    "unassign",
    "reassign",
    "effective",
    "worker",
]


AUTH_KEYWORDS = [
    "login",
    "logout",
    "refresh",
    "token",
    "session",
]


STATIC_EXTENSIONS = [
    ".js",
    ".css",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".woff",
    ".woff2",
    ".ico",
]


def classify_request(method, path, body):
    text = f"{method} {path} {body}".lower()

    if any(keyword in text for keyword in AUTH_KEYWORDS):
        return "AUTH"

    if any(keyword in path.lower() for keyword in BUSINESS_KEYWORDS):
        return "BUSINESS_CANDIDATE"

    if any(path.lower().endswith(ext) for ext in STATIC_EXTENSIONS):
        return "STATIC"

    if method in ["POST", "PUT", "PATCH", "DELETE"]:
        return "MUTATION_CANDIDATE"

    return "SUPPORTING"


with open(HAR_PATH, "r", encoding="utf-8") as f:
    har = json.load(f)


inventory = []

for index, entry in enumerate(har["log"]["entries"], start=1):

    request = entry["request"]
    response = entry["response"]

    method = request["method"].upper()
    url = request["url"]

    parsed = urlparse(url)

    path = parsed.path

    body = ""

    post_data = request.get("postData")

    if post_data:
        body = post_data.get("text", "")

    classification = classify_request(
        method,
        path,
        body
    )

    inventory.append({
        "har_index": index,
        "method": method,
        "host": parsed.netloc,
        "path": path,
        "status": response.get("status"),
        "classification": classification,
        "request_body": body
    })


with open(
    OUTPUT_PATH,
    "w",
    encoding="utf-8"
) as f:

    json.dump(
        inventory,
        f,
        indent=2
    )


print("=" * 100)
print("HAR ANALYSIS COMPLETE")
print("=" * 100)
print(f"HAR      : {HAR_PATH}")
print(f"Inventory: {OUTPUT_PATH}")
print(f"Requests : {len(inventory)}")
print("=" * 100)

for item in inventory:

    if item["classification"] in [
        "BUSINESS_CANDIDATE",
        "MUTATION_CANDIDATE"
    ]:

        print(
            f'{item["har_index"]:>4} | '
            f'{item["method"]:<7} | '
            f'{item["status"]:<3} | '
            f'{item["classification"]:<20} | '
            f'{item["path"]}'
        )