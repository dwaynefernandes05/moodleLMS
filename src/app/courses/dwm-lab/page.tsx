import { PageShell } from "@/components/layout/page-shell";
import { CourseDetail } from "@/components/features/courses/course-detail";

export default function DwmLabPage() {
  return (
    <PageShell className="pt-6">
      <CourseDetail />
    </PageShell>
  );
}
