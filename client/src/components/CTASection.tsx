/*
 * CTA SECTION — Club ADM Fitness (Épuré)
 * Fond blanc, formulaire simple et propre
 * Couleurs: navy #232862, rouge #ed1c24
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Merci ! Nous vous contacterons sous 24h.");
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="accent-line mb-5" />
            <h2 className="font-display text-5xl lg:text-6xl mb-4" style={{ color: "#232862" }}>
              PRÊT À <span style={{ color: "#ed1c24" }}>COMMENCER</span> ?
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8" style={{ fontFamily: "var(--font-body)" }}>
              Laisse-nous tes coordonnées et un membre de notre équipe te contactera dans les 24 heures pour planifier ton essai gratuit.
            </p>

            <div className="space-y-4">
              {[
                "Essai gratuit en salle — sans engagement",
                "Consultation initiale avec un coach",
                "Plan personnalisé selon tes objectifs",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#ed1c24" }} />
                  <span className="text-gray-600" style={{ fontFamily: "var(--font-body)" }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {submitted ? (
              <div className="text-center py-16 px-8 border border-gray-100">
                <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: "#ed1c24" }} />
                <h3 className="font-display text-3xl mb-2" style={{ color: "#232862" }}>MERCI !</h3>
                <p className="text-gray-500" style={{ fontFamily: "var(--font-body)" }}>
                  On te contacte très bientôt.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[12px] font-semibold tracking-[0.06em] uppercase mb-2" style={{ fontFamily: "var(--font-heading)", color: "#232862" }}>
                      Prénom
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                      style={{ fontFamily: "var(--font-body)" }}
                      placeholder="Ton prénom"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold tracking-[0.06em] uppercase mb-2" style={{ fontFamily: "var(--font-heading)", color: "#232862" }}>
                      Nom
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                      style={{ fontFamily: "var(--font-body)" }}
                      placeholder="Ton nom"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold tracking-[0.06em] uppercase mb-2" style={{ fontFamily: "var(--font-heading)", color: "#232862" }}>
                    Courriel
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}
                    placeholder="ton@courriel.com"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-semibold tracking-[0.06em] uppercase mb-2" style={{ fontFamily: "var(--font-heading)", color: "#232862" }}>
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}
                    placeholder="418-555-1234"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-semibold tracking-[0.06em] uppercase mb-2" style={{ fontFamily: "var(--font-heading)", color: "#232862" }}>
                    Je suis intéressé par
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-gray-400 transition-colors bg-white"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <option value="gym">Entraînement en salle</option>
                    <option value="online">Programmes en ligne</option>
                    <option value="both">Les deux</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 text-white font-bold text-[14px] tracking-[0.08em] uppercase py-4 transition-colors hover:opacity-90"
                  style={{ fontFamily: "var(--font-heading)", backgroundColor: "#ed1c24" }}
                >
                  Réserver mon essai gratuit
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
