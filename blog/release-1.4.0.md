---
title: "1.4.0: Authentication and local storage"
description: The 1.4.0 release contains a new security layer for public deployments and user data storage on local disk.
slug: release-1.4.0
authors: [sam_march]
date: 2026-02-15
---

I'm thrilled to announce the 1.4.0 release for BlitzBrowser. This new version contains a new security layer for public deployments and user data storage on local disk by default.

<!-- truncate -->

Until now, persisting user data required setting up an S3 compatible provider. It is great for scale and cloud deployment, it added friction for local development and integration tests. Deploying into the cloud required an external way to restrict access to the browsers. I added a built-in authentication layer on the dashboard and on BlitzBrowser. You can now deploy BlitzBrowser on the internet securly.

## User Data Storage on Local Disk

In 1.4.0 you are no longer forced to use S3 (like AWS, Cloudflare R2 or RustFS) to save your browser user data. You can now mount a local directory directly to your Docker container to persist them.

Simply map a volume to `/blitzbrowser/user-data` and your user data will persist between container restarts.

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

Find all the details about the [user data storage](/self-hosted/features/user-data-storage).

## Built-in Authentication

Previously BlitzBrowser was open to anyone who could reach it. Version 1.4.0 introduces built-in authentication to control who can access the browsers and the dashboard. BlitzBrowser and the dashboard can now be configured to use an API key and an authentication key.

### Configuration

- **BlitzBrowser**: All CDP and HTTP connections must provide a valid `API_KEY`. You can pass the API key by:
  - HTTP header: `x-api-key: ${API_KEY}`
  - Query parameter: `apiKey=${API_KEY}`
- **Dashboard**: Users must provide the `AUTH_KEY` to log in. The dashboard uses the `BLITZBROWSER_API_KEY` to connect to the API.

For detailed setup instructions, please refer to the [dashboard configuration](/self-hosted/configurations/dashboard) and the [BlitzBrowser configuration](/self-hosted/configurations/blitzbrowser) pages.