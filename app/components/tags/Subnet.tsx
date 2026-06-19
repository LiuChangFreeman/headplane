import { Info } from "lucide-react";

import { useI18n } from "~/i18n/context";
import cn from "~/utils/cn";

import Chip from "../chip";
import Tooltip from "../tooltip";

export interface SubnetTagProps {
  isEnabled?: boolean;
}

export function SubnetTag({ isEnabled }: SubnetTagProps) {
  const { t } = useI18n();
  return (
    <Tooltip
      content={
        isEnabled ? (
          <>{t("machines.subnetTagEnabledTooltip")}</>
        ) : (
          <>{t("machines.subnetTagPendingTooltip")}</>
        )
      }
    >
      <Chip
        text={t("machines.subnetsTag")}
        className={cn("bg-blue-300 text-blue-900 dark:bg-blue-900 dark:text-blue-300")}
        rightIcon={isEnabled ? undefined : <Info className="h-full w-fit" />}
      />
    </Tooltip>
  );
}
