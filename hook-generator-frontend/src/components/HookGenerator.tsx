"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { CharProgress } from "@/components/ui/CharProgress";
import { useHookGenerator } from "@/hooks/HookGenerator";

export function HookGenerator() {
  const {
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
  } = useHookGenerator();

  return (
    <Card
      id="hook-generator"
      className="min-h-screen flex flex-col justify-center items-center px-4 py-10 bg-gradient-to-b from-white to-blue-50"
    >
      <h2 className="text-3xl font-bold text-center text-blue-600 pb-8">
        Génération d'accroche par intelligence artificielle
      </h2>

      <div className="w-full max-w-3xl space-y-8 p-6 rounded-2xl shadow-2xl border border-blue-100 bg-white">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-500 text-base mb-6 max-w-xl mx-auto"
        >
          ✍️ Besoin de capter l’attention dès la première phrase ? Notre IA
          génère pour vous l'accroche idéale en quelques secondes.
        </motion.p>

        <div className="space-y-2">
          <Label htmlFor="text">📝 Votre texte source</Label>
          <Textarea
            id="text"
            placeholder="Collez ici votre texte ou votre article..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            className="resize-none text-sm"
          />
          <CharProgress current={text.length} max={maxChars} />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Button
            onClick={fetchHook}
            disabled={loading || text.trim() === "" || isTooLong}
            className="w-full"
          >
            {loading ? "⏳ Génération en cours..." : "⚡ Générer l'accroche"}
          </Button>
          <Button variant="outline" onClick={resetAll} disabled={loading}>
            ♻️ Réinitialiser
          </Button>
        </div>

        <AnimatePresence>
          {hook && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <CardContent
                className={`rounded-md p-4 mt-2 border space-y-3 ${
                  isError
                    ? "bg-red-50 border-red-300 text-red-600"
                    : "bg-gray-50 border-gray-200 text-blue-900"
                }`}
                aria-live="polite"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <p className="text-base italic">{hook}</p>
                  {!isError && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopy(hook)}
                    >
                      {copied ? "✅ Copié !" : "📋 Copier"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-center mt-8 text-sm text-gray-400">
        💡 Conseil : Plus votre texte est clair et structuré, plus l'accroche
        générée sera percutante.
      </div>
    </Card>
  );
}
