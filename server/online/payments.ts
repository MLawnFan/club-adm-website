import type Stripe from "stripe";
import { getStripe } from "./client";
import {
  getStripeLineItem,
  STRIPE_PRODUCTS,
  type CheckoutProductKind,
} from "./products";
import { getFounderOffer } from "./founderOffer";

export type CheckoutRequest = {
  email: string;
  name: string;
  product: CheckoutProductKind;
  origin: string;
  manusUserId?: string;
  purchaseSessionId?: string;
};

export type CheckoutAccess = {
  checkoutSessionId: string;
  product: CheckoutProductKind | null;
  accessGranted: boolean;
  customerName: string | null;
  customerEmail: string | null;
  paymentStatus: string | null;
  subscriptionStatus: string | null;
};

export type PaymentSummary = CheckoutAccess & {
  amountTotal: number | null;
  currency: string | null;
  livemode: boolean;
  checkoutStatus: string | null;
  createdAt: number;
  trialEnd: number | null;
  portalAvailable: boolean;
};

function checkoutUrls(product: CheckoutProductKind, origin: string, purchaseSessionId?: string) {
  if (product === "programme") {
    return {
      successUrl: `${origin}/online-project/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/online-project/checkout?annule=1`,
    };
  }

  return {
    successUrl: `${origin}/online-project/communaute-confirmee?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${origin}/online-project/upsell?annule=1${purchaseSessionId ? `&achat=${encodeURIComponent(purchaseSessionId)}` : ""}`,
  };
}

function getObjectId(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "id" in value && typeof value.id === "string") {
    return value.id;
  }
  return null;
}

function productFromSession(session: Stripe.Checkout.Session): CheckoutProductKind | null {
  const product = session.metadata?.product_kind;
  return product && product in STRIPE_PRODUCTS ? (product as CheckoutProductKind) : null;
}

function customerNameFromSession(session: Stripe.Checkout.Session): string | null {
  return session.customer_details?.name ?? session.metadata?.customer_name ?? null;
}

function customerEmailFromSession(session: Stripe.Checkout.Session): string | null {
  return session.customer_details?.email ?? session.customer_email ?? session.metadata?.customer_email ?? null;
}

async function getSubscription(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
): Promise<Stripe.Subscription | null> {
  if (session.subscription && typeof session.subscription !== "string") {
    return session.subscription;
  }

  const subscriptionId = getObjectId(session.subscription);
  return subscriptionId ? stripe.subscriptions.retrieve(subscriptionId) : null;
}

async function summarizeAccess(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
): Promise<CheckoutAccess> {
  const product = productFromSession(session);
  const paymentStatus = session.payment_status ?? null;
  const subscription = session.mode === "subscription" ? await getSubscription(stripe, session) : null;
  const subscriptionStatus = subscription?.status ?? null;

  return {
    checkoutSessionId: session.id,
    product,
    accessGranted:
      product === "programme"
        ? paymentStatus === "paid"
        : product !== null && (subscriptionStatus === "active" || subscriptionStatus === "trialing"),
    customerName: customerNameFromSession(session),
    customerEmail: customerEmailFromSession(session),
    paymentStatus,
    subscriptionStatus,
  };
}

export async function createCheckoutSession(
  request: CheckoutRequest,
  stripe: Stripe = getStripe(),
): Promise<{ checkoutSessionId: string; url: string }> {
  const founderOffer = request.product === "community_founder"
    ? await getFounderOffer(request.purchaseSessionId ?? "", request.email, stripe)
    : null;
  if (founderOffer && (!founderOffer.eligible || !founderOffer.trialEnd)) {
    throw new Error("Cette offre demande un achat programme confirmé et une période incluse encore admissible.");
  }
  const product = STRIPE_PRODUCTS[request.product];
  const urls = checkoutUrls(request.product, request.origin, request.purchaseSessionId);
  const referenceId = request.manusUserId ?? `guest:${request.email}`;
  const metadata = {
    product_kind: request.product,
    user_id: referenceId,
    customer_email: request.email,
    customer_name: request.name,
    ...(request.manusUserId ? { manus_user_id: request.manusUserId } : {}),
    ...(founderOffer ? { program_purchase_session_id: request.purchaseSessionId! } : {}),
  };

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: product.mode,
    allow_promotion_codes: true,
    customer_email: request.email,
    client_reference_id: referenceId,
    metadata,
    line_items: [getStripeLineItem(request.product)],
    success_url: urls.successUrl,
    cancel_url: urls.cancelUrl,
    ...(product.mode === "subscription"
      ? {
          subscription_data: {
            ...(founderOffer?.trialEnd ? { trial_end: founderOffer.trialEnd } : {}),
            metadata,
          },
        }
      : { payment_intent_data: { metadata } }),
    ...(founderOffer ? { expires_at: Math.floor(Date.now() / 1000) + 1800 } : {}),
  };
  const session = founderOffer
    ? await stripe.checkout.sessions.create(sessionParams, {
        idempotencyKey: `founder:${request.purchaseSessionId}:${Math.floor(Date.now() / 1800000)}`,
      })
    : await stripe.checkout.sessions.create(sessionParams);

  if (!session.url) throw new Error("Stripe did not return a Checkout URL");
  return { checkoutSessionId: session.id, url: session.url };
}

export async function verifyCheckoutSession(
  checkoutSessionId: string,
  stripe: Stripe = getStripe(),
): Promise<CheckoutAccess> {
  const session = await stripe.checkout.sessions.retrieve(checkoutSessionId, {
    expand: ["subscription"],
  });
  return summarizeAccess(stripe, session);
}

export async function getPaymentSummary(
  checkoutSessionId: string,
  stripe: Stripe = getStripe(),
): Promise<PaymentSummary> {
  const session = await stripe.checkout.sessions.retrieve(checkoutSessionId, {
    expand: ["subscription"],
  });
  const access = await summarizeAccess(stripe, session);
  const subscription = session.mode === "subscription" ? await getSubscription(stripe, session) : null;

  return {
    ...access,
    amountTotal: session.amount_total ?? null,
    currency: session.currency ?? null,
    livemode: session.livemode === true,
    checkoutStatus: session.status ?? null,
    createdAt: session.created,
    trialEnd: subscription?.trial_end ?? null,
    portalAvailable: access.accessGranted && Boolean(getObjectId(session.customer)) && Boolean(subscription),
  };
}

export async function createCustomerPortalSession(
  input: { customerId: string; returnUrl: string },
  stripe: Stripe = getStripe(),
): Promise<{ url: string }> {
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: input.customerId,
    return_url: input.returnUrl,
  });
  return { url: portalSession.url };
}
