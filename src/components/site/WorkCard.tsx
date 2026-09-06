import { Plus } from "lucide-react";

export function WorkCard({
  img,
  tag,
  title,
  desc,
  className = "",
  ratio = "aspect-[4/3]",
}: {
  img: string;
  tag: string;
  title: string;
  desc: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <article
      className={`group relative isolate overflow-hidden rounded-2xl bg-ink shadow-soft transition-all duration-500 hover:shadow-ember ${className}`}
    >
      <img
        src={img}
        alt={title}
        loading="lazy"
        className={`${ratio} w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110`}
      />

      {/* permanent legibility veil */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
      {/* extra veil on hover */}
      <div className="pointer-events-none absolute inset-0 bg-ink/45 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">
          {tag}
        </span>
        <h3 className="mt-3 font-display text-xl text-background md:text-2xl">{title}</h3>

        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="mt-3 max-w-md text-sm leading-relaxed text-background/85 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100 group-focus-within:opacity-100">
              {desc}
            </p>
          </div>
        </div>
      </div>

      <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground transition-transform duration-500 group-hover:rotate-45">
        <Plus className="h-4 w-4" />
      </span>
    </article>
  );
}
