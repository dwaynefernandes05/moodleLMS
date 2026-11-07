"use client";

import { useState } from "react";
import { Cloud, FolderUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function VaultCard() {
  const toast = useToast();
  const [over, setOver] = useState(false);

  return (
    <Card className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-[19px] font-medium leading-6 tracking-[-0.02em] text-fg">
          <Cloud className="size-[18px] text-link" aria-hidden /> Private File Vault
        </h2>
        <span className="text-[12px] font-semibold text-fg-2">82 MB / 500 MB</span>
      </div>
      <ProgressBar value={16.4} height={8} className="mt-4" label="Vault storage used: 82 MB of 500 MB" />
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          const n = e.dataTransfer.files.length;
          toast(n ? `${n} file${n > 1 ? "s" : ""} added to your vault (simulated)` : "Dropped to vault (simulated)");
        }}
        className={cn(
          "mt-4 flex flex-col items-center rounded-xl border border-dashed px-4 py-5 text-center transition-colors",
          over ? "border-primary bg-surface-3" : "border-surface-4 bg-surface-2",
        )}
      >
        <FolderUp className="mb-2 size-6 text-link" strokeWidth={1.75} aria-hidden />
        <p className="text-[13px] font-semibold leading-[18px] text-fg">Drop assignments or code</p>
        <p className="text-[13px] leading-[18px] text-fg-2">Automatic client compression on PDF files</p>
      </div>
    </Card>
  );
}
