import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Phone, Mail, Send, X, FileText } from "lucide-react";
import { useLang, type Localized } from "@/lib/i18n";
import { services, getService } from "@/content/services";
import { faq } from "@/content/faq";
import { business } from "@/content/site";
import { MAILTO_URL, PHONE_DISPLAY, TEL_URL, whatsappUrl } from "@/lib/contact";

/**
 * Asistente de la web (botón de WhatsApp abajo a la derecha).
 * Funciona en el navegador con respuestas guiadas: no usa inteligencia
 * artificial ni servicios externos y no guarda nada. Solo se envía algo
 * cuando el usuario pulsa "Enviar por WhatsApp".
 */

type Chip = { label: string; onPick: () => void };
type LinkAction =
  | { kind: "wa"; label: string; text: string }
  | { kind: "tel"; label: string }
  | { kind: "mail"; label: string }
  | {
      kind: "page";
      label: string;
      to: string;
      params?: { id: string };
      search?: { servicio?: string };
      hash?: string;
    };
type Msg = { from: "bot" | "user"; text: string; links?: LinkAction[]; preview?: string };
type Step = "idle" | "service" | "location" | "details" | "name";

const T = {
  hello: {
    es: "¡Hola! 👋 Soy el asistente de Reformas HZ. ¿En qué le puedo ayudar?",
    en: "Hi! 👋 I'm the Reformas HZ assistant. How can I help?",
  },
  quote: { es: "Pedir presupuesto", en: "Request a quote" },
  services: { es: "Ver servicios", en: "See services" },
  faq: { es: "Preguntas frecuentes", en: "FAQ" },
  zone: { es: "¿Dónde trabajan?", en: "Where do you work?" },
  human: { es: "Hablar con una persona", en: "Talk to a person" },
  askService: { es: "¿Qué tipo de trabajo necesita?", en: "What kind of work do you need?" },
  other: { es: "Otro", en: "Other" },
  askLocation: {
    es: "¿En qué localidad es la obra?",
    en: "Where is the property located?",
  },
  askDetails: {
    es: "Cuéntenos brevemente el trabajo (medidas aproximadas, estado actual…). Si tiene fotos, podrá enviarlas luego por WhatsApp.",
    en: "Briefly describe the job (rough measurements, current state…). You can send photos later on WhatsApp.",
  },
  askName: { es: "¿Y su nombre?", en: "And your name?" },
  skip: { es: "Prefiero no decirlo", en: "Skip" },
  summary: {
    es: "Perfecto, ya lo tengo. Al pulsar «Enviar por WhatsApp» se abrirá WhatsApp con este mensaje ya escrito; solo tendrá que darle a enviar.",
    en: "Great, got it. Tapping “Send on WhatsApp” opens WhatsApp with this message already written; you just tap send.",
  },
  previewTitle: { es: "Mensaje que se enviará", en: "Message to be sent" },
  sendWa: { es: "Enviar por WhatsApp", en: "Send on WhatsApp" },
  form: { es: "Abrir formulario", en: "Open the form" },
  call: { es: "Llamar", en: "Call" },
  mail: { es: "Correo", en: "Email" },
  pickService: {
    es: "Estos son nuestros servicios. Elija uno para saber más:",
    en: "These are our services. Pick one to learn more:",
  },
  quoteThis: { es: "Presupuesto de esto", en: "Quote for this" },
  seePage: { es: "Ver página del servicio", en: "See service page" },
  pickFaq: { es: "Elija una pregunta:", en: "Pick a question:" },
  zoneAnswer: {
    es: `Trabajamos en ${business.area.es}. Si su obra está en otra localidad, consúltenos sin problema.`,
    en: `We work in ${business.area.en}. If your property is elsewhere, just ask.`,
  },
  humanAnswer: {
    es: `Puede hablar directamente con nosotros por WhatsApp, por teléfono (${PHONE_DISPLAY}) o por correo.`,
    en: `You can talk to us directly on WhatsApp, by phone (${PHONE_DISPLAY}) or by email.`,
  },
  dunno: {
    es: "No estoy seguro de haberle entendido. Puedo enviar su pregunta tal cual por WhatsApp para que le responda una persona, o elija una opción:",
    en: "I'm not sure I understood. I can send your question as is on WhatsApp so a person replies, or pick an option:",
  },
  sendQuestion: { es: "Enviar mi pregunta por WhatsApp", en: "Send my question on WhatsApp" },
  more: { es: "¿Algo más en lo que pueda ayudarle?", en: "Anything else I can help with?" },
  placeholder: { es: "Escriba su mensaje…", en: "Type your message…" },
  open: { es: "Abrir chat de ayuda", en: "Open help chat" },
  close: { es: "Cerrar chat", en: "Close chat" },
  title: { es: "Reformas HZ", en: "Reformas HZ" },
  subtitle: {
    es: "Asistente · le pasamos con WhatsApp",
    en: "Assistant · we connect you on WhatsApp",
  },
  bubble: { es: "¿Le ayudamos con su reforma?", en: "Need help with your renovation?" },
  privacy: {
    es: "No se guarda ni se envía nada hasta que pulse WhatsApp.",
    en: "Nothing is stored or sent until you tap WhatsApp.",
  },
  restart: { es: "Empezar de nuevo", en: "Start over" },
} satisfies Record<string, Localized>;

/** Palabras clave → servicio, para entender mensajes escritos. */
const KEYWORDS: [RegExp, string][] = [
  [/pint|gotel|alisa|esmalt/i, "pintura"],
  [/ba[ñn]o|ducha|ba[ñn]era|cocina|alicat|fontaner/i, "banos-cocinas"],
  [/suelo|tarima|parquet|porcel|gres|solad/i, "suelos"],
  [/pladur|techo|trasdos|foco/i, "pladur"],
  [/fachad|exterior|impermeab/i, "fachadas"],
  [/humedad|grieta|reparac|arregl|gotera|desperfect/i, "reparaciones"],
  [/alba[ñn]il|tabique|muro|ladrill|valla|cerramiento|solera/i, "albanileria"],
  [/reforma (integral|completa)|piso entero|casa entera|toda la casa/i, "reforma-integral"],
];

export function ChatWidget() {
  const { l, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [chips, setChips] = useState<Chip[]>([]);
  const [step, setStep] = useState<Step>("idle");
  const [input, setInput] = useState("");
  const [nudge, setNudge] = useState(false);
  const quote = useRef<{ service?: string; location?: string; details?: string; name?: string }>(
    {},
  );
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const bot = (text: string, links?: LinkAction[], preview?: string) =>
    setMsgs((m) => [...m, { from: "bot", text, links, preview }]);
  const user = (text: string) => setMsgs((m) => [...m, { from: "user", text }]);

  const serviceName = (id?: string) =>
    !id ? "" : id === "otro" ? l(T.other) : l(getService(id)?.title ?? { es: id, en: id });

  const menuChips = (): Chip[] => [
    { label: l(T.quote), onPick: () => pick(l(T.quote), startQuote) },
    { label: l(T.services), onPick: () => pick(l(T.services), showServices) },
    { label: l(T.faq), onPick: () => pick(l(T.faq), showFaq) },
    { label: l(T.zone), onPick: () => pick(l(T.zone), showZone) },
    { label: l(T.human), onPick: () => pick(l(T.human), showHuman) },
  ];

  /** Muestra la elección del usuario como mensaje y ejecuta la acción. */
  function pick(label: string, action: () => void) {
    user(label);
    setChips([]);
    window.setTimeout(action, 350);
  }

  function backToMenu() {
    setStep("idle");
    window.setTimeout(() => {
      bot(l(T.more));
      setChips(menuChips());
    }, 500);
  }

  function startQuote(preset?: string) {
    quote.current = {};
    if (preset) {
      quote.current.service = preset;
      askLocation();
      return;
    }
    setStep("service");
    bot(l(T.askService));
    setChips([
      ...services.map((s) => ({
        label: l(s.title),
        onPick: () => {
          quote.current.service = s.id;
          pick(l(s.title), askLocation);
        },
      })),
      {
        label: l(T.other),
        onPick: () => {
          quote.current.service = "otro";
          pick(l(T.other), askLocation);
        },
      },
    ]);
  }
  function askLocation() {
    setStep("location");
    bot(l(T.askLocation));
    setChips([{ label: l(T.skip), onPick: () => pick(l(T.skip), askDetails) }]);
  }
  function askDetails() {
    setStep("details");
    bot(l(T.askDetails));
    setChips([]);
  }
  function askName() {
    setStep("name");
    bot(l(T.askName));
    setChips([{ label: l(T.skip), onPick: () => pick(l(T.skip), finishQuote) }]);
  }
  function finishQuote() {
    setStep("idle");
    const q = quote.current;
    const text = [
      "Hola, me gustaría pedir presupuesto.",
      q.service && `Servicio: ${serviceName(q.service)}`,
      q.location && `Localidad: ${q.location}`,
      q.details && `Trabajo: ${q.details}`,
      q.name && `Nombre: ${q.name}`,
    ]
      .filter(Boolean)
      .join("\n");
    const known = q.service && q.service !== "otro" ? q.service : undefined;
    bot(
      l(T.summary),
      [
        { kind: "wa", label: l(T.sendWa), text },
        {
          kind: "page",
          label: l(T.form),
          to: "/contacto",
          search: known ? { servicio: known } : {},
          hash: "formulario",
        },
        { kind: "tel", label: `${l(T.call)} · ${PHONE_DISPLAY}` },
      ],
      text,
    );
    setChips([{ label: l(T.restart), onPick: () => pick(l(T.restart), restart) }]);
  }

  function showServices() {
    bot(l(T.pickService));
    setChips(
      services.map((s) => ({
        label: l(s.title),
        onPick: () => pick(l(s.title), () => showService(s.id)),
      })),
    );
  }
  function showService(id: string) {
    const s = getService(id);
    if (!s) return backToMenu();
    bot(`${l(s.title)}: ${l(s.detail)}`, [
      { kind: "page", label: l(T.seePage), to: "/servicios/$id", params: { id: s.id } },
    ]);
    setChips([
      { label: l(T.quoteThis), onPick: () => pick(l(T.quoteThis), () => startQuote(s.id)) },
      ...menuChips().slice(1),
    ]);
  }
  function showFaq() {
    bot(l(T.pickFaq));
    setChips(
      faq.map((f) => ({
        label: l(f.q),
        onPick: () =>
          pick(l(f.q), () => {
            bot(l(f.a));
            backToMenu();
          }),
      })),
    );
  }
  function showZone() {
    bot(l(T.zoneAnswer));
    backToMenu();
  }
  function showHuman() {
    bot(l(T.humanAnswer), [
      { kind: "wa", label: "WhatsApp", text: "Hola, me gustaría hablar con Reformas HZ." },
      { kind: "tel", label: `${l(T.call)} · ${PHONE_DISPLAY}` },
      { kind: "mail", label: l(T.mail) },
    ]);
    backToMenu();
  }
  function restart() {
    setMsgs([]);
    setStep("idle");
    window.setTimeout(() => {
      bot(l(T.hello));
      setChips(menuChips());
    }, 200);
  }

  /** Mensaje escrito libremente. */
  function onSend(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    user(text);
    setChips([]);
    window.setTimeout(() => handleText(text), 350);
  }
  function handleText(text: string) {
    if (step === "location") {
      quote.current.location = text;
      return askDetails();
    }
    if (step === "details") {
      quote.current.details = text;
      return askName();
    }
    if (step === "name") {
      quote.current.name = text;
      return finishQuote();
    }
    if (step === "service") {
      quote.current.service = KEYWORDS.find(([re]) => re.test(text))?.[1] ?? "otro";
      quote.current.details = text;
      return askLocation();
    }
    // Conversación libre: interpretar la intención.
    if (/presupuest|precio|cu[aá]nto|cuesta|coste|valor/i.test(text)) {
      const svc = KEYWORDS.find(([re]) => re.test(text))?.[1];
      return startQuote(svc);
    }
    if (/zona|d[oó]nde|madrid|guadalajara|alcal|desplaz|localidad/i.test(text)) return showZone();
    if (/llam|tel[eé]fono|hablar|persona|whatsapp|correo|email|contact/i.test(text))
      return showHuman();
    const svc = KEYWORDS.find(([re]) => re.test(text))?.[1];
    if (svc) return showService(svc);
    const hit = faq.find((f) => {
      const words = f.q.es
        .toLowerCase()
        .replace(/[¿?]/g, "")
        .split(/\s+/)
        .filter((w) => w.length > 4);
      return words.some((w) => text.toLowerCase().includes(w));
    });
    if (hit) {
      bot(l(hit.a));
      return backToMenu();
    }
    bot(l(T.dunno), [{ kind: "wa", label: l(T.sendQuestion), text }]);
    setChips(menuChips());
  }

  // Primer saludo al abrir.
  useEffect(() => {
    if (open && msgs.length === 0) restart();
    if (open) window.setTimeout(() => inputRef.current?.focus(), 150);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Si cambia el idioma, reiniciar la conversación en ese idioma.
  useEffect(() => {
    if (msgs.length) restart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Bajar al último mensaje.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, chips]);

  // Burbuja de invitación tras unos segundos (una vez por visita).
  useEffect(() => {
    const id = window.setTimeout(() => setNudge(true), 6000);
    return () => window.clearTimeout(id);
  }, []);

  // Escape cierra.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const linkCls =
    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-transform hover:-translate-y-0.5";

  return (
    <>
      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label={l(T.title)}
          className="fixed bottom-[9.5rem] right-3 z-[55] flex h-[min(560px,calc(100dvh-11rem))] w-[calc(100vw-1.5rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200 md:bottom-24 md:right-6"
        >
          <div className="flex items-center gap-3 bg-gradient-ink px-4 py-3 text-background">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-ember font-display text-sm font-extrabold">
              HZ
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base leading-tight">{l(T.title)}</p>
              <p className="flex items-center gap-1.5 text-[11px] text-background/70">
                <span className="h-2 w-2 rounded-full bg-[#25D366]" aria-hidden="true" />
                {l(T.subtitle)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-background/10"
              aria-label={l(T.close)}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div
            ref={listRef}
            role="log"
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto bg-[radial-gradient(circle_at_1px_1px,oklch(0.9_0.02_250)_1px,transparent_0)] bg-[size:18px_18px] p-4"
          >
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                    m.from === "user"
                      ? "rounded-br-md bg-accent text-accent-foreground"
                      : "rounded-bl-md border border-border bg-card text-foreground"
                  }`}
                >
                  {m.text}
                  {m.preview && (
                    <div className="mt-3 rounded-xl border-l-4 border-[#25D366] bg-[#e7f8ee] px-3 py-2 text-[13px] text-foreground">
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#128c4b]">
                        {l(T.previewTitle)}
                      </p>
                      <p className="whitespace-pre-line">{m.preview}</p>
                    </div>
                  )}
                  {m.links && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.links.map((a, j) => {
                        if (a.kind === "wa")
                          return (
                            <a
                              key={j}
                              href={whatsappUrl(a.text)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`${linkCls} bg-[#25D366] text-white`}
                            >
                              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /> {a.label}
                            </a>
                          );
                        if (a.kind === "tel")
                          return (
                            <a
                              key={j}
                              href={TEL_URL}
                              className={`${linkCls} bg-navy text-primary-foreground`}
                            >
                              <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {a.label}
                            </a>
                          );
                        if (a.kind === "mail")
                          return (
                            <a
                              key={j}
                              href={MAILTO_URL}
                              className={`${linkCls} border border-border bg-background`}
                            >
                              <Mail className="h-3.5 w-3.5" aria-hidden="true" /> {a.label}
                            </a>
                          );
                        return (
                          <Link
                            key={j}
                            to={a.to}
                            params={a.params as never}
                            search={a.search as never}
                            hash={a.hash}
                            onClick={() => setOpen(false)}
                            className={`${linkCls} border border-accent/40 bg-background text-accent`}
                          >
                            {a.to === "/contacto" ? (
                              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                            ) : (
                              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                            )}
                            {a.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {chips.length > 0 && (
              <div className="flex flex-wrap justify-end gap-2 pt-1">
                {chips.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={c.onPick}
                    className="rounded-full border border-accent/40 bg-background px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={onSend} className="border-t border-border bg-background p-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={l(T.placeholder)}
                aria-label={l(T.placeholder)}
                className="min-w-0 flex-1 rounded-full border border-border bg-sand/50 px-4 py-2.5 text-base focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 md:text-sm"
              />
              <button
                type="submit"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-ember text-white disabled:opacity-50"
                disabled={!input.trim()}
                aria-label="Enviar"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">{l(T.privacy)}</p>
          </form>
        </div>
      )}

      {/* Burbuja de invitación */}
      {!open && nudge && (
        <button
          type="button"
          onClick={() => {
            setNudge(false);
            setOpen(true);
          }}
          className="fixed bottom-[9.5rem] right-4 z-[55] max-w-[220px] rounded-2xl rounded-br-md border border-border bg-background px-4 py-3 text-left text-sm font-medium text-navy shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300 md:bottom-24 md:right-6"
        >
          {l(T.bubble)}
          <span
            role="button"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              setNudge(false);
            }}
            className="absolute -left-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-navy text-primary-foreground"
            aria-label={l(T.close)}
          >
            <X className="h-3 w-3" aria-hidden="true" />
          </span>
        </button>
      )}

      {/* Botón flotante */}
      <button
        ref={toggleRef}
        type="button"
        onClick={() => {
          setNudge(false);
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        aria-label={open ? l(T.close) : l(T.open)}
        className="fixed bottom-[5.25rem] right-4 z-[55] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgb(37_211_102/0.7)] transition-transform hover:scale-105 active:scale-95 md:bottom-6 md:right-6 md:h-16 md:w-16"
      >
        {!open && (
          <span
            className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 motion-reduce:hidden"
            aria-hidden="true"
          />
        )}
        {open ? (
          <X className="relative h-6 w-6" aria-hidden="true" />
        ) : (
          <svg
            viewBox="0 0 32 32"
            className="relative h-7 w-7 md:h-8 md:w-8"
            aria-hidden="true"
            fill="currentColor"
          >
            <path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2.1 7L3.2 29l6.4-1.8c2 1.1 4.2 1.6 6.4 1.6 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2 0-3.9-.5-5.6-1.5l-.4-.2-3.8 1 1-3.7-.3-.4a10.4 10.4 0 0 1-1.6-5.6C5.3 10 10.1 5.3 16 5.3S26.7 10 26.7 15.8 21.9 26.4 16 26.4zm5.9-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7 0 1.6 1.2 3.1 1.3 3.3.2.2 2.3 3.5 5.6 4.9.8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
          </svg>
        )}
      </button>
    </>
  );
}
