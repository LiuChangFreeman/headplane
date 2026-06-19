import { useI18n } from "~/i18n/context";
import cn from "~/utils/cn";

import Chip from "../chip";
import Tooltip from "../tooltip";

export function TailscaleSSHTag() {
  const { t } = useI18n();
  return (
    <Tooltip content={t("machines.tailscaleSshTagTooltip")}>
      <Chip
        text={t("machines.tailscaleSshTag")}
        className={cn("bg-lime-500 text-lime-900 dark:bg-lime-900 dark:text-lime-500")}
      />
    </Tooltip>
  );
}
