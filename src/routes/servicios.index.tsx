import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { services } from "@/content/services";
import { Reveal } from "@/components/site/Reveal";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CtaBar } from "@/components/site/CtaBar";

export const Route = createFileRoute("/servicios/")({
  component: Services,
  head: () =>
    seo({
      path: "/servicios",
      title: "Servicios · Reformas HZ Madrid y Guadalajara",
      description:
        "Reformas integrales, albañilería, pintura, baños, cocinas, suelos, pladur, fachadas y reparaciones en Madrid, Guadalajara y zonas cercanas.",
    }),
});

function Services() {
  const { t } = useLang();
  return (
    <section className="container-page py-20 md:py-28">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {t("services.eyebrow")}
        </p>
        <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl uppercase leading-[1.02] text-navy sm:text-5xl md:text-6xl">
          {t("services.title")}
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{t("contact.area.long")}</p>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <Reveal key={s.id} delay={(i % 4) * 70} className="h-full">
            <ServiceCard service={s} />
          </Reveal>
        ))}
      </div>

      <div className="mt-16">
        <CtaBar />
      </div>
    </section>
  );
}
