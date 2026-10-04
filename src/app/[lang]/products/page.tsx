import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Icon } from "@/components/ui/Icon";
import { ProductCard } from "@/components/product/ProductCard";
import { CategoryNav } from "@/components/product/CategoryNav";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getDictionary } from "@/i18n/getDictionary";
import { alternates, resolveLang, type LangParams } from "@/i18n/params";
import { getCategories, getHome, getProductsByCategory } from "@/lib/data";
import { localeHref } from "@/lib/links";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  return {
    title: dict.products.metaTitle,
    description: dict.products.metaDescription,
    alternates: alternates(lang, "/products"),
  };
}

export default async function ProductsPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);
  const categories = getCategories(lang);

  return (
    <>
      <PageHero
        lang={lang}
        title={dict.products.heroTitle}
        subtitle={dict.products.heroSubtitle}
        crumbs={[{ label: dict.products.metaTitle }]}
      />
      <CategoryNav lang={lang} categories={categories} />

      <Container className="space-y-14 sm:space-y-20 py-12 sm:py-16">
        {categories.map((category) => {
          const products = getProductsByCategory(lang, category.slug);
          if (products.length === 0) return null;
          return (
            <section key={category.slug} id={category.slug} aria-labelledby={`${category.slug}-heading`} className="scroll-mt-40">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cream-300 pb-4">
                <div>
                  <h2 id={`${category.slug}-heading`} className="text-2xl font-bold sm:text-3xl">
                    {category.name}
                  </h2>
                  <p className="mt-1 max-w-2xl text-ink-700">{category.shortDescription}</p>
                </div>
                <Link
                  href={localeHref(lang, `/products/${category.slug}`)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-olive-700 hover:underline"
                >
                  {dict.products.viewCategory}
                  <Icon name="arrowRight" className="size-4" />
                </Link>
              </div>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <li key={product.slug}>
                    <ProductCard lang={lang} product={product} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </Container>

      <CtaBanner lang={lang} {...getHome(lang).cta} />
    </>
  );
}
