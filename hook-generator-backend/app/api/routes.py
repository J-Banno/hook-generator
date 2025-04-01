from fastapi import APIRouter, Request
from fastapi.responses import Response
from app.schemas.request import TextInput
from app.services.summarizer import generate_hook
from app.core.rate_limit import limiter
import os

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/generate-express-summary")
@limiter.limit("5/minute")
def generate_summary(input: TextInput, request: Request):
    return generate_hook(input.text)


@router.options("/generate-express-summary")
def options_summary():
    return Response(
        status_code=200,
        headers={
            "Access-Control-Allow-Origin": os.getenv("CORS_ORIGINS", "*"),
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    )
