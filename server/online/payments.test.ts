import type Stripe from "stripe";
import { afterEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";
import { createCheckoutSession, getPaymentSummary, verifyCheckoutSession } from "./payments";
import { getFounderOffer } from "./founderOffer";

const paidAt = Math.floor(Date.UTC(2030, 0, 1, 12) / 1000);
const includedEnd = paidAt + 30 * 86400;

function verifiedPurchaseStripe(options: { refunded?: boolean; subscriptions?: unknown[] } = {}) {
  const create = vi.fn().mockResolvedValue({ id: "cs_founder", url: "https://checkout.stripe.test/cs_founder" });
  const stripe = {
    checkout: { sessions: {
      create,
      retrieve: vi.fn().mockResolvedValue({
        id: "cs_test_paid", mode: "payment", status: "complete", payment_status: "paid",
        customer_details: { email: "marie@example.com" },
        metadata: { product_kind: "programme" }, payment_intent: "pi_test_paid", created: paidAt,
      }),
    } },
    paymentIntents: { retrieve: vi.fn().mockResolvedValue({ status: "succeeded", latest_charge: "ch_test_paid" }) },
    charges: { retrieve: vi.fn().mockResolvedValue({ paid: true, refunded: options.refunded ?? false, created: paidAt }) },
    customers: { list: vi.fn().mockResolvedValue({ data: options.subscriptions ? [{ id: "cus_existing" }] : [], has_more: false }) },
    subscriptions: { list: vi.fn().mockResolvedValue({ data: options.subscriptions ?? [], has_more: false }) },
  };
  return { stripe: stripe as unknown as Stripe, create };
}

afterEach(() => vi.useRealTimers());

function stripeWithSessionCreate(create: ReturnType<typeof vi.fn>): Stripe {
  return { checkout: { sessions: { create } } } as unknown as Stripe;
}

function stripeWithSessionRetrieve(session: Partial<Stripe.Checkout.Session>): Stripe {
  return {
    checkout: { sessions: { retrieve: vi.fn().mockResolvedValue(session) } },
    subscriptions: { retrieve: vi.fn() },
  } as unknown as Stripe;
}

describe("Stripe Checkout sessions", () => {
  it("creates the 39 CAD one-time programme checkout with the required URLs", async () => {
    const create = vi.fn().mockResolvedValue({ id: "cs_programme", url: "https://checkout.stripe.test/cs_programme" });

    const result = await createCheckoutSession(
      {
        name: "Marie Tremblay",
        email: "marie@example.com",
        product: "programme",
        origin: "https://clubadm.ca",
      },
      stripeWithSessionCreate(create),
    );

    expect(result).toEqual({
      checkoutSessionId: "cs_programme",
      url: "https://checkout.stripe.test/cs_programme",
    });
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "payment",
        allow_promotion_codes: true,
        customer_email: "marie@example.com",
        client_reference_id: "guest:marie@example.com",
        metadata: expect.objectContaining({
          product_kind: "programme",
          user_id: "guest:marie@example.com",
          customer_email: "marie@example.com",
          customer_name: "Marie Tremblay",
        }),
        success_url: "https://clubadm.ca/online-project/merci?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "https://clubadm.ca/online-project/checkout?annule=1",
        line_items: [
          expect.objectContaining({
            price_data: expect.objectContaining({ currency: "cad", unit_amount: 3900 }),
          }),
        ],
      }),
    );
  });

  it("keeps the original 30-day end when the founder offer is accepted on day 23", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date((paidAt + 23 * 86400) * 1000));
    const { stripe, create } = verifiedPurchaseStripe();

    await createCheckoutSession(
      {
        name: "Marie Tremblay",
        email: "marie@example.com",
        product: "community_founder",
        origin: "https://clubadm.ca",
        manusUserId: "manus_123",
        purchaseSessionId: "cs_test_paid",
      },
      stripe,
    );

    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "subscription",
        allow_promotion_codes: true,
        customer_email: "marie@example.com",
        client_reference_id: "manus_123",
        metadata: expect.objectContaining({
          user_id: "manus_123",
          customer_email: "marie@example.com",
          customer_name: "Marie Tremblay",
          program_purchase_session_id: "cs_test_paid",
        }),
        success_url: "https://clubadm.ca/online-project/communaute-confirmee?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "https://clubadm.ca/online-project/upsell?annule=1&achat=cs_test_paid",
        subscription_data: expect.objectContaining({ trial_end: includedEnd }),
        line_items: [
          expect.objectContaining({
            price_data: expect.objectContaining({
              currency: "cad",
              unit_amount: 4900,
              recurring: { interval: "month" },
            }),
          }),
        ],
      }),
      expect.objectContaining({ idempotencyKey: expect.stringContaining("founder:cs_test_paid:") }),
    );
    expect(create.mock.calls[0][0].subscription_data.trial_period_days).toBeUndefined();
    expect(create.mock.calls[0][0].expires_at).toBe(paidAt + 23 * 86400 + 1800);
  });

  it("uses that same original end date for an immediate J0 founder signup", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date((paidAt + 60) * 1000));
    const { stripe, create } = verifiedPurchaseStripe();
    await createCheckoutSession({ name: "Marie", email: "marie@example.com", product: "community_founder", origin: "https://clubadm.ca", purchaseSessionId: "cs_test_paid" }, stripe);
    expect(create.mock.calls[0][0].subscription_data.trial_end).toBe(includedEnd);
  });

  it("refuses founder checkout without a paid programme reference or matching email", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date((paidAt + 23 * 86400) * 1000));
    const { stripe, create } = verifiedPurchaseStripe();
    const request = { name: "Marie", email: "marie@example.com", product: "community_founder" as const, origin: "https://clubadm.ca" };
    await expect(createCheckoutSession(request, stripe)).rejects.toThrow(/achat programme confirmé/);
    await expect(createCheckoutSession({ ...request, email: "autre@example.com", purchaseSessionId: "cs_test_paid" }, stripe)).rejects.toThrow(/achat programme confirmé/);
    expect(create).not.toHaveBeenCalled();
  });

  it("does not extend the trial if the original 30 days are nearly over", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date((includedEnd - 48 * 3600) * 1000));
    const { stripe, create } = verifiedPurchaseStripe();
    const offer = await getFounderOffer("cs_test_paid", "marie@example.com", stripe);
    expect(offer).toMatchObject({ eligible: false, reason: "period_ending", trialEnd: includedEnd });
    await expect(createCheckoutSession({ name: "Marie", email: "marie@example.com", product: "community_founder", origin: "https://clubadm.ca", purchaseSessionId: "cs_test_paid" }, stripe)).rejects.toThrow();
    expect(create).not.toHaveBeenCalled();
  });

  it("rejects refunded purchases and existing active community subscriptions", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date((paidAt + 23 * 86400) * 1000));
    const refunded = verifiedPurchaseStripe({ refunded: true });
    expect(await getFounderOffer("cs_test_paid", null, refunded.stripe)).toMatchObject({ eligible: false, reason: "invalid_purchase" });
    const existing = verifiedPurchaseStripe({ subscriptions: [{ metadata: { product_kind: "community_founder" }, status: "trialing" }] });
    expect(await getFounderOffer("cs_test_paid", null, existing.stripe)).toMatchObject({ eligible: false, reason: "already_subscribed" });
    expect(existing.create).not.toHaveBeenCalled();
  });

  it("grants programme access only after Stripe reports the payment as paid", async () => {
    const result = await verifyCheckoutSession(
      "cs_paid",
      stripeWithSessionRetrieve({
        id: "cs_paid",
        mode: "payment",
        payment_status: "paid",
        metadata: { product_kind: "programme", customer_name: "Marie Tremblay" },
        customer_email: "marie@example.com",
      }),
    );

    expect(result).toMatchObject({
      checkoutSessionId: "cs_paid",
      product: "programme",
      accessGranted: true,
      customerName: "Marie Tremblay",
      customerEmail: "marie@example.com",
    });
  });

  it("grants community access while the Stripe subscription is trialing", async () => {
    const result = await verifyCheckoutSession(
      "cs_trial",
      stripeWithSessionRetrieve({
        id: "cs_trial",
        mode: "subscription",
        payment_status: "no_payment_required",
        metadata: { product_kind: "community_founder" },
        subscription: { id: "sub_trial", status: "trialing" } as Stripe.Subscription,
      }),
    );

    expect(result).toMatchObject({
      product: "community_founder",
      accessGranted: true,
      subscriptionStatus: "trialing",
    });
  });

  it.each([true, false])("returns Stripe's actual livemode=%s and discounted amount for advertising validation", async (livemode) => {
    const summary = await getPaymentSummary("cs_verified", stripeWithSessionRetrieve({
      id: "cs_verified", mode: "payment", status: "complete", payment_status: "paid",
      metadata: { product_kind: "programme" }, amount_total: 2900, currency: "cad", livemode,
    }));
    expect(summary).toMatchObject({ livemode, amountTotal: 2900, currency: "cad", accessGranted: true });
  });

  it("defaults to non-live when Stripe's mode is absent", async () => {
    const summary = await getPaymentSummary("cs_unknown", stripeWithSessionRetrieve({
      id: "cs_unknown", mode: "payment", payment_status: "paid", metadata: { product_kind: "programme" },
    }));
    expect(summary.livemode).toBe(false);
  });
});

describe("payments.createCheckoutSession validation", () => {
  const ctx = {
    user: null,
    req: { headers: { origin: "https://clubadm.ca" } },
    res: {},
  } as TrpcContext;

  it("rejects invalid email and product input without requiring OAuth", async () => {
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.onlinePayments.createCheckoutSession({
        name: "Marie",
        email: "not-an-email",
        product: "programme",
      }),
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });

    await expect(
      caller.onlinePayments.createCheckoutSession({
        name: "Marie",
        email: "marie@example.com",
        product: "unknown_product",
      } as never),
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
