# Getting Started

Running BlitzBrowser yourself is easy. You just need to pull the latest docker image and your CDP endpoint will be ready to run your browsers in seconds.

## Quick Start

If you want to run browsers and don't need user data storage. We recommand running the following docker container. You will be able to run as many browsers you want and connect them to any HTTP proxies.

- [Looking to persist the user data?](/features/user-data-storage)
- [Looking for the live view feature?](/features/live-view)

### Docker

First you need to run the latest docker image.

```bash
docker run -p=9999:9999 --shm-size=2g ghcr.io/blitzbrowser/blitzbrowser:latest
```

### Connect your code

Then you have to connect your code. In general, you should only change 1 line of code to connect over CDP. Check the [Chrome DevTools Protocol properties](/configurations/chrome-devtools-protocol) to learn how to configure your browser.

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

## Complete deployment

While BlitzBrowser can be run in a single docker image. You will need more docker images to enable all the features.

This is the docker compose to run BlitzBrowser, the dashboard and Rustfs (S3). You will be able to run browsers, persist the user data and to use the Live View feature with this deployment.

```yml
services:
  blitzbrowser:
    image: ghcr.io/blitzbrowser/blitzbrowser:latest
    ports:
      - "9999:9999"
    environment:
      S3_ENDPOINT: http://s3:9000
      S3_ACCESS_KEY_ID: rustfsadmin
      S3_SECRET_ACCESS_KEY: rustfsadmin
      S3_USER_DATA_BUCKET: user-data
      MAX_BROWSER_INSTANCES: 4
    shm_size: "2gb"
    restart: always
  dashboard:
    image: ghcr.io/blitzbrowser/dashboard:latest
    ports:
      - "3000:3000"
    restart: always
  s3:
    image: rustfs/rustfs
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      RUSTFS_VOLUMES: /data
      RUSTFS_ADDRESS: :9000
      RUSTFS_ACCESS_KEY: rustfsadmin
      RUSTFS_SECRET_KEY: rustfsadmin
      RUSTFS_CONSOLE_ENABLE: true
    restart: always
    volumes:
      - s3_data:/data
  # RustFS volume permissions fixer service
  volume-permission-helper:
    image: alpine
    volumes:
      - s3_data:/data
    command: >
      sh -c "
        chown -R 10001:10001 /data &&
        echo 'Volume Permissions fixed' &&
        exit 0
      "
    restart: "no"
volumes:
  s3_data:
```