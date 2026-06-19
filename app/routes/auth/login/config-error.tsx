import { AlertCircle, CloudOff } from "lucide-react";

import Card from "~/components/card";
import Code from "~/components/code";
import Link from "~/components/link";
import { useI18n } from "~/i18n/context";
import type { TranslationKey } from "~/i18n/translations";
import type { OidcErrorCode } from "~/server/oidc/provider";

export function OidcDiscoveryFailedNotice() {
  const { t } = useI18n();

  return (
    <Card className="m-4 mb-4 max-w-md border border-yellow-500 sm:m-0 sm:mb-4">
      <div className="flex items-center justify-between gap-4">
        <Card.Title className="text-yellow-500">{t("login.oidcDiscoveryFailedTitle")}</Card.Title>
        <CloudOff className="mb-2 h-6 w-6 text-yellow-500" />
      </div>
      <Card.Text className="text-sm">{t("login.oidcDiscoveryFailedBody")}</Card.Text>
    </Card>
  );
}

export function OidcConfigErrorNotice({ errors }: { errors: OidcErrorCode[] }) {
  const { t } = useI18n();

  return (
    <Card className="m-4 mb-4 max-w-md border border-red-500 sm:m-0 sm:mb-4">
      <div className="flex items-center justify-between gap-4">
        <Card.Title className="text-red-500">{t("login.oidcAuthErrorTitle")}</Card.Title>
        <AlertCircle className="mb-2 h-6 w-6 text-red-500" />
      </div>
      <Card.Text className="text-sm">
        {t("login.oidcConfigErrorIntro")}{" "}
        <ul className="mt-2 mb-1 list-inside list-disc">
          {mapOidcErrorsToMessages(errors, t).map((code) => (
            <li key={code.key}>{code.node}</li>
          ))}
        </ul>{" "}
        <Link external styled to="https://headplane.net/features/sso#troubleshooting">
          {t("common.learnMore")}
        </Link>
      </Card.Text>
    </Card>
  );
}

function mapOidcErrorsToMessages(errors: OidcErrorCode[], t: (key: TranslationKey) => string) {
  const messages: {
    key: string;
    node: React.ReactNode;
  }[] = [];

  for (const error of errors) {
    switch (error) {
      case "invalid_api_key": {
        messages.push({
          key: error,
          node: (
            <Card.Text className="inline">
              {t("login.oidcInvalidApiKeyPrefix")} <Code>headscale.api_key</Code>{" "}
              {t("login.oidcInvalidApiKeySuffix")}
            </Card.Text>
          ),
        });
        break;
      }

      case "missing_endpoints": {
        messages.push({
          key: error,
          node: <Card.Text className="inline">{t("login.oidcMissingEndpoints")}</Card.Text>,
        });
        break;
      }

      case "discovery_failed": {
        messages.push({
          key: error,
          node: <Card.Text className="inline">{t("login.oidcDiscoveryFailedBody")}</Card.Text>,
        });
        break;
      }

      default: {
        messages.push({
          key: error,
          node: <Card.Text className="inline">{t("login.oidcUnknownConfigError")}</Card.Text>,
        });
        break;
      }
    }
  }

  return messages;
}
