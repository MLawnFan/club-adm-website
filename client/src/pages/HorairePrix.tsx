/*
 * PAGE HORAIRE & PRIX — Club ADM Fitness
 * Design chaleureux: fond crème, cartes blanches, tarification claire
 * Horaire des cours + Tarifs + Drop In
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Clock, DollarSign, MapPin, ArrowRight, CheckCircle2, Calendar, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";

const scheduleBlocks = [
  { day: "Lundi", classes: ["6:00 — CrossFit", "9:00 — Fonctionnel", "12:00 — Express 45min", "16:30 — Rookies", "17:30 — CrossFit", "18:30 — CrossFit"] },
  { day: "Mardi", classes: ["6:00 — CrossFit", "9:00 — Fonctionnel", "12:00 — Express 45min", "17:30 — CrossFit", "18:30 — Initiation"] },
  { day: "Mercredi", classes: ["6:00 — CrossFit", "9:00 — Fonctionnel", "12:00 — Express 45min", "16:30 — Rookies", "17:30 — CrossFit", "18:30 — CrossFit"] },
  { day: "Jeudi", classes: ["6:00 — CrossFit", "9:00 — Fonctionnel", "12:00 — Express 45min", "17:30 — CrossFit", "18:30 — Initiation"] },
  { day: "Vendredi", classes: ["6:00 — CrossFit", "9:00 — Fonctionnel", "12:00 — Express 45min", "17:30 — CrossFit"] },
  { day: "Samedi", classes: ["8:00 — CrossFit", "9:00 — Fonctionnel", "10:00 — Team WOD"] },
  { day: "Dimanche", classes: ["9:00 — Open Gym", "10:00 — Yoga / Mobilité"] },
];

const plans = [
  {
    name: "Essentiel",
    price: "149",
    period: "/mois",
    desc: "Parfait pour commencer",
    features: [
      "3 cours de groupe par semaine",
      "Accès aux heures d'ouverture",
      "Cours d'initiation inclus",
      "Application de suivi",
    ],
    popular: false,
  },
  {
    name: "Illimité",
    price: "189",
    period: "/mois",
    desc: "Notre plan le plus populaire",
    features: [
      "Cours de groupe illimités",
      "Open Gym illimité",
      "Programmation personnalisée",
      "Application de suivi",
      "Accès aux 2 succursales",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "249",
    period: "/mois",
    desc: "L'expérience complète",
    features: [
      "Tout du plan Illimité",
      "1 séance personnelle / semaine",
      "Coaching nutritionnel",
      "Programmation en ligne incluse",
      "Priorité de réservation",
    ],
    popular: false,
  },
];

export default function HorairePrix() {
  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Navbar />

      {/* Hero */}
      <section className="bg-warm-cream py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-adm-red text-sm font-bold uppercase tracking-[0.15em] mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Horaire & Prix
            </p>
            <h1
              className="text-navy text-5xl lg:text-7xl leading-[0.9] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              TROUVE TON<br />
              <span className="text-adm-red">CRÉNEAU.</span>
            </h1>
            <p className="text-navy/50 text-lg leading-relaxed max-w-xl" style={{ fontFamily: "var(--font-body)" }}>
              Des cours du matin au soir, 7 jours sur 7. Choisis le forfait qui correspond à tes objectifs et à ton rythme de vie.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Horaire */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-adm-red text-sm font-bold uppercase tracking-[0.15em] mb-2" style={{ fontFamily: "var(--font-body)" }}>
                Horaire des cours
              </p>
              <h2
                className="text-navy text-3xl lg:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                CETTE SEMAINE
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="https://clubadm.com/centre-de-brossard/"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider border border-navy/10 text-navy/60 hover:border-adm-red hover:text-adm-red rounded-lg transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <MapPin size={12} /> Brossard
              </a>
              <a
                href="https://clubadm.com/centre-de-chambly/"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider border border-navy/10 text-navy/60 hover:border-adm-red hover:text-adm-red rounded-lg transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <MapPin size={12} /> Chambly
              </a>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {scheduleBlocks.map((block, i) => (
              <motion.div
                key={block.day}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="bg-white rounded-xl border border-gray-50 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="px-4 py-3 border-b border-gray-50" style={{ backgroundColor: i < 5 ? "#232862" : "#ed1c24" }}>
                  <h3 className="text-white text-sm font-bold uppercase tracking-wider text-center" style={{ fontFamily: "var(--font-body)" }}>
                    {block.day}
                  </h3>
                </div>
                <div className="p-4 space-y-2">
                  {block.classes.map((c) => (
                    <div key={c} className="flex items-start gap-2">
                      <Clock size={12} className="text-adm-red mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-navy/60" style={{ fontFamily: "var(--font-body)" }}>
                        {c}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://clubadm.com/horaire/"
              className="inline-flex items-center gap-2 text-adm-red text-sm font-bold uppercase tracking-wider hover:underline"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <Calendar size={16} />
              Voir l'horaire complet sur clubadm.com
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="bg-warm-cream py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-adm-red text-sm font-bold uppercase tracking-[0.15em] mb-3" style={{ fontFamily: "var(--font-body)" }}>
              Investis en toi
            </p>
            <h2
              className="text-navy text-4xl lg:text-5xl mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              NOS FORFAITS
            </h2>
            <p className="text-navy/40 text-base max-w-md mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Pas de contrat à long terme. Pas de frais cachés. Juste des résultats.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative bg-white rounded-2xl p-7 ${
                  plan.popular
                    ? "border-2 border-adm-red shadow-xl scale-[1.02]"
                    : "border border-gray-100 hover:shadow-lg"
                } transition-shadow`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-adm-red text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                    Populaire
                  </div>
                )}
                <h3
                  className="text-navy text-2xl mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {plan.name.toUpperCase()}
                </h3>
                <p className="text-navy/40 text-xs mb-5" style={{ fontFamily: "var(--font-body)" }}>
                  {plan.desc}
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-navy text-4xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    {plan.price}$
                  </span>
                  <span className="text-navy/30 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                    {plan.period}
                  </span>
                </div>
                <div className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-adm-red flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-navy/55" style={{ fontFamily: "var(--font-body)" }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
                <a
                  href="https://clubadm.com/contact-us/"
                  className={`block text-center py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-colors ${
                    plan.popular
                      ? "bg-adm-red text-white hover:bg-adm-red-hover"
                      : "border-2 border-navy/10 text-navy hover:border-adm-red hover:text-adm-red"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Consultation Gratuite
                </a>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://clubadm.com/rates/"
              className="inline-flex items-center gap-2 text-adm-red text-sm font-bold uppercase tracking-wider hover:underline"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <DollarSign size={16} />
              Voir tous les tarifs détaillés
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Drop In */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#232862" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-adm-red text-sm font-bold uppercase tracking-[0.15em] mb-3" style={{ fontFamily: "var(--font-body)" }}>
                De passage?
              </p>
              <h2
                className="text-white text-4xl lg:text-5xl mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                DROP IN
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-6" style={{ fontFamily: "var(--font-body)" }}>
                Tu es de passage à Brossard ou Chambly? Viens t'entraîner avec nous pour une séance. Aucun engagement, juste du bon entraînement.
              </p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-white text-5xl font-bold" style={{ fontFamily: "var(--font-display)" }}>25$</span>
                <span className="text-white/30 text-sm" style={{ fontFamily: "var(--font-body)" }}>/séance</span>
              </div>
              <div className="space-y-2 mb-8">
                {["Accès à un cours de groupe", "Tout l'équipement fourni", "Vestiaires et douches", "Bienvenue aux athlètes de tous niveaux"].map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-adm-red flex-shrink-0" />
                    <span className="text-sm text-white/50" style={{ fontFamily: "var(--font-body)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://clubadm.com/drop-in/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-adm-red text-white text-sm font-bold uppercase tracking-wider hover:bg-adm-red-hover transition-colors rounded-lg"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Réserver un Drop In
                <ArrowRight size={16} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="bg-white/5 rounded-2xl p-8 max-w-sm w-full">
                <Users size={40} className="text-adm-red mb-4" />
                <h3 className="text-white text-2xl mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  ATHLÈTES VISITEURS
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6" style={{ fontFamily: "var(--font-body)" }}>
                  On accueille les athlètes de passage avec plaisir. Présente-toi 10 minutes avant le cours avec une pièce d'identité.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin size={14} className="text-adm-red" />
                    <span className="text-white/50 text-sm" style={{ fontFamily: "var(--font-body)" }}>Brossard — 9 place du commerce</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={14} className="text-adm-red" />
                    <span className="text-white/50 text-sm" style={{ fontFamily: "var(--font-body)" }}>Chambly — 2180 boul. industriel</span>
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
