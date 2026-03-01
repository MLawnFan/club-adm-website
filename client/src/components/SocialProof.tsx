/*
 * DESIGN: Cinématique Sombre — Club ADM
 * Section preuve sociale avec témoignages en carrousel.
 * Fond sombre uni, cartes avec bordure rouge subtile, photos rondes.
 */
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TRANSFORMATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/transformation-results-kQLAjhKkpcHDufkWopjBuv.webp";

const testimonials = [
  {
    name: "Marie-Ève L.",
    role: "Membre depuis 2 ans",
    quote: "J'ai perdu 25 lbs en 6 mois et gagné une confiance que je n'avais jamais eue. Les coachs sont incroyables et la communauté te pousse à te dépasser chaque jour.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Jean-François D.",
    role: "Programme Performance",
    quote: "Après 10 ans de gym traditionnel, j'ai découvert l'entraînement fonctionnel chez Club ADM. Mes performances ont explosé en seulement 3 mois. Le meilleur investissement de ma vie.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Sophie B.",
    role: "Programme Bien-être 40+",
    quote: "À 47 ans, je suis en meilleure forme que dans ma vingtaine. Le programme adapté pour les 40+ est parfaitement dosé. Je me sens forte, énergique et vivante.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  },
];

export default function SocialProof() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#0a0a14]">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-adm-red font-semibold text-sm tracking-[0.3em] uppercase mb-4 block">
            Témoignages
          </span>
          <h2 className="font-[var(--font-display)] text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95]">
            ILS ONT TRANSFORMÉ
            <br />
            <span className="text-white/40">LEUR VIE</span>
          </h2>
        </motion.div>

        {/* Layout: Transformation Image + Testimonials */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Transformation Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 relative"
          >
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={TRANSFORMATION_IMG}
                alt="Transformation physique"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white/80 text-sm font-[var(--font-body)]">
                  Des résultats réels. Des transformations qui inspirent.
                </p>
              </div>
            </div>
            {/* Red accent */}
            <div className="absolute -left-2 top-8 w-1 h-20 bg-adm-red" />
          </motion.div>

          {/* Testimonials Grid */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="relative bg-white/[0.03] border border-white/[0.06] rounded-lg p-6 md:p-8 hover:border-adm-red/20 transition-colors duration-500 group"
              >
                <Quote className="absolute top-6 right-6 h-8 w-8 text-adm-red/10 group-hover:text-adm-red/20 transition-colors" />
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-adm-red/30"
                  />
                  <div>
                    <h4 className="text-white font-semibold font-[var(--font-body)]">{t.name}</h4>
                    <p className="text-white/40 text-sm">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-adm-red text-adm-red" />
                    ))}
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed font-[var(--font-body)] text-[15px]">
                  "{t.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
