import Image from "next/image";
import { LanguageRedirect } from "@/components/layout/LanguageRedirect";
import { localeLabels, locales } from "@/i18n/config";

export default function RootPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 text-center">
      <LanguageRedirect />
      <Image src="/images/company-logo.png" alt="NAM DU MACHINE" width={220} height={48} priority />
      <ul className="flex gap-3">
        {locales.map((lang) => (
          <li key={lang}>
            <a
              href={`/${lang}/`}
              lang={lang}
              className="inline-flex h-11 items-center rounded-full bg-olive-700 px-6 font-semibold text-cream-50 hover:bg-olive-800"
            >
              {localeLabels[lang].name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
