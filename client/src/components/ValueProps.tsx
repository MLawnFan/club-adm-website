/*
 * VALUE PROPS — Dark premium
 * Fond navy surface, cartes sombres, icônes rouges, texte crème
 */
import { motion } from "framer-motion";
import { Shield, Users, Heart, Dumbbell } from "lucide-react";

const PROPS = [
  {
    icon: Shield,
    title: "Coachs Qualifiés",
    desc: "Nos coachs sont formés et passionnés pour t'assurer un entraînement sécuritaire et efficace, adapté à ton niveau.",
  },
  {
    icon: Users,
    title: "Communauté Unie",
    desc: "Ici, tu n'es pas juste un numéro. On se connaît par nos noms et on s'encourage mutuellement à chaque séance.",
  },
  {
    icon: Heart,
    title: "Pour Tout Le Monde",
    desc: "Que tu sois débutant ou athlète, nos programmes s'adaptent à toi. L'important, c'est de commencer.",
  },
  {
    icon: Dumbbell,
    title: "Résultats Prouvés",
    desc: "500+ membres transformés. Des programmes qui fonctionnent, basés sur la science et l'expérience.",
  },
];

export default function ValueProps() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" style={{ backgroundColor: "#131636" }}>
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]" style={{ backgroundColor: "#ed1c24", filter: "blur(150px)" }} />

      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>
            Pourquoi Club ADM
          </p>
          <h2 className="text-4xl lg:text-5xl text-white" style={{ fontFamily: "var(--font-display)" }}>
            CE QUI NOUS DISTINGUE
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROPS.map((prop, i) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-7 rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-1"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(237, 28, 36, 0.12)" }}
              >
                <prop.icon size={22} style={{ color: "#ed1c24" }} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-body)" }}>
                {prop.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                {prop.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
