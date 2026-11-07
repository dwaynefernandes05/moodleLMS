import { cn } from "@/lib/utils";

export function PageShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <main id="main" className={cn("mx-auto w-full max-w-[1280px] flex-1 px-6 pb-10 pt-5", className)}>
      {children}
    </main>
  );
}
