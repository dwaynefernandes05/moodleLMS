"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({
  checked,
  onChange,
  label,
  className,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border-2 transition-colors",
        checked ? "border-[#1a73ff] bg-[#1a73ff] text-white" : "border-line-strong bg-surface",
        className,
      )}
    >
      {checked && <Check className="size-3" strokeWidth={3.5} aria-hidden />}
    </button>
  );
}
