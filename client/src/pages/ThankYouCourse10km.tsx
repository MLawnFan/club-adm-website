import ThankYouCourseTemplate from "./ThankYouCourseTemplate";

const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/cfnRtYJPMcFSYVED4IcY/webhook-trigger/gi1DVOuCMk7VH3p2iAoF";

export default function ThankYouCourse10km() {
  return (
    <ThankYouCourseTemplate
      distance="10 km"
      distanceLabel="10 km"
      webhookUrl={WEBHOOK_URL}
      pagePath="/merci-course-10km"
    />
  );
}
