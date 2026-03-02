/*
 * PAGE PROGRAMMATION EN LIGNE — Club ADM Fitness
 * Design lumineux, fond blanc dominant, inspiré Mayhem Nation
 * Structure: Hero → Pourquoi → Programmes → Ce que tu reçois → Sample → FAQ → CTA
 * Couleurs: navy #232862, rouge #ed1c24, blanc, cream
 */
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Dumbbell,
  Zap,
  Heart,
  UserCheck,
  Apple,
  Crown,
  Check,
  Play,
  Smartphone,
  Calendar,
  Users,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── IMAGES ─── */
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/online-hero-KJ6UgbpPd5kHrcWLqGTUP6.webp";
const IMG_TRANSFORMATION = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/program-transformation-KPWqKMDt4NAx8Jes63stZY.webp";
const IMG_PERFORMANCE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/program-performance-JTmDUmBet9vDmHTBJrLSid.webp";
const IMG_WELLNESS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/program-wellness-6udJtNAeYaSkQms7H2b8z3.webp";
const IMG_NUTRITION = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/services-nutrition-K5UKGcDj5XeCc7XxTrte8A.webp";
const IMG_PERSONAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/services-personal-BYp3GeFtEb4bmCtZ2dxU7P.webp";

/* ─── DATA ─── */
const PROGRAMS = [
  {
    id: "transformation",
    title: "Transformation",
    subtitle: "Programme 90 jours",
    description: "Un programme complet de 90 jours conçu pour transformer ton physique et tes habitudes. Entraînements progressifs, plan nutritionnel et suivi hebdomadaire pour des résultats visibles et durables.",
    audience: "Débutants & perte de poids",
    duration: "30-45 min / jour",
    equipment: "Minimal (haltères, bandes)",
    price: "39",
    period: "/mois",
    image: IMG_TRANSFORMATION,
    icon: Dumbbell,
    color: "#ed1c24",
    features: [
      "Programmation quotidienne sur 90 jours",
      "Vidéos démonstratives de chaque mouvement",
      "Plan nutritionnel personnalisé inclus",
      "Suivi de progression hebdomadaire",
      "Accès à la communauté privée",
      "Support par messagerie avec un coach",
    ],
  },
  {
    id: "performance",
    title: "Performance",
    subtitle: "Programmation fonctionnelle",
    description: "La programmation utilisée dans nos gyms, maintenant accessible de partout. Force, conditionnement, gymnastique et haltérophilie dans un programme structuré par cycles.",
    audience: "Intermédiaires & avancés",
    duration: "60-75 min / jour",
    equipment: "Gym complet ou garage gym",
    price: "49",
    period: "/mois",
    image: IMG_PERFORMANCE,
    icon: Zap,
    color: "#232862",
    popular: true,
    features: [
      "5-6 séances par semaine structurées",
      "Cycles de force et conditionnement",
      "Haltérophilie et gymnastique intégrées",
      "Warm-up et cool-down détaillés",
      "Vidéos et notes de coaching",
      "Leaderboard et suivi de performance",
    ],
  },
  {
    id: "wellness",
    title: "Bien-être 40+",
    subtitle: "Vitalité & longévité",
    description: "Un programme adapté pour les adultes de 40 ans et plus qui veulent rester actifs, mobiles et en forme. Mobilité, force fonctionnelle et récupération au cœur de chaque séance.",
    audience: "Adultes 40 ans et plus",
    duration: "30-45 min / jour",
    equipment: "Minimal (haltères, bandes, tapis)",
    price: "29",
    period: "/mois",
    image: IMG_WELLNESS,
    icon: Heart,
    color: "#4a90a4",
    features: [
      "4-5 séances par semaine adaptées",
      "Focus mobilité et prévention des blessures",
      "Exercices de force fonctionnelle",
      "Routines de récupération guidées",
      "Progressions sécuritaires",
      "Communauté de soutien dédiée",
    ],
  },
  {
    id: "coaching",
    title: "Coaching Personnalisé",
    subtitle: "Suivi individuel",
    description: "Un coach dédié qui conçoit ta programmation sur mesure, ajuste selon tes retours et t'accompagne vers tes objectifs spécifiques. Le niveau de service le plus élevé.",
    audience: "Tous niveaux, objectifs précis",
    duration: "Personnalisé",
    equipment: "Selon tes disponibilités",
    price: "199",
    period: "/mois",
    image: IMG_PERSONAL,
    icon: UserCheck,
    color: "#232862",
    features: [
      "Programmation 100% sur mesure",
      "Appel vidéo hebdomadaire avec ton coach",
      "Ajustements en temps réel",
      "Plan nutritionnel personnalisé",
      "Analyse vidéo de tes mouvements",
      "Accès prioritaire à tous les programmes",
    ],
  },
  {
    id: "nutrition",
    title: "Plans Nutritionnels",
    subtitle: "Coaching alimentaire",
    description: "Des plans alimentaires conçus par nos spécialistes en nutrition sportive. Adaptés à ton mode de vie, tes objectifs et tes préférences alimentaires.",
    audience: "Tous les publics",
    duration: "Suivi continu",
    equipment: "Aucun",
    price: "29",
    period: "/mois",
    image: IMG_NUTRITION,
    icon: Apple,
    color: "#2d8a4e",
    features: [
      "Plan alimentaire personnalisé",
      "Recettes et listes d'épicerie",
      "Suivi des macros simplifié",
      "Ajustements mensuels",
      "Guide de supplémentation",
      "Support par messagerie",
    ],
  },
  {
    id: "allaccess",
    title: "All Access",
    subtitle: "Tout inclus",
    description: "L'accès complet à tout l'écosystème Club ADM en ligne. Tous les programmes, la nutrition, la communauté et le support prioritaire réunis dans un seul abonnement.",
    audience: "Membres engagés",
    duration: "Illimité",
    equipment: "Selon le programme choisi",
    price: "79",
    period: "/mois",
    image: IMG_TRANSFORMATION,
    icon: Crown,
    color: "#ed1c24",
    features: [
      "Accès à TOUS les programmes",
      "Plans nutritionnels inclus",
      "Communauté VIP privée",
      "Challenges exclusifs mensuels",
      "Webinaires live avec les coachs",
      "Réductions sur le coaching personnalisé",
    ],
  },
];

const WHAT_YOU_GET = [
  { icon: Play, title: "Vidéos HD", desc: "Démonstrations détaillées de chaque mouvement avec coaching vocal" },
  { icon: Calendar, title: "Programmation quotidienne", desc: "Nouveaux entraînements chaque jour, structurés en cycles progressifs" },
  { icon: Smartphone, title: "Accessible partout", desc: "Entraîne-toi depuis ton téléphone, tablette ou ordinateur" },
  { icon: Users, title: "Communauté", desc: "Rejoins des centaines de membres qui s'entraînent ensemble" },
  { icon: MessageCircle, title: "Support coach", desc: "Pose tes questions et reçois des réponses de nos coachs certifiés" },
  { icon: Dumbbell, title: "Progressions", desc: "Suivi de tes performances et progressions au fil du temps" },
];

const SAMPLE_WEEK = [
  {
    day: "Lundi",
    title: "Force + Conditionnement",
    blocks: [
      { name: "Échauffement", detail: "10 min mobilité articulaire + activation musculaire (hip halo, bandes)" },
      { name: "Force", detail: "Back Squat — 5×5 @75-80% 1RM, repos 2:30 entre les séries" },
      { name: "WOD", detail: "3 rounds: 15 Wall Balls (20/14), 12 Toes-to-Bar, 400m Run" },
      { name: "Accessoire", detail: "3×12 Romanian Deadlift + 3×15 GHD Sit-ups" },
    ],
  },
  {
    day: "Mardi",
    title: "Haltérophilie + Métcon",
    blocks: [
      { name: "Échauffement", detail: "Burgener Warm-up + Skill Transfer (Snatch)" },
      { name: "Technique", detail: "Snatch — 3+3+2+2+1+1 (build to 80-85%)" },
      { name: "WOD", detail: "AMRAP 12 min: 6 Power Snatch (95/65), 12 Box Jump Over (24/20), 18 Cal Row" },
      { name: "Cool-down", detail: "5 min cardio léger + étirements ciblés épaules et hanches" },
    ],
  },
  {
    day: "Mercredi",
    title: "Gymnastique + Endurance",
    blocks: [
      { name: "Échauffement", detail: "3 rounds: 200m Jog, 10 Air Squats, 5 Inch Worms, 10 Ring Rows" },
      { name: "Skill", detail: "EMOM 10 min: Min 1 — 3-5 Strict Pull-ups, Min 2 — 5-8 HSPU" },
      { name: "WOD", detail: "5 rounds: 20 Cal Bike, 15 Thrusters (95/65), 10 Chest-to-Bar Pull-ups" },
      { name: "Accessoire", detail: "3×20 Hollow Rocks + 3×30s L-Sit Hold" },
    ],
  },
  {
    day: "Jeudi",
    title: "Récupération active",
    blocks: [
      { name: "Mobilité", detail: "20 min flow: hanches, épaules, thoracique, chevilles" },
      { name: "Cardio léger", detail: "30 min Zone 2: vélo, rameur ou marche rapide" },
      { name: "Accessoire", detail: "3×15 Banded Pull-aparts + 3×12 Face Pulls + 3×20 Calf Raises" },
      { name: "Étirements", detail: "15 min stretching global — focus sur les zones tendues" },
    ],
  },
  {
    day: "Vendredi",
    title: "Force + Compétition",
    blocks: [
      { name: "Échauffement", detail: "Barbell complex: 5 Deadlift + 5 Hang Clean + 5 Front Squat + 5 Push Press" },
      { name: "Force", detail: "Deadlift — 5-3-3-1-1-1 (build to heavy single)" },
      { name: "WOD", detail: "For Time: 21-15-9 Deadlift (225/155) + Handstand Push-ups" },
      { name: "Finisher", detail: "3 rounds: 30s Max Cal Assault Bike + 30s Rest" },
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "À qui s'adressent les programmes en ligne ?",
    a: "Nos programmes s'adressent à tous les niveaux, du débutant complet à l'athlète avancé. Chaque programme est conçu pour un public spécifique avec des progressions adaptées. Si tu es capable de t'entraîner de manière autonome avec des instructions claires, nos programmes sont faits pour toi.",
  },
  {
    q: "De quel équipement ai-je besoin ?",
    a: "Cela dépend du programme choisi. Le programme Transformation nécessite un équipement minimal (haltères et bandes élastiques). Le programme Performance requiert un gym complet ou un garage gym bien équipé (barre, bumpers, rack, rameur, etc.). Le programme Bien-être 40+ fonctionne avec un équipement minimal.",
  },
  {
    q: "Comment accéder aux entraînements ?",
    a: "Après ton inscription, tu recevras un accès à notre plateforme en ligne accessible depuis ton téléphone, tablette ou ordinateur. Les entraînements sont publiés quotidiennement avec des vidéos démonstratives, des notes de coaching et un suivi de progression.",
  },
  {
    q: "Puis-je changer de programme ?",
    a: "Absolument. Tu peux changer de programme à tout moment. Si tu as l'abonnement All Access, tu as accès à tous les programmes simultanément et tu peux alterner selon tes envies et tes objectifs.",
  },
  {
    q: "Y a-t-il un engagement minimum ?",
    a: "Non. Tous nos abonnements sont mensuels et sans engagement. Tu peux annuler à tout moment. Nous offrons également des forfaits trimestriels et annuels avec des réductions de 15 à 20%.",
  },
  {
    q: "Le coaching nutritionnel est-il inclus ?",
    a: "Le plan nutritionnel est inclus dans les programmes Transformation, Coaching Personnalisé et All Access. Pour les autres programmes, tu peux l'ajouter séparément pour 29$/mois.",
  },
  {
    q: "Comment fonctionne le coaching personnalisé ?",
    a: "Avec le coaching personnalisé, un coach dédié conçoit ta programmation sur mesure en fonction de tes objectifs, ton niveau et ton équipement. Tu as un appel vidéo hebdomadaire, un suivi quotidien par messagerie et des ajustements en temps réel.",
  },
];

/* ─── COMPONENTS ─── */

function ProgramCard({ program, index }: { program: typeof PROGRAMS[0]; index: number }) {
  const Icon = program.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative bg-white border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500"
    >
      {program.popular && (
        <div className="absolute top-4 right-4 z-10 bg-adm-red text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
          Populaire
        </div>
      )}

      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-5">
          <div className="flex items-center gap-2 mb-1">
            <Icon size={16} className="text-white" />
            <span className="text-white/70 text-xs font-semibold uppercase tracking-wider">{program.subtitle}</span>
          </div>
          <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            {program.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-navy/60 text-sm leading-relaxed mb-4">
          {program.description}
        </p>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="bg-cream px-3 py-2">
            <span className="text-navy/40 block">Public</span>
            <span className="text-navy font-semibold">{program.audience}</span>
          </div>
          <div className="bg-cream px-3 py-2">
            <span className="text-navy/40 block">Durée</span>
            <span className="text-navy font-semibold">{program.duration}</span>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-5">
          {program.features.slice(0, 4).map((f, i) => (
            <div key={i} className="flex items-start gap-2">
              <Check size={14} className="text-adm-red mt-0.5 flex-shrink-0" />
              <span className="text-navy/70 text-xs">{f}</span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-end justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-3xl font-bold text-navy" style={{ fontFamily: "var(--font-display)" }}>
              {program.price}$
            </span>
            <span className="text-navy/40 text-sm">{program.period}</span>
          </div>
          <a
            href="https://clubadm.com/contact-us/"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-adm-red text-white text-xs font-bold uppercase tracking-wider hover:bg-adm-red-hover transition-colors"
          >
            Commencer
            <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function FAQItem({ item, isOpen, onToggle }: { item: typeof FAQ_ITEMS[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-navy font-semibold text-[15px] pr-4 group-hover:text-adm-red transition-colors">
          {item.q}
        </span>
        <ChevronDown
          size={18}
          className={`text-navy/30 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-adm-red" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-navy/60 text-sm leading-relaxed">
          {item.a}
        </p>
      </motion.div>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function OnlinePrograms() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Entraînement en ligne Club ADM"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative h-full max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-white/70 text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Programmation en ligne
            </span>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ENTRAÎNE-TOI
              <br />
              <span style={{ color: "#ed1c24" }}>DE PARTOUT</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-lg mb-8 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              L'expertise de nos coachs, accessible où que tu sois. Des programmes structurés pour tous les niveaux et tous les objectifs.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#programmes"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-adm-red text-white text-sm font-bold uppercase tracking-wider hover:bg-adm-red-hover transition-colors"
              >
                Voir les programmes
                <ArrowRight size={16} />
              </a>
              <a
                href="https://clubadm.com/contact-us/"
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white text-white text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-navy transition-colors"
              >
                Consultation gratuite
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ POURQUOI S'ENTRAÎNER EN LIGNE ═══ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-adm-red text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
              Pourquoi en ligne
            </span>
            <h2
              className="text-4xl md:text-5xl text-navy mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              CE QUE TU REÇOIS
            </h2>
            <p className="text-navy/50 leading-relaxed">
              Chaque programme inclut tout ce dont tu as besoin pour progresser de manière autonome, avec le support de nos coachs certifiés.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHAT_YOU_GET.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-4 p-5 bg-cream/50 hover:bg-cream transition-colors"
                >
                  <div className="w-10 h-10 bg-adm-red/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-adm-red" />
                  </div>
                  <div>
                    <h3 className="text-navy font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-navy/50 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ PROGRAMMES ═══ */}
      <section id="programmes" className="py-20 lg:py-28 bg-cream/40">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-adm-red text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
              Nos programmes
            </span>
            <h2
              className="text-4xl md:text-5xl text-navy mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              TROUVE TON PROGRAMME
            </h2>
            <p className="text-navy/50 leading-relaxed">
              Que tu veuilles perdre du poids, gagner en performance ou simplement rester actif, nous avons le programme qu'il te faut.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((program, i) => (
              <ProgramCard key={program.id} program={program} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SAMPLE PROGRAMMING ═══ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="text-adm-red text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
              Aperçu
            </span>
            <h2
              className="text-4xl md:text-5xl text-navy mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              EXEMPLE DE SEMAINE
            </h2>
            <p className="text-navy/50 leading-relaxed">
              Voici un aperçu d'une semaine type du programme Performance. Chaque jour est structuré pour maximiser tes résultats.
            </p>
          </motion.div>

          {/* Day tabs */}
          <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
            {SAMPLE_WEEK.map((day, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className={`px-5 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  activeDay === i
                    ? "bg-navy text-white"
                    : "bg-cream text-navy/50 hover:text-navy hover:bg-cream"
                }`}
              >
                {day.day}
              </button>
            ))}
          </div>

          {/* Active day content */}
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-cream/50 p-6 lg:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-adm-red" />
              <div>
                <span className="text-navy/40 text-xs font-semibold uppercase tracking-wider">{SAMPLE_WEEK[activeDay].day}</span>
                <h3 className="text-navy text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  {SAMPLE_WEEK[activeDay].title}
                </h3>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {SAMPLE_WEEK[activeDay].blocks.map((block, i) => (
                <div key={i} className="bg-white p-4 border-l-2 border-adm-red/20">
                  <span className="text-adm-red text-[10px] font-bold uppercase tracking-widest">{block.name}</span>
                  <p className="text-navy/70 text-sm mt-1 leading-relaxed">{block.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 lg:py-28 bg-cream/40">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-adm-red text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
              Questions fréquentes
            </span>
            <h2
              className="text-4xl md:text-5xl text-navy"
              style={{ fontFamily: "var(--font-display)" }}
            >
              FAQ
            </h2>
          </motion.div>

          <div>
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section className="relative py-20 lg:py-24 overflow-hidden" style={{ backgroundColor: "#ed1c24" }}>
        <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl lg:text-6xl text-white mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              PRÊT À COMMENCER ?
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Réserve ta consultation gratuite avec un de nos coachs. On t'aidera à choisir le programme parfait pour tes objectifs.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://clubadm.com/contact-us/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-adm-red text-sm font-bold uppercase tracking-wider hover:bg-cream transition-colors"
              >
                Consultation gratuite
                <ArrowRight size={16} />
              </a>
              <a
                href="#programmes"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                Voir les programmes
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
