/*
 * VALUE PROPS — 3 piliers Club ADM
 * Design chaleureux : fond blanc, icônes rondes rouges, coins arrondis
 * Layout horizontal avec ligne de connexion
 */
import { motion } from "framer-motion";
import { Shield, Users, Heart } from "lucide-react";

const PROPS = [
  {
    icon: Shield,
    title: "Coachs Qualifiés",
    desc: "Nos coachs sont formés et passionnés pour t'assurer un entraînement sécuritaire et efficace, adapté à ton niveau.",
    accent: "#ed1c24",
  },
  {
    icon: Users,
    title: "Communauté Unie",
    desc: "Ici, tu n'es pas juste un numéro. On se connaît par nos noms et on s'encourage mutuellement à chaque séance.",
    accent: "#232862",
  },
  {
    icon: Heart,
    title: "Pour Tout Le Monde",
    desc: "Que tu sois débutant ou athlète, nos programmes s'adaptent à toi. L'important, c'est de commencer.",
    accent: "#ed1c24",
  },
];

export default function ValueProps() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Subtle warm background pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.03]" style={{ backgroundColor: "#ed1c24", filter: "blur(100px)" }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-[0.03]" style={{ backgroundColor: "#232862", filter: "blur(100px)" }} />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: "#ed1c24" }}>
            Pourquoi nous choisir
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)", color: "#232862" }}
          >
            CE QUI NOUS REND DIFFÉRENTS
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {PROPS.map((prop, i) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative bg-white rounded-2xl p-8 lg:p-10 border border-gray-100 hover:border-transparent hover:shadow-xl hover:shadow-black/[0.04] transition-all duration-500"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: prop.accent }}
              />

              <div
                className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundColor: `${prop.accent}10` }}
              >
                <prop.icon size={28} style={{ color: prop.accent }} strokeWidth={1.5} />
              </div>

              <h3
                className="text-2xl mb-3 uppercase"
                style={{ fontFamily: "var(--font-display)", color: "#232862" }}
              >
                {prop.title}
              </h3>
              <p className="text-[15px] leading-relaxed" style={{ color: "rgba(35,40,98,0.55)" }}>
                {prop.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
