"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronDown, FileUp, FolderClosed, LayoutGrid, List, Search, Archive, Minimize2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { Keycap } from "@/components/ui/search-input";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { archived, courses, type CourseCategory } from "@/lib/data/courses";
import { CourseCard } from "./course-card";
import { MyCoursesSidebar } from "./sidebar";

type TabId = "all" | CourseCategory;
type Sort = "recent" | "name" | "code";

export function MyCoursesView() {
  const toast = useToast();
  const [tab, setTab] = useState<TabId>("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("recent");
  const [view, setView] = useState<"grid" | "list">("grid");
  const searchRef = useRef<HTMLInputElement>(null);

  const count = (c: CourseCategory) => courses.filter((x) => x.category === c).length;

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = courses.filter(
      (c) =>
        (tab === "all" || c.category === tab) &&
        (!needle || [c.title, c.code, c.prof, c.kind].some((s) => s.toLowerCase().includes(needle))),
    );
    if (sort === "name") return [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "code") return [...list].sort((a, b) => a.code.localeCompare(b.code));
    return list;
  }, [tab, q, sort]);

  return (
    <>
      {/* Toolbar */}
      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-3 border-b border-line/70 pb-4">
        <label className="flex h-10 w-full items-center gap-2.5 rounded-xl bg-surface-2 px-3 text-fg-muted focus-within:ring-2 focus-within:ring-brand/40 md:w-[400px] xl:w-[433px]">
          <Search className="size-4 shrink-0" aria-hidden />
          <input
            ref={searchRef}
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setQ("");
            }}
            aria-label="Search enrolled courses, course codes, or professors"
            placeholder="Search enrolled courses, course codes, or professors…"
            className="min-w-0 flex-1 bg-transparent text-[13.5px] text-fg outline-none placeholder:text-fg-2/80"
          />
          <Keycap>ESC</Keycap>
        </label>

        <Tabs
          idPrefix="mc"
          label="Course categories"
          value={tab}
          onChange={setTab}
          variant="solid"
          items={[
            { id: "all", label: `All Active (${courses.length})` },
            { id: "core", label: `Core Theory (${count("core")})` },
            { id: "elective", label: `Electives (${count("elective")})` },
            { id: "lab", label: `Lab Practicals (${count("lab")})` },
          ]}
        />

        <div className="ml-auto flex items-center gap-4">
          <label className="relative flex h-10 items-center rounded-xl bg-surface-2">
            <span className="sr-only">Sort courses</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-full cursor-pointer appearance-none rounded-xl bg-transparent pl-4 pr-10 text-[14px] font-semibold text-fg outline-none"
            >
              <option value="recent">Sort: Recently Accessed</option>
              <option value="name">Sort: Name A–Z</option>
              <option value="code">Sort: Code</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-2 size-4 text-fg-2" aria-hidden />
          </label>
          <div className="flex items-center gap-1" role="group" aria-label="View mode">
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
              className={cn("rounded-md p-1.5", view === "grid" ? "text-link" : "text-fg-muted hover:text-fg")}
            >
              <LayoutGrid className="size-5" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              aria-label="List view"
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
              className={cn("rounded-md p-1.5", view === "list" ? "text-link" : "text-fg-muted hover:text-fg")}
            >
              <List className="size-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
        <div className="min-w-0">
          <div
            id="mc-panel"
            role="tabpanel"
            aria-label="Courses"
            className={cn("grid gap-6", "grid-cols-1", view === "grid" && "md:grid-cols-2")}
          >
            {visible.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
            {visible.length === 0 && (
              <Card className="col-span-full p-10 text-center text-[14px] text-fg-2">
                No courses match your search. Press <Keycap>ESC</Keycap> to clear it.
              </Card>
            )}
          </div>

          <Card className="mt-6 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand text-white">
                <Minimize2 className="size-5" />
              </span>
              <div>
                <h2 className="text-[22px] font-medium leading-7 tracking-[-0.02em] text-fg">Built-in Moodle Safe File Compressor</h2>
                <p className="mt-1 max-w-[470px] text-[14px] leading-[18px] text-fg-2">
                  Avoid 10MB upload limits without leaving the portal. Fast in-browser client compression ensures assignment journals and scan PDFs meet SPIT upload parameters securely.
                </p>
              </div>
            </div>
            <Button href="/assignments/ise2-dwm-practical/submit" className="h-11 shrink-0 px-5 text-[14px]">
              <FileUp className="size-4" aria-hidden /> Quick Compress &amp; Upload
            </Button>
          </Card>

          <Card className="mt-6 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-[22px] font-medium leading-7 tracking-[-0.02em] text-fg">
                <Archive className="size-5 text-link" aria-hidden /> Archived Academic Semesters
              </h2>
              <span className="text-[12px] font-medium text-fg-2">Total 6 Semesters Completed • 138 Credits</span>
            </div>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {archived.map((a) => (
                <li key={a.id}>
                  <button
                    type="button"
                    onClick={() => toast("Archived semester records are not part of this prototype")}
                    className="flex w-full items-center justify-between gap-2 rounded-xl bg-surface-2 px-4 py-3 text-left hover:bg-surface-3"
                  >
                    <span>
                      <span className="block text-[14px] font-semibold text-fg">{a.title}</span>
                      <span className="mt-0.5 block text-[12px] text-fg-2">{a.sub}</span>
                    </span>
                    {a.icon === "arrow" ? (
                      <ArrowRight className="size-4 shrink-0 text-fg-2" aria-hidden />
                    ) : (
                      <FolderClosed className="size-4 shrink-0 text-fg-muted" aria-hidden />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <MyCoursesSidebar />
      </div>
    </>
  );
}
