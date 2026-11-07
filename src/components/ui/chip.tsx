import { cn } from "@/lib/utils";

export type ChipTone =
  | "neutral"
  | "blue"
  | "blueSolid"
  | "blueSoft"
  | "red"
  | "amber"
  | "green"
  | "dark"
  | "outline";

const tones: Record<ChipTone, string> = {
  neutral: "bg-surface-3 text-fg-2",
  blue: "bg-surface-4 text-link",
  blueSoft: "bg-primary-soft text-link",
  blueSolid: "bg-brand text-white",
  red: "bg-danger-soft text-danger",
  amber: "bg-warning-soft text-warning",
  green: "bg-success-soft text-success",
  dark: "bg-[#0b1c30] text-white dark:bg-[#e8eef8] dark:text-[#0b1c30]",
  outline: "border border-line bg-surface text-fg-2",
};

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: ChipTone;
  /** Square-ish radius instead of a full pill */
  square?: boolean;
};

export function Chip({ tone = "neutral", square, className, ...props }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap px-2 py-[3px] text-[11px] font-semibold leading-4",
        square ? "rounded-md" : "rounded-full",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

export function Dot({ className }: { className?: string }) {
  return <span aria-hidden className={cn("inline-block size-[7px] rounded-full bg-current", className)} />;
}
