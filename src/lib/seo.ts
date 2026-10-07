import { SITE_URL } from "@/content/site";

const OG_IMAGE = `${SITE_URL}/assets/suelos_despues_1.webp`;

/** Metadatos de cada página: título, descripción, URL canónica y Open Graph. */
export function seo({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}) {
  const url = `${SITE_URL}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
