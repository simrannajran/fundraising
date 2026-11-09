import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Quote } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { successStories, testimonials } from "@/data/mock";
import { formatCurrency, percent } from "@/lib/format";

export const Route = createFileRoute("/_site/success-stories")({
  head: () => ({ meta: [{ title: "Success Stories — RampUp Fundraising" }] }),
  component: SuccessStoriesPage,
});

function SuccessStoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Success stories"
        title="Communities that came together and hit the number"
        body="Illustrative campaign outcomes from the demonstration dataset — the reporting, structure and story format mirror a real campaign."
      />

      <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {successStories.map((s) => (
            <article key={s.id} className="group overflow-hidden rounded-2xl border border-border/80 surface">
              <div className="relative h-52 overflow-hidden">
                <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0616] via-[#0b0616]/30 to-transparent" />
                <span className="absolute bottom-4 left-5 rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-300 ring-1 ring-inset ring-emerald-400/30">
                  Goal reached
                </span>
              </div>
              <div className="p-6">
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{s.school}</p>
                <h2 className="mt-2 font-heading text-xl font-semibold text-white">{s.title}</h2>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground">{s.excerpt}</p>
                <div className="mt-5">
                  <ProgressBar className="h-1.5" raised={s.raised} goal={s.goal} tone="green" />
                  <div className="mt-2 flex items-center justify-between text-[11.5px]">
                    <span className="font-semibold text-white">{formatCurrency(s.raised)} raised</span>
                    <span className="text-muted-foreground">{percent(s.raised, s.goal)}% of {formatCurrency(s.goal)}</span>
                  </div>
                </div>
                <Link to="/campaigns" className="mt-5 inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-[12.5px] font-semibold text-silver hover:border-primary/50 hover:text-white">
                  Read more <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border/70 bg-[#080410]">
        <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold text-white">In their words</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.id} className="rounded-2xl border border-border/70 surface p-6">
                <Quote className="h-4 w-4 text-primary/70" />
                <blockquote className="mt-3 text-[13.5px] leading-relaxed text-silver">"{t.quote}"</blockquote>
                <figcaption className="mt-4 text-[11.5px] text-muted-foreground">
                  <span className="font-semibold text-white">{t.name}</span> · {t.role}, {t.school}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-5 text-[11px] text-white/35">Illustrative personas created for this product demonstration.</p>
        </div>
      </section>
    </>
  );
}