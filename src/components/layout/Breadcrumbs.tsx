import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { cn } from "@/lib/cn";
import { localeHref } from "@/lib/links";

export interface Crumb {
  label: string;
  /** Path without the language prefix, e.g. "/products". */
  href?: string;
}

interface BreadcrumbsProps {
  lang: Locale;
  items: Crumb[];
  tone?: "dark" | "light";
}

export function Breadcrumbs({ lang, items, tone = "dark" }: BreadcrumbsProps) {
  const dict = getDictionary(lang);
  const all: Crumb[] = [{ label: dict.common.home, href: "/" }, ...items];
  return (
    <nav aria-label={dict.common.breadcrumb} className="relative z-10">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-2 text-sm",
          tone === "light" ? "text-olive-200" : "text-ink-500",
        )}
      >
        {all.map((crumb, index) => {
          const last = index === all.length - 1;
          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
              {crumb.href && !last ? (
                <Link
                  href={localeHref(lang, crumb.href)}
                  className={cn(
                    "inline-block py-1 transition-colors hover:underline touch-manipulation",
                    tone === "light" ? "hover:text-cream-50" : "hover:text-olive-800",
                  )}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={cn("inline-block py-1 font-medium", tone === "light" ? "text-cream-50" : "text-olive-900")}
                >
                  {crumb.label}
                </span>
              )}
              {!last && <span aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
