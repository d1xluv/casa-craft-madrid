import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "es" | "en";

type Dict = Record<string, string>;

const es: Dict = {
  "nav.home": "Inicio",
  "nav.services": "Servicios",
  "nav.projects": "Proyectos",
  "nav.about": "Sobre nosotros",
  "nav.contact": "Contacto",
  "nav.cta": "Solicitar presupuesto",

  "hero.eyebrow": "Reformas HZ · Madrid y Guadalajara",
  "hero.title": "Reformas y pintura con acabados de primera.",
  "hero.subtitle":
    "Empresa de reformas integrales, albañilería y pintura. Trabajamos en Madrid, Guadalajara y zonas cercanas de la Comunidad de Madrid, con presupuestos claros y plazos cumplidos.",
  "hero.cta.primary": "Contactar · 671 155 809",
  "hero.cta.secondary": "Ver proyectos",
  "hero.stat.years": "Años de experiencia",
  "hero.stat.projects": "Reformas entregadas",
  "hero.stat.area": "Zona de trabajo",

  "services.eyebrow": "Nuestros servicios",
  "services.title": "Un solo equipo para toda la reforma.",
  "services.painting.title": "Pintura interior y exterior",
  "services.painting.desc":
    "Alisado de paredes, eliminación de gotelé, esmaltes y pintura plástica. Acabados uniformes, limpios y duraderos.",
  "services.brick.title": "Albañilería de primera",
  "services.brick.desc":
    "Tabiquería, aperturas de muro, alicatados, soleras y reparaciones, ejecutadas con criterio técnico y garantía.",
  "services.reform.title": "Reforma integral de viviendas",
  "services.reform.desc":
    "Cocinas, baños y salones. Coordinamos todos los gremios, desde el derribo hasta la entrega de llaves.",
  "services.bath.title": "Baños y cocinas",
  "services.bath.desc":
    "Sustitución de bañera por plato de ducha, alicatado, fontanería, electricidad y mobiliario a medida.",
  "services.floor.title": "Suelos y solados",
  "services.floor.desc": "Tarima, porcelánico y gres. Nivelación, colocación y remates con acabado profesional.",
  "services.facade.title": "Fachadas y exteriores",
  "services.facade.desc":
    "Rehabilitación, impermeabilización y pintura de fachadas para viviendas y comunidades de propietarios.",

  "projects.eyebrow": "Trabajos realizados",
  "projects.title": "Una selección de obras entregadas.",
  "projects.subtitle":
    "Cada proyecto se planifica y se ejecuta de forma individual. Estas son algunas de las reformas finalizadas recientemente.",
  "projects.tag.apartment": "Reforma integral",
  "projects.tag.painting": "Pintura",
  "projects.tag.bath": "Baño",
  "projects.tag.kitchen": "Cocina",
  "projects.tag.brick": "Albañilería",
  "projects.tag.reform": "Obra en curso",

  "projects.d.apartment":
    "Vivienda de 92 m² reformada íntegramente en 6 semanas: nueva distribución, alisado de paredes, tarima flotante, rodapié y pintura completa. Entregada limpia y lista para su uso.",
  "projects.d.bath":
    "Sustitución de bañera por plato de ducha antideslizante, alicatado porcelánico de suelo a techo, mampara, fontanería nueva y mueble a medida. Ejecutado en 8 días sin cortes de suministro.",
  "projects.d.kitchen":
    "Apertura de tabique para integrar la cocina en el salón, refuerzo estructural, instalación eléctrica renovada, frente alicatado y pintura lavable. Presupuesto cerrado y plazo cumplido.",
  "projects.d.painting":
    "Eliminación de gotelé, alisado con dos manos de plaste, imprimación y dos capas de pintura plástica mate. Mobiliario y suelos protegidos durante toda la obra.",
  "projects.d.brick":
    "Muro de ladrillo visto con junta rehundida, ejecutado a plomo y con rejuntado limpio. Albañilería de primera con un acabado pensado para quedar a la vista.",
  "projects.d.reform":
    "Obra en curso: derribo, nuevas instalaciones y preparación de paramentos. Seguimiento fotográfico para el cliente y retirada de escombros incluida.",

  "brand.name": "Reformas HZ",
  "brand.tagline": "Reformas, albañilería y pintura",
  "brand.motto": "Su hogar, en buenas manos",
  "brand.quote": "Presupuestos sin compromiso",
  "brand.years": "25 años de experiencia",
  "cards.hint": "Sitúe el cursor sobre cada obra para ver el detalle",

  "about.eyebrow": "Sobre nosotros",
  "about.title": "Especialidades y método de trabajo.",
  "about.intro":
    "Reformas HZ reúne 25 años de oficio en reformas integrales, albañilería y pintura. A continuación puede consultar nuestras especialidades y el proceso que seguimos en cada proyecto.",
  "about.skills.title": "Especialidades",
  "about.skills.subtitle": "Áreas en las que trabajamos habitualmente, con equipo propio y acabados cuidados.",
  "about.values.title": "Cómo trabajamos",
  "about.values.subtitle": "Un proceso ordenado, de la primera llamada a la entrega final.",

  "about.spec1.t": "Reforma integral",
  "about.spec1.d": "Proyectos completos de vivienda con gestión de todos los gremios y una única interlocución.",
  "about.spec2.t": "Albañilería",
  "about.spec2.d": "Tabiquería, aperturas, soleras y refuerzos ejecutados con criterio técnico.",
  "about.spec3.t": "Pintura y alisado",
  "about.spec3.d": "Eliminación de gotelé, alisado, esmaltes y pintura interior y exterior.",
  "about.spec4.t": "Baños y cocinas",
  "about.spec4.d": "Reformas completas, incluyendo fontanería, electricidad, alicatado y mobiliario.",
  "about.spec5.t": "Suelos y solados",
  "about.spec5.d": "Tarima, porcelánico y gres, con nivelación previa y remates precisos.",
  "about.spec6.t": "Pladur y techos",
  "about.spec6.d": "Trasdosados, techos registrables, focos empotrados y aislamiento acústico.",
  "about.spec7.t": "Fachadas y exteriores",
  "about.spec7.d": "Rehabilitación, impermeabilización y pintura exterior en viviendas y comunidades.",
  "about.spec8.t": "Reparaciones",
  "about.spec8.d": "Intervenciones puntuales, humedades y mantenimiento con respuesta rápida.",

  "about.step1.t": "Primer contacto",
  "about.step1.d":
    "Atendemos su consulta por teléfono o WhatsApp y recogemos los datos esenciales del proyecto y sus necesidades.",
  "about.step2.t": "Valoración",
  "about.step2.d":
    "Visitamos el inmueble, tomamos medidas y analizamos el estado del espacio, los materiales y las soluciones adecuadas.",
  "about.step3.t": "Presupuesto",
  "about.step3.d":
    "Elaboramos una propuesta detallada y por escrito, con partidas claras, plazos estimados y sin compromiso.",
  "about.step4.t": "Preparación",
  "about.step4.d":
    "Planificamos la obra, seleccionamos materiales, coordinamos al equipo y protegemos las zonas que no se intervienen.",
  "about.step5.t": "Ejecución",
  "about.step5.d":
    "Realizamos los trabajos cuidando acabados y detalles, manteniendo la obra limpia y con seguimiento continuo.",
  "about.step6.t": "Resultado final",
  "about.step6.d":
    "Revisamos el trabajo con usted, retiramos escombros y entregamos la vivienda terminada, con garantía sobre la obra.",

  "about.value1.t": "Presupuesto sin compromiso",
  "about.value1.d": "Visita y medición gratuitas, con presupuesto detallado por escrito.",
  "about.value2.t": "Plazos reales",
  "about.value2.d": "Fecha de inicio, hitos y entrega definidos desde el primer día.",
  "about.value3.t": "Obra limpia",
  "about.value3.d": "Protección de suelos y mobiliario, con retirada de escombros incluida.",
  "about.value4.t": "Garantía",
  "about.value4.d": "Todos los trabajos cuentan con garantía sobre mano de obra y materiales.",

  "contact.eyebrow": "Contacto",
  "contact.title": "Solicite información o presupuesto.",
  "contact.subtitle":
    "Póngase en contacto con Reformas HZ para solicitar un presupuesto adaptado a su proyecto. Atendemos cada solicitud con rapidez y le responderemos a la mayor brevedad posible.",
  "contact.phone": "Teléfono",
  "contact.whatsapp": "WhatsApp",
  "contact.email": "Correo electrónico",
  "contact.area": "Zona de trabajo",
  "contact.area.value": "Madrid, Guadalajara y zonas cercanas",
  "contact.area.long": "Trabajamos en Madrid, Guadalajara y zonas cercanas de la Comunidad de Madrid.",
  "contact.form.name": "Nombre",
  "contact.form.phone": "Teléfono de contacto",
  "contact.form.message": "Describa brevemente el proyecto",
  "contact.form.send": "Enviar solicitud",
  "contact.form.sent": "Gracias por su solicitud. Nos pondremos en contacto con usted a la mayor brevedad.",

  "footer.tag":
    "Reformas integrales · Albañilería · Pintura y alisado · Baños y cocinas · Suelos y fachadas",
  "footer.rights": "Todos los derechos reservados.",
};

const en: Dict = {
  "nav.home": "Home",
  "nav.services": "Services",
  "nav.projects": "Projects",
  "nav.about": "About us",
  "nav.contact": "Contact",
  "nav.cta": "Request a quote",

  "hero.eyebrow": "Reformas HZ · Madrid & Guadalajara",
  "hero.title": "Renovations and painting with a first-class finish.",
  "hero.subtitle":
    "A renovation, bricklaying and painting company working across Madrid, Guadalajara and nearby areas of the Madrid region, with clear quotes and deadlines that are met.",
  "hero.cta.primary": "Contact us · 671 155 809",
  "hero.cta.secondary": "View projects",
  "hero.stat.years": "Years of experience",
  "hero.stat.projects": "Renovations delivered",
  "hero.stat.area": "Service area",

  "services.eyebrow": "Our services",
  "services.title": "One team for the entire renovation.",
  "services.painting.title": "Interior & exterior painting",
  "services.painting.desc":
    "Wall skimming, textured-finish removal, enamels and emulsion. Even, clean and long-lasting results.",
  "services.brick.title": "First-class bricklaying",
  "services.brick.desc":
    "Partition walls, openings, tiling, screeds and repairs, carried out to a technical standard and guaranteed.",
  "services.reform.title": "Full home renovation",
  "services.reform.desc":
    "Kitchens, bathrooms and living areas. We coordinate every trade, from strip-out to handover.",
  "services.bath.title": "Bathrooms & kitchens",
  "services.bath.desc":
    "Bath-to-shower conversions, tiling, plumbing, electrics and bespoke cabinetry.",
  "services.floor.title": "Floors",
  "services.floor.desc": "Engineered wood, porcelain and stoneware, with levelling and precise finishing.",
  "services.facade.title": "Façades & exteriors",
  "services.facade.desc":
    "Rehabilitation, waterproofing and exterior painting for private homes and residential buildings.",

  "projects.eyebrow": "Completed work",
  "projects.title": "A selection of delivered projects.",
  "projects.subtitle":
    "Every project is planned and executed individually. Here are some of the renovations completed recently.",
  "projects.tag.apartment": "Full renovation",
  "projects.tag.painting": "Painting",
  "projects.tag.bath": "Bathroom",
  "projects.tag.kitchen": "Kitchen",
  "projects.tag.brick": "Bricklaying",
  "projects.tag.reform": "Work in progress",

  "projects.d.apartment":
    "92 m² home fully renovated in 6 weeks: new layout, skimmed walls, engineered flooring, skirting and complete repaint. Handed over clean and ready to use.",
  "projects.d.bath":
    "Bathtub replaced with a non-slip shower tray, floor-to-ceiling porcelain tiling, screen, new plumbing and bespoke unit. Completed in 8 days with no supply cuts.",
  "projects.d.kitchen":
    "Wall opened to integrate the kitchen with the living room, structural reinforcement, rewired electrics, tiled splashback and washable paint. Fixed quote, delivered on schedule.",
  "projects.d.painting":
    "Textured finish removed, two coats of filler skimmed flat, primer and two coats of matt emulsion. Furniture and floors protected throughout.",
  "projects.d.brick":
    "Exposed brick wall with recessed joints, built true to plumb with clean pointing. Bricklaying finished to be seen, not hidden.",
  "projects.d.reform":
    "Work in progress: strip-out, new services and wall preparation. Photographic updates for the client and debris removal included.",

  "brand.name": "Reformas HZ",
  "brand.tagline": "Renovations, bricklaying & painting",
  "brand.motto": "Your home, in good hands",
  "brand.quote": "No-obligation quotes",
  "brand.years": "25 years of experience",
  "cards.hint": "Hover over each project to see the details",

  "about.eyebrow": "About us",
  "about.title": "Specialities and working method.",
  "about.intro":
    "Reformas HZ brings together 25 years of experience in full renovations, bricklaying and painting. Below you can review our specialities and the process we follow on every project.",
  "about.skills.title": "Specialities",
  "about.skills.subtitle": "The areas we work in day to day, with our own team and carefully executed finishes.",
  "about.values.title": "How we work",
  "about.values.subtitle": "An orderly process, from the first call to final handover.",

  "about.spec1.t": "Full renovation",
  "about.spec1.d": "Complete home projects with every trade managed through a single point of contact.",
  "about.spec2.t": "Bricklaying",
  "about.spec2.d": "Partitions, openings, screeds and reinforcements executed to a technical standard.",
  "about.spec3.t": "Painting & skimming",
  "about.spec3.d": "Texture removal, skimming, enamels and interior and exterior painting.",
  "about.spec4.t": "Bathrooms & kitchens",
  "about.spec4.d": "Complete refits including plumbing, electrics, tiling and cabinetry.",
  "about.spec5.t": "Floors",
  "about.spec5.d": "Engineered wood, porcelain and stoneware, with prior levelling and precise trims.",
  "about.spec6.t": "Plasterboard & ceilings",
  "about.spec6.d": "Dry lining, access ceilings, recessed lighting and acoustic insulation.",
  "about.spec7.t": "Façades & exteriors",
  "about.spec7.d": "Rehabilitation, waterproofing and exterior painting for homes and buildings.",
  "about.spec8.t": "Repairs",
  "about.spec8.d": "Targeted works, damp issues and maintenance with a fast response.",

  "about.step1.t": "First contact",
  "about.step1.d":
    "We take your enquiry by phone or WhatsApp and gather the essential details of the project and your needs.",
  "about.step2.t": "Assessment",
  "about.step2.d":
    "We visit the property, take measurements and review the condition of the space, materials and suitable solutions.",
  "about.step3.t": "Quote",
  "about.step3.d":
    "We prepare a detailed written proposal with clear line items, estimated timescales and no obligation.",
  "about.step4.t": "Preparation",
  "about.step4.d":
    "We plan the works, select materials, coordinate the team and protect the areas that are not being altered.",
  "about.step5.t": "Execution",
  "about.step5.d":
    "We carry out the works with care for finishes and detail, keeping the site clean and under continuous supervision.",
  "about.step6.t": "Final result",
  "about.step6.d":
    "We review the work with you, remove all debris and hand over the finished property, with a guarantee on the works.",

  "about.value1.t": "No-obligation quote",
  "about.value1.d": "Free site visit and measurement, with a detailed written quote.",
  "about.value2.t": "Realistic timescales",
  "about.value2.d": "Start date, milestones and handover defined from day one.",
  "about.value3.t": "Clean site",
  "about.value3.d": "Floor and furniture protection, with debris removal included.",
  "about.value4.t": "Guarantee",
  "about.value4.d": "All works are guaranteed on labour and materials.",

  "contact.eyebrow": "Contact",
  "contact.title": "Request information or a quote.",
  "contact.subtitle":
    "Contact Reformas HZ to request a quote tailored to your project. Every enquiry is handled promptly and we will get back to you as soon as possible.",
  "contact.phone": "Phone",
  "contact.whatsapp": "WhatsApp",
  "contact.email": "Email",
  "contact.area": "Service area",
  "contact.area.value": "Madrid, Guadalajara and nearby areas",
  "contact.area.long": "We work in Madrid, Guadalajara and nearby areas of the Madrid region.",
  "contact.form.name": "Name",
  "contact.form.phone": "Contact phone",
  "contact.form.message": "Briefly describe the project",
  "contact.form.send": "Send request",
  "contact.form.sent": "Thank you for your enquiry. We will be in touch as soon as possible.",

  "footer.tag": "Full renovations · Bricklaying · Painting & skimming · Bathrooms and kitchens · Floors and façades",
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
