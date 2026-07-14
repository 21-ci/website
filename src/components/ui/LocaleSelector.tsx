import { useEffect, useRef, useState } from "react";
import { useLocale, COUNTRIES, CURRENCIES } from "../../context/LocaleContext";
import { LANGUAGES } from "../../i18n";
import type { CurrencyCode } from "../../lib/currency";
import type { LanguageCode } from "../../i18n";

interface OptionRowProps<T extends string> {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}

function OptionRow<T extends string>({ label, options, value, onChange }: OptionRowProps<T>) {
  return (
    <div className="px-3 py-2.5">
      <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-white/45">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
              value === o.value
                ? "bg-white text-ink font-medium"
                : "bg-white/5 text-white/80 hover:bg-white/12"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function LocaleSelector() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const activeCountry = COUNTRIES.find((c) => c.code === locale.country)!;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/85 transition-colors hover:border-white/30 hover:bg-white/10"
      >
        <span className="text-base leading-none">{activeCountry.flag}</span>
        <span className="uppercase">{locale.language}</span>
        <span className="text-white/40">·</span>
        <span>{CURRENCIES[locale.currency].code}</span>
        <svg
          viewBox="0 0 16 16"
          className={`size-3.5 text-white/50 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden
        >
          <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-white/12 bg-ink-soft/95 shadow-2xl backdrop-blur-xl">
          {/* Country row - shows flag + name + language for each option */}
          <div className="px-3 py-2.5">
            <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-white/45">
              {locale.dict.selector.country}
            </p>
            <div className="flex flex-col gap-1">
              {COUNTRIES.map((c) => {
                const langLabel = LANGUAGES.find((l) => l.code === c.defaultLanguage)?.label ?? c.defaultLanguage;
                const active = locale.country === c.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => locale.setCountry(c.code)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors ${
                      active ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <span className="text-xl leading-none">{c.flag}</span>
                    <span className="flex-1">
                      <span className={`block text-sm ${active ? "font-medium text-white" : "text-white/80"}`}>{c.labelKey}</span>
                      <span className="block text-[11px] text-white/40">{langLabel}</span>
                    </span>
                    {active && (
                      <svg viewBox="0 0 16 16" className="size-4 text-brand-green shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M3 8l4 4 6-7" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="h-px bg-white/8" />
          <OptionRow<LanguageCode>
            label={locale.dict.selector.language}
            value={locale.language}
            onChange={locale.setLanguage}
            options={LANGUAGES.map((l) => ({ value: l.code, label: l.label }))}
          />
          <div className="h-px bg-white/8" />
          <OptionRow<CurrencyCode>
            label={locale.dict.selector.currency}
            value={locale.currency}
            onChange={locale.setCurrency}
            options={(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => ({
              value: c,
              label: `${CURRENCIES[c].code} ${CURRENCIES[c].symbol}`,
            }))}
          />
        </div>
      )}
    </div>
  );
}
