/*
 * DESIGN: Cinématique Sombre — Club ADM
 * Footer: liens, réseaux sociaux, logo, copyright.
 */
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/club-adm-logo-iryUvuUwz3e34AiGu7Rtxh.png";

export default function Footer() {
  return (
    <footer className="bg-[#060610] border-t border-white/[0.04]">
      <div className="container py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={LOGO_URL} alt="Club ADM Fitness" className="h-10 w-auto mb-5" />
            <p className="text-white/40 text-sm leading-relaxed font-[var(--font-body)] mb-6">
              Entraînement fonctionnel. Résultats réels.
              Au gym ou de n'importe où dans le monde.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-adm-red hover:border-adm-red/30 transition-all">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-adm-red hover:border-adm-red/30 transition-all">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-adm-red hover:border-adm-red/30 transition-all">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-[var(--font-display)] text-xl text-white mb-5">NAVIGATION</h4>
            <ul className="flex flex-col gap-3">
              {["Accueil", "Le Gym", "Programmes En Ligne", "Nos Tarifs", "Boutique", "Blog"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/40 hover:text-white text-sm transition-colors font-[var(--font-body)]">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <h4 className="font-[var(--font-display)] text-xl text-white mb-5">PROGRAMMES</h4>
            <ul className="flex flex-col gap-3">
              {["Transformation 90J", "Performance Athlète", "Bien-être 40+", "Coaching Personnalisé", "Plans Nutritionnels", "All Access"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/40 hover:text-white text-sm transition-colors font-[var(--font-body)]">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[var(--font-display)] text-xl text-white mb-5">CONTACT</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-adm-red shrink-0 mt-0.5" />
                <span className="text-white/40 text-sm font-[var(--font-body)]">
                  Québec, Canada
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-adm-red shrink-0" />
                <span className="text-white/40 text-sm font-[var(--font-body)]">
                  (418) 555-0123
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-adm-red shrink-0" />
                <span className="text-white/40 text-sm font-[var(--font-body)]">
                  info@clubadmfitness.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs font-[var(--font-body)]">
            &copy; {new Date().getFullYear()} Club ADM Fitness. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/20 hover:text-white/40 text-xs transition-colors font-[var(--font-body)]">
              Politique de confidentialité
            </a>
            <a href="#" className="text-white/20 hover:text-white/40 text-xs transition-colors font-[var(--font-body)]">
              Conditions d'utilisation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
