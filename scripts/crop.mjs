// node scripts/crop.mjs <reference-file> x y w h [scale] -> qa/crop.png
import { chromium } from "playwright";
import fs from "node:fs";
const [, , file, x, y, w, h, s = "1"] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: Math.round(w * s), height: Math.round(h * s) } });
const data = fs.readFileSync(file).toString("base64");
await p.setContent(`<body style="margin:0"><div style="width:${w * s}px;height:${h * s}px;overflow:hidden;position:relative"><img src="data:image/png;base64,${data}" style="position:absolute;left:${-x * s}px;top:${-y * s}px;width:auto;transform-origin:0 0;zoom:${s}"></div></body>`);
await p.waitForTimeout(150);
await p.screenshot({ path: "qa/crop.png" });
await b.close();
