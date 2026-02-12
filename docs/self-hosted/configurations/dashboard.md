# Dashboard Configuration

The [dashboard](/self-hosted/features/dashboard) is the web interface used to manage the browsers. It is deployed separately from BlitzBrowser.

## How to deploy

The dashboard is deployed with docker. Since it requires BlitzBrowser to run, the following docker compose is the fastest way to deploy BlitzBrowser and the dashboard.

### Docker Image

```
ghcr.io/blitzbrowser/dashboard:latest
```

### Docker Compose

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

| Property | Description | Required |
|----------|-------------|----------|
| `AUTH_KEY=${AUTH_KEY}` |  If you are looking to restrict the access to the dashboard, you have to set the auth key. It will prevent anyone from using the dashboard if they don't have the key to login. The auth key isn't the same key as the API key for the BlitzBrowser API. | Optional |
| `BLITZBROWSER_API_URL=${URL}` | If you are not hosting BlitzBrowser on `localhost:9999`. You need to configure the URL to use to connect to the API. By default, the dashboard will connect to `http://localhost:9999`. The dashboard is client side, the API URL has to be accessible from your web browser. | Optional |
| `BLITZBROWSER_API_KEY=${API_KEY}` | If you configured BlitzBrowser to require an API key. You need to set the key to use. By default, the dashboard will connect to the API without an API key. | Optional |

## Examples

### Deploy with authentication required

This docker compose config will require anyone to authenticate on the dashboard and with the BlitzBrowser API.

```yaml
services:
  blitzbrowser:
    image: ghcr.io/blitzbrowser/blitzbrowser:latest
    ports:
      - "9999:9999"
    shm_size: "2gb"
    restart: always
    environment:
      API_KEY: api_admin
  dashboard:
    image: ghcr.io/blitzbrowser/dashboard:latest
    ports:
      - "3000:3000"
    restart: always
    environment:
      AUTH_KEY: auth_admin
      BLITZBROWSER_API_KEY: api_admin
```
