import ThankYouCourseTemplate from "./ThankYouCourseTemplate";

const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/cfnRtYJPMcFSYVED4IcY/webhook-trigger/dc2b1ca6-b3ef-466d-81e6-1b136c6f096c";

export default function ThankYouCourse1km() {
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
