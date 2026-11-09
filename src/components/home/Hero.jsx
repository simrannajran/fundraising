import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Users, Sparkles, ShieldCheck, TrendingUp } from "lucide-react";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { IMAGES, campaigns } from "@/data/mock";
import { formatCurrency, percent } from "@/lib/format";

const featured = campaigns[0];

export default function Hero() {
  const pct = percent(featured.raised, featured.goal);
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={IMAGES.hero} alt="" className="h-full w-full object-cover opacity-[0.22]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0512]/70 via-[#0a0512]/92 to-background" />
        <div className="absolute inset-0 grid-fade opacity-60" />
        <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute -right-32 top-40 h-[360px] w-[360px] rounded-full bg-accent/15 blur-[150px]" />
      </div>

      <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-24">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-silver backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            The fundraising platform for schools, teams &amp; communities
          </span>

          <h1 className="mt-6 font-heading text-[38px] font-semibold leading-[1.05] tracking-tight text-white sm:text-[52px] lg:text-[58px]">
            Fundraising built for<br className="hidden sm:block" />
            schools, teams and<br className="hidden sm:block" />
            <span className="text-metal">communities.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Create a campaign, rally participants with personal and team pages, take donations and
            manage every donor — all in one place, with live progress, reporting and payouts your
            school or club can rely on.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/register-school"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground glow transition-all hover:bg-primary/90"
            >
              Start a campaign
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/campaigns"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white/30 hover:bg-white/[0.07]"
            >
              <Compass className="h-4 w-4 text-accent" />
              Find a cause to support
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-[13px] text-muted-foreground">
            <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Personal &amp; team participant pages</span>
            <span className="inline-flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> Live progress &amp; reporting</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Donor management &amp; payouts</span>
          </div>
        </div>

        <div className="relative animate-rise delay-2">
          <div className="absolute -inset-6 -z-10 rounded-[32px] bg-primary/10 blur-3xl" />
          <div className="overflow-hidden rounded-3xl border border-white/10 surface glow-soft">
            <div className="relative h-44 sm:h-52">
              <img src={featured.cover} alt={featured.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0616] to-transparent" />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Live now
              </span>
            </div>

            <div className="p-6">
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{featured.school}</p>
              <h3 className="mt-1.5 font-heading text-lg font-semibold text-white">{featured.title}</h3>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="font-heading text-2xl font-semibold text-white">{formatCurrency(featured.raised)}</p>
                  <p className="text-[11px] text-muted-foreground">raised of {formatCurrency(featured.goal)} goal</p>
                </div>
                <p className="font-mono text-sm font-semibold text-accent">{pct}%</p>
              </div>

              <ProgressBar className="mt-3 h-2.5" raised={featured.raised} goal={featured.goal} />

              <div className="mt-4 grid grid-cols-3 divide-x divide-border/70 rounded-xl border border-border/70 bg-white/[0.02] py-3 text-center">
                {[
                  { k: featured.supporters, v: "supporters" },
                  { k: "22", v: "athletes" },
                  { k: featured.status, v: "status" },
                ].map((s) => (
                  <div key={s.v}>
                    <p className="font-heading text-sm font-semibold text-white">{s.k}</p>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{s.v}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/campaign/$slug"
                params={{ slug: featured.slug }}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-white/[0.06] py-3 text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.12]"
              >
                View this campaign <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}