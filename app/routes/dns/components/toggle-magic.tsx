import Button from "~/components/button";
import Dialog, { DialogPanel } from "~/components/dialog";
import Text from "~/components/text";
import Title from "~/components/title";
import { useI18n } from "~/i18n/context";

interface Props {
  isEnabled: boolean;
  isDisabled: boolean;
}

export default function Modal({ isEnabled, isDisabled }: Props) {
  const { t } = useI18n();
  const title = isEnabled ? t("dns.magicDnsDisable") : t("dns.magicDnsEnable");

  return (
    <Dialog>
      <Button disabled={isDisabled}>{title}</Button>
      <DialogPanel isDisabled={isDisabled}>
        <Title>{title}</Title>
        <Text>{isEnabled ? t("dns.magicDnsDisableBody") : t("dns.magicDnsEnableBody")}</Text>
        <input type="hidden" name="action_id" value="toggle_magic" />
        <input type="hidden" name="new_state" value={isEnabled ? "disabled" : "enabled"} />
      </DialogPanel>
    </Dialog>
  );
}
