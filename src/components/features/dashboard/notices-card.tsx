import { Megaphone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { notices } from "@/lib/data/notices";

const tone = {
  red: "text-danger-solid dark:text-danger",
  blue: "text-link",
  green: "text-success",
} as const;

export function NoticesCard() {
  return (
    <Card className="px-6 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-[19px] font-medium leading-6 tracking-[-0.02em] text-fg">
          <Megaphone className="size-[18px] text-link" aria-hidden /> Department Notices
        </h2>
        <span role="img" aria-label="Unread notices" className="mr-1 size-2 rounded-full bg-primary dark:bg-link" />
      </div>
      <ul className="flex flex-col gap-3">
        {notices.map((n) => (
          <li key={n.id} className="rounded-lg bg-surface-2 px-3 py-3">
            <div className="flex items-center justify-between gap-2">
              <span className={cn("text-[11px] font-bold uppercase tracking-[0.04em]", tone[n.tone])}>{n.source}</span>
              <span className="text-[12px] font-semibold text-fg-2">{n.time}</span>
            </div>
            <h3 className="mt-0.5 text-[15px] font-semibold leading-[18px] tracking-[-0.01em] text-fg">{n.title}</h3>
            <p className="mt-2 line-clamp-2 text-[13px] leading-[18px] text-fg-2">{n.description}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
