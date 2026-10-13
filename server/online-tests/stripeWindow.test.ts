import { describe, expect, it, vi } from "vitest";
import {
  closeStripePopup,
  redirectToStripeCheckout,
  type StripePopup,
} from "@/online/lib/stripeWindow";

function popup(closed = false): StripePopup {
  return {
    closed,
    close: vi.fn(),
    opener: null,
    location: { replace: vi.fn() },
  };
}

describe("Stripe checkout window", () => {
  it("redirects a pre-opened popup to Stripe", () => {
    const target = popup();
    const fallback = vi.fn();

    expect(redirectToStripeCheckout(target, "https://checkout.stripe.com/test", fallback)).toBe("popup");
    expect(target.location.replace).toHaveBeenCalledWith("https://checkout.stripe.com/test");
    expect(fallback).not.toHaveBeenCalled();
  });

  it("falls back to the current tab when the popup was blocked", () => {
    const fallback = vi.fn();

    expect(redirectToStripeCheckout(null, "https://checkout.stripe.com/test", fallback)).toBe("same-tab");
    expect(fallback).toHaveBeenCalledWith("https://checkout.stripe.com/test");
  });

  it("closes an unused popup after a Stripe error", () => {
    const target = popup();
    closeStripePopup(target);
    expect(target.close).toHaveBeenCalledOnce();
  });
});
