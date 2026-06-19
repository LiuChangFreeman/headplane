import type { MetaFunction } from "react-router";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  unstable_useRoute as useRoute,
} from "react-router";

import { LiveDataProvider } from "~/utils/live-data";
import ToastProvider from "~/utils/toast-provider";

import type { Route } from "./+types/root";
import { ErrorBanner } from "./components/error-banner";
import { I18nProvider } from "./i18n/context";

import "@fontsource-variable/inter/opsz.css";
import "./tailwind.css";
import { getColorScheme } from "./utils/color-scheme";
import { getLocale } from "./utils/locale";
import { PWA_HOST, PWA_ICON_REV, isPwaHost } from "./utils/pwa";

export const meta: MetaFunction = () => [
  { title: "Headplane" },
  {
    name: "description",
    content: "A frontend for the headscale coordination server",
  },
];

export async function loader({ request }: Route.LoaderArgs) {
  const [colorScheme, locale] = await Promise.all([getColorScheme(request), getLocale(request)]);
  return { colorScheme, locale, pwaEnabled: isPwaHost(request) };
}

export function Layout({ children }: { readonly children: React.ReactNode }) {
  const { loaderData } = useRoute("root");
  const pwaEnabled = loaderData?.pwaEnabled === true;
  const viewportContent = pwaEnabled
    ? "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
    : "width=device-width, initial-scale=1";
  const pwaThemeColor =
    loaderData?.colorScheme === "dark"
      ? "#181717"
      : loaderData?.colorScheme === "light"
        ? "#e7e5e4"
        : undefined;

  // LiveDataProvider is wrapped at the top level since dialogs and things
  // that control its state are usually open in portal containers which
  // are not a part of the normal React tree.
  return (
    <LiveDataProvider>
      <html
        lang={loaderData?.locale ?? "en"}
        data-pwa={pwaEnabled ? "true" : undefined}
        className={
          loaderData?.colorScheme === "dark"
            ? "dark"
            : loaderData?.colorScheme === "light"
              ? "light"
              : ""
        }
      >
        <head>
          <meta charSet="utf-8" />
          <meta content={viewportContent} name="viewport" />
          <meta content="light dark" name="color-scheme" />
          <Meta />
          <Links />
          <link href={`${__PREFIX__}/favicon.ico`} rel="icon" />
          {pwaEnabled && (
            <>
              <link href={`${__PREFIX__}/manifest.webmanifest`} rel="manifest" />
              <link
                href={`${__PREFIX__}/pwa-icon-180.png?v=${encodeURIComponent(PWA_ICON_REV)}`}
                rel="apple-touch-icon"
                sizes="180x180"
              />
              <link
                href={`${__PREFIX__}/pwa-icon-192.png?v=${encodeURIComponent(PWA_ICON_REV)}`}
                rel="icon"
                sizes="192x192"
                type="image/png"
              />
              <link
                href={`${__PREFIX__}/pwa-icon-512.png?v=${encodeURIComponent(PWA_ICON_REV)}`}
                rel="icon"
                sizes="512x512"
                type="image/png"
              />
              <meta content="yes" name="mobile-web-app-capable" />
              <meta content="yes" name="apple-mobile-web-app-capable" />
              <meta content="Headplane" name="apple-mobile-web-app-title" />
              <meta content="black-translucent" name="apple-mobile-web-app-status-bar-style" />
              <meta content="telephone=no" name="format-detection" />
              {pwaThemeColor ? (
                <meta content={pwaThemeColor} name="theme-color" />
              ) : (
                <>
                  <meta
                    content="#e7e5e4"
                    media="(prefers-color-scheme: light)"
                    name="theme-color"
                  />
                  <meta content="#181717" media="(prefers-color-scheme: dark)" name="theme-color" />
                </>
              )}
            </>
          )}
        </head>
        <body className="min-h-dvh w-full max-w-full overflow-x-hidden overscroll-none bg-white text-mist-900 dark:bg-mist-900 dark:text-mist-50">
          <I18nProvider locale={loaderData?.locale ?? "en"}>
            {children}
            <ToastProvider />
          </I18nProvider>
          {pwaEnabled && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
if ("serviceWorker" in navigator && location.hostname === ${JSON.stringify(PWA_HOST)}) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("${__PREFIX__}/sw.js", { scope: "${__PREFIX__}/" })
      .then((registration) => {
        const update = () => registration.update().catch(() => {});
        update();
        window.setInterval(update, 60 * 60 * 1000);
      })
      .catch(() => {});
  });
}
`,
              }}
            />
          )}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </LiveDataProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center p-4">
      <ErrorBanner className="max-w-2xl" error={error} />
    </div>
  );
}

export default function App() {
  return <Outlet />;
}
