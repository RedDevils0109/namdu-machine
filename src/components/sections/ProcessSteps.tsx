import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/lib/links";
import type { ProcessStep } from "@/types";

export function ProcessSteps({ lang, steps }: { lang: Locale; steps: ProcessStep[] }) {
  return (
    <ol className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {steps.map((step) => {
        const content = (
          <>
            <span className="flex size-9 items-center justify-center rounded-full bg-olive-700 font-display text-base font-bold text-cream-50 sm:size-10 sm:text-lg">
              {step.step}
            </span>
            <h3 className="mt-3 text-base font-bold sm:mt-4 sm:text-lg">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">{step.description}</p>
          </>
        );
        return (
          <li key={step.step}>
            {step.categorySlug ? (
              <Link
                href={localeHref(lang, `/products/${step.categorySlug}`)}
                className="block h-full rounded-lg border border-cream-300 bg-cream-50 p-4 transition sm:p-5 duration-300 ease-brand hover:-translate-y-1 hover:border-olive-300 hover:shadow-card"
              >
                {content}
              </Link>
            ) : (
              <div className="h-full rounded-lg border border-cream-300 bg-cream-50 p-4 sm:p-5">{content}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
