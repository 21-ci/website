/**
 * Currency conversion backed by the Central Bank of Uzbekistan (cbu.uz) public
 * JSON API. All catalog prices are stored in USD; rates below express "how many
 * units of the target currency equal 1 USD". Cross-rates (KZT, EUR) are derived
 * through UZS, which is the pivot the CBU quotes everything against.
 */

export type CurrencyCode = "USD" | "UZS" | "KZT" | "EUR";

export interface CurrencyMeta {
  code: CurrencyCode;
  symbol: string;
  /** Fraction digits to show for typical UI amounts. */
  decimals: number;
  /** Locale used by Intl.NumberFormat for grouping. */
  numberLocale: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyMeta> = {
  USD: { code: "USD", symbol: "$", decimals: 2, numberLocale: "en-US" },
  UZS: { code: "UZS", symbol: "so'm", decimals: 0, numberLocale: "ru-RU" },
  KZT: { code: "KZT", symbol: "₸", decimals: 0, numberLocale: "ru-RU" },
  EUR: { code: "EUR", symbol: "€", decimals: 2, numberLocale: "de-DE" },
};

/** Multipliers: target units per 1 USD. USD is always 1. */
export type Rates = Record<CurrencyCode, number>;

/** Static fallback used when the network is unavailable (approx. mid-2026). */
const FALLBACK_RATES: Rates = { USD: 1, UZS: 12076, KZT: 465, EUR: 0.92 };

const CBU_ENDPOINT = "https://cbu.uz/uz/arkhiv-kursov-valyut/json";
const CACHE_KEY = "21cloud:fx-rates";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6h

interface CachedRates {
  rates: Rates;
  fetchedAt: number;
}

function readCache(): CachedRates | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedRates;
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(rates: Rates) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ rates, fetchedAt: Date.now() } satisfies CachedRates),
    );
  } catch {
    /* ignore quota / privacy-mode errors */
  }
}

async function fetchCbuRate(ccy: "USD" | "KZT" | "EUR"): Promise<number> {
  const res = await fetch(`${CBU_ENDPOINT}/${ccy}/`);
  if (!res.ok) throw new Error(`CBU ${ccy} ${res.status}`);
  const data = (await res.json()) as Array<{ Rate: string; Nominal: string }>;
  const row = data[0];
  return parseFloat(row.Rate) / parseFloat(row.Nominal); // UZS per 1 unit
}

/**
 * Resolve live rates. Returns cached values immediately if fresh, otherwise
 * queries CBU and falls back to static rates on any failure. Never throws.
 */
export async function loadRates(): Promise<Rates> {
  const cached = readCache();
  if (cached) return cached.rates;

  try {
    const [uzsPerUsd, uzsPerKzt, uzsPerEur] = await Promise.all([
      fetchCbuRate("USD"),
      fetchCbuRate("KZT"),
      fetchCbuRate("EUR"),
    ]);
    const rates: Rates = {
      USD: 1,
      UZS: uzsPerUsd,
      KZT: uzsPerUsd / uzsPerKzt,
      EUR: uzsPerUsd / uzsPerEur,
    };
    writeCache(rates);
    return rates;
  } catch {
    return FALLBACK_RATES;
  }
}

/** Convert an amount given in USD into the target currency. */
export function convertFromUsd(usd: number, to: CurrencyCode, rates: Rates): number {
  return usd * rates[to];
}

/**
 * Format a converted amount. Very small unit prices (serverless per-ms figures)
 * keep significant digits instead of rounding to the currency's default.
 */
export function formatMoney(amount: number, code: CurrencyCode): string {
  const meta = CURRENCIES[code];
  let decimals = meta.decimals;

  // Keep precision for sub-unit prices so they never collapse to "0".
  if (amount !== 0 && Math.abs(amount) < 1) {
    const firstSignificant = Math.max(0, -Math.floor(Math.log10(Math.abs(amount))));
    decimals = Math.min(firstSignificant + 2, 8);
  }

  const formatted = new Intl.NumberFormat(meta.numberLocale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(amount);

  return code === "USD" ? `${meta.symbol}${formatted}` : `${formatted} ${meta.symbol}`;
}
