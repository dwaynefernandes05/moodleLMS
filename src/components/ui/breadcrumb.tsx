import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({
  items,
  separator = "chevron",
  homeIcon,
  className,
}: {
  items: Crumb[];
  separator?: "chevron" | "slash";
  homeIcon?: boolean;
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-[14px] text-fg-2", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.label} className="flex items-center gap-2">
              {i > 0 &&
                (separator === "chevron" ? (
                  <ChevronRight className="size-3.5 text-fg-muted" aria-hidden />
                ) : (
                  <span aria-hidden className="text-fg-muted/70">/</span>
                ))}
              {c.href && !last ? (
                <Link href={c.href} className="inline-flex items-center gap-1.5 hover:text-fg hover:underline">
                  {i === 0 && homeIcon && <Home className="size-3.5" aria-hidden />}
                  {c.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={cn("inline-flex items-center gap-1.5", last && "font-semibold text-fg")}
                >
                  {i === 0 && homeIcon && <Home className="size-3.5" aria-hidden />}
                  {c.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
