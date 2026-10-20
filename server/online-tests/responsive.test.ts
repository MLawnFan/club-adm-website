import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
const source = (path: string) => readFileSync(path, "utf8");

describe("Protections responsive du funnel en ligne", () => {
  it("permet le zoom du navigateur", () => {
    const html = source("client/index.html");
    expect(html).toContain("width=device-width, initial-scale=1.0");
    expect(html).not.toMatch(/maximum-scale=1|user-scalable=no/);
  });
  it("conserve le menu tactile sous 1024px et le rend défilable en paysage", () => {
    const header = source("client/src/online/components/Header.tsx");
    expect(header).toContain("hidden lg:flex");
    expect(header).toContain("overflow-y-auto overscroll-contain");
    expect(header).toContain("aria-expanded={mobileOpen}");
    expect(header).toContain('event.key === "Escape"');
  });
  it("préserve le refus du consentement et les zones sûres sans changer le choix par défaut", () => {
    const css = source("client/src/online/online.css");
    expect(css).toContain("min-height: 44px");
    expect(css).toContain("safe-area-inset-bottom");
    const consent = source("client/src/components/MarketingAnalytics.tsx");
    expect(consent).toContain("max-h-[80dvh]");
    expect(consent).toContain('save(true)');
    expect(consent).toContain("consent === null");
    expect(consent).toContain("useState(false)");
    expect(consent).toContain('setAdvertisingConsent(!reject && ads ? "accepted" : "rejected")');
  });
  it("associe les champs aux labels et annule une avance différée au retour", () => {
    const quiz = source("client/src/online/pages/OptInPage.tsx");
    expect(quiz).toContain('htmlFor="quiz-name"');
    expect(quiz).toContain('htmlFor="quiz-email"');
    expect(quiz).toContain('inputMode="email"');
    expect(quiz).toMatch(/const handleBack = \(\) => \{\s+clearAdvance\(\)/);
    expect(quiz).toContain('[step, showIntro]');
  });
});
