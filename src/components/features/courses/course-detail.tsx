"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownAZ,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Eye,
  FileCode2,
  FileText,
  FolderArchive,
  FolderOpen,
  GraduationCap,
  ListFilter,
  Mail,
  Megaphone,
  MessageSquareQuote,
  Paperclip,
  Search,
  ShieldAlert,
  SquareTerminal,
  Star,
  FlaskConical,
  Table2,
  Database,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress";
import { Tabs } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import {
  activePracticals,
  competencies,
  courseAnnouncements,
  dwmLab,
  evaluated,
  lectureNotes,
  marks,
  utilities,
  type Attachment,
  type Evaluated,
  type Practical,
} from "@/lib/data/dwm-lab";

type TabId = "lab" | "notes" | "ann" | "marks";
type StatusFilter = "all" | "open" | "evaluated";
const statusLabel: Record<StatusFilter, string> = { all: "All Statuses", open: "Open", evaluated: "Evaluated" };
const nextStatus: Record<StatusFilter, StatusFilter> = { all: "open", open: "evaluated", evaluated: "all" };

function AttachIcon({ k }: { k: Attachment["icon"] }) {
  const cls = "size-4 shrink-0 text-link";
  if (k === "pdf") return <FileText className={cls} aria-hidden />;
  if (k === "csv") return <Table2 className={cls} aria-hidden />;
  return <Database className={cls} aria-hidden />;
}

function SectionTitle({ dot, children, right }: { dot: "red" | "green"; children: React.ReactNode; right: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="flex items-center gap-2.5 text-[20px] font-medium leading-7 tracking-[-0.02em] text-fg">
        <span aria-hidden className={cn("size-2.5 rounded-full", dot === "red" ? "bg-danger-solid" : "bg-success-solid")} />
        {children}
      </h2>
      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-2">{right}</span>
    </div>
  );
}

function PracticalCard({ p }: { p: Practical }) {
  const toast = useToast();
  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-md bg-[#0b1c30] px-2 py-[3px] text-[12px] font-semibold text-white dark:bg-[#e8eef8] dark:text-[#0b1c30]">{p.code}</span>
          <span className="text-[11px] font-bold uppercase tracking-[0.05em] text-link">{p.kind}</span>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold",
            p.closesTone === "red" ? "bg-danger-soft text-danger-solid dark:text-danger" : "bg-warning-soft text-warning",
          )}
        >
          {p.closesTone === "red" ? <span aria-hidden className="size-2 rounded-full bg-current" /> : <Clock className="size-3.5" aria-hidden />}
          {p.closes}
        </span>
      </div>
      <h3 className="-mt-2 max-w-[560px] text-[20px] font-medium leading-7 tracking-[-0.02em] text-fg">{p.title}</h3>
      <p className="mt-1.5 max-w-[600px] text-[13.5px] leading-[18px] text-fg-2">{p.description}</p>

      <div className="mt-4 flex flex-col items-start justify-between gap-2 rounded-xl bg-surface-2 px-3 py-2.5 sm:flex-row sm:gap-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-fg-2">{p.attachLabel}</span>
          {p.attachments.map((a) => (
            <button
              key={a.name}
              type="button"
              onClick={() => toast(`Download started (simulated): ${a.name}`)}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-link hover:underline"
            >
              <AttachIcon k={a.icon} />
              {a.name} <span className="font-normal text-fg-2">{a.size}</span>
            </button>
          ))}
        </div>
        <span className={cn("shrink-0 pr-2 text-[13px] leading-[17px] text-fg-2", p.points.startsWith("Max") && "max-w-[90px]")}>{p.points}</span>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className={cn("flex items-center gap-2 text-[12px]", p.noteTone === "ok" ? "font-medium text-fg" : "text-[14px] text-fg-2")}>
          {p.noteTone === "ok" && <CheckCircle2 className="size-4 text-success-solid" aria-hidden />}
          {p.footerNote}
        </p>
        <div className="flex items-center gap-3">
          <Button variant="tinted" className="h-10 text-fg" onClick={() => toast(`${p.secondary} is not part of this prototype`)}>
            {p.secondary}
          </Button>
          <Button href={p.submitHref} className="h-10">
            {p.id === "ise2" && <FileText className="size-4" aria-hidden />}
            {p.primary}
          </Button>
        </div>
      </div>
    </Card>
  );
}

function EvaluatedCard({ e }: { e: Evaluated }) {
  const toast = useToast();
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="rounded-md bg-surface-3 px-2 py-[3px] text-[12px] font-semibold text-fg-2">{e.code}</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.05em] text-success">{e.label}</span>
          </div>
          <h3 className="mt-2 text-[20px] font-medium leading-7 tracking-[-0.02em] text-fg">{e.title}</h3>
          <p className="mt-1.5 max-w-[600px] text-[13.5px] leading-[18px] text-fg-2">{e.description}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5 rounded-full bg-surface-2 py-2 pl-4 pr-3">
          <span className="text-[22px] font-semibold leading-7 tracking-[-0.02em] text-link">{e.score}</span>
          <span className="rounded-full bg-surface-4 px-2.5 py-1 text-[10px] font-bold tracking-wide text-link">{e.grade}</span>
        </div>
      </div>

      {e.feedback && (
        <div className="mt-4 flex gap-3 rounded-xl bg-surface-2 p-4">
          <MessageSquareQuote className="mt-0.5 size-[18px] shrink-0 text-link" aria-hidden />
          <div>
            <p className="text-[13px]">
              <span className="font-semibold text-fg">{e.feedback.by}</span>{" "}
              <span className="ml-1 text-[11px] font-medium text-fg-2">{e.feedback.when}</span>
            </p>
            <p className="mt-1.5 text-[13px] italic leading-[18px] text-fg-2">{e.feedback.quote}</p>
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-medium text-fg">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-success-solid" aria-hidden />
            {e.submitted}
          </span>
          {e.file && (
            <button
              type="button"
              onClick={() => toast(`Download started (simulated): ${e.file?.name}`)}
              className="inline-flex items-center gap-1.5 font-semibold text-link hover:underline"
            >
              <Paperclip className="size-3.5" aria-hidden />
              {e.file.name} {e.file.size}
            </button>
          )}
        </div>
        {e.action.kind === "button" ? (
          <Button variant="tinted" className="h-10 text-fg" onClick={() => toast("Download started (simulated)")}>
            {e.action.label}
          </Button>
        ) : (
          <button
            type="button"
            onClick={() => toast("Submission viewer is not part of this prototype")}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-link hover:underline"
          >
            <Eye className="size-4" aria-hidden /> {e.action.label}
          </button>
        )}
      </div>
    </Card>
  );
}

function LabTab() {
  const toast = useToast();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [newestFirst, setNewestFirst] = useState(true);

  const matches = (s: string) => !q.trim() || s.toLowerCase().includes(q.trim().toLowerCase());
  const active = useMemo(() => {
    const list = status === "evaluated" ? [] : activePracticals.filter((p) => matches(`${p.title} ${p.code} ${p.description}`));
    return newestFirst ? list : [...list].reverse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, status, newestFirst]);
  const done = useMemo(() => {
    const list = status === "open" ? [] : evaluated.filter((e) => matches(`${e.title} ${e.code} ${e.description}`));
    return newestFirst ? list : [...list].reverse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, status, newestFirst]);

  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
        <label className="flex h-10 w-full items-center gap-2.5 rounded-xl bg-surface-2 px-3 text-fg-muted focus-within:ring-2 focus-within:ring-brand/40 sm:w-[320px]">
          <Search className="size-4 shrink-0" aria-hidden />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search lab manual, datasets, algorithms"
            placeholder="Search lab manual, datasets, algorithms..."
            className="min-w-0 flex-1 bg-transparent text-[13px] text-fg outline-none placeholder:text-fg-muted"
          />
        </label>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="h-9 rounded-lg text-[13px] font-medium" onClick={() => setStatus(nextStatus[status])} aria-label={`Filter: ${statusLabel[status]}. Click to change`}>
            <ListFilter className="size-3.5" aria-hidden /> Filter: {statusLabel[status]}
          </Button>
          <Button variant="secondary" className="h-9 rounded-lg text-[13px] font-medium" onClick={() => setNewestFirst((n) => !n)}>
            <ArrowDownAZ className="size-3.5" aria-hidden /> {newestFirst ? "Newest First" : "Oldest First"}
          </Button>
        </div>
      </Card>

      {active.length > 0 && (
        <section className="flex flex-col gap-4" aria-label="Active lab practicals">
          <SectionTitle dot="red" right={`${active.length} OPEN ITEMS`}>
            Active Lab Practicals &amp; Tasks
          </SectionTitle>
          {active.map((p) => (
            <PracticalCard key={p.id} p={p} />
          ))}
        </section>
      )}
      {done.length > 0 && (
        <section className="flex flex-col gap-4 pt-2" aria-label="Evaluated practical experiments">
          <SectionTitle dot="green" right="HISTORICAL RECORDS">
            Evaluated Practical Experiments
          </SectionTitle>
          {done.map((e) => (
            <EvaluatedCard key={e.id} e={e} />
          ))}
        </section>
      )}
      {active.length === 0 && done.length === 0 && (
        <Card className="p-10 text-center text-[14px] text-fg-2">
          Nothing matches your filters.{" "}
          <button
            type="button"
            className="font-semibold text-link hover:underline"
            onClick={() => {
              setQ("");
              setStatus("all");
              toast("Filters cleared");
            }}
          >
            Clear filters
          </button>
        </Card>
      )}
    </div>
  );
}

function NotesTab() {
  const toast = useToast();
  return (
    <Card className="p-6">
      <h2 className="text-[20px] font-medium tracking-[-0.02em] text-fg">Lecture Notes &amp; Slides</h2>
      <ul className="mt-4 flex flex-col gap-2.5">
        {lectureNotes.map((n) => (
          <li key={n.id} className="flex items-center gap-3 rounded-xl bg-surface-2 px-4 py-3">
            <FileText className="size-5 shrink-0 text-link" aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-fg">{n.title}</p>
              <p className="text-[12px] text-fg-2">{n.meta}</p>
            </div>
            <button type="button" aria-label={`Download ${n.title}`} className="rounded-md p-1.5 text-fg-2 hover:bg-surface-3" onClick={() => toast("Download started (simulated)")}>
              <Download className="size-4" />
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function AnnouncementsTab() {
  return (
    <Card className="p-6">
      <h2 className="text-[20px] font-medium tracking-[-0.02em] text-fg">Course Announcements</h2>
      <ul className="mt-4 flex flex-col gap-2.5">
        {courseAnnouncements.map((a) => (
          <li key={a.id} className="flex items-start gap-3 rounded-xl bg-surface-2 px-4 py-3">
            <span aria-hidden className={cn("mt-1.5 size-2 shrink-0 rounded-full", a.unread ? "bg-danger-solid" : "bg-fg-muted/40")} />
            <div>
              <p className={cn("text-[14px] text-fg", a.unread ? "font-semibold" : "font-medium")}>
                {a.title} {a.unread && <span className="sr-only">(unread)</span>}
              </p>
              <p className="text-[12px] text-fg-2">{a.meta}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function MarksTab() {
  return (
    <Card className="p-6">
      <h2 className="text-[20px] font-medium tracking-[-0.02em] text-fg">Marks &amp; Competencies</h2>
      <ul className="mt-4 flex flex-col gap-2.5">
        {marks.map((m) => (
          <li key={m.id} className="flex items-center justify-between rounded-xl bg-surface-2 px-4 py-3">
            <span className="text-[14px] font-medium text-fg">{m.label}</span>
            <span className="text-[14px] font-semibold text-link">
              {m.score} <span className="ml-2 rounded-full bg-surface-4 px-2 py-0.5 text-[11px]">Grade {m.grade}</span>
            </span>
          </li>
        ))}
      </ul>
      <ul className="mt-6 flex flex-col gap-3.5">
        {competencies.map((c) => (
          <li key={c.label}>
            <div className="flex justify-between text-[12px] font-semibold text-fg">
              <span>{c.label}</span>
              <span>{c.value}%</span>
            </div>
            <ProgressBar value={c.value} tone="green" className="mt-1.5" label={`${c.label} ${c.value}%`} />
          </li>
        ))}
      </ul>
    </Card>
  );
}

const utilIcon = {
  pdf: { I: FileText, cls: "text-danger-solid" },
  grid: { I: Table2, cls: "text-link" },
  code: { I: FileCode2, cls: "text-warning-solid" },
  terminal: { I: SquareTerminal, cls: "text-success" },
} as const;

const trailingIcon = { download: Download, folder: FolderOpen, external: ExternalLink } as const;

function Sidebar() {
  const toast = useToast();
  return (
    <aside className="flex min-w-0 flex-col gap-6" aria-label="Course resources">
      <Card className="px-6 py-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-medium leading-7 tracking-[-0.02em] text-fg">Lab Utilities &amp; Manuals</h2>
          <FolderArchive className="size-[18px] text-link" aria-hidden />
        </div>
        <ul className="mt-4 flex flex-col gap-2">
          {utilities.map((u) => {
            const { I, cls } = utilIcon[u.icon];
            const T = trailingIcon[u.trailing];
            return (
              <li key={u.id}>
                <button
                  type="button"
                  onClick={() => toast(u.trailing === "external" ? "Opening external guide (simulated)" : `Download started (simulated): ${u.title}`)}
                  className="flex w-full items-center gap-3 rounded-xl bg-surface-2 px-3 py-3 text-left hover:bg-surface-3"
                >
                  <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface shadow-sm">
                    <I className={cn("size-[18px]", cls)} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold leading-5 text-fg">{u.title}</span>
                    <span className="block truncate text-[12px] text-fg-2">{u.sub}</span>
                  </span>
                  <T className="size-4 shrink-0 text-fg-muted" aria-hidden />
                </button>
              </li>
            );
          })}
        </ul>
      </Card>

      <Card className="px-6 py-6">
        <h2 className="text-[20px] font-medium leading-7 tracking-[-0.02em] text-fg">Faculty &amp; Lab Staff</h2>
        <div className="mt-4 flex flex-col gap-5">
          <div className="flex gap-3">
            <Avatar initials="RC" size={44} palette={1} />
            <div className="min-w-0">
              <p className="text-[14px] font-semibold leading-5 text-fg">Prof. Rohini Chaudhari</p>
              <p className="text-[13px] text-fg-2">Course Incharge &amp; Professor</p>
              <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-md bg-surface-3 px-2 py-1 text-[12px] font-medium text-link">
                <Mail className="size-3.5" aria-hidden /> rohini_chaudhari@spit.ac.in
              </span>
              <p className="mt-1.5 text-[12px] text-fg-2">Hours: Mon &amp; Thu (2 PM - 4 PM), Cabin 407</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Avatar initials="RS" size={44} palette={0} />
            <div className="min-w-0">
              <p className="text-[14px] font-semibold leading-5 text-fg">Ronak Shah (M.Tech TA)</p>
              <p className="text-[13px] text-fg-2">Lab Assessment &amp; Query Solver</p>
              <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-md bg-surface-3 px-2 py-1 text-[12px] font-medium text-link">
                <Mail className="size-3.5" aria-hidden /> ta_dwm@spit.ac.in
              </span>
              <p className="mt-1.5 text-[12px] text-fg-2">Available in Lab 403 on Practical Days</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="flex gap-3 px-5 py-5">
        <ShieldAlert className="mt-0.5 size-[18px] shrink-0 text-warning-solid" aria-hidden />
        <div>
          <h2 className="text-[13px] font-semibold text-fg">Institute Plagiarism Guard</h2>
          <p className="mt-1.5 text-[13px] leading-[18px] text-fg-2">
            All code submissions are automatically compared against turnitin and institutional batch repositories. Similarity above 15% will incur an automatic mark deduction.
          </p>
        </div>
      </Card>
    </aside>
  );
}

export function CourseDetail() {
  const toast = useToast();
  const [tab, setTab] = useState<TabId>("lab");

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "My Courses", href: "/courses" }, { label: "Fourth yr - DWM LAB" }]} />
        <div className="flex items-center gap-2 text-[12px] font-medium">
          <span className="rounded-full bg-surface-3 px-3 py-1 text-fg-2">Course Code: {dwmLab.code}</span>
          <span className="rounded-full bg-success-soft px-3 py-1 text-success">Active Lab Portal</span>
        </div>
      </div>

      {/* Header card */}
      <Card className="relative mt-[35px] overflow-hidden px-8 pb-7 pt-5">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(49,107,243,0.14),transparent)]"
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded bg-brand px-2 py-[3px] text-[11px] font-bold tracking-[0.04em] text-white">{dwmLab.dept}</span>
              <span className="text-[13px] font-medium text-fg-2">{dwmLab.term}</span>
            </div>
            <h1 className="mt-2 text-[32px] font-bold leading-10 tracking-[-0.03em] text-fg">
              {dwmLab.title} <span className="text-[26px] font-normal text-fg">{dwmLab.subtitle}</span>
            </h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-fg-2">
              <span className="inline-flex items-center gap-2 font-semibold text-fg">
                <GraduationCap className="size-4 text-link" aria-hidden /> {dwmLab.instructor}
              </span>
              <span className="inline-flex items-center gap-4">
                <span aria-hidden>•</span> {dwmLab.batches} <span aria-hidden>•</span>
              </span>
            </p>
            <p className="mt-3 flex items-center gap-2 text-[14px] text-fg">
              <Clock className="size-4 text-warning-solid" aria-hidden />
              {dwmLab.nextSession.label} <strong className="font-semibold">{dwmLab.nextSession.value}</strong>
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2.5 text-[13px] font-semibold">
              <span className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-3.5 py-1.5 text-link ring-1 ring-surface-4">
                <span aria-hidden className="size-1.5 rounded-full bg-primary dark:bg-link" /> 4 Experiments Active
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-danger-soft px-3.5 py-1.5 text-danger-solid ring-1 ring-danger-solid/10 dark:text-danger">
                <span aria-hidden className="size-1.5 rounded-full bg-current" /> 1 Pending Submission (Closes Nov 5)
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-success-soft px-3.5 py-1.5 text-success ring-1 ring-success-solid/10">
                <CheckCircle2 className="size-3.5" aria-hidden /> Avg. Grade: 95.2%
              </span>
            </div>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 lg:w-[256px]">
            <Button className="h-[42px] w-full" onClick={() => toast("Download started (simulated): Lab Bundle (.ZIP)")}>
              <FolderArchive className="size-4" aria-hidden /> Download Lab Bundle (.ZIP)
            </Button>
            <Button variant="tinted" className="h-[42px] w-full text-fg" onClick={() => toast("Syllabus & Course Outcomes are not part of this prototype")}>
              <BookOpen className="size-4" aria-hidden /> Syllabus &amp; Course Outcomes
            </Button>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Card className="mt-6 flex flex-wrap items-center justify-between gap-3 px-3 py-2">
        <Tabs
          idPrefix="course"
          label="Course sections"
          variant="bar"
          value={tab}
          onChange={setTab}
          items={[
            {
              id: "lab",
              label: "Lab Experiments & Submissions",
              icon: <FlaskConical className="size-4" aria-hidden />,
              badge: (
                <span className="ml-1 flex size-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-brand">4</span>
              ),
            },
            { id: "notes", label: "Lecture Notes & Slides", icon: <FileText className="size-4" aria-hidden /> },
            {
              id: "ann",
              label: "Announcements",
              icon: <Megaphone className="size-4" aria-hidden />,
              badge: <span className="ml-1 rounded-full bg-danger-solid px-2 py-0.5 text-[11px] font-semibold text-white">2 Unread</span>,
            },
            { id: "marks", label: "Marks & Competencies", icon: <Star className="size-4" aria-hidden /> },
          ]}
        />
        <p className="flex items-center gap-1.5 pr-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-fg-2">
          Sync Status:
          <span className="inline-flex items-center gap-1.5 normal-case tracking-normal text-success">
            <span aria-hidden className="size-1.5 rounded-full bg-success-solid" /> Updated 4m ago
          </span>
        </p>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_395px]">
        <div id={`course-panel-${tab}`} role="tabpanel" aria-labelledby={`course-${tab}`} className="min-w-0">
          {tab === "lab" && <LabTab />}
          {tab === "notes" && <NotesTab />}
          {tab === "ann" && <AnnouncementsTab />}
          {tab === "marks" && <MarksTab />}
        </div>
        <Sidebar />
      </div>
    </>
  );
}
