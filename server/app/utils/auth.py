# app/utils/auth.py
import os
from typing import Optional, Dict, Any

from fastapi import Request, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core import firebase as firebase_core  # ensures firebase module is present
from app.core.firebase import firebase_auth
from app.config.db import get_db
from app.models.users import User

COOKIE_NAME = os.getenv("COOKIE_NAME", "session")


def verify_session_cookie(
    request: Request, check_revoked: bool = True
) -> Dict[str, Any]:
    """
    Strict verification of the Firebase session cookie.
    Raises HTTPException(401) on failure.
    Returns decoded token dict on success.
    """
    session_cookie = request.cookies.get(COOKIE_NAME)
    if not session_cookie:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="No session cookie found."
        )

    try:
        decoded = firebase_auth.verify_session_cookie(
            session_cookie, check_revoked=check_revoked
        )
    except Exception as e:
        # Don't leak internals; include message for debugging
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid/expired session cookie: {e}",
        )

    return decoded


def verify_session_cookie_dependency(request: Request = Depends()) -> Dict[str, Any]:
    """
    FastAPI dependency wrapper for cookie-only verification (revocation checked).
    Use: token_claims = Depends(verify_session_cookie_dependency)
    """
    return verify_session_cookie(request, check_revoked=True)


def decode_session_cookie_best_effort(request: Request) -> Optional[Dict[str, Any]]:
    """
    Best-effort decode for flows like logout:
    - If cookie missing/invalid/revoked -> return None (do NOT raise).
    - If valid -> return decoded dict.
    """
    session_cookie = request.cookies.get(COOKIE_NAME)
    if not session_cookie:
        return None
    try:
        decoded = firebase_auth.verify_session_cookie(
            session_cookie, check_revoked=False
        )
        return decoded
    except Exception:
        return None


def get_current_user(request: Request, db: Session = Depends(get_db)) -> User:
    """
    Full dependency that (1) verifies session cookie (revocation enforced),
    (2) loads the User from DB and returns the SQLAlchemy User instance.
    Raises 401 if cookie invalid or user not found.
    """
    decoded = verify_session_cookie(request, check_revoked=True)
    uid = decoded.get("uid")
    if not uid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token: missing uid.",
        )

    user = db.query(User).filter(User.firebase_uid == uid).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found."
        )
    # optional: check user.is_active or other flags here
    return user


# Role-based helpers
def require_hr(current_user: User = Depends(get_current_user)) -> User:
    if not getattr(current_user, "role", "").lower() == "hr":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="HR only")
    return current_user


def require_recruiter(current_user: User = Depends(get_current_user)) -> User:
    if not getattr(current_user, "role", "").lower() == "recruiter":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Recruiter only"
        )
    return current_user
