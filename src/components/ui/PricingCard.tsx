import { Button } from "./Button";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
  onCta?: () => void;
}

export function PricingCard({
  name,
  price,
  period,
  tagline,
  features,
  cta,
  featured = false,
  onCta,
}: PricingCardProps) {
  return (
    <div
      className={`group relative flex h-full flex-col rounded-3xl border p-7 sm:p-8 transition-all duration-300 ${
        featured
          ? "border-white/40 bg-white/10 shadow-glow-blue lg:scale-[1.04]"
          : "border-white/15 bg-black/70 backdrop-blur-sm hover:border-white/30 hover:bg-black/80"
      }`}
    >

      <h3 className="text-sm font-medium uppercase tracking-widest text-white/70">{name}</h3>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-white">{price}</span>
        <span className="text-sm text-white/60">{period}</span>
      </div>
      <p className="mt-1 text-sm text-white/60">{tagline}</p>
      <ul className="mt-6 flex-1 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-white/85">
            <svg
              className="mt-0.5 size-4 shrink-0 text-white"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M3 8.5L6.5 12L13 4.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {f}
          </li>
        ))}
      </ul>
      <Button
        variant={featured ? "primary" : "outline"}
        className="mt-8 w-full"
        onClick={onCta}
      >
        {cta}
      </Button>
    </div>
  );
}
