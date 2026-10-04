import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { CategoryNav } from "@/components/product/CategoryNav";
import { ProductCard } from "@/components/product/ProductCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { isLocale, locales } from "@/i18n/config";
import { format, getDictionary } from "@/i18n/getDictionary";
import { alternates } from "@/i18n/params";
import { getCategories, getCategory, getHome, getProductsByCategory } from "@/lib/data";

interface Params {
  params: Promise<{ lang: string; category: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getCategories(lang).map((category) => ({ lang, category: category.slug })),
  );
}

async function resolve(params: Params["params"]) {
  const { lang, category: slug } = await params;
  if (!isLocale(lang)) notFound();
  const category = getCategory(lang, slug);
  if (!category) notFound();
  return { lang, category };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, category } = await resolve(params);
  return {
    title: format(getDictionary(lang).products.categoryMetaTitle, { name: category.name }),
    description: category.shortDescription,
    alternates: alternates(lang, `/products/${category.slug}`),
    openGraph: { images: [category.image.src] },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { lang, category } = await resolve(params);
  const dict = getDictionary(lang);
  const products = getProductsByCategory(lang, category.slug);
  const countLabel =
    products.length === 1 ? dict.common.machineCountOne : format(dict.common.machineCount, { count: products.length });

  return (
    <>
      <PageHero
        lang={lang}
        title={format(dict.products.categoryHeroTitle, { name: category.name })}
        subtitle={category.description}
        image={category.image}
        crumbs={[{ label: dict.products.metaTitle, href: "/products" }, { label: category.name }]}
      />
      <CategoryNav lang={lang} categories={getCategories(lang)} activeSlug={category.slug} />

      <Container className="py-12 sm:py-16">
        <p className="text-sm text-ink-500">{countLabel}</p>
        {products.length > 0 ? (
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <li key={product.slug}>
                <ProductCard lang={lang} product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 rounded-lg bg-olive-50 p-8 text-center text-ink-700">{dict.products.comingSoon}</p>
        )}
      </Container>

      <CtaBanner lang={lang} {...getHome(lang).cta} />
    </>
  );
}
