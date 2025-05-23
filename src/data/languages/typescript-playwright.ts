import { chromium } from 'playwright';

const browser = await chromium.connectOverCDP(
    `wss://cdp.blitzbrowser.com?accessKey=${process.env.BLITZBROWSER_ACCESS_KEY}`
);

const context = await browser.newContext();
const page = await context.newPage();

// ...

await browser.close();