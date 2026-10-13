import { readFileSync } from "node:fs";
import { describe, expect, it, vi, afterEach } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";
import { splitPageUrl } from "@/online/lib/pageParameters";
const ctx = { user: null, req: { headers: { origin: "https://clubadm.example" } }, res: {} } as TrpcContext;
afterEach(() => vi.unstubAllEnvs());
describe("Intégration isolée /online-project", () => {
  it("garde les neuf pages du funnel sous un seul préfixe", () => {
    const source = readFileSync("client/src/online/OnlineProject.tsx", "utf8");
    for (const path of ["", "/resultat", "/programme", "/checkout", "/merci", "/upsell", "/communaute-confirmee", "/merci-programme", "/mes-achats"]) expect(source).toContain(`path="/online-project${path}"`);
  });
  it("n’ajoute pas la landing à la navigation ou au footer principal", () => {
    for (const name of ["Navbar", "Footer"]) expect(readFileSync(`client/src/components/${name}.tsx`, "utf8")).not.toContain("online-project");
    const app = readFileSync("client/src/App.tsx", "utf8");
    expect(app).toContain('path={"/programme"}');
    expect(app).toContain('path={"/espace-membre"}');
    for (const km of [5, 10, 21]) expect(app).toContain(`path={"/programmation-${km}km"}`);
  });
  it("retire les coordonnées, réponses et preuves Stripe de l’URL publique du funnel", () => {
    const result = splitPageUrl("/online-project/merci?session_id=cs_live_secret&courriel=anne@example.com&objectif=sante&prenom=Anne", "https://clubadm.example");
    expect(result.cleanUrl.search).toBe("");
    expect(result.privateParameters.search).toContain("session_id=");
  });
  it("ne change pas les paramètres des routes du site principal", () => {
    const source = readFileSync("client/src/online/lib/pageParameters.ts", "utf8");
    expect(source).toContain('target.pathname.startsWith("/online-project/")');
    expect(source).toContain("return original(state, unused, input)");
  });
  it("expose un état fermé sans clés Stripe et ne prétend pas envoyer de guide", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", ""); vi.stubEnv("STRIPE_WEBHOOK_SECRET", ""); vi.stubEnv("ONLINE_PROJECT_CHECKOUT_ENABLED", "");
    expect(await appRouter.createCaller(ctx).onlinePayments.configuration()).toEqual({ checkoutEnabled: false, guideDeliveryEnabled: false });
  });
  it("refuse un checkout valide tant que l’activation n’a pas été autorisée et configurée", async () => {
    vi.stubEnv("ONLINE_PROJECT_CHECKOUT_ENABLED", "");
    await expect(appRouter.createCaller(ctx).onlinePayments.createCheckoutSession({ name: "Test fictif", email: "test@example.com", product: "programme" })).rejects.toMatchObject({ code: "PRECONDITION_FAILED" });
  });
});
