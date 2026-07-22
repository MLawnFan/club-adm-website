/*
 * LOCATIONS — Dark premium
 * Fond navy surface, cartes sombres, accents rouges
 */
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Clock, Phone } from "lucide-react";

const LOCATIONS = [
  { name: "Brossard", address: "9 place du commerce, Suite N", city: "Brossard, Québec", href: "https://clubadm.com/centre-de-brossard/" },
  { name: "Chambly", address: "2180 boul. industriel", city: "Chambly, Québec", href: "https://clubadm.com/centre-de-chambly/" },
];

export default function Locations() {
  return (
    <section id="emplacements" className="py-20 lg:py-28" style={{ backgroundColor: "#131636" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>
            Nos emplacements
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-4 text-white" style={{ fontFamily: "var(--font-display)" }}>
            VIENS NOUS VOIR!
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
            Deux succursales sur la Rive-Sud pour mieux te servir.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {LOCATIONS.map((loc, i) => (
            <motion.a
              key={loc.name}
              href={loc.href}
              target="_blank"
              rel="noopener"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group rounded-xl p-8 lg:p-10 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: "#ed1c24" }} />

              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: "rgba(237, 28, 36, 0.12)" }}>
                <MapPin size={24} style={{ color: "#ed1c24" }} strokeWidth={1.5} />
              </div>

              <h3 className="text-3xl mb-3 uppercase text-white" style={{ fontFamily: "var(--font-display)" }}>
                {loc.name}
              </h3>
              <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>{loc.address}</p>
              <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>{loc.city}</p>

              <div className="flex items-center gap-4 mb-6 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                <span className="flex items-center gap-1.5"><Clock size={12} />Lun-Ven 5h-21h</span>
                <span className="flex items-center gap-1.5"><Phone size={12} />450-600-2448</span>
              </div>

              <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.06em] group-hover:gap-3 transition-all" style={{ color: "#ed1c24" }}>
                Voir les détails <ArrowRight size={14} />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
