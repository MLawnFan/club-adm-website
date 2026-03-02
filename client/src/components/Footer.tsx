/*
 * FOOTER — Club ADM Fitness
 * Fond navy, texte blanc, liens vers clubadm.com
 * Succursales Brossard et Chambly
 */
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

const LOGO_WHITE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/logo_white_trimmed_1ff1138a.png";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#232862" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Logo + description */}
          <div className="lg:col-span-1">
            <img src={LOGO_WHITE} alt="Club ADM Fitness" className="h-12 w-auto mb-5" />
            <p className="text-white/50 text-sm leading-relaxed">
              La meilleure heure de ta journée. Entraînement fonctionnel pour tous les niveaux.
            </p>
            <div className="flex gap-4 mt-5">
              <a href="https://www.instagram.com/clubadm/" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/clubadm/" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-white text-sm font-bold uppercase tracking-wider mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Navigation
            </h4>
            <div className="space-y-2.5">
              {[
                { label: "Programme", href: "https://clubadm.com/programme/" },
                { label: "Prix", href: "https://clubadm.com/rates/" },
                { label: "Horaire", href: "https://clubadm.com/horaire/" },
                { label: "Notre Équipe", href: "https://clubadm.com/notre-equipe/" },
                { label: "Boutique", href: "https://clubadm.com/boutique" },
                { label: "Drop In", href: "https://clubadm.com/drop-in/" },
                { label: "Contact", href: "https://clubadm.com/contact-us/" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-white/50 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Emplacements */}
          <div>
            <h4
              className="text-white text-sm font-bold uppercase tracking-wider mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Emplacements
            </h4>
            <div className="space-y-4">
              <a href="https://clubadm.com/centre-de-brossard/" className="flex items-start gap-2 text-white/50 text-sm hover:text-white transition-colors group">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <div>
                  <span className="block font-semibold text-white/70 group-hover:text-white">Brossard</span>
                  9 place du commerce, Suite N
                </div>
              </a>
              <a href="https://clubadm.com/centre-de-chambly/" className="flex items-start gap-2 text-white/50 text-sm hover:text-white transition-colors group">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <div>
                  <span className="block font-semibold text-white/70 group-hover:text-white">Chambly</span>
                  2180 boul. industriel
                </div>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white text-sm font-bold uppercase tracking-wider mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Contact
            </h4>
            <div className="space-y-3">
              <a href="tel:4506002448" className="flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors">
                <Phone size={14} />
                450-600-2448
              </a>
              <a href="https://clubadm.com/contact-us/" className="flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors">
                <Mail size={14} />
                Nous contacter
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Club ADM Fitness. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
