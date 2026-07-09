/*
 * PAGE THANK YOU — Événement Course (route générique /merci-course)
 * Redirige vers le template avec la distance générique
 * Les pages spécifiques par distance sont: /merci-course-21km, /merci-course-10km, /merci-course-5km, /merci-course-1km
 */
import ThankYouCourseTemplate from "./ThankYouCourseTemplate";

const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/cfnRtYJPMcFSYVED4IcY/webhook-trigger/dc2b1ca6-b3ef-466d-81e6-1b136c6f096c";

export default function ThankYouCourse() {
  return (
    <ThankYouCourseTemplate
      distance="course"
      distanceLabel="Course du 19 septembre"
      webhookUrl={WEBHOOK_URL}
      pagePath="/merci-course"
    />
  );
}
