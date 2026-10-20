import { beforeEach, describe, expect, it, vi } from "vitest";
import { webcrypto } from "node:crypto";
import { analyticsConsent, chooseAnalytics, canTrack, configureMarketing, analyticsContext, trackMarketing } from "../client/src/lib/marketingAnalytics";
const local = new Map<string, string>(), session = new Map<string, string>();
const storage = (map: Map<string, string>) => ({ getItem: (k: string) => map.get(k) ?? null, setItem: (k: string, v: string) => map.set(k, v), removeItem: (k: string) => map.delete(k) });
let send: ReturnType<typeof vi.fn>, umami: ReturnType<typeof vi.fn>;
beforeEach(() => {
  local.clear(); session.clear(); send = vi.fn().mockResolvedValue({ recorded: true }); umami = vi.fn().mockResolvedValue({});
  vi.stubEnv("VITE_ANALYTICS_ENDPOINT", "https://analytics.example"); vi.stubEnv("VITE_ANALYTICS_WEBSITE_ID", "test-website");
  vi.stubGlobal("crypto", webcrypto);
  vi.stubGlobal("localStorage", storage(local)); vi.stubGlobal("sessionStorage", storage(session));
  vi.stubGlobal("navigator", { doNotTrack: "0", globalPrivacyControl: false });
  vi.stubGlobal("window", { location: { hostname: "clubadm.com", pathname: "/", search: "?courriel=private@example.com&objectif=confidentiel&utm_source=meta&utm_campaign=hybrid_octobre" }, innerWidth: 375, screen: { width: 375, height: 812 }, umami: { track: umami } });
  vi.stubGlobal("document", { referrer: "https://other.example/?email=private@example.com", createElement: () => ({ dataset: {}, remove() {} }), head: { appendChild: (s: { onload: () => void }) => queueMicrotask(() => s.onload()) } });
  configureMarketing(send, false);
});

describe("Suivi client: confidentialité et consentement", () => {
  it("ne collecte rien par défaut", () => {
    expect(analyticsConsent()).toBeNull(); expect(canTrack()).toBe(false);
    trackMarketing("page_view"); expect(send).not.toHaveBeenCalled();
    expect(local.size).toBe(0); expect(session.size).toBe(0);
  });
  it("ne collecte rien après un refus", () => {
    chooseAnalytics("rejected"); trackMarketing("quiz_start");
    expect(send).not.toHaveBeenCalled(); expect(session.size).toBe(0);
  });
  it("respecte DNT et Global Privacy Control", () => {
    chooseAnalytics("accepted"); (navigator as any).doNotTrack = "1"; expect(canTrack()).toBe(false);
    (navigator as any).doNotTrack = "0"; (navigator as any).globalPrivacyControl = true; expect(canTrack()).toBe(false);
  });
  it("exclut les administrateurs, previews et questionnaires membres", () => {
    chooseAnalytics("accepted"); configureMarketing(send, true); expect(canTrack()).toBe(false);
    configureMarketing(send, false); window.location.hostname = "3000-preview.manus.computer"; expect(canTrack()).toBe(false);
    window.location.hostname = "clubadm.com"; window.location.pathname = "/espace-membre/nutrition";
    expect(analyticsContext()).toBeUndefined(); trackMarketing("quiz_start"); expect(send).not.toHaveBeenCalled();
  });
  it("ne transmet ni courriel, ni réponses, ni paramètres sensibles ou referrer brut", async () => {
    chooseAnalytics("accepted"); trackMarketing("quiz_step", { step: 2 });
    await vi.waitFor(() => expect(umami).toHaveBeenCalled());
    const own = JSON.stringify(send.mock.calls), external = JSON.stringify(umami.mock.calls);
    expect(own).not.toContain("private@example.com"); expect(own).not.toContain("confidentiel");
    expect(external).not.toContain("private@example.com"); expect(external).not.toContain("other.example");
    expect(umami.mock.calls[0][0]).toMatchObject({ url: "/", name: "quiz_step", referrer: "", data: { step: 2 } });
  });
  it("conserve la source et le dernier service découvert sans réponse de santé", () => {
    chooseAnalytics("accepted"); trackMarketing("service_decouvrir", { service: "hybrid", placement: "services" });
    const c = analyticsContext(); expect(c?.source).toBe("facebook"); expect(c?.campaign).toBe("hybrid_octobre"); expect(c?.service).toBe("hybrid");
    expect(c).not.toHaveProperty("email"); expect(c).not.toHaveProperty("objectif");
  });
  it("révoque le suivi et retire les identifiants analytiques", () => {
    chooseAnalytics("accepted"); expect(analyticsContext()).toBeDefined();
    chooseAnalytics("rejected"); expect(canTrack()).toBe(false); expect(analyticsContext()).toBeUndefined();
    expect(local.has("adm-anonymous-visitor-v1")).toBe(false); expect(session.size).toBe(0);
  });
});
