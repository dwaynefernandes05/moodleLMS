"use client";

import { forwardRef } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  wrapperClassName?: string;
  trailing?: React.ReactNode;
};

export const SearchInput = forwardRef<HTMLInputElement, Props>(function SearchInput(
  { wrapperClassName, className, trailing, ...props },
  ref,
) {
  return (
    <label
      className={cn(
        "flex items-center gap-2.5 rounded-xl bg-surface-2 px-3.5 text-fg-muted focus-within:ring-2 focus-within:ring-brand/40",
        wrapperClassName,
      )}
    >
      <Search className="size-4 shrink-0" aria-hidden />
      <input
        ref={ref}
        type="text"
        className={cn(
          "min-w-0 flex-1 bg-transparent py-2.5 text-[13px] text-fg outline-none placeholder:text-fg-muted",
          className,
        )}
        {...props}
      />
      {trailing}
    </label>
  );
});

export function Keycap({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="shrink-0 rounded-md bg-surface-3 px-1.5 py-0.5 font-sans text-[11px] font-semibold text-fg-muted">
      {children}
    </kbd>
  );
}
