// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Inside Lovable we keep the current server-rendered setup (SSR entry in src/server.ts).
// Outside Lovable (e.g. GitHub Actions) we skip Nitro and prerender the site to static
// HTML so it can be published on GitHub Pages without any Node server.
const isLovableSandbox =
  process.env["LOVABLE_SANDBOX"] === "1" || !!process.env["DEV_SERVER__PROJECT_PATH"];

// Where the site is served from. "/" in Lovable, local dev and the custom
// domain (reformashz.com). Only "/casa-craft-madrid/" if publishing to the
// GitHub Pages project URL instead of the custom domain.
const rawBase = process.env["VITE_BASE_PATH"] ?? "/";
const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

export default defineConfig(
  isLovableSandbox
    ? {
        vite: { base },
        tanstackStart: {
          server: { entry: "server" },
        },
      }
    : {
        nitro: false,
        vite: { base },
        tanstackStart: {
          pages: [
            { path: "/" },
            { path: "/servicios" },
            { path: "/proyectos" },
            { path: "/sobre-mi" },
            { path: "/contacto" },
          ],
          prerender: { enabled: true, autoStaticPathsDiscovery: false },
        },
      },
);
