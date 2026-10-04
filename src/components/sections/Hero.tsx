import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/lib/links";
import type { HomeContent } from "@/types";

export function Hero({ lang, hero }: { lang: Locale; hero: HomeContent["hero"] }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-olive-100 via-cream-100 to-cream-200" />
      <div className="absolute -right-32 -top-32 -z-10 size-[28rem] rounded-full bg-olive-200/50 blur-3xl" />
      <Container className="grid items-center gap-10 py-10 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-olive-100 px-4 py-1.5 text-sm font-semibold text-olive-800 ring-1 ring-inset ring-olive-200">
            <span className="size-2 shrink-0 rounded-full bg-amber-400" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-5 text-[2rem] font-extrabold leading-tight sm:mt-6 sm:text-5xl lg:text-6xl">{hero.title}</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-700 sm:mt-6 sm:text-lg">{hero.subtitle}</p>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <Button href={localeHref(lang, hero.primaryCta.href)} variant="primary" size="lg">
              {hero.primaryCta.label}
              <Icon name="arrowRight" className="size-5" />
            </Button>
            <Button href={localeHref(lang, hero.secondaryCta.href)} variant="outline" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl border-2 border-olive-300/60 shadow-lift">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              width={1024}
              height={899}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
