import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getDictionary } from "@/i18n/getDictionary";
import { alternates, resolveLang, type LangParams } from "@/i18n/params";
import { getFaqGroups } from "@/lib/data";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  return {
    title: dict.faq.metaTitle,
    description: dict.faq.metaDescription,
    alternates: alternates(lang, "/faq"),
  };
}

export default async function FaqPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  const faqGroups = getFaqGroups(lang);

  return (
    <>
      <PageHero
        lang={lang}
        title={dict.faq.heroTitle}
        subtitle={dict.faq.heroSubtitle}
        crumbs={[{ label: dict.faq.metaTitle }]}
      />
      <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[16rem_1fr]">
        <nav aria-label={dict.faq.topicsLabel} className="lg:sticky lg:top-36 lg:self-start">
          <ul className="flex flex-wrap gap-2 lg:flex-col">
            {faqGroups.map((group, index) => (
              <li key={group.title}>
                <a
                  href={`#faq-${index}`}
                  className="block rounded-md px-4 py-2 text-sm font-medium text-olive-900 hover:bg-olive-100"
                >
                  {group.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-12">
          {faqGroups.map((group, index) => (
            <section key={group.title} id={`faq-${index}`} className="scroll-mt-36">
              <h2 className="mb-5 text-2xl font-bold">{group.title}</h2>
              <Accordion items={group.items} />
            </section>
          ))}
        </div>
      </Container>
      <CtaBanner
        lang={lang}
        title={dict.faq.ctaTitle}
        subtitle={dict.faq.ctaSubtitle}
        buttonLabel={dict.faq.ctaButton}
      />
    </>
  );
}
