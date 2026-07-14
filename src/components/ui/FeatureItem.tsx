import type { ReactNode } from "react";

interface FeatureItemProps {
  lead: string;
  text: string;
  index: number;
  icon?: ReactNode;
}

export function FeatureItem({ lead, text, index, icon }: FeatureItemProps) {
  return (
    <li
      className="flex items-start gap-3 animate-fade-up"
      style={{ animationDelay: `${150 + index * 90}ms` }}
    >
      <span aria-hidden className="mt-1 flex size-5 shrink-0 items-center justify-center text-brand-green">
        {icon ?? (
          <span className="size-1.5 rounded-full bg-brand-green shadow-glow-green" />
        )}
      </span>
      <p className="text-base sm:text-lg leading-relaxed text-mist-dim">
        <span className="text-brand-green font-medium">{lead}</span>
        {text}
      </p>
    </li>
  );
}
