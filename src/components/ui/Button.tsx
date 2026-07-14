import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "dark" | "outline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-all duration-200 cursor-pointer select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue " +
  "active:scale-[0.97]";

const variants: Record<Variant, string> = {
  // White pill - the Figma "book a call" style
  primary: "bg-white text-ink hover:bg-mist hover:shadow-glow-blue",
  // Black pill - the Figma secondary style
  dark: "bg-ink text-white hover:bg-ink-soft hover:shadow-glow-green border border-white/10",
  outline:
    "bg-transparent border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button({ variant = "primary", size = "md", className = "", children, ...rest }: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({ variant = "primary", size = "md", className = "", children, ...rest }: LinkProps) {
  return (
    <a className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
