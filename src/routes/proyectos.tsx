import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, MoveHorizontal } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import suelosAntes from "@/assets/suelos_antes.webp.asset.json";
import suelosDespues1 from "@/assets/suelos_despues_1.webp.asset.json";
import suelosDespues2 from "@/assets/suelos_despues_2.webp.asset.json";
import muroAntes from "@/assets/muro_y_valla_antes.webp.asset.json";
import muroDespues from "@/assets/muro_y_valla_despues.webp.asset.json";
import pinturaAntes from "@/assets/pintura_antes.webp.asset.json";
import pinturaDespues from "@/assets/pintura_despues.png.asset.json";
import cocina1 from "@/assets/cocinas_1.webp.asset.json";
import cocina2 from "@/assets/cocinas_2.webp.asset.json";

export const Route = createFileRoute("/proyectos")({
  component: Projects,
  head: () => ({
    meta: [
      { title: "Proyectos · Reformas HZ Madrid y Guadalajara" },
      {
        name: "description",
        content:
          "Trabajos reales de Reformas HZ: suelos, muros y vallas, pintura y cocinas, con comparativas antes y después de cada obra en Madrid y Guadalajara.",
      },
      { property: "og:title", content: "Proyectos · Reformas HZ" },
      {
        property: "og:description",
        content: "Obras entregadas con comparativa antes y después: suelos, albañilería, pintura y cocinas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: muroDespues.url },
      { name: "twitter:image", content: muroDespues.url },
    ],
    links: [{ rel: "canonical", href: "https://casa-craft-madrid.lovable.app/proyectos" }],
  }),
});

type Project = {
  id: string;
  title: string;
  type: string;
  desc: string;
  result: string;
  before: string;
  afters: string[];
};

function ProjectBlock({ p, index }: { p: Project; index: number }) {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const flip = index % 2 === 1;

  return (
    <article className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
      <Reveal
        variant={flip ? "right" : "left"}
        className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}
      >
        <BeforeAfter
          before={p.before}
          after={p.afters[active]}
          beforeLabel={t("work.before")}
          afterLabel={t("work.after")}
          alt={p.title}
        />

        {p.afters.length > 1 && (
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t("work.views")}
            </p>
            <div className="mt-3 flex gap-3">
              {p.afters.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`${t("work.after")} ${i + 1}`}
                  aria-pressed={active === i}
                  className={`overflow-hidden rounded-xl ring-2 transition-all duration-300 hover:-translate-y-0.5 ${
                    active === i ? "ring-accent" : "ring-border opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-16 w-24 object-cover sm:h-20 sm:w-28"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <MoveHorizontal className="h-3.5 w-3.5 text-accent" />
          {t("work.drag")}
        </p>
      </Reveal>

      <Reveal
        variant={flip ? "left" : "right"}
        delay={120}
        className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}
      >
        <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-secondary-foreground">
          {p.type}
        </span>
        <h2 className="mt-4 font-display text-2xl uppercase leading-tight text-navy sm:text-3xl">{p.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{p.desc}</p>

        <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <CheckCircle2 className="h-4 w-4" />
            {t("work.result")}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/80">{p.result}</p>
        </div>
      </Reveal>
    </article>
  );
}

function Projects() {
  const { t } = useLang();

  const projects: Project[] = [
    {
      id: "floors",
      title: t("work.floors.title"),
      type: t("work.floors.type"),
      desc: t("work.floors.desc"),
      result: t("work.floors.result"),
      before: suelosAntes.url,
      afters: [suelosDespues1.url, suelosDespues2.url],
    },
    {
      id: "wall",
      title: t("work.wall.title"),
      type: t("work.wall.type"),
      desc: t("work.wall.desc"),
      result: t("work.wall.result"),
      before: muroAntes.url,
      afters: [muroDespues.url],
    },
    {
      id: "paint",
      title: t("work.paint.title"),
      type: t("work.paint.type"),
      desc: t("work.paint.desc"),
      result: t("work.paint.result"),
      before: pinturaAntes.url,
      afters: [pinturaDespues.url],
    },
    {
      id: "kitchen",
      title: t("work.kitchen.title"),
      type: t("work.kitchen.type"),
      desc: t("work.kitchen.desc"),
      result: t("work.kitchen.result"),
      before: cocina1.url,
      afters: [cocina2.url],
    },
  ];

  return (
    <section className="container-page py-20 md:py-28">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">{t("projects.eyebrow")}</p>
        <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl uppercase leading-[1.02] text-navy sm:text-5xl md:text-6xl">
          {t("projects.title")}
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{t("projects.subtitle")}</p>
        <p className="mt-2 text-sm text-muted-foreground">{t("work.drag")}</p>
      </Reveal>

      <div className="mt-16 space-y-20 md:mt-20 md:space-y-28">
        {projects.map((p, i) => (
          <ProjectBlock key={p.id} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}
