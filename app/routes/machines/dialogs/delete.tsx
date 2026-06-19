import { useNavigate } from "react-router";

import Dialog, { DialogPanel } from "~/components/dialog";
import Text from "~/components/text";
import Title from "~/components/title";
import { useI18n } from "~/i18n/context";
import type { Machine } from "~/types";

interface DeleteProps {
  machine: Machine;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Delete({ machine, isOpen, setIsOpen }: DeleteProps) {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
      <DialogPanel onSubmit={() => navigate("/machines")} variant="destructive">
        <Title>{t("machines.deleteTitle", { name: machine.givenName })}</Title>
        <Text>{t("machines.deleteBody")}</Text>
        <input name="action_id" type="hidden" value="delete" />
        <input name="node_id" type="hidden" value={machine.id} />
      </DialogPanel>
    </Dialog>
  );
}
