import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { PricingCard } from "../ui/PricingCard";
import { PricingCalculator } from "../ui/PricingCalculator";
import { useLocale } from "../../context/LocaleContext";
import { pricingConfig, resourcePrice, type PricingTier } from "../../content/pricing";
import { interpolate } from "../../i18n";
import { BOOK_CALL_URL } from "../../content/links";

function fmtFreeTier(n: number): string {
  if (n >= 1_000_000) return `${+(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return String(n);
}

export function Pricing() {
  const locale = useLocale();
  const p = locale.dict.pricing;

  const tierName = { free: p.tiers.free, payg: p.tiers.payg, enterprise: p.tiers.enterprise };

  function tierPrice(tier: PricingTier): { price: string; period: string } {
    if (tier.kind === "fixed") return { price: locale.price(tier.amountUsd), period: p.perMonth };
    if (tier.kind === "from") {
      const unit = resourcePrice(tier.fromResource, locale.region);
      return { price: interpolate(p.perUnitFrom, { price: locale.price(unit) }), period: "" };
    }
    return { price: p.custom, period: "" };
  }

  return (
    <section id="pricing" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading>{p.title}</SectionHeading>

          {/* Region toggle - flips every price to that datacenter's rate */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/50">{p.regionLabel}</span>
            <div className="inline-flex rounded-full border border-white/15 bg-black/25 p-1">
              {pricingConfig.regions.map((r) => {
                const active = locale.region === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => locale.setRegion(r.id)}
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                      active ? "bg-white text-ink font-medium" : "text-white/70 hover:text-white"
                    }`}
                  >
                    <span>{r.flag}</span>
                    {locale.dict.regions[r.id]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm text-white/45">{p.currencyNote}</p>

        {/* Interactive cost calculator */}
        <div className="mt-10">
          <PricingCalculator />
        </div>

        {/* Per-resource price table (config-driven, region + currency aware) */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/15 bg-black/70 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-xs font-medium uppercase tracking-wider text-white/45">
            <span>{p.unitColumn}</span>
            <span>{interpolate(p.priceColumn, { region: locale.dict.regions[locale.region] })}</span>
          </div>
          {pricingConfig.resources.map((res) => (
            <div
              key={res.id}
              className="flex items-center justify-between px-5 py-3 text-sm odd:bg-white/[0.02]"
            >
              <span className="text-white/80">{res.unit}</span>
              <span className="font-mono text-brand-green">
                {locale.price(res.priceUsd[locale.region])}
              </span>
            </div>
          ))}
        </div>

        {/* Tier cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {pricingConfig.tiers.map((tier) => {
            const t = tierName[tier.id];
            const { price, period } = tierPrice(tier);
            const features = tier.id === "free"
              ? t.features.map((f) =>
                  interpolate(f, {
                    requests: fmtFreeTier(pricingConfig.freeTier.requests),
                    compute: fmtFreeTier(pricingConfig.freeTier.computeGbS),
                  })
                )
              : t.features;
            return (
              <PricingCard
                key={tier.id}
                name={t.name}
                price={price}
                period={period}
                tagline={t.tagline}
                features={features}
                cta={t.cta}
                featured={tier.featured}
                onCta={() => window.open(BOOK_CALL_URL, "_blank", "noreferrer")}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
