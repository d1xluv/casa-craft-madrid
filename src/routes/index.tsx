import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone, MapPin, ShieldCheck, Hammer, PaintRoller, Wrench, Clock, Sparkles, Layers } from "lucide-react";
import { useLang } from "@/lib/i18n";
import heroImg from "@/assets/hero-bricklayer.jpg";
import projApartment from "@/assets/project-apartment.jpg";
import projBath from "@/assets/project-bathroom.jpg";
import projKitchen from "@/assets/project-kitchen.jpg";
import logoAsset from "@/assets/logo.png.asset.json";
import { WorkCard } from "@/components/site/WorkCard";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Pinturas Alcalá · Pintura y reformas en Madrid" },
      { name: "description", content: "Pintura interior y exterior, alisado de paredes, tarima y pequeñas reformas en toda Madrid. 25 años de experiencia. Llama al 671 155 809." },
      { property: "og:title", content: "Pinturas Alcalá · Pintura y reformas profesionales en Madrid" },
      { property: "og:description", content: "Tu hogar, en buenas manos. Presupuestos sin compromiso en toda la Comunidad de Madrid." },
    ],
  }),
});

function Home() {
  const { t } = useLang();

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
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-background px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t("hero.eyebrow")}
            </p>
            <h1 className="mt-6 text-balance font-display text-5xl font-extrabold uppercase leading-[0.95] text-navy md:text-7xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">{t("hero.subtitle")}</p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="tel:671155809"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-ember px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-ember transition-transform hover:scale-[1.03]"
              >
                <Phone className="h-4 w-4" />
                {t("hero.cta.primary")}
              </a>
              <a
                href="https://wa.me/34671155809"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                WhatsApp
              </a>
              <Link
                to="/proyectos"
                className="inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold text-foreground underline-offset-4 hover:text-accent hover:underline"
              >
                {t("hero.cta.secondary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
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
                <dd className="mt-1 flex items-center gap-1 font-display text-xl text-navy">
                  <MapPin className="h-4 w-4 text-accent" /> Madrid
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative md:col-span-5">
            <div className="relative overflow-hidden rounded-2xl shadow-ember">
              <img
                src={heroImg}
                alt="Pintor de Pinturas Alcalá trabajando en una vivienda de Madrid"
                width={1600}
                height={1200}
                className="aspect-[4/5] w-full object-cover"
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
          ].map((v) => (
            <div key={v.t} className="flex gap-3">
              <v.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
              <div>
                <h3 className="font-display text-base">{v.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="bg-sand/40">
        <div className="container-page py-20 md:py-28">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">{t("services.eyebrow")}</p>
              <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl uppercase text-navy md:text-5xl">{t("services.title")}</h2>
            </div>
            <Link to="/servicios" className="inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-accent">
              {t("nav.services")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: PaintRoller, t: t("services.painting.title"), d: t("services.painting.desc") },
              { icon: Wrench, t: t("services.reform.title"), d: t("services.reform.desc") },
              { icon: Hammer, t: t("services.brick.title"), d: t("services.brick.desc") },
            ].map((s) => (
              <div
                key={s.t}
                className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-2xl">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section className="container-page py-20 md:py-28">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">{t("projects.eyebrow")}</p>
            <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl uppercase text-navy md:text-5xl">{t("projects.title")}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{t("cards.hint")}</p>
          </div>
          <Link to="/proyectos" className="inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-accent">
            {t("nav.projects")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-6">
          {works.map((w) => (
            <WorkCard key={w.title} {...w} />
          ))}
        </div>
      </section>

      {/* BRAND CARD */}
      <section className="container-page pb-20">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <img src={logoAsset.url} alt="Tarjeta de Pinturas Alcalá: pintura y reformas profesionales, 671 155 809" loading="lazy" className="w-full" />
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-ink p-10 text-background md:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">{t("contact.eyebrow")}</p>
              <h2 className="mt-3 font-display text-4xl uppercase text-background md:text-5xl">{t("contact.title")}</h2>
              <p className="mt-4 max-w-md text-background/70">{t("contact.subtitle")}</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a
                href="tel:671155809"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
              >
                <Phone className="h-4 w-4" /> 671 155 809
              </a>
              <a
                href="tel:671155752"
                className="inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 text-sm font-semibold text-background hover:bg-background/10"
              >
                <Phone className="h-4 w-4" /> 671 155 752
              </a>
              <a
                href="https://wa.me/34671155809"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 text-sm font-semibold text-background hover:bg-background/10"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <div className="relative mt-10 flex items-center gap-2 text-xs text-background/60">
            <ShieldCheck className="h-4 w-4 text-accent" /> {t("brand.quote")} · {t("brand.years")}
          </div>
        </div>
      </section>
    </>
  );
}
