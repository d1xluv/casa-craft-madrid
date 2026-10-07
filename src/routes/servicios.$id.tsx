import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { getService, services } from "@/content/services";
import { getProject } from "@/content/projects";
import { Reveal } from "@/components/site/Reveal";
import { ServiceScene } from "@/components/site/ServiceScene";
import { CtaBar } from "@/components/site/CtaBar";

export const Route = createFileRoute("/servicios/$id")({
  loader: ({ params }) => {
    const service = getService(params.id);
    if (!service) throw notFound();
    return { id: service.id };
  },
  head: ({ params }) => {
    const s = getService(params.id);
    if (!s) return {};
    return seo({
      path: `/servicios/${s.id}`,
      title: `${s.title.es} · Reformas HZ Madrid y Guadalajara`,
      description: s.summary.es,
    });
  },
  component: ServicePage,
});

function ServicePage() {
  const { id } = Route.useLoaderData();
  const { t, l } = useLang();
  const service = getService(id)!;
  const project = service.projectId ? getProject(service.projectId) : undefined;
  const Icon = service.icon;

  return (
    <section className="container-page py-12 md:py-16">
      <Link
        to="/servicios"
        className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-accent"
      >
        <ArrowLeft
          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          aria-hidden="true"
        />
        {t("services.all")}
      </Link>

      {/* Cabecera */}
      <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="animate-rise inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <Icon className="h-4 w-4" aria-hidden="true" />
            {t("services.eyebrow")}
          </p>
          <h1
            className="animate-rise mt-3 text-balance font-display text-4xl uppercase leading-[1.02] text-navy sm:text-5xl md:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            {l(service.title)}
          </h1>
          <p
            className="animate-rise mt-4 max-w-xl text-lg text-muted-foreground"
            style={{ animationDelay: "160ms" }}
          >
            {l(service.summary)}
          </p>
        </div>
      </div>

      {/* Ilustración animada */}
      <div className="animate-rise mt-10" style={{ animationDelay: "200ms" }}>
        <ServiceScene key={service.id} id={service.id} label={l(service.title)} />
      </div>

      {/* Qué hacemos */}
      <div className="mt-16 grid gap-10 md:grid-cols-12 md:gap-12">
        <Reveal className={project ? "md:col-span-7" : "md:col-span-8"}>
          <h2 className="font-display text-3xl uppercase text-navy md:text-4xl">
            {t("services.whatWeDo")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{l(service.detail)}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {service.includes.map((inc) => (
              <li
                key={inc.es}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                {l(inc)}
              </li>
            ))}
          </ul>
        </Reveal>

        {project && (
          <Reveal delay={100} className="md:col-span-5">
            <Link
              to="/proyectos"
              hash={project.id}
              className="group card-lift block overflow-hidden rounded-2xl border border-border bg-card hover:shadow-soft"
            >
              <div className="overflow-hidden">
                <img
                  src={project.cover.sm}
                  width={720}
                  height={540}
                  alt={l(project.cover.alt)}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    {t("services.seeProject")}
                  </p>
                  <p className="mt-1 font-display text-xl">{l(project.title)}</p>
                </div>
                <ArrowRight
                  className="h-5 w-5 text-accent transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </Reveal>
        )}
      </div>

      <div className="mt-16">
        <CtaBar
          title={t("services.ask")}
          whatsappText={`Hola, me gustaría pedir presupuesto para: ${service.title.es}.`}
          serviceId={service.id}
        />
      </div>

      {/* Otros servicios */}
      <nav aria-label={t("services.others")} className="mt-16">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {t("services.others")}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {services
            .filter((s) => s.id !== service.id)
            .map((s) => (
              <li key={s.id}>
                <Link
                  to="/servicios/$id"
                  params={{ id: s.id }}
                  className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  {l(s.title)}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </section>
  );
}
