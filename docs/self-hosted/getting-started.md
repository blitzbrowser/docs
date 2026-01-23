# Getting Started

Running BlitzBrowser yourself is easy. You just need to pull the latest docker image and your CDP endpoint will be ready to run your browsers in seconds.

## Quick Start

IF you want to run browsers and don't need user data storage. We recommand running the following docker container. You will be able to run as many browsers you want and connect them to any HTTP proxies.

Check [here](/self-hosted/user-data-storage) if you need user data storage.

### Docker

First you need to run the latest docker image.

```bash
docker run -p=9999:9999 --shm-size=2g ghcr.io/blitzbrowser/blitzbrowser:latest
```

### Connect your code

Then you have to connect your code. In general, you should only change 1 line of code to connect over CDP. Check the [Chrome DevTools Protocol properties](/self-hosted/chrome-devtools-protocol) to learn how to configure your browser.

<details open>
<summary><b>Puppeteer</b></summary>

```typescript
import puppeteer from 'puppeteer';

const browser = await puppeteer.connect({
    browserWSEndpoint: `ws://localhost:9999`
});

const context = await browser.createBrowserContext();
const page = await context.newPage();

// ...

await browser.close();
```

</details>

<details>
<summary><b>Playwright + NodeJS</b></summary>

```typescript
import { chromium } from 'playwright';

const browser = await chromium.connectOverCDP(`ws://localhost:9999`);

const context = await browser.newContext();
const page = await context.newPage();

// ...

await browser.close();
```

</details>
