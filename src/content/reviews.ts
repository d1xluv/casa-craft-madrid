import data from "./google-reviews.json";

/** Ficha de Reformas HZ en Google. */
export const GOOGLE_PLACE_ID = "ChIJo4pa9Qi1fmURxVYk9zko4c8";
/** Enlace para escribir una reseña. */
export const GOOGLE_REVIEW_URL = "https://g.page/r/CcVWJPc5KOHPEBI/review";

export type Review = {
  author: string;
  authorUrl: string | null;
  rating: number;
  text: string;
  when: string;
  url: string | null;
};

type GoogleData = {
  fetchedAt: string | null;
  rating: number | null;
  count: number;
  mapsUrl: string | null;
  reviews: Review[];
};
const google = data as unknown as GoogleData;

/**
 * Reseñas reales de Google, descargadas automáticamente al publicar
 * (scripts/fetch-google-reviews.mjs). No añadir reseñas inventadas.
 */
export const reviews: Review[] = google.reviews.filter((r) => r.text.trim().length > 0);
export const reviewSummary = { rating: google.rating, count: google.count };
/** Enlace para ver la ficha y todas las reseñas en Google Maps. */
export const GOOGLE_MAPS_URL =
  google.mapsUrl ?? `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`;
