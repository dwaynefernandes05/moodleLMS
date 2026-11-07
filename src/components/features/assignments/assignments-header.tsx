"use client";

import { BadgeCheck, BellRing, ClipboardCheck, Settings, SmartphoneNfc, Timer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button, IconButton } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon-tile";
import { useToast } from "@/components/ui/toast";

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <Card className="flex min-w-[148px] items-center gap-3 rounded-2xl px-4 py-3.5">
      {icon}
      <div className="leading-tight">
        <div className="text-[20px] font-medium tracking-[-0.02em] text-fg">{value}</div>
        <div className="mt-0.5 text-[11px] font-medium text-fg-2">{label}</div>
      </div>
    </Card>
  );
}

export function AssignmentsHeader() {
  const toast = useToast();
  return (
    <>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-[670px]">
          <div className="flex items-center gap-2.5">
            <span className="rounded-full bg-surface-4 px-2.5 py-[3px] text-[11px] font-bold uppercase tracking-[0.04em] text-link">
              Autonomy 2.0 • Coursework Hub
            </span>
            <span className="text-[12px] font-medium text-fg-2">• B.Tech Sem VII (CE)</span>
          </div>
          <h1 className="mt-1 text-[36px] font-bold leading-[44px] tracking-[-0.035em] text-fg">Assignment &amp; Deadline Central</h1>
          <p className="mt-1.5 text-[16px] leading-6 text-fg-2">
            Track, filter, and submit all coursework across your 6 enrolled subjects in one unified hub. Zero forgotten practicals, automated WhatsApp alerts, and built-in Moodle client-side compression.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:flex-nowrap lg:self-end">
          <Stat
            icon={
              <IconTile tone="red" size={40}>
                <Timer className="size-5" strokeWidth={1.75} />
              </IconTile>
            }
            value="1 Critical"
            label="Due in < 24h"
          />
          <Stat
            icon={
              <IconTile tone="blue" size={40}>
                <ClipboardCheck className="size-5" strokeWidth={1.75} />
              </IconTile>
            }
            value="7 Total"
            label="Active Submissions"
          />
          <Stat
            icon={
              <IconTile tone="green" size={40} round="full">
                <BadgeCheck className="size-5" strokeWidth={1.75} />
              </IconTile>
            }
            value="95.4%"
            label="On-Time Ratio"
          />
        </div>
      </div>

      <Card className="mt-6 flex flex-col gap-4 bg-gradient-to-r from-surface via-surface to-surface-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <IconTile tone="green" size={48}>
            <BellRing className="size-6" strokeWidth={1.75} />
          </IconTile>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-[18px] font-medium leading-6 tracking-[-0.02em] text-fg">Auto-Reminders Synced</h2>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2 py-[2px] text-[11px] font-semibold text-success">
                <span aria-hidden className="size-1.5 rounded-full bg-success-solid" /> WhatsApp + Cal Active
              </span>
            </div>
            <p className="mt-0.5 text-[13px] text-fg-2">
              Delivering automated alert pings 24h &amp; 2h prior to deadlines directly to <strong className="font-semibold text-fg">+91 98765 43210</strong>. Resolves missed practical anxiety.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="h-10 rounded-xl text-[13px] font-medium" onClick={() => toast("Test alert sent (simulated)")}>
            <SmartphoneNfc className="size-4" aria-hidden /> Test Alert
          </Button>
          <IconButton label="Reminder settings" className="size-10" onClick={() => toast("Reminder settings are not part of this prototype")}>
            <Settings className="size-[18px]" />
          </IconButton>
        </div>
      </Card>
    </>
  );
}
