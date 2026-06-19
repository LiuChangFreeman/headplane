import { createCookie } from "react-router";

import { defaultLocale, isValidLocale, type Locale } from "~/i18n/translations";

let cookie = createCookie("locale", {
  maxAge: 34560000,
  sameSite: "lax",
});

export async function getLocale(request: Request): Promise<Locale> {
  const header = request.headers.get("Cookie");
  const vals = await cookie.parse(header);

  if (isValidLocale(vals?.locale)) {
    return vals.locale;
  }

  const accepted = request.headers.get("Accept-Language") ?? "";
  if (accepted.toLowerCase().includes("zh")) {
    return "zh-CN";
  }

  return defaultLocale;
}

export function setLocale(locale: Locale) {
  return cookie.serialize({ locale });
}
