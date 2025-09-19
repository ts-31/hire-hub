from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.config.db import Base


class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, nullable=False)

    # nullable FK to users.id (allows two-step creation)
    hr_user_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    # `users` uses User.company_id as the foreign key (recruiters + hr)
    users = relationship(
        "User",
        back_populates="company",
        cascade="all, delete",
        foreign_keys="User.company_id",  # ← explicit: use User.company_id
    )

    # Optional convenience relationship for the single HR user
    hr_user = relationship(
        "User",
        foreign_keys=[hr_user_id],  # ← explicit: use companies.hr_user_id
        uselist=False,  # single user (not a list)
        post_update=True,  # helps ORM handle circular updates
    )

    jobs = relationship("Job", back_populates="company", cascade="all, delete")
