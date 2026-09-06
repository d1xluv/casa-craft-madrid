import { createFileRoute } from "@tanstack/react-router";
import { Hammer, PaintRoller, Wrench, Bath, Layers, Building2 } from "lucide-react";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/servicios")({
  component: Services,
  head: () => ({
    meta: [
      { title: "Servicios · Pinturas Alcalá Madrid" },
      { name: "description", content: "Albañilería, pintura, reformas integrales, baños, cocinas, suelos y fachadas en toda Madrid." },
    ],
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
      <p className="text-xs uppercase tracking-widest text-accent">{t("services.eyebrow")}</p>
      <h1 className="mt-3 max-w-3xl text-balance font-display text-5xl md:text-6xl">{t("services.title")}</h1>

      <div className="mt-16 grid gap-px overflow-hidden rounded-lg bg-border md:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <div key={s.t} className="group bg-card p-8 transition-colors hover:bg-sand/60">
            <s.icon className="h-8 w-8 text-accent transition-transform group-hover:scale-110" />
            <h2 className="mt-6 font-display text-2xl">{s.t}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
