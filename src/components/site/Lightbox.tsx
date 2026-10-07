import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/content/projects";
import { useLang } from "@/lib/i18n";

type Props = {
  photos: Photo[];
  /** Índice abierto, o null si está cerrado. */
  index: number | null;
  title: string;
  onClose: () => void;
};

/**
 * Visor de fotos a pantalla completa con <dialog> nativo: atrapa el foco,
 * se cierra con Escape y devuelve el foco al botón que lo abrió.
 * Flechas del teclado y deslizar con el dedo para cambiar de foto.
 */
export function Lightbox({ photos, index, title, onClose }: Props) {
  const { t, l } = useLang();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState(0);
  const touchX = useRef<number | null>(null);

  // Cierre explícito: no depende del evento nativo "close", que el navegador
  // puede retrasar. El listener nativo cubre cualquier otro cierre.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const close = useCallback(() => {
    dialogRef.current?.close();
    onCloseRef.current();
  }, []);
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const handle = () => onCloseRef.current();
    d.addEventListener("close", handle);
    return () => d.removeEventListener("close", handle);
  }, []);

  const go = useCallback(
    (delta: number) => setCurrent((c) => (c + delta + photos.length) % photos.length),
    [photos.length],
  );

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (index !== null) {
      setCurrent(index);
      if (!d.open) d.showModal();
      document.body.style.overflow = "hidden";
    } else if (d.open) {
      d.close();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [index]);

  // Precarga de la foto siguiente.
  useEffect(() => {
    if (index === null || photos.length < 2) return;
    const img = new Image();
    img.src = photos[(current + 1) % photos.length].src;
  }, [current, index, photos]);

  const photo = photos[current];
  const many = photos.length > 1;

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={title}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          close();
          return;
        }
        if (!many) return;
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onClick={(e) => {
        // Clic fuera de la foto (sobre el fondo) cierra el visor.
        if (
          e.target === e.currentTarget ||
          (e.target as HTMLElement).dataset.backdrop !== undefined
        ) {
          close();
        }
      }}
    >
      {index !== null && photo && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
            <p className="min-w-0 truncate text-sm text-paper/80">
              <span className="font-semibold text-paper">{title}</span>
              {many && (
                <span className="ml-3 tabular-nums text-paper/60">
                  {current + 1} {t("lightbox.of")} {photos.length}
                </span>
              )}
            </p>
            <button
              type="button"
              autoFocus
              onClick={close}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-md text-paper transition-colors hover:bg-paper/10"
              aria-label={t("lightbox.close")}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div
            data-backdrop=""
            className="relative flex min-h-0 flex-1 items-center justify-center px-2 md:px-20"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null || !many) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <figure className="flex h-full w-full min-h-0 flex-col items-center py-2">
              <div className="relative min-h-0 w-full flex-1">
                <img
                  key={photo.src}
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  alt={l(photo.alt)}
                  className="lightbox-img absolute inset-0 h-full w-full object-contain"
                />
              </div>
              <figcaption className="mt-3 flex max-w-3xl shrink-0 items-start gap-2 px-2 text-left text-sm text-paper/75 md:items-center">
                <span className="shrink-0 rounded-full bg-paper/15 px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-paper">
                  {l(photo.label)}
                </span>
                <span className="line-clamp-2">{l(photo.alt)}</span>
              </figcaption>
            </figure>

            {many && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={t("lightbox.prev")}
                  className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/20 md:grid"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={t("lightbox.next")}
                  className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/20 md:grid"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          {many && (
            <div className="flex shrink-0 items-center justify-center gap-2 border-t border-paper/10 px-4 pb-5 pt-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t("lightbox.prev")}
                className="grid h-11 w-11 place-items-center rounded-full bg-paper/10 text-paper md:hidden"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              {photos.map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`${l(p.label)} (${i + 1})`}
                  aria-current={i === current ? "true" : undefined}
                  className={`h-12 w-16 overflow-hidden rounded-sm ring-2 transition-opacity ${
                    i === current ? "ring-paper" : "opacity-50 ring-transparent hover:opacity-90"
                  }`}
                >
                  <img src={p.sm} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t("lightbox.next")}
                className="grid h-11 w-11 place-items-center rounded-full bg-paper/10 text-paper md:hidden"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
