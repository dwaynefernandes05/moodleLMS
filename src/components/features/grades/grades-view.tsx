"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock,
  Download,
  FileSpreadsheet,
  GaugeCircle,
  GraduationCap,
  Hourglass,
  Info,
  Mail,
  RefreshCw,
  ShieldCheck,
  TimerReset,
  TrendingUp,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress";
import { Tabs } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { gradeBands, gradeCourses, sgpa, type GradeCourse, type GradedCourse } from "@/lib/data/grades";

type TabId = "all" | "evaluated" | "progress";

const gradeBadge = {
  O: "bg-success-soft text-success",
  "A+": "bg-primary-soft text-link",
  A: "bg-primary-soft text-link",
} as const;

function Tile({
  label,
  icon,
  children,
  sub,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  sub: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-surface px-5 py-4 shadow-card ring-1 ring-line/60">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-fg-2">{label}</p>
        {icon}
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">{children}</div>
      <div className="mt-2.5 text-[12px] font-semibold leading-4">{sub}</div>
    </div>
  );
}

function Hero() {
  const toast = useToast();
  return (
    <Card className="relative overflow-hidden px-6 pb-7 pt-6">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-24 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(49,107,243,0.10),transparent)]" />
      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-5">
          <div className="relative size-[76px] shrink-0">
            <span aria-hidden className="flex size-full items-center justify-center rounded-2xl bg-surface-3 text-[28px] font-bold text-link">
              SS
            </span>
            <span
              role="img"
              aria-label="Verified"
              className="absolute -bottom-1.5 -right-1.5 flex size-[22px] items-center justify-center rounded-full bg-success-solid text-white ring-[3px] ring-surface"
            >
              <BadgeCheck className="size-3.5" />
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-[30px] font-bold leading-9 tracking-[-0.035em] text-fg">Shreyash Singh</h1>
              <span className="rounded-md bg-surface-4 px-2 py-[3px] text-[11px] font-semibold text-link">Semester VII (Current)</span>
              <span className="rounded-md bg-surface-3 px-2 py-[3px] text-[11px] font-semibold text-fg-2">UID: 2022300045</span>
            </div>
            <p className="mt-1 max-w-[560px] text-[13px] leading-[18px] text-fg-2">
              B.Tech Computer Engineering • Sardar Patel Institute of Technology • Division A (Batch 2021-2025)
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-fg">
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap className="size-3.5 text-link" aria-hidden /> Faculty Mentor: Dr. Surekha Dholay
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="size-3.5 text-success-solid" aria-hidden /> Standing: Dean&apos;s Honor Roll Track
              </span>
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <Button variant="secondary" className="h-10 text-[13px] font-medium" onClick={() => toast("Re-evaluation request submitted (simulated)")}>
            <RefreshCw className="size-4" aria-hidden /> Request Re-evaluation
          </Button>
          <Button className="h-10 text-[13px]" onClick={() => toast("Download started (simulated): Official Grade Card")}>
            <Download className="size-4" aria-hidden /> Download Official Grade Card
          </Button>
        </div>
      </div>

      <div className="relative mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Tile label="Projected SGPA" icon={<TrendingUp className="size-4 text-link" aria-hidden />} sub={<span className="inline-flex items-center gap-1 text-success"><CheckCircle2 className="size-3" aria-hidden /> First Class with Distinction</span>}>
          <span className="text-[36px] font-bold leading-10 tracking-[-0.03em] text-fg">9.22</span>
          <span className="text-[13px] text-fg-2">/ 10.0</span>
        </Tile>
        <Tile label="Cumulative CGPA" icon={<FileSpreadsheet className="size-4 text-link" aria-hidden />} sub={<span className="text-fg">Sem I – VI Verified Record</span>}>
          <span className="text-[36px] font-bold leading-10 tracking-[-0.03em] text-fg">9.08</span>
          <span className="text-[13px] text-fg-2">overall</span>
        </Tile>
        <Tile label="Earned Credits" icon={<ShieldCheck className="size-4 text-success-solid" aria-hidden />} sub={<ProgressBar value={82} tone="green" height={6} label="18 of 22 credits earned" />}>
          <span className="text-[36px] font-bold leading-10 tracking-[-0.03em] text-fg">18</span>
          <span className="text-[13px] text-fg-2">/ 22 this term</span>
        </Tile>
        <Tile label="Continuous Eval Mean" icon={<GaugeCircle className="size-4 text-warning-solid" aria-hidden />} sub={<span className="text-link">Top 5% in CSE Department</span>}>
          <span className="text-[36px] font-bold leading-10 tracking-[-0.03em] text-fg">91.2%</span>
          <span className="text-[13px] text-fg-2">aggregate</span>
        </Tile>
      </div>
    </Card>
  );
}

function StatusChip({ s }: { s: GradedCourse["status"] }) {
  const I = s.icon === "award" ? Award : s.icon === "check" ? CheckCircle2 : BadgeCheck;
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-success-soft px-2 py-[2px] text-[11px] font-semibold text-success">
      <I className="size-3" aria-hidden /> {s.text}
    </span>
  );
}

function CodeLine({ code, credits, chip }: { code: string; credits: string; chip: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="rounded-md bg-surface-4 px-2 py-[3px] text-[11px] font-bold text-link">{code}</span>
      <span className="text-[12px] font-medium text-fg-2">{credits}</span>
      {chip}
    </div>
  );
}

function Row({ c }: { c: GradeCourse }) {
  const toast = useToast();

  if (c.kind === "graded") {
    return (
      <Card className="rounded-[18px] px-5 pb-6 pt-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <CodeLine code={c.code} credits={c.credits} chip={<StatusChip s={c.status} />} />
            <h3 className="mt-2 text-[20px] font-medium leading-7 tracking-[-0.02em] text-fg">{c.title}</h3>
            <p className="mt-1 text-[13px] text-fg-2">{c.faculty}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <div className="text-right">
              <p className="leading-9">
                <span className={cn("text-[32px] font-bold tracking-[-0.03em]", c.aggregateGreen ? "text-success-solid" : "text-fg")}>{c.aggregate}</span>
                <span className="ml-0.5 text-[14px] font-medium text-fg-2">%</span>
              </p>
              <p className="text-[11px] font-medium text-fg-2">Aggregate Score</p>
            </div>
            <span className={cn("flex size-14 flex-col items-center justify-center rounded-xl", gradeBadge[c.grade])}>
              <span className="text-[22px] font-bold leading-6">{c.grade}</span>
              <span className="text-[10px] font-bold">{c.points}</span>
            </span>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-[repeat(3,minmax(0,1fr))] items-end gap-3 pl-1 sm:grid-cols-[1fr_1fr_1fr_auto]">
          {c.components.map((x) => (
            <div key={x.label}>
              <p className="text-[11px] font-medium text-fg-2">{x.label}</p>
              <p className="mt-1.5 text-[13px] font-semibold text-fg">{x.value}</p>
            </div>
          ))}
          <button type="button" onClick={() => toast("Detailed rubric is not part of this prototype")} className="col-span-3 justify-self-start pr-3 text-[11px] font-semibold text-link hover:underline sm:col-span-1 sm:justify-self-end">
            View Rubric →
          </button>
        </div>
      </Card>
    );
  }

  if (c.kind === "lab") {
    return (
      <Card className="rounded-[18px] px-5 pb-4 pt-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <CodeLine
              code={c.code}
              credits={c.credits}
              chip={
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-warning">
                  <span aria-hidden className="size-1.5 rounded-full bg-warning-solid" /> {c.status}
                </span>
              }
            />
            <h3 className="mt-2 text-[20px] font-medium leading-7 tracking-[-0.02em] text-fg">{c.title}</h3>
            <p className="mt-1 text-[13px] text-fg-2">{c.faculty}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <div className="text-right">
              <p className="leading-9">
                <span className="text-[32px] font-bold tracking-[-0.03em] text-fg">{c.partial}</span>
                <span className="ml-1 text-[13px] font-medium text-fg-2">{c.outOf}</span>
              </p>
              <p className="text-[11px] font-medium text-fg-2">Partial Lab Grade</p>
            </div>
            <span className="flex size-14 flex-col items-center justify-center rounded-xl bg-surface-3 text-fg">
              <Hourglass className="size-5" aria-hidden />
              <span className="text-[10px] font-bold">In Prog</span>
            </span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-surface-3 px-3 py-2">
          <p className="flex items-center gap-2 text-[12px] text-fg">
            <CalendarCheck className="size-4 text-link" aria-hidden /> {c.note}
          </p>
          <Link href="/assignments/ise2-dwm-practical/submit" className="shrink-0 rounded-md bg-primary px-3 py-1.5 text-[11px] font-bold text-primary-fg hover:bg-primary-hover">
            Submit Practical
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card className="rounded-[18px] px-5 py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <CodeLine
            code={c.code}
            credits={c.credits}
            chip={<span className="rounded-md bg-surface-3 px-2 py-[2px] text-[11px] font-semibold text-fg-2">{c.status}</span>}
          />
          <h3 className="mt-2 text-[20px] font-medium leading-7 tracking-[-0.02em] text-fg">{c.title}</h3>
          <p className="mt-1 text-[13px] text-fg-2">{c.faculty}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="text-right">
            <p className="text-[14px] font-bold text-fg">{c.release}</p>
            <p className="mt-1 text-[12px] font-medium text-fg-2">{c.releaseNote}</p>
          </div>
          <span className="flex size-14 flex-col items-center justify-center gap-0.5 rounded-xl bg-surface-3 text-link">
            {c.badge === "Pending" ? <Clock className="size-5" aria-hidden /> : <TimerReset className="size-5" aria-hidden />}
            <span className="text-[10px] font-bold">{c.badge}</span>
          </span>
        </div>
      </div>
    </Card>
  );
}

function SgpaChart() {
  const W = 300;
  const H = 74;
  const padX = 8;
  const min = 8.3;
  const max = 9.3;
  const pts = sgpa.map((p, i) => ({
    x: padX + (i * (W - padX * 2 - 24)) / (sgpa.length - 1) + 12,
    y: H - 8 - ((p.value - min) / (max - min)) * (H - 24),
  }));
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1].x} ${H} L${pts[0].x} ${H} Z`;
  const last = pts[pts.length - 1];
  return (
    <div className="mt-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-[74px] w-full" role="img" aria-label="SGPA journey: Semester 1 8.50, Semester 3 8.75, Semester 5 8.92, Semester 7 9.22">
        <path d={area} className="fill-primary/10" />
        <path d={line} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-primary dark:stroke-link" />
        <circle cx={last.x} cy={last.y} r={5} className="fill-surface stroke-primary dark:stroke-link" strokeWidth={2.5} />
        <circle cx={last.x} cy={last.y} r={2.2} className="fill-primary dark:fill-link" />
      </svg>
      <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-fg-2">
        {sgpa.map((p, i) => (
          <span key={p.sem} className={cn(i === sgpa.length - 1 && "font-bold text-fg")}>
            {p.sem}: {p.value.toFixed(2)}
          </span>
        ))}
      </div>
    </div>
  );
}

const bandTone = {
  green: "bg-success-soft text-success",
  blue: "bg-primary-soft text-link",
  amber: "bg-warning-soft text-warning",
  slate: "bg-surface-3 text-fg-2",
} as const;

function Sidebar() {
  const toast = useToast();
  return (
    <aside className="flex min-w-0 flex-col gap-6" aria-label="Grade analytics">
      <Card className="px-5 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[19px] font-medium leading-7 tracking-[-0.02em] text-fg">Grade Distribution</h2>
          <span className="text-[11px] font-medium text-fg-2">Sem VII</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px]">
          <span className="font-medium text-fg-2">Evaluated: 5 Courses</span>
          <span className="font-bold text-fg">Avg 89.15%</span>
        </div>
        <div role="img" aria-label="Grade split: 2 courses O grade, 3 courses A+ or A grade" className="mt-2 flex h-2 overflow-hidden rounded-full">
          <span className="h-full bg-success-solid" style={{ width: "40%" }} />
          <span className="h-full bg-primary" style={{ width: "60%" }} />
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[11px] font-semibold text-fg">
          {[
            ["bg-success-solid", "O Grade (10 Pts): 2"],
            ["bg-primary", "A+/A Grade: 3"],
            ["bg-warning-solid", "B+ Grade (7 Pts): 0"],
            ["bg-fg-muted", "B Grade (6 Pts): 0"],
          ].map(([c, t]) => (
            <li key={t} className="flex items-center gap-2">
              <span aria-hidden className={cn("size-2 rounded-full", c)} /> {t}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-between text-[11px]">
          <span className="font-medium text-fg-2">SGPA Journey (Sem I → VII)</span>
          <span className="font-semibold text-success">+0.42 over Sem VI</span>
        </div>
        <SgpaChart />
      </Card>

      <Card className="px-5 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[19px] font-medium leading-7 tracking-[-0.02em] text-fg">Autonomous Grading Legend</h2>
          <button type="button" aria-label="Grading legend help" onClick={() => toast("Relative & absolute percentile mapping is enforced by the SPIT Examination Cell")} className="rounded-full text-fg-muted hover:text-fg">
            <CircleHelp className="size-4" />
          </button>
        </div>
        <p className="mt-2 text-[12px] leading-[18px] text-fg-2">Relative &amp; Absolute percentile mapping enforced by the SPIT Examination Cell.</p>
        <ul className="mt-3 flex flex-col">
          {gradeBands.map((b) => (
            <li key={b.letter} className="flex items-center justify-between border-b border-line/70 py-2.5 last:border-b-0">
              <span className="flex items-center gap-3 text-[13px] font-medium text-fg">
                <span aria-hidden className={cn("flex size-6 items-center justify-center rounded-md text-[10px] font-bold", bandTone[b.tone])}>
                  {b.letter}
                </span>
                {b.label}
              </span>
              <span className="text-[12px] font-medium text-fg">{b.range}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="px-5 py-5">
        <div className="flex items-center gap-3">
          <Avatar initials="SD" size={44} palette={1} />
          <div className="leading-[18px]">
            <p className="text-[13px] font-semibold text-fg">Dr. Surekha Dholay</p>
            <p className="text-[12px] text-fg-2">Class Teacher &amp; Mentor (Div A)</p>
          </div>
        </div>
        <p className="mt-3 text-[12px] leading-[18px] text-fg-2">
          Office hours: Mon &amp; Thu (3:30 PM - 5:00 PM). Schedule an appointment to review re-evaluation queries or semester honors documentation.
        </p>
        <Button variant="tinted" className="mt-3 h-9 w-full text-[13px] text-fg" onClick={() => toast("Email draft to mentor opened (simulated)")}>
          <Mail className="size-4" aria-hidden /> Email Mentor
        </Button>
      </Card>
    </aside>
  );
}

export function GradesView() {
  const toast = useToast();
  const [tab, setTab] = useState<TabId>("all");
  const evaluatedCount = gradeCourses.filter((c) => c.kind === "graded").length;
  const progressCount = gradeCourses.length - evaluatedCount;
  const list = gradeCourses.filter((c) => (tab === "all" ? true : tab === "evaluated" ? c.kind === "graded" : c.kind !== "graded"));

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Academic Hub", href: "/" }, { label: "Grades & Performance Analytics" }]} />
        <div className="flex items-center gap-2 text-[11px] font-medium">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1 text-success">
            <span aria-hidden className="size-1.5 rounded-full bg-success-solid" /> Evaluation Period Active • Autonomy Cycle 2024–25
          </span>
          <span className="rounded-md bg-surface-3 px-3 py-1 text-fg-2">Audit Verified: Oct 28</span>
        </div>
      </div>

      <div className="mt-6">
        <Hero />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_366px]">
        <div className="flex min-w-0 flex-col gap-4">
          <Card className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-medium uppercase tracking-[0.07em] text-fg-2">Academic Term:</span>
              <button
                type="button"
                onClick={() => toast("Only the current term is available in this prototype")}
                className="flex h-9 w-[240px] items-center justify-between rounded-lg bg-surface-3 px-3.5 text-[13px] font-medium text-fg"
              >
                Semester VII • 2024-25 (Odd) <ChevronDown className="size-4 text-fg-2" aria-hidden />
              </button>
            </div>
            <Tabs
              idPrefix="gr"
              label="Course evaluation status"
              variant="segmented"
              value={tab}
              onChange={setTab}
              items={[
                { id: "all", label: `All Courses (${gradeCourses.length})` },
                { id: "evaluated", label: `Evaluated (${evaluatedCount})` },
                { id: "progress", label: `In-Progress (${progressCount})` },
              ]}
            />
          </Card>

          <div className="flex flex-col items-start justify-between gap-2 rounded-lg bg-surface-3 px-3.5 py-2.5 sm:flex-row sm:items-center">
            <p className="flex items-center gap-2.5 text-[13px] leading-[18px] text-link">
              <Info className="size-4 shrink-0" aria-hidden />
              <span>
                <strong className="font-semibold">Autonomous Evaluation Structure:</strong> Total course scores are synthesized from Continuous ISE (40%), Mid-Semester Exam MSE (20%), and Practical/End-Term Component (40%).
              </span>
            </p>
            <button type="button" onClick={() => toast("Ordinance Rulebook is not part of this prototype")} className="shrink-0 text-[11px] font-semibold text-link underline underline-offset-2">
              Ordinance Rulebook
            </button>
          </div>

          <div id={`gr-panel-${tab}`} role="tabpanel" aria-labelledby={`gr-${tab}`} className="flex flex-col gap-4">
            {list.map((c) => (
              <Row key={c.id} c={c} />
            ))}
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  );
}
