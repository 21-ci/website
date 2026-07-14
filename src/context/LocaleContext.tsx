import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DICTS, type Dict, type LanguageCode } from "../i18n";
import {
  CURRENCIES,
  convertFromUsd,
  formatMoney,
  loadRates,
  type CurrencyCode,
  type Rates,
} from "../lib/currency";
import type { RegionId } from "../content/pricing";

export type CountryCode = "UZ" | "KZ" | "DE" | "INT";

export interface CountryOption {
  code: CountryCode;
  labelKey: string;
  flag: string;
  defaultLanguage: LanguageCode;
  defaultCurrency: CurrencyCode;
  /** Which pricing region this country maps to. */
  defaultRegion: RegionId;
}

export const COUNTRIES: CountryOption[] = [
  { code: "UZ",  labelKey: "Uzbekistan",   flag: "🇺🇿", defaultLanguage: "uz", defaultCurrency: "UZS", defaultRegion: "tashkent" },
  { code: "KZ",  labelKey: "Kazakhstan",   flag: "🇰🇿", defaultLanguage: "ru", defaultCurrency: "KZT", defaultRegion: "almaty"   },
  { code: "DE",  labelKey: "Germany",      flag: "🇩🇪", defaultLanguage: "de", defaultCurrency: "EUR", defaultRegion: "frankfurt" },
  { code: "INT", labelKey: "International",flag: "🌍", defaultLanguage: "en", defaultCurrency: "USD", defaultRegion: "tashkent" },
];

interface LocaleState {
  country: CountryCode;
  language: LanguageCode;
  currency: CurrencyCode;
  region: RegionId;
}

interface LocaleContextValue extends LocaleState {
  dict: Dict;
  rates: Rates;
  /** Convert a USD amount into the active currency and format it. */
  price: (usd: number) => string;
  setCountry: (code: CountryCode) => void;
  setLanguage: (code: LanguageCode) => void;
  setCurrency: (code: CurrencyCode) => void;
  setRegion: (id: RegionId) => void;
}

const STORAGE_KEY = "21cloud:locale";
const FALLBACK_RATES: Rates = { USD: 1, UZS: 12076, KZT: 465, EUR: 0.92 };

const LocaleContext = createContext<LocaleContextValue | null>(null);

// URL format: ?l=UZ_en  (CountryCode_LanguageCode)
function parseUrlLocale(): Partial<LocaleState> | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const l = params.get("l");
    if (!l) return null;
    const sep = l.indexOf("_");
    if (sep < 0) return null;
    const country = l.slice(0, sep).toUpperCase() as CountryCode;
    const language = l.slice(sep + 1).toLowerCase() as LanguageCode;
    const validCountry = COUNTRIES.find((c) => c.code === country);
    if (!validCountry) return null;
    if (!["en", "ru", "uz", "de"].includes(language)) return null;
    return { country, language, currency: validCountry.defaultCurrency, region: validCountry.defaultRegion };
  } catch {
    return null;
  }
}

function loadInitial(): LocaleState {
  const base: LocaleState = { country: "UZ", language: "en", currency: "UZS", region: "tashkent" };
  // URL param takes priority over localStorage
  const fromUrl = parseUrlLocale();
  if (fromUrl) return { ...base, ...fromUrl };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...base, ...(JSON.parse(raw) as Partial<LocaleState>) };
  } catch {
    /* ignore */
  }
  return base;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LocaleState>(loadInitial);
  const [rates, setRates] = useState<Rates>(FALLBACK_RATES);

  useEffect(() => {
    loadRates().then(setRates);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
    document.documentElement.lang = state.language;
    // Sync locale into URL as ?l=COUNTRY_lang
    const params = new URLSearchParams(window.location.search);
    params.set("l", `${state.country}_${state.language}`);
    window.history.replaceState(null, "", `${window.location.pathname}?${params}`);
  }, [state]);

  const value = useMemo<LocaleContextValue>(() => {
    const dict = DICTS[state.language];
    return {
      ...state,
      dict,
      rates,
      price: (usd: number) => formatMoney(convertFromUsd(usd, state.currency, rates), state.currency),
      // Choosing a country presets language + currency + region, but each
      // remains independently overridable afterwards.
      setCountry: (code) =>
        setState((s) => {
          const c = COUNTRIES.find((x) => x.code === code)!;
          return {
            ...s,
            country: code,
            language: c.defaultLanguage,
            currency: c.defaultCurrency,
            region: c.defaultRegion,
          };
        }),
      setLanguage: (language) => setState((s) => ({ ...s, language })),
      setCurrency: (currency) => setState((s) => ({ ...s, currency })),
      setRegion: (region) => setState((s) => ({ ...s, region })),
    };
  }, [state, rates]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export { CURRENCIES };
export type { CurrencyCode };
