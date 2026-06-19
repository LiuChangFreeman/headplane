import Dialog, { DialogPanel } from "~/components/dialog";
import Input from "~/components/input";
import Text from "~/components/text";
import Title from "~/components/title";
import { useI18n } from "~/i18n/context";
import { User } from "~/types";

interface RenameProps {
  user: User;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// TODO: Server side validation before submitting
export default function RenameUser({ user, isOpen, setIsOpen }: RenameProps) {
  const { t } = useI18n();
  const displayName = user.name || user.displayName || user.id;

  return (
    <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
      <DialogPanel>
        <Title>{t("users.renameTitle", { name: displayName })}</Title>
        <Text className="mb-6">{t("users.renameBody", { name: displayName })}</Text>
        <input name="action_id" type="hidden" value="rename_user" />
        <input name="headscale_user_id" type="hidden" value={user.id} />
        <Input
          defaultValue={user.name}
          required
          label={t("common.username")}
          name="new_name"
          placeholder="my-new-name"
        />
      </DialogPanel>
    </Dialog>
  );
}
