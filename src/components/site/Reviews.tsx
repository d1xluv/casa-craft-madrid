import { Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, Star } from "lucide-react";
import { useLang } from "@/lib/i18n";
import {
  GOOGLE_MAPS_URL,
  GOOGLE_REVIEW_URL,
  reviewSummary,
  reviews,
  type Review,
} from "@/content/reviews";
import { Reveal } from "./Reveal";

export function Stars({ n = 5, className = "h-5 w-5" }: { n?: number; className?: string }) {
  return (
    <span className="flex gap-0.5 text-amber-400" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`${className} ${i < Math.round(n) ? "fill-current" : "opacity-30"}`}
        />
      ))}
    </span>
  );
}

/** Logotipo de texto "Google" (atribución obligatoria de las reseñas). */
function GoogleWord() {
  return (
    <span className="font-semibold" aria-label="Google">
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span>
    </span>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function ReviewCard({ r }: { r: Review }) {
  const { t } = useLang();
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-ember font-display text-sm font-bold text-white">
          {initials(r.author)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold text-navy">{r.author}</p>
          <p className="text-xs text-muted-foreground">{r.when}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Stars n={r.rating} className="h-4 w-4" />
        <span className="sr-only">{r.rating} / 5</span>
      </div>
      <p className="mt-3 flex-1 whitespace-pre-line leading-relaxed text-foreground/85">{r.text}</p>
      {r.url && (
        <a
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-accent"
        >
          {t("reviews.onGoogle")} <GoogleWord />
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      )}
    </article>
  );
}

/** Resumen: nota media y número de reseñas en Google. */
export function ReviewSummary() {
  const { t } = useLang();
  if (!reviewSummary.rating) return null;
  return (
    <a
      href={GOOGLE_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 shadow-soft transition-transform hover:-translate-y-0.5"
    >
      <span className="font-display text-4xl font-bold text-navy">
        {reviewSummary.rating.toFixed(1).replace(".", ",")}
      </span>
      <span>
        <Stars n={reviewSummary.rating} className="h-4 w-4" />
        <span className="mt-1 block text-xs text-muted-foreground">
          {reviewSummary.count} {t("reviews.count")} <GoogleWord />
        </span>
      </span>
    </a>
  );
}

/** Invitación a dejar reseña. */
export function ReviewInvite() {
  const { t } = useLang();
  return (
    <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-sand/60 p-8 md:flex-row md:items-center md:p-10">
      <div>
        <Stars className="h-7 w-7" />
        <p className="mt-4 max-w-xl text-lg text-foreground/85">{t("reviews.text")}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-motion inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-ember px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-ember"
        >
          <Star className="h-4 w-4 fill-current" aria-hidden="true" /> {t("reviews.cta")}
        </a>
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold hover:border-accent hover:text-accent"
        >
          {t("reviews.seeAll")} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

/** Sección de reseñas de la portada: las 3 primeras y enlace a /resenas. */
export function Reviews() {
  const { t } = useLang();
  return (
    <section id="resenas" className="container-page scroll-mt-28 py-20 md:py-28">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              {t("reviews.eyebrow")}
            </p>
            <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl uppercase text-navy md:text-5xl">
              {t("reviews.title")}
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <ReviewSummary />
            {reviews.length > 0 && (
              <Link
                to="/resenas"
                className="group inline-flex items-center gap-1 text-sm font-semibold hover:text-accent"
              >
                {t("reviews.all")}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            )}
          </div>
        </div>
      </Reveal>

      {reviews.length > 0 && (
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.slice(0, 3).map((r, i) => (
            <Reveal key={i} delay={i * 80} className="h-full">
              <ReviewCard r={r} />
            </Reveal>
          ))}
        </div>
      )}

      <Reveal delay={100} className="mt-12">
        <ReviewInvite />
      </Reveal>
    </section>
  );
}
