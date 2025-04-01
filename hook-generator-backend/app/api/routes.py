import os
import requests
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import Response
from app.schemas.request import TextInput
from app.services.summarizer import generate_hook, USE_HF_API, HF_API_TOKEN, MODEL_NAME
from app.core.rate_limit import limiter

router = APIRouter()


@router.get("/health")
def health():
    if USE_HF_API:
        if not HF_API_TOKEN:
            return {"status": "❌", "hf_api": "❌ Token manquant"}
        try:
            response = requests.post(
                f"https://api-inference.huggingface.co/models/{MODEL_NAME}",
                headers={"Authorization": f"Bearer {HF_API_TOKEN}"},
                json={"inputs": "Bonjour"},
                timeout=5,
            )
            if response.status_code == 200:
                return {"status": "✅", "hf_api": "✅ OK (HF API accessible)"}
            else:
                return {
                    "status": "⚠️",
                    "hf_api": f"❌ {response.status_code} - {response.text[:100]}",
                }
        except Exception as e:
            return {"status": "❌", "hf_api": f"❌ Exception - {str(e)}"}

    return {"status": "✅", "hf_api": "🧠 Mode local (modèle chargé en RAM)"}


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
