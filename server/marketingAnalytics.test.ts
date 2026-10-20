import { describe, expect, it } from "vitest";
import {
  marketingEventSchema,
  marketingPage,
  productionHost,
  reportRange,
  safeCampaign,
  summarizeMarketing,
  trafficSource,
  type MarketingRow,
} from "../shared/marketingAnalytics";

const UUIDS = {
  event: "11111111-1111-4111-8111-111111111111",
  visitA: "22222222-2222-4222-8222-222222222222",
  visitB: "33333333-3333-4333-8333-333333333333",
  visitC: "44444444-4444-4444-8444-444444444444",
  visitD: "55555555-5555-4555-8555-555555555555",
  visitorA: "66666666-6666-4666-8666-666666666666",
  visitorB: "77777777-7777-4777-8777-777777777777",
};

const validEvent = {
  eventId: UUIDS.event,
  visitId: UUIDS.visitA,
  visitorId: UUIDS.visitorA,
  name: "page_view" as const,
  page: "/" as const,
  device: "desktop" as const,
  source: "direct" as const,
  campaign: "campaign_2025",
};

function row(overrides: Partial<MarketingRow> = {}): MarketingRow {
  return { ...validEvent, occurredAt: 0, ...overrides };
}

describe("marketingEventSchema — collecte minimale et sans PII", () => {
  it("accepte uniquement le contrat de suivi prévu", () => {
    expect(marketingEventSchema.parse(validEvent)).toEqual(validEvent);
  });

  it("est strict et rejette les champs PII ainsi qu’une campagne au format courriel", () => {
    const withPii = marketingEventSchema.safeParse({
      ...validEvent,
      email: "membre@example.com",
      phone: "+1 514 555 0100",
      fullName: "Membre Fictif",
      ipAddress: "203.0.113.42",
    });
    const campaignWithPii = marketingEventSchema.safeParse({
      ...validEvent,
      campaign: "membre@example.com",
    });

    expect(withPii.success).toBe(false);
    expect(campaignWithPii.success).toBe(false);
  });
});

describe("pages et hôtes admissibles", () => {
  it("exclut les pages privées, d’administration et d’API", () => {
    for (const path of [
      "/admin",
      "/admin/marketing",
      "/login",
      "/membre/profil",
      "/compte",
      "/api/me",
      "/admin?email=membre@example.com",
    ]) {
      expect(marketingPage(path)).toBeNull();
    }
  });

  it("normalise seulement les pages blog publiques", () => {
    expect(marketingPage("/blog/mon-article?source=google#haut")).toBe(
      "/blog/article"
    );
  });

  it("n’accepte que les hôtes de production et refuse localhost/preview", () => {
    expect(productionHost("CLUBADM.COM")).toBe(true);
    expect(productionHost("www.clubadm.com")).toBe(true);
    expect(productionHost("clubadmfit-fcpqjdnn.manus.space")).toBe(true);

    for (const host of [
      "localhost",
      "localhost:5173",
      "127.0.0.1",
      "preview.clubadm.com",
      "clubadm-preview.manus.space",
      "clubadm.com.evil.example",
    ]) {
      expect(productionHost(host)).toBe(false);
    }
  });
});

describe("attribution de trafic et campagne", () => {
  it.each([
    ["meta", "", "facebook"],
    ["ig", "https://www.google.ca/search?q=club", "instagram"],
    ["newsletter", "", "email"],
    ["google", "", "google"],
    ["tiktok", "https://www.google.ca/", "other"],
    [null, "https://www.google.ca/search?q=club", "google"],
    [null, "https://m.facebook.com/clubadm", "facebook"],
    [null, "https://l.instagram.com/", "instagram"],
    [null, "https://clubadm.com/programmes", "direct"],
    [null, "https://partenaire.example/offre", "referral"],
    [null, "not-a-url", "direct"],
  ] as const)("classe utm=%s et referrer=%s comme %s", (utm, referrer, source) => {
    expect(trafficSource(utm, referrer)).toBe(source);
  });

  it("conserve uniquement les identifiants de campagne sûrs", () => {
    expect(safeCampaign("meta_spring-2025")).toBe("meta_spring-2025");
    expect(safeCampaign(null)).toBe("");
    expect(safeCampaign("")).toBe("");
    expect(safeCampaign("Meta_Spring")).toBe("");
    expect(safeCampaign("membre@example.com")).toBe("");
    expect(safeCampaign("a".repeat(61))).toBe("");
  });
});

describe("reportRange — minuits America/Toronto", () => {
  it("couvre 23 heures au changement vers l’heure avancée", () => {
    const range = reportRange(1, Date.parse("2025-03-10T16:00:00.000Z"));

    expect(range).toMatchObject({
      startDate: "2025-03-09",
      endDate: "2025-03-09",
    });
    expect(new Date(range.start).toISOString()).toBe("2025-03-09T05:00:00.000Z");
    expect(new Date(range.end).toISOString()).toBe("2025-03-10T04:00:00.000Z");
    expect(range.end - range.start).toBe(23 * 60 * 60 * 1000);
  });

  it("couvre 25 heures au retour à l’heure normale", () => {
    const range = reportRange(1, Date.parse("2025-11-03T17:00:00.000Z"));

    expect(range).toMatchObject({
      startDate: "2025-11-02",
      endDate: "2025-11-02",
    });
    expect(new Date(range.start).toISOString()).toBe("2025-11-02T04:00:00.000Z");
    expect(new Date(range.end).toISOString()).toBe("2025-11-03T05:00:00.000Z");
    expect(range.end - range.start).toBe(25 * 60 * 60 * 1000);
  });
});

describe("summarizeMarketing", () => {
  it("dédoublonne les comptes par visite tout en gardant toutes les vues", () => {
    const summary = summarizeMarketing([
      row({ name: "page_view", visitId: UUIDS.visitA, visitorId: UUIDS.visitorA, source: "google" }),
      row({ name: "page_view", visitId: UUIDS.visitA, visitorId: UUIDS.visitorA, source: "google", occurredAt: 1 }),
      row({ name: "consultation_cta_click", visitId: UUIDS.visitA, visitorId: UUIDS.visitorA, source: "google" }),
      row({ name: "consultation_cta_click", visitId: UUIDS.visitA, visitorId: UUIDS.visitorA, source: "google", occurredAt: 2 }),
      row({ name: "consultation_demande_confirmee", visitId: UUIDS.visitA, visitorId: UUIDS.visitorA, source: "google" }),
      row({ name: "consultation_demande_confirmee", visitId: UUIDS.visitA, visitorId: UUIDS.visitorA, source: "google", occurredAt: 3 }),
      row({ name: "page_view", visitId: UUIDS.visitB, visitorId: UUIDS.visitorA, source: "google" }),
      row({ name: "consultation_cta_click", visitId: UUIDS.visitB, visitorId: UUIDS.visitorA, source: "google" }),
      row({ name: "consultation_demande_confirmee", visitId: UUIDS.visitB, visitorId: UUIDS.visitorA, source: "google" }),
    ]);

    expect(summary).toMatchObject({
      visitors: 1,
      visits: 2,
      views: 3,
      consultationRate: 100,
      counts: {
        page_view: 2,
        consultation_cta_click: 2,
        consultation_demande_confirmee: 2,
      },
    });
    expect(summary.sources).toEqual([
      { key: "google", views: 3, visits: 2, clicks: 2, requests: 2 },
    ]);
  });

  it("respecte l’ordre du funnel et la fenêtre de 60 minutes par visite", () => {
    const minute = 60 * 1000;
    const summary = summarizeMarketing([
      // Ordre valide, avec une confirmation exactement 60 minutes après le départ.
      row({ name: "consultation_form_start", visitId: UUIDS.visitA, occurredAt: 0 }),
      row({ name: "consultation_demande_confirmee", visitId: UUIDS.visitA, occurredAt: 60 * minute }),
      // Confirmation avant le départ : elle ne peut pas compléter ce funnel.
      row({ name: "consultation_demande_confirmee", visitId: UUIDS.visitB, occurredAt: 0 }),
      row({ name: "consultation_form_start", visitId: UUIDS.visitB, occurredAt: minute }),
      // Confirmation après plus de 60 minutes : elle est exclue du même parcours.
      row({ name: "consultation_form_start", visitId: UUIDS.visitC, occurredAt: 0 }),
      row({ name: "consultation_demande_confirmee", visitId: UUIDS.visitC, occurredAt: 60 * minute + 1 }),
    ]);

    expect(summary.consultationFunnel).toEqual([
      { name: "consultation_form_start", visits: 3, completion: null },
      { name: "consultation_demande_confirmee", visits: 1, completion: 33.3 },
    ]);
  });

  it("renvoie des taux nuls lorsqu’il n’y a aucune donnée", () => {
    const summary = summarizeMarketing([]);

    expect(summary).toMatchObject({
      visitors: 0,
      visits: 0,
      views: 0,
      consultationRate: null,
    });
    expect(summary.consultationFunnel).toEqual([
      { name: "consultation_form_start", visits: 0, completion: null },
      { name: "consultation_demande_confirmee", visits: 0, completion: null },
    ]);
    expect(summary.onlineFunnel).toEqual([
      { name: "quiz_start", visits: 0, completion: null },
      { name: "quiz_complete", visits: 0, completion: null },
      { name: "checkout_start", visits: 0, completion: null },
    ]);
  });
});
