import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { reviews } from "@/content/reviews";
import { Reveal } from "@/components/site/Reveal";
import { ReviewCard, ReviewInvite, ReviewSummary } from "@/components/site/Reviews";
import { CtaBar } from "@/components/site/CtaBar";

export const Route = createFileRoute("/resenas")({
  component: ReviewsPage,
  head: () =>
    seo({
      path: "/resenas",
      title: "Reseñas · Reformas HZ Madrid y Guadalajara",
      description: "Opiniones de clientes de Reformas HZ en Google. Deje también su reseña.",
    }),
});

function ReviewsPage() {
  const { t } = useLang();
  return (
    <section className="container-page py-20 md:py-28">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {t("reviews.eyebrow")}
        </p>
        <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl uppercase leading-[1.02] text-navy sm:text-5xl md:text-6xl">
          {t("reviews.title")}
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{t("reviews.intro")}</p>
        <div className="mt-8">
          <ReviewSummary />
        </div>
      </Reveal>

      {reviews.length > 0 && (
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={(i % 3) * 80} className="h-full">
              <ReviewCard r={r} />
            </Reveal>
          ))}
        </div>
      )}

      <Reveal delay={100} className="mt-12">
        <ReviewInvite />
      </Reveal>

      <div className="mt-16">
        <CtaBar />
      </div>
    </section>
  );
}
