/*
 * PAGE HORAIRE & PRIX — Dark premium
 * Fond navy sombre, cartes sombres, texte blanc/crème
 */
import { motion } from "framer-motion";
import { MapPin, ArrowRight, CheckCircle2, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";



export default function HorairePrix() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f1229" }}>
      <PromoBanner />
      <Navbar />

      {/* Hero */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>Horaire & Prix</p>
            <h1 className="text-5xl lg:text-7xl leading-[0.9] mb-6 text-white" style={{ fontFamily: "var(--font-display)" }}>
              TROUVE TON<br /><span style={{ color: "#ed1c24" }}>CRÉNEAU.</span>
            </h1>
            <p className="text-lg leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
              Des cours du matin au soir, 7 jours sur 7. Choisis le forfait qui correspond à tes objectifs et à ton rythme de vie.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Horaire */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#0f1229" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>Voir l'horaire complet</p>
            <h3 className="text-2xl lg:text-3xl mb-6 text-white" style={{ fontFamily: "var(--font-display)" }}>CHOISIS TA SUCCURSALE</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://crossfitadm.pushpress.com/landing/calendar?location=location_905bf6e1757775" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:scale-105 border border-white/[0.1]" style={{ backgroundColor: "rgba(237,28,36,0.15)", fontFamily: "var(--font-body)" }}>
                <MapPin size={18} style={{ color: "#ed1c24" }} /> Brossard <ArrowRight size={14} />
              </a>
              <a href="https://crossfitadm.pushpress.com/landing/calendar?location=location_c3981012b747b7" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:scale-105 border border-white/[0.1]" style={{ backgroundColor: "rgba(237,28,36,0.15)", fontFamily: "var(--font-body)" }}>
                <MapPin size={18} style={{ color: "#ed1c24" }} /> Chambly <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Forfaits - CTA vers consultation */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>Investis en toi</p>
            <h2 className="text-4xl lg:text-5xl mb-4 text-white" style={{ fontFamily: "var(--font-display)" }}>NOS FORFAITS</h2>
            <p className="text-base max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}>Pas de contrat à long terme. Pas de frais cachés. Juste des résultats.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[{ name: "Essentiel", desc: "Parfait pour commencer", features: ["8 cours de groupe aux 4 semaines", "2 rencontres par année avec un entraîneur", "Plan de match personnalisé", "Accès aux heures d'ouverture", "Application de suivi"], popular: false },
              { name: "Illimité", desc: "Notre plan le plus populaire", features: ["Cours de groupe illimités", "Open Gym illimité", "2 suivis par année avec un entraîneur", "Application de suivi", "Accès aux 2 succursales"], popular: true },
              { name: "Premium", desc: "L'expérience semi-privée", features: ["Tout du plan Illimité", "Cours en semi-privé (3 à 5 personnes)", "Programmation plus personnalisée", "Encadrement adapté à tes objectifs", "Accès aux 2 succursales"], popular: false },
            ].map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`relative rounded-xl p-7 border transition-all ${plan.popular ? "border-red-500/40 shadow-xl shadow-red-500/5 scale-[1.02]" : "border-white/[0.06] hover:border-white/[0.12]"}`}
                style={{ backgroundColor: plan.popular ? "rgba(237,28,36,0.06)" : "rgba(255,255,255,0.03)" }}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-white text-[10px] font-bold uppercase tracking-wider rounded-full" style={{ backgroundColor: "#ed1c24" }}>Populaire</div>
                )}
                <h3 className="text-2xl mb-1 text-white" style={{ fontFamily: "var(--font-display)" }}>{plan.name.toUpperCase()}</h3>
                <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}>{plan.desc}</p>
                <div className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} style={{ color: "#ed1c24" }} className="flex-shrink-0 mt-0.5" />
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href="/consultation-gratuite"
                  className={`block text-center py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${plan.popular ? "text-white hover:shadow-lg hover:shadow-red-500/20" : "border border-white/[0.12] text-white/70 hover:border-red-500/40 hover:text-white"}`}
                  style={plan.popular ? { backgroundColor: "#ed1c24", fontFamily: "var(--font-body)" } : { fontFamily: "var(--font-body)" }}>
                  Consultation Gratuite
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Drop In */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#0f1229" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-sm font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>De passage?</p>
              <h2 className="text-4xl lg:text-5xl mb-4 text-white" style={{ fontFamily: "var(--font-display)" }}>DROP IN</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
                Tu es de passage à Brossard ou Chambly? Viens t'entraîner avec nous pour une séance. Aucun engagement, juste du bon entraînement.
              </p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>25$</span>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>/séance</span>
              </div>
              <div className="space-y-2 mb-8">
                {["Accès à un cours de groupe", "Tout l'équipement fourni", "Vestiaires et douches", "Bienvenue aux athlètes de tous niveaux"].map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} style={{ color: "#ed1c24" }} className="flex-shrink-0" />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://crossfitadm.pushpress.com/landing/plans/plan_9b73348d83c575" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:scale-105" style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-body)" }}>
                  <MapPin size={16} /> Drop In Brossard <ArrowRight size={14} />
                </a>
                <a href="https://crossfitadm.pushpress.com/landing/plans/plan_fddd82cc949c85" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:scale-105" style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-body)" }}>
                  <MapPin size={16} /> Drop In Chambly <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex justify-center">
              <div className="rounded-xl p-8 max-w-sm w-full border border-white/[0.06]" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                <Users size={40} style={{ color: "#ed1c24" }} className="mb-4" />
                <h3 className="text-2xl mb-3 text-white" style={{ fontFamily: "var(--font-display)" }}>ATHLÈTES VISITEURS</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>
                  On accueille les athlètes de passage avec plaisir. Présente-toi 10 minutes avant le cours avec une pièce d'identité.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin size={14} style={{ color: "#ed1c24" }} />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>Brossard — 9 place du commerce</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={14} style={{ color: "#ed1c24" }} />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>Chambly — 2180 boul. industriel</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
