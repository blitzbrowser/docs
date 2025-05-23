import puppeteer from 'puppeteer';

const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://cdp.blitzbrowser.com?accessKey=${process.env.BLITZBROWSER_ACCESS_KEY}`
});

const context = await browser.createBrowserContext();
const page = await context.newPage();

// ...

await browser.close();