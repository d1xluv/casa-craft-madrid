import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { business } from "@/content/site";
import { EMAIL, MAILTO_URL, PHONE_DISPLAY, TEL_URL, WHATSAPP_URL } from "@/lib/contact";

export function Footer() {
  const { t, l } = useLang();
  const linkCls = "block text-background/80 hover:text-accent";
  return (
    <footer className="mt-24 border-t border-border bg-gradient-ink text-background">
      <div className="container-page grid gap-10 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent font-display text-sm font-extrabold text-accent-foreground">
              HZ
            </span>
            <span className="leading-tight">
              <span className="block font-display text-xl font-extrabold uppercase tracking-tight">
                Reformas HZ
              </span>
              <span className="block text-[11px] uppercase tracking-widest text-background/60">
                {t("brand.tagline")}
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm text-background/70">{t("footer.tag")}</p>
          <p className="mt-4 font-display text-lg text-background/90">“{t("brand.motto")}”</p>
        </div>

        <div className="space-y-3 text-sm">
          <h2 className="font-display text-base text-background">{t("nav.contact")}</h2>
          <a
            href={TEL_URL}
            className="flex items-center gap-2 text-background/80 hover:text-accent"
          >
            <Phone className="h-4 w-4" aria-hidden="true" /> {PHONE_DISPLAY}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-background/80 hover:text-accent"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
          </a>
          <a
            href={MAILTO_URL}
            className="flex items-center gap-2 break-all text-background/80 hover:text-accent"
          >
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" /> {EMAIL}
          </a>
          <p className="flex items-center gap-2 text-background/80">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" /> {l(business.area)}
          </p>
        </div>

        <nav aria-label={t("nav.main")} className="space-y-3 text-sm">
          <h2 className="font-display text-base text-background">{t("nav.home")}</h2>
          <Link to="/servicios" className={linkCls}>
            {t("nav.services")}
          </Link>
          <Link to="/proyectos" className={linkCls}>
            {t("nav.projects")}
          </Link>
          <Link to="/sobre-mi" className={linkCls}>
            {t("nav.about")}
          </Link>
          <Link to="/resenas" className={linkCls}>
            {t("nav.reviews")}
          </Link>
          <Link to="/contacto" className={linkCls}>
            {t("nav.contact")}
          </Link>
        </nav>

        <nav aria-label={t("footer.legal")} className="space-y-3 text-sm">
          <h2 className="font-display text-base text-background">{t("footer.legal")}</h2>
          <Link to="/aviso-legal" className={linkCls}>
            {t("footer.legalNotice")}
          </Link>
          <Link to="/privacidad" className={linkCls}>
            {t("footer.privacy")}
          </Link>
          <Link to="/cookies" className={linkCls}>
            {t("footer.cookies")}
          </Link>
        </nav>
      </div>
      <div className="border-t border-background/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-background/60 md:flex-row">
          <p>
            © {new Date().getFullYear()} Reformas HZ. {t("footer.rights")}
          </p>
          <p>Madrid · Guadalajara</p>
        </div>
      </div>
    </footer>
  );
}
