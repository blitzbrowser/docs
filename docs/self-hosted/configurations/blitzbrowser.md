# BlitzBrowser Configuration

BlitzBrowser is the engine managing and running the browsers. It will:

- Run multiple headful browsers in parallel.
- Create the CDP endpoint to connect Puppeteer, Playwright or any CDP framework to a browser.
- Persist the user data between browsing sessions.
- Proxy all the browsers' requests to HTTP proxies.
- Queue all CDP requests to avoid overloading the host.

The dashboard isn't deployed with BlitzBrowser. You need to deploy it separately. You can find all the details in the [dashboard configuration](/self-hosted/configurations/dashboard).

## How to deploy

Docker is the fastest way to deploy BlitzBrowser. Since BlitzBrowser is a standalone engine, you can run it with Docker CLI for a quick deployment or with Docker Compose if you plan to deploy an S3 service for [user data storage](/self-hosted/features/user-data-storage) and the [dashboard](/self-hosted/features/dashboard).

### Docker Image

```
ghcr.io/blitzbrowser/blitzbrowser:latest
```

### Docker CLI

```bash
docker run -d \
  --name blitzbrowser \
  -p 9999:9999 \
  -e MAX_BROWSER_INSTANCES=4 \
  --shm-size=2gb \
  --restart always \
  ghcr.io/blitzbrowser/blitzbrowser:latest
```

### Docker Compose

```yaml
services:
  blitzbrowser:
    image: ghcr.io/blitzbrowser/blitzbrowser:latest
    ports:
      - "9999:9999"
    environment:
      MAX_BROWSER_INSTANCES: 4
    shm_size: "2gb"
    restart: always
```