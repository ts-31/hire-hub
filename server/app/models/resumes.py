from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from app.config.db import Base


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    resume_url = Column(String(500), nullable=False)  # S3 file URL
    extracted_text = Column(Text, nullable=False)  # Full parsed text
    status = Column(String(50), nullable=False, default="pending")
    # pending | shortlisted | interviewed | rejected | hired

    job_id = Column(Integer, ForeignKey("jobs.id"), nullable=False)
    recruiter_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    job = relationship("Job", back_populates="resumes")
    recruiter = relationship("User")
