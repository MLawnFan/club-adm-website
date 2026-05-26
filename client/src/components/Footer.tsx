/*
 * FOOTER — Dark premium
 * Fond navy très foncé, texte blanc subtil
 */
import { Link } from "wouter";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

const LOGO_WHITE = "/manus-storage/logo_rond_white_clean_6fc6a7eb.png";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0a0c1f" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Logo + description */}
          <div className="lg:col-span-1">
            <img src={LOGO_WHITE} alt="Club ADM Fitness" className="h-12 w-auto mb-5" />
            <p className="text-white/35 text-sm leading-relaxed">
              La meilleure heure de ta journée. Entraînement fonctionnel pour tous les niveaux, dans une ambiance chaleureuse.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.instagram.com/clubadm/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://www.facebook.com/clubadm/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all" aria-label="Facebook">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-5" style={{ fontFamily: "var(--font-display)" }}>Navigation</h4>
            <div className="space-y-2.5">
              {[
                { label: "Programmes", href: "/programmes", internal: true },
                { label: "En Ligne", href: "/en-ligne", internal: true },
                { label: "Horaire & Prix", href: "/horaire-prix", internal: true },
                { label: "Blog", href: "/blog", internal: true },
                { label: "Notre Équipe", href: "/notre-equipe", internal: true },
                { label: "Contact", href: "/contact", internal: true },
                { label: "Boutique", href: "https://clubadm.com/boutique" },
              ].map((link) =>
                link.internal ? (
                  <Link key={link.label} href={link.href} className="block text-white/35 text-sm hover:text-white transition-colors">{link.label}</Link>
                ) : (
                  <a key={link.label} href={link.href} className="block text-white/35 text-sm hover:text-white transition-colors">{link.label}</a>
                )
              )}
            </div>
          </div>

          {/* Emplacements */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-5" style={{ fontFamily: "var(--font-display)" }}>Emplacements</h4>
            <div className="space-y-5">
              <a href="https://clubadm.com/centre-de-brossard/" target="_blank" rel="noopener" className="flex items-start gap-3 text-white/35 text-sm hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/5 group-hover:bg-white/10 transition-colors mt-0.5"><MapPin size={14} /></div>
                <div><span className="block font-semibold text-white/50 group-hover:text-white">Brossard</span>9 place du commerce, Suite N</div>
              </a>
              <a href="https://clubadm.com/centre-de-chambly/" target="_blank" rel="noopener" className="flex items-start gap-3 text-white/35 text-sm hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/5 group-hover:bg-white/10 transition-colors mt-0.5"><MapPin size={14} /></div>
                <div><span className="block font-semibold text-white/50 group-hover:text-white">Chambly</span>2180 boul. industriel</div>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-5" style={{ fontFamily: "var(--font-display)" }}>Contact</h4>
            <div className="space-y-3">
              <a href="tel:4506002448" className="flex items-center gap-3 text-white/35 text-sm hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/5 group-hover:bg-white/10 transition-colors"><Phone size={14} /></div>
                450-600-2448
              </a>
              <a href="/consultation-gratuite" className="flex items-center gap-3 text-white/35 text-sm hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/5 group-hover:bg-white/10 transition-colors"><Mail size={14} /></div>
                Nous contacter
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/20 text-xs">&copy; {new Date().getFullYear()} Club ADM Fitness. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
