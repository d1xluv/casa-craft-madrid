import { useEffect, useRef, useState } from "react";
import { BadgeCheck, ClipboardList, FileText, Phone, Ruler, Sparkles } from "lucide-react";
import { processSteps } from "@/content/process";
import { useLang } from "@/lib/i18n";

const ICONS = [Phone, Ruler, FileText, ClipboardList, Sparkles, BadgeCheck];

/**
 * Método de trabajo que avanza solo con el scroll: una línea se va llenando
 * y cada paso se enciende al llegar a la mitad de la pantalla. No fija la
 * página (sin "scroll secuestrado"), así que se pasa rápido.
 */
export function ScrollProcess() {
  const { l } = useLang();
  const listRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      setReached(processSteps.length - 1);
      return;
    }
    let last = 0;
    let trailing = 0;
    const update = () => {
      last = performance.now();
      const line = window.innerHeight * 0.6;
      const r = list.getBoundingClientRect();
      setProgress(Math.min(1, Math.max(0, (line - r.top) / r.height)));
      const items = [...list.querySelectorAll<HTMLElement>("[data-step]")];
      let reachedNow = -1;
      items.forEach((el, i) => {
        if (el.getBoundingClientRect().top + 28 <= line) reachedNow = i;
      });
      setReached(reachedNow);
    };
    // Cálculo ligero limitado a ~25 veces por segundo, con una última pasada al parar.
    const onScroll = () => {
      window.clearTimeout(trailing);
      if (performance.now() - last > 40) update();
      trailing = window.setTimeout(update, 60);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(trailing);
    };
  }, []);

  return (
    <ol ref={listRef} className="relative mt-12 grid gap-x-12 md:grid-cols-2">
      {/* Raíl y relleno (en escritorio, uno por columna mediante el orden de lectura) */}
      <span
        aria-hidden="true"
        className="absolute bottom-6 left-[27px] top-6 w-1 rounded-full bg-border md:hidden"
      />
      <span
        aria-hidden="true"
        className="absolute left-[27px] top-6 w-1 rounded-full bg-gradient-ember md:hidden"
        style={{ height: `calc(${progress} * (100% - 3rem))` }}
      />
      {processSteps.map((s, i) => {
        const Icon = ICONS[i] ?? BadgeCheck;
        const on = i <= reached;
        return (
          <li
            key={s.title.es}
            data-step=""
            className="relative flex gap-5 py-4 md:border-t md:border-border md:py-6"
          >
            {/* Barra superior que se llena en escritorio */}
            <span
              aria-hidden="true"
              className="absolute -top-px left-0 hidden h-0.5 bg-accent transition-[width] duration-700 ease-out md:block"
              style={{ width: on ? "100%" : "0%" }}
            />
            <span
              className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-2 transition-all duration-500 ${
                on
                  ? "border-accent bg-accent text-accent-foreground shadow-ember"
                  : "border-border bg-background text-muted-foreground"
              }`}
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className={`transition-opacity duration-500 ${on ? "opacity-100" : "opacity-45"}`}>
              <p className="font-display text-xs font-bold tracking-widest text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display text-xl text-navy md:text-2xl">{l(s.title)}</h3>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
                {l(s.text)}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
