import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, Phone, MapPin, ShieldCheck, Clock, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { TEL_URL, WHATSAPP_URL, PHONE_DISPLAY } from "@/lib/contact";
import { business, SITE_URL } from "@/content/site";
import { services } from "@/content/services";
import { getProject } from "@/content/projects";
import { values } from "@/content/process";
import { HomeHero } from "@/components/site/HomeHero";
import { WorkCard } from "@/components/site/WorkCard";
import { ServiceCard } from "@/components/site/ServiceCard";
import { Reveal } from "@/components/site/Reveal";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: business.brand,
  url: SITE_URL,
  telephone: `+34${business.phone}`,
  email: business.email,
  areaServed: ["Madrid", "Guadalajara"],
};

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    ...seo({
      path: "/",
      title: "Reformas HZ · Reformas y pintura en Madrid y Guadalajara",
      description:
        "Reformas integrales, albañilería, pintura y alisado en Madrid, Guadalajara y zonas cercanas. Presupuesto sin compromiso: 671 155 809.",
    }),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
});

/** Servicios que se muestran en la portada (ids de src/content/services.ts). */
const HOME_SERVICES = ["pintura", "reforma-integral", "albanileria"];
/** Proyectos de la portada: el primero ocupa la tarjeta grande. */
const HOME_PROJECTS = ["suelos", "cocina-en-l", "muro-valla"];

const LAYOUT = [
  { className: "md:col-span-4 md:row-span-2", ratio: "aspect-[16/11] md:aspect-auto md:h-full" },
  { className: "md:col-span-2", ratio: "aspect-square" },
  { className: "md:col-span-2", ratio: "aspect-square" },
];

function SectionHead({
  eyebrow,
  title,
  to,
  link,
}: {
  eyebrow: string;
  title: string;
  to: string;
  link: string;
}) {
  return (
    <Reveal>
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
          <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl uppercase text-navy md:text-5xl">
            {title}
          </h2>
        </div>
        <Link
          to={to}
          className="group inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-accent"
        >
          {link}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </Reveal>
  );
}

function Home() {
  const { t, l } = useLang();
  const homeServices = services.filter((s) => HOME_SERVICES.includes(s.id));
  const works = HOME_PROJECTS.map(getProject).filter((p) => p !== undefined);

  return (
    <>
      <HomeHero />

      {/* COMPROMISOS */}
      <section className="border-b border-border bg-background">
        <div className="container-page grid gap-6 py-10 sm:grid-cols-3">
          {values.map((v, i) => {
            const Icon = [ShieldCheck, Clock, Sparkles][i] ?? ShieldCheck;
            return (
              <Reveal key={v.title.es} delay={i * 70}>
                <div className="flex gap-3">
                  <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <h2 className="font-display text-base">{l(v.title)}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{l(v.text)}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="bg-sand/40">
        <div className="container-page py-20 md:py-28">
          <SectionHead
            eyebrow={t("services.eyebrow")}
            title={t("services.title")}
            to="/servicios"
            link={t("services.all")}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {homeServices.map((s, i) => (
              <Reveal key={s.id} delay={i * 90} className="h-full">
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROYECTOS */}
      <section className="container-page py-20 md:py-28">
        <SectionHead
          eyebrow={t("projects.eyebrow")}
          title={t("projects.title")}
          to="/proyectos"
          link={t("nav.projects")}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-6">
          {works.map((p, i) => (
            <Reveal key={p.id} delay={i * 100} className={LAYOUT[i]?.className}>
              <WorkCard
                img={p.cover.src}
                tag={l(p.category)}
                title={l(p.title)}
                desc={l(p.summary)}
                ratio={LAYOUT[i]?.ratio}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-ink p-10 text-background md:p-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                  {t("contact.eyebrow")}
                </p>
                <h2 className="mt-3 font-display text-4xl uppercase text-background md:text-5xl">
                  {t("contact.title")}
                </h2>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-background/25 px-4 py-2 text-xs uppercase tracking-widest text-background/80">
                  <MapPin className="h-4 w-4 text-accent" aria-hidden="true" /> {l(business.area)}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Link
                  to="/contacto"
                  hash="formulario"
                  className="btn-motion inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-navy"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" /> {t("cta.quote")}
                </Link>
                <a
                  href={TEL_URL}
                  className="btn-motion inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" /> {PHONE_DISPLAY}
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-motion inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 text-sm font-semibold text-background hover:bg-background/10"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
