import { PWA_HOST, isPwaHost } from "~/utils/pwa";

import type { Route } from "./+types/pwa-service-worker";

export async function loader({ request }: Route.LoaderArgs) {
  if (!isPwaHost(request)) {
    throw new Response("Not Found", { status: 404 });
  }

  const script = `
const PWA_HOST = ${JSON.stringify(PWA_HOST)};
const PREFIX = ${JSON.stringify(__PREFIX__)};
const CACHE_NAME = "headplane-pwa-${__VERSION__}";
const OFFLINE_HTML = \`<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
  <meta name="color-scheme" content="light dark">
  <title>Headplane</title>
  <style>
    :root { color-scheme: light dark; }
    body {
      margin: 0;
      min-height: 100vh;
      min-height: 100dvh;
      display: grid;
      place-items: center;
      padding: max(24px, env(safe-area-inset-top)) max(24px, env(safe-area-inset-right)) max(24px, env(safe-area-inset-bottom)) max(24px, env(safe-area-inset-left));
      background: #181717;
      color: #f7f5f4;
      font: 15px/1.45 -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    main { width: min(280px, 100%); text-align: center; }
    img { width: 72px; height: 72px; border-radius: 18px; box-shadow: 0 18px 40px rgb(0 0 0 / 0.24); }
    h1 { margin: 20px 0 6px; font-size: 22px; letter-spacing: 0; }
    p { margin: 0; color: #c7c0bc; }
    button {
      margin-top: 22px;
      border: 1px solid rgb(247 245 244 / 0.16);
      border-radius: 8px;
      background: rgb(247 245 244 / 0.08);
      color: inherit;
      padding: 10px 14px;
      font: inherit;
    }
  </style>
</head>
<body>
  <main>
    <img src="${__PREFIX__}/pwa-icon-192.png" alt="">
    <h1>Headplane</h1>
    <p>当前网络不可用，连接恢复后再继续管理 Tailnet。</p>
    <button onclick="location.reload()">重试</button>
  </main>
</body>
</html>\`;

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("headplane-pwa-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (
    self.location.hostname !== PWA_HOST ||
    url.origin !== self.location.origin ||
    request.method !== "GET" ||
    !url.pathname.startsWith(PREFIX + "/")
  ) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(
        () =>
          new Response(OFFLINE_HTML, {
            headers: {
              "Cache-Control": "no-store",
              "Content-Type": "text/html; charset=utf-8",
            },
          }),
      ),
    );
    return;
  }

  if (!url.pathname.startsWith(PREFIX + "/assets/")) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);
      const response = fetch(request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(() => cached);

      return cached || response;
    }),
  );
});
`;

  return new Response(script, {
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/javascript; charset=utf-8",
      "Service-Worker-Allowed": `${__PREFIX__}/`,
    },
  });
}
