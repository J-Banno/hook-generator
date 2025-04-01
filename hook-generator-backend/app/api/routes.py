from fastapi import APIRouter, HTTPException, Request
from app.schemas.request import TextInput
from app.services.summarizer import generate_hook
from app.core.rate_limit import limiter

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/generate-express-summary")
@limiter.limit("5/minute")
def generate_summary(input: TextInput, request: Request):
    return generate_hook(input.text)
