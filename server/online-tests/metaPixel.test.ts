import { webcrypto } from "node:crypto";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

const paid = {
  checkoutSessionId: "cs_live_actual_purchase_123",
  product: "programme", accessGranted: true, paymentStatus: "paid", checkoutStatus: "complete",
  amountTotal: 2900, currency: "cad", livemode: true,
};

let store: Map<string, string>;
let appendChild: ReturnType<typeof vi.fn>;
let fbq: ReturnType<typeof vi.fn>;
function accept() { store.set("adm-meta-consent-v1", JSON.stringify({ choice: "accepted", at: Date.now() })); }
beforeEach(() => {
  vi.resetModules();
  store = new Map();
  const location = Object.assign(new URL("https://clubadm.example/online-project/merci?session_id=cs_live_secret&courriel=anne%40example.com"), { reload: vi.fn() });
  const history = {
    state: null as Record<string, unknown> | null,
    pushState(state: Record<string, unknown>, _unused: string, input?: string | URL | null) { this.state = state; if (input) location.href = String(input); },
    replaceState(state: Record<string, unknown>, _unused: string, input?: string | URL | null) { this.state = state; if (input) location.href = String(input); },
  };
  fbq = vi.fn();
  appendChild = vi.fn();
  vi.stubGlobal("window", { location, history, fbq, dispatchEvent: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn() });
  vi.stubGlobal("localStorage", { getItem: (key: string) => store.get(key) ?? null, setItem: (key: string, value: string) => store.set(key, value) });
  vi.stubGlobal("document", { referrer: "", head: { appendChild }, createElement: () => ({}), cookie: "" });
  vi.stubGlobal("crypto", webcrypto);
});
afterEach(() => vi.unstubAllGlobals());

describe("Pixel Meta Club ADM", () => {
  it("ne charge rien et n’envoie rien avant consentement ou après refus", async () => {
    const pixel = await import("@/online/lib/metaPixel");
    pixel.trackMetaPageView("/online-project");
    await pixel.trackMetaPurchase(paid);
    expect(appendChild).not.toHaveBeenCalled();
    expect(fbq).not.toHaveBeenCalled();
    pixel.setAdvertisingConsent("rejected");
    fbq.mockClear();
    pixel.trackMetaPageView("/online-project");
    expect(appendChild).not.toHaveBeenCalled();
    expect(fbq).not.toHaveBeenCalled();
  });
  it("charge une seule fois le bon Pixel en mode manuel et nettoie l’URL", async () => {
    accept();
    const pixel = await import("@/online/lib/metaPixel");
    pixel.trackMetaPageView("/online-project");
    pixel.trackMetaPageView("/online-project");
    expect(window.location.search).toBe("");
    expect(appendChild).toHaveBeenCalledTimes(1);
    expect(fbq).toHaveBeenCalledWith("set", "autoConfig", false, "702064657485858");
    expect(fbq).toHaveBeenCalledWith("init", "702064657485858");
    expect(fbq.mock.calls.filter(args => args[2] === "PageView")).toHaveLength(1);
  });
  it("bloque un référent entrant qui contient des réponses ou coordonnées", async () => {
    accept();
    document.referrer = "https://clubadm.example/resultat?objectif=perte-poids&prenom=Anne";
    const pixel = await import("@/online/lib/metaPixel");
    pixel.trackMetaPageView("/online-project");
    expect(appendChild).not.toHaveBeenCalled();
  });
  it("ignore les pages de détails d’achat et les routes inconnues", async () => {
    accept();
    const pixel = await import("@/online/lib/metaPixel");
    pixel.trackMetaPageView("/online-project/mes-achats");
    pixel.trackMetaPageView("/inconnue");
    expect(appendChild).not.toHaveBeenCalled();
  });
  it("mesure le montant réellement payé et dédoublonne les appels simultanés et répétés", async () => {
    accept();
    const pixel = await import("@/online/lib/metaPixel");
    await Promise.all([pixel.trackMetaPurchase(paid), pixel.trackMetaPurchase(paid)]);
    await pixel.trackMetaPurchase(paid);
    const purchases = fbq.mock.calls.filter(args => args[2] === "Purchase");
    expect(purchases).toHaveLength(1);
    expect(purchases[0][3]).toMatchObject({ value: 29, currency: "CAD" });
    expect(purchases[0][4]).toEqual({ eventID: expect.stringMatching(/^adm_purchase_[a-f0-9]{64}$/) });
    expect(JSON.stringify(purchases)).not.toContain("cs_live_");
    expect(JSON.stringify(purchases)).not.toContain("anne");
  });
  it("déduplique aussi une visite ultérieure dans le même navigateur", async () => {
    accept();
    let pixel = await import("@/online/lib/metaPixel");
    await pixel.trackMetaPurchase(paid);
    vi.resetModules();
    pixel = await import("@/online/lib/metaPixel");
    await pixel.trackMetaPurchase(paid);
    expect(fbq.mock.calls.filter(args => args[2] === "Purchase")).toHaveLength(1);
  });
  it.each([
    { livemode: false }, { checkoutSessionId: "cs_test_123" }, { paymentStatus: "unpaid" },
    { checkoutStatus: "open" }, { accessGranted: false }, { product: "community_founder" },
    { amountTotal: 0 }, { amountTotal: null }, { amountTotal: NaN }, { currency: null },
    { currency: "invalid" },
  ])("ne compte pas un test, un essai gratuit ou un achat non confirmé : %j", async (override) => {
    accept();
    const pixel = await import("@/online/lib/metaPixel");
    await pixel.trackMetaPurchase({ ...paid, ...override });
    expect(fbq.mock.calls.filter(args => args[2] === "Purchase")).toHaveLength(0);
  });
  it("ne mesure InitiateCheckout que pour une session réelle, jamais comme Purchase", async () => {
    accept();
    const pixel = await import("@/online/lib/metaPixel");
    await pixel.trackMetaInitiateCheckout("cs_test_example");
    expect(fbq).not.toHaveBeenCalled();
    await pixel.trackMetaInitiateCheckout("cs_live_checkout_example");
    expect(fbq.mock.calls.filter(args => args[2] === "InitiateCheckout")).toHaveLength(1);
    expect(fbq.mock.calls.filter(args => args[2] === "Purchase")).toHaveLength(0);
  });
  it("redemande un consentement expiré et refuse une préférence invalide", async () => {
    const pixel = await import("@/online/lib/metaPixel");
    store.set(pixel.CONSENT_KEY, JSON.stringify({ choice: "accepted", at: 0 }));
    expect(pixel.getAdvertisingConsent()).toBe(null);
    store.set(pixel.CONSENT_KEY, "invalid");
    expect(pixel.getAdvertisingConsent()).toBe(null);
  });
  it("révoque le suivi et recharge sans SDK après retrait du consentement", async () => {
    accept();
    const pixel = await import("@/online/lib/metaPixel");
    pixel.trackMetaPageView("/online-project");
    pixel.setAdvertisingConsent("rejected");
    expect(fbq).toHaveBeenCalledWith("consent", "revoke");
    expect(window.location.reload).toHaveBeenCalledOnce();
    expect(pixel.getAdvertisingConsent()).toBe("rejected");
  });
});
