import raw from "./pricing.json";

/**
 * Location-aware pricing. All figures are stored in USD in `pricing.json` and
 * converted to the visitor's currency at render time. Editing the JSON is the
 * only thing needed to change prices, regions, or add a resource line.
 */

export type RegionId = "tashkent" | "almaty" | "frankfurt";

export interface PricingResource {
  id: string;
  unit: string;
  priceUsd: Record<RegionId, number>;
}

export interface PricingRegion {
  id: RegionId;
  flag: string;
}

export type TierId = "free" | "payg" | "enterprise";

export type PricingTier =
  | { id: TierId; kind: "fixed"; amountUsd: number; featured?: boolean }
  | { id: TierId; kind: "from"; fromResource: string; featured?: boolean }
  | { id: TierId; kind: "custom"; featured?: boolean };

export interface FreeTierConfig {
  requests: number;
  computeGbS: number;
}

export interface PricingConfig {
  baseCurrency: string;
  regions: PricingRegion[];
  resources: PricingResource[];
  freeTier: FreeTierConfig;
  tiers: PricingTier[];
}

export const pricingConfig = raw as PricingConfig;

export function resourcePrice(resourceId: string, region: RegionId): number {
  const res = pricingConfig.resources.find((r) => r.id === resourceId);
  return res ? res.priceUsd[region] : 0;
}
