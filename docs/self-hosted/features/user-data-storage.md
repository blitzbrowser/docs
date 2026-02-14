# User Data Storage

If you need to run your browsers and persist user data between sessions, you must use an S3-compatible service.

You can use any provider such as Cloudflare R2, RustFS, AWS S3, or Backblaze.

## Quick Start

To run BlitzBrowser locally with user data storage, we have provided a Docker Compose file that includes BlitzBrowser, the dashboard and RustFS (S3) images.

1. Deploy the Docker Compose file.
2. Once running, create the bucket `user-data` in Rustfs [http://localhost:9001](http://localhost:9001).
3. You are now ready to persist the browser user data.

### Docker compose

```yaml
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

### Connect Your Code

To connect to a browser and to persist the user data. You need to use the `userDataId=${ID}` property in the CDP URL. Check the [Chrome DevTools Protocol properties](/self-hosted/chrome-devtools-protocol) to learn how to configure your browser.

<details open>
<summary><b>Puppeteer</b></summary>

```typescript
import puppeteer from 'puppeteer';

const browser = await puppeteer.connect({
    browserWSEndpoint: `ws://localhost:9999?userDataId=myFirstUserData`
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

const browser = await chromium.connectOverCDP(`ws://localhost:9999?userDataId=myFirstUserData`);

const context = await browser.newContext();
const page = await context.newPage();

// ...

await browser.close();
```

</details>
