"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, CircleCheck, Download, Quote, Search, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { IconButton } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import {
  deliverables,
  pastSubmissions,
  subjects,
  type StatusKey,
  type Subject,
} from "@/lib/data/assignments";
import { DeliverableCard } from "./deliverable-cards";

type TabId = "all" | StatusKey;

export function AssignmentsView() {
  const toast = useToast();
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<TabId>("all");
  const [subject, setSubject] = useState<Subject | "all">("all");

  const match = (x: { status: StatusKey; subject: Subject; searchText: string }) =>
    (tab === "all" || x.status === tab) &&
    (subject === "all" || x.subject === subject) &&
    (!q.trim() || x.searchText.toLowerCase().includes(q.trim().toLowerCase()));

  const active = useMemo(
    () => deliverables.filter(match),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [q, tab, subject],
  );
  const past = useMemo(
    () => pastSubmissions.filter(match),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [q, tab, subject],
  );
  const left = active.filter((_, i) => i % 2 === 0);
  const right = active.filter((_, i) => i % 2 === 1);

  return (
    <>
      <Card className="mt-6 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex h-10 w-full items-center gap-2.5 rounded-xl bg-surface-2 px-3.5 text-fg-muted focus-within:ring-2 focus-within:ring-brand/40 md:w-[567px]">
            <Search className="size-4 shrink-0" aria-hidden />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Filter assignments by title, code, or professor"
              placeholder="Filter assignments by title, code, or professor..."
              className="min-w-0 flex-1 bg-transparent text-[13px] text-fg outline-none placeholder:text-fg-muted"
            />
          </label>
          <Tabs
            idPrefix="asg"
            label="Assignment status"
            variant="segmented"
            value={tab}
            onChange={setTab}
            items={[
              { id: "all", label: "All (7)" },
              {
                id: "pending",
                label: (
                  <span className="inline-flex items-center gap-1.5">
                    Pending Action (3) <span aria-hidden className="size-1.5 rounded-full bg-danger-solid" />
                  </span>
                ),
                text: "Pending Action (3)",
              },
              { id: "submitted", label: "Submitted (2)" },
              { id: "graded", label: "Graded & Evaluated (2)" },
            ]}
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by subject">
          <span className="mr-1 text-[11px] font-medium uppercase tracking-[0.08em] text-fg-2">Subject:</span>
          {(["all", ...subjects] as const).map((s) => {
            const on = subject === s;
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => setSubject(s)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors",
                  on ? "bg-primary text-primary-fg" : "bg-surface-2 text-fg-2 hover:bg-surface-3 hover:text-fg",
                )}
              >
                {s === "all" ? "All Subjects (6)" : s}
              </button>
            );
          })}
        </div>
      </Card>

      <section className="mt-9" aria-labelledby="active-h">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 id="active-h" className="text-[28px] font-bold leading-9 tracking-[-0.03em] text-fg">
              Active Deliverables
            </h2>
            <span className="rounded-lg bg-surface-3 px-2.5 py-1 text-[12px] font-semibold text-fg-2">{active.length} Actionable Tasks</span>
          </div>
          <p className="flex items-center gap-1.5 text-[12px] font-medium text-fg-2">
            <ShieldCheck className="size-4 text-success-solid" aria-hidden /> Client-Side Compression &lt; 20MB Auto-Enforced
          </p>
        </div>

        {active.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 items-start gap-0 md:grid-cols-2 md:gap-x-6">
            <div className="flex min-w-0 flex-col gap-0">
              {left.map((d) => (
                <DeliverableCard key={d.id} d={d} />
              ))}
            </div>
            <div className="flex min-w-0 flex-col gap-0">
              {right.map((d) => (
                <DeliverableCard key={d.id} d={d} />
              ))}
            </div>
          </div>
        ) : (
          <Card className="mt-5 p-10 text-center text-[14px] text-fg-2">No active deliverables match your filters.</Card>
        )}
      </section>

      <section className="mt-9" aria-labelledby="past-h">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="past-h" className="flex items-center gap-2.5 text-[28px] font-bold leading-9 tracking-[-0.03em] text-fg">
              <CircleCheck className="size-5 text-success-solid" strokeWidth={2} aria-hidden /> Past Submissions &amp; Evaluated Grades
            </h2>
            <p className="mt-1 text-[14px] text-fg-2">Historical submissions, professor feedback remarks, and verified evaluation rubrics for this semester.</p>
          </div>
          <button
            type="button"
            onClick={() => toast("Download started (simulated): All rubrics (PDF)")}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-link hover:underline"
          >
            <Download className="size-4" aria-hidden /> Export All Rubrics (PDF)
          </button>
        </div>

        {past.length > 0 ? (
          <Card className="mt-5 divide-y divide-line/0 px-6 py-6">
            <ul className="flex flex-col gap-10">
              {past.map((p) => (
                <li key={p.id} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 gap-4">
                    <span aria-hidden className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-success-soft">
                      <BadgeCheck className="size-6 text-success-solid" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12px]">
                        <span className="font-semibold text-link">{p.course}</span>
                        <span aria-hidden className="text-fg-muted">•</span>
                        <span className="font-medium text-fg-2">{p.submitted}</span>
                        <span className="rounded-full bg-success-soft px-2 py-0.5 text-[11px] font-semibold text-success">{p.chip}</span>
                      </p>
                      <h3 className="mt-1 text-[20px] font-semibold leading-7 tracking-[-0.02em] text-fg">{p.title}</h3>
                      <p className="mt-2.5 inline-flex max-w-[680px] gap-2 rounded-lg bg-surface-2 px-3 py-2 text-[13px] italic leading-[18px] text-fg-2">
                        <Quote className="mt-0.5 size-3 shrink-0 fill-current not-italic text-link" aria-hidden />
                        <span>
                          &ldquo;{p.quote}&rdquo; — <strong className="font-semibold text-fg">{p.by}</strong>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-4 sm:pr-1">
                    <div className="text-right">
                      <p className="leading-9">
                        <span className="text-[32px] font-bold tracking-[-0.03em] text-link">{p.score}</span>
                        <span className="ml-1 text-[14px] font-medium text-fg-2">/ {p.outOf}</span>
                      </p>
                      <p className="text-[12px] font-semibold text-success">{p.grade}</p>
                    </div>
                    <IconButton label={`Download ${p.title} graded copy`} className="size-10" onClick={() => toast("Download started (simulated)")}>
                      <Download className="size-[18px]" />
                    </IconButton>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        ) : (
          <Card className="mt-5 p-10 text-center text-[14px] text-fg-2">No past submissions match your filters.</Card>
        )}
      </section>
    </>
  );
}
