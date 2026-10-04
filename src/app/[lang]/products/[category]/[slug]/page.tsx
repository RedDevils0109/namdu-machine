import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SpecTable } from "@/components/product/SpecTable";
import { QuoteButtons } from "@/components/product/QuoteButtons";
import { ProductCard } from "@/components/product/ProductCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { isLocale, locales } from "@/i18n/config";
import { format, getDictionary } from "@/i18n/getDictionary";
import { alternates } from "@/i18n/params";
import { getCategory, getProduct, getProducts, getRelatedProducts } from "@/lib/data";
import type { Product } from "@/types";

interface Params {
  params: Promise<{ lang: string; category: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getProducts(lang).map((product) => ({ lang, category: product.categorySlug, slug: product.slug })),
  );
}

function productFullName(product: Pick<Product, "name" | "model">): string {
  return [product.name, product.model].filter(Boolean).join(" ");
}

async function resolve(params: Params["params"]) {
  const { lang, category: categorySlug, slug } = await params;
  if (!isLocale(lang)) notFound();
  const product = getProduct(lang, categorySlug, slug);
  const category = getCategory(lang, categorySlug);
  if (!product || !category) notFound();
  return { lang, product, category };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, product } = await resolve(params);
  return {
    title: productFullName(product),
    description: product.shortDescription,
    alternates: alternates(lang, `/products/${product.categorySlug}/${product.slug}`),
    openGraph: { images: [product.images[0].src] },
  };
}

export default async function ProductPage({ params }: Params) {
  const { lang, product, category } = await resolve(params);
  const dict = getDictionary(lang);
  const fullName = productFullName(product);
  const related = getRelatedProducts(lang, product);

  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs
          lang={lang}
          items={[
            { label: dict.products.metaTitle, href: "/products" },
            { label: category.name, href: `/products/${category.slug}` },
            { label: product.name },
          ]}
        />
      </Container>

      <section className="py-10">
        <Container className="grid gap-12 lg:grid-cols-2">
          <ProductGallery
            images={product.images}
            video={
              product.videoUrl
                ? { url: product.videoUrl, title: format(dict.product.videoTitle, { name: fullName }) }
                : undefined
            }
            labels={{ ...dict.videos, showImage: dict.product.showImage, showVideo: dict.product.showVideo }}
          />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{category.name}</Badge>
              {product.badge && <Badge tone="amber">{product.badge}</Badge>}
            </div>
            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{product.name}</h1>
            {product.model && (
              <p className="mt-1 font-display text-lg font-semibold text-olive-600">
                {format(dict.product.model, { model: product.model })}
              </p>
            )}
            <p className="mt-5 text-lg leading-relaxed text-ink-700">{product.description}</p>

            <ul className="mt-6 space-y-2.5">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-ink-700">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-olive-100 text-olive-700">
                    <Icon name="check" className="size-3.5" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-5">
              <p className="font-semibold text-olive-950">{dict.product.pricingTitle}</p>
              <p className="mt-1 text-sm text-ink-700">{dict.product.pricingText}</p>
              <div className="mt-4">
                <QuoteButtons lang={lang} productName={fullName} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-olive-50 py-12 sm:py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">{dict.product.specsTitle}</h2>
            <div className="mt-6">
              <SpecTable specs={product.specs} caption={dict.product.specsTitle} />
            </div>
          </div>
          {product.applications.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold">{dict.product.suitableFor}</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {product.applications.map((item) => (
                  <li key={item}>
                    <Badge tone="cream">{item}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-12 sm:py-16">
          <Container>
            <SectionHeading title={dict.product.related} align="left" />
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <ProductCard lang={lang} product={item} categoryName={getCategory(lang, item.categorySlug)?.name} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <CtaBanner
        lang={lang}
        title={format(dict.product.ctaTitle, { name: product.name })}
        subtitle={dict.product.ctaSubtitle}
        buttonLabel={dict.common.requestQuote}
        productName={fullName}
      />
    </>
  );
}
