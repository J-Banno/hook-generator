"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-blue-50 border-t border-blue-100 py-6 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center text-sm text-gray-600 text-center space-y-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
          <span>Hook Generator — propulsé par l’IA</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-gray-400 text-xs"
        >
          © {new Date().getFullYear()} – Tous droits réservés
        </motion.p>
      </div>
    </footer>
  );
}
