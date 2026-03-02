/*
 * LOCATIONS — Succursales Brossard et Chambly
 * Fond cream léger, cartes avec bordure, texte navy
 */
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

const LOCATIONS = [
  {
    name: "Brossard",
    address: "9 place du commerce, Suite N",
    city: "Brossard, Québec",
    href: "https://clubadm.com/centre-de-brossard/",
  },
  {
    name: "Chambly",
    address: "2180 boul. industriel",
    city: "Chambly, Québec",
    href: "https://clubadm.com/centre-de-chambly/",
  },
];

export default function Locations() {
  return (
    <section id="emplacements" className="py-20 lg:py-28" style={{ backgroundColor: "#f8f8f6" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl mb-4"
            style={{ fontFamily: "var(--font-display)", color: "#232862" }}
          >
            NOS EMPLACEMENTS
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "rgba(35,40,98,0.5)" }}>
            Deux succursales pour mieux te servir sur la Rive-Sud.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
          {LOCATIONS.map((loc, i) => (
            <motion.a
              key={loc.name}
              href={loc.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group bg-white p-8 lg:p-10 flex flex-col items-start border border-gray-100 hover:border-adm-red/20 hover:shadow-md transition-all"
            >
              <div
                className="w-10 h-10 flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(237,28,36,0.08)" }}
              >
                <MapPin size={20} style={{ color: "#ed1c24" }} />
              </div>
              <h3
                className="text-2xl mb-2 uppercase"
                style={{ fontFamily: "var(--font-display)", color: "#232862" }}
              >
                {loc.name}
              </h3>
              <p className="text-sm mb-1" style={{ color: "rgba(35,40,98,0.7)" }}>{loc.address}</p>
              <p className="text-sm mb-6" style={{ color: "rgba(35,40,98,0.5)" }}>{loc.city}</p>
              <span
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.06em] mt-auto group-hover:gap-3 transition-all"
                style={{ color: "#ed1c24" }}
              >
                Voir les détails
                <ArrowRight size={14} />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
