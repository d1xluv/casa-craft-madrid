import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { useLang, type UiKey } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";
import { EMAIL, MAILTO_URL, PHONE_DISPLAY, TEL_URL, WHATSAPP_URL } from "@/lib/contact";

export const NAV_LINKS: { to: string; key: UiKey }[] = [
  { to: "/", key: "nav.home" },
  { to: "/servicios", key: "nav.services" },
  { to: "/proyectos", key: "nav.projects" },
  { to: "/sobre-mi", key: "nav.about" },
  { to: "/contacto", key: "nav.contact" },
];

export function Nav() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  // Cerrar el menú al cambiar de página y con la tecla Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="hidden bg-gradient-ink text-background/85 md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p className="tracking-wide">{t("brand.quote")}</p>
          <p className="flex items-center gap-5">
            <a href={TEL_URL} className="inline-flex items-center gap-1.5 hover:text-background">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {PHONE_DISPLAY}
            </a>
            <a href={MAILTO_URL} className="inline-flex items-center gap-1.5 hover:text-background">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" /> {EMAIL}
            </a>
          </p>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to="/" className="group flex items-center gap-3" aria-label="Reformas HZ — inicio">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-ember font-display text-sm font-extrabold tracking-tight text-accent-foreground shadow-soft transition-transform duration-300 group-hover:scale-105">
            HZ
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-extrabold uppercase tracking-tight text-navy">
              Reformas <span className="text-accent">HZ</span>
            </span>
            <span className="hidden text-[11px] uppercase tracking-widest text-muted-foreground sm:block lg:hidden xl:block">
              {t("brand.tagline")}
            </span>
          </span>
        </Link>

        <nav aria-label={t("nav.main")} className="hidden items-center gap-5 lg:flex xl:gap-7">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              aria-current={isActive(l.to) ? "page" : undefined}
              className={`relative whitespace-nowrap text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:bg-accent after:transition-all ${
                isActive(l.to)
                  ? "text-foreground after:w-full"
                  : "text-muted-foreground after:w-0 hover:text-foreground hover:after:w-full"
              }`}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <a
            href={TEL_URL}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gradient-ember px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-soft transition-transform hover:scale-[1.03]"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={MAILTO_URL}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-navy shadow-soft transition-all hover:scale-105 hover:border-accent hover:text-accent"
            aria-label={`${t("contact.email")}: ${EMAIL}`}
            title={EMAIL}
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="grid h-11 w-11 place-items-center rounded-md lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t("nav.close") : t("nav.open")}
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border bg-background lg:hidden"
      >
        <nav aria-label={t("nav.main")} className="container-page flex flex-col gap-1 py-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              aria-current={isActive(l.to) ? "page" : undefined}
              className={`rounded-md px-2 py-3 text-base transition-colors hover:bg-muted ${
                isActive(l.to) ? "font-semibold text-accent" : "text-foreground"
              }`}
            >
              {t(l.key)}
            </Link>
          ))}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2">
            <LanguageToggle />
            <div className="flex gap-2">
              <a
                href={TEL_URL}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-ember px-4 py-2.5 text-sm font-semibold text-accent-foreground"
              >
                <Phone className="h-4 w-4" aria-hidden="true" /> {PHONE_DISPLAY}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold"
              >
                WhatsApp
              </a>
              <a
                href={MAILTO_URL}
                className="grid h-11 w-11 place-items-center rounded-full border border-border"
                aria-label={`${t("contact.email")}: ${EMAIL}`}
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
