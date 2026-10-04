import { cn } from "@/lib/cn";

type Tone = "olive" | "amber" | "cream";

const tones: Record<Tone, string> = {
  olive: "bg-olive-100 text-olive-800 ring-olive-200",
  amber: "bg-amber-100 text-amber-800 ring-amber-200",
  cream: "bg-cream-50/90 text-olive-900 ring-cream-300",
};

export function Badge({
  children,
  tone = "olive",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
