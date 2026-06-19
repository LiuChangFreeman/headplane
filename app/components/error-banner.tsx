import { AlertCircle } from "lucide-react";
import { isRouteErrorResponse } from "react-router";

import { useI18n } from "~/i18n/context";
import type { TranslationKey } from "~/i18n/translations";
import { isApiError, isConnectionError } from "~/server/headscale/api/error-client";
import cn from "~/utils/cn";

import Card from "./card";
import Code from "./code";
import Link from "./link";

type Translator = (key: TranslationKey, params?: Record<string, string | number>) => string;

const rootErrorMessages: Record<string, TranslationKey> = {
  "dns.noConfigurationAvailable": "dns.noConfigurationAvailable",
  "dns.noViewAccess": "dns.noViewAccess",
  "No configuration is available": "dns.noConfigurationAvailable",
  "No machine ID provided": "error.noMachineId",
};

const routeErrorDataMessages: Record<string, TranslationKey> = {
  "settings.oidcNotConfigured": "settings.oidcNotConfigured",
  "OIDC is not configured on this Headscale instance.": "settings.oidcNotConfigured",
};

function translateRouteErrorData(data: unknown, t: Translator) {
  if (typeof data !== "string") {
    return String(data);
  }

  const key = routeErrorDataMessages[data];
  return key ? t(key) : data;
}

export function getErrorMessage(error: Error | unknown): {
  title: string;
  jsxMessage: React.ReactNode;
};
export function getErrorMessage(
  error: Error | unknown,
  t: Translator,
): {
  title: string;
  jsxMessage: React.ReactNode;
};
export function getErrorMessage(
  error: Error | unknown,
  t: Translator = (key, params) => {
    let value = key as string;
    if (params) {
      value = value.replace(/\{(\w+)\}/g, (match, name) =>
        params[name] === undefined ? match : String(params[name]),
      );
    }
    return value;
  },
): {
  title: string;
  jsxMessage: React.ReactNode;
} {
  if (isRouteErrorResponse(error)) {
    if (isApiError(error.data)) {
      const { statusCode, rawData, data, requestUrl } = error.data;
      if (statusCode >= 500) {
        return {
          jsxMessage: (
            <>
              <Card.Text>{t("error.headscaleApiBody", { statusCode })}</Card.Text>
              {(error.data.data != null || error.data.rawData != null) && (
                <pre className="mt-2 overflow-x-auto rounded-lg bg-mist-100 p-2 dark:bg-mist-800">
                  {error.data.data != null ? (
                    <code>{JSON.stringify(error.data.data, null, 2)}</code>
                  ) : (
                    <code>{error.data.rawData}</code>
                  )}
                </pre>
              )}
            </>
          ),
          title: t("error.headscaleApiTitle"),
        };
      }

      const authError = error.data.statusCode === 401 || error.data.statusCode === 403;

      return {
        jsxMessage: (
          <>
            <Card.Text className="leading-snug">
              {t("error.invalidApiBody")}
              {authError ? <> {t("error.authApiHint")}</> : <> {t("error.unsupportedApiHint")}</>}
            </Card.Text>
            <ul className="mt-2 list-inside list-disc">
              <li>
                {t("error.requestUrl")}: <Code>{requestUrl}</Code>
              </li>
              <li>
                {t("error.statusCode")}:{" "}
                <Code>
                  {/* @ts-expect-error */}
                  {data === null ? (
                    <>
                      {statusCode} {rawData}
                    </>
                  ) : (
                    <>
                      {statusCode} {error.statusText}
                    </>
                  )}
                </Code>
              </li>
            </ul>
            <Card.Text className="mt-4 text-lg font-semibold">{t("common.errorDetails")}</Card.Text>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-mist-100 p-2 dark:bg-mist-800">
              <code>{JSON.stringify(error.data, null, 2)}</code>
            </pre>
          </>
        ),
        title: t("error.invalidApiTitle"),
      };
    }

    if (isConnectionError(error.data)) {
      const { requestUrl, errorCode, errorMessage, extraData } = error.data;
      return {
        jsxMessage: (
          <>
            <Card.Text className="leading-snug">{t("error.cannotConnectBody")}</Card.Text>
            <Card.Text className="mt-4 text-lg font-semibold">{t("common.errorDetails")}</Card.Text>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-mist-100 p-2 dark:bg-mist-800">
              {requestUrl}
              <br />
              {errorCode}: {errorMessage}
              {extraData != null && (
                <>
                  <br />
                  <br />
                  <code>{JSON.stringify(extraData, null, 2)}</code>
                </>
              )}
            </pre>
          </>
        ),
        title: t("error.cannotConnectTitle"),
      };
    }

    return {
      jsxMessage: (
        <>
          {t("error.processingRequest")}
          <br />
          {t("error.statusCode")}: <strong>{error.status}</strong>
          <br />
          {t("error.statusText")}: <strong>{translateRouteErrorData(error.data, t)}</strong>
        </>
      ),
      title: t("error.genericTitle", { status: error.status }),
    };
  }

  if (!(error instanceof Error)) {
    return {
      jsxMessage: (
        <>
          <Card.Text>
            {t("error.unexpectedBody")}{" "}
            <Link external styled to="https://github.com/tale/headplane/issues">
              Headplane GitHub
            </Link>
          </Card.Text>
          <Card.Text className="mt-4 text-lg font-semibold">{t("common.errorDetails")}</Card.Text>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-mist-100 p-2 dark:bg-mist-800">
            <code>{JSON.stringify(error, null, 2)}</code>
          </pre>
        </>
      ),
      title: t("error.unexpectedTitle"),
    };
  }

  // Traverse the error chain to find the root cause
  let rootError = error;
  if (error.cause != null) {
    rootError = error.cause as Error;
    while (rootError.cause != null) {
      rootError = rootError.cause as Error;
    }
  }

  // TODO: If we are aggregate, concat into a single message
  if (rootError instanceof AggregateError) {
    throw new Error("AggregateError handling not implemented yet");
  }

  const translatedMessageKey = rootErrorMessages[rootError.message];
  if (translatedMessageKey) {
    return {
      jsxMessage: t(translatedMessageKey),
      title: t("common.error"),
    };
  }

  return {
    jsxMessage: rootError.message,
    title:
      rootError.name.length > 0 && rootError.name !== "Error"
        ? `${t("common.error")}: ${rootError.name}`
        : t("common.error"),
  };
}

interface ErrorBannerProps {
  error: unknown;
  className?: string;
}

export function ErrorBanner({ error, className }: ErrorBannerProps) {
  const { t } = useI18n();
  const { title, jsxMessage } = getErrorMessage(error, t);

  return (
    <Card className={cn("w-screen", className)} variant="flat">
      <div className="flex items-center justify-between gap-4">
        <Card.Title>{title}</Card.Title>
        <AlertCircle className="mb-2 h-6 w-6 text-red-500" />
      </div>
      {jsxMessage}
    </Card>
  );
}
