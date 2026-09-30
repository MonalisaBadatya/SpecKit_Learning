SELECT_ADMIN_BY_EMAIL = """
SELECT "platformAdminId", "email", "passwordHash", "authProvider", "lastLoginAt"
FROM "cmma_core"."platformAdmin"
WHERE "email" = %s;
"""

SELECT_CORE_MFA_RECORD = """
SELECT "mfaVerificationId", "platformAdminId", "deviceFingerprint", "isTrusted", "expiresAt", "createdAt"
FROM "cmma_core"."mfaVerification"
WHERE "platformAdminId" = %s AND "deviceFingerprint" = %s;
"""

SELECT_CORE_TRUSTED_MFA = """
SELECT * FROM "cmma_core"."mfaVerification"
WHERE "platformAdminId" = %s AND "deviceFingerprint" = %s AND "isTrusted" = TRUE AND "expiresAt" > NOW();
"""

INSERT_CORE_MFA = """
INSERT INTO "cmma_core"."mfaVerification" ("platformAdminId", "deviceFingerprint", "isTrusted", "expiresAt")
VALUES (%s, %s, %s, %s)
RETURNING "mfaVerificationId";
"""
