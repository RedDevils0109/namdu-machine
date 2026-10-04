import Image from "next/image";
import type { Testimonial } from "@/types";

export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <li key={item.author} className="flex flex-col rounded-lg bg-cream-50 p-6 shadow-card">
          <span aria-hidden className="font-display text-5xl leading-none text-olive-300">
            &ldquo;
          </span>
          <blockquote className="mt-2 flex-1 leading-relaxed text-ink-700">{item.quote}</blockquote>
          <div className="mt-6 flex items-center gap-3 border-t border-cream-300 pt-4">
            {item.avatar && (
              <Image src={item.avatar} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />
            )}
            <div>
              <p className="font-semibold text-olive-950">{item.author}</p>
              <p className="text-sm text-ink-500">
                {item.role}, {item.company} &middot; {item.country}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
