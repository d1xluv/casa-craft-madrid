import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { legal } from "@/content/site";

/** Muestra el dato si existe o un aviso de "pendiente" bien visible. */
export function Pending({ value, what }: { value: string | null | undefined; what: string }) {
  if (value) return <>{value}</>;
  return (
    <mark className="rounded-sm bg-amber-100 px-1.5 py-0.5 font-medium text-amber-900">
      [Pendiente: {what}]
    </mark>
  );
}

/** ¿Faltan datos del titular? Se muestra un aviso al principio de los textos legales. */
export const legalDataPending = !legal.holderFullName || !legal.address;

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  const { t } = useLang();
  return (
    <>
      <header>
        <div className="container-page pt-20 md:pt-28">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {t("footer.legal")}
          </p>
          <h1 className="mt-3 font-display text-4xl uppercase leading-[1.02] text-navy sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 text-sm text-muted-foreground">
            {t("legal.updated")}: {legal.lastUpdated}
          </p>
          {t("legal.onlyEs") && (
            <p className="mt-2 text-sm text-muted-foreground">{t("legal.onlyEs")}</p>
          )}
        </div>
      </header>
      <div className="container-page py-12">
        {legalDataPending && (
          <div
            role="note"
            className="mb-10 flex max-w-[46rem] gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950"
          >
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
            <p>
              <strong>Borrador pendiente de completar.</strong> Faltan datos del titular marcados
              como «Pendiente». Este texto no ha sido validado legalmente; revíselo con un
              profesional antes de publicarlo.
            </p>
          </div>
        )}
        <div lang="es" className="prose-legal">
          {children}
        </div>
      </div>
    </>
  );
}
