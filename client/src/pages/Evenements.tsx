/* Page Événements — annonces à venir et archives, dans le style Club ADM. */
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Clock } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import {
  EVENTS, eventShortMonth, groupEventsByMonth, isPastEvent,
  type ClubEvent,
} from "@/data/events";

function EventCard({ event }: { event: ClubEvent }) {
  const day = event.date.split("-")[2];
  const content = (
    <article
      id={event.id}
      className={`group relative rounded-2xl p-6 lg:p-8 border transition-colors duration-200 ${
        event.featured ? "border-red-500/30" : "border-white/[0.08]"
      } ${event.href ? "hover:border-red-500/40" : ""}`}
      style={{ backgroundColor: event.featured ? "rgba(237,28,36,0.04)" : "rgba(255,255,255,0.02)" }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
        <div
          aria-hidden="true"
          className="shrink-0 w-20 h-20 rounded-xl flex flex-col items-center justify-center"
          style={{ backgroundColor: "rgba(237,28,36,0.1)" }}
        >
          {day ? (
            <span className="text-3xl text-white" style={{ fontFamily: "var(--font-display)" }}>
              {Number(day)}
            </span>
          ) : (
            <Calendar size={26} className="mb-1 text-white" />
          )}
          <span className="text-xs uppercase tracking-wider" style={{ color: "#ed1c24" }}>
            {eventShortMonth(event)}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded"
              style={{ color: "#ed1c24", backgroundColor: "rgba(237,28,36,0.1)" }}
            >
              {event.category}
            </span>
            {event.featured && (
              <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full text-white bg-[#ed1c24]">
                À ne pas manquer
              </span>
            )}
          </div>
          <h3
            className={`text-2xl lg:text-3xl leading-tight text-white mb-3 ${event.href ? "group-hover:text-red-400" : ""}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {event.title}
          </h3>
          <p className="text-base leading-relaxed text-white/65">{event.description}</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Calendar size={15} aria-hidden="true" className="shrink-0" />
              <span>{event.dateDisplay}</span>
            </div>
            {!day && <span className="text-xs text-white/55">Date exacte à confirmer</span>}
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin size={15} aria-hidden="true" className="shrink-0" />
                <span>{event.location}</span>
              </div>
            )}
            {event.time && (
              <div className="flex items-center gap-2">
                <Clock size={15} aria-hidden="true" />
                <span>{event.time}</span>
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 lg:max-w-[170px]">
          {event.href ? (
            <span
              className="inline-flex min-h-11 items-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white rounded-lg bg-[#ed1c24]"
            >
              Voir les détails <ArrowRight size={16} aria-hidden="true" />
            </span>
          ) : (
            <p className="inline-block text-sm text-white/65 border border-white/15 rounded-lg px-4 py-3">
              Détails et inscriptions à venir
            </p>
          )}
        </div>
      </div>
    </article>
  );

  return event.href ? (
    <Link href={event.href} className="block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ed1c24]">
      {content}
    </Link>
  ) : content;
}

function EventGroups({ events }: { events: ClubEvent[] }) {
  return (
    <div className="space-y-10 lg:space-y-12">
      {groupEventsByMonth(events).map(([month, monthEvents]) => (
        <motion.div
          key={month}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-5">
            <h2 className="text-2xl lg:text-3xl text-white capitalize" style={{ fontFamily: "var(--font-display)" }}>
              {month}
            </h2>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>
          <div className="space-y-4">
            {monthEvents.map(event => <EventCard key={event.id} event={event} />)}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Evenements() {
  const now = new Date();
  const upcoming = EVENTS.filter(event => !isPastEvent(event, now));
  const past = EVENTS.filter(event => isPastEvent(event, now));

  return (
    <div className="min-h-screen bg-[#0f1229] text-white" style={{ fontFamily: "var(--font-body)" }}>
      <PromoBanner />
      <Navbar />

      <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <p className="text-sm font-bold uppercase tracking-[0.15em] mb-4 text-[#ed1c24]">Club ADM Fitness</p>
            <h1 className="text-4xl lg:text-6xl leading-[0.9] mb-6" style={{ fontFamily: "var(--font-display)" }}>
              NOS <span className="text-[#ed1c24]">ÉVÉNEMENTS</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-white/65">
              Noël, golf, course et WOD en rose : découvre les prochains événements Club ADM.
              Les détails et les inscriptions seront annoncés au fur et à mesure.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28" aria-label="Événements à venir">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <EventGroups events={upcoming} />
          {upcoming.length === 0 && (
            <div className="text-center py-16">
              <Calendar size={48} className="mx-auto mb-4 text-white/25" aria-hidden="true" />
              <p className="text-lg text-white/60">Les prochains événements seront annoncés ici.</p>
            </div>
          )}
          {past.length > 0 && (
            <div className="mt-16 border-t border-white/10 pt-10">
              <p className="text-sm font-bold uppercase tracking-[0.15em] mb-6 text-white/55">Événements passés</p>
              <EventGroups events={past} />
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
