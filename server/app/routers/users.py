# app/routers/users.py  (or wherever your route lives)
from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.config.db import get_db
from app.models.users import User
from app.auth.dependencies import verify_token

# Firebase admin auth
from firebase_admin import auth as firebase_auth

router = APIRouter()


def _set_custom_claims_safe(uid: str, role: str, company_name: str):
    """
    Try to set Firebase custom claims for user. Log errors but do not block DB creation.
    """
    try:
        claims = {"role": role, "company": company_name}
        firebase_auth.set_custom_user_claims(uid, claims)
        print(f"[FIREBASE] set_custom_user_claims OK for uid={uid}, claims={claims}")
    except Exception as e:
        # Log but don't raise — DB user already created; claims can be retried later
        print(f"[FIREBASE ERROR] Failed setting custom claims for uid={uid}: {e}")


@router.post("/check-user")
def check_user(
    payload: dict | None = Body(None),  # optional body
    token_data: dict = Depends(verify_token),
    db: Session = Depends(get_db),
):
    """
    Dual-mode endpoint:
      - If no body / empty body: login-check mode.
          * If user exists -> return user (200).
          * If user does not exist -> 404 "User is not registered".
      - If body provided with role + company_name: registration mode.
          * Enforces HR/Recruiter rules and creates a new user (201) or errors (400).
    """
    uid = token_data.get("uid")
    email = token_data.get("email")
    name = token_data.get("name")

    # If no payload or empty payload -> LOGIN CHECK mode
    if not payload:
        user = db.query(User).filter(User.firebase_uid == uid).first()
        if user:
            return JSONResponse(
                content={
                    "message": "User exists",
                    "user": {
                        "uid": user.firebase_uid,
                        "name": user.name,
                        "email": user.email,
                        "role": user.role,
                        "company_name": user.company_name,
                    },
                },
                status_code=status.HTTP_200_OK,
            )
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User is not registered",
        )

    # Otherwise payload present -> REGISTRATION mode
    role = (payload.get("role") or "").strip()
    company_name_raw = payload.get("company_name", "")
    company_name = company_name_raw.strip() if isinstance(company_name_raw, str) else ""

    if not role or not company_name:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="role and company_name are required in request body for registration",
        )

    # Check if user already exists — if so, reject registration attempt
    existing_user = db.query(User).filter(User.firebase_uid == uid).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already registered. Please login instead.",
        )

    # Normalize company matching for lookups (case-insensitive)
    existing_company_user = (
        db.query(User).filter(User.company_name.ilike(company_name)).first()
    )

    # HR registration: company must NOT exist
    if role.lower() == "hr":
        if existing_company_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Company already exists. Cannot create HR for this company.",
            )

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

        # Set custom claims in Firebase (best-effort)
        _set_custom_claims_safe(
            new_user.firebase_uid, new_user.role, new_user.company_name
        )

        return JSONResponse(
            content={
                "message": "HR user created successfully",
                "user": {
                    "uid": new_user.firebase_uid,
                    "name": new_user.name,
                    "email": new_user.email,
                    "role": new_user.role,
                    "company_name": new_user.company_name,
                },
            },
            status_code=status.HTTP_201_CREATED,
        )

    # Recruiter registration: company MUST exist
    if role.lower() == "recruiter":
        if not existing_company_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Company does not exist. Please contact HR.",
            )

        # Use the canonical company_name from DB to keep consistency
        new_user = User(
            firebase_uid=uid,
            email=email,
            name=name,
            role="Recruiter",
            company_name=existing_company_user.company_name,
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        # Set custom claims in Firebase (best-effort)
        _set_custom_claims_safe(
            new_user.firebase_uid, new_user.role, new_user.company_name
        )

        return JSONResponse(
            content={
                "message": "Recruiter user created successfully",
                "user": {
                    "uid": new_user.firebase_uid,
                    "name": new_user.name,
                    "email": new_user.email,
                    "role": new_user.role,
                    "company_name": new_user.company_name,
                },
            },
            status_code=status.HTTP_201_CREATED,
        )

    # Invalid role
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Invalid role. Must be 'HR' or 'Recruiter'.",
    )
