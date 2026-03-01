/*
 * RESULTS — Club ADM Fitness
 * Social proof section with testimonials and transformation image
 * Inspired by Studeo Gyms named testimonials + Nosotros social proof
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const TRANSFORM_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/transformation-v2-aicqzmF5jpkqT8cMCFfDUA.webp";
const COACH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/coach-v2-iuqMfUSPVA3DeKvZ8XBcrS.webp";

const TESTIMONIALS = [
  {
    name: "Marie-Ève Tremblay",
    role: "Membre depuis 2 ans",
    text: "Club ADM a complètement changé ma relation avec l'entraînement. L'ambiance, les coachs, la programmation — tout est pensé pour nous faire progresser. J'ai perdu 25 lbs et gagné une confiance que je n'avais jamais eue.",
    rating: 5,
  },
  {
    name: "Jean-François Bouchard",
    role: "Programme en ligne — Performance",
    text: "Je vis à Montréal mais je m'entraîne avec Club ADM en ligne. La qualité de la programmation rivalise avec ce que j'ai vu dans les meilleurs box de CrossFit. Le suivi est personnalisé et les résultats parlent d'eux-mêmes.",
    rating: 5,
  },
  {
    name: "Sophie Gagnon",
    role: "Programme Bien-être 40+",
    text: "À 52 ans, je n'aurais jamais pensé faire des pull-ups. Le programme Bien-être est parfaitement adapté — je me sens plus forte et plus mobile que dans la vingtaine. Merci à toute l'équipe !",
    rating: 5,
  },
];

export default function Results() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section id="results" className="py-24 lg:py-32 bg-navy-dark relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-adm-red/5 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image composition */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative aspect-[3/4] max-h-[600px] overflow-hidden">
              <img
                src={COACH_IMG}
                alt="Coaching au Club ADM"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-adm-red p-6 lg:p-8 shadow-2xl shadow-adm-red/20">
              <div className="font-display text-5xl lg:text-6xl text-white leading-none">98%</div>
              <div className="text-white/80 text-sm mt-1 tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-heading)" }}>
                Taux de<br />satisfaction
              </div>
            </div>

            {/* Small accent image */}
            <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 w-24 h-24 lg:w-32 lg:h-32 border-4 border-navy-dark overflow-hidden">
              <img
                src={TRANSFORM_IMG}
                alt="Détermination"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="accent-line mb-6" />
            <h2 className="font-display text-5xl lg:text-6xl text-white mb-4">
              ILS ONT <span className="text-adm-red">TRANSFORMÉ</span><br />LEUR VIE
            </h2>
            <p className="text-cream/50 mb-10 max-w-md" style={{ fontFamily: "var(--font-body)" }}>
              Des résultats concrets, des histoires vraies. Nos membres témoignent de leur parcours.
            </p>

            {/* Testimonial card */}
            <div className="relative min-h-[280px]">
              <Quote className="w-10 h-10 text-adm-red/20 mb-4" />

              <p className="text-cream/80 text-lg leading-relaxed mb-6 italic" style={{ fontFamily: "var(--font-body)" }}>
                "{TESTIMONIALS[current].text}"
              </p>

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-adm-red text-adm-red" />
                ))}
              </div>

              <div>
                <div className="text-white font-bold text-sm tracking-[0.05em] uppercase" style={{ fontFamily: "var(--font-heading)" }}>
                  {TESTIMONIALS[current].name}
                </div>
                <div className="text-cream/40 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                  {TESTIMONIALS[current].role}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 border border-white/15 flex items-center justify-center text-cream/60 hover:text-white hover:border-white/30 transition-colors"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-[2px] transition-all duration-300 ${
                      i === current ? "w-8 bg-adm-red" : "w-4 bg-white/20"
                    }`}
                    aria-label={`Témoignage ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 border border-white/15 flex items-center justify-center text-cream/60 hover:text-white hover:border-white/30 transition-colors"
                aria-label="Témoignage suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
