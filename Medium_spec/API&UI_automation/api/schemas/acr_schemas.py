from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

class DateRange(BaseModel):
    start: str
    end: str

class ResourceRef(BaseModel):
    id: Optional[str] = None
    name: Optional[str] = None

class ConflictDetail(BaseModel):
    date: str
    reason: str

class TokenPreviewResponse(BaseModel):
    valid: bool
    changeRequestId: Optional[str] = None
    action: Optional[str] = None
    projectName: Optional[str] = None
    workerName: Optional[str] = None
    tradeName: Optional[str] = None
    currentDates: Optional[DateRange] = None
    proposedDates: Optional[DateRange] = None
    currentHoursPerDay: Optional[float] = None
    proposedHoursPerDay: Optional[float] = None
    requesterName: Optional[str] = None
    requesterComments: Optional[str] = None
    hasConflict: Optional[bool] = None
    conflictDetails: Optional[List[ConflictDetail]] = None
    extendsProject: Optional[bool] = None
    isHistoricLocked: Optional[bool] = None

class TokenExecuteResponse(BaseModel):
    success: bool
    changeRequestId: str
    assignmentId: Optional[str] = None
    status: str
    message: Optional[str] = None

class InAppApproveResponse(BaseModel):
    success: bool
    changeRequestId: str
    assignmentId: Optional[str] = None
    status: str

class InAppRejectResponse(BaseModel):
    success: bool
    changeRequestId: str
    status: str

class ChangeRequestItem(BaseModel):
    changeRequestId: str
    assignmentId: Optional[str] = None
    projectId: Optional[str] = None
    projectName: Optional[str] = None
    tradeName: Optional[str] = None
    proposedResource: Optional[ResourceRef] = None
    proposedDates: Optional[DateRange] = None
    requester: Optional[ResourceRef] = None
    status: str
    createdDateTime: Optional[str] = None

class ListChangeRequestsResponse(BaseModel):
    items: List[ChangeRequestItem]
    total: int
    limit: int
    offset: int

class ErrorResponse(BaseModel):
    error: Optional[str] = None
    message: Optional[str] = None
    statusCode: Optional[int] = None
