import { createFileRoute, Link } from "@tanstack/react-router";
import { Hammer, PaintRoller, Wrench, Bath, Layers, Building2, ArrowRight, Phone } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { TEL_URL } from "@/lib/contact";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/servicios")({
  component: Services,
  head: () => ({
    meta: [
      { title: "Servicios · Reformas HZ Madrid y Guadalajara" },
      {
        name: "description",
        content:
          "Reformas integrales, albañilería, pintura, baños, cocinas, suelos y fachadas en Madrid, Guadalajara y zonas cercanas. Presupuesto sin compromiso.",
      },
      { property: "og:title", content: "Servicios · Reformas HZ" },
      {
        property: "og:description",
        content: "Un solo equipo para toda la reforma: albañilería, pintura, baños, cocinas, suelos y fachadas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://casa-craft-madrid.lovable.app/servicios" }],
  }),
});

function Services() {
  const { t } = useLang();
  const items = [
    { icon: Hammer, t: t("services.brick.title"), d: t("services.brick.desc") },
    { icon: PaintRoller, t: t("services.painting.title"), d: t("services.painting.desc") },
    { icon: Wrench, t: t("services.reform.title"), d: t("services.reform.desc") },
    { icon: Bath, t: t("services.bath.title"), d: t("services.bath.desc") },
    { icon: Layers, t: t("services.floor.title"), d: t("services.floor.desc") },
    { icon: Building2, t: t("services.facade.title"), d: t("services.facade.desc") },
  ];

  return (
    <section className="container-page py-20 md:py-28">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">{t("services.eyebrow")}</p>
        <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl uppercase leading-[1.02] text-navy sm:text-5xl md:text-6xl">
          {t("services.title")}
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{t("contact.area.long")}</p>
      </Reveal>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-2 lg:grid-cols-3">
        {items.map((s, i) => (
          <Reveal key={s.t} delay={i * 70}>
            <div className="group relative h-full bg-card p-8 transition-colors duration-500 hover:bg-sand/60">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-105">
                <s.icon className="h-6 w-6" />
              </span>
              <h2 className="mt-6 font-display text-2xl">{s.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              <span className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-accent transition-all duration-500 group-hover:w-full" />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={100}>
        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl bg-gradient-ink p-8 text-background md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="font-display text-2xl uppercase text-background md:text-3xl">{t("contact.title")}</h2>
            <p className="mt-2 max-w-xl text-sm text-background/70">{t("contact.subtitle")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={TEL_URL}
              className="btn-motion inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
            >
              <Phone className="h-4 w-4" /> 671 155 809
            </a>
            <Link
              to="/contacto"
              className="btn-motion inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 text-sm font-semibold text-background hover:bg-background/10"
            >
              {t("nav.cta")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
