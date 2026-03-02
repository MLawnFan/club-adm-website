/*
 * VALUE PROPS — 3 piliers Club ADM
 * Fond blanc, icônes rouges, texte navy
 * Inspiré du site actuel clubadm.com
 */
import { motion } from "framer-motion";
import { Shield, Users, Heart } from "lucide-react";

const PROPS = [
  {
    icon: Shield,
    title: "Des Coachs Qualifiés",
    desc: "Nos coachs sont formés et qualifiés pour t'assurer un entraînement sécuritaire et efficace en tout temps!",
  },
  {
    icon: Users,
    title: "Une Communauté Unie",
    desc: "La communauté ADM, ce sont des gens qui ont leur santé et leur bien-être à cœur! Ils vont t'encourager et te traiter comme un ami!",
  },
  {
    icon: Heart,
    title: "Tout Le Monde Est Bienvenu",
    desc: "Nos coachs et nos membres ont tous le même objectif : créer un environnement amical pour tout le monde, peu importe ton niveau!",
  },
];

export default function ValueProps() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {PROPS.map((prop, i) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div
                className="w-14 h-14 mx-auto mb-5 flex items-center justify-center"
                style={{ backgroundColor: "rgba(237,28,36,0.08)" }}
              >
                <prop.icon size={26} style={{ color: "#ed1c24" }} />
              </div>
              <h3
                className="text-xl mb-3 uppercase"
                style={{ fontFamily: "var(--font-display)", color: "#232862" }}
              >
                {prop.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(35,40,98,0.6)" }}>
                {prop.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
