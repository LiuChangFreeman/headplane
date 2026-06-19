import Card from "~/components/card";
import { useI18n } from "~/i18n/context";

export default function Logout() {
  const { t } = useI18n();

  return (
    <div className="flex min-h-dvh w-full items-center justify-center p-4">
      <Card className="max-w-md">
        <Card.Title>{t("login.loggedOutTitle")}</Card.Title>
        <Card.Text>{t("login.loggedOutBody")}</Card.Text>
      </Card>
    </div>
  );
}
