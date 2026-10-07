import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { useLang, type Localized } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { business, legal } from "@/content/site";
import { services } from "@/content/services";
import { getProject } from "@/content/projects";
import { values } from "@/content/process";
import { PHONE_DISPLAY } from "@/lib/contact";
import { Reveal } from "@/components/site/Reveal";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { CtaBar } from "@/components/site/CtaBar";
import { ScrollProcess } from "@/components/site/ScrollProcess";

export const Route = createFileRoute("/sobre-mi")({
  component: About,
  head: () =>
    seo({
      path: "/sobre-mi",
      title: "Sobre nosotros · Reformas HZ Madrid y Guadalajara",
      description:
        "Quién está detrás de Reformas HZ y cómo trabajamos: reformas, albañilería y pintura en Madrid, Guadalajara y zonas cercanas.",
    }),
});

/** Textos propios de esta página. */
const TXT = {
  title: { es: "El oficio detrás de cada reforma.", en: "The craft behind every renovation." },
  board: { es: "Cartel de obra", en: "Site board" },
  company: { es: "Empresa", en: "Company" },
  owner: { es: "Responsable", en: "Contact" },
  activity: { es: "Actividad", en: "Trade" },
  activityValue: {
    es: "Reformas · Albañilería · Pintura",
    en: "Renovations · Bricklaying · Painting",
  },
  zone: { es: "Zona", en: "Area" },
  phone: { es: "Teléfono", en: "Phone" },
  processEyebrow: { es: "Método", en: "Method" },
  processTitle: { es: "Así trabajamos, paso a paso.", en: "How we work, step by step." },
  processHint: { es: "Pulse cada paso", en: "Tap each step" },
  prev: { es: "Paso anterior", en: "Previous step" },
  next: { es: "Paso siguiente", en: "Next step" },
  step: { es: "Paso", en: "Step" },
  workEyebrow: { es: "De cerca", en: "Up close" },
  workTitle: { es: "El resultado se nota.", en: "You can see the result." },
  workText: {
    es: "Una de nuestras obras reales. Arrastre el control para ver el antes y el después.",
    en: "One of our real jobs. Drag the handle to see the before and after.",
  },
  workLink: { es: "Ver más proyectos", en: "See more projects" },
  zoneEyebrow: { es: "Zona de trabajo", en: "Service area" },
  zoneTitle: { es: "Entre Madrid y Guadalajara.", en: "Between Madrid and Guadalajara." },
  zoneNote: { es: "Esquema orientativo, no a escala.", en: "Indicative sketch, not to scale." },
  skills: { es: "Especialidades", en: "Specialities" },
} satisfies Record<string, Localized>;

function About() {
  const { t, l } = useLang();
  const pintura = getProject("pintura");

  return (
    <>
      {/* CABECERA + CARTEL DE OBRA */}
      <section className="relative overflow-hidden border-b border-border bg-sand/50">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="container-page grid items-center gap-12 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-6">
            <p className="animate-rise text-xs font-semibold uppercase tracking-widest text-accent">
              {t("about.eyebrow")}
            </p>
            <h1
              className="animate-rise mt-3 text-balance font-display text-4xl uppercase leading-[1.02] text-navy sm:text-5xl md:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              {l(TXT.title)}
            </h1>
            <p
              className="animate-rise mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
              style={{ animationDelay: "160ms" }}
            >
              {t("about.intro")}
            </p>
            <ul
              className="animate-rise mt-8 flex flex-wrap gap-2"
              style={{ animationDelay: "240ms" }}
            >
              {values.map((v) => (
                <li
                  key={v.title.es}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-sm font-medium text-navy"
                >
                  <BadgeCheck className="h-4 w-4 text-accent" aria-hidden="true" />
                  {l(v.title)}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-6">
            <SiteBoard />
          </div>
        </div>
      </section>

      {/* MÉTODO INTERACTIVO */}
      <section className="container-page py-20 md:py-28">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {l(TXT.processEyebrow)}
          </p>
          <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl uppercase text-navy md:text-5xl">
            {l(TXT.processTitle)}
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <ScrollProcess />
        </Reveal>
      </section>

      {/* OBRA REAL DE CERCA */}
      {pintura && (
        <section className="border-y border-border bg-sand/40">
          <div className="container-page grid items-center gap-10 py-20 md:grid-cols-12 md:py-24">
            <Reveal className="md:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                {l(TXT.workEyebrow)}
              </p>
              <h2 className="mt-3 font-display text-4xl uppercase text-navy md:text-5xl">
                {l(TXT.workTitle)}
              </h2>
              <p className="mt-4 text-muted-foreground">{l(TXT.workText)}</p>
              <Link
                to="/proyectos"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent"
              >
                {l(TXT.workLink)}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
            <Reveal delay={100} className="md:col-span-8">
              <BeforeAfter before={pintura.photos[0]} after={pintura.photos[1]} />
            </Reveal>
          </div>
        </section>
      )}

      {/* ZONA */}
      <section className="container-page grid items-center gap-10 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {l(TXT.zoneEyebrow)}
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase text-navy md:text-5xl">
            {l(TXT.zoneTitle)}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("contact.area.long")}</p>
        </Reveal>
        <Reveal delay={100} className="md:col-span-7">
          <ZoneMap note={l(TXT.zoneNote)} />
        </Reveal>
      </section>

      {/* ESPECIALIDADES */}
      <section className="container-page pb-20">
        <Reveal>
          <h2 className="font-display text-3xl uppercase text-navy md:text-4xl">{l(TXT.skills)}</h2>
        </Reveal>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={(i % 4) * 50}>
              <Link
                to="/servicios/$id"
                params={{ id: s.id }}
                className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-soft"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <s.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="flex-1 font-display text-base leading-tight">{l(s.title)}</span>
                <ArrowRight
                  className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          ))}
        </ul>
        <div className="mt-16">
          <CtaBar />
        </div>
      </section>
    </>
  );
}

/** Tarjeta tipo "cartel de obra" con los datos reales; se inclina con el ratón. */
function SiteBoard() {
  const { l } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current!.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - r.top) / r.height - 0.5) * -8,
      y: ((e.clientX - r.left) / r.width - 0.5) * 10,
    });
  };

  const rows: [Localized, string][] = [
    [TXT.company, business.brand],
    [TXT.owner, legal.holderName],
    [TXT.activity, l(TXT.activityValue)],
    [TXT.zone, "Madrid · Guadalajara"],
    [TXT.phone, PHONE_DISPLAY],
  ];

  return (
    <div className="animate-rise [perspective:1200px]" style={{ animationDelay: "200ms" }}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        className="relative overflow-hidden rounded-2xl bg-card shadow-ember ring-1 ring-border transition-transform duration-300 ease-out will-change-transform"
      >
        {/* Franja superior */}
        <div className="flex items-center justify-between bg-gradient-ink px-6 py-4 text-background">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-background/75">
            {l(TXT.board)}
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-ember font-display text-sm font-extrabold">
            HZ
          </span>
        </div>
        {/* Filas de datos sobre rejilla de plano */}
        <dl className="relative divide-y divide-border bg-[linear-gradient(oklch(0.9_0.02_250/.35)_1px,transparent_1px),linear-gradient(90deg,oklch(0.9_0.02_250/.35)_1px,transparent_1px)] bg-[size:24px_24px] px-6">
          {rows.map(([k, v]) => (
            <div key={k.es} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 py-4">
              <dt className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                {l(k)}
              </dt>
              <dd className="font-display text-lg text-navy">{v}</dd>
            </div>
          ))}
        </dl>
        {/* Cinta de obra */}
        <div
          aria-hidden="true"
          className="h-3 bg-[repeating-linear-gradient(135deg,oklch(0.32_0.11_258)_0_14px,oklch(0.99_0.003_250)_14px_28px)]"
        />
      </div>
    </div>
  );
}

/** Esquema animado Madrid ↔ Guadalajara (SVG propio, sin mapas externos). */
function ZoneMap({ note }: { note: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const id = window.setTimeout(() => ref.current?.setAttribute("data-play", ""), 300);
    return () => window.clearTimeout(id);
  }, []);
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
  const pulse = { transformBox: "fill-box", transformOrigin: "center" } as CSSProperties;

  return (
    <figure className="overflow-hidden rounded-2xl bg-gradient-ink p-2 shadow-ember">
      <svg
        ref={ref}
        viewBox="0 0 600 340"
        role="img"
        aria-label="Madrid, Guadalajara y zonas cercanas"
        className="scene block h-auto w-full"
      >
        <defs>
          <pattern id="zone-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M30 0H0V30" fill="none" stroke="white" strokeOpacity="0.07" />
          </pattern>
        </defs>
        <rect width="600" height="340" fill="url(#zone-grid)" />
        {/* Áreas de trabajo */}
        <circle
          cx="180"
          cy="225"
          r="105"
          fill="#5b9cf0"
          fillOpacity="0.16"
          data-a="pop"
          style={d(100)}
        />
        <circle
          cx="440"
          cy="115"
          r="80"
          fill="#5b9cf0"
          fillOpacity="0.14"
          data-a="pop"
          style={d(250)}
        />
        {/* A-2 */}
        <path
          d="M180 225 C 260 215, 330 175, 440 115"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeDasharray="1"
          strokeLinecap="round"
          pathLength={1}
          data-a="draw"
          style={d(500)}
        />
        <g data-a="pop" style={d(1300)}>
          <rect x="292" y="168" width="42" height="24" rx="5" fill="white" />
          <text x="313" y="185" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1f3a7a">
            A-2
          </text>
        </g>
        {/* Puntos */}
        {[
          { x: 180, y: 225, name: "Madrid", delay: 300 },
          { x: 440, y: 115, name: "Guadalajara", delay: 1100 },
        ].map((p) => (
          <g key={p.name} data-a="pop" style={d(p.delay)}>
            <circle
              cx={p.x}
              cy={p.y}
              r="16"
              fill="#5b9cf0"
              opacity="0.5"
              className="animate-ping motion-reduce:hidden"
              style={pulse}
            />
            <circle cx={p.x} cy={p.y} r="9" fill="white" />
            <circle cx={p.x} cy={p.y} r="4" fill="#2f6fe0" />
            <text
              x={p.x}
              y={p.y + 36}
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="white"
            >
              {p.name}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="px-4 pb-2 text-right text-[11px] text-background/60">
        {note}
      </figcaption>
    </figure>
  );
}
