/*
 * CTA SECTION — Club ADM Fitness
 * Lead capture form with dramatic background
 * Will be replaced by GoHighLevel embed in production
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronRight, Check } from "lucide-react";
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
    <section id="contact" className="py-24 lg:py-32 bg-navy-dark relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-adm-red/8 via-transparent to-navy/50" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-adm-red/30 to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="accent-line mb-6" />
            <h2 className="font-display text-5xl lg:text-7xl text-white mb-4">
              PRÊT À<br />
              <span className="text-adm-red">COMMENCER ?</span>
            </h2>
            <p className="text-cream/50 text-lg leading-relaxed mb-8" style={{ fontFamily: "var(--font-body)" }}>
              Réserve ton essai gratuit en salle ou démarre un programme en ligne. 
              Aucun engagement, aucune pression — juste l'opportunité de découvrir 
              ce que Club ADM peut faire pour toi.
            </p>

            <div className="space-y-4">
              {[
                "Essai gratuit de 7 jours en salle",
                "14 jours d'essai sur les programmes en ligne",
                "Évaluation physique offerte",
                "Aucun engagement requis",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-adm-red/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-adm-red" />
                  </div>
                  <span className="text-cream/70 text-sm" style={{ fontFamily: "var(--font-body)" }}>{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="border border-adm-red/30 bg-adm-red/5 p-10 text-center">
                <div className="w-16 h-16 bg-adm-red/20 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-adm-red" />
                </div>
                <h3 className="font-display text-3xl text-white mb-3">MERCI !</h3>
                <p className="text-cream/60" style={{ fontFamily: "var(--font-body)" }}>
                  Un membre de notre équipe te contactera dans les prochaines 24 heures 
                  pour planifier ton essai gratuit.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-white/10 bg-card p-8 lg:p-10">
                <h3 className="font-display text-2xl text-white mb-6">RÉSERVE TON ESSAI</h3>

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] tracking-[0.15em] uppercase text-cream/40 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                        Prénom
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:border-adm-red/50 focus:outline-none transition-colors placeholder:text-cream/20"
                        style={{ fontFamily: "var(--font-body)" }}
                        placeholder="Ton prénom"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] tracking-[0.15em] uppercase text-cream/40 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                        Nom
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:border-adm-red/50 focus:outline-none transition-colors placeholder:text-cream/20"
                        style={{ fontFamily: "var(--font-body)" }}
                        placeholder="Ton nom"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-[0.15em] uppercase text-cream/40 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                      Courriel
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:border-adm-red/50 focus:outline-none transition-colors placeholder:text-cream/20"
                      style={{ fontFamily: "var(--font-body)" }}
                      placeholder="ton@courriel.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-[0.15em] uppercase text-cream/40 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:border-adm-red/50 focus:outline-none transition-colors placeholder:text-cream/20"
                      style={{ fontFamily: "var(--font-body)" }}
                      placeholder="418-555-1234"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-[0.15em] uppercase text-cream/40 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                      Je suis intéressé par
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Entraînement en salle", "Programme en ligne", "Coaching privé", "Les deux"].map((option) => (
                        <label key={option} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="interest" value={option} className="sr-only peer" />
                          <div className="w-full text-center py-2.5 border border-white/10 text-cream/50 text-[12px] tracking-[0.05em] uppercase peer-checked:border-adm-red/50 peer-checked:bg-adm-red/10 peer-checked:text-white transition-all hover:border-white/20" style={{ fontFamily: "var(--font-heading)" }}>
                            {option}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 inline-flex items-center justify-center gap-2 bg-adm-red hover:bg-adm-red-hover text-white font-bold text-[14px] tracking-[0.1em] uppercase py-4 transition-all duration-300 hover:shadow-lg hover:shadow-adm-red/25 group"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Réserver Mon Essai Gratuit
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
