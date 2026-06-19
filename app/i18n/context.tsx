import { createContext, useContext, useMemo } from "react";

import {
  defaultLocale,
  supportedLocales,
  translate,
  type Locale,
  type TranslationKey,
} from "./translations";

interface I18nContextValue {
  locale: Locale;
  supportedLocales: typeof supportedLocales;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue>({
  locale: defaultLocale,
  supportedLocales,
  t: (key, params) => translate(defaultLocale, key, params),
});

export function I18nProvider({
  children,
  locale,
}: {
  readonly children: React.ReactNode;
  readonly locale: Locale;
}) {
  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      supportedLocales,
      t: (key, params) => translate(locale, key, params),
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
