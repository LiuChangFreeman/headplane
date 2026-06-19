import { Form } from "react-router";

import Button from "~/components/button";
import Card from "~/components/card";
import Input from "~/components/input";
import Link from "~/components/link";
import { useI18n } from "~/i18n/context";

interface UserPromptProps {
  hostname: string;
}

export default function UserPrompt({ hostname }: UserPromptProps) {
  const { t } = useI18n();

  return (
    <div className="flex h-screen items-center justify-center">
      <Card>
        <Card.Title>{t("ssh.enterUsername")}</Card.Title>
        <Card.Text className="mb-4">
          {t("ssh.promptBody", { hostname })}
          <br />
          <br />
          {t("ssh.troubleshootingPrefix")}{" "}
          <Link external styled to="https://headplane.net/features/ssh#troubleshooting">
            {t("ssh.troubleshootingGuide")}
          </Link>{" "}
          {t("ssh.troubleshootingSuffix")}
        </Card.Text>
        <Form
          method="GET"
          onSubmit={(e) => {
            const formData = new FormData(e.currentTarget);
            const username = formData.get("user");
            if (!username) {
              e.preventDefault();
              return;
            }

            // We have to do a full navigation, since the page needs a full
            // reload to initialize the SSH connection due to us disabling the
            // revalidator.
            const url = new URL(window.location.href);
            url.searchParams.set("user", username.toString());
            window.location.assign(url.toString());
          }}
        >
          <Input
            labelHidden
            type="text"
            label={t("common.username")}
            name="user"
            placeholder={t("common.username")}
            className="mb-2"
            required
          />
          <Button type="submit" variant="heavy" className="w-full">
            {t("ssh.connect")}
          </Button>
        </Form>
      </Card>
    </div>
  );
}
