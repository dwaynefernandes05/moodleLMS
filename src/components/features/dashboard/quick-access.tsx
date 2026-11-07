"use client";

import { Download, FileCode2, FileText, FolderHeart, PlaySquare, SlidersHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { materials, type Material } from "@/lib/data/dashboard";

function Icon({ kind }: { kind: Material["kind"] }) {
  const cfg = {
    pdf: { icon: <FileText className="size-[18px]" />, cls: "bg-danger-soft text-danger-solid" },
    video: { icon: <PlaySquare className="size-[18px]" />, cls: "bg-warning-soft text-warning-solid" },
    code: { icon: <FileCode2 className="size-[18px]" />, cls: "bg-surface-3 text-link" },
  }[kind];
  return (
    <span aria-hidden className={cn("flex size-9 items-center justify-center rounded-lg", cfg.cls)}>
      {cfg.icon}
    </span>
  );
}

export function QuickAccess() {
  const toast = useToast();
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <FolderHeart className="mt-1 size-5 shrink-0 text-link" aria-hidden />
          <div>
            <h2 className="text-[22px] font-medium leading-7 tracking-[-0.02em] text-fg">Quick Access Course Materials</h2>
            <p className="mt-0.5 text-[13px] text-fg-2">Direct downloads with zero folder digging</p>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="mt-1.5 h-8 rounded-lg text-[11px] font-semibold text-fg-2"
          onClick={() => toast("Subject filter is not part of this prototype")}
        >
          <SlidersHorizontal className="size-3" aria-hidden /> Filter by Subject
        </Button>
      </div>

      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        {materials.map((m) => (
          <li key={m.id} className="flex flex-col rounded-2xl bg-surface-2 p-4">
            <div className="flex items-start justify-between">
              <Icon kind={m.kind} />
              <span className="rounded-md bg-surface-3 px-2 py-[2px] text-[11px] font-semibold text-fg-2">{m.size}</span>
            </div>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.04em] text-link">{m.subject}</p>
            <h3 className="truncate text-[16px] font-medium leading-6 tracking-[-0.02em] text-fg" title={m.fullTitle}>
              {m.title}
            </h3>
            <p className="text-[13px] leading-5 text-fg-2">{m.meta}</p>
            <Button
              variant="white"
              size="sm"
              className="mt-3 h-8 w-full rounded-lg text-[13px] text-link shadow-sm"
              onClick={() => toast(`Download started (simulated): ${m.fullTitle}`)}
            >
              <Download className="size-3.5" aria-hidden /> 1-Click Download
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
