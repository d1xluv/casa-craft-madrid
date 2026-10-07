import { ExternalLink, Star } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { GOOGLE_REVIEW_URL, reviews } from "@/content/reviews";
import { Reveal } from "./Reveal";

function Stars({ n = 5, className = "h-5 w-5" }: { n?: number; className?: string }) {
  return (
    <span className="flex gap-0.5 text-amber-400" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`${className} ${i < n ? "fill-current" : "opacity-30"}`} />
      ))}
    </span>
  );
}

/** Reseñas: muestra las reales de content/reviews.ts e invita a opinar en Google. */
export function Reviews() {
  const { t, l } = useLang();
  return (
    <section id="resenas" className="container-page scroll-mt-28 py-20 md:py-28">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {t("reviews.eyebrow")}
        </p>
        <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl uppercase text-navy md:text-5xl">
          {t("reviews.title")}
        </h2>
      </Reveal>

      {reviews.length > 0 && (
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal
              as="li"
              key={i}
              delay={i * 80}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <Stars n={r.rating} className="h-4 w-4" />
              <p className="mt-4 leading-relaxed text-foreground/85">“{l(r.text)}”</p>
              <p className="mt-4 text-sm font-semibold text-navy">
                {r.author}
                {r.date && <span className="font-normal text-muted-foreground"> · {r.date}</span>}
              </p>
            </Reveal>
          ))}
        </ul>
      )}

      <Reveal delay={100}>
        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-sand/60 p-8 md:flex-row md:items-center md:p-10">
          <div>
            <Stars className="h-7 w-7" />
            <p className="mt-4 max-w-xl text-lg text-foreground/85">{t("reviews.text")}</p>
          </div>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-motion inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-ember px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-ember"
          >
            <Star className="h-4 w-4 fill-current" aria-hidden="true" /> {t("reviews.cta")}
            <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
