import enSite from "@/data/en/site.json";
import enNavigation from "@/data/en/navigation.json";
import enHome from "@/data/en/home.json";
import enAbout from "@/data/en/about.json";
import enCategories from "@/data/en/categories.json";
import enProducts from "@/data/en/products.json";
import enVideos from "@/data/en/videos.json";
import enFaq from "@/data/en/faq.json";
import viSite from "@/data/vi/site.json";
import viNavigation from "@/data/vi/navigation.json";
import viHome from "@/data/vi/home.json";
import viAbout from "@/data/vi/about.json";
import viCategories from "@/data/vi/categories.json";
import viProducts from "@/data/vi/products.json";
import viVideos from "@/data/vi/videos.json";
import viFaq from "@/data/vi/faq.json";
import partners from "@/data/partners.json";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/lib/links";
import type {
  AboutContent,
  Category,
  FaqGroup,
  HomeContent,
  Navigation,
  Partner,
  Product,
  SiteConfig,
  Video,
} from "@/types";

interface LocaleContent {
  site: SiteConfig;
  navigation: Navigation;
  home: HomeContent;
  about: AboutContent;
  categories: Category[];
  products: Product[];
  videos: Video[];
  faq: FaqGroup[];
}

function build(raw: Record<keyof LocaleContent, unknown>): LocaleContent {
  const content = raw as LocaleContent;
  return { ...content, categories: content.categories.toSorted((a, b) => a.order - b.order) };
}

const content: Record<Locale, LocaleContent> = {
  en: build({
    site: enSite,
    navigation: enNavigation,
    home: enHome,
    about: enAbout,
    categories: enCategories,
    products: enProducts,
    videos: enVideos,
    faq: enFaq,
  }),
  vi: build({
    site: viSite,
    navigation: viNavigation,
    home: viHome,
    about: viAbout,
    categories: viCategories,
    products: viProducts,
    videos: viVideos,
    faq: viFaq,
  }),
};

export const getSite = (lang: Locale) => content[lang].site;
export const getNavigation = (lang: Locale) => content[lang].navigation;
export const getHome = (lang: Locale) => content[lang].home;
export const getAbout = (lang: Locale) => content[lang].about;
export const getFaqGroups = (lang: Locale) => content[lang].faq;
export const getCategories = (lang: Locale) => content[lang].categories;
export const getProducts = (lang: Locale) => content[lang].products;
export const getVideos = (lang: Locale) => content[lang].videos;
/** Partners are shared by every language: logos and links are not translated. */
export const getPartners = (): Partner[] => partners;

export function getCategory(lang: Locale, slug: string): Category | undefined {
  return getCategories(lang).find((category) => category.slug === slug);
}

export function getProductsByCategory(lang: Locale, categorySlug: string): Product[] {
  return getProducts(lang).filter((product) => product.categorySlug === categorySlug);
}

export function getFeaturedProducts(lang: Locale): Product[] {
  return getProducts(lang).filter((product) => product.featured);
}

export function getProduct(lang: Locale, categorySlug: string, slug: string): Product | undefined {
  return getProducts(lang).find(
    (product) => product.categorySlug === categorySlug && product.slug === slug,
  );
}

export function getRelatedProducts(lang: Locale, product: Product, limit = 3): Product[] {
  const products = getProducts(lang);
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .concat(products.filter((p) => p.categorySlug !== product.categorySlug && p.featured))
    .slice(0, limit);
}

export function getVideoTopics(lang: Locale): string[] {
  return [...new Set(getVideos(lang).map((video) => video.topic))];
}

export function productHref(lang: Locale, product: Pick<Product, "categorySlug" | "slug">): string {
  return localeHref(lang, `/products/${product.categorySlug}/${product.slug}`);
}
