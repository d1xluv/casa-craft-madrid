import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useLang } from "@/lib/i18n";
import heroImg from "@/assets/hero-bricklayer.jpg";

export const Route = createFileRoute("/sobre-mi")({
  component: About,
  head: () => ({
    meta: [
      { title: "Sobre mí · Reformas Alcalá Madrid" },
      { name: "description", content: "Más de 20 años de oficio. Albañil de primera, pintor y reformista en Madrid." },
    ],
  }),
});

function About() {
  const { t } = useLang();
  const skills = [
    "Albañilería de primera",
    "Pintura interior y exterior",
    "Reforma integral de pisos",
    "Alicatado y solado",
    "Tabiquería y aperturas",
    "Baños y cocinas",
    "Pladur y techos",
    "Pequeñas reparaciones",
  ];
  const values = [
    { t: t("about.value1.t"), d: t("about.value1.d") },
    { t: t("about.value2.t"), d: t("about.value2.d") },
    { t: t("about.value3.t"), d: t("about.value3.d") },
    { t: t("about.value4.t"), d: t("about.value4.d") },
  ];

  return (
    <>
      <section className="container-page grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-7">
          <p className="text-xs uppercase tracking-widest text-accent">{t("about.eyebrow")}</p>
          <h1 className="mt-3 text-balance font-display text-5xl md:text-6xl">{t("about.title")}</h1>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="overflow-hidden rounded-lg">
            <img src={heroImg} alt="Reformas Alcalá" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-sand/40">
        <div className="container-page grid gap-12 py-20 md:grid-cols-2 md:py-24">
          <div>
            <h2 className="font-display text-3xl md:text-4xl">{t("about.skills.title")}</h2>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {skills.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl md:text-4xl">{t("about.values.title")}</h2>
            <div className="mt-6 grid gap-4">
              {values.map((v) => (
                <div key={v.t} className="rounded-lg border border-border bg-card p-5">
                  <h3 className="font-display text-lg">{v.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
