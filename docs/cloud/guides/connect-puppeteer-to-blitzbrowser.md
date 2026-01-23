# Connect Puppeteer To BlitzBrowser

To connect Puppeteer to BlitzBrowser, you have to change the method `puppeteer.launch()` to `puppeteer.connect({ ... })`.

## How to connect

To connect your code, you have to replace `puppeteer.launch()` with `puppeteer.connect({ ... })`. We suggest to pass the `ACCESS_KEY` as an environment variable to avoid hardcoding your access key directly in the code. The `connect({ ... })` method establishes a CDP connection between Puppeteer to a remote browser. Puppeteer will get full control of one of our browsers via the Chrome DevTools Protocol (CDP). Once you disconnect from the browser, the remote browser is killed.

```typescript
import puppeteer from 'puppeteer';

// const browser = await puppeteer.launch();
const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://cdp.blitzbrowser.com?accessKey=${process.env.ACCESS_KEY}`
});

const context = await browser.createBrowserContext();
const page = await context.newPage();

// ...

await browser.close();
```

## CDP Properties

You can find all the properties available to configure your Chrome DevTools Protocol URL when connecting to our browsers [here](/cloud/chrome-devtools-protocol).
