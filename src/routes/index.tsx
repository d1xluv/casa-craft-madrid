import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone, MapPin, ShieldCheck, Hammer, PaintRoller, Wrench, Clock, Sparkles, Layers } from "lucide-react";
import { useLang } from "@/lib/i18n";
import heroImg from "@/assets/hero-bricklayer.jpg";
import projApartment from "@/assets/project-apartment.jpg";
import projBath from "@/assets/project-bathroom.jpg";
import projKitchen from "@/assets/project-kitchen.jpg";
import { WorkCard } from "@/components/site/WorkCard";
import { Reveal, useParallax } from "@/components/site/Reveal";


export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Reformas HZ · Reformas y pintura en Madrid y Guadalajara" },
      { name: "description", content: "Reformas integrales, albañilería, pintura y alisado en Madrid, Guadalajara y zonas cercanas. 25 años de experiencia. Presupuesto sin compromiso: 671 155 809." },
      { property: "og:title", content: "Reformas HZ · Reformas integrales y pintura profesional" },
      { property: "og:description", content: "Su hogar, en buenas manos. Presupuestos sin compromiso en Madrid, Guadalajara y zonas cercanas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://casa-craft-madrid.lovable.app/" }],
  }),
});

function Home() {
  const { t } = useLang();
  const { ref: heroRef, offset } = useParallax(0.05);



  const works = [
    { img: projApartment, tag: t("projects.tag.apartment"), title: "Reforma integral · Chamberí", desc: t("projects.d.apartment"), className: "md:col-span-4 md:row-span-2", ratio: "aspect-[16/11]" },
    { img: projKitchen, tag: t("projects.tag.kitchen"), title: "Cocina abierta · Retiro", desc: t("projects.d.kitchen"), className: "md:col-span-2", ratio: "aspect-square" },
    { img: projBath, tag: t("projects.tag.bath"), title: "Baño completo · Salamanca", desc: t("projects.d.bath"), className: "md:col-span-2", ratio: "aspect-square" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-sand/50">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="container-page grid gap-12 pt-14 pb-20 md:grid-cols-12 md:gap-10 md:pt-20 md:pb-28">
          <div className="md:col-span-7 md:pr-6">
            <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-accent/30 bg-background px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t("hero.eyebrow")}
            </p>
            <h1
              className="animate-rise mt-6 text-balance font-display text-4xl font-extrabold uppercase leading-[1] text-navy sm:text-5xl md:text-7xl"
              style={{ animationDelay: "90ms" }}
            >
              {t("hero.title")}
            </h1>
            <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground" style={{ animationDelay: "180ms" }}>
              {t("hero.subtitle")}
            </p>

            <div className="animate-rise mt-10 flex flex-wrap gap-3" style={{ animationDelay: "260ms" }}>
              <a
                href="tel:671155809"
                className="btn-motion group inline-flex items-center gap-2 rounded-full bg-gradient-ember px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-ember"
              >
                <Phone className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" />
                {t("hero.cta.primary")}
              </a>
              <a
                href="https://wa.me/34671155809"
                target="_blank"
                rel="noreferrer"
                className="btn-motion inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground hover:border-accent/50 hover:bg-muted"
              >
                WhatsApp
              </a>
              <Link
                to="/proyectos"
                className="group inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold text-foreground transition-colors hover:text-accent"
              >
                {t("hero.cta.secondary")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <dl className="animate-rise mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8" style={{ animationDelay: "340ms" }}>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{t("hero.stat.years")}</dt>
                <dd className="mt-1 font-display text-3xl text-navy">25+</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{t("hero.stat.projects")}</dt>
                <dd className="mt-1 font-display text-3xl text-navy">300+</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{t("hero.stat.area")}</dt>
                <dd className="mt-1 flex items-center gap-1 font-display text-lg text-navy">
                  <MapPin className="h-4 w-4 flex-shrink-0 text-accent" /> Madrid · Guadalajara
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative md:col-span-5">
            <div ref={heroRef} className="animate-zoom group relative overflow-hidden rounded-2xl shadow-ember" style={{ animationDelay: "120ms" }}>
              <img
                src={heroImg}
                alt="Equipo de Reformas HZ trabajando en una vivienda de Madrid"
                width={1600}
                height={1200}
                style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.08)` }}
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 will-change-transform"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/90 to-transparent p-6">
                <p className="font-display text-2xl text-background">“{t("brand.motto")}”</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-background/70">{t("brand.years")}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-border bg-background">
        <div className="container-page grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, t: t("about.value1.t"), d: t("about.value1.d") },
            { icon: Clock, t: t("about.value2.t"), d: t("about.value2.d") },
            { icon: Sparkles, t: t("about.value3.t"), d: t("about.value3.d") },
            { icon: Layers, t: t("about.value4.t"), d: t("about.value4.d") },
          ].map((v, i) => (
            <Reveal key={v.t} delay={i * 70}>
              <div className="group flex gap-3">
                <v.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <h3 className="font-display text-base">{v.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="bg-sand/40">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">{t("services.eyebrow")}</p>
                <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl uppercase text-navy md:text-5xl">{t("services.title")}</h2>
              </div>
              <Link to="/servicios" className="group inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-accent">
                {t("nav.services")} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: PaintRoller, t: t("services.painting.title"), d: t("services.painting.desc") },
              { icon: Wrench, t: t("services.reform.title"), d: t("services.reform.desc") },
              { icon: Hammer, t: t("services.brick.title"), d: t("services.brick.desc") },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 90}>
                <div className="group card-lift h-full rounded-2xl border border-border bg-card p-8 hover:border-accent/40 hover:shadow-soft">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:scale-105 group-hover:bg-accent group-hover:text-accent-foreground">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl">{s.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                  <span className="mt-6 block h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section className="container-page py-20 md:py-28">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">{t("projects.eyebrow")}</p>
              <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl uppercase text-navy md:text-5xl">{t("projects.title")}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{t("cards.hint")}</p>
            </div>
            <Link to="/proyectos" className="group inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-accent">
              {t("nav.projects")} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-6">
          {works.map((w, i) => (
            <Reveal key={w.title} delay={i * 100} variant="scale" className={w.className}>
              <WorkCard {...w} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-ink p-10 text-background md:p-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">{t("contact.eyebrow")}</p>
                <h2 className="mt-3 font-display text-4xl uppercase text-background md:text-5xl">{t("contact.title")}</h2>
                <p className="mt-4 max-w-md text-background/70">{t("contact.subtitle")}</p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-background/25 px-4 py-2 text-xs uppercase tracking-widest text-background/80">
                  <MapPin className="h-4 w-4 text-accent" /> {t("contact.area.value")}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <a
                  href="tel:671155809"
                  className="btn-motion inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
                >
                  <Phone className="h-4 w-4" /> 671 155 809
                </a>
                <a
                  href="tel:671155752"
                  className="btn-motion inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 text-sm font-semibold text-background hover:bg-background/10"
                >
                  <Phone className="h-4 w-4" /> 671 155 752
                </a>
                <a
                  href="https://wa.me/34671155809"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-motion inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 text-sm font-semibold text-background hover:bg-background/10"
                >
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="relative mt-10 flex items-center gap-2 text-xs text-background/60">
              <ShieldCheck className="h-4 w-4 text-accent" /> {t("brand.quote")} · {t("brand.years")}
            </div>
          </div>
        </Reveal>
      </section>

    </>
  );
}
