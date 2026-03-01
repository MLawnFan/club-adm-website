/*
 * RESULTS — Club ADM Fitness (Épuré)
 * Fond blanc, image + témoignages propres
 * Couleurs: navy #232862, rouge #ed1c24
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const COACH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/coach-v2-iuqMfUSPVA3DeKvZ8XBcrS.webp";

const TESTIMONIALS = [
  {
    name: "Marie-Ève Tremblay",
    role: "Membre depuis 2 ans",
    text: "Club ADM a complètement changé ma relation avec l'entraînement. L'ambiance, les coachs, la programmation — tout est pensé pour nous faire progresser.",
    rating: 5,
  },
  {
    name: "Jean-François Bouchard",
    role: "Programme en ligne — Performance",
    text: "Je vis à Montréal mais je m'entraîne avec Club ADM en ligne. La qualité de la programmation rivalise avec les meilleurs box de CrossFit.",
    rating: 5,
  },
  {
    name: "Sophie Gagnon",
    role: "Programme Bien-être 40+",
    text: "À 52 ans, je n'aurais jamais pensé faire des pull-ups. Le programme Bien-être est parfaitement adapté. Je me sens plus forte que jamais.",
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
    <section id="results" className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="relative aspect-[3/4] max-h-[550px] overflow-hidden">
              <img src={COACH_IMG} alt="Coaching au Club ADM" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="accent-line mb-5" />
            <h2 className="font-display text-5xl lg:text-6xl mb-4" style={{ color: "#232862" }}>
              ILS ONT <span style={{ color: "#ed1c24" }}>TRANSFORMÉ</span>
              <br />LEUR VIE
            </h2>
            <p className="text-gray-500 mb-10 max-w-md" style={{ fontFamily: "var(--font-body)" }}>
              Des résultats concrets, des histoires vraies.
            </p>

            {/* Testimonial */}
            <div className="min-h-[200px]">
              <Quote className="w-8 h-8 mb-4" style={{ color: "rgba(237,28,36,0.2)" }} />
              <p className="text-gray-700 text-lg leading-relaxed mb-6 italic" style={{ fontFamily: "var(--font-body)" }}>
                "{TESTIMONIALS[current].text}"
              </p>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4" style={{ fill: "#ed1c24", color: "#ed1c24" }} />
                ))}
              </div>
              <div className="font-bold text-sm tracking-[0.04em] uppercase" style={{ fontFamily: "var(--font-heading)", color: "#232862" }}>
                {TESTIMONIALS[current].name}
              </div>
              <div className="text-gray-400 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                {TESTIMONIALS[current].role}
              </div>
            </div>

            {/* Nav */}
            <div className="flex items-center gap-4 mt-8">
              <button onClick={prev} className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-400 transition-colors" aria-label="Précédent">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-[2px] transition-all duration-300 ${i === current ? "w-8" : "w-4 bg-gray-200"}`}
                    style={i === current ? { backgroundColor: "#ed1c24" } : {}}
                    aria-label={`Témoignage ${i + 1}`}
                  />
                ))}
              </div>
              <button onClick={next} className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-400 transition-colors" aria-label="Suivant">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
