/*
 * NAVBAR — Dark premium
 * Fond navy sombre, logo blanc, liens crème, CTA rouge
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown, MapPin } from "lucide-react";
import { Link, useLocation } from "wouter";

const LOGO_WHITE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/logo_white_clean_aecb9a0d.png";

interface NavChild {
  label: string;
  href: string;
  desc?: string;
  external?: boolean;
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
    href: "/programmes",
    internal: true,
    children: [
      { label: "Tous les programmes", href: "/programmes", desc: "Vue d'ensemble de nos services" },
      { label: "Cours de groupe", href: "https://clubadm.com/groupe-classes/", desc: "Entraînement fonctionnel en équipe", external: true },
      { label: "Entraînement personnel", href: "https://clubadm.com/entrainement-personnel/", desc: "Coaching 1-on-1", external: true },
      { label: "Coaching nutritionnel", href: "https://clubadm.com/coaching-nutritionnel/", desc: "Plans alimentaires personnalisés", external: true },
      { label: "Rookies (Enfant/Ado)", href: "https://clubadm.com/rookies/", desc: "Programme jeunesse", external: true },
    ],
  },
  { label: "En Ligne", href: "/en-ligne", internal: true },
  { label: "Horaire & Prix", href: "/horaire-prix", internal: true },
  { label: "Blog", href: "/blog", internal: true },
  {
    label: "À Propos",
    href: "/notre-equipe",
    internal: true,
    children: [
      { label: "Notre Équipe", href: "/notre-equipe", desc: "Découvre nos coachs" },
      { label: "Contact", href: "/contact", desc: "Écris-nous ou viens nous voir" },
      { label: "Boutique", href: "https://clubadm.com/boutique", desc: "Vêtements et accessoires", external: true },
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

  const isActive = (href: string) => location === href || (href !== "/" && location.startsWith(href));

  return (
    <>
      {/* Top bar */}
      <div style={{ backgroundColor: "#0a0d1f" }} className="text-white/50 text-[11px] py-1.5 hidden lg:block">
        <div className="max-w-[1280px] mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-4 font-medium tracking-wide">
            <a href="https://clubadm.com/centre-de-brossard/" className="flex items-center gap-1 hover:text-white/80 transition-colors">
              <MapPin size={10} /> BROSSARD
            </a>
            <span className="text-white/15">|</span>
            <a href="https://clubadm.com/centre-de-chambly/" className="flex items-center gap-1 hover:text-white/80 transition-colors">
              <MapPin size={10} /> CHAMBLY
            </a>
          </div>
          <a href="tel:4506002448" className="flex items-center gap-1.5 hover:text-white/80 transition-colors font-medium">
            <Phone size={10} /> 450-600-2448
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg shadow-black/30" : "border-b border-white/5"}`}
        style={{ backgroundColor: scrolled ? "#0f1229" : "rgba(15, 18, 41, 0.92)", backdropFilter: "blur(16px)" }}
      >
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 flex items-center justify-between h-16 lg:h-[68px]">
          <Link href="/" className="flex-shrink-0">
            <img src={LOGO_WHITE} alt="Club ADM Fitness" className="h-12 lg:h-14 w-auto" />
          </Link>

          {/* Desktop nav */}
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
                      isActive(link.href) ? "text-[#ed1c24]" : "text-white/75 hover:text-white"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown size={12} className={`transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`} />
                    )}
                  </Link>
                ) : (
                  <a href={link.href} className="flex items-center gap-1 px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.05em] text-white/75 hover:text-white transition-colors" style={{ fontFamily: "var(--font-body)" }}>
                    {link.label}
                  </a>
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
                      <div className="shadow-xl border border-white/10 min-w-[260px] py-2 rounded-lg" style={{ backgroundColor: "#161938" }}>
                        {link.children.map((child) =>
                          child.external ? (
                            <a key={child.label} href={child.href} target="_blank" rel="noopener" className="block px-5 py-2.5 hover:bg-white/5 transition-colors group">
                              <span className="block text-sm text-white/85 font-medium group-hover:text-white transition-colors">{child.label}</span>
                              {child.desc && <span className="block text-[11px] text-white/35 mt-0.5">{child.desc}</span>}
                            </a>
                          ) : (
                            <Link key={child.label} href={child.href} className="block px-5 py-2.5 hover:bg-white/5 transition-colors group">
                              <span className="block text-sm text-white/85 font-medium group-hover:text-white transition-colors">{child.label}</span>
                              {child.desc && <span className="block text-[11px] text-white/35 mt-0.5">{child.desc}</span>}
                            </Link>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/consultation-gratuite"
              className="hidden md:inline-flex items-center px-5 py-2.5 text-white text-[12px] font-bold uppercase tracking-[0.06em] rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
              style={{ backgroundColor: "#ed1c24" }}
            >
              Consultation Gratuite
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-white" aria-label="Menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 overflow-y-auto lg:hidden"
            style={{ backgroundColor: "#0f1229" }}
          >
            <div className="px-6 py-4">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="border-b border-white/5">
                  {link.children ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                        className="w-full flex items-center justify-between py-4 text-[15px] font-semibold uppercase tracking-wide text-white/80"
                      >
                        {link.label}
                        <ChevronDown size={16} className={`text-white/30 transition-transform duration-200 ${mobileExpanded === link.label ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === link.label && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                            <div className="pb-3 pl-3 space-y-0.5">
                              {link.children.map((child) =>
                                child.external ? (
                                  <a key={child.label} href={child.href} target="_blank" rel="noopener" className="block py-2.5 px-3 text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors font-medium rounded" onClick={() => setMobileOpen(false)}>
                                    {child.label}
                                  </a>
                                ) : (
                                  <Link key={child.label} href={child.href} className="block py-2.5 px-3 text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors font-medium rounded" onClick={() => setMobileOpen(false)}>
                                    {child.label}
                                  </Link>
                                )
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : link.internal ? (
                    <Link href={link.href} className={`block py-4 text-[15px] font-semibold uppercase tracking-wide ${isActive(link.href) ? "text-[#ed1c24]" : "text-white/80 hover:text-white"}`} onClick={() => setMobileOpen(false)}>
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="block py-4 text-[15px] font-semibold uppercase tracking-wide text-white/80 hover:text-white" onClick={() => setMobileOpen(false)}>
                      {link.label}
                    </a>
                  )}
                </div>
              ))}
              <div className="pt-6">
                <Link href="/consultation-gratuite" className="block w-full text-center py-4 text-white text-sm font-bold uppercase tracking-[0.1em] rounded-lg" style={{ backgroundColor: "#ed1c24" }}>
                  Consultation Gratuite
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
