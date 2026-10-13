import { installPrivateNavigation } from "./pageParameters";

export const META_PIXEL_ID = "702064657485858";
export const CONSENT_KEY = "adm-meta-consent-v1";
const CONSENT_EVENT = "adm-meta-consent-changed";
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
type Consent = "accepted" | "rejected" | null;
type PixelFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push?: PixelFunction;
  loaded?: boolean;
  version?: string;
};
declare global {
  interface Window { fbq?: PixelFunction; _fbq?: PixelFunction; }
}
let initialized = false;
let lastPage: string | null = null;
const sentEvents = new Set<string>();
const inFlight = new Set<string>();
const TRACKED_PAGES = new Set(["/online-project", "/online-project/programme", "/online-project/resultat", "/online-project/checkout", "/online-project/merci", "/online-project/upsell", "/online-project/communaute-confirmee", "/online-project/merci-programme"]);

export function getAdvertisingConsent(): Consent {
  try {
    const saved = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
    if (saved && Date.now() - saved.at < MAX_AGE && (saved.choice === "accepted" || saved.choice === "rejected")) return saved.choice;
  } catch { /* No storage or invalid data means no consent. */ }
  return null;
}

export function subscribeAdvertisingConsent(listener: () => void) {
  window.addEventListener(CONSENT_EVENT, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(CONSENT_EVENT, listener);
    window.removeEventListener("storage", listener);
  };
}

export function setAdvertisingConsent(choice: Exclude<Consent, null>) {
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice, at: Date.now() })); } catch { /* Fail closed if consent cannot be saved. */ }
  if (choice === "rejected") {
    window.fbq?.("consent", "revoke");
    // Remove only Meta's advertising cookies, never Stripe/authentication cookies.
    const parts = window.location.hostname.split(".");
    for (const cookie of ["_fbp", "_fbc"]) {
      document.cookie = `${cookie}=; Max-Age=0; Path=/; SameSite=Lax`;
      for (let i = 0; i < parts.length - 1; i++) {
        document.cookie = `${cookie}=; Max-Age=0; Path=/; Domain=.${parts.slice(i).join(".")}; SameSite=Lax`;
      }
    }
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
  // A loaded third-party SDK cannot be unloaded: reload after withdrawal to remove it.
  if (choice === "rejected" && initialized) window.location.reload();
}

export function initializeMetaPixel(): boolean {
  if (!(window.location.pathname === "/online-project" || window.location.pathname.startsWith("/online-project/"))) return false;
  if (getAdvertisingConsent() !== "accepted") return false;
  if (initialized) return true;
  installPrivateNavigation();
  // Legacy incoming links can have sensitive referrers. Do not load the SDK on them.
  if (document.referrer) {
    try {
      const referrer = new URL(document.referrer);
      if (Array.from(referrer.searchParams.keys()).some(key => ["objectif", "activite", "defi", "prenom", "courriel", "email", "session_id", "achat"].includes(key))) return false;
    } catch { return false; }
  }
  if (!window.fbq) {
    const pixel: PixelFunction = Object.assign((...args: unknown[]) => {
      if (pixel.callMethod) pixel.callMethod(...args);
      else pixel.queue.push(args);
    }, { queue: [] as unknown[][], loaded: true, version: "2.0" });
    pixel.push = pixel;
    window.fbq = pixel;
    window._fbq = pixel;
  }
  window.fbq("consent", "grant");
  window.fbq("set", "autoConfig", false, META_PIXEL_ID);
  window.fbq("init", META_PIXEL_ID); // No name, email, health data or advanced matching.
  const script = document.createElement("script");
  script.id = "adm-meta-pixel";
  script.async = true;
  script.referrerPolicy = "no-referrer";
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  initialized = true;
  return true;
}

export function trackMetaPageView(path: string) {
  if (!TRACKED_PAGES.has(path) || !initializeMetaPixel() || lastPage === path) return;
  lastPage = path;
  window.fbq!("trackSingle", META_PIXEL_ID, "PageView");
  if (path === "/online-project/programme" || path === "/online-project/resultat") {
    window.fbq!("trackSingle", META_PIXEL_ID, "ViewContent", { content_ids: ["adm_programme"], content_type: "product" });
  }
}

type PurchaseSummary = {
  checkoutSessionId: string;
  product: string | null;
  accessGranted: boolean;
  paymentStatus: string | null;
  checkoutStatus: string | null;
  amountTotal: number | null;
  currency: string | null;
  livemode: boolean;
};

export function getMetaPurchase(summary: PurchaseSummary) {
  if (!summary.livemode || !summary.checkoutSessionId.startsWith("cs_live_") || summary.product !== "programme" || !summary.accessGranted || summary.paymentStatus !== "paid" || summary.checkoutStatus !== "complete" || summary.amountTotal === null || !Number.isFinite(summary.amountTotal) || summary.amountTotal <= 0 || !summary.currency || !/^[a-z]{3}$/i.test(summary.currency)) return null;
  return { value: summary.amountTotal / 100, currency: summary.currency.toUpperCase(), content_ids: ["adm_programme"], content_type: "product", num_items: 1 };
}

async function trackOnce(event: "Purchase" | "InitiateCheckout", sessionId: string, parameters: Record<string, unknown>) {
  if (!initializeMetaPixel() || inFlight.has(`${event}:${sessionId}`)) return;
  const lock = `${event}:${sessionId}`;
  inFlight.add(lock);
  try {
    const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${META_PIXEL_ID}:${event}:${sessionId}`));
    const hash = Array.from(new Uint8Array(bytes)).map(byte => byte.toString(16).padStart(2, "0")).join("");
    const eventId = `adm_${event.toLowerCase()}_${hash}`;
    const key = `adm-meta-sent:${eventId}`;
    let alreadySent = sentEvents.has(key);
    try { alreadySent ||= localStorage.getItem(key) === "1"; } catch { /* In-memory deduplication remains available. */ }
    if (alreadySent || getAdvertisingConsent() !== "accepted") return;
    window.fbq!("trackSingle", META_PIXEL_ID, event, parameters, { eventID: eventId });
    sentEvents.add(key);
    try { localStorage.setItem(key, "1"); } catch { /* No raw Stripe ID is stored. */ }
  } catch { /* Tracking must never block payment or confirmation. */ }
  finally { inFlight.delete(lock); }
}

export async function trackMetaPurchase(summary: PurchaseSummary) {
  const parameters = getMetaPurchase(summary);
  if (parameters) await trackOnce("Purchase", summary.checkoutSessionId, parameters);
}

export async function trackMetaInitiateCheckout(sessionId: string) {
  if (sessionId.startsWith("cs_live_")) await trackOnce("InitiateCheckout", sessionId, { content_ids: ["adm_programme"], content_type: "product", num_items: 1 });
}
