"use client"

import { Wand2, ClipboardPaste, MessageSquareQuote } from "lucide-react"
import { motion } from "framer-motion"

export function HowItWorks() {
  const steps = [
    {
      icon: <ClipboardPaste className="w-8 h-8 text-blue-600" />,
      title: "1. Collez votre texte",
      desc: "Ajoutez un article, un paragraphe ou un contenu long à transformer.",
    },
    {
      icon: <Wand2 className="w-8 h-8 text-blue-600" />,
      title: "2. Cliquez sur Générer",
      desc: "Notre modèle IA va résumer l'essentiel en une punchline percutante.",
    },
    {
      icon: <MessageSquareQuote className="w-8 h-8 text-blue-600" />,
      title: "3. Obtenez votre accroche",
      desc: "Copiez-la et utilisez-la où vous voulez : posts, emails, articles, etc.",
    },
  ]

  return (
    <section className="py-20 bg-white px-6" id="how-it-works">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-12"
        >
          Comment ça marche ?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 12px 30px rgba(59, 130, 246, 0.25)", // glow bleu
              }}
              className="flex flex-col items-center text-center space-y-4 p-6 bg-blue-50 rounded-xl shadow-sm transition-all duration-300 cursor-pointer"
            >
              <div className="bg-white p-4 rounded-full shadow-md">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
