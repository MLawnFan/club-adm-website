/*
 * PAGE PROGRAMMATION EN LIGNE — Club ADM Fitness — Dark premium
 * Fond navy sombre, cartes sombres, texte blanc/crème
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, Dumbbell, Zap, Heart, UserCheck, Apple, Crown,
  Check, Play, Smartphone, Calendar, Users, MessageCircle,
  ArrowRight, X, Star, Quote,
} from "lucide-react";
import PromoBanner from "@/components/PromoBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── IMAGES ─── */
const HERO_IMG = "/manus-storage/fb-deadlift-woman_58b054bf.jpeg";
const IMG_TRANSFORMATION = "/manus-storage/fb-group-100-milestone_a422922c.jpeg";
const IMG_PERFORMANCE = "/manus-storage/fb-deadlift-woman_58b054bf.jpeg";
const IMG_WELLNESS = "/manus-storage/fb-mother-daughter-gym_0778968a.jpeg";
const IMG_NUTRITION = "/manus-storage/fb-group-class-action_5685642b.jpeg";
const IMG_PERSONAL = "/manus-storage/fb-group-350-milestone_eea572f0.jpeg";
const IMG_TESTIMONIAL_1 = "/manus-storage/fb-mother-daughter-gym_0778968a.jpeg";
const IMG_TESTIMONIAL_2 = "/manus-storage/fb-group-350-milestone_eea572f0.jpeg";
const IMG_TESTIMONIAL_3 = "/manus-storage/fb-group-100-milestone_a422922c.jpeg";

const TESTIMONIALS = [
  { name: "Marie-Ève L.", program: "Programme Transformation", duration: "Membre depuis 6 mois", quote: "Je n'aurais jamais cru pouvoir m'entraîner aussi efficacement de chez moi. Les vidéos sont claires, le suivi est incroyable et j'ai perdu 18 lbs en 90 jours. Le support des coachs fait toute la différence.", rating: 5, image: IMG_TESTIMONIAL_1, videoId: "placeholder", result: "-18 lbs en 90 jours" },
  { name: "Patrick D.", program: "Programme Performance", duration: "Membre depuis 1 an", quote: "Après 15 ans d'entraînement, je pensais avoir tout essayé. La programmation Club ADM m'a permis d'atteindre un nouveau PR au back squat et d'améliorer mon Fran de 45 secondes. C'est du sérieux.", rating: 5, image: IMG_TESTIMONIAL_2, videoId: "placeholder", result: "PR Back Squat +30 lbs" },
  { name: "Alex & Camille B.", program: "All Access", duration: "Membres depuis 8 mois", quote: "On s'entraîne ensemble à la maison avec le programme All Access. C'est devenu notre routine de couple. La variété des programmes fait qu'on ne s'ennuie jamais et la communauté en ligne est super motivante.", rating: 5, image: IMG_TESTIMONIAL_3, videoId: "placeholder", result: "Routine de couple transformée" },
];

const PROGRAMS = [
  { id: "transformation", title: "Transformation", subtitle: "Programme 90 jours", description: "Un programme complet de 90 jours conçu pour transformer ton physique et tes habitudes. Entraînements progressifs, plan nutritionnel et suivi hebdomadaire.", audience: "Débutants & perte de poids", duration: "30-45 min / jour", equipment: "Minimal (haltères, bandes)", price: "39", period: "/mois", image: IMG_TRANSFORMATION, icon: Dumbbell, color: "#ed1c24", features: ["Programmation quotidienne sur 90 jours", "Vidéos démonstratives de chaque mouvement", "Plan nutritionnel personnalisé inclus", "Suivi de progression hebdomadaire", "Accès à la communauté privée", "Support par messagerie avec un coach"] },
  { id: "performance", title: "Performance", subtitle: "Programmation fonctionnelle", description: "La programmation utilisée dans nos gyms, maintenant accessible de partout. Force, conditionnement, gymnastique et haltérophilie.", audience: "Intermédiaires & avancés", duration: "60-75 min / jour", equipment: "Gym complet ou garage gym", price: "49", period: "/mois", image: IMG_PERFORMANCE, icon: Zap, color: "#232862", popular: true, features: ["5-6 séances par semaine structurées", "Cycles de force et conditionnement", "Haltérophilie et gymnastique intégrées", "Warm-up et cool-down détaillés", "Vidéos et notes de coaching", "Leaderboard et suivi de performance"] },
  { id: "wellness", title: "Bien-être 40+", subtitle: "Vitalité & longévité", description: "Un programme adapté pour les adultes de 40 ans et plus. Mobilité, force fonctionnelle et récupération au cœur de chaque séance.", audience: "Adultes 40 ans et plus", duration: "30-45 min / jour", equipment: "Minimal (haltères, bandes, tapis)", price: "29", period: "/mois", image: IMG_WELLNESS, icon: Heart, color: "#4a90a4", features: ["4-5 séances par semaine adaptées", "Focus mobilité et prévention des blessures", "Exercices de force fonctionnelle", "Routines de récupération guidées", "Progressions sécuritaires", "Communauté de soutien dédiée"] },
  { id: "coaching", title: "Coaching Personnalisé", subtitle: "Suivi individuel", description: "Un coach dédié qui conçoit ta programmation sur mesure, ajuste selon tes retours et t'accompagne vers tes objectifs spécifiques.", audience: "Tous niveaux, objectifs précis", duration: "Personnalisé", equipment: "Selon tes disponibilités", price: "199", period: "/mois", image: IMG_PERSONAL, icon: UserCheck, color: "#232862", features: ["Programmation 100% sur mesure", "Appel vidéo hebdomadaire avec ton coach", "Ajustements en temps réel", "Plan nutritionnel personnalisé", "Analyse vidéo de tes mouvements", "Accès prioritaire à tous les programmes"] },
  { id: "nutrition", title: "Plans Nutritionnels", subtitle: "Coaching alimentaire", description: "Des plans alimentaires conçus par nos spécialistes en nutrition sportive. Adaptés à ton mode de vie et tes objectifs.", audience: "Tous les publics", duration: "Suivi continu", equipment: "Aucun", price: "29", period: "/mois", image: IMG_NUTRITION, icon: Apple, color: "#2d8a4e", features: ["Plan alimentaire personnalisé", "Recettes et listes d'épicerie", "Suivi des macros simplifié", "Ajustements mensuels", "Guide de supplémentation", "Support par messagerie"] },
  { id: "allaccess", title: "All Access", subtitle: "Tout inclus", description: "L'accès complet à tout l'écosystème Club ADM en ligne. Tous les programmes, la nutrition, la communauté et le support prioritaire.", audience: "Membres engagés", duration: "Illimité", equipment: "Selon le programme choisi", price: "79", period: "/mois", image: IMG_TRANSFORMATION, icon: Crown, color: "#ed1c24", features: ["Accès à TOUS les programmes", "Plans nutritionnels inclus", "Communauté VIP privée", "Challenges exclusifs mensuels", "Webinaires live avec les coachs", "Réductions sur le coaching personnalisé"] },
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
  { day: "Lundi", title: "Force + Conditionnement", blocks: [{ name: "Échauffement", detail: "10 min mobilité articulaire + activation musculaire" }, { name: "Force", detail: "Back Squat — 5×5 @75-80% 1RM, repos 2:30" }, { name: "WOD", detail: "3 rounds: 15 Wall Balls, 12 Toes-to-Bar, 400m Run" }, { name: "Accessoire", detail: "3×12 Romanian Deadlift + 3×15 GHD Sit-ups" }] },
  { day: "Mardi", title: "Haltérophilie + Métcon", blocks: [{ name: "Échauffement", detail: "Burgener Warm-up + Skill Transfer (Snatch)" }, { name: "Technique", detail: "Snatch — 3+3+2+2+1+1 (build to 80-85%)" }, { name: "WOD", detail: "AMRAP 12 min: 6 Power Snatch, 12 Box Jump Over, 18 Cal Row" }, { name: "Cool-down", detail: "5 min cardio léger + étirements ciblés" }] },
  { day: "Mercredi", title: "Gymnastique + Endurance", blocks: [{ name: "Échauffement", detail: "3 rounds: 200m Jog, 10 Air Squats, 5 Inch Worms" }, { name: "Skill", detail: "EMOM 10 min: Min 1 — 3-5 Strict Pull-ups, Min 2 — 5-8 HSPU" }, { name: "WOD", detail: "5 rounds: 20 Cal Bike, 15 Thrusters, 10 C2B Pull-ups" }, { name: "Accessoire", detail: "3×20 Hollow Rocks + 3×30s L-Sit Hold" }] },
  { day: "Jeudi", title: "Récupération active", blocks: [{ name: "Mobilité", detail: "20 min flow: hanches, épaules, thoracique, chevilles" }, { name: "Cardio léger", detail: "30 min Zone 2: vélo, rameur ou marche rapide" }, { name: "Accessoire", detail: "3×15 Banded Pull-aparts + 3×12 Face Pulls" }, { name: "Étirements", detail: "15 min stretching global" }] },
  { day: "Vendredi", title: "Force + Compétition", blocks: [{ name: "Échauffement", detail: "Barbell complex: 5 DL + 5 Hang Clean + 5 Front Squat + 5 Push Press" }, { name: "Force", detail: "Deadlift — 5-3-3-1-1-1 (build to heavy single)" }, { name: "WOD", detail: "For Time: 21-15-9 Deadlift (225/155) + HSPU" }, { name: "Finisher", detail: "3 rounds: 30s Max Cal Assault Bike + 30s Rest" }] },
];

const FAQ_ITEMS = [
  { q: "À qui s'adressent les programmes en ligne ?", a: "Nos programmes s'adressent à tous les niveaux, du débutant complet à l'athlète avancé. Chaque programme est conçu pour un public spécifique avec des progressions adaptées." },
  { q: "De quel équipement ai-je besoin ?", a: "Cela dépend du programme choisi. Le programme Transformation nécessite un équipement minimal (haltères et bandes). Le programme Performance requiert un gym complet ou un garage gym bien équipé." },
  { q: "Comment accéder aux entraînements ?", a: "Après ton inscription, tu recevras un accès à notre plateforme en ligne accessible depuis ton téléphone, tablette ou ordinateur. Les entraînements sont publiés quotidiennement." },
  { q: "Puis-je changer de programme ?", a: "Absolument. Tu peux changer de programme à tout moment. Si tu as l'abonnement All Access, tu as accès à tous les programmes simultanément." },
  { q: "Y a-t-il un engagement minimum ?", a: "Non. Tous nos abonnements sont mensuels et sans engagement. Tu peux annuler à tout moment. Nous offrons aussi des forfaits trimestriels et annuels avec réductions." },
  { q: "Le coaching nutritionnel est-il inclus ?", a: "Le plan nutritionnel est inclus dans les programmes Transformation, Coaching Personnalisé et All Access. Pour les autres, tu peux l'ajouter pour 29$/mois." },
  { q: "Comment fonctionne le coaching personnalisé ?", a: "Un coach dédié conçoit ta programmation sur mesure. Tu as un appel vidéo hebdomadaire, un suivi quotidien par messagerie et des ajustements en temps réel." },
];

/* ─── COMPONENTS ─── */
function ProgramCard({ program, index }: { program: typeof PROGRAMS[0]; index: number }) {
  const Icon = program.icon;
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
      style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
      {(program as any).popular && (
        <div className="absolute top-4 right-4 z-10 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded" style={{ backgroundColor: "#ed1c24" }}>Populaire</div>
      )}
      <div className="relative h-56 overflow-hidden">
        <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-5">
          <div className="flex items-center gap-2 mb-1">
            <Icon size={16} className="text-white" />
            <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">{program.subtitle}</span>
          </div>
          <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{program.title}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>{program.description}</p>
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="px-3 py-2 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
            <span className="block" style={{ color: "rgba(255,255,255,0.3)" }}>Public</span>
            <span className="text-white font-semibold">{program.audience}</span>
          </div>
          <div className="px-3 py-2 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
            <span className="block" style={{ color: "rgba(255,255,255,0.3)" }}>Durée</span>
            <span className="text-white font-semibold">{program.duration}</span>
          </div>
        </div>
        <div className="space-y-2 mb-5">
          {program.features.slice(0, 4).map((f, i) => (
            <div key={i} className="flex items-start gap-2">
              <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#ed1c24" }} />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{f}</span>
            </div>
          ))}
        </div>
        <div className="flex items-end justify-between pt-4 border-t border-white/[0.06]">
          <div>
            <span className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{program.price}$</span>
            <span className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>{program.period}</span>
          </div>
          <a href="/consultation-gratuite" className="inline-flex items-center gap-1.5 px-4 py-2.5 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all hover:shadow-lg hover:shadow-red-500/20" style={{ backgroundColor: "#ed1c24" }}>
            Commencer <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof TESTIMONIALS[0]; index: number }) {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: index * 0.15, duration: 0.5 }} className="group">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-5 cursor-pointer" onClick={() => setShowVideo(true)}>
          <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg" style={{ backgroundColor: "#ed1c24" }}>
              <Play size={24} className="text-white ml-1" fill="white" />
            </div>
          </div>
          <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg backdrop-blur-sm" style={{ backgroundColor: "rgba(255,255,255,0.9)" }}>
            <span className="font-bold text-xs" style={{ color: "#0f1229" }}>{testimonial.result}</span>
          </div>
        </div>
        <div>
          <div className="flex gap-0.5 mb-3">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} size={14} fill="#ed1c24" style={{ color: "#ed1c24" }} />
            ))}
          </div>
          <div className="relative mb-4">
            <Quote size={16} className="absolute -top-1 -left-1" style={{ color: "rgba(237,28,36,0.2)" }} />
            <p className="text-sm leading-relaxed pl-4" style={{ color: "rgba(255,255,255,0.5)" }}>{testimonial.quote}</p>
          </div>
          <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
            <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 object-cover rounded-full" />
            <div>
              <p className="text-white font-bold text-sm">{testimonial.name}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#ed1c24" }}>{testimonial.program}</p>
            </div>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {showVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowVideo(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-3xl rounded-xl overflow-hidden" style={{ backgroundColor: "#131636" }} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setShowVideo(false)} className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"><X size={28} /></button>
              <div className="aspect-video flex flex-col items-center justify-center text-white" style={{ backgroundColor: "#131636" }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: "#ed1c24" }}><Play size={32} className="text-white ml-1" fill="white" /></div>
                <p style={{ color: "rgba(255,255,255,0.5)" }} className="text-sm mb-1">Témoignage vidéo de</p>
                <p className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{testimonial.name}</p>
                <p className="text-xs font-semibold uppercase tracking-wider mt-1" style={{ color: "#ed1c24" }}>{testimonial.program}</p>
                <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.3)" }}>Intégrez vos vidéos YouTube ou Vimeo ici</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FAQItem({ item, isOpen, onToggle }: { item: typeof FAQ_ITEMS[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/[0.06]">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="text-white font-semibold text-[15px] pr-4 group-hover:text-red-400 transition-colors">{item.q}</span>
        <ChevronDown size={18} className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} style={{ color: isOpen ? "#ed1c24" : "rgba(255,255,255,0.3)" }} />
      </button>
      <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
        <p className="pb-5 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.a}</p>
      </motion.div>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function OnlinePrograms() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f1229" }}>
      <PromoBanner />
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden">
        <img src={HERO_IMG} alt="Entraînement en ligne Club ADM" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="relative h-full max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>Programmation en ligne</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-4" style={{ fontFamily: "var(--font-display)" }}>
              ENTRAÎNE-TOI<br /><span style={{ color: "#ed1c24" }}>DE PARTOUT</span>
            </h1>
            <p className="text-base md:text-lg max-w-lg mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)" }}>
              L'expertise de nos coachs, accessible où que tu sois. Des programmes structurés pour tous les niveaux et tous les objectifs.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#programmes" className="inline-flex items-center gap-2 px-7 py-3.5 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all hover:shadow-lg hover:shadow-red-500/20" style={{ backgroundColor: "#ed1c24" }}>
                Voir les programmes <ArrowRight size={16} />
              </a>
              <a href="/consultation-gratuite" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-white/10 transition-colors">
                Consultation gratuite
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CE QUE TU REÇOIS ═══ */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block" style={{ color: "#ed1c24" }}>Pourquoi en ligne</span>
            <h2 className="text-4xl md:text-5xl text-white mb-5" style={{ fontFamily: "var(--font-display)" }}>CE QUE TU REÇOIS</h2>
            <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>Chaque programme inclut tout ce dont tu as besoin pour progresser de manière autonome, avec le support de nos coachs certifiés.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHAT_YOU_GET.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ delay: i * 0.08 }}
                  className="flex gap-4 p-5 rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-colors" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(237,28,36,0.1)" }}>
                    <Icon size={18} style={{ color: "#ed1c24" }} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ PROGRAMMES ═══ */}
      <section id="programmes" className="py-20 lg:py-28" style={{ backgroundColor: "#0f1229" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block" style={{ color: "#ed1c24" }}>Nos programmes</span>
            <h2 className="text-4xl md:text-5xl text-white mb-5" style={{ fontFamily: "var(--font-display)" }}>TROUVE TON PROGRAMME</h2>
            <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>Que tu veuilles perdre du poids, gagner en performance ou simplement rester actif, nous avons le programme qu'il te faut.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((program, i) => (<ProgramCard key={program.id} program={program} index={i} />))}
          </div>
        </div>
      </section>

      {/* ═══ TÉMOIGNAGES VIDÉO ═══ */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block" style={{ color: "#ed1c24" }}>Témoignages</span>
            <h2 className="text-4xl md:text-5xl text-white mb-5" style={{ fontFamily: "var(--font-display)" }}>ILS S'ENTRAÎNENT AVEC NOUS</h2>
            <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>Découvre les histoires de nos membres qui ont transformé leur quotidien grâce à la programmation en ligne Club ADM.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, i) => (<TestimonialCard key={i} testimonial={testimonial} index={i} />))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{ value: "500+", label: "Membres en ligne" }, { value: "4.9/5", label: "Note moyenne" }, { value: "92%", label: "Taux de rétention" }, { value: "15+", label: "Coachs certifiés" }].map((stat, i) => (
              <div key={i} className="text-center py-6 rounded-xl border border-white/[0.06]" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                <div className="text-3xl md:text-4xl text-white font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>{stat.value}</div>
                <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ SAMPLE PROGRAMMING ═══ */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#0f1229" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block" style={{ color: "#ed1c24" }}>Aperçu</span>
            <h2 className="text-4xl md:text-5xl text-white mb-5" style={{ fontFamily: "var(--font-display)" }}>EXEMPLE DE SEMAINE</h2>
            <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>Voici un aperçu d'une semaine type du programme Performance.</p>
          </motion.div>
          <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
            {SAMPLE_WEEK.map((day, i) => (
              <button key={i} onClick={() => setActiveDay(i)}
                className={`px-5 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap rounded-lg transition-colors ${activeDay === i ? "text-white" : "text-white/40 hover:text-white/70"}`}
                style={activeDay === i ? { backgroundColor: "#ed1c24" } : { backgroundColor: "rgba(255,255,255,0.05)" }}>
                {day.day}
              </button>
            ))}
          </div>
          <motion.div key={activeDay} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className="p-6 lg:p-8 rounded-xl border border-white/[0.06]" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 rounded-full" style={{ backgroundColor: "#ed1c24" }} />
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>{SAMPLE_WEEK[activeDay].day}</span>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{SAMPLE_WEEK[activeDay].title}</h3>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {SAMPLE_WEEK[activeDay].blocks.map((block, i) => (
                <div key={i} className="p-4 rounded-lg border-l-2" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderLeftColor: "rgba(237,28,36,0.3)" }}>
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#ed1c24" }}>{block.name}</span>
                  <p className="text-sm mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{block.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[800px] mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block" style={{ color: "#ed1c24" }}>Questions fréquentes</span>
            <h2 className="text-4xl md:text-5xl text-white" style={{ fontFamily: "var(--font-display)" }}>FAQ</h2>
          </motion.div>
          <div>
            {FAQ_ITEMS.map((item, i) => (<FAQItem key={i} item={item} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />))}
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section className="relative py-20 lg:py-24 overflow-hidden" style={{ backgroundColor: "#ed1c24" }}>
        <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-5" style={{ fontFamily: "var(--font-display)" }}>PRÊT À COMMENCER ?</h2>
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Réserve ta consultation gratuite avec un de nos coachs. On t'aidera à choisir le programme parfait pour tes objectifs.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/consultation-gratuite" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-gray-100 transition-colors" style={{ color: "#ed1c24" }}>
                Consultation gratuite <ArrowRight size={16} />
              </a>
              <a href="#programmes" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-white/10 transition-colors">
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
