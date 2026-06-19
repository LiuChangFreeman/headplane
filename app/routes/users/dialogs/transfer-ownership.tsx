import Dialog, { DialogPanel } from "~/components/dialog";
import Notice from "~/components/notice";
import Text from "~/components/text";
import Title from "~/components/title";
import { useI18n } from "~/i18n/context";

interface TransferOwnershipProps {
  targetHeadplaneUserId: string;
  targetDisplayName: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function TransferOwnership({
  targetHeadplaneUserId,
  targetDisplayName,
  isOpen,
  setIsOpen,
}: TransferOwnershipProps) {
  const { t } = useI18n();

  return (
    <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
      <DialogPanel variant="destructive">
        <Title>{t("users.transferOwnershipTitle", { name: targetDisplayName })}</Title>
        <Text className="mb-6">
          {t("users.transferOwnershipBody", { name: targetDisplayName })}
        </Text>
        <Notice variant="warning">{t("users.transferOwnershipWarning")}</Notice>
        <input name="action_id" type="hidden" value="transfer_ownership" />
        <input name="headplane_user_id" type="hidden" value={targetHeadplaneUserId} />
      </DialogPanel>
    </Dialog>
  );
}
