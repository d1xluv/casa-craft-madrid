import type { Localized } from "@/lib/i18n";

/** Pasos del método de trabajo (inicio y "Sobre nosotros"). */
export const processSteps: { title: Localized; text: Localized }[] = [
  {
    title: { es: "Primer contacto", en: "First contact" },
    text: {
      es: "Atendemos su consulta por teléfono, WhatsApp o formulario y recogemos lo esencial del proyecto.",
      en: "We take your enquiry by phone, WhatsApp or the form and note the essentials of the project.",
    },
  },
  {
    title: { es: "Visita y valoración", en: "Visit & assessment" },
    text: {
      es: "Visitamos el inmueble, tomamos medidas y analizamos el estado del espacio y las soluciones adecuadas.",
      en: "We visit the property, take measurements and assess the space and the right solutions.",
    },
  },
  {
    title: { es: "Presupuesto por escrito", en: "Written quote" },
    text: {
      es: "Preparamos una propuesta detallada, con partidas claras y plazos estimados, sin compromiso.",
      en: "We prepare a detailed proposal with clear line items and estimated timescales, with no obligation.",
    },
  },
  {
    title: { es: "Preparación", en: "Preparation" },
    text: {
      es: "Planificamos la obra, elegimos materiales y protegemos las zonas que no se intervienen.",
      en: "We plan the works, choose materials and protect the areas that are not being altered.",
    },
  },
  {
    title: { es: "Ejecución", en: "Execution" },
    text: {
      es: "Realizamos los trabajos cuidando acabados y detalles, con la obra limpia y seguimiento continuo.",
      en: "We carry out the works with care for finishes, keeping the site clean and under continuous supervision.",
    },
  },
  {
    title: { es: "Entrega", en: "Handover" },
    text: {
      es: "Revisamos el trabajo con usted, retiramos escombros y entregamos el espacio listo para usar.",
      en: "We review the work with you, remove debris and hand over the space ready to use.",
    },
  },
];

/** Compromisos de trabajo. Evitar añadir garantías o cifras que no estén confirmadas. */
export const values: { title: Localized; text: Localized }[] = [
  {
    title: { es: "Presupuesto sin compromiso", en: "No-obligation quote" },
    text: {
      es: "Detallado y por escrito antes de empezar.",
      en: "Detailed and in writing before we start.",
    },
  },
  {
    title: { es: "Plazos claros", en: "Clear timescales" },
    text: {
      es: "Fecha de inicio, fases y entrega definidas desde el principio.",
      en: "Start date, phases and handover defined from the outset.",
    },
  },
  {
    title: { es: "Obra limpia", en: "Clean site" },
    text: {
      es: "Protección de suelos y mobiliario, y retirada de escombros.",
      en: "Floor and furniture protection, and debris removal.",
    },
  },
];
