"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { cn } from "@/lib/cn";
import { contactHref, localeHref } from "@/lib/links";
import type { NavLink, SiteConfig } from "@/types";

interface MobileNavProps {
  lang: Locale;
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  site: SiteConfig;
  labels: Dictionary["common"];
  isActive: (href: string) => boolean;
}

export function MobileNav({ lang, open, onClose, links, site, labels, isActive }: MobileNavProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-nav"
      className={cn("fixed inset-0 z-50 overflow-hidden xl:hidden", open ? "visible pointer-events-auto" : "invisible pointer-events-none")}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-olive-950/50 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={labels.menu}
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-cream-50 shadow-lift transition-transform duration-300 ease-brand",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-18 items-center justify-between border-b border-cream-300 px-5">
          <Image src={site.logo.src} alt={site.logo.alt} width={180} height={40} className="h-9 w-auto" />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-11 items-center justify-center rounded-full hover:bg-olive-100"
            aria-label={labels.closeMenu}
          >
            <Icon name="close" className="size-6" />
          </button>
        </div>
        <nav aria-label={labels.mobileNav} className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={localeHref(lang, link.href)}
                  onClick={onClose}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-md px-4 py-3 text-base font-medium",
                    isActive(link.href) ? "bg-olive-100 text-olive-900" : "text-ink-700 hover:bg-olive-50",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-4 border-t border-cream-300 p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-ink-700">{labels.changeLanguage}</span>
            <LanguageSwitcher lang={lang} label={labels.changeLanguage} />
          </div>
          <a href={site.contact.phoneHref} className="flex items-center gap-2 text-ink-700">
            <Icon name="phone" className="size-5 text-olive-600" />
            {site.contact.phone}
          </a>
          <Button href={contactHref(lang)} variant="accent" className="w-full">
            {labels.requestQuote}
          </Button>
        </div>
      </div>
    </div>
  );
}
