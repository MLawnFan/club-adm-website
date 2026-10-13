/**
 * PAGE PROGRAMME — Inspirée de Chalk "Programs" page
 * Flow: Détail du programme avec tabs, communauté en ligne comme feature clé,
 * badges, métadonnées, preuve sociale, vidéo témoignage
 * Principes Sell Like Crazy: Magic Lantern, valeur avant la vente
 * POSITIONNEMENT: TOUT-EN-UN (nutrition + programmation + habitudes de vie + longévité soutenable)
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@/online/lib/navigation.tsx";
import {
  ArrowRight, CheckCircle, BookOpen, Target, Clock,
  Zap, Users, Award, Star, TrendingUp, Heart, Dumbbell,
  ChevronRight, MessageCircle, Video, Trophy, Calendar,
  Repeat, Layers, Compass, Moon, Brain, Apple, Activity
} from "lucide-react";
import Header from "@/online/components/Header";
import VideoTestimonial from "@/online/components/VideoTestimonial";

const GUIDE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/2RxvNFK4C99d4EGkajeXvG/guide-mockup-DCyJJ6aEFXR2RSPVYwCX6c.webp";
const TRANSFORMATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/2RxvNFK4C99d4EGkajeXvG/transformation-section-beyrz42nqWqpn42HwSEho4.webp";

type ProgramTab = "perte-poids" | "sante" | "performance";

const PROGRAMS: Record<ProgramTab, {
  title: string;
  subtitle: string;
  badges: string[];
  description: string;
  longTermPhilosophy: string;
  difficulty: string;
  duration: string;
  cadence: string;
  format: string;
  phases: { name: string; focus: string; duration: string }[];
  includes: string[];
  sample: string[];
}> = {
  "perte-poids": {
    title: "Perte de Poids & Transformation",
    subtitle: "Des résultats qui durent — pas un régime de plus qui finit dans 3 semaines",
    badges: ["Le plus populaire", "Habitudes durables", "Tous niveaux"],
    description: "Tu veux perdre du poids, mais surtout NE PAS le reprendre? Ce programme tout-en-un couvre ta nutrition, ta programmation d'entraînement ET tes habitudes de vie (sommeil, stress, récupération). Chaque phase est pensée pour que tu développes un système complet que tu vas garder pour le reste de ta vie. Pas de restriction extrême. Pas de date de fin. Un mode de vie.",
    longTermPhilosophy: "On ne te donne pas un régime. On te construit un système alimentaire que tu vas pouvoir maintenir pendant 10, 20, 30 ans. Chaque phase ajoute une couche d'habitude — une à la fois — pour que rien ne soit jamais trop difficile à maintenir.",
    difficulty: "Débutant à avancé",
    duration: "21 pages",
    cadence: "Progression par phases",
    format: "PDF personnalisé",
    phases: [
      { name: "Phase 1 — Fondation", focus: "Installer les bases : hydratation, structure de repas, portions visuelles. L'objectif est de créer une routine simple que tu peux maintenir même dans tes pires semaines.", duration: "Semaines 1-2" },
      { name: "Phase 2 — Optimisation", focus: "Affiner les quantités et le timing. Tu apprends à écouter ta faim et à ajuster sans compter chaque calorie. L'habitude devient naturelle.", duration: "Semaines 3-4" },
      { name: "Phase 3 — Accélération", focus: "Maximiser les résultats tout en gardant la flexibilité. Tu sais quoi manger au restaurant, en voyage, en situation sociale. Rien ne peut te dérailler.", duration: "Semaines 5-8" },
      { name: "Phase 4 — Maintien à vie", focus: "Transition vers l'autonomie complète. Tu n'as plus besoin de plan — tu as un système intégré dans ta vie quotidienne. C'est devenu qui tu es.", duration: "Long terme" },
    ],
    includes: [
      "Calcul précis de tes calories et macros — ajusté pour être maintenable",
      "Plan de repas structuré avec flexibilité intégrée (pas rigide)",
      "Programmation d'entraînement adaptée à ton niveau et tes objectifs",
      "Guide sommeil + récupération + gestion du stress",
      "Méthode des portions visuelles — pour manger bien PARTOUT, sans balance",
      "Stratégies de maintien à long terme (restaurants, voyages, fêtes)",
      "Parcours de progression en 5 niveaux — tu avances à TON rythme",
    ],
    sample: [
      "Déjeuner : Omelette 3 oeufs + légumes + toast grains entiers",
      "Collation : Yogourt grec + fruits + amandes",
      "Dîner : Poitrine de poulet + riz + brocoli",
      "Collation : Shake protéiné + banane",
      "Souper : Saumon + patate douce + salade",
    ],
  },
  "sante": {
    title: "Santé & Longévité",
    subtitle: "Construis des habitudes alimentaires qui te protègent pour les 30 prochaines années",
    badges: ["Approche holistique", "Anti-inflammatoire", "Habitudes à vie"],
    description: "Tu veux vivre plus longtemps, en meilleure santé, avec plus d'énergie? Ce programme tout-en-un couvre ta nutrition, ta programmation d'entraînement, ton sommeil, ta gestion du stress et ta récupération. Chaque habitude qu'on met en place aujourd'hui doit être maintenable dans 10 ans. Pas de mode. Pas de tendance. Un système complet pour le reste de ta vie.",
    longTermPhilosophy: "La longévité, ça se construit une habitude à la fois. On commence par les changements les plus impactants et les plus faciles à maintenir, puis on ajoute des couches progressivement. Dans 6 mois, tu vas manger comme ça naturellement — sans effort, sans y penser.",
    difficulty: "Tous niveaux",
    duration: "21 pages",
    cadence: "Progression par phases",
    format: "PDF personnalisé",
    phases: [
      { name: "Phase 1 — Nettoyage doux", focus: "Éliminer progressivement les aliments inflammatoires et les remplacer par des alternatives que tu aimes. Aucune privation brutale — juste des swaps intelligents.", duration: "Semaines 1-2" },
      { name: "Phase 2 — Densité nutritive", focus: "Ajouter les super-aliments protecteurs : antioxydants, oméga-3, fibres. Tu apprends à cuisiner simple mais puissant pour ta santé.", duration: "Semaines 3-4" },
      { name: "Phase 3 — Routine santé", focus: "Intégrer l'hydratation optimale, le timing des repas et les habitudes de sommeil. Ton énergie explose et tes marqueurs de santé s'améliorent.", duration: "Semaines 5-8" },
      { name: "Phase 4 — Pilote automatique", focus: "Tes nouvelles habitudes sont ancrées. Tu manges pour ta santé sans y penser. C'est devenu ton mode de vie par défaut.", duration: "Long terme" },
    ],
    includes: [
      "Aliments anti-inflammatoires et protecteurs — intégrés progressivement",
      "Programmation d'entraînement orientée longévité et mobilité",
      "Protocole sommeil + récupération + gestion du stress chronique",
      "Équilibre des macros optimisé pour l'énergie et la longévité",
      "Stratégies pour maintenir ces habitudes même quand la vie est chaotique",
      "Parcours de progression en 5 niveaux — chaque niveau est maintenable à vie",
    ],
    sample: [
      "Déjeuner : Gruau + bleuets + graines de chia + noix",
      "Collation : Pomme + beurre d'amande",
      "Dîner : Bowl quinoa + saumon + avocat + légumes",
      "Collation : Légumes crus + houmous",
      "Souper : Poulet grillé + légumes rôtis + huile d'olive",
    ],
  },
  "performance": {
    title: "Performance & Gain Musculaire",
    subtitle: "Un système nutritionnel que tu peux suivre pendant des années — pas juste un bulk de 8 semaines",
    badges: ["Haute performance", "Gain musculaire durable", "Phases progressives"],
    description: "Tu t'entraînes sérieusement et tu veux que ta nutrition ET tes habitudes de vie suivent? Ce programme tout-en-un couvre ta nutrition, ta programmation, ton sommeil et ta récupération. Pas de bulk/cut extrême qui te fait yo-yo. Un système complet et progressif qui te permet de performer année après année, de façon constante et durable.",
    longTermPhilosophy: "Les meilleurs physiques se construisent sur des années de constance, pas des semaines d'extrêmes. On te donne un cadre nutritionnel que tu peux ajuster saison après saison, sans jamais avoir à tout recommencer à zéro.",
    difficulty: "Intermédiaire à avancé",
    duration: "21 pages",
    cadence: "Progression par phases",
    format: "PDF personnalisé",
    phases: [
      { name: "Phase 1 — Calibration", focus: "Trouver ton point de maintenance exact et installer une routine alimentaire autour de ton entraînement. Simple, répétable, efficace.", duration: "Semaines 1-2" },
      { name: "Phase 2 — Construction", focus: "Surplus calorique contrôlé pour le gain musculaire propre. Tu apprends le timing des nutriments pour maximiser chaque session sans accumuler de gras.", duration: "Semaines 3-6" },
      { name: "Phase 3 — Ajustement", focus: "Affiner selon tes résultats. Tu deviens capable d'ajuster toi-même tes portions et tes macros selon ta progression. Autonomie totale.", duration: "Semaines 7-12" },
      { name: "Phase 4 — Système à vie", focus: "Tu as un cadre nutritionnel flexible que tu peux utiliser en prise de masse, en maintenance ou en sèche — pour toujours. Plus jamais besoin de repartir de zéro.", duration: "Long terme" },
    ],
    includes: [
      "Surplus calorique calculé pour le gain musculaire PROPRE et durable",
      "Programmation d'entraînement périodisée pour progression constante",
      "Timing des nutriments autour de l'entraînement — maintenable au quotidien",
      "Protocole sommeil + récupération pour maximiser tes gains",
      "Système d'ajustement autonome (tu apprends à te gérer seul)",
      "Plan adapté à tes jours d'entraînement vs repos — flexible et réaliste",
    ],
    sample: [
      "Déjeuner : 4 oeufs + flocons d'avoine + banane + beurre d'arachide",
      "Collation pré-entraînement : Riz + poulet + fruits",
      "Post-entraînement : Shake protéiné + dextrose + créatine",
      "Dîner : Steak + patate douce + légumes verts",
      "Souper : Pâtes grains entiers + boeuf haché + sauce tomate",
    ],
  },
};

const TABS: { id: ProgramTab; label: string; icon: React.ReactNode }[] = [
  { id: "perte-poids", label: "Perte de Poids", icon: <TrendingUp size={16} /> },
  { id: "sante", label: "Santé & Longévité", icon: <Heart size={16} /> },
  { id: "performance", label: "Performance", icon: <Dumbbell size={16} /> },
];

export default function ProgramPage() {
  const [activeTab, setActiveTab] = useState<ProgramTab>("perte-poids");
  const program = PROGRAMS[activeTab];

  return (
    <div className="min-h-screen bg-online-navy">
      <Header />

      {/* ===== HERO — Titre + Tabs ===== */}
      <section className="pt-28 pb-8 lg:pt-32 lg:pb-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-block text-online-cta-red font-display text-sm font-bold tracking-widest uppercase mb-4"
            >
              Programme Tout-en-Un
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-10"
            >
              Nutrition. Entraînement. Habitudes de vie.{" "}
              <span className="text-online-cta-red">Tout est là.</span>
            </motion.h1>

            {/* Tabs */}
            <div className="inline-flex flex-wrap justify-center gap-2 bg-white/5 p-1.5 rounded-lg border border-white/10">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider px-5 py-3 rounded-md transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-online-cta-red text-white shadow-lg"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMME DETAIL ===== */}
      <section className="py-12 lg:py-20">
        <div className="container">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            {/* Card principale */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-10">
              <div className="grid lg:grid-cols-5">
                {/* Image à gauche */}
                <div className="lg:col-span-2 relative min-h-[300px] lg:min-h-0">
                  <img
                    src={TRANSFORMATION_IMG}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-online-navy/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-online-navy/30" />
                  <div className="absolute bottom-4 left-4 right-4 lg:hidden">
                    <h2 className="font-display text-2xl font-bold text-white">{program.title}</h2>
                  </div>
                </div>

                {/* Contenu à droite */}
                <div className="lg:col-span-3 p-8 sm:p-10">
                  <div className="hidden lg:block">
                    <h2 className="text-2xl sm:text-3xl font-bold text-online-cta-red mb-1">
                      {program.title}
                    </h2>
                    <p className="font-display text-lg text-white/70 mb-4" style={{ textTransform: 'none' }}>
                      {program.subtitle}
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {program.badges.map((badge, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 bg-online-cta-red/10 text-online-cta-red font-body text-xs font-semibold px-3 py-1.5 rounded-full border border-online-cta-red/20"
                      >
                        <Star size={12} />
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="font-body text-base sm:text-lg text-white/70 leading-relaxed mb-4">
                    {program.description}
                  </p>

                  {/* Philosophie long terme — mise en avant */}
                  <div className="bg-white/5 border-l-4 border-online-cta-red rounded-r-lg p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Repeat size={16} className="text-online-cta-red" />
                      <span className="font-display text-xs font-bold text-online-cta-red uppercase tracking-wider">
                        Philosophie long terme
                      </span>
                    </div>
                    <p className="font-body text-sm sm:text-base text-white/60 leading-relaxed italic">
                      {program.longTermPhilosophy}
                    </p>
                  </div>

                  {/* Métadonnées */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-white/10">
                    {[
                      { icon: <Target size={18} />, label: "Difficulté", value: program.difficulty },
                      { icon: <BookOpen size={18} />, label: "Format", value: program.duration },
                      { icon: <Layers size={18} />, label: "Structure", value: program.cadence },
                      { icon: <Zap size={18} />, label: "Livraison", value: program.format },
                    ].map((meta, i) => (
                      <div key={i} className="text-center">
                        <div className="text-online-cta-red flex justify-center mb-1">{meta.icon}</div>
                        <div className="font-display text-xs font-bold text-white/40 uppercase tracking-wider">{meta.label}</div>
                        <div className="font-body text-sm text-white font-semibold mt-0.5">{meta.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ===== PHASES DE PROGRESSION ===== */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 sm:p-10 mb-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-online-cta-red/10 flex items-center justify-center">
                  <Compass size={20} className="text-online-cta-red" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Ton parcours de progression</h3>
                  <p className="font-body text-sm text-white/40">Chaque phase est conçue pour être maintenable à long terme</p>
                </div>
              </div>

              <div className="space-y-4">
                {program.phases.map((phase, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="relative flex gap-4"
                  >
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        i === program.phases.length - 1
                          ? "bg-online-cta-red text-white"
                          : "bg-white/10 text-white/60 border border-white/20"
                      }`}>
                        <span className="font-display text-xs font-bold">{i + 1}</span>
                      </div>
                      {i < program.phases.length - 1 && (
                        <div className="w-px h-full bg-white/10 my-1" />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`pb-6 flex-1 ${i === program.phases.length - 1 ? "pb-0" : ""}`}>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-display text-base font-bold text-white">{phase.name}</h4>
                        <span className="font-body text-xs text-online-cta-red bg-online-cta-red/10 px-2 py-0.5 rounded-full">{phase.duration}</span>
                      </div>
                      <p className="font-body text-sm text-white/50 leading-relaxed">{phase.focus}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Emphasis box */}
              <div className="mt-8 bg-online-cta-red/5 border border-online-cta-red/20 rounded-lg p-5 text-center">
                <p className="font-body text-base text-white/70">
                  <span className="text-online-cta-red font-semibold">Le but de chaque phase :</span> que tu puisses la maintenir <span className="text-white font-semibold">pour le reste de ta vie</span>. On avance seulement quand la phase précédente est devenue naturelle.
                </p>
              </div>
            </div>

            {/* Contenu inclus + Sample */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="font-display text-sm font-bold text-white/60 uppercase tracking-wider mb-4">
                  Ce qui est inclus
                </h3>
                <ul className="space-y-3">
                  {program.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 font-body text-sm text-white/60">
                      <CheckCircle size={16} className="text-online-cta-red shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="font-display text-sm font-bold text-white/60 uppercase tracking-wider mb-4">
                  Exemple de journée type
                </h3>
                <ul className="space-y-3">
                  {program.sample.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 font-body text-sm text-white/60">
                      <span className="text-online-cta-red font-bold shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== HABITUDES DE VIE — Section dédiée avec icônes ===== */}
      <section className="py-16 lg:py-24 border-t border-white/5">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <span className="inline-block text-online-cta-red font-display text-sm font-bold tracking-widest uppercase mb-3">
                Au-delà de la nutrition
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Les habitudes de vie{" "}
                <span className="text-online-cta-red">qui changent tout.</span>
              </h2>
              <p className="font-body text-lg sm:text-xl text-white/50 max-w-2xl mx-auto">
                La santé, c'est un tout. Ton programme couvre chaque pilier qui influence ta longévité, ton énergie et tes résultats — pas juste ce que tu manges.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Moon size={28} />,
                  title: "Sommeil & Récupération",
                  desc: "Protocole pour optimiser la qualité de ton sommeil. Routine du soir, environnement idéal, et stratégies pour te réveiller avec plus d'énergie — même avec un horaire chargé.",
                  stat: "7-9h",
                  statLabel: "Objectif sommeil",
                },
                {
                  icon: <Brain size={28} />,
                  title: "Gestion du Stress",
                  desc: "Techniques concrètes pour gérer le stress chronique qui sabote tes résultats. Respiration, micro-pauses, et habitudes quotidiennes qui baissent ton cortisol naturellement.",
                  stat: "-40%",
                  statLabel: "Cortisol en 4 sem.",
                },
                {
                  icon: <Activity size={28} />,
                  title: "Mouvement Quotidien",
                  desc: "Au-delà de l'entraînement : comment intégrer plus de mouvement dans ta journée sans effort. Marche, mobilité, et micro-activités qui font une différence énorme sur 10 ans.",
                  stat: "8K+",
                  statLabel: "Pas / jour visés",
                },
                {
                  icon: <Apple size={28} />,
                  title: "Hydratation & Énergie",
                  desc: "Un système simple pour rester hydraté toute la journée. Plus de crash de 14h, plus de fatigue chronique. L'eau et les électrolytes deviennent un réflexe automatique.",
                  stat: "2-3L",
                  statLabel: "Hydratation / jour",
                },
                {
                  icon: <Heart size={28} />,
                  title: "Santé Mentale & Mindset",
                  desc: "La transformation commence dans ta tête. Gratitude, journaling, et habitudes de pensée qui te gardent motivé même quand la vie est difficile. Pas du woo-woo — du concret.",
                  stat: "5 min",
                  statLabel: "Routine quotidienne",
                },
                {
                  icon: <Repeat size={28} />,
                  title: "Routines & Constance",
                  desc: "Comment bâtir des routines matin/soir qui deviennent automatiques en 21 jours. Le secret : empiler les habitudes une à la fois pour que rien ne soit jamais trop difficile.",
                  stat: "21j",
                  statLabel: "Pour ancrer l'habitude",
                },
              ].map((habit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 hover:border-white/15 transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-online-cta-red/10 text-online-cta-red group-hover:bg-online-cta-red/15 transition-all">
                      {habit.icon}
                    </div>
                    <div className="text-right">
                      <p className="font-display text-xl font-bold text-online-cta-red">{habit.stat}</p>
                      <p className="font-body text-[10px] text-white/30 uppercase tracking-wider">{habit.statLabel}</p>
                    </div>
                  </div>
                  <h3 className="font-display text-base font-bold text-white mb-2">{habit.title}</h3>
                  <p className="font-body text-sm text-white/50 leading-relaxed">{habit.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Bottom emphasis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 text-center"
            >
              <p className="font-body text-lg text-white/60 leading-relaxed">
                <span className="text-white font-semibold">Chaque habitude est introduite progressivement.</span>{" "}
                On ne te demande pas de tout changer en même temps. Une habitude à la fois, à ton rythme — pour que ça reste{" "}
                <span className="text-online-cta-red font-semibold">soutenable pour les 30 prochaines années.</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== COMMUNAUTÉ EN LIGNE — Section dédiée ===== */}
      <section className="py-16 lg:py-24 border-t border-white/5">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block text-online-cta-red font-display text-sm font-bold tracking-widest uppercase mb-3">
                Inclus avec ton plan
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ta communauté.{" "}
                <span className="text-online-cta-red">Ton filet de sécurité.</span>
              </h2>
              <p className="font-body text-lg sm:text-xl text-white/50 max-w-2xl mx-auto">
                Les habitudes se maintiennent mieux quand t'es entouré. 30 jours d'accès gratuit à notre communauté en ligne — parce que les meilleurs résultats à long terme arrivent quand t'es pas seul.
              </p>
            </motion.div>

            {/* Communauté features - grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: <MessageCircle size={24} />,
                  title: "Groupe privé",
                  desc: "Pose tes questions à n'importe quel moment. L'équipe ADM et les autres membres sont là pour toi. T'es jamais seul quand ça devient difficile.",
                },
                {
                  icon: <Trophy size={24} />,
                  title: "Défis mensuels",
                  desc: "Chaque mois, un nouveau défi pour ancrer une habitude de plus. Les membres qui participent maintiennent leurs résultats 3x plus longtemps.",
                },
                {
                  icon: <Video size={24} />,
                  title: "Lives exclusifs",
                  desc: "Sessions en direct avec le Team ADM. On parle nutrition, habitudes, mindset — et tu peux poser tes questions en temps réel.",
                },
                {
                  icon: <Calendar size={24} />,
                  title: "Accountability",
                  desc: "Un système de suivi hebdomadaire pour que tu restes constant. C'est la constance qui crée les résultats durables — pas la perfection.",
                },
                {
                  icon: <Users size={24} />,
                  title: "Réseau de support",
                  desc: "Des centaines de membres qui vivent la même chose que toi. Partage tes wins, tes moments tough, et tes recettes préférées.",
                },
                {
                  icon: <Award size={24} />,
                  title: "Contenu exclusif",
                  desc: "Des guides, des vidéos et des ressources pour t'aider à maintenir tes habitudes sur le long terme. Mis à jour chaque semaine.",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/8 transition-all"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-online-cta-red/10 text-online-cta-red mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-base font-bold text-white mb-2">{feature.title}</h3>
                  <p className="font-body text-sm text-white/50 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Communauté CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-online-cta-red/10 border border-online-cta-red/20 rounded-xl p-8 sm:p-10 text-center"
            >
              <p className="font-display text-lg sm:text-xl font-bold text-white mb-2">
                30 jours gratuits. Aucune obligation.
              </p>
              <p className="font-body text-base text-white/60 mb-6 max-w-xl mx-auto">
                Essaie la communauté pendant 30 jours complets avec ton plan de nutrition. Si tu veux continuer après, c'est seulement 49$/mois au tarif fondateur (au lieu de 70$). Mais on parie que tu voudras rester — parce que c'est là que les habitudes se maintiennent.
              </p>
              <Link
                href="/online-project/resultat"
                className="inline-flex items-center gap-2 bg-online-cta-red hover:bg-online-cta-red-hover text-white font-display text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-lg transition-all duration-300"
              >
                Voir l'offre complète
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== PREUVE SOCIALE — Témoignages ===== */}
      <section id="temoignages" className="py-16 lg:py-24 border-t border-white/5">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="inline-block text-online-cta-red font-display text-sm font-bold tracking-widest uppercase mb-3">
                Résultats durables
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Des habitudes qui{" "}
                <span className="text-online-cta-red">restent</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              {[
                {
                  quote: "J'ai perdu 12 lbs en 8 semaines et ça fait 6 mois que je les ai pas repris. C'est la première fois que ça dure. Le système de phases m'a permis d'avancer sans jamais me sentir overwhelmed.",
                  name: "Marc L.",
                  age: "42 ans",
                  result: "-12 lbs (maintenu)",
                },
                {
                  quote: "La communauté a tout changé pour moi. Quand j'avais envie de lâcher, y'avait toujours quelqu'un pour me rappeler pourquoi j'avais commencé. C'est ça qui fait que les habitudes restent.",
                  name: "Sophie D.",
                  age: "38 ans",
                  result: "Habitudes maintenues 6+ mois",
                },
                {
                  quote: "Le fait que chaque phase soit maintenable, ça change tout. J'ai jamais eu l'impression de faire un régime. C'est juste devenu ma façon de manger. Naturellement.",
                  name: "Jean-Philippe R.",
                  age: "51 ans",
                  result: "-18 lbs (maintenu 1 an)",
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-lg p-6"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="text-online-cta-red fill-online-cta-red" />
                    ))}
                  </div>
                  <p className="font-body text-base text-white/70 leading-relaxed mb-5 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                      <p className="font-display text-sm font-bold text-white">{testimonial.name}</p>
                      <p className="font-body text-xs text-white/40">{testimonial.age}</p>
                    </div>
                    <span className="font-display text-xs font-bold text-online-cta-red">{testimonial.result}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <VideoTestimonial
              title="Écoute ce que nos membres ont à dire."
              subtitle="De vraies transformations durables. De vraies personnes."
            />
          </div>
        </div>
      </section>

      {/* ===== CTA — Pricing preview ===== */}
      <section className="py-16 lg:py-24 border-t border-white/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Prêt à bâtir des habitudes{" "}
                <span className="text-online-cta-red">qui durent?</span>
              </h2>
              <p className="font-body text-xl text-white/50 mb-10 max-w-2xl mx-auto">
                Ton programme tout-en-un (nutrition + entraînement + habitudes de vie) + 30 jours d'accès gratuit à la communauté en ligne — tout ce qu'il te faut pour bâtir un mode de vie soutenable.
              </p>

              {/* Preview pricing */}
              <div className="inline-flex flex-col sm:flex-row gap-4 mb-10">
                <div className="bg-white/5 border border-white/10 rounded-lg px-8 py-6 text-center">
                  <p className="font-body text-xs text-white/40 uppercase tracking-wider mb-1">Valeur totale</p>
                  <p className="font-display text-2xl font-bold text-white/30 line-through">198$</p>
                </div>
                <div className="bg-online-cta-red/10 border-2 border-online-cta-red rounded-lg px-8 py-6 text-center">
                  <p className="font-body text-xs text-online-cta-red uppercase tracking-wider mb-1">Aujourd'hui</p>
                  <p className="font-display text-4xl font-bold text-online-cta-red">39$</p>
                </div>
              </div>

              <div>
                <Link
                  href="/online-project/resultat"
                  className="inline-flex items-center gap-3 bg-online-cta-red hover:bg-online-cta-red-hover text-white font-display text-lg sm:text-xl font-bold uppercase tracking-wider px-10 py-5 rounded-lg transition-all duration-300 cta-pulse"
                >
                  Obtenir mon programme tout-en-un
                  <ArrowRight size={22} />
                </Link>
                <p className="font-body text-sm text-white/30 mt-4">
                  Paiement unique de 39$ — Nutrition + Entraînement + Habitudes de vie + 30 jours de communauté
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== GUIDE GRATUIT — HVCO Fallback ===== */}
      <section className="py-16 lg:py-20 bg-online-navy-dark border-t border-white/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block text-online-cta-red font-display text-sm font-bold tracking-widest uppercase mb-3">
                  Pas encore prêt?
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Télécharge le guide gratuit{" "}
                  <span className="text-online-cta-red">de 21 pages</span>
                </h3>
                <p className="font-body text-lg text-white/60 leading-relaxed mb-6">
                  Commence par les bases. Notre guide gratuit te donne la méthode des portions visuelles, des exemples de repas, et un parcours de progression en 5 niveaux. Zéro engagement. Des habitudes simples à installer dès aujourd'hui.
                </p>
                <Link
                  href="/online-project"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-display text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-lg border border-white/10 transition-all duration-300"
                >
                  Télécharger le guide gratuit
                  <ChevronRight size={16} />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center"
              >
                <img
                  src={GUIDE_IMG}
                  alt="Guide Nutrition Gratuit"
                  className="max-h-[350px] object-contain drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 bg-online-navy-dark text-white/30 text-center font-body text-sm border-t border-white/5">
        <div className="container">
          <p>Club ADM Fitness — Tous droits réservés {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
