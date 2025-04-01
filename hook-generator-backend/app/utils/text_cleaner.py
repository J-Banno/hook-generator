import re


def clean_text(text: str) -> str:
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"[{}[\]<>]", "", text)
    return text.strip()


def post_process_summary(summary: str) -> str:
    summary = re.sub(r"\s+([.,!?])", r"\1", summary)
    summary = re.sub(r"\s+", " ", summary).strip()
    if summary and summary[0].islower():
        summary = summary[0].upper() + summary[1:]
    if not summary.endswith((".", "!", "?")):
        summary += "."
    return summary
