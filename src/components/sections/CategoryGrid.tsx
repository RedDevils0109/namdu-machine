import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { format, getDictionary } from "@/i18n/getDictionary";
import { localeHref } from "@/lib/links";
import type { Category } from "@/types";

interface CategoryGridProps {
  lang: Locale;
  categories: Category[];
  counts?: Record<string, number>;
}

export function CategoryGrid({ lang, categories, counts }: CategoryGridProps) {
  const dict = getDictionary(lang);
  const countLabel = (count: number) =>
    count === 1 ? dict.common.machineCountOne : format(dict.common.machineCount, { count });

  return (
    <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {categories.map((category) => (
        <li key={category.slug}>
          <Link
            href={localeHref(lang, `/products/${category.slug}`)}
            className="group relative block aspect-[16/10] overflow-hidden rounded-lg shadow-card sm:aspect-[4/3]"
          >
            <Image
              src={category.image.src}
              alt={category.image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-brand group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-olive-950/90 via-olive-950/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-cream-50 sm:p-6">
              {counts && (
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">
                  {countLabel(counts[category.slug] ?? 0)}
                </p>
              )}
              <h3 className="mt-1 flex items-center gap-2 text-2xl font-bold text-cream-50">
                {category.name}
                <Icon
                  name="arrowRight"
                  className="size-5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-olive-100">{category.shortDescription}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
