import Dialog, { DialogPanel } from "~/components/dialog";
import Link from "~/components/link";
import Notice from "~/components/notice";
import RadioGroup from "~/components/radio-group";
import Text from "~/components/text";
import Title from "~/components/title";
import { useI18n } from "~/i18n/context";
import type { TranslationKey } from "~/i18n/translations";
import { Roles } from "~/server/web/roles";
import type { Role } from "~/server/web/roles";

interface ReassignProps {
  headplaneUserId: string;
  displayName: string;
  role: Role;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function ReassignUser({
  headplaneUserId,
  displayName,
  role,
  isOpen,
  setIsOpen,
}: ReassignProps) {
  const { t } = useI18n();

  return (
    <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
      <DialogPanel variant={role === "owner" ? "unactionable" : "normal"}>
        <Title>{t("users.changeRoleTitle", { name: displayName })}</Title>
        <Text className="mb-6">
          {t("users.roleHelpBody")}{" "}
          <Link external styled to="https://tailscale.com/kb/1138/user-roles">
            {t("common.learnMore")}
          </Link>
        </Text>
        {role === "owner" ? (
          <Notice>{t("users.ownerCannotReassign")}</Notice>
        ) : (
          <>
            <input name="action_id" type="hidden" value="reassign_user" />
            <input name="headplane_user_id" type="hidden" value={headplaneUserId} />
            <RadioGroup
              className="gap-4"
              defaultValue={role}
              label={t("common.role")}
              name="new_role"
            >
              {Object.keys(Roles)
                .filter((r) => r !== "owner")
                .map((r) => {
                  const { name, desc } = mapRoleToName(r, t);
                  return (
                    <RadioGroup.Radio key={r} label={name} value={r}>
                      <div className="block">
                        <p className="font-bold">{name}</p>
                        <p className="opacity-70">{desc}</p>
                      </div>
                    </RadioGroup.Radio>
                  );
                })}
            </RadioGroup>
          </>
        )}
      </DialogPanel>
    </Dialog>
  );
}

function mapRoleToName(
  role: string,
  t: (key: TranslationKey, params?: Record<string, string | number>) => string,
) {
  switch (role) {
    case "admin":
      return {
        name: t("users.admin"),
        desc: t("users.roleAdminDesc"),
      };
    case "network_admin":
      return {
        name: t("users.networkAdmin"),
        desc: t("users.roleNetworkAdminDesc"),
      };
    case "it_admin":
      return {
        name: t("users.itAdmin"),
        desc: t("users.roleItAdminDesc"),
      };
    case "auditor":
      return {
        name: t("users.auditor"),
        desc: t("users.roleAuditorDesc"),
      };
    case "viewer":
      return {
        name: t("users.viewer"),
        desc: t("users.roleViewerDesc"),
      };
    case "member":
      return {
        name: t("users.member"),
        desc: t("users.roleMemberDesc"),
      };
    default:
      return {
        name: role,
        desc: t("users.noRoleDescription"),
      };
  }
}
