# Live View

The Live View feature allows you to watch and interact with any browser currently running. It is useful for debugging sessions or assisting an AI Agent in its workflow.

<video width="100%" controls src="https://github.com/user-attachments/assets/b4294d66-a202-4345-990c-58b3574f4f61"></video>

## How to use the Live View

The Live View feature requires the dashboard. The [complete deployment guide](/self-hosted/getting-started#complete-deployment) contains a Docker Compose file with all the requirements to run all the features of BlitzBrowser. It will deploy the dashboard.

The live view is enabled with the [live view browser property](/self-hosted/chrome-devtools-protocol#browser-properties). You have to enable the feature when connecting to a browser. By default the Live View is disabled.

### Connect your code

<details open>
<summary><b>Puppeteer</b></summary>

```typescript
import puppeteer from 'puppeteer';

const browser = await puppeteer.connect({
    browserWSEndpoint: `ws://localhost:9999?liveView=true`
});

const context = await browser.createBrowserContext();
const page = await context.newPage();

// ...

await browser.close();
```

</details>

<details>
<summary><b>Playwright</b></summary>

```typescript
import { chromium } from 'playwright';

const browser = await chromium.connectOverCDP(`ws://localhost:9999?liveView=true`);

const context = await browser.newContext();
const page = await context.newPage();

// ...

await browser.close();
```

</details>
