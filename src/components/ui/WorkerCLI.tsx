import { useEffect, useRef, useState } from "react";

interface Line {
  text: string;
  isCmd: boolean;
  color?: string; // tailwind text class
}

const CHAR_MS = 30;
const OUT_GAP = 80; // ms between output lines

/* Sequence of steps to play */
type Step =
  | { k: "type"; text: string }
  | { k: "out"; text: string; color?: string }
  | { k: "wait"; ms: number };

const STEPS: Step[] = [
  { k: "type", text: "$ docker run -p 3000:3000 ghcr.io/21-ci/worker:latest" },
  { k: "wait", ms: 450 },
  { k: "out",  text: "[worker] scanning wasm_files/ ..." },
  { k: "out",  text: "[worker] 0 components pre-loaded" },
  { k: "out",  text: "[worker] listening  0.0.0.0:3000" },
  { k: "out",  text: "[worker] domain-srv 0.0.0.0:3030" },
  { k: "wait", ms: 700 },
  { k: "type", text: "$ curl -X POST --data-binary @acmeapp.wasm \\" },
  { k: "type", text: '    "localhost:3000/init?name=acmeapp"' },
  { k: "wait", ms: 350 },
  { k: "out",  text: "acmeapp", color: "text-emerald-400" },
  { k: "wait", ms: 600 },
  { k: "type", text: '$ curl localhost:3000/acmeapp -d \'{"name":"world"}\'' },
  { k: "wait", ms: 280 },
  { k: "out",  text: "HTTP/1.1 200 OK" },
  { k: "out",  text: "content-type: application/json" },
  { k: "out",  text: "" },
  { k: "out",  text: '{"message":"Hello, world!","runtime":"wasm"}', color: "text-sky-300" },
  { k: "wait", ms: 2400 },
];

function MacWin({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl shadow-2xl">
      <div className="flex items-center gap-1.5 bg-[#2d2d2d] px-3 py-2.5">
        <span className="inline-block size-3 rounded-full bg-[#ff5f57]" />
        <span className="inline-block size-3 rounded-full bg-[#febc2e]" />
        <span className="inline-block size-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[10px] text-white/35">21cloud worker</span>
      </div>
      {children}
    </div>
  );
}

export function WorkerCLI() {
  const [lines, setLines]   = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;

    function sleep(ms: number) {
      return new Promise<void>((res) => setTimeout(res, ms));
    }

    async function run() {
      setLines([]);
      setTyping("");

      for (const step of STEPS) {
        if (!alive) return;

        if (step.k === "type") {
          const { text } = step;
          for (let i = 1; i <= text.length; i++) {
            if (!alive) return;
            setTyping(text.slice(0, i));
            await sleep(CHAR_MS);
          }
          if (!alive) return;
          setLines((p) => [...p, { text, isCmd: true }]);
          setTyping("");
        } else if (step.k === "out") {
          setLines((p) => [...p, { text: step.text, isCmd: false, color: step.color }]);
          await sleep(OUT_GAP);
        } else if (step.k === "wait") {
          await sleep(step.ms);
        }
      }
    }

    run();
    return () => { alive = false; };
  }, []);

  /* auto-scroll to bottom */
  useEffect(() => {
    termRef.current?.scrollTo({ top: termRef.current.scrollHeight });
  }, [lines, typing]);

  return (
    <MacWin>
      <div
        ref={termRef}
        className="overflow-y-auto bg-[#0d1117] px-4 py-3 font-mono text-[11px] leading-relaxed"
        style={{ height: 260 }}
      >
        {lines.map((l, i) =>
          l.isCmd ? (
            <p key={i} className="text-white/90">{l.text}</p>
          ) : l.text === "" ? (
            <p key={i} className="h-[1em]" />
          ) : (
            <p key={i} className={l.color ?? "text-white/50"}>{l.text}</p>
          ),
        )}
        {typing && (
          <p className="text-white/90">
            {typing}
            <span className="animate-pulse text-white/40">█</span>
          </p>
        )}
      </div>
    </MacWin>
  );
}
