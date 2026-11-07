"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, CalendarDays, GraduationCap, LineChart, LogOut, Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, user } from "@/lib/data/user";
import { Avatar } from "@/components/ui/avatar";
import { Keycap } from "@/components/ui/search-input";
import { useToast } from "@/components/ui/toast";
import { ThemeToggle } from "./theme-toggle";

function Logo() {
  return (
    <Link href="/" className="block shrink-0 leading-none" aria-label="SPIT Moodle Autonomy 2.0 – Dashboard">
      <span className="block text-[20px] font-bold tracking-[-0.04em] text-fg">SPIT Moodle</span>
      <span className="mt-[3px] block text-[11px] font-bold uppercase tracking-[0.08em] text-link">Autonomy 2.0</span>
    </Link>
  );
}

function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const toast = useToast();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const item =
    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-fg-2 hover:bg-surface-2 hover:text-fg";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 rounded-xl py-1 pl-2 hover:bg-surface-2"
      >
        <span className="hidden text-right leading-tight xl:block">
          <span className="block whitespace-nowrap text-[13px] font-semibold text-fg">{user.name}</span>
          <span className="block whitespace-nowrap text-[11px] font-semibold tracking-wide text-fg-2">
            UID: {user.uid}
          </span>
        </span>
        <Avatar initials={user.initials} size={32} palette={2} />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-line bg-surface p-1.5 shadow-pop"
        >
          <Link role="menuitem" href="/profile" className={item} onClick={() => setOpen(false)}>
            <GraduationCap className="size-4" aria-hidden /> Academic Profile
          </Link>
          <Link role="menuitem" href="/grades" className={item} onClick={() => setOpen(false)}>
            <LineChart className="size-4" aria-hidden /> Grades &amp; Analytics
          </Link>
          <button
            role="menuitem"
            type="button"
            className={cn(item, "text-danger hover:text-danger")}
            onClick={() => {
              setOpen(false);
              toast("Signed out (simulated). This prototype has no authentication.");
            }}
          >
            <LogOut className="size-4" aria-hidden /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();
  const searchRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const desktop = searchRef.current;
        if (desktop && desktop.offsetParent !== null) {
          desktop.focus();
          desktop.select();
        } else {
          setDrawer(true);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false);
    document.addEventListener("keydown", onKey);
    mobileSearchRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [drawer]);

  const iconBtn =
    "relative flex size-10 shrink-0 items-center justify-center rounded-xl text-fg-2 transition-colors hover:bg-surface-3 hover:text-fg";

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-page/85 backdrop-blur-md">
      <div className="mx-auto flex h-[70px] w-full max-w-[1280px] items-center gap-3 px-3 xl:gap-3">
        <Logo />

        {/* Search */}
        <label className="ml-1 hidden h-[35px] w-44 shrink-0 items-center gap-2.5 rounded-xl bg-surface-2 px-3 text-fg-muted focus-within:ring-2 focus-within:ring-brand/40 lg:flex xl:w-[272px]">
          <Search className="size-4 shrink-0" aria-hidden />
          <input
            ref={searchRef}
            type="search"
            aria-label="Search courses, practicals, notes"
            placeholder="Search courses, practicals, notes…"
            className="min-w-0 flex-1 bg-transparent text-[13px] text-fg outline-none placeholder:text-fg-muted [&::-webkit-search-cancel-button]:hidden"
          />
          <span className="hidden xl:inline-flex">
            <Keycap>⌘K</Keycap>
          </span>
        </label>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {navLinks.map((l) => {
            const active = l.match(pathname);
            const single = l.lines.length === 1;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex shrink-0 items-center rounded-[10px] transition-colors",
                  single ? "h-10 px-3 text-[16px] font-medium xl:px-3.5" : "px-2 py-1.5 text-[13px] font-medium leading-[17px] xl:px-2.5",
                  active
                    ? "bg-brand text-white shadow-[0_6px_16px_-6px_rgba(49,107,243,0.7)]"
                    : "text-fg-2 hover:text-fg",
                )}
              >
                <span className="block">
                  {l.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1 xl:gap-1.5">
          <button
            type="button"
            onClick={() => toast("WhatsApp Sync is active (simulated)")}
            className="mr-1 hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-success-soft px-3 py-1.5 text-[11px] font-semibold text-success hover:brightness-95 xl:inline-flex"
          >
            <span aria-hidden className="size-1.5 rounded-full bg-success-solid" /> WhatsApp Sync
          </button>

          <button type="button" aria-label="Search" className={cn(iconBtn, "lg:hidden")} onClick={() => setDrawer(true)}>
            <Search className="size-5" strokeWidth={1.75} aria-hidden />
          </button>

          <ThemeToggle />

          <button
            type="button"
            aria-label="Calendar"
            className={cn(iconBtn, "hidden sm:flex")}
            onClick={() => toast("Calendar sync is not part of this prototype")}
          >
            <CalendarDays className="size-5" strokeWidth={1.75} aria-hidden />
          </button>

          <button
            type="button"
            aria-label="Notifications, 4 unread"
            className={iconBtn}
            onClick={() => router.push("/announcements")}
          >
            <Bell className="size-5" strokeWidth={1.75} aria-hidden />
            <span
              aria-hidden
              className="absolute right-[7px] top-[5px] flex size-4 items-center justify-center rounded-full bg-danger-solid text-[10px] font-bold leading-none text-white"
            >
              4
            </span>
          </button>

          <div className="ml-1 hidden sm:block">
            <UserMenu />
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={drawer}
            className={cn(iconBtn, "lg:hidden")}
            onClick={() => setDrawer(true)}
          >
            <Menu className="size-5" strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-black/40" onClick={() => setDrawer(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[min(86vw,340px)] flex-col gap-5 overflow-y-auto bg-surface p-5 shadow-pop">
            <div className="flex items-center justify-between">
              <Logo />
              <button type="button" aria-label="Close menu" className={iconBtn} onClick={() => setDrawer(false)}>
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <label className="flex h-10 items-center gap-2.5 rounded-xl bg-surface-2 px-3 text-fg-muted">
              <Search className="size-4" aria-hidden />
              <input
                ref={mobileSearchRef}
                type="search"
                aria-label="Search courses, practicals, notes"
                placeholder="Search courses, practicals, notes…"
                className="min-w-0 flex-1 bg-transparent text-[13px] text-fg outline-none placeholder:text-fg-muted"
              />
            </label>
            <nav aria-label="Mobile primary" className="flex flex-col gap-1">
              {navLinks.map((l) => {
                const active = l.match(pathname);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setDrawer(false)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-[15px] font-medium",
                      active ? "bg-brand text-white" : "text-fg-2 hover:bg-surface-2",
                    )}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto flex flex-col gap-1 border-t border-line pt-4">
              <div className="mb-2 flex items-center gap-3 px-2">
                <Avatar initials={user.initials} size={36} palette={2} />
                <div className="leading-tight">
                  <div className="text-[14px] font-semibold text-fg">{user.name}</div>
                  <div className="text-[12px] text-fg-muted">UID: {user.uid}</div>
                </div>
              </div>
              <Link href="/profile" onClick={() => setDrawer(false)} className="rounded-xl px-4 py-2.5 text-[14px] font-medium text-fg-2 hover:bg-surface-2">
                Academic Profile
              </Link>
              <Link href="/grades" onClick={() => setDrawer(false)} className="rounded-xl px-4 py-2.5 text-[14px] font-medium text-fg-2 hover:bg-surface-2">
                Grades &amp; Analytics
              </Link>
              <button
                type="button"
                className="rounded-xl px-4 py-2.5 text-left text-[14px] font-medium text-danger hover:bg-surface-2"
                onClick={() => {
                  setDrawer(false);
                  toast("Signed out (simulated). This prototype has no authentication.");
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
