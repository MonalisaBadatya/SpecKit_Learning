from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class TenantRole(BaseModel):
    tenantId: str
    tenantName: str
    roleId: str
    roleName: str

class UserPayload(BaseModel):
    id: str
    email: str
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    role: Optional[str] = None
    roles: List[str] = Field(default_factory=list)
    permissions: List[str] = Field(default_factory=list)
    tenantRoles: List[TenantRole] = Field(default_factory=list)

class LoginSuccessResponse(BaseModel):
    access_token: str
    user: UserPayload

class MfaChallengeResponse(BaseModel):
    mfa_required: bool
    email: str

class CheckAuthTypeResponse(BaseModel):
    authType: str
    isSso: Optional[bool] = None
    isDisabled: Optional[bool] = None
    isNoAccount: Optional[bool] = None
    notFound: Optional[bool] = None
    message: Optional[str] = None

class TenantBranding(BaseModel):
    id: str
    name: str
    logo_url: Optional[str] = None
    theme_color: Optional[str] = None

class AuthFlags(BaseModel):
    local_enabled: bool
    entra_enabled: bool
    entra_client_id: Optional[str] = None
    entra_tenant_id: Optional[str] = None

class TenantConfigResponse(BaseModel):
    tenant: TenantBranding
    auth: AuthFlags
