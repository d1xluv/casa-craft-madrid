import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  HelpCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useLang, type UiKey } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { getService, services } from "@/content/services";
import {
  EMAIL,
  EMAIL_SUBJECT,
  FORMSPREE_ENDPOINT,
  MAILTO_URL,
  PHONE_DISPLAY,
  TEL_URL,
  WHATSAPP_URL,
  whatsappUrl,
} from "@/lib/contact";
import { Reveal } from "@/components/site/Reveal";
import { Faq } from "@/components/site/Faq";

type Search = { servicio?: string };

export const Route = createFileRoute("/contacto")({
  validateSearch: (search: Record<string, unknown>): Search =>
    typeof search.servicio === "string" ? { servicio: search.servicio } : {},
  component: Contact,
  head: () =>
    seo({
      path: "/contacto",
      title: "Contacto · Reformas HZ Madrid y Guadalajara",
      description:
        "Solicite presupuesto sin compromiso a Reformas HZ. Teléfono 671 155 809. Madrid, Guadalajara y zonas cercanas.",
    }),
});

type FieldName = "services" | "name" | "phone" | "email" | "message" | "privacy";
type Errors = Partial<Record<FieldName, UiKey>>;

const OTHER = "otro";
const PHONE_RE = /^(\+?34)?[6789]\d{8}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ORDER: FieldName[] = ["services", "name", "phone", "email", "message", "privacy"];

function validate(f: FormData, selected: Set<string>): Errors {
  const e: Errors = {};
  const str = (k: string) => String(f.get(k) ?? "").trim();
  if (selected.size === 0) e.services = "contact.err.type";
  if (str("name").length < 2) e.name = "contact.err.name";
  if (!PHONE_RE.test(str("phone").replace(/[\s.-]/g, ""))) e.phone = "contact.err.phone";
  if (str("email") && !EMAIL_RE.test(str("email"))) e.email = "contact.err.email";
  if (str("message").length < 10) e.message = "contact.err.message";
  if (!f.get("privacy")) e.privacy = "contact.err.privacy";
  return e;
}

const inputCls = (error?: string) =>
  `mt-2 w-full rounded-xl border bg-background px-4 py-3 text-base transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground/60 focus:outline-none focus:ring-4 ${
    error
      ? "border-destructive focus:ring-destructive/15"
      : "border-border focus:border-accent focus:ring-accent/15"
  }`;

function Contact() {
  const { t, l } = useLang();
  const { servicio } = Route.useSearch();
  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Al llegar desde un botón "Pedir presupuesto", bajar directamente al formulario.
  useEffect(() => {
    if (window.location.hash !== "#formulario") return;
    const id = window.setTimeout(
      () => document.getElementById("formulario")?.scrollIntoView({ block: "start" }),
      120,
    );
    return () => window.clearTimeout(id);
  }, []);

  // Rellenado automático al llegar desde "Pedir presupuesto" de un servicio.
  useEffect(() => {
    const s = servicio ? getService(servicio) : undefined;
    if (!s) return;
    setSelected(new Set([s.id]));
    if (messageRef.current && !messageRef.current.value) {
      messageRef.current.value = `${l(s.title)}: `;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicio]);

  const serviceName = (id: string) =>
    id === OTHER ? t("contact.form.type.other") : l(getService(id)?.title ?? { es: id, en: id });

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      if (attempted && formRef.current) setErrors(validate(new FormData(formRef.current), next));
      return next;
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const errs = validate(data, selected);
    setAttempted(true);
    setErrors(errs);
    const first = ORDER.find((k) => errs[k]);
    if (first) {
      const target =
        first === "services"
          ? form.querySelector<HTMLElement>("[data-service]")
          : form.querySelector<HTMLElement>(`[name="${first}"]`);
      target?.focus();
      return;
    }
    data.delete("privacy");
    data.append("work_type", [...selected].map(serviceName).join(", "));
    data.append("_subject", EMAIL_SUBJECT);
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Formspree ${res.status}`);
      setStatus("sent");
      form.reset();
      setSelected(new Set());
      setAttempted(false);
    } catch {
      setStatus("error");
    }
  };

  const onWhatsApp = () => {
    const f = formRef.current ? new FormData(formRef.current) : new FormData();
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const lines = [
      "Hola, me gustaría pedir presupuesto.",
      selected.size > 0 && `Servicio: ${[...selected].map(serviceName).join(", ")}`,
      v("location") && `Localidad: ${v("location")}`,
      v("message") && `\n${v("message")}`,
      v("name") && `\n${v("name")}`,
    ].filter(Boolean);
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  const err = (k: FieldName) => (errors[k] ? t(errors[k]!) : undefined);
  const tiles = [
    ...services.map((s) => ({ id: s.id, icon: s.icon, label: l(s.title) })),
    { id: OTHER, icon: HelpCircle, label: t("contact.form.type.other") },
  ];

  return (
    <section className="container-page py-20 md:py-28">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {t("contact.eyebrow")}
        </p>
        <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl uppercase leading-[1.02] text-navy sm:text-5xl md:text-6xl">
          {t("contact.title")}
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{t("contact.area.long")}</p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        {/* Vías directas */}
        <div className="space-y-4 lg:col-span-4">
          <ContactRow
            icon={Phone}
            label={t("contact.phone")}
            value={PHONE_DISPLAY}
            href={TEL_URL}
          />
          <ContactRow
            icon={MessageCircle}
            label={t("contact.whatsapp")}
            value={`+34 ${PHONE_DISPLAY}`}
            href={WHATSAPP_URL}
            external
          />
          <ContactRow icon={Mail} label={t("contact.email")} value={EMAIL} href={MAILTO_URL} />
          <ContactRow icon={MapPin} label={t("contact.area")} value="Madrid · Guadalajara" />
        </div>

        {/* Formulario */}
        <Reveal delay={100} className="lg:col-span-8">
          <div id="formulario" className="scroll-mt-32">
            {status === "sent" ? (
              <div
                role="status"
                className="rounded-3xl border border-border bg-card p-10 text-center shadow-soft"
              >
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/10">
                  <CheckCircle2 className="h-9 w-9 text-success" aria-hidden="true" />
                </span>
                <p className="mx-auto mt-5 max-w-md text-lg font-medium">
                  {t("contact.form.sent")}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-accent hover:text-accent"
                >
                  {t("contact.form.again")}
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={onSubmit}
                onChange={() =>
                  attempted &&
                  formRef.current &&
                  setErrors(validate(new FormData(formRef.current), selected))
                }
                noValidate
                className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
              >
                <div className="bg-gradient-ink px-6 py-5 text-background md:px-8">
                  <p className="font-display text-2xl">{t("contact.form.title")}</p>
                  <p className="mt-1 text-sm text-background/70">{t("contact.form.subtitle")}</p>
                </div>

                <div className="space-y-8 p-6 md:p-8">
                  {attempted && Object.keys(errors).length > 0 && (
                    <p
                      role="alert"
                      className="flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />{" "}
                      {t("contact.form.invalid")}
                    </p>
                  )}

                  {/* 1 · Servicios */}
                  <fieldset aria-describedby={errors.services ? "services-err" : undefined}>
                    <legend className="flex items-center gap-3 font-display text-lg text-navy">
                      <StepBadge n={1} />
                      {t("contact.form.step1")}
                    </legend>
                    <p className="mt-1 pl-10 text-sm text-muted-foreground">
                      {t("contact.form.step1.hint")}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {tiles.map((tile) => {
                        const on = selected.has(tile.id);
                        const Icon = tile.icon;
                        return (
                          <button
                            key={tile.id}
                            type="button"
                            data-service=""
                            onClick={() => toggle(tile.id)}
                            aria-pressed={on}
                            className={`group relative flex items-center gap-3 rounded-2xl border-2 p-3 text-left text-sm font-semibold transition-all duration-200 ${
                              on
                                ? "border-accent bg-accent/5 text-navy shadow-soft"
                                : "border-border bg-background text-foreground hover:-translate-y-0.5 hover:border-accent/50"
                            }`}
                          >
                            <span
                              className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors ${
                                on ? "bg-accent text-accent-foreground" : "bg-accent/10 text-accent"
                              }`}
                            >
                              {on ? (
                                <Check className="h-4 w-4" aria-hidden="true" />
                              ) : (
                                <Icon className="h-4 w-4" aria-hidden="true" />
                              )}
                            </span>
                            <span className="leading-tight">{tile.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <ErrorText id="services-err">{err("services")}</ErrorText>
                  </fieldset>

                  {/* 2 · Datos */}
                  <fieldset>
                    <legend className="flex items-center gap-3 font-display text-lg text-navy">
                      <StepBadge n={2} />
                      {t("contact.form.step2")}
                    </legend>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <Field
                        name="name"
                        label={t("contact.form.name")}
                        autoComplete="name"
                        required
                        error={err("name")}
                      />
                      <Field
                        name="phone"
                        label={t("contact.form.phone")}
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="600 000 000"
                        required
                        error={err("phone")}
                      />
                      <Field
                        name="email"
                        label={t("contact.form.email")}
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        error={err("email")}
                      />
                      <Field
                        name="location"
                        label={t("contact.form.location")}
                        autoComplete="address-level2"
                      />
                    </div>
                  </fieldset>

                  {/* 3 · Mensaje */}
                  <fieldset>
                    <legend className="flex items-center gap-3 font-display text-lg text-navy">
                      <StepBadge n={3} />
                      {t("contact.form.step3")}
                    </legend>
                    <Field
                      name="message"
                      label={t("contact.form.message")}
                      multiline
                      required
                      placeholder={t("contact.form.message.placeholder")}
                      error={err("message")}
                      inputRef={messageRef}
                    />
                  </fieldset>

                  {/* Campo trampa para bots (Formspree lo descarta). */}
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  <div className="space-y-3 rounded-2xl bg-sand/70 p-4">
                    <PrivacyCheck error={err("privacy")} />
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {t("contact.form.info")}{" "}
                      <Link
                        to="/privacidad"
                        className="font-medium text-accent underline underline-offset-2"
                      >
                        {t("contact.form.info.more")}
                      </Link>
                    </p>
                  </div>

                  {status === "error" && (
                    <p role="alert" className="flex items-start gap-2 text-sm text-destructive">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{" "}
                      {t("contact.form.error")}
                    </p>
                  )}

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-motion inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-ember px-6 py-4 text-base font-semibold text-accent-foreground shadow-ember disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "sending" ? (
                        <span
                          className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                          aria-hidden="true"
                        />
                      ) : (
                        <Send className="h-4 w-4" aria-hidden="true" />
                      )}
                      {status === "sending" ? t("contact.form.sending") : t("contact.form.send")}
                    </button>
                    <button
                      type="button"
                      onClick={onWhatsApp}
                      className="btn-motion inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-4 text-base font-semibold text-foreground hover:border-accent/50 hover:bg-muted"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />{" "}
                      {t("contact.form.wa")}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      {/* PREGUNTAS FRECUENTES */}
      <div className="mt-24 grid gap-8 md:grid-cols-5">
        <Reveal className="md:col-span-2">
          <h2 className="font-display text-3xl uppercase text-navy md:text-4xl">
            {t("faq.title")}
          </h2>
        </Reveal>
        <Reveal delay={80} className="md:col-span-3">
          <Faq />
        </Reveal>
      </div>
    </section>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
      {n}
    </span>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <span className="mt-1 block break-words font-display text-lg">{value}</span>
      </span>
    </>
  );
  const cls = "group card-lift flex items-start gap-4 rounded-2xl border border-border bg-card p-5";
  return (
    <Reveal>
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={`${cls} hover:border-accent/50 hover:shadow-soft`}
        >
          {inner}
        </a>
      ) : (
        <div className={cls}>{inner}</div>
      )}
    </Reveal>
  );
}

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-destructive">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {children}
    </p>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  multiline,
  error,
  autoComplete,
  inputMode,
  placeholder,
  inputRef,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  error?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
  inputRef?: React.Ref<HTMLTextAreaElement>;
}) {
  const id = useId();
  const errId = `${id}-err`;
  const common = {
    id,
    name,
    required,
    autoComplete,
    placeholder,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errId : undefined,
  };
  return (
    <div className={multiline ? "mt-4" : ""}>
      <label htmlFor={id} className="text-sm font-medium text-navy">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {multiline ? (
        <textarea {...common} ref={inputRef} rows={5} className={`${inputCls(error)} resize-y`} />
      ) : (
        <input {...common} type={type} inputMode={inputMode} className={inputCls(error)} />
      )}
      <ErrorText id={errId}>{error}</ErrorText>
    </div>
  );
}

function PrivacyCheck({ error }: { error?: string }) {
  const { t } = useLang();
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          name="privacy"
          value="1"
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[var(--accent)]"
        />
        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed">
          {t("contact.form.privacy.pre")}{" "}
          <Link to="/privacidad" className="font-medium text-accent underline underline-offset-2">
            {t("contact.form.privacy.link")}
          </Link>{" "}
          {t("contact.form.privacy.post")}
          <span className="text-accent"> *</span>
        </label>
      </div>
      <ErrorText id={errId}>{error}</ErrorText>
    </div>
  );
}
