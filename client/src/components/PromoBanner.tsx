/*
 * PROMO BANNER — Club ADM Fitness
 * Bandeau promotionnel animé en haut de la page
 * Texte défilant en boucle (marquee) annonçant la programmation en ligne
 * Fond rouge #ed1c24, texte blanc, fermable
 */
import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const PROMO_TEXT = "ON RSTART LA MACHINE — PROGRAMME DE TRANSFORMATION";
const PROMO_EMOJI = "💪";

export default function PromoBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden"
          style={{ backgroundColor: "#ed1c24" }}
        >
          <div className="relative flex items-center justify-center h-10">
            {/* Marquee container */}
            <div className="absolute inset-0 flex items-center overflow-hidden">
              <div className="marquee-track flex whitespace-nowrap">
                {/* Repeat the message multiple times for seamless loop */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <Link
                    key={i}
                    href="/consultation-gratuite"
                    className="inline-flex items-center gap-3 mx-8 text-white hover:text-white/90 transition-colors"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ fontFamily: "var(--font-body)" }}>
                      {PROMO_EMOJI} {PROMO_TEXT}
                    </span>
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 border border-white/40 rounded-full text-white/90"
                    >
                      En savoir plus →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setVisible(false);
              }}
              className="absolute right-3 z-10 p-1 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
              aria-label="Fermer le bandeau"
            >
              <X size={14} strokeWidth={2.5} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
