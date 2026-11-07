import { PageShell } from "@/components/layout/page-shell";
import { ProfileView } from "@/components/features/profile/profile-view";

export default function ProfilePage() {
  return (
    <PageShell className="pt-[34px]">
      <ProfileView />
    </PageShell>
  );
}
