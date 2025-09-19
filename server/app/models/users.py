from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.config.db import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String(128), unique=True, nullable=False)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    role = Column(String(20), nullable=False)  # 'hr' | 'recruiter'

    # which company the user belongs to (recruiter or hr)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    company = relationship(
        "Company",
        back_populates="users",
        foreign_keys=[
            company_id
        ],  # ← explicit: use users.company_id to join to Company
    )

    jobs = relationship("Job", back_populates="recruiter", cascade="all, delete")
