import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Expand, MoveHorizontal } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { projects, type Project } from "@/content/projects";
import { Reveal } from "@/components/site/Reveal";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { Lightbox } from "@/components/site/Lightbox";
import { PhotoExplorer } from "@/components/site/PhotoExplorer";
import { CtaBar } from "@/components/site/CtaBar";

export const Route = createFileRoute("/proyectos")({
  component: Projects,
  head: () =>
    seo({
      path: "/proyectos",
      title: "Proyectos · Reformas HZ Madrid y Guadalajara",
      description:
        "Trabajos reales de Reformas HZ: pintura, suelos, muro y valla perimetral y cocinas, con fotos de antes y después.",
    }),
});

function ProjectBlock({ p, index }: { p: Project; index: number }) {
  const { t, l } = useLang();
  const flip = index % 2 === 1;
  const [before, ...afters] = p.photos;
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);

  return (
    <article id={p.id} className="grid scroll-mt-28 items-center gap-8 md:grid-cols-12 md:gap-12">
      <Reveal className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
        {p.hotspots ? (
          <PhotoExplorer photo={p.photos[0]} hotspots={p.hotspots} />
        ) : (
          <>
            <div className="relative">
              <BeforeAfter before={before} after={afters[active] ?? before} />
              <button
                type="button"
                onClick={() => setZoom(1 + active)}
                className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-navy shadow-soft transition-transform hover:scale-105"
                aria-label={`${t("projects.enlarge")}: ${l(p.title)}`}
              >
                <Expand className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <MoveHorizontal className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                {t("work.drag")}
              </p>
              {afters.length > 1 && (
                <div role="group" aria-label={t("work.views")} className="flex gap-2">
                  {afters.map((ph, i) => (
                    <button
                      key={ph.src}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={active === i}
                      aria-label={l(ph.label)}
                      className={`overflow-hidden rounded-lg ring-2 transition-all duration-300 hover:-translate-y-0.5 ${
                        active === i ? "ring-accent" : "opacity-70 ring-border hover:opacity-100"
                      }`}
                    >
                      <img
                        src={ph.sm}
                        alt=""
                        loading="lazy"
                        className="h-12 w-16 object-cover sm:h-14 sm:w-20"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
        <Lightbox photos={p.photos} index={zoom} title={l(p.title)} onClose={() => setZoom(null)} />
      </Reveal>

      <Reveal delay={120} className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
        <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-secondary-foreground">
          {l(p.category)}
        </span>
        <h2 className="mt-4 font-display text-2xl uppercase leading-tight text-navy sm:text-3xl">
          {l(p.title)}
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{l(p.summary)}</p>
        <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            {t("projects.result")}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/80">{l(p.result)}</p>
        </div>
      </Reveal>
    </article>
  );
}

function Projects() {
  const { t } = useLang();
  return (
    <section className="container-page py-20 md:py-28">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {t("projects.eyebrow")}
        </p>
        <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl uppercase leading-[1.02] text-navy sm:text-5xl md:text-6xl">
          {t("projects.title")}
        </h1>
      </Reveal>

      <div className="mt-16 space-y-20 md:mt-20 md:space-y-28">
        {projects.map((p, i) => (
          <ProjectBlock key={p.id} p={p} index={i} />
        ))}
      </div>

      <div className="mt-24">
        <CtaBar />
      </div>
    </section>
  );
}
