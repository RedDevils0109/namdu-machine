import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import type { Locale } from "@/i18n/config";
import type { ImageAsset } from "@/types";

interface PageHeroProps {
  lang: Locale;
  title: string;
  subtitle?: string;
  image?: ImageAsset;
  crumbs?: Crumb[];
}

export function PageHero({ lang, title, subtitle, image, crumbs }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-olive-900 text-cream-50">
      {image && (
        <Image
          src={image.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-r from-olive-950/90 via-olive-900/70 to-olive-900/30" />
      <Container className="relative py-12 sm:py-20">
        {crumbs && <Breadcrumbs lang={lang} items={crumbs} tone="light" />}
        <h1 className="mt-4 max-w-3xl text-[2rem] leading-tight font-bold text-cream-50 sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-olive-100 sm:text-lg">{subtitle}</p>
        )}
      </Container>
    </section>
  );
}
