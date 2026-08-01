import { chromium } from 'playwright';
const HIDE = `nextjs-portal,#__next-build-watcher,[data-nextjs-toast],[data-next-badge-root],[data-nextjs-dev-tools-button]{display:none!important}`;

const desktop = [
  ['http://localhost:3101/',                              'ap-home',   1440],
  ['http://localhost:3101/services',                      'ap-svc',    1440],
  ['http://localhost:3102/cat-grooming',                  'cgd-home',  1440],
  ['http://localhost:3102/cost',                          'cgd-cost',  1440],
  ['http://localhost:3103/',                              'hml-home',  1440],
  ['http://localhost:3104/',                              'cau-home',  1600],
  ['http://localhost:3105/',                              'mt-home',   1440],
  ['http://localhost:3106/',                              'dbo-home',  1440],
];
const mobile = [
  ['http://localhost:3105/', 'mt-mob'],
  ['http://localhost:3104/', 'cau-mob'],
];

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });

for (const [url, name, w] of desktop) {
  const p = await b.newPage({ viewport: { width: w, height: Math.round(w * 0.625) }, deviceScaleFactor: 1.6 });
  try {
    await p.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
    await p.addStyleTag({ content: HIDE });
    await p.waitForTimeout(2600);
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.waitForTimeout(300);
    await p.screenshot({ path: `shots/${name}.jpg`, type: 'jpeg', quality: 84 });
    console.log('OK', name);
  } catch (e) { console.log('FAIL', name, e.message.slice(0, 100)); }
  await p.close();
}

for (const [url, name] of mobile) {
  const p = await b.newPage({ viewport: { width: 390, height: 780 }, deviceScaleFactor: 2.5, isMobile: true, hasTouch: true });
  try {
    await p.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
    await p.addStyleTag({ content: HIDE });
    await p.waitForTimeout(2600);
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.screenshot({ path: `shots/${name}.jpg`, type: 'jpeg', quality: 86 });
    console.log('OK', name);
  } catch (e) { console.log('FAIL', name, e.message.slice(0, 100)); }
  await p.close();
}
await b.close();
