import type { LucideIcon } from "lucide-react";
import { Bath, Building2, Hammer, Layers, PaintRoller, PanelTop, Wrench, Home } from "lucide-react";
import type { Localized } from "@/lib/i18n";

/**
 * Servicios. Para añadir uno nuevo, copie un bloque y cambie el `id`
 * (se usa en la URL: /servicios#id). `projectId` enlaza con un proyecto
 * de `projects.ts` para mostrar una foto real del trabajo.
 */
export type Service = {
  id: string;
  icon: LucideIcon;
  title: Localized;
  /** Texto corto de la tarjeta. */
  summary: Localized;
  /** Explicación de la página del servicio (2-3 frases). */
  detail: Localized;
  includes: Localized[];
  projectId?: string;
};

export const services: Service[] = [
  {
    id: "reforma-integral",
    icon: Home,
    title: { es: "Reforma integral de viviendas", en: "Full home renovation" },
    summary: {
      es: "Cocinas, baños y salones. Coordinamos todos los gremios, desde el derribo hasta la entrega, con una única persona de contacto.",
      en: "Kitchens, bathrooms and living areas. We coordinate every trade, from strip-out to handover, with a single point of contact.",
    },
    detail: {
      es: "Nos encargamos de la reforma completa de su vivienda: estudiamos el espacio con usted, preparamos el presupuesto y coordinamos a todos los oficios hasta la entrega. Usted solo tiene una persona de contacto durante toda la obra.",
      en: "We take care of the complete renovation of your home: we study the space with you, prepare the quote and coordinate every trade until handover. You have a single point of contact throughout.",
    },
    includes: [
      { es: "Derribos y nueva distribución", en: "Strip-out and new layouts" },
      { es: "Coordinación de gremios", en: "Coordination of trades" },
      { es: "Acabados y entrega limpia", en: "Finishes and clean handover" },
    ],
  },
  {
    id: "albanileria",
    icon: Hammer,
    title: { es: "Albañilería de primera", en: "First-class bricklaying" },
    summary: {
      es: "Tabiquería, aperturas de muro, soleras, muros y cerramientos, ejecutados con criterio técnico.",
      en: "Partition walls, openings, screeds, walls and enclosures, built to a technical standard.",
    },
    detail: {
      es: "Levantamos, abrimos y reparamos muros y tabiques con criterio técnico, a plomo y con juntas cuidadas. También hacemos soleras, refuerzos y cerramientos de parcela.",
      en: "We build, open up and repair walls and partitions to a technical standard, true to plumb and with careful joints. We also lay screeds, reinforcements and plot enclosures.",
    },
    includes: [
      { es: "Tabiques y aperturas de muro", en: "Partitions and wall openings" },
      { es: "Soleras y refuerzos", en: "Screeds and reinforcements" },
      { es: "Muros y cerramientos de parcela", en: "Boundary walls and enclosures" },
    ],
    projectId: "muro-valla",
  },
  {
    id: "pintura",
    icon: PaintRoller,
    title: { es: "Pintura interior y exterior", en: "Interior & exterior painting" },
    summary: {
      es: "Eliminación de gotelé, alisado de paredes, esmaltes y pintura plástica, en interior y exterior.",
      en: "Textured-finish removal, wall skimming, enamels and emulsion, inside and out.",
    },
    detail: {
      es: "Preparamos bien las superficies antes de pintar: quitamos el gotelé, alisamos y corregimos imperfecciones. Después aplicamos la pintura adecuada, protegiendo suelos y muebles durante todo el trabajo.",
      en: "We prepare surfaces properly before painting: removing textured finishes, skimming and correcting imperfections. Then we apply the right paint, protecting floors and furniture throughout.",
    },
    includes: [
      { es: "Quitar gotelé y alisar", en: "Texture removal and skimming" },
      { es: "Pintura plástica y esmaltes", en: "Emulsion and enamels" },
      { es: "Protección de suelos y muebles", en: "Floor and furniture protection" },
    ],
    projectId: "pintura",
  },
  {
    id: "banos-cocinas",
    icon: Bath,
    title: { es: "Baños y cocinas", en: "Bathrooms & kitchens" },
    summary: {
      es: "Cambio de bañera por plato de ducha, alicatados, fontanería, electricidad y montaje de mobiliario.",
      en: "Bath-to-shower conversions, tiling, plumbing, electrics and cabinetry installation.",
    },
    detail: {
      es: "Renovamos baños y cocinas por completo o por partes: alicatado, cambio de bañera por ducha, fontanería, electricidad y montaje de muebles y electrodomésticos.",
      en: "We renovate bathrooms and kitchens fully or in parts: tiling, bath-to-shower conversions, plumbing, electrics and installation of units and appliances.",
    },
    includes: [
      { es: "Cambio de bañera por ducha", en: "Bath-to-shower conversion" },
      { es: "Alicatado y solado", en: "Wall and floor tiling" },
      { es: "Montaje de mobiliario y electrodomésticos", en: "Units and appliance installation" },
    ],
    projectId: "cocina-en-l",
  },
  {
    id: "suelos",
    icon: Layers,
    title: { es: "Suelos y solados", en: "Floors" },
    summary: {
      es: "Tarima, porcelánico y gres, con nivelación previa y remates cuidados en todo el perímetro.",
      en: "Wood, porcelain and stoneware floors, with prior levelling and careful edge finishing.",
    },
    detail: {
      es: "Retiramos el suelo antiguo si hace falta, nivelamos el soporte y colocamos el nuevo pavimento con remates limpios en todo el perímetro.",
      en: "We remove the old floor if needed, level the subfloor and lay the new flooring with clean finishing around the whole perimeter.",
    },
    includes: [
      { es: "Nivelación del soporte", en: "Subfloor levelling" },
      { es: "Tarima, porcelánico y gres", en: "Wood, porcelain and stoneware" },
      { es: "Rodapiés y remates", en: "Skirting and trims" },
    ],
    projectId: "suelos",
  },
  {
    id: "pladur",
    icon: PanelTop,
    title: { es: "Pladur y techos", en: "Plasterboard & ceilings" },
    summary: {
      es: "Trasdosados, techos registrables, focos empotrados y aislamiento acústico.",
      en: "Dry lining, access ceilings, recessed lighting and acoustic insulation.",
    },
    detail: {
      es: "Instalamos tabiques, trasdosados y falsos techos de pladur, con aislamiento acústico y focos empotrados para dar a cada estancia la distribución y la luz que necesita.",
      en: "We install plasterboard partitions, dry lining and suspended ceilings, with acoustic insulation and recessed lighting to give each room the layout and light it needs.",
    },
    includes: [
      { es: "Trasdosados y tabiques de pladur", en: "Dry lining and stud walls" },
      { es: "Falsos techos y focos", en: "Suspended ceilings and downlights" },
      { es: "Aislamiento acústico", en: "Acoustic insulation" },
    ],
  },
  {
    id: "fachadas",
    icon: Building2,
    title: { es: "Fachadas y exteriores", en: "Façades & exteriors" },
    summary: {
      es: "Rehabilitación, impermeabilización y pintura de fachadas para viviendas y comunidades.",
      en: "Rehabilitation, waterproofing and exterior painting for homes and residential buildings.",
    },
    detail: {
      es: "Rehabilitamos fachadas de viviendas y comunidades: reparamos el soporte, impermeabilizamos y pintamos para que el exterior quede protegido y renovado.",
      en: "We rehabilitate façades of homes and residential buildings: repairing the surface, waterproofing and painting so the exterior is protected and renewed.",
    },
    includes: [
      { es: "Rehabilitación de fachada", en: "Façade rehabilitation" },
      { es: "Impermeabilización", en: "Waterproofing" },
      { es: "Pintura exterior", en: "Exterior painting" },
    ],
  },
  {
    id: "reparaciones",
    icon: Wrench,
    title: { es: "Reparaciones", en: "Repairs" },
    summary: {
      es: "Intervenciones puntuales, humedades y pequeños trabajos de mantenimiento.",
      en: "One-off jobs, damp problems and small maintenance works.",
    },
    detail: {
      es: "Resolvemos trabajos concretos: grietas, humedades, desperfectos y pequeñas reparaciones de mantenimiento, sin necesidad de una reforma completa.",
      en: "We handle specific jobs: cracks, damp, damage and small maintenance repairs, without the need for a full renovation.",
    },
    includes: [
      { es: "Reparaciones puntuales", en: "One-off repairs" },
      { es: "Tratamiento de humedades", en: "Damp treatment" },
      { es: "Mantenimiento", en: "Maintenance" },
    ],
  },
];

export const getService = (id: string) => services.find((s) => s.id === id);
