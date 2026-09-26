import os
import socket
import re
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv

# Load environment variables
env_path = Path(__file__).resolve().parent / ".env"
if not env_path.exists():
    env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path if env_path.exists() else None)
load_dotenv()

# Get the URL from .env (SQLAlchemy requires 'postgresql://' not 'postgres://')
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./grambiz.db")

if SQLALCHEMY_DATABASE_URL and SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Render Internal URL resolution for local development:
# If a Render internal hostname (e.g. '@dpg-xxxx-a/') is used from outside Render,
# it fails local DNS resolution. We seamlessly route to .oregon-postgres.render.com
if SQLALCHEMY_DATABASE_URL and "dpg-" in SQLALCHEMY_DATABASE_URL:
    try:
        match = re.search(r"@([a-z0-9\-]+)([:/])", SQLALCHEMY_DATABASE_URL)
        if match:
            bare_host = match.group(1)
            if bare_host.startswith("dpg-") and "." not in bare_host:
                try:
                    socket.gethostbyname(bare_host)
                except socket.gaierror:
                    ext_host = f"{bare_host}.oregon-postgres.render.com"
                    sep = match.group(2)
                    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace(f"@{bare_host}{sep}", f"@{ext_host}{sep}", 1)
    except Exception:
        pass

engine_kwargs = {}
if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    engine_kwargs["connect_args"] = {"check_same_thread": False}
else:
    engine_kwargs["pool_pre_ping"] = True
    engine_kwargs["pool_recycle"] = 300

engine = create_engine(SQLALCHEMY_DATABASE_URL, **engine_kwargs)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency to get DB session in our routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
