const DAY_SECONDS = 24 * 60 * 60;
const INCLUDED_DAYS = 30;

export type FounderTimelineData = {
  purchaseAt: number;
  trialEnd: number;
  elapsedDays: number;
  remainingDays: number;
  progressPercent: number;
};

/** Stripe returns a verified, absolute Unix timestamp for the original trial end. */
export function buildFounderTimeline(trialEnd: number, now = Date.now() / 1000): FounderTimelineData {
  if (!Number.isFinite(trialEnd) || trialEnd <= 0) throw new Error("Invalid Stripe trial end");
  const purchaseAt = trialEnd - INCLUDED_DAYS * DAY_SECONDS;
  const elapsed = Math.max(0, Math.min(INCLUDED_DAYS, (now - purchaseAt) / DAY_SECONDS));
  return {
    purchaseAt,
    trialEnd,
    elapsedDays: Math.floor(elapsed),
    remainingDays: Math.ceil(INCLUDED_DAYS - elapsed),
    progressPercent: Math.round((elapsed / INCLUDED_DAYS) * 100),
  };
}

export function formatFounderDate(unixSeconds: number, withTime = false): string {
  return new Intl.DateTimeFormat("fr-CA", {
    dateStyle: "long",
    ...(withTime ? { timeStyle: "short" as const } : {}),
    timeZone: "America/Toronto",
  }).format(new Date(unixSeconds * 1000));
}
