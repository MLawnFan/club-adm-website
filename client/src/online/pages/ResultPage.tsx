/**
 * PAGE 2 — RÉSULTAT / DIAGNOSTIC + OFFRE COMPLÈTE
 * Structure révisée :
 * 1. Diagnostic personnalisé (court)
 * 2. VALUE STACK + PRICING en haut (offre immédiate)
 * 3. Garantie
 * 4. Explications détaillées du programme (plus bas pour ceux qui veulent en savoir plus)
 * 5. Team ADM
 * 6. FAQ
 * 7. CTA final
 * → Après achat : redirige vers /upsell (offre fondateur communauté)
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "@/online/lib/navigation.tsx";
import {
  CheckCircle, ArrowRight, Shield, Clock, Users, Gift,
  Star, Zap, Heart, Target, Scale, Dumbbell, Moon, Brain,
  Apple, Activity, MessageCircle, Video, BarChart3, Award,
  ChevronDown, ChevronUp, Lock, CreditCard
} from "lucide-react";
import Header from "@/online/components/Header";
import { getPageParameters } from "@/online/lib/pageParameters";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/2RxvNFK4C99d4EGkajeXvG/hero-nutrition-jiNTMpKHJCcvf3SxFGKUGe.webp";
const TEAM_GROUP = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/2RxvNFK4C99d4EGkajeXvG/team-adm-group_e5f4805d.webp";
const COACH_GYM = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/2RxvNFK4C99d4EGkajeXvG/adm-coach-gym_952e4238.webp";

interface DiagnosticData {
  objectif: string;
  activite: string;
  defi: string;
  prenom: string;
}

const OBJECTIF_MAP: Record<string, { label: string; icon: React.ReactNode; programme: string; description: string }> = {
  "perte-poids": {
    label: "Perte de poids",
    icon: <Scale size={28} />,
    programme: "Transformation Soutenable",
    description: "Un programme conçu pour perdre du poids de façon progressive et maintenir tes résultats à vie.",
  },
  "sante-longevite": {
    label: "Santé & Longévité",
    icon: <Heart size={28} />,
    programme: "Longévité Active",
    description: "Un système complet pour optimiser ton énergie, ton sommeil et ta santé globale — bâti pour les 30 prochaines années.",
  },
  "performance": {
    label: "Performance",
    icon: <Zap size={28} />,
    programme: "Performance Durable",
    description: "Un plan structuré pour te dépasser physiquement tout en protégeant ta santé à long terme.",
  },
  "structure": {
    label: "Structure & Système",
    icon: <Target size={28} />,
    programme: "Système Complet",
    description: "Un cadre clair et progressif qui élimine l'improvisation — chaque jour tu sais exactement quoi faire.",
  },
};

const DEFI_MAP: Record<string, string> = {
  "constance": "la constance",
  "nutrition": "savoir quoi manger",
  "temps": "le manque de temps",
  "motivation": "la motivation",
  "resultats": "le manque de résultats",
};

const FAQ_ITEMS = [
  {
    q: "C'est quoi exactement qui est inclus dans le programme?",
    a: "Tu reçois un plan nutritionnel personnalisé, une programmation d'entraînement adaptée à ton niveau, un guide complet sur les habitudes de vie (sommeil, stress, récupération), et 30 jours d'accès gratuit à notre communauté privée avec le Team ADM.",
  },
  {
    q: "J'ai déjà essayé plein de programmes — pourquoi celui-ci serait différent?",
    a: "Parce qu'on ne te donne pas juste un plan. On t'accompagne avec un système complet (nutrition + entraînement + habitudes de vie) conçu pour être soutenable à long terme. Chaque phase est progressive — on ne te demande jamais de tout changer d'un coup.",
  },
  {
    q: "C'est quoi la communauté en ligne?",
    a: "C'est un groupe privé où tu retrouves le Team ADM et d'autres membres qui partagent les mêmes objectifs. Lives exclusifs, défis mensuels, accountability, questions-réponses — tout pour rester sur la bonne voie. Les 30 premiers jours sont gratuits avec ton programme.",
  },
  {
    q: "Après les 30 jours gratuits, ça coûte combien?",
    a: "L'abonnement régulier est de 70$/mois. Mais en tant que membre fondateur (offre limitée), tu peux verrouiller le tarif à 49$/mois — à vie. Tu n'es jamais obligé de continuer, mais la plupart de nos membres restent parce que la communauté fait toute la différence.",
  },
  {
    q: "Est-ce que c'est adapté à mon niveau?",
    a: "Oui. Que tu sois débutant ou avancé, le programme s'adapte. On part de là où tu es et on progresse à ton rythme. Chaque phase est conçue pour être maintenue avant de passer à la suivante.",
  },
  {
    q: "Et si ça ne me convient pas?",
    a: "Tu as 30 jours pour essayer. Si tu n'es pas satisfait, on te rembourse intégralement. Aucune question posée. On prend le risque à ta place.",
  },
  {
    q: "Est-ce que je vais recevoir le guide gratuit de 21 pages aussi?",
    a: "Le guide de 21 pages est gratuit, indépendamment de l’achat. L’envoi automatique par courriel n’est pas encore branché dans cet aperçu.",
  },
];

export default function ResultPage() {
  const [location] = useLocation();
  const [diagnostic, setDiagnostic] = useState<DiagnosticData>({
    objectif: "perte-poids",
    activite: "leger",
    defi: "constance",
    prenom: "",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [minutes, setMinutes] = useState(14);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const params = getPageParameters();
    setDiagnostic({
      objectif: params.get("objectif") || "perte-poids",
      activite: params.get("activite") || "leger",
      defi: params.get("defi") || "constance",
      prenom: params.get("prenom") || "",
    });
  }, []);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 0) {
          setMinutes((m) => {
            if (m === 0) {
              clearInterval(interval);
              return 0;
            }
            return m - 1;
          });
          return 59;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const objectifData = OBJECTIF_MAP[diagnostic.objectif] || OBJECTIF_MAP["perte-poids"];
  const defiLabel = DEFI_MAP[diagnostic.defi] || "la constance";
  const prenomDisplay = diagnostic.prenom || "toi";

  return (
    <div className="min-h-screen bg-online-navy">
      <Header />

      {/* ===== 1. DIAGNOSTIC PERSONNALISÉ (court) ===== */}
      <section className="relative pt-28 pb-10 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-online-navy via-online-navy/95 to-online-navy" />

        <div className="relative z-10 container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block bg-green-500/10 text-green-400 font-display text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5 border border-green-500/20">
                <CheckCircle size={14} className="inline mr-2" />
                Quiz complété — envoi du guide à brancher
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              {prenomDisplay}, voici ton{" "}
              <span className="text-online-cta-red">offre personnalisée.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-body text-lg text-white/50 mb-6"
            >
              Basé sur ton objectif ({objectifData.label.toLowerCase()}) et ton défi ({defiLabel}).
            </motion.p>

            {/* Mini diagnostic card inline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-6 py-4"
            >
              <div className="w-10 h-10 rounded-lg bg-online-cta-red/10 border border-online-cta-red/30 flex items-center justify-center text-online-cta-red">
                {objectifData.icon}
              </div>
              <div className="text-left">
                <p className="font-display text-base font-bold text-white">{objectifData.programme}</p>
                <p className="font-body text-xs text-white/40">{objectifData.description}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 2. VALUE STACK + PRICING (EN HAUT) ===== */}
      <section className="py-14 bg-online-navy-dark border-y border-white/5">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <span className="text-online-cta-red font-display text-sm font-bold tracking-widest uppercase mb-3 block">
                Récapitulatif de ton offre
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                Tout ça pour{" "}
                <span className="text-online-cta-red">une fraction</span>{" "}
                de la valeur réelle.
              </h2>
              <p className="font-body text-base text-white/40">
                Un paiement unique. Accès immédiat. Aucun abonnement caché.
              </p>
            </motion.div>

            {/* Value stack items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-10 mb-8"
            >
              <div className="space-y-4 mb-8">
                {[
                  { item: "Plan nutritionnel personnalisé", value: "97$", highlight: false },
                  { item: "Programmation d'entraînement adaptée", value: "97$", highlight: false },
                  { item: "Guide des habitudes de vie (sommeil, stress, récupération)", value: "47$", highlight: false },
                  { item: "Guide gratuit de 21 pages — envoi courriel à brancher", value: "27$", highlight: true },
                  { item: "30 jours d'accès à la communauté ADM", value: "70$", highlight: false },
                ].map((row, i) => (
                  <div key={i} className={`flex items-center justify-between py-3 border-b border-white/5 last:border-0 ${row.highlight ? "bg-green-500/5 -mx-4 px-4 rounded-lg border border-green-500/20" : ""}`}>
                    <div className="flex items-center gap-3">
                      <CheckCircle size={16} className={`shrink-0 ${row.highlight ? "text-green-400" : "text-green-400"}`} />
                      <span className={`font-body text-base ${row.highlight ? "text-green-300 font-bold" : "text-white/70"}`}>
                        {row.item}
                      </span>
                    </div>
                    <span className="font-display text-base text-white/30 line-through">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t-2 border-white/10 pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-lg font-bold text-white">Valeur totale :</span>
                  <span className="font-display text-lg text-white/40 line-through">338$</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-bold text-white">Ton prix aujourd'hui :</span>
                  <span className="font-display text-4xl font-bold text-online-cta-red">39$</span>
                </div>
              </div>
            </motion.div>

            {/* Countdown timer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-online-cta-red/10 border border-online-cta-red/30 rounded-xl p-4 text-center mb-8"
            >
              <p className="font-body text-sm text-white/60 mb-1">
                <Clock size={14} className="inline mr-1" />
                Cette offre expire dans :
              </p>
              <p className="font-display text-2xl font-bold text-online-cta-red">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </p>
            </motion.div>

            {/* CTA principal */}
            {/* Section Paiement — Design Checkout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-white/8 to-white/3 border-2 border-online-cta-red/30 rounded-2xl p-8 sm:p-10 text-center"
            >
              {/* Header checkout */}
              <div className="mb-6">
                <span className="inline-block bg-online-cta-red/10 text-online-cta-red font-display text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-online-cta-red/20">
                  Paiement unique — Pas d'abonnement
                </span>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="font-display text-2xl text-white/30 line-through">338$</span>
                  <span className="font-display text-5xl sm:text-6xl font-bold text-online-cta-red">39$</span>
                </div>
                <p className="font-body text-sm text-white/40">Accès immédiat et à vie à ton programme</p>
              </div>

              {/* Ce qui est inclus — résumé rapide */}
              <div className="bg-white/5 rounded-xl p-5 mb-6 text-left">
                <p className="font-display text-xs font-bold text-white/50 uppercase tracking-wider mb-3 text-center">Inclus dans ton paiement :</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "Plan nutritionnel personnalisé",
                    "Programmation d'entraînement",
                    "Guide habitudes de vie",
                    "30 jours communauté ADM gratuits",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-400 shrink-0" />
                      <span className="font-body text-sm text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bouton de paiement */}
              <Link
                href={`/online-project/checkout?${getPageParameters().toString()}`}
                className="w-full flex items-center justify-center gap-3 bg-online-cta-red hover:bg-online-cta-red-hover text-white font-display text-lg sm:text-xl font-bold uppercase tracking-wider px-10 py-5 rounded-xl transition-all duration-300 cta-pulse mb-5"
              >
                <Lock size={18} />
                Payer 39$ — Accès immédiat
                <ArrowRight size={20} />
              </Link>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
                <span className="flex items-center gap-1.5 text-white/40 font-body text-xs">
                  <Lock size={12} /> Paiement sécurisé SSL
                </span>
                <span className="flex items-center gap-1.5 text-white/40 font-body text-xs">
                  <Shield size={12} /> Garantie 30 jours
                </span>
                <span className="flex items-center gap-1.5 text-white/40 font-body text-xs">
                  <CreditCard size={12} /> Visa, Mastercard, Amex
                </span>
              </div>

              {/* Logos de paiement */}
              <div className="flex items-center justify-center gap-3 opacity-40">
                <div className="bg-white/10 rounded px-3 py-1.5">
                  <span className="font-display text-[10px] font-bold text-white tracking-wider">VISA</span>
                </div>
                <div className="bg-white/10 rounded px-3 py-1.5">
                  <span className="font-display text-[10px] font-bold text-white tracking-wider">MASTERCARD</span>
                </div>
                <div className="bg-white/10 rounded px-3 py-1.5">
                  <span className="font-display text-[10px] font-bold text-white tracking-wider">AMEX</span>
                </div>
                <div className="bg-white/10 rounded px-3 py-1.5">
                  <span className="font-display text-[10px] font-bold text-white tracking-wider">STRIPE</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* ===== 4. GARANTIE ===== */}
      <section className="py-12 bg-online-navy-dark border-y border-white/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Shield size={48} className="text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Garantie 30 jours — Zéro risque
              </h2>
              <p className="font-body text-lg text-white/60 max-w-2xl mx-auto">
                Si dans les 30 prochains jours tu sens que ce programme n'est pas pour toi, on te rembourse intégralement. Pas de questions. Pas de formulaire compliqué. Un simple courriel et c'est réglé.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 5. DÉTAILS DU PROGRAMME (pour ceux qui veulent en savoir plus) ===== */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-white/30 font-display text-xs font-bold tracking-widest uppercase mb-3 block">
                En savoir plus
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Ce qui est inclus en détail
              </h2>
              <p className="font-body text-base text-white/40 max-w-2xl mx-auto">
                Chaque élément est conçu pour être soutenable à long terme. On ne te demande pas de tout changer d'un coup — on progresse phase par phase.
              </p>
            </motion.div>

            {/* 3 piliers détaillés */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: <Apple size={28} />,
                  title: "Nutrition",
                  items: ["Plan alimentaire personnalisé", "Méthode des portions visuelles", "Guide des meilleurs aliments", "Recettes simples et rapides", "Stratégies restaurant & social"],
                },
                {
                  icon: <Dumbbell size={28} />,
                  title: "Programmation",
                  items: ["Entraînement adapté à ton niveau", "Progression structurée par phase", "Exercices avec vidéos explicatives", "Ajustements selon tes contraintes", "Récupération intégrée"],
                },
                {
                  icon: <Moon size={28} />,
                  title: "Habitudes de vie",
                  items: ["Optimisation du sommeil", "Gestion du stress au quotidien", "Routines matin et soir", "Hydratation et énergie", "Mindset et constance"],
                },
              ].map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-7 hover:border-online-cta-red/30 transition-all"
                >
                  <div className="text-online-cta-red mb-4">{pillar.icon}</div>
                  <h3 className="font-display text-lg font-bold text-white mb-4">{pillar.title}</h3>
                  <ul className="space-y-2.5">
                    {pillar.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <CheckCircle size={14} className="text-green-400 mt-1 shrink-0" />
                        <span className="font-body text-sm text-white/60">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Longévité — le fil conducteur */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-online-cta-red/10 via-online-cta-red/5 to-white/5 border border-online-cta-red/20 rounded-xl p-8 text-center"
            >
              <Activity size={32} className="text-online-cta-red mx-auto mb-3" />
              <h3 className="font-display text-lg font-bold text-white mb-2">
                Le fil conducteur : la longévité soutenable
              </h3>
              <p className="font-body text-base text-white/50 max-w-2xl mx-auto">
                Chaque élément du programme est conçu pour être maintenu à long terme. On progresse phase par phase, à ton rythme, pour que tes habitudes deviennent ton mode de vie.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 6. TEAM ADM ===== */}
      <section className="py-14 bg-online-navy-dark border-y border-white/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row items-center gap-10"
            >
              <div className="lg:w-1/3">
                <img
                  src={COACH_GYM}
                  alt="Coach Club ADM"
                  className="w-full h-64 lg:h-80 object-cover rounded-xl"
                />
              </div>
              <div className="lg:w-2/3">
                <span className="text-online-cta-red font-display text-sm font-bold tracking-widest uppercase mb-3 block">
                  Qui on est
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Le Team ADM — 30+ ans d'expérience combinée
                </h2>
                <p className="font-body text-base text-white/60 mb-4">
                  On est une équipe de coachs passionnés par la santé, la performance et la longévité. On a accompagné des centaines de personnes — de la personne sédentaire qui veut reprendre sa santé en main, à l'athlète qui veut se dépasser.
                </p>
                <p className="font-body text-base text-white/60 mb-6">
                  Notre philosophie : chaque habitude mise en place doit être soutenable pour les 30 prochaines années.
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { value: "30+", label: "Ans d'expérience" },
                    { value: "500+", label: "Clients accompagnés" },
                    { value: "4.9/5", label: "Satisfaction" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-lg px-5 py-3 text-center">
                      <p className="font-display text-xl font-bold text-online-cta-red">{stat.value}</p>
                      <p className="font-body text-xs text-white/40">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 7. FAQ ===== */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Questions fréquentes
              </h2>
              <p className="font-body text-base text-white/50">
                Tout ce que tu veux savoir avant de commencer.
              </p>
            </motion.div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-display text-sm sm:text-base font-bold text-white pr-4">
                      {faq.q}
                    </span>
                    {openFaq === i ? (
                      <ChevronUp size={18} className="text-online-cta-red shrink-0" />
                    ) : (
                      <ChevronDown size={18} className="text-white/30 shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="font-body text-sm text-white/50 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 8. CTA FINAL ===== */}
      <section className="py-16 bg-online-navy-dark border-t border-white/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                {prenomDisplay}, t'es prêt à commencer?
              </h2>
              <p className="font-body text-lg text-white/50 mb-8 max-w-xl mx-auto">
                Nutrition. Entraînement. Habitudes de vie. Communauté. Tout est là. Il manque juste toi.
              </p>

              <Link
                href={`/online-project/checkout?${getPageParameters().toString()}`}
                className="inline-flex items-center gap-3 bg-online-cta-red hover:bg-online-cta-red-hover text-white font-display text-lg font-bold uppercase tracking-wider px-10 py-5 rounded-xl transition-all duration-300 cta-pulse mb-4"
              >
                Obtenir mon programme — 39$
                <ArrowRight size={22} />
              </Link>

              <p className="font-body text-sm text-white/30">
                Paiement unique de 39$ • Accès immédiat • Garantie 30 jours
              </p>

              {/* P.S. */}
              <div className="mt-10 pt-8 border-t border-white/5 text-left max-w-xl mx-auto">
                <p className="font-body text-sm text-white/40 italic">
                  <strong className="text-white/60 not-italic">P.S.</strong> — En plus de ton programme tout-en-un, tu reçois 30 jours gratuits à la communauté ADM (valeur de 70$). Après ton achat, on te présentera une offre exclusive pour verrouiller le tarif fondateur à vie.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="py-6 border-t border-white/5">
        <div className="container text-center">
          <p className="font-body text-xs text-white/20">
            © 2024 Club ADM Fitness. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
