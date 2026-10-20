import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createHash } from "node:crypto";
import { eq } from "drizzle-orm";
import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { consultationRequests, marketingEvents } from "../../drizzle/schema";
import { marketingEventSchema, productionHost } from "../../shared/marketingAnalytics";
import { notifyOwner } from "../_core/notification";
import { getMarketingReport } from "../marketingReport";

const admin = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Accès réservé à l’administration." });
  return next({ ctx });
});
export const consultationInput = z.object({
  submissionId: z.string().uuid(), firstName: z.string().trim().min(1).max(80), lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(320), phone: z.string().trim().min(7).max(40).regex(/^[+()\d\s.-]+$/).refine(v => v.replace(/\D/g, "").length >= 7),
  location: z.enum(["Brossard", "Chambly"]), objective: z.string().trim().max(120).default(""), message: z.string().trim().max(2000).default(""),
  contactConsent: z.literal(true), website: z.string().max(0).default(""),
  analytics: marketingEventSchema.omit({ name: true, eventId: true }).optional(),
}).strict();
const limits = new Map<string, { count: number; until: number }>();
function limit(ip: string | undefined, name: string, maximum: number) {
  const key = createHash("sha256").update(`${process.env.JWT_SECRET || "rate"}:${ip || "unknown"}:${name}`).digest("hex");
  const now = Date.now(), current = limits.get(key);
  if (!current || current.until < now) {
    if (limits.size > 2000) limits.clear();
    limits.set(key, { count: 1, until: now + 60000 }); return;
  }
  if (++current.count > maximum) throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Trop de demandes. Réessaie dans une minute." });
}
function liveOrigin(origin: string | undefined) {
  try { const u = new URL(origin || ""); return u.protocol === "https:" && productionHost(u.hostname) && process.env.NODE_ENV === "production"; }
  catch { return false; }
}
export const marketingRouter = router({
  record: publicProcedure.input(marketingEventSchema).mutation(async ({ ctx, input }) => {
    if (!liveOrigin(ctx.req.headers.origin) || ctx.user?.role === "admin") return { recorded: false };
    if (input.name === "consultation_demande_confirmee") throw new TRPCError({ code: "FORBIDDEN", message: "Événement réservé au serveur." });
    limit(ctx.req.ip, "events", 240);
    const db = await getDb();
    if (!db) return { recorded: false };
    await db.insert(marketingEvents).values({ ...input, occurredAt: Date.now() }).onDuplicateKeyUpdate({ set: { eventId: input.eventId } });
    return { recorded: true };
  }),
  submitConsultation: publicProcedure.input(consultationInput).mutation(async ({ ctx, input }) => {
    if (!liveOrigin(ctx.req.headers.origin)) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Les demandes sont activées sur le site publié seulement. Aucun profil de test n’est enregistré depuis l’aperçu." });
    limit(ctx.req.ip, "consultation", 8);
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "La demande n’a pas pu être enregistrée. Réessaie ou téléphone-nous." });
    const prior = await db.select({ id: consultationRequests.id }).from(consultationRequests).where(eq(consultationRequests.submissionId, input.submissionId)).limit(1);
    if (prior.length) return { received: true, duplicate: true };
    const { analytics, website, ...contact } = input;
    const inserted = await db.insert(consultationRequests).values({ ...contact, email: contact.email.toLowerCase(), contactConsent: 1, createdAt: Date.now() }).onDuplicateKeyUpdate({ set: { submissionId: input.submissionId } });
    if (analytics && ctx.user?.role !== "admin") {
      try { await db.insert(marketingEvents).values({ ...analytics, page: "/consultation-gratuite", name: "consultation_demande_confirmee", eventId: input.submissionId, occurredAt: Date.now() }).onDuplicateKeyUpdate({ set: { eventId: input.submissionId } }); } catch { /* Receiving a lead must not depend on optional analytics. */ }
    }
    // Notification contains no form contents or health information; private dashboard is the inbox.
    if (inserted[0].affectedRows === 1) {
      try { await notifyOwner({ title: "Nouvelle demande de consultation Club ADM", content: "Une demande a été enregistrée dans la boîte privée du site. Consulte /admin/ventes pour la traiter. Une demande n’est pas encore un rendez-vous réservé." }); } catch { /* Lead remains safely saved. */ }
    }
    return { received: true, duplicate: false };
  }),
  report: admin.input(z.object({ days: z.union([z.literal(1), z.literal(7), z.literal(30)]).default(7) })).query(({ input }) => getMarketingReport(input.days)),
  leads: admin.query(async () => {
    const db = await getDb(); if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Base inaccessible." });
    const { desc } = await import("drizzle-orm");
    return db.select().from(consultationRequests).orderBy(desc(consultationRequests.createdAt)).limit(50);
  }),
  updateLead: admin.input(z.object({ id: z.number().int().positive(), status: z.enum(["new", "contacted", "closed"]) })).mutation(async ({ input }) => {
    const db = await getDb(); if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Base inaccessible." });
    await db.update(consultationRequests).set({ status: input.status }).where(eq(consultationRequests.id, input.id));
    return { success: true };
  }),
});
