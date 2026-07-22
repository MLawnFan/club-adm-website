/*
 * PAGE CONSULTATION GRATUITE — Dark premium
 * Formulaire de capture de leads custom (prêt pour webhook)
 * Fond navy sombre, accents rouges, texte blanc/crème
 */
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Users, Dumbbell,
  Heart, Star, Shield, Phone, Calendar, CheckCircle2, Loader2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";

const HERO_IMG = "/manus-storage/fb-group-100-milestone_a422922c.jpeg";

const BENEFITS = [
  { icon: Users, text: "Rencontre un coach dédié" },
  { icon: Dumbbell, text: "Évaluation de ta condition physique" },
  { icon: Calendar, text: "Plan d'action personnalisé" },
  { icon: Heart, text: "Découvre notre communauté" },
];

const SOCIAL_PROOF = [
  { stat: "500+", label: "Membres actifs" },
  { stat: "4.9/5", label: "Note Google" },
  { stat: "92%", label: "Taux de rétention" },
];

const LOCATIONS = ["Brossard", "Chambly"];

const OBJECTIVES = [
  "Perte de poids",
  "Gain musculaire",
  "Améliorer ma condition physique",
  "Réduire le stress",
  "Préparer une compétition",
  "Autre",
];

export default function ConsultationGratuite() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    objective: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Replace with actual webhook URL
    // Example: await fetch("https://your-webhook-url.com", { method: "POST", body: JSON.stringify(formData) });
    
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const inputStyle = "w-full px-4 py-3.5 rounded-lg text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#ed1c24]/50 transition-all";
  const inputBg = { backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" };
  const labelStyle = "block text-xs font-bold uppercase tracking-wider mb-2";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f1229" }}>
      <PromoBanner />
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: "#131636" }}>
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#131636]/80 via-[#131636]/95 to-[#131636]" />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left — Copy */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: "rgba(237,28,36,0.1)", border: "1px solid rgba(237,28,36,0.2)" }}>
                <Calendar size={14} style={{ color: "#ed1c24" }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>Places limitées</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[0.92] mb-6 text-white" style={{ fontFamily: "var(--font-display)" }}>
                RÉSERVE TA<br />
                <span style={{ color: "#ed1c24" }}>CONSULTATION<br />GRATUITE.</span>
              </h1>

              <p className="text-lg leading-relaxed mb-8 max-w-lg" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>
                30 minutes avec un coach dédié pour évaluer tes objectifs, ta condition physique et bâtir un plan d'action concret pour tes résultats.
              </p>

              {/* Benefits list */}
              <div className="space-y-4 mb-10">
                {BENEFITS.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(237,28,36,0.1)" }}>
                      <b.icon size={16} style={{ color: "#ed1c24" }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)" }}>{b.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Social proof */}
              <div className="flex gap-8">
                {SOCIAL_PROOF.map((s, i) => (
                  <div key={i}>
                    <p className="text-2xl font-bold" style={{ color: "#ed1c24", fontFamily: "var(--font-display)" }}>{s.stat}</p>
                    <p className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Custom Form */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="rounded-2xl p-8 lg:p-10 border border-white/[0.08] shadow-2xl shadow-black/30" style={{ backgroundColor: "rgba(15, 18, 41, 0.95)" }}>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(237,28,36,0.15)" }}>
                      <CheckCircle2 size={40} style={{ color: "#ed1c24" }} />
                    </div>
                    <h3 className="text-2xl mb-3 text-white" style={{ fontFamily: "var(--font-display)" }}>DEMANDE ENVOYÉE!</h3>
                    <p className="text-sm leading-relaxed max-w-sm mx-auto" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>
                      Un de nos coachs te contactera dans les prochaines 24 heures pour planifier ta consultation gratuite.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h3 className="text-xl mb-2 text-white" style={{ fontFamily: "var(--font-display)" }}>REMPLIS LE FORMULAIRE</h3>
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>
                        On te contacte dans les 24h pour planifier ta consultation.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name row */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelStyle} style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>Prénom *</label>
                          <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className={inputStyle}
                            style={inputBg}
                            placeholder="Ton prénom"
                          />
                        </div>
                        <div>
                          <label className={labelStyle} style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>Nom *</label>
                          <input
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className={inputStyle}
                            style={inputBg}
                            placeholder="Ton nom"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className={labelStyle} style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>Courriel *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={inputStyle}
                          style={inputBg}
                          placeholder="ton@courriel.com"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className={labelStyle} style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>Téléphone *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={inputStyle}
                          style={inputBg}
                          placeholder="(450) 000-0000"
                        />
                      </div>

                      {/* Location */}
                      <div>
                        <label className={labelStyle} style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>Succursale préférée *</label>
                        <div className="grid grid-cols-2 gap-3">
                          {LOCATIONS.map((loc) => (
                            <button
                              key={loc}
                              type="button"
                              onClick={() => setFormData({ ...formData, location: loc })}
                              className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                                formData.location === loc
                                  ? "text-white border-[#ed1c24]"
                                  : "text-white/50 hover:text-white/70 border-white/[0.08]"
                              }`}
                              style={{
                                backgroundColor: formData.location === loc ? "rgba(237,28,36,0.15)" : "rgba(255,255,255,0.05)",
                                border: `1px solid ${formData.location === loc ? "#ed1c24" : "rgba(255,255,255,0.08)"}`,
                              }}
                            >
                              {loc}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Objective */}
                      <div>
                        <label className={labelStyle} style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>Objectif principal</label>
                        <select
                          value={formData.objective}
                          onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                          className={`${inputStyle} appearance-none cursor-pointer`}
                          style={inputBg}
                        >
                          <option value="" style={{ backgroundColor: "#0f1229" }}>Sélectionne ton objectif</option>
                          {OBJECTIVES.map((obj) => (
                            <option key={obj} value={obj} style={{ backgroundColor: "#0f1229" }}>{obj}</option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className={labelStyle} style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>Message (optionnel)</label>
                        <textarea
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className={`${inputStyle} resize-none`}
                          style={inputBg}
                          placeholder="Dis-nous en plus sur tes objectifs..."
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 text-white text-sm font-bold uppercase tracking-[0.08em] rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-body)" }}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            Réserver ma consultation <ArrowRight size={16} />
                          </>
                        )}
                      </button>

                      <p className="text-center text-[11px]" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}>
                        En soumettant ce formulaire, tu acceptes d'être contacté par notre équipe.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#0f1229" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>Pourquoi nous choisir</p>
            <h2 className="text-3xl lg:text-4xl text-white" style={{ fontFamily: "var(--font-display)" }}>ILS NOUS FONT CONFIANCE</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Star, title: "Coachs Certifiés", desc: "Plus de 15 coachs passionnés et certifiés pour t'encadrer à chaque étape de ton parcours." },
              { icon: Shield, title: "Résultats Garantis", desc: "92% de nos membres atteignent leurs objectifs dans les 6 premiers mois. On s'engage avec toi." },
              { icon: Heart, title: "Communauté Forte", desc: "Plus qu'un gym, une famille. 500+ membres qui se supportent et se motivent au quotidien." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl p-7 border border-white/[0.06] hover:border-white/[0.12] transition-all"
                style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(237,28,36,0.1)" }}>
                  <item.icon size={22} style={{ color: "#ed1c24" }} />
                </div>
                <h3 className="text-lg mb-2 text-white" style={{ fontFamily: "var(--font-display)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Google Reviews */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} fill="#facc15" style={{ color: "#facc15" }} />
                ))}
              </div>
              <span className="text-sm font-medium text-white" style={{ fontFamily: "var(--font-body)" }}>4.9/5</span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}>basé sur 380+ avis Google</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Urgency CTA */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl lg:text-4xl mb-4 text-white" style={{ fontFamily: "var(--font-display)" }}>
              PRÊT À COMMENCER?
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
              La première étape, c'est toujours la plus importante. Réserve ta consultation gratuite maintenant et commence ton parcours vers une meilleure version de toi-même.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white text-sm font-bold uppercase tracking-[0.08em] rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5"
                style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-body)" }}
              >
                Remplir le formulaire <ArrowRight size={16} />
              </a>
              <a
                href="tel:4506002448"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 text-sm font-bold uppercase tracking-[0.08em] rounded-lg transition-all duration-300 hover:bg-white/5"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "#ffffff", fontFamily: "var(--font-body)" }}
              >
                <Phone size={16} /> Appeler maintenant
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
