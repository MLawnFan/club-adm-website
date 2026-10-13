import { describe, expect, it } from "vitest";
import { buildFounderTimeline, formatFounderDate } from "@/online/lib/founderTimeline";

const paidAt = Date.UTC(2026, 8, 1, 16) / 1000;
const firstChargeAt = paidAt + 30 * 86400;

describe("FounderTimeline", () => {
  it("shows J23 and seven days remaining without adding a new trial", () => {
    const result = buildFounderTimeline(firstChargeAt, paidAt + 23 * 86400);
    expect(result).toEqual({
      purchaseAt: paidAt,
      trialEnd: firstChargeAt,
      elapsedDays: 23,
      remainingDays: 7,
      progressPercent: 77,
    });
  });

  it("also handles an immediate J0 offer using the same original end date", () => {
    const result = buildFounderTimeline(firstChargeAt, paidAt + 60);
    expect(result.elapsedDays).toBe(0);
    expect(result.remainingDays).toBe(30);
    expect(result.trialEnd).toBe(firstChargeAt);
  });

  it("clamps dates outside the original thirty-day period", () => {
    expect(buildFounderTimeline(firstChargeAt, paidAt - 3600).progressPercent).toBe(0);
    expect(buildFounderTimeline(firstChargeAt, firstChargeAt + 3600)).toMatchObject({
      elapsedDays: 30, remainingDays: 0, progressPercent: 100,
    });
  });

  it("formats the actual Stripe timestamp using Toronto time", () => {
    expect(formatFounderDate(firstChargeAt, true)).toContain("octobre 2026");
    expect(formatFounderDate(firstChargeAt, true)).toContain("12 h");
    expect(() => buildFounderTimeline(Number.NaN)).toThrow();
  });
});
