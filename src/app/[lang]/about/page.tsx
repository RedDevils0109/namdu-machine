import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { StatsBar } from "@/components/sections/StatsBar";
import { Markets } from "@/components/sections/Markets";
import { PartnerTicker } from "@/components/sections/PartnerTicker";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { VideoEmbed } from "@/components/video/VideoEmbed";
import { getDictionary } from "@/i18n/getDictionary";
import { alternates, resolveLang, type LangParams } from "@/i18n/params";
import { getAbout, getHome, getPartners, getVideos } from "@/lib/data";
import { localeHref } from "@/lib/links";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return {
    title: getDictionary(lang).about.metaTitle,
    description: getAbout(lang).hero.subtitle,
    alternates: alternates(lang, "/about"),
  };
}

export default async function AboutPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  const about = getAbout(lang);
  const home = getHome(lang);
  const videos = getVideos(lang);
  const factoryVideos = about.factoryVideos
    .map(({ id }) => videos.find((video) => video.id === id))
    .filter((video) => video !== undefined);

  return (
    <>
      <PageHero
        lang={lang}
        title={about.hero.title}
        subtitle={about.hero.subtitle}
        image={about.hero.image}
        crumbs={[{ label: dict.about.metaTitle }]}
      />

      <section className="py-14 sm:py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading title={about.story.title} align="left" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-700">
              {about.story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lift">
            <Image src={about.story.image.src} alt={about.story.image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </Container>
      </section>

      <StatsBar stats={home.stats} label={dict.home.statsLabel} />

      <Markets markets={home.markets} eyebrow={dict.home.marketsEyebrow} coreMarketLabel={dict.home.coreMarket} className="bg-olive-50" />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-olive-100 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-olive-700">{dict.about.mission}</p>
            <p className="mt-3 font-display text-2xl font-bold leading-snug text-olive-950">{about.mission}</p>
          </div>
          <div className="rounded-lg bg-cream-200 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">{dict.about.vision}</p>
            <p className="mt-3 font-display text-2xl font-bold leading-snug text-olive-950">{about.vision}</p>
          </div>
        </Container>
      </section>

      <section className="bg-olive-50 py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={dict.about.valuesEyebrow} title={dict.about.valuesTitle} />
          <div className="mt-12">
            <FeatureGrid items={about.values} />
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={dict.about.journeyEyebrow} title={dict.about.milestonesTitle} />
          <ol className="relative mx-auto mt-12 max-w-3xl border-l-2 border-olive-200 pl-8">
            {about.milestones.map((milestone) => (
              <li key={milestone.year} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[41px] top-1 size-4 rounded-full border-4 border-cream-100 bg-olive-600" aria-hidden />
                <p className="font-display text-sm font-bold text-amber-700">{milestone.year}</p>
                <h3 className="mt-1 text-xl font-bold">{milestone.title}</h3>
                <p className="mt-1 text-ink-700">{milestone.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-cream-200 py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={dict.about.factoryEyebrow} title={dict.about.factoryTitle} />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {factoryVideos.map((video) => (
              <li key={video.id}>
                <VideoEmbed url={video.videoUrl} title={video.title} thumbnail={video.thumbnail} labels={dict.videos} />
                <h3 className="mt-4 text-lg font-bold">{video.title}</h3>
                <p className="mt-1 leading-relaxed text-ink-700">{video.description}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <Button href={localeHref(lang, "/videos")} variant="outline">
              {dict.about.factoryMoreVideos}
              <Icon name="arrowRight" className="size-4" />
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={dict.about.qualityEyebrow} title={dict.about.certificationsTitle} />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
            {about.certifications.map((cert) => (
              <li key={cert.name} className="flex flex-col items-center rounded-xl border border-cream-300 bg-cream-50 p-6 text-center shadow-soft transition-all duration-200 hover:shadow-card">
                <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-white p-4 ring-1 ring-cream-200">
                  <Image src={cert.image.src} alt={cert.image.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-contain p-2" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink-900">{cert.name}</h3>
                <p className="mt-1 text-sm font-medium text-ink-700">{cert.issuer}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <PartnerTicker partners={getPartners()} eyebrow={dict.home.partnersEyebrow} title={dict.home.partnersTitle} tone="olive" />

      <CtaBanner lang={lang} {...home.cta} />
    </>
  );
}
