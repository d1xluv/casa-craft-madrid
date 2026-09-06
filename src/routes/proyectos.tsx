import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
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
      { title: "Proyectos · Pinturas Alcalá Madrid" },
      { name: "description", content: "Galería de reformas integrales, baños, cocinas y obras de albañilería realizadas en Madrid." },
    ],
  }),
});

function Projects() {
  const { t } = useLang();
  const items = [
    { img: projApartment, tag: t("projects.tag.apartment"), title: "Reforma integral · Chamberí" },
    { img: projBath, tag: t("projects.tag.bath"), title: "Baño completo · Salamanca" },
    { img: projKitchen, tag: t("projects.tag.kitchen"), title: "Cocina abierta · Retiro" },
    { img: projPainting, tag: t("projects.tag.painting"), title: "Pintura interior · Tetuán" },
    { img: projBrick, tag: t("projects.tag.brick"), title: "Muro de ladrillo visto · Alcalá" },
    { img: projReform, tag: t("projects.tag.reform"), title: "Obra en curso · Moratalaz" },
  ];

  return (
    <section className="container-page py-20 md:py-28">
      <p className="text-xs uppercase tracking-widest text-accent">{t("projects.eyebrow")}</p>
      <h1 className="mt-3 max-w-3xl text-balance font-display text-5xl md:text-6xl">{t("projects.title")}</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">{t("projects.subtitle")}</p>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <article key={i} className="group">
            <div className="overflow-hidden rounded-lg bg-muted">
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <h2 className="font-display text-lg">{p.title}</h2>
              <span className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">{p.tag}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
