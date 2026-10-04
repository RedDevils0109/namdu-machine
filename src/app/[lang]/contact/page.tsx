import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Icon } from "@/components/ui/Icon";
import { QuotePanel } from "@/components/contact/QuotePanel";
import { format, getDictionary } from "@/i18n/getDictionary";
import { alternates, resolveLang, type LangParams } from "@/i18n/params";
import { getSite } from "@/lib/data";
import { quoteMessage, whatsappHref } from "@/lib/links";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  return {
    title: dict.contact.metaTitle,
    description: format(dict.contact.metaDescription, { company: getSite(lang).companyName }),
    alternates: alternates(lang, "/contact"),
  };
}

export default async function ContactPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  const site = getSite(lang);

  const details = [
    { icon: "phone", label: dict.contact.phone, value: site.contact.phone, href: site.contact.phoneHref },
    {
      icon: "chat",
      label: dict.common.whatsapp,
      value: site.contact.whatsappDisplay ?? `+${site.contact.whatsapp}`,
      href: whatsappHref(site.contact.whatsapp, quoteMessage(dict, site.shortName)),
    },
    { icon: "mail", label: dict.contact.emailLabel, value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: "map", label: dict.contact.address, value: site.contact.address, href: site.contact.mapLink },
    { icon: "clock", label: dict.contact.workingHours, value: site.contact.workingHours },
  ] as const;

  return (
    <>
      <PageHero
        lang={lang}
        title={dict.contact.heroTitle}
        subtitle={dict.contact.heroSubtitle}
        crumbs={[{ label: dict.contact.metaTitle }]}
      />

      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Suspense fallback={<div className="h-80 rounded-xl bg-cream-50" />}>
            <QuotePanel company={site.shortName} contact={site.contact} labels={dict.contact} quote={dict.quote} />
          </Suspense>
        </div>

        <aside className="space-y-4 lg:col-span-2">
          {details.map((item) => {
            const body = (
              <>
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-olive-100 text-olive-700">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-olive-700">{item.label}</span>
                  <span className="block text-ink-900">{item.value}</span>
                </span>
              </>
            );
            const classes = "flex gap-4 rounded-lg border border-cream-300 bg-cream-50 p-5";
            return "href" in item ? (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`${classes} transition-colors hover:border-olive-300`}
              >
                {body}
              </a>
            ) : (
              <div key={item.label} className={classes}>
                {body}
              </div>
            );
          })}
        </aside>
      </Container>

      <section aria-label={dict.contact.mapLabel} className="pb-14 sm:pb-20">
        <Container>
          <div className="h-80 overflow-hidden sm:h-96 lg:h-120 rounded-xl border border-cream-300 shadow-card">
            <iframe
              src={site.contact.mapEmbedUrl}
              title={format(dict.contact.mapTitle, { company: site.companyName })}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full border-0"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
