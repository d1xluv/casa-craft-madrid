/**
 * Descarga las reseñas públicas de Reformas HZ en Google (Places API) y las
 * guarda en src/content/google-reviews.json para que la web las muestre sin
 * que el navegador del visitante conecte con Google.
 *
 * Se ejecuta antes de cada build ("prebuild"). Necesita la variable de entorno
 * GOOGLE_PLACES_API_KEY (en GitHub: Settings → Secrets → Actions). Si no está,
 * no hace nada y la web usa el último archivo guardado.
 *
 * Nota: la API de Google devuelve como máximo 5 reseñas (las más relevantes).
 */
import { writeFile } from "node:fs/promises";

const PLACE_ID = "ChIJo4pa9Qi1fmURxVYk9zko4c8";
const OUT = new URL("../src/content/google-reviews.json", import.meta.url);
const key = process.env.GOOGLE_PLACES_API_KEY;

if (!key) {
  console.log("[reseñas] Sin GOOGLE_PLACES_API_KEY: se mantienen las reseñas guardadas.");
  process.exit(0);
}

try {
  const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=es`, {
    headers: {
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "displayName,rating,userRatingCount,googleMapsUri,reviews",
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const p = await res.json();
  const data = {
    fetchedAt: new Date().toISOString(),
    name: p.displayName?.text ?? "Reformas HZ",
    rating: p.rating ?? null,
    count: p.userRatingCount ?? 0,
    mapsUrl: p.googleMapsUri ?? null,
    reviews: (p.reviews ?? []).map((r) => ({
      author: r.authorAttribution?.displayName ?? "Cliente de Google",
      authorUrl: r.authorAttribution?.uri ?? null,
      rating: r.rating ?? 5,
      text: r.originalText?.text ?? r.text?.text ?? "",
      when: r.relativePublishTimeDescription ?? "",
      publishTime: r.publishTime ?? null,
      url: r.googleMapsUri ?? null,
    })),
  };
  await writeFile(OUT, JSON.stringify(data, null, 2) + "\n");
  console.log(`[reseñas] ${data.reviews.length} reseñas guardadas (media ${data.rating}, total ${data.count}).`);
} catch (err) {
  // Un fallo de Google no debe romper la publicación de la web.
  console.warn("[reseñas] No se pudieron descargar las reseñas:", err.message);
}
