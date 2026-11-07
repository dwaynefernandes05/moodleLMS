"use client";

import { BellRing, FileUp, Timer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon-tile";
import { useToast } from "@/components/ui/toast";
import { urgent } from "@/lib/data/dashboard";

export function UrgentBanner() {
  const toast = useToast();
  return (
    <Card className="flex flex-col gap-5 px-6 py-5 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <IconTile tone="red" size={48} round="xl">
          <Timer className="size-6" strokeWidth={2} />
        </IconTile>
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-soft px-2.5 py-[3px] text-[11px] font-semibold text-danger-solid dark:text-danger">
              <span aria-hidden className="size-1.5 rounded-full bg-current" />
              {urgent.chip}
            </span>
            <span className="text-[12px] font-semibold uppercase text-fg">{urgent.course}</span>
          </div>
          <h2 className="mt-1 text-[20px] font-semibold leading-7 tracking-[-0.01em] text-fg">{urgent.headline}</h2>
          <p className="mt-0.5 text-[13px] text-fg-2">{urgent.meta}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="tinted"
          className="h-[38px] px-4 text-[14px] font-semibold"
          onClick={() => toast("WhatsApp reminders are active: pings at 24h and 2h (simulated)")}
        >
          <BellRing className="size-4" aria-hidden /> WhatsApp Reminders Active
        </Button>
        <Button href="/assignments/ise2-dwm-practical/submit" className="h-[38px] px-4 text-[14px]">
          <FileUp className="size-4" aria-hidden /> Submit Now
        </Button>
      </div>
    </Card>
  );
}
