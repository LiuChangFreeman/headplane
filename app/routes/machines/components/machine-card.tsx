import { Copy } from "lucide-react";
import { useMemo } from "react";

import Chip from "~/components/chip";
import Link from "~/components/link";
import StatusCircle from "~/components/status-circle";
import { useI18n } from "~/i18n/context";
import type { User } from "~/types";
import cn from "~/utils/cn";
import * as hinfo from "~/utils/host-info";
import type { PopulatedNode } from "~/utils/node-info";
import { formatTimeDelta } from "~/utils/time";
import toast from "~/utils/toast";
import { getUserDisplayName } from "~/utils/user";

import { mapTagsToComponents, uiTagsForNode } from "./machine-row";
import MenuOptions from "./menu";

interface Props {
  node: PopulatedNode;
  users: User[];
  isAgent?: boolean;
  magic?: string;
  isDisabled?: boolean;
  existingTags?: string[];
  supportsNodeOwnerChange: boolean;
}

export default function MachineCard({
  node,
  users,
  isAgent,
  magic,
  isDisabled,
  existingTags,
  supportsNodeOwnerChange,
}: Props) {
  const { t } = useI18n();
  const uiTags = useMemo(() => uiTagsForNode(node, isAgent), [node, isAgent]);
  const primaryIp = node.ipAddresses[0];

  return (
    <article className="rounded-lg border border-mist-200 p-3 dark:border-mist-800">
      <div className="flex items-start gap-3">
        <Link className="min-w-0 flex-1 focus:outline-hidden" to={`/machines/${node.id}`}>
          <p className="truncate leading-snug font-semibold">{node.givenName}</p>
          <p className="truncate text-sm text-mist-600 dark:text-mist-300">
            {node.user ? getUserDisplayName(node.user) : t("machines.tagOwned")}
          </p>
        </Link>
        <MenuOptions
          existingTags={existingTags}
          isDisabled={isDisabled}
          magic={magic}
          node={node}
          supportsNodeOwnerChange={supportsNodeOwnerChange}
          users={users}
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {mapTagsToComponents(node, uiTags)}
        {node.tags?.map((tag) => (
          <Chip key={tag} text={tag} />
        ))}
      </div>

      <dl className="mt-3 grid gap-3 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-mist-500 dark:text-mist-400">{t("machines.addresses")}</dt>
          <dd className="flex min-w-0 items-center gap-2">
            <button
              className={cn(
                "flex min-w-0 items-center gap-1.5 rounded-md px-2 py-1",
                "text-mist-700 hover:bg-mist-100 dark:text-mist-200 dark:hover:bg-mist-800",
                "focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40 focus:ring-offset-1",
                "dark:focus:ring-indigo-400/40 dark:focus:ring-offset-mist-900",
              )}
              onClick={async () => {
                await navigator.clipboard.writeText(primaryIp);
                toast(t("machines.copiedIpAddress"));
              }}
              type="button"
            >
              <span className="truncate">{primaryIp}</span>
              <Copy className="size-3.5 shrink-0" />
            </button>
          </dd>
        </div>

        {isAgent !== undefined && (
          <div className="flex items-center justify-between gap-3">
            <dt className="text-mist-500 dark:text-mist-400">{t("machines.version")}</dt>
            <dd className="min-w-0 text-right">
              {node.hostInfo !== undefined ? (
                <>
                  <p>{hinfo.getTSVersion(node.hostInfo)}</p>
                  <p className="truncate text-xs text-mist-500 dark:text-mist-400">
                    {hinfo.getOSInfo(node.hostInfo)}
                  </p>
                </>
              ) : (
                <p className="text-mist-500 dark:text-mist-400">{t("common.unknown")}</p>
              )}
            </dd>
          </div>
        )}

        <div className="flex items-start justify-between gap-3">
          <dt className="text-mist-500 dark:text-mist-400">{t("machines.lastSeen")}</dt>
          <dd className="flex min-w-0 items-start gap-1.5 text-right">
            <StatusCircle
              className="mt-0.5 size-4 shrink-0"
              isOnline={node.online && !node.expired}
            />
            <div>
              <p className="text-mist-700 dark:text-mist-200" suppressHydrationWarning>
                {node.online && !node.expired
                  ? t("common.connected")
                  : new Date(node.lastSeen).toLocaleString()}
              </p>
              {!(node.online && !node.expired) && (
                <p className="text-xs text-mist-500 dark:text-mist-400" suppressHydrationWarning>
                  {formatTimeDelta(new Date(node.lastSeen))}
                </p>
              )}
            </div>
          </dd>
        </div>
      </dl>
    </article>
  );
}
