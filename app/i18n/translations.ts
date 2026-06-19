export const defaultLocale = "en";

export const supportedLocales = [
  { value: "en", label: "English", nativeLabel: "English" },
  { value: "zh-CN", label: "Simplified Chinese", nativeLabel: "简体中文" },
] as const;

export type Locale = (typeof supportedLocales)[number]["value"];

const en = {
  "common.actions": "Actions",
  "common.andThe": "and the",
  "common.apiKey": "API Key",
  "common.cancel": "Cancel",
  "common.close": "Close",
  "common.confirm": "Confirm",
  "common.clickToCopy": "Click to copy",
  "common.copiedToClipboard": "Copied to clipboard",
  "common.createdAt": "Created At",
  "common.debug": "Debug",
  "common.dismiss": "Dismiss",
  "common.error": "Error",
  "common.learnMore": "Learn more",
  "common.noResultsFound": "No results found.",
  "common.offline": "Offline",
  "common.online": "Online",
  "common.healthy": "Healthy",
  "common.never": "Never",
  "common.remove": "Remove",
  "common.role": "Role",
  "common.retry": "Retry",
  "common.status": "Status",
  "common.user": "User",
  "acls.discardChanges": "Discard Changes",
  "acls.editFile": "Edit file",
  "acls.guideLink": "Tailscale ACL guide",
  "acls.headscaleDocs": "Headscale docs",
  "acls.policyDescription":
    "The ACL file is used to define the access control rules for your network. You can find more information about the ACL file in the",
  "acls.previewChanges": "Preview changes",
  "acls.previewRules": "Preview rules",
  "acls.previewUnavailable":
    "Previewing rules is not available yet. This feature is still in development and is pretty complicated to implement. Hopefully I will be able to get to it soon.",
  "acls.readOnlyBody":
    "The ACL policy mode is most likely set to file in your Headscale configuration. This means that the ACL file cannot be edited through the web interface. In order to resolve this, you'll need to set policy.mode to database in your Headscale configuration.",
  "acls.readOnlyTitle": "Read-only ACL Policy",
  "acls.restrictedBody":
    "You do not have the necessary permissions to edit the Access Control List policy. Please contact your administrator to request access or to make changes to the ACL policy.",
  "acls.restrictedTitle": "ACL Policy restricted",
  "acls.save": "Save",
  "acls.tabsLabel": "ACL Editor",
  "acls.title": "Access Control List (ACL)",
  "acls.unknownUpdateError": "An unknown error occurred while trying to update the ACL policy.",
  "acls.updatedPolicy": "Updated policy",
  "authKeys.active": "Active",
  "authKeys.all": "All",
  "authKeys.description":
    "Headscale fully supports pre-authentication keys in order to easily add devices to your Tailnet. To learn more about using pre-authentication keys, visit the",
  "authKeys.ephemeral": "Ephemeral",
  "authKeys.manage": "Manage Auth Keys",
  "authKeys.missingBody":
    "An error occurred while fetching the authentication keys for the following users:",
  "authKeys.missingSuffix":
    "Their keys may not be listed correctly. Please check the server logs for more information.",
  "authKeys.missingTitle": "Missing authentication keys",
  "authKeys.noKeys": "No pre-auth keys have been created yet.",
  "authKeys.noMatch": "No pre-auth keys match the selected filters.",
  "authKeys.permissionsBody":
    "You do not have the necessary permissions to generate pre-auth keys. Please contact your administrator to request access or to generate a pre-auth key for you.",
  "authKeys.permissionsTitle": "Pre-auth key permissions restricted",
  "authKeys.reusable": "Reusable",
  "authKeys.selectStatus": "Select a status",
  "authKeys.selectUser": "Select a user",
  "authKeys.tagOnly": "Tag Only",
  "authKeys.title": "Pre-Auth Keys",
  "authKeys.usedExpired": "Used/Expired",
  "dns.magicDnsBody":
    "Automatically register domain names for each device on the tailnet. Devices will be accessible at",
  "dns.magicDnsBodySuffix": "when Magic DNS is enabled.",
  "dns.magicDnsTitle": "Magic DNS",
  "dns.noAccess": "Your permissions do not allow you to modify the DNS settings for this tailnet.",
  "dns.readOnly":
    "The Headscale configuration is read-only. You cannot make changes to the configuration",
  "footer.hideServerUrl": "Hide server URL",
  "footer.openSourcePrefix": "Headplane is free and open-source. Please consider",
  "footer.openSourceSuffix": "to support development.",
  "footer.showServerUrl": "Show server URL",
  "footer.sponsoring": "sponsoring",
  "home.accessNetworkBody":
    "You've successfully authenticated but don't have access to the dashboard. You can still connect to your Headscale network by installing Tailscale.",
  "home.accessNetworkTitle": "Access your network via Tailscale",
  "home.accountLinked": "Your account is linked to Headscale user {user}.",
  "home.needDashboardAccess":
    "Need access to the dashboard? Contact your administrator to request access.",
  "home.unlinkedAccount":
    "Your account isn't linked to a Headscale user. Ask your administrator to create one for you.",
  "home.viewScriptSource": "View script source",
  "layout.headscaleUnreachableBody":
    "Unable to connect to the Headscale server. Data shown may be stale and changes cannot be saved until the connection is restored.",
  "layout.headscaleUnreachableTitle": "Headscale Unreachable",
  "linkAccount.description":
    "Choose the Headscale user that should be linked to your Headplane account.",
  "linkAccount.help":
    "If you don't see your user listed, please contact your administrator. To automatically link new users in the future, ensure that the Headscale user has the same email address as the SSO identity.",
  "linkAccount.selectPlaceholder": "Select a user...",
  "linkAccount.submit": "Link account",
  "linkAccount.title": "Link your Headscale account",
  "locale.english": "English",
  "locale.language": "Language",
  "locale.simplifiedChinese": "Simplified Chinese",
  "login.configurationIssue": "Configuration Issue",
  "login.cookieWarning":
    "Headplane is configured to use secure cookies, but this site is being served over an insecure connection and login will not work correctly.",
  "login.enterApiKeyPrefix":
    "Enter an API key to authenticate with Headplane. You can generate one by running",
  "login.enterApiKeySuffix": "in your terminal.",
  "login.signIn": "Sign In",
  "login.singleSignOn": "Single Sign-On",
  "login.loggedOutBody":
    "You can now close this window. If you would like to log in again, please refresh the page.",
  "login.loggedOutTitle": "You have been logged out",
  "login.oidcAuthErrorTitle": "Authentication Error",
  "login.oidcConfigErrorIntro":
    "The OpenID Connect (OIDC) Single Sign-On (SSO) configuration has issues:",
  "login.oidcDiscoveryFailedBody":
    "Unable to reach the identity provider. Single Sign-On will be available once the provider is reachable again. You can still sign in with an API key.",
  "login.oidcDiscoveryFailedTitle": "SSO Temporarily Unavailable",
  "login.oidcErrorAuthFailed":
    "Authentication with the SSO provider failed. Please try again later. Headplane logs may provide more information.",
  "login.oidcErrorInvalidSession":
    "Unable to complete SSO login due to missing or invalid session data. Ensure that your Headplane cookie configuration is correct and that your browser is accepting cookies.",
  "login.oidcErrorNoQuery":
    "The SSO provider did not correctly redirect back to Headplane with the required parameters. Please ensure your SSO provider is configured correctly.",
  "login.oidcErrorNoSubPrefix":
    "The SSO provider did not return a valid user identifier. Please ensure your SSO provider is correctly configured to provide the",
  "login.oidcErrorNoSubSuffix": "claim.",
  "login.oidcErrorTitle": "Configuration Issue(s)",
  "login.oidcErrorUnknown":
    "An unknown error occurred during OIDC authentication. Please try again later.",
  "login.oidcInvalidApiKeyPrefix":
    "The provided API key for OIDC authentication is invalid. Ensure that",
  "login.oidcInvalidApiKeySuffix": "is a valid API key.",
  "login.oidcMissingEndpoints":
    "The OIDC provider is missing required endpoints. Ensure the discovery URL is correct or provide manual endpoint overrides in your configuration.",
  "login.oidcUnknownConfigError":
    "An unknown OIDC configuration error occurred. Please check the Headplane logs for more information.",
  "login.welcome": "Welcome to Headplane",
  "machines.addresses": "Addresses",
  "machines.clearSearch": "Clear search",
  "machines.description": "Manage the devices connected to your Tailnet.",
  "machines.lastSeen": "Last Seen",
  "machines.magicDnsTooltip":
    "Since MagicDNS is enabled, you can access devices based on their name and also at {domain}.",
  "machines.magicDnsTooltipPrefix":
    "Since MagicDNS is enabled, you can access devices based on their name and also at",
  "machines.name": "Name",
  "machines.noMachinesMatch": "No machines match your filters.",
  "machines.searchLabel": "Search machines",
  "machines.searchPlaceholder": "Search by name or IP address...",
  "machines.showingCount": "Showing {shown} of {total} machines",
  "machines.sortByIp": "Sort by IP address",
  "machines.sortByLastSeen": "Sort by last seen",
  "machines.sortByName": "Sort by name",
  "machines.sortByVersion": "Sort by version",
  "machines.totalCount": "{count} machines",
  "machines.title": "Machines",
  "machines.version": "Version",
  "nav.accessControl": "Access Control",
  "nav.dns": "DNS",
  "nav.docs": "Docs",
  "nav.download": "Download",
  "nav.logout": "Logout",
  "nav.machines": "Machines",
  "nav.settings": "Settings",
  "nav.users": "Users",
  "pageError.unavailableBody":
    "This page could not be loaded because the Headscale server is unreachable. It will be available once the connection is restored.",
  "pageError.unavailableTitle": "{page} Unavailable",
  "settings.agentBody":
    "The Headplane Agent syncs node information like OS version and connectivity details from your Tailnet.",
  "settings.agentNotEnabled": "Agent Not Enabled",
  "settings.agentSettings": "Agent Settings",
  "settings.agentTitle": "Headplane Agent",
  "settings.agentSetupDocs": "documentation",
  "settings.agentSetupPrefix": "To learn how to set up the agent, visit the",
  "settings.authRestrictionsBody":
    "Headscale supports restricting OIDC authentication to only allow certain email domains, groups, or users to authenticate. This can be used to limit access to your Tailnet to only certain users or groups and Headplane will also respect these settings when authenticating.",
  "settings.authRestrictionsLockedBody":
    "The Headscale configuration file is not editable through the web interface. Please ensure that you have correctly given Headplane write access to the file.",
  "settings.authRestrictionsLockedTitle": "Configuration Locked",
  "settings.authRestrictionsNoticeBody":
    "You do not have the necessary permissions to edit the Authentication Restrictions settings. Please contact your administrator to request access or to make changes to these settings.",
  "settings.authRestrictionsNoticeTitle": "Authentication permissions restricted",
  "settings.authRestrictionsTitle": "Authentication Restrictions",
  "settings.description":
    "The settings page is still under construction. As I'm able to add more features, I'll be adding them here. If you require any features, feel free to open an issue on the GitHub repository.",
  "settings.manageRestrictions": "Manage Restrictions",
  "settings.title": "Settings",
  "settings.tailscaleDocs": "Tailscale documentation",
  "settings.lastSynced": "Last synced:",
  "settings.nodesSynced": "Nodes synced:",
  "settings.permittedDomains": "Permitted Domains",
  "settings.permittedGroups": "Permitted Groups",
  "settings.permittedUsers": "Permitted Users",
  "settings.allDomainsPermitted": "All domains are permitted to authenticate.",
  "settings.allGroupsPermitted": "All groups are permitted to authenticate.",
  "settings.allUsersPermitted": "All users are permitted to authenticate.",
  "settings.syncError": "Sync Error",
  "settings.syncNow": "Sync Now",
  "settings.syncing": "Syncing...",
  "theme.dark": "Dark",
  "theme.light": "Light",
  "theme.system": "System",
  "users.apiError":
    "Could not connect to the Headscale API. Headscale user data and machine information are unavailable.",
  "users.description": "Manage the users in your network and their permissions.",
  "users.headplaneUsers": "Headplane Users",
  "users.lastLogin": "Last Login",
  "users.noHeadplaneUsers": "No users have signed into Headplane yet.",
  "users.title": "Users",
  "users.unlinkedDescription":
    "These Headscale users are not linked to a Headplane account and cannot be managed through Headplane.",
  "users.unlinkedHeadscaleUsers": "Unlinked Headscale Users",
} as const;

export type TranslationKey = keyof typeof en;

const zhCN: Record<TranslationKey, string> = {
  "common.actions": "操作",
  "common.andThe": "以及",
  "common.apiKey": "API 密钥",
  "common.cancel": "取消",
  "common.close": "关闭",
  "common.confirm": "确认",
  "common.clickToCopy": "点击复制",
  "common.copiedToClipboard": "已复制到剪贴板",
  "common.createdAt": "创建时间",
  "common.debug": "调试",
  "common.dismiss": "关闭",
  "common.error": "错误",
  "common.learnMore": "了解更多",
  "common.noResultsFound": "未找到结果。",
  "common.offline": "离线",
  "common.online": "在线",
  "common.healthy": "健康",
  "common.never": "从未",
  "common.remove": "移除",
  "common.role": "角色",
  "common.retry": "重试",
  "common.status": "状态",
  "common.user": "用户",
  "acls.discardChanges": "放弃更改",
  "acls.editFile": "编辑文件",
  "acls.guideLink": "Tailscale ACL 指南",
  "acls.headscaleDocs": "Headscale 文档",
  "acls.policyDescription": "ACL 文件用于定义网络访问控制规则。你可以在这里了解更多信息：",
  "acls.previewChanges": "预览更改",
  "acls.previewRules": "预览规则",
  "acls.previewUnavailable": "规则预览暂不可用。这个功能仍在开发中，实现起来也比较复杂。",
  "acls.readOnlyBody":
    "ACL 策略模式很可能在 Headscale 配置中设置为 file，这意味着无法通过 Web 界面编辑 ACL 文件。要解决这个问题，请将 Headscale 配置中的 policy.mode 设置为 database。",
  "acls.readOnlyTitle": "ACL 策略只读",
  "acls.restrictedBody":
    "你没有编辑访问控制列表策略的权限。请联系管理员申请权限或让管理员修改 ACL 策略。",
  "acls.restrictedTitle": "ACL 策略受限",
  "acls.save": "保存",
  "acls.tabsLabel": "ACL 编辑器",
  "acls.title": "访问控制列表 (ACL)",
  "acls.unknownUpdateError": "更新 ACL 策略时发生未知错误。",
  "acls.updatedPolicy": "策略已更新",
  "authKeys.active": "有效",
  "authKeys.all": "全部",
  "authKeys.description":
    "Headscale 完整支持预认证密钥，便于快速向 Tailnet 添加设备。要了解预认证密钥的用法，请查看",
  "authKeys.ephemeral": "临时",
  "authKeys.manage": "管理认证密钥",
  "authKeys.missingBody": "获取以下用户的认证密钥时发生错误：",
  "authKeys.missingSuffix": "这些密钥可能没有正确列出。请检查服务器日志获取更多信息。",
  "authKeys.missingTitle": "认证密钥缺失",
  "authKeys.noKeys": "还没有创建预认证密钥。",
  "authKeys.noMatch": "没有匹配当前筛选条件的预认证密钥。",
  "authKeys.permissionsBody":
    "你没有生成预认证密钥的权限。请联系管理员申请权限，或让管理员为你生成预认证密钥。",
  "authKeys.permissionsTitle": "预认证密钥权限受限",
  "authKeys.reusable": "可复用",
  "authKeys.selectStatus": "选择状态",
  "authKeys.selectUser": "选择用户",
  "authKeys.tagOnly": "仅标签",
  "authKeys.title": "预认证密钥",
  "authKeys.usedExpired": "已使用/已过期",
  "dns.magicDnsBody": "为 Tailnet 中的每台设备自动注册域名。启用 Magic DNS 后，设备可通过",
  "dns.magicDnsBodySuffix": "访问。",
  "dns.magicDnsTitle": "Magic DNS",
  "dns.noAccess": "你的权限不允许修改此 Tailnet 的 DNS 设置。",
  "dns.readOnly": "Headscale 配置为只读，无法修改配置。",
  "footer.hideServerUrl": "隐藏服务器 URL",
  "footer.openSourcePrefix": "Headplane 是自由开源软件。欢迎考虑",
  "footer.openSourceSuffix": "来支持开发。",
  "footer.showServerUrl": "显示服务器 URL",
  "footer.sponsoring": "赞助",
  "home.accessNetworkBody":
    "你已成功认证，但没有访问仪表盘的权限。你仍然可以安装 Tailscale 来连接到 Headscale 网络。",
  "home.accessNetworkTitle": "通过 Tailscale 访问你的网络",
  "home.accountLinked": "你的账号已关联到 Headscale 用户 {user}。",
  "home.needDashboardAccess": "需要访问仪表盘？请联系管理员申请权限。",
  "home.unlinkedAccount": "你的账号尚未关联 Headscale 用户。请让管理员为你创建一个用户。",
  "home.viewScriptSource": "查看脚本源码",
  "layout.headscaleUnreachableBody":
    "无法连接到 Headscale 服务器。当前显示的数据可能已过期，在连接恢复前无法保存更改。",
  "layout.headscaleUnreachableTitle": "无法访问 Headscale",
  "linkAccount.description": "选择要关联到你 Headplane 账号的 Headscale 用户。",
  "linkAccount.help":
    "如果列表中没有你的用户，请联系管理员。若要以后自动关联新用户，请确保 Headscale 用户的邮箱地址与 SSO 身份一致。",
  "linkAccount.selectPlaceholder": "选择用户...",
  "linkAccount.submit": "关联账号",
  "linkAccount.title": "关联你的 Headscale 账号",
  "locale.english": "英语",
  "locale.language": "语言",
  "locale.simplifiedChinese": "简体中文",
  "login.configurationIssue": "配置问题",
  "login.cookieWarning":
    "Headplane 已配置为使用安全 Cookie，但当前站点通过非安全连接提供服务，登录可能无法正常工作。",
  "login.enterApiKeyPrefix": "输入 API 密钥以登录 Headplane。你可以在终端运行",
  "login.enterApiKeySuffix": "来生成密钥。",
  "login.signIn": "登录",
  "login.singleSignOn": "单点登录",
  "login.loggedOutBody": "现在可以关闭此窗口。如果想重新登录，请刷新页面。",
  "login.loggedOutTitle": "你已退出登录",
  "login.oidcAuthErrorTitle": "认证错误",
  "login.oidcConfigErrorIntro": "OpenID Connect (OIDC) 单点登录 (SSO) 配置存在问题：",
  "login.oidcDiscoveryFailedBody":
    "无法连接到身份提供方。提供方恢复可达后，单点登录会重新可用。你仍然可以使用 API 密钥登录。",
  "login.oidcDiscoveryFailedTitle": "SSO 暂时不可用",
  "login.oidcErrorAuthFailed": "SSO 提供方认证失败。请稍后重试，Headplane 日志可能包含更多信息。",
  "login.oidcErrorInvalidSession":
    "由于会话数据缺失或无效，无法完成 SSO 登录。请确认 Headplane Cookie 配置正确，并且浏览器允许 Cookie。",
  "login.oidcErrorNoQuery":
    "SSO 提供方没有带着必需参数正确跳转回 Headplane。请确认 SSO 提供方配置正确。",
  "login.oidcErrorNoSubPrefix":
    "SSO 提供方没有返回有效的用户标识。请确认 SSO 提供方已正确配置并提供",
  "login.oidcErrorNoSubSuffix": "声明。",
  "login.oidcErrorTitle": "配置问题",
  "login.oidcErrorUnknown": "OIDC 认证期间发生未知错误。请稍后重试。",
  "login.oidcInvalidApiKeyPrefix": "用于 OIDC 认证的 API 密钥无效。请确认",
  "login.oidcInvalidApiKeySuffix": "是有效的 API 密钥。",
  "login.oidcMissingEndpoints":
    "OIDC 提供方缺少必需端点。请确认发现 URL 正确，或在配置中提供手动端点覆盖。",
  "login.oidcUnknownConfigError": "发生未知 OIDC 配置错误。请检查 Headplane 日志获取更多信息。",
  "login.welcome": "欢迎使用 Headplane",
  "machines.addresses": "地址",
  "machines.clearSearch": "清除搜索",
  "machines.description": "管理连接到 Tailnet 的设备。",
  "machines.lastSeen": "最后在线",
  "machines.magicDnsTooltip": "MagicDNS 已启用，你可以通过设备名称访问设备，也可以访问 {domain}。",
  "machines.magicDnsTooltipPrefix": "MagicDNS 已启用，你可以通过设备名称访问设备，也可以访问",
  "machines.name": "名称",
  "machines.noMachinesMatch": "没有匹配筛选条件的设备。",
  "machines.searchLabel": "搜索设备",
  "machines.searchPlaceholder": "按名称或 IP 地址搜索...",
  "machines.showingCount": "显示 {shown} / {total} 台设备",
  "machines.sortByIp": "按 IP 地址排序",
  "machines.sortByLastSeen": "按最后在线排序",
  "machines.sortByName": "按名称排序",
  "machines.sortByVersion": "按版本排序",
  "machines.totalCount": "{count} 台设备",
  "machines.title": "设备",
  "machines.version": "版本",
  "nav.accessControl": "访问控制",
  "nav.dns": "DNS",
  "nav.docs": "文档",
  "nav.download": "下载",
  "nav.logout": "退出登录",
  "nav.machines": "设备",
  "nav.settings": "设置",
  "nav.users": "用户",
  "pageError.unavailableBody":
    "由于 Headscale 服务器不可访问，此页面无法加载。连接恢复后页面会重新可用。",
  "pageError.unavailableTitle": "{page} 不可用",
  "settings.agentBody": "Headplane Agent 会从你的 Tailnet 同步节点操作系统版本和连接详情等信息。",
  "settings.agentNotEnabled": "Agent 未启用",
  "settings.agentSettings": "Agent 设置",
  "settings.agentTitle": "Headplane Agent",
  "settings.agentSetupDocs": "文档",
  "settings.agentSetupPrefix": "要了解如何设置 Agent，请查看",
  "settings.authRestrictionsBody":
    "Headscale 支持限制 OIDC 认证，只允许特定邮箱域、用户组或用户登录。它可以将 Tailnet 访问限制在指定用户或组内，Headplane 也会在认证时遵守这些设置。",
  "settings.authRestrictionsLockedBody":
    "Headscale 配置文件无法通过 Web 界面编辑。请确认你已经正确授予 Headplane 文件写入权限。",
  "settings.authRestrictionsLockedTitle": "配置已锁定",
  "settings.authRestrictionsNoticeBody":
    "你没有编辑认证限制设置的权限。请联系管理员申请权限或让管理员修改这些设置。",
  "settings.authRestrictionsNoticeTitle": "认证权限受限",
  "settings.authRestrictionsTitle": "认证限制",
  "settings.description":
    "设置页仍在建设中。后续功能会逐步添加到这里。如果你需要某些功能，欢迎在 GitHub 仓库中提交 issue。",
  "settings.manageRestrictions": "管理限制",
  "settings.title": "设置",
  "settings.tailscaleDocs": "Tailscale 文档",
  "settings.lastSynced": "最后同步：",
  "settings.nodesSynced": "已同步节点：",
  "settings.permittedDomains": "允许的域名",
  "settings.permittedGroups": "允许的用户组",
  "settings.permittedUsers": "允许的用户",
  "settings.allDomainsPermitted": "所有域名均允许认证。",
  "settings.allGroupsPermitted": "所有用户组均允许认证。",
  "settings.allUsersPermitted": "所有用户均允许认证。",
  "settings.syncError": "同步错误",
  "settings.syncNow": "立即同步",
  "settings.syncing": "同步中...",
  "theme.dark": "深色",
  "theme.light": "浅色",
  "theme.system": "跟随系统",
  "users.apiError": "无法连接到 Headscale API。Headscale 用户数据和设备信息暂不可用。",
  "users.description": "管理网络中的用户及其权限。",
  "users.headplaneUsers": "Headplane 用户",
  "users.lastLogin": "最后登录",
  "users.noHeadplaneUsers": "还没有用户登录过 Headplane。",
  "users.title": "用户",
  "users.unlinkedDescription":
    "这些 Headscale 用户尚未关联到 Headplane 账号，因此无法通过 Headplane 管理。",
  "users.unlinkedHeadscaleUsers": "未关联的 Headscale 用户",
};

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  en,
  "zh-CN": zhCN,
};

export function isValidLocale(value: unknown): value is Locale {
  return typeof value === "string" && value in translations;
}

export function translate(
  locale: Locale,
  key: TranslationKey,
  params?: Record<string, string | number>,
) {
  const template = translations[locale]?.[key] ?? translations[defaultLocale][key] ?? key;

  if (!params) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (match, name) =>
    params[name] === undefined ? match : String(params[name]),
  );
}
