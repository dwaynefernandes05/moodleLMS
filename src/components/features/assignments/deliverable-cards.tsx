"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  CalendarPlus,
  CloudUpload,
  Download,
  FileCode2,
  FileCheck2,
  FileText,
  FolderDown,
  Hourglass,
  Link2,
  Play,
  Sparkles,
  UserPlus,
  Users,
  Bell,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress";
import { useToast } from "@/components/ui/toast";
import { useFakeCompression, MB } from "@/hooks/use-fake-compression";
import { cn } from "@/lib/utils";
import { formatBytes } from "@/lib/utils";
import type { Deliverable } from "@/lib/data/assignments";

const accentBorder = { red: "border-l-danger-solid", blue: "border-l-[#1a5ff0] dark:border-l-[#3b82f6]", amber: "border-l-warning-solid" } as const;

function CardShell({ d, chip, children }: { d: Deliverable; chip: React.ReactNode; children: React.ReactNode }) {
  return (
    <article
      aria-label={d.title}
      className={cn("flex flex-col rounded-[20px] border border-l-4 border-line bg-surface p-5 shadow-card", accentBorder[d.accent])}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="pt-1 text-[11px] font-bold uppercase tracking-[0.05em] text-link">{d.label}</p>
        {chip}
      </div>
      <h3 className="mt-0.5 max-w-[262px] text-[22px] font-bold leading-[28px] tracking-[-0.03em] text-fg">{d.title}</h3>
      <p className="mt-1 text-[13px] text-fg-2">{d.sub}</p>
      <p className="mt-3 line-clamp-2 text-[14px] leading-[22px] text-fg-2">{d.description}</p>
      {children}
    </article>
  );
}

function Stat({ label, value, sub, subTone }: { label: string; value: React.ReactNode; sub?: React.ReactNode; subTone?: "blue" }) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-fg-2">{label}</p>
      <p className="mt-0.5 text-[16px] font-semibold leading-[22px] tracking-[-0.01em] text-fg">{value}</p>
      {sub && <p className={cn("text-[12px] leading-4", subTone === "blue" ? "font-medium text-link" : "text-fg-2")}>{sub}</p>}
    </div>
  );
}

function StatsBox({ cols, children }: { cols: 2 | 3; children: React.ReactNode }) {
  return (
    <div className={cn("mt-4 grid gap-3 rounded-xl bg-surface-2 px-4 py-3", cols === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2")}>{children}</div>
  );
}

export function IseCard({ d }: { d: Deliverable }) {
  const toast = useToast();
  const { files, addFiles, removeFile } = useFakeCompression({ thresholdBytes: 10 * MB });
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const file = files[files.length - 1];

  const onFiles = (list: FileList | null) => {
    if (!list) return;
    addFiles(Array.from(list).map((f) => ({ name: f.name, size: f.size })));
  };

  return (
    <CardShell
      d={d}
      chip={
        <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-danger-soft px-3 py-1.5 text-[13px] font-semibold text-danger-solid dark:text-danger">
          <span aria-hidden className="size-2 rounded-full bg-current" /> Due in 18 Hours
        </span>
      }
    >
      <StatsBox cols={3}>
        <Stat label="Max Score" value="25 Marks" />
        <Stat label="Deadline Time" value={<span className="text-[14px] font-semibold">Nov 5, 2:45 PM</span>} />
        <Stat
          label="Allowed Size"
          value={
            <span className="inline-flex items-center gap-1 text-[14px] font-semibold text-link">
              20MB Smart <Sparkles className="size-3.5" aria-hidden />
            </span>
          }
        />
      </StatsBox>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          onFiles(e.dataTransfer.files);
        }}
        className={cn(
          "mt-3 flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed px-4 py-4 text-center transition-colors",
          over ? "border-primary bg-surface-3" : "border-transparent bg-surface-2",
        )}
      >
        {!file && (
          <>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-3 rounded-lg px-2 py-1 text-left"
              aria-label="Drag and drop practical file or click to browse"
            >
              <CloudUpload className="size-7 shrink-0 text-link" strokeWidth={1.75} aria-hidden />
              <span className="block">
                <span className="block text-[13px] font-semibold leading-[17px] text-fg">Drag &amp; Drop Practical File or Click to Browse</span>
                <span className="block text-[12px] leading-4 text-fg-2">Auto-compresses client-side if file &gt; 10MB Moodle cap</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => addFiles([{ name: "ISE2_DWM_Practical_Report.pdf", size: 24 * MB }])}
              className="mt-1 rounded-md bg-surface px-3 py-1 text-[11px] font-semibold text-link shadow-sm hover:bg-surface-3"
            >
              Simulate Dragging 24MB PDF
            </button>
          </>
        )}
        {file && (
          <div className="w-full text-left" aria-live="polite">
            <div className="flex items-center justify-between gap-2">
              <p className="flex min-w-0 items-center gap-2 text-[13px] font-semibold text-fg">
                <FileText className="size-4 shrink-0 text-danger-solid" aria-hidden />
                <span className="truncate">{file.name}</span>
              </p>
              <button type="button" onClick={() => removeFile(file.id)} className="text-[11px] font-semibold text-link hover:underline">
                Remove
              </button>
            </div>
            {file.state === "compressing" && (
              <div className="mt-2">
                <ProgressBar value={file.progress} height={6} label="Compressing file" />
                <p className="mt-1 flex items-center gap-1.5 text-[12px] text-fg-2">
                  <Loader2 className="size-3 animate-spin" aria-hidden /> Compressing locally… {file.progress}%
                </p>
              </div>
            )}
            {file.state === "ready" && (
              <p className="mt-1 text-[12px] font-medium text-success">
                {file.compressedBytes ? (
                  <>
                    <span className="text-fg-2 line-through">{formatBytes(file.originalBytes)}</span> → {formatBytes(file.compressedBytes)} ({file.savedPct}% saved) · ready to submit
                  </>
                ) : (
                  <>✓ Validated &amp; Ready</>
                )}
              </p>
            )}
            {file.state === "error" && <p className="mt-1 text-[12px] font-medium text-danger">{file.error}</p>}
          </div>
        )}
        <input ref={inputRef} type="file" accept=".pdf,.ipynb,.py,.zip" className="sr-only" tabIndex={-1} aria-hidden onChange={(e) => onFiles(e.target.files)} />
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => toast("Scoring rubric is not part of this prototype")}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-fg-2 hover:text-fg"
          >
            <FileCheck2 className="size-4" aria-hidden /> Rubric
          </button>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-warning-soft px-3 py-2 text-[13px] font-semibold text-warning">
            <Bell className="size-3.5" aria-hidden /> 2h Ping
          </span>
        </div>
        <Button href="/assignments/ise2-dwm-practical/submit" className="h-10 px-5 text-[14px]">
          Submit Work <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </CardShell>
  );
}

export function DraftCard({ d }: { d: Deliverable }) {
  const toast = useToast();
  return (
    <CardShell
      d={d}
      chip={
        <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl bg-surface-3 px-3 py-1.5 text-[13px] font-semibold text-link">
          <FileCheck2 className="size-4" aria-hidden /> Draft Saved
        </span>
      }
    >
      <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface-2 px-3 py-3">
        <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface shadow-sm">
          <FileCode2 className="size-4 text-link" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold leading-4 text-fg">Exp_DA1_draft.py</p>
          <p className="mt-0.5 text-[11px] leading-4 text-fg-2">Last autosaved: Today at 10:14 AM (14.2 KB)</p>
        </div>
        <span className="rounded-md bg-success-soft px-2.5 py-1 text-[11px] font-semibold text-success">Synced</span>
      </div>
      <StatsBox cols={2}>
        <Stat label="Due Date" value="Nov 12, 2:00 PM" sub="In 7 Days remaining" />
        <Stat label="Evaluation Scale" value="15 Marks" sub="10% Course Total" subTone="blue" />
      </StatsBox>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
        <button
          type="button"
          onClick={() => toast("Download started (simulated): Exp_DA1_draft.py")}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-fg-2 hover:text-fg"
        >
          <Download className="size-4" aria-hidden /> Download Draft
        </button>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="h-10 px-4 text-[14px] font-medium" onClick={() => toast("Code editor is not part of this prototype")}>
            Edit Code
          </Button>
          <Button className="h-10 px-4 text-[14px]" onClick={() => toast("Draft finalised for review (simulated)")}>
            Review &amp; Finalize
          </Button>
        </div>
      </div>
    </CardShell>
  );
}

export function StartCard({ d }: { d: Deliverable }) {
  const toast = useToast();
  return (
    <CardShell
      d={d}
      chip={
        <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl bg-warning-soft px-3 py-1.5 text-[13px] font-semibold text-warning">
          <Hourglass className="size-4" aria-hidden /> Not Started
        </span>
      }
    >
      <StatsBox cols={3}>
        <Stat label="Due Date" value={<span className="text-[14px]">Nov 14, 11:59 PM</span>} sub="In 9 Days" />
        <Stat label="Max Score" value={<span className="text-[14px]">20 Marks</span>} sub="Includes Viva" />
        <Stat label="Submission" value={<span className="text-[14px]">ZIP or GitHub</span>} sub="Repo link OK" />
      </StatsBox>
      <div className="mt-3 flex items-center gap-3 rounded-xl bg-surface-2 px-4 py-3">
        <FolderDown className="size-[18px] shrink-0 text-link" aria-hidden />
        <p className="min-w-0 flex-1 truncate text-[13px] font-medium text-fg">Starter Code &amp; Reference Page Traces (1.8 MB)</p>
        <button
          type="button"
          onClick={() => toast("Download started (simulated): Starter ZIP")}
          className="shrink-0 text-[11px] font-bold text-link hover:underline"
        >
          Download ZIP
        </button>
      </div>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
        <button
          type="button"
          onClick={() => toast("Added to calendar (simulated)")}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-fg-2 hover:text-fg"
        >
          <CalendarPlus className="size-4" aria-hidden /> Add to Cal
        </button>
        <Button className="h-10 px-5 text-[14px]" onClick={() => toast("Submission workspace is not part of this prototype")}>
          Start Submission <Play className="size-3.5" aria-hidden />
        </Button>
      </div>
    </CardShell>
  );
}

export function GroupCard({ d }: { d: Deliverable }) {
  const toast = useToast();
  return (
    <CardShell
      d={d}
      chip={
        <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-surface-3 px-3 py-1.5 text-[13px] font-semibold text-fg">
          <Users className="size-4" aria-hidden /> Group (4)
        </span>
      }
    >
      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-surface-2 px-3 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[
              ["SS", 2],
              ["RN", 1],
              ["AP", 2],
              ["VK", 3],
            ].map(([i, p]) => (
              <Avatar key={i as string} initials={i as string} palette={p as number} size={32} className="ring-2 ring-surface-2" />
            ))}
          </div>
          <div className="leading-4">
            <p className="text-[12px] font-semibold text-fg">Team Alpha</p>
            <p className="text-[12px] text-fg-2">4 members active</p>
          </div>
        </div>
        <span className="rounded-md bg-surface px-2.5 py-1 text-[11px] font-medium text-fg-2 shadow-sm">Lead: Shreyash</span>
      </div>
      <StatsBox cols={2}>
        <Stat label="Deadline" value="Nov 18, 5:00 PM" sub="13 Days remaining" />
        <Stat label="Max Weight" value="30 Marks" sub="Rubric: Completeness" subTone="blue" />
      </StatsBox>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
        <button
          type="button"
          onClick={() => toast("Shared document link copied (simulated)")}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-fg-2 hover:text-fg"
        >
          <Link2 className="size-4" aria-hidden /> Shared Doc Link
        </button>
        <Button className="h-10 px-5 text-[14px]" onClick={() => toast("Team collaboration is not part of this prototype")}>
          Collaborate &amp; Submit <UserPlus className="size-4" aria-hidden />
        </Button>
      </div>
    </CardShell>
  );
}

export function DeliverableCard({ d }: { d: Deliverable }) {
  switch (d.id) {
    case "ise2":
      return <IseCard d={d} />;
    case "da1":
      return <DraftCard d={d} />;
    case "vm":
      return <StartCard d={d} />;
    default:
      return <GroupCard d={d} />;
  }
}
