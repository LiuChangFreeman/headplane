import { type } from "arktype";

import Dialog, { DialogPanel } from "~/components/dialog";
import Input from "~/components/input";
import Text from "~/components/text";
import Title from "~/components/title";
import { useForm } from "~/hooks/use-form";
import { useI18n } from "~/i18n/context";
import type { Machine } from "~/types";

const renameSchema = type({
  name: "string > 0",
});

const dnsLabelPattern = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;

function validateMachineName(values: Record<string, unknown>) {
  const name = String(values.name ?? "").toLowerCase();
  if (!dnsLabelPattern.test(name)) {
    return {
      name: "machines.machineNameValidation",
    };
  }
}

interface RenameProps {
  machine: Machine;
  isOpen: boolean;
  magic?: string;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Rename({ machine, magic, isOpen, setIsOpen }: RenameProps) {
  const { t } = useI18n();
  const form = useForm({
    schema: renameSchema,
    defaultValues: { name: machine.givenName },
    validate: validateMachineName,
  });
  const nameField = form.field("name");
  const name = form.values.name as string;

  return (
    <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
      <DialogPanel isDisabled={!form.canSubmit}>
        <Title>{t("machines.renameTitle", { name: machine.givenName })}</Title>
        <Text className="mb-6">{t("machines.renameBody")}</Text>
        <input name="action_id" type="hidden" value="rename" />
        <input name="node_id" type="hidden" value={machine.id} />
        <Input
          {...nameField}
          errorMessage={
            nameField.errorMessage === "machines.machineNameValidation"
              ? t("machines.machineNameValidation")
              : nameField.errorMessage
          }
          required
          label={t("machines.machineName")}
          placeholder={t("machines.machineName")}
        />
        {magic ? (
          name.length > 0 && name !== machine.givenName ? (
            <p className="mt-2 text-sm leading-tight text-mist-600 dark:text-mist-300">
              {t("machines.hostnameWillChange", {
                newHostname: name.toLowerCase().replaceAll(/\s+/g, "-"),
                oldHostname: machine.givenName,
              })}
            </p>
          ) : (
            <p className="mt-2 text-sm leading-tight text-mist-600 dark:text-mist-300">
              {t("machines.hostnameAccessible", { hostname: machine.givenName })}
            </p>
          )
        ) : undefined}
      </DialogPanel>
    </Dialog>
  );
}
