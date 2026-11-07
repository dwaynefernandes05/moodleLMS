import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { notices } from "@/lib/data/notices";
import { cn } from "@/lib/utils";

const tone = {
  red: "text-danger-solid dark:text-danger",
  blue: "text-link",
  green: "text-success",
} as const;

export const metadata = { title: "Announcements & Updates – SPIT Moodle" };

export default function AnnouncementsPage() {
  return (
    <PageShell className="pt-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Announcements & Updates" }]} />
      <h1 className="mt-6 text-[36px] font-bold leading-[44px] tracking-[-0.035em] text-fg">Announcements &amp; Updates</h1>
      <p className="mt-1.5 text-[14px] text-fg-2">Department Notices</p>
      <Card className="mt-6 max-w-[820px] px-6 py-6">
        <ul className="flex flex-col gap-3">
          {notices.map((n) => (
            <li key={n.id} className="rounded-lg bg-surface-2 px-4 py-3.5">
              <div className="flex items-center justify-between gap-2">
                <span className={cn("text-[11px] font-bold uppercase tracking-[0.04em]", tone[n.tone])}>{n.source}</span>
                <span className="text-[12px] font-semibold text-fg-2">{n.time}</span>
              </div>
              <h2 className="mt-1 text-[16px] font-semibold leading-[22px] tracking-[-0.01em] text-fg">{n.title}</h2>
              <p className="mt-1.5 text-[13px] leading-[18px] text-fg-2">{n.description}</p>
            </li>
          ))}
        </ul>
      </Card>
    </PageShell>
  );
}
