import { Link } from "@tanstack/react-router";
import { FileText, MessageCircle, Phone } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { PHONE_DISPLAY, TEL_URL, WHATSAPP_URL, whatsappUrl } from "@/lib/contact";
import { Reveal } from "./Reveal";

/**
 * Franja de contacto: llamar, WhatsApp y "Pedir presupuesto" (lleva al
 * formulario; con `serviceId` llega con ese servicio ya marcado).
 */
export function CtaBar({
  title,
  whatsappText,
  serviceId,
}: {
  title?: string;
  whatsappText?: string;
  serviceId?: string;
}) {
  const { t } = useLang();
  return (
    <Reveal>
      <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl bg-gradient-ink p-8 text-background md:p-10 lg:flex-row lg:items-center">
        <div className="pointer-events-none absolute -right-16 -top-20 h-60 w-60 rounded-full bg-accent/30 blur-3xl" />
        <h2 className="relative font-display text-2xl uppercase text-background md:text-3xl">
          {title ?? t("contact.title")}
        </h2>
        <div className="relative flex flex-wrap gap-3 lg:shrink-0 lg:flex-nowrap">
          <Link
            to="/contacto"
            search={serviceId ? { servicio: serviceId } : {}}
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
            href={whatsappText ? whatsappUrl(whatsappText) : WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-motion inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 text-sm font-semibold text-background hover:bg-background/10"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
          </a>
        </div>
      </div>
    </Reveal>
  );
}
