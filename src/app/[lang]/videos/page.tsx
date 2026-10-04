import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { VideoGallery } from "@/components/video/VideoGallery";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getDictionary } from "@/i18n/getDictionary";
import { alternates, resolveLang, type LangParams } from "@/i18n/params";
import { getHome, getProducts, getVideoTopics, getVideos, productHref } from "@/lib/data";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  return {
    title: dict.videos.metaTitle,
    description: dict.videos.metaDescription,
    alternates: alternates(lang, "/videos"),
  };
}

export default async function VideosPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  const productLinks = Object.fromEntries(getProducts(lang).map((p) => [p.slug, productHref(lang, p)]));

  return (
    <>
      <PageHero
        lang={lang}
        title={dict.videos.heroTitle}
        subtitle={dict.videos.heroSubtitle}
        crumbs={[{ label: dict.videos.metaTitle }]}
      />
      <Container className="py-12 sm:py-16">
        <VideoGallery
          videos={getVideos(lang)}
          topics={getVideoTopics(lang)}
          productLinks={productLinks}
          labels={dict.videos}
        />
      </Container>
      <CtaBanner lang={lang} {...getHome(lang).cta} />
    </>
  );
}
