import { Link } from "@tanstack/react-router";
import { ArrowRight, Target, ShieldCheck, BarChart3, GraduationCap, Users2, Boxes, Quote, Flag, Share2 } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { impactStats, solutions, howItWorks, whyChoose, successStories, testimonials, teams, schools, IMAGES } from "@/data/mock";
import { formatCurrency, percent } from "@/lib/format";

const stepIcons = { flag: Flag, users: Users2, share: Share2, target: Target };
const whyIcons = [GraduationCap, Users2, Boxes, BarChart3, ShieldCheck, Target];

export function ImpactStats() {
  return (
    <section className="border-y border-border/70 bg-[#080410]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-y-10 px-5 py-12 lg:grid-cols-4 lg:px-8">
        {impactStats.map((s) => (
          <div key={s.label} className="text-center lg:text-left">
            <p className="font-heading text-3xl font-semibold text-white sm:text-[40px]">{s.value}</p>
            <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-[11px] text-white/35">{s.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SolutionsGrid() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8 lg:py-24">
      <SectionHeading
        eyebrow="Fundraising solutions"
        title="One platform for every kind of school fundraiser"
        body="Whether you're funding a season, a lab or a whole department, RampUp gives you the pages, teams and reporting to run it properly."
        action={
          <Link to="/solutions" className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-accent hover:text-white">
            All solutions <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        }
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {solutions.slice(0, 4).map((s) => (
          <Link
            key={s.slug}
            to="/solutions"
            className="group relative overflow-hidden rounded-2xl border border-border/80 surface p-6 transition-all hover:-translate-y-1 hover:border-primary/40"
          >
            <div className="mb-5 h-28 overflow-hidden rounded-xl">
              <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
            </div>
            <h3 className="font-heading text-[15px] font-semibold text-white">{s.title}</h3>
            <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">{s.description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-accent">
              Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function HowItWorksStrip() {
  return (
    <section className="relative overflow-hidden border-y border-border/70 bg-[#080410]">
      <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8 lg:py-24">
        <SectionHeading eyebrow="How it works" title="From idea to funded in four steps" align="center" />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((s) => {
            const Icon = stepIcons[s.icon];
            return (
              <div key={s.step} className="relative rounded-2xl border border-border/80 surface p-6">
                <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-primary">{s.step}</span>
                <div className="mt-4 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/25">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 font-heading text-[15px] font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function WhyChoose() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Why RampUp"
          title="A fundraising platform your board will actually trust"
          body="Purpose-built workflows, transparent numbers and pages that make supporters want to give — without the paper forms."
        />
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {whyChoose.map((w, i) => {
            const Icon = whyIcons[i % whyIcons.length];
            return (
              <div key={w.title} className="flex gap-3.5">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border/80 bg-white/[0.03] text-primary">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div>
                  <h4 className="font-heading text-[14px] font-semibold text-white">{w.title}</h4>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{w.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FeaturedSchools() {
  return (
    <section className="border-y border-border/70 bg-[#080410]">
      <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Featured schools & teams"
          title="Programs raising together right now"
          body="Sample schools and teams from the demonstration dataset."
          action={
            <Link to="/campaigns" className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-accent hover:text-white">
              Browse all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {schools.slice(0, 4).map((s) => (
            <div key={s.id} className="rounded-2xl border border-border/80 surface p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/12 font-heading text-xs font-bold text-primary ring-1 ring-inset ring-primary/25">
                  {s.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-heading text-[13.5px] font-semibold text-white">{s.name}</p>
                  <p className="text-[11px] text-muted-foreground">{s.city}</p>
                </div>
              </div>
              <p className="mt-4 font-heading text-xl font-semibold text-white">{formatCurrency(s.raised)}</p>
              <p className="text-[11px] text-muted-foreground">{s.campaigns} campaigns · {s.students} students</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teams.slice(0, 3).map((t) => (
            <Link key={t.id} to="/team/$slug" params={{ slug: t.slug }} className="group overflow-hidden rounded-2xl border border-border/80 surface transition-colors hover:border-primary/40">
              <div className="flex gap-4 p-4">
                <img src={t.image} alt={t.name} loading="lazy" className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t.school}</p>
                  <p className="mt-1 truncate font-heading text-[14px] font-semibold text-white">{t.name}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{t.participants} participants</p>
                  <div className="mt-2">
                    <ProgressBar raised={t.raised} goal={t.goal} className="h-1.5" />
                    <p className="mt-1.5 text-[11px] text-silver">{formatCurrency(t.raised)} <span className="text-muted-foreground">/ {formatCurrency(t.goal)}</span></p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SuccessStoriesStrip() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8 lg:py-24">
      <SectionHeading
        eyebrow="Success stories"
        title="Campaigns that brought a community together"
        body="Illustrative campaign outcomes from the demonstration dataset."
        action={
          <Link to="/success-stories" className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-accent hover:text-white">
            Read all stories <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        }
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {successStories.slice(0, 3).map((s) => (
          <article key={s.id} className="group overflow-hidden rounded-2xl border border-border/80 surface">
            <div className="relative h-44 overflow-hidden">
              <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0616] via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-300">
                Goal reached
              </span>
            </div>
            <div className="p-5">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{s.school}</p>
              <h3 className="mt-1.5 font-heading text-[15px] font-semibold text-white">{s.title}</h3>
              <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">{s.excerpt}</p>
              <p className="mt-4 font-mono text-sm font-semibold text-accent">{formatCurrency(s.raised)} raised</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="border-y border-border/70 bg-[#080410]">
      <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8 lg:py-24">
        <SectionHeading eyebrow="What schools say" title="Built with athletic directors, coaches and advisors" align="center" />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="flex flex-col rounded-2xl border border-border/80 surface p-6">
              <Quote className="h-5 w-5 text-primary/70" />
              <blockquote className="mt-4 flex-1 text-[14px] leading-relaxed text-silver">"{t.quote}"</blockquote>
              <figcaption className="mt-5 border-t border-border/70 pt-4">
                <p className="text-[13px] font-semibold text-white">{t.name}</p>
                <p className="text-[11px] text-muted-foreground">{t.role} · {t.school}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-5 text-center text-[11px] text-white/35">Illustrative personas for this product demonstration.</p>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={IMAGES.graduation} alt="" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0a0512]/90 to-background" />
      </div>
      <div className="mx-auto max-w-[900px] px-5 py-24 text-center lg:px-8">
        <h2 className="font-heading text-3xl font-semibold leading-tight text-white sm:text-[44px]">
          Your team has a goal. <span className="text-metal">Let's fund it.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Launch a campaign in minutes, invite your participants and give your community one simple way to say yes.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/register-school" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground glow hover:bg-primary/90">
            Start Fundraising <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/[0.07]">
            Talk to our team
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FeaturedCampaignsHeader() {
  return (
    <SectionHeading
      eyebrow="Campaign discovery"
      title="Fundraisers making progress right now"
      body="Browse campaigns from schools, teams and clubs — follow a cause, share it with your community or start one of your own."
      action={
        <Link to="/campaigns" className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-accent hover:text-white">
          Explore campaigns <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      }
    />
  );
}

export const percentHelper = percent;