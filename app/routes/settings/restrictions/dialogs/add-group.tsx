import { type } from "arktype";

import Button from "~/components/button";
import Dialog, { DialogPanel } from "~/components/dialog";
import Input from "~/components/input";
import Text from "~/components/text";
import Title from "~/components/title";
import { useForm } from "~/hooks/use-form";
import { useI18n } from "~/i18n/context";

const groupSchema = type({
  group: "string > 0",
});

interface AddGroupProps {
  groups: string[];
  isDisabled?: boolean;
}

export default function AddGroup({ groups, isDisabled }: AddGroupProps) {
  const { t } = useI18n();
  const form = useForm({
    schema: groupSchema,
    validate: (values) => {
      const group = (values.group as string).trim();
      if (group.length === 0) return undefined;

      if (groups.includes(group)) {
        return { group: t("settings.groupExists") };
      }

      return undefined;
    },
  });

  return (
    <Dialog>
      <Button disabled={isDisabled}>{t("settings.addGroup")}</Button>
      <DialogPanel>
        <Title>{t("settings.addGroup")}</Title>
        <Text className="mb-4">{t("settings.addGroupDescription")}</Text>
        <input name="action_id" type="hidden" value="add_group" />
        <Input
          {...form.field("group")}
          description={t("settings.groupDescription")}
          required
          label={t("common.group")}
          placeholder="admin"
        />
      </DialogPanel>
    </Dialog>
  );
}
