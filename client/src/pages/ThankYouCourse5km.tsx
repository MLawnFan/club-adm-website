import ThankYouCourseTemplate from "./ThankYouCourseTemplate";

const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/cfnRtYJPMcFSYVED4IcY/webhook-trigger/OKZ424YD3u1bTIgB8mB1";

export default function ThankYouCourse5km() {
  return (
    <ThankYouCourseTemplate
      distance="5 km"
      distanceLabel="5 km"
      webhookUrl={WEBHOOK_URL}
      pagePath="/merci-course-5km"
    />
  );
}
