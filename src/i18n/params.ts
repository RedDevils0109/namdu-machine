import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { localeHref } from "@/lib/links";

export interface LangParams {
  params: Promise<{ lang: string }>;
}

export async function resolveLang(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}

/** Canonical and hreflang links for a path that exists in every language. */
export function alternates(lang: Locale, path: string): Metadata["alternates"] {
  return {
    canonical: localeHref(lang, path),
    languages: Object.fromEntries(locales.map((locale) => [locale, localeHref(locale, path)])),
  };
}
