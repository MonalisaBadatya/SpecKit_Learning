"""Pydantic schemas and data models for Effective Date Split API.

Traceability:
- REQ-EDRU-006 (Unassign split payload and response)
- REQ-EDRU-007 (Reassign split payload and response)
- REQ-EDRU-009 (Conflict override flag)
- REQ-EDRU-010 (Historic lockout override flag)
- REQ-EDRU-011 (OCC versioning)
"""
from typing import Optional
from pydantic import BaseModel, Field


class SplitAssignmentRequest(BaseModel):
    """Payload for POST .../split endpoint."""
    assignmentId: Optional[str] = Field(default=None, description="Target assignment ID to split")
    version: int = Field(..., description="Current OCC version of the assignment record")
    splitDate: str = Field(..., description="Effective date for the split in YYYY-MM-DD")
    targetWorkerId: Optional[str] = Field(default=None, description="Replacement worker ID for Reassign; null for Unassign")
    overrideConflict: Optional[bool] = Field(default=False, description="Flag to confirm scheduling conflict override")
    overrideHistoricLockout: Optional[bool] = Field(default=False, description="Flag to confirm historic lockout override (< today - 7 days)")


class AssignmentDetailResponse(BaseModel):
    """Assignment record details."""
    id: str
    startDate: str
    endDate: str
    version: int
    workerId: Optional[str] = None


class SplitAssignmentResponse(BaseModel):
    """Response payload for successful split mutation."""
    message: Optional[str] = None
    originalAssignment: Optional[AssignmentDetailResponse] = None
    createdLaborRequestId: Optional[str] = None
    createdAssignmentId: Optional[str] = None
