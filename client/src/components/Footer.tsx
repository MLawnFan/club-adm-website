/*
 * FOOTER — Club ADM Fitness
 * Minimal dark footer with real logo, links, and social
 */
import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";

const LOGO_WHITE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/logo_white_trimmed_6eea8182.png";

const LINKS = {
  gym: [
    { label: "Horaire des cours", href: "#" },
    { label: "Nos coachs", href: "#" },
    { label: "Tarifs en salle", href: "#" },
    { label: "Essai gratuit", href: "#contact" },
  ],
  online: [
    { label: "Programme Fonctionnel", href: "#programs" },
    { label: "Programme Performance", href: "#programs" },
    { label: "Programme Bien-être", href: "#programs" },
    { label: "All Access", href: "#programs" },
  ],
  info: [
    { label: "À propos", href: "#" },
    { label: "Blog", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Politique de confidentialité", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">
            <img
              src={LOGO_WHITE}
              alt="Club ADM Fitness"
              className="h-10 w-auto mb-6"
            />
            <p className="text-cream/40 text-sm leading-relaxed mb-6 max-w-sm" style={{ fontFamily: "var(--font-body)" }}>
              Entraînement fonctionnel en salle à Alma et programmation en ligne. 
              Notre expertise, ton terrain de jeu.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-cream/40 hover:text-cream/70 transition-colors text-sm" style={{ fontFamily: "var(--font-body)" }}>
                <MapPin className="w-4 h-4 text-adm-red flex-shrink-0" />
                Alma, Québec, Canada
              </a>
              <a href="tel:+14185551234" className="flex items-center gap-3 text-cream/40 hover:text-cream/70 transition-colors text-sm" style={{ fontFamily: "var(--font-body)" }}>
                <Phone className="w-4 h-4 text-adm-red flex-shrink-0" />
                418-555-1234
              </a>
              <a href="mailto:info@clubadm.com" className="flex items-center gap-3 text-cream/40 hover:text-cream/70 transition-colors text-sm" style={{ fontFamily: "var(--font-body)" }}>
                <Mail className="w-4 h-4 text-adm-red flex-shrink-0" />
                info@clubadm.com
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <a href="https://www.instagram.com/clubadmfitness" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/10 flex items-center justify-center text-cream/40 hover:text-white hover:border-adm-red/50 hover:bg-adm-red/10 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/clubadmfitness" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/10 flex items-center justify-center text-cream/40 hover:text-white hover:border-adm-red/50 hover:bg-adm-red/10 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-cream/30 mb-5 font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              Le Gym
            </h4>
            <ul className="space-y-3">
              {LINKS.gym.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-cream/50 hover:text-white text-sm transition-colors" style={{ fontFamily: "var(--font-body)" }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-cream/30 mb-5 font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              En Ligne
            </h4>
            <ul className="space-y-3">
              {LINKS.online.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-cream/50 hover:text-white text-sm transition-colors" style={{ fontFamily: "var(--font-body)" }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-cream/30 mb-5 font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              Informations
            </h4>
            <ul className="space-y-3">
              {LINKS.info.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-cream/50 hover:text-white text-sm transition-colors" style={{ fontFamily: "var(--font-body)" }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream/25 text-xs" style={{ fontFamily: "var(--font-body)" }}>
            &copy; {new Date().getFullYear()} Club ADM Fitness. Tous droits réservés.
          </p>
          <p className="text-cream/15 text-xs" style={{ fontFamily: "var(--font-body)" }}>
            Alma, Québec — Entraînement Fonctionnel
          </p>
        </div>
      </div>
    </footer>
  );
}
