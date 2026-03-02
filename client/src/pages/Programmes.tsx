/*
 * PAGE PROGRAMMES — Club ADM Fitness
 * Design chaleureux: fond crème, cartes blanches arrondies, images vibrantes
 * Listing de tous les programmes: Groupe, Initiation, Personnel, Nutrition, Rookies, Bien-être au travail
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Users, Dumbbell, Apple, Baby, Building2, GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";

const SERVICES_GROUP = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/services-group-N4WSZS7TmcGZdpYwK5q6RH.webp";
const SERVICES_NUTRITION = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/services-nutrition-K5UKGcDj5XeCc7XxTrte8A.webp";
const SERVICES_PERSONAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/services-personal-BYp3GeFtEb4bmCtZ2dxU7P.webp";
const WARM_COACHING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/warm-coaching-2Gg7VFzQZCJwMjXGxnqzKN.webp";
const WARM_COMMUNITY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/warm-community-M6iUrbm2XzLgnQXpZaqtX2.webp";

const programs = [
  {
    title: "Cours de Groupe",
    slug: "groupe",
    desc: "Développe ton endurance, ta mobilité et ta force dans une ambiance motivante. Nos cours de groupe combinent entraînement fonctionnel, cardio et musculation pour des résultats complets.",
    image: SERVICES_GROUP,
    icon: Users,
    features: ["Entraînement fonctionnel varié", "Tous les niveaux bienvenus", "Coachs certifiés", "Ambiance motivante"],
    href: "https://clubadm.com/groupe-classes/",
    color: "#ed1c24",
  },
  {
    title: "Cours d'Initiation",
    slug: "initiation",
    desc: "Débute en toute confiance avec nos cours spécialement conçus pour les débutants. Apprends les mouvements fondamentaux dans un environnement bienveillant et sans jugement.",
    image: WARM_COMMUNITY,
    icon: GraduationCap,
    features: ["Adapté aux débutants", "Apprentissage des mouvements de base", "Petits groupes", "Progression encadrée"],
    href: "https://clubadm.com/cours-dinitiation/",
    color: "#232862",
  },
  {
    title: "Entraînement Personnel",
    slug: "personnel",
    desc: "Des séances privées ou semi-privées adaptées à tes objectifs spécifiques. Ton coach conçoit un programme sur mesure pour maximiser tes résultats.",
    image: SERVICES_PERSONAL,
    icon: Dumbbell,
    features: ["Programme 100% personnalisé", "Suivi individuel", "Flexibilité horaire", "Résultats accélérés"],
    href: "https://clubadm.com/entrainement-personnel/",
    color: "#ed1c24",
  },
  {
    title: "Coaching Nutritionnel",
    slug: "nutrition",
    desc: "Un accompagnement personnalisé pour de meilleurs choix alimentaires. Nos experts en nutrition t'aident à atteindre tes objectifs avec un plan adapté à ton mode de vie.",
    image: SERVICES_NUTRITION,
    icon: Apple,
    features: ["Plan alimentaire personnalisé", "Suivi hebdomadaire", "Recettes et guides", "Approche sans privation"],
    href: "https://clubadm.com/coaching-nutritionnel/",
    color: "#232862",
  },
  {
    title: "Enfant / Ado (Rookies)",
    slug: "rookies",
    desc: "On entraîne les jeunes rookies pour leur développement physique et mental. Un programme adapté qui développe la confiance, la coordination et le plaisir de bouger.",
    image: WARM_COACHING,
    icon: Baby,
    features: ["Adapté aux 6-17 ans", "Développement moteur", "Confiance en soi", "Plaisir garanti"],
    href: "https://clubadm.com/rookies/",
    color: "#ed1c24",
  },
  {
    title: "Bien-être au Travail",
    slug: "travail",
    desc: "Séances d'entraînement en entreprise pour vos employés. Améliorez la productivité, réduisez l'absentéisme et renforcez la cohésion d'équipe.",
    image: SERVICES_GROUP,
    icon: Building2,
    features: ["Séances sur site ou en ligne", "Adapté aux horaires d'entreprise", "Team building actif", "Améliore la productivité"],
    href: "https://clubadm.com/bien-etre-au-travail/",
    color: "#232862",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Programmes() {
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
              Nos Programmes
            </p>
            <h1
              className="text-navy text-5xl lg:text-7xl leading-[0.9] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              TROUVE LE PROGRAMME<br />
              <span className="text-adm-red">QUI TE RESSEMBLE.</span>
            </h1>
            <p className="text-navy/50 text-lg leading-relaxed max-w-xl" style={{ fontFamily: "var(--font-body)" }}>
              Que tu sois débutant ou athlète confirmé, on a un programme adapté à tes objectifs. Chaque parcours est encadré par des coachs passionnés.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs listing */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="space-y-20 lg:space-y-28">
            {programs.map((prog, i) => (
              <motion.div
                key={prog.slug}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  i % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden rounded-2xl ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                      style={{ backgroundColor: prog.color }}
                    >
                      <prog.icon size={22} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <h2
                    className="text-navy text-4xl lg:text-5xl mb-5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {prog.title.toUpperCase()}
                  </h2>
                  <p className="text-navy/50 text-base leading-relaxed mb-8" style={{ fontFamily: "var(--font-body)" }}>
                    {prog.desc}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {prog.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5">
                        <CheckCircle2 size={16} className="text-adm-red flex-shrink-0" />
                        <span className="text-sm text-navy/60 font-medium" style={{ fontFamily: "var(--font-body)" }}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={prog.href}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-adm-red text-white text-sm font-bold uppercase tracking-wider hover:bg-adm-red-hover transition-colors rounded-lg"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    En savoir plus
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Programmation en ligne */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#232862" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-adm-red text-sm font-bold uppercase tracking-[0.15em] mb-3" style={{ fontFamily: "var(--font-body)" }}>
              Nouveau
            </p>
            <h2
              className="text-white text-4xl lg:text-5xl mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ENTRAÎNE-TOI DE PARTOUT
            </h2>
            <p className="text-white/50 text-base max-w-xl mx-auto mb-8" style={{ fontFamily: "var(--font-body)" }}>
              Découvre notre programmation en ligne. Des programmes complets accessibles où que tu sois, avec le même encadrement professionnel.
            </p>
            <Link
              href="/en-ligne"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-adm-red text-white text-sm font-bold uppercase tracking-wider hover:bg-adm-red-hover transition-colors rounded-lg"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Découvrir la programmation en ligne
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
