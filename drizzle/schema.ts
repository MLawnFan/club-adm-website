import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json } from "drizzle-orm/mysql-core";

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