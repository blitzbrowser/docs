---
title: How I built Live View for browsers running in Docker
description: How I solved the "black box" problem of running browsers in Docker using VNC, WebSockets and noVNC.
slug: how-i-built-live-view-for-browsers-running-in-docker
authors: [sam_march]
date: 2026-02-05
---

Debugging browsers in docker is usually a blind experience. You have to screenshot or log every step to see what happens. That's why I built the Live View feature.

<!-- truncate -->

While updating the [tutorial](/tutorials/crawl-with-crawl4ai-ollama-and-blitzbrowser) using Crawl4AI, Ollama and BlitzBrowser to run a self hosted AI crawler, I had issues. It wasn't extracting the data I expected and restarting the script every time to debug was painful. I wished to see the browser in real time to understand why.

My first idea was to create a video stream of the browser, but I remembered my [first issue](https://github.com/blitzbrowser/blitzbrowser/issues/1) requesting a real time interaction with the browser. I started to look for an equivalent of the RDP protocol on Linux. I discovered the VNC (Virtual Network Computing) protocol and the [NoVNC](https://github.com/novnc/noVNC) javascript client.

## Under the Hood

<video width="100%" controls src="https://github.com/user-attachments/assets/b4294d66-a202-4345-990c-58b3574f4f61"></video>

To see the browser running in docker, I needed to bridge the gap between the Linux virtual display and the web browser. This is the stack used.

1. **Display**: First the browsers are run in a virtual display. The virtual displays are managed by [x11](https://en.wikipedia.org/wiki/X_Window_System) and each browser has its own display. I'm using [Fluxbox](https://github.com/fluxbox/fluxbox) as a window manager.
2. **VNC Server**: If the Live View feature is enabled, the browser will be started with a [x11vnc](https://github.com/LibVNC/x11vnc) server to create the remote access. It will be accessible from a TCP port on the localhost network.
3. **Websocket-to-TCP bridge**: To connect to the VNC server from a web client, the web server exposes the websocket endpoint `/browser-instances/:browser_instance_id/vnc`. When a client connects to the endpoint, it creates a TCP connection to the VNC server. It will bridge the websocket and the TCP socket by transmitting all the data received from the TCP socket to the websocket and all the websocket data to the TCP. [This is the code](https://github.com/blitzbrowser/blitzbrowser/blob/main/blitzbrowser/src/gateways/vnc.gateway.ts#L13) if you are interesting.
4. **Frontend**: The NoVNC client to connect the VNC server through the websocket. Once the connection is established, NoVNC streams the virtual display and transmit all the interactions done by the user to the server.

## The result

Once the Live View feature was functionnal, I debugged my AI crawler in seconds. The website was detecting my bot, I had no stealth precaution implemented, and it was hiding some data. I changed the tutorial to use the developer doc and it was working perfectly.

## Conclusion

If you ever need to debug your headless browsers, I hope this feature will help you to debug faster.
