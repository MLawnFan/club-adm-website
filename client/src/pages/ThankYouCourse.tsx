/*
 * PAGE THANK YOU — Événement Course
 * Page cachée (pas dans le menu), accessible uniquement via lien direct
 * Affichée après inscription à l'événement course du 19 septembre
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, MapPin, Clock, Users, Copy, Check, Mail, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const LOGO_FCJM = "https://d2xsxph8kpxj0f.cloudfront.net/3b";

const EVENT_URL = "https://clubadmfit-fcpqjdnn.manus.space/evenements/course-19-septembre";
const EVENT_TEXT = "Je me suis inscrit à la course caritative du Club ADM le 19 septembre à Chambly! 🏃‍♂️ Distances: 21.1 km, 10 km, 5 km, 1 km. Les profits vont à la Fondation du Centre Jeunesse de la Montérégie. Viens courir avec moi!";
const EVENT_TEXT_SHORT = "Course caritative Club ADM — 19 sept à Chambly! Viens courir avec moi 🏃‍♂️";

export default function ThankYouCourse() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(EVENT_URL);
      setCopied(true);
      toast.success("Lien copié!");
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("Impossible de copier le lien");
    }
  };

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

          {/* Bouton Ajouter au calendrier */}
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-8 text-center">
            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=%C3%89v%C3%A9nement+Course+Club+ADM&dates=20250919T080000/20250919T140000&details=Course+caritative+au+profit+de+la+Fondation+du+Centre+Jeunesse+de+la+Mont%C3%A9r%C3%A9gie.+Distances+%3A+21.1+km%2C+10+km%2C+5+km%2C+1+km.+Programmation+de+course+incluse+%283x%2Fsemaine%29.&location=Chambly%2C+QC&sf=true&output=xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 text-white text-sm font-bold uppercase tracking-wider rounded-lg border-2 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 hover:border-red-500/50"
              style={{ borderColor: "rgba(237,28,36,0.4)", backgroundColor: "rgba(237,28,36,0.08)", fontFamily: "var(--font-body)" }}
            >
              <Calendar size={20} style={{ color: "#ed1c24" }} />
              Ajouter à mon calendrier
            </a>
          </motion.div>
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

            {/* Encadré mise en évidence : envoi par courriel et SMS */}
            <div className="mt-8 rounded-lg p-5 border" style={{ backgroundColor: "rgba(237,28,36,0.06)", borderColor: "rgba(237,28,36,0.25)" }}>
              <div className="flex items-start gap-3 mb-3">
                <Mail size={20} style={{ color: "#ed1c24" }} className="flex-shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-body)" }}>
                  Ta programmation t'a été envoyée par <span style={{ color: "#ed1c24" }}>courriel</span> et par <span style={{ color: "#ed1c24" }}>SMS</span>.
                </p>
              </div>
              <p className="text-sm leading-relaxed ml-8" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)" }}>
                Prends bien le temps de lire le message au complet pour comprendre le fonctionnement de ta programmation — fréquence des entraînements, comment suivre ta progression, et les détails du Run Club du dimanche.
              </p>
            </div>

            <p className="text-xs mt-5 pt-5 border-t border-white/[0.06]" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}>
              Tu n'as pas reçu le message? Vérifie tes courriels indésirables ou contacte-nous au 450-600-2448.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Groupe communautaire privé */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[700px] mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl p-8 lg:p-10 border text-center" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5" style={{ backgroundColor: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.25)" }}>
              <Users size={24} style={{ color: "#25D366" }} />
            </div>
            <h3 className="text-2xl lg:text-3xl mb-3 text-white" style={{ fontFamily: "var(--font-display)" }}>REJOINS LE GROUPE PRIVÉ</h3>
            <p className="text-base leading-relaxed mb-6 max-w-[500px] mx-auto" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>
              Échange avec les autres coureurs, partage ta progression, pose tes questions et motive-toi avec la communauté. Le groupe est exclusif aux participants inscrits.
            </p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-4 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:opacity-90"
              style={{ backgroundColor: "#25D366", fontFamily: "var(--font-body)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Rejoindre le groupe
            </a>
            <p className="text-xs mt-5" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>
              Lien exclusif réservé aux participants inscrits
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cause - Fondation */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#0f1229" }}>
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

      {/* Section Partage Réseaux Sociaux */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: "#0f1229" }}>
        <div className="max-w-[800px] mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5" style={{ backgroundColor: "rgba(237,28,36,0.12)", border: "1px solid rgba(237,28,36,0.25)" }}>
              <Share2 size={24} style={{ color: "#ed1c24" }} />
            </div>
            <h3 className="text-3xl lg:text-4xl mb-4 text-white" style={{ fontFamily: "var(--font-display)" }}>INVITE TES AMIS À COURIR</h3>
            <p className="text-base leading-relaxed max-w-[550px] mx-auto" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>
              Plus on est nombreux, plus on fait la différence pour les jeunes de la Montérégie. Partage l'événement et courons ensemble le 19 septembre!
            </p>
          </motion.div>

          {/* Grille de boutons de partage */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {/* Facebook */}
            <motion.a
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(EVENT_URL)}&quote=${encodeURIComponent(EVENT_TEXT_SHORT)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-5 rounded-xl border border-white/[0.06] transition-all duration-300 hover:border-[#1877F2]/40 hover:shadow-lg hover:shadow-[#1877F2]/10 group"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:scale-110" style={{ backgroundColor: "rgba(24,119,242,0.15)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)" }}>Facebook</span>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              href={`https://wa.me/?text=${encodeURIComponent(EVENT_TEXT + "\n\n" + EVENT_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-5 rounded-xl border border-white/[0.06] transition-all duration-300 hover:border-[#25D366]/40 hover:shadow-lg hover:shadow-[#25D366]/10 group"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:scale-110" style={{ backgroundColor: "rgba(37,211,102,0.15)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)" }}>WhatsApp</span>
            </motion.a>

            {/* Instagram */}
            <motion.a
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              href="https://www.instagram.com/clubadmfitness/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-5 rounded-xl border border-white/[0.06] transition-all duration-300 hover:border-[#E4405F]/40 hover:shadow-lg hover:shadow-[#E4405F]/10 group"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:scale-110" style={{ backgroundColor: "rgba(228,64,95,0.15)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#E4405F"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)" }}>Instagram</span>
            </motion.a>

            {/* SMS / iMessage */}
            <motion.a
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              href={`sms:?body=${encodeURIComponent(EVENT_TEXT_SHORT + " " + EVENT_URL)}`}
              className="flex flex-col items-center gap-3 p-5 rounded-xl border border-white/[0.06] transition-all duration-300 hover:border-[#34C759]/40 hover:shadow-lg hover:shadow-[#34C759]/10 group"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:scale-110" style={{ backgroundColor: "rgba(52,199,89,0.15)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#34C759"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/></svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)" }}>Texto / SMS</span>
            </motion.a>

            {/* Email */}
            <motion.a
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              href={`mailto:?subject=${encodeURIComponent("Course caritative Club ADM — 19 septembre à Chambly")}&body=${encodeURIComponent(EVENT_TEXT + "\n\nInscris-toi ici : " + EVENT_URL)}`}
              className="flex flex-col items-center gap-3 p-5 rounded-xl border border-white/[0.06] transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-white/5 group"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:scale-110" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                <Mail size={22} style={{ color: "rgba(255,255,255,0.8)" }} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)" }}>Courriel</span>
            </motion.a>

            {/* Copier le lien */}
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              onClick={handleCopyLink}
              className="flex flex-col items-center gap-3 p-5 rounded-xl border border-white/[0.06] transition-all duration-300 hover:border-[#ed1c24]/30 hover:shadow-lg hover:shadow-[#ed1c24]/5 group cursor-pointer"
              style={{ backgroundColor: copied ? "rgba(237,28,36,0.08)" : "rgba(255,255,255,0.03)" }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:scale-110" style={{ backgroundColor: copied ? "rgba(237,28,36,0.2)" : "rgba(237,28,36,0.12)" }}>
                {copied ? <Check size={22} style={{ color: "#ed1c24" }} /> : <Copy size={22} style={{ color: "#ed1c24" }} />}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: copied ? "#ed1c24" : "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)" }}>
                {copied ? "Copié!" : "Copier le lien"}
              </span>
            </motion.button>
          </div>

          {/* Message d'encouragement */}
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }}
            className="text-center rounded-xl p-6 border border-white/[0.04]" style={{ backgroundColor: "rgba(237,28,36,0.04)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>
              <span className="text-white font-semibold">Astuce :</span> Partage directement dans ton groupe d'amis ou ta story Instagram. Plus on est nombreux, plus on aide les jeunes de la Montérégie!
            </p>
          </motion.div>

          {/* Retour à l'accueil */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-center mt-10">
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
