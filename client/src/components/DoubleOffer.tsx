/*
 * DOUBLE OFFER — Club ADM Fitness
 * Two-column asymmetric layout: Gym vs Online
 * Inspired by Equinox dual CTA + Solace niche positioning
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Globe, ChevronRight } from "lucide-react";

const GYM_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/community-v2-i8UKGpRWbET2qKA6PMbBby.webp";
const ONLINE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/online-v2-LGXoTCfNwW5TZZXbMafgMv.webp";

function OfferCard({
  title,
  subtitle,
  description,
  features,
  image,
  icon: Icon,
  href,
  ctaLabel,
  delay = 0,
}: {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  icon: typeof MapPin;
  href: string;
  ctaLabel: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="group relative overflow-hidden"
    >
      <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent" />
        <div className="absolute inset-0 bg-navy-dark/20 group-hover:bg-navy-dark/10 transition-colors duration-500" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
        <div className="flex items-center gap-2 mb-3">
          <Icon className="w-4 h-4 text-adm-red" />
          <span className="text-[11px] tracking-[0.2em] uppercase text-adm-red font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
            {subtitle}
          </span>
        </div>

        <h3 className="font-display text-4xl lg:text-5xl text-white mb-3">{title}</h3>

        <p className="text-cream/60 text-sm leading-relaxed mb-5 max-w-md" style={{ fontFamily: "var(--font-body)" }}>
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {features.map((f) => (
            <span
              key={f}
              className="text-[11px] tracking-[0.1em] uppercase px-3 py-1.5 border border-white/15 text-cream/70 bg-white/5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {f}
            </span>
          ))}
        </div>

        <a
          href={href}
          className="inline-flex items-center gap-2 text-white font-bold text-[13px] tracking-[0.1em] uppercase group/cta hover:text-adm-red transition-colors"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {ctaLabel}
          <ChevronRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

export default function DoubleOffer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gym" className="py-24 lg:py-32 bg-navy-dark" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="accent-line mx-auto mb-6" />
          <h2 className="font-display text-5xl lg:text-7xl text-white mb-4">
            DEUX FAÇONS DE <span className="text-adm-red">S'ENTRAÎNER</span>
          </h2>
          <p className="text-cream/50 text-lg max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            Que tu préfères l'énergie du groupe en salle ou la flexibilité de l'entraînement à domicile, 
            on a le programme qu'il te faut.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
          <OfferCard
            title="EN SALLE"
            subtitle="Alma, Québec"
            description="Cours de groupe, coaching personnalisé et une communauté qui te pousse à te dépasser. Équipement professionnel, ambiance incomparable."
            features={["Cours de groupe", "Coaching privé", "Open Gym", "Communauté"]}
            image={GYM_IMG}
            icon={MapPin}
            href="#contact"
            ctaLabel="Réserver un essai"
          />
          <OfferCard
            title="EN LIGNE"
            subtitle="Partout dans le monde"
            description="Accède à nos programmes d'entraînement fonctionnel depuis n'importe où. Programmation quotidienne, vidéos explicatives et suivi de progression."
            features={["Programmation quotidienne", "Vidéos HD", "Plans nutrition", "Suivi"]}
            image={ONLINE_IMG}
            icon={Globe}
            href="#programs"
            ctaLabel="Voir les programmes"
            delay={0.15}
          />
        </div>
      </div>
    </section>
  );
}
