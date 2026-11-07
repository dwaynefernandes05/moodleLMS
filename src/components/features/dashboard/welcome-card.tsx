import { Card } from "@/components/ui/card";
import { ProgressRing } from "@/components/ui/progress";
import { welcome } from "@/lib/data/dashboard";

function StatCol({
  label,
  labelClass,
  children,
  divider = true,
}: {
  label: string;
  labelClass?: string;
  children: React.ReactNode;
  divider?: boolean;
}) {
  return (
    <div className="flex items-center">
      {divider && <span aria-hidden className="mr-6 hidden h-8 w-px bg-line-strong/70 sm:block lg:mr-8" />}
      <div>
        <div className={`text-[11px] font-medium uppercase leading-4 tracking-[0.08em] text-fg-2 ${labelClass ?? ""}`}>{label}</div>
        <div className="mt-0.5 text-[18px] font-medium leading-6 text-fg">{children}</div>
      </div>
    </div>
  );
}

export function WelcomeCard() {
  return (
    <Card className="flex flex-col gap-6 px-6 py-[22px] lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-[30px] font-bold leading-[38px] tracking-[-0.02em] text-fg">
          {welcome.title} <span aria-hidden>👋</span>
        </h1>
        <span className="mt-1.5 inline-flex rounded-full bg-surface-4 px-2.5 py-[3px] text-[11px] font-semibold uppercase tracking-[0.03em] text-link">
          {welcome.chip}
        </span>
        <p className="mt-2 text-[14px] text-fg-2">{welcome.subline}</p>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:flex sm:items-center sm:gap-0 sm:pr-4">
        <div className="flex items-center gap-3 sm:pr-6 lg:pr-8">
          <ProgressRing value={welcome.progress} size={46} stroke={3.5}>
            <span className="text-[11px] font-bold">{welcome.progress}%</span>
          </ProgressRing>
          <div>
            <div className="text-[11px] font-medium uppercase leading-4 tracking-[0.08em] text-fg-2">Semester</div>
            <div className="mt-0.5 text-[14px] font-medium leading-5 text-fg">Progress</div>
          </div>
        </div>
        <StatCol label="Active Courses">{welcome.activeCourses}</StatCol>
        <StatCol label="Pending Deadlines" labelClass="!text-warning-solid">
          <span className="inline-flex items-center gap-1.5">
            {welcome.pendingDeadlines}
            <span aria-hidden className="size-1.5 rounded-full bg-warning-solid" />
          </span>
        </StatCol>
        <StatCol label="Overdue" labelClass="!text-success-solid">
          <span className="text-success-solid">{welcome.overdue}</span>
        </StatCol>
      </div>
    </Card>
  );
}
