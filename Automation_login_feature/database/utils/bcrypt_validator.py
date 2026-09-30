import re
from typing import Optional

BCRYPT_REGEX = re.compile(r"^\$2[abxy]?\$10\$[./A-Za-z0-9]{53}$")

def is_valid_bcrypt_hash(hash_str: Optional[str], salt_factor: int = 10) -> bool:
    """Validates that a string matches the standard bcrypt format with specified salt cost."""
    if not hash_str:
        return False
    if salt_factor == 10:
        return bool(BCRYPT_REGEX.match(hash_str))
    pattern = rf"^\$2[abxy]?\${salt_factor:02d}\$[./A-Za-z0-9]{{53}}$"
    return bool(re.match(pattern, hash_str))
