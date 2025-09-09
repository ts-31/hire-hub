from fastapi import APIRouter, Depends, HTTPException, status, Body
from sqlalchemy.orm import Session
from app.config.db import get_db
from app.models.users import User
from app.auth.dependencies import verify_token

router = APIRouter()


@router.post("/check-user")
def check_user(
    payload: dict = Body(...),
    token_data: dict = Depends(verify_token),
    db: Session = Depends(get_db),
):
    """
    Check if user exists, create if not, and enforce company rules:
      - HR can create company only if it doesn't exist.
      - Recruiter can join existing company only.
    """
    uid = token_data.get("uid")
    email = token_data.get("email")
    name = token_data.get("name")

    # Expecting payload to contain role and company_name
    role = payload.get("role")
    company_name = payload.get("company_name", "").strip().lower()

    if not role or not company_name:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="role and company_name are required in request body",
        )

    # Check if user already exists
    user = db.query(User).filter(User.firebase_uid == uid).first()

    if user:
        # User already exists → return info
        return {
            "message": "User already exists",
            "user": {
                "uid": user.firebase_uid,
                "name": user.name,
                "email": user.email,
                "role": user.role,
                "company_name": user.company_name,
            },
        }

    # Normalize company name for comparison
    existing_company = (
        db.query(User).filter(User.company_name.ilike(company_name)).first()
    )

    # HR logic
    if role.lower() == "hr":
        if existing_company:
            # Company already exists, cannot create HR for it
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Company already exists. Cannot create HR for this company.",
            )
        # Create new HR with this company
        new_user = User(
            firebase_uid=uid,
            email=email,
            name=name,
            role="HR",
            company_name=company_name,
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {
            "message": "HR user created successfully",
            "user": {
                "uid": new_user.firebase_uid,
                "name": new_user.name,
                "email": new_user.email,
                "role": new_user.role,
                "company_name": new_user.company_name,
            },
        }

    # Recruiter logic
    elif role.lower() == "recruiter":
        if not existing_company:
            # Cannot create recruiter if company doesn't exist
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Company does not exist. Please contact HR.",
            )
        # Company exists → create recruiter
        new_user = User(
            firebase_uid=uid,
            email=email,
            name=name,
            role="Recruiter",
            company_name=existing_company.company_name,
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {
            "message": "Recruiter user created successfully",
            "user": {
                "uid": new_user.firebase_uid,
                "name": new_user.name,
                "email": new_user.email,
                "role": new_user.role,
                "company_name": new_user.company_name,
            },
        }

    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid role. Must be 'HR' or 'Recruiter'.",
        )
