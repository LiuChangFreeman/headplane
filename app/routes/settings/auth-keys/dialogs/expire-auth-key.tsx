import Button from "~/components/button";
import Dialog, { DialogPanel } from "~/components/dialog";
import Text from "~/components/text";
import Title from "~/components/title";
import { useI18n } from "~/i18n/context";
import type { PreAuthKey, User } from "~/types";

interface ExpireAuthKeyProps {
  authKey: PreAuthKey;
  user: User;
}

export default function ExpireAuthKey({ authKey, user }: ExpireAuthKeyProps) {
  const { t } = useI18n();

  return (
    <Dialog>
      <Button variant="heavy">{t("authKeys.expireKey")}</Button>
      <DialogPanel variant="destructive">
        <Title>{t("authKeys.expireTitle")}</Title>
        <input name="action_id" type="hidden" value="expire_preauthkey" />
        <input name="user_id" type="hidden" value={user.id} />
        <input name="key_id" type="hidden" value={authKey.id} />
        <input name="key" type="hidden" value={authKey.key} />
        <Text>{t("authKeys.expireBody")}</Text>
      </DialogPanel>
    </Dialog>
  );
}
