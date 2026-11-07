// Visual QA helper (dev only; not deployed).
//   node scripts/qa.mjs shots [baseUrl]            -> full-page screenshots of all routes (light+dark, several widths) in ./qa
//   node scripts/qa.mjs cmp <route-key> y0 y1 [rx] -> side-by-side crop: reference (left) vs. current build (right)
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const routes = {
  dashboard: { path: "/", ref: "01-dashboard.png" },
  course: { path: "/courses/dwm-lab", ref: "02-course-dwm-lab.png" },
  assignments: { path: "/assignments", ref: "03-assignments.png" },
  submit: { path: "/assignments/ise2-dwm-practical/submit", ref: "04-submit-work.png" },
  courses: { path: "/courses", ref: "05-my-courses.png" },
  profile: { path: "/profile", ref: "06-profile.png" },
  grades: { path: "/grades", ref: "07-grades.png" },
  announcements: { path: "/announcements", ref: null },
};

const [, , cmd = "shots", ...rest] = process.argv;
const base = process.env.QA_BASE || "http://localhost:3000";
fs.mkdirSync("qa", { recursive: true });

async function shoot(page, url, file, theme, width) {
  await page.setViewportSize({ width, height: 900 });
  await page.emulateMedia({ colorScheme: theme });
  await page.goto(base + url, { waitUntil: "networkidle" });
  await page.waitForTimeout(250);
  await page.screenshot({ path: file, fullPage: true });
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 1 });
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error" || m.type() === "warning") errors.push(`[${m.type()}] ${m.text()}`);
});
page.on("pageerror", (e) => errors.push(`[pageerror] ${e.message}`));

if (cmd === "shots") {
  const only = rest[0] && routes[rest[0]] ? [rest[0]] : Object.keys(routes);
  const widths = (process.env.QA_WIDTHS || "1283,1470").split(",").map(Number);
  const themes = (process.env.QA_THEMES || "light,dark").split(",");
  for (const key of only) {
    for (const theme of themes) {
      for (const w of widths) {
        const file = path.join("qa", `${key}-${theme}-${w}.png`);
        await shoot(page, routes[key].path, file, theme, w);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
        console.log(`${file}${overflow ? "  <-- HORIZONTAL OVERFLOW" : ""}`);
      }
    }
  }
} else if (cmd === "cmp") {
  const [key, y0s = "0", y1s = "900", rxs = "178"] = rest;
  const r = routes[key];
  const y0 = Number(y0s);
  const y1 = Number(y1s);
  const rx = Number(rxs);
  const file = path.join("qa", `__mine-${key}.png`);
  await shoot(page, r.path, file, "light", 1283);
  const refB64 = fs.readFileSync(path.join("reference", r.ref)).toString("base64");
  const mineB64 = fs.readFileSync(file).toString("base64");
  const h = y1 - y0;
  const html = `<body style="margin:0;background:#888;display:flex;gap:6px">
    <div style="width:1283px;height:${h}px;overflow:hidden;position:relative"><img src="data:image/png;base64,${refB64}" style="position:absolute;left:-${rx}px;top:-${y0}px"></div>
    <div style="width:1283px;height:${h}px;overflow:hidden;position:relative"><img src="data:image/png;base64,${mineB64}" style="position:absolute;left:0;top:-${y0}px"></div></body>`;
  const p2 = await ctx.newPage();
  await p2.setViewportSize({ width: 2572, height: h });
  await p2.setContent(html);
  await p2.waitForTimeout(200);
  const out = path.join("qa", `cmp-${key}-${y0}-${y1}.png`);
  await p2.screenshot({ path: out });
  console.log(out);
}

if (errors.length) {
  console.log("\nConsole problems:");
  for (const e of [...new Set(errors)]) console.log(" ", e);
}
await browser.close();
