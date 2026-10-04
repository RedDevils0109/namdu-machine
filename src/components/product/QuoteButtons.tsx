import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getSite } from "@/lib/data";
import { contactHref, emailHref, quoteMessage, quoteSubject, whatsappHref } from "@/lib/links";

export function QuoteButtons({ lang, productName }: { lang: Locale; productName: string }) {
  const dict = getDictionary(lang);
  const site = getSite(lang);
  const message = quoteMessage(dict, site.shortName, productName);

  return (
    <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
      <Button href={contactHref(lang, productName)} variant="accent" size="lg" className="col-span-2">
        {dict.common.requestQuote}
      </Button>
      <Button href={whatsappHref(site.contact.whatsapp, message)} variant="outline" size="lg">
        <Icon name="chat" className="size-5" />
        {dict.common.whatsapp}
      </Button>
      <Button
        href={emailHref(site.contact.email, quoteSubject(dict, productName), message)}
        variant="outline"
        size="lg"
      >
        <Icon name="mail" className="size-5" />
        {dict.common.email}
      </Button>
    </div>
  );
}
