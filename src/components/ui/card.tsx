import { cn } from "@/lib/utils";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: DivProps) {
  return (
    <div
      className={cn("rounded-[20px] border border-line bg-surface shadow-card", className)}
      {...props}
    />
  );
}

/** Tinted inner panel used inside cards. */
export function Panel({ className, ...props }: DivProps) {
  return <div className={cn("rounded-xl bg-surface-2", className)} {...props} />;
}
