import Button from "~/components/button";
import Dialog, { DialogPanel } from "~/components/dialog";
import Input from "~/components/input";
import Text from "~/components/text";
import Title from "~/components/title";
import { useI18n } from "~/i18n/context";

interface CreateUserProps {
  isOidc?: boolean;
  isDisabled?: boolean;
}

export default function CreateUser({ isOidc, isDisabled }: CreateUserProps) {
  const { t } = useI18n();

  return (
    <Dialog>
      <Button disabled={isDisabled}>{t("users.addUser")}</Button>
      <DialogPanel>
        <Title>{t("users.createHeadscaleUser")}</Title>
        <Text className="mb-6">
          {isOidc ? t("users.createHeadscaleUserOidcBody") : t("users.createHeadscaleUserBody")}
        </Text>
        <input name="action_id" type="hidden" value="create_user" />
        <div className="flex flex-col gap-4">
          <Input
            required
            label={t("common.username")}
            name="username"
            placeholder="my-new-user"
            type="text"
          />
          <Input
            label={t("common.displayName")}
            name="display_name"
            placeholder="John Doe"
            type="text"
          />
          <Input
            label={t("common.email")}
            name="email"
            placeholder="name@example.com"
            type="email"
          />
        </div>
      </DialogPanel>
    </Dialog>
  );
}
