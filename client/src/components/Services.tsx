/*
 * SERVICES — Dark premium
 * Fond navy principal, cartes image avec overlay sombre, services secondaires sombres
 * Layout: rangée du haut 3 colonnes (Groupe, Semi-Privé, Hyrox), rangée du bas: En Ligne (large) + 3 petits services
 */
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const GROUP_IMG = "/manus-storage/fb-deadlift-woman_58b054bf.jpeg";
const SEMI_PRIVE_IMG = "/manus-storage/fb-group-350-milestone_eea572f0.jpeg";
const HYROX_IMG = "/manus-storage/fb-group-class-action_5685642b.jpeg";
const ONLINE_IMG = "/manus-storage/fb-deadlift-woman_58b054bf.jpeg";

const MAIN_SERVICES = [
  {
    title: "Cours de Groupe",
    desc: "Variable selon la périodisation : force, haltérophilie, musculation, course, gymnastique. Tu ne fais jamais deux fois la même chose.",
    img: GROUP_IMG,
    href: "/programmes",
    internal: true,
  },
  {
    title: "Cours Semi-Privé",
    desc: "3 à 5 personnes, programme 100% adapté à toi. L'attention d'un entraîneur privé avec la motivation collective.",
    img: SEMI_PRIVE_IMG,
    href: "/programmes",
    internal: true,
  },
  {
    title: "Hyrox",
    desc: "75% endurance / 25% musculation. Courses, rameur, sled push, wall balls — repousse tes limites cardiovasculaires.",
    img: HYROX_IMG,
    href: "/programmes",
    internal: true,
  },
];

const EXTRA_SERVICES = [
  {
    title: "Hybrid",
    desc: "60% musculation / 40% endurance. Le parfait équilibre pour être fort ET en shape.",
    href: "/programmes",
    icon: "⚡",
    internal: true,
  },
  {
    title: "On Rstart la Machine",
    desc: "Programme de transformation complet. Habitudes durables, coaching personnalisé et plan nutritionnel inclus.",
    href: "/consultation-gratuite",
    icon: "🔥",
    internal: true,
  },
  {
    title: "Coaching Nutritionnel",
    desc: "Accompagnement personnalisé pour bâtir des habitudes alimentaires qui durent, sans privation.",
    href: "/consultation-gratuite",
    icon: "🍎",
    internal: true,
  },
];

export default function Services() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "#0f1229" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>
            Nos services
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white" style={{ fontFamily: "var(--font-display)" }}>
            ON S'ADAPTE À TES BESOINS
          </h2>
        </motion.div>

        {/* Main services — image cards */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mb-5 lg:mb-6">
          {MAIN_SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <Link
                href={service.href}
                className="group relative rounded-xl overflow-hidden h-[380px] lg:h-[440px] block"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <h3 className="text-2xl lg:text-3xl text-white mb-2 uppercase" style={{ fontFamily: "var(--font-display)" }}>
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {service.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-white text-sm font-semibold uppercase tracking-wider group-hover:gap-3 transition-all">
                    Découvrir
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Second row: En Ligne featured card + 3 extra services */}
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-6">
          {/* Programmation En Ligne — featured image card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/en-ligne"
              className="group relative rounded-xl overflow-hidden h-[280px] lg:h-[320px] block"
              style={{ border: "1px solid rgba(237, 28, 36, 0.25)" }}
            >
              <img
                src={ONLINE_IMG}
                alt="Programmation En Ligne"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent group-hover:from-black/90 transition-all duration-500" />

              {/* Badge EN CONSTRUCTION */}
              <div className="absolute top-5 left-5">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: "#ed1c24" }}
                >
                  🚀 En Construction
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <h3 className="text-2xl lg:text-3xl text-white mb-2 uppercase" style={{ fontFamily: "var(--font-display)" }}>
                  Programmation En Ligne
                </h3>
                <p className="text-sm leading-relaxed mb-4 max-w-md" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Bientôt disponible. Entraîne-toi de partout avec nos programmes structurés et notre coaching personnalisé.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider group-hover:gap-3 transition-all" style={{ color: "#ed1c24" }}>
                  Stay Tuned
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* 3 extra services stacked */}
          <div className="flex flex-col gap-4 justify-between">
            {EXTRA_SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={service.href} className="group flex items-start gap-4 p-5 rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-0.5 flex-1" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                  <span className="text-2xl flex-shrink-0 mt-0.5">{service.icon}</span>
                  <div>
                    <h4 className="text-base mb-1 uppercase text-white group-hover:text-[#ed1c24] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                      {service.title}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {service.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
