/*
 * SERVICES — Carrousel vidéo
 * Une capsule distincte par service, navigation clavier/clic et CTA vers le détail.
 * Les couvertures actuelles restent affichées jusqu'à la réception des vidéos finales.
 */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, PlayCircle, Video } from "lucide-react";
import { Link } from "wouter";

const GROUP_IMG = "/manus-storage/fb-group-class-action_5685642b.jpeg";
const SEMI_PRIVE_IMG = "/manus-storage/fb-group-350-milestone_eea572f0.jpeg";
const HYROX_IMG = "/manus-storage/fb-deadlift-woman_58b054bf.jpeg";
const HYBRID_IMG = "/manus-storage/fb-group-100-milestone_a422922c.jpeg";
const ONLINE_IMG = "/manus-storage/fb-deadlift-woman_58b054bf.jpeg";
const RSTART_IMG = "/manus-storage/fb-group-class-action_5685642b.jpeg";
const NUTRITION_IMG = "/manus-storage/fb-mother-daughter-gym_0778968a.jpeg";

type Service = {
  title: string;
  eyebrow: string;
  desc: string;
  poster: string;
  href: string;
  video?: string;
};

const SERVICES: Service[] = [
  {
    title: "Hybrid",
    eyebrow: "Fort et en shape",
    desc: "Le juste équilibre entre musculation fonctionnelle et endurance pour bâtir un physique athlétique, fort et performant.",
    poster: HYBRID_IMG,
    href: "/programmes#hybrid",
  },
  {
    title: "Cours de Groupe",
    eyebrow: "Bouger ensemble",
    desc: "Force, haltérophilie, musculation, course et gymnastique dans une programmation variée, encadrée et adaptée à tous les niveaux.",
    poster: GROUP_IMG,
    href: "/programmes#groupe",
  },
  {
    title: "Cours Semi-Privé",
    eyebrow: "Coaching personnalisé",
    desc: "Un programme adapté à tes objectifs dans un petit groupe de 3 à 5 personnes, avec l'attention d'un coach et l'énergie de la gang.",
    poster: SEMI_PRIVE_IMG,
    href: "/programmes#semi-prive",
  },
  {
    title: "Hyrox",
    eyebrow: "Endurance et performance",
    desc: "Une préparation qui combine course et mouvements fonctionnels pour développer ton moteur, ta force et ta capacité à soutenir l'effort.",
    poster: HYROX_IMG,
    href: "/programmes#hyrox",
  },
  {
    title: "Programmation En Ligne",
    eyebrow: "S'entraîner partout",
    desc: "Des entraînements structurés et un accompagnement accessible de partout pour progresser avec une direction claire.",
    poster: ONLINE_IMG,
    href: "/en-ligne",
  },
  {
    title: "On Rstart la Machine",
    eyebrow: "Transformation durable",
    desc: "Un accompagnement complet qui combine entraînement, nutrition et habitudes de vie pour repartir sur des bases solides.",
    poster: RSTART_IMG,
    href: "/programmes#rstart",
  },
  {
    title: "Coaching Nutritionnel",
    eyebrow: "Manger mieux, simplement",
    desc: "Un suivi personnalisé pour comprendre ton alimentation et bâtir des habitudes réalistes qui soutiennent tes objectifs.",
    poster: NUTRITION_IMG,
    href: "/programmes#nutrition",
  },
];

export default function Services() {
  const [current, setCurrent] = useState(0);
  const service = SERVICES[current];

  const previous = () => setCurrent((index) => (index - 1 + SERVICES.length) % SERVICES.length);
  const next = () => setCurrent((index) => (index + 1) % SERVICES.length);

  return (
    <section className="py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: "#0f1229" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-7"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>
              Nos services
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white leading-none" style={{ fontFamily: "var(--font-display)" }}>
              ON S'ADAPTE À TES BESOINS
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="mr-2 text-sm font-semibold tabular-nums text-white/45" aria-live="polite">
              {String(current + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={previous}
              aria-label="Service précédent"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-all duration-200 hover:border-white/25 hover:bg-white/[0.08] active:scale-[0.97]"
            >
              <ArrowLeft size={19} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Service suivant"
              className="flex h-12 w-12 items-center justify-center rounded-full text-white transition-all duration-200 hover:shadow-lg hover:shadow-red-500/20 active:scale-[0.97]"
              style={{ backgroundColor: "#ed1c24" }}
            >
              <ArrowRight size={19} />
            </button>
          </div>
        </motion.div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((item, index) => {
              const isActive = index === current;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-label={`Afficher ${item.title}`}
                  aria-pressed={isActive}
                  className="rounded-full border px-4 py-2.5 text-xs font-bold uppercase tracking-[0.08em] transition-all duration-200 active:scale-[0.97]"
                  style={{
                    borderColor: isActive ? "#ed1c24" : "rgba(255,255,255,0.1)",
                    backgroundColor: isActive ? "#ed1c24" : "rgba(255,255,255,0.03)",
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.58)",
                  }}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative rounded-2xl border border-white/[0.08] overflow-hidden" style={{ backgroundColor: "#131636" }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={service.title}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
              className="grid lg:grid-cols-[1.35fr_0.85fr]"
            >
              <div className="relative aspect-video lg:aspect-auto lg:min-h-[510px] overflow-hidden bg-black">
                {service.video ? (
                  <video
                    key={service.video}
                    className="absolute inset-0 h-full w-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                    poster={service.poster}
                    aria-label={`Présentation vidéo du service ${service.title}`}
                  >
                    <source src={service.video} type="video/mp4" />
                    Ton navigateur ne prend pas en charge la lecture vidéo.
                  </video>
                ) : (
                  <>
                    <img
                      src={service.poster}
                      alt={`Aperçu du service ${service.title}`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-[#ed1c24]/90 text-white shadow-2xl backdrop-blur-sm">
                          <PlayCircle size={32} strokeWidth={1.7} />
                        </div>
                        <span className="rounded-full border border-white/15 bg-[#0f1229]/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                          Vidéo explicative à venir
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <div className="absolute left-4 top-4 lg:left-6 lg:top-6 flex items-center gap-2 rounded-full border border-white/10 bg-[#0f1229]/85 px-3 py-2 backdrop-blur-md">
                  <Video size={14} style={{ color: "#ed1c24" }} />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/85">
                    Capsule service
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-12 xl:p-14">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.17em]" style={{ color: "#ed1c24" }}>
                  {service.eyebrow}
                </p>
                <h3 className="mb-5 text-4xl lg:text-5xl uppercase leading-none text-white" style={{ fontFamily: "var(--font-display)" }}>
                  {service.title}
                </h3>
                <p className="mb-8 text-base leading-relaxed text-white/55 lg:text-lg">
                  {service.desc}
                </p>
                <Link
                  href={service.href}
                  className="inline-flex w-fit items-center gap-3 rounded-lg px-6 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-white transition-all duration-200 hover:gap-4 hover:shadow-lg hover:shadow-red-500/20 active:scale-[0.97]"
                  style={{ backgroundColor: "#ed1c24" }}
                >
                  Découvrir
                  <ArrowRight size={17} />
                </Link>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
