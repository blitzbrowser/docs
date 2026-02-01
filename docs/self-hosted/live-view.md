# Live View

The live view feature allows you to watch and interact with any browsers currently running. It is useful for debugging sessions or helping your AI Agent in their workflow.

<video width="100%" controls src="https://github.com/user-attachments/assets/b4294d66-a202-4345-990c-58b3574f4f61"></video>

## How to use the Live View

The live view feature requires the dashboard. If the dashboard isn't deployed, you can [learn how to deploy it](/self-hosted/dashboard#how-to-deploy-the-dashboard).

The live view is enabled with the [live view browser property](/self-hosted/chrome-devtools-protocol#browser-properties). You have to enable the feature when connecting to a browser.

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
