import { useState } from "react";
import { Plus, ScanSearch, X } from "lucide-react";
import type { Hotspot, Photo } from "@/content/projects";
import { useLang } from "@/lib/i18n";

/**
 * Foto con puntos interactivos: al elegir un punto la imagen se acerca a esa
 * zona y muestra qué es. Los puntos también se pueden elegir desde la lista.
 */
export function PhotoExplorer({ photo, hotspots }: { photo: Photo; hotspots: Hotspot[] }) {
  const { t, l } = useLang();
  const [active, setActive] = useState<number | null>(null);
  const spot = active !== null ? hotspots[active] : null;

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink shadow-soft">
        <img
          src={photo.src}
          srcSet={`${photo.sm} 720w, ${photo.src} 1448w`}
          sizes="(min-width: 768px) 55vw, 100vw"
          width={photo.width}
          height={photo.height}
          alt={l(photo.alt)}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{
            transformOrigin: spot ? `${spot.x}% ${spot.y}%` : "50% 50%",
            transform: spot ? "scale(1.8)" : "scale(1)",
          }}
        />
        {/* Velo para resaltar el punto elegido */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-ink/25 transition-opacity duration-500 ${spot ? "opacity-100" : "opacity-0"}`}
        />

        {/* Puntos */}
        {!spot &&
          hotspots.map((h, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              aria-label={l(h.label)}
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/50 motion-reduce:hidden" />
              <span className="relative grid h-8 w-8 place-items-center rounded-full bg-background text-accent shadow-ember ring-2 ring-accent transition-transform duration-300 group-hover:scale-110">
                <Plus className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
          ))}

        {/* Ficha del punto elegido */}
        {spot && (
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl bg-background/95 p-3 pl-4 shadow-ember backdrop-blur md:inset-x-auto md:left-4 md:max-w-sm">
            <p className="text-sm font-semibold text-navy" aria-live="polite">
              <span className="mr-2 text-accent">
                {(active ?? 0) + 1}/{hotspots.length}
              </span>
              {l(spot.label)}
            </p>
            <button
              type="button"
              onClick={() => setActive(null)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sand text-navy hover:bg-accent hover:text-accent-foreground"
              aria-label={t("projects.explore.reset")}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}

        <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-background backdrop-blur-sm">
          <ScanSearch className="h-3.5 w-3.5" aria-hidden="true" />
          {t("projects.explore")}
        </span>
      </div>

      {/* Lista de detalles (misma función que los puntos) */}
      <ul className="mt-4 flex flex-wrap gap-2">
        {hotspots.map((h, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => setActive(active === i ? null : i)}
              aria-pressed={active === i}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                active === i
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-card text-foreground hover:border-accent/60 hover:text-accent"
              }`}
            >
              {l(h.label)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
