import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { solutions, howItWorks, whyChoose } from "@/data/mock";

export const Route = createFileRoute("/_site/solutions")({
  head: () => ({ meta: [{ title: "Fundraising Solutions — RampUp Fundraising" }] }),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Fundraising solutions"
        title="The right campaign shape for every goal your school has"
        body="Seven ways to raise, one dashboard to run them from. Every solution includes team pages, participant pages and live reporting."
      >
        <div className="flex flex-wrap gap-2">
          <Link to="/register-school" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-[13px] font-semibold text-primary-foreground hover:bg-primary/90">
            Start Fundraising <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/[0.03] px-5 py-3 text-[13px] font-semibold text-silver hover:text-white">
            Talk to our team
          </Link>
        </div>
      </PageHero>

      <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <article key={s.slug} className="group overflow-hidden rounded-2xl border border-border/80 surface transition-all hover:-translate-y-1 hover:border-primary/40">
              <div className="relative h-44 overflow-hidden">
                <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0616] via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <h2 className="font-heading text-[16px] font-semibold text-white">{s.title}</h2>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{s.description}</p>
                <div className="mt-4 flex items-center gap-3">
                  <Link to="/campaigns" className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2 text-[12.5px] font-medium text-silver hover:border-primary/50 hover:text-white">
                    Explore <ArrowRight className="h-3 w-3" />
                  </Link>
                  <Link to="/contact" className="text-[12px] font-medium text-accent hover:text-white">Request a walkthrough</Link>
                </div>
              </div>
            </article>
          ))}
          <article className="flex flex-col justify-center rounded-2xl border border-primary/25 bg-primary/[0.06] p-6">
            <h2 className="font-heading text-[16px] font-semibold text-white">Not sure which fits?</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-silver/80">Tell us the goal and the timeline. A campaign coach will map it to the right structure.</p>
            <Link to="/contact" className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-[12.5px] font-semibold text-white">
              Get a recommendation <ArrowRight className="h-3 w-3" />
            </Link>
          </article>
        </div>
      </section>

      <section className="border-t border-border/70 bg-[#080410]">
        <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold text-white">What every solution includes</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((w) => (
              <div key={w.title} className="rounded-2xl border border-border/70 surface p-5">
                <p className="font-heading text-[13.5px] font-semibold text-white">{w.title}</p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8">
        <div className="grid gap-6 rounded-2xl border border-border/80 surface p-6 lg:grid-cols-[0.8fr_1.2fr] lg:p-8">
          <div>
            <h2 className="font-heading text-xl font-semibold text-white">The same four steps, every time</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">Structure stays consistent so your team only learns the platform once.</p>
            <Link to="/how-it-works" className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-accent hover:text-white">
              See the full walkthrough <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {howItWorks.map((s) => (
              <div key={s.step} className="flex gap-3">
                <span className="font-mono text-[11px] text-primary">{s.step}</span>
                <div>
                  <p className="text-[13px] font-semibold text-white">{s.title}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}