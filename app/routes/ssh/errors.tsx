import { AlertCircle } from "lucide-react";

import Card from "~/components/card";
import Link from "~/components/link";
import { useI18n } from "~/i18n/context";
import type { TranslationKey } from "~/i18n/translations";

type SSHErrorCode =
  | "wasm_missing"
  | "agent_required"
  | "oidc_required"
  | "node_not_found"
  | "user_not_linked";

export const sshErrors = {
  wasm_missing: {
    code: "wasm_missing",
    anchor: "#ssh-not-available",
  },

  agent_required: {
    code: "agent_required",
    anchor: "#agent-required",
  },

  oidc_required: {
    code: "oidc_required",
    anchor: "#oidc-required",
  },

  node_not_found: (hostname: string) => ({
    code: "node_not_found",
    hostname,
    anchor: "#node-not-found",
  }),

  user_not_linked: {
    code: "user_not_linked",
    anchor: "#user-not-linked",
  },
} as const;

const sshErrorTitleKeys: Record<SSHErrorCode, TranslationKey> = {
  wasm_missing: "ssh.browserSshNotAvailable",
  agent_required: "ssh.agentRequired",
  oidc_required: "ssh.oidcRequired",
  node_not_found: "ssh.nodeNotFound",
  user_not_linked: "ssh.userNotLinked",
};

const sshErrorMessageKeys: Record<SSHErrorCode, TranslationKey> = {
  wasm_missing: "ssh.browserSshNotAvailableBody",
  agent_required: "ssh.agentRequiredBody",
  oidc_required: "ssh.oidcRequiredBody",
  node_not_found: "ssh.nodeNotFoundBody",
  user_not_linked: "ssh.userNotLinkedBody",
};

interface SSHErrorBoundaryProps {
  code: SSHErrorCode;
  hostname?: string;
  anchor: string;
}

export function isSSHError(error: unknown): error is SSHErrorBoundaryProps {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "anchor" in error &&
    typeof error.code === "string" &&
    error.code in sshErrorTitleKeys &&
    typeof error.anchor === "string"
  );
}

const DOCS_BASE = "https://headplane.net/features/ssh";

export function SSHErrorBoundary({ code, hostname, anchor }: SSHErrorBoundaryProps) {
  const { t } = useI18n();
  const params = hostname ? { hostname } : undefined;

  return (
    <Card className="w-screen" variant="flat">
      <div className="flex items-center justify-between gap-4">
        <Card.Title>{t(sshErrorTitleKeys[code], params)}</Card.Title>
        <AlertCircle className="mb-2 h-6 w-6 text-red-500" />
      </div>
      <Card.Text>
        {t(sshErrorMessageKeys[code], params)}
        <br />
        <br />
        <Link to={`${DOCS_BASE}${anchor}`} external styled>
          {t("ssh.browserSshDocs")}
        </Link>{" "}
      </Card.Text>
    </Card>
  );
}
