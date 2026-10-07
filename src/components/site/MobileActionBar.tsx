import { Phone, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { TEL_URL, WHATSAPP_URL } from "@/lib/contact";

/** Barra fija inferior en móvil con llamada y WhatsApp. */
export function MobileActionBar() {
  const { t } = useLang();
  return (
    <div className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-2 gap-2 px-3 py-2.5">
        <a
          href={TEL_URL}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-ember text-sm font-semibold text-accent-foreground"
        >
          <Phone className="h-4 w-4" aria-hidden="true" /> {t("cta.call")}
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card text-sm font-semibold"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> {t("cta.whatsapp")}
        </a>
      </div>
    </div>
  );
}
