import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  MessageCircle,
  Pause,
  Phone,
  Play,
  SkipForward,
} from "lucide-react";
import { useLang, type Localized } from "@/lib/i18n";
import { services } from "@/content/services";
import { values } from "@/content/process";
import { PHONE_DISPLAY, TEL_URL, WHATSAPP_URL } from "@/lib/contact";
import { createHouseScene, type HouseSceneState } from "./house-scene";

type Controls = ReturnType<typeof createHouseScene>;

const SCENES: Localized[] = [
  { es: "Fachada", en: "Façade" },
  { es: "Cocina", en: "Kitchen" },
  { es: "Baño", en: "Bathroom" },
];

const TXT = {
  statement: {
    es: "Reformamos su casa por dentro y por fuera: fachadas, cocinas, baños, suelos y pintura, con acabados de primera.",
    en: "We renovate your home inside and out: façades, kitchens, bathrooms, floors and painting, with a first-class finish.",
  },
  area: {
    es: "Madrid, Guadalajara y zonas cercanas",
    en: "Madrid, Guadalajara and nearby areas",
  },
  views: { es: "Vistas de la reforma", en: "Renovation views" },
  pause: { es: "Pausar animación", en: "Pause animation" },
  play: { es: "Reproducir animación", en: "Play animation" },
  next: { es: "Siguiente vista", en: "Next view" },
  why: { es: "Por qué Reformas HZ", en: "Why Reformas HZ" },
} satisfies Record<string, Localized>;

/** Servicios destacados en la portada (ids de src/content/services.ts). */
const HERO_SERVICES = ["reforma-integral", "banos-cocinas", "pintura", "albanileria", "suelos"];

const MARQUEE =
  "Reformas integrales · Albañilería · Pintura · Baños y cocinas · Suelos · Fachadas · ";

const glass =
  "border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20";

/** Portada: casa 3D animada (fachada, cocina y baño) con texto por detrás. */
export function HomeHero() {
  const { t, l } = useLang();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controls = useRef<Controls | null>(null);
  const [state, setState] = useState<HouseSceneState>({ scene: 0, playing: true });

  useEffect(() => {
    if (!canvasRef.current) return;
    const c = createHouseScene(canvasRef.current, setState);
    controls.current = c;
    return () => c.destroy();
  }, []);

  const heroServices = services.filter((s) => HERO_SERVICES.includes(s.id));

  return (
    <section className="px-3 pt-3 md:px-5 md:pt-5">
      <div className="relative isolate flex flex-col overflow-hidden rounded-[28px] bg-[radial-gradient(120%_90%_at_70%_40%,oklch(0.42_0.13_258)_0%,oklch(0.26_0.09_260)_45%,oklch(0.17_0.05_262)_100%)] text-white md:block md:h-[calc(100svh-8.5rem)] md:max-h-[900px] md:min-h-[640px]">
        {/* Rejilla de plano */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:56px_56px]"
        />

        {/* Banda de servicios que pasa por detrás de la casa */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[56%] hidden overflow-hidden md:block"
        >
          <p className="hz-marquee text-outline flex w-max whitespace-nowrap font-display text-[7.5rem] font-extrabold uppercase leading-none tracking-tight">
            <span>{MARQUEE.repeat(2)}</span>
            <span>{MARQUEE.repeat(2)}</span>
          </p>
        </div>

        {/* Título y frase larga: quedan por detrás de la casa a propósito */}
        <div className="relative z-20 order-1 px-6 pt-24 md:absolute md:left-12 md:top-14 md:z-0 md:max-w-[40rem] md:p-0 lg:left-16 lg:top-16 lg:max-w-[46rem]">
          <p className="animate-rise text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            {t("hero.eyebrow")}
          </p>
          <h1
            className="animate-rise mt-4 font-display text-[3.6rem] font-extrabold leading-[0.88] tracking-[-0.04em] sm:text-7xl md:text-[clamp(4.25rem,10.5vh,7.5rem)]"
            style={{ animationDelay: "80ms" }}
          >
            Reformas <br />
            <span className="text-[oklch(0.78_0.12_250)]">HZ</span>
            <span className="sr-only"> · {t("hero.title")}</span>
          </h1>
          <p
            className="animate-rise mt-5 font-display text-2xl font-semibold leading-[1.15] tracking-tight text-white/90 sm:text-3xl md:mt-5 md:text-[clamp(1.5rem,3.9vh,2.5rem)]"
            style={{ animationDelay: "160ms" }}
          >
            {l(TXT.statement)}
          </p>
        </div>

        {/* Escena 3D (por encima de la frase y la banda) */}
        <div className="relative z-10 order-2 h-[340px] w-full sm:h-[440px] md:absolute md:inset-y-0 md:left-[30%] md:right-[2%] md:h-auto">
          <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />
        </div>

        {/* Controles */}
        <div className="absolute left-4 top-4 z-30 flex gap-2 md:left-1/2 md:top-6 md:-translate-x-1/2">
          <button
            type="button"
            onClick={() => controls.current?.toggle()}
            className={`grid h-11 w-11 place-items-center rounded-xl ${glass}`}
            aria-label={state.playing ? l(TXT.pause) : l(TXT.play)}
          >
            {state.playing ? (
              <Pause className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Play className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={() => controls.current?.next()}
            className={`grid h-11 w-11 place-items-center rounded-xl ${glass}`}
            aria-label={l(TXT.next)}
          >
            <SkipForward className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Vistas + progreso */}
        <div
          role="group"
          aria-label={l(TXT.views)}
          className="absolute right-4 top-4 z-30 flex gap-1.5 md:right-6 md:top-6"
        >
          {SCENES.map((s, i) => (
            <button
              key={s.es}
              type="button"
              onClick={() => controls.current?.select(i)}
              aria-pressed={state.scene === i}
              className={`relative overflow-hidden rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors md:text-[13px] ${
                state.scene === i ? "bg-white text-navy" : glass
              }`}
            >
              {l(s)}
              {state.scene === i && (
                <span
                  key={i}
                  aria-hidden="true"
                  className="hz-progress absolute inset-x-0 bottom-0 h-[3px] bg-accent motion-reduce:hidden"
                  style={{ animationPlayState: state.playing ? "running" : "paused" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Servicios y acciones */}
        <div className="relative z-20 order-3 px-6 pb-6 pt-2 md:absolute md:bottom-12 md:left-12 md:max-w-xl md:p-0 lg:bottom-14 lg:left-16">
          <ul
            className="animate-rise flex flex-wrap gap-2 md:hidden lg:flex"
            style={{ animationDelay: "220ms" }}
          >
            {heroServices.map((s) => (
              <li key={s.id}>
                <Link
                  to="/servicios/$id"
                  params={{ id: s.id }}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${glass}`}
                >
                  <s.icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {l(s.title)}
                </Link>
              </li>
            ))}
          </ul>
          <div
            className="animate-rise mt-5 flex flex-wrap gap-2.5"
            style={{ animationDelay: "280ms" }}
          >
            <Link
              to="/contacto"
              hash="formulario"
              className="btn-motion inline-flex items-center gap-2 rounded-full bg-gradient-ember px-5 py-3 text-sm font-semibold text-white shadow-ember"
            >
              <FileText className="h-4 w-4" aria-hidden="true" /> {t("cta.quote")}
            </Link>
            <a
              href={TEL_URL}
              className="btn-motion inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${glass}`}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
            </a>
          </div>
          <Link
            to="/proyectos"
            className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white"
          >
            {t("hero.cta.secondary")}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Tarjeta de compromisos + vista actual */}
        <div className="relative z-20 order-4 mx-6 mb-6 rounded-2xl border border-white/15 bg-[oklch(0.2_0.06_260/0.82)] p-5 shadow-2xl backdrop-blur-md md:absolute md:bottom-12 md:right-12 md:m-0 md:hidden md:w-72 xl:block lg:bottom-14 lg:right-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
            {l(TXT.why)}
          </p>
          <ul className="mt-3 space-y-2">
            {values.map((v) => (
              <li key={v.title.es} className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2
                  className="h-4 w-4 shrink-0 text-[oklch(0.78_0.12_250)]"
                  aria-hidden="true"
                />
                {l(v.title)}
              </li>
            ))}
          </ul>
          <p
            className="mt-4 border-t border-white/15 pt-3 text-xs text-white/65"
            aria-live="polite"
          >
            <span className="tabular-nums text-white">0{state.scene + 1}</span> / 03 ·{" "}
            {l(SCENES[state.scene])} · {l(TXT.area)}
          </p>
        </div>
      </div>
    </section>
  );
}
