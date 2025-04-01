import { useState } from "react";
import { fetchHookFromAPI } from "@/lib/fetchHook";

export function useHookGenerator(maxChars = 1200) {
  const [text, setText] = useState("");
  const [hook, setHook] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const isTooLong = text.length > maxChars;
  const isError = hook?.startsWith("❌");

  async function fetchHook() {
    setLoading(true);
    setHook(null);

    try {
      const data = await fetchHookFromAPI(text);
      setHook(data.hook);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      setHook(`❌  ${message}`);
    } finally {
      setLoading(false);
    }
  }

  function resetAll() {
    setText("");
    setHook(null);
    setCopied(false);
  }

  function handleCopy(textToCopy: string) {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return {
    text,
    setText,
    hook,
    loading,
    copied,
    maxChars,
    isTooLong,
    isError,
    fetchHook,
    resetAll,
    handleCopy,
  };
}
