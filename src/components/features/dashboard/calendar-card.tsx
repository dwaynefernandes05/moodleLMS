"use client";

import { useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

type Marker = "today" | "urgent" | "assignment" | "quiz";
// Events only exist for the mocked "current" month (November 2024).
const EVENTS: Record<number, Marker> = { 8: "today", 9: "urgent", 12: "assignment", 15: "quiz" };

type Cell = { day: number; inMonth: boolean; marker?: Marker };

function buildGrid(year: number, month: number): Cell[] {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const cells: Cell[] = [];
  for (let i = lead - 1; i >= 0; i--) cells.push({ day: prevDays - i, inMonth: false });
  const hasEvents = year === 2024 && month === 10;
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, inMonth: true, marker: hasEvents ? EVENTS[d] : undefined });
  const rows = Math.ceil(cells.length / 7);
  let next = 1;
  while (cells.length < rows * 7) cells.push({ day: next++, inMonth: false });
  return cells;
}

const markerBox: Record<Marker, string> = {
  today: "bg-primary text-white font-semibold shadow-[0_4px_10px_-3px_rgba(0,81,213,0.6)]",
  urgent: "bg-danger-soft text-fg font-medium",
  assignment: "bg-surface-3 text-fg font-medium",
  quiz: "bg-surface-3 text-fg font-medium",
};
const markerDot: Record<Marker, string> = {
  today: "bg-danger-solid",
  urgent: "bg-danger-solid",
  assignment: "bg-primary dark:bg-link",
  quiz: "bg-warning-solid",
};

export function CalendarCard() {
  const [{ year, month }, setView] = useState({ year: 2024, month: 10 });
  // The design shows the first three week-rows; the heading toggles the full month.
  const [expanded, setExpanded] = useState(false);
  const allCells = useMemo(() => buildGrid(year, month), [year, month]);
  const cells = expanded ? allCells : allCells.slice(0, 21);

  const shift = (delta: number) =>
    setView(({ year: y, month: m }) => {
      const d = new Date(y, m + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });

  return (
    <Card className="px-6 py-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[19px] font-medium leading-6 tracking-[-0.02em] text-fg" aria-live="polite">
          <button
            type="button"
            aria-expanded={expanded}
            title={expanded ? "Show first three weeks" : "Show full month"}
            onClick={() => setExpanded((e) => !e)}
            className="flex items-center gap-2 rounded-md text-left"
          >
            <CalendarDays className="size-[18px] text-link" aria-hidden />
            {MONTHS[month]} {year}
          </button>
        </h2>
        <div className="flex items-center gap-5 pr-1 text-fg-2">
          <button type="button" aria-label="Previous month" onClick={() => shift(-1)} className="rounded-md p-0.5 hover:bg-surface-3">
            <ChevronLeft className="size-4" />
          </button>
          <button type="button" aria-label="Next month" onClick={() => shift(1)} className="rounded-md p-0.5 hover:bg-surface-3">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div role="grid" aria-label={`${MONTHS[month]} ${year}`}>
        <div role="row" className="mb-1 grid grid-cols-7 text-center text-[11px] font-semibold text-fg-2">
          {WEEKDAYS.map((w) => (
            <div key={w} role="columnheader" className="py-2">
              {w}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-0.5 text-center text-[12px]">
          {cells.map((c, i) => (
            <div key={i} role="gridcell" className="flex h-10 items-center justify-center">
              {c.marker ? (
                <span className={cn("relative flex h-10 w-[46px] items-center justify-center rounded-lg", markerBox[c.marker])}>
                  {c.day}
                  <span aria-hidden className={cn("absolute bottom-[7px] size-1 rounded-full", markerDot[c.marker])} />
                  <span className="sr-only">
                    {c.marker === "today" ? ", today, urgent lab" : c.marker === "urgent" ? ", urgent lab" : c.marker === "assignment" ? ", assignment due" : ", online quiz"}
                  </span>
                </span>
              ) : (
                <span className={cn("font-medium", c.inMonth ? "text-fg" : "text-fg-muted/50")}>{c.day}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <ul className="mt-5 flex items-center justify-between text-[11px] font-semibold text-fg-2">
        {[
          ["Urgent Lab", "bg-danger-solid"],
          ["Assignment", "bg-primary dark:bg-link"],
          ["Online Quiz", "bg-warning-solid"],
        ].map(([label, color]) => (
          <li key={label} className="flex items-center gap-1.5">
            <span aria-hidden className={cn("size-2 rounded-full", color)} />
            {label}
          </li>
        ))}
      </ul>
    </Card>
  );
}
