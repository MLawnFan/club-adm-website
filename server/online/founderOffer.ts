import { TRPCError } from "@trpc/server";
import type Stripe from "stripe";
import { getStripe } from "./client";

const INCLUDED_DAYS = 30;
const SECONDS_PER_DAY = 24 * 60 * 60;
// Stripe Checkout requires an absolute trial_end at least 48 hours away.
// Our hosted session stays open 30 minutes; the extra buffer covers processing delays.
const MIN_REMAINING_SECONDS = 49 * 60 * 60;

export type FounderOffer = {
  eligible: boolean;
  trialEnd: number | null;
  remainingDays: number | null;
  reason: "invalid_purchase" | "already_subscribed" | "period_ending" | null;
};

/** Never use an email, quiz response, or query-string date as proof of the original purchase. */
export async function getFounderOffer(
  purchaseSessionId: string,
  email: string | null,
  stripe: Stripe = getStripe(),
  now = Math.floor(Date.now() / 1000),
): Promise<FounderOffer> {
  const invalid: FounderOffer = { eligible: false, trialEnd: null, remainingDays: null, reason: "invalid_purchase" };
  if (!/^cs_(test_|live_)?[A-Za-z0-9]+$/.test(purchaseSessionId)) return invalid;

  let purchase: Stripe.Checkout.Session;
  try {
    purchase = await stripe.checkout.sessions.retrieve(purchaseSessionId);
  } catch {
    return invalid;
  }

  const paidEmail = (purchase.customer_details?.email ?? purchase.customer_email ?? "").toLowerCase();
  if (
    purchase.mode !== "payment" ||
    purchase.status !== "complete" ||
    purchase.payment_status !== "paid" ||
    purchase.metadata?.product_kind !== "programme" ||
    !paidEmail ||
    (email !== null && paidEmail !== email.trim().toLowerCase()) ||
    !purchase.payment_intent
  ) return invalid;

  const paymentIntentId = typeof purchase.payment_intent === "string"
    ? purchase.payment_intent : purchase.payment_intent.id;
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  const chargeId = typeof paymentIntent.latest_charge === "string"
    ? paymentIntent.latest_charge : paymentIntent.latest_charge?.id;
  if (paymentIntent.status !== "succeeded" || !chargeId) return invalid;
  const charge = await stripe.charges.retrieve(chargeId);
  if (!charge.paid || charge.refunded || !Number.isFinite(charge.created) || charge.created > now) return invalid;

  // This verified Stripe purchase is currently the only durable source for the
  // initial 30-day period. Replace with a verified access_granted timestamp once
  // fulfilment is connected; never accept trialEnd supplied by the browser/CRM.
  const trialEnd = charge.created + INCLUDED_DAYS * SECONDS_PER_DAY;
  const remainingDays = Math.max(0, Math.ceil((trialEnd - now) / SECONDS_PER_DAY));
  if (trialEnd - now < MIN_REMAINING_SECONDS) {
    return { eligible: false, trialEnd, remainingDays, reason: "period_ending" };
  }

  // A completed subscription might be attached to a different Stripe Customer
  // from this one-time purchase. Search by the verified purchase email and fail
  // closed if the Stripe list is too large to check fully.
  const customers = await stripe.customers.list({ email: paidEmail, limit: 100 });
  if (customers.has_more) {
    throw new TRPCError({ code: "CONFLICT", message: "Vérification manuelle requise avant l'abonnement." });
  }
  for (const customer of customers.data) {
    if (customer.deleted) continue;
    const subscriptions = await stripe.subscriptions.list({ customer: customer.id, status: "all", limit: 100 });
    if (subscriptions.has_more) {
      throw new TRPCError({ code: "CONFLICT", message: "Vérification manuelle requise avant l'abonnement." });
    }
    if (subscriptions.data.some((sub) =>
      ["community_founder", "community_regular"].includes(sub.metadata.product_kind ?? "") &&
      ["trialing", "active", "past_due", "unpaid", "paused", "incomplete"].includes(sub.status)
    )) {
      return { eligible: false, trialEnd, remainingDays, reason: "already_subscribed" };
    }
  }

  return { eligible: true, trialEnd, remainingDays, reason: null };
}
