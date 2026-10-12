import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  demoMemberAnswers,
  emptyMemberAnswers,
  missingForStep,
  numericProfileIssue,
  triageMember,
  completedStepCount,
  MEMBER_PRODUCTS,
} from "../shared/memberOnboarding";
import type { TrpcContext } from "./_core/context";

const mocks = vi.hoisted(() => ({
  getDb: vi.fn(),
  select: vi.fn(),
  from: vi.fn(),
  where: vi.fn(),
  limit: vi.fn(),
  insert: vi.fn(),
  values: vi.fn(),
  update: vi.fn(),
}));
vi.mock("./db", () => ({ getDb: mocks.getDb }));
import { memberRouter } from "./routers/member";

const context = (id = 42): TrpcContext => ({
  user: {
    id,
    openId: `test-${id}`,
    name: "Fictif",
    email: "test@example.com",
    role: "user",
    loginMethod: "manus",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  },
  req: {} as TrpcContext["req"],
  res: {} as TrpcContext["res"],
});

beforeEach(() => {
  vi.clearAllMocks();
  mocks.getDb.mockResolvedValue({ select: mocks.select, insert: mocks.insert });
  mocks.select.mockReturnValue({ from: mocks.from });
  mocks.from.mockReturnValue({ where: mocks.where });
  mocks.where.mockReturnValue({ limit: mocks.limit });
  mocks.limit.mockResolvedValue([]);
  mocks.insert.mockReturnValue({ values: mocks.values });
  mocks.values.mockReturnValue({ onDuplicateKeyUpdate: mocks.update });
  mocks.update.mockResolvedValue(undefined);
});

describe("Onboarding membre — structure et triage", () => {
  it("garde les produits et durées séparés", () => {
    expect(MEMBER_PRODUCTS.rstart.duration).toBe("12 semaines");
    expect(MEMBER_PRODUCTS.starter.duration).toBe("4 semaines");
    expect(MEMBER_PRODUCTS.rstart.destination).not.toBe(
      MEMBER_PRODUCTS.starter.destination
    );
  });
  it("identifie les champs manquants et n’invente pas de profil", () => {
    expect(missingForStep(emptyMemberAnswers(), 0)).toContain("consent");
    expect(completedStepCount(emptyMemberAnswers())).toBe(0);
  });
  it("accepte le refus de partager poids/taille sans inventer de valeur", () => {
    const answers = {
      ...demoMemberAnswers(),
      weight: "non-partage",
      height: "non-partage",
    };
    expect(numericProfileIssue(answers)).toBeNull();
    expect(missingForStep(answers, 0)).toEqual([]);
  });
  it("bloque les valeurs numériques incohérentes", () => {
    expect(
      numericProfileIssue({ ...demoMemberAnswers(), weight: "-2" })
    ).not.toBeNull();
    expect(
      numericProfileIssue({ ...demoMemberAnswers(), exactAge: "abc" })
    ).not.toBeNull();
  });
  it("requiert un avis pour les situations de santé, incertitudes et relation alimentaire difficile", () => {
    for (const value of ["oui", "incertain", "non-partage"])
      expect(
        triageMember({ ...demoMemberAnswers(), healthSituation: value })
      ).toBe("referred");
    expect(
      triageMember({ ...demoMemberAnswers(), eatingRelationship: "oui" })
    ).toBe("referred");
    expect(triageMember({ ...demoMemberAnswers(), ageRange: "moins-18" })).toBe(
      "referred"
    );
  });
  it("ne produit jamais un statut validé automatiquement", () => {
    expect(triageMember(demoMemberAnswers())).toBe("needs_review");
  });
});

describe("Dossier privé — procédures serveur", () => {
  it("interdit la lecture et l’écriture anonymes", async () => {
    const caller = memberRouter.createCaller({ ...context(), user: null });
    await expect(
      caller.getOnboarding({ product: "starter" })
    ).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    await expect(
      caller.saveOnboarding({
        product: "starter",
        answers: demoMemberAnswers(),
        step: 0,
      })
    ).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    expect(mocks.getDb).not.toHaveBeenCalled();
  });
  it("n’enregistre pas sans consentement", async () => {
    await expect(
      memberRouter
        .createCaller(context())
        .saveOnboarding({
          product: "starter",
          answers: { ...demoMemberAnswers(), consent: false },
          step: 0,
        })
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(mocks.insert).not.toHaveBeenCalled();
  });
  it("sauvegarde un brouillon en utilisant le compte serveur, pas un identifiant fourni par le client", async () => {
    const result = await memberRouter
      .createCaller(context(77))
      .saveOnboarding({
        product: "rstart",
        answers: demoMemberAnswers(),
        step: 2,
      });
    expect(result.status).toBe("draft");
    expect(mocks.values).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: 77,
        product: "rstart",
        status: "draft",
        step: 2,
      })
    );
  });
  it("refuse une soumission incomplète", async () => {
    await expect(
      memberRouter
        .createCaller(context())
        .saveOnboarding({
          product: "starter",
          answers: demoMemberAnswers(),
          step: 5,
          submit: true,
        })
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(mocks.insert).not.toHaveBeenCalled();
  });
  it("soumet un dossier complet à la validation humaine", async () => {
    const result = await memberRouter
      .createCaller(context())
      .saveOnboarding({
        product: "starter",
        answers: { ...demoMemberAnswers(), reviewed: true },
        step: 5,
        submit: true,
      });
    expect(result.status).toBe("needs_review");
  });
  it("calcule le triage côté serveur", async () => {
    const result = await memberRouter
      .createCaller(context())
      .saveOnboarding({
        product: "starter",
        answers: {
          ...demoMemberAnswers(),
          reviewed: true,
          healthSituation: "oui",
        },
        step: 5,
        submit: true,
      });
    expect(result.status).toBe("referred");
  });
  it("signale une base indisponible au lieu d’afficher une fausse sauvegarde", async () => {
    mocks.getDb.mockResolvedValue(null);
    await expect(
      memberRouter
        .createCaller(context())
        .saveOnboarding({
          product: "starter",
          answers: demoMemberAnswers(),
          step: 0,
        })
    ).rejects.toMatchObject({ code: "INTERNAL_SERVER_ERROR" });
  });
});
