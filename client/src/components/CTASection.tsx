/*
 * CTA SECTION — Appel à l'action final
 * Design chaleureux : fond navy arrondi avec texture, texte blanc chaud
 * "Consultation Gratuite" (pas essai gratuit)
 */
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 lg:py-20" style={{ backgroundColor: "#faf7f2" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden py-16 lg:py-24 px-8 lg:px-16 text-center"
          style={{ backgroundColor: "#232862" }}
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 -translate-y-1/2 translate-x-1/3" style={{ backgroundColor: "#ed1c24" }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-5 translate-y-1/2 -translate-x-1/4" style={{ backgroundColor: "#ed1c24" }} />

          <div className="relative">
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl text-white mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              PRÊT À COMMENCER<br />
              <span style={{ color: "#ed1c24" }}>TON PARCOURS?</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Réserve ta consultation gratuite et découvre comment le Club ADM peut t'aider à atteindre tes objectifs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://clubadm.com/contact-us/"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-sm font-bold uppercase tracking-[0.08em] rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                style={{ color: "#ed1c24" }}
              >
                Consultation Gratuite
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:4506002448"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white text-sm font-bold uppercase tracking-[0.08em] rounded-lg transition-all duration-300 hover:bg-white/10"
              >
                450-600-2448
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
