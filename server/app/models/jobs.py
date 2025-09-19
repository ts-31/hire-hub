from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from app.config.db import Base


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    recruiter_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    company = relationship("Company", back_populates="jobs")
    recruiter = relationship("User", back_populates="jobs")
    resumes = relationship("Resume", back_populates="job", cascade="all, delete")
