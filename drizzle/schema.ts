import { bigint, index, int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, uniqueIndex } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

/**
 * Programme progress tracking — stores each user's progress through the 14 modules
 */
export const programmeProgress = mysqlTable("programme_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(),
  completed: int("completed").default(0).notNull(),
  completedAt: timestamp("completedAt"),
  checkinData: json("checkinData"),
  xpEarned: int("xpEarned").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/**
 * User programme enrollment and overall stats
 */
export const programmeEnrollment = mysqlTable("programme_enrollment", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  programmeSlug: varchar("programmeSlug", { length: 100 }).notNull().default("on-rstart-la-machine"),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  currentModule: int("currentModule").default(1).notNull(),
  totalXp: int("totalXp").default(0).notNull(),
  streak: int("streak").default(0).notNull(),
  level: varchar("level", { length: 50 }).default("Débutant").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type ProgrammeProgress = typeof programmeProgress.$inferSelect;
export type InsertProgrammeProgress = typeof programmeProgress.$inferInsert;
export type ProgrammeEnrollment = typeof programmeEnrollment.$inferSelect;
export type InsertProgrammeEnrollment = typeof programmeEnrollment.$inferInsert;

export const memberOnboarding = mysqlTable("member_onboarding", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  product: mysqlEnum("product", ["rstart", "starter"]).notNull(),
  answers: json("answers").notNull(),
  step: int("step").default(0).notNull(),
  status: mysqlEnum("status", ["draft", "needs_review", "referred"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, table => [uniqueIndex("member_onboarding_user_product").on(table.userId, table.product)]);

/** Marketing only: no account identity, form contents, health answers, raw URL or IP. */
export const marketingEvents = mysqlTable("marketing_events", {
  id: int("id").autoincrement().primaryKey(),
  eventId: varchar("eventId", { length: 36 }).notNull().unique(),
  visitorId: varchar("visitorId", { length: 36 }).notNull(),
  visitId: varchar("visitId", { length: 36 }).notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  page: varchar("page", { length: 80 }).notNull(),
  device: varchar("device", { length: 12 }).notNull(),
  source: varchar("source", { length: 16 }).notNull(),
  campaign: varchar("campaign", { length: 60 }).notNull().default(""),
  service: varchar("service", { length: 20 }),
  placement: varchar("placement", { length: 20 }),
  video: varchar("video", { length: 20 }),
  step: int("step"),
  occurredAt: bigint("occurredAt", { mode: "number" }).notNull(),
}, t => [index("marketing_events_time").on(t.occurredAt), index("marketing_events_visit").on(t.visitId)]);

export const consultationRequests = mysqlTable("consultation_requests", {
  id: int("id").autoincrement().primaryKey(),
  submissionId: varchar("submissionId", { length: 36 }).notNull().unique(),
  firstName: varchar("firstName", { length: 80 }).notNull(),
  lastName: varchar("lastName", { length: 80 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  location: varchar("location", { length: 20 }).notNull(),
  objective: varchar("objective", { length: 120 }),
  message: text("message"),
  contactConsent: int("contactConsent").notNull(),
  status: mysqlEnum("status", ["new", "contacted", "closed"]).notNull().default("new"),
  createdAt: bigint("createdAt", { mode: "number" }).notNull(),
}, t => [index("consultation_requests_time").on(t.createdAt)]);

export const marketingPurchases = mysqlTable("marketing_purchases", {
  id: int("id").autoincrement().primaryKey(),
  purchaseHash: varchar("purchaseHash", { length: 64 }).notNull().unique(),
  amountCents: int("amountCents").notNull(),
  currency: varchar("currency", { length: 3 }).notNull(),
  product: varchar("product", { length: 30 }).notNull(),
  occurredAt: bigint("occurredAt", { mode: "number" }).notNull(),
}, t => [index("marketing_purchases_time").on(t.occurredAt)]);
