/*
 * NAVBAR — Club ADM Fitness (Épuré)
 * Fond blanc propre, logo original, navigation minimale
 * Couleurs: navy #232862, rouge #ed1c24
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

const LOGO_WHITE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/logo_white_trimmed_6eea8182.png";
const LOGO_COLOR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/logo_primary_44ac8231.png";

const NAV_LINKS = [
  { label: "Le Gym", href: "#gym" },
  { label: "En Ligne", href: "#programs" },
  { label: "Résultats", href: "#results" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(35,40,98,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex-shrink-0">
              <img
                src={scrolled ? LOGO_COLOR : LOGO_WHITE}
                alt="Club ADM Fitness"
                className="h-12 w-auto transition-all duration-300"
              />
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] font-semibold tracking-[0.08em] uppercase transition-colors duration-200 ${
                    scrolled
                      ? "text-navy hover:text-adm-red"
                      : "text-white/90 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-2 bg-adm-red hover:bg-adm-red-hover text-white text-[13px] font-bold tracking-[0.08em] uppercase px-6 py-2.5 transition-colors duration-200"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Essai gratuit
                <ChevronRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 transition-colors ${scrolled ? "text-navy" : "text-white"}`}
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-navy text-lg font-semibold tracking-[0.05em] uppercase py-4 border-b border-navy/8"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-6 flex items-center justify-center gap-2 bg-adm-red text-white text-sm font-bold tracking-[0.08em] uppercase px-6 py-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Essai gratuit
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
