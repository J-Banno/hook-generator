from fastapi import FastAPI
from app.core.config import setup_cors
from app.core.rate_limit import limiter, rate_limit_handler
from slowapi.errors import RateLimitExceeded
from app.api.routes import router

app = FastAPI()

# Middlewares
setup_cors(app)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, rate_limit_handler)

# Routes
app.include_router(router)
