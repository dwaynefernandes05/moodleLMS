"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const subscribeNoop = () => () => {};

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  // false on the server and during hydration, true afterwards: avoids an icon hydration mismatch.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      aria-label={mounted ? label : "Toggle colour theme"}
      title={mounted ? label : undefined}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-xl text-fg-2 transition-colors hover:bg-surface-3 hover:text-fg",
        className,
      )}
    >
      <span className="flex size-5 items-center justify-center" aria-hidden>
        {mounted ? (
          isDark ? <Sun className="size-5" strokeWidth={1.75} /> : <Moon className="size-5" strokeWidth={1.75} />
        ) : null}
      </span>
    </button>
  );
}
