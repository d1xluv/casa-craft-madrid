import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, PaintRoller } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";

const PHONE = "671155809";
const PHONE2 = "671155752";

export function Nav() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/servicios", label: t("nav.services") },
    { to: "/proyectos", label: t("nav.projects") },
    { to: "/sobre-mi", label: t("nav.about") },
    { to: "/contacto", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="hidden bg-gradient-ink text-background/85 md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p className="tracking-wide">{t("brand.quote")} · {t("brand.years")}</p>
          <p className="flex items-center gap-4">
            <a href={`tel:${PHONE}`} className="hover:text-background">671 155 809</a>
            <span className="text-background/30">|</span>
            <a href={`tel:${PHONE2}`} className="hover:text-background">671 155 752</a>
          </p>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-ember text-accent-foreground shadow-soft">
            <PaintRoller className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-extrabold uppercase tracking-tight text-navy">
              Pinturas <span className="text-accent">Alcalá</span>
            </span>
            <span className="hidden text-[11px] uppercase tracking-widest text-muted-foreground sm:block">
              {t("brand.tagline")}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:bg-accent after:transition-all ${
                pathname === l.to
                  ? "text-foreground after:w-full"
                  : "text-muted-foreground after:w-0 hover:text-foreground hover:after:w-full"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-ember px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-soft transition-transform hover:scale-[1.03]"
          >
            <Phone className="h-4 w-4" />
            671 155 809
          </a>
        </div>

        <button
          className="rounded-md p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-foreground hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2">
              <LanguageToggle />
              <div className="flex gap-2">
                <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full bg-gradient-ember px-4 py-2 text-sm font-semibold text-accent-foreground">
                  <Phone className="h-4 w-4" /> 671 155 809
                </a>
                <a href={`tel:${PHONE2}`} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold">
                  671 155 752
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
