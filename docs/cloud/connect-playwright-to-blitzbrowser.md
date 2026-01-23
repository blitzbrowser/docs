# Connect Playwright To BlitzBrowser

To connect Playwright to BlitzBrowser, you have to change the method `launch()` to `connectOverCDP('...')`.

## How to connect

To connect your code, you have to replace launch() with `connectOverCDP('...')`. We suggest to pass the `ACCESS_KEY` as an environment variable to avoid hardcoding your access key directly in the code. The `connectOverCDP('...')` method establishes a connection between Playwright to a remote browser. Playwright will get full control of one of our browsers via the Chrome DevTools Protocol (CDP). Once you disconnect from the browser, the remote browser is killed.

### Typescript

```typescript
import { chromium } from 'playwright';

// const browser = await chromium.launch();
const browser = await chromium.connectOverCDP(
    `wss://cdp.blitzbrowser.com?accessKey=${process.env.ACCESS_KEY}`
);

const context = await browser.newContext();
const page = await context.newPage();

// ...

await browser.close();
```

### Python

```python
import asyncio
import os
from playwright.async_api import async_playwright

async def main():
    playwright = await async_playwright().start()

    browser = await playwright.chromium.connect_over_cdp(
        f"wss://cdp.blitzbrowser.com?accessKey={os.environ.get("ACCESS_KEY")}"
    )
    context = await browser.new_context()
    page = await context.new_page()

    # ...

    await browser.close()
    await playwright.stop()

if __name__ == "__main__":
    asyncio.run(main())
```

### Java

```java
package com.example.demo;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

public class PlaywrightJavaExample {

    public static void main(String[] args) {
        try (Playwright playwright = Playwright.create();
             Browser browser = playwright.chromium().connectOverCDP(
                     "wss://cdp.blitzbrowser.com?accessKey=" + System.getenv("ACCESS_KEY")
             )
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

## CDP Properties

You can find all the properties available to configure your Chrome DevTools Protocol URL when connecting to our browsers [here](/docs/cloud/chrome-devtools-protocol).
