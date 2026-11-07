import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tinted"
  | "outline"
  | "ghost"
  | "danger"
  | "white";
type Size = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-fg hover:bg-primary-hover shadow-[0_6px_14px_-6px_rgba(0,81,213,0.55)]",
  secondary: "bg-surface-3 text-fg hover:bg-surface-4",
  tinted: "bg-surface-3 text-link hover:bg-surface-4",
  outline: "border border-line-strong bg-surface text-fg hover:bg-surface-2",
  ghost: "bg-transparent text-fg-2 hover:bg-surface-2",
  danger: "bg-danger-solid text-white hover:brightness-95 shadow-[0_6px_14px_-6px_rgba(239,68,68,0.6)]",
  white: "bg-surface text-fg hover:bg-surface-2",
};

const sizes: Record<Size, string> = {
  sm: "h-8 gap-1.5 rounded-lg px-3 text-[12px]",
  md: "h-10 gap-2 rounded-[10px] px-4 text-[13px]",
  lg: "h-11 gap-2 rounded-xl px-5 text-[14px]",
};

type Common = {
  variant?: ButtonVariant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = Common & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof Common> & { href?: undefined };
type LinkProps = Common & { href: string; "aria-label"?: string; onClick?: () => void };

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const cls = cn(
    "inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap font-semibold transition-[background-color,box-shadow,filter,transform] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
    variants[variant],
    sizes[size],
    className,
  );
  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={cls} aria-label={props["aria-label"]} onClick={props.onClick}>
        {children}
      </Link>
    );
  }
  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props;
  void _v; void _s; void _c; void _ch; void _h;
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  tone?: "tinted" | "plain" | "outline";
  className?: string;
};

export function IconButton({ label, tone = "tinted", className, children, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[10px] transition-colors",
        tone === "tinted" && "bg-surface-3 text-fg-2 hover:bg-surface-4",
        tone === "plain" && "text-fg-muted hover:bg-surface-2 hover:text-fg",
        tone === "outline" && "border border-line-strong bg-surface text-fg-2 hover:bg-surface-2",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
