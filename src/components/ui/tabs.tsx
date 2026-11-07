"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

export type TabItem<T extends string> = {
  id: T;
  label: React.ReactNode;
  /** plain text used for aria-label when label is rich */
  text?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
};

type Variant = "solid" | "segmented" | "bar";

const listCls: Record<Variant, string> = {
  solid: "flex flex-wrap items-center gap-1",
  segmented: "flex flex-wrap items-center gap-0.5 rounded-xl bg-surface-2 p-1",
  bar: "flex flex-wrap items-center gap-1",
};

const tabCls: Record<Variant, { base: string; on: string; off: string }> = {
  solid: {
    base: "rounded-lg px-3 py-2 text-[13.5px] font-medium",
    on: "bg-primary text-primary-fg shadow-[0_4px_12px_-4px_rgba(0,81,213,0.6)]",
    off: "text-fg-2 hover:bg-surface-2 hover:text-fg",
  },
  segmented: {
    base: "rounded-lg px-3 py-1.5 text-[13px] font-medium",
    on: "bg-surface text-fg shadow-sm",
    off: "text-fg-2 hover:text-fg",
  },
  bar: {
    base: "gap-2 rounded-xl px-4 py-2.5 text-[14px] font-medium",
    on: "bg-brand text-white shadow-[0_6px_16px_-6px_rgba(49,107,243,0.7)]",
    off: "text-fg-2 hover:bg-surface-2 hover:text-fg",
  },
};

export function Tabs<T extends string>({
  items,
  value,
  onChange,
  variant = "solid",
  label,
  className,
  idPrefix = "tab",
}: {
  items: TabItem<T>[];
  value: T;
  onChange: (id: T) => void;
  variant?: Variant;
  label: string;
  className?: string;
  idPrefix?: string;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const onKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (idx + (e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length;
    onChange(items[next].id);
    refs.current[items[next].id]?.focus();
  };
  return (
    <div role="tablist" aria-label={label} className={cn(listCls[variant], className)}>
      {items.map((t, i) => {
        const on = t.id === value;
        const c = tabCls[variant];
        return (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[t.id] = el;
            }}
            id={`${idPrefix}-${t.id}`}
            role="tab"
            type="button"
            aria-selected={on}
            aria-controls={`${idPrefix}-panel-${t.id}`}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(t.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn("inline-flex items-center whitespace-nowrap transition-colors", c.base, on ? c.on : c.off)}
          >
            {t.icon}
            {t.label}
            {t.badge}
          </button>
        );
      })}
    </div>
  );
}
