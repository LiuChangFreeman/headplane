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

  if (request.mode === "navigate" || !url.pathname.startsWith(PREFIX + "/assets/")) {
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
