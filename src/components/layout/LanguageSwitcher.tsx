"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { localeLabels, locales, LOCALE_STORAGE_KEY, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

interface LanguageSwitcherProps {
  lang: Locale;
  label: string;
  tone?: "default" | "compact";
}

function swapLocale(pathname: string, target: Locale, query: string): string {
  const segments = pathname.split("/");
  segments[1] = target;
  const path = segments.join("/") || `/${target}`;
  return query ? `${path}?${query}` : path;
}

function remember(target: Locale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, target);
  } catch {
    // Storage can be blocked; the switch still works through the link itself.
  }
}

function Options({ lang, label, tone = "default", query }: LanguageSwitcherProps & { query: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label={label}>
      <ul
        className={cn(
          "flex items-center rounded-full bg-olive-100 p-1 ring-1 ring-inset ring-olive-200",
          tone === "compact" ? "text-xs" : "text-sm",
        )}
      >
        {locales.map((locale) => {
          const active = locale === lang;
          return (
            <li key={locale}>
              <a
                href={swapLocale(pathname, locale, query)}
                hrefLang={locale}
                lang={locale}
                title={localeLabels[locale].name}
                aria-current={active ? "true" : undefined}
                onClick={() => remember(locale)}
                className={cn(
                  "inline-flex h-8 min-w-10 items-center justify-center rounded-full px-3 font-semibold transition-colors",
                  active ? "bg-olive-700 text-cream-50 shadow-soft" : "text-olive-800 hover:bg-olive-200",
                )}
              >
                <span aria-hidden>{localeLabels[locale].short}</span>
                <span className="sr-only">{localeLabels[locale].name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function WithQuery(props: LanguageSwitcherProps) {
  const query = useSearchParams().toString();
  return <Options {...props} query={query} />;
}

/** EN / VI toggle that keeps the current page and query string when switching language. */
export function LanguageSwitcher(props: LanguageSwitcherProps) {
  return (
    <Suspense fallback={<Options {...props} query="" />}>
      <WithQuery {...props} />
    </Suspense>
  );
}
