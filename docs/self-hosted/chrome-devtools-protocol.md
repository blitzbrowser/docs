# Chrome DevTools Protocol (CDP)

All the frameworks that use the Chrome DevTools Protocol (CDP) can be configured with the following properties. You have to configure the properties in the websocket URL used to connect to our browsers.

## Properties

| Property                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Required |
|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `timezone=${TIMEZONE}`           | By default the browser will use the timezone related to hosted location. If you use a proxy, the timezone will be set to the proxy location. If you need to override the timezone, which is not recommended, you can by using one of the following [timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).                                                                                                                                                     | Optional |
| `proxyUrl=${HTTP_PROXY_URL}`     | To use your own proxy, you have to pass your proxy URL to the browser. The HTTP proxy URL has to match the following pattern `http://${USERNAME}:${PASSWORD}@${HOSTNAME}:${PORT}`. The proxy URL has priority over the other proxy parameters.                                                                                                                                                                                                                                   | Optional |
| `userDataId=${USER_DATA_ID}`     | If you want to persist and reuse the user data related to your browser session. You have to set the a unique ID to the user data. The ID has to match `/^[a-zA-Z0-9-_]{1,64}$/`. The user data will be downloaded before starting the browser and will be saved at the end of the browser session. The user data saved will override the previous version of the user data. If the user data doesn't exist, it will be created from the user data of the browser session. | Optional |
| `userDataReadOnly=${boolean}` | If you want to use the user data without updating it at the end of the browser session. By default it is `false`, you have to set the read only property to `true`. It will download the user data and start the browser with it, but won't saved its new state at the end of the browser session.                                                                                                                                                                               | Optional |

## Examples

Assuming you are running BlitzBrowser locally. The CDP host is `localhost:9999`.

```
ws://cdp.blitzbrowser.com
```

It will connect your CDP framework to a browser. No proxy will be used and the user data won't be stored at the end.

```
ws://localhost:9999?proxyUrl=http://...@proxy.blitzbrowser.com:1080&userDataId=123
```

It will connect your CDP framework to a browser. It will route all your browser requests to the proxy `proxy.blitzbrowser.com:1080` and will use/store the browser user data `123`. If the user data doesn't exist, it will start from scratch and save it after.
