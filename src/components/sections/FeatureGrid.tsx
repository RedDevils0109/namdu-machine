import { Icon } from "@/components/ui/Icon";
import type { Feature } from "@/types";

export function FeatureGrid({ items }: { items: Feature[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.title} className="rounded-lg border border-cream-300 bg-cream-50 p-6 shadow-soft">
          <span className="inline-flex size-12 items-center justify-center rounded-md bg-olive-100 text-olive-700">
            <Icon name={item.icon} className="size-6" />
          </span>
          <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
          <p className="mt-2 leading-relaxed text-ink-700">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
