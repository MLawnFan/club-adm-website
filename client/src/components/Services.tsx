/*
 * SERVICES — Services Club ADM
 * Design chaleureux : cartes image plein fond avec overlay, coins arrondis
 * Layout en grille 3 colonnes principales + 3 secondaires
 */
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const GROUP_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/services-group-N4WSZS7TmcGZdpYwK5q6RH.webp";
const NUTRITION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/services-nutrition-K5UKGcDj5XeCc7XxTrte8A.webp";
const PERSONAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/services-personal-BYp3GeFtEb4bmCtZ2dxU7P.webp";

const MAIN_SERVICES = [
  {
    title: "Cours de Groupe",
    desc: "Développe ton endurance, ta mobilité et ta force dans une ambiance motivante.",
    img: GROUP_IMG,
    href: "https://clubadm.com/groupe-classes/",
  },
  {
    title: "Coaching Nutritionnel",
    desc: "Un accompagnement personnalisé pour de meilleurs choix alimentaires.",
    img: NUTRITION_IMG,
    href: "https://clubadm.com/coaching-nutritionnel/",
  },
  {
    title: "Entraînement Personnel",
    desc: "Des séances privées ou semi-privées adaptées à tes objectifs.",
    img: PERSONAL_IMG,
    href: "https://clubadm.com/entrainement-personnel/",
  },
];

const EXTRA_SERVICES = [
  {
    title: "Bien-être au travail",
    desc: "Séances d'entraînement en entreprise pour vos employés.",
    href: "https://clubadm.com/bien-etre-au-travail/",
    emoji: "🏢",
  },
  {
    title: "Enfant / Ado",
    desc: "On entraîne les jeunes rookies pour leur développement physique et mental.",
    href: "https://clubadm.com/rookies/",
    emoji: "⚡",
  },
  {
    title: "Cours d'initiation",
    desc: "Débute en toute confiance avec nos cours adaptés aux débutants.",
    href: "https://clubadm.com/cours-dinitiation/",
    emoji: "🎯",
  },
];

export default function Services() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: "#ed1c24" }}>
            Nos services
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)", color: "#232862" }}
          >
            ON S'ADAPTE À TES BESOINS
          </h2>
        </motion.div>

        {/* Main services — image cards */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mb-8">
          {MAIN_SERVICES.map((service, i) => (
            <motion.a
              key={service.title}
              href={service.href}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative rounded-2xl overflow-hidden h-[380px] lg:h-[440px]"
            >
              {/* Image */}
              <img
                src={service.img}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Warm gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <h3
                  className="text-2xl lg:text-3xl text-white mb-2 uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {service.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {service.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-white text-sm font-semibold uppercase tracking-wider group-hover:gap-3 transition-all">
                  Découvrir
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Extra services — simple cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          {EXTRA_SERVICES.map((service, i) => (
            <motion.a
              key={service.title}
              href={service.href}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-transparent hover:shadow-lg hover:shadow-black/[0.04] transition-all duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: "#faf7f2" }}
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">{service.emoji}</span>
              <div>
                <h4
                  className="text-base mb-1 uppercase group-hover:text-adm-red transition-colors"
                  style={{ fontFamily: "var(--font-display)", color: "#232862" }}
                >
                  {service.title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(35,40,98,0.5)" }}>
                  {service.desc}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
