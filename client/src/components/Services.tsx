/*
 * SERVICES — Carrousel vidéo
 * Une capsule distincte par service, navigation clavier/clic et CTA vers le détail.
 * Les couvertures actuelles restent affichées jusqu'à la réception des vidéos finales.
 */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, PlayCircle, Video } from "lucide-react";
import { Link } from "wouter";
import ProgrammeRatios from "@/components/ProgrammeRatios";

const GROUP_IMG = "/manus-storage/cours-de-groupe-original_10442de9.jpg";
const SEMI_PRIVE_IMG = "/manus-storage/semi-prive-original_e05934b9.jpg";
const HYROX_IMG = "/manus-storage/hyrox-original_79c28bca.jpg";
const HYBRID_IMG = "/manus-storage/hybrid-original_bf9e767d.jpg";
const ONLINE_IMG = "/manus-storage/fb-deadlift-woman_58b054bf.jpeg";
const RSTART_IMG = "/manus-storage/fb-group-class-action_5685642b.jpeg";
const NUTRITION_IMG = "/manus-storage/fb-mother-daughter-gym_0778968a.jpeg";

type Service = {
  title: string;
  eyebrow: string;
  desc: string;
  poster: string;
  programme: string;
  video?: string;
};

const SERVICES: Service[] = [
  {
    title: "Hybrid",
    eyebrow: "Fort et en shape",
    desc: "Le juste équilibre entre musculation fonctionnelle et endurance pour bâtir un physique athlétique, fort et performant.",
    poster: HYBRID_IMG,
    programme: "hybrid",
    video: "/manus-storage/hybrid-web_61b155f5.mp4",
  },
  {
    title: "Cours de Groupe",
    eyebrow: "Bouger ensemble",
    desc: "Force, haltérophilie, musculation, course et gymnastique dans une programmation variée, encadrée et adaptée à tous les niveaux.",
    poster: GROUP_IMG,
    programme: "groupe",
    video: "/manus-storage/cours-de-groupe-web_6edfb9cd.mp4",
  },
  {
    title: "Cours Semi-Privé",
    eyebrow: "Coaching personnalisé",
    desc: "Un programme adapté à tes objectifs dans un petit groupe de 3 à 5 personnes, avec l'attention d'un coach et l'énergie de la gang.",
    poster: SEMI_PRIVE_IMG,
    programme: "semi-prive",
    video: "/manus-storage/semi-prive-web_c04664f7.mp4",
  },
  {
    title: "Hyrox",
    eyebrow: "Endurance et performance",
    desc: "Une préparation qui combine course et mouvements fonctionnels pour développer ton moteur, ta force et ta capacité à soutenir l'effort.",
    poster: HYROX_IMG,
    programme: "hyrox",
    video: "/manus-storage/hyrox-web_7777fd36.mp4",
  },
  {
    title: "Programmation En Ligne",
    eyebrow: "S'entraîner partout",
    desc: "Des entraînements structurés et un accompagnement accessible de partout pour progresser avec une direction claire.",
    poster: ONLINE_IMG,
    programme: "en-ligne",
  },
  {
    title: "On Rstart la Machine",
    eyebrow: "Transformation durable",
    desc: "Un accompagnement complet qui combine entraînement, nutrition et habitudes de vie pour repartir sur des bases solides.",
    poster: RSTART_IMG,
    programme: "rstart",
  },
  {
    title: "Coaching Nutritionnel",
    eyebrow: "Manger mieux, simplement",
    desc: "Un suivi personnalisé pour comprendre ton alimentation et bâtir des habitudes réalistes qui soutiennent tes objectifs.",
    poster: NUTRITION_IMG,
    programme: "nutrition",
  },
];

export default function Services() {
  const [current, setCurrent] = useState(0);
  const service = SERVICES[current];

  const revealConsultation = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Preserve opening in a new tab or using the native anchor with modifiers.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById("services-consultation");
    if (!target) return;
    event.preventDefault();
    document.querySelector<HTMLVideoElement>("[data-services-carousel] video")?.pause();
    target.focus({ preventScroll: true });
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  };

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

        <div data-services-carousel className="relative rounded-2xl border border-white/[0.08] overflow-hidden" style={{ backgroundColor: "#131636" }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={service.title}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
              className={`grid ${service.video ? "lg:grid-cols-[0.85fr_1.35fr]" : "lg:grid-cols-[1.35fr_0.85fr]"}`}
            >
              <div className={`relative overflow-hidden bg-black ${service.video ? "h-[560px] sm:h-[600px]" : "aspect-video lg:aspect-auto lg:min-h-[510px]"}`}>
                {service.video ? (
                  <video
                    key={service.video}
                    className="absolute inset-0 h-full w-full object-contain"
                    controls
                    playsInline
                    preload="metadata"
                    poster={service.poster}
                    aria-label={`Présentation vidéo du service ${service.title}`}
                  >
                    <source src={service.video} type="video/mp4" />
                    Ton navigateur ne prend pas en charge la lecture vidéo.
                    <a href={service.video}>Ouvrir la vidéo</a>
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

                {!service.video && <div className="pointer-events-none absolute left-4 top-4 lg:left-6 lg:top-6 flex items-center gap-2 rounded-full border border-white/10 bg-[#0f1229]/85 px-3 py-2 backdrop-blur-md">
                  <Video size={14} style={{ color: "#ed1c24" }} />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/85">
                    Capsule service
                  </span>
                </div>}
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-12 xl:p-14">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.17em]" style={{ color: "#ed1c24" }}>
                  {service.eyebrow}
                </p>
                <h3 className="mb-5 text-4xl lg:text-5xl uppercase leading-none text-white" style={{ fontFamily: "var(--font-display)" }}>
                  {service.title}
                </h3>
                <p className="mb-6 text-base leading-relaxed text-white/55 lg:text-lg">
                  {service.desc}
                </p>
                <ProgrammeRatios programme={service.programme} />
                <a
                  data-service-discover
                  href="#services-consultation"
                  onClick={revealConsultation}
                  className="inline-flex w-fit items-center gap-3 rounded-lg px-6 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-white transition-all duration-200 hover:gap-4 hover:shadow-lg hover:shadow-red-500/20 active:scale-[0.97]"
                  style={{ backgroundColor: "#ed1c24" }}
                >
                  Découvrir
                  <ArrowRight size={17} />
                </a>
              </div>
            </motion.article>
          </AnimatePresence>

          <div
            id="services-consultation"
            tabIndex={-1}
            aria-labelledby="services-consultation-title"
            className="scroll-mt-24 border-t border-white/10 p-7 outline-none sm:p-9 lg:p-12"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#ed1c24]">
                  Pourquoi une consultation gratuite?
                </p>
                <h3 id="services-consultation-title" className="text-3xl sm:text-4xl uppercase leading-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
                  Le bon départ, c’est celui qui te ressemble.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                  On prend le temps de comprendre tes objectifs, ton expérience et tes besoins pour
                  t’orienter vers le bon cours. Si tu débutes ou reprends l’entraînement, on prépare
                  ton arrivée pour que tu commences en confiance.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                  Pas question de simplement remplir nos cours au détriment de l’encadrement.
                  C’est gagnant-gagnant : tu reçois un accompagnement adapté et chacun garde
                  l’attention nécessaire pour s’entraîner de façon sécuritaire.
                </p>
              </div>
              <Link
                id="services-consultation-cta"
                href="/consultation-gratuite"
                className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-3 rounded-lg px-7 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white transition-all duration-200 hover:shadow-lg hover:shadow-red-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#131636] active:scale-[0.97] sm:w-fit"
                style={{ backgroundColor: "#ed1c24" }}
              >
                Consultation gratuite
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
