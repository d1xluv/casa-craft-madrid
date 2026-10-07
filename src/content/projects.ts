import type { Localized } from "@/lib/i18n";

/**
 * Proyectos realizados.
 *
 * Para añadir un proyecto:
 * 1. Copie las fotos a `public/assets/` en .webp (versión grande ~1448 px y
 *    una versión "-sm" de ~720 px con el mismo nombre terminado en -sm.webp).
 * 2. Añada un bloque al array `projects` con sus fotos (`photo("nombre")`).
 * 3. La PRIMERA foto de `photos` es el "antes"; las demás son vistas del
 *    "después". En la web se comparan con el control deslizante y se pueden
 *    elegir las distintas vistas.
 * 4. Si no hay foto del "antes", ponga una sola foto y `hotspots`: se mostrará
 *    un explorador con puntos sobre la foto (x e y en % de la imagen).
 *
 * El primer proyecto del array es el que se destaca en la página de inicio.
 */
export type Photo = {
  src: string;
  sm: string;
  width: number;
  height: number;
  alt: Localized;
  /** Etiqueta corta visible: "Antes", "Después", "Vista 2"… */
  label: Localized;
};

export type Hotspot = { x: number; y: number; label: Localized };

export type Project = {
  id: string;
  category: Localized;
  title: Localized;
  summary: Localized;
  result: Localized;
  /** Foto de portada (normalmente un "después"). */
  cover: Photo;
  /** [antes, después, después vista 2, …] */
  photos: Photo[];
  /** Puntos interactivos sobre la primera foto (proyectos sin "antes"). */
  hotspots?: Hotspot[];
};

const base = import.meta.env.BASE_URL;

function photo(name: string, alt: Localized, label: Localized, portrait = false): Photo {
  return {
    src: `${base}assets/${name}.webp`,
    sm: `${base}assets/${name}-sm.webp`,
    width: portrait ? 1086 : 1448,
    height: portrait ? 1448 : 1086,
    alt,
    label,
  };
}

const BEFORE = { es: "Antes", en: "Before" };
const AFTER = { es: "Después", en: "After" };

const pinturaAntes = photo(
  "pintura_antes",
  {
    es: "Salón con cocina abierta antes de pintar: paredes con manchas y desconchones",
    en: "Open-plan living room before painting: stained, chipped walls",
  },
  BEFORE,
);
const pinturaDespues = photo(
  "pintura_despues",
  {
    es: "El mismo salón después de alisar y pintar: paredes lisas y blancas",
    en: "The same room after skimming and painting: smooth white walls",
  },
  AFTER,
);
const suelosDespues1 = photo(
  "suelos_despues_1",
  {
    es: "Salón con suelo de madera nuevo y dos ventanales",
    en: "Living room with new wooden floor and two tall windows",
  },
  { es: "Después", en: "After" },
);
const muroDespues = photo(
  "muro_y_valla_despues",
  {
    es: "Muro con acabado en piedra, pilares y valla perimetral terminados",
    en: "Finished stone-clad wall, pillars and perimeter fence",
  },
  AFTER,
);
const cocina2 = photo(
  "cocinas_2",
  {
    es: "Cocina blanca en línea con frente negro, junto a un ventanal",
    en: "White galley kitchen with black splashback beside a large window",
  },
  { es: "Cocina lineal", en: "Galley kitchen" },
);
const cocina1 = photo(
  "cocinas_1",
  {
    es: "Cocina blanca en L con encimera oscura y electrodomésticos integrados",
    en: "White L-shaped kitchen with dark worktop and fitted appliances",
  },
  { es: "Cocina en L", en: "L-shaped kitchen" },
);

export const projects: Project[] = [
  {
    id: "pintura",
    category: { es: "Pintura", en: "Painting" },
    title: { es: "Pintura y acabado de superficies", en: "Painting & surface finishing" },
    summary: {
      es: "Preparación de paredes y techos, corrección de imperfecciones y aplicación de pintura para renovar por completo el aspecto de la vivienda.",
      en: "Preparation of walls and ceilings, correction of imperfections and repainting to completely renew the look of the home.",
    },
    result: {
      es: "Paredes lisas y uniformes, techos renovados y una estancia mucho más luminosa, entregada limpia y lista para usar.",
      en: "Smooth, even walls, refreshed ceilings and a much brighter room, handed over clean and ready to use.",
    },
    cover: pinturaDespues,
    photos: [pinturaAntes, pinturaDespues],
  },
  {
    id: "suelos",
    category: { es: "Suelos", en: "Floors" },
    title: { es: "Renovación de suelos", en: "Floor renovation" },
    summary: {
      es: "Renovación y sustitución de pavimentos adaptada a cada espacio. Este trabajo muestra un acabado en madera; también trabajamos con suelos cerámicos y otras soluciones.",
      en: "Flooring renewal and replacement adapted to each space. This job shows a wood finish; we also work with ceramic floors and other solutions.",
    },
    result: {
      es: "Soporte preparado y pavimento nuevo instalado, con un acabado uniforme y remates limpios en todo el perímetro.",
      en: "Subfloor prepared and new flooring installed, with an even finish and clean edges throughout.",
    },
    cover: suelosDespues1,
    photos: [
      photo(
        "suelos_antes",
        {
          es: "Estancia en obra con el soporte del suelo al descubierto",
          en: "Room under works with the bare subfloor exposed",
        },
        BEFORE,
        true,
      ),
      suelosDespues1,
      photo(
        "suelos_despues_2",
        {
          es: "Otra vista del salón con el suelo de madera terminado",
          en: "Another view of the living room with the finished wooden floor",
        },
        { es: "Después · vista 2", en: "After · view 2" },
      ),
    ],
  },
  {
    id: "muro-valla",
    category: { es: "Albañilería", en: "Bricklaying" },
    title: { es: "Muro y valla perimetral", en: "Boundary wall & fencing" },
    summary: {
      es: "Ejecución de muro con acabado en piedra y cerramiento perimetral de la parcela, con pilares, hueco de acceso y armario para instalaciones.",
      en: "Construction of a stone-finished wall and perimeter fencing for the plot, with pillars, access opening and a services cabinet.",
    },
    result: {
      es: "Parcela cerrada y delimitada, con un muro a plomo, juntas cuidadas y un acabado exterior resistente y homogéneo.",
      en: "Plot fully enclosed, with a wall built true to plumb, careful jointing and a durable, even exterior finish.",
    },
    cover: muroDespues,
    photos: [
      photo(
        "muro_y_valla_antes",
        {
          es: "Parcela antes de la obra, con los postes de la valla y los materiales preparados",
          en: "Plot before the works, with fence posts and materials ready",
        },
        BEFORE,
      ),
      muroDespues,
    ],
  },
  {
    id: "cocina-en-l",
    category: { es: "Cocinas", en: "Kitchens" },
    title: { es: "Cocina en L", en: "L-shaped kitchen" },
    summary: {
      es: "Cocina en L con muebles blancos, encimera oscura, iluminación bajo los muebles altos y electrodomésticos integrados.",
      en: "L-shaped kitchen with white units, dark worktop, under-cabinet lighting and fitted appliances.",
    },
    result: {
      es: "Una cocina compacta y práctica, con todo a mano y luz directa sobre la zona de trabajo.",
      en: "A compact, practical kitchen with everything to hand and direct light over the worktop.",
    },
    cover: cocina1,
    photos: [cocina1],
    hotspots: [
      {
        x: 26,
        y: 12,
        label: {
          es: "Microondas integrado en el mueble alto",
          en: "Microwave built into the wall unit",
        },
      },
      {
        x: 52,
        y: 23,
        label: { es: "Iluminación bajo los muebles altos", en: "Under-cabinet lighting" },
      },
      {
        x: 44,
        y: 46,
        label: { es: "Encimera oscura con fregadero", en: "Dark worktop with sink" },
      },
      {
        x: 78,
        y: 51,
        label: { es: "Placa de cocina en la encimera", en: "Hob set into the worktop" },
      },
      {
        x: 72,
        y: 72,
        label: { es: "Horno integrado bajo la placa", en: "Built-in oven under the hob" },
      },
      { x: 31, y: 72, label: { es: "Hueco para lavavajillas", en: "Dishwasher space" } },
    ],
  },
  {
    id: "cocina-lineal",
    category: { es: "Cocinas", en: "Kitchens" },
    title: { es: "Cocina lineal junto al ventanal", en: "Galley kitchen by the window" },
    summary: {
      es: "Cocina en línea con muebles altos en blanco brillo, frente negro y electrodomésticos integrados, incluida la lavadora.",
      en: "Galley kitchen with glossy white wall units, black splashback and fitted appliances, including the washing machine.",
    },
    result: {
      es: "Un frente continuo y ordenado que aprovecha toda la pared y la luz natural del ventanal.",
      en: "A continuous, tidy run that uses the whole wall and the natural light from the window.",
    },
    cover: cocina2,
    photos: [cocina2],
    hotspots: [
      {
        x: 68,
        y: 18,
        label: { es: "Muebles altos en blanco brillo", en: "Glossy white wall units" },
      },
      { x: 55, y: 31, label: { es: "Microondas integrado", en: "Built-in microwave" } },
      { x: 82, y: 41, label: { es: "Frente negro entre muebles", en: "Black splashback" } },
      { x: 43, y: 56, label: { es: "Placa y horno integrados", en: "Built-in hob and oven" } },
      {
        x: 51,
        y: 66,
        label: { es: "Lavavajillas en la misma línea", en: "Dishwasher in the same run" },
      },
      {
        x: 76,
        y: 74,
        label: {
          es: "Lavadora integrada en la cocina",
          en: "Washing machine fitted into the kitchen",
        },
      },
    ],
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);
