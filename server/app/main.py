from fastapi import FastAPI
from app.config.db import Base, engine
from app.routers import users

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(users.router)
