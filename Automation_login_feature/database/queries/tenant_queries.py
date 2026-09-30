def get_tenant_account_by_email_query(tenant_slug: str) -> str:
    return f"""
    SELECT a."accountId", a."resourceId", a."passwordHash", a."ssoProviderUserId", a."status", r."email"
    FROM "cmma_{tenant_slug}"."account" a
    JOIN "cmma_{tenant_slug}"."resource" r ON a."resourceId" = r."resourceId"
    WHERE r."email" = %s;
    """

def get_tenant_mfa_record_query(tenant_slug: str) -> str:
    return f"""
    SELECT "mfaVerificationId", "resourceId", "deviceFingerprint", "isTrusted", "expiresAt", "createdAt"
    FROM "cmma_{tenant_slug}"."mfaVerification"
    WHERE "resourceId" = %s AND "deviceFingerprint" = %s;
    """

def get_tenant_trusted_mfa_query(tenant_slug: str) -> str:
    return f"""
    SELECT * FROM "cmma_{tenant_slug}"."mfaVerification"
    WHERE "resourceId" = %s AND "deviceFingerprint" = %s AND "isTrusted" = TRUE AND "expiresAt" > NOW();
    """

def get_unprovisioned_resource_query(tenant_slug: str) -> str:
    return f"""
    SELECT r."resourceId", a."accountId"
    FROM "cmma_{tenant_slug}"."resource" r
    LEFT JOIN "cmma_{tenant_slug}"."account" a ON r."resourceId" = a."resourceId"
    WHERE r."email" = %s;
    """
