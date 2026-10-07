import { business } from "@/content/site";

export const PHONE = business.phone;
export const PHONE_DISPLAY = business.phoneDisplay;
export const EMAIL = business.email;
export const EMAIL_SUBJECT = "Solicitud de presupuesto - Reformas HZ";

/** Formulario de Formspree que reenvía las solicitudes al correo de la empresa. */
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xyeynkrw";

const WHATSAPP_TEXT = "Hola, me gustaría solicitar información sobre un trabajo de reforma.";

export function whatsappUrl(text: string = WHATSAPP_TEXT) {
  return `https://wa.me/34${PHONE}?text=${encodeURIComponent(text)}`;
}

export const WHATSAPP_URL = whatsappUrl();
export const MAILTO_URL = `mailto:${EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`;
export const TEL_URL = `tel:+34${PHONE}`;
