/*
 * PAGE PROGRAMMES — Dark premium
 * Fond navy sombre, cartes sombres, texte blanc/crème, accents rouges
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Users, Dumbbell, Apple, Baby, Building2, GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";

const SERVICES_GROUP = "/manus-storage/fb-deadlift-woman_58b054bf.jpeg";
const SERVICES_NUTRITION = "/manus-storage/fb-mother-daughter-gym_0778968a.jpeg";
const SERVICES_PERSONAL = "/manus-storage/fb-group-350-milestone_eea572f0.jpeg";
const WARM_COACHING = "/manus-storage/fb-group-class-action_5685642b.jpeg";
const WARM_COMMUNITY = "/manus-storage/fb-group-100-milestone_a422922c.jpeg";

const programs = [
  { title: "Cours de Groupe", slug: "groupe", desc: "Développe ton endurance, ta mobilité et ta force dans une ambiance motivante. Nos cours de groupe combinent entraînement fonctionnel, cardio et musculation pour des résultats complets.", image: SERVICES_GROUP, icon: Users, features: ["Entraînement fonctionnel varié", "Tous les niveaux bienvenus", "Coachs certifiés", "Ambiance motivante"], href: "https://clubadm.com/groupe-classes/" },
  { title: "Cours d'Initiation", slug: "initiation", desc: "Débute en toute confiance avec nos cours spécialement conçus pour les débutants. Apprends les mouvements fondamentaux dans un environnement bienveillant et sans jugement.", image: WARM_COMMUNITY, icon: GraduationCap, features: ["Adapté aux débutants", "Apprentissage des mouvements de base", "Petits groupes", "Progression encadrée"], href: "https://clubadm.com/cours-dinitiation/" },
  { title: "Entraînement Personnel", slug: "personnel", desc: "Des séances privées ou semi-privées adaptées à tes objectifs spécifiques. Ton coach conçoit un programme sur mesure pour maximiser tes résultats.", image: SERVICES_PERSONAL, icon: Dumbbell, features: ["Programme 100% personnalisé", "Suivi individuel", "Flexibilité horaire", "Résultats accélérés"], href: "https://clubadm.com/entrainement-personnel/" },
  { title: "Coaching Nutritionnel", slug: "nutrition", desc: "Un accompagnement personnalisé pour de meilleurs choix alimentaires. Nos experts en nutrition t'aident à atteindre tes objectifs avec un plan adapté à ton mode de vie.", image: SERVICES_NUTRITION, icon: Apple, features: ["Plan alimentaire personnalisé", "Suivi hebdomadaire", "Recettes et guides", "Approche sans privation"], href: "https://clubadm.com/coaching-nutritionnel/" },
  { title: "Enfant / Ado (Rookies)", slug: "rookies", desc: "On entraîne les jeunes rookies pour leur développement physique et mental. Un programme adapté qui développe la confiance, la coordination et le plaisir de bouger.", image: WARM_COACHING, icon: Baby, features: ["Adapté aux 6-17 ans", "Développement moteur", "Confiance en soi", "Plaisir garanti"], href: "https://clubadm.com/rookies/" },
  { title: "Bien-être au Travail", slug: "travail", desc: "Séances d'entraînement en entreprise pour vos employés. Améliorez la productivité, réduisez l'absentéisme et renforcez la cohésion d'équipe.", image: SERVICES_GROUP, icon: Building2, features: ["Séances sur site ou en ligne", "Adapté aux horaires d'entreprise", "Team building actif", "Améliore la productivité"], href: "https://clubadm.com/bien-etre-au-travail/" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const } }),
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
              Que tu sois débutant ou athlète confirmé, on a un programme adapté à tes objectifs. Chaque parcours est encadré par des coachs passionnés.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs listing */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#0f1229" }}>
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
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden rounded-xl ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <img src={prog.image} alt={prog.title} className="w-full aspect-[4/3] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: "#ed1c24" }}>
                      <prog.icon size={22} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <h2 className="text-4xl lg:text-5xl mb-5 text-white" style={{ fontFamily: "var(--font-display)" }}>{prog.title.toUpperCase()}</h2>
                  <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>{prog.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {prog.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5">
                        <CheckCircle2 size={16} style={{ color: "#ed1c24" }} className="flex-shrink-0" />
                        <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href={prog.href} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20" style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-body)" }}>
                    En savoir plus <ArrowRight size={16} />
                  </a>
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
