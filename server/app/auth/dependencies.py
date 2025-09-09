from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from firebase_admin import auth
import app.core.firebase

security = HTTPBearer()


def verify_token(auth_credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = auth_credentials.credentials
    print(f"[AUTH] Verifying token: {token[:10]}...")
    try:
        decoded_token = auth.verify_id_token(token)
        print(f"[AUTH SUCCESS] Token verified → UID={decoded_token.get('uid')}")
        return decoded_token
    except Exception as e:
        print(f"[AUTH ERROR] Token verification failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid or expired token: {str(e)}",
        )
