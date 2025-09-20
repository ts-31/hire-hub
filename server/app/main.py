from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.db import Base, engine
from app.models import *
from app.routers import users
from app.routers.recruiter import jobs
import app.core.firebase as firebase_core

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://your-frontend-domain.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Ensure firebase is initialized at startup (per-process)
@app.on_event("startup")
def startup_event():
    firebase_core.init_firebase()


app.include_router(users.router)
app.include_router(jobs.router)
