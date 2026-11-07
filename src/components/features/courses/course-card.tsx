"use client";

import {
  Bell,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  ChartColumn,
  CloudUpload,
  Download,
  ExternalLink,
  FileText,
  FolderOpen,
  GraduationCap,
  HelpCircle,
  History,
  LayoutGrid,
  MessagesSquare,
  Network,
  SquareTerminal,
  Star,
  Timer,
  TriangleAlert,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import type { Course, CoursePanel } from "@/lib/data/courses";

const statusCls = {
  red: "bg-danger-soft text-danger-solid dark:text-danger",
  green: "bg-success-soft text-success",
  amber: "bg-warning-soft text-warning",
  blue: "bg-primary-soft text-link",
} as const;

function StatusChip({ s }: { s: Course["status"] }) {
  const icon = {
    dot: <span aria-hidden className="size-1.5 rounded-full bg-current" />,
    check: <CheckCircle2 className="size-3" aria-hidden />,
    calendar: <CalendarClock className="size-3" aria-hidden />,
    bell: <Bell className="size-3" aria-hidden />,
    star: <Star className="size-3" aria-hidden />,
    timer: <Timer className="size-3" aria-hidden />,
  }[s.icon];
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-[3px] text-[11px] font-semibold", statusCls[s.tone])}>
      {icon}
      {s.text}
    </span>
  );
}

function PanelIcon({ icon }: { icon: string }) {
  const cls = "size-[18px] shrink-0 text-link";
  switch (icon) {
    case "file":
      return <FileText className={cls} aria-hidden />;
    case "quiz":
      return <HelpCircle className={cls} aria-hidden />;
    case "terminal":
      return <SquareTerminal className={cls} aria-hidden />;
    case "cloud":
      return <CloudUpload className={cls} aria-hidden />;
    case "check":
      return <CheckCircle2 className={cls} aria-hidden />;
    default:
      return <Users className={cls} aria-hidden />;
  }
}

function Panel({ panel }: { panel: CoursePanel }) {
  if (panel.type === "alert") {
    return (
      <div className="flex items-center gap-2.5 rounded-lg bg-danger-soft px-3 py-2.5">
        <TriangleAlert className="size-[18px] shrink-0 text-danger-solid" aria-hidden />
        <div className="min-w-0 leading-4">
          <p className="text-[12px] font-semibold text-danger-solid dark:text-danger">{panel.title}</p>
          <p className="mt-0.5 text-[12px] text-fg-2">{panel.text}</p>
        </div>
      </div>
    );
  }
  if (panel.type === "tiles") {
    return (
      <div className="grid grid-cols-2 gap-2">
        {panel.tiles.map((t) => (
          <div key={t.title} className="flex items-center gap-2.5 rounded-lg bg-surface-2 px-3 py-2.5">
            <PanelIcon icon={t.icon} />
            <div className="min-w-0 leading-4">
              <p className="truncate text-[12px] font-semibold text-fg">{t.title}</p>
              <p className="mt-1 truncate text-[12px] text-fg-2">{t.sub}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (panel.type === "tile") {
    return (
      <div className="flex items-center gap-2.5 rounded-lg bg-surface-2 px-3 py-2.5">
        <PanelIcon icon={panel.icon} />
        <div className="min-w-0 flex-1 leading-4">
          <p className="truncate text-[12px] font-semibold text-fg">{panel.title}</p>
          <p className="mt-1 truncate text-[12px] text-fg-2">{panel.sub}</p>
        </div>
        {panel.trailing === "external" && <ExternalLink className="size-4 shrink-0 text-fg-2" aria-hidden />}
      </div>
    );
  }
  return null;
}

const footerIcon = {
  book: BookOpen,
  history: History,
  grid: LayoutGrid,
  help: HelpCircle,
  download: Download,
  chat: MessagesSquare,
  chart: ChartColumn,
  network: Network,
} as const;

const footerLabel = {
  book: "Lab manual",
  history: "Submission history",
  grid: "Resources",
  help: "Help",
  download: "Download materials",
  chat: "Discussion forum",
  chart: "Performance report",
  network: "Course graph",
} as const;

export function CourseCard({ course }: { course: Course }) {
  const toast = useToast();
  const p = course.progress;
  const valueCls = { blue: "text-link", green: "text-success", amber: "text-warning", red: "text-danger" }[p.valueTone];

  return (
    <Card className="flex min-w-0 flex-col rounded-[18px] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#0b1c30] px-2 py-[3px] text-[11px] font-bold text-white dark:bg-[#e8eef8] dark:text-[#0b1c30]">{course.code}</span>
          <span className="rounded-md bg-surface-3 px-2 py-[3px] text-[11px] font-medium text-fg-2">{course.kind}</span>
        </div>
        <StatusChip s={course.status} />
      </div>

      <h3 className="mt-3.5 text-[20px] font-medium leading-[26px] tracking-[-0.02em] text-fg">
        {course.hubHref ? (
          <Link href={course.hubHref} className="hover:underline">
            {course.title}
          </Link>
        ) : (
          course.title
        )}
      </h3>
      <p className="mt-1 flex items-center gap-1.5 text-[13px] text-fg-2">
        <GraduationCap className="size-3.5 shrink-0" aria-hidden />
        {course.prof}
      </p>

      <div className="mt-3 rounded-lg bg-surface-2 px-3 py-2">
        <div className="flex items-center justify-between text-[12px] font-semibold">
          <span className="text-fg">{p.label}</span>
          <span className={valueCls}>{p.value}</span>
        </div>
        <ProgressBar value={p.pct} tone={p.tone} height={6} className="mt-1.5" label={`${p.label}: ${p.value}`} />
        <p className="mt-1.5 text-[12px] text-fg-2">{p.note}</p>
      </div>

      <div className="mt-3">
        <Panel panel={course.panel} />
      </div>

      <div className="mt-auto flex items-center justify-between pt-5">
        {course.primary ? (
          <Button href={course.primary.href} variant="danger" className="h-9 rounded-lg px-3.5 text-[13px]">
            <CloudUpload className="size-4" aria-hidden /> {course.primary.label}
          </Button>
        ) : (
          <Button
            variant="tinted"
            className="h-9 rounded-lg px-3.5 text-[13px] text-fg-2"
            onClick={() => toast("Course hub not part of this prototype")}
          >
            <FolderOpen className="size-4" aria-hidden /> Course Hub
          </Button>
        )}
        <div className="flex items-center gap-1 pr-1 text-fg-2">
          {course.footerIcons.map((k) => {
            const I = footerIcon[k];
            return (
              <button
                key={k}
                type="button"
                aria-label={footerLabel[k]}
                title={footerLabel[k]}
                onClick={() => toast(k === "download" ? "Download started (simulated)" : `${footerLabel[k]} is not part of this prototype`)}
                className="rounded-md p-1.5 hover:bg-surface-3 hover:text-fg"
              >
                <I className="size-[18px]" strokeWidth={1.75} />
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
