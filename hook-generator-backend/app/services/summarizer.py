import os
import requests
from fastapi import HTTPException
from app.utils.text_cleaner import clean_text, post_process_summary

USE_HF_API = os.getenv("USE_HF_API", "False").lower() == "true"
HF_API_TOKEN = os.getenv("HF_API_TOKEN")
MODEL_NAME = "csebuetnlp/mT5_multilingual_XLSum"

if not USE_HF_API:
    from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)


def generate_hook(text: str) -> dict:
    cleaned = clean_text(text)

    if len(cleaned) < 30:
        raise HTTPException(400, "Le texte est trop court pour générer une accroche.")
    if len(cleaned) > 10000:
        raise HTTPException(400, "Texte trop long (max 10 000 caractères).")

    prompt = f"Génère une accroche percutante, claire et engageante à partir de ce texte :\n\n{cleaned}"

    if USE_HF_API:
        if not HF_API_TOKEN:
            raise HTTPException(500, "Token Hugging Face manquant dans .env")

        try:
            response = requests.post(
                f"https://api-inference.huggingface.co/models/{MODEL_NAME}",
                headers={"Authorization": f"Bearer {HF_API_TOKEN}"},
                json={"inputs": prompt},
                timeout=60,
            )

            if "application/json" not in response.headers.get("Content-Type", ""):
                raise HTTPException(
                    response.status_code,
                    f"Erreur Hugging Face API : réponse non JSON - {response.text[:100]}",
                )

            json_data = response.json()

            if response.status_code != 200:
                raise HTTPException(
                    response.status_code,
                    f"Erreur Hugging Face API: {json_data.get('error', 'Erreur inconnue')}",
                )

            if not isinstance(json_data, list) or "summary_text" not in json_data[0]:
                raise HTTPException(
                    500,
                    f"Réponse inattendue de l'API Hugging Face : {json_data}",
                )

            hook = post_process_summary(json_data[0]["summary_text"])
            return {"hook": hook}

        except requests.exceptions.RequestException as e:
            raise HTTPException(
                500, f"Erreur lors de la connexion à Hugging Face: {str(e)}"
            )

    tokens = tokenizer(prompt, return_tensors="pt", truncation=False)

    if tokens["input_ids"].shape[1] > 512:
        raise HTTPException(
            400, "Le texte est trop long pour être traité (512 tokens max)."
        )

    output_ids = model.generate(
        tokens["input_ids"],
        max_length=64,
        min_length=16,
        num_beams=5,
        no_repeat_ngram_size=3,
        early_stopping=True,
    )

    hook = post_process_summary(
        tokenizer.decode(output_ids[0], skip_special_tokens=True)
    )
    return {"hook": hook}
