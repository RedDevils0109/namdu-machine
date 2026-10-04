import { Icon } from "@/components/ui/Icon";

export function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-cream-300 overflow-hidden rounded-lg border border-cream-300 bg-cream-50">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-olive-950 transition-colors hover:bg-olive-50 [&::-webkit-details-marker]:hidden">
            {item.question}
            <Icon
              name="chevronDown"
              className="size-5 shrink-0 text-olive-600 transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <p className="px-5 pb-5 leading-relaxed text-ink-700">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
