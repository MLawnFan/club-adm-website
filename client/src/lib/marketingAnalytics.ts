import { marketingEventSchema, marketingPage, productionHost, safeCampaign, trafficSource, type MarketingEvent, SERVICES } from "@shared/marketingAnalytics";

type Sender = (event: MarketingEvent) => Promise<unknown>;
let sender: Sender | null = null;
let internal = true;
let loadPromise: Promise<void> | null = null;
const CONSENT_KEY = "adm-analytics-consent-v1";
const VISITOR_KEY = "adm-anonymous-visitor-v1";
const VISIT_KEY = "adm-marketing-visit-v1";
const listeners = new Set<() => void>();
export function subscribeAnalytics(listener: () => void) { listeners.add(listener); window.addEventListener("storage", listener); return () => { listeners.delete(listener); window.removeEventListener("storage", listener); }; }
export function analyticsConsent(): "accepted" | "rejected" | null {
  try { const c = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null"); return c && Date.now() - c.at < 180 * 86400000 && ["accepted", "rejected"].includes(c.choice) ? c.choice : null; } catch { return null; }
}
export function chooseAnalytics(choice: "accepted" | "rejected") {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice, at: Date.now() }));
    if (choice === "rejected") { localStorage.removeItem(VISITOR_KEY); sessionStorage.removeItem(VISIT_KEY); }
  } catch { /* If storage is blocked, tracking remains disabled. */ }
  listeners.forEach(fn => fn());
}
export function configureMarketing(send: Sender, exclude: boolean) { sender = send; internal = exclude; }
export function canTrack() {
  return !internal && productionHost(window.location.hostname) && analyticsConsent() === "accepted" && navigator.doNotTrack !== "1" && !(navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl;
}
export function analyticsContext() {
  if (!canTrack()) return undefined;
  const page = marketingPage(window.location.pathname); if (!page) return undefined;
  try {
    const now = Date.now();
    let visitor = JSON.parse(localStorage.getItem(VISITOR_KEY) || "null");
    if (!visitor || now - visitor.at > 30 * 86400000) { visitor = { id: crypto.randomUUID(), at: now }; localStorage.setItem(VISITOR_KEY, JSON.stringify(visitor)); }
    let visit = JSON.parse(sessionStorage.getItem(VISIT_KEY) || "null");
    if (!visit || now - visit.last > 30 * 60000) {
      const params = new URLSearchParams(window.location.search);
      visit = { id: crypto.randomUUID(), last: now, source: trafficSource(params.get("utm_source"), document.referrer), campaign: safeCampaign(params.get("utm_campaign")) };
    }
    visit.last = now; sessionStorage.setItem(VISIT_KEY, JSON.stringify(visit));
    return { page, visitorId: visitor.id, visitId: visit.id, device: window.innerWidth < 768 ? "mobile" as const : window.innerWidth < 1024 ? "tablet" as const : "desktop" as const, source: visit.source, campaign: visit.campaign, ...(SERVICES.includes(visit.service) ? { service: visit.service } : {}) };
  } catch { return undefined; }
}
async function loadUmami() {
  if (loadPromise) return loadPromise;
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT, website = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
  if (!endpoint || !website) return;
  loadPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script"); s.id = "adm-umami"; s.src = `${endpoint.replace(/\/$/, "")}/umami`; s.defer = true;
    s.dataset.websiteId = website; s.dataset.autoTrack = "false"; s.dataset.excludeSearch = "true"; s.dataset.excludeHash = "true"; s.dataset.doNotTrack = "true";
    s.onload = () => resolve(); s.onerror = () => { s.remove(); loadPromise = null; reject(new Error("Umami unavailable")); };
    document.head.appendChild(s);
  });
  return loadPromise;
}
type SafeDetails = Pick<MarketingEvent, "service" | "placement" | "video" | "step">;
export function trackMarketing(name: MarketingEvent["name"], details: SafeDetails = {}, options: { umamiOnly?: boolean } = {}) {
  const context = analyticsContext(); if (!context) return;
  const result = marketingEventSchema.safeParse({ ...context, ...details, name, eventId: crypto.randomUUID() });
  if (!result.success) return;
  const event = result.data;
  if (name === "service_decouvrir" && details.service) {
    try { const v = JSON.parse(sessionStorage.getItem(VISIT_KEY) || "null"); if (v) { v.service = details.service; sessionStorage.setItem(VISIT_KEY, JSON.stringify(v)); } } catch {}
  }
  if (!options.umamiOnly && name !== "consultation_demande_confirmee") void sender?.(event).catch(() => {});
  void loadUmami().then(() => {
    if (!canTrack() || !marketingPage(window.location.pathname)) return;
    const umami = (window as any).umami;
    if (!umami?.track) return;
    // Never spread default properties: they can include private query strings, titles or referrers.
    const payload: Record<string, unknown> = { website: import.meta.env.VITE_ANALYTICS_WEBSITE_ID, hostname: window.location.hostname, url: event.page, title: "Club ADM Fitness", language: "fr", screen: `${window.screen.width}x${window.screen.height}`, referrer: "" };
    if (name !== "page_view") { payload.name = name; payload.data = { source: event.source, campaign: event.campaign, device: event.device, ...details }; }
    return umami.track(payload);
  }).catch(() => {});
}

export function installInteractionTracking() {
  const started = new WeakSet<HTMLVideoElement>(), half = new WeakSet<HTMLVideoElement>();
  const clicked = (e: MouseEvent) => {
    if (!(e.target instanceof Element)) return;
    const a = e.target.closest<HTMLAnchorElement>("a[href]"); if (!a) return;
    if (a.hasAttribute("data-service-discover")) { trackMarketing("service_decouvrir", { service: a.dataset.marketingService as any, placement: "services" }); return; }
    if (a.getAttribute("href")?.startsWith("tel:")) { trackMarketing("telephone_click", { placement: "content" }); return; }
    let dest: URL; try { dest = new URL(a.href, location.origin); } catch { return; }
    if (dest.origin !== location.origin || dest.pathname !== "/consultation-gratuite") return;
    const placement = a.closest("nav") ? "navbar" : a.closest("footer") ? "footer" : a.closest("[data-marketing-hero]") ? "hero" : "content";
    trackMarketing("consultation_cta_click", { placement });
  };
  const media = (e: Event) => {
    if (!(e.target instanceof HTMLVideoElement) || e.target.autoplay || !e.target.dataset.marketingVideo || !canTrack()) return;
    const v = e.target, video = v.dataset.marketingVideo as any;
    if (e.type === "play" && !started.has(v)) { started.add(v); trackMarketing("video_start", { video }); }
    if (e.type === "timeupdate" && started.has(v) && !half.has(v) && Number.isFinite(v.duration) && v.currentTime >= v.duration / 2) { half.add(v); trackMarketing("video_half", { video }); }
  };
  document.addEventListener("click", clicked, true); document.addEventListener("play", media, true); document.addEventListener("timeupdate", media, true);
  return () => { document.removeEventListener("click", clicked, true); document.removeEventListener("play", media, true); document.removeEventListener("timeupdate", media, true); };
}

const purchaseLocks = new Set<string>();
export async function trackVerifiedUmamiPurchase(summary: { checkoutSessionId: string; product: string | null; accessGranted: boolean; paymentStatus: string | null; checkoutStatus: string | null; amountTotal: number | null; currency: string | null; livemode: boolean }) {
  if (!canTrack() || !summary.livemode || !summary.checkoutSessionId.startsWith("cs_live_") || summary.product !== "programme" || !summary.accessGranted || summary.paymentStatus !== "paid" || summary.checkoutStatus !== "complete" || summary.amountTotal === null || !Number.isFinite(summary.amountTotal) || summary.amountTotal <= 0 || !summary.currency || !/^[a-z]{3}$/i.test(summary.currency)) return;
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(summary.checkoutSessionId));
  const key = `adm-umami-purchase:${Array.from(new Uint8Array(bytes)).map(v => v.toString(16).padStart(2, "0")).join("")}`;
  try { if (purchaseLocks.has(key) || localStorage.getItem(key)) return; } catch { return; }
  purchaseLocks.add(key);
  try {
    await loadUmami();
    if (!canTrack()) return;
    const tracker = (window as any).umami;
    if (!tracker?.track) return;
    await tracker.track({ website: import.meta.env.VITE_ANALYTICS_WEBSITE_ID, hostname: window.location.hostname, url: "/online-project/merci", title: "Club ADM Fitness", referrer: "", name: "purchase_confirmed", data: { revenue: summary.amountTotal / 100, currency: summary.currency.toUpperCase() } });
    localStorage.setItem(key, "1");
  } catch { /* Optional metrics must not block access or claim successful delivery. */ }
  finally { purchaseLocks.delete(key); }
}
