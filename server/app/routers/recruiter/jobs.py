# server/app/routers/recruiter/jobs.py
from fastapi import APIRouter, Request, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.config.db import get_db
from app.utils.auth import require_recruiter
from app.models.jobs import Job
from app.models.company import Company

router = APIRouter(prefix="/recruiter/jobs", tags=["recruiter-jobs"])


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_job(
    request: Request,
    db: Session = Depends(get_db),
    current_user=Depends(require_recruiter),
):
    """
    Create a job for the recruiter's company.
    Frontend should send JSON body:
      { "title": "...", "description": "..." }
    Company is derived from current_user (server-side).
    """
    # parse body 
    print("Req comes to create job", request.cookies)
    try:
        payload = await request.json()
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid JSON body."
        )

    title = (payload.get("title") or "").strip()
    description = (payload.get("description") or "").strip()

    # Basic validation
    if not title or not description:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Both title and description are required.",
        )
    if len(title) > 255:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Title too long (max 255)."
        )
    if len(description) < 10:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Description too short (min 10).",
        )

    # Derive company_id from current_user (preferred for single-company recruiters)
    company_id = getattr(current_user, "company_id", None)
    if company_id is None:
        # maybe relationship `company` exists
        company_rel = getattr(current_user, "company", None)
        if company_rel is not None and getattr(company_rel, "id", None) is not None:
            company_id = company_rel.id

    if company_id is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Recruiter is not associated with any company.",
        )

    # Verify company actually exists (defense-in-depth)
    company = db.query(Company).filter(Company.id == company_id).first()
    if not company:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Associated company not found.",
        )

    # Create job
    job = Job(
        title=title,
        description=description,
        company_id=company_id,
        recruiter_id=current_user.id,
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    # Return a plain JSON object (no Pydantic model)
    return {
        "id": job.id,
        "title": job.title,
        "description": job.description,
        "company_id": job.company_id,
        "recruiter_id": job.recruiter_id,
        "created_at": job.created_at.isoformat() if job.created_at else None,
    }
