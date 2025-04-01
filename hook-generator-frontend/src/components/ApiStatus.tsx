import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Loader2, XCircle } from "lucide-react";

type ApiStatus = {
  status: "✅" | "❌";
  hf_api: string;
};

export function ApiStatus() {
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/health`)
      .then((res) => res.json())
      .then((data) => setApiStatus(data))
      .catch(() => setError(true));

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 500);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 flex flex-col gap-2 z-50 transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {error ? (
        <Badge
          variant="destructive"
          className="flex items-center gap-2 px-4 py-2 text-base"
        >
          <XCircle className="w-4 h-4" />
          Backend inaccessible
        </Badge>
      ) : !apiStatus ? (
        <Badge
          variant="outline"
          className="flex items-center gap-2 px-4 py-2 text-base"
        >
          <Loader2 className="w-4 h-4 animate-spin" />
          Vérification du backend...
        </Badge>
      ) : (
        <>
          <Badge
            variant="default"
            className="flex items-center gap-2 px-4 py-2 text-base"
          >
            <CheckCircle className="w-4 h-4" />
            Backend opérationnel
          </Badge>

          <Badge
            variant="outline"
            className={`flex items-center gap-2 px-4 py-2 text-base ${
              apiStatus.hf_api.includes("✅")
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-yellow-100 text-yellow-700 border border-yellow-300"
            }`}
          >
            {apiStatus.hf_api.includes("✅") ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
            Hugging Face : {apiStatus.hf_api}
          </Badge>
        </>
      )}
    </div>
  );
}
