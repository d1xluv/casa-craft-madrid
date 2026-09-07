import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Base path where the app is served from ("/" in dev and on a custom domain,
// "/casa-craft-madrid/" on GitHub Pages via VITE_BASE_PATH).
const basepath = import.meta.env.BASE_URL.replace(/\/+$/, "") || "/";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    basepath,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });


  return router;
};
