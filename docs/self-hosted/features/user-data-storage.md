# User Data Storage

Persisting your browser user data has never been easier. With BlitzBrowser you can persist your user data on the disk or with an S3 compatible service.

You can use any S3 provider such as Cloudflare R2, RustFS, AWS S3 or Backblaze to persist your user data.

## Quick Start

### User Data Storage on local disk

By default BlitzBrowser will persist the user data locally. You don't need to configure anything to enable the feature.

To test user data storage locally, here is a Docker Compose file that will store the browser user data on your host in the `./user-data` folder.

#### Docker compose

```yaml
services:
  blitzbrowser:
    image: ghcr.io/blitzbrowser/blitzbrowser:latest
    ports:
      - "9999:9999"
    volumes:
      - ./user-data:/blitzbrowser/user-data
    shm_size: "2gb"
    restart: always
```

### User Data Storage with S3

To persist your browser user data in a S3 compatible service, you have to configure all the `S3_*` environment variables. You can find all the details in the [BlitzBrowser configuration](/self-hosted/configurations/blitzbrowser) doc.

To test locally BlitzBrowser with an S3 service, here is a Docker Compose file that includes BlitzBrowser and RustFS (S3) images.

1. Deploy the Docker Compose file.
2. Once running, create the bucket `user-data` in RustFS [http://localhost:9001](http://localhost:9001).
3. You are now ready to persist the browser user data.

#### Docker compose

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

To connect to a browser and persist the user data. You need to use the `userDataId=${ID}` property in the CDP URL. Check the [Chrome DevTools Protocol properties](/self-hosted/configurations/chrome-devtools-protocol) to learn how to configure your browser.

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
