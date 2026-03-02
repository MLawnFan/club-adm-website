/*
 * SERVICES — 5 services Club ADM
 * Grille alternée image/texte, fond blanc
 * Liens vers les pages existantes de clubadm.com
 */
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const GROUP_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/services-group-N4WSZS7TmcGZdpYwK5q6RH.webp";
const NUTRITION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/services-nutrition-K5UKGcDj5XeCc7XxTrte8A.webp";
const PERSONAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/services-personal-BYp3GeFtEb4bmCtZ2dxU7P.webp";

const SERVICES = [
  {
    title: "Cours de Groupe",
    desc: "Dans les cours de groupe, tu seras amené à développer tes habiletés physiques comme l'endurance cardiovasculaire, la mobilité, l'agilité et la force musculaire.",
    img: GROUP_IMG,
    href: "https://clubadm.com/groupe-classes/",
  },
  {
    title: "Coaching Nutritionnel",
    desc: "Un coach qualifié dans le domaine pour t'aider à faire de meilleurs choix alimentaires, sains et équilibrés. On peut t'aider à comprendre tes besoins nutritionnels et établir des objectifs réalistes!",
    img: NUTRITION_IMG,
    href: "https://clubadm.com/coaching-nutritionnel/",
  },
  {
    title: "Entraînement Personnel",
    desc: "On offre des entraînements privés et semi-privés personnalisés pour TES besoins! Selon tes objectifs, tu peux suivre des cours seul ou avec quelques amis.",
    img: PERSONAL_IMG,
    href: "https://clubadm.com/entrainement-personnel/",
  },
];

export default function Services() {
  return (
    <section className="py-20 lg:py-28 bg-white">
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
            DES SERVICES QUI COMBLENT TES BESOINS
          </h2>
        </motion.div>

        <div className="space-y-16 lg:space-y-24">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                i % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              {/* Image */}
              <div className={`overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-[300px] lg:h-[400px] object-cover"
                />
              </div>

              {/* Text */}
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <h3
                  className="text-3xl lg:text-4xl mb-5 uppercase"
                  style={{ fontFamily: "var(--font-display)", color: "#232862" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: "rgba(35,40,98,0.6)" }}
                >
                  {service.desc}
                </p>
                <a
                  href={service.href}
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.06em] transition-colors group"
                  style={{ color: "#ed1c24" }}
                >
                  En savoir plus
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional services links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-gray-100"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href="https://clubadm.com/bien-etre-au-travail/"
              className="group p-6 border border-gray-100 hover:border-adm-red/20 transition-colors"
            >
              <h4
                className="text-lg mb-2 uppercase group-hover:text-adm-red transition-colors"
                style={{ fontFamily: "var(--font-display)", color: "#232862" }}
              >
                Bien-être au travail
              </h4>
              <p className="text-sm" style={{ color: "rgba(35,40,98,0.5)" }}>
                Séances d'entraînement en entreprise pour favoriser la condition physique de vos employés.
              </p>
            </a>
            <a
              href="https://clubadm.com/rookies/"
              className="group p-6 border border-gray-100 hover:border-adm-red/20 transition-colors"
            >
              <h4
                className="text-lg mb-2 uppercase group-hover:text-adm-red transition-colors"
                style={{ fontFamily: "var(--font-display)", color: "#232862" }}
              >
                Enfant / Ado
              </h4>
              <p className="text-sm" style={{ color: "rgba(35,40,98,0.5)" }}>
                On entraîne les jeunes rookies en contribuant à leur développement physique et mental.
              </p>
            </a>
            <a
              href="https://clubadm.com/cours-dinitiation/"
              className="group p-6 border border-gray-100 hover:border-adm-red/20 transition-colors"
            >
              <h4
                className="text-lg mb-2 uppercase group-hover:text-adm-red transition-colors"
                style={{ fontFamily: "var(--font-display)", color: "#232862" }}
              >
                Cours d'initiation
              </h4>
              <p className="text-sm" style={{ color: "rgba(35,40,98,0.5)" }}>
                Débute en toute confiance avec nos cours d'initiation adaptés à tous les niveaux.
              </p>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
