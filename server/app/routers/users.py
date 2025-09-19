# app/routers/users.py
from fastapi import APIRouter, Depends, HTTPException, status, Body, Request, Response
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from datetime import timedelta
from dotenv import load_dotenv
import os

load_dotenv()

from app.config.db import get_db
from app.models.users import User
from app.models.company import Company
from app.utils.auth import decode_session_cookie_best_effort


from app.core.firebase import firebase_auth

router = APIRouter()
_security = HTTPBearer()


def _set_custom_claims_safe(uid: str, role: str, company_name: str):
    """Try to set Firebase custom claims for user. Log errors but do not block DB creation."""
    try:
        claims = {"role": role, "company": company_name}
        firebase_auth.set_custom_user_claims(uid, claims)
        print(f"[FIREBASE] set_custom_user_claims OK for uid={uid}, claims={claims}")
    except Exception as e:
        print(f"[FIREBASE ERROR] Failed setting custom claims for uid={uid}: {e}")


def _make_session_cookie_response(content: dict, status_code: int, id_token: str):
    """Create a session cookie (14 days) from id_token and attach it to the JSONResponse."""
    expires_in = timedelta(days=14)
    try:
        session_cookie = firebase_auth.create_session_cookie(
            id_token, expires_in=expires_in
        )
    except Exception as e:
        print(f"[FIREBASE ERROR] create_session_cookie failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Failed to create session cookie: {e}",
        )

    print(
        f"[SESSION COOKIE] Generated session cookie (length={len(session_cookie)}): {session_cookie}"
    )
    resp = JSONResponse(content=content, status_code=status_code)
    resp.set_cookie(
        key="session",
        value=session_cookie,
        httponly=True,
        secure=True,
        samesite="Lax",
        path="/",
        max_age=int(expires_in.total_seconds()),
    )
    return resp


@router.post("/check-user")
def check_user(
    request: Request,
    payload: dict | None = Body(None),  # optional body
    credentials: HTTPAuthorizationCredentials = Depends(_security),
    db: Session = Depends(get_db),
):
    """
    Dual-mode endpoint:
      - If no body / empty body: login-check mode.
          * If user exists -> return user (200) and set session cookie.
          * If user does not exist -> 404 "User is not registered".
      - If body provided with role + company_name: registration mode.
          * Enforces HR/Recruiter rules and creates a new user (201), sets claims, sets cookie.
    The client must send Authorization: Bearer <idToken> for this endpoint.
    """
    print("Req rec at /check-user")
    print("Incoming cookies:", request.cookies)
    raw_token = credentials.credentials
    # verify id token to extract uid/email/name
    try:
        token_data = firebase_auth.verify_id_token(raw_token, clock_skew_seconds=10)
    except Exception as e:
        print(f"[AUTH ERROR] Token verification failed in check_user: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid or expired ID token: {e}",
        )

    uid = token_data.get("uid")
    email = token_data.get("email")
    name = token_data.get("name") or token_data.get("displayName") or ""

    # If no payload or empty payload -> LOGIN CHECK mode
    if not payload:
        user = db.query(User).filter(User.firebase_uid == uid).first()
        if user:
            # derive company_name from related Company row (if present)
            company_name = user.company.name if user.company else None

            content = {
                "message": "User exists",
                "user": {
                    "uid": user.firebase_uid,
                    "name": user.name,
                    "email": user.email,
                    "role": user.role,
                    "company_name": company_name,
                },
            }
            # Create session cookie and include it in response
            return _make_session_cookie_response(
                content, status_code=status.HTTP_200_OK, id_token=raw_token
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
        db.query(Company).filter(Company.name.ilike(company_name)).first()
    )

    # HR registration: company must NOT exist
    if role.lower() == "hr":
        if existing_company_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Company already exists. Cannot create HR for this company.",
            )

        # Create HR user first (company_id left NULL), then create Company with hr_user_id,
        # then update user's company_id to point back to company.
        try:
            # 1) create HR user with company_id = None temporarily
            new_user = User(
                firebase_uid=uid,
                email=email,
                name=name,
                role="HR",
                company_id=None,
            )
            db.add(new_user)
            db.flush()  # populates new_user.id

            # 2) create Company referencing the new_user as hr_user
            new_company = Company(name=company_name, hr_user_id=new_user.id)
            db.add(new_company)
            db.flush()  # populates new_company.id

            # 3) update the user to reference the company
            new_user.company_id = new_company.id
            db.add(new_user)

            db.commit()
            db.refresh(new_user)
            db.refresh(new_company)

        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Registration failed: {e}",
            )

        # Set custom claims in Firebase (best-effort)
        _set_custom_claims_safe(new_user.firebase_uid, new_user.role, new_company.name)

        content = {
            "message": "HR user created successfully",
            "user": {
                "uid": new_user.firebase_uid,
                "name": new_user.name,
                "email": new_user.email,
                "role": new_user.role,
                "company_name": new_company.name,
            },
        }
        return _make_session_cookie_response(
            content, status_code=status.HTTP_201_CREATED, id_token=raw_token
        )

    # Recruiter registration: company MUST exist
    if role.lower() == "recruiter":
        if not existing_company_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Company does not exist. Please contact HR.",
            )

        # Use the canonical company_name from DB to keep consistency
        try:
            new_user = User(
                firebase_uid=uid,
                email=email,
                name=name,
                role="Recruiter",
                company_id=existing_company_user.id,
            )
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Registration failed: {e}",
            )

        # Set custom claims in Firebase (best-effort)
        _set_custom_claims_safe(
            new_user.firebase_uid, new_user.role, existing_company_user.name
        )

        content = {
            "message": "Recruiter user created successfully",
            "user": {
                "uid": new_user.firebase_uid,
                "name": new_user.name,
                "email": new_user.email,
                "role": new_user.role,
                "company_name": existing_company_user.name,
            },
        }
        return _make_session_cookie_response(
            content, status_code=status.HTTP_201_CREATED, id_token=raw_token
        )

    # Invalid role
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Invalid role. Must be 'HR' or 'Recruiter'.",
    )


COOKIE_NAME = os.getenv("COOKIE_NAME", "session")
COOKIE_DOMAIN = os.getenv("COOKIE_DOMAIN")
COOKIE_PATH = os.getenv("COOKIE_PATH", "/")
COOKIE_SECURE = os.getenv("COOKIE_SECURE", "false").lower() in ("1", "true", "yes")
COOKIE_SAMESITE = os.getenv("COOKIE_SAMESITE", "Lax")
COOKIE_HTTPONLY = True


@router.post("/session-logout")
def session_logout(decoded: dict | None = Depends(decode_session_cookie_best_effort)):
    """
    Logout route:
    - best-effort decode session cookie to get UID (optional)
    - revoke refresh tokens if desired
    - clear cookie in response
    """
    uid = decoded.get("uid") if decoded else None
    if uid:
        try:
            # optional: revoke Firebase refresh tokens
            firebase_auth.revoke_refresh_tokens(uid)
            print(f"[FIREBASE] Revoked refresh tokens for uid={uid}")
        except Exception as e:
            print(f"[FIREBASE] Failed to revoke tokens for uid={uid}: {e}")

    # Clear cookie in response
    from fastapi.responses import JSONResponse

    resp = JSONResponse({"message": "Logged out"}, status_code=200)
    if COOKIE_DOMAIN:
        resp.delete_cookie(COOKIE_NAME, path=COOKIE_PATH, domain=COOKIE_DOMAIN)
    else:
        resp.delete_cookie(COOKIE_NAME, path=COOKIE_PATH)

    # Explicitly set expired cookie
    resp.set_cookie(
        key=COOKIE_NAME,
        value="",
        max_age=0,
        expires=0,
        path=COOKIE_PATH,
        domain=COOKIE_DOMAIN if COOKIE_DOMAIN else None,
        secure=COOKIE_SECURE,
        httponly=COOKIE_HTTPONLY,
        samesite=COOKIE_SAMESITE if COOKIE_SAMESITE else "Lax",
    )
    return resp
