import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { EMAIL, MAILTO_URL, TEL_URL, WHATSAPP_URL } from "@/lib/contact";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-24 border-t border-border bg-gradient-ink text-background">
      <div className="container-page grid gap-10 py-16 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent font-display text-sm font-extrabold text-accent-foreground">
              HZ
            </span>
            <span className="leading-tight">
              <span className="block font-display text-xl font-extrabold uppercase tracking-tight">Reformas HZ</span>
              <span className="block text-[11px] uppercase tracking-widest text-background/60">{t("brand.tagline")}</span>
            </span>
          </div>

          <p className="mt-5 max-w-xs text-sm text-background/70">{t("footer.tag")}</p>
          <p className="mt-4 font-display text-lg text-background/90">“{t("brand.motto")}”</p>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="font-display text-base text-background">{t("nav.contact")}</h3>
          <a href={TEL_URL} className="flex items-center gap-2 text-background/80 hover:text-accent">
            <Phone className="h-4 w-4" /> 671 155 809
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-background/80 hover:text-accent"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a href={MAILTO_URL} className="flex items-center gap-2 text-background/80 hover:text-accent">
            <Mail className="h-4 w-4" /> {EMAIL}
          </a>
          <p className="flex items-center gap-2 text-background/80">
            <MapPin className="h-4 w-4" /> {t("contact.area.value")}
          </p>
          <p className="flex items-center gap-2 text-background/80">
            <ShieldCheck className="h-4 w-4" /> {t("brand.years")}
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
          <p>© {new Date().getFullYear()} Reformas HZ. {t("footer.rights")}</p>
          <p>Madrid · España</p>
        </div>
      </div>
    </footer>
  );
}
