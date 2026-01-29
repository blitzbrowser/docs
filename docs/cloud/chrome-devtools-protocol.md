# Chrome DevTools Protocol (CDP)

The Chrome DevTools Protocol (CDP) over a websocket connection is used to connect to the browsers. To configure the browsers, you have to pass the browser properties as query parameters on the websocket URL.

## How to connect with CDP

### Connect Playwright over CDP

```typescript
import { chromium } from 'playwright';

const browser = await chromium.connectOverCDP(
    `wss://cdp.blitzbrowser.com?accessKey=${process.env.BLITZBROWSER_ACCESS_KEY}`
);
```

### Connect Puppeteer over CDP

```typescript
import puppeteer from 'puppeteer';

const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://cdp.blitzbrowser.com?accessKey=${process.env.BLITZBROWSER_ACCESS_KEY}`
});
```

## Browser Properties

The browser properties are used to configure the browser before starting.

| Property                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Required |
|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `accessKey=${ACCESS_KEY}`        | The access key is required connect to our managed pool of browsers. It's important to keep your access keys private to prevent unauthorized access. You can create your access key from the [access keys dashboard](http://dashboard.blitzbrowser.com/access-keys).                                                                                                                                                                                                              | Required |
| `timezone=${TIMEZONE}`           | By default the browser will use the timezone related to hosted location. If you use a proxy, the timezone will be set to the proxy location. If you need to override the timezone, which is not recommended, you can by using one of the following [timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).                                                                                                                                                     | Optional |
| `proxyUrl=${HTTP_PROXY_URL}`     | To use your own proxy, you have to pass your proxy URL to the browser. The HTTP proxy URL has to match the following pattern `http://${USERNAME}:${PASSWORD}@${HOSTNAME}:${PORT}`. The proxy URL has priority over the other proxy parameters.                                                                                                                                                                                                                                   | Optional |
| `userDataId=${USER_DATA_ID}`     | If you want to persist and reuse the user data related to your browser session. You have to set the a unique ID to the user data. The ID has to match `/^[a-zA-Z0-9-_]{1,64}$/`. The user data will be downloaded before starting the browser and will be saved at the end of the browser session. The user data saved will override the previous version of the user data. If the user data doesn't exist, it will be created from the user data of the browser session. | Optional |
| `userDataReadOnly=${boolean}` | If you want to use the user data without updating it at the end of the browser session. By default it is `false`, you have to set the read only property to `true`. It will download the user data and start the browser with it, but won't saved its new state at the end of the browser session.                                                                                                                                                                               | Optional |

## CDP URLs Examples

```
wss://cdp.blitzbrowser.com?accessKey=${ACCESS_KEY}
```

It will connect your CDP framework to one of our browsers. No proxy will be used and you will connect to the internet from our datacenter IPs.

```
wss://cdp.blitzbrowser.com?accessKey=${ACCESS_KEY}&proxyUrl=http://session-7yqweASD-ttl-120-country-CA-state-QC:${ACCESS_KEY}@proxy.blitzbrowser.com:1080
```

It will connect your CDP framework to one of our browsers. It will route all your browser requests to a proxy location in the province of Quebec, Canada. The proxy sessio `7yqweASD` will have a duration of 2 minutes.
