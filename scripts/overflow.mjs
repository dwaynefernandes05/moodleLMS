import { chromium } from "playwright";
const [, , rp = "home", w = "1283"] = process.argv; const path = rp === "home" ? "/" : "/" + rp;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: Number(w), height: 900 } });
await p.goto((process.env.QA_BASE || "http://localhost:3000") + path, { waitUntil: "networkidle" });
const r = await p.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const out = [];
  document.querySelectorAll("body *").forEach((el) => {
    const b = el.getBoundingClientRect();
    if (b.right > vw + 1 && b.width > 0) out.push(`${el.tagName.toLowerCase()}.${(el.className?.toString() || "").slice(0, 60)} right=${Math.round(b.right)} w=${Math.round(b.width)}`);
  });
  return { vw, sw: document.documentElement.scrollWidth, out: out.slice(0, 12) };
});
console.log(JSON.stringify(r, null, 1));
await b.close();
