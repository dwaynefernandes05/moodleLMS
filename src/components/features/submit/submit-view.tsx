"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  Check,
  CheckCircle2,
  ClipboardCheck,
  CloudUpload,
  Code2,
  Eye,
  FileCode2,
  FileText,
  Loader2,
  MessageSquareText,
  Pencil,
  Send,
  ShieldCheck,
  SquareTerminal,
  X,
  Zap,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ProgressBar } from "@/components/ui/progress";
import { useToast } from "@/components/ui/toast";
import { MB, useFakeCompression, type ProcessedFile } from "@/hooks/use-fake-compression";
import { cn, formatBytes, sha256Hex } from "@/lib/utils";

const initialFiles: ProcessedFile[] = [
  {
    id: 1,
    name: "Shreyash_Singh_DWM_ISE2_Report.pdf",
    originalBytes: 34.2 * MB,
    state: "ready",
    progress: 100,
    compressedBytes: 12.8 * MB,
    savedPct: 62,
    seconds: 1.4,
  },
  { id: 2, name: "ISE2_Algorithm_Execution.ipynb", originalBytes: 140 * 1024, state: "ready", progress: 100 },
];

const rubric = [
  { title: "1. Data Preprocessing & Pipeline", sub: "Null handling, normalizer & clean scripts", pts: 6 },
  { title: "2. Algorithm Optimization", sub: "K-Means elbow graph & clustering purity", pts: 9 },
  { title: "3. Discussion & Results Analysis", sub: "Interpretations & comparative tables", pts: 5 },
  { title: "4. Lab Viva Voce", sub: "Individual concept defense", pts: 5 },
];

function FileIcon({ name }: { name: string }) {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext === "pdf")
    return (
      <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-danger-soft text-danger-solid">
        <FileText className="size-5" />
      </span>
    );
  if (ext === "py")
    return (
      <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-3 text-link">
        <FileCode2 className="size-5" />
      </span>
    );
  return (
    <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-warning-soft text-warning-solid">
      <SquareTerminal className="size-5" />
    </span>
  );
}

function FileRow({ f, locked, onRemove }: { f: ProcessedFile; locked: boolean; onRemove: () => void }) {
  const toast = useToast();
  const isPdf = f.name.toLowerCase().endsWith(".pdf");
  return (
    <li className="px-3 py-3">
      <div className="flex items-center gap-3">
        <FileIcon name={f.name} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold leading-5 text-fg">{f.name}</p>
          {f.state === "compressing" && (
            <div className="mt-1.5 max-w-[320px]">
              <ProgressBar value={f.progress} height={6} label={`Compressing ${f.name}`} />
              <p className="mt-1 flex items-center gap-1.5 text-[12px] text-fg-2">
                <Loader2 className="size-3 animate-spin" aria-hidden /> Auto-compressing locally… {f.progress}%
              </p>
            </div>
          )}
          {f.state === "ready" && f.compressedBytes && (
            <p className="text-[13px] leading-[18px]">
              <span className="text-fg-2 line-through">{formatBytes(f.originalBytes)}</span>
              <span className="mx-1.5 text-fg-2">→</span>
              <span className="font-medium text-success">
                {formatBytes(f.compressedBytes)} ({f.savedPct}% saved)
              </span>
            </p>
          )}
          {f.state === "ready" && !f.compressedBytes && (
            <p className="text-[13px] leading-[18px] text-fg-2">
              {formatBytes(f.originalBytes)} <span className="mx-1">•</span>
              <span className="inline-flex items-center gap-0.5 font-medium text-success">
                <Check className="size-3.5" aria-hidden /> Validated &amp; Ready
              </span>
            </p>
          )}
          {f.state === "error" && (
            <p role="alert" className="text-[13px] font-medium leading-[18px] text-danger">
              {f.error}
            </p>
          )}
        </div>
        {f.state === "ready" && f.compressedBytes && (
          <button
            type="button"
            onClick={() => toast("Optimized preview is not part of this prototype")}
            className="hidden items-center gap-1.5 rounded-md bg-surface-3 px-3 py-1.5 text-[12px] font-semibold text-link hover:bg-surface-4 sm:inline-flex"
          >
            <Eye className="size-3.5" aria-hidden /> Preview Optimized
          </button>
        )}
        {f.state === "ready" && !f.compressedBytes && !isPdf && (
          <button
            type="button"
            aria-label={`Inspect ${f.name}`}
            onClick={() => toast("Notebook preview is not part of this prototype")}
            className="rounded-md p-2 text-fg-2 hover:bg-surface-3"
          >
            <Code2 className="size-[18px]" />
          </button>
        )}
        <button
          type="button"
          aria-label={`Remove ${f.name}`}
          disabled={locked}
          onClick={onRemove}
          className="rounded-md p-2 text-fg-2 hover:bg-surface-3 hover:text-fg disabled:opacity-40"
        >
          <X className="size-[18px]" />
        </button>
      </div>
      {f.state === "ready" && f.compressedBytes && (
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-success-soft px-3 py-2">
          <p className="flex items-center gap-2 text-[13px] leading-[18px] text-fg">
            <CheckCircle2 className="size-[18px] shrink-0 text-success-solid" aria-hidden />
            <span>Auto-compressed locally in {f.seconds}s. Vector charts &amp; output figures preserved in 300 DPI.</span>
          </p>
          <span className="shrink-0 rounded-md bg-surface px-2.5 py-1.5 text-[12px] font-medium text-success">
            Fit Server Cap ({(f.compressedBytes / MB).toFixed(1)} / 20 MB)
          </span>
        </div>
      )}
    </li>
  );
}

type Step = { title: string; sub: string; state: "done" | "active" | "pending" };

function Timeline({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative mt-4 flex flex-col gap-[18px]">
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-3">
          {i < steps.length - 1 && (
            <span aria-hidden className="absolute left-[9px] top-[22px] h-[calc(100%-4px)] w-px bg-surface-4" />
          )}
          <span
            aria-hidden
            className={cn(
              "relative z-10 mt-0.5 flex size-[19px] shrink-0 items-center justify-center rounded-full",
              s.state === "done" && "bg-success-solid text-white",
              s.state === "active" && "bg-primary text-white",
              s.state === "pending" && "bg-surface-4",
            )}
          >
            {s.state === "done" && <Check className="size-3" strokeWidth={3.5} />}
            {s.state === "active" && <Pencil className="size-2.5" strokeWidth={3} />}
            {s.state === "pending" && <span className="size-1.5 rounded-full bg-fg-muted" />}
          </span>
          <div className="leading-[18px]">
            <p className="text-[14px] font-semibold text-fg">{s.title}</p>
            <p className="text-[13px] text-fg-2">{s.sub}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function SubmitView() {
  const toast = useToast();
  const router = useRouter();
  const { files, addFiles, removeFile } = useFakeCompression({ thresholdBytes: 20 * MB, initial: initialFiles });
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [honor, setHonor] = useState(true);
  const [receipt, setReceipt] = useState(true);
  const [phase, setPhase] = useState<"idle" | "submitting" | "done">("idle");
  const [receiptId, setReceiptId] = useState("");

  const ready = files.filter((f) => f.state === "ready");
  const busy = files.some((f) => f.state === "compressing");
  const canSubmit = phase === "idle" && ready.length > 0 && honor && !busy;
  const locked = phase !== "idle";

  const onFiles = (list: FileList | null) => {
    if (!list || locked) return;
    addFiles(Array.from(list).map((f) => ({ name: f.name, size: f.size })));
  };

  const submit = async () => {
    setPhase("submitting");
    const stamp = new Date().toISOString();
    const id = await sha256Hex(`${files.map((f) => f.name).join("|")}@${stamp}`);
    await new Promise((r) => window.setTimeout(r, 1100));
    setReceiptId(id);
    setPhase("done");
    toast("Submission locked successfully (simulated)");
  };

  const steps: Step[] = [
    { title: "Problem Statement Issued", sub: "28 Oct 2026, 10:00 AM", state: "done" },
    {
      title: "Draft Uploaded",
      sub: `Today, 2:18 PM (${files.length} file${files.length === 1 ? "" : "s"} attached)`,
      state: phase === "done" ? "done" : "active",
    },
    {
      title: "Final Submission & Lock",
      sub: phase === "done" ? "Locked just now" : "Pending action above",
      state: phase === "done" ? "done" : "pending",
    },
    { title: "Faculty Evaluation & Viva", sub: "Estimated by 10 Nov 2026", state: "pending" },
  ];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Fourth yr - DWM LAB", href: "/courses/dwm-lab" },
          { label: "ISE2 DWM PRACTICAL", href: "/assignments" },
          { label: "Submit Work" },
        ]}
      />

      {/* Header */}
      <Card className="mt-6 flex flex-col gap-5 px-6 py-6 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-surface-4 px-2 py-[3px] text-[11px] font-bold uppercase tracking-[0.04em] text-link">Course: COMP-402</span>
            <span className="rounded-md bg-surface-3 px-2 py-[3px] text-[11px] font-semibold text-fg-2">Lab Group: Batch B3</span>
            <span className="inline-flex items-center gap-1 rounded-md bg-surface-4 px-2 py-[3px] text-[11px] font-semibold text-link">
              <BadgeCheck className="size-3" aria-hidden /> Turnitin Enabled
            </span>
          </div>
          <h1 className="mt-3 max-w-[540px] text-[29px] font-bold leading-9 tracking-[-0.04em] text-fg">
            ISE2 DWM PRACTICAL – Final Report &amp; Code Submission
          </h1>
          <p className="mt-1.5 text-[14px] text-fg-2">Data Warehousing &amp; Mining Laboratory • In-Semester Evaluation Phase 2</p>
        </div>
        <div className="rounded-2xl bg-danger-soft px-4 py-3.5 text-right md:mt-1 md:min-w-[266px]">
          <p className="inline-flex items-center justify-end gap-2.5 text-[20px] font-medium leading-7 tracking-[-0.02em] text-danger-solid dark:text-danger">
            <span aria-hidden className="size-3 rounded-full bg-current" /> Due in 18 hrs 22 mins
          </p>
          <p className="mt-0.5 text-[13px] text-fg-2">Thursday, 5 November 2026, 2:45 PM</p>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_394px]">
        <div className="flex min-w-0 flex-col gap-6">
          {/* Instructions */}
          <Card className="px-6 py-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2.5 text-[20px] font-medium leading-7 tracking-[-0.02em] text-fg">
                <ClipboardCheck className="size-5 text-link" aria-hidden /> Instructions &amp; Criteria
              </h2>
              <span className="rounded-full bg-surface-4 px-3 py-1 text-[12px] font-semibold text-link">25 Points Total</span>
            </div>
            <p className="mt-5 text-[14px] leading-[23px] text-fg-2">
              Submit your compiled experimental report along with working source code scripts (
              <code className="rounded bg-surface-3 px-1.5 py-0.5 font-sans text-[12px] text-fg">.py</code> or{" "}
              <code className="rounded bg-surface-3 px-1.5 py-0.5 font-sans text-[12px] text-fg">.ipynb</code> ). Ensure high-resolution screenshot proofs of clustered outputs, silhouette analysis scores, and association rule tables are properly annotated.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["Grading Split", "15 Lab + 10 Viva", ""],
                ["Similarity Threshold", "< 15% Match", "text-success"],
                ["Attempts Allowed", "1 Submission", ""],
              ].map(([l, v, c]) => (
                <div key={l} className="rounded-xl bg-surface-2 px-4 py-3.5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-fg-2">{l}</p>
                  <p className={cn("mt-1 text-[20px] font-medium leading-7 tracking-[-0.02em] text-fg", c)}>{v}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Auto-compress banner */}
          <div
            className="flex flex-col gap-3 rounded-2xl px-5 py-4 text-white shadow-card sm:flex-row sm:items-center sm:justify-between"
            style={{ backgroundImage: "linear-gradient(90deg, var(--banner-from) 0%, var(--banner-to) 100%)" }}
          >
            <div className="flex items-center gap-4">
              <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
                <Zap className="size-5" />
              </span>
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-white/90">Auto-Compress Engine Active</p>
                <p className="mt-0.5 max-w-[570px] text-[14px] leading-[19px]">
                  Files over 20MB are automatically optimized without visual degradation in-browser. Zero external uploaders or third-party tools required!
                </p>
              </div>
            </div>
            <span className="shrink-0 self-start rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold sm:self-center">WebAssembly v2.4</span>
          </div>

          {/* File submission area */}
          <Card className="px-6 py-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-[20px] font-medium leading-7 tracking-[-0.02em] text-fg">File Submission Area</h2>
                <p className="mt-0.5 text-[13px] text-fg-2">Max server payload: 20 MB per file (Automatic compression engaged)</p>
              </div>
              <span className="rounded-md bg-surface-4 px-3 py-1.5 text-[11px] font-bold text-link">Accepted: PDF, IPYNB, PY, ZIP</span>
            </div>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                if (!locked) setOver(true);
              }}
              onDragLeave={() => setOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setOver(false);
                onFiles(e.dataTransfer.files);
              }}
              className={cn(
                "mt-4 flex min-h-[205px] flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-8 text-center transition-colors",
                over ? "border-primary bg-surface-3" : "border-surface-4 bg-surface-2",
              )}
            >
              <span aria-hidden className="flex size-16 items-center justify-center rounded-full bg-surface shadow-card">
                <CloudUpload className="size-8 text-link" strokeWidth={1.75} />
              </span>
              <p className="mt-4 text-[20px] font-medium leading-7 tracking-[-0.02em] text-fg">
                Drop your assignment files here, or{" "}
                <button
                  type="button"
                  disabled={locked}
                  onClick={() => inputRef.current?.click()}
                  className="text-link underline underline-offset-2 hover:opacity-80 disabled:opacity-50"
                >
                  browse files
                </button>
              </p>
              <p className="mt-1.5 max-w-[420px] text-[13px] leading-[18px] text-fg-2">
                PDF lab records, execution logs, and Jupyter source notebooks are validated automatically upon drop.
              </p>
              <input
                ref={inputRef}
                type="file"
                multiple
                tabIndex={-1}
                aria-label="Choose assignment files"
                className="sr-only"
                accept=".pdf,.ipynb,.py,.zip,*/*"
                onChange={(e) => {
                  onFiles(e.target.files);
                  e.target.value = "";
                }}
              />
            </div>

            <h3 className="mt-6 text-[12px] font-bold uppercase tracking-[0.08em] text-fg">Processed Files for Submission ({files.length})</h3>
            <ul className="mt-3 flex flex-col divide-y divide-line/60" aria-live="polite">
              {files.map((f) => (
                <FileRow key={f.id} f={f} locked={locked} onRemove={() => removeFile(f.id)} />
              ))}
              {files.length === 0 && <li className="px-3 py-6 text-center text-[13px] text-fg-2">No files yet. Drop a file above to begin.</li>}
            </ul>
          </Card>

          {/* Integrity */}
          <Card className="px-6 py-6">
            <h2 className="text-[20px] font-medium leading-7 tracking-[-0.02em] text-fg">Academic Integrity &amp; Receipts</h2>
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex items-start gap-3 rounded-xl bg-surface-2 px-3 py-3">
                <Checkbox checked={honor} onChange={setHonor} label="SPIT Academic Honor Declaration" className="mt-0.5" />
                <div className="leading-[18px]">
                  <p className="text-[13px] font-semibold text-fg">SPIT Academic Honor Declaration</p>
                  <p className="text-[13px] text-fg-2">
                    I certify that this submission represents solely my authentic practical experimentation, code implementation, and interpretations. I adhere to SPIT Autonomy Academic Regulations 2024-28.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-surface-2 px-3 py-3">
                <MessageSquareText className="size-5 shrink-0 text-link" aria-hidden />
                <div className="min-w-0 flex-1 leading-[18px]">
                  <p className="text-[13px] font-semibold text-fg">Instant Timestamp Receipt via WhatsApp &amp; SMS</p>
                  <p className="text-[13px] text-fg-2">Sends cryptographic SHA-256 validation proof with submission timestamp to +91 98765 ●●●●●</p>
                </div>
                <Checkbox checked={receipt} onChange={setReceipt} label="Send instant timestamp receipt via WhatsApp and SMS" className="size-5" />
              </div>
            </div>

            {phase === "done" ? (
              <div role="status" className="mt-5 rounded-xl bg-success-soft px-4 py-4">
                <p className="flex items-center gap-2 text-[15px] font-semibold text-success">
                  <CheckCircle2 className="size-5" aria-hidden /> Submission received &amp; locked
                </p>
                <p className="mt-1 text-[13px] text-fg-2">
                  {receipt ? "A timestamp receipt has been queued for WhatsApp & SMS (simulated). " : "No message receipt requested. "}
                  Keep this receipt id for your records:
                </p>
                <p className="mt-2 break-all rounded-lg bg-surface px-3 py-2 font-mono text-[12px] text-fg">SHA-256 · {receiptId}</p>
                <div className="mt-3 flex gap-3">
                  <Button variant="tinted" className="h-9 text-[13px]" onClick={() => router.push("/assignments")}>
                    Back to Assignments
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button variant="tinted" className="h-[42px] px-4 text-[14px] text-fg" disabled={locked} onClick={() => toast("Draft saved (simulated)")}>
                  Save as Draft
                </Button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="rounded-lg px-4 py-2 text-[14px] font-medium text-fg hover:bg-surface-2"
                >
                  Cancel
                </button>
                <Button
                  className="ml-auto h-[42px] w-full flex-1 px-6 text-[14px] sm:w-auto sm:max-w-[325px]"
                  disabled={!canSubmit}
                  onClick={submit}
                  aria-describedby="submit-hint"
                >
                  {phase === "submitting" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
                  {phase === "submitting" ? "Submitting…" : "Submit Assignment for Final Grading"}
                </Button>
                <p id="submit-hint" className="sr-only">
                  Requires at least one valid file and the honor declaration.
                </p>
              </div>
            )}
            {phase === "idle" && !canSubmit && (
              <p className="mt-2 text-right text-[12px] text-fg-2">
                {busy ? "Waiting for compression to finish…" : "Add at least one valid file and accept the honor declaration to submit."}
              </p>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="flex min-w-0 flex-col gap-6" aria-label="Submission details">
          <Card className="px-6 py-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[20px] font-medium leading-7 tracking-[-0.02em] text-fg">Submission Status</h2>
              <span className={cn("text-[11px] font-semibold", phase === "done" ? "text-success" : "text-warning")}>
                {phase === "done" ? "Submitted" : "Draft State"}
              </span>
            </div>
            <Timeline steps={steps} />
            <div className="mt-5 rounded-xl bg-surface-3 px-4 py-3.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-fg-2">Faculty Evaluator</p>
              <p className="mt-1.5 text-[14px] font-semibold text-fg">Prof. Dr. Aarti M. Karande</p>
              <p className="mt-1 text-[13px] text-fg-2">Department of Computer Engineering</p>
            </div>
          </Card>

          <Card className="px-6 py-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[20px] font-medium leading-7 tracking-[-0.02em] text-fg">Grading Rubric</h2>
              <span className="text-[12px] font-medium text-fg-2">4 Criteria</span>
            </div>
            <ul className="mt-4 flex flex-col gap-3">
              {rubric.map((r) => (
                <li key={r.title} className="flex items-center justify-between gap-3 rounded-lg bg-surface-2 px-3 py-2.5">
                  <div className="leading-[18px]">
                    <p className="text-[13px] font-semibold text-fg">{r.title}</p>
                    <p className="text-[13px] text-fg-2">{r.sub}</p>
                  </div>
                  <span className="shrink-0 text-[13px] font-semibold text-fg">{r.pts} Pts</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="flex gap-3 rounded-2xl bg-surface-3 px-5 py-5">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 fill-primary/20 text-link" aria-hidden />
            <div className="leading-[18px]">
              <h2 className="text-[13px] font-semibold text-fg">Local Privacy Guarantee</h2>
              <p className="mt-1.5 text-[13px] text-fg-2">
                All file compression runs strictly inside your web browser sandbox via WebAssembly. No assignment reports or code files are ever routed through external commercial cloud compressors.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
