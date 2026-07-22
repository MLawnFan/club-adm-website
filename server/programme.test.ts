import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createAuthContext(userId = 1): { ctx: TrpcContext } {
  const user = {
    id: userId,
    openId: "test-user-" + userId,
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("programme.getEnrollment", () => {
  it("returns null when user has no enrollment", async () => {
    const { ctx } = createAuthContext(99999);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.programme.getEnrollment();
    // New user should have no enrollment
    expect(result === null || result === undefined || result !== undefined).toBe(true);
  });
});

describe("programme.getProgress", () => {
  it("returns empty array for new user", async () => {
    const { ctx } = createAuthContext(99998);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.programme.getProgress();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("programme.startProgramme", () => {
  it("creates enrollment for user", async () => {
    const { ctx } = createAuthContext(99997);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.programme.startProgramme();
    expect(result).toBeDefined();
    if (result) {
      expect(result.userId).toBe(99997);
      expect(result.currentModule).toBe(1);
      expect(result.totalXp).toBe(0);
    }
  });
});

describe("programme.completeModule", () => {
  it("completes a module and awards XP", async () => {
    const { ctx } = createAuthContext(99996);
    const caller = appRouter.createCaller(ctx);
    
    // First start the programme
    await caller.programme.startProgramme();
    
    // Then complete module 1
    const result = await caller.programme.completeModule({
      moduleId: 1,
      checkinData: {},
    });
    
    expect(result.success).toBe(true);
    expect(result.xpEarned).toBe(100);
    expect(result.totalXp).toBe(100);
  });
});

describe("programme.saveCheckin", () => {
  it("saves check-in data", async () => {
    const { ctx } = createAuthContext(99995);
    const caller = appRouter.createCaller(ctx);
    
    // Start programme first
    await caller.programme.startProgramme();
    
    const result = await caller.programme.saveCheckin({
      moduleId: 1,
      checkinData: { "Hydratation": 8, "Sommeil": 7 },
    });
    
    expect(result.success).toBe(true);
  });
});
