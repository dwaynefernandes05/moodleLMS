import { chromium } from 'playwright';
import fs from 'fs';
const [,, file, ...pts] = process.argv;
const b = await chromium.launch();
const p = await b.newPage();
const data = fs.readFileSync(file).toString('base64');
await p.setContent(`<canvas id=c></canvas>`);
const res = await p.evaluate(async ({data, pts}) => {
  const img = new Image(); img.src = 'data:image/png;base64,'+data; await img.decode();
  const c = document.getElementById('c'); c.width = img.width; c.height = img.height;
  const ctx = c.getContext('2d'); ctx.drawImage(img,0,0);
  return {w: img.width, h: img.height, px: pts.map(s=>{const [x,y]=s.split(',').map(Number); const d=ctx.getImageData(x,y,1,1).data; return s+' => #'+[d[0],d[1],d[2]].map(v=>v.toString(16).padStart(2,'0')).join('');})};
}, {data, pts});
console.log(JSON.stringify(res,null,1));
await b.close();
