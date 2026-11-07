import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1283, height: 900 } });
const msgs = [];
p.on("console", (m) => ["error", "warning"].includes(m.type()) && msgs.push(`[${m.type()}] ${m.text().slice(0, 300)}`));
p.on("pageerror", (e) => msgs.push("[pageerror] " + e.message));
const base = process.env.QA_BASE || "http://localhost:3000";
for (const r of ["/", "/courses", "/courses/dwm-lab", "/assignments", "/assignments/ise2-dwm-practical/submit", "/profile", "/grades", "/announcements", "/nope"]) {
  await p.goto(base + r, { waitUntil: "networkidle" });
  await p.waitForTimeout(400);
}
console.log(msgs.length ? [...new Set(msgs)].join("\n") : "no console errors/warnings");
await b.close();
