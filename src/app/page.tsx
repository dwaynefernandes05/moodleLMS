import { PageShell } from "@/components/layout/page-shell";
import { WelcomeCard } from "@/components/features/dashboard/welcome-card";
import { UrgentBanner } from "@/components/features/dashboard/urgent-banner";
import { UpcomingSubmissions } from "@/components/features/dashboard/upcoming-submissions";
import { QuickAccess } from "@/components/features/dashboard/quick-access";
import { CalendarCard } from "@/components/features/dashboard/calendar-card";
import { NoticesCard } from "@/components/features/dashboard/notices-card";
import { VaultCard } from "@/components/features/dashboard/vault-card";

export default function DashboardPage() {
  return (
    <PageShell className="flex flex-col gap-6">
      <WelcomeCard />
      <UrgentBanner />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_395px]">
        <div className="flex min-w-0 flex-col gap-6">
          <UpcomingSubmissions />
          <QuickAccess />
        </div>
        <div className="flex min-w-0 flex-col gap-6">
          <CalendarCard />
          <NoticesCard />
          <VaultCard />
        </div>
      </div>
    </PageShell>
  );
}
