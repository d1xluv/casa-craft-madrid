import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "es" | "en";

type Dict = Record<string, string>;

const es: Dict = {
  "nav.home": "Inicio",
  "nav.services": "Servicios",
  "nav.projects": "Proyectos",
  "nav.about": "Sobre mí",
  "nav.contact": "Contacto",
  "nav.cta": "Pedir presupuesto",

  "hero.eyebrow": "Pinturas Alcalá · Toda la Comunidad de Madrid",
  "hero.title": "Pintura y reformas con acabado de primera.",
  "hero.subtitle": "Albañil de primera, pintor y especialista en reformas integrales de pisos. Trabajo en toda la Comunidad de Madrid.",
  "hero.cta.primary": "Llamar 671 155 809",
  "hero.cta.secondary": "Ver proyectos",
  "hero.stat.years": "Años de experiencia",
  "hero.stat.projects": "Reformas entregadas",
  "hero.stat.area": "Toda Madrid",

  "services.eyebrow": "Lo que hago",
  "services.title": "Un solo equipo, toda la reforma.",
  "services.painting.title": "Pintura interior y exterior",
  "services.painting.desc": "Paredes lisas, alisado, esmaltes, gotelé eliminado. Acabados limpios sin manchas ni descuelgues.",
  "services.brick.title": "Albañilería de primera",
  "services.brick.desc": "Tabiques, aperturas de muro, alicatados, soleras y reparaciones estructurales con garantía.",
  "services.reform.title": "Reforma integral de pisos",
  "services.reform.desc": "Cocinas, baños, salones. Desde el derribo a la entrega de llaves, gestionando todos los gremios.",
  "services.bath.title": "Baños y cocinas",
  "services.bath.desc": "Cambio de bañera por plato de ducha, alicatado, fontanería y muebles a medida.",
  "services.floor.title": "Suelos y solados",
  "services.floor.desc": "Tarima, porcelánico, gres. Nivelación y colocación profesional.",
  "services.facade.title": "Fachadas y exteriores",
  "services.facade.desc": "Rehabilitación, impermeabilización y pintura de fachadas en comunidades y viviendas.",

  "projects.eyebrow": "Trabajos realizados",
  "projects.title": "Una selección de obras entregadas en Madrid.",
  "projects.subtitle": "Cada reforma es única. Aquí algunos de los proyectos terminados en los últimos meses.",
  "projects.tag.apartment": "Reforma integral",
  "projects.tag.painting": "Pintura",
  "projects.tag.bath": "Baño",
  "projects.tag.kitchen": "Cocina",
  "projects.tag.brick": "Albañilería",
  "projects.tag.reform": "Obra en curso",

  "projects.d.apartment": "Vivienda de 92 m² reformada al completo en 6 semanas: nueva distribución, alisado de paredes, tarima flotante, rodapié y pintura en toda la casa. Entregada limpia y lista para entrar a vivir.",
  "projects.d.bath": "Cambio de bañera por plato de ducha antideslizante, alicatado porcelánico de suelo a techo, mampara, fontanería nueva y mueble a medida. Terminado en 8 días sin dejar la casa sin agua.",
  "projects.d.kitchen": "Apertura de tabique para cocina abierta al salón, refuerzo, instalación eléctrica renovada, frente alicatado y pintura lavable. Presupuesto cerrado y plazo cumplido.",
  "projects.d.painting": "Eliminación de gotelé, alisado a dos manos de plaste, imprimación y dos capas de pintura plástica mate. Muebles y suelos protegidos, cero manchas al terminar.",
  "projects.d.brick": "Muro de ladrillo visto con junta rehundida, ejecutado a plomo y con rejuntado limpio. Trabajo de albañilería de primera con acabado que se ve, no se esconde.",
  "projects.d.reform": "Obra en curso: derribo, nuevas instalaciones y preparación de paramentos. Seguimiento con fotos diarias para el cliente y retirada de escombros incluida.",

  "brand.name": "Pinturas Alcalá",
  "brand.tagline": "Pintura y reformas profesionales",
  "brand.motto": "Tu hogar, en buenas manos",
  "brand.quote": "Presupuestos sin compromiso",
  "brand.years": "25 años de experiencia",
  "cards.hint": "Pasa el cursor para ver el detalle",

  "about.eyebrow": "Sobre mí",
  "about.title": "Más de dos décadas de oficio en Madrid.",
  "about.p1": "Soy albañil de primera, pintor y reformista. Llevo toda mi vida laboral dedicado a las obras: empecé como peón, aprendí el oficio en obra real y hoy dirijo Pinturas Alcalá, un pequeño equipo que entrega reformas integrales en toda la Comunidad de Madrid.",
  "about.p2": "Trabajo con honestidad: presupuestos cerrados, plazos cumplidos y obra limpia. Cada reforma se trata como si fuera mi propia casa.",
  "about.skills.title": "Especialidades",
  "about.values.title": "Cómo trabajo",
  "about.value1.t": "Presupuesto sin compromiso",
  "about.value1.d": "Visita y medición gratuita, presupuesto detallado por escrito.",
  "about.value2.t": "Plazos reales",
  "about.value2.d": "Sin sorpresas: fecha de inicio, hitos y entrega claros desde el primer día.",
  "about.value3.t": "Obra limpia",
  "about.value3.d": "Protección de suelos y muebles, retirada de escombros incluida.",
  "about.value4.t": "Garantía",
  "about.value4.d": "Todos los trabajos cuentan con garantía sobre mano de obra y materiales.",

  "contact.eyebrow": "Hablemos",
  "contact.title": "Cuéntame tu reforma.",
  "contact.subtitle": "Llámame, escríbeme por WhatsApp o envíame un mensaje. Respondo el mismo día.",
  "contact.phone": "Teléfono",
  "contact.whatsapp": "WhatsApp",
  "contact.email": "Email",
  "contact.area": "Zona de trabajo",
  "contact.area.value": "Toda la Comunidad de Madrid",
  "contact.form.name": "Nombre",
  "contact.form.phone": "Teléfono",
  "contact.form.message": "Cuéntame qué necesitas",
  "contact.form.send": "Enviar mensaje",
  "contact.form.sent": "Gracias, te contactaré hoy mismo.",

  "footer.tag": "Pintura interior y exterior · Alisado · Tarima y rodapié · Pequeñas reformas y albañilería",
  "footer.rights": "Todos los derechos reservados.",
};

const en: Dict = {
  "nav.home": "Home",
  "nav.services": "Services",
  "nav.projects": "Projects",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.cta": "Request a quote",

  "hero.eyebrow": "Pinturas Alcalá · All of Madrid",
  "hero.title": "Painting and renovations with a first-class finish.",
  "hero.subtitle": "First-class bricklayer, painter and specialist in full apartment renovations. Serving all of Madrid.",
  "hero.cta.primary": "Call 671 155 809",
  "hero.cta.secondary": "View projects",
  "hero.stat.years": "Years on the job",
  "hero.stat.projects": "Renovations delivered",
  "hero.stat.area": "All of Madrid",

  "services.eyebrow": "What I do",
  "services.title": "One team, the whole renovation.",
  "services.painting.title": "Interior & exterior painting",
  "services.painting.desc": "Smooth walls, skim coating, enamels, popcorn removal. Clean finishes, no drips, no marks.",
  "services.brick.title": "First-class bricklaying",
  "services.brick.desc": "Partition walls, openings, tiling, screeds and structural repairs — all guaranteed.",
  "services.reform.title": "Full apartment renovation",
  "services.reform.desc": "Kitchens, bathrooms, living rooms. From demolition to key handover, all trades managed.",
  "services.bath.title": "Bathrooms & kitchens",
  "services.bath.desc": "Tub-to-shower conversion, tiling, plumbing and bespoke cabinetry.",
  "services.floor.title": "Floors",
  "services.floor.desc": "Hardwood, porcelain, stoneware. Levelling and professional installation.",
  "services.facade.title": "Façades & exteriors",
  "services.facade.desc": "Rehabilitation, waterproofing and painting of façades for homes and buildings.",

  "projects.eyebrow": "Completed work",
  "projects.title": "A selection of projects delivered across Madrid.",
  "projects.subtitle": "Every renovation is unique. A few of the latest finished jobs.",
  "projects.tag.apartment": "Full renovation",
  "projects.tag.painting": "Painting",
  "projects.tag.bath": "Bathroom",
  "projects.tag.kitchen": "Kitchen",
  "projects.tag.brick": "Bricklaying",
  "projects.tag.reform": "Work in progress",

  "projects.d.apartment": "92 m² home fully renovated in 6 weeks: new layout, skimmed walls, engineered flooring, skirting and paint throughout. Handed over clean and ready to move in.",
  "projects.d.bath": "Bathtub swapped for a non-slip shower tray, floor-to-ceiling porcelain tiling, screen, new plumbing and bespoke unit. Finished in 8 days with no water cut-offs.",
  "projects.d.kitchen": "Wall opened up for a kitchen-diner, reinforced structure, rewired electrics, tiled splashback and washable paint. Fixed quote, delivered on time.",
  "projects.d.painting": "Popcorn texture removed, two coats of filler skimmed flat, primer and two coats of matt emulsion. Furniture and floors protected, not a single mark left.",
  "projects.d.brick": "Exposed brick wall with recessed joints, built true to plumb with clean pointing. First-class bricklaying meant to be seen, not hidden.",
  "projects.d.reform": "Work in progress: strip-out, new services and wall preparation. Daily photo updates for the client and debris removal included.",

  "brand.name": "Pinturas Alcalá",
  "brand.tagline": "Professional painting & renovations",
  "brand.motto": "Your home, in good hands",
  "brand.quote": "Free no-obligation quotes",
  "brand.years": "25 years of experience",
  "cards.hint": "Hover to see the details",

  "about.eyebrow": "About",
  "about.title": "Two decades of trade in Madrid.",
  "about.p1": "I'm a first-class bricklayer, painter and renovator. My whole working life has been on the tools: I started as a labourer, learned the trade on real sites, and today I run Pinturas Alcalá — a small team delivering full renovations across the Madrid region.",
  "about.p2": "I work with honesty: fixed quotes, deadlines met, clean sites. Every renovation is treated as if it were my own home.",
  "about.skills.title": "Specialities",
  "about.values.title": "How I work",
  "about.value1.t": "Free no-obligation quote",
  "about.value1.d": "Free site visit and measurement, detailed written quote.",
  "about.value2.t": "Real deadlines",
  "about.value2.d": "No surprises: start date, milestones and handover clear from day one.",
  "about.value3.t": "Clean job site",
  "about.value3.d": "Floor and furniture protection, debris removal included.",
  "about.value4.t": "Guarantee",
  "about.value4.d": "All work guaranteed on labour and materials.",

  "contact.eyebrow": "Let's talk",
  "contact.title": "Tell me about your renovation.",
  "contact.subtitle": "Call, WhatsApp or write to me. I reply the same day.",
  "contact.phone": "Phone",
  "contact.whatsapp": "WhatsApp",
  "contact.email": "Email",
  "contact.area": "Service area",
  "contact.area.value": "All of the Madrid region",
  "contact.form.name": "Name",
  "contact.form.phone": "Phone",
  "contact.form.message": "Tell me what you need",
  "contact.form.send": "Send message",
  "contact.form.sent": "Thanks — I'll be in touch today.",

  "footer.tag": "Interior & exterior painting · Skimming · Flooring · Small building works",
  "footer.rights": "All rights reserved.",
};

const dicts: Record<Lang, Dict> = { es, en };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const LangCtx = createContext<Ctx>({ lang: "es", setLang: () => {}, t: (k) => k });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (saved === "es" || saved === "en") setLangState(saved);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };
  const t = (k: string) => dicts[lang][k] ?? k;
  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
