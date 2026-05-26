import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { useLang } from "@/lib/i18n";

const PHONE = "671155809";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-24 border-t border-border bg-gradient-ink text-background">
      <div className="container-page grid gap-10 py-16 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-sm bg-background text-foreground font-display text-base font-bold">R</span>
            <span className="font-display text-xl">Reformas Alcalá</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-background/70">{t("footer.tag")}</p>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="font-display text-base text-background">{t("nav.contact")}</h3>
          <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-background/80 hover:text-accent">
            <Phone className="h-4 w-4" /> 671 155 809
          </a>
          <a
            href={`https://wa.me/34${PHONE}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-background/80 hover:text-accent"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <p className="flex items-center gap-2 text-background/80">
            <MapPin className="h-4 w-4" /> {t("contact.area.value")}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="font-display text-base text-background">{t("nav.home")}</h3>
          <Link to="/servicios" className="block text-background/80 hover:text-accent">{t("nav.services")}</Link>
          <Link to="/proyectos" className="block text-background/80 hover:text-accent">{t("nav.projects")}</Link>
          <Link to="/sobre-mi" className="block text-background/80 hover:text-accent">{t("nav.about")}</Link>
          <Link to="/contacto" className="block text-background/80 hover:text-accent">{t("nav.contact")}</Link>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-background/60 md:flex-row">
          <p>© {new Date().getFullYear()} Reformas Alcalá. {t("footer.rights")}</p>
          <p>Madrid · España</p>
        </div>
      </div>
    </footer>
  );
}
