import { useEffect, useSyncExternalStore } from "react";
import { useLocation } from "@/online/lib/navigation.tsx";
import { getAdvertisingConsent, subscribeAdvertisingConsent, trackMetaPageView } from "@/online/lib/metaPixel";

/** Controls are now shared in MarketingAnalytics: analytics never implies advertising consent. */
export default function MetaPixelConsent() {
  const [path] = useLocation();
  const consent = useSyncExternalStore(subscribeAdvertisingConsent, getAdvertisingConsent, () => null);
  useEffect(() => { if (consent === "accepted") trackMetaPageView(path); }, [consent, path]);
  return null;
}
