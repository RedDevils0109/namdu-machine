import { Container } from "@/components/ui/Container";
import type { Stat } from "@/types";

export function StatsBar({ stats, label }: { stats: Stat[]; label: string }) {
  return (
    <section aria-label={label} className="bg-olive-800 text-cream-50">
      <Container className="grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-4xl font-extrabold text-amber-300">{stat.value}</p>
            <p className="mt-1 text-sm font-medium text-olive-100">{stat.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
