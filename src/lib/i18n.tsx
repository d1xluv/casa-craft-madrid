import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "es" | "en";
export type Localized = { es: string; en: string };

/** Textos de interfaz. El contenido (servicios, proyectos, FAQ) vive en src/content. */
const ui = {
  skip: { es: "Saltar al contenido", en: "Skip to content" },
  "nav.home": { es: "Inicio", en: "Home" },
  "nav.services": { es: "Servicios", en: "Services" },
  "nav.projects": { es: "Proyectos", en: "Projects" },
  "nav.about": { es: "Sobre nosotros", en: "About us" },
  "nav.contact": { es: "Contacto", en: "Contact" },
  "nav.open": { es: "Abrir menú", en: "Open menu" },
  "nav.close": { es: "Cerrar menú", en: "Close menu" },
  "nav.main": { es: "Navegación principal", en: "Main navigation" },
  "nav.cta": { es: "Solicitar presupuesto", en: "Request a quote" },
  "lang.label": { es: "Idioma", en: "Language" },

  "cta.call": { es: "Llamar", en: "Call" },
  "cta.whatsapp": { es: "WhatsApp", en: "WhatsApp" },

  "brand.tagline": {
    es: "Reformas, albañilería y pintura",
    en: "Renovations, bricklaying & painting",
  },
  "brand.motto": { es: "Su hogar, en buenas manos", en: "Your home, in good hands" },
  "brand.quote": { es: "Presupuestos sin compromiso", en: "No-obligation quotes" },

  "hero.eyebrow": {
    es: "Reformas · Albañilería · Pintura",
    en: "Renovations · Bricklaying · Painting",
  },
  "hero.title": {
    es: "Reformas y pintura con acabados de primera.",
    en: "Renovations and painting with a first-class finish.",
  },
  "hero.subtitle": {
    es: "Reformas integrales, albañilería y pintura en Madrid, Guadalajara y zonas cercanas.",
    en: "Full renovations, bricklaying and painting in Madrid, Guadalajara and nearby areas.",
  },
  "hero.cta.primary": { es: "Contactar · 671 155 809", en: "Contact us · 671 155 809" },
  "hero.cta.secondary": { es: "Ver proyectos", en: "View projects" },

  "services.eyebrow": { es: "Nuestros servicios", en: "Our services" },
  "services.title": {
    es: "Un solo equipo para toda la reforma.",
    en: "One team for the entire renovation.",
  },
  "services.more": { es: "Ver servicio", en: "View service" },
  "services.all": { es: "Todos los servicios", en: "All services" },
  "services.whatWeDo": { es: "Qué hacemos", en: "What we do" },
  "services.ask": { es: "Pedir presupuesto", en: "Request a quote" },
  "services.seeProject": { es: "Trabajo realizado", en: "Completed job" },
  "services.others": { es: "Otros servicios", en: "Other services" },
  "services.replay": { es: "Repetir animación", en: "Replay animation" },

  "projects.eyebrow": { es: "Trabajos realizados", en: "Completed work" },
  "projects.title": {
    es: "Una selección de obras entregadas.",
    en: "A selection of delivered projects.",
  },
  "projects.result": { es: "Resultado", en: "Result" },
  "projects.enlarge": { es: "Ampliar foto", en: "Enlarge photo" },
  "projects.compareLabel": { es: "Comparar antes y después", en: "Compare before and after" },
  "work.drag": {
    es: "Arrastre el control para comparar el antes y el después",
    en: "Drag the handle to compare before and after",
  },
  "projects.explore": { es: "Pulse los puntos", en: "Tap the dots" },
  "projects.explore.reset": { es: "Ver la foto completa", en: "Show the whole photo" },
  "work.views": { es: "Vistas del resultado", en: "Views of the result" },
  "work.before": { es: "Antes", en: "Before" },
  "work.after": { es: "Después", en: "After" },

  "lightbox.close": { es: "Cerrar", en: "Close" },
  "lightbox.prev": { es: "Foto anterior", en: "Previous photo" },
  "lightbox.next": { es: "Foto siguiente", en: "Next photo" },
  "lightbox.of": { es: "de", en: "of" },

  "about.eyebrow": { es: "Sobre nosotros", en: "About us" },
  "about.title": {
    es: "Especialidades y método de trabajo.",
    en: "Specialities and working method.",
  },
  "about.intro": {
    es: "Reformas HZ es el nombre comercial de Toni Hozas, profesional autónomo de la construcción especializado en reformas, albañilería y pintura.",
    en: "Reformas HZ is the trading name of Toni Hozas, a self-employed construction professional specialising in renovations, bricklaying and painting.",
  },
  "about.skills.title": { es: "Especialidades", en: "Specialities" },
  "about.values.title": { es: "Cómo trabajamos", en: "How we work" },
  "about.values.subtitle": {
    es: "Un proceso ordenado, de la primera llamada a la entrega final.",
    en: "An orderly process, from the first call to final handover.",
  },

  "contact.eyebrow": { es: "Contacto", en: "Contact" },
  "contact.title": {
    es: "Solicite información o presupuesto.",
    en: "Request information or a quote.",
  },
  "contact.phone": { es: "Teléfono", en: "Phone" },
  "contact.whatsapp": { es: "WhatsApp", en: "WhatsApp" },
  "contact.email": { es: "Correo electrónico", en: "Email" },
  "contact.area": { es: "Zona de trabajo", en: "Service area" },
  "contact.area.long": {
    es: "Trabajamos en Madrid, Guadalajara y zonas cercanas de la Comunidad de Madrid.",
    en: "We work in Madrid, Guadalajara and nearby areas of the Madrid region.",
  },
  "contact.form.title": { es: "Pida su presupuesto", en: "Request your quote" },
  "contact.form.subtitle": {
    es: "Sin compromiso. Le respondemos por teléfono o correo.",
    en: "No obligation. We will reply by phone or email.",
  },
  "contact.form.step1": { es: "¿Qué necesita?", en: "What do you need?" },
  "contact.form.step1.hint": {
    es: "Puede elegir varias opciones.",
    en: "You can choose several options.",
  },
  "contact.form.step2": { es: "Sus datos", en: "Your details" },
  "contact.form.step3": { es: "Cuéntenos el trabajo", en: "Tell us about the job" },
  "contact.form.location": { es: "Localidad de la obra", en: "Location of the works" },
  "contact.form.message.placeholder": {
    es: "Por ejemplo: pintar un piso de 80 m² y cambiar el suelo del salón.",
    en: "For example: paint an 80 m² flat and replace the living room floor.",
  },
  "contact.form.again": { es: "Enviar otra solicitud", en: "Send another request" },
  "cta.quote": { es: "Pedir presupuesto", en: "Request a quote" },
  "contact.form.name": { es: "Nombre", en: "Name" },
  "contact.form.phone": { es: "Teléfono", en: "Phone" },
  "contact.form.email": { es: "Correo electrónico (opcional)", en: "Email (optional)" },
  "contact.form.type": { es: "Tipo de trabajo", en: "Type of work" },
  "contact.form.type.placeholder": { es: "Seleccione una opción", en: "Choose an option" },
  "contact.form.type.other": { es: "Otro", en: "Other" },
  "contact.form.message": { es: "Describa brevemente el trabajo", en: "Briefly describe the job" },
  "contact.form.privacy.pre": { es: "He leído la", en: "I have read the" },
  "contact.form.privacy.link": { es: "política de privacidad", en: "privacy policy" },
  "contact.form.privacy.post": {
    es: "y acepto que se usen mis datos para responder a esta solicitud.",
    en: "and agree to my data being used to reply to this request.",
  },
  "contact.form.send": { es: "Enviar solicitud", en: "Send request" },
  "contact.form.sending": { es: "Enviando solicitud...", en: "Sending request..." },
  "contact.form.wa": { es: "Enviar por WhatsApp", en: "Send via WhatsApp" },
  "contact.form.sent": {
    es: "Solicitud enviada correctamente. Nos pondremos en contacto con usted lo antes posible.",
    en: "Request sent successfully. We will get back to you as soon as possible.",
  },
  "contact.form.error": {
    es: "No ha sido posible enviar la solicitud. Inténtelo de nuevo o contacte directamente por WhatsApp.",
    en: "The request could not be sent. Please try again or contact us directly on WhatsApp.",
  },
  "contact.form.invalid": {
    es: "Revise los campos marcados.",
    en: "Please check the highlighted fields.",
  },
  "contact.err.name": { es: "Indique su nombre.", en: "Please enter your name." },
  "contact.err.phone": {
    es: "Indique un teléfono válido (9 cifras).",
    en: "Please enter a valid phone number.",
  },
  "contact.err.email": { es: "Indique un correo válido.", en: "Please enter a valid email." },
  "contact.err.type": { es: "Elija al menos una opción.", en: "Choose at least one option." },
  "contact.err.message": {
    es: "Cuéntenos algo más (mínimo 10 caracteres).",
    en: "Tell us a bit more (at least 10 characters).",
  },
  "contact.err.privacy": {
    es: "Acepte la política de privacidad para enviar.",
    en: "Please accept the privacy policy to send.",
  },
  "contact.form.info": {
    es: "Responsable: Toni Hozas (Reformas HZ). Usamos sus datos solo para responder a su solicitud, nunca para publicidad. El formulario se entrega a través de Formspree.",
    en: "Controller: Toni Hozas (Reformas HZ). We only use your data to reply to your request, never for advertising. The form is delivered through Formspree.",
  },
  "contact.form.info.more": { es: "Más información", en: "More information" },
  "faq.title": { es: "Preguntas frecuentes", en: "Frequently asked questions" },

  "reviews.eyebrow": { es: "Reseñas", en: "Reviews" },
  "reviews.title": { es: "Lo que opinan nuestros clientes.", en: "What our clients say." },
  "reviews.text": {
    es: "¿Hemos trabajado en su casa? Su opinión en Google nos ayuda mucho y orienta a otros clientes.",
    en: "Have we worked on your home? Your Google review helps us a lot and guides other clients.",
  },
  "reviews.cta": { es: "Escribir una reseña en Google", en: "Write a Google review" },
  "reviews.star": { es: "Dejar una reseña en Google", en: "Leave a Google review" },
  "footer.tag": {
    es: "Reformas integrales · Albañilería · Pintura y alisado · Baños y cocinas · Suelos y fachadas",
    en: "Full renovations · Bricklaying · Painting & skimming · Bathrooms and kitchens · Floors and façades",
  },
  "footer.legal": { es: "Información legal", en: "Legal" },
  "footer.legalNotice": { es: "Aviso legal", en: "Legal notice" },
  "footer.privacy": { es: "Política de privacidad", en: "Privacy policy" },
  "footer.cookies": { es: "Política de cookies", en: "Cookie policy" },
  "footer.rights": { es: "Todos los derechos reservados.", en: "All rights reserved." },

  "legal.onlyEs": { es: "", en: "Legal texts are only available in Spanish." },
  "legal.updated": { es: "Última actualización", en: "Last updated" },

  "notfound.title": { es: "Página no encontrada", en: "Page not found" },
  "notfound.text": {
    es: "La página que busca no existe o ha cambiado de dirección.",
    en: "The page you are looking for does not exist or has moved.",
  },
  "notfound.home": { es: "Volver al inicio", en: "Back to home" },
} satisfies Record<string, Localized>;

export type UiKey = keyof typeof ui;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: UiKey) => string;
  /** Devuelve el texto en el idioma activo. */
  l: (x: Localized) => string;
};

const LangCtx = createContext<Ctx>({
  lang: "es",
  setLang: () => {},
  t: (k) => ui[k].es,
  l: (x) => x.es,
});

// Preferencia de idioma elegida por el usuario. Almacenamiento técnico exento
// de consentimiento (ver política de cookies).
const STORAGE_KEY = "lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "es" || saved === "en") setLangState(saved);
    } catch {
      /* almacenamiento no disponible */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* almacenamiento no disponible */
    }
  }, []);

  const t = useCallback((k: UiKey) => ui[k][lang], [lang]);
  const l = useCallback((x: Localized) => x[lang], [lang]);

  return <LangCtx.Provider value={{ lang, setLang, t, l }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
