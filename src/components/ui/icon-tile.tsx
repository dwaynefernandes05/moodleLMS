import { cn } from "@/lib/utils";

export type TileTone = "blue" | "red" | "amber" | "green" | "slate" | "white";
const tones: Record<TileTone, string> = {
  blue: "bg-surface-3 text-link",
  red: "bg-danger-soft text-danger-solid",
  amber: "bg-warning-soft text-warning",
  green: "bg-success-soft text-success",
  slate: "bg-surface-3 text-fg-2",
  white: "bg-surface text-link shadow-sm",
};

export function IconTile({
  tone = "blue",
  size = 40,
  className,
  children,
  round = "xl",
}: {
  tone?: TileTone;
  size?: number;
  className?: string;
  children: React.ReactNode;
  round?: "lg" | "xl" | "full";
}) {
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        round === "full" ? "rounded-full" : round === "xl" ? "rounded-xl" : "rounded-lg",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
