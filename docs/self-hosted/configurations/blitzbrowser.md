# BlitzBrowser Configuration

BlitzBrowser is the engine managing and running the browsers. It will:

- Run multiple headful browsers in parallel.
- Create the CDP endpoint to connect Puppeteer, Playwright or any CDP framework to a browser.
- Persist the user data between browsing sessions. Require an S3 storage.
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

## Environment variables

| Property | Description | Required |
|----------|-------------|----------|
| `API_KEY` | If defined, the API endpoints will be restricted with an api key. By default the API and CDP endpoints don't need an API key. If configured, you will have to pass the header `x-api-key=${API_KEY}` in your HTTP requests or the query parameter `apiKey=${API_KEY}` when connecting to the CDP endpoint. | Optional |
| `MAX_BROWSER_INSTANCES` | Limit the number of concurrent browsers running. By default, you can run up to `99` browsers concurrently. | Optional |
| `S3_ENDPOINT`  | The S3 endpoint used to store user data. | Optional |
| `S3_ACCESS_KEY_ID` | The access key ID used to connect to S3. | Optional |
| `S3_SECRET_ACCESS_KEY` | The secret access key used to connect to S3. | Optional |
| `S3_USER_DATA_BUCKET` | The S3 bucket used to store the user data. | Optional |
| `PORT` | Change the HTTP port the server is listening on. By default the server will listen on port `9999`. | Optional |
| `DISABLE_SHM` | Disable the browsers shared memory features. By default the shared memory features are enabled. You should only disable them if you can't configure the shared memory of your docker container. | Optional |

## Volumes

If your BlitzBrowser configuration has to store any data on the disk. It will be stored in the `/blitzbrowser` folder.

- User data folder: `/blitzbrowser/user-data`

## Examples

### Deploy with api key required

This docker compose config will require all the HTTP and CDP connections to provide the API key.

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
```

### Deploy with S3 user data storage

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
