export const locales = ["en", "vi"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, { short: string; name: string }> = {
  en: { short: "EN", name: "English" },
  vi: { short: "VI", name: "Tiếng Việt" },
};

/** localStorage key the root redirect page reads to reopen the visitor's last language. */
export const LOCALE_STORAGE_KEY = "namdu-locale";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
