export type StripePopup = {
  closed: boolean;
  close: () => void;
  opener: unknown;
  location: { replace: (url: string) => void };
};

export function createStripePopup(): StripePopup | null {
  const popup = window.open("about:blank", "_blank") as StripePopup | null;
  if (popup) popup.opener = null;
  return popup;
}

export function redirectToStripeCheckout(
  popup: StripePopup | null,
  url: string,
  fallback: (url: string) => void = target => window.location.assign(target),
): "popup" | "same-tab" {
  if (popup && !popup.closed) {
    popup.location.replace(url);
    return "popup";
  }

  fallback(url);
  return "same-tab";
}

export function closeStripePopup(popup: StripePopup | null): void {
  if (popup && !popup.closed) popup.close();
}
