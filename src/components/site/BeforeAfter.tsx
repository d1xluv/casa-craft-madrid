import { useCallback, useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

type Props = {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  alt: string;
  className?: string;
};

/** Draggable before/after comparison slider. Works with mouse, touch and keyboard. */
export function BeforeAfter({ before, after, beforeLabel, afterLabel, alt, className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(50);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      setFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [setFromClientX]);

  return (
    <div
      ref={ref}
      onPointerDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
      className={`group relative isolate w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl bg-ink shadow-soft transition-shadow duration-500 hover:shadow-ember ${className}`}
    >
      {/* after (base layer) */}
      <img
        src={after}
        alt={`${alt} — ${afterLabel}`}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
      />

      {/* before (clipped layer) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={before}
          alt={`${alt} — ${beforeLabel}`}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover"
        />
      </div>

      {/* labels */}
      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-background backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">
        {afterLabel}
      </span>

      {/* divider + handle */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-background/90 shadow-[0_0_12px_rgba(0,0,0,0.45)]" />
        <button
          type="button"
          tabIndex={0}
          aria-label={`${beforeLabel} / ${afterLabel}`}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
          }}
          className="pointer-events-auto absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-background text-foreground shadow-soft ring-1 ring-border transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <MoveHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
