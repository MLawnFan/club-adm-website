import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { programmeEnrollment, programmeProgress } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  programme: router({
    getEnrollment: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return null;
      const existing = await db.select().from(programmeEnrollment)
        .where(eq(programmeEnrollment.userId, ctx.user.id))
        .limit(1);
      if (existing.length > 0) return existing[0];
      return null;
    }),

    startProgramme: protectedProcedure.mutation(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const existing = await db.select().from(programmeEnrollment)
        .where(eq(programmeEnrollment.userId, ctx.user.id))
        .limit(1);
      if (existing.length > 0) return existing[0];
      await db.insert(programmeEnrollment).values({
        userId: ctx.user.id,
        programmeSlug: "on-rstart-la-machine",
        currentModule: 1,
        totalXp: 0,
        streak: 0,
        level: "D\u00e9butant",
      });
      const result = await db.select().from(programmeEnrollment)
        .where(eq(programmeEnrollment.userId, ctx.user.id))
        .limit(1);
      return result[0];
    }),

    getProgress: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(programmeProgress)
        .where(eq(programmeProgress.userId, ctx.user.id));
    }),

    completeModule: protectedProcedure
      .input(z.object({
        moduleId: z.number().min(1).max(14),
        checkinData: z.record(z.string(), z.number()).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const existing = await db.select().from(programmeProgress)
          .where(and(
            eq(programmeProgress.userId, ctx.user.id),
            eq(programmeProgress.moduleId, input.moduleId)
          ))
          .limit(1);
        const xpForModule = 100;
        if (existing.length > 0) {
          await db.update(programmeProgress)
            .set({
              completed: 1,
              completedAt: new Date(),
              checkinData: input.checkinData || existing[0].checkinData,
              xpEarned: xpForModule,
            })
            .where(eq(programmeProgress.id, existing[0].id));
        } else {
          await db.insert(programmeProgress).values({
            userId: ctx.user.id,
            moduleId: input.moduleId,
            completed: 1,
            completedAt: new Date(),
            checkinData: input.checkinData || null,
            xpEarned: xpForModule,
          });
        }
        const allProgress = await db.select().from(programmeProgress)
          .where(eq(programmeProgress.userId, ctx.user.id));
        const totalXp = allProgress.reduce((sum, p) => sum + p.xpEarned, 0);
        const completedCount = allProgress.filter(p => p.completed === 1).length;
        let level = "D\u00e9butant";
        if (completedCount >= 12) level = "L\u00e9gende";
        else if (completedCount >= 9) level = "Machine";
        else if (completedCount >= 6) level = "Momentum";
        else if (completedCount >= 3) level = "En marche";
        const nextModule = Math.min(input.moduleId + 1, 14);
        await db.update(programmeEnrollment)
          .set({ totalXp, currentModule: nextModule, level, streak: completedCount })
          .where(eq(programmeEnrollment.userId, ctx.user.id));
        return { success: true, xpEarned: xpForModule, totalXp, level };
      }),

    saveCheckin: protectedProcedure
      .input(z.object({
        moduleId: z.number().min(1).max(14),
        checkinData: z.record(z.string(), z.number()),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const existing = await db.select().from(programmeProgress)
          .where(and(
            eq(programmeProgress.userId, ctx.user.id),
            eq(programmeProgress.moduleId, input.moduleId)
          ))
          .limit(1);
        if (existing.length > 0) {
          await db.update(programmeProgress)
            .set({ checkinData: input.checkinData })
            .where(eq(programmeProgress.id, existing[0].id));
        } else {
          await db.insert(programmeProgress).values({
            userId: ctx.user.id,
            moduleId: input.moduleId,
            completed: 0,
            checkinData: input.checkinData,
            xpEarned: 0,
          });
        }
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
