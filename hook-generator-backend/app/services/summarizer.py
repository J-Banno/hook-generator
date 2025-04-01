from fastapi import HTTPException
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from app.utils.text_cleaner import clean_text, post_process_summary

MODEL_NAME = "csebuetnlp/mT5_multilingual_XLSum"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)


def generate_hook(text: str) -> dict:
    cleaned = clean_text(text)
    if len(cleaned) < 30:
        raise HTTPException(400, "Le texte est trop court pour générer une accroche.")
    if len(cleaned) > 10000:
        raise HTTPException(400, "Texte trop long (max 10 000 caractères).")

    prompt = f"Génère une accroche percutante, claire et engageante à partir de ce texte :\n\n{cleaned}"
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
