import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getSite } from "@/lib/data";
import { contactHref, quoteMessage, whatsappHref } from "@/lib/links";

interface CtaBannerProps {
  lang: Locale;
  title: string;
  subtitle: string;
  buttonLabel: string;
  productName?: string;
}

export function CtaBanner({ lang, title, subtitle, buttonLabel, productName }: CtaBannerProps) {
  const dict = getDictionary(lang);
  const site = getSite(lang);

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-xl bg-olive-800 px-6 py-12 text-center sm:px-12">
          <div className="absolute -left-20 -top-20 size-64 rounded-full bg-olive-600/40 blur-2xl" aria-hidden />
          <div className="absolute -bottom-24 -right-16 size-72 rounded-full bg-amber-500/20 blur-2xl" aria-hidden />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold text-cream-50 sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg text-olive-100">{subtitle}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={contactHref(lang, productName)} variant="accent" size="lg">
                {buttonLabel}
              </Button>
              <Button
                href={whatsappHref(site.contact.whatsapp, quoteMessage(dict, site.shortName, productName))}
                variant="light"
                size="lg"
              >
                <Icon name="chat" className="size-5" />
                {dict.common.chatOnWhatsapp}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
