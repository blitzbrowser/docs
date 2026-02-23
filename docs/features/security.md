# Security

You can run BlitzBrowser and the dashboard securely over the internet or without authentication in a private network. Depending on your requirements, you can easily configure the security you need.

![BlitzBrowser dashboard](/img/auth.webp)

## No authentication (Default)

This mode is ideal for local development or private networks. Anyone with access to the network can view the dashboard and launch browsers.

- **BlitzBrowser**: Accessible without an API key.
- **Dashboard**: Open to the public. No login required.

## Full Authentication (Recommended for Production)

This is the most secure setup. It requires all users to be authenticated to access the dashboard and to connect to any browser instances.

- **BlitzBrowser**: All CDP and HTTP connections must provide a valid `API_KEY`. You can pass the API key by:
  - HTTP header: `x-api-key: ${API_KEY}`
  - Query parameter: `apiKey=${API_KEY}`
- **Dashboard**: Users must provide the `AUTH_KEY` to log in. The dashboard uses the `BLITZBROWSER_API_KEY` to connect to the API.

For detailed setup instructions, please refer to the [dashboard configuration](/configurations/dashboard) and the [BlitzBrowser configuration](/configurations/blitzbrowser) pages.
