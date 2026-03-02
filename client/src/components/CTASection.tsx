/*
 * CTA SECTION — Appel à l'action final
 * Fond rouge, texte blanc, simple et direct
 * "Consultation Gratuite" (pas essai gratuit)
 */
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "#ed1c24" }}>
      <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl text-white mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            PRÊT À COMMENCER?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Réserve ta consultation gratuite et découvre comment le Club ADM peut t'aider à atteindre tes objectifs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://clubadm.com/contact-us/"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-sm font-bold uppercase tracking-[0.06em] transition-colors hover:bg-gray-100"
              style={{ color: "#ed1c24" }}
            >
              Consultation Gratuite
            </a>
            <a
              href="tel:4506002448"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white text-sm font-bold uppercase tracking-[0.06em] transition-colors hover:bg-white/10"
            >
              450-600-2448
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
