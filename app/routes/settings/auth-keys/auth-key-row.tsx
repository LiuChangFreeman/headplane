import Attribute from "~/components/attribute";
import { useI18n } from "~/i18n/context";
import type { PreAuthKey, User } from "~/types";
import { getUserDisplayName } from "~/utils/user";

import ExpireAuthKey from "./dialogs/expire-auth-key";

interface Props {
  authKey: PreAuthKey;
  user: User | null;
}

export default function AuthKeyRow({ authKey, user }: Props) {
  const { t } = useI18n();
  const createdAt = new Date(authKey.createdAt).toLocaleString();
  const expiration = new Date(authKey.expiration).toLocaleString();
  const isExpired =
    (authKey.used && !authKey.reusable) || new Date(authKey.expiration) < new Date();
  const userDisplay = user ? getUserDisplayName(user) : t("authKeys.tagOnlyDisplay");

  return (
    <div className="w-full">
      <Attribute name={t("common.key")} value={authKey.key} />
      <Attribute name={t("common.user")} value={userDisplay} />
      <Attribute
        name={t("authKeys.reusable")}
        value={authKey.reusable ? t("common.yes") : t("common.no")}
      />
      <Attribute
        name={t("authKeys.ephemeral")}
        value={authKey.ephemeral ? t("common.yes") : t("common.no")}
      />
      <Attribute
        name={t("authKeys.used")}
        value={authKey.used ? t("common.yes") : t("common.no")}
      />
      <Attribute name={t("common.created")} value={createdAt} />
      <Attribute name={t("common.expiration")} value={expiration} />
      {!isExpired && user && (
        <div className="mt-2" suppressHydrationWarning>
          <ExpireAuthKey authKey={authKey} user={user} />
        </div>
      )}
    </div>
  );
}
