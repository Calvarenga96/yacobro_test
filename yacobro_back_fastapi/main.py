from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Annotated
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
import bcrypt

app = FastAPI()
models.Base.metadata.create_all(bind=engine)


class User(BaseModel):
    name: str
    email: str
    password: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@app.post("/users", status_code=status.HTTP_201_CREATED)
async def create(user: User, db: db_dependency):
    password_hash = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt())
    db_user = models.User(name=user.name, email=user.email, password=password_hash)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
