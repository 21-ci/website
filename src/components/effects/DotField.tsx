import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
}

interface DotFieldProps {
  /** Distance between dots in px */
  gap?: number;
  /** Pointer influence radius in px */
  radius?: number;
  className?: string;
}

/**
 * Interactive dot-field background (reactbits.dev/backgrounds/dot-field style).
 * Dots are pushed away from the pointer with a spring return; brightness rises
 * near the cursor. Renders on a fixed canvas behind all content.
 */
export function DotField({ gap = 28, radius = 140, className = "" }: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dots: Dot[] = [];
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999 };

    const build = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap;
          const y = j * gap;
          dots.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const r2 = radius * radius;

      for (const d of dots) {
        if (!reduceMotion) {
          const dx = d.x - pointer.x;
          const dy = d.y - pointer.y;
          const dist2 = dx * dx + dy * dy;

          if (dist2 < r2 && dist2 > 0.01) {
            const dist = Math.sqrt(dist2);
            const force = ((radius - dist) / radius) * 1.6;
            d.vx += (dx / dist) * force;
            d.vy += (dy / dist) * force;
          }
          // spring back to origin + damping
          d.vx += (d.ox - d.x) * 0.06;
          d.vy += (d.oy - d.y) * 0.06;
          d.vx *= 0.86;
          d.vy *= 0.86;
          d.x += d.vx;
          d.y += d.vy;
        }

        const pdx = d.ox - pointer.x;
        const pdy = d.oy - pointer.y;
        const pd2 = pdx * pdx + pdy * pdy;
        const near = pd2 < r2 * 4 ? 1 - Math.sqrt(pd2) / (radius * 2) : 0;
        const alpha = 0.10 + near * 0.5;
        const size = 1 + near * 0.8;

        ctx.beginPath();
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    build();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", build);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [gap, radius]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
    />
  );
}
