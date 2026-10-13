/**
 * PAGE 1 — QUIZ "TROUVE TON PROGRAMME"
 * Flow: Quiz multi-étapes épuré avec barre de progression
 * Capture: prénom + courriel + objectif + niveau d'activité + défi
 * Après soumission → redirige vers /resultat avec les données
 * Le guide gratuit de 21 pages est envoyé par courriel (GoHighLevel)
 * Style: Sell Like Crazy — HVCO déguisé en quiz interactif
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "@/online/lib/navigation.tsx";
import {
  ArrowRight, ArrowLeft, Target, Heart,
  Zap, Scale, Clock, Dumbbell, User, Mail, Play, Quote
} from "lucide-react";

const LOGO_URL = "/manus-storage/logo_clubadm_b62ebfde_7873f580.png";
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/2RxvNFK4C99d4EGkajeXvG/hero-nutrition-jiNTMpKHJCcvf3SxFGKUGe.webp";
const HERO_VIDEO_URL: string | null = null;
const TESTIMONIALS = [
  {
    name: "Marie-Antoinette",
    video: "/manus-storage/MAtestimonialFINALFINAL_h264_982d2c8f_3a5c5f3e.mp4",
    poster: "/manus-storage/temoignage-ma-thumbnail-original_63bb092b.jpg",
  },
  {
    name: "Fares",
    video: "/manus-storage/FAREStestimonialFINALFINAL_h264_353a3123_2b6c06f1.mp4",
    poster: "/manus-storage/temoignage-fares-thumbnail-original_cf23c0f4.jpg",
  },
  {
    name: "Anne",
    video: "/manus-storage/AnnetestimonialFINALFINAL_h264_447e6606_fdd3fa05.mp4",
    poster: "/manus-storage/temoignage-anne-thumbnail-original_7a66f626.jpg",
  },
] as const;

interface QuizData {
  objectif: string;
  activite: string;
  defi: string;
  prenom: string;
  courriel: string;
}

const STEPS = [
  { id: "objectif", question: "Quel est ton objectif principal?", subtitle: "Choisis celui qui te parle le plus." },
  { id: "activite", question: "Quel est ton niveau d'activité actuel?", subtitle: "Sois honnête — on part de là où t'es." },
  { id: "defi", question: "C'est quoi ton plus grand défi en ce moment?", subtitle: "Ce qui t'empêche d'avancer." },
  { id: "info", question: "Où est-ce qu'on t'envoie ton résultat?", subtitle: "Découvre ton orientation; l’envoi du guide par courriel n’est pas encore activé dans cet aperçu." },
];

const OBJECTIFS = [
  { id: "perte-poids", label: "Perdre du poids", desc: "De façon soutenable, sans régime restrictif", icon: <Scale size={24} /> },
  { id: "sante-longevite", label: "Améliorer ma santé & longévité", desc: "Énergie, sommeil, prévention, vieillir en forme", icon: <Heart size={24} /> },
  { id: "performance", label: "Performer & me dépasser", desc: "Plus fort, plus endurant, meilleure composition corporelle", icon: <Zap size={24} /> },
  { id: "structure", label: "Avoir un plan structuré", desc: "Arrêter d'improviser, avoir un système clair", icon: <Target size={24} /> },
];

const ACTIVITES = [
  { id: "sedentaire", label: "Sédentaire", desc: "Bureau, peu de mouvement au quotidien", icon: <Clock size={24} /> },
  { id: "leger", label: "Légèrement actif", desc: "1-2 entraînements par semaine", icon: <Dumbbell size={24} /> },
  { id: "actif", label: "Actif", desc: "3-4 entraînements par semaine", icon: <Dumbbell size={24} /> },
  { id: "tres-actif", label: "Très actif", desc: "5+ entraînements par semaine", icon: <Zap size={24} /> },
];

const DEFIS = [
  { id: "constance", label: "La constance", desc: "Je commence mais j'abandonne après quelques semaines" },
  { id: "nutrition", label: "Savoir quoi manger", desc: "Trop d'info contradictoire, je sais plus quoi faire" },
  { id: "temps", label: "Le manque de temps", desc: "Entre le travail et la famille, j'ai pas le temps" },
  { id: "motivation", label: "La motivation", desc: "Je sais quoi faire mais je le fais pas" },
  { id: "resultats", label: "Pas de résultats", desc: "Je fais des efforts mais rien ne change" },
];

export default function OptInPage() {
  const [step, setStep] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [data, setData] = useState<QuizData>({
    objectif: "",
    activite: "",
    defi: "",
    prenom: "",
    courriel: "",
  });
  const [, navigate] = useLocation();

  const progress = ((step + 1) / STEPS.length) * 100;

  const canAdvance = () => {
    if (step === 0) return data.objectif !== "";
    if (step === 1) return data.activite !== "";
    if (step === 2) return data.defi !== "";
    if (step === 3) return data.prenom.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.courriel.trim());
    return false;
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      // Soumettre le quiz et rediriger vers /resultat
      const params = new URLSearchParams({
        objectif: data.objectif,
        activite: data.activite,
        defi: data.defi,
        prenom: data.prenom,
        courriel: data.courriel,
      });
      navigate(`/online-project/resultat?${params.toString()}`);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const selectOption = (field: keyof QuizData, value: string) => {
    setData({ ...data, [field]: value });
    // Auto-advance après sélection (sauf dernière étape)
    if (step < STEPS.length - 1) {
      setTimeout(() => setStep(step + 1), 350);
    }
  };

  return (
    <div className="min-h-screen bg-online-navy relative overflow-hidden">
      {/* Background image subtle */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-online-navy/80 via-online-navy/95 to-online-navy" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header minimal */}
        <header className="py-6 px-4">
          <div className="container flex items-center justify-center">
            <img
              src={LOGO_URL}
              alt="Club ADM"
              className="h-12 w-12 object-contain brightness-0 invert"
            />
          </div>
        </header>

        {showIntro ? (
          /* ===== INTRO : Titre + Vidéo ===== */
          <div className="flex-1 px-4 pt-8 pb-16">
            <div className="container max-w-6xl w-full">
              <div className="grid lg:grid-cols-[0.82fr_1.18fr] items-center gap-10 lg:gap-14 min-h-[540px]">
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-left"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="h-px w-10 bg-online-cta-red" />
                    <span className="font-display text-xs font-bold text-online-cta-red uppercase tracking-[0.22em]">
                      Programme ADM tout-en-un
                    </span>
                  </div>
                  <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.96] mb-6">
                    T'ES TANNÉ DE <span className="text-online-cta-red">STAGNER?</span>
                  </h1>
                  <p className="font-body text-lg sm:text-xl text-white/60 mb-8 max-w-md leading-relaxed">
                    Découvre le programme qui réunit entraînement, nutrition et habitudes de vie pour avancer sans tout recommencer.
                  </p>
                  <button
                    onClick={() => setShowIntro(false)}
                    className="inline-flex items-center gap-3 bg-online-cta-red hover:bg-red-700 text-white font-display text-lg font-bold uppercase tracking-wider px-9 py-5 transition-all hover:-translate-y-0.5 shadow-[0_0_40px_rgba(230,57,70,0.22)]"
                  >
                    Trouve ton programme
                    <ArrowRight size={20} />
                  </button>
                  <p className="font-body text-xs text-white/30 mt-4">
                    Quiz gratuit — environ 60 secondes
                  </p>
                </motion.div>

                {/* Espace vidéo explicative */}
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="relative"
                >
                  <div className="absolute -inset-6 bg-online-cta-red/10 blur-3xl" />
                  <div className="relative w-full aspect-video bg-[#07111d] border border-white/15 overflow-hidden shadow-2xl shadow-black/40">
                    <div className="absolute top-0 left-0 h-1 w-24 bg-online-cta-red z-20" />
                    {HERO_VIDEO_URL ? (
                      <video
                        className="absolute inset-0 w-full h-full object-cover"
                        src={HERO_VIDEO_URL}
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                      >
                        Ton navigateur ne peut pas lire cette vidéo.
                      </video>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-online-navy/55">
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-full bg-online-cta-red/20 border-2 border-online-cta-red flex items-center justify-center mx-auto mb-3 shadow-[0_0_30px_rgba(230,57,70,0.25)]">
                            <Play className="w-6 h-6 text-online-cta-red ml-0.5" fill="currentColor" />
                          </div>
                          <p className="font-display text-xs font-bold uppercase tracking-widest text-white/55">Vidéo explicative du programme</p>
                          <p className="font-body text-[11px] text-white/25 mt-1">Emplacement prêt pour ton fichier vidéo</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="hidden lg:block absolute -bottom-5 -left-5 w-20 h-12 border-l-2 border-b-2 border-online-cta-red/70" />
                </motion.div>
              </div>

              {/* Témoignages vidéo */}
              <motion.section
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                aria-labelledby="temoignages-title"
                className="mt-10 lg:mt-16 pt-12 lg:pt-16 border-t border-white/10"
              >
                <div className="grid lg:grid-cols-[0.55fr_1.45fr] gap-10 lg:gap-14 items-start">
                  <div className="text-left lg:sticky lg:top-8">
                    <div className="inline-flex items-center gap-2 text-online-cta-red font-display text-xs font-bold uppercase tracking-[0.2em] mb-4">
                      <Quote size={15} />
                      Expériences ADM
                    </div>
                    <h2 id="temoignages-title" className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                      De vraies voix. De vrais parcours.
                    </h2>
                    <p className="font-body text-base text-white/45 leading-relaxed">
                      Avant de choisir ton programme, écoute ceux qui ont décidé de bâtir quelque chose de soutenable.
                    </p>
                    <div className="flex gap-1.5 mt-8" aria-hidden="true">
                      <span className="w-12 h-1 bg-online-cta-red -skew-x-12" />
                      <span className="w-5 h-1 bg-white/20 -skew-x-12" />
                      <span className="w-5 h-1 bg-white/10 -skew-x-12" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4 text-left">
                    {TESTIMONIALS.map((testimonial) => (
                      <article
                        key={testimonial.video}
                        className="relative bg-white/[0.06] border border-white/15 overflow-hidden shadow-xl shadow-black/20"
                      >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-online-cta-red z-20" />
                        <div className="relative aspect-[9/16] bg-black">
                          <video
                            className="w-full h-full object-cover"
                            controls
                            playsInline
                            preload="metadata"
                            poster={testimonial.poster}
                            aria-label={`Témoignage vidéo de ${testimonial.name}`}
                          >
                            <source src={testimonial.video} type="video/mp4" />
                            Ton navigateur ne peut pas lire cette vidéo.
                          </video>
                        </div>
                        <div className="p-5 bg-gradient-to-b from-white/[0.07] to-transparent">
                          <p className="font-display text-base font-bold text-white uppercase tracking-wide">{testimonial.name}</p>
                          <p className="font-body text-xs text-white/40 mt-1">Expérience membre • Club ADM</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </motion.section>
            </div>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="px-4">
              <div className="container max-w-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-xs text-white/30 uppercase tracking-wider">
                    Étape {step + 1} de {STEPS.length}
                  </span>
                  <span className="font-body text-xs text-white/30">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-online-cta-red rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

        {/* Quiz content */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="container max-w-2xl w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                {/* Question */}
                <div className="text-center mb-10">
                  <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                    {STEPS[step].question}
                  </h1>
                  <p className="font-body text-base sm:text-lg text-white/50">
                    {STEPS[step].subtitle}
                  </p>
                </div>

                {/* Options - Step 0: Objectif */}
                {step === 0 && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {OBJECTIFS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => selectOption("objectif", opt.id)}
                        className={`text-left p-5 rounded-xl border-2 transition-all duration-200 group ${
                          data.objectif === opt.id
                            ? "bg-online-cta-red/10 border-online-cta-red"
                            : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8"
                        }`}
                      >
                        <div className={`mb-3 ${data.objectif === opt.id ? "text-online-cta-red" : "text-white/40 group-hover:text-white/60"}`}>
                          {opt.icon}
                        </div>
                        <h3 className="font-display text-base font-bold text-white mb-1">
                          {opt.label}
                        </h3>
                        <p className="font-body text-sm text-white/40">
                          {opt.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                )}

                {/* Options - Step 1: Activité */}
                {step === 1 && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {ACTIVITES.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => selectOption("activite", opt.id)}
                        className={`text-left p-5 rounded-xl border-2 transition-all duration-200 group ${
                          data.activite === opt.id
                            ? "bg-online-cta-red/10 border-online-cta-red"
                            : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8"
                        }`}
                      >
                        <div className={`mb-3 ${data.activite === opt.id ? "text-online-cta-red" : "text-white/40 group-hover:text-white/60"}`}>
                          {opt.icon}
                        </div>
                        <h3 className="font-display text-base font-bold text-white mb-1">
                          {opt.label}
                        </h3>
                        <p className="font-body text-sm text-white/40">
                          {opt.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                )}

                {/* Options - Step 2: Défi */}
                {step === 2 && (
                  <div className="space-y-3">
                    {DEFIS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => selectOption("defi", opt.id)}
                        className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                          data.defi === opt.id
                            ? "bg-online-cta-red/10 border-online-cta-red"
                            : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8"
                        }`}
                      >
                        <h3 className="font-display text-base font-bold text-white mb-0.5">
                          {opt.label}
                        </h3>
                        <p className="font-body text-sm text-white/40">
                          {opt.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 3: Info personnelle */}
                {step === 3 && (
                  <div className="max-w-md mx-auto space-y-5">
                    <div>
                      <label className="flex items-center gap-2 font-body text-sm text-white/50 mb-2">
                        <User size={14} /> Ton prénom
                      </label>
                      <input
                        type="text"
                        value={data.prenom}
                        onChange={(e) => setData({ ...data, prenom: e.target.value })}
                        placeholder="Ex: Marc"
                        className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-5 py-4 text-white font-body text-base placeholder:text-white/20 focus:border-online-cta-red focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 font-body text-sm text-white/50 mb-2">
                        <Mail size={14} /> Ton courriel
                      </label>
                      <input
                        type="email"
                        value={data.courriel}
                        onChange={(e) => setData({ ...data, courriel: e.target.value })}
                        placeholder="marc@exemple.com"
                        className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-5 py-4 text-white font-body text-base placeholder:text-white/20 focus:border-online-cta-red focus:outline-none transition-all"
                      />
                    </div>
                    <p className="font-body text-xs text-white/30 text-center pt-2">
                      Aperçu : ton résultat s’affiche à l’écran. L’envoi du guide par courriel n’est pas encore branché. Aucun courriel n’est envoyé ici.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="px-4 pb-8">
          <div className="container max-w-2xl flex items-center justify-between">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 font-body text-sm text-white/40 hover:text-white/60 transition-all ${
                step === 0 ? "invisible" : ""
              }`}
            >
              <ArrowLeft size={16} /> Retour
            </button>

            {/* Next / Submit button — visible on step 3 always, or on other steps when selected */}
            {(step === 3 || canAdvance()) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleNext}
                disabled={!canAdvance()}
                className={`flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-lg transition-all duration-300 ${
                  canAdvance()
                    ? "bg-online-cta-red hover:bg-online-cta-red-hover text-white cta-pulse"
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                }`}
              >
                {step === STEPS.length - 1 ? "Voir mon résultat" : "Continuer"}
                <ArrowRight size={16} />
              </motion.button>
            )}
          </div>
        </div>

        {/* Trust badges */}
        <div className="px-4 pb-6">
         <div className="container max-w-2xl flex items-center justify-center gap-6 text-white/20 text-xs font-body">
            <span className="flex items-center gap-1">🔒 100% confidentiel</span>
            <span className="flex items-center gap-1">🎁 Guide gratuit inclus</span>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
}
