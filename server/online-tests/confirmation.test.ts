import { describe, expect, it } from "vitest";
import { getPurchaseConfirmationState } from "@/online/lib/confirmation";

describe("confirmation du paiement du programme", () => {
  it("n'affiche pas de succès quand la session Stripe est absente", () => {
    expect(getPurchaseConfirmationState({
      sessionId: "", isPending: false, isError: false,
    })).toBe("missing");
  });

  it("attend la vérification avant d'afficher la confirmation", () => {
    expect(getPurchaseConfirmationState({
      sessionId: "cs_test_123", isPending: true, isError: false,
    })).toBe("loading");
  });

  it("rejette une erreur, un paiement non confirmé et un abonnement communautaire", () => {
    expect(getPurchaseConfirmationState({
      sessionId: "cs_test_123", isPending: false, isError: true,
    })).toBe("failed");
    expect(getPurchaseConfirmationState({
      sessionId: "cs_test_123", isPending: false, isError: false,
      accessGranted: false, product: "programme",
    })).toBe("failed");
    expect(getPurchaseConfirmationState({
      sessionId: "cs_test_123", isPending: false, isError: false,
      accessGranted: true, product: "community_founder",
    })).toBe("failed");
  });

  it("autorise la célébration uniquement après confirmation Stripe du programme", () => {
    expect(getPurchaseConfirmationState({
      sessionId: "cs_test_paid", isPending: false, isError: false,
      accessGranted: true, product: "programme",
    })).toBe("success");
  });
});
