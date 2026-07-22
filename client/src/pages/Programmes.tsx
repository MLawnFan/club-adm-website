/*
 * PAGE PROGRAMMES — Dark premium
 * Chaque programme avec description vulgarisée + barre de ratio visuelle
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Users, Dumbbell, Apple, ArrowRight, Flame, Zap, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";

const SERVICES_GROUP = "/manus-storage/fb-deadlift-woman_58b054bf.jpeg";
const SERVICES_NUTRITION = "/manus-storage/fb-mother-daughter-gym_0778968a.jpeg";
const SERVICES_PERSONAL = "/manus-storage/fb-group-350-milestone_eea572f0.jpeg";
const WARM_COACHING = "/manus-storage/fb-group-class-action_5685642b.jpeg";
const WARM_COMMUNITY = "/manus-storage/fb-group-100-milestone_a422922c.jpeg";

interface RatioBar {
  label: string;
  value: number; // 0-100
  color: string;
}

interface Program {
  title: string;
  slug: string;
  desc: string;
  image: string;
  icon: typeof Users;
  ratios: RatioBar[];
  highlights: string[];
  href: string;
  internal?: boolean;
  ctaLabel: string;
}

const programs: Program[] = [
  {
    title: "Cours de Groupe",
    slug: "groupe",
    desc: "Le cœur du Club ADM. Chaque jour, le programme change selon notre périodisation — un jour c'est de la force pure, le lendemain de l'haltérophilie, puis de la musculation, de la course ou de la gymnastique. Tu ne fais jamais deux fois la même chose. C'est varié, c'est encadré, et c'est adapté à tous les niveaux. Que tu sois débutant ou avancé, le coach ajuste les charges et les mouvements pour toi.",
    image: SERVICES_GROUP,
    icon: Users,
    ratios: [
      { label: "Force", value: 70, color: "#ed1c24" },
      { label: "Endurance", value: 60, color: "#f97316" },
      { label: "Technique", value: 65, color: "#eab308" },
      { label: "Cardio", value: 55, color: "#22c55e" },
    ],
    highlights: ["Variable selon la périodisation", "Force, haltérophilie, musculation, course, gymnastique", "Tous les niveaux", "Encadré par des coachs certifiés"],
    href: "/consultation-gratuite",
    internal: true,
    ctaLabel: "Essayer un cours",
  },
  {
    title: "Cours Semi-Privé",
    slug: "semi-prive",
    desc: "Un entraînement en petit groupe de 3 à 5 personnes, mais avec une programmation 100% adaptée à toi. Ton coach conçoit ton programme selon tes objectifs, tes limitations et ton niveau — mais tu t'entraînes dans l'énergie d'un groupe. C'est le meilleur des deux mondes : l'attention personnalisée d'un entraîneur privé, avec la motivation collective.",
    image: SERVICES_PERSONAL,
    icon: Target,
    ratios: [
      { label: "Personnalisation", value: 95, color: "#ed1c24" },
      { label: "Force", value: 75, color: "#f97316" },
      { label: "Endurance", value: 50, color: "#eab308" },
      { label: "Suivi individuel", value: 90, color: "#22c55e" },
    ],
    highlights: ["3 à 5 personnes maximum", "Programme adapté à chaque client", "Coaching personnalisé sur place", "Idéal pour objectifs spécifiques"],
    href: "/consultation-gratuite",
    internal: true,
    ctaLabel: "Réserver ma place",
  },
  {
    title: "Hyrox",
    slug: "hyrox",
    desc: "Tu veux te préparer pour une compétition Hyrox ou simplement développer une machine cardio-musculaire? Ce programme met l'accent sur l'endurance avec un ratio de 75% cardio/endurance et 25% musculation fonctionnelle. Courses, rameur, sled push, burpees, wall balls — tu vas apprendre à maintenir un effort soutenu tout en gardant ta force. Parfait pour ceux qui veulent repousser leurs limites cardiovasculaires.",
    image: WARM_COACHING,
    icon: Flame,
    ratios: [
      { label: "Endurance", value: 75, color: "#ed1c24" },
      { label: "Musculation", value: 25, color: "#f97316" },
      { label: "Cardio", value: 85, color: "#eab308" },
      { label: "Mental", value: 80, color: "#22c55e" },
    ],
    highlights: ["Ratio 75% endurance / 25% musculation", "Préparation compétition Hyrox", "Courses, rameur, sled, wall balls", "Développe l'endurance de fond"],
    href: "/consultation-gratuite",
    internal: true,
    ctaLabel: "Rejoindre le programme",
  },
  {
    title: "Hybrid",
    slug: "hybrid",
    desc: "Le programme Hybrid, c'est le parfait équilibre entre musculation fonctionnelle et endurance. Avec un ratio de 60% musculation et 40% cardio, tu développes à la fois ta force, ta composition corporelle et ta capacité cardiovasculaire. C'est pour ceux qui veulent être forts ET en shape — pas l'un ou l'autre. Un programme complet qui construit un physique athlétique et performant sur le long terme.",
    image: WARM_COMMUNITY,
    icon: Zap,
    ratios: [
      { label: "Musculation", value: 60, color: "#ed1c24" },
      { label: "Endurance", value: 40, color: "#f97316" },
      { label: "Force", value: 70, color: "#eab308" },
      { label: "Composition corporelle", value: 75, color: "#22c55e" },
    ],
    highlights: ["Ratio 60% musculation / 40% endurance", "Musculation fonctionnelle", "Développe force ET cardio", "Physique athlétique et performant"],
    href: "/consultation-gratuite",
    internal: true,
    ctaLabel: "Rejoindre le programme",
  },
  {
    title: "On Rstart la Machine",
    slug: "rstart",
    desc: "Tu veux te remettre en forme mais tu sais pas par où commencer? Ce programme est fait pour toi. 'On Rstart la Machine', c'est un accompagnement complet sur plusieurs semaines : entraînement adapté, plan nutritionnel personnalisé et soutien d'une communauté qui passe par le même chemin que toi. On construit des habitudes durables, pas des solutions rapides. C'est ta remise en marche, à ton rythme.",
    image: SERVICES_GROUP,
    icon: Dumbbell,
    ratios: [
      { label: "Habitudes de vie", value: 90, color: "#ed1c24" },
      { label: "Nutrition", value: 80, color: "#f97316" },
      { label: "Entraînement", value: 65, color: "#eab308" },
      { label: "Communauté", value: 85, color: "#22c55e" },
    ],
    highlights: ["Programme structuré sur plusieurs semaines", "Coaching personnalisé", "Plan nutritionnel inclus", "Communauté de soutien"],
    href: "/consultation-gratuite",
    internal: true,
    ctaLabel: "Réserver ma consultation",
  },
  {
    title: "Coaching Nutritionnel",
    slug: "nutrition",
    desc: "La nutrition, c'est le pilier invisible de tes résultats. Notre coaching nutritionnel t'aide à comprendre ce que tu manges, pourquoi, et comment ajuster ton alimentation pour atteindre tes objectifs — sans privation, sans régime extrême. On travaille avec toi pour bâtir des habitudes alimentaires qui durent, adaptées à ton mode de vie réel. Parce que manger bien, ça devrait être simple.",
    image: SERVICES_NUTRITION,
    icon: Apple,
    ratios: [
      { label: "Nutrition", value: 95, color: "#ed1c24" },
      { label: "Habitudes de vie", value: 85, color: "#f97316" },
      { label: "Suivi personnalisé", value: 90, color: "#eab308" },
      { label: "Éducation", value: 80, color: "#22c55e" },
    ],
    highlights: ["Plan alimentaire personnalisé", "Suivi hebdomadaire", "Approche sans privation", "Adapté à ton mode de vie"],
    href: "/consultation-gratuite",
    internal: true,
    ctaLabel: "Commencer mon suivi",
  },
];

function RatioBarComponent({ ratio }: { ratio: RatioBar }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium w-[140px] flex-shrink-0 text-right" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>
        {ratio.label}
      </span>
      <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${ratio.value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: ratio.color }}
        />
      </div>
      <span className="text-xs font-bold w-[32px] text-right" style={{ color: ratio.color, fontFamily: "var(--font-body)" }}>
        {ratio.value}%
      </span>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const } }),
};

export default function Programmes() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f1229" }}>
      <PromoBanner />
      <Navbar />

      {/* Hero */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>Nos Programmes</p>
            <h1 className="text-5xl lg:text-7xl leading-[0.9] mb-6 text-white" style={{ fontFamily: "var(--font-display)" }}>
              TROUVE LE PROGRAMME<br /><span style={{ color: "#ed1c24" }}>QUI TE RESSEMBLE.</span>
            </h1>
            <p className="text-lg leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
              Que tu sois débutant ou athlète confirmé, on a un programme adapté à tes objectifs. Chaque parcours est encadré par des coachs passionnés qui s'adaptent à toi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs listing */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#0f1229" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="space-y-24 lg:space-y-32">
            {programs.map((prog, i) => (
              <motion.div
                id={prog.slug}
                key={prog.slug}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center scroll-mt-24 ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden rounded-xl ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <img src={prog.image} alt={prog.title} className="w-full aspect-[4/3] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: "#ed1c24" }}>
                      <prog.icon size={22} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <h2 className="text-3xl lg:text-5xl mb-4 text-white" style={{ fontFamily: "var(--font-display)" }}>{prog.title.toUpperCase()}</h2>
                  <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>{prog.desc}</p>

                  {/* Ratio Bars */}
                  <div className="mb-6 p-5 rounded-xl border border-white/[0.06]" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] mb-4" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}>
                      À quoi s'attendre
                    </p>
                    <div className="space-y-3">
                      {prog.ratios.map((ratio) => (
                        <RatioBarComponent key={ratio.label} ratio={ratio} />
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {prog.highlights.map((h) => (
                      <span key={h} className="text-xs px-3 py-1.5 rounded-full border border-white/[0.1] font-medium" style={{ color: "rgba(255,255,255,0.55)", backgroundColor: "rgba(255,255,255,0.03)", fontFamily: "var(--font-body)" }}>
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link href={prog.href} className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20" style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-body)" }}>
                    {prog.ctaLabel} <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Programmation en ligne */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-sm font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>🚀 En Construction</p>
            <h2 className="text-4xl lg:text-5xl mb-4 text-white" style={{ fontFamily: "var(--font-display)" }}>PROGRAMMATION EN LIGNE</h2>
            <p className="text-base max-w-xl mx-auto mb-8" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
              Bientôt disponible. Nos programmes en ligne arrivent très bientôt. Stay tuned!
            </p>
            <Link href="/en-ligne" className="inline-flex items-center gap-2 px-8 py-3.5 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20" style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-body)" }}>
              Stay Tuned <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
