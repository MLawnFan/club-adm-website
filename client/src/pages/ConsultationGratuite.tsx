/*
 * PAGE CONSULTATION GRATUITE — Dark premium
 * Formulaire de capture de leads avec flow engageant
 * Fond navy sombre, accents rouges, texte blanc/crème
 */
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Users, Dumbbell, Clock,
  Heart, Star, Shield, Phone, Calendar,
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/hero-group-gym_99b77ba2.jpeg";

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

export default function ConsultationGratuite() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    location: "",
    goal: "",
    experience: "",
    availability: "",
    howHeard: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast.success("Demande envoyée avec succès!", {
      description: "Un coach te contactera dans les prochaines 24h pour planifier ta consultation.",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const inputStyle = "w-full px-4 py-3.5 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-all placeholder:text-white/20";
  const inputBg = { backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "var(--font-body)" };
  const labelStyle = "block text-xs font-bold uppercase tracking-wider mb-2";
  const labelColor = { color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" };

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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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

            {/* Right — Form card */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              {!isSubmitted ? (
                <div className="rounded-2xl p-8 lg:p-10 border border-white/[0.08] shadow-2xl shadow-black/30" style={{ backgroundColor: "rgba(19, 22, 54, 0.95)", backdropFilter: "blur(20px)" }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#ed1c24" }}>
                      <Phone size={18} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl text-white" style={{ fontFamily: "var(--font-display)" }}>COMMENCE ICI</h2>
                    </div>
                  </div>
                  <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}>
                    Remplis le formulaire et un coach te contactera pour planifier ta consultation.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Nom */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelStyle} style={labelColor}>Prénom *</label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => handleChange("firstName", e.target.value)}
                          className={inputStyle}
                          style={inputBg}
                          placeholder="Ton prénom"
                        />
                      </div>
                      <div>
                        <label className={labelStyle} style={labelColor}>Nom *</label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => handleChange("lastName", e.target.value)}
                          className={inputStyle}
                          style={inputBg}
                          placeholder="Ton nom"
                        />
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelStyle} style={labelColor}>Courriel *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          className={inputStyle}
                          style={inputBg}
                          placeholder="ton@courriel.com"
                        />
                      </div>
                      <div>
                        <label className={labelStyle} style={labelColor}>Téléphone *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          className={inputStyle}
                          style={inputBg}
                          placeholder="450-000-0000"
                        />
                      </div>
                    </div>

                    {/* Âge + Succursale */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelStyle} style={labelColor}>Âge</label>
                        <input
                          type="number"
                          min="14"
                          max="99"
                          value={formData.age}
                          onChange={(e) => handleChange("age", e.target.value)}
                          className={inputStyle}
                          style={inputBg}
                          placeholder="Ton âge"
                        />
                      </div>
                      <div>
                        <label className={labelStyle} style={labelColor}>Succursale préférée *</label>
                        <select
                          required
                          value={formData.location}
                          onChange={(e) => handleChange("location", e.target.value)}
                          className={inputStyle}
                          style={inputBg}
                        >
                          <option value="">Choisir...</option>
                          <option value="brossard">Brossard</option>
                          <option value="chambly">Chambly</option>
                          <option value="en-ligne">Programmation en ligne</option>
                        </select>
                      </div>
                    </div>

                    {/* Objectif */}
                    <div>
                      <label className={labelStyle} style={labelColor}>Quel est ton objectif principal? *</label>
                      <select
                        required
                        value={formData.goal}
                        onChange={(e) => handleChange("goal", e.target.value)}
                        className={inputStyle}
                        style={inputBg}
                      >
                        <option value="">Choisir...</option>
                        <option value="perte-poids">Perte de poids</option>
                        <option value="gain-muscle">Gain de masse musculaire</option>
                        <option value="condition-generale">Améliorer ma condition générale</option>
                        <option value="performance">Performance sportive</option>
                        <option value="sante-mentale">Santé mentale & bien-être</option>
                        <option value="rehabilitation">Réhabilitation / retour à l'entraînement</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>

                    {/* Expérience */}
                    <div>
                      <label className={labelStyle} style={labelColor}>Niveau d'expérience en entraînement</label>
                      <select
                        value={formData.experience}
                        onChange={(e) => handleChange("experience", e.target.value)}
                        className={inputStyle}
                        style={inputBg}
                      >
                        <option value="">Choisir...</option>
                        <option value="debutant">Débutant (0-6 mois)</option>
                        <option value="intermediaire">Intermédiaire (6 mois - 2 ans)</option>
                        <option value="avance">Avancé (2+ ans)</option>
                        <option value="jamais">Je n'ai jamais fait d'entraînement</option>
                      </select>
                    </div>

                    {/* Disponibilité */}
                    <div>
                      <label className={labelStyle} style={labelColor}>Meilleur moment pour te joindre</label>
                      <select
                        value={formData.availability}
                        onChange={(e) => handleChange("availability", e.target.value)}
                        className={inputStyle}
                        style={inputBg}
                      >
                        <option value="">Choisir...</option>
                        <option value="matin">Matin (8h-12h)</option>
                        <option value="apres-midi">Après-midi (12h-17h)</option>
                        <option value="soir">Soir (17h-20h)</option>
                        <option value="fin-semaine">Fin de semaine</option>
                      </select>
                    </div>

                    {/* Comment tu as entendu parler */}
                    <div>
                      <label className={labelStyle} style={labelColor}>Comment as-tu entendu parler de nous?</label>
                      <select
                        value={formData.howHeard}
                        onChange={(e) => handleChange("howHeard", e.target.value)}
                        className={inputStyle}
                        style={inputBg}
                      >
                        <option value="">Choisir...</option>
                        <option value="facebook">Facebook / Instagram</option>
                        <option value="google">Recherche Google</option>
                        <option value="ami">Recommandation d'un ami</option>
                        <option value="passage">Je suis passé devant</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-white text-sm font-bold uppercase tracking-[0.08em] rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 mt-2"
                      style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-body)" }}
                    >
                      Réserver ma consultation gratuite
                      <ArrowRight size={16} />
                    </button>

                    <p className="text-center text-xs mt-3" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}>
                      En soumettant ce formulaire, tu acceptes d'être contacté par un membre de notre équipe.
                    </p>
                  </form>
                </div>
              ) : (
                /* Success state */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl p-10 lg:p-12 border border-white/[0.08] text-center"
                  style={{ backgroundColor: "rgba(19, 22, 54, 0.95)" }}
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(34,197,94,0.1)" }}>
                    <CheckCircle2 size={40} style={{ color: "#22c55e" }} />
                  </div>
                  <h2 className="text-3xl mb-4 text-white" style={{ fontFamily: "var(--font-display)" }}>
                    DEMANDE ENVOYÉE!
                  </h2>
                  <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>
                    Merci {formData.firstName}! Un coach te contactera dans les prochaines <strong className="text-white">24 heures</strong> pour planifier ta consultation gratuite.
                  </p>
                  <div className="rounded-xl p-5 mb-6" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>En attendant, tu peux :</p>
                    <ul className="space-y-2 text-left">
                      <li className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>
                        <CheckCircle2 size={14} style={{ color: "#22c55e" }} /> Consulter nos programmes
                      </li>
                      <li className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>
                        <CheckCircle2 size={14} style={{ color: "#22c55e" }} /> Nous suivre sur Instagram
                      </li>
                      <li className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>
                        <CheckCircle2 size={14} style={{ color: "#22c55e" }} /> Lire notre blog
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all"
                    style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-body)" }}
                  >
                    Retour à l'accueil <ArrowRight size={14} />
                  </a>
                </motion.div>
              )}
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
