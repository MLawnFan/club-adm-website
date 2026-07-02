/*
 * PAGE ÉVÉNEMENTS — Liste des événements à venir, organisée par mois
 * Chaque événement est cliquable et mène vers sa page détaillée
 * Design dark premium cohérent avec le reste du site
 */
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Users, Clock } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";

interface Event {
  id: string;
  title: string;
  date: string;
  dateDisplay: string;
  time?: string;
  location: string;
  description: string;
  category: string;
  href: string;
  featured?: boolean;
}

const EVENTS: Event[] = [
  {
    id: "course-19-sept",
    title: "Événement Course — Au profit de la Fondation du Centre Jeunesse",
    date: "2025-09-19",
    dateDisplay: "19 septembre 2025",
    time: "8h00",
    location: "Chambly, QC",
    description: "Que tu coures 1 km ou 21,1 km, peu importe ton niveau — ce jour-là, on avance ensemble. Les profits sont remis à la Fondation du Centre Jeunesse de la Montérégie. Programmation de course incluse (3x/semaine).",
    category: "Course caritative",
    href: "/evenements/course-19-septembre",
    featured: true,
  },
];

// Group events by month
function groupByMonth(events: Event[]) {
  const months: Record<string, Event[]> = {};
  events.forEach((event) => {
    const date = new Date(event.date);
    const key = date.toLocaleDateString("fr-CA", { year: "numeric", month: "long" });
    if (!months[key]) months[key] = [];
    months[key].push(event);
  });
  return months;
}

export default function Evenements() {
  const grouped = groupByMonth(EVENTS);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f1229" }}>
      <PromoBanner />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-16" style={{ backgroundColor: "#0f1229" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>
              Club ADM Fitness
            </p>
            <h1 className="text-4xl lg:text-6xl leading-[0.9] mb-6 text-white" style={{ fontFamily: "var(--font-display)" }}>
              NOS <span style={{ color: "#ed1c24" }}>ÉVÉNEMENTS</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>
              Découvre nos événements à venir. Clique sur un événement pour voir les détails et t'inscrire.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events List by Month */}
      <section className="pb-20 lg:pb-28" style={{ backgroundColor: "#0f1229" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {Object.entries(grouped).map(([month, events], monthIndex) => (
            <motion.div
              key={month}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: monthIndex * 0.1 }}
              className="mb-12"
            >
              {/* Month Header */}
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xl lg:text-2xl font-bold text-white capitalize" style={{ fontFamily: "var(--font-display)" }}>
                  {month}
                </h2>
                <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
              </div>

              {/* Events in this month */}
              <div className="space-y-4">
                {events.map((event, eventIndex) => (
                  <Link key={event.id} href={event.href}>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: eventIndex * 0.1 }}
                      className={`group relative rounded-2xl p-6 lg:p-8 border transition-all duration-300 cursor-pointer hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/5 ${
                        event.featured
                          ? "border-red-500/30"
                          : "border-white/[0.08]"
                      }`}
                      style={{ backgroundColor: event.featured ? "rgba(237,28,36,0.04)" : "rgba(255,255,255,0.02)" }}
                    >
                      {/* Featured badge */}
                      {event.featured && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full text-white" style={{ backgroundColor: "#ed1c24" }}>
                            À ne pas manquer
                          </span>
                        </div>
                      )}

                      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                        {/* Date Block */}
                        <div className="flex-shrink-0 w-20 h-20 rounded-xl flex flex-col items-center justify-center" style={{ backgroundColor: "rgba(237,28,36,0.1)" }}>
                          <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                            {new Date(event.date).getDate()}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>
                            {new Date(event.date).toLocaleDateString("fr-CA", { month: "short" })}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ color: "#ed1c24", backgroundColor: "rgba(237,28,36,0.1)", fontFamily: "var(--font-body)" }}>
                              {event.category}
                            </span>
                          </div>
                          <h3 className="text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                            {event.title}
                          </h3>
                          <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>
                            {event.description}
                          </p>

                          {/* Meta */}
                          <div className="flex flex-wrap items-center gap-4 mt-3">
                            <div className="flex items-center gap-1.5">
                              <MapPin size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
                              <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
                              <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>{event.dateDisplay}</span>
                            </div>
                            {event.time && (
                              <div className="flex items-center gap-1.5">
                                <Clock size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
                                <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>{event.time}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex-shrink-0 hidden lg:flex items-center">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white/[0.1] group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-all">
                            <ArrowRight size={16} className="text-white/40 group-hover:text-red-400 transition-colors" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Empty state if no events */}
          {EVENTS.length === 0 && (
            <div className="text-center py-20">
              <Calendar size={48} className="mx-auto mb-4" style={{ color: "rgba(255,255,255,0.2)" }} />
              <p className="text-lg text-white/50" style={{ fontFamily: "var(--font-body)" }}>
                Aucun événement à venir pour le moment.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
