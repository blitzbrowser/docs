# HTTP Proxy

BlitzBrowser allows you to route the browser traffic through a custom HTTP proxy. This is essential for web scraping, automated testing and managing multiple accounts where unique IP addresses are required.

## How it works

The proxy is configured per browser by passing the proxy URL as a query parameter when connecting to the CDP endpoint.

When a `proxyUrl` is provided:

- BlitzBrowser configures the browser to route all the HTTP traffic through the proxy.
- The browser automatically handles the proxy authentication.
- The timezone of the browser is automatically adjusted to match the proxy's location (unless overridden by the `timezone` property).

## Connect Your Code

<details open>
<summary><b>Puppeteer</b></summary>

```typescript
import puppeteer from 'puppeteer';

const proxy = "http://user:password@proxy.example.com:8080";

const browser = await puppeteer.connect({
    browserWSEndpoint: `ws://localhost:9999?proxyUrl=${encodeURIComponent(proxy)}`
});

// ...

await browser.close();
```

</details>

<details>
<summary><b>Playwright</b></summary>


```typescript
import { chromium } from 'playwright';

const proxy = "http://user:password@proxy.example.com:8080";

const browser = await chromium.connectOverCDP(`ws://localhost:9999?proxyUrl=${encodeURIComponent(proxy)}`);

// ...

await browser.close();
```

</details>
