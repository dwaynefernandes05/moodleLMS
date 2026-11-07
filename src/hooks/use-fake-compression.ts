"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const MB = 1024 * 1024;
export const ACCEPTED_EXT = ["pdf", "ipynb", "py", "zip"] as const;

export type FileState = "compressing" | "ready" | "error";

export type ProcessedFile = {
  id: number;
  name: string;
  originalBytes: number;
  state: FileState;
  progress: number; // 0..100 while compressing
  compressedBytes?: number;
  savedPct?: number;
  seconds?: number;
  error?: string;
};

export type IncomingFile = { name: string; size: number };

function extOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i < 0 ? "" : name.slice(i + 1).toLowerCase();
}

/**
 * Simulated client-side "compression": files over `thresholdBytes` get a
 * progress bar for ~1.2–1.6s and a smaller reported size. Nothing is actually
 * read, compressed or uploaded.
 */
export function useFakeCompression(opts: { thresholdBytes?: number; initial?: ProcessedFile[] } = {}) {
  const { thresholdBytes = 20 * MB, initial = [] } = opts;
  const [files, setFiles] = useState<ProcessedFile[]>(initial);
  const idRef = useRef(1000);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach((id) => window.clearInterval(id));
  }, []);

  const addFiles = useCallback(
    (incoming: IncomingFile[]) => {
      for (const f of incoming) {
        const id = ++idRef.current;
        const ext = extOf(f.name);
        if (!(ACCEPTED_EXT as readonly string[]).includes(ext)) {
          setFiles((prev) => [
            ...prev,
            {
              id,
              name: f.name,
              originalBytes: f.size,
              state: "error",
              progress: 0,
              error: `“.${ext || "?"}” is not accepted. Allowed: PDF, IPYNB, PY, ZIP.`,
            },
          ]);
          continue;
        }
        if (f.size <= thresholdBytes) {
          setFiles((prev) => [...prev, { id, name: f.name, originalBytes: f.size, state: "ready", progress: 100 }]);
          continue;
        }
        const duration = 1200 + Math.random() * 400;
        const start = performance.now();
        setFiles((prev) => [...prev, { id, name: f.name, originalBytes: f.size, state: "compressing", progress: 0 }]);
        const timer = window.setInterval(() => {
          const p = Math.min(1, (performance.now() - start) / duration);
          if (p < 1) {
            setFiles((prev) => prev.map((x) => (x.id === id ? { ...x, progress: Math.round(p * 100) } : x)));
            return;
          }
          window.clearInterval(timer);
          const compressed = Math.min(f.size * 0.375, 12.8 * MB);
          setFiles((prev) =>
            prev.map((x) =>
              x.id === id
                ? {
                    ...x,
                    state: "ready",
                    progress: 100,
                    compressedBytes: compressed,
                    savedPct: Math.floor((1 - compressed / f.size) * 100),
                    seconds: Math.round(duration / 100) / 10,
                  }
                : x,
            ),
          );
        }, 60);
        timers.current.push(timer);
      }
    },
    [thresholdBytes],
  );

  const removeFile = useCallback((id: number) => setFiles((prev) => prev.filter((f) => f.id !== id)), []);
  const reset = useCallback(() => setFiles([]), []);

  return { files, addFiles, removeFile, reset };
}
