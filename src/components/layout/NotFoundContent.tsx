"use client";

import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { localeHref } from "@/lib/links";

export function NotFoundContent({ labels }: { labels: Record<Locale, Dictionary["notFound"]> }) {
  const segment = usePathname().split("/")[1] ?? "";
  const lang = isLocale(segment) ? segment : defaultLocale;
  const text = labels[lang];

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-7xl font-extrabold text-olive-300">404</p>
      <h1 className="mt-4 text-3xl font-bold">{text.title}</h1>
      <p className="mt-3 max-w-md text-ink-700">{text.text}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href={localeHref(lang, "/")}>{text.backHome}</Button>
        <Button href={localeHref(lang, "/products")} variant="outline">
          {text.browse}
        </Button>
      </div>
    </Container>
  );
}
