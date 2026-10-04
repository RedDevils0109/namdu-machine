import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-cream-300 bg-cream-50 shadow-soft",
        interactive &&
          "transition duration-300 ease-brand hover:-translate-y-1 hover:border-olive-300 hover:shadow-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}
