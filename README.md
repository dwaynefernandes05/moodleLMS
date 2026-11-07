# SPIT Moodle – Autonomy 2.0 (UI/UX prototype)

A frontend-only Next.js prototype of the SPIT Moodle “Autonomy 2.0” redesign (Figma export → code), with one added
feature: **Light / Dark mode**. There is no backend: no API routes, no database, no auth, no environment variables.
All data is typed mock data in `src/lib/data`; uploads, submissions, syncs and alerts are simulated client-side.

## Screens

| Route | Screen |
|---|---|
| `/` | Dashboard |
| `/courses` | My Courses & Enrolments |
| `/courses/dwm-lab` | Course page: Fourth yr – DWM LAB |
| `/assignments` | Assignment & Deadline Central |
| `/assignments/ise2-dwm-practical/submit` | Submit Work (dropzone, fake compression, gated submit) |
| `/profile` | Academic Profile & Devices |
| `/grades` | Grades & Performance Analytics |
| `/announcements` | Minimal placeholder (department notices) |

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production check: `npm run lint && npm run typecheck && npm run build && npm run start`. Node 20+.

## Tech stack

Next.js (App Router, TypeScript strict) · Tailwind CSS 4 · `next-themes` · `lucide-react` · Inter via `next/font` ·
hand-built SVG charts. No UI kit.

## Project structure

```
src/app/                 routes (page.tsx per screen), layout.tsx, globals.css (design tokens), icon.svg, not-found.tsx
src/components/layout/   Navbar, Footer, PageShell, ThemeToggle, Providers
src/components/ui/       Card, Chip, Button, Tabs, ProgressBar/Ring, Avatar, Checkbox, Breadcrumb, Toast, …
src/components/features/ dashboard/ courses/ assignments/ submit/ profile/ grades/
src/hooks/               use-fake-compression
src/lib/data/            typed mock data
reference/               the 7 Figma screenshots (dev only; excluded from deploy via .vercelignore)
scripts/                 Playwright QA helpers (screenshots, side-by-side compare, flow tests)
NOTES.md                 design tokens, decisions, and the list of inconsistencies between the Figma screens
```

## How the theme works

`next-themes` toggles a `dark` class on `<html>` (`attribute="class"`, `defaultTheme="system"`, `enableSystem`), saves
the choice in `localStorage` and injects a tiny pre-paint script, so there is no flash of the wrong theme.
Colours are CSS variables defined once for `:root` and `.dark` in `src/app/globals.css` and exposed as Tailwind tokens
(`bg-surface`, `text-fg`, `text-link`, …); components never hard-code theme colours. The toggle sits to the left of the
calendar icon in the navbar.

## Visual QA (optional, dev only)

With a server running (`npm run dev` or `npm run start`):

```bash
QA_BASE=http://localhost:3000 node scripts/qa.mjs shots            # screenshots into ./qa (git-ignored)
QA_BASE=http://localhost:3000 node scripts/qa.mjs cmp dashboard 0 700   # reference vs build, side by side
QA_BASE=http://localhost:3000 node scripts/flows.mjs               # interaction checks
```

(Needs `npx playwright install chromium` once.)

## Deploy to Vercel

**a) From GitHub (recommended)**

1. Push this folder to a GitHub repository.
2. Go to <https://vercel.com/new> and import the repository.
3. Framework is auto-detected as **Next.js**; keep the default build and output settings. No environment variables are needed.
4. Click **Deploy**.

**b) With the CLI**

```bash
npm i -g vercel
vercel          # first run: log in and link the project (preview deployment)
vercel --prod   # production deployment
```

`vercel.json` sets the framework and basic security headers; `.vercelignore` keeps `reference/`, `qa/` and `scripts/`
out of the upload.
