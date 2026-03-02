/*
 * FAQ — Questions fréquentes
 * Design chaleureux : fond blanc, accordéon avec cartes arrondies
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Dans combien de temps est-ce que je pourrai voir des résultats?",
    a: "Les résultats varient d'une personne à l'autre, mais avec un entraînement régulier (3-4 fois par semaine) et une bonne alimentation, tu peux commencer à voir des changements en 4 à 6 semaines.",
  },
  {
    q: "Est-ce que je dois être en forme pour m'inscrire?",
    a: "Absolument pas! Nos programmes sont adaptés à tous les niveaux. Nos coachs modifient chaque exercice selon tes capacités. On commence tous quelque part!",
  },
  {
    q: "Qu'est-ce qui nous différencie des autres gyms?",
    a: "Notre communauté! Au Club ADM, tu n'es pas juste un numéro. Nos coachs te connaissent par ton nom, adaptent les entraînements à tes besoins et notre communauté te soutient à chaque étape.",
  },
  {
    q: "Combien de fois est-ce que je devrais venir m'entraîner?",
    a: "On recommande 3 à 5 séances par semaine pour des résultats optimaux. Mais même 2 fois par semaine, c'est un excellent début! L'important, c'est la constance.",
  },
  {
    q: "Est-ce que je vais me faire des amis?",
    a: "C'est garanti! La communauté ADM est reconnue pour son accueil chaleureux. Dès ton premier cours, tu vas te sentir comme chez toi.",
  },
  {
    q: "De quelle façon est-ce que je peux payer?",
    a: "Nous acceptons les paiements par carte de crédit et débit. Plusieurs options de forfaits sont disponibles pour s'adapter à ton budget.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-[800px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: "#ed1c24" }}>
            FAQ
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)", color: "#232862" }}
          >
            TES QUESTIONS, NOS RÉPONSES
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === i
                  ? "bg-white shadow-lg shadow-black/[0.04]"
                  : "bg-transparent hover:bg-gray-50/50"
              }`}
              style={openIndex === i ? { border: "1px solid rgba(237,28,36,0.1)" } : { border: "1px solid transparent" }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left group"
              >
                <span
                  className="text-[15px] font-semibold pr-4 transition-colors"
                  style={{ color: openIndex === i ? "#ed1c24" : "#232862" }}
                >
                  {faq.q}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  style={{
                    backgroundColor: openIndex === i ? "rgba(237,28,36,0.1)" : "rgba(35,40,98,0.05)",
                  }}
                >
                  <ChevronDown
                    size={16}
                    style={{ color: openIndex === i ? "#ed1c24" : "rgba(35,40,98,0.4)" }}
                  />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "rgba(35,40,98,0.55)" }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
