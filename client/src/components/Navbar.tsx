/*
 * NAVBAR — Club ADM Fitness
 * Transparent on top, solid navy on scroll
 * Real logo from brand guide (white version for dark bg)
 * Sticky CTA "Essai Gratuit" always visible
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

const LOGO_WHITE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/logo_white_trimmed_6eea8182.png";

const NAV_LINKS = [
  { label: "Le Gym", href: "#gym" },
  { label: "En Ligne", href: "#online" },
  { label: "Programmes", href: "#programs" },
  { label: "Résultats", href: "#results" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-navy-dark/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        {/* Top bar */}
        <div className="hidden lg:block border-b border-white/5">
          <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between h-8 text-[11px] tracking-[0.15em] uppercase text-warm-gray" style={{ fontFamily: "var(--font-body)" }}>
            <span>Alma, Québec — Entraînement Fonctionnel</span>
            <div className="flex items-center gap-6">
              <a href="tel:+14185551234" className="hover:text-white transition-colors">418-555-1234</a>
              <a href="https://www.instagram.com/clubadmfitness" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="https://www.facebook.com/clubadmfitness" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="relative z-10 flex-shrink-0">
              <img
                src={LOGO_WHITE}
                alt="Club ADM Fitness"
                className="h-10 lg:h-12 w-auto"
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-[13px] font-semibold tracking-[0.12em] uppercase text-cream/80 hover:text-white transition-colors group"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-adm-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              ))}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-2 bg-adm-red hover:bg-adm-red-hover text-white text-[13px] font-bold tracking-[0.1em] uppercase px-6 py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-adm-red/25"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Essai Gratuit
                <ChevronRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden relative z-10 p-2 text-white"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy-dark/98 backdrop-blur-lg flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="text-3xl font-bold tracking-[0.08em] uppercase text-cream/80 hover:text-adm-red transition-colors py-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.08, duration: 0.4 }}
                className="mt-6 inline-flex items-center gap-2 bg-adm-red text-white text-lg font-bold tracking-[0.1em] uppercase px-8 py-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Essai Gratuit
                <ChevronRight className="w-5 h-5" />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
