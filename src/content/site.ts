/**
 * Datos de la empresa. Es la única fuente para teléfono, correo, zona y datos
 * legales: cambiarlos aquí los actualiza en toda la web (cabecera, pie,
 * contacto y textos legales).
 *
 * Los campos con `null` están PENDIENTES de confirmar por el titular y se
 * muestran resaltados en los textos legales hasta que se completen.
 */
export const SITE_URL = "https://reformashz.com";

export const business = {
  brand: "Reformas HZ",
  phone: "671155809",
  phoneDisplay: "671 155 809",
  email: "reformashzcorreo@gmail.com",
  area: {
    es: "Madrid, Guadalajara y zonas cercanas",
    en: "Madrid, Guadalajara and nearby areas",
  },
} as const;

export const legal = {
  /** Nombre del titular tal como se facilitó. Falta confirmar nombre y apellidos completos. */
  holderName: "Toni Hozas",
  holderFullName: null as string | null,
  /** NIE facilitado. Pendiente de confirmar que es el identificador fiscal con el que factura. */
  taxId: "X4532443V",
  status: "Profesional autónomo",
  tradeName: "Reformas HZ",
  /** Domicilio profesional (obligatorio en el aviso legal, LSSI art. 10). */
  address: null as string | null,
  /** Correo para ejercer derechos de protección de datos. Por defecto, el de contacto. */
  privacyEmail: business.email,
  /** Proveedor que entrega el formulario por correo. */
  formProvider: "Formspree",
  /** Alojamiento de la web (según el flujo de publicación actual del repositorio). */
  hosting: "GitHub Pages (GitHub, Inc.)",
  /** Plazo propuesto para conservar solicitudes que no terminan en encargo. Pendiente de validar. */
  enquiryRetention: { es: "12 meses", en: "12 months" },
  lastUpdated: "6 de octubre de 2026",
};
