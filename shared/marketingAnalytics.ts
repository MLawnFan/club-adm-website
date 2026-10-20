import { z } from "zod";

export const MARKETING_EVENTS = ["page_view", "consultation_cta_click", "telephone_click", "service_decouvrir", "service_select", "video_start", "video_half", "consultation_form_start", "consultation_demande_confirmee", "quiz_start", "quiz_step", "quiz_complete", "checkout_start"] as const;
export const CLIENT_EVENTS = MARKETING_EVENTS.filter(e => e !== "consultation_demande_confirmee") as Exclude<typeof MARKETING_EVENTS[number], "consultation_demande_confirmee">[];
export const MARKETING_PAGES = ["/", "/programmes", "/horaire-prix", "/consultation-gratuite", "/en-ligne", "/contact", "/notre-equipe", "/blog", "/blog/article", "/evenements", "/online-project", "/online-project/resultat", "/online-project/programme", "/online-project/checkout", "/online-project/upsell"] as const;
export const SERVICES = ["hybrid", "groupe", "semi-prive", "hyrox", "en-ligne", "rstart", "nutrition"] as const;
export const SOURCES = ["direct", "google", "facebook", "instagram", "email", "referral", "other"] as const;
export const marketingEventSchema = z.object({
  eventId: z.string().uuid(), visitId: z.string().uuid(), visitorId: z.string().uuid(),
  name: z.enum(MARKETING_EVENTS), page: z.enum(MARKETING_PAGES),
  device: z.enum(["mobile", "tablet", "desktop"]), source: z.enum(SOURCES),
  campaign: z.string().regex(/^[a-z0-9_-]{0,60}$/).default(""),
  service: z.enum(SERVICES).optional(),
  placement: z.enum(["navbar", "hero", "services", "footer", "content", "online", "other"]).optional(),
  video: z.enum(["hybrid", "groupe", "semi-prive", "hyrox", "ma", "fares", "anne", "online-main"]).optional(),
  step: z.number().int().min(1).max(4).optional(),
}).strict();
export type MarketingEvent = z.infer<typeof marketingEventSchema>;
export type MarketingRow = MarketingEvent & { occurredAt: number };
export function marketingPage(path: string) {
  const clean = path.split(/[?#]/)[0];
  if (clean.startsWith("/blog/")) return "/blog/article" as const;
  return MARKETING_PAGES.includes(clean as any) ? clean as typeof MARKETING_PAGES[number] : null;
}
export function productionHost(host: string) {
  return ["clubadmfit-fcpqjdnn.manus.space", "clubadm.com", "www.clubadm.com"].includes(host.toLowerCase());
}
export function trafficSource(utm: string | null, referrer: string) {
  const s = (utm || "").toLowerCase();
  if (["meta", "facebook", "fb"].includes(s)) return "facebook" as const;
  if (["instagram", "ig"].includes(s)) return "instagram" as const;
  if (["email", "newsletter", "ghl"].includes(s)) return "email" as const;
  if (s === "google") return "google" as const;
  if (s) return "other" as const;
  try {
    const host = new URL(referrer).hostname;
    if (productionHost(host)) return "direct" as const;
    if (/(^|\.)google\.[a-z.]+$/.test(host)) return "google" as const;
    if (/(^|\.)(facebook|fb)\.com$/.test(host)) return "facebook" as const;
    if (/(^|\.)instagram\.com$/.test(host)) return "instagram" as const;
    return "referral" as const;
  } catch { return "direct" as const; }
}
export function safeCampaign(value: string | null) {
  return value && /^[a-z0-9_-]{1,60}$/.test(value) ? value : "";
}
export const TIME_ZONE = "America/Toronto";
export function localDate(now = Date.now()) {
  const p = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const v = (k: string) => p.find(x => x.type === k)?.value;
  return `${v("year")}-${v("month")}-${v("day")}`;
}
export function shiftDate(date: string, days: number) {
  const d = new Date(`${date}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}
export function midnight(date: string) {
  const target = Date.parse(`${date}T00:00:00Z`);
  let result = target;
  for (let i = 0; i < 3; i++) {
    const p = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).formatToParts(result);
    const v = (k: string) => Number(p.find(x => x.type === k)?.value);
    const displayed = Date.UTC(v("year"), v("month") - 1, v("day"), v("hour"), v("minute"), v("second"));
    result += target - displayed;
  }
  return result;
}
export function reportRange(days: number, now = Date.now()) {
  const endDate = localDate(now), startDate = shiftDate(endDate, -days);
  return { start: midnight(startDate), end: midnight(endDate), startDate, endDate: shiftDate(endDate, -1) };
}
const rate = (n: number, d: number) => d ? Math.round(n / d * 1000) / 10 : null;
function funnel(rows: MarketingRow[], names: string[]) {
  const visits = new Map<string, MarketingRow[]>();
  for (const row of rows) { const list = visits.get(row.visitId) || []; list.push(row); visits.set(row.visitId, list); }
  const counts = names.map(() => 0);
  for (const list of Array.from(visits.values())) {
    let step = 0, last = 0;
    for (const r of list.sort((a, b) => a.occurredAt - b.occurredAt)) {
      if (r.name !== names[step]) continue;
      if (step > 0 && r.occurredAt - last > 60 * 60 * 1000) continue;
      counts[step]++; last = r.occurredAt; step++;
      if (step === names.length) break;
    }
  }
  return names.map((name, i) => ({ name, visits: counts[i], completion: i ? rate(counts[i], counts[i - 1]) : null }));
}
export function summarizeMarketing(rows: MarketingRow[]) {
  const pages = rows.filter(r => r.name === "page_view");
  const visitors = new Set(pages.map(r => r.visitorId)).size;
  const measuredVisits = new Set(pages.map(r => r.visitId));
  const visits = measuredVisits.size;
  const conversionVisits = new Set(rows.filter(r => r.name === "consultation_demande_confirmee" && measuredVisits.has(r.visitId)).map(r => r.visitId)).size;
  const counts = Object.fromEntries(MARKETING_EVENTS.map(name => [name, new Set(rows.filter(r => r.name === name).map(r => r.visitId)).size])) as Record<typeof MARKETING_EVENTS[number], number>;
  const group = (field: "page" | "source" | "device" | "service") => {
    const values = Array.from(new Set(rows.map(r => r[field]).filter(Boolean)));
    return values.map(key => {
      const pageRows = pages.filter(r => r[field] === key), all = rows.filter(r => r[field] === key);
      return { key: key!, views: pageRows.length, visits: new Set(pageRows.map(r => r.visitId)).size, clicks: new Set(all.filter(r => r.name === "consultation_cta_click" || r.name === "service_decouvrir").map(r => r.visitId)).size, requests: new Set(all.filter(r => r.name === "consultation_demande_confirmee").map(r => r.visitId)).size };
    }).sort((a, b) => b.views - a.views || b.clicks - a.clicks);
  };
  const campaigns = Array.from(new Set(rows.map(r => r.campaign).filter(Boolean))).map(campaign => ({ campaign, visits: new Set(pages.filter(r => r.campaign === campaign).map(r => r.visitId)).size, requests: new Set(rows.filter(r => r.campaign === campaign && r.name === "consultation_demande_confirmee").map(r => r.visitId)).size }));
  return { visitors, visits, conversionVisits, views: pages.length, counts, consultationRate: rate(conversionVisits, visits), pages: group("page"), sources: group("source"), devices: group("device"), services: group("service"), campaigns, consultationFunnel: funnel(rows, ["consultation_form_start", "consultation_demande_confirmee"]), onlineFunnel: funnel(rows, ["quiz_start", "quiz_complete", "checkout_start"]) };
}
