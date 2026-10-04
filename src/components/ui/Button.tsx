import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "accent" | "primary" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  accent: "bg-amber-400 text-ink-900 hover:bg-amber-300 shadow-soft",
  primary: "bg-olive-700 text-cream-50 hover:bg-olive-800 shadow-soft",
  outline: "border border-olive-700 text-olive-800 hover:bg-olive-50",
  ghost: "text-olive-800 hover:bg-olive-100",
  light: "bg-cream-50 text-olive-900 hover:bg-cream-200 shadow-soft",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-5 text-base sm:px-7",
};

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors duration-200 ease-brand",
    variants[variant],
    sizes[size],
    className,
  );

  if (external || /^(https?:|mailto:|tel:)/.test(href)) {
    const isWeb = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        target={isWeb ? "_blank" : undefined}
        rel={isWeb ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
