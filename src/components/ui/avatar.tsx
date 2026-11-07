import { cn } from "@/lib/utils";

const palettes = [
  "bg-[#dbe7ff] text-[#0051d5] dark:bg-[#1e3a6e] dark:text-[#9cc0ff]",
  "bg-[#1e2a44] text-white",
  "bg-[#2f6bf3] text-white",
  "bg-[#6b7280] text-white",
  "bg-[#d8f3e7] text-[#047857] dark:bg-[#12392c] dark:text-[#6ee7b7]",
];

export function Avatar({
  initials,
  size = 32,
  palette = 0,
  className,
  rounded = "full",
  label,
}: {
  initials: string;
  size?: number;
  palette?: number;
  className?: string;
  rounded?: "full" | "xl";
  label?: string;
}) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ width: size, height: size, fontSize: Math.max(10, Math.round(size * 0.36)) }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center font-bold leading-none",
        rounded === "full" ? "rounded-full" : "rounded-2xl",
        palettes[palette % palettes.length],
        className,
      )}
    >
      {initials}
    </span>
  );
}
