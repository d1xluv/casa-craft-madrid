import { createFileRoute } from "@tanstack/react-router";
import {
  Hammer,
  PaintRoller,
  Wrench,
  Bath,
  Layers,
  PanelTop,
  Building2,
  ShieldCheck,
  Phone,
  ClipboardList,
  Ruler,
  FileText,
  PackageCheck,
  Sparkles,
  BadgeCheck,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal, useParallax } from "@/components/site/Reveal";
import heroImg from "@/assets/hero-bricklayer.jpg";

export const Route = createFileRoute("/sobre-mi")({
  component: About,
  head: () => ({
    meta: [
      { title: "Sobre nosotros · Reformas HZ Madrid y Guadalajara" },
      {
        name: "description",
        content:
          "Especialidades y método de trabajo de Reformas HZ: reformas integrales, albañilería, pintura, baños y cocinas en Madrid, Guadalajara y zonas cercanas.",
      },
      { property: "og:title", content: "Sobre nosotros · Reformas HZ" },
      {
        property: "og:description",
        content: "25 años de oficio. Especialidades y proceso de trabajo, paso a paso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://casa-craft-madrid.lovable.app/sobre-mi" }],
  }),
});

function About() {
  const { t } = useLang();
  const { ref: parallaxRef, offset } = useParallax(0.06);

  const specialities = [
    { icon: Wrench, t: t("about.spec1.t"), d: t("about.spec1.d") },
    { icon: Hammer, t: t("about.spec2.t"), d: t("about.spec2.d") },
    { icon: PaintRoller, t: t("about.spec3.t"), d: t("about.spec3.d") },
    { icon: Bath, t: t("about.spec4.t"), d: t("about.spec4.d") },
    { icon: Layers, t: t("about.spec5.t"), d: t("about.spec5.d") },
    { icon: PanelTop, t: t("about.spec6.t"), d: t("about.spec6.d") },
    { icon: Building2, t: t("about.spec7.t"), d: t("about.spec7.d") },
    { icon: ShieldCheck, t: t("about.spec8.t"), d: t("about.spec8.d") },
  ];

  const steps = [
    { icon: Phone, t: t("about.step1.t"), d: t("about.step1.d") },
    { icon: Ruler, t: t("about.step2.t"), d: t("about.step2.d") },
    { icon: FileText, t: t("about.step3.t"), d: t("about.step3.d") },
    { icon: ClipboardList, t: t("about.step4.t"), d: t("about.step4.d") },
    { icon: Sparkles, t: t("about.step5.t"), d: t("about.step5.d") },
    { icon: BadgeCheck, t: t("about.step6.t"), d: t("about.step6.d") },
  ];

  const values = [
    { t: t("about.value1.t"), d: t("about.value1.d") },
    { t: t("about.value2.t"), d: t("about.value2.d") },
    { t: t("about.value3.t"), d: t("about.value3.d") },
    { t: t("about.value4.t"), d: t("about.value4.d") },
  ];

  return (
    <>
      {/* HEADER */}
      <section className="relative overflow-hidden border-b border-border bg-sand/50">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="container-page grid gap-12 py-20 md:grid-cols-12 md:py-24">
          <div className="md:col-span-7">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">{t("about.eyebrow")}</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-3 text-balance font-display text-4xl uppercase leading-[1.02] text-navy sm:text-5xl md:text-6xl">
                {t("about.title")}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{t("about.intro")}</p>
            </Reveal>
            <Reveal delay={240}>
              <dl className="mt-10 grid max-w-md grid-cols-2 gap-6 border-t border-border pt-8">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">{t("hero.stat.years")}</dt>
                  <dd className="mt-1 font-display text-3xl text-navy">25+</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">{t("hero.stat.projects")}</dt>
                  <dd className="mt-1 font-display text-3xl text-navy">500+</dd>
                </div>
              </dl>
            </Reveal>
          </div>
          <Reveal variant="scale" delay={120} className="md:col-span-5">
            <div ref={parallaxRef} className="overflow-hidden rounded-2xl shadow-soft">
              <img
                src={heroImg}
                alt="Equipo de Reformas HZ trabajando en una vivienda"
                loading="lazy"
                style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.08)` }}
                className="aspect-[4/5] w-full object-cover will-change-transform"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ESPECIALIDADES */}
      <section className="container-page py-20 md:py-28">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">{t("about.eyebrow")}</p>
          <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl uppercase text-navy md:text-5xl">
            {t("about.skills.title")}
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">{t("about.skills.subtitle")}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {specialities.map((s, i) => (
            <Reveal key={s.t} delay={i * 60} as="article">
              <div className="group card-lift h-full rounded-2xl border border-border bg-card p-6 hover:border-accent/40 hover:shadow-soft">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                <span className="mt-5 block h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section className="border-y border-border bg-sand/40">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">{t("about.eyebrow")}</p>
            <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl uppercase text-navy md:text-5xl">
              {t("about.values.title")}
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">{t("about.values.subtitle")}</p>
          </Reveal>

          <ol className="relative mt-14 space-y-6 md:space-y-0">
            {/* progress rail */}
            <span className="pointer-events-none absolute left-[22px] top-2 hidden h-[calc(100%-1rem)] w-px bg-border md:block" />
            {steps.map((s, i) => (
              <Reveal key={s.t} as="li" delay={i * 90} variant="left" className="relative md:pl-20 md:pb-10">
                <span className="absolute left-0 top-0 hidden h-11 w-11 place-items-center rounded-full border border-accent/30 bg-background font-display text-sm font-bold text-accent shadow-soft transition-transform duration-500 hover:scale-110 md:grid">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="group card-lift rounded-2xl border border-border bg-card p-6 hover:border-accent/40 hover:shadow-soft md:p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-xl md:text-2xl">
                      <span className="text-accent md:hidden">{String(i + 1).padStart(2, "0")} · </span>
                      {s.t}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 70}>
                <div className="card-lift h-full rounded-2xl border border-border bg-background p-5 hover:border-accent/40 hover:shadow-soft">
                  <h3 className="font-display text-lg">{v.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
