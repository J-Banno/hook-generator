# 🧠 Hook Generator Backend – FastAPI + Transformers

This is the **backend** part of the Hook Generator project. It provides an API built with **FastAPI**, leveraging the **Transformers** library from Hugging Face to generate catchy one-liners or summaries from any user-provided content. The backend is optimized for both **local development** and **cloud deployment** (e.g., Fly.io).

---

## 🚀 Features

- 🔥 Built with **FastAPI** – Fast and modern Python web framework
- 🤖 Uses **`csebuetnlp/mT5_multilingual_XLSum`** for multilingual summarization
- 📈 Rate-limiting via **SlowAPI** to avoid abuse
- 🌐 Supports CORS for frontend integration (React/Vite)
- ✅ Typed, modular codebase, organized for scalability

---

## 🛠️ Project Structure

```
app/
├── api/
│   └── routes.py          # API endpoints
├── core/
│   ├── config.py          # CORS and global setup
│   └── rate_limit.py      # Rate limiting logic
├── services/
│   └── summarizer.py      # Hugging Face model logic
└── main.py                # FastAPI app instance

models/
    └── hook_model.py      # Pydantic models
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/hook-generator-backend.git
cd hook-generator-backend
```

### 2. Create and activate virtual environment

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

---

## 🧪 Run locally

```bash
uvicorn app.main:app --reload
```

- Access the API at: [http://localhost:8000](http://localhost:8000)
- Swagger docs available at: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🧩 Environment Variables

Create a `.env` file in the root directory if needed:

```env
# Example
ENV=development
```

---

## 🧠 Model Used

We use the Hugging Face model:

```text
csebuetnlp/mT5_multilingual_XLSum
```

- It's a multilingual summarization model (mT5 base)
- Adapted for French and short-form output (hooks / punchlines)

---

## 📦 Deployment

### Fly.io (recommended)

This backend can be easily deployed to [Fly.io](https://fly.io) for free. You'll just need to create a `Dockerfile` or `fly.toml`, and you're good to go. Ask me if you need help setting that up.

---

## 📄 License

MIT – Feel free to fork, contribute and use it in your portfolio!

---

Made with ❤️ by Jonathan
