import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/contacto")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contacto · Pinturas Alcalá Madrid" },
      { name: "description", content: "Contacta con Pinturas Alcalá. Llama al 671 155 809 o escribe por WhatsApp. Toda Madrid." },
    ],
  }),
});

function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = f.get("name");
    const phone = f.get("phone");
    const message = f.get("message");
    const body = encodeURIComponent(`Nombre: ${name}\nTeléfono: ${phone}\n\n${message}`);
    window.location.href = `https://wa.me/34671155809?text=${body}`;
    setSent(true);
  };

  return (
    <section className="container-page py-20 md:py-28">
      <p className="text-xs uppercase tracking-widest text-accent">{t("contact.eyebrow")}</p>
      <h1 className="mt-3 max-w-3xl text-balance font-display text-5xl md:text-6xl">{t("contact.title")}</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">{t("contact.subtitle")}</p>

      <div className="mt-14 grid gap-10 md:grid-cols-5">
        <div className="space-y-5 md:col-span-2">
          <ContactRow icon={Phone} label={t("contact.phone")} value="671 155 809" href="tel:671155809" />
          <ContactRow icon={MessageCircle} label={t("contact.whatsapp")} value="+34 671 155 809" href="https://wa.me/34671155809" />
          <ContactRow icon={Mail} label={t("contact.email")} value="info@reformasalcala.es" href="mailto:info@reformasalcala.es" />
          <ContactRow icon={MapPin} label={t("contact.area")} value={t("contact.area.value")} />
        </div>

        <form onSubmit={onSubmit} className="space-y-4 rounded-lg border border-border bg-card p-6 md:col-span-3 md:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="name" label={t("contact.form.name")} required />
            <Field name="phone" label={t("contact.form.phone")} type="tel" required />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">{t("contact.form.message")}</label>
            <textarea
              name="message"
              required
              rows={5}
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-ember px-6 py-3 text-sm font-semibold text-accent-foreground shadow-ember"
          >
            <MessageCircle className="h-4 w-4" /> {t("contact.form.send")}
          </button>
          {sent && <p className="text-sm text-accent">{t("contact.form.sent")}</p>}
        </form>
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
    <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent">
      <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-lg">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a> : inner;
}

function Field({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
      />
    </div>
  );
}
