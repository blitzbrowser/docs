# BlitzBrowser

Managing browsers can be a recipe for memory leaks, zombie processes and devops issues. BlitzBrowser handles all the hard work of deploying and scaling the browsers, so you can focus on your code.

## Features

- **Parallelism** - Spin up and run multiple browsers concurrently.
- **Chrome DevTools Protocol** - No proprietary SDK. Connect directly from Puppeteer, Playwright or any CDP supported framework.
- **Headful** - Run the browsers with a GUI to bypass bot detection and to render exactly as a user would see.
- **Live View** - Watch and interact directly with any browsers currently running.
- **Persistent Sessions** - Persist your browser user data with S3.
- **Proxy Support** - Connect your browsers to any HTTP proxies.
- **Queueing** - CDP connections are automatically queued while the browser are starting.
- **No DevOps** - Run your browsers without worrying about the infrastructure, zombie process or a custom script. The container manages everything for you.

## Get Started

### Self Hosted (Open Source)

BlitzBrowser is open source on [Github](https://github.com/blitzbrowser/blitzbrowser) and under the Apache 2.0 license. You can run it in seconds with Docker.

- [Self Hosted Documentation](/self-hosted/getting-started)

### Cloud

If you don't want to manage the infrastructure, the versions and the updates. We offer a cloud version that handles everything for you.

- [Sign up at BlitzBrowser.com](https://blitzbrowser.com)
- [Cloud Documentation](/cloud/getting-started)