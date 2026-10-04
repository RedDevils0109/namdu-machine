import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { alternates, resolveLang, type LangParams } from "@/i18n/params";
import { getNavigation, getSite } from "@/lib/data";
import { fontVariables } from "../fonts";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const site = getSite(lang);
  return {
    metadataBase: new URL(site.siteUrl),
    title: { default: site.seo.defaultTitle, template: site.seo.titleTemplate },
    description: site.description,
    keywords: site.seo.keywords,
    icons: { icon: site.favicon },
    alternates: alternates(lang, "/"),
    openGraph: {
      type: "website",
      locale: lang === "vi" ? "vi_VN" : "en_US",
      siteName: site.companyName,
      title: site.seo.defaultTitle,
      description: site.description,
      images: [site.seo.ogImage],
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode } & LangParams>) {
  const lang = await resolveLang(params);
  const site = getSite(lang);
  const navigation = getNavigation(lang);
  const dict = getDictionary(lang);

  return (
    <html lang={lang} className={fontVariables}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-olive-800 focus:px-4 focus:py-2 focus:text-cream-50"
        >
          {dict.common.skipToContent}
        </a>
        <Header lang={lang} site={site} links={navigation.header} labels={dict.common} />
        <main id="main">{children}</main>
        <Footer lang={lang} />
        <FloatingContact lang={lang} />
      </body>
    </html>
  );
}
