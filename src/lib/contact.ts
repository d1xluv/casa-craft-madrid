export const PHONE = "671155809";
export const PHONE2 = "671155752";
export const PHONE_DISPLAY = "671 155 809";
export const PHONE2_DISPLAY = "671 155 752";

export const EMAIL = "reformashz@gmail.com";
export const EMAIL_SUBJECT = "Solicitud de presupuesto - Reformas HZ";

const WHATSAPP_TEXT = "Hola, me gustaría solicitar información sobre un trabajo de reforma.";

export const WHATSAPP_URL = `https://wa.me/34${PHONE}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

export const MAILTO_URL = `mailto:${EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`;

export function whatsappUrl(text: string) {
  return `https://wa.me/34${PHONE}?text=${encodeURIComponent(text)}`;
}

export function mailtoUrl(subject: string, body: string) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
