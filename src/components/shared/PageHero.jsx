import { cn } from "@/lib/utils";

export default function PageHero({ eyebrow, title, body, children, className }) {
  return (
    <section className={cn("relative overflow-hidden border-b border-border/70", className)}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-fade opacity-40" />
        <div className="absolute -left-32 -top-24 h-[360px] w-[360px] rounded-full bg-primary/20 blur-[130px]" />
      </div>
      <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-20">
        {eyebrow && (
          <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/[0.07] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-5 max-w-3xl font-heading text-3xl font-semibold leading-[1.1] text-white sm:text-[44px]">{title}</h1>
        {body && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{body}</p>}
        {children && <div className="mt-7">{children}</div>}
      </div>
    </section>
  );
}