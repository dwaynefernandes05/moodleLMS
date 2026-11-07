"use client";

import { useEffect, useState } from "react";
import {
  Award,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Download,
  GraduationCap,
  Landmark,
  LibraryBig,
  LogOut,
  MapPin,
  Monitor,
  Pencil,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Star,
  Medal,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { cn, pad2 } from "@/lib/utils";
import { credentials, modules } from "@/lib/data/profile";
import { QrGraphic } from "./qr";

const monoTone = {
  blue: "bg-surface-3 text-link",
  amber: "bg-warning-soft text-warning-solid",
  green: "bg-success-soft text-success",
  slate: "bg-surface-4 text-fg",
} as const;

const pillTone = {
  green: "bg-success-soft text-success",
  amber: "bg-warning-soft text-warning",
  neutral: "bg-surface-3 text-fg-2",
} as const;

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-fg-2">{children}</p>;
}

function ProfileCard() {
  const toast = useToast();
  return (
    <Card className="relative overflow-hidden px-8 py-7">
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-24 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(49,107,243,0.10),transparent)]" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="relative size-[112px] shrink-0">
            <span aria-hidden className="flex size-full items-center justify-center rounded-[28px] bg-surface-4 text-[40px] font-bold tracking-[-0.02em] text-link">
              SS
            </span>
            <span
              role="img"
              aria-label="Verified student"
              className="absolute -bottom-1 -right-1 flex size-[22px] items-center justify-center rounded-full bg-primary text-white ring-[3px] ring-surface"
            >
              <Check className="size-3" strokeWidth={3.5} />
            </span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-[30px] font-bold leading-10 tracking-[-0.035em] text-fg">Shreyash Singh</h1>
              <span className="rounded-full bg-surface-4 px-2.5 py-[3px] text-[11px] font-semibold text-link">Div A · Roll 24</span>
              <span className="rounded-full bg-surface-3 px-2.5 py-[3px] text-[11px] font-semibold text-fg-2">UID: 2022300045</span>
            </div>
            <p className="mt-1 text-[15px] text-fg-2">
              Bachelor of Technology · Computer Engineering · <span className="font-semibold text-fg">Semester VII</span>
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] text-fg-2">
              <span className="inline-flex items-center gap-1.5 font-semibold text-fg">
                <Building2 className="size-3.5 text-link" aria-hidden /> Sardar Patel Institute of Technology (SPIT)
              </span>
              <span aria-hidden className="size-0.5 rounded-full bg-fg-muted" />
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap className="size-3.5 text-success-solid" aria-hidden /> CGPA: <strong className="font-bold text-fg">9.42 / 10.00</strong>
              </span>
              <span aria-hidden className="size-0.5 rounded-full bg-fg-muted" />
              <span className="inline-flex items-center gap-1.5 font-semibold text-fg">
                <MapPin className="size-3.5 text-link" aria-hidden /> Advisor: Dr. Dhananjay Kalbande
              </span>
            </p>
          </div>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-3 md:w-[160px]">
          <Button className="h-10 w-full" onClick={() => toast("Digital ID card is not part of this prototype")}>
            <CreditCard className="size-4" aria-hidden /> Digital ID Card
          </Button>
          <Button variant="tinted" className="h-10 w-full text-fg" onClick={() => toast("Download started (simulated): Transcript (PDF)")}>
            <Download className="size-4" aria-hidden /> Transcript (PDF)
          </Button>
          <Button variant="outline" className="h-10 w-full border-transparent shadow-sm" onClick={() => toast("Profile editing is not part of this prototype")}>
            <Pencil className="size-4" aria-hidden /> Edit Profile
          </Button>
        </div>
      </div>
    </Card>
  );
}

function Standing() {
  return (
    <Card className="px-6 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2.5 text-[20px] font-medium leading-7 tracking-[-0.02em] text-fg">
          <Landmark className="size-5 text-link" aria-hidden /> Institutional Standing
        </h2>
        <span className="text-[13px] text-fg-2">Batch 2021-2025 · Autonomous 2.0</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          ["Department", "Computer Engineering", "NBA Tier-1 Accredited", ""],
          ["Division & Lab Batch", "Div A · Batch B2", "Lab Room: CC3 / Room 502", ""],
          ["Academic Standing", "Dean's Honor List", "148 Credits Earned", "text-success"],
        ].map(([l, v, s, c]) => (
          <div key={l} className="rounded-xl bg-surface-2 px-4 py-3.5">
            <Label>{l}</Label>
            <p className={cn("mt-1.5 text-[16px] font-semibold leading-6 text-fg", c)}>{v}</p>
            <p className="mt-1 text-[12px] text-fg-2">{s}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Modules() {
  const toast = useToast();
  return (
    <Card className="px-6 py-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="flex items-center gap-2.5 text-[20px] font-medium leading-7 tracking-[-0.02em] text-fg">
            <LibraryBig className="size-5 text-link" aria-hidden /> Semester VII Enrolled Modules
          </h2>
          <p className="mt-0.5 text-[13px] text-fg-2">Direct access to courseware, mentors, and lab attendance trackers</p>
        </div>
        <span className="rounded-md bg-surface-3 px-3 py-1.5 text-[12px] font-semibold text-fg-2">6 Active Courses</span>
      </div>
      <ul className="mt-4 flex flex-col gap-2">
        {modules.map((m) => (
          <li key={m.id}>
            <button
              type="button"
              onClick={() => toast("Module details are not part of this prototype")}
              className="flex w-full items-center gap-3 rounded-xl bg-surface-2 px-3 py-2.5 text-left hover:bg-surface-3"
            >
              <span aria-hidden className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl text-[18px] font-bold", monoTone[m.tone])}>
                {m.mono}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-[15px] font-semibold leading-5 text-fg">{m.title}</span>
                  <span className="rounded-md bg-surface-3 px-2 py-[1px] text-[11px] font-medium text-fg-2">{m.credits}</span>
                </span>
                <span className="mt-0.5 block text-[13px] text-fg-2">{m.sub}</span>
              </span>
              <span className={cn("hidden shrink-0 rounded-md px-3 py-1 text-[11px] font-semibold sm:inline-block", pillTone[m.statusTone])}>{m.status}</span>
              <ChevronRight className="size-4 shrink-0 text-fg-2" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-[13px]">
        <span className="text-fg-2">Showing 4 of 12 all-time enrolled Moodle courses</span>
        <button type="button" onClick={() => toast("Archived semesters are not part of this prototype")} className="inline-flex items-center gap-1 font-semibold text-link hover:underline">
          View Archived Semesters <span aria-hidden>→</span>
        </button>
      </div>
    </Card>
  );
}

function Credentials() {
  return (
    <Card className="px-6 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2.5 text-[20px] font-medium leading-7 tracking-[-0.02em] text-fg">
          <Medal className="size-5 text-link" aria-hidden /> Verified Credentials &amp; Badges
        </h2>
        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-success">
          <CheckCircle2 className="size-3.5" aria-hidden /> SPIT Digital Registry Validated
        </span>
      </div>
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {credentials.map((c) => (
          <li key={c.id} className="rounded-xl bg-surface-2 px-4 py-4">
            <div className="flex items-start justify-between">
              {c.icon === "award" && <Award className="size-7 text-link" strokeWidth={1.75} aria-hidden />}
              {c.icon === "check" && <BadgeCheck className="size-7 text-success-solid" strokeWidth={1.75} aria-hidden />}
              {c.icon === "star" && (
                <span aria-hidden className="flex size-7 items-center justify-center rounded-full bg-warning-solid text-white">
                  <Star className="size-4 fill-current" />
                </span>
              )}
              <span className="text-[11px] font-bold text-fg-2">{c.tag}</span>
            </div>
            <h3 className="mt-3 text-[17px] font-medium leading-6 tracking-[-0.02em] text-fg">{c.title}</h3>
            <p className="mt-1.5 text-[13px] leading-5 text-fg-2">{c.text}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Contact() {
  const toast = useToast();
  return (
    <Card className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[19px] font-medium leading-7 tracking-[-0.02em] text-fg">Institutional Contact</h2>
        <button type="button" onClick={() => toast("Contact editing is not part of this prototype")} className="text-[12px] font-semibold text-link hover:underline">
          Edit
        </button>
      </div>
      <dl className="mt-4 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <dt><Label>Official College Email</Label></dt>
            <dd className="mt-1 text-[12px] font-medium text-fg">shreyash.singh23@spit.ac.in</dd>
          </div>
          <span role="img" aria-label="Verified" className="mt-3 flex size-4 items-center justify-center rounded-full bg-success-solid text-white">
            <Check className="size-2.5" strokeWidth={4} />
          </span>
        </div>
        <div>
          <dt><Label>Personal Email</Label></dt>
          <dd className="mt-1 text-[12px] font-medium text-fg">shreyash.singh***@gmail.com</dd>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <dt><Label>Registered Mobile &amp; WhatsApp</Label></dt>
            <dd className="mt-1 text-[13px] font-medium text-fg">+91 98765 43210</dd>
          </div>
          <span className="rounded-md bg-success-soft px-2 py-1 text-[11px] font-semibold text-success">Sync On</span>
        </div>
        <div>
          <dt><Label>Location &amp; Academic Zone</Label></dt>
          <dd className="mt-1 text-[13px] font-medium text-fg">Mumbai, Maharashtra · Asia/Kolkata (GMT+5:30)</dd>
        </div>
      </dl>
    </Card>
  );
}

const TOKEN_SECONDS = 8 * 60 + 42;

function MobilePair() {
  const toast = useToast();
  const [left, setLeft] = useState(TOKEN_SECONDS);
  const [seed, setSeed] = useState(7);

  useEffect(() => {
    if (left <= 0) return;
    const id = window.setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [left]);

  const expired = left <= 0;
  return (
    <Card className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2.5 text-[19px] font-medium leading-7 tracking-[-0.02em] text-fg">
          <Smartphone className="size-[18px] text-link" aria-hidden /> SPIT Mobile Pair
        </h2>
        <span className="rounded-md bg-surface-3 px-2 py-1 text-[10px] font-bold tracking-wide text-link">SSO READY</span>
      </div>
      <p className="mt-3 text-[12px] leading-5 text-fg-2">Scan with the SPIT Moodle App to securely authenticate on iOS or Android without password prompts.</p>
      <div className="mt-4 rounded-2xl bg-surface-2 px-4 pb-3 pt-4">
        <div className={cn("mx-auto flex w-[225px] max-w-full items-center justify-center rounded-2xl bg-white py-4 shadow-sm", expired && "opacity-40")}>
          <QrGraphic seed={seed} size={170} />
        </div>
        <div className="mt-2.5 text-center text-[12px] font-semibold text-warning">
          {expired ? (
            <button
              type="button"
              onClick={() => {
                setLeft(TOKEN_SECONDS);
                setSeed((s) => s + 1);
                toast("New single-use token generated (simulated)");
              }}
              className="inline-flex items-center gap-1.5 hover:underline"
            >
              <RefreshCw className="size-3" aria-hidden /> Expired — Regenerate
            </button>
          ) : (
            <span role="timer" aria-label={`Token expires in ${pad2(Math.floor(left / 60))} minutes ${pad2(left % 60)} seconds`}>
              <RefreshCw className="mr-1.5 inline size-3" aria-hidden />
              Single-use Token · Expires in {pad2(Math.floor(left / 60))}:{pad2(left % 60)}
            </span>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-[12px]">
        <span className="text-fg-2">Paired Hardware: iPhone 14 Pro</span>
        <button type="button" onClick={() => toast("App access revoked (simulated)")} className="font-semibold text-danger hover:underline">
          Revoke App
        </button>
      </div>
    </Card>
  );
}

function Audit() {
  const toast = useToast();
  return (
    <Card className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2.5 text-[19px] font-medium leading-7 tracking-[-0.02em] text-fg">
          <ShieldCheck className="size-5 text-link" aria-hidden /> Audit &amp; Login Security
        </h2>
        <span role="img" aria-label="Secure" className="mr-1 size-2 rounded-full bg-success-solid" />
      </div>
      <div className="mt-4 rounded-xl bg-surface-2 px-3 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.07em] text-link">Current Session</span>
          <span className="rounded-md bg-success-soft px-2 py-0.5 text-[10px] font-bold text-success">ACTIVE NOW</span>
        </div>
        <p className="mt-2 flex items-center gap-2 text-[13px] font-semibold text-fg">
          <Monitor className="size-4 text-fg-2" aria-hidden /> Chrome 130 · macOS Sonoma
        </p>
        <p className="mt-1.5 text-[11px] text-fg-2">IP: 115.114.88.14 (SPIT Campus Wi-Fi 6) · Mumbai</p>
      </div>
      <div className="mt-3 rounded-xl bg-surface-2 px-3 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.07em] text-fg-2">Previous Access</span>
          <span className="text-[12px] text-fg-2">Nov 6, 2024 · 3:58 PM</span>
        </div>
        <p className="mt-2 flex items-center gap-2 text-[13px] font-semibold text-fg">
          <Smartphone className="size-4 text-fg-2" aria-hidden /> SPIT Moodle Mobile Client 4.2
        </p>
      </div>
      <dl className="mt-5 flex flex-col gap-3 text-[12px]">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-fg-2">Account Provisioned:</dt>
          <dd className="font-medium text-fg">14 Sep 2021 (Autonomous Batch)</dd>
        </div>
        <div className="flex items-start justify-between gap-3">
          <dt className="max-w-[90px] text-fg-2">2-Factor Authentication:</dt>
          <dd className="flex max-w-[190px] items-start gap-1.5 font-medium text-success">
            <ShieldCheck className="mt-0.5 size-3 shrink-0" aria-hidden /> Active via Google Workspace SSO
          </dd>
        </div>
      </dl>
      <Button variant="tinted" className="mt-4 h-10 w-full text-fg" onClick={() => toast("Signed out of all other devices (simulated)")}>
        <LogOut className="size-4" aria-hidden /> Sign Out All Other Devices
      </Button>
    </Card>
  );
}

export function ProfileView() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Breadcrumb separator="slash" homeIcon items={[{ label: "Home", href: "/" }, { label: "Students" }, { label: "Academic Profile & Devices" }]} />
        <div className="flex items-center gap-2 text-[12px] font-medium">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1 text-success">
            <span aria-hidden className="size-1.5 rounded-full bg-success-solid" /> Autonomous Standing: Regular (No Backlogs)
          </span>
          <span className="rounded-full bg-surface-3 px-3 py-1 text-fg-2">Academic Year 2024-25</span>
        </div>
      </div>

      <div className="mt-8">
        <ProfileCard />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_394px]">
        <div className="flex min-w-0 flex-col gap-6">
          <Standing />
          <Modules />
          <Credentials />
        </div>
        <div className="flex min-w-0 flex-col gap-6">
          <Contact />
          <MobilePair />
          <Audit />
        </div>
      </div>
    </>
  );
}
