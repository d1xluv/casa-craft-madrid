import type { Localized } from "@/lib/i18n";

/**
 * Preguntas frecuentes. Solo incluyen información confirmada en la web;
 * no añadir precios, plazos concretos ni garantías sin confirmarlos.
 */
export const faq: { q: Localized; a: Localized }[] = [
  {
    q: { es: "¿En qué zonas trabajan?", en: "Which areas do you cover?" },
    a: {
      es: "Trabajamos en Madrid, Guadalajara y zonas cercanas de la Comunidad de Madrid. Si su obra está en otra localidad, consúltenos sin problema.",
      en: "We work in Madrid, Guadalajara and nearby areas of the Madrid region. If your property is elsewhere, just ask.",
    },
  },
  {
    q: { es: "¿Cómo puedo pedir presupuesto?", en: "How do I request a quote?" },
    a: {
      es: "Llámenos, escríbanos por WhatsApp o rellene el formulario de contacto. Después concertamos una visita para ver el espacio y tomar medidas, y le enviamos el presupuesto por escrito.",
      en: "Call us, message us on WhatsApp or fill in the contact form. We then arrange a visit to see the space and take measurements, and send you a written quote.",
    },
  },
  {
    q: { es: "¿El presupuesto me compromete a algo?", en: "Does the quote commit me to anything?" },
    a: {
      es: "No. El presupuesto es sin compromiso: usted decide si sigue adelante después de revisarlo.",
      en: "No. The quote is free of obligation: you decide whether to go ahead after reviewing it.",
    },
  },
  {
    q: {
      es: "¿Puedo enviar fotos de la obra antes de la visita?",
      en: "Can I send photos before the visit?",
    },
    a: {
      es: "Sí. Por WhatsApp puede enviarnos fotos y medidas aproximadas; nos ayuda a orientarle desde el primer contacto.",
      en: "Yes. You can send photos and rough measurements on WhatsApp; it helps us advise you from the first contact.",
    },
  },
  {
    q: {
      es: "¿Hacen trabajos pequeños o solo reformas completas?",
      en: "Do you take on small jobs or only full renovations?",
    },
    a: {
      es: "Ambas cosas. Además de reformas integrales, hacemos trabajos concretos de pintura, albañilería, suelos y reparaciones puntuales.",
      en: "Both. Besides full renovations, we take on specific painting, bricklaying, flooring and one-off repair jobs.",
    },
  },
  {
    q: {
      es: "¿Quién se encarga de coordinar los distintos oficios?",
      en: "Who coordinates the different trades?",
    },
    a: {
      es: "Nosotros. En las reformas integrales coordinamos todos los gremios para que usted tenga una única persona de contacto durante la obra.",
      en: "We do. On full renovations we coordinate every trade so you have a single point of contact throughout the works.",
    },
  },
];
