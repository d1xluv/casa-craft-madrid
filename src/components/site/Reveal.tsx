import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** delay in ms */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
  variant?: "up" | "left" | "right" | "scale" | "fade";
};

const hidden: Record<NonNullable<Props["variant"]>, string> = {
  up: "translate-y-6",
  left: "-translate-x-6",
  right: "translate-x-6",
  scale: "scale-[0.97]",
  fade: "",
};

/** Lightweight scroll reveal: one IntersectionObserver per element, disconnected after firing. */
export function Reveal({ children, delay = 0, className = "", as = "div", variant = "up" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as any;
  return (
    <Tag
      ref={ref as any}
      style={{ transitionDelay: `${delay}ms` }}
      className={`motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? "opacity-100 translate-x-0 translate-y-0 scale-100" : `opacity-0 ${hidden[variant]}`
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Subtle parallax offset (px) driven by scroll, rAF-throttled. Disabled for reduced motion. */
export function useParallax(strength = 0.12) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(-center * strength);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return { ref, offset };
}
