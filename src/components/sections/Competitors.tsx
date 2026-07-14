import { useState } from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { useLocale } from "../../context/LocaleContext";
import type { RegionId } from "../../content/pricing";

type PingRegion = RegionId;

interface Competitor {
  name: string;
  coldStart: string;
  pingByRegion: Record<PingRegion, string>;
  languages: string;
  requests1M: string;
  highlight?: boolean;
  localRegions?: PingRegion[];
}

const COMPETITORS: Competitor[] = [
  {
    name: "21 Cloud",
    highlight: true,
    coldStart: "< 10 ms",
    pingByRegion: {
      tashkent: "3 – 8 ms",
      almaty:   "4 – 10 ms",
      frankfurt: "3 – 8 ms",
    },
    localRegions: ["tashkent", "almaty", "frankfurt"],
    languages: "JS · TS · Python · Go · Rust · WASM",
    requests1M: "$0.18",
  },
  {
    name: "Cloudflare Workers",
    coldStart: "< 5 ms",
    pingByRegion: {
      tashkent: "30 – 50 ms",
      almaty:   "35 – 55 ms",
      frankfurt: "5 – 15 ms",
    },
    languages: "JS · TS · WASM only",
    requests1M: "$0.30",
  },
  {
    name: "AWS Lambda",
    coldStart: "100 ms – 3 s",
    pingByRegion: {
      tashkent: "80 – 130 ms",
      almaty:   "90 – 140 ms",
      frankfurt: "15 – 30 ms",
    },
    languages: "15+ runtimes",
    requests1M: "$0.20",
  },
  {
    name: "Vercel Functions",
    coldStart: "50 – 800 ms",
    pingByRegion: {
      tashkent: "80 – 150 ms",
      almaty:   "90 – 160 ms",
      frankfurt: "10 – 25 ms",
    },
    languages: "JS · TS · Python · Ruby · Go · Rust",
    requests1M: "$0.60",
  },
  {
    name: "Railway",
    coldStart: "N/A (always-on)",
    pingByRegion: {
      tashkent: "100 – 180 ms",
      almaty:   "110 – 190 ms",
      frankfurt: "20 – 50 ms",
    },
    languages: "Any (Docker)",
    requests1M: "N/A",
  },
];

const PING_REGIONS: { id: PingRegion; flag: string; shortLabel: string }[] = [
  { id: "tashkent", flag: "🇺🇿", shortLabel: "UZ" },
  { id: "almaty",   flag: "🇰🇿", shortLabel: "KZ" },
  { id: "frankfurt",flag: "🇩🇪", shortLabel: "DE" },
];

type ColKey = "coldStart" | "ping" | "languages" | "requests";

export function Competitors() {
  const { dict, region: localeRegion } = useLocale();
  const c = dict.compare;

  // Default ping region to the user's current pricing region.
  const [pingRegion, setPingRegion] = useState<PingRegion>(localeRegion);
  const [activeCol, setActiveCol] = useState<ColKey | null>(null);

  function toggleCol(col: ColKey) {
    setActiveCol((prev) => (prev === col ? null : col));
  }

  function colHeaderClass(col: ColKey) {
    return `cursor-pointer select-none px-5 py-3 font-medium transition-colors hover:text-white ${
      activeCol === col ? "text-white" : "text-white/55"
    }`;
  }

  function colCellClass(col: ColKey, extra = "") {
    return `px-5 py-3.5 transition-colors ${
      activeCol === col ? "bg-white/[0.06]" : ""
    } ${extra}`;
  }

  return (
    <section id="compare" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <SectionHeading>{c.title}</SectionHeading>
        <p className="mt-3 max-w-2xl text-sm text-white/75">{c.subtitle}</p>

        {/* Desktop table */}
        <div className="mt-8 hidden overflow-hidden rounded-2xl border border-white/15 bg-black/70 backdrop-blur-sm md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/12 text-left text-xs uppercase tracking-wider">
                {/* Provider header */}
                <th className="px-5 py-3 font-medium text-white/55">{c.provider}</th>

                {/* Cold start */}
                <th
                  className={colHeaderClass("coldStart")}
                  onClick={() => toggleCol("coldStart")}
                  title="click to highlight column"
                >
                  {c.coldStart}
                  {activeCol === "coldStart" && <span className="ml-1 text-brand-green">▾</span>}
                </th>

                {/* Ping - with inline region picker */}
                <th
                  className={colHeaderClass("ping") + " group"}
                  onClick={() => toggleCol("ping")}
                >
                  <div className="flex flex-col gap-1.5">
                    <span>
                      {c.pingCol}
                      {activeCol === "ping" && <span className="ml-1 text-brand-green">▾</span>}
                    </span>
                    {/* Region switcher - stop propagation so clicking a pill doesn't toggle highlight */}
                    <div
                      className="flex gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {PING_REGIONS.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setPingRegion(r.id)}
                          className={`rounded px-1.5 py-0.5 text-[10px] font-semibold transition-colors ${
                            pingRegion === r.id
                              ? "bg-white text-ink"
                              : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
                          }`}
                        >
                          {r.flag} {r.shortLabel}
                        </button>
                      ))}
                    </div>
                  </div>
                </th>

                {/* Languages */}
                <th
                  className={colHeaderClass("languages")}
                  onClick={() => toggleCol("languages")}
                >
                  {c.languages}
                  {activeCol === "languages" && <span className="ml-1 text-brand-green">▾</span>}
                </th>

                {/* Requests */}
                <th
                  className={colHeaderClass("requests")}
                  onClick={() => toggleCol("requests")}
                >
                  {c.requests}
                  {activeCol === "requests" && <span className="ml-1 text-brand-green">▾</span>}
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPETITORS.map((row) => {
                const isLocal = row.localRegions?.includes(pingRegion);
                return (
                  <tr
                    key={row.name}
                    className={`border-b border-white/[0.07] last:border-0 ${
                      row.highlight ? "bg-brand-blue/15" : "odd:bg-white/[0.025]"
                    }`}
                  >
                    {/* Provider name */}
                    <td className="px-5 py-3.5">
                      <span className={`font-semibold ${row.highlight ? "text-white" : "text-white/85"}`}>
                        {row.highlight && (
                          <span className="mr-2 inline-block size-1.5 rounded-full bg-brand-green shadow-glow-green align-middle" />
                        )}
                        {row.name}
                      </span>
                    </td>

                    {/* Cold start */}
                    <td className={colCellClass("coldStart", `font-mono ${row.highlight ? "text-brand-green" : "text-white/80"}`)}>
                      {row.coldStart}
                    </td>

                    {/* Ping */}
                    <td className={colCellClass("ping", `font-mono ${row.highlight ? "text-brand-green" : "text-white/80"}`)}>
                      {row.pingByRegion[pingRegion]}
                      {isLocal && (
                        <span className="ml-2 rounded bg-brand-green/20 px-1.5 py-0.5 text-[10px] font-semibold text-brand-green">
                          {c.local}
                        </span>
                      )}
                    </td>

                    {/* Languages */}
                    <td className={colCellClass("languages", row.highlight ? "text-white/90" : "text-white/75")}>
                      {row.languages}
                    </td>

                    {/* Requests */}
                    <td className={colCellClass("requests", `font-mono ${row.highlight ? "text-brand-green" : "text-white/80"}`)}>
                      {row.requests1M}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mt-6 flex flex-col gap-4 md:hidden">
          {/* Ping region selector for mobile */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/60">{c.pingRegionLabel}</span>
            <div className="flex gap-1.5">
              {PING_REGIONS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setPingRegion(r.id)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                    pingRegion === r.id
                      ? "bg-white text-ink"
                      : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {r.flag} {r.shortLabel}
                </button>
              ))}
            </div>
          </div>

          {COMPETITORS.map((row) => {
            const isLocal = row.localRegions?.includes(pingRegion);
            return (
              <div
                key={row.name}
                className={`rounded-2xl border p-4 ${
                  row.highlight
                    ? "border-brand-green/30 bg-brand-blue/20"
                    : "border-white/12 bg-black/60"
                }`}
              >
                <p className={`mb-3 font-semibold ${row.highlight ? "text-white" : "text-white/85"}`}>
                  {row.highlight && (
                    <span className="mr-2 inline-block size-1.5 rounded-full bg-brand-green shadow-glow-green align-middle" />
                  )}
                  {row.name}
                </p>
                <dl className="grid grid-cols-2 gap-x-3 gap-y-3 text-xs">
                  <div>
                    <dt className="text-[10px] uppercase tracking-wide text-white/45">{c.coldStart}</dt>
                    <dd className={`mt-0.5 font-mono ${row.highlight ? "text-brand-green" : "text-white/80"}`}>
                      {row.coldStart}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-wide text-white/45">{c.pingCol}</dt>
                    <dd className={`mt-0.5 font-mono ${row.highlight ? "text-brand-green" : "text-white/80"}`}>
                      {row.pingByRegion[pingRegion]}
                      {isLocal && (
                        <span className="ml-1 rounded bg-brand-green/20 px-1 py-px text-[9px] font-semibold text-brand-green">
                          {c.local}
                        </span>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-wide text-white/45">{c.requests}</dt>
                    <dd className={`mt-0.5 font-mono ${row.highlight ? "text-brand-green" : "text-white/80"}`}>
                      {row.requests1M}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-wide text-white/45">{c.languages}</dt>
                    <dd className={`mt-0.5 ${row.highlight ? "text-white/90" : "text-white/75"}`}>
                      {row.languages}
                    </dd>
                  </div>
                </dl>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
