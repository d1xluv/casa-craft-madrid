import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";
import { WorkCard } from "@/components/site/WorkCard";
import projApartment from "@/assets/project-apartment.jpg";
import projBath from "@/assets/project-bathroom.jpg";
import projKitchen from "@/assets/project-kitchen.jpg";
import projPainting from "@/assets/project-painting.jpg";
import projBrick from "@/assets/project-brick.jpg";
import projReform from "@/assets/project-reform.jpg";

export const Route = createFileRoute("/proyectos")({
  component: Projects,
  head: () => ({
    meta: [
      { title: "Proyectos · Reformas HZ Madrid y Guadalajara" },
      {
        name: "description",
        content:
          "Galería de reformas integrales, baños, cocinas, pintura y obras de albañilería realizadas por Reformas HZ en Madrid y Guadalajara.",
      },
      { property: "og:title", content: "Proyectos · Reformas HZ" },
      { property: "og:description", content: "Obras entregadas: reformas integrales, baños, cocinas y albañilería." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://casa-craft-madrid.lovable.app/proyectos" }],
  }),
});

function Projects() {
  const { t } = useLang();
  const items = [
    { img: projApartment, tag: t("projects.tag.apartment"), title: "Reforma integral · Chamberí", desc: t("projects.d.apartment") },
    { img: projBath, tag: t("projects.tag.bath"), title: "Baño completo · Salamanca", desc: t("projects.d.bath") },
    { img: projKitchen, tag: t("projects.tag.kitchen"), title: "Cocina abierta · Retiro", desc: t("projects.d.kitchen") },
    { img: projPainting, tag: t("projects.tag.painting"), title: "Pintura interior · Tetuán", desc: t("projects.d.painting") },
    { img: projBrick, tag: t("projects.tag.brick"), title: "Muro de ladrillo visto · Guadalajara", desc: t("projects.d.brick") },
    { img: projReform, tag: t("projects.tag.reform"), title: "Obra en curso · Moratalaz", desc: t("projects.d.reform") },
  ];

  return (
    <section className="container-page py-20 md:py-28">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">{t("projects.eyebrow")}</p>
        <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl uppercase leading-[1.02] text-navy sm:text-5xl md:text-6xl">
          {t("projects.title")}
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{t("projects.subtitle")}</p>
        <p className="mt-2 text-sm text-muted-foreground">{t("cards.hint")}</p>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 90} variant="scale">
            <WorkCard {...p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
