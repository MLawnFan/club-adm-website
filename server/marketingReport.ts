import { and, gte, lt, asc, sql } from "drizzle-orm";
import { getDb } from "./db";
import { marketingEvents, consultationRequests, marketingPurchases } from "../drizzle/schema";
import { reportRange, summarizeMarketing, type MarketingRow } from "../shared/marketingAnalytics";
import { createHash } from "node:crypto";
import type { PaymentSummary } from "./online/payments";

export async function getMarketingReport(days: number, now = Date.now()) {
  const db = await getDb(); if (!db) throw new Error("Statistiques indisponibles : base inaccessible.");
  const range = reportRange(days, now);
  // Previous period uses local calendar days too, including daylight-saving transitions.
  const { midnight, shiftDate } = await import("../shared/marketingAnalytics");
  const startBefore = midnight(shiftDate(range.startDate, -days));
  const all = await db.select().from(marketingEvents).where(and(gte(marketingEvents.occurredAt, startBefore), lt(marketingEvents.occurredAt, range.end))).orderBy(asc(marketingEvents.occurredAt)).limit(50001);
  if (all.length > 50000) throw new Error("Volume trop élevé pour ce rapport : aucun résultat tronqué n’est présenté.");
  const rows = all.map(({ id, ...row }) => Object.fromEntries(Object.entries(row).filter(([, v]) => v !== null)) as MarketingRow);
  const current = summarizeMarketing(rows.filter(r => r.occurredAt >= range.start));
  const previous = summarizeMarketing(rows.filter(r => r.occurredAt < range.start));
  const [leadCount] = await db.select({ count: sql<number>`count(*)` }).from(consultationRequests).where(and(gte(consultationRequests.createdAt, range.start), lt(consultationRequests.createdAt, range.end)));
  const [priorCount] = await db.select({ count: sql<number>`count(*)` }).from(consultationRequests).where(and(gte(consultationRequests.createdAt, startBefore), lt(consultationRequests.createdAt, range.start)));
  const [coverage] = await db.select({ first: sql<number | null>`min(${marketingEvents.occurredAt})`, last: sql<number | null>`max(${marketingEvents.occurredAt})` }).from(marketingEvents);
  const purchases = await db.select().from(marketingPurchases).where(and(gte(marketingPurchases.occurredAt, range.start), lt(marketingPurchases.occurredAt, range.end)));
  const paymentsConfigured = process.env.ONLINE_PROJECT_CHECKOUT_ENABLED === "true" && Boolean(process.env.STRIPE_SECRET_KEY) && Boolean(process.env.STRIPE_WEBHOOK_SECRET);
  return { range, current, previous, requests: Number(leadCount.count), previousRequests: Number(priorCount.count), coverage: { first: coverage.first === null ? null : Number(coverage.first), last: coverage.last === null ? null : Number(coverage.last) }, purchases: paymentsConfigured ? { count: purchases.length, cadCents: purchases.filter(p => p.currency === "cad").reduce((a, p) => a + p.amountCents, 0) } : null, generatedAt: now, source: "Suivi privé Club ADM, en parallèle des événements Umami. Visiteurs estimés parmi les personnes ayant accepté le suivi; hors tests et comptes administrateurs." };
}

/** Server-verified Stripe data only. No customer data or raw Stripe ID retained. */
export async function recordVerifiedPurchase(summary: PaymentSummary) {
  if (!summary.livemode || summary.checkoutStatus !== "complete" || summary.paymentStatus !== "paid" || summary.product !== "programme" || summary.amountTotal === null || summary.amountTotal <= 0 || !summary.currency) return;
  const db = await getDb(); if (!db) return;
  const hash = createHash("sha256").update(summary.checkoutSessionId).digest("hex");
  await db.insert(marketingPurchases).values({ purchaseHash: hash, amountCents: summary.amountTotal, currency: summary.currency.toLowerCase(), product: summary.product, occurredAt: summary.createdAt * 1000 }).onDuplicateKeyUpdate({ set: { purchaseHash: hash } });
}
