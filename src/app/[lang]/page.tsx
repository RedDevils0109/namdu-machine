import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Markets } from "@/components/sections/Markets";
import { PartnerTicker } from "@/components/sections/PartnerTicker";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ProductCard } from "@/components/product/ProductCard";
import { VideoEmbed } from "@/components/video/VideoEmbed";
import { getDictionary } from "@/i18n/getDictionary";
import { resolveLang, type LangParams } from "@/i18n/params";
import {
  getCategory,
  getFeaturedProducts,
  getHome,
  getPartners,
  getVideos,
} from "@/lib/data";
import { localeHref } from "@/lib/links";

export default async function HomePage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  const home = getHome(lang);
  const featured = getFeaturedProducts(lang).slice(0, 6);
  const spotlight = getVideos(lang)[0];

  return (
    <>
      <Hero lang={lang} hero={home.hero} />
      <StatsBar stats={home.stats} label={dict.home.statsLabel} />

      <PartnerTicker
        partners={getPartners()}
        eyebrow={dict.home.partnersEyebrow}
        title={dict.home.partnersTitle}
        tone="cream"
        className="border-b border-cream-300"
      />

      <section className="bg-olive-50 py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={dict.home.processEyebrow} title={home.process.title} subtitle={home.process.subtitle} />
          <div className="mt-12">
            <ProcessSteps lang={lang} steps={home.process.steps} />
          </div>
        </Container>
      </section>

      <Markets markets={home.markets} eyebrow={dict.home.marketsEyebrow} coreMarketLabel={dict.home.coreMarket} className="bg-cream-200" />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={dict.home.featuredEyebrow} title={dict.home.featuredTitle} align="left" />
            <Button href={localeHref(lang, "/products")} variant="outline">
              {dict.home.viewAllProducts}
              <Icon name="arrowRight" className="size-4" />
            </Button>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <li key={product.slug}>
                <ProductCard lang={lang} product={product} categoryName={getCategory(lang, product.categorySlug)?.name} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-cream-200 py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={dict.home.whyEyebrow} title={home.whyChooseUs.title} subtitle={home.whyChooseUs.subtitle} />
          <div className="mt-12">
            <FeatureGrid items={home.whyChooseUs.items} />
          </div>
        </Container>
      </section>

      {spotlight && (
        <section className="py-14 sm:py-20">
          <Container className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow={dict.home.videoEyebrow} title={spotlight.title} subtitle={spotlight.description} align="left" />
              <Button href={localeHref(lang, "/videos")} variant="outline" className="mt-8">
                {dict.home.watchMoreVideos}
                <Icon name="arrowRight" className="size-4" />
              </Button>
            </div>
            <VideoEmbed url={spotlight.videoUrl} title={spotlight.title} thumbnail={spotlight.thumbnail} labels={dict.videos} />
          </Container>
        </section>
      )}

      <section className="bg-olive-50 py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={dict.home.customersEyebrow} title={dict.home.customersTitle} />
          <div className="mt-12">
            <Testimonials items={home.testimonials} />
          </div>
        </Container>
      </section>

      <CtaBanner lang={lang} {...home.cta} />
    </>
  );
}
