import { PageShell } from "@/components/layout/page-shell";
import { AssignmentsHeader } from "@/components/features/assignments/assignments-header";
import { AssignmentsView } from "@/components/features/assignments/assignments-view";

export default function AssignmentsPage() {
  return (
    <PageShell className="pt-5">
      <AssignmentsHeader />
      <AssignmentsView />
    </PageShell>
  );
}
