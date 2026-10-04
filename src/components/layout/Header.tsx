"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileNav } from "@/components/layout/MobileNav";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { cn } from "@/lib/cn";
import { contactHref, localeHref } from "@/lib/links";
import type { NavLink, SiteConfig } from "@/types";

interface HeaderProps {
  lang: Locale;
  site: SiteConfig;
  links: NavLink[];
  labels: Dictionary["common"];
}

/** Path without the language prefix or trailing slash, e.g. "/vi/products/" -> "/products". */
function stripLocale(pathname: string, lang: Locale): string {
  const rest = pathname.replace(new RegExp(`^/${lang}(?=/|$)`), "").replace(/\/$/, "");
  return rest || "/";
}

function isActive(path: string, href: string) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

export function Header({ lang, site, links, labels }: HeaderProps) {
  const path = stripLocale(usePathname(), lang);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = useCallback(() => setOpen(false), [setOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-colors duration-300",
          scrolled
            ? "border-cream-300 bg-cream-50/95 shadow-soft backdrop-blur"
            : "border-transparent bg-cream-100",
        )}
      >
        <div className="hidden bg-olive-900 text-sm text-olive-100 md:block">
          <Container className="flex h-9 items-center justify-between gap-6">
            <p className="truncate">{site.tagline}</p>
            <div className="flex shrink-0 items-center gap-5">
              <a href={site.contact.phoneHref} className="flex items-center gap-1.5 hover:text-cream-50">
                <Icon name="phone" className="size-4" />
                {site.contact.phone}
              </a>
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-1.5 hover:text-cream-50">
                <Icon name="mail" className="size-4" />
                {site.contact.email}
              </a>
            </div>
          </Container>
        </div>
  
        <Container className="flex h-18 items-center justify-between gap-4">
          <Link href={localeHref(lang, "/")} className="shrink-0" aria-label={`${site.companyName} - ${labels.home}`}>
            <Image src={site.logo.src} alt={site.logo.alt} width={180} height={40} priority className="h-10 w-auto" />
          </Link>
  
          <nav aria-label={labels.mainNav} className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {links.map((link) => {
                const active = isActive(path, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={localeHref(lang, link.href)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        active ? "bg-olive-100 text-olive-900" : "text-ink-700 hover:bg-olive-50 hover:text-olive-900",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
  
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher lang={lang} label={labels.changeLanguage} />
            <span className="hidden sm:block">
              <Button href={contactHref(lang)} variant="accent" size="sm">
                {labels.requestQuote}
              </Button>
            </span>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-full text-olive-900 hover:bg-olive-100 xl:hidden"
              aria-label={labels.openMenu}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <Icon name="menu" className="size-6" />
            </button>
          </div>
        </Container>
      </header>

      {/* Outside <header>: its backdrop-blur would become the containing block of the fixed drawer. */}
      <MobileNav
        lang={lang}
        open={open}
        onClose={close}
        links={links}
        site={site}
        labels={labels}
        isActive={(href) => isActive(path, href)}
      />
    </>
  );
}
