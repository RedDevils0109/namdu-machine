import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { productHref } from "@/lib/data";
import type { Product } from "@/types";

interface ProductCardProps {
  lang: Locale;
  product: Product;
  categoryName?: string;
}

export function ProductCard({ lang, product, categoryName }: ProductCardProps) {
  const dict = getDictionary(lang);
  // The first spec is the headline figure (usually capacity).
  const highlight = product.specs[0];

  return (
    <Card interactive className="group flex h-full flex-col">
      <Link href={productHref(lang, product)} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-brand group-hover:scale-105"
          />
          {product.badge && (
            <Badge tone="amber" className="absolute left-4 top-4">
              {product.badge}
            </Badge>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
            {categoryName && <span className="text-olive-600">{categoryName}</span>}
            {product.model && <span className="text-ink-500">{product.model}</span>}
          </div>
          <h3 className="mt-2 text-xl font-bold">{product.name}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-700">{product.shortDescription}</p>
          {highlight && (
            <p className="mt-4 rounded-md bg-olive-50 px-3 py-2 text-sm text-olive-900">
              <span className="font-semibold">{highlight.label}:</span> {highlight.value}
            </p>
          )}
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-olive-700">
            {dict.common.viewDetails}
            <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Card>
  );
}
