from fastapi import APIRouter, Depends
from app.auth.dependencies import verify_token

router = APIRouter()


@router.get("/protected")
def protected_route(user_data: dict = Depends(verify_token)):
    return {"message": "Token is valid!", "user_id": user_data["uid"]}
