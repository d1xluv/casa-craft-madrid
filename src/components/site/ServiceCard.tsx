import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { useLang } from "@/lib/i18n";

/** Tarjeta de servicio (estilo original). Lleva a /servicios/<id>. */
export function ServiceCard({ service }: { service: Service }) {
  const { t, l } = useLang();
  const Icon = service.icon;
  return (
    <Link
      to="/servicios/$id"
      params={{ id: service.id }}
      className="group card-lift flex h-full flex-col rounded-2xl border border-border bg-card p-8 hover:border-accent/40 hover:shadow-soft"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:scale-105 group-hover:bg-accent group-hover:text-accent-foreground">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-6 font-display text-2xl">{l(service.title)}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {l(service.summary)}
      </p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        {t("services.more")}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
      <span className="mt-4 block h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
    </Link>
  );
}
