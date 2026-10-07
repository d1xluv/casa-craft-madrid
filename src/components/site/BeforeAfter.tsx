import { useCallback, useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import type { Photo } from "@/content/projects";
import { useLang } from "@/lib/i18n";

type Props = {
  before: Photo;
  after: Photo;
  className?: string;
  /** Carga prioritaria (imagen principal de la página). */
  priority?: boolean;
};

/**
 * Comparador antes/después. Se arrastra con ratón o dedo en cualquier punto
 * de la imagen, y con el teclado (flechas, Inicio, Fin) sobre el control.
 */
export function BeforeAfter({ before, after, className = "", priority = false }: Props) {
  const { t, l } = useLang();
  const ref = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(50);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (dragging.current) setFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [setFromClientX]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    const map: Record<string, (p: number) => number> = {
      ArrowLeft: (p) => p - step,
      ArrowDown: (p) => p - step,
      ArrowRight: (p) => p + step,
      ArrowUp: (p) => p + step,
      Home: () => 0,
      End: () => 100,
    };
    const fn = map[e.key];
    if (!fn) return;
    e.preventDefault();
    setPos((p) => Math.min(100, Math.max(0, fn(p))));
  };

  const imgProps = {
    loading: priority ? ("eager" as const) : ("lazy" as const),
    decoding: "async" as const,
    draggable: false,
    sizes: "(min-width: 1024px) 45vw, 100vw",
  };

  return (
    <div
      ref={ref}
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
      className={`relative isolate aspect-[4/3] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl bg-ink shadow-soft ${className}`}
    >
      <img
        src={after.src}
        srcSet={`${after.sm} 720w, ${after.src} 1448w`}
        width={after.width}
        height={after.height}
        alt={l(after.alt)}
        {...imgProps}
        fetchPriority={priority ? "high" : undefined}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={before.src}
          srcSet={`${before.sm} 720w, ${before.src} 1448w`}
          width={before.width}
          height={before.height}
          alt={l(before.alt)}
          {...imgProps}
          className="h-full w-full object-cover"
        />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/75 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-paper backdrop-blur-sm">
        {l(before.label)}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-paper">
        {l(after.label)}
      </span>

      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-paper shadow-[0_0_10px_rgb(0_0_0/0.35)]" />
        <div
          role="slider"
          tabIndex={0}
          aria-label={t("projects.compareLabel")}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% ${l(before.label).toLowerCase()}`}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-grab place-items-center rounded-full bg-paper text-navy shadow-lg ring-1 ring-black/5 transition-transform duration-200 hover:scale-105 active:cursor-grabbing focus-visible:outline-offset-4"
        >
          <MoveHorizontal className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
