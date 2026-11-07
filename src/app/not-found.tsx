import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageShell className="flex flex-col items-start pt-16">
      <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-link">404</p>
      <h1 className="mt-2 text-[36px] font-bold leading-[44px] tracking-[-0.035em] text-fg">Page not found</h1>
      <p className="mt-2 text-[14px] text-fg-2">This page is not part of the SPIT Moodle prototype.</p>
      <Button href="/" className="mt-6">
        Back to Dashboard
      </Button>
    </PageShell>
  );
}
