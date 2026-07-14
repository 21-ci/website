import type { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

/** Lowercase, light section titles as in the Figma layout. */
export function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <h2
      className={`text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white ${className}`}
    >
      {children}
    </h2>
  );
}
