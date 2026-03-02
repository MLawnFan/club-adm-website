/*
 * HOW IT WORKS — 3 étapes pour commencer
 * Design chaleureux : fond crème chaud, numéros ronds rouges, image coaching
 * Layout asymétrique : étapes à gauche, image à droite
 */
import { motion } from "framer-motion";

const COACHING_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/warm-coaching-dB7EJzLiCMfi3Uda7NgAys.webp";

const STEPS = [
  {
    num: "1",
    title: "Consultation Gratuite",
    desc: "On veut connaître ton histoire et tes objectifs! Quoi de mieux que de jaser un peu pour qu'on apprenne à se connaître.",
  },
  {
    num: "2",
    title: "Découvre Nos Installations",
    desc: "Viens visiter le gym et rencontrer notre équipe. On va te guider et te montrer comment on peut t'aider à progresser.",
  },
  {
    num: "3",
    title: "Rejoins La Famille",
    desc: "Commence ton parcours avec nous. Nos coachs et la communauté seront là pour te soutenir à chaque étape.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: "#faf7f2" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left — Steps */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: "#ed1c24" }}>
                Comment ça marche
              </p>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl mb-12"
                style={{ fontFamily: "var(--font-display)", color: "#232862" }}
              >
                DÉBUTER, C'EST FACILE!
              </h2>
            </motion.div>

            <div className="space-y-8">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex gap-5"
                >
                  {/* Number circle */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold"
                      style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-display)" }}
                    >
                      {step.num}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="w-px h-full mt-2 bg-gradient-to-b from-red-200 to-transparent" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-4">
                    <h3
                      className="text-xl lg:text-2xl mb-2 uppercase"
                      style={{ fontFamily: "var(--font-display)", color: "#232862" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed" style={{ color: "rgba(35,40,98,0.55)" }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 ml-17"
            >
              <a
                href="https://clubadm.com/contact-us/"
                className="inline-flex items-center justify-center px-8 py-4 text-white text-sm font-bold uppercase tracking-[0.08em] rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5"
                style={{ backgroundColor: "#ed1c24" }}
              >
                Réserver Ma Consultation
              </a>
            </motion.div>
          </div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
              <img
                src={COACHING_IMG}
                alt="Coach aidant un membre au Club ADM"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              {/* Warm overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl p-5 shadow-xl shadow-black/5"
            >
              <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)", color: "#ed1c24" }}>
                15+
              </p>
              <p className="text-sm font-medium" style={{ color: "#232862" }}>Coachs certifiés</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(35,40,98,0.4)" }}>à ton service</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
