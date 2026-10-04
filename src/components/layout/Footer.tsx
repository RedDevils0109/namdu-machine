import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getNavigation, getSite } from "@/lib/data";
import { localeHref } from "@/lib/links";

export function Footer({ lang }: { lang: Locale }) {
  const site = getSite(lang);
  const navigation = getNavigation(lang);
  const dict = getDictionary(lang);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-olive-950 text-olive-100">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Image src={site.logoLight.src} alt={site.logoLight.alt} width={180} height={40} className="h-10 w-auto" />
          <p className="text-sm leading-relaxed text-olive-200">{site.description}</p>
          <ul className="flex gap-2">
            {site.socials.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-10 items-center justify-center rounded-full bg-olive-900 text-olive-100 transition-colors hover:bg-olive-700 hover:text-cream-50"
                >
                  <Icon name={social.platform} className="size-5" label={social.platform} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {navigation.footer.map((group) => (
          <div key={group.title}>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-cream-50">{group.title}</h2>
            <ul className="space-y-2.5 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={localeHref(lang, link.href)} className="text-olive-200 transition-colors hover:text-cream-50">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-cream-50">
            {dict.common.contactTitle}
          </h2>
          <ul className="space-y-3 text-sm text-olive-200">
            <li className="flex gap-3">
              <Icon name="map" className="mt-0.5 size-5 shrink-0 text-olive-400" />
              {site.contact.address}
            </li>
            <li>
              <a href={site.contact.phoneHref} className="flex gap-3 hover:text-cream-50">
                <Icon name="phone" className="size-5 shrink-0 text-olive-400" />
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="flex gap-3 hover:text-cream-50">
                <Icon name="mail" className="size-5 shrink-0 text-olive-400" />
                {site.contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="clock" className="size-5 shrink-0 text-olive-400" />
              {site.contact.workingHours}
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-olive-900">
        <Container className="flex flex-col items-center justify-between gap-2 pt-5 pb-24 text-center text-xs text-olive-300 sm:flex-row sm:pb-5 sm:text-left">
          <p>
            &copy; {year} {site.companyName}. {dict.common.rightsReserved}
          </p>
          <p>{site.tagline}</p>
        </Container>
      </div>
    </footer>
  );
}
