"use client";

import { CalendarDays, Download, FileText, Image as ImageIcon, Mail, Settings2, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { attendance, officeHours, officialDownloads } from "@/lib/data/courses";

const dlIcon = {
  pdf: { I: FileText, cls: "text-danger-solid" },
  calendar: { I: CalendarDays, cls: "text-link" },
  image: { I: ImageIcon, cls: "text-success" },
} as const;

const timeCls = {
  green: "bg-success-soft text-success",
  blue: "bg-primary-soft text-link",
  neutral: "bg-surface-3 text-fg-2",
} as const;

export function MyCoursesSidebar() {
  const toast = useToast();
  return (
    <aside className="flex min-w-0 flex-col gap-6" aria-label="Course resources">
      <Card className="px-4 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-medium leading-7 tracking-[-0.02em] text-fg">Official Downloads</h2>
          <Settings2 className="size-5 text-link" aria-hidden />
        </div>
        <ul className="mt-4 flex flex-col gap-2.5">
          {officialDownloads.map((d) => {
            const { I, cls } = dlIcon[d.icon];
            return (
              <li key={d.id}>
                <button
                  type="button"
                  onClick={() => toast(`Download started (simulated): ${d.title}`)}
                  className="flex w-full items-center gap-3 rounded-xl bg-surface-2 px-3 py-3 text-left hover:bg-surface-3"
                >
                  <I className={cn("size-[22px] shrink-0", cls)} strokeWidth={1.75} aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold leading-5 text-fg">{d.title}</span>
                    <span className="block text-[12px] text-fg-2">{d.sub}</span>
                  </span>
                  <Download className="size-4 shrink-0 text-fg-2" aria-hidden />
                </button>
              </li>
            );
          })}
        </ul>
      </Card>

      <Card className="px-4 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-medium leading-7 tracking-[-0.02em] text-fg">Faculty Office Hours</h2>
          <button type="button" onClick={() => toast("Full schedule is not part of this prototype")} className="text-[12px] font-semibold text-link hover:underline">
            Today&apos;s Schedule
          </button>
        </div>
        <ul className="mt-4 flex flex-col gap-1.5">
          {officeHours.map((o) => (
            <li key={o.id} className="flex items-center justify-between gap-3 rounded-xl bg-surface-2/60 px-3 py-3">
              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold leading-5 text-fg">{o.name}</p>
                <p className="mt-1 text-[11px] text-fg-2">{o.sub}</p>
              </div>
              <span className={cn("shrink-0 rounded-md px-2.5 py-1 text-[12px] font-semibold", timeCls[o.tone])}>{o.time}</span>
            </li>
          ))}
        </ul>
        <Button
          variant="tinted"
          className="mt-3 h-10 w-full text-[14px] text-fg"
          onClick={() => toast("Appointment request sent to faculty (simulated)")}
        >
          <Mail className="size-4" aria-hidden /> Request Faculty Appointment
        </Button>
      </Card>

      <Card className="px-4 py-5">
        <h2 className="flex items-center gap-2 text-[14px] font-semibold text-success">
          <ShieldCheck className="size-[18px]" aria-hidden /> Autonomous Attendance Compliance
        </h2>
        <p className="mt-2 text-[13px] leading-[18px] text-fg-2">
          Current aggregate attendance stands at <strong className="font-semibold text-fg">88.5%</strong>. You are safely above the 75% institutional mandatory requirement for exam hall ticket generation.
        </p>
        <ul className="mt-3 flex flex-col gap-3">
          {attendance.map((a) => (
            <li key={a.label}>
              <div className="flex items-center justify-between text-[12px] font-semibold">
                <span className="text-fg">{a.label}</span>
                <span className={a.tone === "amber" ? "text-warning" : "text-fg"}>{a.value.toFixed(1)}%</span>
              </div>
              <ProgressBar value={a.value} tone={a.tone} height={5} className="mt-1" label={`${a.label} attendance ${a.value.toFixed(1)}%`} />
            </li>
          ))}
        </ul>
      </Card>
    </aside>
  );
}
