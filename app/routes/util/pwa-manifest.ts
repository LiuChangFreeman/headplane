import { PWA_ICON_REV, isPwaHost } from "~/utils/pwa";

import type { Route } from "./+types/pwa-manifest";

export async function loader({ request }: Route.LoaderArgs) {
  if (!isPwaHost(request)) {
    throw new Response("Not Found", { status: 404 });
  }

  const manifest = {
    id: `${__PREFIX__}/`,
    name: "Headplane",
    short_name: "Headplane",
    description: "Headscale management console",
    start_url: `${__PREFIX__}/machines`,
    scope: `${__PREFIX__}/`,
    display: "standalone",
    background_color: "#181717",
    theme_color: "#181717",
    icons: [
      {
        src: `${__PREFIX__}/pwa-icon-192.png?v=${encodeURIComponent(PWA_ICON_REV)}`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${__PREFIX__}/pwa-icon-512.png?v=${encodeURIComponent(PWA_ICON_REV)}`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: `${__PREFIX__}/pwa-icon.svg?v=${encodeURIComponent(PWA_ICON_REV)}`,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };

  return new Response(JSON.stringify(manifest), {
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/manifest+json",
    },
  });
}
