/*
 * PAGE THANK YOU — Événement Course
 * Page cachée (pas dans le menu), accessible uniquement via lien direct
 * Affichée après inscription à l'événement course du 19 septembre
 */
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LOGO_FCJM = "https://d2xsxph8kpxj0f.cloudfront.net/3b";

export default function ThankYouCourse() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f1229" }}>
      <Navbar />

      {/* Hero Confirmation */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #ed1c24 0%, transparent 70%)" }} />
        </div>

        <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6" style={{ backgroundColor: "rgba(237,28,36,0.15)", border: "2px solid rgba(237,28,36,0.3)" }}>
              <CheckCircle2 size={48} style={{ color: "#ed1c24" }} />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
            <h1 className="text-4xl lg:text-6xl leading-[0.9] mb-6 text-white" style={{ fontFamily: "var(--font-display)" }}>
              T'ES <span style={{ color: "#ed1c24" }}>INSCRIT!</span>
            </h1>
            <p className="text-lg lg:text-xl leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)" }}>
              Ton inscription à l'événement course du 19 septembre est confirmée.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
              Chaque pas que tu feras ce jour-là compte doublement — pour toi et pour un enfant qui en a besoin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Détails de l'événement */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[900px] mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>Les détails</p>
            <h2 className="text-3xl lg:text-4xl text-white" style={{ fontFamily: "var(--font-display)" }}>CE QU'IL FAUT SAVOIR</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Calendar, label: "Date", value: "19 septembre 2025" },
              { icon: MapPin, label: "Lieu", value: "Chambly, QC" },
              { icon: Clock, label: "Heure", value: "Détails à venir" },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-xl p-6 border border-white/[0.06] text-center" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                <item.icon size={28} style={{ color: "#ed1c24" }} className="mx-auto mb-3" />
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}>{item.label}</p>
                <p className="text-white text-base font-semibold" style={{ fontFamily: "var(--font-body)" }}>{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programmation incluse */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#0f1229" }}>
        <div className="max-w-[800px] mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl p-8 lg:p-10 border border-white/[0.06]" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
            <div className="flex items-center gap-3 mb-6">
              <Users size={24} style={{ color: "#ed1c24" }} />
              <h3 className="text-2xl text-white" style={{ fontFamily: "var(--font-display)" }}>TA PROGRAMMATION DE COURSE</h3>
            </div>
            <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>
              En tant que participant inscrit, tu reçois une programmation de course sur 3 entraînements par semaine pour te préparer au jour J :
            </p>
            <div className="space-y-4">
              {[
                { label: "2x par semaine", desc: "Entraînements sur ton propre temps, à ton rythme" },
                { label: "1x le dimanche", desc: "Avec le Run Club — on court ensemble!" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <CheckCircle2 size={18} style={{ color: "#ed1c24" }} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-body)" }}>{item.label}</span>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm mt-6 pt-6 border-t border-white/[0.06]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>
              Les détails de ta programmation te seront envoyés par courriel sous peu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cause - Fondation */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[700px] mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-sm font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>Ton impact</p>
            <h3 className="text-2xl lg:text-3xl mb-4 text-white" style={{ fontFamily: "var(--font-display)" }}>MERCI DE FAIRE LA DIFFÉRENCE</h3>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>
              Les profits de cet événement sont entièrement remis à la Fondation du Centre Jeunesse de la Montérégie. Pour chaque 100$ amassé, c'est un sac d'école complet remis à un enfant en difficulté.
            </p>
            <div className="border-t border-white/[0.06] pt-6">
              <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>Au profit de la fondation</p>
              <img src={LOGO_FCJM} alt="Fondation du Centre Jeunesse de la Montérégie" className="h-24 lg:h-32 mx-auto object-contain" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Partage */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#0f1229" }}>
        <div className="max-w-[700px] mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl lg:text-3xl mb-4 text-white" style={{ fontFamily: "var(--font-display)" }}>INVITE TES AMIS</h3>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
              Plus on est nombreux, plus on fait la différence. Partage l'événement avec tes proches et courons ensemble le 19 septembre.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/evenements/course-19-septembre" className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20" style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-body)" }}>
                Partager l'événement <ArrowRight size={16} />
              </a>
              <a href="/" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-lg border transition-colors" style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>
                Retour à l'accueil
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
