import sys
from pathlib import Path
from datetime import datetime, timezone

# Ensure backend directory is in sys.path
_BACKEND_DIR = Path(__file__).resolve().parent
if str(_BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(_BACKEND_DIR))

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from database import Base


def utc_now():
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True, default="Rural Entrepreneur")
    role = Column(String, nullable=True, default="Agri-Enterprise Owner")
    location = Column(String, nullable=True, default="Madurai, Tamil Nadu")
    created_at = Column(DateTime, default=utc_now)

    plans = relationship("BusinessPlan", back_populates="user", cascade="all, delete-orphan")


class BusinessPlan(Base):
    __tablename__ = "business_plans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    business_category = Column(String, nullable=False)
    location = Column(String, nullable=False)
    investment = Column(Integer, nullable=False)
    status = Column(String, nullable=True, default="Verified DPR")
    viability_score = Column(Integer, nullable=True, default=92)
    full_json_report = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=utc_now)

    user = relationship("User", back_populates="plans")
