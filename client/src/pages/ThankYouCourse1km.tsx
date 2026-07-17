import { useEffect } from "react";
import ThankYouCourseTemplate from "./ThankYouCourseTemplate";

const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/cfnRtYJPMcFSYVED4IcY/webhook-trigger/Nrchokcq7TnqUGht74mF";

export default function ThankYouCourse1km() {
  // Déclencher le webhook automatiquement à l'arrivée sur la page
  useEffect(() => {
    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "page_view_merci_1km",
        distance: "1 km",
        page: "/merci-course-1km",
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {
      // Silently fail - ne pas bloquer l'expérience utilisateur
    });
  }, []);

  return (
    <ThankYouCourseTemplate
      distance="1 km"
      distanceLabel="Course familiale (1 km)"
      webhookUrl={WEBHOOK_URL}
      pagePath="/merci-course-1km"
      showPlanForm={false}
    />
  );
}
