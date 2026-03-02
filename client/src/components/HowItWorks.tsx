/*
 * HOW IT WORKS — 3 étapes pour commencer
 * Fond cream léger, numéros rouges, texte navy
 * Étape 1: Consultation gratuite (pas essai gratuit)
 */
import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Réserve Ta Consultation Gratuite",
    desc: "On veut connaître ton histoire et tes objectifs fitness! Quoi de mieux que de jaser un peu pour qu'on apprenne à se connaître!",
  },
  {
    num: "02",
    title: "Découvre Nos Installations",
    desc: "Viens visiter nos installations et rencontrer notre équipe. On va te guider et te montrer comment on peut t'aider à progresser!",
  },
  {
    num: "03",
    title: "Rejoins Notre Communauté",
    desc: "Se remettre en forme, c'est pas facile! On est là pour te soutenir et t'aider à reprendre de bonnes habitudes de vie!",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "#f8f8f6" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl mb-4"
            style={{ fontFamily: "var(--font-display)", color: "#232862" }}
          >
            DÉBUTER AVEC NOUS, C'EST FACILE!
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "rgba(35,40,98,0.5)" }}>
            Trois étapes simples pour transformer ta vie.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white p-8 lg:p-10 relative"
            >
              <span
                className="text-6xl font-bold leading-none mb-4 block"
                style={{ fontFamily: "var(--font-display)", color: "rgba(237,28,36,0.15)" }}
              >
                {step.num}
              </span>
              <h3
                className="text-xl mb-3 uppercase"
                style={{ fontFamily: "var(--font-display)", color: "#232862" }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(35,40,98,0.6)" }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://clubadm.com/contact-us/"
            className="inline-flex items-center justify-center px-8 py-4 text-white text-sm font-bold uppercase tracking-[0.06em] transition-colors"
            style={{ backgroundColor: "#ed1c24" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d41920")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ed1c24")}
          >
            Consultation Gratuite
          </a>
        </motion.div>
      </div>
    </section>
  );
}
