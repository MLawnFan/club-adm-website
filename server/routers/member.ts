import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { memberOnboarding } from "../../drizzle/schema";
import {
  memberAnswersSchema,
  memberProductSchema,
  missingForStep,
  numericProfileIssue,
  triageMember,
} from "../../shared/memberOnboarding";

export const memberRouter = router({
  getOnboarding: protectedProcedure
    .input(
      z.object({
        product: memberProductSchema,
        accountCacheKey: z.string().max(64).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      // accountCacheKey only partitions the UI cache; authorization always uses ctx.user.id.
      const db = await getDb();
      if (!db)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Le dossier est temporairement indisponible.",
        });
      const rows = await db
        .select()
        .from(memberOnboarding)
        .where(
          and(
            eq(memberOnboarding.userId, ctx.user.id),
            eq(memberOnboarding.product, input.product)
          )
        )
        .limit(1);
      return rows[0] || null;
    }),
  saveOnboarding: protectedProcedure
    .input(
      z.object({
        product: memberProductSchema,
        answers: memberAnswersSchema,
        step: z.number().int().min(0).max(5),
        submit: z.boolean().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!input.answers.consent)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Ton consentement est nécessaire pour enregistrer ce questionnaire privé.",
        });
      const issue = numericProfileIssue(input.answers);
      if (issue) throw new TRPCError({ code: "BAD_REQUEST", message: issue });
      if (
        input.submit &&
        [0, 1, 2, 3, 4, 5].some(
          step => missingForStep(input.answers, step).length > 0
        )
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Complète les étapes ou indique les informations que tu préfères ne pas partager.",
        });
      }
      const status: "draft" | "needs_review" | "referred" = input.submit
        ? triageMember(input.answers)
        : "draft";
      const db = await getDb();
      if (!db)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "L’enregistrement est temporairement indisponible. Tes réponses restent à l’écran.",
        });
      const updatedAt = new Date();
      await db
        .insert(memberOnboarding)
        .values({
          userId: ctx.user.id,
          product: input.product,
          answers: input.answers,
          step: input.step,
          status,
          updatedAt,
        })
        .onDuplicateKeyUpdate({
          set: { answers: input.answers, step: input.step, status, updatedAt },
        });
      return { status, updatedAt };
    }),
});
