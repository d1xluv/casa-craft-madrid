import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Retardo en ms (para escalonar elementos de una lista). */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span" | "header";
};

/**
 * Aparición suave al entrar en pantalla. Los estilos están en styles.css:
 * sin JavaScript o con movimiento reducido el contenido se ve siempre.
 */
export function Reveal({ children, delay = 0, className, as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.shown = "";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.dataset.shown = "";
            io.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
