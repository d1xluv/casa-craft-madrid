import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Pause, Phone, Play, Star } from "lucide-react";
import { useLang, type Localized } from "@/lib/i18n";
import { PHONE_DISPLAY, TEL_URL } from "@/lib/contact";
import { values } from "@/content/process";
import { reviewSummary } from "@/content/reviews";
import { getProject } from "@/content/projects";

const base = import.meta.env.BASE_URL;

const TXT = {
  subtitle: {
    es: "Albañilería, pintura, cocinas, baños y suelos en Madrid, Guadalajara y alrededores. Un solo equipo de principio a fin.",
    en: "Bricklaying, painting, kitchens, bathrooms and floors in Madrid, Guadalajara and nearby. One team from start to finish.",
  },
  realWork: { es: "Obra real", en: "Real project" },
  seeProjects: { es: "Ver proyectos", en: "View projects" },
  pause: { es: "Pausar vídeo", en: "Pause video" },
  play: { es: "Reproducir vídeo", en: "Play video" },
} satisfies Record<string, Localized>;

/** Obra real que se enseña en la tarjeta de la portada. */
const FEATURED = getProject("cocina-en-l");

/**
 * Portada: vídeo de oficio a pantalla completa con titular, dos acciones
 * (presupuesto y llamada) y pruebas de confianza.
 * Vídeo: montaje propio con clips de Pexels (licencia Pexels, uso comercial libre).
 */
export function HomeHero() {
  const { t, l } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  // Con "reducir movimiento" se queda la imagen fija del póster.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
      setPlaying(false);
    }
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
    setPlaying(!v.paused);
  };

  const rating = reviewSummary.rating;

  return (
    <section className="px-3 pt-3 md:px-5 md:pt-5">
      <div className="relative isolate flex h-[calc(100svh-10.5rem)] min-h-[540px] items-end overflow-hidden rounded-[28px] bg-navy text-white md:h-[calc(100svh-8.5rem)] md:max-h-[900px] md:min-h-[640px]">
        <video
          ref={videoRef}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          poster={`${base}assets/hero-poster.webp`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={`${base}assets/hero-1080.mp4`} type="video/mp4" media="(min-width: 768px)" />
          <source src={`${base}assets/hero-720.mp4`} type="video/mp4" />
        </video>
        {/* Oscurece abajo y a la izquierda para que el texto se lea siempre */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,oklch(0.15_0.04_262/0.95)_0%,oklch(0.15_0.04_262/0.6)_40%,oklch(0.15_0.04_262/0.1)_75%),linear-gradient(to_right,oklch(0.15_0.04_262/0.55)_0%,transparent_65%)]"
        />

        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? l(TXT.pause) : l(TXT.play)}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/20 text-white/80 backdrop-blur-md transition-colors hover:bg-black/40 hover:text-white md:right-6 md:top-6"
        >
          {playing ? (
            <Pause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Play className="h-4 w-4" aria-hidden="true" />
          )}
        </button>

        <div className="flex w-full items-end justify-between gap-10 px-6 pb-8 md:px-12 md:pb-12 lg:px-16 lg:pb-14">
          <div className="max-w-[54rem]">
            {rating && (
              <Link
                to="/resenas"
                className="animate-rise mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium backdrop-blur-md transition-colors hover:bg-white/20 md:text-sm"
              >
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                <span className="font-semibold">{rating.toFixed(1).replace(".", ",")}</span>
                <span className="text-white/75">
                  · {reviewSummary.count} {t("reviews.count")} Google
                </span>
              </Link>
            )}

            <h1
              className="animate-rise text-balance font-display text-[2.5rem] uppercase leading-[1.02] sm:text-5xl md:text-6xl xl:text-7xl"
              style={{ animationDelay: "80ms" }}
            >
              {t("hero.title")}
            </h1>
            <p
              className="animate-rise mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/85 md:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              {l(TXT.subtitle)}
            </p>

            <div
              className="animate-rise mt-7 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "240ms" }}
            >
              <Link
                to="/contacto"
                hash="formulario"
                className="btn-motion group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-navy shadow-ember sm:w-auto"
              >
                {t("cta.quote")}
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              {/* En móvil la llamada ya está en la barra fija inferior */}
              <a
                href={TEL_URL}
                className="hidden items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-4 text-base font-semibold backdrop-blur-md transition-colors hover:bg-white/20 sm:inline-flex"
              >
                <Phone className="h-4 w-4" aria-hidden="true" /> {PHONE_DISPLAY}
              </a>
            </div>

            <ul
              className="animate-rise mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80"
              style={{ animationDelay: "320ms" }}
            >
              {values.map((v) => (
                <li key={v.title.es} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[oklch(0.78_0.12_250)]" aria-hidden="true" />
                  {l(v.title)}
                </li>
              ))}
            </ul>
          </div>

          {FEATURED && (
            <Link
              to="/proyectos"
              className="animate-rise group hidden w-64 shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md transition-colors hover:bg-white/15 xl:block"
              style={{ animationDelay: "400ms" }}
            >
              <img
                src={FEATURED.cover.sm}
                alt={l(FEATURED.cover.alt)}
                width={FEATURED.cover.width}
                height={FEATURED.cover.height}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
                    {l(TXT.realWork)}
                  </p>
                  <p className="text-sm font-semibold">{l(FEATURED.title)}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/80 group-hover:text-white">
                  {l(TXT.seeProjects)}
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
