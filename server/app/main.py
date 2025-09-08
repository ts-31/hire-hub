from fastapi import FastAPI
from app.routers import protected

app = FastAPI()

app.include_router(protected.router)


@app.get("/")
def root():
    return {"message": "Welcome to FastAPI + Firebase Auth backend"}
