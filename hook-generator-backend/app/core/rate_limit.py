from fastapi import Request
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded
from slowapi import Limiter
from slowapi.util import get_remote_address

# Global limiter based on IP
limiter = Limiter(key_func=get_remote_address)


# Custom error handler for rate limit exceeded
def rate_limit_handler(request: Request, exc: RateLimitExceeded) -> JSONResponse:
    return JSONResponse(
        status_code=429,
        content={
            "detail": "⏳ Trop de requêtes : Veuillez réessayer dans quelques instants. (max 5/min)"
        },
    )
