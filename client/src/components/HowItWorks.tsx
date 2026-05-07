/*
 * HOW IT WORKS — Dark premium
 * Fond navy principal, numéros rouges, image coaching, carte flottante sombre
 */
import { motion } from "framer-motion";

const COACHING_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/coach-medball_2946a194.jpg";

const STEPS = [
  { num: "1", title: "Consultation Gratuite", desc: "On veut connaître ton histoire et tes objectifs! Quoi de mieux que de jaser un peu pour qu'on apprenne à se connaître." },
  { num: "2", title: "Découvre Nos Installations", desc: "Viens visiter le gym et rencontrer notre équipe. On va te guider et te montrer comment on peut t'aider à progresser." },
  { num: "3", title: "Rejoins La Famille", desc: "Commence ton parcours avec nous. Nos coachs et la communauté seront là pour te soutenir à chaque étape." },
];

export default function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: "#0f1229" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Steps */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>
                Comment ça marche
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-12 text-white" style={{ fontFamily: "var(--font-display)" }}>
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
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold" style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-display)" }}>
                      {step.num}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="w-px h-full mt-2" style={{ background: "linear-gradient(to bottom, rgba(237,28,36,0.3), transparent)" }} />
                    )}
                  </div>
                  <div className="pb-4">
                    <h3 className="text-xl lg:text-2xl mb-2 uppercase text-white" style={{ fontFamily: "var(--font-display)" }}>
                      {step.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10 ml-17">
              <a
                href="/consultation-gratuite"
                className="inline-flex items-center justify-center px-8 py-4 text-white text-sm font-bold uppercase tracking-[0.08em] rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5"
                style={{ backgroundColor: "#ed1c24" }}
              >
                Réserver Ma Consultation
              </a>
            </motion.div>
          </div>

          {/* Right — Image */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
            <div className="relative rounded-xl overflow-hidden">
              <img src={COACHING_IMG} alt="Coach aidant un membre au Club ADM" className="w-full h-[500px] lg:h-[600px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -left-6 rounded-xl p-5 shadow-xl border border-white/[0.06]"
              style={{ backgroundColor: "#1a1e3e" }}
            >
              <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)", color: "#ed1c24" }}>15+</p>
              <p className="text-sm font-medium text-white">Coachs certifiés</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>à ton service</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
