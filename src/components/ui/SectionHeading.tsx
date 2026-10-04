import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-olive-600">{eyebrow}</p>
      )}
      <Tag className="text-[1.75rem] leading-tight font-bold sm:text-4xl">{title}</Tag>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-ink-700 sm:text-lg">{subtitle}</p>}
    </div>
  );
}
