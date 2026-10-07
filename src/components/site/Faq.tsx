import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { faq } from "@/content/faq";
import { useLang } from "@/lib/i18n";

/** Preguntas frecuentes desplegables (accesibles con teclado). */
export function Faq() {
  const { l } = useLang();
  return (
    <AccordionPrimitive.Root type="single" collapsible className="border-t border-line">
      {faq.map((item, i) => (
        <AccordionPrimitive.Item key={i} value={`q${i}`} className="border-b border-line">
          <AccordionPrimitive.Header asChild>
            <h3>
              <AccordionPrimitive.Trigger className="group flex w-full items-start justify-between gap-6 py-5 text-left text-[1.0625rem] font-semibold text-navy transition-colors hover:text-accent md:text-lg">
                {l(item.q)}
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line-strong transition-[transform,background-color,border-color,color] duration-300 group-hover:border-accent group-data-[state=open]:rotate-45 group-data-[state=open]:border-navy group-data-[state=open]:bg-navy group-data-[state=open]:text-paper">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </AccordionPrimitive.Trigger>
            </h3>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:!animate-none">
            <p className="max-w-2xl pb-6 pr-12 leading-relaxed text-muted-foreground">
              {l(item.a)}
            </p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
