from sqlalchemy import Column, Integer, String, DateTime, func
from app.config.db import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String(128), unique=True, nullable=False)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    role = Column(String(20), nullable=False)
    company_name = Column(String(255), nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
