import { beforeEach, describe, expect, it, vi } from "vitest";
import { randomUUID } from "node:crypto";
const mocks = vi.hoisted(() => ({ getDb: vi.fn(), notify: vi.fn(), report: vi.fn() }));
vi.mock("./db", () => ({ getDb: mocks.getDb }));
vi.mock("./_core/notification", () => ({ notifyOwner: mocks.notify }));
vi.mock("./marketingReport", async importOriginal => ({ ...(await importOriginal<typeof import("./marketingReport")>()), getMarketingReport: mocks.report }));
import { marketingRouter, consultationInput } from "./routers/marketing";
import { recordVerifiedPurchase } from "./marketingReport";
import type { TrpcContext } from "./_core/context";
import type { PaymentSummary } from "./online/payments";

function ctx(role: "admin" | "user" | null = null, origin = "https://clubadm.com"): TrpcContext {
  return { user: role ? { id: 1, role, openId: "test", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date(), name: "Test", email: null, loginMethod: "test" } : null, req: { headers: { origin }, ip: randomUUID() }, res: {} } as TrpcContext;
}
const event = () => ({ eventId: randomUUID(), visitorId: randomUUID(), visitId: randomUUID(), name: "page_view" as const, page: "/" as const, source: "direct" as const, campaign: "", device: "mobile" as const });
const lead = () => ({ submissionId: randomUUID(), firstName: "Test", lastName: "Fictif", email: "test@example.com", phone: "4506002448", location: "Brossard" as const, contactConsent: true as const, website: "" });
let values: ReturnType<typeof vi.fn>, duplicate: ReturnType<typeof vi.fn>;
beforeEach(() => {
  vi.clearAllMocks(); vi.stubEnv("NODE_ENV", "production");
  duplicate = vi.fn().mockResolvedValue([{ affectedRows: 1 }]); values = vi.fn().mockReturnValue({ onDuplicateKeyUpdate: duplicate });
  mocks.getDb.mockResolvedValue({ insert: vi.fn().mockReturnValue({ values }), select: vi.fn().mockReturnValue({ from: vi.fn().mockReturnValue({ where: vi.fn().mockReturnValue({ limit: vi.fn().mockResolvedValue([]) }) }) }) });
  mocks.notify.mockResolvedValue(true); mocks.report.mockResolvedValue({ source: "test" });
});

describe("Marketing: protection et réception réelle", () => {
  it("refuse le rapport à un anonyme et à un membre", async () => {
    await expect(marketingRouter.createCaller(ctx()).report({ days: 7 })).rejects.toThrow();
    await expect(marketingRouter.createCaller(ctx("user")).report({ days: 7 })).rejects.toThrow("réservé");
    expect(mocks.report).not.toHaveBeenCalled();
  });
  it("autorise uniquement le rapport administrateur", async () => {
    await expect(marketingRouter.createCaller(ctx("admin")).report({ days: 7 })).resolves.toEqual({ source: "test" });
    expect(mocks.report).toHaveBeenCalledWith(7);
  });
  it("exclut les administrateurs et l’aperçu des événements", async () => {
    await expect(marketingRouter.createCaller(ctx("admin")).record(event())).resolves.toEqual({ recorded: false });
    await expect(marketingRouter.createCaller(ctx(null, "https://3000-preview.manus.computer")).record(event())).resolves.toEqual({ recorded: false });
    vi.stubEnv("NODE_ENV", "development");
    await expect(marketingRouter.createCaller(ctx()).record(event())).resolves.toEqual({ recorded: false });
    expect(values).not.toHaveBeenCalled();
  });
  it("interdit les faux événements de demande confirmée envoyés par le client", async () => {
    await expect(marketingRouter.createCaller(ctx()).record({ ...event(), name: "consultation_demande_confirmee" })).rejects.toThrow("serveur");
    expect(values).not.toHaveBeenCalled();
  });
  it("refuse les propriétés personnelles du suivi", async () => {
    await expect(marketingRouter.createCaller(ctx()).record({ ...event(), email: "secret@example.com" } as any)).rejects.toThrow();
    expect(values).not.toHaveBeenCalled();
  });
  it("refuse une demande preview sans enregistrer de coordonnées", async () => {
    await expect(marketingRouter.createCaller(ctx(null, "https://3000-preview.manus.computer")).submitConsultation(lead())).rejects.toThrow("publié");
    expect(values).not.toHaveBeenCalled(); expect(mocks.notify).not.toHaveBeenCalled();
  });
  it("échoue clairement si la base est absente", async () => {
    mocks.getDb.mockResolvedValue(null);
    await expect(marketingRouter.createCaller(ctx()).submitConsultation(lead())).rejects.toThrow("enregistrée");
    expect(mocks.notify).not.toHaveBeenCalled();
  });
  it("confirme seulement après l’enregistrement et ne transmet pas les coordonnées dans la notification", async () => {
    const input = lead();
    await expect(marketingRouter.createCaller(ctx()).submitConsultation(input)).resolves.toMatchObject({ received: true });
    expect(values).toHaveBeenCalledWith(expect.objectContaining({ email: input.email, contactConsent: 1 }));
    const notice = JSON.stringify(mocks.notify.mock.calls);
    expect(notice).not.toContain(input.email); expect(notice).not.toContain(input.phone);
  });
  it("n’enregistre pas d’événement analytique lorsque la demande n’a pas de consentement analytique", async () => {
    await marketingRouter.createCaller(ctx()).submitConsultation(lead());
    expect(values).toHaveBeenCalledTimes(1);
  });
  it("ne fait pas échouer une demande enregistrée si la notification tombe en erreur", async () => {
    mocks.notify.mockRejectedValue(new Error("offline"));
    await expect(marketingRouter.createCaller(ctx()).submitConsultation(lead())).resolves.toMatchObject({ received: true });
  });
  it("valide la succursale, le consentement de contact et le piège antirobot", () => {
    expect(consultationInput.safeParse({ ...lead(), location: "Autre" }).success).toBe(false);
    expect(consultationInput.safeParse({ ...lead(), contactConsent: false }).success).toBe(false);
    expect(consultationInput.safeParse({ ...lead(), website: "spam" }).success).toBe(false);
    expect(consultationInput.safeParse({ ...lead(), phone: "+++++++" }).success).toBe(false);
  });
});

describe("Achats: aucun revenu simulé", () => {
  const summary = (overrides: Partial<PaymentSummary> = {}): PaymentSummary => ({ checkoutSessionId: "cs_live_test", product: "programme", accessGranted: true, customerName: "Non stocké", customerEmail: "not-stored@example.com", paymentStatus: "paid", subscriptionStatus: null, amountTotal: 3900, currency: "cad", livemode: true, checkoutStatus: "complete", createdAt: 1700000000, trialEnd: null, portalAvailable: false, ...overrides });
  it("ignore tests, paiements non payés et essais gratuits", async () => {
    for (const override of [{ livemode: false }, { paymentStatus: "unpaid" }, { product: "community_founder" as const }, { amountTotal: 0 }, { checkoutStatus: "open" }]) await recordVerifiedPurchase(summary(override));
    expect(values).not.toHaveBeenCalled();
  });
  it("dédoublonne par empreinte sans coordonnées ni ID brut", async () => {
    await recordVerifiedPurchase(summary());
    const payload = values.mock.calls[0][0];
    expect(payload.amountCents).toBe(3900); expect(payload.purchaseHash).toHaveLength(64);
    expect(JSON.stringify(payload)).not.toMatch(/cs_live_|customerName|customerEmail|@/);
    expect(duplicate).toHaveBeenCalled();
  });
});
