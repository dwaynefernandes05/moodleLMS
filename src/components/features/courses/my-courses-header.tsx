import { ClockAlert, Star, ListChecks } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

function Stat({
  label,
  icon,
  children,
  sub,
  className,
  tone = "default",
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  sub: React.ReactNode;
  className?: string;
  tone?: "default" | "red";
}) {
  return (
    <div className={cn("flex w-[124px] flex-col rounded-2xl px-3.5 py-3.5", tone === "red" ? "bg-danger-soft" : "bg-surface-2", className)}>
      <div className={cn("flex items-center justify-between gap-2 whitespace-nowrap text-[12px] font-medium", tone === "red" ? "text-danger-solid dark:text-danger" : "text-fg-2")}>
        {label}
        {icon}
      </div>
      <div className="mt-1 flex items-baseline gap-1.5">{children}</div>
      <div className="mt-2 text-[12px] font-medium leading-4">{sub}</div>
    </div>
  );
}

export function MyCoursesHeader() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
        <Breadcrumb
          separator="slash"
          homeIcon
          items={[{ label: "Home", href: "/" }, { label: "Academic Hub", href: "/" }, { label: "My Courses" }]}
        />
        <div className="flex items-center gap-3 text-[12px]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 font-semibold text-link">
            <span aria-hidden className="size-1.5 rounded-full bg-current" /> Autonomous Curriculum 2024-25
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium text-fg-2">
            <span aria-hidden className="size-1.5 rounded-full bg-fg-muted/50" /> Odd Semester (July – Dec)
          </span>
        </div>
      </div>

      <div className="mt-[52px] flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-[600px]">
          <div className="flex items-center gap-2.5">
            <span className="rounded-md bg-surface-4 px-2 py-[3px] text-[12px] font-bold text-fg">COMP-VII</span>
            <span className="text-[14px] font-medium text-link">Department of Computer Engineering</span>
          </div>
          <h1 className="mt-1.5 text-[35px] font-bold leading-[44px] tracking-[-0.03em] text-fg">My Courses &amp; Enrolments</h1>
        </div>

        <div className="flex flex-wrap items-start gap-3 lg:-mt-5 lg:flex-nowrap">
          <Stat
            label="Active Enrolment"
            icon={null}
            sub={<span className="text-link">2 Practicals</span>}
          >
            <span className="text-[28px] font-bold leading-9 tracking-[-0.02em] text-fg">6</span>
            <span className="text-[12px] font-medium text-fg-2">Courses</span>
          </Stat>
          <Stat label="Attendance" icon={<ListChecks className="size-4 text-success" aria-hidden />} sub={<span className="text-fg-2">&gt; 75% Safe Margin</span>}>
            <span className="text-[28px] font-bold leading-9 tracking-[-0.02em] text-success">88.5%</span>
          </Stat>
          <Stat label="CGPA Metric" icon={<Star className="size-4 text-link" aria-hidden />} sub={<span className="text-link">Sem VI: 9.15</span>}>
            <span className="text-[28px] font-bold leading-9 tracking-[-0.02em] text-fg">8.92</span>
            <span className="text-[12px] font-medium text-fg-2">/ 10</span>
          </Stat>
          <Stat
            tone="red"
            label="Urgent Task"
            icon={<ClockAlert className="size-4 text-danger-solid" aria-hidden />}
            sub={<span className="text-danger-solid dark:text-danger">DWM Lab (18h)</span>}
          >
            <span className="text-[28px] font-bold leading-9 tracking-[-0.02em] text-danger-solid dark:text-danger">1</span>
            <span className="text-[12px] font-medium text-danger-solid dark:text-danger">Due</span>
          </Stat>
        </div>
      </div>
    </>
  );
}
