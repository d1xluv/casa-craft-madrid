import { useLang } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <div
      role="group"
      aria-label={t("lang.label")}
      className="inline-flex items-center rounded-full border border-border bg-background/60 p-0.5 text-xs font-medium"
    >
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          lang={l}
          className={`rounded-full px-3 py-1.5 uppercase tracking-wider transition-colors ${
            lang === l
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
