// src/lib/fetchHook.ts

export async function fetchHookFromAPI(text: string) {
  const API_BASE_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:8000"
      : import.meta.env.VITE_API_BASE_URL;

  const res = await fetch(`${API_BASE_URL}/generate-express-summary`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const data = await res.json();

  if (!res.ok) {
    if (res.status === 429) {
      throw new Error(
        "⏳ Trop de requêtes : limite de 5 par minute. Merci de réessayer un peu plus tard."
      );
    }

    throw new Error(data.detail || "Erreur serveur inconnue");
  }

  return data;
}
