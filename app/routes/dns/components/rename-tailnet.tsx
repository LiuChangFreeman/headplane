import Button from "~/components/button";
import Dialog, { DialogPanel } from "~/components/dialog";
import Input from "~/components/input";
import Text from "~/components/text";
import Title from "~/components/title";
import { useI18n } from "~/i18n/context";

interface Props {
  name: string;
  isDisabled: boolean;
}

export default function RenameTailnet({ name, isDisabled }: Props) {
  const { t } = useI18n();

  return (
    <div className="flex w-full flex-col gap-y-4 sm:w-2/3">
      <h1 className="mb-2 text-2xl font-medium">{t("dns.tailnetName")}</h1>
      <p>{t("dns.tailnetNameDescription", { domain: `[device].${name}` })}</p>
      <Input
        className="w-3/5 text-sm font-medium"
        readOnly
        label={t("dns.tailnetName")}
        labelHidden
        onFocus={(event) => {
          (event.target as HTMLInputElement).select();
        }}
        value={name}
      />
      <Dialog>
        <Button disabled={isDisabled}>{t("dns.renameTailnet")}</Button>
        <DialogPanel isDisabled={isDisabled}>
          <Title>{t("dns.renameTailnet")}</Title>
          <Text className="mb-8">{t("dns.renameTailnetBody")}</Text>
          <input name="action_id" type="hidden" value="rename_tailnet" />
          <Input
            defaultValue={name}
            required
            label={t("dns.tailnetName")}
            name="new_name"
            placeholder="ts.net"
          />
        </DialogPanel>
      </Dialog>
    </div>
  );
}
