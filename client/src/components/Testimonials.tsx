/*
 * TESTIMONIALS — Club ADM Fitness
 * Section témoignages et résultats avec photos de membres
 * Design chaleureux, fond blanc, cartes avec photos et citations
 * Couleurs: navy #232862, rouge #ed1c24, cream #faf7f2
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, TrendingUp } from "lucide-react";

/* ─── IMAGES ─── */
const IMG_MARIE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/member-marie-JcbM7rCTAvvmvMiS3ePT9f.webp";
const IMG_MARC = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/member-marc-3FFQ4mTdJ3T5A6fFDtHAHz.webp";
const IMG_SOPHIE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/member-sophie-eiWqknhVpNiJXn4y3i5RPh.webp";
const IMG_JEAN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/member-jean-EkDPp5J7g6qmhh7mvX3acK.webp";

/* ─── DATA ─── */
const testimonials = [
  {
    name: "Marie-Ève L.",
    age: 32,
    image: IMG_MARIE,
    location: "Brossard",
    duration: "8 mois",
    result: "-22 lbs",
    resultLabel: "Perte de poids",
    quote: "Je n'avais jamais mis les pieds dans un gym avant Club ADM. L'équipe m'a accueillie comme si je faisais déjà partie de la famille. Aujourd'hui, je me sens plus forte et plus confiante que jamais. C'est vraiment la meilleure heure de ma journée!",
    program: "Entraînement en groupe",
  },
  {
    name: "Marc-Antoine B.",
    age: 45,
    image: IMG_MARC,
    location: "Chambly",
    duration: "1 an",
    result: "+15%",
    resultLabel: "Force augmentée",
    quote: "À 45 ans, je pensais que mes meilleures années d'entraînement étaient derrière moi. Les coachs de Club ADM m'ont prouvé le contraire. Mon deadlift a augmenté de 15% et je n'ai plus mal au dos. L'approche fonctionnelle fait toute la différence.",
    program: "Entraînement fonctionnel",
  },
  {
    name: "Sophie T.",
    age: 28,
    image: IMG_SOPHIE,
    location: "Brossard",
    duration: "6 mois",
    result: "-4 tailles",
    resultLabel: "Transformation",
    quote: "Ce qui m'a convaincue, c'est la consultation gratuite. Pas de pression, juste une vraie conversation sur mes objectifs. Six mois plus tard, j'ai perdu 4 tailles et gagné une communauté incroyable. Je recommande à tout le monde!",
    program: "Programme Transformation",
  },
  {
    name: "Jean-François D.",
    age: 52,
    image: IMG_JEAN,
    location: "Chambly",
    duration: "2 ans",
    result: "0 blessure",
    resultLabel: "Santé préservée",
    quote: "Après deux opérations au genou, je cherchais un endroit où m'entraîner en toute sécurité. Chez Club ADM, chaque mouvement est adapté à ma condition. Deux ans plus tard, je suis en meilleure forme qu'à 40 ans, sans aucune blessure.",
    program: "Bien-être 40+",
  },
];

const stats = [
  { value: "500+", label: "Membres actifs" },
  { value: "4.9/5", label: "Note Google" },
  { value: "92%", label: "Taux de rétention" },
  { value: "15+", label: "Coachs certifiés" },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">

        {/* ─── Header ─── */}
        <div className="text-center mb-16">
          <p
            className="text-sm font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}
          >
            Résultats réels
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl leading-none"
            style={{ color: "#232862", fontFamily: "var(--font-display)" }}
          >
            ILS ONT TRANSFORMÉ
            <br />
            LEUR VIE AVEC NOUS
          </h2>
        </div>

        {/* ─── Testimonial Card ─── */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-lg"
              style={{ backgroundColor: "#faf7f2" }}
            >
              {/* Photo */}
              <div className="relative h-[400px] lg:h-[520px] overflow-hidden">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover object-top"
                />
                {/* Result badge */}
                <div
                  className="absolute top-6 left-6 px-5 py-3 rounded-xl shadow-md"
                  style={{ backgroundColor: "#ed1c24" }}
                >
                  <p className="text-white text-2xl font-bold" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em" }}>
                    {t.result}
                  </p>
                  <p className="text-white/80 text-[11px] font-medium uppercase tracking-wider" style={{ fontFamily: "var(--font-body)" }}>
                    {t.resultLabel}
                  </p>
                </div>
                {/* Duration badge */}
                <div
                  className="absolute bottom-6 left-6 px-4 py-2 rounded-lg backdrop-blur-md"
                  style={{ backgroundColor: "rgba(35, 40, 98, 0.85)" }}
                >
                  <p className="text-white text-xs font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                    {t.duration} de parcours
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                {/* Quote icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: "rgba(237, 28, 36, 0.08)" }}
                >
                  <Quote size={20} style={{ color: "#ed1c24" }} />
                </div>

                {/* Quote */}
                <p
                  className="text-lg lg:text-xl leading-relaxed mb-8"
                  style={{ color: "#232862", fontFamily: "var(--font-body)", fontWeight: 400 }}
                >
                  "{t.quote}"
                </p>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="#ed1c24" stroke="none" />
                  ))}
                </div>

                {/* Author */}
                <div className="mb-2">
                  <p
                    className="text-lg font-bold"
                    style={{ color: "#232862", fontFamily: "var(--font-body)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(35, 40, 98, 0.5)", fontFamily: "var(--font-body)" }}
                  >
                    {t.age} ans · {t.location} · {t.program}
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t" style={{ borderColor: "rgba(35, 40, 98, 0.08)" }}>
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:bg-white hover:shadow-sm"
                    style={{ borderColor: "rgba(35, 40, 98, 0.15)", color: "#232862" }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className="w-2.5 h-2.5 rounded-full transition-all"
                        style={{
                          backgroundColor: i === current ? "#ed1c24" : "rgba(35, 40, 98, 0.15)",
                          transform: i === current ? "scale(1.3)" : "scale(1)",
                        }}
                      />
                    ))}
                  </div>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:bg-white hover:shadow-sm"
                    style={{ borderColor: "rgba(35, 40, 98, 0.15)", color: "#232862" }}
                  >
                    <ChevronRight size={18} />
                  </button>
                  <span
                    className="ml-auto text-sm font-medium"
                    style={{ color: "rgba(35, 40, 98, 0.4)", fontFamily: "var(--font-body)" }}
                  >
                    {current + 1} / {testimonials.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── Stats Bar ─── */}
        <div
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center py-6 px-4 rounded-xl"
              style={{ backgroundColor: "#faf7f2" }}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingUp size={16} style={{ color: "#ed1c24" }} />
                <p
                  className="text-3xl lg:text-4xl font-bold"
                  style={{ color: "#232862", fontFamily: "var(--font-display)" }}
                >
                  {stat.value}
                </p>
              </div>
              <p
                className="text-sm font-medium"
                style={{ color: "rgba(35, 40, 98, 0.5)", fontFamily: "var(--font-body)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
