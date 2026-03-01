/*
 * FOOTER — Club ADM Fitness (Épuré)
 * Fond navy #232862, propre et minimal
 */
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

const LOGO_WHITE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/logo_white_trimmed_6eea8182.png";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#232862" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {/* Logo + tagline */}
          <div>
            <img src={LOGO_WHITE} alt="Club ADM Fitness" className="h-10 w-auto mb-5" />
            <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Entraînement fonctionnel en salle et en ligne. Notre expertise, ton terrain de jeu.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.instagram.com/clubadmfitness" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/clubadmfitness" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-lg text-white mb-5">NAVIGATION</h4>
            <div className="space-y-3">
              {[
                { label: "Le Gym", href: "#gym" },
                { label: "Programmes en ligne", href: "#programs" },
                { label: "Résultats", href: "#results" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-white/40 text-sm hover:text-white transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-white mb-5">CONTACT</h4>
            <div className="space-y-3">
              <a href="tel:+14185551234" className="flex items-center gap-3 text-white/40 text-sm hover:text-white transition-colors" style={{ fontFamily: "var(--font-body)" }}>
                <Phone className="w-4 h-4 flex-shrink-0" />
                418-555-1234
              </a>
              <a href="mailto:info@clubadmfitness.com" className="flex items-center gap-3 text-white/40 text-sm hover:text-white transition-colors" style={{ fontFamily: "var(--font-body)" }}>
                <Mail className="w-4 h-4 flex-shrink-0" />
                info@clubadmfitness.com
              </a>
              <div className="flex items-start gap-3 text-white/40 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Alma, Québec, Canada
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/8 text-center">
          <p className="text-white/25 text-sm" style={{ fontFamily: "var(--font-body)" }}>
            &copy; {new Date().getFullYear()} Club ADM Fitness. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
