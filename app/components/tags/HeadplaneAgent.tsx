import { useI18n } from "~/i18n/context";
import cn from "~/utils/cn";

import Chip from "../chip";
import Tooltip from "../tooltip";

export function HeadplaneAgentTag() {
  const { t } = useI18n();
  return (
    <Tooltip content={t("machines.headplaneAgentTagTooltip")}>
      <Chip
        text={t("machines.headplaneAgentTag")}
        className={cn("bg-purple-300 text-purple-900 dark:bg-purple-900 dark:text-purple-300")}
      />
    </Tooltip>
  );
}
