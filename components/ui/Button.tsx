import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ease-out";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] text-white shadow-[0_14px_34px_-12px_var(--glow)] hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-14px_var(--glow)]",
  outline:
    "border border-[var(--border)] text-[var(--text-1)] bg-[var(--surface-3)] backdrop-blur hover:border-[var(--blue-2)] hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  md: "px-7 py-3.5 text-sm",
  sm: "px-4.5 py-2.5 text-[13px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </a>
  );
}
