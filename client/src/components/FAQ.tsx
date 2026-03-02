/*
 * FAQ — Questions fréquentes de clubadm.com
 * Fond blanc, accordéon propre
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
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl mb-4"
            style={{ fontFamily: "var(--font-display)", color: "#232862" }}
          >
            QUESTIONS? ON A LES RÉPONSES!
          </h2>
        </motion.div>

        <div className="space-y-0">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border-b border-gray-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span
                  className="text-base font-semibold pr-4 group-hover:text-adm-red transition-colors"
                  style={{ color: "#232862" }}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  style={{ color: openIndex === i ? "#ed1c24" : "rgba(35,40,98,0.3)" }}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm leading-relaxed" style={{ color: "rgba(35,40,98,0.6)" }}>
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
