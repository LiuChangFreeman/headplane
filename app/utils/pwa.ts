export const PWA_HOST = "head.byted.org.cn";
export const PWA_ICON_REV = "headplane-logo-20260619";

export function isPwaHost(request: Request) {
  return new URL(request.url).hostname.toLowerCase() === PWA_HOST;
}
