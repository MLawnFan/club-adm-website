export type PurchaseConfirmationState = "missing" | "loading" | "failed" | "success";

export function getPurchaseConfirmationState(input: {
  sessionId: string;
  isPending: boolean;
  isError: boolean;
  accessGranted?: boolean;
  product?: string | null;
}): PurchaseConfirmationState {
  if (!input.sessionId) return "missing";
  if (input.isPending) return "loading";
  if (input.isError || input.accessGranted !== true || input.product !== "programme") return "failed";
  return "success";
}
