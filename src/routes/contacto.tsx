import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck, Send } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";
import {
  EMAIL,
  EMAIL_SUBJECT,
  FORMSPREE_ENDPOINT,
  MAILTO_URL,
  PHONE,
  PHONE2,
  PHONE_DISPLAY,
  PHONE2_DISPLAY,
  WHATSAPP_URL,
  whatsappUrl,
} from "@/lib/contact";

export const Route = createFileRoute("/contacto")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contacto · Reformas HZ Madrid y Guadalajara" },
      {
        name: "description",
        content:
          "Solicite información o presupuesto sin compromiso a Reformas HZ. Teléfono 671 155 809. Trabajamos en Madrid, Guadalajara y zonas cercanas.",
      },
      { property: "og:title", content: "Contacto · Reformas HZ" },
      {
        property: "og:description",
        content: "Solicite un presupuesto adaptado a su proyecto. Madrid, Guadalajara y zonas cercanas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://casa-craft-madrid.lovable.app/contacto" }],
  }),
});

function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);

  const buildBody = (f: FormData) =>
    [
      "Nueva solicitud de presupuesto - Reformas HZ",
      "",
      `Nombre: ${f.get("name") ?? ""}`,
      `Teléfono: ${f.get("phone") ?? ""}`,
      `Email: ${f.get("email") ?? ""}`,
      `Tipo de trabajo: ${f.get("work_type") ?? ""}`,
      "",
      "Descripción:",
      `${f.get("message") ?? ""}`,
    ].join("\n");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    const f = new FormData(form);
    f.append("_subject", EMAIL_SUBJECT);
    setSending(true);
    setError(false);
    setSent(false);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: f,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("formspree");
      setSent(true);
      form.reset();
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const onWhatsApp = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form;
    if (!form) return;
    const f = new FormData(form);
    window.open(whatsappUrl(buildBody(f)), "_blank", "noopener");
  };

  return (
    <section className="container-page py-20 md:py-28">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">{t("contact.eyebrow")}</p>
        <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl uppercase leading-[1.02] text-navy sm:text-5xl md:text-6xl">
          {t("contact.title")}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t("contact.subtitle")}</p>
      </Reveal>

      {/* ZONA DE TRABAJO */}
      <Reveal delay={100}>
        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-accent/25 bg-sand/60 p-6 md:flex-row md:items-center md:p-7">
          <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground shadow-soft">
            <MapPin className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">{t("contact.area")}</p>
            <p className="mt-1 font-display text-xl text-navy md:text-2xl">{t("contact.area.long")}</p>
          </div>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-5">
        <div className="space-y-5 md:col-span-2">
          {[
            { icon: Phone, label: t("contact.phone"), value: PHONE_DISPLAY, href: `tel:${PHONE}` },
            { icon: Phone, label: t("contact.phone"), value: PHONE2_DISPLAY, href: `tel:${PHONE2}` },
            { icon: MessageCircle, label: t("contact.whatsapp"), value: `+34 ${PHONE_DISPLAY}`, href: WHATSAPP_URL },
            { icon: Mail, label: t("contact.email"), value: EMAIL, href: MAILTO_URL },
            { icon: ShieldCheck, label: t("brand.quote"), value: t("brand.years") },
          ].map((r, i) => (
            <Reveal key={r.value} delay={i * 70} variant="left">
              <ContactRow {...r} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="md:col-span-3">
          <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="name" label={t("contact.form.name")} required />
              <Field name="phone" label={t("contact.form.phone")} type="tel" required />
              <Field name="email" label={t("contact.form.email")} type="email" required />
              <Field name="worktype" label={t("contact.form.type")} />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">{t("contact.form.message")}</label>
              <textarea
                name="message"
                required
                rows={6}
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors duration-300 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="btn-motion inline-flex items-center gap-2 rounded-full bg-gradient-ember px-6 py-3 text-sm font-semibold text-accent-foreground shadow-ember"
              >
                <Send className="h-4 w-4" /> {t("contact.form.send")}
              </button>
              <button
                type="button"
                onClick={onWhatsApp}
                className="btn-motion inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-accent/50 hover:bg-muted"
              >
                <MessageCircle className="h-4 w-4" /> {t("contact.form.wa")}
              </button>
            </div>
            {sent && <p className="text-sm text-accent">{t("contact.form.sent")}</p>}
            {error && <p className="text-sm text-destructive">{t("contact.form.error")}</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="group card-lift flex items-start gap-4 rounded-2xl border border-border bg-card p-5 hover:border-accent/50 hover:shadow-soft">
      <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-lg">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors duration-300 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
      />
    </div>
  );
}
