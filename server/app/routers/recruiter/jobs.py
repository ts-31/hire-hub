# server/app/routers/recruiter/jobs.py
from fastapi import APIRouter, Request, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.config.db import get_db
from app.utils.auth import require_recruiter
from app.models.jobs import Job
from app.models.company import Company

router = APIRouter(prefix="/recruiter", tags=["recruiter-jobs"])


@router.post("/jobs", status_code=status.HTTP_201_CREATED)
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


@router.get("/jobs", status_code=status.HTTP_200_OK)
async def list_recruiter_jobs(
    db: Session = Depends(get_db),
    current_user=Depends(require_recruiter),
):
    """
    List ALL jobs created by the logged-in recruiter.
    No search, no pagination.
    """
    jobs = (
        db.query(Job)
        .filter(Job.recruiter_id == current_user.id)
        .order_by(Job.created_at.desc())
        .all()
    )

    results = []
    for j in jobs:
        # Defensive: company relationship may not always be loaded
        company_name = None
        try:
            company_name = j.company.name if getattr(j, "company", None) else None
        except Exception:
            company_name = None

        results.append(
            {
                "id": j.id,
                "title": j.title,
                "description": j.description,
                "company_id": j.company_id,
                "company_name": company_name,
                "recruiter_id": j.recruiter_id,
                "created_at": j.created_at.isoformat() if j.created_at else None,
            }
        )

    return {"total": len(results), "jobs": results}


# GET /recruiter/jobs/summary
@router.get("/summary", status_code=status.HTTP_200_OK)
async def recruiter_summary(
    db: Session = Depends(get_db),
    current_user=Depends(require_recruiter),
):
    """
    Return totals for the logged-in recruiter:
      - total_jobs: number of jobs created by this recruiter
      - total_resumes: number of resumes submitted to this recruiter's jobs
      - total_shortlisted: number of shortlisted resumes (best-effort based on schema)

    Behavior is defensive so this endpoint works across slightly different schema shapes.
    """
    # Import models lazily so file-level imports don't fail if optional models are missing
    from app.models.jobs import Job

    # Jobs count (straightforward)
    jobs_count = db.query(Job).filter(Job.recruiter_id == current_user.id).count()

    # Resumes count: join Resume -> Job and filter by recruiter's jobs
    resumes_count = 0
    try:
        from app.models.resumes import Resume

        resumes_count = (
            db.query(Resume)
            .join(Job, Resume.job_id == Job.id)
            .filter(Job.recruiter_id == current_user.id)
            .count()
        )
    except Exception:
        # If Resume model is missing, keep resumes_count = 0 (defensive)
        resumes_count = 0

    # Shortlisted count: try to use an explicit Shortlist/Shortlisted model first,
    # otherwise check for a resume-level boolean flag `is_shortlisted`.
    shortlisted_count = 0
    ShortlistModel = None
    try:
        # common candidate model names: app.models.shortlisted.Shortlisted
        from app.models.shortlisted import Shortlisted as ShortlistModel
    except Exception:
        try:
            # app.models.shortlist.Shortlist
            from app.models.shortlist import Shortlist as ShortlistModel
        except Exception:
            ShortlistModel = None

    if ShortlistModel is not None:
        # If there's an explicit shortlist model, assume it has job_id FK
        try:
            shortlisted_count = (
                db.query(ShortlistModel)
                .join(Job, getattr(ShortlistModel, "job_id") == Job.id)
                .filter(Job.recruiter_id == current_user.id)
                .count()
            )
        except Exception:
            shortlisted_count = 0
    else:
        # fallback: if Resume model exists and has `is_shortlisted` boolean column
        try:
            # Resume may already be imported above; re-import to be safe
            from app.models.resumes import Resume

            if hasattr(Resume, "is_shortlisted"):
                shortlisted_count = (
                    db.query(Resume)
                    .join(Job, Resume.job_id == Job.id)
                    .filter(
                        Job.recruiter_id == current_user.id,
                        getattr(Resume, "is_shortlisted") == True,
                    )
                    .count()
                )
            else:
                shortlisted_count = 0
        except Exception:
            shortlisted_count = 0

    return {
        "total_jobs": jobs_count,
        "total_resumes": resumes_count,
        "total_shortlisted": shortlisted_count,
    }
