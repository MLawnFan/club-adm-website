import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import {
  createCheckoutSession,
  createCustomerPortalSession,
  getPaymentSummary,
  verifyCheckoutSession,
} from "./payments";
import { getFounderOffer } from "./founderOffer";
import { CHECKOUT_PRODUCT_KINDS } from "./products";

const checkoutInput = z.object({
  email: z.string().trim().email().max(320),
  name: z.string().trim().min(1).max(120),
  product: z.enum(CHECKOUT_PRODUCT_KINDS),
  purchaseSessionId: z.string().trim().max(255).optional(),
});

const sessionInput = z.object({
  checkoutSessionId: z.string().trim().min(1).max(255),
});

function requestOrigin(origin: string | undefined): string {
  if (!origin) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Origin header is required" });
  }

  try {
    const url = new URL(origin);
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error();
    return url.origin;
  } catch {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid Origin header" });
  }
}

export const paymentsRouter = router({
  configuration: publicProcedure.query(() => ({
    checkoutEnabled: process.env.ONLINE_PROJECT_CHECKOUT_ENABLED === "true" && Boolean(process.env.STRIPE_SECRET_KEY) && Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    guideDeliveryEnabled: false,
  })),
  founderOffer: publicProcedure.input(z.object({
    purchaseSessionId: z.string().trim().min(1).max(255),
  })).query(({ input }) => getFounderOffer(input.purchaseSessionId, null)),

  createCheckoutSession: publicProcedure.input(checkoutInput).mutation(async ({ ctx, input }) => {
    if (process.env.ONLINE_PROJECT_CHECKOUT_ENABLED !== "true" || !process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
      throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Paiement non activé sur cette version. La configuration Stripe et la remise doivent être validées avant lancement." });
    }
    return createCheckoutSession({
      ...input,
      email: input.email.toLowerCase(),
      origin: requestOrigin(ctx.req.headers.origin),
      manusUserId: ctx.user?.openId,
    });
  }),

  verifyCheckoutSession: publicProcedure.input(sessionInput).query(({ input }) =>
    verifyCheckoutSession(input.checkoutSessionId),
  ),

  getPaymentSummary: publicProcedure.input(sessionInput).query(({ input }) =>
    getPaymentSummary(input.checkoutSessionId),
  ),

  createCustomerPortalSession: publicProcedure
    .input(sessionInput)
    .mutation(async ({ ctx, input }) => {
      const summary = await verifyCheckoutSession(input.checkoutSessionId);
      if (!summary.accessGranted || summary.product === "programme") {
        throw new TRPCError({ code: "FORBIDDEN", message: "No active subscription found" });
      }

      const stripe = (await import("./client")).getStripe();
      const session = await stripe.checkout.sessions.retrieve(input.checkoutSessionId);
      const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id;
      if (!customerId) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Stripe customer not found" });
      }

      return createCustomerPortalSession({
        customerId,
        returnUrl: `${requestOrigin(ctx.req.headers.origin)}/online-project/mes-achats`,
      });
    }),
});
