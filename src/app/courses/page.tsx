import { PageShell } from "@/components/layout/page-shell";
import { MyCoursesHeader } from "@/components/features/courses/my-courses-header";
import { MyCoursesView } from "@/components/features/courses/my-courses-view";

export default function MyCoursesPage() {
  return (
    <PageShell className="pt-1">
      <MyCoursesHeader />
      <MyCoursesView />
    </PageShell>
  );
}
