export interface ClubEvent {
  id: string;
  title: string;
  /** Date civile annoncée : AAAA-MM-JJ, ou AAAA-MM si le jour reste à confirmer. */
  date: string;
  dateDisplay: string;
  time?: string;
  location?: string;
  description: string;
  category: string;
  href?: string;
  featured?: boolean;
}

export const EVENTS: ClubEvent[] = [
  {
    id: "party-noel-adm-2026",
    title: "Party de Noël ADM",
    date: "2026-12-12",
    dateDisplay: "12 décembre 2026",
    description: "Le party de Noël ADM aura lieu le 12 décembre 2026. Les détails de la soirée et les modalités d’inscription seront annoncés prochainement.",
    category: "Vie de communauté",
    featured: true,
  },
  {
    id: "classic-adm-golf-2027",
    title: "Classic ADM — Tournoi de golf",
    date: "2027-08",
    dateDisplay: "Août 2027",
    description: "Le tournoi de golf Classic ADM est prévu en août 2027. La date exacte, le lieu et les modalités d’inscription seront annoncés prochainement.",
    category: "Golf",
  },
  {
    id: "marathon-club-adm-2027",
    title: "Marathon Club ADM",
    date: "2027-09",
    dateDisplay: "Septembre 2027",
    description: "Le Marathon Club ADM est prévu en septembre 2027. La date exacte, le parcours et les modalités d’inscription seront annoncés prochainement.",
    category: "Course",
  },
  // Fiche historique conservée telle quelle; les nouvelles annonces ne déplacent pas ses URL.
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
  },
];

/** Un mois sans jour reste à venir jusqu’à la fin du mois annoncé. */
export function isPastEvent(event: ClubEvent, now = new Date()): boolean {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const part = (type: string) => parts.find(p => p.type === type)!.value;
  const today = `${part("year")}-${part("month")}-${part("day")}`;
  return event.date < today.slice(0, event.date.length);
}

/** UTC évite qu’une date civile bascule à la veille selon le navigateur. */
export function eventMonthLabel(event: ClubEvent): string {
  const [year, month] = event.date.split("-").map(Number);
  return new Intl.DateTimeFormat("fr-CA", {
    year: "numeric", month: "long", timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

export function eventShortMonth(event: ClubEvent): string {
  const [year, month] = event.date.split("-").map(Number);
  return new Intl.DateTimeFormat("fr-CA", { month: "short", timeZone: "UTC" })
    .format(new Date(Date.UTC(year, month - 1, 1)));
}

export function groupEventsByMonth(events: ClubEvent[]): [string, ClubEvent[]][] {
  const groups = new Map<string, ClubEvent[]>();
  [...events].sort((a, b) => a.date.localeCompare(b.date)).forEach(event => {
    const key = eventMonthLabel(event);
    groups.set(key, [...(groups.get(key) ?? []), event]);
  });
  return Array.from(groups.entries());
}
