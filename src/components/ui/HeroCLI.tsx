import { useEffect, useRef, useState } from "react";

/* ─── Data ──────────────────────────────────────────────────────────── */

const REGIONS = [
  { id: "uz", label: "Uzbekistan (Tashkent)", flag: "🇺🇿", color: "#16a34a" },
  { id: "kz", label: "Kazakhstan (Almaty)",   flag: "🇰🇿", color: "#2563eb" },
  { id: "de", label: "Germany (Frankfurt)",   flag: "🇩🇪", color: "#ef4444" },
] as const;

type RegionId = (typeof REGIONS)[number]["id"];

const STACKS   = ["Node.js", "FastAPI", "Go", "Nest.js", "Bun", "Rust", "Next.js"];
const SERVICES = ["MongoDB", "PostgreSQL", "Redis", "Kafka", "RabbitMQ", "Minio"];

const APP  = "acmeapp";
const URL  = `${APP}.21ci.uz`;
const CMD1 = `~ 21cloud create ${APP}`;
const CMD2 = `~ 21cloud push ${APP}`;
const MAX_PTS = 38;
const TICK_MS = 550;
const SPIN = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

type Phase = "typing" | "ready" | "deploying" | "live";

/* ─── macOS window chrome ───────────────────────────────────────────── */

function MacWin({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl shadow-2xl ${className}`}>
      <div className="flex items-center gap-1.5 bg-[#2d2d2d] px-3 py-2.5">
        <span className="inline-block size-3 rounded-full bg-[#ff5f57]" />
        <span className="inline-block size-3 rounded-full bg-[#febc2e]" />
        <span className="inline-block size-3 rounded-full bg-[#28c840]" />
      </div>
      {children}
    </div>
  );
}

/* ─── Traffic chart ─────────────────────────────────────────────────── */

function TrafficChart({ selected, onRestart }: { selected: RegionId[]; onRestart: () => void }) {
  const [data, setData] = useState<Record<RegionId, number[]>>({
    uz: Array(MAX_PTS).fill(0),
    kz: Array(MAX_PTS).fill(0),
    de: Array(MAX_PTS).fill(0),
  });
  const peak = useRef(600);
  const bases: Record<RegionId, number> = { uz: 0.52, kz: 0.30, de: 0.18 };

  useEffect(() => {
    const id = setInterval(() => {
      peak.current = Math.max(200, peak.current + (Math.random() - 0.47) * 70);
      setData((prev) => {
        const next = { ...prev } as Record<RegionId, number[]>;
        (["uz", "kz", "de"] as RegionId[]).forEach((rid) => {
          const val = selected.includes(rid)
            ? Math.round(peak.current * bases[rid] * (0.65 + Math.random() * 0.7))
            : 0;
          next[rid] = [...prev[rid].slice(1), val];
        });
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [selected]);

  /* chart geometry */
  const LEFT = 38; // px reserved for y-axis labels
  const CW   = 360; // chart width
  const H    = 76;

  const allVals = (Object.values(data) as number[][]).flat();
  const rawMax  = Math.max(50, ...allVals);
  const maxVal  = rawMax * 1.15;

  /* 3 y-axis ticks */
  const ticks = [0, 0.5, 1.0].map((pct) => ({
    label: pct === 0 ? "0" : rawMax > 999
      ? `${((rawMax * pct) / 1000).toFixed(1)}k`
      : String(Math.round(rawMax * pct)),
    y: H - pct * H,
  }));

  function xOf(i: number) { return LEFT + (i / (MAX_PTS - 1)) * CW; }
  function yOf(v: number) { return H - (v / maxVal) * H; }

  function linePath(vals: number[]) {
    return vals.map((v, i) => `${i === 0 ? "M" : "L"} ${xOf(i).toFixed(1)} ${yOf(v).toFixed(1)}`).join(" ");
  }
  function areaPath(vals: number[]) {
    const pts = vals.map((v, i) => `${xOf(i).toFixed(1)},${yOf(v).toFixed(1)}`).join(" L ");
    return `M ${LEFT},${H} L ${pts} L ${LEFT + CW},${H} Z`;
  }

  const activeRegions = REGIONS.filter((r) => selected.includes(r.id));

  return (
    <MacWin className="mt-3">
      <div className="bg-white px-4 pb-3 pt-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] font-medium text-gray-400">requests per region / sec</p>
          <button type="button" onClick={onRestart} className="text-[10px] text-gray-400 transition-colors hover:text-gray-600">
            ↺ restart
          </button>
        </div>

        <svg viewBox={`0 0 ${LEFT + CW} ${H}`} className="w-full" style={{ height: 76 }} preserveAspectRatio="none">
          <defs>
            {activeRegions.map((r) => (
              <linearGradient key={r.id} id={`hg-${r.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={r.color} stopOpacity="0.15" />
                <stop offset="100%" stopColor={r.color} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>

          {/* gridlines */}
          {ticks.map(({ label, y }) => (
            <g key={label}>
              <line x1={LEFT} y1={y} x2={LEFT + CW} y2={y} stroke="#f3f4f6" strokeWidth="1" />
              <text
                x={LEFT - 4}
                y={Math.min(H - 2, Math.max(6, y))}
                textAnchor="end"
                fontSize="7"
                fill="#9ca3af"
                dominantBaseline="middle"
              >
                {label}
              </text>
            </g>
          ))}

          {activeRegions.map((r) => (
            <g key={r.id}>
              <path d={areaPath(data[r.id])} fill={`url(#hg-${r.id})`} />
              <path d={linePath(data[r.id])} fill="none" stroke={r.color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
            </g>
          ))}
        </svg>

        <div className="mt-2 flex flex-wrap gap-3">
          {activeRegions.map((r) => (
            <div key={r.id} className="flex items-center gap-1.5">
              <span className="inline-block h-0.5 w-3 rounded-full" style={{ backgroundColor: r.color }} />
              <span className="text-[10px] text-gray-400">{r.label.split("(")[0].trim()}</span>
            </div>
          ))}
        </div>
      </div>
    </MacWin>
  );
}

/* ─── Main component ────────────────────────────────────────────────── */

export function HeroCLI() {
  const [phase, setPhase]           = useState<Phase>("typing");
  const [typed, setTyped]           = useState("");
  const [showOpts, setShowOpts]     = useState(false);
  const [buildLines, setBuildLines] = useState<string[]>([]);
  const [spinIdx, setSpinIdx]       = useState(0);
  const [launched, setLaunched]     = useState(false);

  const selRegions  = new Set<RegionId>(["uz", "kz", "de"]);
  const selStack    = new Set(["Nest.js"]);
  const selServices = new Set(["MongoDB"]);

  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase === "deploying" || phase === "live") {
      termRef.current?.scrollTo({ top: termRef.current.scrollHeight, behavior: "smooth" });
    } else {
      termRef.current?.scrollTo({ top: 0 });
    }
  }, [phase, buildLines.length]);

  function restart() {
    setPhase("typing");
    setTyped("");
    setShowOpts(false);
    setBuildLines([]);
    setLaunched(false);
  }

  /* auto-type CMD1 */
  useEffect(() => {
    if (phase !== "typing") return;
    let i = 0;
    setTyped("");
    const id = setInterval(() => {
      i++;
      setTyped(CMD1.slice(0, i));
      if (i >= CMD1.length) {
        clearInterval(id);
        setTimeout(() => { setShowOpts(true); setPhase("ready"); }, 200);
      }
    }, 22);
    return () => clearInterval(id);
  }, [phase]);

  /* auto-deploy 800 ms after options appear */
  useEffect(() => {
    if (phase !== "ready") return;
    const id = setTimeout(() => setPhase("deploying"), 800);
    return () => clearTimeout(id);
  }, [phase]);

  /* build sequence */
  useEffect(() => {
    if (phase !== "deploying") return;
    setBuildLines([]);
    setSpinIdx(0);
    setLaunched(false);

    const steps: Array<{ text: string; delay: number }> = [
      { text: CMD2,                              delay: 0    },
      { text: "pushing bundle from working dir", delay: 400  },
      { text: "▸  uploading artifacts...",       delay: 900  },
      { text: "▸  provisioning containers...",   delay: 1600 },
      { text: "▸  running health checks...",     delay: 2200 },
    ];
    const timers: ReturnType<typeof setTimeout>[] = [];
    steps.forEach(({ text, delay }) =>
      timers.push(setTimeout(() => setBuildLines((p) => [...p, text]), delay)),
    );
    let s = 0;
    const spinId = setInterval(() => setSpinIdx(s++ % SPIN.length), 90);
    timers.push(
      setTimeout(() => {
        clearInterval(spinId);
        setLaunched(true);
        setTimeout(() => setPhase("live"), 500);
      }, 2800),
    );
    return () => { timers.forEach(clearTimeout); clearInterval(spinId); };
  }, [phase]);

  const isBuild = phase === "deploying" || phase === "live";

  return (
    <div className="flex select-none flex-col gap-3">
      <MacWin>
        {/* scrollable terminal body - dark */}
        <div
          ref={termRef}
          className="overflow-y-auto bg-[#0d1117] px-4 pt-3 pb-2 font-mono text-[11px] leading-relaxed"
          style={{ height: 268 }}
        >
          {/* CMD1 */}
          <p className="text-emerald-400">
            {typed}
            {phase === "typing" && <span className="animate-pulse text-white/40">█</span>}
          </p>

          {/* config */}
          {showOpts && !isBuild && (
            <div className="mt-1 space-y-1">
              <p className="text-white/40">
                name: <span className="text-white/80">Acme Industries App</span>
              </p>

              <div className="mt-2">
                <p className="mb-0.5 text-[10px] uppercase tracking-wider text-[#febc2e]">regions:</p>
                {REGIONS.map((r) => (
                  <div key={r.id} className="flex items-center gap-2 py-0.5">
                    <span className="size-1.5 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                    <span className="flex-1 text-white/80">{r.flag}  {r.label}</span>
                    <span className="text-emerald-400">[✓]</span>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <p className="mb-0.5 text-[10px] uppercase tracking-wider text-[#febc2e]">technology:</p>
                <div className="grid grid-cols-2 gap-x-4">
                  {STACKS.map((s) => (
                    <div key={s} className="flex items-center gap-2 py-0.5">
                      <span className="shrink-0 text-white/20">-</span>
                      <span className={`flex-1 ${selStack.has(s) ? "text-white/90" : "text-white/30"}`}>{s}</span>
                      <span className={selStack.has(s) ? "text-emerald-400" : "text-white/20"}>{selStack.has(s) ? "[✓]" : "[  ]"}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-2">
                <p className="mb-0.5 text-[10px] uppercase tracking-wider text-[#febc2e]">services:</p>
                <div className="grid grid-cols-2 gap-x-4">
                  {SERVICES.map((s) => (
                    <div key={s} className="flex items-center gap-2 py-0.5">
                      <span className="shrink-0 text-white/20">-</span>
                      <span className={`flex-1 ${selServices.has(s) ? "text-white/90" : "text-white/30"}`}>{s}</span>
                      <span className={selServices.has(s) ? "text-emerald-400" : "text-white/20"}>{selServices.has(s) ? "[✓]" : "[  ]"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* build output */}
          {isBuild && (
            <div className="mt-1 space-y-0.5">
              {buildLines.map((l, i) => (
                <p key={i} className={i === 0 ? "text-emerald-400" : "text-white/50"}>{l}</p>
              ))}
              {phase === "deploying" && !launched && (
                <p className="text-white/30">{SPIN[spinIdx]} building…</p>
              )}
              {launched && (
                <p className="font-semibold text-emerald-400">
                  ✓ launched {APP} at <span className="text-sky-400">{URL}</span>!
                </p>
              )}
            </div>
          )}
        </div>

        {/* status bar - always visible */}
        <div className="flex items-center gap-3 border-t border-white/10 bg-[#0a0c10] px-4 py-2">
          <span className="font-mono text-[10px] text-white/30">
            url <span className="text-sky-400">{URL}</span>
          </span>
          <span className="ml-auto font-mono text-[10px] text-white/30">
            {phase === "typing" && "initializing…"}
            {phase === "ready" && <span className="text-amber-400">deploying in 2s…</span>}
            {phase === "deploying" && <span className="animate-pulse text-amber-400">building…</span>}
            {phase === "live" && <span className="text-emerald-400">● live</span>}
          </span>
        </div>
      </MacWin>

      {phase === "live" && (
        <TrafficChart selected={[...selRegions]} onRestart={restart} />
      )}
    </div>
  );
}
