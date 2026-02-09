# Dashboard Configuration

The [dashboard](/self-hosted/features/dashboard) is the web interface used to manage the browsers. It is deployed separately from BlitzBrowser.

## How to deploy

The dashboard is deployed with docker. Since it requires BlitzBrowser to run, the following docker compose is the fastest way to deploy BlitzBrowser and the dashboard.

```yaml
services:
  blitzbrowser:
    image: ghcr.io/blitzbrowser/blitzbrowser:latest
    ports:
      - "9999:9999"
    shm_size: "2gb"
    restart: always
  dashboard:
    image: ghcr.io/blitzbrowser/dashboard:latest
    ports:
      - "3000:3000"
    restart: always
```

## Environment variables
