import { useFetcher } from "react-router";

import Button from "~/components/button";
import Link from "~/components/link";
import Notice from "~/components/notice";
import StatusCircle from "~/components/status-circle";
import Text from "~/components/text";
import Title from "~/components/title";
import { useI18n } from "~/i18n/context";
import type { TranslationKey } from "~/i18n/translations";
import { formatTimeDelta } from "~/utils/time";

import type { Route } from "./+types/agent";

const agentDisabledReasons: Record<string, TranslationKey> = {
  "Agent is not enabled in the configuration": "settings.agentDisabledNotEnabled",
  "Agent requires headscale.api_key to be configured": "settings.agentDisabledMissingApiKey",
  "Agent requires Headscale 0.28 or newer": "settings.agentDisabledVersion",
  "Agent failed to initialize (see logs)": "settings.agentDisabledFailed",
};

export async function loader({ request, context }: Route.LoaderArgs) {
  await context.auth.require(request);

  if (context.agents.state !== "enabled") {
    return { enabled: false as const, reason: context.agents.reason };
  }

  const sync = context.agents.value.lastSync();
  return {
    enabled: true as const,
    syncedAt: sync.syncedAt?.toISOString() ?? null,
    nodeCount: sync.nodeCount,
    error: sync.error,
  };
}

export async function action({ request, context }: Route.ActionArgs) {
  await context.auth.require(request);

  if (context.agents.state !== "enabled") {
    return { success: false, error: context.agents.reason };
  }

  await context.agents.value.triggerSync();
  const sync = context.agents.value.lastSync();
  return { success: !sync.error, error: sync.error };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { t } = useI18n();
  const fetcher = useFetcher<typeof action>();
  const isSyncing = fetcher.state !== "idle";

  if (!loaderData.enabled) {
    const reasonKey = agentDisabledReasons[loaderData.reason];

    return (
      <div className="flex max-w-(--breakpoint-lg) flex-col gap-8">
        <Title>{t("settings.agentTitle")}</Title>
        <Notice title={t("settings.agentNotEnabled")}>
          {reasonKey ? t(reasonKey) : loaderData.reason} {t("settings.agentSetupPrefix")}{" "}
          <Link external styled to="https://headplane.dev/docs/agent">
            {t("settings.agentSetupDocs")}
          </Link>
        </Notice>
      </div>
    );
  }

  const hasError = Boolean(loaderData.error);

  return (
    <div className="flex max-w-(--breakpoint-lg) flex-col gap-8">
      <div className="flex w-full flex-col sm:w-2/3">
        <Title>{t("settings.agentTitle")}</Title>
        <Text>{t("settings.agentBody")}</Text>
      </div>

      <div className="flex items-center gap-3">
        <StatusCircle isOnline={!hasError} className="h-5 w-5" />
        <span className="text-lg font-medium">
          {hasError ? t("common.error") : t("common.healthy")}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <Text>
          <span className="font-medium">{t("settings.lastSynced")} </span>
          {loaderData.syncedAt ? (
            <span suppressHydrationWarning>{formatTimeDelta(new Date(loaderData.syncedAt))}</span>
          ) : (
            t("common.never")
          )}
        </Text>
        <Text>
          <span className="font-medium">{t("settings.nodesSynced")} </span>
          {loaderData.nodeCount}
        </Text>
      </div>

      {loaderData.error ? (
        <Notice variant="error" title={t("settings.syncError")}>
          {loaderData.error}
        </Notice>
      ) : undefined}

      <fetcher.Form method="post">
        <Button type="submit" variant="heavy" disabled={isSyncing}>
          {isSyncing ? t("settings.syncing") : t("settings.syncNow")}
        </Button>
      </fetcher.Form>
    </div>
  );
}
