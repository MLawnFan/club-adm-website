/**
 * Header fixe avec logo Club ADM + navigation multi-pages + CTA
 * Adapté au nouveau flow: Quiz (/) → Résultat (/resultat) → Programme (/programme)
 * Fond navy semi-transparent avec backdrop blur au scroll
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useLocation, Link } from "@/online/lib/navigation.tsx";

const LOGO_ROUND = "/manus-storage/logo_clubadm_b62ebfde_7873f580.png";

const NAV_LINKS = [
  { label: "Accueil", href: "/online-project" },
  { label: "Programme", href: "/online-project/programme" },
  { label: "Résultat & Offre", href: "/online-project/resultat" },
  { label: "Checkout", href: "/online-project/checkout" },
  { label: "Upsell Fondateur", href: "/online-project/upsell" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-online-navy/95 backdrop-blur-md shadow-lg py-2"
            : "bg-online-navy/70 backdrop-blur-sm py-3"
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link href="/online-project" className="flex items-center gap-0 shrink-0">
            <img
              src={LOGO_ROUND}
              alt="Club ADM Fitness"
              className="h-10 sm:h-12 w-auto brightness-0 invert"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                  location === link.href
                    ? "text-online-cta-red"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/online-project"
              className="inline-flex items-center gap-2 bg-online-cta-red hover:bg-online-cta-red-hover text-white font-display text-xs sm:text-sm font-bold uppercase tracking-wider px-4 sm:px-5 py-2 sm:py-2.5 rounded transition-all duration-300"
            >
              <span className="hidden sm:inline">Commencer maintenant</span>
              <span className="sm:hidden">Commencer</span>
              <ArrowRight size={14} />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white p-1"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-online-navy/98 backdrop-blur-lg pt-20"
          >
            <nav className="container flex flex-col items-center gap-6 py-12">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-display text-2xl font-bold uppercase tracking-wider text-white/80 hover:text-online-cta-red transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 pt-6 border-t border-white/10 w-48 text-center">
                <Link
                  href="/online-project"
                  className="inline-flex items-center gap-2 bg-online-cta-red hover:bg-online-cta-red-hover text-white font-display text-lg font-bold uppercase tracking-wider px-8 py-4 rounded transition-all duration-300"
                >
                  Commencer
                  <ArrowRight size={18} />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
