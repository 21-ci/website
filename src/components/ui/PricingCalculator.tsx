import { useState, useMemo } from "react";
import { useLocale } from "../../context/LocaleContext";
import { pricingConfig } from "../../content/pricing";
import { interpolate } from "../../i18n";

const MEMORY_MB = [128, 256, 512, 1024];
const { requests: FREE_REQUESTS, computeGbS: FREE_COMPUTE_GB_S } = pricingConfig.freeTier;

// Log-scale helpers for the requests slider (1K → 100M)
const REQ_MIN = 1_000;
const REQ_MAX = 100_000_000;
function sliderToRequests(s: number) {
  return Math.round(REQ_MIN * Math.pow(REQ_MAX / REQ_MIN, s / 100));
}
function requestsToSlider(r: number) {
  return Math.round((Math.log(r / REQ_MIN) / Math.log(REQ_MAX / REQ_MIN)) * 100);
}
function fmtRequests(n: number): string {
  if (n >= 1_000_000) return `${+(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return String(n);
}
function fmtCompute(gbS: number): string {
  if (gbS >= 1_000_000) return `${+(gbS / 1_000_000).toFixed(1)}M`;
  if (gbS >= 1_000) return `${Math.round(gbS / 1_000)}K`;
  return String(Math.round(gbS));
}

export function PricingCalculator() {
  const { dict, region, price } = useLocale();
  const c = dict.calc;

  const [memIdx, setMemIdx] = useState(0); // index into MEMORY_MB
  const [reqSlider, setReqSlider] = useState(requestsToSlider(5_000_000));
  const [execMs, setExecMs] = useState(200);

  const requests = sliderToRequests(reqSlider);
  const memMb = MEMORY_MB[memIdx];

  const { computeCost, requestCost, total } = useMemo(() => {
    const memPricePerGbS = pricingConfig.resources.find((r) => r.id === "memory")?.priceUsd[region] ?? 0.0000021;
    const reqPricePerM = pricingConfig.resources.find((r) => r.id === "requests")?.priceUsd[region] ?? 0.18;

    const computeGbS = requests * (execMs / 1000) * (memMb / 1024);
    const billableCompute = Math.max(0, computeGbS - FREE_COMPUTE_GB_S);
    const billableReqs = Math.max(0, requests - FREE_REQUESTS);

    const computeCost = billableCompute * memPricePerGbS;
    const requestCost = (billableReqs / 1_000_000) * reqPricePerM;
    return { computeCost, requestCost, total: computeCost + requestCost, computeGbS };
  }, [requests, execMs, memMb, region]);

  const isFree = total === 0;

  return (
    <div className="rounded-2xl border border-white/15 bg-black/70 p-6 backdrop-blur-sm sm:p-8">
      <h3 className="text-lg font-semibold text-white">{c.title}</h3>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Memory selector */}
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/45">{c.memory}</p>
            <div className="flex gap-2">
              {MEMORY_MB.map((mb, i) => (
                <button
                  key={mb}
                  type="button"
                  onClick={() => setMemIdx(i)}
                  className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
                    memIdx === i
                      ? "bg-brand-green/20 text-brand-green border border-brand-green/40"
                      : "bg-white/5 text-white/60 border border-white/8 hover:bg-white/10 hover:text-white/85"
                  }`}
                >
                  {mb < 1024 ? `${mb} MB` : "1 GB"}
                </button>
              ))}
            </div>
          </div>

          {/* Requests slider */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-white/45">{c.requests}</p>
              <span className="text-sm font-mono text-white">{fmtRequests(requests)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={reqSlider}
              onChange={(e) => setReqSlider(Number(e.target.value))}
              className="calc-slider w-full"
            />
            <div className="mt-1 flex justify-between text-[10px] text-white/30">
              <span>1K</span><span>100M</span>
            </div>
          </div>

          {/* Exec time slider */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-white/45">{c.execTime}</p>
              <span className="text-sm font-mono text-white">{execMs} ms</span>
            </div>
            <input
              type="range"
              min={10}
              max={5000}
              step={10}
              value={execMs}
              onChange={(e) => setExecMs(Number(e.target.value))}
              className="calc-slider w-full"
            />
            <div className="mt-1 flex justify-between text-[10px] text-white/30">
              <span>10 ms</span><span>5 000 ms</span>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="flex flex-col justify-between rounded-xl bg-white/[0.04] p-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-white/45">{c.total}</p>
            <p className="mt-3 text-4xl font-bold text-white">
              {isFree ? (
                <span className="text-brand-green">{c.freeTierLabel}</span>
              ) : (
                <>{price(total)}<span className="ml-1 text-lg font-normal text-white/50">{c.perMonth}</span></>
              )}
            </p>
            {!isFree && (
              <p className="mt-2 text-xs text-white/40">
                {interpolate(c.breakdown, {
                  compute: price(computeCost),
                  requests: price(requestCost),
                })}
              </p>
            )}
          </div>

          <div className="mt-6 rounded-lg bg-brand-green/8 px-4 py-3 text-xs leading-relaxed text-white/55">
            {interpolate(c.freeTier, {
              requests: fmtRequests(FREE_REQUESTS),
              compute: fmtCompute(FREE_COMPUTE_GB_S),
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
