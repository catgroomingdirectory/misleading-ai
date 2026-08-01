import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
await p.goto('file://' + process.cwd() + '/deck.html', { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
const n = await p.locator('.slide').count();
console.log('slides:', n);
for (let i = 0; i < n; i++) {
  await p.locator('.slide').nth(i).screenshot({ path: `s${String(i+1).padStart(2,'0')}.png` });
}
await p.pdf({ path: 'Courtney_Delaney_Upwork_AI_Portfolio.pdf', width: '1280px', height: '720px', printBackground: true, pageRanges: `1-${n}` });
await b.close();
