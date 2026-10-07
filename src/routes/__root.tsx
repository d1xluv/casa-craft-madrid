import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { LangProvider, useLang } from "@/lib/i18n";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { MobileActionBar } from "@/components/site/MobileActionBar";

function NotFoundComponent() {
  const { t } = useLang();
  return (
    <section className="container-page flex min-h-[60vh] flex-col justify-center py-24">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">404</p>
      <h1 className="mt-3 font-display text-4xl uppercase text-navy md:text-6xl">
        {t("notfound.title")}
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">{t("notfound.text")}</p>
      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-gradient-ember px-6 py-3 text-sm font-semibold text-accent-foreground"
        >
          {t("notfound.home")}
        </Link>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <section className="container-page flex min-h-[60vh] flex-col justify-center py-24">
      <h1 className="font-display text-3xl uppercase text-navy md:text-5xl">
        No se ha podido cargar la página
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Ha ocurrido un error. Puede intentarlo de nuevo o volver al inicio.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="inline-flex items-center justify-center rounded-full bg-gradient-ember px-6 py-3 text-sm font-semibold text-accent-foreground"
        >
          Reintentar
        </button>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold"
        >
          Ir al inicio
        </Link>
      </div>
    </section>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#fbfcff" },
      { title: "Reformas HZ · Reformas, albañilería y pintura en Madrid y Guadalajara" },
      {
        name: "description",
        content:
          "Reformas HZ: reformas integrales, albañilería, pintura y alisado en Madrid, Guadalajara y zonas cercanas. Presupuesto sin compromiso. 671 155 809.",
      },
      { name: "author", content: "Reformas HZ" },
      { property: "og:site_name", content: "Reformas HZ" },
      { property: "og:locale", content: "es_ES" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: `${import.meta.env.BASE_URL}favicon.svg` },
      {
        rel: "icon",
        type: "image/png",
        sizes: "64x64",
        href: `${import.meta.env.BASE_URL}favicon.png`,
      },
      { rel: "apple-touch-icon", href: `${import.meta.env.BASE_URL}apple-touch-icon.png` },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Marca que JS está activo: solo entonces se ocultan los elementos que aparecen al hacer scroll. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function SkipLink() {
  const { t } = useLang();
  return (
    <a
      href="#main"
      className="fixed left-3 top-3 z-[60] -translate-y-24 rounded-md bg-navy px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform focus:translate-y-0"
    >
      {t("skip")}
    </a>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        <SkipLink />
        <div className="flex min-h-screen flex-col pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
          <Nav />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            <Outlet />
          </main>
          <Footer />
        </div>
        <MobileActionBar />
      </LangProvider>
    </QueryClientProvider>
  );
}
