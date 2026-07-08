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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <a href="https://www.facebook.com/sharer/sharer.php?u=https://clubadmfit-fcpqjdnn.manus.space/evenements/course-19-septembre" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-3.5 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:opacity-90" style={{ backgroundColor: "#1877F2", fontFamily: "var(--font-body)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Partager sur Facebook
              </a>
              <a href="https://www.instagram.com/clubadmfitness/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-3.5 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:opacity-90" style={{ background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", fontFamily: "var(--font-body)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                Taguer @clubadmfitness
              </a>
            </div>
            <a href="/" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-lg border transition-colors hover:border-white/30" style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>
              Retour à l'accueil
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
