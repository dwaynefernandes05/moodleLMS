import { PageShell } from "@/components/layout/page-shell";
import { GradesView } from "@/components/features/grades/grades-view";

export default function GradesPage() {
  return (
    <PageShell className="pt-6">
      <GradesView />
    </PageShell>
  );
}
