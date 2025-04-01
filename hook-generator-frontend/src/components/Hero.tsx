"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-white to-blue-50 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
          <span className="text-blue-600 inline-flex items-center gap-2">
            <Sparkles className="w-6 h-6 animate-pulse" />
            Résumez en une punchline
          </span>
        </h1>

        {/* 🧠 Accroche secondaire */}
        <h2 className="text-lg md:text-xl text-blue-500 font-medium mb-6">
          Transformez un pavé de texte en une phrase qui claque.
        </h2>

        <p className="text-gray-600 text-base md:text-lg mb-10 leading-relaxed">
          Collez un texte ou un article — et laissez l’intelligence artificielle
          générer une accroche percutante en une seule phrase.
        </p>

        <a href="#hook-generator">
          <Button size="lg" className="text-base font-semibold px-6 py-3">
            Tester l’accroche IA <Sparkles className="animate-pulse w-6 h-6" />
          </Button>
        </a>

        {/* 🔍 Preuve crédibilité IA */}
        <p className="text-sm text-gray-400 mt-8">
          Propulsé par un modèle multilingue de Hugging Face 🤖
        </p>
      </motion.div>
    </section>
  );
}
