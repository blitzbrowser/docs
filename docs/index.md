<div>
    <img style={{marginRight: '4px'}} src="https://img.shields.io/github/actions/workflow/status/blitzbrowser/blitzbrowser/cicd.yml?style=flat-square" />
    <img src="https://img.shields.io/github/v/tag/blitzbrowser/blitzbrowser?style=flat-square" />
</div>

# BlitzBrowser

Managing browsers can be a recipe for memory leaks, zombie processes and devops issues. BlitzBrowser handles all the hard work of deploying and scaling the browsers, so you can focus on your code.

## Features

- [**Live View**](/self-hosted/features/live-view) - Watch and interact directly with any browser currently running.
- [**Persistent Sessions**](/self-hosted/features/user-data-storage) - Persist your browser user data.
- [**Proxy Support**](/self-hosted/features/http-proxy) - Connect your browsers to any HTTP proxies.
- [**Security**](/self-hosted/features/security) - Control who can access the browsers.
- [**Chrome DevTools Protocol**](/self-hosted/configurations/chrome-devtools-protocol) - No proprietary SDK. Connect directly from Puppeteer, Playwright or any CDP supported framework.
- **Parallelism** - Spin up and run multiple browsers concurrently.
- **Headful** - Run the browsers with a GUI to bypass bot detection and to render exactly as a user would see.
- **Queueing** - CDP connections are automatically queued while the browsers are starting.
- **No DevOps** - Run your browsers without worrying about the infrastructure, zombie processes or a custom script. The container manages everything for you.

## Get Started

### Self Hosted (Open Source)

BlitzBrowser is open source on [Github](https://github.com/blitzbrowser/blitzbrowser) and under the Apache 2.0 license. You can run it in seconds with Docker.

- [Self Hosted Documentation](/self-hosted/getting-started)

### Cloud

If you don't want to manage the infrastructure, the versions and the updates. We offer a cloud version that handles everything for you.

- [Sign up at BlitzBrowser.com](https://blitzbrowser.com)
- [Cloud Documentation](/cloud/getting-started)

## FAQ

### BlitzBrowser vs. Puppeteer/Playwright

Puppeteer and Playwright are libraries that give you control of a browser. With them you can:

- Take a screenshot of a web page.
- Automate tasks on websites like clicking, scrolling and typing.
- Extract data from a website.

They do not handle the infrastructure or cleanup. If you run them directly in your application code, you are responsible for:

- Killing zombie processes that don't always close properly.
- Managing multiple browsers concurrently.
- Handling dependencies to run Google Chrome.
- Persisting browser user data.
- Authenticate and route traffic to HTTP proxies.
- Secure the access to the browser.

BlitzBrowser is a browser-as-a-service software. Your code stays focused on your project needs and the heavy lifting of managing the browsers happens inside the BlitzBrowser container.

### Can I use my Puppeteer/Playwright code?

Yes. BlitzBrowser isn't a library like Puppeteer and Playwright. BlitzBrowser is deployed as a docker container to run your browsers. To control a browser, you still need Puppeteer and Playwright. You will only need 1 line of code changed to use BlitzBrowser instead of running the browsers yourself.

<details open>
<summary><b>Puppeteer</b></summary>

```typescript
import puppeteer from 'puppeteer';

// Change the launch() method to connect({ ... })

// const browser = await puppeteer.launch();

const browser = await puppeteer.connect({ browserWSEndpoint: `ws://localhost:9999` });

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

// Change the launch() method to connect({ ... })

// const browser = await chromium.launch();

const browser = await chromium.connectOverCDP(`ws://localhost:9999`);

const context = await browser.newContext();
const page = await context.newPage();

// ...

await browser.close();
```

</details>

### Does it only work with Puppeteer/Playwright on NodeJS?

No. BlitzBrowser is language and framework agnostic. It works with any framework using the Chrome DevTools Protocol (CDP). If your browser automation tool/framework can connect to a browser through CDP, you can use BlitzBrowser.

<details>
<summary><b>Playwright + Python</b></summary>

```python
import asyncio
import os

from playwright.async_api import async_playwright

async def main():
    playwright = await async_playwright().start()

    browser = await playwright.chromium.connect_over_cdp("ws://localhost:9999")
    context = await browser.new_context()
    page = await context.new_page()

    # ...

    await browser.close()
    await playwright.stop()

if __name__ == "__main__":
    asyncio.run(main())
```

</details>

<details>
<summary><b>Playwright + Java</b></summary>

```java
package com.example.demo;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

public class PlaywrightJavaExample {

    public static void main(String[] args) {
        try (Playwright playwright = Playwright.create();
             Browser browser = playwright.chromium().connectOverCDP("ws://localhost:9999")
        ) {
            BrowserContext context = browser.newContext();
            Page page = context.newPage();

            // ...
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
```

</details>

### Does BlitzBrowser help with Bot Detection?

Yes. BlitzBrowser runs the browsers in headful mode within a virtual display. The browsers appear more like a real user to websites compared to headless mode, which carries signals that anti bot services, like Cloudflare or Akamai, can detect.

It doesn't mean BlitzBrowser will bypass all the anti bot mechanisms. You still need to implement different strategies like residential IPs, captcha solving and human-like behaviour.
