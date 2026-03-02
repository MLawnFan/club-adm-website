/*
 * NAVBAR — Club ADM Fitness
 * Design épuré : seulement 5-6 liens principaux
 * Regroupements intelligents sous dropdowns
 * Fond blanc, logo couleur, CTA rouge
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown, MapPin } from "lucide-react";
import { Link, useLocation } from "wouter";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/logo_color_trimmed_7ec2e108.png";

/* ─── NAV STRUCTURE — 5 liens principaux seulement ─── */
interface NavChild {
  label: string;
  href: string;
  desc?: string;
}
interface NavItem {
  label: string;
  href: string;
  internal?: boolean;
  children?: NavChild[];
}

const NAV_LINKS: NavItem[] = [
  {
    label: "Programmes",
    href: "https://clubadm.com/programme/",
    children: [
      { label: "Cours de groupe", href: "https://clubadm.com/groupe-classes/", desc: "Entraînement fonctionnel en équipe" },
      { label: "Cours d'initiation", href: "https://clubadm.com/cours-dinitiation/", desc: "Pour bien commencer" },
      { label: "Entraînement personnel", href: "https://clubadm.com/entrainement-personnel/", desc: "Coaching 1-on-1" },
      { label: "Coaching nutritionnel", href: "https://clubadm.com/coaching-nutritionnel/", desc: "Plans alimentaires personnalisés" },
      { label: "Enfant / Ado", href: "https://clubadm.com/rookies/", desc: "Programme Rookies" },
    ],
  },
  {
    label: "En Ligne",
    href: "/en-ligne",
    internal: true,
  },
  {
    label: "Horaire & Prix",
    href: "https://clubadm.com/rates/",
    children: [
      { label: "Horaire des cours", href: "https://clubadm.com/horaire/" },
      { label: "Tarifs", href: "https://clubadm.com/rates/" },
      { label: "Drop In", href: "https://clubadm.com/drop-in/" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    internal: true,
  },
  {
    label: "À Propos",
    href: "https://clubadm.com/notre-equipe/",
    children: [
      { label: "Notre Équipe", href: "https://clubadm.com/notre-equipe/" },
      { label: "Boutique", href: "https://clubadm.com/boutique" },
      { label: "Contact", href: "https://clubadm.com/contact-us/" },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [location] = useLocation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <>
      {/* Top bar — succursales + téléphone */}
      <div style={{ backgroundColor: "#232862" }} className="text-white text-[11px] py-1.5 hidden lg:block">
        <div className="max-w-[1280px] mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-4 font-medium tracking-wide">
            <a href="https://clubadm.com/centre-de-brossard/" className="flex items-center gap-1 hover:text-white/80 transition-colors">
              <MapPin size={10} />
              BROSSARD
            </a>
            <span className="text-white/20">|</span>
            <a href="https://clubadm.com/centre-de-chambly/" className="flex items-center gap-1 hover:text-white/80 transition-colors">
              <MapPin size={10} />
              CHAMBLY
            </a>
          </div>
          <a href="tel:4506002448" className="flex items-center gap-1.5 hover:text-white/80 transition-colors font-medium">
            <Phone size={10} />
            450-600-2448
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 bg-white ${
          scrolled ? "shadow-[0_1px_12px_rgba(0,0,0,0.06)]" : "border-b border-gray-100"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 flex items-center justify-between h-16 lg:h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src={LOGO_URL}
              alt="Club ADM Fitness"
              className="h-10 lg:h-11 w-auto"
            />
          </Link>

          {/* Desktop nav — 5 liens seulement */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children ? handleMouseEnter(link.label) : undefined}
                onMouseLeave={handleMouseLeave}
              >
                {link.internal ? (
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.05em] transition-colors ${
                      location === link.href ? "text-adm-red" : "text-navy hover:text-adm-red"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.05em] text-navy hover:text-adm-red transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}
                    onClick={() => !link.children && window.open(link.href, "_self")}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 pt-1"
                      onMouseEnter={() => handleMouseEnter(link.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="bg-white shadow-lg border border-gray-100 min-w-[240px] py-2">
                        {link.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="block px-5 py-2.5 hover:bg-cream transition-colors group"
                          >
                            <span className="block text-sm text-navy font-medium group-hover:text-adm-red transition-colors">
                              {child.label}
                            </span>
                            {child.desc && (
                              <span className="block text-[11px] text-navy/40 mt-0.5">
                                {child.desc}
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://clubadm.com/contact-us/"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-adm-red text-white text-[12px] font-bold uppercase tracking-[0.06em] hover:bg-adm-red-hover transition-colors"
            >
              Consultation Gratuite
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-navy"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — propre et organisé */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 bg-white overflow-y-auto lg:hidden"
          >
            <div className="px-6 py-4">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="border-b border-gray-50">
                  {link.children ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                        className="w-full flex items-center justify-between py-4 text-[15px] font-semibold uppercase tracking-wide text-navy"
                      >
                        {link.label}
                        <ChevronDown
                          size={16}
                          className={`text-navy/30 transition-transform duration-200 ${mobileExpanded === link.label ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-3 pl-3 space-y-0.5">
                              {link.children.map((child) => (
                                <a
                                  key={child.label}
                                  href={child.href}
                                  className="block py-2.5 px-3 text-sm text-navy/70 hover:text-adm-red hover:bg-cream/50 transition-colors font-medium rounded"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {child.label}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : link.internal ? (
                    <Link
                      href={link.href}
                      className={`block py-4 text-[15px] font-semibold uppercase tracking-wide ${
                        location === link.href ? "text-adm-red" : "text-navy"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="block py-4 text-[15px] font-semibold uppercase tracking-wide text-navy"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  )}
                </div>
              ))}

              {/* CTA mobile */}
              <div className="pt-6 space-y-3">
                <a
                  href="https://clubadm.com/contact-us/"
                  className="block text-center py-3.5 bg-adm-red text-white font-bold uppercase tracking-wider text-sm hover:bg-adm-red-hover transition-colors"
                >
                  Consultation Gratuite
                </a>
                <a href="tel:4506002448" className="flex items-center justify-center gap-2 py-2 text-navy/60 text-sm font-medium">
                  <Phone size={14} />
                  450-600-2448
                </a>
              </div>

              {/* Succursales mobile */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex gap-4">
                <a href="https://clubadm.com/centre-de-brossard/" className="flex items-center gap-1.5 text-xs text-navy/40 hover:text-navy transition-colors font-medium">
                  <MapPin size={12} />
                  Brossard
                </a>
                <a href="https://clubadm.com/centre-de-chambly/" className="flex items-center gap-1.5 text-xs text-navy/40 hover:text-navy transition-colors font-medium">
                  <MapPin size={12} />
                  Chambly
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
