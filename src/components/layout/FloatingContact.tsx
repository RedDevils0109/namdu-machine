import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getSite } from "@/lib/data";
import { quoteMessage, whatsappHref, zaloHref } from "@/lib/links";

export function FloatingContact({ lang }: { lang: Locale }) {
  const site = getSite(lang);
  const dict = getDictionary(lang);

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 flex flex-col gap-2.5 sm:bottom-5 sm:right-5 sm:gap-3">
      <a
        href={zaloHref(site.contact.zalo)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex size-12 items-center justify-center rounded-full bg-info text-sm font-bold text-cream-50 shadow-lift transition-transform hover:scale-105 sm:size-13"
        aria-label={dict.common.chatZalo}
      >
        Zalo
      </a>
      <a
        href={whatsappHref(site.contact.whatsapp, quoteMessage(dict, site.shortName))}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex size-12 items-center justify-center rounded-full bg-success text-cream-50 shadow-lift transition-transform hover:scale-105 sm:size-13"
        aria-label={dict.common.chatWhatsapp}
      >
        <Icon name="chat" className="size-6" />
      </a>
    </div>
  );
}
