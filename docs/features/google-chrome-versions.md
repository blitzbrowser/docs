# Google Chrome Versions

BlitzBrowser supports running multiple versions of Chrome for Testing. This allows you to test your scripts against specific Chrome releases or ensure compatibility when Google introduces new browser features.

- **Versions supported:** Any version listed in the Google Chrome Labs [Known Good Versions](https://googlechromelabs.github.io/chrome-for-testing/known-good-versions.json) can be used. Chrome 116 is the earliest supported version.
- **Storage:** All downloaded browser binaries are persisted in the `/blitzbrowser/browsers/...` directory.

## Supported Versions

- `default`: This is the default value. It will use the pre-installed Chrome for Testing in the Docker image.
- `latest`: This value will install the latest version available from the Google Chrome Labs [Known Good Versions](https://googlechromelabs.github.io/chrome-for-testing/known-good-versions.json).
- `xxx.x.xxxx.x`: Set the specific version you want to run. It can be any version since `116.x.xxxx.x`.

## How it works

By default, BlitzBrowser uses the Chrome version pre-installed in the Docker image. However, you can request a specific version via the CDP connection URL.

If the requested version is not already present in the `/blitzbrowser/browsers` folder, BlitzBrowser will automatically download it before connecting your client.


## Connect Your Code

<details open>
<summary><b>Puppeteer</b></summary>

```typescript
import puppeteer from 'puppeteer';

const browser = await puppeteer.connect({
    // Requesting Chrome 117 specifically
    browserWSEndpoint: `ws://localhost:9999?browserVersion=117.0.5898.0`
});

const page = await browser.newPage();

// ...

await browser.close();
```

</details>

<details>
<summary><b>Playwright</b></summary>

```typescript
import { chromium } from 'playwright';

// Requesting the latest available Chrome version
const browser = await chromium.connectOverCDP(`ws://localhost:9999?browserVersion=latest`);

const context = await browser.newContext();
const page = await context.newPage();

// ...

await browser.close();
```

</details>
