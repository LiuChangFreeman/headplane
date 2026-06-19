import { ArrowRight } from "lucide-react";

import Link from "~/components/link";
import PageError from "~/components/page-error";
import { useI18n } from "~/i18n/context";

import type { Route } from "./+types/overview";

export async function loader({ context }: Route.LoaderArgs) {
  return {
    config: context.hs.writable(),
    isOidcEnabled:
      context.oidc.state === "enabled" && context.oidc.value.status().state === "ready",
  };
}

export default function Page({ loaderData: { config, isOidcEnabled } }: Route.ComponentProps) {
  const { t } = useI18n();

  return (
    <div className="flex max-w-(--breakpoint-lg) flex-col gap-8">
      <div className="flex w-full flex-col sm:w-2/3">
        <h1 className="mb-4 text-2xl font-medium">{t("settings.title")}</h1>
        <p>{t("settings.description")}</p>
      </div>
      <div className="flex w-full flex-col sm:w-2/3">
        <h1 className="mb-4 text-2xl font-medium">{t("authKeys.title")}</h1>
        <p>
          {t("authKeys.description")}{" "}
          <Link external styled to="https://tailscale.com/kb/1085/auth-keys/">
            {t("settings.tailscaleDocs")}
          </Link>
        </p>
      </div>
      <Link to="/settings/auth-keys">
        <div className="flex items-center text-lg font-medium">
          {t("authKeys.manage")}
          <ArrowRight className="ml-2 h-5 w-5" />
        </div>
      </Link>
      <div className="flex w-full flex-col sm:w-2/3">
        <h1 className="mb-4 text-2xl font-medium">{t("settings.agentTitle")}</h1>
        <p>{t("settings.agentBody")}</p>
      </div>
      <Link to="/settings/agent">
        <div className="flex items-center text-lg font-medium">
          {t("settings.agentSettings")}
          <ArrowRight className="ml-2 h-5 w-5" />
        </div>
      </Link>
      {config && isOidcEnabled ? (
        <>
          <div className="flex w-full flex-col sm:w-2/3">
            <h1 className="mb-4 text-2xl font-medium">{t("settings.authRestrictionsTitle")}</h1>
            <p>
              {t("settings.authRestrictionsBody")}{" "}
              <Link external styled to="https://headscale.net/stable/ref/oidc/#basic-configuration">
                {t("common.learnMore")}
              </Link>
            </p>
          </div>
          <Link to="/settings/restrictions">
            <div className="flex items-center text-lg font-medium">
              {t("settings.manageRestrictions")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </div>
          </Link>
        </>
      ) : undefined}
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return <PageError error={error} page="Settings" />;
}
