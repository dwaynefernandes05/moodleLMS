"use client";

import Link from "next/link";
import { CalendarDays, CheckCircle2, ChevronRight, ClipboardList, CloudUpload, FileEdit, HelpCircle, ListX, Timer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button, IconButton } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { upcoming, type UpcomingItem } from "@/lib/data/dashboard";

function RowIcon({ kind }: { kind: UpcomingItem["kind"] }) {
  if (kind === "graded") {
    return (
      <span aria-hidden className="flex size-10 items-center justify-center rounded-xl bg-success-soft">
        <CheckCircle2 className="size-6 fill-success-solid text-white" />
      </span>
    );
  }
  const map = {
    pending: { icon: <ClipboardList className="size-[22px]" />, cls: "bg-[#fff6dc] text-[#d98a00] dark:bg-warning-soft dark:text-warning" },
    draft: { icon: <FileEdit className="size-[22px]" />, cls: "text-link" },
    quiz: { icon: <HelpCircle className="size-[22px]" />, cls: "bg-surface-3 text-fg-2" },
  } as const;
  const m = map[kind];
  return (
    <span aria-hidden className={cn("flex size-10 items-center justify-center rounded-xl", m.cls)}>
      {m.icon}
    </span>
  );
}

function Row({ item }: { item: UpcomingItem }) {
  const toast = useToast();
  const graded = item.kind === "graded";
  const chipCls = {
    pending: "bg-warning-soft text-warning",
    draft: "text-link",
    quiz: "bg-surface-3 text-fg-2",
    graded: "bg-success-soft text-success",
  }[item.kind];

  return (
    <div className={cn("flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between", graded ? "bg-success-soft/60" : "bg-surface-2")}>
      <div className="flex min-w-0 items-start gap-4">
        <RowIcon kind={item.kind} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <h3 className="text-[20px] font-medium leading-6 tracking-[-0.02em] text-fg">{item.title}</h3>
            {!graded && (
              <span className={cn("rounded-full px-2 py-[2px] text-[11px] font-semibold leading-4", chipCls)}>{item.chip}</span>
            )}
          </div>
          {graded && (
            <span className={cn("mt-1.5 inline-block rounded-full px-2 py-[2px] text-[12px] font-semibold leading-4", chipCls)}>{item.chip}</span>
          )}
          <p className="mt-1 text-[13px] leading-5 text-fg-2">{item.course}</p>
          {item.meta && (
            <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-[12px] leading-4 text-fg-2">
              <span className={cn("inline-flex items-center gap-1", item.metaTone === "red" ? "font-medium text-danger-solid dark:text-danger" : "font-semibold")}>
                {item.metaTone === "red" ? <Timer className="size-3" aria-hidden /> : <CalendarDays className="size-3" aria-hidden />}
                {item.meta}
              </span>
              {item.extra && <span>· {item.extra}</span>}
            </p>
          )}
          {item.quote && (
            <p className="mt-2.5 inline-block max-w-[420px] rounded-md bg-surface/60 px-2 py-1 text-[13px] italic leading-[18px] text-fg-2">{item.quote}</p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:pl-3">
        {item.kind === "pending" && (
          <>
            <Button href="/assignments/ise2-dwm-practical/submit" className="h-9 px-4">
              <CloudUpload className="size-4" aria-hidden /> Upload
            </Button>
            <IconButton label="Mark as skipped" className="size-9" onClick={() => toast("Task options are not part of this prototype")}>
              <ListX className="size-4" />
            </IconButton>
          </>
        )}
        {item.kind === "draft" && (
          <Button variant="tinted" className="h-9 px-4 text-[14px]" onClick={() => toast("Draft v1.2 restored (simulated)")}>
            {item.action}
          </Button>
        )}
        {item.kind === "quiz" && (
          <Button variant="tinted" className="h-9 px-4 text-[14px] font-medium text-fg-2" onClick={() => toast("Quiz guidelines are not part of this prototype")}>
            <span aria-hidden className="inline-flex size-3.5 items-center justify-center rounded-full border border-current text-[9px] font-bold">i</span>
            {item.action}
          </Button>
        )}
        {item.kind === "graded" && (
          <Button variant="white" className="h-9 px-5 text-[14px] font-medium shadow-sm" onClick={() => toast("Annotated feedback is not part of this prototype")}>
            {item.action}
          </Button>
        )}
      </div>
    </div>
  );
}

export function UpcomingSubmissions() {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-[22px] font-medium leading-7 tracking-[-0.02em] text-fg">
          <ClipboardList className="size-5 text-link" aria-hidden /> Upcoming Submissions &amp; Quizzes
        </h2>
        <Link href="/assignments" className="inline-flex shrink-0 items-center gap-0.5 text-[13px] font-semibold text-link hover:underline">
          View All 12 Assignments <ChevronRight className="size-3.5" aria-hidden />
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {upcoming.map((u) => (
          <Row key={u.id} item={u} />
        ))}
      </div>
    </Card>
  );
}
