import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { cn } from "@/lib/cn";
import { localeHref } from "@/lib/links";
import type { Category } from "@/types";

interface CategoryNavProps {
  lang: Locale;
  categories: Category[];
  activeSlug?: string;
}

export function CategoryNav({ lang, categories, activeSlug }: CategoryNavProps) {
  const dict = getDictionary(lang);
  const items = [{ slug: "", name: dict.products.allMachines }, ...categories];

  return (
    <nav
      aria-label={dict.products.categoriesLabel}
      className="sticky top-18 z-20 border-b border-cream-300 bg-cream-50/95 backdrop-blur md:top-27"
    >
      <Container>
        <ul className="-mx-1 flex gap-2 overflow-x-auto py-3">
          {items.map((item) => {
            const active = (activeSlug ?? "") === item.slug;
            return (
              <li key={item.slug || "all"} className="shrink-0">
                <Link
                  href={localeHref(lang, item.slug ? `/products/${item.slug}` : "/products")}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active ? "bg-olive-700 text-cream-50" : "bg-olive-50 text-olive-900 hover:bg-olive-100",
                  )}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
