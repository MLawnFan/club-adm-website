import type Stripe from "stripe";

export const CHECKOUT_PRODUCT_KINDS = [
  "programme",
  "community_founder",
  "community_regular",
] as const;

export type CheckoutProductKind = (typeof CHECKOUT_PRODUCT_KINDS)[number];

type CheckoutProduct = {
  name: string;
  description: string;
  unitAmount: number;
  mode: "payment" | "subscription";
  recurring?: { interval: "month" };
};

/**
 * Prices are intentionally defined as dynamic Checkout price_data rather than
 * manually created Stripe Price IDs, so the checkout catalog lives in code.
 */
export const STRIPE_PRODUCTS: Record<CheckoutProductKind, CheckoutProduct> = {
  programme: {
    name: "Programme tout-en-un Club ADM",
    description: "Accès unique au programme tout-en-un Club ADM.",
    unitAmount: 3900,
    mode: "payment",
  },
  community_founder: {
    name: "Communauté ADM — tarif fondateur",
    description: "Continuité après les 30 jours déjà inclus avec le programme, puis 49 $/mois.",
    unitAmount: 4900,
    mode: "subscription",
    recurring: { interval: "month" },
  },
  community_regular: {
    name: "Communauté ADM — tarif régulier",
    description: "Abonnement mensuel à la Communauté ADM.",
    unitAmount: 7000,
    mode: "subscription",
    recurring: { interval: "month" },
  },
};

export function isCheckoutProductKind(value: string): value is CheckoutProductKind {
  return (CHECKOUT_PRODUCT_KINDS as readonly string[]).includes(value);
}

export function getStripeLineItem(
  kind: CheckoutProductKind,
): Stripe.Checkout.SessionCreateParams.LineItem {
  const product = STRIPE_PRODUCTS[kind];

  return {
    quantity: 1,
    price_data: {
      currency: "cad",
      unit_amount: product.unitAmount,
      product_data: {
        name: product.name,
        description: product.description,
      },
      ...(product.recurring ? { recurring: product.recurring } : {}),
    },
  };
}
