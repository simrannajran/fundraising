import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, HeartHandshake, ShieldCheck, Sparkles, Target } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { IMAGES, impactStats } from "@/data/mock";

export const Route = createFileRoute("/_site/about")({
  head: () => ({ meta: [{ title: "About Us — RampUp Fundraising" }] }),
  component: AboutPage,
});

const team = [
  { name: "Diane Reyes", role: "Head of School Partnerships", note: "Former athletic director, 18 years in district administration." },
  { name: "Marcus Hale", role: "Campaign Strategy Lead", note: "Has run 400+ team fundraisers across three states." },
  { name: "Ellen Cho", role: "Product & Reporting", note: "Builds the reports treasurers actually want to read." },
  { name: "Priya Raman", role: "Coach Success", note: "Onboards every new campaign before it launches." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="We build the fundraising tool we wished our schools had"
        body="RampUp Fundraising is an independent platform for schools, teams and clubs. We raise. You coach. They win."
      >
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-[13px] font-semibold text-primary-foreground hover:bg-primary/90">
          Talk to our team <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </PageHero>

      <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border/80">
            <img src={IMAGES.classroom} alt="Students in class" className="h-72 w-full object-cover sm:h-96" />
          </div>
          <div>
            <SectionHeading eyebrow="Our mission" title="Make raising money the easy part of running a program" />
            <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
              Coaches and advisors did not sign up to chase order forms. Fundraising should take one afternoon to set up and then run itself — with pages supporters actually want to share and numbers administrators can defend.
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
              We built RampUp around three things: participant pages that feel personal, reporting that is honest, and a launch process with a real person attached to it.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4">
              {impactStats.slice(0, 2).map((s) => (
                <div key={s.label} className="rounded-xl border border-border/70 surface p-4">
                  <p className="font-heading text-2xl font-semibold text-white">{s.value}</p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-[#080410]">
        <div className="mx-auto grid max-w-[1280px] gap-4 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {[
            { icon: Target, title: "Our vision", body: "Every school program funded by its own community, without a single paper order form." },
            { icon: Compass, title: "Our approach", body: "Give each participant a page, each coach a dashboard and each treasurer a clean report." },
            { icon: ShieldCheck, title: "Our promise", body: "No donor fees at checkout, clear platform pricing and an audit trail for every gift." },
            { icon: HeartHandshake, title: "Our team", body: "Ex-athletic directors, coaches and engineers who have run these campaigns themselves." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border/70 surface p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/25">
                <c.icon className="h-4.5 w-4.5" strokeWidth={1.75} />
              </span>
              <p className="mt-4 font-heading text-[14px] font-semibold text-white">{c.title}</p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8">
        <SectionHeading eyebrow="Our team" title="People who answer the phone" body="Every campaign gets a named contact before it goes live." />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div key={m.name} className="rounded-2xl border border-border/80 surface p-5">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/12 font-heading text-[12px] font-bold text-accent ring-1 ring-inset ring-primary/25">
                {m.name.split(" ").map((w) => w[0]).join("")}
              </span>
              <p className="mt-4 font-heading text-[13.5px] font-semibold text-white">{m.name}</p>
              <p className="text-[11.5px] text-accent">{m.role}</p>
              <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{m.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[11px] text-white/35">Sample team profiles for this product demonstration.</p>
      </section>

      <section className="border-t border-border/70 bg-[#080410]">
        <div className="mx-auto flex max-w-[900px] flex-col items-center px-5 py-20 text-center">
          <Sparkles className="h-6 w-6 text-accent" />
          <h2 className="mt-5 font-heading text-3xl font-semibold text-white">Come build the next campaign with us</h2>
          <p className="mx-auto mt-3 max-w-lg text-[14px] text-muted-foreground">Tell us about your school and we will map your first fundraiser in a 20-minute call.</p>
          <Link to="/register-school" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground glow hover:bg-primary/90">
            Register your school <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}