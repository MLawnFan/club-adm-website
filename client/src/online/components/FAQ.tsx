/**
 * Section FAQ avec accordéon — supporte thème clair et sombre
 * Lève les dernières objections avant le CTA final
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

export default function FAQ({ items, title, subtitle, dark = false }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {title && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-online-cta-red font-display text-sm font-bold tracking-widest uppercase mb-4">
            Questions fréquentes
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${dark ? "text-white" : "text-online-navy"}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`font-body text-lg sm:text-xl ${dark ? "text-white/50" : "text-online-navy/60"}`}>
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      <div className="space-y-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className={`rounded-lg border overflow-hidden ${
              dark ? "bg-white/5 border-white/10" : "bg-white border-online-navy/10"
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className={`w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors ${
                dark ? "hover:bg-white/5" : "hover:bg-online-warm-gray/30"
              }`}
            >
              <h3
                className={`font-display text-base sm:text-lg font-bold pr-4 ${
                  dark ? "text-white" : "text-online-navy"
                }`}
                style={{ textTransform: "none" }}
              >
                {item.question}
              </h3>
              <ChevronDown
                size={20}
                className={`shrink-0 transition-transform duration-300 ${
                  openIndex === i ? "rotate-180" : ""
                } ${dark ? "text-white/30" : "text-online-navy/40"}`}
              />
            </button>

            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                    <p className={`font-body text-base sm:text-lg leading-relaxed ${
                      dark ? "text-white/60" : "text-online-navy/60"
                    }`}>
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
