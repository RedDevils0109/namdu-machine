import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HomeContent } from "@/types";
import { cn } from "@/lib/cn";

interface MarketsProps {
  markets: HomeContent["markets"];
  eyebrow: string;
  coreMarketLabel: string;
  className?: string;
}

export function Markets({ markets, eyebrow, coreMarketLabel, className }: MarketsProps) {
  return (
    <section className={cn("py-14 sm:py-20", className)}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={markets.title} subtitle={markets.subtitle} />
        <ul className="mt-12 grid gap-4 sm:gap-6 lg:grid-cols-3">
          {markets.regions.map((region) => (
            <li
              key={region.name}
              className={cn(
                "flex flex-col rounded-lg p-6 sm:p-7",
                region.highlight
                  ? "bg-olive-900 text-cream-50 shadow-card"
                  : "border border-cream-300 bg-cream-50 shadow-soft",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "inline-flex size-11 items-center justify-center rounded-md",
                    region.highlight ? "bg-olive-700 text-amber-200" : "bg-olive-100 text-olive-700",
                  )}
                >
                  <Icon name="globe" className="size-6" />
                </span>
                {region.highlight && (
                  <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-ink-900">
                    {coreMarketLabel}
                  </span>
                )}
              </div>
              <h3 className={cn("mt-5 text-xl font-bold", region.highlight && "text-cream-50")}>{region.name}</h3>
              <p className={cn("mt-2 leading-relaxed", region.highlight ? "text-olive-100" : "text-ink-700")}>
                {region.description}
              </p>
              {region.countries.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {region.countries.map((country) => (
                    <li
                      key={country}
                      className={cn(
                        "rounded-full px-3 py-1 text-sm font-medium",
                        region.highlight
                          ? "bg-olive-800 text-cream-50 ring-1 ring-inset ring-olive-600"
                          : "bg-olive-50 text-olive-800 ring-1 ring-inset ring-olive-200",
                      )}
                    >
                      {country}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
