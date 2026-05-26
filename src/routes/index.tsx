import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone, MapPin, ShieldCheck, Hammer, PaintRoller, Wrench } from "lucide-react";
import { useLang } from "@/lib/i18n";
import heroImg from "@/assets/hero-bricklayer.jpg";
import projApartment from "@/assets/project-apartment.jpg";
import projBath from "@/assets/project-bathroom.jpg";
import projKitchen from "@/assets/project-kitchen.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Reformas Alcalá · Reformas integrales en Madrid" },
      { name: "description", content: "Albañil de primera, pintor y reformas integrales en toda la Comunidad de Madrid. Llama al 671 155 809." },
    ],
  }),
});

function Home() {
  const { t } = useLang();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-page grid gap-12 pt-12 pb-20 md:grid-cols-12 md:gap-8 md:pt-20 md:pb-32">
          <div className="md:col-span-7 md:pr-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t("hero.eyebrow")}
            </p>
            <h1 className="mt-6 text-balance font-display text-5xl font-medium leading-[1.02] md:text-7xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">{t("hero.subtitle")}</p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="tel:671155809"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-ember px-6 py-3 text-sm font-semibold text-accent-foreground shadow-ember transition-transform hover:scale-[1.02]"
              >
                <Phone className="h-4 w-4" />
                {t("hero.cta.primary")}
              </a>
              <Link
                to="/proyectos"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                {t("hero.cta.secondary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{t("hero.stat.years")}</dt>
                <dd className="mt-1 font-display text-3xl">20+</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{t("hero.stat.projects")}</dt>
                <dd className="mt-1 font-display text-3xl">300+</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{t("hero.stat.area")}</dt>
                <dd className="mt-1 flex items-center gap-1 font-display text-xl">
                  <MapPin className="h-4 w-4 text-accent" /> Madrid
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative md:col-span-5">
            <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-md shadow-ember">
              <img
                src={heroImg}
                alt="Albañil colocando ladrillos en Madrid"
                width={1600}
                height={1200}
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/80 to-transparent p-6">
                <p className="font-display text-2xl text-background">"Hecho a mano, como debe ser."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="border-y border-border bg-sand/40">
        <div className="container-page py-20 md:py-28">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-widest text-accent">{t("services.eyebrow")}</p>
              <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl md:text-5xl">{t("services.title")}</h2>
            </div>
            <Link to="/servicios" className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent">
              {t("nav.services")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg bg-border md:grid-cols-3">
            {[
              { icon: Hammer, t: t("services.brick.title"), d: t("services.brick.desc") },
              { icon: PaintRoller, t: t("services.painting.title"), d: t("services.painting.desc") },
              { icon: Wrench, t: t("services.reform.title"), d: t("services.reform.desc") },
            ].map((s) => (
              <div key={s.t} className="group bg-card p-8 transition-colors hover:bg-background">
                <s.icon className="h-7 w-7 text-accent transition-transform group-hover:scale-110" />
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
            <p className="text-xs uppercase tracking-widest text-accent">{t("projects.eyebrow")}</p>
            <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl md:text-5xl">{t("projects.title")}</h2>
          </div>
          <Link to="/proyectos" className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent">
            {t("nav.projects")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          <ProjectCard className="md:col-span-4 md:row-span-2" img={projApartment} tag={t("projects.tag.apartment")} ratio="aspect-[16/10]" />
          <ProjectCard className="md:col-span-2" img={projKitchen} tag={t("projects.tag.kitchen")} ratio="aspect-square" />
          <ProjectCard className="md:col-span-2" img={projBath} tag={t("projects.tag.bath")} ratio="aspect-square" />
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-ink p-10 text-background md:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-accent">{t("contact.eyebrow")}</p>
              <h2 className="mt-3 font-display text-4xl text-background md:text-5xl">{t("contact.title")}</h2>
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
            <ShieldCheck className="h-4 w-4 text-accent" /> {t("about.value4.t")} · {t("about.value1.t")}
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectCard({
  img,
  tag,
  className = "",
  ratio = "aspect-square",
}: {
  img: string;
  tag: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div className={`group relative overflow-hidden rounded-lg ${className}`}>
      <img src={img} alt={tag} loading="lazy" className={`${ratio} w-full object-cover transition-transform duration-700 group-hover:scale-105`} />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5">
        <span className="inline-flex items-center rounded-full bg-background/95 px-3 py-1 text-xs font-medium text-foreground">{tag}</span>
      </div>
    </div>
  );
}
