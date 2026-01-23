# Proxy

This page contains all the documentation related to our proxies.

```
http://${PROPERTIES}:${ACCESS_KEY}@proxy.blitzbrowser.com:1080
```

This is the endpoint to use to connect to the HTTP proxy. You can configure your proxy with different properties to control the its geo location and TTL.

The access key is required connect to the HTTP proxy. It can be the same one used to connect to our browsers. It's important to keep your access keys private to prevent unauthorized access. You can create your access key [from the access keys dashboard](http://dashboard.blitzbrowser.com/access-keys).

The HTTP proxy is available once you signup for the Pay Per Use plan or higher.

## Properties

The easiest way to configure your proxy geo location is with the [proxy dashboard](https://dashboard.blitzbrowser.com/proxies).

```
country-${COUNTRY_CODE}
```

The country property will set the proxy geo location to the country specified. If not set, the country will be random. The country code is in the [ISO 3166-1 alpha-2 format](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).

---

```
state-${STATE_CODE}
```

The state property will set the proxy geo location to the state inside the country specfied, require the country property. If not set, the state will be random. The state code is in the [ISO 3166-2 format](https://en.wikipedia.org/wiki/ISO_3166-2).

---

```
location-${LOCATION_ID}
```

The location ID is the ID of a geo location in our system. It is used to target specific cities around the world. The ID can only be found from our [proxy dashboard](https://dashboard.blitzbrowser.com/proxies).

---

```
session-${SESSION_ID}
```

To use the same proxy for a period of time, you have to use a session. The session ID will be associated to the proxy and all the requests will be routed to it.

The session ID has to be an alpha numeric string between 1 to 64 characters. It has to match the following regex `/^[a-zA-Z0-9]64$/`.

As an example, if you want to use the proxy with our browsers. You will have to use a session for your browsing session. It will guarantee that all your browser requests will use the same proxy/IP.

---

```
ttl-${SECONDS}
```

By default, all the proxy sessions will be released after 30 seconds. If you plan to use your session for a longer period of time, you have to set the TTL.

The TTL is the number of seconds the proxy session will exist. The minimum TTL is 30 seconds and the maximum is 7200 seconds (2 hours).

## Examples

```
http://session-7yqweASD-ttl-120-country-CA-state-QC:${ACCESS_KEY}@proxy.blitzbrowser.com:1080
```

These properties will create a proxy session for 2 minutes in the province of Quebec in Canada.

```
http://location-65f4f2ed-25b5-41d5-b3d3-4f0c6a0bab91:${ACCESS_KEY}@proxy.blitzbrowser.com:1080
```

This property will always use a proxy located in the Tokyo. If you use this proxy multiple times, you will have different IPs at each request.
