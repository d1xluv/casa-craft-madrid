import type { Localized } from "@/lib/i18n";

/** Enlace para escribir una reseña de Reformas HZ en Google. */
export const GOOGLE_REVIEW_URL = "https://g.page/r/CcVWJPc5KOHPEBI/review";

/**
 * Reseñas reales copiadas de Google (no inventar). Mientras esté vacío, la web
 * muestra solo la invitación a dejar una reseña.
 * Ejemplo: { author: "Nombre", rating: 5, text: { es: "…", en: "…" }, date: "octubre 2026" }
 */
export const reviews: { author: string; rating: number; text: Localized; date?: string }[] = [];
