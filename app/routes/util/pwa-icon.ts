import { isPwaHost } from "~/utils/pwa";

import type { Route } from "./+types/pwa-icon";

export async function loader({ request }: Route.LoaderArgs) {
  if (!isPwaHost(request)) {
    throw new Response("Not Found", { status: 404 });
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
  <path d="M5 0h20a5 5 0 0 1 5 5v20a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5V5a5 5 0 0 1 5-5Z" fill="#181717"/>
  <circle cx="7.5" cy="7.5" r="2.5" fill="#f7f5f4"/>
  <circle cx="15" cy="7.5" r="2.5" fill="#444343"/>
  <circle cx="22.5" cy="7.5" r="2.5" fill="#f7f5f4"/>
  <circle cx="7.5" cy="15" r="2.5" fill="#f7f5f4"/>
  <circle cx="15" cy="15" r="2.5" fill="#f7f5f4"/>
  <circle cx="22.5" cy="15" r="2.5" fill="#f7f5f4"/>
  <circle cx="7.5" cy="22.5" r="2.5" fill="#f7f5f4"/>
  <circle cx="15" cy="22.5" r="2.5" fill="#444343"/>
  <circle cx="22.5" cy="22.5" r="2.5" fill="#f7f5f4"/>
</svg>`;

  return new Response(svg, {
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "image/svg+xml",
    },
  });
}
