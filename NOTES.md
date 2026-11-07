# NOTES: SPIT Moodle – Autonomy 2.0 prototype

## 1. Design tokens (sampled from the 7 Figma exports)

The design is a Material-style palette. Values were sampled pixel-by-pixel from `reference/*.png`
(`scripts/sample.mjs`) and live in `src/app/globals.css` as CSS variables (light on `:root`, dark on `.dark`).
Components only use semantic Tailwind tokens (`bg-surface`, `text-fg`, `text-link`, …), never raw hex.

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--bg` | `#f8fafc` | `#0b1220` | page |
| `--surface` | `#ffffff` | `#111a2e` | cards |
| `--surface-2` | `#eff4ff` | `#17233f` | tinted inner panels, rows, tiles |
| `--surface-3` | `#e5eeff` | `#1e2c4d` | progress track, secondary buttons, neutral chips |
| `--surface-4` | `#dce9ff` | `#263760` | blue chips |
| `--border` | `#e6ecf5` | `#1f2a44` | card hairline |
| `--text` | `#0b1c30` | `#e8eef8` | headings |
| `--text-2` | `#434655` | `#b6c2d9` | body |
| `--text-muted` | `#64748b` | `#8c99b3` | meta |
| `--primary` | `#0051d5` | `#2563eb` | buttons |
| `--brand` | `#316bf3` | `#2563eb` | active nav pill / active tab |
| `--link` | `#0051d5` | `#6ea8ff` | text links (brighter on dark for AA) |
| danger / warning / success | `#dc2626` / `#d97706` / `#059669` text, `#ef4444` / `#f59e0b` / `#10b981` solid | brighter text, translucent soft backgrounds | semantic |

Type: Inter (400–800), tight tracking (`-0.02em` to `-0.04em`) on headings. Radii: cards 20px (course cards 18px),
inner panels 12px, buttons 10px, chips pill. Shadow: `0 1px 2px rgba(15,23,42,.04), 0 10px 30px -10px rgba(15,23,42,.08)`.

Small deliberate contrast tweak: light-mode semantic *text* colours (amber/green/red) are one shade darker than the
bright colours visible in the screenshots, so they meet WCAG AA on their tinted backgrounds. Solid fills/dots keep the
original bright values.

## 2. Decisions

- **Next.js 16 / Tailwind 4 as installed by `create-next-app`.** I removed the scaffold's `cacheComponents` /
  `partialPrefetching` flags (not needed for a fully static prototype) and set `turbopack.root` so a stray lockfile in a
  parent folder doesn't confuse the build. Every route prerenders statically.
- **Frame width.** The exports are ~1283px-wide frames sitting on a white canvas. The app uses a 1280px max container
  with 24px side padding, so a 1283px (and wider) viewport matches the screenshots. `npm run qa` compares at 1283.
- **Dashboard calendar shows the first three week-rows** (28 Oct – 17 Nov), exactly as in the screenshot (the export cuts
  the grid off after the 11–17 row). Clicking the month heading toggles the full month. The chevrons move between months.
  Events (8 today, 9, 12, 15) exist only for November 2024.
- **Assignments “Active Deliverables” cards touch** (no gap between stacked cards in the same column) because the
  Figma export has them glued/overlapping that way. Kept as shown; one-line change if you want a gap
  (`gap-0` → `gap-6` in `assignments-view.tsx`).
- **Attendance bars on My Courses** follow the screenshot (green, green, amber); the brief said the second bar is blue.
- **DWM card on My Courses** has no “Course Hub” button in the screenshot (it has “Submit Exp 7”), so the card *title*
  links to `/courses/dwm-lab`. Other Course Hub buttons show a toast.
- **Assignments filter counts** (All 7 / Submitted 2 / Graded 2) are the static labels from the design; only six items
  are visible in the screens, so “Submitted” shows one item (DA1 draft).
- **Theme.** `next-themes` (class strategy, system default, persisted in `localStorage`, no flash). The toggle sits
  immediately left of the calendar icon. The ThemeToggle icon renders after mount only.
- **Navbar** active state is route-aware (the exports highlight “Dashboard” on every page, a Figma artifact).
  On `/profile` and `/grades` nothing is highlighted.
- **Initials avatars everywhere**; no photos. QR on `/profile` is a decorative SVG (not scannable); “Regenerate”
  after the 08:42 token expires reseeds the pattern.
- **Fake compression.** Files over 20MB (10MB on the `/assignments` ISE2 card) get a ~1.2–1.6s progress bar and a
  reported size of `min(size × 0.375, 12.8MB)`. Nothing is read or uploaded. Extensions other than PDF/IPYNB/PY/ZIP
  show an inline error.
- **Submit page countdown is static** (“Due in 18 hrs 22 mins”) as in the design.
- Sidebar cards on `/profile` use 12px body text to match the export (main-column text is 13px).

## 3. Design inconsistencies for the team to resolve

Reproduced as shown in each screenshot; not silently fixed.

**Dates & time**
- Dashboard calendar is **November 2024** (today = 8th); the submit page says **Thursday, 5 November 2026**. 5 Nov 2024 is a Tuesday, 5 Nov 2026 a Thursday.
- “Today” is the 8th on the dashboard calendar, yet ISE2 closes “Tomorrow, 2:45 PM” (Nov 5, i.e. in the past) and the urgent lab marker is on the 9th.
- “Odd Semester 2024-25” header vs grade rows labelled “25-26 A&B div”, “2025-26 EVEN”, “2023–24”, “24-25 ODD”.
- Programme shows **Sem VII**, “Fourth yr” and batch **2021-2025**, but UID 2022300045 implies a 2022 admission.
- Course page’s “Next Session: Thursday 11:00 AM”, while dashboard quiz window opens Nov 15 (a Friday in 2024).

**Course identity**
- DWM Lab code: `CS402L` (dashboard), `IT402L` (course page), `CPC701` (assignments, my courses), `COMP-402` (submit), `CS-401L` (profile), `CS406` (grades).
- Other codes disagree too: HMI is `HMI-CS306` (my courses), `CS-403` (profile), `CPC705` (assignments); Big Data Analytics is `BDA-PE4` / `CS-402` / `CS405`; `CPC702` is “Design & Analysis of Algorithms” (my courses) but “Operating Systems” (assignments); `CS402` is Software Engineering (grades) while profile CS-402 is Big Data.
- Department: course page says “Dept of Information Technology”; everywhere else Computer Engineering.
- Lab batch **B2** (dashboard, assignments, profile) vs **B3** (submit). Course page says “Div A & Div B (All Batches)”.
- Grades title “Fourth yr -DWM LAB-Assign (Data Warehouse & Mining)”; other places “Fourth yr – DWM LAB”.

**People**
- DWM evaluator / professor: Dr. Anand Godbole (dashboard evaluator), Prof. Rohini Chaudhari (course page, my courses), Prof. Surekha Dholay (assignments, my courses co-professor, also “Faculty Mentor” on grades), Prof. Dr. Aarti M. Karande (submit evaluator; profile mentor), Prof. Preetida Jani (grades), Prof. Vaishali (dashboard DA1), “Prof. A. Godbole” (dashboard EXP 8).
- Advisor/mentor: Dr. Dhananjay Kalbande (profile advisor, HOD on my courses) vs Dr. Surekha Dholay (grades “Faculty Mentor” / “Class Teacher & Mentor”).

**Numbers**
- CGPA **8.92** (my courses), **9.42** (profile), **9.08** (grades). “Sem VI: 9.15” (my courses) vs “+0.42 over Sem VI” on a 9.22 SGPA (implies 8.80, which is the Sem V GPA in the archive list).
- Active courses: **5** (dashboard), **6** (my courses, profile), **8** (grades); “View All 12 Assignments” (dashboard) vs “7 Total” (assignments).
- Credits: 148 earned (profile) vs 138 for six completed semesters (my courses) vs 18/22 this term (grades).
- Overall attendance 88.5% but the three listed subjects average 84.8%.
- ISE2 DWM PRACTICAL max marks: **10** (dashboard), **25** (assignments, submit), **30** (course page).
- DA1 ISE is titled “Association Rule Mining” (dashboard), “K-Means Clustering” (assignments) and “Multi-Dimensional OLAP Modeling” (course page), with due times of Nov 12 11:59 PM vs Nov 12 2:00 PM. EXP 8 is “K-Means Clustering on Census” (dashboard) vs “Association Rule Mining using Apriori” (course page).

**Layout artifacts in the exports**
- Right-edge clipping of the “Overdue” tile (dashboard) and the My Courses stat cards: **fixed** (allowed deviation).
- Glued assignment cards, a calendar cut off after three rows, ghost text under quick-access card titles: reproduced or dropped as noted above.
